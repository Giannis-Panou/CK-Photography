import { Fragment, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Page } from '../components/Layout';
import ProductActions from '../components/ProductActions';
import ProductCard from '../components/ProductCard';
import Lightbox from '../components/Lightbox';
import Reveal from '../components/Reveal';
import SmartImage from '../components/SmartImage';
import Icon from '../components/Icon';
import { TransitionLink } from '../context/PageTransition';
import items, { findItem } from '../data/catalog';
import { formatPrice } from '../utils/format';

const printDetails = [
	['Dimensions', '24x36 inches'],
	['Print Type', 'Giclée Print'],
	['Print Finish', 'UV Protective Coating'],
	['Paper Quality', 'Archival Quality Fine Art Paper, Matte Finish'],
	['Date of Photograph', 'June 20, 2021'],
	['Signature', 'Hand-signed by the photographer'],
];

// Room mock-ups shown with prints: [thumbnail, full size, description]
const printMockups = [
	['/images/items/portrait-desks/desk6.png', '/images/items/portrait-desks/desk6.webp', 'on a desk'],
	[
		'/images/items/portrait-living-rooms/living6.png',
		'/images/items/portrait-living-rooms/living6.webp',
		'in a living room',
	],
];

// [label, count, bar width]
const ratings = [
	['5 Stars', 250, 82],
	['4 Stars', 168, 65],
	['3 Stars', 87, 48],
	['2 Stars', 26, 26],
	['1 Star', 4, 4],
];
const totalRatings = ratings.reduce((sum, [, n]) => sum + n, 0);

function Reviews() {
	return (
		<section className="section section-surface" aria-labelledby="reviews-heading">
			<div className="container px-3">
				<Reveal className="text-center mb-4">
					<span className="eyebrow">{totalRatings} ratings</span>
					<h2 id="reviews-heading" className="section-title">Reviews</h2>
					<div className="stars" aria-label="Rated 3 out of 5">
						{[1, 2, 3, 4, 5].map((n) => (
							<Icon key={n} name="star" size={18} filled={n <= 3} className={n <= 3 ? 'star-on' : 'star-off'} />
						))}
					</div>
				</Reveal>

				<Reveal className="col-12 col-md-10 col-lg-7 mx-auto" id="reviewDiv" delay={100}>
					{ratings.map(([label, count, width]) => (
						<div key={label} className="py-2 rating-row">
							<p className="mb-0 rating-label">{label}</p>
							<div
								className="rating-bar progress"
								role="progressbar"
								aria-label={`${label} reviews`}
								aria-valuenow={count}
								aria-valuemin={0}
								aria-valuemax={totalRatings}
							>
								<div className="progress-bar" style={{ width: `${width}%` }}></div>
							</div>
							<p className="mb-0 rating-number">{count}</p>
						</div>
					))}
				</Reveal>
			</div>
		</section>
	);
}

function Related({ item }) {
	const pool = item.type === 'print' ? items.prints : items.presets;
	const related = pool
		.filter((i) => i.name !== item.name && i.category === item.category)
		.slice(0, 4);
	if (!related.length) return null;

	return (
		<section className="section">
			<div className="container-xxl px-3 px-lg-4">
				<Reveal className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4 mb-md-5">
					<div>
						<span className="eyebrow">You may also like</span>
						<h2 className="section-title">More from this collection</h2>
					</div>
					<TransitionLink
						to={`/${item.type === 'print' ? 'prints' : 'presets'}?category=${item.category}`}
						className="text-link"
					>
						View all <Icon name="arrowRight" size={16} />
					</TransitionLink>
				</Reveal>
				<ul className="product-grid">
					{related.map((r, i) => (
						<ProductCard key={r.name} item={r} index={i} />
					))}
				</ul>
			</div>
		</section>
	);
}

