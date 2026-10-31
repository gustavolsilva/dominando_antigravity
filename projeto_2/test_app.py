"""
Testes unitários e de integração para o AURA Sparkling.
Verifica o banco SQLite, validações de leads e endpoints HTTP.
"""

import os
import sys
import threading
import time
import urllib.request
import json

import database
from app import run, ThreadingHTTPServer, AuraAppHandler

def run_tests():
    print("▶ Iniciando testes de integridade...")

    # 1. Teste de Inicialização do Banco
    database.init_db()
    assert os.path.exists(database.DB_PATH), "Arquivo reservas.db não foi criado!"
    print("✔ Banco SQLite inicializado com sucesso.")

    # 2. Teste de Inserção de Reserva Válida
    test_email = f"lead.teste_{int(time.time())}@sparkling.com"
    sucesso, msg, res_id = database.salvar_reserva(
        nome_completo="Carlos Eduardo Silva",
        email=test_email,
        telefone="(11) 98765-4321",
        sabor_preferido="Sicília Sol (Limão Siciliano & Alecrim)"
    )
    assert sucesso is True, f"Falha ao salvar reserva: {msg}"
    assert res_id is not None, "ID retornado é nulo!"
    print(f"✔ Reserva #{res_id} criada com sucesso para {test_email}.")

    # 3. Teste de Proteção contra E-mail Duplicado
    sucesso_dup, msg_dup, _ = database.salvar_reserva(
        nome_completo="Carlos Outro",
        email=test_email,
        telefone="(11) 91111-2222"
    )
    assert sucesso_dup is False, "Permitiu e-mail duplicado indevidamente!"
    print(f"✔ Validação de e-mail duplicado operando corretamente: '{msg_dup}'")

    # 4. Teste de Validações Básicas
    sucesso_inv, _, _ = database.salvar_reserva("", "invalido", "123")
    assert sucesso_inv is False, "Aceitou dados em branco/inválidos!"
    print("✔ Validação de campos vazios/inválidos funcionando.")

    # 5. Teste de Listagem
    reservas = database.listar_reservas()
    assert len(reservas) > 0, "Lista de reservas retornou vazia!"
    print(f"✔ Listagem de reservas OK (Total de reservas: {len(reservas)}).")

    # 6. Teste de Servidor HTTP
    PORT = 5055
    server = ThreadingHTTPServer(("127.0.0.1", PORT), AuraAppHandler)
    server_thread = threading.Thread(target=server.serve_forever, daemon=True)
    server_thread.start()
    time.sleep(0.5)

    base_url = f"http://127.0.0.1:{PORT}"

    # GET /
    with urllib.request.urlopen(f"{base_url}/") as response:
        assert response.status == 200
        html = response.read().decode("utf-8")
        assert "AURA Sparkling Water" in html
        assert "nome_completo" in html
        assert "telefone" in html
    print("✔ Rota GET / (Landing Page) respondendo com HTTP 200.")

    # GET /admin
    with urllib.request.urlopen(f"{base_url}/admin") as response:
        assert response.status == 200
        html_admin = response.read().decode("utf-8")
        assert "Painel de Leads" in html_admin
    print("✔ Rota GET /admin respondendo com HTTP 200.")

    # POST /api/reserva via HTTP
    api_email = f"api_user_{int(time.time())}@aura.com"
    req_data = json.dumps({
        "nome_completo": "Mariana Ferreira",
        "email": api_email,
        "telefone": "(21) 99887-6655",
        "sabor_preferido": "Ruby Bliss (Frutas Vermelhas & Flor de Hibisco)"
    }).encode("utf-8")

    req = urllib.request.Request(
        f"{base_url}/api/reserva",
        data=req_data,
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req) as response:
        assert response.status == 201
        res_json = json.loads(response.read().decode("utf-8"))
        assert res_json["success"] is True
        print(f"✔ API POST /api/reserva respondeu com sucesso: Reserva #{res_json['reserva_id']}")

    # GET /api/exportar-csv
    with urllib.request.urlopen(f"{base_url}/api/exportar-csv") as response:
        assert response.status == 200
        csv_data = response.read().decode("utf-8")
        assert "Nome Completo" in csv_data
        assert "Mariana Ferreira" in csv_data
    print("✔ Download do CSV verificado com sucesso.")

    # Limpeza dos registros de teste criados
    database.remover_reserva(res_id)
    database.remover_reserva(res_json['reserva_id'])
    print("✔ Registros de teste removidos para manter o banco limpo.")

    server.shutdown()
    print("\n🎉 TODOS OS TESTES PASSARAM COM 100% DE SUCESSO!")

if __name__ == "__main__":
    run_tests()
