import { useState } from 'react';
import { Page } from '../components/Layout';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import { CONTACT } from '../data/navigation';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../data/instagram';
import { useToast } from '../context/ToastContext';

const SHOOT_TYPES = ['Portrait', 'Wedding', 'Event', 'Commercial', 'Landscape / print', 'Something else'];

const STEPS = [
	['Tell me about it', 'Send a few lines about what you have in mind, where, and roughly when.'],
	['We plan it together', 'A short call to agree on the look, the location and the schedule.'],
	['The shoot', 'Relaxed and unhurried. You get a curated, fully edited gallery afterwards.'],
];

/**
 * There is no backend yet, so the form composes an email in the visitor's
 * mail app. TODO: swap for a form service (e.g. Formspree or Netlify Forms)
 * when the site is deployed.
 */
export default function Contact() {
	const notify = useToast();
	const [validated, setValidated] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		setValidated(true);
		if (!form.checkValidity()) {
			form.querySelector(':invalid')?.focus();
			return;
		}
		const data = Object.fromEntries(new FormData(form));
		const subject = `${data.type} enquiry from ${data.name}`;
		const body = [
			`Name: ${data.name}`,
			`Email: ${data.email}`,
			`Type of shoot: ${data.type}`,
			...(data.date ? [`Preferred date: ${data.date}`] : []),
			'',
			data.message,
		].join('\n');
		window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		notify({ title: 'Opening your email app', message: `Your message is addressed to ${CONTACT.email}` });
	};

	return (
		<Page title="Contact" className="page-contact" footerCta={false}>
			<header className="page-hero container-xxl px-3 px-lg-4">
				<span className="eyebrow">Contact</span>
				<h2 className="page-hero-title">
					Let's make
					<br />
					something.
				</h2>
				<p className="page-hero-lead">
					Portraits, weddings, events, commercial work and print enquiries. Tell me what you have in mind.
				</p>
			</header>

			<div className="container-xxl px-3 px-lg-4 pb-5">
				<div className="row g-4 g-lg-5">
					<Reveal className="col-12 col-lg-7">
						<form className={`contact-form needs-validation${validated ? ' was-validated' : ''}`} noValidate onSubmit={handleSubmit}>
							<div className="row g-4">
								<div className="col-sm-6">
									<label htmlFor="name" className="form-label">Name</label>
									<input id="name" name="name" className="form-control" autoComplete="name" required />
									<div className="invalid-feedback">Please tell me your name.</div>
								</div>
								<div className="col-sm-6">
									<label htmlFor="email" className="form-label">Email</label>
									<input id="email" name="email" type="email" inputMode="email" className="form-control" autoComplete="email" required />
									<div className="invalid-feedback">I need an email address to reply to.</div>
								</div>
								<fieldset className="col-12">
									<legend className="form-label">Type of shoot</legend>
									<div className="chip-row">
										{SHOOT_TYPES.map((t, i) => (
											<label key={t} className="chip-radio">
												<input type="radio" name="type" value={t} defaultChecked={i === 0} required />
												<span>{t}</span>
											</label>
										))}
									</div>
								</fieldset>
								<div className="col-sm-6">
									<label htmlFor="date" className="form-label">
										Preferred date <span className="text-muted-ck">(optional)</span>
									</label>
									<input id="date" name="date" type="date" className="form-control" />
								</div>
								<div className="col-12">
									<label htmlFor="message" className="form-label">Message</label>
									<textarea id="message" name="message" rows="6" className="form-control" required minLength={10} />
									<div className="invalid-feedback">A few words about the shoot, please.</div>
								</div>
								<div className="col-12">
									<button type="submit" className="btn btn-accent btn-lg">
										Send enquiry <Icon name="arrowRight" size={18} />
									</button>
								</div>
							</div>
						</form>
					</Reveal>

					<Reveal className="col-12 col-lg-4 offset-lg-1" delay={120}>
						<ul className="contact-direct">
							<li>
								<span className="eyebrow">Email</span>
								<a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
							</li>
							<li>
								<span className="eyebrow">Phone</span>
								<a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a>
							</li>
							<li>
								<span className="eyebrow">Instagram</span>
								<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">@{INSTAGRAM_HANDLE}</a>
							</li>
							<li>
								<span className="eyebrow">Based in</span>
								<span>{CONTACT.location}</span>
							</li>
						</ul>
					</Reveal>
				</div>

				<section className="process" aria-labelledby="process-heading">
					<Reveal>
						<span className="eyebrow">How it works</span>
						<h2 id="process-heading" className="section-title">Three simple steps</h2>
					</Reveal>
					<ol className="process-steps">
						{STEPS.map(([title, text], i) => (
							<Reveal as="li" key={title} delay={i * 100}>
								<span className="process-num">{String(i + 1).padStart(2, '0')}</span>
								<h3>{title}</h3>
								<p>{text}</p>
							</Reveal>
						))}
					</ol>
				</section>
			</div>
		</Page>
	);
}
