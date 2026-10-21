// Scroll reveal — content is visible by default; only hide it once this script is running
if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

// Nav pill active state
const workTab = document.querySelector('[data-section="work"]');
const aboutTab = document.querySelector('[data-section="about"]');
const aboutSection = document.getElementById('about');

function setActive(active, inactive) {
  active?.classList.add('active');
  active?.setAttribute('aria-current', 'true');
  inactive?.classList.remove('active');
  inactive?.removeAttribute('aria-current');
}

function updateNavActive() {
  if (!aboutSection) return;
  const aboutTop = aboutSection.getBoundingClientRect().top;
  if (aboutTop <= 100) {
    setActive(aboutTab, workTab);
  } else {
    setActive(workTab, aboutTab);
  }
}

window.addEventListener('scroll', updateNavActive, { passive: true });
updateNavActive();

// Mobile burger menu
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');

function setMenu(open) {
  mobileMenu.classList.toggle('open', open);
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) mobileMenu.querySelector('.mobile-link')?.focus();
}

burger?.addEventListener('click', () => {
  setMenu(!mobileMenu.classList.contains('open'));
});

mobileMenu?.querySelectorAll('.mobile-link').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) {
    setMenu(false);
    burger.focus();
  }
});

// Close the overlay if the viewport grows past the mobile breakpoint
window.matchMedia('(min-width: 769px)').addEventListener('change', (e) => {
  if (e.matches && mobileMenu?.classList.contains('open')) setMenu(false);
});
