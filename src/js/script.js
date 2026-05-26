/* =====================================================
   VITOR DEV — Vanilla JS interactions
   Menu toggle · smooth scroll · scroll reveal · header hide
   ===================================================== */

(function () {
  'use strict';

  /* ---------- Theme toggle (dark default, persisted) ---------- */
  const root = document.documentElement;
  const saved = localStorage.getItem('vd-theme') || 'dark';
  root.setAttribute('data-theme', saved);
  const themeBtn = document.getElementById('themeToggle');
  themeBtn && themeBtn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('vd-theme', next);
  });

  /* ---------- Menu open / close ---------- */
  const overlay = document.getElementById('menuOverlay');
  const openBtn = document.getElementById('menuOpen');
  const closeBtn = document.getElementById('menuClose');

  const openMenu = () => {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openBtn && openBtn.addEventListener('click', openMenu);
  closeBtn && closeBtn.addEventListener('click', closeMenu);

  // Close when any element with [data-close] is clicked
  document.querySelectorAll('[data-close]').forEach((el) => {
    el.addEventListener('click', closeMenu);
  });

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ---------- Hide sticky header on scroll down ---------- */
  const header = document.getElementById('siteHeader');
  let lastY = window.scrollY;
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      if (!header) return;
      if (y > 120 && y > lastY) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }
      lastY = y;
    },
    { passive: true }
  );

  /* ---------- Button micro-interaction (ripple-style press) ---------- */
  document.querySelectorAll('.btn, .cta-pill, .floating-cta').forEach((btn) => {
    btn.addEventListener('pointerdown', () => {
      btn.style.transform = 'translateY(1px) scale(.98)';
    });
    btn.addEventListener('pointerup', () => {
      btn.style.transform = '';
    });
    btn.addEventListener('pointerleave', () => {
      btn.style.transform = '';
    });
  });

  /* ---------- Footer year ---------- */
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
