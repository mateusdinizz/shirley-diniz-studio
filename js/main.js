/* ===== Carrosséis (Nosso trabalho e Nosso espaço) ===== */
(function () {
  var rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.ig-carousel').forEach(function (root) {
    var track = root.querySelector('.ig-track'), dots = root.querySelectorAll('.ig-dot'), btn = root.querySelector('.ig-pause');
    var n = dots.length, cur = 0, t = null, x0 = null, userPaused = false;
    function go(i) {
      cur = (i + n) % n; track.style.transform = 'translateX(' + (-100 * cur) + '%)';
      dots.forEach(function (d, k) { d.classList.toggle('is-active', k === cur); d.setAttribute('aria-current', k === cur ? 'true' : 'false'); });
    }
    function stop() { clearInterval(t); t = null; }
    function play() { if (rm || userPaused || t) return; t = setInterval(function () { go(cur + 1); }, 3000); }
    dots.forEach(function (d, k) { d.addEventListener('click', function () { go(k); }); });
    if (btn) {
      if (rm) { btn.hidden = true; }
      else btn.addEventListener('click', function () {
        userPaused = !userPaused;
        btn.setAttribute('aria-pressed', String(userPaused));
        btn.setAttribute('aria-label', userPaused ? 'Retomar rotação' : 'Pausar rotação');
        if (userPaused) stop(); else play();
      });
    }
    play();
    root.addEventListener('mouseenter', stop); root.addEventListener('mouseleave', play);
    root.addEventListener('focusin', stop); root.addEventListener('focusout', play);
    root.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; stop(); }, { passive: true });
    root.addEventListener('touchend', function (e) {
      if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1)); play();
    });
  });
})();

/* ===== Mapa carregado automaticamente quando a seção se aproxima da tela ===== */
(function () {
  var box = document.querySelector('.map[data-map-src]'); if (!box) return;
  var done = false;
  function load() {
    if (done) return; done = true;
    var f = document.createElement('iframe');
    f.title = box.getAttribute('data-map-title'); f.src = box.getAttribute('data-map-src');
    f.referrerPolicy = 'no-referrer-when-downgrade'; f.allowFullscreen = true;
    box.replaceChildren(f);
  }
  if (!('IntersectionObserver' in window)) { load(); return; }
  var io = new IntersectionObserver(function (es) {
    if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); load(); }
  }, { rootMargin: '400px 0px' });
  io.observe(box);
})();

/* ===== Movimento: entrada ao rolar, menu ativo e botão flutuante ===== */
(function () {
  var rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fab = document.querySelector('.fab');
  if (fab) {
    fab.classList.add('fab-auto');
    var onScroll = function () { fab.classList.toggle('show', window.scrollY > 500); };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
  var links = document.querySelectorAll('nav a[href^="#"]');
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.setAttribute('aria-current', a.getAttribute('href') === '#' + e.target.id ? 'true' : 'false'); });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('main > section[id]').forEach(function (s) { spy.observe(s); });
  }
  if (rm || !('IntersectionObserver' in window)) return;
  document.querySelectorAll('.svc-icon *').forEach(function (n) { n.setAttribute('pathLength', '1'); });
  var groups = ['.hero-copy > *', '.hero-owner', 'section > .section-title', 'section > .sub', '.ig-layout', '.work-gallery li', '.work-cta', '.svc-cat', '.about-grid .section-title', '.about-grid .sub', '.review', '.shirley-col .ig-carousel', '.svc-cta', '.visit', '.faq'];
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in'); io.unobserve(e.target);
      setTimeout(function () { e.target.classList.add('done'); }, 2000);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  groups.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el, i) {
      el.classList.add('rv');
      el.style.setProperty('--d', Math.min(i, 5) * 0.09 + 's');
      io.observe(el);
    });
  });
})();

/* ===== Menu hambúrguer no celular ===== */
(function () {
  var header = document.querySelector('header'); var nav = header && header.querySelector('nav');
  if (!header || !nav) return;
  var pill = header.querySelector('.btn-pill');
  var btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'nav-toggle';
  btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-label', 'Abrir menu');
  btn.innerHTML = '<span class="nav-bars" aria-hidden="true"></span>';
  if (!nav.id) nav.id = 'menu-principal';
  btn.setAttribute('aria-controls', nav.id);
  header.insertBefore(btn, pill ? pill.nextSibling : nav);
  header.classList.add('js-nav');
  function set(open) {
    header.classList.toggle('nav-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }
  btn.addEventListener('click', function () { set(!header.classList.contains('nav-open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && header.classList.contains('nav-open')) { set(false); btn.focus(); } });
  document.addEventListener('click', function (e) { if (header.classList.contains('nav-open') && !header.contains(e.target)) set(false); });
  matchMedia('(min-width: 761px)').addEventListener('change', function (m) { if (m.matches) set(false); });
})();