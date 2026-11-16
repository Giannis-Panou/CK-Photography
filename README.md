![ck_white](https://github.com/user-attachments/assets/bacd5bf7-f4b3-42d2-a276-24f49439845a)

A portfolio website for a city and landscape photographer, built with React. Optimised for desktop and mobile.

> The earlier e-shop version (prints, presets, cart, wishlist, checkout) is archived on the `react-shop` branch.

## Pages

- **Home**: full-screen hero, selected work, projects, Instagram feed, about
- **Work**: every photograph in justified rows, filterable by category, with a full-screen viewer
- **Projects**: photo series, each with the story behind it
- **Instagram**: profile and feed (sample posts until the account is connected; see [docs/instagram.md](docs/instagram.md))
- **About** and **Contact** (enquiry form that opens the visitor's email app)

An appearance menu in the header switches colour theme, typography and corner style.

## Running locally

Built with React, React Router, Bootstrap 5 and Vite.

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build into dist/
npm run preview  # serve the production build
npm run images   # regenerate web images from photos/originals
```

## Adding photographs

1. Put the full-size file in `photos/originals/` (this folder is not deployed).
2. Run `npm run images` to create the 800px and 1800px WebP versions in
   `public/images/portfolio/` and update `src/data/photo-manifest.json`.
3. Add an entry for it in `src/data/photos.js` (and to a project in `src/data/projects.js` if it belongs to a series).
