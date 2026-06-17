/* ============================================================
   PRISTINE UNISEX SALON — interactions & animations
   ============================================================ */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Preloader ---------- */
  window.addEventListener('load', () => {
    const pre = document.getElementById('preloader');
    if (pre) setTimeout(() => pre.classList.add('is-done'), 1500);
  });

  /* ---------- Year ---------- */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Nav scroll state ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 60) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('is-open');
      navLinks.classList.toggle('is-open');
    });
    navLinks.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        burger.classList.remove('is-open');
        navLinks.classList.remove('is-open');
      })
    );
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-up');
  if ('IntersectionObserver' in window && !prefersReduced) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            // stagger siblings of the same group
            const siblings = Array.from(el.parentElement.children).filter((c) =>
              c.classList.contains('reveal-up') || c.classList.contains('reveal')
            );
            const idx = siblings.indexOf(el);
            el.style.setProperty('--d', Math.min(idx, 6) * 0.08 + 's');
            el.style.transitionDelay = Math.min(idx, 6) * 0.06 + 's';
            el.classList.add('is-visible');
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Counters ---------- */
  const counters = document.querySelectorAll('.counter');
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10) || 0;
          if (prefersReduced) { el.textContent = target; cio.unobserve(el); return; }
          let cur = 0;
          const step = Math.max(1, Math.round(target / 60));
          const tick = () => {
            cur += step;
            if (cur >= target) { el.textContent = target; }
            else { el.textContent = cur; requestAnimationFrame(tick); }
          };
          tick();
          cio.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => cio.observe(c));
  }

  /* ---------- Parallax ---------- */
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (!prefersReduced && parallaxEls.length) {
    let ticking = false;
    const update = () => {
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.2;
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- Custom cursor ---------- */
  const cursor = document.getElementById('cursor');
  const follow = document.getElementById('cursorFollow');
  if (cursor && follow && window.matchMedia('(hover: hover)').matches && !prefersReduced) {
    let mx = 0, my = 0, fx = 0, fy = 0;
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });
    const loop = () => {
      fx += (mx - fx) * 0.15; fy += (my - fy) * 0.15;
      follow.style.transform = `translate(${fx}px, ${fy}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.querySelectorAll('a, button, .service, .product, [data-tilt]').forEach((el) => {
      el.addEventListener('mouseenter', () => follow.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => follow.classList.remove('is-hover'));
    });
  }

  /* ---------- 3D tilt on about images ---------- */
  if (!prefersReduced && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('[data-tilt]').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(800px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) scale(1.02)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- Add-to-bag micro feedback ---------- */
  document.querySelectorAll('.product__add').forEach((btn) => {
    btn.addEventListener('click', () => {
      const orig = btn.textContent;
      btn.textContent = 'Added ✓';
      btn.style.background = 'var(--gold)';
      btn.style.color = '#fff';
      btn.style.borderColor = 'var(--gold)';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
      }, 1400);
    });
  });
})();
