import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Page } from '../components/Layout';
import JustifiedGallery from '../components/JustifiedGallery';
import Lightbox from '../components/Lightbox';
import { CATEGORIES, photos } from '../data/photos';
import { useLang } from '../i18n/LanguageContext';

const FILTERS = ['all', ...Object.keys(CATEGORIES)];

export default function Work() {
	const { t } = useLang();
	const [params, setParams] = useSearchParams();
	const filter = CATEGORIES[params.get('category')] ? params.get('category') : 'all';
	const [open, setOpen] = useState(null);

	const shown = filter === 'all' ? photos : photos.filter((p) => p.category === filter);
	const images = shown.map((p) => ({ src: p.src, alt: p.title, caption: p.title, meta: p.category ? t(`categories.${p.category}`) : undefined }));

	const setFilter = (value) =>
		setParams(value === 'all' ? {} : { category: value }, { replace: true });

	return (
		<Page title={t('work.title')} className="page-work">
			<header className="page-hero container-xxl px-3 px-lg-4">
				<span className="eyebrow">{t('work.eyebrow')}</span>
				<h2 className="page-hero-title">
					{t('work.title')}<sup>{shown.length}</sup>
				</h2>
				<div className="filter-bar" role="group" aria-label={t('work.filterLabel')}>
					{FILTERS.map((value) => (
						<button
							key={value}
							type="button"
							className="chip"
							aria-pressed={filter === value}
							onClick={() => setFilter(value)}
						>
							{value === 'all' ? t('work.all') : t(`categories.${value}`)}
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
