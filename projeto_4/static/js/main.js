document.addEventListener('DOMContentLoaded', () => {
  // 1. Matrix Digital Rain Effect
  initMatrixEffect();

  // 2. Countdown Timer
  initCountdown();

  // 3. Subscription Form Ajax Handler
  initSubscriptionForm();

  // 4. FAQ Accordion
  initFAQ();

  // 5. Social Share Buttons
  initShareLinks();
});

// Matrix Rain Effect
function initMatrixEffect() {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const characters = '0101010101ABCDEF<>/*{}[]=+#~_🔒🛡️⚡CYBERSEC';
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(8, 12, 20, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00f5d4';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 45);
}

// Countdown Timer
function initCountdown() {
  const targetDateStr = document.body.dataset.eventDate;
  if (!targetDateStr) return;

  const targetDate = new Date(targetDateStr).getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      if (daysEl) daysEl.innerText = '00';
      if (hoursEl) hoursEl.innerText = '00';
      if (minutesEl) minutesEl.innerText = '00';
      if (secondsEl) secondsEl.innerText = '00';
      const label = document.querySelector('.countdown-label');
      if (label) label.innerHTML = '🔴 <strong>A LIVE ESTÁ NO AR AGORA!</strong>';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// Subscription Form Ajax Handler
function initSubscriptionForm() {
  const form = document.getElementById('subscribeForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');
  const calendarSection = document.getElementById('calendarSection');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!name || !email) {
      showFeedback('Por favor preencha seu nome e e-mail.', 'error');
      return;
    }

    // Estado de loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Processando acesso...</span>`;

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });

      const result = await response.json();

      if (result.success) {
        showFeedback(`🛡️ ${result.message}`, 'success');
        form.reset();
        if (calendarSection) {
          calendarSection.style.display = 'block';
          calendarSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        showFeedback(result.message || 'Erro ao realizar inscrição.', 'error');
      }
    } catch (err) {
      showFeedback('Falha na conexão com o servidor. Tente novamente.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>Garantir Minha Vaga & Acessar Live</span> →`;
    }
  });

  function showFeedback(text, type) {
    if (!feedback) return;
    feedback.className = `form-feedback ${type}`;
    feedback.innerText = text;
  }
}

// FAQ Accordion
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Share Links
function initShareLinks() {
  const currentUrl = encodeURIComponent(window.location.origin || window.location.href);
  const text = encodeURIComponent('Vou participar da Live Exclusiva de Cyber Security nessa sexta-feira às 20h! Inscreva-se também gratuitamente:');

  const waBtn = document.getElementById('shareWhatsapp');
  if (waBtn) {
    waBtn.href = `https://api.whatsapp.com/send?text=${text}%20${currentUrl}`;
  }

  const twBtn = document.getElementById('shareTwitter');
  if (twBtn) {
    twBtn.href = `https://twitter.com/intent/tweet?text=${text}&url=${currentUrl}`;
  }

  const inBtn = document.getElementById('shareLinkedin');
  if (inBtn) {
    inBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
  }
}

