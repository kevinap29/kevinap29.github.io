import { setCookies } from '$lib';
import { sequence } from '@sveltejs/kit/hooks';

import type { RequestEvent, ResolveOptions } from '@sveltejs/kit';

type MaybePromise<T> = T | Promise<T>;

async function first(input: {
	event: RequestEvent;
	resolve(event: RequestEvent, opts?: ResolveOptions): MaybePromise<Response>;
}) {
	return await input.resolve(input.event, {
		transformPageChunk({ html }) {
			const theme = input.event.cookies.get('APP_THEME');

			if (theme) {
				return html.replace(/(?<=data-theme=).*(?<=")/im, `"${theme}"`);
			} else {
				setCookies(input.event.cookies, 'APP_THEME', 'crimson');

				return html;
			}
		}
	});
}

export const handle = sequence(first);
