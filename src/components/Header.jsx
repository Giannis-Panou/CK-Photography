import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TransitionLink } from '../context/PageTransition';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { CORNER_STYLES, THEMES, TYPE_STYLES, useTheme } from '../context/ThemeContext';
import { presetLinks, printLinks } from '../data/navigation';
import Icon from './Icon';

/** Tracks whether the page is scrolled and whether the header should tuck away. */
function useHeaderScroll() {
	const [state, setState] = useState({ scrolled: false, hidden: false });
	const lastY = useRef(0);

	useEffect(() => {
		const onScroll = () => {
			const y = window.scrollY;
			const goingDown = y > lastY.current;
			// Don't hide while a dropdown is open
			const menuOpen = document.querySelector('.site-header .dropdown-menu.show');
			setState({
				scrolled: y > 10,
				hidden: goingDown && y > 240 && !menuOpen,
			});
			lastY.current = y;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return state;
}

function NavDropdown({ label, links, active }) {
	return (
		<div className="dropdown">
			<button
				className={`nav-btn dropdown-toggle${active ? ' active' : ''}`}
				type="button"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				{label}
			</button>
			<ul className="dropdown-menu animate slideIn">
				{links.map(({ label, to }) => (
					<li key={label}>
						<TransitionLink to={to} className="dropdown-item">
							{label}
						</TransitionLink>
					</li>
				))}
			</ul>
		</div>
	);
}

function AppearancePicker() {
	const { theme, type, corners, set } = useTheme();

	return (
		<div className="dropdown">
			<button
				type="button"
				className="icon-btn"
				data-bs-toggle="dropdown"
				data-bs-auto-close="outside"
				aria-expanded="false"
				aria-label="Appearance settings"
			>
				<Icon name="theme" />
			</button>
			<div className="dropdown-menu dropdown-menu-end appearance-menu">
				<fieldset>
					<legend className="eyebrow">Colour</legend>
					{Object.entries(THEMES).map(([key, t]) => (
						<button
							key={key}
							type="button"
							role="radio"
							aria-checked={theme === key}
							className="dropdown-item theme-option"
							onClick={() => set('theme', key)}
						>
							<span className="theme-swatch" style={{ '--a': t.swatch[0], '--b': t.swatch[1] }} />
							<span>
								{t.label}
								<small>{t.description}</small>
							</span>
							<Icon name="check" size={16} className="check" />
						</button>
					))}
				</fieldset>

				<fieldset>
					<legend className="eyebrow">Typography</legend>
					<div className="segmented segmented-3">
						{Object.entries(TYPE_STYLES).map(([key, t]) => (
							<button
								key={key}
								type="button"
								role="radio"
								aria-checked={type === key}
								onClick={() => set('type', key)}
								title={t.description}
							>
								<span className="type-sample" style={{ fontFamily: t.sample }}>Aa</span>
								{t.label}
							</button>
						))}
					</div>
				</fieldset>

				<fieldset>
					<legend className="eyebrow">Corners</legend>
					<div className="segmented">
						{Object.entries(CORNER_STYLES).map(([key, c]) => (
							<button
								key={key}
								type="button"
								role="radio"
								aria-checked={corners === key}
								onClick={() => set('corners', key)}
							>
								<span className={`corner-sample corner-${key}`} aria-hidden="true" />
								{c.label}
							</button>
						))}
					</div>
				</fieldset>
			</div>
		</div>
	);
}

function IconButton({ label, icon, count, ...toggle }) {
	return (
		<button type="button" className="icon-btn" aria-label={label} {...toggle}>
			<Icon name={icon} size={21} />
			{count !== undefined && (
				// key re-mounts the badge so it "pops" whenever the count changes
				<span key={count} className="count-badge" data-count={count} aria-hidden="true">
					{count}
				</span>
			)}
		</button>
	);
}

export default function Header() {
	const { scrolled, hidden } = useHeaderScroll();
	const { pathname } = useLocation();
	const { itemCount } = useCart();
	const { wishCount } = useWishlist();

	// Transparent over the full-bleed hero until the user scrolls
	const overlay = pathname === '/' && !scrolled;
	const classes = [
		'site-header',
		scrolled && 'is-scrolled',
		hidden && 'is-hidden',
		overlay && 'is-overlay',
	]
		.filter(Boolean)
		.join(' ');

	return (
		<header className={classes} id="header">
			<div className="header-inner container-xxl px-2 px-sm-3 px-lg-4">
				<div className="header-start">
					<button
						type="button"
						className="icon-btn d-lg-none"
						data-bs-toggle="offcanvas"
						data-bs-target="#offcanvasLeft2"
						aria-controls="offcanvasLeft2"
						aria-label="Open menu"
					>
						<Icon name="menu" size={24} />
					</button>

					<nav className="main-nav d-none d-lg-flex" aria-label="Main">
						<NavDropdown label="Prints" links={printLinks} active={pathname === '/prints'} />
						<NavDropdown label="Presets" links={presetLinks} active={pathname === '/presets'} />
						<TransitionLink
							to="/journal"
							className={`nav-btn${pathname.startsWith('/journal') ? ' active' : ''}`}
						>
							Journal
						</TransitionLink>
						<TransitionLink
							to="/about"
							className={`nav-btn${pathname === '/about' ? ' active' : ''}`}
						>
							About
						</TransitionLink>
					</nav>
				</div>

				<TransitionLink to="/" className="site-title" aria-label="CK Photography, home">
					<h1 className="m-0" id="title">
						<span className="d-sm-none">CK</span>
						<span className="d-none d-sm-inline">CK Photography</span>
					</h1>
				</TransitionLink>

				<div className="header-end" id="menu-icons">
					<AppearancePicker />
					<IconButton
						label="Log in"
						icon="user"
						data-bs-toggle="modal"
						data-bs-target="#loginModal"
					/>
					<IconButton
						label={`Wishlist, ${wishCount} ${wishCount === 1 ? 'item' : 'items'}`}
						icon="heart"
						count={wishCount}
						data-bs-toggle="offcanvas"
						data-bs-target="#offcanvasLeft"
						aria-controls="offcanvasLeft"
					/>
					<IconButton
						label={`Cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
						icon="bag"
						count={itemCount}
						data-bs-toggle="offcanvas"
						data-bs-target="#offcanvasRight"
						aria-controls="offcanvasRight"
					/>
				</div>
			</div>
		</header>
	);
}
