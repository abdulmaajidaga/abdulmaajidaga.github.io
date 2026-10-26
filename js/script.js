// ---------------------------------------------------------------
// Mobile nav toggle
// ---------------------------------------------------------------
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

function closeNav() {
  primaryNav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open menu');
}

function openNav() {
  primaryNav.classList.add('is-open');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.setAttribute('aria-label', 'Close menu');
}

navToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.contains('is-open');
  isOpen ? closeNav() : openNav();
});

// Close the mobile menu after a nav link is tapped
primaryNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeNav);
});

// Close on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNav();
});

// ---------------------------------------------------------------
// Highlight the nav link for the section currently in view
// ---------------------------------------------------------------
const sections = document.querySelectorAll('main section[id], footer[id]');
const navLinks = document.querySelectorAll('.primary-nav a[href^="#"]');

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}
