# 🛡️ Live Cyber Security - Landing Page & Sistema de Inscrições

Página web completa desenvolvida em **Python + Flask** para divulgação e captação de participantes da Live sobre **Cyber Security** ("A Anatomia de um Ataque Cibernético: Do Reconhecimento à Resposta a Incidentes").

---

## 🚀 Como Executar

Para iniciar a aplicação localmente:

```bash
python3 app.py
```

O servidor iniciará em: **[http://127.0.0.1:5000](http://127.0.0.1:5000)**

---

## ✨ Funcionalidades

1. **Design Futurista Cyberpunk / Dark Security:**
   - Efeito de fundo Matrix Digital Rain em HTML5 Canvas.
   - Glows neon, estética hacker/terminal e tipografia monoespaçada integrada.
   - Totalmente responsivo para smartphones, tablets e desktops.

2. **Contador Regressivo em Tempo Real:**
   - Calcula automaticamente o tempo restante até a próxima sexta-feira às 20h.
   - Exibe dias, horas, minutos e segundos com atualização a cada segundo.

3. **Formulário de Inscrição Inteligente (AJAX):**
   - Coleta Nome, E-mail, WhatsApp e Nível de conhecimento (Iniciante, Estudante, Profissional, Especialista).
   - Sem recarregar a página (feedback dinâmico de confirmação).
   - Prevenção de duplicidade por e-mail com SQLite persistente.

4. **Integração com Calendários:**
   - Botão para adicionar o evento ao **Google Agenda**.
   - Download de arquivo `.ics` para importar no Outlook, Apple Calendar e calendários móveis.

5. **Compartilhamento Rápido em Redes:**
   - Botões pré-formatados para WhatsApp, Twitter/X e LinkedIn.

6. **Painel do Organizador (`/dashboard`):**
   - Tabela de participantes inscritos em tempo real.
   - Totalizador de inscritos.
   - Botão de um clique para copiar todos os e-mails dos participantes para envio do link da live.

7. **API RESTful Integrada:**
   - `POST /api/subscribe`: Registra um novo lead/participante.
   - `GET /api/stats`: Estatísticas de inscritos agrupados por nível.
   - `GET /live.ics`: Gera dinamicamente o arquivo iCalendar.

---

## 📁 Estrutura de Arquivos

```
projeto_4/
├── app.py                  # Servidor backend Flask e rotas
├── data/
│   └── subscribers.db      # Banco de dados SQLite persistente
├── static/
│   ├── css/
│   │   └── style.css       # Estilização completa com efeitos neon/cyber
│   └── js/
│       └── main.js         # Canvas Matrix, countdown, Ajax e FAQs
├── templates/
│   ├── index.html          # Landing page de divulgação
│   └── dashboard.html      # Painel administrativo de inscritos
└── libs/                   # Dependências do Flask empacotadas
```

