import * as m from '$lib/paraglide/messages';

export type MessageKey = keyof typeof m;

export type MessageOptions = {
	locale?: string;
};

export type MessageFunction = (params?: Record<string, unknown>, options?: MessageOptions) => string;
