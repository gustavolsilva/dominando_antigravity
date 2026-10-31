"""
Script de Teste Prático de Inputs e Validações no Cadastro.
Simula o comportamento do formulário e verifica a persistência no SQLite.
"""

import json
import sqlite3
import urllib.request
import database

def executar_testes_de_input():
    print("=" * 65)
    print("🧪 TESTE PRÁTICO DE INPUTS NO FORMULÁRIO DE CADASTRO")
    print("=" * 65)

    base_url = "http://127.0.0.1:5000/api/reserva"

    # Casos de teste
    cenarios = [
        {
            "descricao": "1. Input Válido Completo (Lead 1 - Gustavo)",
            "dados": {
                "nome_completo": "Gustavo Henrique Mendes",
                "email": "gustavo.mendes@exemplo.com",
                "telefone": "(11) 98765-4321",
                "sabor_preferido": "Sicília Sol (Limão Siciliano & Alecrim)"
            },
            "espera_sucesso": True
        },
        {
            "descricao": "2. Input Válido (Lead 2 - Amanda)",
            "dados": {
                "nome_completo": "Amanda Carvalho Castro",
                "email": "amanda.castro@exemplo.com",
                "telefone": "(21) 99123-9876",
                "sabor_preferido": "Ruby Bliss (Frutas Vermelhas & Flor de Hibisco)"
            },
            "espera_sucesso": True
        },
        {
            "descricao": "3. Tentativa com E-mail Duplicado (Repetindo Amanda)",
            "dados": {
                "nome_completo": "Amanda Castro Outro",
                "email": "amanda.castro@exemplo.com",
                "telefone": "(21) 98888-7777",
                "sabor_preferido": "Tropic Spark (Maracujá & Tangerina)"
            },
            "espera_sucesso": False
        },
        {
            "descricao": "4. Input Inválido: Nome em branco",
            "dados": {
                "nome_completo": "   ",
                "email": "semnome@exemplo.com",
                "telefone": "(11) 99999-9999",
                "sabor_preferido": "Zen Mint"
            },
            "espera_sucesso": False
        },
        {
            "descricao": "5. Input Inválido: E-mail sem @ ou inválido",
            "dados": {
                "nome_completo": "Juliana Paes",
                "email": "email_invalido_sem_arroba",
                "telefone": "(31) 98765-1122",
                "sabor_preferido": "Zen Mint"
            },
            "espera_sucesso": False
        },
        {
            "descricao": "6. Input Inválido: Telefone incompleto",
            "dados": {
                "nome_completo": "Rodrigo Faro",
                "email": "rodrigo@exemplo.com",
                "telefone": "123",
                "sabor_preferido": "Sicília Sol"
            },
            "espera_sucesso": False
        }
    ]

    for cenario in cenarios:
        print(f"\n▶ Executando: {cenario['descricao']}")
        nome = cenario['dados']['nome_completo']
        email = cenario['dados']['email']
        telefone = cenario['dados']['telefone']
        sabor = cenario['dados'].get('sabor_preferido', 'Todos')

        # Teste na camada de banco/serviço
        sucesso, msg, res_id = database.salvar_reserva(
            nome_completo=nome,
            email=email,
            telefone=telefone,
            sabor_preferido=sabor,
            ip_origem="127.0.0.1"
        )

        status_simbolo = "✅ PASSOU" if sucesso == cenario['espera_sucesso'] else "❌ FALHOU"
        print(f"  Resultado esperado: {'Sucesso' if cenario['espera_sucesso'] else 'Erro/Rejeição'}")
        print(f"  Resposta do sistema: {msg}")
        print(f"  Status do teste: {status_simbolo} (ID gerado: {res_id})")

    # Exibe os dados gravados no banco SQLite
    print("\n" + "=" * 65)
    print("📊 REGISTROS SALVOS NO BANCO SQLITE (reservas.db):")
    print("=" * 65)

    conn = sqlite3.connect(database.DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT id, nome_completo, email, telefone, sabor_preferido, data_criacao FROM reservas ORDER BY id ASC")
    rows = cursor.fetchall()

    if not rows:
        print("Nenhum registro gravado.")
    else:
        print(f"{'ID':<4} | {'Nome Completo':<24} | {'E-mail':<26} | {'Celular':<16} | {'Sabor':<20}")
        print("-" * 105)
        for r in rows:
            print(f"#{r[0]:<3} | {r[1]:<24} | {r[2]:<26} | {r[3]:<16} | {r[4][:20]:<20}")

    print("\nTotal de reservas salvas com sucesso no banco:", len(rows))
    conn.close()

if __name__ == "__main__":
    executar_testes_de_input()

