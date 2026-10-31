# 🌊 AURA SPARKLING WATER - Landing Page & Sistema de Pré-Venda

Uma Landing Page moderna, responsiva e de alta conversão para uma marca premium de **água com gás saborizada em lata**, desenvolvida em **Python** nativo com persistência de dados em **SQLite**.

---

## 🚀 Destaques do Projeto

- **Zero Dependências Externas**: Utiliza a biblioteca padrão do Python (`http.server`, `sqlite3`, `json`, `urllib`). Roda instantaneamente com `python3 app.py` em qualquer máquina.
- **Banco de Dados SQLite (`reservas.db`)**:
  - Armazenamento de **Nome Completo**, **E-mail**, **Celular/WhatsApp**, **Sabor Escolhido**, **Data/Hora** e **IP de Origem**.
  - Índices automáticos para busca rápida e proteção contra e-mails duplicados (`UNIQUE`).
- **Design Moderno & Responsivo**:
  - Efeito de microbolhas minerais efervescentes animadas em canvas.
  - Ilustração vetorial em SVG da lata em estilo 3D com condensação e brilho metálico.
  - Vitrine interativa com 4 sabores artesanais (ao clicar no sabor, seleciona no formulário).
  - Máscara automática de celular/WhatsApp `(XX) XXXXX-XXXX`.
  - Confirmação visual em tempo real com emissão de ticket numerado de reserva VIP.
- **Painel Administrativo (`/admin`)**:
  - Visualização de todas as reservas cadastradas em tempo real.
  - Busca e filtro dinâmico por nome, e-mail ou celular.
  - Link direto com 1 clique para iniciar conversa no WhatsApp com o cliente.
  - Botão de exportação para **CSV (compatível com Excel)**.
  - Exclusão de cadastros de teste.

---

## 📁 Estrutura de Arquivos

```text
projeto_2/
├── app.py                # Servidor HTTP multithread e rotas da API REST
├── database.py           # Camada de banco de dados SQLite (CRUD e conexão segura)
├── test_app.py           # Suíte de testes unitários e de integração
├── reservas.db           # Banco de dados SQLite (gerado automaticamente)
├── static/
│   ├── css/
│   │   └── style.css     # Estilos responsivos, glassmorphism e animações
│   ├── js/
│   │   └── main.js       # Máscara de telefone, canvas de bolhas e AJAX
│   └── images/
│       └── favicon.svg   # Favicon temático da lata efervescente
└── templates/
    ├── index.html        # Landing Page principal de alta conversão
    └── admin.html        # Painel de gestão e exportação dos leads
```

---

## ⚡ Como Executar

### 1. Iniciar o Servidor
No terminal, dentro da pasta do projeto, basta executar:

```bash
python3 app.py
```

Ou especificando uma porta personalizada (ex: 8080):
```bash
python3 app.py 8080
```

### 2. Acessar no Navegador
- **Landing Page do Produto**: [http://localhost:5000/](http://localhost:5000/)
- **Painel Administrativo de Reservas**: [http://localhost:5000/admin](http://localhost:5000/admin)

---

## 🧪 Como Executar os Testes

Para validar a integridade do banco de dados SQLite, regras de negócio e rotas da API:

```bash
python3 test_app.py
```

---

## 📊 Endpoints da API REST

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/` | Retorna a Landing Page |
| `GET` | `/admin` | Retorna o Painel Administrativo de Leads |
| `POST` | `/api/reserva` | Cria uma nova reserva (JSON ou Form) |
| `GET` | `/api/reservas` | Lista todas as reservas em formato JSON |
| `GET` | `/api/exportar-csv` | Gera o download do arquivo `reservas_aura_sparkling.csv` |
| `POST` | `/api/reserva/excluir` | Exclui uma reserva informando `{"id": X}` |
| `GET` | `/api/status` | Retorna o status do servidor e contagem de leads |

