import DOMPurify from 'isomorphic-dompurify';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { projectsData } from '$lib/data/store/project-store.svelte';
import { isActiveRoute, normalizePath } from '$lib/utils';

describe('project content', () => {
	it('keeps project metadata in the canonical project store', () => {
		const projectSlugs = projectsData.all.map((project) => project.slug);

		expect(new Set(projectSlugs).size).toBe(projectSlugs.length);

		for (const slug of projectSlugs) {
			for (const language of ['en', 'id']) {
				const content = readFileSync(
					resolve('src/lib/data/projects', `${slug}.${language}.md`),
					'utf8'
				);

				expect(content.trimStart().startsWith('---')).toBe(false);
			}
		}
	});
});

describe('Markdown Hardening', () => {
	it('sanitizes malicious script tags from rendered HTML', () => {
		const dirtyHtml =
			'<p>Safe content</p><script>alert("xss")</script><img src="x" onerror="alert(1)">';
		const cleanHtml = DOMPurify.sanitize(dirtyHtml);
		expect(cleanHtml).not.toContain('<script>');
		expect(cleanHtml).not.toContain('onerror');
		expect(cleanHtml).toContain('<p>Safe content</p>');
	});
});

describe('Route Matching & i18n Parity', () => {
	it('normalizes trailing slashes when matching active navigation routes', () => {
		expect(normalizePath('/')).toBe('/');
		expect(normalizePath('/about/')).toBe('/about');
		expect(isActiveRoute('/about/', '/about')).toBe(true);
		expect(isActiveRoute('/sub/project/', '/sub/project')).toBe(true);
		expect(isActiveRoute('/project/', '/about')).toBe(false);
	});

	it('keeps identical translation keys between en and id message files', () => {
		const en = JSON.parse(readFileSync(resolve('messages/en.json'), 'utf8')) as Record<
			string,
			string
		>;
		const id = JSON.parse(readFileSync(resolve('messages/id.json'), 'utf8')) as Record<
			string,
			string
		>;

		expect(Object.keys(en).sort()).toEqual(Object.keys(id).sort());
	});
});
