import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AuthModals from './AuthModals';
import { CartOffcanvas, MenuOffcanvas, WishlistOffcanvas } from './Offcanvases';

/** Shell shared by every route: modals, offcanvas panels and header. */
export default function Layout() {
	return (
		<>
			<AuthModals />
			<CartOffcanvas />
			<WishlistOffcanvas />
			<MenuOffcanvas />

			{/* Flex column keeps the footer at the bottom on short pages
			    (replaces the old adjustFooterPosition / MutationObserver). */}
			<div className="d-flex flex-column min-vh-100">
				<Header />
				<Outlet />
			</div>
		</>
	);
}

/** Wraps a page's content: sets the tab title and renders the footer. */
export function Page({ title, footerClass, className = '', children }) {
	useEffect(() => {
		document.title = title;
	}, [title]);

	return (
		<>
			<main className={`flex-grow-1 ${className}`}>{children}</main>
			<Footer className={footerClass} />
		</>
	);
}
