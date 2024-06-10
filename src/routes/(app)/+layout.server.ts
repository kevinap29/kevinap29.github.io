import type { LayoutServerLoad } from './$types';
import type { HttpResult, SkeletonTheme } from '$lib/@types';

export const load = (async ({ cookies, fetch, url }) => {
    let appTheme: string = '';
    let listTheme: SkeletonTheme[] = [];

    try {
        appTheme = cookies.get('APP_THEME') || 'wintry'
    } catch (e: unknown) {
        const error = e as Error;

        appTheme = ''
    }

    try {
        const response = await fetch(`${url.origin}/api/public/theme`, {
            method: 'GET'
        })
        const data = await response.json() as HttpResult<SkeletonTheme[]>;
        
        if (data.status != 200) throw Error();

        listTheme = data.value;
    } catch (e: unknown) {
        listTheme = [];
    }

    return {
        appTheme, listTheme
    };
}) satisfies LayoutServerLoad;