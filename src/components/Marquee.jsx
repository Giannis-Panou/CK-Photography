/** Endless scrolling strip of words; pauses on hover and for reduced motion. */
export default function Marquee({ items, className = '' }) {
	const content = items.map((item, i) => (
		<span key={i} className="marquee-item">
			{item}
			<span className="marquee-dot" aria-hidden="true" />
		</span>
	));

	return (
		<div className={`marquee ${className}`} aria-label={items.join(', ')} role="marquee">
			<div className="marquee-track" aria-hidden="true">
				{content}
				{content}
			</div>
		</div>
	);
}
