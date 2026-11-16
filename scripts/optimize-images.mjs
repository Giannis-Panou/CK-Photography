// Generates web-sized WebP versions of the original photographs and a
// manifest with their dimensions (used for the masonry layouts).
//
//   npm run images
//
// Input:  photos/originals/*  (full-size sources, kept out of public/ so they are not deployed)
// Output: public/images/portfolio/{name}-{width}.webp
//         src/data/photo-manifest.json

import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const inDir = path.join(root, 'photos/originals');
const outDir = path.join(root, 'public/images/portfolio');
const WIDTHS = [800, 1800];

await mkdir(outDir, { recursive: true });
const manifest = {};

const files = (await readdir(inDir)).filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f)).sort();

for (const file of files) {
	const name = path.parse(file).name;
	const input = sharp(path.join(inDir, file)).rotate(); // respect EXIF orientation
	const { width, height } = await input.metadata();

	for (const w of WIDTHS) {
		await input
			.clone()
			.resize({ width: Math.min(w, width), withoutEnlargement: true })
			.webp({ quality: w > 1000 ? 80 : 75 })
			.toFile(path.join(outDir, `${name}-${w}.webp`));
	}
	manifest[name] = { width, height };
	console.log(`${name}: ${width}x${height}`);
}

await writeFile(
	path.join(root, 'src/data/photo-manifest.json'),
	JSON.stringify(manifest, null, '\t') + '\n'
);
console.log(`\n${files.length} photos written to public/images/portfolio`);
