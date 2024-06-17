import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { websiteName } = await parent();

	return {
		websiteName
	};
}) satisfies PageServerLoad;
