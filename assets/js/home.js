/* Homepage interactions: greeting, scroll-driven curtain and timeline, test library, card pile. */
(function () {
  'use strict';

  // Greeting by local time
  var greet = document.querySelector('[data-x-greet]');
  if (greet) {
    var h = new Date().getHours();
    greet.textContent = h < 5 ? 'Still up? So is Bruno.'
      : h < 12 ? 'Good morning, early bird.'
      : h < 17 ? 'Good afternoon. Bruno is napping.'
      : h < 21 ? 'Good evening. Almost walk time.'
      : 'Still up? So is Bruno.';
  }

  // Scroll progress drives --p (opening curtain) and --e (website timeline)
  var intro = document.querySelector('[data-x-intro]');
  var evo = document.querySelector('[data-x-evo]');
  var cur = { i: 0, e: 0 }, tgt = { i: 0, e: 0 }, raf = null;
  function prog(el) {
    if (!el) return 0;
    var r = el.getBoundingClientRect(), span = r.height - window.innerHeight;
    return span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
  }
  function measure() {
    tgt.i = Math.min(1, Math.max(0, (prog(intro) - 0.02) / 0.78));
    tgt.e = prog(evo);
  }
  function loop() {
    var moving = false;
    ['i', 'e'].forEach(function (k) {
      var d = tgt[k] - cur[k];
      if (Math.abs(d) > 0.0004) { cur[k] += d * 0.085; moving = true; } else { cur[k] = tgt[k]; }
    });
    if (intro) intro.style.setProperty('--p', cur.i.toFixed(4));
    if (evo) evo.style.setProperty('--e', cur.e.toFixed(4));
    raf = moving ? requestAnimationFrame(loop) : null;
  }
  function onScroll() { measure(); if (!raf) raf = requestAnimationFrame(loop); }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  // Test library: filter chips, list, detail card (cards are pre-rendered <template>s)
  var chips = Array.prototype.slice.call(document.querySelectorAll('.filters .fchip'));
  var items = Array.prototype.slice.call(document.querySelectorAll('.lib-list .li'));
  var detail = document.querySelector('.lib-detail');
  var results = items.map(function (li) { var s = li.querySelector('.stamp-s'); return s ? s.textContent.trim() : ''; });
  var sel = 0;
  function select(i) {
    sel = i;
    items.forEach(function (li, k) {
      li.classList.toggle('on', k === i);
      li.setAttribute('aria-pressed', k === i ? 'true' : 'false');
    });
    var tpl = document.getElementById('x-card-' + i);
    if (tpl && detail) detail.innerHTML = tpl.innerHTML;
  }
  items.forEach(function (li, k) { li.addEventListener('click', function () { select(k); }); });
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var name = chip.childNodes[0].textContent.trim();
      chips.forEach(function (c) {
        var on = c === chip;
        c.classList.toggle('on', on);
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      var first = -1;
      items.forEach(function (li, k) {
        var show = name === 'All' || results[k] === name;
        li.hidden = !show;
        if (show && first < 0) first = k;
      });
      if (items[sel] && items[sel].hidden && first >= 0) select(first);
    });
  });

  // "Where the eye comes from" pile: shuffle and tidy
  var figs = Array.prototype.slice.call(document.querySelectorAll('.pile > figure'));
  var ctl = Array.prototype.slice.call(document.querySelectorAll('.pile-ctl button'));
  function rnd(a, b) { return Math.round(Math.random() * (b - a) + a); }
  ctl.forEach(function (btn) {
    var label = btn.textContent.trim().toLowerCase();
    btn.addEventListener('click', function () {
      if (label.indexOf('tidy') === 0) {
        figs.forEach(function (f, k) { f.style.order = k; f.style.transform = 'none'; });
        return;
      }
      var o = figs.map(function (_, k) { return k; });
      for (var i = o.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = o[i]; o[i] = o[j]; o[j] = t; }
      figs.forEach(function (f, k) {
        f.style.order = o[k];
        f.style.transform = 'rotate(' + rnd(-6, 6) + 'deg) translateY(' + rnd(-12, 24) + 'px)';
      });
    });
  });
})();
