/* Experiment library: section and result filters, lightbox with prev/next and keyboard. */
(function () {
  'use strict';
  var root = document.querySelector('[data-x-root]');
  if (!root) return;
  var sec = 'all', res = null, idx = 0, total = root.querySelectorAll('.lbp').length || 39;
  function q(s) { return root.querySelector(s); }
  function qa(s) { return Array.prototype.slice.call(root.querySelectorAll(s)); }
  function apply() {
    qa('.ec').forEach(function (c) {
      var ok = (sec === 'all' || c.dataset.sec === sec) && (!res || c.dataset.res === res);
      c.classList.toggle('hide', !ok);
    });
  }
  function show(i) {
    idx = Math.max(0, Math.min(total - 1, i));
    qa('.lbp').forEach(function (p) { p.classList.toggle('on', Number(p.dataset.i) === idx); });
    var pv = q('.lb-prev'), nx = q('.lb-next'), ct = q('.lb-count');
    if (pv) pv.disabled = idx === 0;
    if (nx) nx.disabled = idx === total - 1;
    if (ct) ct.textContent = (idx + 1) + ' / ' + total;
    var p = q('.lbp.on .lb-content'); if (p) p.scrollTop = 0;
    var im = q('.lbp.on .lb-img'); if (im) im.scrollTop = 0;
  }
  function open(i) { var o = q('.lbo'); if (!o) return; show(i); o.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function close() { var o = q('.lbo'); if (o) o.classList.remove('open'); document.body.style.overflow = ''; }
  function isOpen() { var o = q('.lbo'); return !!(o && o.classList.contains('open')); }
  document.addEventListener('click', function (ev) {
    if (!root.contains(ev.target)) return;
    var t = ev.target;
    var f = t.closest('.fbtn');
    if (f) { qa('.fbtn').forEach(function (b) { b.classList.remove('on'); }); f.classList.add('on'); sec = f.dataset.sec; apply(); return; }
    var r = t.closest('.rbtn');
    if (r) {
      if (r.classList.contains('on')) { r.classList.remove('on'); res = null; }
      else { qa('.rbtn').forEach(function (b) { b.classList.remove('on'); }); r.classList.add('on'); res = r.dataset.res; }
      apply(); return;
    }
    var c = t.closest('.ec');
    if (c) { open(Number(c.dataset.i)); return; }
    if (t.closest('.lb-x')) { close(); return; }
    if (t.closest('.lb-prev')) { show(idx - 1); return; }
    if (t.closest('.lb-next')) { show(idx + 1); return; }
    if (t.classList && t.classList.contains('lbo')) close();
  });
  document.addEventListener('keydown', function (ev) {
    if (!isOpen()) return;
    if (ev.key === 'Escape') close();
    else if (ev.key === 'ArrowLeft') show(idx - 1);
    else if (ev.key === 'ArrowRight') show(idx + 1);
  });
})();
