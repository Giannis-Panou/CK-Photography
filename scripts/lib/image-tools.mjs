// Shared by optimize-images.mjs (sample photos) and fetch-instagram.mjs.
import sharp from 'sharp';

/**
 * A tiny version of the photo as a data URI (a few hundred bytes). The site
 * shows it stretched, which reads as a soft blur, until the real image loads.
 */
export async function placeholder(image) {
	const buffer = await image.clone().resize({ width: 24 }).webp({ quality: 45 }).toBuffer();
	return `data:image/webp;base64,${buffer.toString('base64')}`;
}

/**
 * Optional watermark, e.g. WATERMARK_TEXT="© CK Photography" in .env or the
 * Netlify environment. Empty or unset means no watermark.
 */
// Read when used, so a value from .env (loaded by the calling script) counts
export const watermarkText = () => (process.env.WATERMARK_TEXT ?? '').trim();

const escapeXml = (text) =>
	text.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]);

/** An SVG overlay with the watermark text in the bottom-right corner. */
function watermarkSvg(width, height, text) {
	const size = Math.max(12, Math.round(width * 0.022));
	const pad = Math.round(size * 1.1);
	return Buffer.from(
		`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
			<text x="${width - pad}" y="${height - pad}" text-anchor="end"
				font-family="Inter, 'Segoe UI', 'DejaVu Sans', Arial, sans-serif" font-size="${size}" font-weight="600"
				fill="#fff" fill-opacity="0.6" stroke="#000" stroke-opacity="0.25" stroke-width="${(size * 0.05).toFixed(1)}"
				paint-order="stroke">${escapeXml(text)}</text>
		</svg>`
	);
}

/**
 * Resizes to `width` and writes a WebP, adding the watermark when one is set.
 * Returns the actual width written (never larger than the original).
 */
export async function writeWebp(image, { width, sourceWidth, quality, file, watermark = true }) {
	const actual = Math.min(width, sourceWidth);
	let out = image.clone().resize({ width: actual });
	const text = watermark ? watermarkText() : '';
	if (text) {
		// Composite after resizing so the text stays the same relative size
		const { data, info } = await out.raw().toBuffer({ resolveWithObject: true });
		out = sharp(data, { raw: info }).composite([
			{ input: watermarkSvg(info.width, info.height, text), gravity: 'southeast' },
		]);
	}
	await out.webp({ quality }).toFile(file);
	return actual;
}
