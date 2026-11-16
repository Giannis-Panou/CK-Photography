import { useEffect, useRef, useState } from 'react';
import { Offcanvas } from 'bootstrap';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { findItem } from '../data/catalog';
import Icon from './Icon';

export function openPanel(id) {
	const el = document.getElementById(id);
	if (el) Offcanvas.getOrCreateInstance(el).show();
}

/** "Add to Cart" + heart toggle, shared by the shop grid and the item page. */
export default function ProductActions({ name, price, className = '', compact = false, iconOnly = false }) {
	const { addToCart } = useCart();
	const { isWished, toggleWish } = useWishlist();
	const notify = useToast();
	const [added, setAdded] = useState(false);
	const timer = useRef();
	const wished = isWished(name);
	const image = findItem(name)?.image;

	useEffect(() => () => clearTimeout(timer.current), []);

	const handleAdd = () => {
		addToCart(name, price);
		setAdded(true);
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setAdded(false), 1500);
		notify({
			title: 'Added to cart',
			message: name,
			image,
			action: { label: 'View cart', onClick: () => openPanel('offcanvasRight') },
		});
	};

	const handleWish = () => {
		toggleWish(name, price);
		notify({
			title: wished ? 'Removed from wishlist' : 'Saved to wishlist',
			message: name,
			image,
			action: wished ? undefined : { label: 'View', onClick: () => openPanel('offcanvasLeft') },
		});
	};

	return (
		<div className={`item-buttons${iconOnly ? ' icon-only' : ''} ${className}`}>
			<button
				type="button"
				className={`add-btn btn ${iconOnly ? 'btn-outline-accent' : 'btn-accent'}${added ? ' is-added' : ''}`}
				onClick={handleAdd}
				aria-label={`Add ${name} to cart`}
			>
				<Icon name={added ? 'check' : 'bag'} size={17} />
				{iconOnly ? null : compact ? (
					<>
						<span className="d-sm-none">{added ? 'Added' : 'Add'}</span>
						<span className="d-none d-sm-inline">{added ? 'Added' : 'Add to Cart'}</span>
					</>
				) : (
					<span>{added ? 'Added' : 'Add to Cart'}</span>
				)}
			</button>
			<button
				type="button"
				className={`wish-btn btn btn-outline-accent${wished ? ' is-wished' : ''}`}
				onClick={handleWish}
				aria-pressed={wished}
				aria-label={`${wished ? 'Remove' : 'Save'} ${name} ${wished ? 'from' : 'to'} wishlist`}
			>
				<Icon name="heart" size={18} filled={wished} />
			</button>
		</div>
	);
}
