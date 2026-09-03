/* ==========================================================================
   projects.js — project data, card rendering, filtering, details modal
   --------------------------------------------------------------------------
   Store URLs are not published on the CV. Fill in `links` per project when
   available (CodeCanyon / Google Play / App Store); null links are not shown.
   ========================================================================== */
(function () {
  "use strict";

  const PROJECTS = [
    {
      id: "workzen",
      name: "WorkZen",
      tagline: "HRM & Payroll Management System",
      description:
        "A modern HRM platform that replaces spreadsheet-based workflows, streamlining people management and daily operations for growing teams.",
      role: "End-to-end Flutter development — architecture, UI/UX, build and store deployment.",
      platforms: ["Android", "iOS"],
      categories: ["flutter", "android", "ios", "firebase", "api"],
      tech: ["Flutter", "Dart", "Firebase", "Fingerprint Auth", "Push Notifications", "REST API", "Payment Gateways"],
      features: [
        "Fingerprint-authenticated attendance",
        "Payroll and people management",
        "Multi-gateway payment support",
        "Push notifications for approvals and updates",
        "Admin dashboard for daily operations",
      ],
      links: { codecanyon: null, playStore: null, appStore: null },
    },
    {
      id: "invoicex",
      name: "InvoiceX",
      tagline: "Billing & Invoice Management System",
      description:
        "A full-featured invoicing application that lets businesses generate, track and manage invoices and payments with multi-gateway support.",
      role: "End-to-end Flutter development — architecture, UI/UX, build and store deployment.",
      platforms: ["Android", "iOS"],
      categories: ["flutter", "android", "ios", "firebase", "api"],
      tech: ["Flutter", "Dart", "Firebase", "ML Features", "Push Notifications", "REST API", "Payment Gateways"],
      features: [
        "Invoice generation and tracking",
        "Payment management with multiple gateways",
        "ML-assisted data entry features",
        "Firebase-backed sync and storage",
        "Push notifications for payment events",
      ],
      links: { codecanyon: null, playStore: null, appStore: null },
    },
    {
      id: "tribu",
      name: "Tribu",
      tagline: "Club & Committee Management App",
      description:
        "A club and committee management platform for membership-based organisations — member and role management, QR-code meeting attendance, news and awards, plus a full admin dashboard with reporting.",
      role: "End-to-end Flutter development across Web, Android and iOS.",
      platforms: ["Web", "Android", "iOS"],
      categories: ["flutter", "android", "ios", "api"],
      tech: ["Flutter", "Role-Based Access Control", "QR Code Attendance", "PayPal", "Push Notifications", "REST API"],
      features: [
        "Member and role management (RBAC)",
        "QR-code meeting attendance",
        "News and awards modules",
        "PayPal payment integration",
        "Admin dashboard with reporting",
      ],
      links: { codecanyon: null, playStore: null, appStore: null },
    },
    {
      id: "dutch-flow",
      name: "Dutch Flow",
      tagline: "Tutorial & Fitness Training App",
      description:
        "A tutorial and fitness training platform delivering structured video courses, with live video streaming, in-app purchases and course purchase flows.",
      role: "End-to-end Flutter development — architecture, UI/UX, build and store deployment.",
      platforms: ["Android", "iOS"],
      categories: ["flutter", "android", "ios", "api"],
      tech: ["Flutter", "Dart", "Video Streaming", "In-App Purchases", "Course Purchase Flow", "REST API"],
      features: [
        "Structured video course delivery",
        "Live video streaming",
        "In-app purchases",
        "Course purchase flow",
        "REST API-driven content",
      ],
      links: { codecanyon: null, playStore: null, appStore: null },
    },
    {
      id: "uk-passport-photo",
      name: "UK Passport Photo App",
      tagline: "Compliant Passport Photo Editor",
      description:
        "A photo-editing application that helps users create compliant UK passport photographs, with integrated print and payment facilities.",
      role: "End-to-end Flutter development — architecture, UI/UX, build and store deployment.",
      platforms: ["Android"],
      categories: ["flutter", "android", "api"],
      tech: ["Flutter", "Dart", "Push Notifications", "Payment Gateways", "Printer Integration"],
      features: [
        "Guided compliant passport-photo capture",
        "Photo editing and validation",
        "Integrated print ordering",
        "Payment gateway checkout",
        "Push notifications for order status",
      ],
      links: { codecanyon: null, playStore: null, appStore: null },
    },
    {
      id: "troubleshoot",
      name: "Troubleshoot",
      tagline: "Buyer & Seller IT Services Marketplace",
      description:
        "A dual-app marketplace connecting clients requesting IT services with providers — supporting listings, orders, real-time chat and live payment updates.",
      role: "End-to-end Flutter development of both buyer and seller apps.",
      platforms: ["Android"],
      categories: ["flutter", "android", "firebase", "api"],
      tech: ["Flutter", "Firebase", "REST API", "Real-time Updates"],
      features: [
        "Separate buyer and seller applications",
        "Service listings and order management",
        "Real-time chat",
        "Live payment status updates",
        "Firebase real-time backend",
      ],
      links: { codecanyon: null, playStore: null, appStore: null },
    },
  ];

  const LINK_META = {
    codecanyon: { label: "View on CodeCanyon" },
    playStore: { label: "View on Google Play" },
    appStore: { label: "View on App Store" },
  };

  const grid = document.getElementById("projectsGrid");
  const filterBar = document.querySelector(".filter-bar");
  const modal = document.getElementById("projectModal");
  const modalBody = document.getElementById("modalBody");
  if (!grid) return;

  /* ---- Render cards ---- */
  const phoneMarkup = `
    <div class="project-phone" aria-hidden="true">
      <div class="project-phone-screen"><span></span><span></span><span></span><span></span></div>
    </div>`;

  const cardMarkup = (p) => `
    <article class="project-card reveal" data-categories="${p.categories.join(" ")}">
      <div class="project-visual">
        ${phoneMarkup}
        <div class="project-platforms">
          ${p.platforms.map((pl) => `<span class="platform-badge">${pl}</span>`).join("")}
        </div>
      </div>
      <div class="project-body">
        <h3 class="project-name">${p.name}</h3>
        <p class="project-desc">${p.tagline} — ${p.description}</p>
        <div class="project-tags">
          ${p.tech.slice(0, 4).map((t) => `<span class="project-tag">${t}</span>`).join("")}
        </div>
        <div class="project-actions">
          <button class="project-details-btn" type="button" data-project="${p.id}">
            View Details
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M13.2 5.2a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.4-1.4l4.3-4.3H4a1 1 0 1 1 0-2h13.5l-4.3-4.3a1 1 0 0 1 0-1.4Z"/></svg>
          </button>
          ${renderCardLinks(p)}
        </div>
      </div>
    </article>`;

  function renderCardLinks(p) {
    const items = Object.entries(p.links).filter(([, url]) => url);
    if (!items.length) return "";
    return `<div class="project-links">${items
      .map(
        ([key, url]) =>
          `<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${LINK_META[key].label}">
             <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3ZM5 5h5v2H5v12h12v-5h2v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/></svg>
           </a>`
      )
      .join("")}</div>`;
  }

  grid.innerHTML = PROJECTS.map(cardMarkup).join("");

  /* Reveal the freshly-rendered cards */
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );
    grid.querySelectorAll(".project-card").forEach((c) => io.observe(c));
  } else {
    grid.querySelectorAll(".project-card").forEach((c) => c.classList.add("is-visible"));
  }

  /* ---- Filtering ---- */
  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    filterBar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    const filter = btn.dataset.filter;
    grid.querySelectorAll(".project-card").forEach((card) => {
      const match = filter === "all" || card.dataset.categories.split(" ").includes(filter);
      card.classList.toggle("is-hidden", !match);
    });
  });

  /* ---- Details modal ---- */
  let lastFocused = null;

  const modalMarkup = (p) => `
    <p class="modal-eyebrow">${p.platforms.join(" · ")}</p>
    <h3 class="modal-title" id="modalTitle">${p.name}</h3>
    <p class="modal-lead">${p.tagline} — ${p.description}</p>

    <div class="modal-section">
      <h4>Key features</h4>
      <ul class="modal-features">
        ${p.features.map((f) => `<li>${f}</li>`).join("")}
      </ul>
    </div>

    <dl class="modal-meta">
      <div><dt>My role</dt><dd>${p.role}</dd></div>
      <div><dt>Platform</dt><dd>${p.platforms.join(", ")}</dd></div>
      <div><dt>Technologies</dt><dd>${p.tech.join(", ")}</dd></div>
      <div><dt>Domain</dt><dd>${p.tagline}</dd></div>
    </dl>

    ${renderModalLinks(p)}`;

  function renderModalLinks(p) {
    const items = Object.entries(p.links).filter(([, url]) => url);
    if (!items.length) {
      return `<p class="form-note" style="text-align:left;margin-top:1.5rem">Store listing available on request.</p>`;
    }
    return `<div class="modal-links">${items
      .map(
        ([key, url]) =>
          `<a class="btn btn-ghost btn-sm" href="${url}" target="_blank" rel="noopener noreferrer">${LINK_META[key].label}</a>`
      )
      .join("")}</div>`;
  }

  const openModal = (id) => {
    const project = PROJECTS.find((p) => p.id === id);
    if (!project) return;

    lastFocused = document.activeElement;
    modalBody.innerHTML = modalMarkup(project);
    modal.hidden = false;
    document.body.classList.add("no-scroll");
    requestAnimationFrame(() => modal.classList.add("is-open"));
    modal.querySelector(".modal-close").focus();
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    const done = () => {
      modal.hidden = true;
      modalBody.innerHTML = "";
      modal.removeEventListener("transitionend", done);
    };
    modal.addEventListener("transitionend", done);
    if (lastFocused) lastFocused.focus();
  };

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-project]");
    if (btn) openModal(btn.dataset.project);
  });

  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-modal-close]")) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "Tab") trapFocus(e);
  });

  function trapFocus(e) {
    const focusable = modal.querySelectorAll(
      'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
})();
