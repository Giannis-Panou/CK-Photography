import { useEffect, useRef, useState } from 'react';

/** An <img> that fades in once loaded instead of popping in line by line. */
export default function SmartImage({ className = '', onLoad, ...props }) {
	const ref = useRef(null);
	const [loaded, setLoaded] = useState(false);

	// Cached images can finish before React attaches onLoad
	useEffect(() => {
		if (ref.current?.complete && ref.current.naturalWidth) setLoaded(true);
	}, [props.src]);

	return (
		<img
			ref={ref}
			className={`smart-img${loaded ? ' is-loaded' : ''} ${className}`}
			onLoad={(e) => {
				setLoaded(true);
				onLoad?.(e);
			}}
			{...props}
		/>
	);
}
