import { CORNER_STYLES, THEMES, TYPE_STYLES, useTheme } from '../context/ThemeContext';
import Icon from './Icon';
import { useLang } from '../i18n/LanguageContext';

/** Colour theme, type pairing and corner style, in one dropdown. */
export default function AppearancePicker() {
	const { theme, type, corners, set } = useTheme();
	const { t } = useLang();

	return (
		<div className="dropdown">
			<button
				type="button"
				className="icon-btn"
				data-bs-toggle="dropdown"
				data-bs-auto-close="outside"
				aria-expanded="false"
				aria-label={t('appearance.label')}
			>
				<Icon name="theme" />
			</button>
			<div className="dropdown-menu dropdown-menu-end appearance-menu">
				<fieldset>
					<legend className="eyebrow">{t('appearance.colour')}</legend>
					{Object.entries(THEMES).map(([key, th]) => (
						<button
							key={key}
							type="button"
							role="radio"
							aria-checked={theme === key}
							className="dropdown-item theme-option"
							onClick={() => set('theme', key)}
						>
							<span className="theme-swatch" style={{ '--a': th.swatch[0], '--b': th.swatch[1] }} />
							<span>
								{th.label}
								<small>{t(`appearance.themes.${key}`)}</small>
							</span>
							<Icon name="check" size={16} className="check" />
						</button>
					))}
				</fieldset>

				<fieldset>
					<legend className="eyebrow">{t('appearance.typography')}</legend>
					<div className="segmented segmented-3">
						{Object.entries(TYPE_STYLES).map(([key, ty]) => (
							<button
								key={key}
								type="button"
								role="radio"
								aria-checked={type === key}
								onClick={() => set('type', key)}
								title={ty.description}
							>
								<span className="type-sample" style={{ fontFamily: ty.sample }}>Aa</span>
								{t(`appearance.types.${key}`)}
							</button>
						))}
					</div>
				</fieldset>

				<fieldset>
					<legend className="eyebrow">{t('appearance.corners')}</legend>
					<div className="segmented">
						{Object.keys(CORNER_STYLES).map((key) => (
							<button
								key={key}
								type="button"
								role="radio"
								aria-checked={corners === key}
								onClick={() => set('corners', key)}
							>
								<span className={`corner-sample corner-${key}`} aria-hidden="true" />
								{t(`appearance.cornerStyles.${key}`)}
							</button>
						))}
					</div>
				</fieldset>
			</div>
		</div>
	);
}
