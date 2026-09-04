/* ==========================================================================
   theme.js — light (default) / dark toggle
   --------------------------------------------------------------------------
   First visit defaults to light. The choice is only written to localStorage
   once the visitor actually toggles, so changing the default later still
   reaches anyone who never touched the switch.
   ========================================================================== */
(function () {
  "use strict";

  var KEY = "portfolio-theme";
  var DEFAULT = "light";
  var root = document.documentElement;
  var toggles = document.querySelectorAll("#themeToggle, #themeToggleMobile");
  var meta = document.querySelector('meta[name="theme-color"]');

  var THEME_COLORS = { dark: "#08090c", light: "#e9ebf1" };

  function stored() {
    try {
      var t = localStorage.getItem(KEY);
      return t === "light" || t === "dark" ? t : null;
    } catch (e) { return null; }
  }

  function apply(theme, persist) {
    root.setAttribute("data-theme", theme);
    if (meta) meta.setAttribute("content", THEME_COLORS[theme]);
    toggles.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(theme === "light"));
    });
    if (persist) {
      try { localStorage.setItem(KEY, theme); } catch (e) {}
    }
  }

  apply(stored() || DEFAULT, false);

  toggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      apply(next, true);
    });
  });
})();
