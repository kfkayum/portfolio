# Ashikur Rahman Kayum — Portfolio

Personal portfolio for **Ashikur Rahman Kayum**, Flutter / Mobile App Developer.

Built with plain **HTML5, CSS3 and vanilla JavaScript** — no framework, no build
step, no dependencies. The site is designed as a **premium mobile application
presented on the web**: a persistent status bar, a desktop app rail, a mobile
bottom tab bar, and sections that behave like screens inside an app.

## Run locally

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Structure

```
portfolio/
├── index.html            # Single page — every screen
├── assets/
│   ├── cv/                # Downloadable CV (PDF) — the source of truth for content
│   └── images/
│       ├── profile/       # Portrait
│       ├── projects/      # Real app screenshots go here (see projects.js `shot`)
│       └── icons/         # favicon.svg
├── css/
│   ├── reset.css          # Modern reset + reduced-motion guard
│   ├── variables.css      # Design tokens (dark default + light remap)
│   ├── base.css           # App shell: status bar, rail, screens, tab bar
│   ├── components.css     # Buttons, chips, phone mockup, sheets, code window
│   ├── sections.css       # Per-screen layout
│   ├── animations.css     # Reveal states + keyframes
│   └── responsive.css     # 320 → 1920; < 1024px switches to the mobile shell
└── js/
    ├── theme.js           # Dark / light toggle, persisted to localStorage
    ├── navigation.js      # Scroll-spy, rail + tab-bar indicators, screen name
    ├── animations.js      # Scroll reveal, stat count-up, Dart code typing
    ├── interactions.js    # Live clock, magnetic buttons, hero parallax,
    │                        career expand/collapse, tech-stack rendering
    ├── projects.js        # Work data, cards, filtering, detail sheet
    └── main.js            # Bottom-sheet controller, contact form (mailto)
```

## Design system

All colour, spacing, radius and type tokens are CSS custom properties in
`css/variables.css` — `:root` is the dark theme, `:root[data-theme="light"]`
is a full light remap (not an inversion). Re-skin the site by editing that file.

Default theme is **dark**; the toggle stores the choice in `localStorage` under
`portfolio-theme` and it is applied before first paint.

Scroll-reveal is progressive-enhancement only: content is visible by default and
the hidden-then-reveal state is armed by JS (`<html class="anim">`), so a script
failure never hides content.

## Content

All content comes from `assets/cv/Ashikur-Rahman-Kayum-Flutter-Developer-CV.pdf`.
Featured-project links (CodeCanyon / Google Play) are the real URLs from the CV
and live in `js/projects.js`.

To add real app screenshots, drop images in `assets/images/projects/` and set
`shot: "assets/images/projects/<file>"` on the matching project in
`js/projects.js` — the phone-mockup placeholder is replaced automatically.

## Contact form

No backend. On submit the form composes a `mailto:` link and opens the visitor's
email client with the message pre-filled. To use a real service (Formspree,
Netlify Forms, …) replace the submit handler in `js/main.js`.
