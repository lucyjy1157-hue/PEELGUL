const header = document.querySelector('[data-header]');
const progress = document.querySelector('[data-progress]');
const menuButton = document.querySelector('[data-menu-button]');
const mobileNav = document.querySelector('[data-mobile-nav]');
const toast = document.querySelector('[data-toast]');
const toastClose = document.querySelector('[data-toast-close]');
const galleryImage = document.querySelector('[data-gallery-image]');

const updateScrollUI = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
  header.classList.toggle('is-scrolled', window.scrollY > 24);
};

window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  mobileNav.hidden = open;
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('[data-gallery-src]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-gallery-src]').forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    galleryImage.style.opacity = '0';
    window.setTimeout(() => {
      galleryImage.src = button.dataset.gallerySrc;
      galleryImage.alt = button.dataset.galleryAlt;
      galleryImage.style.opacity = '1';
    }, 160);
  });
});

let toastTimer;
const showToast = () => {
  window.clearTimeout(toastTimer);
  toast.classList.add('is-visible');
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 4200);
};

document.querySelectorAll('[data-purchase]').forEach((button) => button.addEventListener('click', showToast));
toastClose?.addEventListener('click', () => toast.classList.remove('is-visible'));
