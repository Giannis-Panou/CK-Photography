import { CORNER_STYLES, THEMES, TYPE_STYLES, useTheme } from '../context/ThemeContext';
import Icon from './Icon';

/** Colour theme, type pairing and corner style, in one dropdown. */
export default function AppearancePicker() {
	const { theme, type, corners, set } = useTheme();

	return (
		<div className="dropdown">
			<button
				type="button"
				className="icon-btn"
				data-bs-toggle="dropdown"
				data-bs-auto-close="outside"
				aria-expanded="false"
				aria-label="Appearance settings"
			>
				<Icon name="theme" />
			</button>
			<div className="dropdown-menu dropdown-menu-end appearance-menu">
				<fieldset>
					<legend className="eyebrow">Colour</legend>
					{Object.entries(THEMES).map(([key, t]) => (
						<button
							key={key}
							type="button"
							role="radio"
							aria-checked={theme === key}
							className="dropdown-item theme-option"
							onClick={() => set('theme', key)}
						>
							<span className="theme-swatch" style={{ '--a': t.swatch[0], '--b': t.swatch[1] }} />
							<span>
								{t.label}
								<small>{t.description}</small>
							</span>
							<Icon name="check" size={16} className="check" />
						</button>
					))}
				</fieldset>

				<fieldset>
					<legend className="eyebrow">Typography</legend>
					<div className="segmented segmented-3">
						{Object.entries(TYPE_STYLES).map(([key, t]) => (
							<button
								key={key}
								type="button"
								role="radio"
								aria-checked={type === key}
								onClick={() => set('type', key)}
								title={t.description}
							>
								<span className="type-sample" style={{ fontFamily: t.sample }}>Aa</span>
								{t.label}
							</button>
						))}
					</div>
				</fieldset>

				<fieldset>
					<legend className="eyebrow">Corners</legend>
					<div className="segmented">
						{Object.entries(CORNER_STYLES).map(([key, c]) => (
							<button
								key={key}
								type="button"
								role="radio"
								aria-checked={corners === key}
								onClick={() => set('corners', key)}
							>
								<span className={`corner-sample corner-${key}`} aria-hidden="true" />
								{c.label}
							</button>
						))}
					</div>
				</fieldset>
			</div>
		</div>
	);
}
