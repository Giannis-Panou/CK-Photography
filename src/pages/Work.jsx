import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Page } from '../components/Layout';
import JustifiedGallery from '../components/JustifiedGallery';
import Lightbox from '../components/Lightbox';
import { CATEGORIES, photos } from '../data/photos';

const FILTERS = [['all', 'All'], ...Object.entries(CATEGORIES)];

export default function Work() {
	const [params, setParams] = useSearchParams();
	const filter = CATEGORIES[params.get('category')] ? params.get('category') : 'all';
	const [open, setOpen] = useState(null);

	const shown = filter === 'all' ? photos : photos.filter((p) => p.category === filter);
	const images = shown.map((p) => ({ src: p.src, alt: p.title, caption: p.title, meta: CATEGORIES[p.category] }));

	const setFilter = (value) =>
		setParams(value === 'all' ? {} : { category: value }, { replace: true });

	return (
		<Page title="Work" className="page-work">
			<header className="page-hero container-xxl px-3 px-lg-4">
				<span className="eyebrow">Portfolio</span>
				<h2 className="page-hero-title">
					Work<sup>{shown.length}</sup>
				</h2>
				<div className="filter-bar" role="group" aria-label="Filter photographs">
					{FILTERS.map(([value, label]) => (
						<button
							key={value}
							type="button"
							className="chip"
							aria-pressed={filter === value}
							onClick={() => setFilter(value)}
						>
							{label}
							<span className="chip-count">
								{value === 'all' ? photos.length : photos.filter((p) => p.category === value).length}
							</span>
						</button>
					))}
				</div>
			</header>

			<div className="container-xxl px-3 px-lg-4 pb-5">
				{/* key replays the fade-in when the filter changes */}
				<JustifiedGallery key={filter} photos={shown} onOpen={setOpen} />
			</div>

			{open !== null && (
				<Lightbox images={images} index={open} onIndexChange={setOpen} onClose={() => setOpen(null)} />
			)}
		</Page>
	);
}
