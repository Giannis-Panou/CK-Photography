import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Modal, Offcanvas } from 'bootstrap';

const FADE_IN_DELAY = 100;
const FADE_OUT_DURATION = 500;

const PageTransitionContext = createContext(null);

function closeBootstrapOverlays() {
	document
		.querySelectorAll('.offcanvas.show')
		.forEach((el) => Offcanvas.getInstance(el)?.hide());
	document
		.querySelectorAll('.modal.show')
		.forEach((el) => Modal.getInstance(el)?.hide());
}

/**
 * Fades the page out, navigates, then fades the new page in.
 * Replaces the overlay / body-class logic from the old nav.js.
 */
export function PageTransitionProvider({ children }) {
	const navigate = useNavigate();
	const location = useLocation();
	const [visible, setVisible] = useState(false);
	const pending = useRef(null);

	// Fade in on first load and after every navigation (location.key changes
	// even when navigating to the same path).
	useEffect(() => {
		window.scrollTo(0, 0);
		const t = setTimeout(() => setVisible(true), FADE_IN_DELAY);
		return () => clearTimeout(t);
	}, [location.key]);

	useEffect(() => {
		document.body.classList.toggle('show', visible);
		document.body.classList.toggle('hidden', !visible);
	}, [visible]);

	useEffect(() => () => clearTimeout(pending.current), []);

	const transitionTo = useCallback(
		(to) => {
			closeBootstrapOverlays();
			setVisible(false);
			clearTimeout(pending.current);
			pending.current = setTimeout(() => navigate(to), FADE_OUT_DURATION);
		},
		[navigate]
	);

	return (
		<PageTransitionContext.Provider value={transitionTo}>
			<div className={`overlay-reverse${visible ? ' hidden' : ''}`}></div>
			{children}
		</PageTransitionContext.Provider>
	);
}

export function usePageTransition() {
	return useContext(PageTransitionContext);
}

/** A router Link that plays the page fade before navigating. */
export function TransitionLink({ to, onClick, ...props }) {
	const transitionTo = usePageTransition();

	const handleClick = (e) => {
		onClick?.(e);
		const modified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
		if (e.defaultPrevented || e.button !== 0 || modified) return;
		e.preventDefault();
		transitionTo(to);
	};

	return <Link to={to} onClick={handleClick} {...props} />;
}
