// Instagram feed data.
//
// TODO (Instagram API): once the client has approved access (see
// docs/instagram.md), a build step will fetch the latest posts from
//   GET https://graph.instagram.com/me/media
//       ?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp
// and write them to src/data/instagram.json in exactly this shape.
// Until then the site shows the SAMPLE posts below, built from the
// portfolio's own photographs, to demonstrate the layout.

import { getPhoto } from './photos';

export const INSTAGRAM_HANDLE = '_ckarras_';
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

const sample = [
	['land3', 'Woke up above the clouds. Worth every one of those 4am alarms.', '2025-10-28'],
	['print3', 'Neon and wet asphalt. My favourite combination.', '2025-10-12'],
	['land4', 'Ten minutes of gold, then the moon showed up.', '2025-09-30'],
	['print1', 'Looking up. Always looking up.', '2025-09-14'],
	['wallpaper', 'Where the land runs out.', '2025-08-29'],
	['print4', 'Every alley has a story after midnight.', '2025-08-11'],
	['land7', 'Fog doing what fog does best.', '2025-07-26'],
	['print2', 'Waited forty minutes for this plane. Worth it.', '2025-07-09'],
	['wallpaper2', 'Moonrise over first snow.', '2025-06-21'],
	['print7', 'Among giants.', '2025-06-03'],
	['land6', 'Storm light on the summit.', '2025-05-18'],
	['print8', 'The shortcut home.', '2025-05-02'],
];

const samplePosts = sample.map(([photoId, caption, date], i) => {
	const photo = getPhoto(photoId);
	return {
		id: `sample-${i + 1}`,
		caption,
		media_type: 'IMAGE',
		media_url: photo.thumb,
		thumbnail_url: photo.thumb,
		full_url: photo.src,
		// Real posts link to their own permalink; samples link to the profile
		permalink: INSTAGRAM_URL,
		timestamp: `${date}T18:00:00+0000`,
	};
});

// Swap for `import posts from './instagram.json'` once the API is connected.
export const posts = samplePosts;
export const isSampleFeed = true;
