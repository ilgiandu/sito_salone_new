const btn = document.querySelector('.menu-btn');
const menu = document.querySelector('.mobile-menu');
const backToTop = document.querySelector('.back-to-top');
const counter = document.querySelector('.count-up');
const statsSection = document.querySelector('.stats-section');
const aboutToggle = document.querySelector('.about-toggle');
const aboutMore = document.querySelector('#about-more');

if (btn && menu) {
  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isOpen));
    menu.hidden = isOpen;
    document.body.classList.toggle('menu-open', !isOpen);
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      btn.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
      document.body.classList.remove('menu-open');
    });
  });
}

if (backToTop) {
  const toggleBackToTop = () => {
    const threshold = window.innerHeight * 0.5;
    backToTop.classList.toggle('show', window.scrollY > threshold);
  };

  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  window.addEventListener('load', toggleBackToTop);

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

if (counter && statsSection) {
  const target = parseInt(counter.dataset.target || '100', 10);
  const duration = 2200;
  let started = false;

  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

  const animate = () => {
    const start = performance.now();

    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      counter.textContent = Math.round(easeOutCubic(progress) * target) + '%';
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        animate();
        observer.disconnect();
      }
    });
  }, { threshold: 0.35 });

  observer.observe(statsSection);
}

if (aboutToggle && aboutMore) {
  aboutToggle.addEventListener('click', () => {
    const expanded = aboutToggle.getAttribute('aria-expanded') === 'true';
    aboutToggle.setAttribute('aria-expanded', String(!expanded));
    aboutMore.hidden = expanded;
    aboutToggle.textContent = expanded ? 'Altro' : 'Meno';
  });
}