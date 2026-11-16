// Inline SVG icons drawn with currentColor, so they follow the active theme
// (the old PNG icons were black-only and disappeared on dark backgrounds).
const paths = {
	user: (
		<>
			<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		</>
	),
	bag: (
		<>
			<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
			<path d="M3 6h18" />
			<path d="M16 10a4 4 0 0 1-8 0" />
		</>
	),
	heart: (
		<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
	),
	menu: <path d="M3 6h18M3 12h18M3 18h18" />,
	close: <path d="M18 6 6 18M6 6l12 12" />,
	check: <path d="M20 6 9 17l-5-5" />,
	plus: <path d="M12 5v14M5 12h14" />,
	minus: <path d="M5 12h14" />,
	chevronLeft: <path d="m15 18-6-6 6-6" />,
	chevronRight: <path d="m9 18 6-6-6-6" />,
	chevronDown: <path d="m6 9 6 6 6-6" />,
	arrowRight: <path d="M5 12h14M12 5l7 7-7 7" />,
	expand: (
		<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
	),
	sliders: (
		<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
	),
	star: (
		<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
	),
	theme: (
		<>
			<circle cx="12" cy="12" r="9" />
			<path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
		</>
	),
	mail: (
		<>
			<rect x="2" y="4" width="20" height="16" rx="2" />
			<path d="m22 6-10 7L2 6" />
		</>
	),
	phone: (
		<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
	),
	pin: (
		<>
			<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
			<circle cx="12" cy="10" r="3" />
		</>
	),
	camera: (
		<>
			<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
			<circle cx="12" cy="13" r="4" />
		</>
	),
	grid: (
		<>
			<rect x="3" y="3" width="7" height="7" />
			<rect x="14" y="3" width="7" height="7" />
			<rect x="3" y="14" width="7" height="7" />
			<rect x="14" y="14" width="7" height="7" />
		</>
	),
	gallery: (
		<>
			<rect x="3" y="3" width="7" height="11" />
			<rect x="14" y="3" width="7" height="6" />
			<rect x="3" y="17" width="7" height="4" />
			<rect x="14" y="12" width="7" height="9" />
		</>
	),
	clock: (
		<>
			<circle cx="12" cy="12" r="10" />
			<path d="M12 6v6l4 2" />
		</>
	),
	arrowLeft: <path d="M19 12H5M12 19l-7-7 7-7" />,
	facebook: (
		<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
	),
	instagram: (
		<>
			<rect x="2" y="2" width="20" height="20" rx="5" />
			<circle cx="12" cy="12" r="4" />
			<path d="M17.5 6.5h.01" />
		</>
	),
	pinterest: (
		<>
			<circle cx="12" cy="12" r="10" />
			<path d="m10.5 21.5 2.2-9M9.6 14.2c-1.2-2.8.6-6.7 3.9-6.7 2.6 0 3.9 1.9 3.9 3.8 0 2.7-1.6 4.9-3.8 4.9-1.1 0-1.9-.8-1.7-1.8" />
		</>
	),
	tiktok: (
		<>
			<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
			<path d="M14 3c.5 2.6 2.4 4.5 5 4.8" />
		</>
	),
};

export default function Icon({ name, size = 20, filled = false, className = '', ...rest }) {
	return (
		<svg
			className={`icon ${className}`}
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill={filled ? 'currentColor' : 'none'}
			stroke="currentColor"
			strokeWidth="1.6"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
			{...rest}
		>
			{paths[name]}
		</svg>
	);
}
