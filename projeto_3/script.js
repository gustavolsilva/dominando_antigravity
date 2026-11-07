/* ==========================================================================
   CYBERDEFENSE LIVE - SCRIPT
   Countdown, Interactive Canvas, Dynamic Date, Form handling
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. Set Footer Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 3. Calculate Upcoming Friday at 20:00 (Brazil Timezone / Local)
  const targetLiveDate = getNextFridayAt8PM();
  formatDateBadge(targetLiveDate);
  initCountdown(targetLiveDate);
  setupCalendarLink(targetLiveDate);

  // 4. Cyber Interactive Particle Background
  initCyberCanvas();

  // 5. Phone Input Mask for WhatsApp
  initPhoneMask();

  // 6. Lead Capture Form Submission & Success Modal
  initLeadForm(targetLiveDate);

  // 7. Interactive Terminal Simulation (Attack vs Defense)
  initTerminalSimulation();

  // 8. Social Proof Live Notification Toast
  initSocialProofToast();
});

/**
 * Calculates the next upcoming Friday at 20:00:00
 */
function getNextFridayAt8PM() {
  const now = new Date();
  const result = new Date(now);
  const currentDay = now.getDay(); // 0 is Sunday, 5 is Friday
  
  // Days until next Friday
  let daysUntilFriday = (5 - currentDay + 7) % 7;
  
  // If today is Friday, check if 20:00 has already passed
  if (daysUntilFriday === 0 && now.getHours() >= 20) {
    daysUntilFriday = 7; // Next week's Friday
  }

  result.setDate(now.getDate() + daysUntilFriday);
  result.setHours(20, 0, 0, 0);
  return result;
}

/**
 * Updates the readable date badge on the hero section
 */
function formatDateBadge(targetDate) {
  const dateDisplay = document.getElementById('event-date-display');
  if (!dateDisplay) return;

  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const formatted = targetDate.toLocaleDateString('pt-BR', options);
  // Capitalize first letter
  const capitalized = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  dateDisplay.textContent = capitalized;
}

/**
 * Countdown logic
 */
