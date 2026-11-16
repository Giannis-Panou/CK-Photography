import { TransitionLink } from '../context/PageTransition';
import { socialLinks } from '../data/navigation';
import Icon from './Icon';

export default function Footer({ className = '' }) {
	return (
		<footer className={`site-footer ${className}`} id="footer">
			<div className="container-xxl px-3 px-lg-4">
				<div className="row g-4 g-lg-5">
					<div className="col-12 col-lg-5">
						<h2 className="mb-2">CK Photography</h2>
						<p className="text-muted-ck mb-3" style={{ maxWidth: '26rem' }}>
							Fine art portrait and landscape photography from Thessaloniki.
							Signed fine art prints and the presets behind the look.
						</p>
						<div className="social-links" id="social">
							{socialLinks.map(({ name, icon, href }) => (
								<a
									key={name}
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={name}
								>
									<Icon name={icon} />
								</a>
							))}
						</div>
					</div>

					<div className="col-6 col-lg-2">
						<h3>Shop</h3>
						<ul>
							<li><TransitionLink to="/prints">Prints</TransitionLink></li>
							<li><TransitionLink to="/presets">Presets</TransitionLink></li>
							<li><TransitionLink to="/checkout">Checkout</TransitionLink></li>
						</ul>
					</div>

					<div className="col-6 col-lg-2">
						<h3>Studio</h3>
						<ul>
							<li><TransitionLink to="/about">About CK</TransitionLink></li>
							<li><TransitionLink to="/journal">Journal</TransitionLink></li>
							<li><a href="mailto:ckphoto@gmail.com">Commissions</a></li>
						</ul>
					</div>

					<div className="col-12 col-lg-3">
						<h3>Contact</h3>
						<ul>
							<li>
								<a href="mailto:ckphoto@gmail.com" className="d-inline-flex align-items-center gap-2">
									<Icon name="mail" size={16} /> ckphoto@gmail.com
								</a>
							</li>
							<li>
								<a href="tel:+306974425966" className="d-inline-flex align-items-center gap-2">
									<Icon name="phone" size={16} /> +30 697 442 5966
								</a>
							</li>
							<li className="d-inline-flex align-items-center gap-2 py-1 text-muted-ck">
								<Icon name="pin" size={16} /> Thessaloniki, Greece
							</li>
						</ul>
					</div>
				</div>

				<div className="footer-bottom">
					<p className="m-0">
						Copyright &copy; {new Date().getFullYear()} Ioannis Panou. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
