/* ===== Carrossel do Instagram ===== */
(function () {
  var root = document.getElementById('ig-carousel'); if (!root) return;
  var track = root.querySelector('.ig-track'), dots = root.querySelectorAll('.ig-dot'), n = dots.length, cur = 0, t = null, x0 = null;
  var rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function go(i) {
    cur = (i + n) % n; track.style.transform = 'translateX(' + (-100 * cur) + '%)';
    dots.forEach(function (d, k) { d.classList.toggle('is-active', k === cur); d.setAttribute('aria-current', k === cur ? 'true' : 'false'); });
  }
  function stop() { clearInterval(t); t = null; }
  function play() { if (rm || t) return; t = setInterval(function () { go(cur + 1); }, 4500); }
  play();
  dots.forEach(function (d, k) { d.addEventListener('click', function () { go(k); }); });
  root.addEventListener('mouseenter', stop); root.addEventListener('mouseleave', play);
  root.addEventListener('focusin', stop); root.addEventListener('focusout', play);
  root.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; stop(); }, { passive: true });
  root.addEventListener('touchend', function (e) {
    if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1)); play();
  });
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
  var groups = ['.hero-copy > *', '.hero-owner', 'section > .section-title', 'section > .sub', '.ig-layout', '.space-grid img', '.svc', 'blockquote', '.svc-cta', '.visit'];
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
