import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, parent }) => {
    const parentData = await parent();
    let pageTitleId = 'Halo, Nama saya Kevin Agustiansyah'
    let pageBodyId = [
        ''
    ]
    let pageTitleEn = ''
    let pageBodyEn = [
        ''
    ]

    try {
        if (!parentData.loadAPI) throw Error();

        const url = 'https://deep-translate1.p.rapidapi.com/language/translate/v2';
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': 'cceb0f61c3mshd8ed0df1564b829p1eb426jsn2375763b0e4f',
                'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                q: pageTitleId,
                source: 'id',
                target: 'en'
            })
        };
        const response = await fetch(url, options);
        const result = await response.json() as { 
            data: { 
                translations: {
                    translatedText: string
                } 
            } 
        };

        pageTitleEn = result.data.translations.translatedText;
    } catch (e) {
        pageTitleEn = ''
    }

    return {
        pageTitleId,
        pageTitleEn
    };
}) satisfies PageServerLoad;