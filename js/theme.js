/* ==========================================================================
   theme.js — dark (default) / light toggle, persisted to localStorage
   ========================================================================== */
(function () {
  "use strict";

  var KEY = "portfolio-theme";
  var root = document.documentElement;
  var toggles = document.querySelectorAll("#themeToggle, #themeToggleMobile");
  var meta = document.querySelector('meta[name="theme-color"]');

  var THEME_COLORS = { dark: "#08090c", light: "#e9ebf1" };

  function current() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    if (meta) meta.setAttribute("content", THEME_COLORS[theme]);
    toggles.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(theme === "light"));
    });
    try { localStorage.setItem(KEY, theme); } catch (e) {}
  }

  apply(current());

  toggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      apply(current() === "light" ? "dark" : "light");
    });
  });
})();
