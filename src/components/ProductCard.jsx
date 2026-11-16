import { TransitionLink } from '../context/PageTransition';
import { itemPath } from '../data/catalog';
import ProductActions from './ProductActions';
import Reveal from './Reveal';
import SmartImage from './SmartImage';

const CATEGORY_LABEL = { portrait: 'Portrait', landscape: 'Landscape' };

/**
 * variant "grid": uniform square tiles with full buttons (shop default).
 * variant "gallery": the photo at its natural shape, portfolio style,
 * with a slim caption row and icon buttons.
 */
export default function ProductCard({ item, index = 0, variant = 'grid' }) {
	const kind = `${CATEGORY_LABEL[item.category]} ${item.type === 'print' ? 'print' : 'preset'}`;

	if (variant === 'gallery') {
		return (
			<Reveal as="li" className="gallery-card" delay={(index % 3) * 90}>
				<TransitionLink to={itemPath(item.name)} className="gallery-link">
					<SmartImage src={item.image} alt={item.name} loading="lazy" />
				</TransitionLink>
				<div className="gallery-caption">
					<TransitionLink to={itemPath(item.name)} className="gallery-text">
						<span className="item-title">{item.title}</span>
						<span className="gallery-meta">
							{kind} · {item.price.toFixed(2)} €
						</span>
					</TransitionLink>
					<ProductActions name={item.name} price={item.price} iconOnly />
				</div>
			</Reveal>
		);
	}

	return (
		// Stagger cards in a row so they cascade in
		<Reveal as="li" className="product-card" delay={(index % 4) * 80}>
			<TransitionLink to={itemPath(item.name)} className="product-link">
				<div className="product-image">
					<SmartImage src={item.image} alt={item.name} loading="lazy" />
					<span className="product-view" aria-hidden="true">View</span>
				</div>
				<div className="product-meta">
					<span className="product-category">{kind}</span>
					<p className="item-title">{item.title}</p>
					<p className="item-price">{item.price.toFixed(2)} €</p>
				</div>
			</TransitionLink>
			<ProductActions name={item.name} price={item.price} compact />
		</Reveal>
	);
}
