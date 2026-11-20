/* SAQ ALJORI landing — small enhancements, page works without JS */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  root.classList.remove('no-js');
  var lang = root.lang === 'en' ? 'en-US' : 'en-US';
  // number formatting 2400 -> 2,400
  d.querySelectorAll('[data-num]').forEach(function (el) {
    var n = parseFloat(el.textContent.replace(/[^\d.]/g, ''));
    if (!isNaN(n)) el.textContent = n.toLocaleString(lang);
  });
  // header style on scroll
  var hdr = d.querySelector('.hdr');
  function onScroll() { if (hdr) hdr.classList.toggle('is-solid', window.scrollY > 40); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  // mobile menu
  var btn = d.getElementById('menuBtn');
  if (btn) btn.addEventListener('click', function () {
    var open = hdr.classList.toggle('menu-open'); btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  d.querySelectorAll('.hdr__nav a').forEach(function (a) { a.addEventListener('click', function () { hdr.classList.remove('menu-open'); }); });
  // reveal on scroll
  var els = d.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }
  // preselect segment in the form
  var sel = d.getElementById('segSelect');
  d.querySelectorAll('[data-seg]').forEach(function (a) { a.addEventListener('click', function () { if (sel) sel.value = a.getAttribute('data-seg'); }); });
  // AJAX form submit (Formspree)
  var form = d.getElementById('leadForm');
  if (form && window.fetch) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var msg = form.querySelector('.form__msg'), b = form.querySelector('button[type=submit]');
    b.disabled = true;
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw 0; form.reset(); msg.className = 'form__msg ok'; msg.textContent = form.dataset.ok; })
      .catch(function () { msg.className = 'form__msg err'; msg.textContent = form.dataset.err; })
      .then(function () { b.disabled = false; });
  });
  var y = d.getElementById('yr'); if (y) y.textContent = new Date().getFullYear();
})();
