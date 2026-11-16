import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Page } from '../components/Layout';
import ProductCard from '../components/ProductCard';
import Icon from '../components/Icon';
import items from '../data/catalog';

const COPY = {
	prints: {
		title: 'Prints',
		eyebrow: 'Fine art collection',
		intro:
			'Giclée prints on archival fine art paper, each hand-signed. Cities after dark, mountains above the clouds.',
	},
	presets: {
		title: 'Presets',
		eyebrow: 'Lightroom presets',
		intro: 'The colour grades behind the photographs, ready to use on your own work.',
	},
};

const CATEGORIES = [
	['all', 'All'],
	['portrait', 'Portrait'],
	['landscape', 'Landscape'],
];

const SORTS = {
	featured: { label: 'Featured', fn: null },
	'price-asc': { label: 'Price: low to high', fn: (a, b) => a.price - b.price },
	'price-desc': { label: 'Price: high to low', fn: (a, b) => b.price - a.price },
	name: { label: 'Name: A–Z', fn: (a, b) => a.name.localeCompare(b.name) },
};

/** Filters live in the URL so they survive refresh, back/forward and sharing. */
function useFilters() {
	const [params, setParams] = useSearchParams();
	const filters = {
		category: params.get('category') || 'all',
		min: params.get('min') || '',
		max: params.get('max') || '',
		sort: SORTS[params.get('sort')] ? params.get('sort') : 'featured',
		view: params.get('view') === 'gallery' ? 'gallery' : 'grid',
	};

	const update = (changes) =>
		setParams(
			(prev) => {
				const next = new URLSearchParams(prev);
				for (const [key, value] of Object.entries(changes)) {
					const isDefault =
						value === '' ||
						(key === 'category' && value === 'all') ||
						(key === 'sort' && value === 'featured') ||
						(key === 'view' && value === 'grid');
					isDefault ? next.delete(key) : next.set(key, value);
				}
				return next;
			},
			{ replace: true }
		);

	const activeCount =
		(filters.category !== 'all') + (filters.min !== '') + (filters.max !== '');

	return {
		filters,
		setFilter: (key, value) => update({ [key]: value }),
		clear: () => update({ category: '', min: '', max: '' }),
		activeCount,
	};
}

function Toolbar({ filters, setFilter, clear, activeCount, resultCount, noun }) {
	const [open, setOpen] = useState(activeCount > 0);
	const onChange = (key) => (e) => setFilter(key, e.target.value);

	return (
		<>
			<div className="shop-toolbar">
				<div className="container-xxl px-3 px-lg-4 d-flex align-items-center justify-content-between gap-3">
					<button
						type="button"
						className="filters-toggle btn btn-outline-accent"
						onClick={() => setOpen((o) => !o)}
						aria-expanded={open}
						aria-controls="filters-panel"
					>
						<Icon name={open ? 'close' : 'sliders'} size={16} />
						{/* Icon-only on small phones so the toolbar fits */}
						<span className="visually-hidden-xs">Filter</span>
						{activeCount > 0 && (
							<span className="filters-badge" aria-label={`${activeCount} active`}>
								{activeCount}
							</span>
						)}
					</button>

					<p className="result-count d-none d-md-block" aria-live="polite">
						{resultCount} {resultCount === 1 ? noun.slice(0, -1) : noun}
					</p>

					<div className="d-flex align-items-center gap-2">
					<div className="view-toggle" role="group" aria-label="Layout">
						<button
							type="button"
							aria-pressed={filters.view === 'grid'}
							aria-label="Grid view"
							title="Grid view"
							onClick={() => setFilter('view', 'grid')}
						>
							<Icon name="grid" size={18} />
						</button>
						<button
							type="button"
							aria-pressed={filters.view === 'gallery'}
							aria-label="Gallery view"
							title="Gallery view"
							onClick={() => setFilter('view', 'gallery')}
						>
							<Icon name="gallery" size={18} />
						</button>
					</div>
					<label className="d-flex align-items-center gap-2 m-0">
						<span className="visually-hidden">Sort by</span>
						<select
							className="sort-select form-select"
							value={filters.sort}
							onChange={onChange('sort')}
						>
							{Object.entries(SORTS).map(([value, { label }]) => (
								<option key={value} value={value}>
									{label}
								</option>
							))}
						</select>
					</label>
					</div>
				</div>
			</div>

			<div className="container-xxl px-3 px-lg-4">
				<div id="filters-panel" className={`filters-panel${open ? ' open' : ''}`}>
					<div className="filters-panel-inner" inert={!open}>
						<div className="filters-fields">
							<div className="chip-group" role="group" aria-label="Category">
								{CATEGORIES.map(([value, label]) => (
									<button
										key={value}
										type="button"
										className="chip"
										aria-pressed={filters.category === value}
										onClick={() => setFilter('category', value)}
									>
										{label}
									</button>
								))}
							</div>
							<div>
								<label htmlFor="min-price" className="form-label">
									Min €
								</label>
								<input
									type="number"
									inputMode="decimal"
									id="min-price"
									min="0"
									placeholder="0"
									value={filters.min}
									onChange={onChange('min')}
									className="form-control"
								/>
							</div>
							<div>
								<label htmlFor="max-price" className="form-label">
									Max €
								</label>
								<input
									type="number"
									inputMode="decimal"
									id="max-price"
									min="0"
									placeholder="Any"
									value={filters.max}
									onChange={onChange('max')}
									className="form-control"
								/>
							</div>
							<button
								type="button"
								className="clear-filters btn btn-outline-accent"
								onClick={clear}
								disabled={activeCount === 0}
							>
								Reset
							</button>
						</div>
					</div>
				</div>
				<p className="result-count d-md-none mt-3" aria-live="polite">
					{resultCount} {resultCount === 1 ? noun.slice(0, -1) : noun}
				</p>
			</div>
		</>
	);
}

/** Product listing for /prints and /presets. */
export default function Shop({ type }) {
	const { filters, setFilter, clear, activeCount } = useFilters();
	const copy = COPY[type];
	const min = parseFloat(filters.min);
	const max = parseFloat(filters.max);

	const visible = items[type].filter(
		(item) =>
			(filters.category === 'all' || item.category === filters.category) &&
			(isNaN(min) || item.price >= min) &&
			(isNaN(max) || item.price <= max)
	);
	const sortFn = SORTS[filters.sort].fn;
	if (sortFn) visible.sort(sortFn);

	return (
		<Page title={copy.title} className="page-prints">
			<header className="page-intro container-xxl px-3">
				<span className="eyebrow">{copy.eyebrow}</span>
				<h2>{copy.title}</h2>
				<p>{copy.intro}</p>
			</header>

			<Toolbar
				filters={filters}
				setFilter={setFilter}
				clear={clear}
				activeCount={activeCount}
				resultCount={visible.length}
				noun={type}
			/>

			<div className="container-xxl px-3 px-lg-4 pt-4 pb-5 mb-4">
				{/* key re-runs the reveal cascade whenever the result set changes */}
				<ul
					className={filters.view === 'gallery' ? 'gallery-grid' : 'product-grid'}
					id="items-container"
					key={filters.view + visible.map((i) => i.name).join()}
				>
					{visible.map((item, i) => (
						<ProductCard key={item.name} item={item} index={i} variant={filters.view} />
					))}
					{visible.length === 0 && (
						<li className="empty-results">
							<p>No {type} match these filters.</p>
							<button type="button" className="btn btn-accent" onClick={clear}>
								Reset filters
							</button>
						</li>
					)}
				</ul>
			</div>
		</Page>
	);
}
