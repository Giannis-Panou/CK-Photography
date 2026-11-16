import manifest from './photo-manifest.json';

// Every photograph in the portfolio. Titles follow the names used in the
// original print shop; the three untitled photos have descriptive titles.
// `file` matches a source in photos/originals (see scripts/optimize-images.mjs).
const entries = [
	{ file: 'print1', title: 'Flatiron NYC', category: 'city' },
	{ file: 'print2', title: 'Fly Away', category: 'city' },
	{ file: 'print3', title: 'Neon City', category: 'city' },
	{ file: 'print4', title: 'Neon Alley', category: 'city' },
	{ file: 'print5', title: 'Urban Jungle', category: 'city' },
	{ file: 'print6', title: 'Gray Boulevard', category: 'city' },
	{ file: 'print7', title: 'Among Giants', category: 'city' },
	{ file: 'print8', title: 'Taking a Shortcut', category: 'city' },
	{ file: 'land1', title: 'Into the Clouds', category: 'landscape' },
	{ file: 'land2', title: 'Endless Green', category: 'landscape' },
	{ file: 'land3', title: 'Above the Clouds', category: 'landscape' },
	{ file: 'land4', title: 'Golden Mountain', category: 'landscape' },
	{ file: 'land5', title: 'Below Zero', category: 'landscape' },
	{ file: 'land6', title: 'House of the Gods', category: 'landscape' },
	{ file: 'land7', title: 'Villain Stronghold', category: 'landscape' },
	{ file: 'land8', title: 'Blue Paradise', category: 'landscape' },
	{ file: 'wallpaper', title: 'Shoreline', category: 'landscape' },
	{ file: 'wallpaper1', title: 'Forest Fog', category: 'landscape' },
	{ file: 'wallpaper2', title: 'Moonrise Range', category: 'landscape' },
];

export const CATEGORIES = {
	city: 'City',
	landscape: 'Landscape',
};

export const photos = entries.map((p) => {
	const { width, height } = manifest[p.file];
	return {
		...p,
		id: p.file,
		width,
		height,
		ratio: width / height,
		orientation: height > width ? 'portrait' : 'landscape',
		src: `/images/portfolio/${p.file}-1800.webp`,
		thumb: `/images/portfolio/${p.file}-800.webp`,
		srcSet: `/images/portfolio/${p.file}-800.webp 800w, /images/portfolio/${p.file}-1800.webp 1800w`,
	};
});

const byId = new Map(photos.map((p) => [p.id, p]));
export const getPhoto = (id) => byId.get(id);
export const getPhotos = (ids) => ids.map(getPhoto).filter(Boolean);
