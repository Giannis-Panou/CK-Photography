import { Page } from '../components/Layout';
import Reveal from '../components/Reveal';
import SmartImage from '../components/SmartImage';
import Icon from '../components/Icon';
import { TransitionLink } from '../context/PageTransition';
import { covers, photos, pickPhotos } from '../data/photos';
import { projects } from '../data/projects';
import { useLang } from '../i18n/LanguageContext';

export default function About() {
	const { t } = useLang();
	// Wide photos from the feed, skipping the ones leading the home page
	const [portrait = photos[0], detail = photos[1] ?? photos[0]] = pickPhotos(2, {
		orientation: 'landscape',
		exclude: covers.slice(0, 4),
	});

	return (
		<Page title={t('about.title')} className="page-about">
			<header className="page-hero container-xxl px-3 px-lg-4">
				<span className="eyebrow">{t('about.title')}</span>
				<h2 className="page-hero-title about-statement">
					{t('about.statement1')}
					<br />
					<em>{t('about.statement2')}</em>
				</h2>
			</header>

			<section className="container-xxl px-3 px-lg-4">
				<div className="row g-4 g-lg-5">
					<Reveal className="col-12 col-lg-7">
						<div className="about-img about-img-tall">
							<SmartImage src={portrait.src} placeholder={portrait.placeholder} srcSet={portrait.srcSet} sizes="(min-width: 992px) 58vw, 100vw" alt={portrait.title} />
						</div>
					</Reveal>
					<Reveal className="col-12 col-lg-5 about-copy" delay={120}>
						<p className="about-lead">
							{t('about.lead')}
						</p>
						<p className="text-muted-ck">
							{t('about.text')}
						</p>
						<dl className="about-facts">
							<div>
								<dt>{t('about.basedIn')}</dt>
								<dd>{t('about.basedValue')}</dd>
							</div>
							<div>
								<dt>{t('about.focus')}</dt>
								<dd>{t('about.focusValue')}</dd>
							</div>
							<div>
								<dt>{t('about.portfolio')}</dt>
								<dd>{t('about.portfolioValue', { photos: photos.length, series: projects.length })}</dd>
							</div>
						</dl>
					</Reveal>
				</div>
			</section>

			<section className="section">
				<div className="container-xxl px-3 px-lg-4">
					<div className="row g-4 g-lg-5 align-items-end">
						<Reveal className="col-12 col-lg-6">
							<span className="eyebrow">{t('about.approachEyebrow')}</span>
							<h2 className="section-title mb-4">{t('about.approachTitle')}</h2>
							<p className="lead-muted">
								{t('about.approachText')}
							</p>
						</Reveal>
						<Reveal className="col-12 col-lg-5 offset-lg-1" delay={120}>
							<div className="about-img">
								<SmartImage src={detail.thumb} placeholder={detail.placeholder} srcSet={detail.srcSet} sizes="(min-width: 992px) 40vw, 100vw" alt={detail.title} loading="lazy" />
							</div>
						</Reveal>
					</div>
				</div>
			</section>

			<section className="section section-surface">
				<div className="container-xxl px-3 px-lg-4">
					<Reveal className="section-head">
						<span className="eyebrow">{t('about.servicesEyebrow')}</span>
						<h2 className="section-title">{t('about.servicesTitle')}</h2>
						<TransitionLink to="/contact" className="text-link">
							{t('about.enquire')} <Icon name="arrowRight" size={16} />
						</TransitionLink>
					</Reveal>
					<ol className="services">
						{t('about.services').map(([name, text], i) => (
							<Reveal as="li" key={name} delay={i * 80}>
								<span className="service-num">{String(i + 1).padStart(2, '0')}</span>
								<h3>{name}</h3>
								<p>{text}</p>
							</Reveal>
						))}
					</ol>
				</div>
			</section>
		</Page>
	);
}
