# Marvelous Unisex Salon — Premium Salon Website

An award-winning style, single-page website for **Marvelous Unisex Salon**, a premium hair & beauty
studio in Baner, Pune. Built as a fast, dependency-free static site with refined motion design.

![Marvelous Unisex Salon](https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop)

## Highlights

- **Cinematic hero** — animated split-line title reveal, layered hair-texture background with
  scroll parallax, live rating badge, and an infinite service marquee.
- **Premium motion** — preloader, scroll-reveal with staggered timing, animated stat counters,
  a custom blend-mode cursor, 3D tilt on imagery, and hover micro-interactions throughout.
- **Real salon content** — services, pricing, genuine Google reviews (4.7★ / 166), address,
  hours and an embedded map for Marvelous Unisex Salon, Baner.
- **Sections** — Hero · About · Services · Luxe Spa Duo feature · Shop · 35% promo banner ·
  Reviews · Contact / Map · Footer.
- **Responsive & accessible** — mobile drawer nav, fluid `clamp()` typography, and full
  `prefers-reduced-motion` support.

## Tech

Pure HTML + CSS + vanilla JS. No build step, no frameworks.

- `index.html` — markup
- `styles.css` — design tokens, layout, animations
- `script.js` — reveals, counters, parallax, cursor, tilt, nav

## Run locally

Just open `index.html`, or serve it:

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Design notes

Typography pairs **Cormorant Garamond** (elegant display serif) with **Jost** (clean geometric
sans). The palette draws from the salon's warm taupe, cream, charcoal and gold tones.
Product and ambience imagery is loaded from Unsplash and can be swapped for the salon's own
photography by replacing the URLs in `styles.css`.
