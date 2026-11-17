import { useEffect, useRef, useState } from 'react';
import SmartImage from './SmartImage';
import { useLang } from '../i18n/LanguageContext';

/**
 * Justified rows (the Flickr / 500px layout): every photo keeps its shape,
 * each row fills the full width, and rows have equal height. Possible because
 * the photo manifest knows every image's aspect ratio up front.
 */
function buildRows(photos, width, targetHeight, gap) {
	const rows = [];
	let row = [];
	let ratioSum = 0;

	for (const photo of photos) {
		row.push(photo);
		ratioSum += photo.ratio;
		const rowWidthAtTarget = ratioSum * targetHeight + gap * (row.length - 1);
		if (rowWidthAtTarget >= width) {
			const height = (width - gap * (row.length - 1)) / ratioSum;
			rows.push({ photos: row, height });
			row = [];
			ratioSum = 0;
		}
	}
	// Last row keeps the target height instead of being stretched
	if (row.length) rows.push({ photos: row, height: targetHeight, last: true });
	return rows;
}

export default function JustifiedGallery({ photos, onOpen }) {
	const { t } = useLang();
	const ref = useRef(null);
	const [width, setWidth] = useState(0);

	useEffect(() => {
		const el = ref.current;
		const observer = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)));
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	const isPhone = width < 576;
	const gap = isPhone ? 6 : 12;
	const targetHeight = isPhone ? 190 : width < 1200 ? 300 : 380;
	const rows = width ? buildRows(photos, width, targetHeight, gap) : [];

	return (
		<div ref={ref} className="justified" style={{ '--gap': `${gap}px` }}>
			{rows.map((row, r) => (
				<div className="justified-row" key={r} style={{ height: row.height }}>
					{row.photos.map((photo) => (
						<button
							key={photo.id}
							type="button"
							className="justified-item"
							style={{ width: row.height * photo.ratio }}
							onClick={() => onOpen(photos.indexOf(photo))}
							aria-label={t('viewer.open', { title: photo.title })}
						>
							<SmartImage
								src={photo.thumb} placeholder={photo.placeholder}
								srcSet={photo.srcSet}
								sizes={`${Math.ceil(row.height * photo.ratio)}px`}
								alt={photo.title}
								loading="lazy"
							/>
							<span className="justified-caption">{photo.title}</span>
						</button>
					))}
				</div>
			))}
		</div>
	);
}