function ItemView({ item }) {
	const isPrint = item.type === 'print';
	const backTo = isPrint ? '/prints' : '/presets';

	const gallery = [
		{ thumb: item.image, src: item.image, alt: item.name, where: 'on its own' },
		...(isPrint
			? printMockups.map(([thumb, src, where]) => ({ thumb, src, alt: `${item.name} ${where}`, where }))
			: []),
	];
	const [current, setCurrent] = useState(0);
	const [lightboxOpen, setLightboxOpen] = useState(false);

	return (
		<Page title={item.name} className="page-item">
			<div className="container-xxl px-3 px-lg-4">
				<nav aria-label="breadcrumb" className="pt-3 pt-lg-4">
					<ol className="breadcrumb mb-0">
						<li className="breadcrumb-item">
							<TransitionLink to="/">Home</TransitionLink>
						</li>
						<li className="breadcrumb-item">
							<TransitionLink to={backTo}>{isPrint ? 'Prints' : 'Presets'}</TransitionLink>
						</li>
						<li className="breadcrumb-item active" aria-current="page">
							{item.name}
						</li>
					</ol>
				</nav>

				<div className="row g-4 g-lg-5 pt-3 pb-5" id="itemDiv">
					{/* Gallery */}
					<div className="col-12 col-lg-7">
						<button
							type="button"
							className="stage"
							id="imgWrapper"
							onClick={() => setLightboxOpen(true)}
							aria-label={`Enlarge image of ${item.name}`}
						>
							<SmartImage
								key={gallery[current].src}
								className="bigimg"
								id="mainImg"
								src={gallery[current].src}
								alt={gallery[current].alt}
							/>
							<span className="stage-zoom" aria-hidden="true">
								<Icon name="expand" size={18} />
							</span>
						</button>

						{gallery.length > 1 && (
							<ul className="thumbs">
								{gallery.map((g, i) => (
									<li key={g.src}>
										<button
											type="button"
											className="thumb-btn"
											onClick={() => setCurrent(i)}
											aria-pressed={current === i}
											aria-label={`Show ${item.name} ${g.where}`}
										>
											<img src={g.thumb} alt="" />
										</button>
									</li>
								))}
							</ul>
						)}
					</div>

					{/* Purchase panel: stays in view while the gallery scrolls on desktop */}
					<div className="col-12 col-lg-5" id="itemDisc">
						<div className="item-info">
							<span className="eyebrow">
								{item.category === 'portrait' ? 'Portrait' : 'Landscape'}{' '}
								{isPrint ? 'print' : 'preset'}
							</span>
							<h2 className="item-name" id="itemName">
								{item.name}
							</h2>
							<p className="item-price-lg" id="itemPrice">
								{formatPrice(item.price)}
							</p>

							<ProductActions name={item.name} price={item.price} className="is-wide mb-4" />

							{isPrint && (
								<>
									<ul className="perks">
										<li>
											<Icon name="check" size={16} /> Hand-signed by the photographer
										</li>
										<li>
											<Icon name="check" size={16} /> Archival fine art paper
										</li>
									</ul>
									<details className="accordion-lite" open>
										<summary>
											Print details <Icon name="chevronDown" size={18} />
										</summary>
										<dl className="details-list">
											{printDetails.map(([label, value]) => (
												<Fragment key={label}>
													<dt>{label}</dt>
													<dd>{value}</dd>
												</Fragment>
											))}
										</dl>
									</details>
								</>
							)}
						</div>
					</div>
				</div>
			</div>

			<Related item={item} />
			<Reviews />

			{lightboxOpen && (
				<Lightbox
					images={gallery}
					index={current}
					onIndexChange={setCurrent}
					onClose={() => setLightboxOpen(false)}
				/>
			)}
		</Page>
	);
}

/** Product detail page; the item comes from the URL. */
export default function Item() {
	const { name } = useParams();
	const item = findItem(name);

	if (!item) return <Navigate to="/prints" replace />;

	// key resets the gallery state when switching between items
	return <ItemView key={item.name} item={item} />;
}
