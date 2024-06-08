import type { LayoutServerLoad } from './$types';

// This can be false if you're using a fallback (i.e. SPA mode)
export const prerender = true;
// You must ensure SvelteKit's trailingSlash option is set appropriately for your environment. If your host does not render /a.html upon receiving a request for /a then you will need to set trailingSlash: 'always' in your root layout to create /a/index.html instead.
export const trailingSlash = 'always';

export const load = (async () => {
    return {};
}) satisfies LayoutServerLoad;