import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from './en';
import el from './el';

/*
 * Interface language (English / Greek). The first visit follows the
 * browser's language; a choice from the header toggle is remembered.
 * Content from Instagram (captions) is shown as written.
 */

export const LANGUAGES = { en, el };
const STORAGE_KEY = 'ck-lang';
const LOCALES = { en: 'en-GB', el: 'el-GR' };

function initialLanguage() {
	const current = document.documentElement.lang;
	if (LANGUAGES[current]) return current; // set by the script in index.html
	return navigator.language?.toLowerCase().startsWith('el') ? 'el' : 'en';
}

const lookup = (dict, key) => key.split('.').reduce((node, part) => node?.[part], dict);

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
	const [lang, setLangState] = useState(initialLanguage);

	useEffect(() => {
		document.documentElement.lang = lang;
		document.querySelector('meta[name="description"]')?.setAttribute('content', LANGUAGES[lang].meta.description);
	}, [lang]);

	const setLang = useCallback((value) => {
		if (!LANGUAGES[value]) return;
		setLangState(value);
		try {
			localStorage.setItem(STORAGE_KEY, value);
		} catch {
			// ignore unavailable storage
		}
	}, []);

	const value = useMemo(() => {
		/** Text for a key; strings get {placeholders} filled, arrays/objects are returned as is. */
		const t = (key, vars) => {
			const text = lookup(LANGUAGES[lang], key) ?? lookup(en, key) ?? key;
			if (typeof text !== 'string' || !vars) return text;
			return text.replace(/\{(\w+)\}/g, (m, name) => (name in vars ? vars[name] : m));
		};
		return { lang, setLang, t, locale: LOCALES[lang] };
	}, [lang, setLang]);

	return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
	return useContext(LanguageContext);
}

/** The header button: switches to the other language. */
export function LanguageToggle({ className = '' }) {
	const { lang, setLang, t } = useLang();
	const other = lang === 'en' ? 'el' : 'en';
	return (
		<button
			type="button"
			className={`icon-btn lang-toggle ${className}`}
			onClick={() => setLang(other)}
			lang={other}
			aria-label={t('lang.label')}
			title={t('lang.label')}
		>
			{t('lang.short')}
		</button>
	);
}
