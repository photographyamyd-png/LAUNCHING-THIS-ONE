(function () {
  const siteHeader = document.getElementById('site-header');

  function headerOffset() {
    const root = document.getElementById('pmnav-header-root');
    if (root) return root.offsetHeight;
    if (siteHeader) return siteHeader.offsetHeight;
    const h = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--pmnav-header-height').trim().replace('px', '')
    );
    return Number.isFinite(h) ? h : 0;
  }

  if (siteHeader) {
    function onScroll() {
      siteHeader.classList.toggle('scrolled', window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    function setMegaTop() {
      const bottom = siteHeader.getBoundingClientRect().bottom + window.scrollY;
      document.documentElement.style.setProperty('--gl-mega-top', `${Math.round(bottom)}px`);
    }
    setMegaTop();
    window.addEventListener('resize', setMegaTop, { passive: true });
    window.addEventListener(
      'scroll',
      () => {
        requestAnimationFrame(setMegaTop);
      },
      { passive: true }
    );
  }

  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-overlay');
  const drawerClose = document.getElementById('drawer-close');

  function openDrawer() {
    if (!drawer || !overlay || !hamburger) return;
    closeMega();
    drawer.classList.add('open');
    overlay.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    if (!drawer || !overlay || !hamburger) return;
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => (drawer.classList.contains('open') ? closeDrawer() : openDrawer()));
  }
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);
  if (drawer) drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeDrawer));

  function closeMega() {
    document.querySelectorAll('.gl-nav-mega-wrap.is-open').forEach((w) => {
      w.classList.remove('is-open');
      const btn = w.querySelector('.gl-nav-mega-trigger');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
    document.body.classList.remove('gl-mega-open');
  }

  const megaWrap = document.querySelector('.gl-nav-mega-wrap');
  const megaTrigger = document.getElementById('mega-services-trigger');
  const megaBackdrop = document.getElementById('gl-mega-backdrop');

  if (megaWrap && megaTrigger && window.matchMedia('(hover: none)').matches) {
    megaTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      const open = !megaWrap.classList.contains('is-open');
      if (open) {
        megaWrap.classList.add('is-open');
        megaTrigger.setAttribute('aria-expanded', 'true');
        document.body.classList.add('gl-mega-open');
      } else {
        megaWrap.classList.remove('is-open');
        megaTrigger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('gl-mega-open');
      }
    });
  }

  if (megaBackdrop) {
    megaBackdrop.addEventListener('click', closeMega);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeMega();
    }
  });

  const rotatorLines = document.querySelectorAll('.gl-util-rotator__line');
  if (rotatorLines.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ri = 0;
    setInterval(() => {
      rotatorLines[ri].classList.remove('is-visible');
      ri = (ri + 1) % rotatorLines.length;
      rotatorLines[ri].classList.add('is-visible');
    }, 4800);
  }

  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  const statNums = document.querySelectorAll('.stat-cell__num[data-target]');
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const numSpan = el.querySelector('span:first-child');
          if (!numSpan) return;
          const duration = 1800;
          const startTime = performance.now();
          function updateCount(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            numSpan.textContent = current;
            if (progress < 1) requestAnimationFrame(updateCount);
            else numSpan.textContent = target;
          }
          requestAnimationFrame(updateCount);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );
  statNums.forEach((el) => counterObserver.observe(el));

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset() - 8;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();
