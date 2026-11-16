import { useCart } from '../context/CartContext';
import { TransitionLink } from '../context/PageTransition';
import { findItem, itemPath } from '../data/catalog';
import { formatPrice } from '../utils/format';
import Icon from './Icon';

export default function CartItemList({ className = '' }) {
	const { cart, increaseQuantity, decreaseQuantity, removeItem } = useCart();

	return (
		<ul className={`panel-items ${className}`}>
			{cart.map((item) => (
				<li key={item.name} className="panel-item cart-item">
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
							<span className="text-nowrap">
								{formatPrice(item.price * item.count)}
							</span>
						</div>
						{item.count > 1 && (
							<small className="text-body-secondary">
								{formatPrice(item.price)} each
							</small>
						)}
						<div className="panel-item-actions">
							<div className="qty-stepper" role="group" aria-label={`Quantity of ${item.name}`}>
								<button
									type="button"
									className="decreaseButton"
									onClick={() => decreaseQuantity(item.name)}
									aria-label={item.count > 1 ? 'Decrease quantity' : `Remove ${item.name}`}
								>
									<Icon name="minus" size={16} />
								</button>
								<output aria-live="polite">{item.count}</output>
								<button
									type="button"
									className="increaseButton"
									onClick={() => increaseQuantity(item.name)}
									aria-label="Increase quantity"
								>
									<Icon name="plus" size={16} />
								</button>
							</div>
							<button
								type="button"
								className="link-btn removeButton"
								onClick={() => removeItem(item.name)}
							>
								Remove
							</button>
						</div>
					</div>
				</li>
			))}
		</ul>
	);
}
