# Ashikur Rahman Kayum — Portfolio

Personal portfolio site for **Ashikur Rahman Kayum**, Flutter / Mobile App Developer.
Built with plain **HTML5, CSS3 and vanilla JavaScript** — no framework, no build step.

## Run locally

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Structure

```
portfolio/
├── index.html            # Single-page site, all sections
├── assets/
│   ├── cv/                # Downloadable CV (PDF)
│   └── images/
│       ├── profile/       # Portrait
│       ├── projects/      # Project screenshots (add real ones here)
│       └── icons/         # favicon.svg
├── css/
│   ├── style.css          # Design tokens + component styles
│   ├── responsive.css     # Breakpoints (1200 / 1024 / 768 / 560 / 400)
│   └── animations.css     # Keyframes + scroll-reveal states
└── js/
    ├── navigation.js      # Sticky header, mobile menu, active-section spy
    ├── animations.js      # Scroll reveal + animated counters
    ├── projects.js        # Project data, cards, filtering, details modal
    └── main.js            # Theme switch, back-to-top, contact form, year
```

## Design system

All colours, spacing, radii and typography are CSS custom properties in
`:root` (and overridden under `:root[data-theme="light"]`) at the top of
`css/style.css`. Change them there to re-skin the site.

Default theme is **dark**; the toggle in the header switches to light and the
choice is stored in `localStorage` under `portfolio-theme`.

## Content to fill in

The site content comes from the CV. A few items still need real values —
search the code for `TODO`:

- `index.html` — canonical URL / Open Graph URL (set to the deployed domain)
- `index.html` — LinkedIn profile URL (not listed on the CV)
- `js/projects.js` — per-project store URLs (`codecanyon`, `playStore`,
  `appStore`); links render only when a URL is present
- `assets/images/projects/` — real app screenshots to replace the CSS phone mockups

## Contact form

There is no backend. On submit the form composes a `mailto:` link and opens the
visitor's email client with the message pre-filled — it never claims the message
was sent from the page. To use a real service (Formspree, Netlify Forms, etc.),
replace the submit handler in `js/main.js`.
