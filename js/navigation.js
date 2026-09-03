/* ==========================================================================
   navigation.js — sticky header, mobile menu, active section highlighting
   ========================================================================== */
(function () {
  "use strict";

  const header = document.getElementById("siteHeader");
  const nav = document.getElementById("primaryNav");
  const toggle = document.getElementById("navToggle");
  const scrim = document.getElementById("navScrim");
  const links = Array.from(document.querySelectorAll(".nav-link"));

  /* ---- Sticky header shadow on scroll ---- */
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile menu ---- */
  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    scrim.hidden = !open;
    document.body.classList.toggle("no-scroll", open);
  };

  toggle.addEventListener("click", () => {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  scrim.addEventListener("click", () => setMenu(false));

  links.forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024 && nav.classList.contains("is-open")) setMenu(false);
  });

  /* ---- Active section highlighting ---- */
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach((link) =>
          link.classList.toggle("is-active", link.getAttribute("href") === "#" + id)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((section) => spy.observe(section));
})();
