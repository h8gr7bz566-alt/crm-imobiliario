/* premium-motion.js — camada de movimento do site público.
   Só adiciona/remova classes visuais. Não toca em dados, eventos ou rotas.
   Se este arquivo falhar ou não carregar, o site continua igual (tudo visível). */
(function () {
  'use strict';
  try {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var hasIO = 'IntersectionObserver' in window;

    /* ── 1. Imagens: fade quando terminam de carregar ─────────── */
    var IMG_SEL = '.icard-img, .iof-card-img img, .selecao-card-img, .carousel-img';
    var seenImg = new WeakSet();
    function prepImg(img) {
      if (seenImg.has(img)) return;
      seenImg.add(img);
      if (img.complete && img.naturalWidth > 0) return; // já carregada: não esconde
      img.classList.add('pm-img-loading');
      var done = function () { img.classList.remove('pm-img-loading'); };
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
      setTimeout(done, 4000); // garantia: nunca fica invisível
    }

    /* ── 2. Revelação ao rolar ───────────────────────────────── */
    var REVEAL_SEL = [
      '.city-carousel-hdr', '.imovel-card-h', '.iof-card', '.ver-todos-btn',
      '.sobre-photo-wrap', '.sobre-text', '.sobre-stats',
      '.dep-card-v2', '.section-title', '.section-eyebrow',
      '.pv2-body-left > *', '.pv2-body-right > *',
      '.footer-v2-top'
    ].join(',');

    var seen = new WeakSet();
    var io = null;
    var batch = [];
    var batchScheduled = false;

    function flush() {
      batchScheduled = false;
      // ordena por posição na tela para o efeito cascata seguir a leitura
      batch.sort(function (a, b) {
        var ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
        return (ra.top - rb.top) || (ra.left - rb.left);
      });
      batch.forEach(function (el, i) {
        el.style.setProperty('--pm-delay', Math.min(i * 60, 300) + 'ms');
        el.classList.add('pm-in');
        setTimeout(function () { el.style.removeProperty('--pm-delay'); }, 1200);
      });
      batch = [];
    }

    function prepReveal(el) {
      if (seen.has(el)) return;
      seen.add(el);
      var r = el.getBoundingClientRect();
      // Já visível na abertura: não esconde (evita “piscar”)
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) return;
      el.classList.add('pm-reveal');
      io.observe(el);
    }

    function scan(root) {
      var scope = root && root.querySelectorAll ? root : document;
      scope.querySelectorAll(IMG_SEL).forEach(prepImg);
      if (io) scope.querySelectorAll(REVEAL_SEL).forEach(prepReveal);
    }

    if (!reduce && hasIO) {
      document.documentElement.classList.add('pm-motion');
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          batch.push(e.target);
        });
        if (batch.length && !batchScheduled) {
          batchScheduled = true;
          requestAnimationFrame(flush);
        }
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    }

    function start() {
      scan(document);
      // Cards são criados depois (vindos da API): observa novos nós
      var pending = false;
      new MutationObserver(function () {
        if (pending) return;
        pending = true;
        requestAnimationFrame(function () { pending = false; scan(document); });
      }).observe(document.body, { childList: true, subtree: true });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start);
    } else {
      start();
    }

    // Segurança: se algo der errado, tudo aparece depois de 5s
    setTimeout(function () {
      document.querySelectorAll('.pm-reveal:not(.pm-in)').forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('pm-in');
      });
    }, 5000);
  } catch (err) {
    document.documentElement.classList.remove('pm-motion');
  }
})();
