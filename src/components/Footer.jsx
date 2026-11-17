import { TransitionLink } from '../context/PageTransition';
import { CONTACT, navLinks } from '../data/navigation';
import { useLang } from '../i18n/LanguageContext';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../data/instagram';
import Icon from './Icon';

export default function Footer({ className = '', showCta = true }) {
	const { t } = useLang();
	return (
		<footer className={`site-footer ${className}`} id="footer">
			<div className="container-xxl px-3 px-lg-4">
				{showCta && (
					<TransitionLink to="/contact" className="footer-cta">
						<span className="eyebrow">{t('footer.ctaEyebrow')}</span>
						<span className="footer-cta-title">
							{t('footer.ctaTitle')} <Icon name="arrowRight" size={48} />
						</span>
					</TransitionLink>
				)}

				<div className="footer-grid">
					<div>
						<p className="footer-brand">CK Photography</p>
						<p className="text-muted-ck m-0">
							{t('footer.tagline')}
							<br />
							{t('footer.based')}
						</p>
					</div>
					<nav aria-label={t('nav.footer')}>
						<h3>{t('footer.explore')}</h3>
						<ul>
							{navLinks.map(({ key, to }) => (
								<li key={to}>
									<TransitionLink to={to}>{t(`nav.${key}`)}</TransitionLink>
								</li>
							))}
						</ul>
					</nav>
					<div>
						<h3>{t('footer.contact')}</h3>
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
						{t('footer.copyright', { year: new Date().getFullYear() })}
					</p>
					<p className="m-0">{t('footer.siteBy')}</p>
				</div>
			</div>
		</footer>
	);
}
