import { useEffect, useState } from 'react';
import { Page } from '../components/Layout';
import { TransitionLink } from '../context/PageTransition';
import Reveal from '../components/Reveal';
import SmartImage from '../components/SmartImage';
import Marquee from '../components/Marquee';
import Lightbox from '../components/Lightbox';
import InstagramGrid from '../components/InstagramGrid';
import Icon from '../components/Icon';
import { getPhotos } from '../data/photos';
import { projects } from '../data/projects';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, isSampleFeed } from '../data/instagram';

const heroPhotos = getPhotos(['land3', 'print3', 'land4', 'print2']);
const selected = getPhotos(['print1', 'land3', 'print4', 'land4', 'wallpaper2', 'print7']);

function Hero() {
	const [active, setActive] = useState(0);

	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const t = setInterval(() => setActive((i) => (i + 1) % heroPhotos.length), 5500);
		return () => clearInterval(t);
	}, []);

	return (
		<section className="hero" aria-label="Introduction">
			<div className="hero-media" aria-hidden="true">
				{heroPhotos.map((p, i) => (
					<img
						key={p.id}
						src={p.src}
						srcSet={p.srcSet}
						sizes="100vw"
						alt=""
						className={i === active ? 'is-active' : undefined}
						fetchPriority={i === 0 ? 'high' : undefined}
						loading={i === 0 ? 'eager' : 'lazy'}
					/>
				))}
			</div>

			<div className="hero-content container-xxl px-3 px-lg-4">
				<p className="hero-kicker">
					<span className="hero-dot" aria-hidden="true" /> Photographer based in Thessaloniki
				</p>
				<h2 className="hero-title">
					<span className="line">
						<span>Cities</span>
					</span>
					<span className="line">
						<span>
							<em>&amp;</em> Summits
						</span>
					</span>
				</h2>
				<div className="hero-actions">
					<TransitionLink to="/work" className="btn btn-on-image">
						View the work
					</TransitionLink>
					<TransitionLink to="/contact" className="btn btn-outline-on-image">
						Book a shoot
					</TransitionLink>
				</div>
			</div>

			<div className="hero-footer container-xxl px-3 px-lg-4">
				<p className="hero-now">
					<span>Now showing</span> {heroPhotos[active].title}
				</p>
				<div className="hero-progress" aria-hidden="true">
					{heroPhotos.map((p, i) => (
						<span key={p.id} className={i === active ? 'is-active' : undefined} />
					))}
				</div>
			</div>
		</section>
	);
}

function SelectedWork() {
	const [open, setOpen] = useState(null);
	const images = selected.map((p) => ({ src: p.src, alt: p.title, caption: p.title }));

	return (
		<section className="section">
			<div className="container-xxl px-3 px-lg-4">
				<Reveal className="section-head">
					<span className="eyebrow">Selected work</span>
					<h2 className="section-title">
						Light, found
						<br />
						in unlikely places.
					</h2>
					<TransitionLink to="/work" className="text-link">
						All work <Icon name="arrowRight" size={16} />
					</TransitionLink>
				</Reveal>

				<ul className="editorial-grid">
					{selected.map((p, i) => (
						<Reveal as="li" key={p.id} className={`ed-${i + 1}`} delay={(i % 3) * 90}>
							<button
								type="button"
								className="ed-tile"
								onClick={() => setOpen(i)}
								aria-label={`Open ${p.title}`}
							>
								<SmartImage
									src={p.thumb}
									srcSet={p.srcSet}
									sizes="(min-width: 992px) 40vw, 90vw"
									alt={p.title}
									loading="lazy"
								/>
							</button>
							<p className="ed-caption">
								<span>{String(i + 1).padStart(2, '0')}</span> {p.title}
							</p>
						</Reveal>
					))}
				</ul>
			</div>
			{open !== null && (
				<Lightbox images={images} index={open} onIndexChange={setOpen} onClose={() => setOpen(null)} />
			)}
		</section>
	);
}

