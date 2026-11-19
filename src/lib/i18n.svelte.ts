/**
 * i18n.svelte.ts — Paraglide-JS v2 language state manager for Svelte 5 Runes
 *
 * Provides a reactive language store using $state rune, with
 * localStorage persistence for GitHub Pages (no server-side routing needed).
 */
import { setLocale, locales } from '$lib/paraglide/runtime.js';
import { m } from '$lib/paraglide/messages';

export type AvailableLanguageTag = (typeof locales)[number];

export const availableLanguages = locales as readonly AvailableLanguageTag[];

export const DEFAULT_LANG: AvailableLanguageTag = 'id';

/** Key used for localStorage persistence */
const STORAGE_KEY = 'lang';

/**
 * Reads the user's preferred language from localStorage.
 * Falls back to default if not set or invalid.
 */
function getStoredLanguage(): AvailableLanguageTag {
	if (typeof window === 'undefined') return DEFAULT_LANG;
	const stored = localStorage.getItem(STORAGE_KEY) as AvailableLanguageTag | null;
	if (stored && (availableLanguages as readonly string[]).includes(stored)) {
		return stored;
	}
	return DEFAULT_LANG;
}

/**
 * Reactive i18n state manager (Svelte 5 Rune pattern).
 * Call i18n.init() in root layout onMount.
 * Call i18n.switchTo(lang) to change language.
 */
export const i18n = (() => {
	let current = $state<AvailableLanguageTag>(DEFAULT_LANG);

	function syncHtmlLang(tag: AvailableLanguageTag) {
		if (typeof document !== 'undefined') {
			document.documentElement.lang = tag;
		}
	}

	function init() {
		const preferred = getStoredLanguage();
		current = preferred;
		setLocale(preferred, { reload: false });
		syncHtmlLang(preferred);
	}

	function switchTo(tag: AvailableLanguageTag) {
		current = tag;
		setLocale(tag, { reload: false });
		syncHtmlLang(tag);
		if (typeof window !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, tag);
		}
	}

	function t(key: string) {
		const locale = current;
		const message = (m as unknown as Record<string, unknown>)[key];
		if (typeof message === 'function') {
			return (
				message as (
					params?: Record<string, unknown>,
					options?: { locale: AvailableLanguageTag }
				) => string
			)({}, { locale });
		}
		return key;
	}

	return {
		get current() {
			return current;
		},
		init,
		switchTo,
		t
	};
})();
