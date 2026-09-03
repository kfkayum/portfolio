/* ==========================================================================
   main.js — shared bottom-sheet controller, contact triggers, contact form
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Sheet controller (contact + project detail) ---------- */
  var lastFocused = null;
  var openSheet = null;

  function focusables(el) {
    return Array.prototype.slice.call(
      el.querySelectorAll('a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])')
    ).filter(function (n) { return n.offsetParent !== null; });
  }

  function open(sheet) {
    if (openSheet) close();
    lastFocused = document.activeElement;
    sheet.hidden = false;
    document.body.classList.add("no-scroll");
    requestAnimationFrame(function () { sheet.classList.add("is-open"); });
    openSheet = sheet;
    var f = focusables(sheet);
    (sheet.querySelector(".sheet-close") || f[0] || sheet).focus();
  }

  function close() {
    if (!openSheet) return;
    var sheet = openSheet;
    openSheet = null;
    sheet.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    var done = function () {
      sheet.hidden = true;
      sheet.removeEventListener("transitionend", done);
    };
    sheet.addEventListener("transitionend", done);
    setTimeout(done, 500);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  window.Sheet = { open: open, close: close };

  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-open-contact]")) {
      e.preventDefault();
      open(document.getElementById("contactSheet"));
    }
    if (e.target.closest("[data-sheet-close]")) close();
  });

  document.addEventListener("keydown", function (e) {
    if (!openSheet) return;
    if (e.key === "Escape") { close(); return; }
    if (e.key === "Tab") {
      var f = focusables(openSheet);
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- contact form → mailto ---------- */
  var form = document.getElementById("contactForm");
  if (form) {
    var note = document.getElementById("formNote");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements["name"];
      var email = form.elements["email"];
      var message = form.elements["message"];
      var ok = true;

      [name, email, message].forEach(function (input) {
        var valid = input.value.trim() !== "" && input.checkValidity();
        input.closest(".field").classList.toggle("is-invalid", !valid);
        if (!valid) ok = false;
      });

      if (!ok) {
        note.textContent = "Please fill in every field with a valid email address.";
        return;
      }

      var subject = encodeURIComponent("Project enquiry from " + name.value.trim());
      var body = encodeURIComponent(
        message.value.trim() + "\n\n— " + name.value.trim() + "\n" + email.value.trim()
      );
      window.location.href = "mailto:kfkayum@gmail.com?subject=" + subject + "&body=" + body;
      note.textContent = "Opening your email client…";
    });
  }
})();
