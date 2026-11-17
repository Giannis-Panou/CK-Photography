import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TransitionLink } from '../context/PageTransition';
import { navLinks } from '../data/navigation';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../data/instagram';
import AppearancePicker from './AppearancePicker';
import Icon from './Icon';
import { LanguageToggle, useLang } from '../i18n/LanguageContext';

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
	const { t } = useLang();
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
			aria-label={t('header.menu')}
			inert={!open}
		>
			<div className="menu-overlay-top container-xxl px-3 px-lg-4">
				<span className="menu-overlay-label">{t('header.menu')}</span>
				<button
					ref={closeRef}
					type="button"
					className="icon-btn"
					onClick={onClose}
					aria-label={t('header.closeMenu')}
				>
					<Icon name="close" size={26} />
				</button>
			</div>
			<nav className="menu-overlay-nav container-xxl px-3 px-lg-4" aria-label={t('nav.mobile')}>
				<ol>
					<li style={{ '--i': 0 }}>
						<TransitionLink to="/" onClick={onClose} aria-current={pathname === '/' ? 'page' : undefined}>
							<span className="menu-num">00</span>{t('nav.home')}
						</TransitionLink>
					</li>
					{navLinks.map(({ key, to }, i) => (
						<li key={to} style={{ '--i': i + 1 }}>
							<TransitionLink
								to={to}
								onClick={onClose}
								aria-current={pathname.startsWith(to) ? 'page' : undefined}
							>
								<span className="menu-num">{String(i + 1).padStart(2, '0')}</span>
								{t(`nav.${key}`)}
							</TransitionLink>
						</li>
					))}
				</ol>
			</nav>
			<div className="menu-overlay-foot container-xxl px-3 px-lg-4">
				<LanguageToggle className="menu-lang" />
				<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
					<Icon name="instagram" size={18} /> @{INSTAGRAM_HANDLE}
				</a>
			</div>
		</div>
	);
}

export default function Header() {
	const { t } = useLang();
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
					<TransitionLink to="/" className="site-logo" aria-label={t('header.homeLabel')}>
						<span className="logo-mark">CK</span>
						<span className="logo-word d-none d-sm-inline">Photography</span>
					</TransitionLink>

					<nav className="main-nav d-none d-lg-flex" aria-label={t('nav.main')}>
						{navLinks.map(({ key, to }) => (
							<TransitionLink
								key={to}
								to={to}
								className={`nav-btn${pathname.startsWith(to) ? ' active' : ''}`}
							>
								{t(`nav.${key}`)}
							</TransitionLink>
						))}
					</nav>

					<div className="header-end">
						<LanguageToggle className="d-none d-lg-inline-flex" />
						<AppearancePicker />
						<a
							href={INSTAGRAM_URL}
							className="icon-btn d-none d-sm-inline-flex"
							target="_blank"
							rel="noopener noreferrer"
							aria-label={t('header.onInstagram', { handle: INSTAGRAM_HANDLE })}
						>
							<Icon name="instagram" size={20} />
						</a>
						<TransitionLink to="/contact" className="btn btn-accent header-cta d-none d-md-inline-flex">
							{t('header.cta')}
						</TransitionLink>
						<button
							type="button"
							className="icon-btn d-lg-none"
							onClick={() => setMenuOpen(true)}
							aria-expanded={menuOpen}
							aria-controls="site-menu"
							aria-label={t('header.openMenu')}
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
