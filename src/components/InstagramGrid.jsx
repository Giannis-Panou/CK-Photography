import { useState } from 'react';
import { posts } from '../data/instagram';
import Lightbox from './Lightbox';
import Reveal from './Reveal';
import SmartImage from './SmartImage';
import Icon from './Icon';

const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/** Square grid of Instagram posts; opens each post in the lightbox with its caption. */
export default function InstagramGrid({ limit = posts.length, className = '' }) {
	const shown = posts.slice(0, limit);
	const [open, setOpen] = useState(null);

	const images = shown.map((p) => ({
		src: p.full_url ?? p.media_url,
		alt: p.caption,
		caption: p.caption,
		meta: dateFormat.format(new Date(p.timestamp)),
		link: { href: p.permalink, label: 'View on Instagram' },
	}));

	return (
		<>
			<ul className={`ig-grid ${className}`}>
				{shown.map((post, i) => (
					<Reveal as="li" key={post.id} delay={(i % 4) * 70}>
						<button
							type="button"
							className="ig-tile"
							onClick={() => setOpen(i)}
							aria-label={`Open post: ${post.caption}`}
						>
							<SmartImage src={post.thumbnail_url ?? post.media_url} alt="" loading="lazy" />
							<span className="ig-overlay" aria-hidden="true">
								<Icon name="instagram" size={22} />
								<span className="ig-caption">{post.caption}</span>
							</span>
						</button>
					</Reveal>
				))}
			</ul>
			{open !== null && (
				<Lightbox images={images} index={open} onIndexChange={setOpen} onClose={() => setOpen(null)} />
			)}
		</>
	);
}
