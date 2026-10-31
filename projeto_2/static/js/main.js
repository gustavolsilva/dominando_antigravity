/**
 * AURA SPARKLING WATER - Frontend Scripts
 * - Canvas de partículas (bolhas de gás subindo)
 * - Máscara e validação de celular (BR)
 * - Submissão AJAX do formulário de reserva com SQLite
 * - Acordeão de FAQ e seleção de sabores
 */

document.addEventListener('DOMContentLoaded', () => {
  initBubblesCanvas();
  initPhoneMask();
  initReservationForm();
  initFaqAccordion();
  initFlavorPickers();
});

/* ==============================================================
   1. CANVAS DE BOLHAS EFERVESCENTES (GÁS NATURAL)
   ============================================================== */
function initBubblesCanvas() {
  const canvas = document.getElementById('bubblesCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const bubbles = [];
  const maxBubbles = Math.min(width < 768 ? 35 : 70, 90);

  class Bubble {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.radius = Math.random() * 3 + 1.2;
      this.speed = Math.random() * 1.2 + 0.5;
      this.opacity = Math.random() * 0.45 + 0.15;
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.03 + 0.01;
    }

    update() {
      this.y -= this.speed;
      this.wobble += this.wobbleSpeed;
      this.x += Math.sin(this.wobble) * 0.5;

      if (this.y < -10) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 242, 254, ${this.opacity})`;
      ctx.fill();

      // Reflexo da bolha
      ctx.beginPath();
      ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity + 0.25})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < maxBubbles; i++) {
    bubbles.push(new Bubble());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].update();
      bubbles[i].draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==============================================================
   2. MÁSCARA DINÂMICA DE CELULAR / WHATSAPP
   Suporta (XX) XXXXX-XXXX e (XX) XXXX-XXXX
   ============================================================== */
function initPhoneMask() {
  const phoneInput = document.getElementById('telefone');
  if (!phoneInput) return;

  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }

    e.target.value = value;
  });
}

/* ==============================================================
   3. SUBMISSÃO DO FORMULÁRIO DE RESERVA
   ============================================================== */
function initReservationForm() {
  const form = document.getElementById('formReserva');
  const alertBox = document.getElementById('formAlert');
  const submitBtn = document.getElementById('btnSubmit');
  const successCard = document.getElementById('successCard');

  if (!form) return;

  function showAlert(msg, isError = true) {
    alertBox.textContent = msg;
    alertBox.className = 'form-alert ' + (isError ? 'alert-error' : 'alert-success');
    alertBox.style.display = 'block';
  }

  function hideAlert() {
    alertBox.style.display = 'none';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert();

    const nome = document.getElementById('nome_completo').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const sabor = document.getElementById('sabor_preferido').value;

    // Validações no cliente
    if (nome.length < 3) {
      showAlert('Por favor, informe seu nome completo.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert('Por favor, digite um e-mail válido.');
      return;
    }

    const cleanPhone = telefone.replace(/\D/g, '');
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      showAlert('Por favor, informe um número de celular válido com DDD.');
      return;
    }

    // Estado de Carregamento
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
      const response = await fetch('/api/reserva', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome_completo: nome,
          email: email,
          telefone: telefone,
          sabor_preferido: sabor,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Sucesso na reserva!
        form.style.display = 'none';
        successCard.style.display = 'block';

        // Preenche dados do comprovante
        const ticketIdEl = document.getElementById('resTicketId');
        const resNomeEl = document.getElementById('resNome');
        const resSaborEl = document.getElementById('resSabor');
        const totalCountEl = document.getElementById('totalReservasSpan');

        if (ticketIdEl) ticketIdEl.textContent = '#' + String(data.reserva_id || '001').padStart(4, '0');
        if (resNomeEl) resNomeEl.textContent = nome;
        if (resSaborEl) resSaborEl.textContent = sabor;
        if (totalCountEl && data.total_reservas) {
          totalCountEl.textContent = data.total_reservas;
        }

        // Scroll suave até a confirmação
        successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        showAlert(data.message || 'Não foi possível completar a reserva.');
      }
    } catch (err) {
      console.error('Erro na requisição:', err);
      showAlert('Ocorreu um erro ao conectar ao servidor. Tente novamente em instantes.');
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
}

/* ==============================================================
   4. ACORDEÃO DO FAQ
   ============================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fecha todos os outros
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('active');
          const otherAnswer = other.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Alterna o atual
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ==============================================================
   5. SELETOR DE SABORES NA VITRINE
   Ao clicar em "Quero esse", seleciona no formulário e rola até ele
   ============================================================== */
function initFlavorPickers() {
  const flavorCards = document.querySelectorAll('.flavor-card');
  const flavorSelect = document.getElementById('sabor_preferido');
  const reservationSection = document.getElementById('reservar');

  flavorCards.forEach((card) => {
    card.addEventListener('click', () => {
      const flavorName = card.getAttribute('data-flavor');
      if (flavorSelect && flavorName) {
        flavorSelect.value = flavorName;
      }
      if (reservationSection) {
        reservationSection.scrollIntoView({ behavior: 'smooth' });
        // Destaque visual temporário no select
        flavorSelect.focus();
      }
    });
  });
}

