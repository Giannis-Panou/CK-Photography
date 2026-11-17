// The Instagram feed: the single source for every photo on the site.
//
// scripts/fetch-instagram.mjs runs before each build (npm run build) and
// writes the latest posts to src/data/instagram.json, with their images
// saved in public/images/instagram/. When that file does not exist (no
// INSTAGRAM_TOKEN yet) the site uses the sample feed in instagram-sample.js.
//
// Caption convention (all optional; any caption still works):
//
//   After Dark                          <- line 1: title
//   Neon, rain and empty streets        <- line 2: subtitle
//
//   Cities change character after...    <- paragraphs: the story
//
//   “A wet street turns every sign…”    <- a fully quoted paragraph: pull quote
//
//   #city #nightphotography             <- hashtags: category (see photos.js)
//
// Carousel posts with PROJECT_MIN_PHOTOS or more photos become projects
// (see projects.js).

import sampleFeed from './instagram-sample';

// import.meta.glob returns {} when the file is missing, so the build works
// with or without a fetched feed.
const liveFeed = Object.values(import.meta.glob('./instagram.json', { eager: true, import: 'default' }))[0];
const feed = liveFeed?.posts?.length ? liveFeed : sampleFeed;

export const isSampleFeed = feed === sampleFeed;
export const fetchedAt = feed.fetchedAt;
export const profile = feed.profile;
export const INSTAGRAM_HANDLE = profile.username ?? '_ckarras_';
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

const QUOTE = /^["“'‘](.+)["”'’]$/s;
const HASHTAG = /#([\p{L}\p{N}_]+)/gu;
const MAX_TITLE = 60;

/** Splits a caption into title, subtitle, story paragraphs, quote and tags. */
export function parseCaption(caption = '') {
	const tags = [...caption.matchAll(HASHTAG)].map((m) => m[1].toLowerCase());
	const clean = caption
		.replace(/\r\n/g, '\n')
		.split('\n')
		.filter((line) => !/^\s*(#[\p{L}\p{N}_]+\s*)+$/u.test(line)) // hashtag-only lines
		.join('\n')
		.replace(HASHTAG, '')
		.trim();

	const blocks = clean
		.split(/\n\s*\n/)
		.map((b) => b.trim())
		.filter(Boolean);
	const [head = '', ...rest] = blocks;
	const [firstLine = '', ...headLines] = head.split('\n').map((l) => l.trim());

	let title = firstLine;
	let subtitle = headLines.join(' ');
	if (title.length > MAX_TITLE) {
		// A long first line is a sentence, not a title
		subtitle = [title, subtitle].filter(Boolean).join(' ');
		title = `${title.slice(0, MAX_TITLE).replace(/\s+\S*$/, '')}…`;
	}

	const quoteBlock = rest.find((b) => QUOTE.test(b));
	return {
		title: title || 'Untitled',
		subtitle,
		paragraphs: rest.filter((b) => b !== quoteBlock),
		quote: quoteBlock ? quoteBlock.match(QUOTE)[1].trim() : null,
		tags,
		text: clean,
	};
}

/** Latest first, each with its parsed caption. */
export const posts = feed.posts
	.map((p) => ({
		...p,
		...parseCaption(p.caption ?? ''),
		permalink: p.permalink ?? INSTAGRAM_URL,
		date: new Date(p.timestamp),
	}))
	.sort((a, b) => b.date - a.date);
