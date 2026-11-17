import { posts } from './instagram';

// Every photograph on the site comes from the Instagram feed: each photo of
// each post (all slides of a carousel), latest post first.

// Work page filters. A photo gets a category when its post uses one of the
// listed hashtags.
export const CATEGORIES = {
	city: 'City',
	landscape: 'Landscape',
};
const CATEGORY_TAGS = {
	city: ['city', 'street', 'urban', 'cityscape', 'architecture', 'nightphotography'],
	landscape: ['landscape', 'mountains', 'nature', 'sea', 'lake', 'alps'],
};

const categoryOf = (tags) =>
	Object.keys(CATEGORY_TAGS).find((cat) => tags.some((t) => CATEGORY_TAGS[cat].includes(t))) ?? null;

const toPhoto = (post, m, i) => ({
	...m,
	title: post.media.length > 1 && i > 0 ? `${post.title} · ${i + 1}/${post.media.length}` : post.title,
	postTitle: post.title,
	category: categoryOf(post.tags),
	ratio: m.width / m.height,
	orientation: m.height > m.width ? 'portrait' : 'landscape',
	postId: post.id,
	permalink: post.permalink,
	date: post.date,
});

const seen = new Set();
export const photos = posts.flatMap((post) =>
	post.media.map((m, i) => toPhoto(post, m, i)).filter((p) => !seen.has(p.id) && seen.add(p.id))
);

const byId = new Map(photos.map((p) => [p.id, p]));
export const getPhoto = (id) => byId.get(id);

/** The first photo of each post, latest first: the images the feed leads with. */
export const covers = posts.map((post) => byId.get(post.media[0]?.id)).filter(Boolean);

/**
 * Picks `count` photos for a layout slot, preferring post covers (latest
 * first) and then the remaining photos.
 *   orientation: 'landscape' | 'portrait' to require one
 *   exclude:     photos already used elsewhere on the page
 */
export function pickPhotos(count, { orientation, exclude = [] } = {}) {
	const used = new Set(exclude.map((p) => p.id));
	const pool = [...new Set([...covers, ...photos])];
	return pool
		.filter((p) => !used.has(p.id) && (!orientation || p.orientation === orientation))
		.slice(0, count);
}
