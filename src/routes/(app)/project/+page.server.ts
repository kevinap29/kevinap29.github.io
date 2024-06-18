import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { websiteName, imageLocation } = await parent();

	return {
		websiteName,
		imageLocation
	};
}) satisfies PageServerLoad;
