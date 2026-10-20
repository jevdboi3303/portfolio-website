// Scroll reveal
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

// Nav pill active state
const workTab = document.querySelector('[data-section="work"]');
const aboutTab = document.querySelector('[data-section="about"]');
const aboutSection = document.getElementById('about');

function updateNavActive() {
  if (!aboutSection) return;
  const aboutTop = aboutSection.getBoundingClientRect().top;
  if (aboutTop <= 100) {
    workTab?.classList.remove('active');
    aboutTab?.classList.add('active');
  } else {
    workTab?.classList.add('active');
    aboutTab?.classList.remove('active');
  }
}

window.addEventListener('scroll', updateNavActive, { passive: true });

// Mobile burger menu
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');

burger?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileMenu?.querySelectorAll('.mobile-link').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});
