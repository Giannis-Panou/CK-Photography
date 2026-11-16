import { Page } from '../components/Layout';
import Reveal from '../components/Reveal';
import SmartImage from '../components/SmartImage';
import Icon from '../components/Icon';
import { TransitionLink } from '../context/PageTransition';
import { formatDate, journal, readingTime } from '../data/journal';

function PostMeta({ post }) {
	return (
		<p className="post-meta">
			<span>{post.category}</span>
			<span aria-hidden="true">·</span>
			<time dateTime={post.date}>{formatDate(post.date)}</time>
			<span aria-hidden="true">·</span>
			<span className="d-inline-flex align-items-center gap-1">
				<Icon name="clock" size={14} /> {readingTime(post)} min read
			</span>
		</p>
	);
}

export default function Journal() {
	const [lead, ...rest] = journal;

	return (
		<Page title="Journal" className="page-journal">
			<header className="page-intro container-xxl px-3">
				<span className="eyebrow">Journal</span>
				<h2>Stories behind the photographs</h2>
				<p>Field notes on light, places and the patience it takes to be there when it happens.</p>
			</header>

			<div className="container-xxl px-3 px-lg-4 pb-5 mb-4">
				{/* Lead story */}
				<Reveal>
					<TransitionLink to={`/journal/${lead.slug}`} className="journal-lead">
						<div className="journal-cover">
							<SmartImage src={lead.cover} alt="" />
						</div>
						<div className="journal-lead-body">
							<PostMeta post={lead} />
							<h3>{lead.title}</h3>
							<p>{lead.excerpt}</p>
							<span className="text-link">
								Read the story <Icon name="arrowRight" size={16} />
							</span>
						</div>
					</TransitionLink>
				</Reveal>

				{/* Other stories */}
				<ul className="journal-grid">
					{rest.map((post, i) => (
						<Reveal as="li" key={post.slug} delay={(i % 3) * 100}>
							<TransitionLink to={`/journal/${post.slug}`} className="journal-card">
								<div className="journal-cover">
									<SmartImage src={post.cover} alt="" loading="lazy" />
								</div>
								<PostMeta post={post} />
								<h3>{post.title}</h3>
								<p>{post.excerpt}</p>
							</TransitionLink>
						</Reveal>
					))}
				</ul>
			</div>
		</Page>
	);
}

export { PostMeta };
