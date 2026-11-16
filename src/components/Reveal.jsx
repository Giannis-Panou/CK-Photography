import { useEffect, useRef, useState } from 'react';

/**
 * Fades/slides its content in the first time it scrolls into view.
 * Content is visible immediately when IntersectionObserver is unavailable.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
	const ref = useRef(null);
	const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined');

	useEffect(() => {
		if (visible || !ref.current) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
		);
		observer.observe(ref.current);
		return () => observer.disconnect();
	}, [visible]);

	return (
		<Tag
			ref={ref}
			className={`reveal${visible ? ' is-visible' : ''} ${className}`}
			style={{ ...style, transitionDelay: delay ? `${delay}ms` : undefined }}
			{...rest}
		>
			{children}
		</Tag>
	);
}
