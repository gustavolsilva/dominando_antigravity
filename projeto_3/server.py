#!/usr/bin/env python3
"""
CyberDefense Live - Servidor Web & API em Python
Processa inscrições de leads, salva em banco SQLite e fornece painel administrativo.
"""

import http.server
import socketserver
import json
import sqlite3
import urllib.parse
from datetime import datetime
import os
import csv
import io

PORT = 8000
DB_FILE = os.path.join(os.path.dirname(__file__), "leads.db")

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            whatsapp TEXT NOT NULL,
            created_at TEXT NOT NULL,
            ip TEXT
        )
    """)
    conn.commit()
    conn.close()

class CyberLiveHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and Cache control
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path == "/api/subscribe":
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length).decode("utf-8")
            
            try:
                # Try parsing as JSON first, then urlencoded form
                if self.headers.get("Content-Type", "").startswith("application/json"):
                    data = json.loads(body)
                else:
                    parsed = urllib.parse.parse_qs(body)
                    data = {k: v[0] for k, v in parsed.items()}
                
                name = data.get("name", "").strip()
                email = data.get("email", "").strip()
                whatsapp = data.get("whatsapp", "").strip()
                
                if not name or not email or not whatsapp:
                    self.send_response(400)
                    self.send_header("Content-Type", "application/json")
                    self.end_headers()
                    self.wfile.write(json.dumps({"error": "Todos os campos são obrigatórios."}).encode("utf-8"))
                    return

                # Save to SQLite
                client_ip = self.client_address[0]
                now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

                conn = sqlite3.connect(DB_FILE)
                cursor = conn.cursor()
                cursor.execute("""
                    INSERT INTO leads (name, email, whatsapp, created_at, ip)
                    VALUES (?, ?, ?, ?, ?)
                """, (name, email, whatsapp, now_str, client_ip))
                conn.commit()
                conn.close()

                # Response
                response_data = {
                    "success": True,
                    "message": "Inscrição confirmada com sucesso!",
                    "lead": {"name": name, "email": email}
                }
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps(response_data, ensure_ascii=False).encode("utf-8"))

            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
            return

        super().do_POST()

    def do_GET(self):
        # Admin Dashboard
        if self.path == "/admin":
            self.render_admin()
            return
        
        # Export CSV
        if self.path == "/admin/export.csv":
            self.export_csv()
            return

        # API JSON of leads
        if self.path == "/api/leads":
            self.get_leads_json()
            return

        super().do_GET()

    def get_leads_json(self):
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, email, whatsapp, created_at FROM leads ORDER BY id DESC")
        rows = cursor.fetchall()
        conn.close()

        leads = [{"id": r[0], "name": r[1], "email": r[2], "whatsapp": r[3], "created_at": r[4]} for r in rows]
        
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.end_headers()
        self.wfile.write(json.dumps(leads, ensure_ascii=False).encode("utf-8"))

    def export_csv(self):
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, email, whatsapp, created_at, ip FROM leads ORDER BY id ASC")
        rows = cursor.fetchall()
        conn.close()

        output = io.StringIO()
        writer = csv.writer(output)
        writer.writerow(["ID", "Nome", "E-mail", "WhatsApp", "Data de Inscrição", "IP"])
        writer.writerows(rows)

        csv_bytes = output.getvalue().encode("utf-8-sig")
        self.send_response(200)
        self.send_header("Content-Type", "text/csv; charset=utf-8")
        self.send_header("Content-Disposition", 'attachment; filename="inscritos_live_cybersecurity.csv"')
        self.end_headers()
        self.wfile.write(csv_bytes)

    def render_admin(self):
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, email, whatsapp, created_at, ip FROM leads ORDER BY id DESC")
        rows = cursor.fetchall()
        conn.close()

        total = len(rows)

        rows_html = ""
        for r in rows:
            rows_html += f"""
            <tr>
              <td>#{r[0]}</td>
              <td><strong>{r[1]}</strong></td>
              <td>{r[2]}</td>
              <td>{r[3]}</td>
              <td>{r[4]}</td>
              <td><code>{r[5]}</code></td>
            </tr>
            """

        if total == 0:
            rows_html = """<tr><td colspan="6" style="text-align:center; color:#94a3b8; padding: 2rem;">Nenhum inscrito registrado ainda.</td></tr>"""

        admin_html = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Admin - Inscritos na Live de Cyber Security</title>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Plus+Jakarta+Sans:wght@400;600;800&display=swap" rel="stylesheet">
  <style>
    body {{
      background: #07090e;
      color: #f8fafc;
      font-family: 'Plus Jakarta Sans', sans-serif;
      margin: 0;
      padding: 2rem;
    }}
    .container {{
      max-width: 1100px;
      margin: 0 auto;
    }}
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      border-bottom: 1px solid rgba(0, 240, 255, 0.2);
      padding-bottom: 1rem;
    }}
    h1 {{
      font-size: 1.6rem;
      color: #00f0ff;
      font-family: 'JetBrains Mono', monospace;
      margin: 0;
    }}
    .stats-card {{
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(0, 240, 255, 0.3);
      border-radius: 8px;
      padding: 1.25rem 2rem;
      display: inline-block;
      margin-bottom: 1.5rem;
    }}
    .stats-count {{
      font-size: 2.2rem;
      font-weight: 800;
      color: #10b981;
      font-family: 'JetBrains Mono', monospace;
    }}
    .btn {{
      background: #00f0ff;
      color: #030712;
      text-decoration: none;
      padding: 0.6rem 1.2rem;
      border-radius: 6px;
      font-weight: 700;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      display: inline-block;
    }}
    .btn:hover {{
      background: #38bdf8;
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }}
    th, td {{
      padding: 0.9rem 1.2rem;
      text-align: left;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }}
    th {{
      background: rgba(10, 16, 29, 0.9);
      color: #94a3b8;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      text-transform: uppercase;
    }}
    td {{
      font-size: 0.92rem;
    }}
    code {{
      font-family: 'JetBrains Mono', monospace;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.1);
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
    }}
    .back-link {{
      color: #94a3b8;
      text-decoration: none;
      font-size: 0.85rem;
      display: inline-block;
      margin-top: 1.5rem;
    }}
    .back-link:hover {{ color: #00f0ff; }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>[SEC-OPS] PAINEL DE LEADS DA LIVE</h1>
      <div>
        <a href="/admin/export.csv" class="btn">📥 Exportar CSV</a>
        <a href="/" class="btn" style="background:transparent; color:#00f0ff; border: 1px solid #00f0ff; margin-left:0.5rem;">Visualizar Landing Page</a>
      </div>
    </div>

    <div class="stats-card">
      <div style="font-size: 0.8rem; color:#94a3b8; text-transform:uppercase; letter-spacing:1px; margin-bottom:0.25rem;">Total de Inscritos Confirmados</div>
      <div class="stats-count">{total}</div>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>WhatsApp</th>
          <th>Data / Hora</th>
          <th>IP Origem</th>
        </tr>
      </thead>
      <tbody>
        {rows_html}
      </tbody>
    </table>

    <a href="/" class="back-link">← Voltar para a Landing Page</a>
  </div>
</body>
</html>
"""
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(admin_html.encode("utf-8"))

def run():
    init_db()
    with socketserver.TCPServer(("", PORT), CyberLiveHandler) as httpd:
        print(f"🚀 Servidor CyberDefense Live ativo em http://localhost:{PORT}")
        print(f"📊 Painel Administrativo em http://localhost:{PORT}/admin")
        print(f"📥 Endpoint de inscrição: POST http://localhost:{PORT}/api/subscribe")
        httpd.serve_forever()

if __name__ == "__main__":
    run()

