import { useEffect, useRef, useState } from 'react';
import { Carousel } from 'bootstrap';
import { Page } from '../components/Layout';
import { TransitionLink } from '../context/PageTransition';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import SmartImage from '../components/SmartImage';
import Icon from '../components/Icon';
import items from '../data/catalog';
import { journal } from '../data/journal';
import { PostMeta } from './Journal';

const slides = ['wallpaper3', 'wallpaper1', 'wallpaper2', 'wallpaper', 'wallpaper4', 'wallpaper5', 'wallpaper6'];
const pad = (n) => String(n).padStart(2, '0');

// A mix of city and landscape work for the home page
const featured = ['Neon City', 'Above the Clouds', 'Flatiron NYC', 'Golden Mountain']
	.map((name) => items.prints.find((p) => p.name === name))
	.filter(Boolean);

function Hero() {
	const ref = useRef(null);
	const [active, setActive] = useState(0);

	// Bootstrap only auto-starts carousels on window load, so start it here
	// for client-side navigations back to the home page too.
	useEffect(() => {
		const el = ref.current;
		const carousel = Carousel.getOrCreateInstance(el, { interval: 6000, pause: false });
		carousel.cycle();
		const onSlide = (e) => setActive(e.to);
		el.addEventListener('slide.bs.carousel', onSlide);
		return () => {
			el.removeEventListener('slide.bs.carousel', onSlide);
			carousel.dispose();
		};
	}, []);

	return (
		<section className="hero" aria-label="Featured photographs">
			<div
				id="heroCarousel"
				className="carousel slide carousel-fade h-100"
				ref={ref}
			>
				<div className="carousel-inner h-100">
					{slides.map((src, i) => (
						<div
							key={src}
							className={`carousel-item h-100${i === 0 ? ' active' : ''}`}
						>
							<img
								src={`/images/wallpapers/${src}.webp`}
								className="hero-img"
								alt=""
								fetchPriority={i === 0 ? 'high' : undefined}
								loading={i === 0 ? 'eager' : 'lazy'}
							/>
						</div>
					))}
				</div>
			</div>

			<div className="hero-content container-xxl px-3 px-lg-4">
				<span className="eyebrow hero-eyebrow">Fine art photography · Thessaloniki</span>
				<h2 className="hero-title">
					Light, place &amp;
					<br />
					the moments between
				</h2>
				<div className="d-flex flex-wrap gap-2 gap-sm-3">
					<TransitionLink to="/prints" className="btn btn-on-image">
						Shop prints
					</TransitionLink>
					<TransitionLink to="/presets" className="btn btn-outline-on-image">
						Explore presets
					</TransitionLink>
				</div>
			</div>

			<div className="hero-footer container-xxl px-3 px-lg-4">
				<div className="hero-indicators" role="group" aria-label="Choose slide">
					{slides.map((src, i) => (
						<button
							key={src}
							type="button"
							data-bs-target="#heroCarousel"
							data-bs-slide-to={i}
							className={i === active ? 'active' : undefined}
							aria-current={i === active}
							aria-label={`Slide ${i + 1} of ${slides.length}`}
						/>
					))}
				</div>
				<p className="hero-caption">
					<span>{pad(active + 1)}</span> / {pad(slides.length)}
				</p>
			</div>

			<button
				type="button"
				className="hero-scroll"
				aria-label="Scroll to featured work"
				onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
			>
				<Icon name="chevronDown" size={22} />
			</button>
		</section>
	);
}

function Featured() {
	return (
		<section className="section" id="featured">
			<div className="container-xxl px-3 px-lg-4">
				<Reveal className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4 mb-md-5">
					<div>
						<span className="eyebrow">Featured work</span>
						<h2 className="section-title">Selected prints</h2>
					</div>
					<TransitionLink to="/prints" className="text-link">
						View all prints <Icon name="arrowRight" size={16} />
					</TransitionLink>
				</Reveal>
				<ul className="product-grid">
					{featured.map((item, i) => (
						<ProductCard key={item.name} item={item} index={i} />
					))}
				</ul>
			</div>
		</section>
	);
}

