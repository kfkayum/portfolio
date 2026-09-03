/* ==========================================================================
   animations.js — scroll reveal, stat count-up, Dart code typing
   ========================================================================== */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- scroll reveal ---------- */
  /* Arm the hidden state only now that JS is running. */
  document.documentElement.classList.add("anim");

  function show(el) { el.classList.add("is-visible"); }

  function nearViewport(el, margin) {
    var r = el.getBoundingClientRect();
    var h = window.innerHeight || document.documentElement.clientHeight;
    return r.top < h + (margin || 0) && r.bottom > -(margin || 0);
  }

  if (reduce || !("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(show);
  } else {
    var io = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          show(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
    window.__revealObserver = io;

    /* Reveal whatever is already on screen without waiting for the observer. */
    var sweep = function () {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach(function (el) {
        if (nearViewport(el, 80)) { show(el); io.unobserve(el); }
      });
    };
    sweep();
    window.__revealSweep = sweep;
    window.addEventListener("scroll", sweep, { passive: true });
    window.addEventListener("resize", sweep, { passive: true });
    window.addEventListener("load", sweep);

    /* Last-resort safety net: never leave content hidden. */
    setTimeout(function () {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach(show);
    }, 4000);
  }

  /* ---------- stat count-up ---------- */
  function countUp(el) {
    var target = parseFloat(el.dataset.countTo || "0");
    var suffix = el.dataset.suffix || "";
    if (reduce) { el.textContent = target + suffix; return; }
    var dur = 1200;
    var start = performance.now();
    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + (p === 1 ? suffix : "");
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var nums = document.querySelectorAll(".stat-num[data-count-to]");
  if (!("IntersectionObserver" in window)) {
    nums.forEach(countUp);
  } else {
    var numIo = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          countUp(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    nums.forEach(function (n) { numIo.observe(n); });
  }

  /* ---------- Dart code typing ---------- */
  var codeEl = document.getElementById("codeType");
  if (codeEl) {
    var LINES = [
      ['c', "// This site — hand-built, no framework.\n"],
      ['k', "class "], ['t', "MobileExperience"], ['', " {\n"],
      ['', "  final "], ['', "framework = "], ['s', '"Flutter"'], ['', ";\n"],
      ['', "  final "], ['', "platforms = ["], ['s', '"Android"'], ['', ", "], ['s', '"iOS"'], ['', "];\n"],
      ['', "  final "], ['', "years = "], ['', "4"], ['', ";\n\n"],
      ['', "  "], ['t', "Widget"], ['', " build() {\n"],
      ['', "    return "], ['t', "ProductionReadyApp"], ['', "(\n"],
      ['', "      cleanArchitecture: "], ['k', "true"], ['', ",\n"],
      ['', "      shipped: "], ['', "25"], ['', ",\n"],
      ['', "    );\n"],
      ['', "  }\n"],
      ['', "}"]
    ];
    var full = LINES.map(function (p) { return p[1]; }).join("");

    if (reduce) {
      codeEl.innerHTML = LINES.map(function (p) {
        return p[0] ? '<span class="' + p[0] + '">' + esc(p[1]) + "</span>" : esc(p[1]);
      }).join("");
    } else {
      var typed = 0;
      var started = false;
      function render() {
        var out = "";
        var remaining = typed;
        for (var i = 0; i < LINES.length && remaining > 0; i++) {
          var cls = LINES[i][0], txt = LINES[i][1];
          var slice = txt.slice(0, remaining);
          out += cls ? '<span class="' + cls + '">' + esc(slice) + "</span>" : esc(slice);
          remaining -= slice.length;
        }
        codeEl.innerHTML = out;
      }
      function type() {
        if (typed >= full.length) return;
        typed += 1;
        render();
        var ch = full.charAt(typed - 1);
        var delay = ch === "\n" ? 90 : (Math.random() * 22 + 12);
        setTimeout(type, delay);
      }
      var codeIo = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !started) {
            started = true;
            setTimeout(type, 250);
            obs.disconnect();
          }
        });
      }, { threshold: 0.4 });
      codeIo.observe(codeEl.closest(".code-band") || codeEl);
    }
  }

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
})();
