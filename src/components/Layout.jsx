import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

/** Shell shared by every route. */
export default function Layout() {
	return (
		<div className="d-flex flex-column min-vh-100">
			<a href="#main" className="skip-link">
				Skip to content
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
