import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Page } from '../components/Layout';
import Reveal from '../components/Reveal';
import SmartImage from '../components/SmartImage';
import Lightbox from '../components/Lightbox';
import Icon from '../components/Icon';
import { TransitionLink } from '../context/PageTransition';
import { getProject, projects } from '../data/projects';

export default function Project() {
	const { slug } = useParams();
	const project = getProject(slug);
	const [open, setOpen] = useState(null);
	if (!project) return <Navigate to="/projects" replace />;

	const index = projects.indexOf(project);
	const next = projects[(index + 1) % projects.length];
	// The cover already opens the page, so the sequence starts with the next photo
	const [first, ...rest] = project.images.filter((p) => p.id !== project.cover);
	const images = project.images.map((p) => ({ src: p.src, alt: p.title, caption: p.title, meta: project.title }));
	const openPhoto = (photo) => setOpen(project.images.indexOf(photo));

	return (
		<Page title={project.title} className="page-project" footerCta={false}>
			{/* Full-bleed opener under the transparent header */}
			<section className="project-hero">
				<img
					src={project.coverPhoto.src}
					srcSet={project.coverPhoto.srcSet}
					sizes="100vw"
					alt=""
					fetchPriority="high"
				/>
				<div className="project-hero-content container-xxl px-3 px-lg-4">
					<TransitionLink to="/projects" className="text-link on-image">
						<Icon name="arrowLeft" size={16} /> All projects
					</TransitionLink>
					<h2 className="project-hero-title">{project.title}</h2>
					<dl className="project-facts">
						<div>
							<dt>Series</dt>
							<dd>{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</dd>
						</div>
						<div>
							<dt>Year</dt>
							<dd>{project.year}</dd>
						</div>
						<div>
							<dt>Subject</dt>
							<dd>{project.location}</dd>
						</div>
						<div>
							<dt>Photographs</dt>
							<dd>{project.images.length}</dd>
						</div>
					</dl>
				</div>
			</section>

			<section className="container px-3 project-intro">
				<Reveal>
					<p className="project-lead">{project.intro}</p>
				</Reveal>
			</section>

			{/* Alternating full-width and paired images, interleaved with the story */}
			<section className="container-xxl px-3 px-lg-4 project-sequence">
				<Reveal>
					<button type="button" className="seq-img seq-wide" onClick={() => openPhoto(first)} aria-label={`Open ${first.title}`}>
						<SmartImage src={first.src} srcSet={first.srcSet} sizes="100vw" alt={first.title} />
					</button>
				</Reveal>

				<Reveal className="container px-0 project-text">
					<p>{project.body[0]}</p>
				</Reveal>

				<div className="seq-pair">
					{rest.slice(0, 2).map((p, i) => (
						<Reveal key={p.id} delay={i * 120}>
							<button type="button" className="seq-img" onClick={() => openPhoto(p)} aria-label={`Open ${p.title}`}>
								<SmartImage src={p.thumb} srcSet={p.srcSet} sizes="(min-width: 768px) 50vw, 100vw" alt={p.title} loading="lazy" />
							</button>
						</Reveal>
					))}
				</div>

				<Reveal as="blockquote" className="project-quote">
					“{project.quote}”
				</Reveal>

				{rest.slice(2).map((p) => (
					<Reveal key={p.id}>
						<button type="button" className="seq-img seq-wide" onClick={() => openPhoto(p)} aria-label={`Open ${p.title}`}>
							<SmartImage src={p.src} srcSet={p.srcSet} sizes="100vw" alt={p.title} loading="lazy" />
						</button>
					</Reveal>
				))}

				<Reveal className="container px-0 project-text">
					<p>{project.body[1]}</p>
				</Reveal>
			</section>

			<section className="section pt-0">
				<div className="container-xxl px-3 px-lg-4">
					<TransitionLink to={`/projects/${next.slug}`} className="next-project">
						<img src={next.coverPhoto.thumb} alt="" loading="lazy" />
						<span className="next-project-body">
							<span className="eyebrow">Next project</span>
							<span className="next-project-title">
								{next.title} <Icon name="arrowRight" size={40} />
							</span>
						</span>
					</TransitionLink>
				</div>
			</section>

			{open !== null && (
				<Lightbox images={images} index={open} onIndexChange={setOpen} onClose={() => setOpen(null)} />
			)}
		</Page>
	);
}
