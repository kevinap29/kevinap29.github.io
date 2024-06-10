import { json, redirect } from '@sveltejs/kit';
import { listTheme } from '$lib/data/theme'

import type { RequestHandler } from './$types';
import type { HttpResult, SkeletonTheme } from '$lib/@types';

export const GET = (async () => {
    const result: HttpResult<SkeletonTheme[]> = {
        status: 500,
        message: 'Internal Server Error',
        value: []
    };

    try {
        result.status = 200;
        result.message = "Get all list theme";
        result.value = listTheme;
    } catch (e: unknown) {
        const error = e as Error;
        
        result.status = parseInt(error.cause as string || "500");
        result.message = error.message;
    }
    
    return json(result, { status: result.status })
}) satisfies RequestHandler;

export const POST = (async ({ url }) => {
    throw redirect(301, url.origin + '/api/error?status=502&message=Method not implement');
}) satisfies RequestHandler;

export const PUT = (async ({ url }) => {
    throw redirect(301, url.origin + '/api/error?status=502&message=Method not implement');
}) satisfies RequestHandler;

export const DELETE = (async ({ url }) => {
    throw redirect(301, url.origin + '/api/error?status=502&message=Method not implement');
}) satisfies RequestHandler;