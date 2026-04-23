/**
 * GLC portable mega nav — scroll, dual megas, backdrop, mobile drawer.
 * Sets --pmnav-header-height on #pmnav and :root (hero padding in glc-base.css).
 */
(function () {
  const nav = document.getElementById('pmnav');
  const headerRoot = document.getElementById('pmnav-header-root');
  const megaPrimary = document.getElementById('pmnav-mega-primary');
  const megaSecondary = document.getElementById('pmnav-mega-secondary');
  const backdrop = document.getElementById('pmnav-backdrop');
  const trigPrimary = document.getElementById('pmnav-trigger-primary');
  const trigSecondary = document.getElementById('pmnav-trigger-secondary');
  const mobileToggle = document.getElementById('pmnav-mobile-toggle');
  const mobileDrawer = document.getElementById('pmnav-mobile-drawer');
  const mobileOverlay = document.getElementById('pmnav-mobile-overlay');
  const mobileClose = document.getElementById('pmnav-mobile-close');

  function scrollThresholdPx() {
    const raw = getComputedStyle(document.documentElement).getPropertyValue('--pmnav-scroll-threshold-px').trim();
    const n = parseInt(raw, 10);
    return Number.isFinite(n) ? n : 40;
  }

  function setHeaderHeight() {
    if (!nav || !headerRoot) return;
    const h = `${headerRoot.offsetHeight}px`;
    nav.style.setProperty('--pmnav-header-height', h);
    document.documentElement.style.setProperty('--pmnav-header-height', h);
  }

  function updateScrolled() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > scrollThresholdPx());
    requestAnimationFrame(setHeaderHeight);
  }

  window.addEventListener('scroll', updateScrolled, { passive: true });
  window.addEventListener('resize', () => {
    requestAnimationFrame(setHeaderHeight);
    if (window.innerWidth < 768) closeAllMegas();
  });
  updateScrolled();
  setHeaderHeight();
  if (headerRoot && typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(() => setHeaderHeight()).observe(headerRoot);
  }

  let activeMega = null;

  function closeAllMegas() {
    activeMega = null;
    if (megaPrimary) {
      megaPrimary.classList.remove('is-visible');
      megaPrimary.setAttribute('aria-hidden', 'true');
    }
    if (megaSecondary) {
      megaSecondary.classList.remove('is-visible');
      megaSecondary.setAttribute('aria-hidden', 'true');
    }
    if (backdrop) {
      backdrop.classList.remove('is-visible');
      backdrop.setAttribute('aria-hidden', 'true');
    }
    [trigPrimary, trigSecondary].forEach((t) => {
      if (!t) return;
      t.setAttribute('aria-expanded', 'false');
      t.classList.remove('is-active');
      const ch = t.querySelector('.pmnav-header__nav-chevron');
      if (ch) ch.classList.remove('is-open');
    });
  }

  function openMega(which) {
    if (window.innerWidth < 768) return;
    const isPrimary = which === 'primary';
    const nextActive = isPrimary ? 'primary' : 'secondary';
    closeAllMegas();
    activeMega = nextActive;
    const panel = isPrimary ? megaPrimary : megaSecondary;
    const trig = isPrimary ? trigPrimary : trigSecondary;
    const other = isPrimary ? trigSecondary : trigPrimary;
    if (other) {
      other.setAttribute('aria-expanded', 'false');
      other.classList.remove('is-active');
      const och = other.querySelector('.pmnav-header__nav-chevron');
      if (och) och.classList.remove('is-open');
    }
    if (panel) {
      panel.classList.add('is-visible');
      panel.setAttribute('aria-hidden', 'false');
    }
    if (backdrop) {
      backdrop.classList.add('is-visible');
      backdrop.setAttribute('aria-hidden', 'false');
    }
    if (trig) {
      trig.setAttribute('aria-expanded', 'true');
      trig.classList.add('is-active');
      const ch = trig.querySelector('.pmnav-header__nav-chevron');
      if (ch) ch.classList.add('is-open');
    }
  }

  function toggleMega(which) {
    if (window.innerWidth < 768) return;
    const next = which === 'primary' ? 'primary' : 'secondary';
    if (activeMega === next) closeAllMegas();
    else openMega(which);
  }

  if (trigPrimary) {
    trigPrimary.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleMega('primary');
    });
  }
  if (trigSecondary) {
    trigSecondary.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleMega('secondary');
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => closeAllMegas());
  }

  document.addEventListener('click', (e) => {
    if (!activeMega || window.innerWidth < 768) return;
    if (!e.target.closest('#pmnav')) closeAllMegas();
  });

  if (nav) {
    nav
      .querySelectorAll('.pmnav-header__logo, .pmnav-header__cta-wrap a, .pmnav-header__nav-main > a.pmnav-header__nav-link')
      .forEach((el) => {
        el.addEventListener('click', () => closeAllMegas());
      });
  }

  document.querySelectorAll('.pmnav-mega-close-link').forEach((a) => {
    a.addEventListener('click', () => closeAllMegas());
  });

  function openMobileDrawer() {
    if (!mobileDrawer || !mobileOverlay || !mobileToggle) return;
    mobileDrawer.classList.add('is-open');
    mobileOverlay.classList.add('is-open');
    document.body.classList.add('pmnav-drawer-open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileOverlay.setAttribute('aria-hidden', 'false');
  }

  function closeMobileDrawer() {
    if (!mobileDrawer || !mobileOverlay || !mobileToggle) return;
    mobileDrawer.classList.remove('is-open');
    mobileOverlay.classList.remove('is-open');
    document.body.classList.remove('pmnav-drawer-open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileOverlay.setAttribute('aria-hidden', 'true');
  }

  if (mobileToggle && mobileDrawer && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('is-open')) closeMobileDrawer();
      else openMobileDrawer();
    });
    mobileOverlay.addEventListener('click', () => closeMobileDrawer());
    if (mobileClose) mobileClose.addEventListener('click', () => closeMobileDrawer());
    mobileDrawer.querySelectorAll('.pmnav-drawer-close').forEach((el) => {
      el.addEventListener('click', () => closeMobileDrawer());
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (mobileDrawer && mobileDrawer.classList.contains('is-open')) closeMobileDrawer();
    else closeAllMegas();
  });

  document.querySelectorAll('.pmnav-drawer-accordion').forEach((acc) => {
    const btn = acc.querySelector('.pmnav-mobile-drawer__accordion-toggle');
    const panel = acc.querySelector('.pmnav-mobile-drawer__sub');
    if (!btn || !panel) return;
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      btn.classList.toggle('is-open', !open);
      panel.hidden = open;
    });
  });
})();
