// import { listTheme } from '$lib/data/theme'
import type { LayoutServerLoad } from './$types';

export const load = (async () => {
	// let appTheme: string = '';

	// try {
	//     appTheme = cookies.get('APP_THEME') || 'wintry'
	// } catch (e: unknown) {
	//     const error = e as Error;

	//     appTheme = ''
	// }

	return {
		// appTheme,
		//listTheme
	};
}) satisfies LayoutServerLoad;
