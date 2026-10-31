"""
Módulo de Gerenciamento do Banco de Dados SQLite para o Aura Sparkling.
Responsável pela inicialização das tabelas e operações de CRUD das reservas.
"""

import sqlite3
import os
from datetime import datetime
from typing import Dict, List, Optional, Tuple

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "reservas.db")


def get_connection() -> sqlite3.Connection:
    """Retorna uma nova conexão configurada com row_factory."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    """Inicializa as tabelas do banco de dados SQLite se não existirem."""
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS reservas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome_completo TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE COLLATE NOCASE,
                telefone TEXT NOT NULL,
                sabor_preferido TEXT DEFAULT 'Todos',
                ip_origem TEXT,
                data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
            )
            """
        )
        # Índice para acelerar buscas por e-mail e data
        cursor.execute(
            "CREATE INDEX IF NOT EXISTS idx_reservas_email ON reservas(email)"
        )
        cursor.execute(
            "CREATE INDEX IF NOT EXISTS idx_reservas_data ON reservas(data_criacao)"
        )
        conn.commit()


def salvar_reserva(
    nome_completo: str,
    email: str,
    telefone: str,
    sabor_preferido: str = "Todos",
    ip_origem: Optional[str] = None,
) -> Tuple[bool, str, Optional[int]]:
    """
    Insere uma nova reserva no banco de dados.
    Retorna: (sucesso: bool, mensagem: str, id_inserido: Optional[int])
    """
    nome_completo = nome_completo.strip()
    email = email.strip().lower()
    telefone = telefone.strip()
    sabor_preferido = (sabor_preferido or "Todos").strip()

    if not nome_completo or len(nome_completo) < 3:
        return False, "Por favor, informe seu nome completo.", None

    if not email or "@" not in email or "." not in email:
        return False, "Por favor, informe um e-mail válido.", None

    if not telefone or len(telefone) < 8:
        return False, "Por favor, informe um número de celular válido com DDD.", None

    try:
        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO reservas (nome_completo, email, telefone, sabor_preferido, ip_origem, data_criacao)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (
                    nome_completo,
                    email,
                    telefone,
                    sabor_preferido,
                    ip_origem or "127.0.0.1",
                    datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                ),
            )
            conn.commit()
            return True, "Reserva confirmada com sucesso!", cursor.lastrowid
    except sqlite3.IntegrityError:
        return False, "Este e-mail já está cadastrado na nossa lista de pré-venda VIP!", None
    except Exception as e:
        return False, f"Erro ao registrar reserva: {str(e)}", None


def listar_reservas() -> List[Dict]:
    """Retorna todas as reservas ordenadas da mais recente para a mais antiga."""
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT id, nome_completo, email, telefone, sabor_preferido, ip_origem, data_criacao
            FROM reservas
            ORDER BY id DESC
            """
        )
        rows = cursor.fetchall()
        return [dict(row) for row in rows]


def contar_reservas() -> int:
    """Retorna o número total de reservas cadastradas."""
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM reservas")
        count = cursor.fetchone()[0]
        return count


def remover_reserva(reserva_id: int) -> bool:
    """Remove uma reserva pelo ID (utilitário para moderação/admin)."""
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM reservas WHERE id = ?", (reserva_id,))
        conn.commit()
        return cursor.rowcount > 0

