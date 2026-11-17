import { useState } from 'react';
import { Page } from '../components/Layout';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import { CONTACT } from '../data/navigation';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../data/instagram';
import { useToast } from '../context/ToastContext';
import { useLang } from '../i18n/LanguageContext';

/**
 * There is no backend yet, so the form composes an email in the visitor's
 * mail app. TODO: swap for a form service (e.g. Formspree or Netlify Forms)
 * when the site is deployed.
 */
export default function Contact() {
	const notify = useToast();
	const { t, lang } = useLang();
	const [validated, setValidated] = useState(false);
	const shootTypes = t('contact.shootTypes');

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		setValidated(true);
		if (!form.checkValidity()) {
			form.querySelector(':invalid')?.focus();
			return;
		}
		const data = Object.fromEntries(new FormData(form));
		const subject = t('contact.subject', { type: data.type, name: data.name });
		const body = [
			`${t('contact.name')}: ${data.name}`,
			`${t('contact.email')}: ${data.email}`,
			`${t('contact.type')}: ${data.type}`,
			...(data.date ? [`${t('contact.date')}: ${data.date}`] : []),
			'',
			data.message,
		].join('\n');
		window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		notify({ title: t('contact.toastTitle'), message: t('contact.toastMessage', { email: CONTACT.email }) });
	};

	return (
		<Page title={t('contact.title')} className="page-contact" footerCta={false}>
			<header className="page-hero container-xxl px-3 px-lg-4">
				<span className="eyebrow">{t('contact.title')}</span>
				<h2 className="page-hero-title">
					{t('contact.heading1')}
					<br />
					{t('contact.heading2')}
				</h2>
				<p className="page-hero-lead">{t('contact.lead')}</p>
			</header>

			<div className="container-xxl px-3 px-lg-4 pb-5">
				<div className="row g-4 g-lg-5">
					<Reveal className="col-12 col-lg-7">
						{/* key resets the radios to the first type when the language changes */}
						<form
							key={lang}
							className={`contact-form needs-validation${validated ? ' was-validated' : ''}`}
							noValidate
							onSubmit={handleSubmit}
						>
							<div className="row g-4">
								<div className="col-sm-6">
									<label htmlFor="name" className="form-label">{t('contact.name')}</label>
									<input id="name" name="name" className="form-control" autoComplete="name" required />
									<div className="invalid-feedback">{t('contact.invalidName')}</div>
								</div>
								<div className="col-sm-6">
									<label htmlFor="email" className="form-label">{t('contact.email')}</label>
									<input id="email" name="email" type="email" inputMode="email" className="form-control" autoComplete="email" required />
									<div className="invalid-feedback">{t('contact.invalidEmail')}</div>
								</div>
								<fieldset className="col-12">
									<legend className="form-label">{t('contact.type')}</legend>
									<div className="chip-row">
										{shootTypes.map((type, i) => (
											<label key={type} className="chip-radio">
												<input type="radio" name="type" value={type} defaultChecked={i === 0} required />
												<span>{type}</span>
											</label>
										))}
									</div>
								</fieldset>
								<div className="col-sm-6">
									<label htmlFor="date" className="form-label">
										{t('contact.date')} <span className="text-muted-ck">{t('contact.optional')}</span>
									</label>
									<input id="date" name="date" type="date" className="form-control" />
								</div>
								<div className="col-12">
									<label htmlFor="message" className="form-label">{t('contact.message')}</label>
									<textarea id="message" name="message" rows="6" className="form-control" required minLength={10} />
									<div className="invalid-feedback">{t('contact.invalidMessage')}</div>
								</div>
								<div className="col-12">
									<button type="submit" className="btn btn-accent btn-lg">
										{t('contact.send')} <Icon name="arrowRight" size={18} />
									</button>
								</div>
							</div>
						</form>
					</Reveal>

					<Reveal className="col-12 col-lg-4 offset-lg-1" delay={120}>
						<ul className="contact-direct">
							<li>
								<span className="eyebrow">{t('contact.email')}</span>
								<a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
							</li>
							<li>
								<span className="eyebrow">{t('contact.phone')}</span>
								<a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a>
							</li>
							<li>
								<span className="eyebrow">Instagram</span>
								<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">@{INSTAGRAM_HANDLE}</a>
							</li>
							<li>
								<span className="eyebrow">{t('contact.basedIn')}</span>
								<span>{t('contact.location')}</span>
							</li>
						</ul>
					</Reveal>
				</div>

				<section className="process" aria-labelledby="process-heading">
					<Reveal>
						<span className="eyebrow">{t('contact.processEyebrow')}</span>
						<h2 id="process-heading" className="section-title">{t('contact.processTitle')}</h2>
					</Reveal>
					<ol className="process-steps">
						{t('contact.steps').map(([title, text], i) => (
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
