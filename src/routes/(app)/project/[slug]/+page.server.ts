import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { projectsData } from '$lib/data/store/project-store.svelte';
import { type ProjectMetadata } from '$lib/data/schema';
import matter from 'gray-matter';
import { marked } from 'marked';

export const load: PageServerLoad = async ({ params }) => {
	const project = projectsData.all.find((p) => p.slug === params.slug);

	if (!project) {
		error(404, 'Project not found');
	}

	const languages = ['en', 'id'];
	const localizedData: Record<string, { content: string; metadata: ProjectMetadata }> = {};

	try {
		const modules = import.meta.glob('/src/lib/data/projects/*.md', {
			query: '?raw',
			import: 'default',
			eager: true
		});
		
		for (const lang of languages) {
			// Try [slug].[lang].md first, then fallback to [slug].md if it's the default (en)
			const path = `/src/lib/data/projects/${params.slug}.${lang}.md`;
			const fallbackPath = `/src/lib/data/projects/${params.slug}.md`;
			
			const rawContent = (modules[path] || (lang === 'en' ? modules[fallbackPath] : null)) as string;

			if (rawContent) {
				const { data, content } = matter(rawContent);
				const html = await marked.parse(content);
				localizedData[lang] = {
					content: html,
					metadata: data as ProjectMetadata
				};
			}
		}

		return {
			project,
			localizedData
		};
	} catch (e) {
		console.error(`Error loading markdown for ${params.slug}:`, e);
		return {
			project,
			localizedData: {}
		};
	}
};
