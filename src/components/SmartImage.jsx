import { useEffect, useRef, useState } from 'react';

/**
 * An <img> that doesn't pop in line by line.
 * With a `placeholder` (tiny data URI from the image scripts) it shows a soft
 * blurred preview straight away and pulls into focus once loaded; without one
 * it fades in.
 */
export default function SmartImage({ className = '', placeholder, style, onLoad, ...props }) {
	const ref = useRef(null);
	const [loaded, setLoaded] = useState(false);

	// Cached images can finish before React attaches onLoad
	useEffect(() => {
		if (ref.current?.complete && ref.current.naturalWidth) setLoaded(true);
	}, [props.src]);

	const classes = ['smart-img', placeholder && 'has-placeholder', loaded && 'is-loaded', className].filter(Boolean);

	return (
		<img
			ref={ref}
			className={classes.join(' ')}
			style={placeholder ? { ...style, backgroundImage: `url("${placeholder}")` } : style}
			onLoad={(e) => {
				setLoaded(true);
				onLoad?.(e);
			}}
			{...props}
		/>
	);
}
