import { getPhotos } from './photos';

// Photo series with the story behind each one.
// NOTE: the texts are sample copy written to demonstrate the layout;
// replace them with CK's own words.
const raw = [
	{
		slug: 'after-dark',
		title: 'After Dark',
		subtitle: 'Neon, rain and empty streets',
		year: '2024',
		location: 'City',
		cover: 'print3',
		photos: ['print3', 'print4', 'print6', 'print5'],
		intro:
			'Cities change character after midnight. The crowds thin, the traffic slows, and the light stops coming from the sky and starts coming from the signs.',
		body: [
			'Rain is the secret ingredient. A wet street turns every sign into two, and the reflections give the frame a floor of colour to stand on.',
			'These were shot handheld, wide open, leaning on lamp posts and doorways. The edit pushes the magentas and cyans the signs already give, and leaves the shadows deep.',
		],
		quote: 'A wet street turns every sign into two.',
	},
	{
		slug: 'looking-up',
		title: 'Looking Up',
		subtitle: 'Towers, canyons and the shapes of the sky',
		year: '2024',
		location: 'City',
		cover: 'print1',
		photos: ['print1', 'print2', 'print7', 'print8'],
		intro:
			'Most people photograph a city at eye level. Tilt the camera up and the streets become canyons, the sky becomes a shape, and familiar buildings turn abstract.',
		body: [
			'From directly beneath, the Flatiron stops looking like a building and starts looking like the prow of a ship. Converging lines that you would normally correct become the whole point of the picture.',
			'Fly Away took the most patience: standing in one spot until a plane crossed the gap between the towers at the right moment.',
		],
		quote: 'Tilt the camera up and the streets become canyons.',
	},
	{
		slug: 'above-the-clouds',
		title: 'Above the Clouds',
		subtitle: 'Inversions, fog and the minutes in between',
		year: '2025',
		location: 'Mountains',
		cover: 'land3',
		photos: ['land3', 'land1', 'land7', 'land6', 'wallpaper1'],
		intro:
			'Mountain photography is mostly waiting. You arrive before dawn, set up, and watch the cloud sit on the ridge exactly where you hoped it would not.',
		body: [
			'These photographs come from the other mornings: the ones where the inversion settles below the peaks and the light comes in low across the top of it. When it happens, it rarely lasts more than a few minutes.',
			'The edits are restrained. The colour in the sky is what was there; the work is in protecting the highlights and letting the layers of ridge read clearly.',
		],
		quote: 'You cannot schedule the light. You can only be standing in the right place when it arrives.',
	},
	{
		slug: 'alpine-light',
		title: 'Alpine Light',
		subtitle: 'Golden hour, moonrise and first snow',
		year: '2024',
		location: 'Mountains',
		cover: 'land4',
		photos: ['land4', 'wallpaper2', 'land5', 'land8', 'land2'],
		intro:
			'In the mountains, golden hour is rarely an hour. The sun drops behind a neighbouring ridge and the warm light is gone long before sunset on the clock.',
		body: [
			'For Golden Mountain the location was scouted the evening before, so when the peaks lit up the composition was already decided. There was time for a handful of frames and nothing else.',
			'The moon was a bonus. It rose into the frame while the rock was still glowing, and the cool sky against the warm stone is what makes the image work.',
		],
		quote: 'Plan the picture the day before, so the ten minutes are spent taking it.',
	},
];

export const projects = raw.map((p) => ({
	...p,
	coverPhoto: getPhotos([p.cover])[0],
	images: getPhotos(p.photos),
}));

export const getProject = (slug) => projects.find((p) => p.slug === slug);
