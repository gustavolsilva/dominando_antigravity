#!/usr/bin/env python3
"""
AURA Sparkling Water - Backend e Servidor da Landing Page.
Desenvolvido em Python puro (Standard Library) com SQLite.
Zero dependências externas necessárias para rodar!
"""

import csv
import io
import json
import mimetypes
import os
import sys
from http import HTTPStatus
from http.server import HTTPServer, SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

from database import (
    contar_reservas,
    init_db,
    listar_reservas,
    remover_reserva,
    salvar_reserva,
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")
STATIC_DIR = os.path.join(BASE_DIR, "static")

# Registra tipos MIME comuns
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("image/svg+xml", ".svg")
mimetypes.add_type("image/png", ".png")
mimetypes.add_type("image/x-icon", ".ico")


class AuraAppHandler(SimpleHTTPRequestHandler):
    """Manipulador HTTP customizado com suporte a rotas REST e templates estáticos."""

    def end_headers(self):
        # Cabeçalhos de segurança e CORS padrão
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("X-Content-Type-Options", "nosniff")
        super().end_headers()

    def do_OPTIONS(self):
        """Suporte a pre-flight requests."""
        self.send_response(HTTPStatus.NO_CONTENT)
        self.end_headers()

    def do_GET(self):
        """Roteamento das requisições GET."""
        parsed_url = urlparse(self.path)
        path = parsed_url.path

        if path in ("/", "/index.html"):
            self.serve_landing_page()
        elif path == "/admin":
            self.serve_admin_page()
        elif path == "/api/reservas":
            self.handle_api_listar_reservas()
        elif path == "/api/status":
            self.handle_api_status()
        elif path == "/api/exportar-csv":
            self.handle_exportar_csv()
        elif path.startswith("/static/"):
            self.serve_static_file(path)
        elif path == "/favicon.ico":
            self.serve_static_file("/static/images/favicon.svg")
        else:
            self.send_error(HTTPStatus.NOT_FOUND, "Página não encontrada")

    def do_POST(self):
        """Roteamento das requisições POST."""
        parsed_url = urlparse(self.path)
        path = parsed_url.path

        if path in ("/api/reserva", "/api/reservar"):
            self.handle_api_nova_reserva()
        elif path == "/api/reserva/excluir":
            self.handle_api_excluir_reserva()
        else:
            self.send_error(HTTPStatus.NOT_FOUND, "Rota POST não encontrada")

    # -------------------------------------------------------------
    # Handlers de Páginas e Arquivos Estáticos
    # -------------------------------------------------------------
    def serve_landing_page(self):
        """Lê o template index.html e injeta dados dinâmicos como o contador de reservas."""
        template_path = os.path.join(TEMPLATES_DIR, "index.html")
        if not os.path.exists(template_path):
            self.send_error(HTTPStatus.INTERNAL_SERVER_ERROR, "Template não encontrado.")
            return

        try:
            with open(template_path, "r", encoding="utf-8") as f:
                content = f.read()

            total = contar_reservas()
            # Placeholder dinâmico se houver
            content = content.replace("{{TOTAL_RESERVAS}}", str(total))

            body = content.encode("utf-8")
            self.send_response(HTTPStatus.OK)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        except Exception as e:
            self.send_error(HTTPStatus.INTERNAL_SERVER_ERROR, f"Erro ao renderizar: {e}")

    def serve_admin_page(self):
        """Lê o template admin.html para visualização das reservas."""
        template_path = os.path.join(TEMPLATES_DIR, "admin.html")
        if not os.path.exists(template_path):
            self.send_error(HTTPStatus.INTERNAL_SERVER_ERROR, "Template admin não encontrado.")
            return

        try:
            with open(template_path, "r", encoding="utf-8") as f:
                content = f.read()

            body = content.encode("utf-8")
            self.send_response(HTTPStatus.OK)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        except Exception as e:
            self.send_error(HTTPStatus.INTERNAL_SERVER_ERROR, f"Erro ao renderizar admin: {e}")

    def serve_static_file(self, req_path):
        """Serve arquivos da pasta static com caching e content-type apropriado."""
        clean_path = req_path.lstrip("/").replace("static/", "", 1)
        file_path = os.path.normpath(os.path.join(STATIC_DIR, clean_path))

        # Proteção contra Directory Traversal
        if not file_path.startswith(STATIC_DIR) or not os.path.isfile(file_path):
            self.send_error(HTTPStatus.NOT_FOUND, "Arquivo não encontrado")
            return

        content_type, _ = mimetypes.guess_type(file_path)
        content_type = content_type or "application/octet-stream"

        try:
            with open(file_path, "rb") as f:
                data = f.read()

            self.send_response(HTTPStatus.OK)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(len(data)))
            self.send_header("Cache-Control", "public, max-age=3600")
            self.end_headers()
            self.wfile.write(data)
        except Exception as e:
            self.send_error(HTTPStatus.INTERNAL_SERVER_ERROR, f"Erro ao ler arquivo: {e}")

    # -------------------------------------------------------------
    # Handlers da API REST (JSON)
    # -------------------------------------------------------------
    def _read_json_or_form(self):
        """Lê o corpo da requisição e analisa se é JSON ou formulário x-www-form-urlencoded."""
        content_length = int(self.headers.get("Content-Length", 0))
        if content_length == 0:
            return {}

        body = self.rfile.read(content_length).decode("utf-8")
        content_type = self.headers.get("Content-Type", "")

        if "application/json" in content_type:
            try:
                return json.loads(body)
            except json.JSONDecodeError:
                return {}
        else:
            # Form urlencoded
            params = parse_qs(body)
            return {k: v[0] for k, v in params.items()}

    def _send_json(self, status_code: int, data: dict):
        """Responde com JSON estruturado."""
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def handle_api_nova_reserva(self):
        """Cria uma nova reserva a partir dos dados enviados."""
        dados = self._read_json_or_form()

        nome = dados.get("nome_completo") or dados.get("nome", "")
        email = dados.get("email", "")
        telefone = dados.get("telefone") or dados.get("celular", "")
        sabor = dados.get("sabor_preferido") or dados.get("sabor", "Todos")
        ip = self.client_address[0] if self.client_address else "127.0.0.1"

        sucesso, mensagem, id_criado = salvar_reserva(
            nome_completo=nome,
            email=email,
            telefone=telefone,
            sabor_preferido=sabor,
            ip_origem=ip,
        )

        status_code = HTTPStatus.CREATED if sucesso else HTTPStatus.BAD_REQUEST
        total = contar_reservas()

        self._send_json(
            status_code,
            {
                "success": sucesso,
                "message": mensagem,
                "reserva_id": id_criado,
                "total_reservas": total,
            },
        )

    def handle_api_listar_reservas(self):
        """Retorna todas as reservas em JSON."""
        reservas = listar_reservas()
        total = len(reservas)
        self._send_json(
            HTTPStatus.OK,
            {
                "success": True,
                "total": total,
                "reservas": reservas,
            },
        )

    def handle_api_status(self):
        """Endpoint de saúde e estatísticas rápidas."""
        total = contar_reservas()
        self._send_json(
            HTTPStatus.OK,
            {
                "status": "online",
                "produto": "AURA Sparkling Water",
                "total_reservas": total,
            },
        )

    def handle_api_excluir_reserva(self):
        """Exclui uma reserva via POST JSON."""
        dados = self._read_json_or_form()
        reserva_id = dados.get("id")

        if not reserva_id:
            self._send_json(HTTPStatus.BAD_REQUEST, {"success": False, "message": "ID não fornecido."})
            return

        try:
            removido = remover_reserva(int(reserva_id))
            if removido:
                self._send_json(HTTPStatus.OK, {"success": True, "message": "Reserva removida com sucesso."})
            else:
                self._send_json(HTTPStatus.NOT_FOUND, {"success": False, "message": "Reserva não encontrada."})
        except Exception as e:
            self._send_json(HTTPStatus.INTERNAL_SERVER_ERROR, {"success": False, "message": str(e)})

    def handle_exportar_csv(self):
        """Gera um arquivo CSV com todas as reservas cadastradas."""
        reservas = listar_reservas()

        output = io.StringIO()
        # UTF-8 BOM para garantir compatibilidade com Excel no Windows/Mac/Linux
        output.write("\ufeff")

        writer = csv.writer(output, delimiter=";")
        writer.writerow(["ID", "Nome Completo", "E-mail", "Celular / WhatsApp", "Sabor Escolhido", "Data de Reserva", "IP"])

        for r in reservas:
            writer.writerow([
                r["id"],
                r["nome_completo"],
                r["email"],
                r["telefone"],
                r["sabor_preferido"],
                r["data_criacao"],
                r["ip_origem"],
            ])

        csv_content = output.getvalue().encode("utf-8")
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", "text/csv; charset=utf-8")
        self.send_header("Content-Disposition", 'attachment; filename="reservas_aura_sparkling.csv"')
        self.send_header("Content-Length", str(len(csv_content)))
        self.end_headers()
        self.wfile.write(csv_content)


def run(host: str = "0.0.0.0", port: int = 5000):
    """Inicia o servidor HTTP multithread."""
    init_db()
    server_address = (host, port)
    httpd = ThreadingHTTPServer(server_address, AuraAppHandler)
    print("=" * 65)
    print(f"🌊 AURA SPARKLING WATER - Servidor Ativo")
    print(f"📍 Landing Page:     http://localhost:{port}/")
    print(f"📊 Painel de Leads:  http://localhost:{port}/admin")
    print(f"📁 Banco de Dados:   SQLite (reservas.db)")
    print("=" * 65)
    print("Pressione Ctrl+C para encerrar o servidor.")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor encerrado com sucesso.")
        httpd.server_close()


if __name__ == "__main__":
    porta = 5000
    if len(sys.argv) > 1:
        try:
            porta = int(sys.argv[1])
        except ValueError:
            pass
    run(port=porta)
