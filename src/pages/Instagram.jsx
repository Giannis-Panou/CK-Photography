import { Page } from '../components/Layout';
import InstagramGrid from '../components/InstagramGrid';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import { TransitionLink } from '../context/PageTransition';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, isSampleFeed, posts } from '../data/instagram';
import { getPhoto } from '../data/photos';

export default function Instagram() {
	const avatar = getPhoto('land3');

	return (
		<Page title="Instagram" className="page-instagram">
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
						<img src={avatar.thumb} alt="" />
					</div>
					<div className="ig-profile-body">
						<div className="ig-profile-top">
							<p className="ig-name">{INSTAGRAM_HANDLE}</p>
							<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
								Follow
							</a>
							<TransitionLink to="/contact" className="btn btn-outline-accent">
								Message
							</TransitionLink>
						</div>
						<ul className="ig-stats" aria-label="Profile">
							<li>
								<strong>{posts.length}</strong> posts shown
							</li>
							<li>
								<strong>City</strong> &amp; landscape
							</li>
							<li>
								<strong>Thessaloniki</strong>, Greece
							</li>
						</ul>
						<p className="ig-bio">
							Photographer. Cities after dark, mountains above the clouds.
							<br />
							Commissions open.
						</p>
					</div>
				</Reveal>

				{isSampleFeed && (
					<p className="sample-banner" role="note">
						<Icon name="instagram" size={16} />
						<span>
							<strong>Example layout.</strong> These sample posts use the portfolio's own photos. Once the
							Instagram account is connected, the latest posts will appear here automatically.
						</span>
					</p>
				)}

				<InstagramGrid className="ig-grid-page" />

				<div className="text-center mt-5">
					<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline-accent">
						<Icon name="instagram" size={16} /> Open on Instagram
					</a>
				</div>
			</div>
		</Page>
	);
}
