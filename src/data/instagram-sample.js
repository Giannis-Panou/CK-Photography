// SAMPLE Instagram feed, used until the real account is connected.
//
// It has exactly the shape scripts/fetch-instagram.mjs writes to
// src/data/instagram.json, but the images are the portfolio's own photos.
// Captions follow the convention described in src/data/instagram.js:
//   line 1 = title, line 2 = subtitle, then paragraphs, a “quoted” line
//   becomes the pull quote, hashtags set the category.
// NOTE: the texts are sample copy; the real captions replace them.

import manifest from './photo-manifest.json';

const media = (file) => {
	const { width, height, placeholder } = manifest[file];
	return {
		id: file,
		type: 'IMAGE',
		width,
		height,
		placeholder,
		src: `/images/portfolio/${file}-1800.webp`,
		thumb: `/images/portfolio/${file}-800.webp`,
		srcSet: `/images/portfolio/${file}-800.webp 800w, /images/portfolio/${file}-1800.webp 1800w`,
	};
};

const post = (date, files, caption) => ({
	id: `sample-${date}`,
	media_type: files.length > 1 ? 'CAROUSEL_ALBUM' : 'IMAGE',
	caption,
	timestamp: `${date}T18:00:00.000Z`,
	// Real posts link to their own page; samples link to the profile
	permalink: null,
	media: files.map(media),
});

const posts = [
	post('2025-11-02', ['land3', 'land1', 'land7', 'land6', 'wallpaper1'], `Above the Clouds
Inversions, fog and the minutes in between

Mountain photography is mostly waiting. You arrive before dawn, set up, and watch the cloud sit on the ridge exactly where you hoped it would not.

These photographs come from the other mornings: the ones where the inversion settles below the peaks and the light comes in low across the top of it. When it happens, it rarely lasts more than a few minutes.

“You cannot schedule the light. You can only be standing in the right place when it arrives.”

The edits are restrained. The colour in the sky is what was there; the work is in protecting the highlights and letting the layers of ridge read clearly.

#landscape #mountains #inversion`),

	post('2025-10-19', ['wallpaper'], `Shoreline
Where the land runs out.

#landscape #sea`),

	post('2025-10-04', ['print3', 'print4', 'print6', 'print5'], `After Dark
Neon, rain and empty streets

Cities change character after midnight. The crowds thin, the traffic slows, and the light stops coming from the sky and starts coming from the signs.

Rain is the secret ingredient. A wet street turns every sign into two, and the reflections give the frame a floor of colour to stand on.

“A wet street turns every sign into two.”

These were shot handheld, wide open, leaning on lamp posts and doorways. The edit pushes the magentas and cyans the signs already give, and leaves the shadows deep.

#city #nightphotography #neon`),

	post('2025-09-21', ['land4'], `Golden Mountain
Ten minutes of gold, then the moon showed up.

#landscape #goldenhour`),

	post('2025-09-06', ['print2'], `Fly Away
Waited forty minutes for this plane. Worth it.

#city #lookingup`),

	post('2025-08-24', ['land5', 'land4', 'wallpaper2', 'land8', 'land2'], `Alpine Light
Golden hour, moonrise and first snow

In the mountains, golden hour is rarely an hour. The sun drops behind a neighbouring ridge and the warm light is gone long before sunset on the clock.

For Golden Mountain the location was scouted the evening before, so when the peaks lit up the composition was already decided. There was time for a handful of frames and nothing else.

“Plan the picture the day before, so the ten minutes are spent taking it.”

The moon was a bonus. It rose into the frame while the rock was still glowing, and the cool sky against the warm stone is what makes the image work.

#landscape #alps #mountains`),

	post('2025-08-09', ['wallpaper2'], `Moonrise Range
Moonrise over first snow.

#landscape #moon`),

	post('2025-07-26', ['print1', 'print2', 'print7', 'print8'], `Looking Up
Towers, canyons and the shapes of the sky

Most people photograph a city at eye level. Tilt the camera up and the streets become canyons, the sky becomes a shape, and familiar buildings turn abstract.

From directly beneath, the Flatiron stops looking like a building and starts looking like the prow of a ship. Converging lines that you would normally correct become the whole point of the picture.

“Tilt the camera up and the streets become canyons.”

Fly Away took the most patience: standing in one spot until a plane crossed the gap between the towers at the right moment.

#city #architecture #lookingup`),

	post('2025-07-09', ['print7'], `Among Giants
Looking up. Always looking up.

#city #architecture`),

	post('2025-06-21', ['land8'], `Blue Paradise
Water this colour should not be legal.

#landscape #lake`),

	post('2025-06-03', ['print8'], `Taking a Shortcut
The shortcut home.

#city #street`),

	post('2025-05-18', ['land6'], `House of the Gods
Storm light on the summit.

#landscape #mountains`),
];

export default {
	fetchedAt: null,
	profile: {
		username: '_ckarras_',
		name: 'CK Photography',
		avatar: '/images/portfolio/land3-800.webp',
		followers_count: null,
		media_count: posts.length,
	},
	posts,
};
