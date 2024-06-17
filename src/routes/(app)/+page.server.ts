import { pageBodyId, pageTitleId } from '$lib/data/description';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, parent }) => {
	async function fetchTranslateAPI<T>(q: string) {
		let result: T | undefined = undefined;

		try {
			const url = 'https://deep-translate1.p.rapidapi.com/language/translate/v2';
			const options = {
				method: 'POST',
				headers: {
					'x-rapidapi-key': 'cceb0f61c3mshd8ed0df1564b829p1eb426jsn2375763b0e4f',
					'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					q: q,
					source: 'id',
					target: 'en'
				})
			};
			const response = await fetch(url, options);
			const res = (await response.json()) as T;

			result = res;
		} catch (e) {
			console.table(e);
		}

		return result;
	}
	type ResultAPITranslate = {
		data: {
			translations: {
				translatedText: string;
			};
		};
	};

	const parentData = await parent();
	let pageTitleEn = '';
	let pageBodyEn = [''];

	try {
		if (!parentData.loadAPI) throw Error();

		const result = await fetchTranslateAPI<ResultAPITranslate>(pageTitleId);

		if (!result) throw Error();

		pageTitleEn = result.data.translations.translatedText;
	} catch (e) {
		pageTitleEn = '';
	}

	for await (const body of pageBodyId) {
		try {
			if (!parentData.loadAPI) throw Error();

			const result = await fetchTranslateAPI<ResultAPITranslate>(body);

			if (!result) throw Error();

			pageBodyEn.push(result.data.translations.translatedText);
		} catch (e) {}
	}

	return {
		pageTitleId,
		pageTitleEn,
		pageBodyId,
		pageBodyEn
	};
}) satisfies PageServerLoad;
