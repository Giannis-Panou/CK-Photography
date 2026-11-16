import { createContext, useCallback, useContext, useEffect, useState } from 'react';

/*
 * Appearance settings. Each one maps to a data-* attribute on <html>
 * (set before first paint by the script in index.html) and the SCSS in
 * theme.scss reacts to those attributes.
 */

export const THEMES = {
	noir: {
		label: 'Noir',
		description: 'Near-black, electric orange accent',
		bsTheme: 'dark',
		swatch: ['#0a0a0a', '#ff5a1f'],
		meta: '#0a0a0a',
	},
	bone: {
		label: 'Bone',
		description: 'Warm off-white, signal red accent',
		bsTheme: 'light',
		swatch: ['#efece6', '#e8341c'],
		meta: '#efece6',
	},
	gallery: {
		label: 'Gallery',
		description: 'Bright white walls, black type',
		bsTheme: 'light',
		swatch: ['#ffffff', '#141414'],
		meta: '#ffffff',
	},
	darkroom: {
		label: 'Darkroom',
		description: 'Deep charcoal so photos glow',
		bsTheme: 'dark',
		swatch: ['#0f0f10', '#ece9e3'],
		meta: '#0f0f10',
	},
	film: {
		label: 'Film',
		description: 'Warm paper tones, terracotta accent',
		bsTheme: 'light',
		swatch: ['#f3ede3', '#9c4a2b'],
		meta: '#f3ede3',
	},
	nordic: {
		label: 'Nordic',
		description: 'Cool blue-grey, slate accent',
		bsTheme: 'light',
		swatch: ['#eef2f4', '#2f5d73'],
		meta: '#eef2f4',
	},
};

export const TYPE_STYLES = {
	bold: { label: 'Bold', description: 'Syne & Inter', sample: "'Syne Variable', sans-serif" },
	classic: { label: 'Classic', description: 'Playfair & Nunito', sample: "'Playfair Display SC', serif" },
	luxe: { label: 'Luxe', description: 'Cormorant & Inter', sample: "'Cormorant Garamond', serif" },
	minimal: { label: 'Minimal', description: 'Inter throughout', sample: "'Inter Variable', sans-serif" },
};

export const CORNER_STYLES = {
	square: { label: 'Square' },
	soft: { label: 'Soft' },
};

const SETTINGS = {
	theme: { options: THEMES, storageKey: 'ck-theme', attr: 'theme', fallback: 'noir' },
	type: { options: TYPE_STYLES, storageKey: 'ck-type', attr: 'type', fallback: 'bold' },
	corners: { options: CORNER_STYLES, storageKey: 'ck-corners', attr: 'corners', fallback: 'square' },
};

const ThemeContext = createContext(null);

function readInitial(setting) {
	const { options, attr, fallback } = SETTINGS[setting];
	const current = document.documentElement.dataset[attr];
	return options[current] ? current : fallback;
}

export function ThemeProvider({ children }) {
	const [appearance, setAppearance] = useState(() => ({
		theme: readInitial('theme'),
		type: readInitial('type'),
		corners: readInitial('corners'),
	}));

	useEffect(() => {
		const root = document.documentElement;
		for (const [setting, value] of Object.entries(appearance)) {
			root.dataset[SETTINGS[setting].attr] = value;
		}
		root.dataset.bsTheme = THEMES[appearance.theme].bsTheme;
		document
			.querySelector('meta[name="theme-color"]')
			?.setAttribute('content', THEMES[appearance.theme].meta);
	}, [appearance]);

	const set = useCallback((setting, value) => {
		const config = SETTINGS[setting];
		if (!config?.options[value]) return;
		setAppearance((a) => ({ ...a, [setting]: value }));
		try {
			localStorage.setItem(config.storageKey, value);
		} catch {
			// ignore unavailable storage
		}
	}, []);

	return (
		<ThemeContext.Provider
			value={{ ...appearance, set, setTheme: (v) => set('theme', v) }}
		>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}
