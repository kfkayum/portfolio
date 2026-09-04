/* ==========================================================================
   projects.js — work data, card rendering, filtering, detail sheet
   --------------------------------------------------------------------------
   Store / product links are taken straight from the CV (SELECTED PROJECTS).
   Add real screenshots later by setting `shot` to a path under
   assets/images/projects/ — the placeholder mark is replaced automatically.
   ========================================================================== */
(function () {
  "use strict";

  var PROJECTS = [
    {
      id: "workzen", mark: "W", name: "WorkZen",
      cat: "HRM & Payroll · CodeCanyon",
      tagline: "HRM & Payroll Management System with mobile app",
      description:
        "A modern HRM platform that replaces spreadsheet-based workflows, streamlining people management and daily operations for growing teams.",
      role: "End-to-end Flutter development — architecture, UI/UX, build and dual-store release.",
      platforms: ["Android", "iOS"],
      categories: ["flutter", "android", "ios", "firebase", "api"],
      tech: ["Flutter", "Dart", "Firebase", "Fingerprint Auth", "Push Notifications", "REST API", "Payment Gateways"],
      features: [
        "Fingerprint-authenticated attendance",
        "Payroll and people management",
        "Multi-gateway payment support",
        "Push notifications for approvals and updates",
        "Admin dashboard for daily operations"
      ],
      links: [
        { label: "View on CodeCanyon", url: "https://codecanyon.net/item/workzen-hrm-payroll-management-system-with-mobile-app/62472695" }
      ],
      shot: "assets/images/projects/workzen.jpg"
    },
    {
      id: "paysuite", mark: "P", name: "PaySuite",
      cat: "SaaS Billing · CodeCanyon",
      tagline: "SaaS Invoice & Billing Management System",
      description:
        "A multi-tenant SaaS billing and accounting platform for small businesses — turning a local operation into a global brand across iOS and Android with simplified daily financial operations.",
      role: "End-to-end Flutter development — multi-tenant architecture, UI/UX, build and dual-store release.",
      platforms: ["Android", "iOS"],
      categories: ["flutter", "android", "ios", "firebase", "api"],
      tech: ["Flutter", "Dart", "Multi-Tenant SaaS", "Advanced Payment Gateways", "Firebase", "REST API"],
      features: [
        "Multi-tenant SaaS architecture",
        "Invoice, billing and estimate management",
        "Advanced payment gateway integration",
        "Dashboard, transactions and customer management",
        "Built on the latest Flutter with regular updates"
      ],
      links: [
        { label: "View on CodeCanyon", url: "https://codecanyon.net/item/paysuite-saas-invoice-and-billing-management-system/61794730" }
      ],
      shot: "assets/images/projects/paysuite.jpg"
    },
    {
      id: "tribu", mark: "T", name: "Tribu",
      cat: "Club Management · CodeCanyon",
      tagline: "Club & committee management for Android & iOS",
      description:
        "A club and committee management platform for membership-based organisations — member and role management, QR-code meeting attendance, news and awards, and a full admin dashboard with reporting.",
      role: "End-to-end Flutter development for Android and iOS.",
      platforms: ["Android", "iOS"],
      categories: ["flutter", "android", "ios", "api"],
      tech: ["Flutter", "Role-Based Access Control", "QR Code Attendance", "PayPal", "Push Notifications", "REST API"],
      features: [
        "Member and role management (RBAC)",
        "QR-code meeting attendance",
        "News and awards modules",
        "PayPal payment integration",
        "Admin dashboard with reporting"
      ],
      links: [
        { label: "View on CodeCanyon", url: "https://codecanyon.net/item/tribu-club-management-android-and-ios-app/62967899" }
      ],
      shot: "assets/images/projects/tribu.jpg"
    },
    {
      id: "dutch-flow", mark: "D", name: "Dutch Flow",
      cat: "Learning & Fitness · Android · iOS",
      tagline: "Tutorial & fitness training app with live streaming",
      description:
        "A tutorial and fitness training platform delivering structured video courses, with live video streaming, in-app purchases and course purchase functionality.",
      role: "End-to-end Flutter development — architecture, UI/UX, build and dual-store release.",
      platforms: ["Android", "iOS"],
      categories: ["flutter", "android", "ios", "api"],
      tech: ["Flutter", "Dart", "Video Streaming", "In-App Purchases", "Course Purchase Flow", "REST API"],
      features: [
        "Structured video course delivery",
        "Live video streaming",
        "In-app purchases",
        "Course purchase flow",
        "REST API-driven content"
      ],
      links: [
        { label: "View on Google Play", url: "https://play.google.com/store/apps/details?id=com.dutchflow.academy" }
      ],
      shot: "assets/images/projects/dutch-flow.jpg", icon: true
    },
    {
      id: "uk-passport", mark: "P", name: "UK Passport Photo App",
      cat: "Photo & Utilities · Google Play",
      tagline: "Compliant passport-photo editor",
      description:
        "A photo-editing application enabling users to create compliant UK passport photographs, with integrated print and payment facilities.",
      role: "End-to-end Flutter development — architecture, UI/UX, build and store release.",
      platforms: ["Android"],
      categories: ["flutter", "android", "api"],
      tech: ["Flutter", "Dart", "Push Notifications", "Payment Gateways", "Printer Integration"],
      features: [
        "Guided compliant passport-photo capture",
        "Photo editing and validation",
        "Integrated print ordering",
        "Payment gateway checkout",
        "Push notifications for order status"
      ],
      links: [
        { label: "View on Google Play", url: "https://play.google.com/store/apps/details?id=com.saithy.passport_photo" }
      ],
      shot: "assets/images/projects/uk-passport.jpg", icon: true
    },
    {
      id: "troubleshoot", mark: "S", name: "Troubleshoot",
      cat: "Services Marketplace · Google Play",
      tagline: "Buyer & seller IT-services marketplace",
      description:
        "A dual-app marketplace connecting clients requesting IT services with providers — listings, orders, real-time chat and live payment updates.",
      role: "End-to-end Flutter development of both the buyer and the seller apps.",
      platforms: ["Android"],
      categories: ["flutter", "android", "firebase", "api"],
      tech: ["Flutter", "Firebase", "REST API", "Real-time Updates"],
      features: [
        "Separate buyer and seller applications",
        "Service listings and order management",
        "Real-time chat",
        "Live payment status updates",
        "Firebase real-time backend"
      ],
      links: [
        { label: "View on Google Play", url: "https://play.google.com/store/apps/details?id=com.troubleshootltd.buyer" }
      ],
      shot: "assets/images/projects/troubleshoot.jpg", icon: true
    }
  ];

  var EXTERNAL_SVG =
    '<svg class="ic" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>';

  var grid = document.getElementById("workGrid");
  var filterBar = document.querySelector(".filter-bar");
  var modal = document.getElementById("projectModal");
  var modalBody = document.getElementById("pmBody");
  if (!grid) return;

  /* ---------- render cards ---------- */
  function cardHTML(p) {
    var visual = p.shot
      ? '<img src="' + p.shot + '" alt="' + p.name + (p.icon ? " app icon" : " preview") + '" loading="lazy" decoding="async" />'
      : '<span class="work-mark" aria-hidden="true">' + p.mark + "</span>";

    var links = p.links.map(function (l) {
      return '<a class="work-link" href="' + l.url + '" target="_blank" rel="noopener noreferrer">' +
        l.label + " " + EXTERNAL_SVG + "</a>";
    }).join("");

    return (
      '<article class="work-card reveal" data-categories="' + p.categories.join(" ") + '">' +
        '<div class="work-visual' + (p.icon ? " is-icon" : "") + '">' + visual +
          '<div class="work-platforms">' +
            p.platforms.map(function (pl) { return "<span>" + pl + "</span>"; }).join("") +
          "</div>" +
        "</div>" +
        '<div class="work-body">' +
          '<p class="work-cat">' + p.cat + "</p>" +
          '<h3 class="work-name">' + p.name + "</h3>" +
          '<p class="work-desc">' + p.description + "</p>" +
          '<div class="work-tags">' +
            p.tech.slice(0, 5).map(function (t) { return "<span>" + t + "</span>"; }).join("") +
          "</div>" +
          '<div class="work-actions">' +
            '<button class="work-details" type="button" data-project="' + p.id + '">' +
              'Details <svg class="ic" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>' +
            "</button>" +
            links +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  grid.innerHTML = PROJECTS.map(cardHTML).join("");
  grid.querySelectorAll(".work-card").forEach(function (c) {
    if (window.__revealObserver) window.__revealObserver.observe(c);
    else c.classList.add("is-visible");
  });
  if (window.__revealSweep) window.__revealSweep();

  /* ---------- filtering ---------- */
  if (filterBar) {
    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      filterBar.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var f = btn.dataset.filter;
      grid.querySelectorAll(".work-card").forEach(function (card) {
        var match = f === "all" || card.dataset.categories.split(" ").indexOf(f) !== -1;
        card.classList.toggle("is-hidden", !match);
      });
    });
  }

  /* ---------- detail sheet ---------- */
  function modalHTML(p) {
    var linkBtns = p.links.map(function (l) {
      return '<a class="btn btn-primary btn-sm" href="' + l.url + '" target="_blank" rel="noopener noreferrer">' + l.label + "</a>";
    }).join("");

    return (
      '<p class="pm-eyebrow">' + p.platforms.join(" · ") + "</p>" +
      '<h3 class="pm-title" id="pmTitle">' + p.name + "</h3>" +
      '<p class="pm-lead">' + p.tagline + " — " + p.description + "</p>" +
      '<div class="pm-section"><h4>Key features</h4><ul class="pm-features">' +
        p.features.map(function (f) { return "<li>" + f + "</li>"; }).join("") +
      "</ul></div>" +
      '<dl class="pm-meta">' +
        "<div><dt>My role</dt><dd>" + p.role + "</dd></div>" +
        "<div><dt>Platforms</dt><dd>" + p.platforms.join(", ") + "</dd></div>" +
        "<div><dt>Stack</dt><dd>" + p.tech.join(", ") + "</dd></div>" +
      "</dl>" +
      '<div class="pm-links">' + linkBtns + "</div>"
    );
  }

  grid.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-project]");
    if (!btn) return;
    var p = PROJECTS.find(function (x) { return x.id === btn.dataset.project; });
    if (!p || !window.Sheet) return;
    modalBody.innerHTML = modalHTML(p);
    window.Sheet.open(modal);
  });
})();
