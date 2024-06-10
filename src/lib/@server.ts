import type { Cookies } from '@sveltejs/kit';

export function setCookies(cookies: Cookies, key: string, value: string, seconds?: number) {
	cookies.set(key, value, {
		path: '/',
		maxAge: seconds,
		secure: import.meta.env.PROD,
		sameSite: 'lax'
	});
}