function initCountdown(targetDate) {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function update() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/**
 * Prepares the Google Calendar direct URL
 */
function setupCalendarLink(targetDate) {
  const calendarBtn = document.getElementById('addToCalendarBtn');
  if (!calendarBtn) return;

  const startDate = new Date(targetDate);
  const endDate = new Date(targetDate.getTime() + (2 * 60 * 60 * 1000)); // 2 hours duration

  function toGCalString(d) {
    return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  }

  const title = encodeURIComponent('🔴 LIVE: Cyber Security Masterclass - Defesa & Ataque');
  const details = encodeURIComponent('Acesso exclusivo à Live de Cyber Security. Prepare-se para ver técnicas reais de defesa e ataque.');
  const location = encodeURIComponent('Transmissão Online Privada (Link por WhatsApp e E-mail)');
  const dates = `${toGCalString(startDate)}/${toGCalString(endDate)}`;

  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  calendarBtn.href = url;
}

/**
 * WhatsApp auto-formatting mask: (XX) XXXXX-XXXX
 */
function initPhoneMask() {
  const phoneInput = document.getElementById('whatsapp');
  if (!phoneInput) return;

  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

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

/**
 * Lead Form Handler
 */
function initLeadForm(targetDate) {
  const form = document.getElementById('leadForm');
  const modal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (!form || !modal) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Loading State
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>GARANTINDO ACESSO...</span>`;

    setTimeout(() => {
      // Restore button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      if (window.lucide) lucide.createIcons();

      // Show success modal
      modal.classList.remove('hidden');

      // Clear form
      form.reset();
    }, 800);
  });

  // Close modal logic
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
}

/**
 * Interactive Cyber Particle Canvas (Connected Nodes)
 */
function initCyberCanvas() {
  const canvas = document.getElementById('cyber-bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  });

  const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
  let particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 240, 255, 0.6)';
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const opacity = (1 - dist / 130) * 0.25;
          ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  initParticles();
  animate();
}

/**
 * Interactive Terminal Simulation (Attack vs Defense)
 */
function initTerminalSimulation() {
  const consoleBody = document.getElementById('simConsoleBody');
  const attackBtn = document.getElementById('simAttackBtn');
  const defendBtn = document.getElementById('simDefendBtn');
  const clearBtn = document.getElementById('simClearBtn');

  if (!consoleBody || !attackBtn || !defendBtn || !clearBtn) return;

  let isRunning = false;

  function appendLine(text, cssClass = 'system-line') {
    const line = document.createElement('div');
    line.className = `sim-line ${cssClass}`;
    line.textContent = text;
    // Insert before prompt
    const promptLine = consoleBody.querySelector('.prompt-line');
    if (promptLine) {
      consoleBody.insertBefore(line, promptLine);
    } else {
      consoleBody.appendChild(line);
    }
    consoleBody.scrollTop = consoleBody.scrollHeight;
  }

  attackBtn.addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;

    appendLine('[COMMAND] ./attack_simulation.sh --target 192.168.1.105', 'attack-line');

    const steps = [
      { t: 300, msg: '[NMAP] Scanning target: 192.168.1.105 (Ports 1-65535)...', cls: 'info-line' },
      { t: 900, msg: '[ALERT] Open ports detected: 22/SSH, 80/HTTP, 8080/APACHE-STRUTS', cls: 'warning-line' },
      { t: 1500, msg: '[EXPLOIT] Injecting CVE-2023-Remote-Code payload into :8080...', cls: 'attack-line' },
      { t: 2200, msg: '[PAYLOAD] Reverse TCP Meterpreter shell established on :4444!', cls: 'attack-line' },
      { t: 2800, msg: '[RANSOMWARE] Attempting shadow copy deletion & privilege escalation...', cls: 'warning-line' },
      { t: 3400, msg: '[STATUS] Simulação de ataque concluída. Clique em "Disparar Defesa" para mitigar!', cls: 'system-line' }
    ];

    steps.forEach(({ t, msg, cls }, i) => {
      setTimeout(() => {
        appendLine(msg, cls);
        if (i === steps.length - 1) isRunning = false;
      }, t);
    });
  });

  defendBtn.addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;

    appendLine('[COMMAND] sudo ./mitigate_threat.sh --enforce-zero-trust', 'defense-line');

    const steps = [
      { t: 300, msg: '[SURICATA-IDS] Signature match detected! Suspicious outbound traffic on port 4444', cls: 'warning-line' },
      { t: 900, msg: '[IPTABLES] Dropping all packets from 192.168.1.105... [OK]', cls: 'defense-line' },
      { t: 1500, msg: '[EDR] Killing rogue meterpreter process PID 4821 and dumping memory snapshot...', cls: 'defense-line' },
      { t: 2100, msg: '[ZERO-TRUST] Re-authenticating all microservice credentials & rotating JWT secrets...', cls: 'info-line' },
      { t: 2700, msg: '[CONTAINER] Vulnerable container isolated and redeployed from clean hardened image.', cls: 'defense-line' },
      { t: 3200, msg: '[SUCCESS] Ameaça 100% contida! Sistema integro e protegido.', cls: 'defense-line' }
    ];

    steps.forEach(({ t, msg, cls }, i) => {
      setTimeout(() => {
        appendLine(msg, cls);
        if (i === steps.length - 1) isRunning = false;
      }, t);
    });
  });

  clearBtn.addEventListener('click', () => {
    consoleBody.innerHTML = `
      <div class="sim-line system-line">[SYSTEM] Terminal limpo e pronto para novos testes.</div>
      <div class="sim-line prompt-line"><span class="sim-prompt">secops@lab:~$</span> <span class="cursor">_</span></div>
    `;
  });
}

/**
 * Social Proof Live Notification Toast
 */
function initSocialProofToast() {
  const toast = document.getElementById('liveToast');
  const toastName = document.getElementById('toastName');
  if (!toast || !toastName) return;

  const mockLeads = [
    'Rafael S. de São Paulo',
    'Beatriz M. do Rio de Janeiro',
    'Rodrigo F. de Belo Horizonte',
    'Camila A. de Curitiba',
    'Lucas T. de Porto Alegre',
    'Gabriel P. de Brasília',
    'Mariana C. de Recife'
  ];

  let index = 0;

  function showNextToast() {
    toastName.textContent = mockLeads[index % mockLeads.length];
    index++;

    toast.classList.remove('hidden');

    // Hide after 4 seconds
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 4000);
  }

  // First toast after 3 seconds, then every 16 seconds
  setTimeout(() => {
    showNextToast();
    setInterval(showNextToast, 16000);
  }, 3000);
}


