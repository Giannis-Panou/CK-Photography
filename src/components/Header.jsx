import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TransitionLink } from '../context/PageTransition';
import { navLinks } from '../data/navigation';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../data/instagram';
import AppearancePicker from './AppearancePicker';
import Icon from './Icon';

/** Tracks whether the page is scrolled and whether the header should tuck away. */
function useHeaderScroll() {
	const [state, setState] = useState({ scrolled: false, hidden: false });
	const lastY = useRef(0);

	useEffect(() => {
		const onScroll = () => {
			const y = window.scrollY;
			const goingDown = y > lastY.current;
			const menuOpen = document.querySelector('.site-header .dropdown-menu.show');
			setState({ scrolled: y > 10, hidden: goingDown && y > 240 && !menuOpen });
			lastY.current = y;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return state;
}

/** Full-screen menu for phones and tablets. */
function MenuOverlay({ open, onClose, pathname }) {
	const closeRef = useRef(null);

	useEffect(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		closeRef.current?.focus();
		const onKey = (e) => e.key === 'Escape' && onClose();
		window.addEventListener('keydown', onKey);
		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener('keydown', onKey);
		};
	}, [open, onClose]);

	return (
		<div
			className={`menu-overlay${open ? ' is-open' : ''}`}
			id="site-menu"
			role="dialog"
			aria-modal="true"
			aria-label="Menu"
			inert={!open}
		>
			<div className="menu-overlay-top container-xxl px-3 px-lg-4">
				<span className="menu-overlay-label">Menu</span>
				<button
					ref={closeRef}
					type="button"
					className="icon-btn"
					onClick={onClose}
					aria-label="Close menu"
				>
					<Icon name="close" size={26} />
				</button>
			</div>
			<nav className="menu-overlay-nav container-xxl px-3 px-lg-4" aria-label="Mobile">
				<ol>
					<li style={{ '--i': 0 }}>
						<TransitionLink to="/" onClick={onClose} aria-current={pathname === '/' ? 'page' : undefined}>
							<span className="menu-num">00</span>Home
						</TransitionLink>
					</li>
					{navLinks.map(({ label, to }, i) => (
						<li key={to} style={{ '--i': i + 1 }}>
							<TransitionLink
								to={to}
								onClick={onClose}
								aria-current={pathname.startsWith(to) ? 'page' : undefined}
							>
								<span className="menu-num">{String(i + 1).padStart(2, '0')}</span>
								{label}
							</TransitionLink>
						</li>
					))}
				</ol>
			</nav>
			<div className="menu-overlay-foot container-xxl px-3 px-lg-4">
				<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
					<Icon name="instagram" size={18} /> @{INSTAGRAM_HANDLE}
				</a>
			</div>
		</div>
	);
}

export default function Header() {
	const { scrolled, hidden } = useHeaderScroll();
	const { pathname } = useLocation();
	const [menuOpen, setMenuOpen] = useState(false);
	const closeMenu = useCallback(() => setMenuOpen(false), []);

	// Pages that open with a full-bleed photo get a transparent header
	const overlay = (pathname === '/' || /^\/projects\/.+/.test(pathname)) && !scrolled;
	const classes = ['site-header', scrolled && 'is-scrolled', hidden && !menuOpen && 'is-hidden', overlay && 'is-overlay']
		.filter(Boolean)
		.join(' ');

	return (
		<>
			<header className={classes} id="header">
				<div className="header-inner container-xxl px-3 px-lg-4">
					<TransitionLink to="/" className="site-logo" aria-label="CK Photography, home">
						<span className="logo-mark">CK</span>
						<span className="logo-word d-none d-sm-inline">Photography</span>
					</TransitionLink>

					<nav className="main-nav d-none d-lg-flex" aria-label="Main">
						{navLinks.map(({ label, to }) => (
							<TransitionLink
								key={to}
								to={to}
								className={`nav-btn${pathname.startsWith(to) ? ' active' : ''}`}
							>
								{label}
							</TransitionLink>
						))}
					</nav>

					<div className="header-end">
						<AppearancePicker />
						<a
							href={INSTAGRAM_URL}
							className="icon-btn d-none d-sm-inline-flex"
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`@${INSTAGRAM_HANDLE} on Instagram`}
						>
							<Icon name="instagram" size={20} />
						</a>
						<TransitionLink to="/contact" className="btn btn-accent header-cta d-none d-md-inline-flex">
							Book a shoot
						</TransitionLink>
						<button
							type="button"
							className="icon-btn d-lg-none"
							onClick={() => setMenuOpen(true)}
							aria-expanded={menuOpen}
							aria-controls="site-menu"
							aria-label="Open menu"
						>
							<Icon name="menu" size={24} />
						</button>
					</div>
				</div>
			</header>
			<MenuOverlay open={menuOpen} onClose={closeMenu} pathname={pathname} />
		</>
	);
}
