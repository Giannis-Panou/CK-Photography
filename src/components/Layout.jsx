import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useLang } from '../i18n/LanguageContext';
import { PROTECT_IMAGES } from '../data/navigation';

/**
 * Light protection for the photographs: no context menu or dragging on
 * images (including the viewer, which renders outside this layout), plus the
 * CSS in theme.scss. A deterrent only; nothing on the web stops screenshots.
 */
function useImageProtection() {
	useEffect(() => {
		if (!PROTECT_IMAGES) return;
		const block = (e) => {
			if (e.target instanceof HTMLImageElement) e.preventDefault();
		};
		document.body.classList.add('protect-images');
		document.addEventListener('contextmenu', block);
		document.addEventListener('dragstart', block);
		return () => {
			document.body.classList.remove('protect-images');
			document.removeEventListener('contextmenu', block);
			document.removeEventListener('dragstart', block);
		};
	}, []);
}

/** Shell shared by every route. */
export default function Layout() {
	const { t } = useLang();
	useImageProtection();
	return (
		<div className="d-flex flex-column min-vh-100">
			<a href="#main" className="skip-link">
				{t('header.skip')}
			</a>
			<Header />
			<Outlet />
		</div>
	);
}

/** Wraps a page's content: sets the tab title and renders the footer. */
export function Page({ title, footerCta = true, className = '', children }) {
	useEffect(() => {
		document.title = title === 'CK Photography' ? title : `${title} | CK Photography`;
	}, [title]);

	return (
		<>
			<main id="main" className={`flex-grow-1 ${className}`}>
				{children}
			</main>
			<Footer showCta={footerCta} />
		</>
	);
}
