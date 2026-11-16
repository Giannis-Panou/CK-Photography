import { Page } from '../components/Layout';
import Reveal from '../components/Reveal';
import SmartImage from '../components/SmartImage';
import Icon from '../components/Icon';
import { TransitionLink } from '../context/PageTransition';
import { getPhoto, photos } from '../data/photos';
import { projects } from '../data/projects';

const services = [
	['Portrait', 'Natural, unhurried portraits for individuals, couples and families.'],
	['Wedding', 'Documentary coverage of the day, from preparations to the last dance.'],
	['Commercial', 'Imagery for brands, products and spaces.'],
	['Event', 'Conferences, launches and celebrations.'],
	['Landscape', 'Fine art landscapes, available as signed prints.'],
];

export default function About() {
	const portrait = getPhoto('wallpaper2');
	const detail = getPhoto('print7');

	return (
		<Page title="About" className="page-about">
			<header className="page-hero container-xxl px-3 px-lg-4">
				<span className="eyebrow">About</span>
				<h2 className="page-hero-title about-statement">
					I chase the light
					<br />
					<em>most people sleep through.</em>
				</h2>
			</header>

			<section className="container-xxl px-3 px-lg-4">
				<div className="row g-4 g-lg-5">
					<Reveal className="col-12 col-lg-7">
						<div className="about-img about-img-tall">
							<SmartImage src={portrait.src} srcSet={portrait.srcSet} sizes="(min-width: 992px) 58vw, 100vw" alt={portrait.title} />
						</div>
					</Reveal>
					<Reveal className="col-12 col-lg-5 about-copy" delay={120}>
						<p className="about-lead">
							Hi, I'm CK, a passionate photographer with a love for capturing life's most beautiful and
							fleeting moments.
						</p>
						<p className="text-muted-ck">
							Based in Thessaloniki, I specialize in portrait and landscape photography, offering a unique
							blend of artistic vision and technical expertise.
						</p>
						<dl className="about-facts">
							<div>
								<dt>Based in</dt>
								<dd>Thessaloniki, Greece</dd>
							</div>
							<div>
								<dt>Focus</dt>
								<dd>City &amp; landscape</dd>
							</div>
							<div>
								<dt>Portfolio</dt>
								<dd>
									{photos.length} photographs, {projects.length} series
								</dd>
							</div>
						</dl>
					</Reveal>
				</div>
			</section>

			<section className="section">
				<div className="container-xxl px-3 px-lg-4">
					<div className="row g-4 g-lg-5 align-items-end">
						<Reveal className="col-12 col-lg-6">
							<span className="eyebrow">Approach</span>
							<h2 className="section-title mb-4">Patience over gear.</h2>
							<p className="lead-muted">
								Most of photography is waiting: for the fog to drop below the ridge, for the rain to turn
								a street into a mirror, for a plane to cross the right gap between two towers. The
								pictures are the reward for being there when it happens.
							</p>
						</Reveal>
						<Reveal className="col-12 col-lg-5 offset-lg-1" delay={120}>
							<div className="about-img">
								<SmartImage src={detail.thumb} srcSet={detail.srcSet} sizes="(min-width: 992px) 40vw, 100vw" alt={detail.title} loading="lazy" />
							</div>
						</Reveal>
					</div>
				</div>
			</section>

			<section className="section section-surface">
				<div className="container-xxl px-3 px-lg-4">
					<Reveal className="section-head">
						<span className="eyebrow">Services</span>
						<h2 className="section-title">What I photograph</h2>
						<TransitionLink to="/contact" className="text-link">
							Enquire <Icon name="arrowRight" size={16} />
						</TransitionLink>
					</Reveal>
					<ol className="services">
						{services.map(([name, text], i) => (
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
