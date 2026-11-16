import { Page } from '../components/Layout';
import Reveal from '../components/Reveal';
import SmartImage from '../components/SmartImage';
import Icon from '../components/Icon';
import { TransitionLink } from '../context/PageTransition';
import { projects } from '../data/projects';

export default function Projects() {
	return (
		<Page title="Projects" className="page-projects">
			<header className="page-hero container-xxl px-3 px-lg-4">
				<span className="eyebrow">Projects</span>
				<h2 className="page-hero-title">
					Series<sup>{projects.length}</sup>
				</h2>
				<p className="page-hero-lead">
					Longer bodies of work, each with the story of how it was made.
				</p>
			</header>

			<div className="container-xxl px-3 px-lg-4 pb-5">
				<ul className="project-cards">
					{projects.map((p, i) => (
						<Reveal as="li" key={p.slug} delay={(i % 2) * 120}>
							<TransitionLink to={`/projects/${p.slug}`} className="project-card">
								<div className="project-card-img">
									<SmartImage
										src={p.coverPhoto.thumb}
										srcSet={p.coverPhoto.srcSet}
										sizes="(min-width: 768px) 50vw, 100vw"
										alt=""
										loading={i < 2 ? 'eager' : 'lazy'}
									/>
									<span className="project-card-count">{p.images.length} photographs</span>
								</div>
								<div className="project-card-body">
									<span className="project-num">{String(i + 1).padStart(2, '0')}</span>
									<div>
										<h3>{p.title}</h3>
										<p>
											{p.subtitle} · {p.year}
										</p>
									</div>
									<Icon name="arrowRight" size={26} className="project-arrow" />
								</div>
							</TransitionLink>
						</Reveal>
					))}
				</ul>
			</div>
		</Page>
	);
}
