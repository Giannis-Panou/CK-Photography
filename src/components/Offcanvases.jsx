import { TransitionLink } from '../context/PageTransition';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/format';
import { findItem, itemPath } from '../data/catalog';
import { presetLinks, printLinks } from '../data/navigation';
import CartItemList from './CartItemList';
import Icon from './Icon';

function OffcanvasHeader({ id, title }) {
	return (
		<div className="offcanvas-header border-bottom">
			<h5 className="offcanvas-title" id={id}>
				{title}
			</h5>
			<button
				type="button"
				className="btn-close"
				data-bs-dismiss="offcanvas"
				aria-label="Close"
			></button>
		</div>
	);
}

function EmptyState({ message, icon }) {
	return (
		<div className="panel-empty">
			<Icon name={icon} size={40} />
			<p>{message}</p>
			<div className="d-flex flex-column gap-2 align-items-center">
				<TransitionLink to="/prints" className="btn btn-accent px-4">
					Browse Prints
				</TransitionLink>
				<TransitionLink to="/presets" className="btn btn-outline-accent px-4">
					Browse Presets
				</TransitionLink>
			</div>
		</div>
	);
}

export function CartOffcanvas() {
	const { cart, total, itemCount } = useCart();

	return (
		<div
			className="offcanvas offcanvas-end cart-modal"
			tabIndex="-1"
			id="offcanvasRight"
			aria-labelledby="offcanvasRightLabel"
		>
			<OffcanvasHeader
				id="offcanvasRightLabel"
				title={itemCount ? `Cart (${itemCount})` : 'Cart'}
			/>
			<div className="offcanvas-body d-flex flex-column pt-0">
				<div className="cart-content">
					{cart.length ? (
						<CartItemList />
					) : (
						<EmptyState icon="bag" message="Your cart is empty." />
					)}
				</div>
				{cart.length > 0 && (
					<div className="cart-total border-top pt-3">
						<div className="d-flex justify-content-between mb-3 fs-5">
							<span>Total</span>
							<span id="totalAmount">{formatPrice(total)}</span>
						</div>
						<TransitionLink
							to="/checkout"
							className="btn btn-accent w-100"
						>
							Proceed to Checkout
						</TransitionLink>
						<button
							type="button"
							className="btn btn-link link-body-emphasis w-100 mt-1"
							data-bs-dismiss="offcanvas"
						>
							Continue shopping
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export function WishlistOffcanvas() {
	const { wishlist, removeWish } = useWishlist();
	const { addToCart } = useCart();

	return (
		<div
			className="offcanvas offcanvas-start wishlist-modal"
			tabIndex="-1"
			id="offcanvasLeft"
			aria-labelledby="offcanvasLeftLabel"
		>
			<OffcanvasHeader
				id="offcanvasLeftLabel"
				title={wishlist.length ? `Wishlist (${wishlist.length})` : 'Wishlist'}
			/>
			<div className="offcanvas-body d-flex flex-column pt-0">
				<div className="wishlist-content">
					{wishlist.length === 0 ? (
						<EmptyState icon="heart" message="Tap the heart on any print or preset to save it here." />
					) : (
						<ul className="panel-items" id="wishlistItems">
							{wishlist.map((item) => (
								<li key={item.name} className="panel-item wishlist-item">
									<img
										className="panel-thumb"
										src={findItem(item.name)?.image}
										alt=""
										loading="lazy"
									/>
									<div>
										<div className="d-flex justify-content-between gap-2">
											<TransitionLink to={itemPath(item.name)} className="panel-item-name">
												{item.name}
											</TransitionLink>
											<span className="text-nowrap">{formatPrice(item.price)}</span>
										</div>
										<div className="panel-item-actions">
											<button
												type="button"
												className="btn btn-accent btn-sm px-3 py-2"
												onClick={() => {
													addToCart(item.name, item.price);
													removeWish(item.name);
												}}
											>
												Move to Cart
											</button>
											<button
												type="button"
												className="link-btn removeButton"
												onClick={() => removeWish(item.name)}
											>
												Remove
											</button>
										</div>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}

function MenuSection({ links }) {
	return links.map(({ label, to }, i) => (
		<li key={label}>
			<TransitionLink to={to} className={i === 0 ? 'menu-heading' : undefined}>
				{label}
			</TransitionLink>
		</li>
	));
}

export function MenuOffcanvas() {
	return (
		<div
			className="offcanvas offcanvas-start menu-modal"
			tabIndex="-1"
			id="offcanvasLeft2"
			aria-labelledby="offcanvasLeft2Label"
		>
			<OffcanvasHeader id="offcanvasLeft2Label" title="Menu" />
			<nav className="offcanvas-body" aria-label="Mobile">
				<ul className="menu-list text-center">
					<MenuSection links={printLinks} />
					<li>
						<hr className="mx-4 my-2" />
					</li>
					<MenuSection links={presetLinks} />
					<li>
						<hr className="mx-4 my-2" />
					</li>
					<li>
						<TransitionLink to="/journal" className="menu-heading">
							Journal
						</TransitionLink>
					</li>
					<li>
						<TransitionLink to="/about" className="menu-heading">
							About CK
						</TransitionLink>
					</li>
					<li>
						<TransitionLink to="/checkout">Checkout</TransitionLink>
					</li>
				</ul>
			</nav>
		</div>
	);
}
