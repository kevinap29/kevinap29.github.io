import type { LayoutServerLoad } from './$types';

// This can be false if you're using a fallback (i.e. SPA mode)
export const prerender = true;
// You must ensure SvelteKit's trailingSlash option is set appropriately for your environment. If your host does not render /a.html upon receiving a request for /a then you will need to set trailingSlash: 'always' in your root layout to create /a/index.html instead.
export const trailingSlash = 'always';

export const load = (() => {
	const websiteName = 'Kevin Agustiansyah Putra';
	const imageLocation = `/img/new-pas-foto.jpg`;
	const jobTitle = 'Fullstack Developer';
	const email = 'kevinagustiansyah298@gmail.com';
	const phone = '+62 895 4100 69696';
	const socials = {
		github: 'https://github.com/kevinap29',
		linkedin: 'https://www.linkedin.com/in/kevin-agustiansyah-9206041a3/',
		whatsapp: 'https://wa.me/62895410069696'
	};

	return {
		websiteName,
		imageLocation,
		jobTitle,
		email,
		phone,
		socials
	};
}) satisfies LayoutServerLoad;
