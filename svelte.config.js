import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess()],

	onwarn: (warning, handler) => {
		if (warning.code === 'custom_element_props_identifier') return;
		handler(warning);
	},

	vitePlugin: {
		inspector: true
	},
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			fallback: '404.html'
		}),
		paths: {
			base: process.env.BASE_PATH || '',
			relative: false
		},
		alias: {
			$routes: 'src/routes'
		},
		prerender: {
			entries: ['*']
		}
	}
};
export default config;
