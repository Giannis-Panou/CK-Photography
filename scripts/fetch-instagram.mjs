// Fetches the latest Instagram posts and saves them for the site.
//
//   npm run instagram        (also runs automatically before `npm run build`)
//
// Needs INSTAGRAM_TOKEN: a long-lived token from the Meta app
// (see docs/instagram.md). Locally put it in .env; on Netlify add it as an
// environment variable. NEVER commit it or give it a VITE_ prefix.
//
// Output: src/data/instagram.json         (the feed the site reads)
//         public/images/instagram/*.webp  (the photos; Instagram's own
//                                          image URLs expire after a few days)
//
// Without a token, or if Instagram cannot be reached, the build carries on:
// it keeps the previously fetched feed, or the site shows the sample feed.

import { existsSync } from 'node:fs';
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { placeholder, watermarkText, writeWebp } from './lib/image-tools.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_JSON = path.join(root, 'src/data/instagram.json');
const IMG_DIR = path.join(root, 'public/images/instagram');
const IMG_URL = '/images/instagram';
const API = 'https://graph.instagram.com';
const WIDTHS = [800, 1440]; // Instagram serves photos up to 1440px wide
const MAX_POSTS = Number(process.env.INSTAGRAM_MAX_POSTS) || 50;

const log = (msg) => console.log(`[instagram] ${msg}`);

try {
	process.loadEnvFile(path.join(root, '.env'));
} catch {
	// no .env file: rely on the real environment (e.g. Netlify)
}

const token = process.env.INSTAGRAM_TOKEN;
if (!token) {
	log('INSTAGRAM_TOKEN is not set: the site uses the sample feed.');
	process.exit(0);
}

/** GET from the Graph API. Errors never include the token. */
async function api(endpoint, params = {}) {
	const url = new URL(endpoint, API);
	for (const [k, v] of Object.entries({ ...params, access_token: token })) url.searchParams.set(k, v);
	return getJson(url);
}

async function getJson(url) {
	const res = await fetch(url);
	const json = await res.json().catch(() => ({}));
	if (!res.ok || json.error) {
		throw new Error(json.error?.message ?? `HTTP ${res.status}`);
	}
	return json;
}

// Watermarked files get their own names, so turning it on or off never
// reuses images made with the other setting
const SUFFIX = watermarkText() ? '-wm' : '';

/** Downloads one image and writes the web sizes; skips files already made. */
async function saveImage(id, sourceUrl, { watermark = true } = {}) {
	const res = await fetch(sourceUrl);
	if (!res.ok) throw new Error(`image ${id}: HTTP ${res.status}`);
	const input = sharp(Buffer.from(await res.arrayBuffer())).rotate();
	const { width, height } = await input.metadata();

	const variants = [];
	for (const w of WIDTHS) {
		const name = `${id}-${w}${watermark ? SUFFIX : ''}.webp`;
		const file = path.join(IMG_DIR, name);
		const actual = existsSync(file)
			? Math.min(w, width)
			: await writeWebp(input, { width: w, sourceWidth: width, quality: w > 1000 ? 82 : 76, file, watermark });
		variants.push({ url: `${IMG_URL}/${name}`, width: actual });
	}
	return {
		width,
		height,
		thumb: variants[0].url,
		src: variants.at(-1).url,
		srcSet: variants.map((v) => `${v.url} ${v.width}w`).join(', '),
		placeholder: await placeholder(input),
	};
}

const MEDIA_FIELDS = 'id,media_type,media_url,thumbnail_url';

async function fetchFeed() {
	const profile = await api('/me', {
		fields: 'user_id,username,name,profile_picture_url,followers_count,media_count',
	});

	// Latest posts, following the pages until MAX_POSTS
	const raw = [];
	let page = await api('/me/media', {
		fields: `id,caption,media_type,permalink,timestamp,${MEDIA_FIELDS},children{${MEDIA_FIELDS}}`,
		limit: Math.min(MAX_POSTS, 50),
	});
	for (;;) {
		raw.push(...page.data);
		if (raw.length >= MAX_POSTS || !page.paging?.next) break;
		page = await getJson(page.paging.next);
	}

	await mkdir(IMG_DIR, { recursive: true });
	const posts = [];
	for (const p of raw.slice(0, MAX_POSTS)) {
		const items = p.media_type === 'CAROUSEL_ALBUM' ? (p.children?.data ?? []) : [p];
		const media = [];
		for (const m of items) {
			// Videos and reels are shown by their cover image
			const source = m.media_type === 'VIDEO' ? m.thumbnail_url : m.media_url;
			if (!source) continue; // e.g. copyrighted audio reels hide their media
			try {
				media.push({ id: m.id, type: m.media_type, ...(await saveImage(m.id, source)) });
			} catch (err) {
				log(`skipped ${m.id}: ${err.message}`);
			}
		}
		if (!media.length) continue;
		posts.push({
			id: p.id,
			media_type: p.media_type,
			caption: p.caption ?? '',
			timestamp: new Date(p.timestamp.replace(/([+-]\d\d)(\d\d)$/, '$1:$2')).toISOString(),
			permalink: p.permalink,
			media,
		});
	}

	let avatar = null;
	if (profile.profile_picture_url) {
		try {
			avatar = (await saveImage('avatar', profile.profile_picture_url, { watermark: false })).thumb;
		} catch (err) {
			log(`profile picture skipped: ${err.message}`);
		}
	}

	// Remove images of posts no longer in the feed, and files made with the
	// other watermark setting (the profile picture is never watermarked)
	const keep = new Set(posts.flatMap((p) => p.media.map((m) => m.id)));
	for (const file of await readdir(IMG_DIR)) {
		const watermarked = /-wm\.webp$/.test(file);
		const id = file.replace(/-\d+(-wm)?\.webp$/, '');
		const inUse = id === 'avatar' ? !watermarked : keep.has(id) && watermarked === Boolean(SUFFIX);
		if (!inUse) await rm(path.join(IMG_DIR, file));
	}

	return {
		fetchedAt: new Date().toISOString(),
		profile: {
			username: profile.username,
			name: profile.name ?? null,
			avatar,
			followers_count: profile.followers_count ?? null,
			media_count: profile.media_count ?? posts.length,
		},
		posts,
	};
}

try {
	const feed = await fetchFeed();
	await writeFile(OUT_JSON, JSON.stringify(feed, null, '\t') + '\n');
	const photos = feed.posts.reduce((n, p) => n + p.media.length, 0);
	log(`@${feed.profile.username}: ${feed.posts.length} posts, ${photos} photos saved.`);
} catch (err) {
	log(`fetch failed: ${err.message}`);
	log(existsSync(OUT_JSON) ? 'keeping the previously fetched feed.' : 'the site uses the sample feed.');
}
