import { useState } from 'react';
import { posts } from '../data/instagram';
import Lightbox from './Lightbox';
import Reveal from './Reveal';
import SmartImage from './SmartImage';
import Icon from './Icon';
import { useLang } from '../i18n/LanguageContext';

/**
 * Square grid of Instagram posts. The viewer steps through every photo of
 * every shown post, so a carousel opens on its first slide and continues
 * through the rest.
 */
export default function InstagramGrid({ limit = posts.length, className = '' }) {
	const shown = posts.slice(0, limit);
	const [open, setOpen] = useState(null);
	const { t, locale } = useLang();
	const dateFormat = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' });

	const images = [];
	const firstSlide = shown.map((post) => {
		const start = images.length;
		post.media.forEach((m, i) =>
			images.push({
				src: m.src,
				alt: post.title,
				caption: post.subtitle ? `${post.title}: ${post.subtitle}` : post.title,
				meta: [
					dateFormat.format(post.date),
					post.media.length > 1 && t('instagram.slide', { index: i + 1, count: post.media.length }),
					m.type === 'VIDEO' && t('instagram.video'),
				]
					.filter(Boolean)
					.join(' · '),
				link: { href: post.permalink, label: t('instagram.viewPost') },
			})
		);
		return start;
	});

	return (
		<>
			<ul className={`ig-grid ${className}`}>
				{shown.map((post, i) => {
					const cover = post.media[0];
					return (
						<Reveal as="li" key={post.id} delay={(i % 4) * 70}>
							<button
								type="button"
								className="ig-tile"
								onClick={() => setOpen(firstSlide[i])}
								aria-label={[
									t('instagram.openPost', { title: post.title }),
									post.media.length > 1 && t('instagram.photoCount', { count: post.media.length }),
								]
									.filter(Boolean)
									.join(' ')}
							>
								<SmartImage src={cover.thumb} placeholder={cover.placeholder} alt="" loading="lazy" />
								{post.media.length > 1 && (
									<span className="ig-badge" aria-hidden="true">
										<Icon name="stack" size={18} />
									</span>
								)}
								{cover.type === 'VIDEO' && (
									<span className="ig-badge" aria-hidden="true">
										<Icon name="play" size={18} />
									</span>
								)}
								<span className="ig-overlay" aria-hidden="true">
									<Icon name="instagram" size={22} />
									<span className="ig-caption">
										<strong>{post.title}</strong>
										{post.subtitle && <> {post.subtitle}</>}
									</span>
								</span>
							</button>
						</Reveal>
					);
				})}
			</ul>
			{open !== null && (
				<Lightbox images={images} index={open} onIndexChange={setOpen} onClose={() => setOpen(null)} />
			)}
		</>
	);
}
