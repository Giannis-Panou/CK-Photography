# Instagram feed: TODO

The home page "On Instagram" section and the `/instagram` page currently show
**sample posts** built from the portfolio's own photographs
(`src/data/instagram.js`, `isSampleFeed = true`). They are laid out exactly as
the live feed will be.

## To connect the real account (@_ckarras_)

### 1. Client side (the account owner)
- [ ] Switch the account to a **professional** account (Creator or Business):
      Instagram → Settings → Account type and tools → Switch to professional account.
- [ ] Accept the **Instagram Tester** invite:
      Instagram → Settings → Website permissions → Apps and websites → Tester invites.
- [ ] Approve read-only access (`instagram_business_basic`) via the app's authorization link.
- [ ] Confirm in writing that the posts may be shown on the website.

### 2. Meta developer app
- [ ] Decide who owns the app / business portfolio (us or the client). If Meta asks
      for a **business portfolio**, it can usually be skipped while the app stays in
      Development mode.
- [ ] developers.facebook.com → Create app → Instagram use case → Business type.
- [ ] Instagram → API setup with Instagram login → add the client's account as a tester,
      generate a long-lived token (valid 60 days).
- [ ] Test it:
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=12&access_token=TOKEN`

### 3. Code
- [ ] Add `scripts/fetch-instagram.mjs`: read `INSTAGRAM_TOKEN` from the environment,
      fetch the latest 12 posts, download the images into `public/images/instagram/`
      (Instagram CDN URLs expire), write `src/data/instagram.json`.
      Keep the previous file if the fetch fails.
- [ ] In `src/data/instagram.js`, import `instagram.json` and set `isSampleFeed = false`.
- [ ] Run the fetch before `vite build`; rebuild daily (GitHub Action / host build hook),
      and refresh the token in the same job:
      `GET https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=TOKEN`

**Never** expose the token in client code: no `VITE_` prefix, no commits. Keep it
in `.env` (git-ignored) or the host's secret settings.
