// Generates web-sized WebP versions of the original photographs, plus a
// manifest with their dimensions (for the justified layouts) and a tiny
// blurred placeholder each. These are the SAMPLE feed's photos.
//
//   npm run images            (only new photos)
//   npm run images -- --force (redo all, e.g. after changing WATERMARK_TEXT)
//
// Input:  photos/originals/*  (full-size sources, kept out of public/ so they are not deployed)
// Output: public/images/portfolio/{name}-{width}.webp
//         src/data/photo-manifest.json

import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { placeholder, watermarkText, writeWebp } from './lib/image-tools.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const inDir = path.join(root, 'photos/originals');
const outDir = path.join(root, 'public/images/portfolio');
const manifestFile = path.join(root, 'src/data/photo-manifest.json');
const WIDTHS = [800, 1800];
const force = process.argv.includes('--force');

try {
	process.loadEnvFile(path.join(root, '.env'));
} catch {
	// no .env file
}

await mkdir(outDir, { recursive: true });
const previous = existsSync(manifestFile) ? JSON.parse(await readFile(manifestFile, 'utf8')) : {};
const manifest = {};

const files = (await readdir(inDir)).filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f)).sort();
if (watermarkText()) console.log(`Watermark: "${watermarkText()}"`);

for (const file of files) {
	const name = path.parse(file).name;
	const outputs = WIDTHS.map((w) => path.join(outDir, `${name}-${w}.webp`));
	const done = !force && previous[name]?.placeholder && outputs.every((f) => existsSync(f));
	if (done) {
		manifest[name] = previous[name];
		continue;
	}

	const input = sharp(path.join(inDir, file)).rotate(); // respect EXIF orientation
	const { width, height, orientation } = await input.metadata();
	// EXIF orientations 5-8 are rotated 90°, so width and height swap
	const [w, h] = orientation >= 5 ? [height, width] : [width, height];

	for (const [i, size] of WIDTHS.entries()) {
		await writeWebp(input, { width: size, sourceWidth: w, quality: size > 1000 ? 80 : 75, file: outputs[i] });
	}
	manifest[name] = { width: w, height: h, placeholder: await placeholder(input) };
	console.log(`${name}: ${w}x${h}`);
}

await writeFile(manifestFile, JSON.stringify(manifest, null, '\t') + '\n');
console.log(`\n${files.length} photos in public/images/portfolio`);