function ProjectList() {
	const [hovered, setHovered] = useState(0);

	return (
		<section className="section section-surface projects-teaser">
			<div className="container-xxl px-3 px-lg-4">
				<Reveal className="section-head">
					<span className="eyebrow">Projects</span>
					<h2 className="section-title">Series &amp; stories</h2>
					<TransitionLink to="/projects" className="text-link">
						All projects <Icon name="arrowRight" size={16} />
					</TransitionLink>
				</Reveal>

				<div className="project-list-wrap">
					<ol className="project-list">
						{projects.map((p, i) => (
							<li key={p.slug}>
								<TransitionLink
									to={`/projects/${p.slug}`}
									className="project-row"
									onMouseEnter={() => setHovered(i)}
									onFocus={() => setHovered(i)}
								>
									<span className="project-num">{String(i + 1).padStart(2, '0')}</span>
									<span className="project-name">{p.title}</span>
									<span className="project-sub">{p.subtitle}</span>
									<span className="project-year">{p.year}</span>
									<Icon name="arrowRight" size={28} className="project-arrow" />
								</TransitionLink>
							</li>
						))}
					</ol>
					{/* Desktop: preview of the hovered project's cover */}
					<div className="project-preview d-none d-lg-block" aria-hidden="true">
						{projects.map((p, i) => (
							<img
								key={p.slug}
								src={p.coverPhoto.thumb}
								alt=""
								loading="lazy"
								className={i === hovered ? 'is-active' : undefined}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

function InstagramSection() {
	return (
		<section className="section">
			<div className="container-xxl px-3 px-lg-4">
				<Reveal className="section-head">
					<span className="eyebrow">
						<Icon name="instagram" size={14} /> On Instagram
					</span>
					<h2 className="section-title">
						<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="ig-handle">
							@{INSTAGRAM_HANDLE}
						</a>
					</h2>
					<TransitionLink to="/instagram" className="text-link">
						See the feed <Icon name="arrowRight" size={16} />
					</TransitionLink>
				</Reveal>
				<InstagramGrid limit={8} className="ig-grid-home" />
				{isSampleFeed && (
					<p className="sample-note">Example feed. Live posts appear here once Instagram is connected.</p>
				)}
			</div>
		</section>
	);
}

function AboutTeaser() {
	const photo = getPhotos(['wallpaper1'])[0];
	return (
		<section className="section section-surface">
			<div className="container-xxl px-3 px-lg-4">
				<div className="row g-4 g-lg-5 align-items-center">
					<Reveal className="col-12 col-md-6">
						<div className="teaser-img">
							<SmartImage
								src={photo.thumb}
								srcSet={photo.srcSet}
								sizes="(min-width: 768px) 50vw, 100vw"
								alt={photo.title}
								loading="lazy"
							/>
						</div>
					</Reveal>
					<Reveal className="col-12 col-md-6 col-lg-5 offset-lg-1" delay={120}>
						<span className="eyebrow">About</span>
						<h2 className="section-title mb-4">Hi, I'm CK.</h2>
						<p className="lead-muted mb-4">
							A photographer with a love for capturing life's most beautiful and fleeting moments.
							Based in Thessaloniki, I photograph cities after dark, mountains above the clouds, and
							the people who live between the two.
						</p>
						<TransitionLink to="/about" className="text-link">
							More about me <Icon name="arrowRight" size={16} />
						</TransitionLink>
					</Reveal>
				</div>
			</div>
		</section>
	);
}

export default function Home() {
	return (
		<Page title="CK Photography" className="page-home">
			<Hero />
			<Marquee items={['City', 'Landscape', 'Portrait', 'Wedding', 'Commercial', 'Event']} />
			<SelectedWork />
			<ProjectList />
			<InstagramSection />
			<AboutTeaser />
		</Page>
	);
}
