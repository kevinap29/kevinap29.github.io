import type { PageServerLoad } from './$types';
import { journalsData } from '$lib/data/store/journal-store.svelte';
import matter from 'gray-matter';
import { marked } from 'marked';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const languages = ['en', 'id'];
	const localizedJournals: Record<string, { slug: string; html: string; metadata: any }[]> = {
		en: [],
		id: []
	};

	try {
		const modules = import.meta.glob('/src/lib/data/journals/*.md', {
			query: '?raw',
			import: 'default',
			eager: true
		});

		for (const journal of journalsData.all) {
			for (const lang of languages) {
				const path = `/src/lib/data/journals/${journal.slug}.${lang}.md`;
				const fallbackPath = `/src/lib/data/journals/${journal.slug}.en.md`;

				const rawContent = (modules[path] ||
					(lang === 'en' ? modules[fallbackPath] : null)) as string;

				if (rawContent) {
					const { data, content } = matter(rawContent);
					const html = await marked.parse(content);
					localizedJournals[lang].push({
						slug: journal.slug,
						html,
						metadata: data
					});
				}
			}
		}

		return {
			journalsInfo: journalsData.all,
			localizedJournals
		};
	} catch (e) {
		console.error(`Error loading journal markdowns:`, e);
		return {
			journalsInfo: journalsData.all,
			localizedJournals
		};
	}
};
