/* ── Scroll progress bar ── */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 20);
  navbar.classList.toggle('hidden', y > 80 && y > lastY);
  lastY = y;
}, { passive: true });

/* ── Burger menu ── */
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── Cursor glow ── */
const glow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
  glow.style.opacity = '1';
}, { passive: true });
document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });

/* ── Aurora background ── */
(() => {
  const canvas = document.getElementById('aurora');
  const ctx = canvas.getContext('2d');
  let W, H, t = 0;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const blobs = [
    { x: 0.2, y: 0.3, r: 0.55, color: '160,210,235', speed: 0.0004 },  // #A0D2EB sky blue
    { x: 0.75, y: 0.6, r: 0.5,  color: '132,88,179',  speed: 0.0003 }, // #8458B3 purple
    { x: 0.5,  y: 0.85, r: 0.45, color: '208,189,244', speed: 0.0005 }, // #D0BDF4 lavender
  ];

  function draw() {
    ctx.clearRect(0, 0, W, H);
    t++;
    blobs.forEach((b, i) => {
      const ox = Math.sin(t * b.speed + i * 2) * 0.12;
      const oy = Math.cos(t * b.speed * 0.7 + i) * 0.1;
      const cx = (b.x + ox) * W;
      const cy = (b.y + oy) * H;
      const rad = b.r * Math.min(W, H);
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      g.addColorStop(0, `rgba(${b.color},0.15)`);
      g.addColorStop(1, `rgba(${b.color},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── Typing animation ── */
(() => {
  const roles = ['Full-Stack Developer', 'ML Engineer', 'UI/UX Thinker', 'Open Source Builder'];
  const el = document.getElementById('typed-role');
  let ri = 0, ci = 0, deleting = false;

  function type() {
    const word = roles[ri];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(type, deleting ? 45 : 80);
  }
  type();
})();

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

/* ── Count-up on stats ── */
const countEls = document.querySelectorAll('[data-count]');
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    let start = 0;
    const dur = 1200;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const pct = Math.min((timestamp - start) / dur, 1);
      el.textContent = Math.floor(pct * target) + suffix;
      if (pct < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
    countObs.unobserve(el);
  });
}, { threshold: 0.5 });
countEls.forEach(el => countObs.observe(el));

/* ── 3D card tilt ── */
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── Active nav link highlight ── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => sectionObs.observe(s));
