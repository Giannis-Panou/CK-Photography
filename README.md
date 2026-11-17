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

The interface is in **English and Greek**: the first visit follows the browser's language and the
`EN`/`ΕΛ` switch in the header remembers the choice. Texts live in `src/i18n/en.js` and `src/i18n/el.js`
(same keys in both). Instagram captions are shown as written.

## Running locally

Built with React, React Router, Bootstrap 5 and Vite.

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build into dist/
npm run preview  # serve the production build
npm run instagram  # fetch the latest posts (needs INSTAGRAM_TOKEN)
npm run images   # sample photos from photos/originals (-- --force to redo all)
```

## Photographs come from Instagram

Every photo on the site is read from the Instagram feed, fetched at build time
(`npm run instagram`, run automatically by `npm run build`). Carousel posts become
projects, and captions supply titles and stories. Until an access token is set,
the site uses a sample feed built from the photos in `photos/originals/`.
See [docs/instagram.md](docs/instagram.md).

To change the sample photos: put the full-size files in `photos/originals/`, run
`npm run images`, and edit `src/data/instagram-sample.js`.

## Image protection

- Photos show a tiny blurred preview (stored with each photo) until the full image loads.
- Right-click, drag and long-press saving are blocked on photos (`PROTECT_IMAGES` in
  `src/data/navigation.js`). This deters casual copying only; screenshots always work.
- Optional watermark: set `WATERMARK_TEXT="© CK Photography"` in `.env` or the Netlify
  environment. It is added to Instagram photos at build time; for the sample photos run
  `npm run images -- --force`.
