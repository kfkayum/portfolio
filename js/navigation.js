/* ==========================================================================
   navigation.js — scroll-spy, rail + tab-bar active indicators,
   status-bar screen name, smooth in-page navigation
   ========================================================================== */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var railLinks = Array.prototype.slice.call(document.querySelectorAll(".rail-link"));
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  var tabIndicator = document.querySelector(".tabbar-indicator");
  var screenName = document.getElementById("screenName");
  var sections = Array.prototype.slice.call(document.querySelectorAll(".screen"));

  var labelFor = {};
  railLinks.concat(tabs).forEach(function (a) {
    var id = a.getAttribute("href").slice(1);
    if (a.dataset.screen) labelFor[id] = a.dataset.screen;
  });

  /* sections without their own tab-bar entry borrow the nearest one */
  var TAB_FALLBACK = { experience: "skills", services: "skills" };

  /* ---- move the mobile tab-bar indicator ---- */
  function moveTabIndicator(tab) {
    if (!tabIndicator || !tab) return;
    var i = tabs.indexOf(tab);
    tabIndicator.style.transform = "translateX(" + i * 100 + "%)";
  }

  function setActive(id) {
    railLinks.forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
    });

    var tabId = "#" + (TAB_FALLBACK[id] || id);
    var activeTab = null;
    tabs.forEach(function (a) {
      var on = a.getAttribute("href") === tabId;
      a.classList.toggle("is-active", on);
      if (on) activeTab = a;
    });
    if (activeTab) moveTabIndicator(activeTab);

    if (screenName) screenName.textContent = labelFor[id] || "Portfolio";
  }

  /* ---- scroll spy ---- */
  var spy = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach(function (s) { spy.observe(s); });

  /* ---- smooth navigation + brief screen-entrance ---- */
  function go(e) {
    var link = e.currentTarget;
    var href = link.getAttribute("href");
    if (!href || href.charAt(0) !== "#") return;
    var target = document.getElementById(href.slice(1));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", href);

    if (!reduce) {
      target.classList.remove("is-entering");
      void target.offsetWidth;
      target.classList.add("is-entering");
      setTimeout(function () { target.classList.remove("is-entering"); }, 700);
    }
  }
  railLinks.concat(tabs).forEach(function (a) { a.addEventListener("click", go); });

  /* ---- keep the tab indicator aligned after layout changes ---- */
  function realign() {
    moveTabIndicator(document.querySelector(".tab.is-active"));
  }
  window.addEventListener("resize", realign, { passive: true });
  window.addEventListener("load", realign);

  /* initial state from hash or first section */
  var start = (location.hash || "#home").slice(1);
  if (document.getElementById(start)) setActive(start);
  else setActive("home");
  requestAnimationFrame(realign);
})();
