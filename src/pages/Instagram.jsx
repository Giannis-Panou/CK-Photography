import { Page } from '../components/Layout';
import InstagramGrid from '../components/InstagramGrid';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import { TransitionLink } from '../context/PageTransition';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, isSampleFeed, posts, profile } from '../data/instagram';
import { useLang } from '../i18n/LanguageContext';

export default function Instagram() {
	const { t, locale } = useLang();
	const number = new Intl.NumberFormat(locale, { notation: 'compact' });
	return (
		<Page title={t('instagram.title')} className="page-instagram">
			<header className="page-hero container-xxl px-3 px-lg-4">
				<span className="eyebrow">
					<Icon name="instagram" size={14} /> Instagram
				</span>
				<h2 className="page-hero-title ig-title">
					<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
						@{INSTAGRAM_HANDLE}
					</a>
				</h2>
			</header>

			<div className="container-xxl px-3 px-lg-4 pb-5">
				{/* Profile card, mirroring the Instagram profile header */}
				<Reveal className="ig-profile">
					<div className="ig-avatar">
						<img src={profile.avatar ?? posts[0]?.media[0]?.thumb} alt="" />
					</div>
					<div className="ig-profile-body">
						<div className="ig-profile-top">
							<p className="ig-name">{profile.name || INSTAGRAM_HANDLE}</p>
							<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
								{t('instagram.follow')}
							</a>
							<TransitionLink to="/contact" className="btn btn-outline-accent">
								{t('instagram.message')}
							</TransitionLink>
						</div>
						<ul className="ig-stats" aria-label="Instagram">
							<li>
								<strong>{number.format(profile.media_count ?? posts.length)}</strong> {t('instagram.posts')}
							</li>
							{profile.followers_count != null && (
								<li>
									<strong>{number.format(profile.followers_count)}</strong> {t('instagram.followers')}
								</li>
							)}
							<li>
								<strong>{t('instagram.focusStrong')}</strong>
								{t('instagram.focusRest')}
							</li>
							<li>
								<strong>{t('instagram.placeStrong')}</strong>
								{t('instagram.placeRest')}
							</li>
						</ul>
						<p className="ig-bio">
							{t('instagram.bio1')}
							<br />
							{t('instagram.bio2')}
						</p>
					</div>
				</Reveal>

				{isSampleFeed && (
					<p className="sample-banner" role="note">
						<Icon name="instagram" size={16} />
						<span>
							<strong>{t('instagram.bannerStrong')}</strong> {t('instagram.bannerText')}
						</span>
					</p>
				)}

				<InstagramGrid className="ig-grid-page" />

				<div className="text-center mt-5">
					<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline-accent">
						<Icon name="instagram" size={16} /> {t('instagram.open')}
					</a>
				</div>
			</div>
		</Page>
	);
}
