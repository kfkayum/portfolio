/* ==========================================================================
   interactions.js — live clock, magnetic buttons, hero parallax,
   timeline expand/collapse, tech-stack rendering, contact sheet
   ========================================================================== */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---------- live status-bar clock ---------- */
  var clocks = [document.getElementById("clock"), document.getElementById("phoneClock")];
  function tickClock() {
    var d = new Date();
    var h = d.getHours() % 12 || 12;
    var m = String(d.getMinutes()).padStart(2, "0");
    var txt = h + ":" + m;
    clocks.forEach(function (c) { if (c) c.textContent = txt; });
  }
  tickClock();
  setInterval(tickClock, 15000);

  /* ---------- magnetic buttons ---------- */
  if (finePointer && !reduce) {
    document.querySelectorAll("[data-magnetic]").forEach(function (btn) {
      var strength = 0.35;
      btn.addEventListener("pointermove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * strength;
        var y = (e.clientY - r.top - r.height / 2) * strength;
        btn.style.transform = "translate(" + x + "px," + y + "px)";
      });
      btn.addEventListener("pointerleave", function () {
        btn.style.transform = "";
      });
    });
  }

  /* ---------- hero parallax ---------- */
  var stage = document.getElementById("homeStage");
  if (stage && finePointer && !reduce) {
    var layers = stage.querySelectorAll("[data-parallax]");
    var raf = null;
    stage.addEventListener("pointermove", function (e) {
      var r = stage.getBoundingClientRect();
      var dx = (e.clientX - r.left - r.width / 2) / r.width;
      var dy = (e.clientY - r.top - r.height / 2) / r.height;
      if (raf) return;
      raf = requestAnimationFrame(function () {
        layers.forEach(function (el) {
          var depth = parseFloat(el.dataset.parallax) || 6;
          el.style.transform =
            "translate3d(" + (-dx * depth).toFixed(2) + "px," + (-dy * depth).toFixed(2) + "px,0)";
        });
        raf = null;
      });
    });
    stage.addEventListener("pointerleave", function () {
      layers.forEach(function (el) { el.style.transform = ""; });
    });
  }

  /* ---------- timeline expand / collapse ---------- */
  var timeline = document.getElementById("timeline");
  if (timeline) {
    timeline.addEventListener("click", function (e) {
      var btn = e.target.closest(".tl-toggle");
      if (!btn) return;
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
    });
  }

  /* ---------- tech stack ---------- */
  var STACK = [
    {
      ic: "M", title: "Mobile Development",
      items: [
        ["Flutter", "Primary framework — every shipped app is built with it."],
        ["Dart", "Day-to-day language for all app logic and UI."],
        ["Android", "Native builds, Play Console releases and signing."],
        ["iOS", "App Store Connect builds, provisioning and review."],
        ["C", null]
      ]
    },
    {
      ic: "A", title: "Architecture",
      items: [
        ["MVC", null], ["MVVM", null],
        ["GetX CLI structure", "Feature-first project layout with bindings and routing."],
        ["OOP", null], ["Functional programming", null]
      ]
    },
    {
      ic: "S", title: "State Management",
      items: [
        ["GetX", "Reactive state, DI and routing in one — my default."],
        ["BLoC", "Event-driven state for larger, testable feature flows."],
        ["Provider", null]
      ]
    },
    {
      ic: "B", title: "Backend & APIs",
      items: [
        ["RESTful APIs", "Typed data layers, auth flows and error handling."],
        ["Firebase Firestore", null],
        ["Realtime Database", null],
        ["Push Notifications", "FCM setup, topics and deep-linked payloads."],
        ["Payment Gateways", "Multiple gateway integrations across products."],
        ["Google Maps", "Maps, markers and nearby-search integrations."]
      ]
    },
    {
      ic: "D", title: "Databases & Storage",
      items: [
        ["Firebase", null], ["MySQL", null],
        ["SQLite (sqflite)", "Offline-first local persistence."],
        ["Hive", "Lightweight key-value storage for app state."]
      ]
    },
    {
      ic: "T", title: "Tools & Publishing",
      items: [
        ["Git", null], ["VS Code", null], ["Android Studio", null],
        ["Play Console", null], ["App Store Connect", null],
        ["macOS / Linux", null]
      ]
    }
  ];

  var stackGrid = document.getElementById("stackGrid");
  if (stackGrid) {
    var note = document.createElement("p");
    note.className = "stack-note";
    note.hidden = true;

    STACK.forEach(function (group) {
      var card = document.createElement("article");
      card.className = "stack-card reveal";
      card.innerHTML =
        '<div class="stack-card-head"><span class="stack-card-ic">' + group.ic +
        '</span><h3 class="stack-card-title">' + group.title + "</h3></div>" +
        '<div class="stack-chips">' +
        group.items.map(function (it) {
          return '<button type="button" class="stack-chip"' +
            (it[1] ? ' data-note="' + it[1].replace(/"/g, "&quot;") + '" data-name="' + it[0] + '"' : "") +
            (it[1] ? "" : " tabindex=\"-1\"") +
            ">" + it[0] + "</button>";
        }).join("") +
        "</div>";
      stackGrid.appendChild(card);
      if (window.__revealObserver) window.__revealObserver.observe(card);
      else card.classList.add("is-visible");
    });
    stackGrid.appendChild(note);
    if (window.__revealSweep) window.__revealSweep();

    stackGrid.addEventListener("click", function (e) {
      var chip = e.target.closest(".stack-chip[data-note]");
      var openChip = stackGrid.querySelector(".stack-chip.is-open");
      if (openChip && openChip !== chip) openChip.classList.remove("is-open");

      if (!chip) { note.hidden = true; return; }
      if (chip.classList.contains("is-open")) {
        chip.classList.remove("is-open");
        note.hidden = true;
        return;
      }
      chip.classList.add("is-open");
      note.innerHTML = "<b>" + chip.dataset.name + "</b> — " + chip.dataset.note;
      note.hidden = false;
      /* place the note right after the chip's card */
      var card = chip.closest(".stack-card");
      card.after(note);
    });
  }

  /* ---------- year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
