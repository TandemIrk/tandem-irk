
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Mobile navigation
  const toggle = document.querySelector('.menu-toggle');
  const mobile = document.querySelector('.mobile-menu');
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      const open = mobile.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.classList.toggle('open', open);
    });
    mobile.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobile.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded','false');
      });
    });
  }

  // Smooth in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior: reduced ? 'auto' : 'smooth', block:'start'});
      }
    });
  });

  // Soft scroll reveals — restrained, not noisy.
  const revealItems = document.querySelectorAll('.card,.panel,.work,.step,.band-item,.contact-card');
  if (!reduced && 'IntersectionObserver' in window) {
    revealItems.forEach(el => el.classList.add('reveal-ready'));
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, {threshold:.08, rootMargin:'0px 0px -30px'});
    revealItems.forEach(el => io.observe(el));
  }

  // Very light depth effect on the hero visual.
  const hero = document.querySelector('#heroVisual');
  if (hero && !reduced) {
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width-.5;
      const y = (e.clientY-r.top)/r.height-.5;
      hero.style.transform = `perspective(1100px) rotateX(${(-y*1.7).toFixed(2)}deg) rotateY(${(x*1.7).toFixed(2)}deg)`;
    });
    hero.addEventListener('pointerleave', () => hero.style.transform = '');
  }
})();
