import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Page } from '../components/Layout';
import Reveal from '../components/Reveal';
import SmartImage from '../components/SmartImage';
import Lightbox from '../components/Lightbox';
import Icon from '../components/Icon';
import { TransitionLink } from '../context/PageTransition';
import { getProject, projects } from '../data/projects';
import { useLang } from '../i18n/LanguageContext';

export default function Project() {
	const { t } = useLang();
	const { slug } = useParams();
	const project = getProject(slug);
	const [open, setOpen] = useState(null);
	if (!project) return <Navigate to="/projects" replace />;

	const index = projects.indexOf(project);
	const next = projects[(index + 1) % projects.length];
	// The cover already opens the page, so the sequence starts with the next photo
	const [first, ...rest] = project.images.filter((p) => p.id !== project.cover);
	// The caption's story is spread through the sequence: one paragraph after the
	// first photo, the rest after the last
	const [firstText, ...moreText] = project.body;
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
					className="ph-bg"
					style={{ backgroundImage: `url("${project.coverPhoto.placeholder}")` }}
				/>
				<div className="project-hero-content container-xxl px-3 px-lg-4">
					<TransitionLink to="/projects" className="text-link on-image">
						<Icon name="arrowLeft" size={16} /> {t('project.all')}
					</TransitionLink>
					<h2 className="project-hero-title">{project.title}</h2>
					<dl className="project-facts">
						<div>
							<dt>{t('project.series')}</dt>
							<dd>{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</dd>
						</div>
						<div>
							<dt>{t('project.year')}</dt>
							<dd>{project.year}</dd>
						</div>
						<div>
							<dt>{t('project.subject')}</dt>
							<dd>{project.category ? t(`categories.${project.category}`) : t('project.series')}</dd>
						</div>
						<div>
							<dt>{t('project.photographs')}</dt>
							<dd>{project.images.length}</dd>
						</div>
					</dl>
					<a href={project.permalink} target="_blank" rel="noopener noreferrer" className="text-link on-image project-ig-link">
						<Icon name="instagram" size={16} /> {t('project.viewOnInstagram')}
					</a>
				</div>
			</section>

			<section className="container px-3 project-intro">
				{project.intro && (
					<Reveal>
						<p className="project-lead">{project.intro}</p>
					</Reveal>
				)}
			</section>

			{/* Alternating full-width and paired images, interleaved with the story */}
			<section className="container-xxl px-3 px-lg-4 project-sequence">
				{first && <Reveal>
					<button type="button" className="seq-img seq-wide" onClick={() => openPhoto(first)} aria-label={t('viewer.open', { title: first.title })}>
						<SmartImage src={first.src} placeholder={first.placeholder} srcSet={first.srcSet} sizes="100vw" alt={first.title} />
					</button>
				</Reveal>}

				{firstText && (
					<Reveal className="container px-0 project-text">
						<p>{firstText}</p>
					</Reveal>
				)}

				<div className="seq-pair">
					{rest.slice(0, 2).map((p, i) => (
						<Reveal key={p.id} delay={i * 120}>
							<button type="button" className="seq-img" onClick={() => openPhoto(p)} aria-label={t('viewer.open', { title: p.title })}>
								<SmartImage src={p.thumb} placeholder={p.placeholder} srcSet={p.srcSet} sizes="(min-width: 768px) 50vw, 100vw" alt={p.title} loading="lazy" />
							</button>
						</Reveal>
					))}
				</div>

				{project.quote && (
					<Reveal as="blockquote" className="project-quote">
						“{project.quote}”
					</Reveal>
				)}

				{rest.slice(2).map((p) => (
					<Reveal key={p.id}>
						<button type="button" className="seq-img seq-wide" onClick={() => openPhoto(p)} aria-label={t('viewer.open', { title: p.title })}>
							<SmartImage src={p.src} placeholder={p.placeholder} srcSet={p.srcSet} sizes="100vw" alt={p.title} loading="lazy" />
						</button>
					</Reveal>
				))}

				{moreText.length > 0 && (
					<Reveal className="container px-0 project-text">
						{moreText.map((text) => (
							<p key={text}>{text}</p>
						))}
					</Reveal>
				)}
			</section>

			<section className="section pt-0">
				<div className="container-xxl px-3 px-lg-4">
					<TransitionLink to={`/projects/${next.slug}`} className="next-project">
						<img src={next.coverPhoto.thumb} alt="" loading="lazy" />
						<span className="next-project-body">
							<span className="eyebrow">{t('project.next')}</span>
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
