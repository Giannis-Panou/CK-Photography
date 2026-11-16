// Journal entries: the stories behind the photographs.
// NOTE: these are sample entries written to demonstrate the layout;
// replace the text, dates and covers with CK's own stories.

export const journal = [
	{
		slug: 'waiting-for-the-clouds',
		title: 'Waiting for the clouds to break',
		date: '2025-02-14',
		category: 'Landscape',
		cover: '/images/wallpapers/wallpaper3.webp',
		excerpt:
			'Most mountain mornings are grey. This series is about the few minutes when they are not, and the hours of standing still it takes to be there for them.',
		body: [
			{ type: 'p', text: 'Mountain photography is mostly waiting. You arrive before dawn, set up, and watch the cloud sit on the ridge exactly where you hoped it would not. Most mornings it stays there.' },
			{ type: 'p', text: 'The photographs in this series come from the other mornings: the ones where the inversion settles below the peaks and the light comes in low and sideways across the top of it. When it happens, it rarely lasts more than a few minutes.' },
			{ type: 'quote', text: 'You cannot schedule the light. You can only make sure you are standing in the right place when it arrives.' },
			{ type: 'p', text: 'I kept the edits restrained. The colour in the sky is what was there; the work is mostly in protecting the highlights and letting the shadows fall away so the layers of ridge read clearly in print.' },
		],
		prints: ['Above the Clouds', 'Into the Clouds', 'Villain Stronghold', 'House of the Gods'],
	},
	{
		slug: 'neon-after-midnight',
		title: 'Neon after midnight',
		date: '2024-11-03',
		category: 'City',
		cover: '/images/items/originals/print3.jpg',
		excerpt:
			'Wet streets, shop signs and the colour that only appears once the city empties out.',
		body: [
			{ type: 'p', text: 'Cities change character after midnight. The crowds thin, the traffic slows, and the light stops coming from the sky and starts coming from the signs.' },
			{ type: 'p', text: 'Rain is the secret ingredient. A wet street turns every sign into two, and the reflections give the frame a floor of colour to stand on. I watch the forecast for these nights the way landscape photographers watch for snow.' },
			{ type: 'quote', text: 'A wet street turns every sign into two.' },
			{ type: 'p', text: 'These were shot handheld, wide open, leaning on lamp posts and doorways. The edit pushes the magentas and cyans the signs already give, and leaves the shadows deep.' },
		],
		prints: ['Neon City', 'Neon Alley', 'Gray Boulevard', 'Taking a Shortcut'],
	},
	{
		slug: 'looking-up',
		title: 'Looking up',
		date: '2024-06-21',
		category: 'City',
		cover: '/images/items/originals/print1.jpg',
		excerpt:
			'Architecture photographed from the pavement: towers, flight paths and the shapes the sky makes between buildings.',
		body: [
			{ type: 'p', text: 'Most people photograph a city at eye level. Tilt the camera up and the streets become canyons, the sky becomes a shape, and familiar buildings turn abstract.' },
			{ type: 'p', text: 'The Flatiron is the clearest example. From directly beneath, the corner stops looking like a building and starts looking like the prow of a ship. Converging lines that you would normally correct become the whole point of the picture.' },
			{ type: 'quote', text: 'Tilt the camera up and the streets become canyons.' },
			{ type: 'p', text: 'Fly Away took the most patience: standing in one spot until a plane crossed the gap between the towers at the right moment.' },
		],
		prints: ['Flatiron NYC', 'Fly Away', 'Among Giants', 'Urban Jungle'],
	},
	{
		slug: 'ten-minutes-of-gold',
		title: 'Ten minutes of gold',
		date: '2024-03-09',
		category: 'Landscape',
		cover: '/images/wallpapers/wallpaper4.webp',
		excerpt:
			'Golden hour in the mountains is shorter than its name suggests. A few notes on chasing it.',
		body: [
			{ type: 'p', text: 'In the mountains, golden hour is rarely an hour. The sun drops behind a neighbouring ridge and the warm light is gone long before sunset on the clock.' },
			{ type: 'p', text: 'For Golden Mountain I scouted the location the evening before, worked out where the last light would land, and came back with the composition already decided. When the peaks lit up there was time for a handful of frames and nothing else.' },
			{ type: 'quote', text: 'Plan the picture the day before, so the ten minutes are spent taking it.' },
			{ type: 'p', text: 'The moon was a bonus. It rose into the frame while the rock was still glowing, and the cool blue sky against the warm stone is what makes the image work.' },
		],
		prints: ['Golden Mountain', 'Endless Green', 'Below Zero', 'Blue Paradise'],
	},
];

export const findPost = (slug) => journal.find((p) => p.slug === slug);

export const readingTime = (post) => {
	const words = post.body.reduce((n, b) => n + b.text.split(/\s+/).length, 0);
	return Math.max(1, Math.round(words / 200));
};

export const formatDate = (iso) =>
	new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
