import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon';
import { useLang } from '../i18n/LanguageContext';

/**
 * Full-screen image viewer: Esc closes, arrow keys / swipe move between images.
 * images: [{ src, alt }]
 */
export default function Lightbox({ images, index, onIndexChange, onClose }) {
	const { t } = useLang();
	const closeRef = useRef(null);
	const touchX = useRef(null);
	const count = images.length;
	const go = (step) => onIndexChange((index + step + count) % count);

	useEffect(() => {
		const previousFocus = document.activeElement;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		closeRef.current?.focus();
		return () => {
			document.body.style.overflow = previousOverflow;
			previousFocus?.focus?.();
		};
	}, []);

	useEffect(() => {
		const onKey = (e) => {
			if (e.key === 'Escape') onClose();
			else if (e.key === 'ArrowRight' && count > 1) onIndexChange((index + 1) % count);
			else if (e.key === 'ArrowLeft' && count > 1) onIndexChange((index - 1 + count) % count);
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [index, count, onClose, onIndexChange]);

	const image = images[index];

	return createPortal(
		<div
			className="lightbox"
			role="dialog"
			aria-modal="true"
			aria-label={t('viewer.label')}
			onClick={(e) => e.target === e.currentTarget && onClose()}
			onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
			onTouchEnd={(e) => {
				if (touchX.current === null || count < 2) return;
				const dx = e.changedTouches[0].clientX - touchX.current;
				if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
				touchX.current = null;
			}}
		>
			<button
				ref={closeRef}
				type="button"
				className="lightbox-btn lightbox-close"
				onClick={onClose}
				aria-label={t('viewer.close')}
			>
				<Icon name="close" size={26} />
			</button>

			<figure className="lightbox-figure">
				<img key={image.src} className="lightbox-img" src={image.src} alt={image.alt} />
				{(image.caption || image.meta || image.link) && (
					<figcaption className="lightbox-info">
						{image.caption && <span className="lightbox-caption">{image.caption}</span>}
						{image.meta && <span className="lightbox-meta">{image.meta}</span>}
						{image.link && (
							<a href={image.link.href} target="_blank" rel="noopener noreferrer">
								{image.link.label}
							</a>
						)}
					</figcaption>
				)}
			</figure>

			{count > 1 && (
				<>
					<button
						type="button"
						className="lightbox-btn lightbox-prev"
						onClick={() => go(-1)}
						aria-label={t('viewer.previous')}
					>
						<Icon name="chevronLeft" size={30} />
					</button>
					<button
						type="button"
						className="lightbox-btn lightbox-next"
						onClick={() => go(1)}
						aria-label={t('viewer.next')}
					>
						<Icon name="chevronRight" size={30} />
					</button>
					<p className="lightbox-counter" aria-live="polite">
						{index + 1} / {count}
					</p>
				</>
			)}
		</div>,
		document.body
	);
}
