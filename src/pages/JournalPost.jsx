import { Navigate, useParams } from 'react-router-dom';
import { Page } from '../components/Layout';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import SmartImage from '../components/SmartImage';
import Icon from '../components/Icon';
import { TransitionLink } from '../context/PageTransition';
import { findItem } from '../data/catalog';
import { findPost, journal } from '../data/journal';
import { PostMeta } from './Journal';

export default function JournalPost() {
	const { slug } = useParams();
	const post = findPost(slug);
	if (!post) return <Navigate to="/journal" replace />;

	const prints = post.prints.map(findItem).filter(Boolean);
	const index = journal.indexOf(post);
	const next = journal[(index + 1) % journal.length];

	return (
		<Page title={post.title} className="page-journal">
			<article>
				<header className="post-header container px-3">
					<TransitionLink to="/journal" className="text-link mb-3">
						<Icon name="arrowLeft" size={16} /> Journal
					</TransitionLink>
					<PostMeta post={post} />
					<h2 className="post-title">{post.title}</h2>
					<p className="post-standfirst">{post.excerpt}</p>
				</header>

				<Reveal className="container-xxl px-3 px-lg-4">
					<div className="journal-cover post-cover">
						<SmartImage src={post.cover} alt="" />
					</div>
				</Reveal>

				<div className="post-body container px-3">
					{post.body.map((block, i) =>
						block.type === 'quote' ? (
							<blockquote key={i} className="post-quote">
								{block.text}
							</blockquote>
						) : (
							<p key={i} className={i === 0 ? 'has-dropcap' : undefined}>
								{block.text}
							</p>
						)
					)}
				</div>
			</article>

			{prints.length > 0 && (
				<section className="section section-surface">
					<div className="container-xxl px-3 px-lg-4">
						<Reveal className="mb-4 mb-md-5">
							<span className="eyebrow">Own a piece of the story</span>
							<h2 className="section-title">Prints from this story</h2>
						</Reveal>
						<ul className="product-grid">
							{prints.map((item, i) => (
								<ProductCard key={item.name} item={item} index={i} />
							))}
						</ul>
					</div>
				</section>
			)}

			<section className="section">
				<Reveal className="container px-3">
					<TransitionLink to={`/journal/${next.slug}`} className="next-story">
						<span className="eyebrow">Next story</span>
						<span className="next-title">
							{next.title} <Icon name="arrowRight" size={28} />
						</span>
					</TransitionLink>
				</Reveal>
			</section>
		</Page>
	);
}
