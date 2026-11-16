import { Page } from '../components/Layout';
import Reveal from '../components/Reveal';
import SmartImage from '../components/SmartImage';
import Icon from '../components/Icon';

const services = [
	['Portrait', 'Natural, unhurried portraits for individuals, couples and families.'],
	['Wedding', 'Documentary coverage of the day, from preparations to the last dance.'],
	['Commercial', 'Imagery for brands, products and spaces.'],
	['Event', 'Conferences, launches and celebrations.'],
	['Landscape', 'Fine art landscapes, available as signed prints.'],
];

export default function About() {
	return (
		<Page title="About CK" className="page-about">
			{/* Intro */}
			<section className="container-xxl px-3 px-lg-4 pt-4 pt-lg-5">
				<div className="row g-4 g-lg-5 align-items-center" id="about">
					<Reveal className="col-12 col-lg-5 order-2 order-lg-1">
						<span className="eyebrow">About</span>
						<h2 className="about-title">Welcome to CK Photography</h2>
						<p className="about-lead">
							Hi, I am CK, a passionate photographer with a love for capturing
							life's most beautiful and fleeting moments.
						</p>
						<p className="text-muted-ck">
							Based in Thessaloniki, I specialize in portrait and landscape
							photography, offering a unique blend of artistic vision and technical
							expertise.
						</p>
					</Reveal>
					<Reveal className="col-12 col-lg-7 order-1 order-lg-2" delay={120}>
						<div className="about-img about-img-tall">
							<SmartImage src="/images/wallpapers/wallpaper6.webp" alt="Snow mountain" />
						</div>
					</Reveal>
				</div>
			</section>

			{/* Services */}
			<section className="section">
				<div className="container-xxl px-3 px-lg-4">
					<Reveal className="mb-4 mb-md-5">
						<span className="eyebrow">What I do</span>
						<h2 className="section-title">Services offered</h2>
					</Reveal>
					<ol className="services">
						{services.map(([name, text], i) => (
							<Reveal as="li" key={name} delay={i * 80}>
								<span className="service-num">{String(i + 1).padStart(2, '0')}</span>
								<h3>{name} Photography</h3>
								<p>{text}</p>
							</Reveal>
						))}
					</ol>
				</div>
			</section>

			{/* Contact */}
			<section className="section section-surface">
				<div className="container-xxl px-3 px-lg-4">
					<div className="row g-4 g-lg-5 align-items-center">
						<Reveal className="col-12 col-md-6">
							<div className="about-img">
								<SmartImage src="/images/wallpapers/wallpaper4.webp" alt="Gold mountain" loading="lazy" />
							</div>
						</Reveal>
						<Reveal className="col-12 col-md-6 col-lg-5 offset-lg-1" delay={120}>
							<span className="eyebrow">Get in touch</span>
							<h2 className="section-title mb-4">Contact information</h2>
							<ul className="contact-list">
								<li>
									<Icon name="mail" />
									<a href="mailto:ckphoto@gmail.com">ckphoto@gmail.com</a>
								</li>
								<li>
									<Icon name="phone" />
									<a href="tel:+306974425966">+30 697 442 5966</a>
								</li>
								<li>
									<Icon name="pin" />
									<span>Thessaloniki, Greece</span>
								</li>
								<li>
									<Icon name="instagram" />
									<span>Social media links are in the footer below.</span>
								</li>
							</ul>
							<a href="mailto:ckphoto@gmail.com" className="btn btn-accent mt-2">
								Book a session
							</a>
						</Reveal>
					</div>
				</div>
			</section>
		</Page>
	);
}
