import datetime
import os
import sqlite3
import sys
from pathlib import Path

# Adiciona o diretório local de bibliotecas (libs) ao sys.path
BASE_DIR = Path(__file__).resolve().parent
libs_path = BASE_DIR / "libs"
if libs_path.exists() and str(libs_path) not in sys.path:
    sys.path.insert(0, str(libs_path))

from flask import Flask, Response, jsonify, render_template, request

app = Flask(__name__)
DB_PATH = BASE_DIR / "data" / "subscribers.db"

YOUTUBE_LIVE_URL = "https://www.youtube.com/watch?v=JjiVchY-I_k&t=3s"
YOUTUBE_EMBED_URL = "https://www.youtube-nocookie.com/embed/JjiVchY-I_k"


def init_db():
    os.makedirs(DB_PATH.parent, exist_ok=True)
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS subscribers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """
        )
        conn.commit()


# Inicializa o banco de dados
init_db()


def get_next_friday():
    """Calcula a data da próxima sexta-feira às 20h00"""
    now = datetime.datetime.now()
    days_ahead = (4 - now.weekday()) % 7
    if days_ahead == 0 and now.hour >= 20:
        days_ahead = 7
    next_friday = (now + datetime.timedelta(days=days_ahead)).replace(
        hour=20, minute=0, second=0, microsecond=0
    )
    return next_friday


@app.route("/")
def index():
    next_friday = get_next_friday()
    return render_template(
        "index.html",
        event_date_iso=next_friday.isoformat(),
        event_date_display=next_friday.strftime("%d/%m/%Y"),
        event_time_display="20:00 (Horário de Brasília)",
        youtube_live_url=YOUTUBE_LIVE_URL,
        youtube_embed_url=YOUTUBE_EMBED_URL,
    )


@app.route("/api/subscribe", methods=["POST"])
def subscribe():
    data = request.get_json() or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()

    if not name:
        return jsonify({"success": False, "message": "Por favor, informe seu nome completo."}), 400
    if not email or "@" not in email:
        return jsonify({"success": False, "message": "Por favor, informe um e-mail válido."}), 400

    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO subscribers (name, email)
                VALUES (?, ?)
            """,
                (name, email),
            )
            conn.commit()

        return jsonify(
            {
                "success": True,
                "message": f"Inscrição confirmada com sucesso, {name}! Seu acesso está liberado.",
                "youtube_url": YOUTUBE_LIVE_URL,
            }
        )
    except sqlite3.IntegrityError:
        return jsonify(
            {
                "success": True,
                "message": f"Você já estava inscrito(a), {name}! O link da transmissão está disponível abaixo.",
                "youtube_url": YOUTUBE_LIVE_URL,
            }
        )
    except Exception as e:
        return jsonify(
            {"success": False, "message": f"Erro ao processar inscrição: {str(e)}"}), 500


@app.route("/api/stats")
def stats():
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM subscribers")
        total = cursor.fetchone()[0]

    return jsonify({"total_subscribers": total})


@app.route("/dashboard")
def dashboard():
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM subscribers ORDER BY registered_at DESC")
        rows = [dict(row) for row in cursor.fetchall()]

    return render_template(
        "dashboard.html",
        subscribers=rows,
        total=len(rows),
        youtube_live_url=YOUTUBE_LIVE_URL,
    )


@app.route("/live.ics")
def calendar_ics():
    """Gera um arquivo de calendário ICS para importar no Google / Outlook / Apple Calendar"""
    next_friday = get_next_friday()
    start_utc = next_friday + datetime.timedelta(hours=3)  # GMT-3 para UTC
    end_utc = start_utc + datetime.timedelta(hours=2)

    dtstart = start_utc.strftime("%Y%m%dT%H%M%SZ")
    dtend = end_utc.strftime("%Y%m%dT%H%M%SZ")

    ics_content = f"""BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CyberSecurity Live//BR
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:live-cybersecurity-{dtstart}@cybersec.live
DTSTAMP:{dtstart}
DTSTART:{dtstart}
DTEND:{dtend}
SUMMARY:🔴 LIVE: Cyber Security na Prática - Defesa e Ataque Cibernético
DESCRIPTION:Live sobre cibersegurança: Técnicas ofensivas\\, defensivas e resposta a incidentes.\\nLink: {YOUTUBE_LIVE_URL}
LOCATION:{YOUTUBE_LIVE_URL}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR"""

    return Response(
        ics_content,
        mimetype="text/calendar",
        headers={"Content-Disposition": "attachment; filename=live-cybersecurity.ics"},
    )


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"🚀 Servidor rodando em http://127.0.0.1:{port}")
    app.run(host="0.0.0.0", port=port, debug=True)
