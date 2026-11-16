import { TransitionLink } from '../context/PageTransition';
import { CONTACT, navLinks } from '../data/navigation';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../data/instagram';
import Icon from './Icon';

export default function Footer({ className = '', showCta = true }) {
	return (
		<footer className={`site-footer ${className}`} id="footer">
			<div className="container-xxl px-3 px-lg-4">
				{showCta && (
					<TransitionLink to="/contact" className="footer-cta">
						<span className="eyebrow">Available for commissions</span>
						<span className="footer-cta-title">
							Let's make something <Icon name="arrowRight" size={48} />
						</span>
					</TransitionLink>
				)}

				<div className="footer-grid">
					<div>
						<p className="footer-brand">CK Photography</p>
						<p className="text-muted-ck m-0">
							City and landscape photography.
							<br />
							Based in {CONTACT.location}.
						</p>
					</div>
					<nav aria-label="Footer">
						<h3>Explore</h3>
						<ul>
							{navLinks.map(({ label, to }) => (
								<li key={to}>
									<TransitionLink to={to}>{label}</TransitionLink>
								</li>
							))}
						</ul>
					</nav>
					<div>
						<h3>Contact</h3>
						<ul>
							<li>
								<a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
							</li>
							<li>
								<a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a>
							</li>
							<li>
								<a
									href={INSTAGRAM_URL}
									target="_blank"
									rel="noopener noreferrer"
									className="d-inline-flex align-items-center gap-2"
								>
									<Icon name="instagram" size={16} /> @{INSTAGRAM_HANDLE}
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="footer-bottom">
					<p className="m-0">
						&copy; {new Date().getFullYear()} CK Photography. All photographs are copyright of the
						photographer.
					</p>
					<p className="m-0">Site by Ioannis Panou</p>
				</div>
			</div>
		</footer>
	);
}
