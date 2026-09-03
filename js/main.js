/* ==========================================================================
   main.js — theme switch, back-to-top, contact form, footer year
   ========================================================================== */
(function () {
  "use strict";

  /* ---- Theme ---- */
  const THEME_KEY = "portfolio-theme";
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    toggle.setAttribute("aria-pressed", String(theme === "light"));
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", theme === "light" ? "#f6f8fc" : "#0b0f17");
  };

  let stored;
  try {
    stored = localStorage.getItem(THEME_KEY);
  } catch (e) {
    stored = null;
  }
  applyTheme(stored === "light" || stored === "dark" ? stored : "dark");

  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {
      /* storage unavailable — theme still applies for this session */
    }
  });

  /* ---- Back to top ---- */
  const backToTop = document.getElementById("backToTop");
  const onScroll = () => {
    const show = window.scrollY > window.innerHeight * 0.9;
    backToTop.classList.toggle("is-visible", show);
    backToTop.hidden = !show;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---- Footer year ---- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---- Contact form ----
     No backend: build a mailto: link so the visitor's mail client opens with
     the message pre-filled. The page never claims the message was sent. */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  const RECIPIENT = "kfkayum@gmail.com";

  const setNote = (message, type) => {
    note.textContent = message;
    note.classList.toggle("is-error", type === "error");
    note.classList.toggle("is-success", type === "success");
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = data.get("name").trim();
    const email = data.get("email").trim();
    const subject = data.get("subject").trim();
    const message = data.get("message").trim();

    let invalid = null;
    form.querySelectorAll(".field").forEach((field) => {
      const input = field.querySelector("input, textarea");
      const empty = !input.value.trim();
      const badEmail = input.type === "email" && input.value && !input.checkValidity();
      field.classList.toggle("has-error", empty || badEmail);
      if ((empty || badEmail) && !invalid) invalid = input;
    });

    if (invalid) {
      setNote("Please complete every field with a valid email address.", "error");
      invalid.focus();
      return;
    }

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;

    setNote("Your email client should now open with the message ready to send.", "success");
    form.reset();
  });
})();