function CollectionTiles() {
	const tiles = [
		{
			to: '/prints',
			eyebrow: `${items.prints.length} works`,
			title: 'Fine art prints',
			image: '/images/wallpapers/wallpaper4.webp',
		},
		{
			to: '/presets',
			eyebrow: `${items.presets.length} presets`,
			title: 'Lightroom presets',
			image: '/images/wallpapers/wallpaper1.webp',
		},
	];

	return (
		<section className="section pt-0">
			<div className="container-xxl px-3 px-lg-4">
				<div className="row g-3 g-lg-4">
					{tiles.map((tile, i) => (
						<Reveal key={tile.to} className="col-12 col-md-6" delay={i * 120}>
							<TransitionLink to={tile.to} className="tile">
								<SmartImage src={tile.image} alt="" loading="lazy" />
								<div className="tile-body">
									<span className="eyebrow">{tile.eyebrow}</span>
									<h3>{tile.title}</h3>
									<span className="text-link">
										Shop now <Icon name="arrowRight" size={16} />
									</span>
								</div>
							</TransitionLink>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}

function AboutTeaser() {
	return (
		<section className="section section-surface">
			<div className="container-xxl px-3 px-lg-4">
				<div className="row g-4 g-lg-5 align-items-center">
					<Reveal className="col-12 col-md-6">
						<div className="teaser-img">
							<SmartImage src="/images/wallpapers/wallpaper6.webp" alt="Snow-covered mountain ridge" loading="lazy" />
						</div>
					</Reveal>
					<Reveal className="col-12 col-md-6 col-lg-5 offset-lg-1" delay={120}>
						<span className="eyebrow">The photographer</span>
						<h2 className="section-title mb-3">Hi, I'm CK</h2>
						<p className="lead-muted mb-4">
							A photographer with a love for capturing life's most beautiful and
							fleeting moments. Based in Thessaloniki, I specialise in portrait and
							landscape photography, blending artistic vision with technical craft.
						</p>
						<TransitionLink to="/about" className="text-link">
							More about CK <Icon name="arrowRight" size={16} />
						</TransitionLink>
					</Reveal>
				</div>
			</div>
		</section>
	);
}

function JournalTeaser() {
	return (
		<section className="section journal-section">
			<div className="container-xxl px-3 px-lg-4">
				<Reveal className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4 mb-md-5">
					<div>
						<span className="eyebrow">From the journal</span>
						<h2 className="section-title">Stories behind the photographs</h2>
					</div>
					<TransitionLink to="/journal" className="text-link">
						All stories <Icon name="arrowRight" size={16} />
					</TransitionLink>
				</Reveal>
				<ul className="journal-grid">
					{journal.slice(0, 3).map((post, i) => (
						<Reveal as="li" key={post.slug} delay={i * 100}>
							<TransitionLink to={`/journal/${post.slug}`} className="journal-card">
								<div className="journal-cover">
									<SmartImage src={post.cover} alt="" loading="lazy" />
								</div>
								<PostMeta post={post} />
								<h3>{post.title}</h3>
								<p>{post.excerpt}</p>
							</TransitionLink>
						</Reveal>
					))}
				</ul>
			</div>
		</section>
	);
}

function CommissionBand() {
	return (
		<section className="section text-center">
			<Reveal className="container px-3">
				<span className="eyebrow">Commissions</span>
				<h2 className="section-title mb-3">Have a story worth photographing?</h2>
				<p className="lead-muted mx-auto mb-4">
					Portrait, wedding, event, commercial and landscape sessions.
				</p>
				<a href="mailto:ckphoto@gmail.com" className="btn btn-accent">
					Get in touch
				</a>
			</Reveal>
		</section>
	);
}

export default function Home() {
	return (
		<Page title="CK Photography" className="page-home">
			<Hero />
			<Featured />
			<CollectionTiles />
			<AboutTeaser />
			<JournalTeaser />
			<CommissionBand />
		</Page>
	);
}
