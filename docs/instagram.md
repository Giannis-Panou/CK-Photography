# Instagram feed

Every photo on the site comes from the Instagram feed: the home page, Work,
Projects, the Instagram page and About.

## How it works

1. `scripts/fetch-instagram.mjs` runs before every build (`npm run build`, so
   also on Netlify) or on its own with `npm run instagram`.
2. With `INSTAGRAM_TOKEN` set, it fetches the latest posts (up to 50), saves
   every photo (all carousel slides; videos by their cover) in
   `public/images/instagram/`, and writes `src/data/instagram.json`.
   Both are git-ignored and regenerated on each build.
3. `src/data/instagram.js` reads that file. Without it (no token yet) the site
   uses the **sample feed** in `src/data/instagram-sample.js`, made from the
   portfolio's own photos, and shows an "example feed" note.
4. If Instagram can't be reached, the build carries on with the last fetched
   feed (or the sample).

What the site makes of the posts:

| Site                | Comes from                                                  |
| ------------------- | ----------------------------------------------------------- |
| Home hero           | the latest wide (landscape) post covers                    |
| Selected work       | the next photos in the feed                                 |
| Work                | every photo of every post, filtered by hashtag              |
| Projects            | carousel posts with 3+ photos (`PROJECT_MIN_PHOTOS`)         |
| Instagram page      | the posts, profile picture, post and follower counts        |

## Caption convention

Any caption works, but this layout gives projects their full page:

```
After Dark                           <- line 1: title
Neon, rain and empty streets         <- line 2: subtitle

Cities change character after...     <- 1st paragraph: project intro

Rain is the secret ingredient...     <- more paragraphs: the story

“A wet street turns every sign…”     <- a fully quoted paragraph: pull quote

#city #nightphotography              <- hashtags: Work category
```

Category hashtags are listed in `CATEGORY_TAGS` in `src/data/photos.js`
(e.g. `#city`, `#street`, `#landscape`, `#mountains`).

## Connecting the account (@_ckarras_)

### 1. Client
- [ ] Switch to a **professional** account (Creator is fine):
      Settings and activity → Account type and tools → Switch to professional account.
- [ ] Accept the **tester invite** (easiest on instagram.com in a browser):
      Settings → Apps and websites → Tester invites.
- [ ] Log in and approve when generating the token (step 2), on a call or on their device.
      Never ask for their password.
- [ ] Confirm in writing that the posts may be shown on the website.

### 2. Meta developer app
- [ ] developers.facebook.com → Create app → Instagram use case
      ("Manage messaging & content on Instagram"). Skip the business portfolio.
- [ ] Instagram → API setup with Instagram login → App roles → add `_ckarras_`
      as an **Instagram Tester**.
- [ ] Generate access tokens → Add account → Generate token (long-lived, 60 days).
- [ ] Test it in a browser:
      `https://graph.instagram.com/me/media?fields=id,caption,media_type&limit=3&access_token=TOKEN`

To try everything before involving the client, do the same with a test
Instagram account of your own, then swap the token.

### 3. Site
- [ ] Netlify → Project configuration → Environment variables → `INSTAGRAM_TOKEN`
      (mark as secret, scope: Builds). Then trigger a deploy.
- [ ] Locally: put `INSTAGRAM_TOKEN=...` in `.env` and run `npm run instagram`.

**Never** expose the token: no `VITE_` prefix, never commit it.

Optional: `WATERMARK_TEXT` (e.g. `© CK Photography`) adds a watermark to every
fetched photo (not the profile picture).

## TODO
- [ ] Daily rebuild (Netlify build hook called from a scheduled GitHub Action)
      so new posts appear without a push.
- [ ] Refresh the token in the same job before it expires (60 days):
      `GET https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=TOKEN`
