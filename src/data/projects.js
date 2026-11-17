import { posts } from './instagram';
import { getPhoto } from './photos';

// Projects are carousel posts: each carousel with at least this many photos
// becomes a series. Its caption supplies the title, subtitle, story and quote
// (see the caption convention in instagram.js).
export const PROJECT_MIN_PHOTOS = 3;

const slugify = (text) =>
	text
		.normalize('NFKD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '') || 'series';

const slugs = new Set();
const uniqueSlug = (title) => {
	let slug = slugify(title);
	for (let n = 2; slugs.has(slug); n++) slug = `${slugify(title)}-${n}`;
	slugs.add(slug);
	return slug;
};

export const projects = posts
	.filter((p) => p.media_type === 'CAROUSEL_ALBUM' && p.media.length >= PROJECT_MIN_PHOTOS)
	.map((post) => {
		const images = post.media.map((m) => getPhoto(m.id)).filter(Boolean);
		const category = images.find((p) => p.category)?.category;
		const [intro = post.subtitle, ...body] = post.paragraphs;
		return {
			slug: uniqueSlug(post.title),
			title: post.title,
			subtitle: post.subtitle,
			year: String(post.date.getFullYear()),
			category: category ?? null, // a key of CATEGORIES in photos.js
			intro,
			body,
			quote: post.quote,
			permalink: post.permalink,
			coverPhoto: images[0],
			cover: images[0]?.id,
			images,
		};
	})
	.filter((p) => p.images.length);

export const getProject = (slug) => projects.find((p) => p.slug === slug);
