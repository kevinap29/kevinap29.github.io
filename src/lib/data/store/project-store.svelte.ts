import { type ProjectData } from '../schema';
import { generateSlug } from '$lib/utils';

const initialProjects: ProjectData[] = [
	{
		url: `https://www.gj-energi.co.id/`,
		image: `/img/gje-compro.png`,
		name: `Website Company Profile`,
		descKey: 'project_gje_desc',
		dateCreated: new Date(2021, 9, 7, 0, 0, 0),
		dateFinished: new Date(2021, 9, 21, 0, 0, 0),
		type: 'public',
		tags: ['PHP', 'Laravel', 'Bootstrap']
	},
	{
		url: `https://rapidapi.com/kevinagustiansyah298-RSbcaTc-IDi/api/top-instagram-hashtag`,
		image: `/img/tophashtags-rapidapi.png`,
		name: `Top Hashtags API`,
		descKey: 'project_tophashtags_desc',
		dateCreated: new Date(2021, 11, 6, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'public',
		tags: ['Node.js', 'Javascript', 'RapidAPI']
	},
	{
		url: `#`,
		image: `/img/general-project.png`,
		name: `Sistem ERP PT. Ciptapapan Dinamika`,
		descKey: 'project_erp_desc',
		dateCreated: new Date(2022, 10, 10, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'private',
		tags: ['.NET', 'C#', 'SQL Server', 'Power BI', 'Bootstrap']
	},
	{
		url: `https://string-formatter.vercel.app`,
		image: `/img/string-formatter.png`,
		name: `String Formatter`,
		descKey: 'project_formatter_desc',
		dateCreated: new Date(2023, 2, 28, 0, 0, 0),
		dateFinished: new Date(2023, 3, 15, 0, 0, 0),
		type: 'public',
		tags: ['Javascript', 'SvelteKit', 'Tailwind CSS']
	},
	{
		url: `#`,
		image: `/img/general-project.png`,
		name: `Microservices PT. Ciptapapan Dinamika`,
		descKey: 'project_microservices_desc',
		dateCreated: new Date(2022, 10, 10, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'private',
		tags: ['.NET', 'C#', 'Microservices', 'RabbitMQ']
	},
	{
		url: `#`,
		image: `/img/general-project.png`,
		name: `Hangfire (Cron Jobs) PT. Ciptapapan Dinamika`,
		descKey: 'project_hangfire_desc',
		dateCreated: new Date(2022, 10, 10, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'private',
		tags: ['.NET', 'C#', 'Hangfire', 'SQL Server']
	},
	{
		url: `https://kevinap29.github.io`,
		image: `/img/web-portofolio.png`,
		name: `Web Portofolio`,
		descKey: 'project_portofolio_desc',
		dateCreated: new Date(2024, 6, 8, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'public',
		tags: ['SvelteKit', 'Tailwind CSS', 'TypeScript']
	},
	{
		url: `https://rapidapi.com/kevinagustiansyah298-RSbcaTc-IDi/api/decode-nik-dan-kk`,
		image: `/img/decode-nik-kk.png`,
		name: `Decode NIK & KK API`,
		descKey: 'project_nik_desc',
		dateCreated: new Date(2021, 11, 6, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'public',
		tags: ['Node.js', 'Javascript', 'API']
	},
	{
		url: `https://rapidapi.com/kevinagustiansyah298-RSbcaTc-IDi/api/sky-scrapper3`,
		image: `/img/skyscrapper-rapidapi.png`,
		name: `Sky Scrapper API`,
		descKey: 'project_sky_desc',
		dateCreated: new Date(2025, 8, 16, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'public',
		tags: ['Node.js', 'Javascript', 'Web Scraping']
	},
	{
		url: `https://play.google.com/store/apps/details?id=com.mainapidev.top_hashtags`,
		image: `/img/tophashtags-app.png`,
		name: `Top Hashtags App`,
		descKey: 'project_tophashtags_app_desc',
		dateCreated: new Date(2025, 9, 18, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'public',
		tags: ['MAUI Hybrid Blazor', 'MudBlazor', 'Android'],
		gallery: ['/img/tophashtags-app.png', '/img/tophashtags-rapidapi.png']
	},
	{
		url: `https://rapidapi.com/kevinagustiansyah298-RSbcaTc-IDi/api/all-in-one-validator-api`,
		image: `/img/allinone-validator.png`,
		name: `All In One Validator API`,
		descKey: 'project_validator_desc',
		dateCreated: new Date(2025, 9, 5, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'public',
		tags: ['Node.js', 'Javascript', 'API']
	},
	{
		url: `https://mainapidev.vercel.app/`,
		image: `/img/mainapidev.png`,
		name: `@mainapidev`,
		descKey: 'project_mainapidev_desc',
		dateCreated: new Date(2025, 6, 26, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'public',
		tags: ['SvelteKit', 'Svelte 5', 'TypeScript', 'Tailwind CSS', 'Shadcn Svelte', 'Paraglide JS'],
		gallery: [
			'/img/mainapidev.png',
			'/img/tophashtags-rapidapi.png',
			'/img/decode-nik-kk.png',
			'/img/skyscrapper-rapidapi.png',
			'/img/allinone-validator.png'
		]
	},
	{
		url: `https://nurulfitri.vercel.app/`,
		image: `/img/portofolio-nurulfitri.png`,
		name: `Portfolio Nurul Fitri`,
		descKey: 'project_nurulfitri_desc',
		dateCreated: new Date(2026, 3, 28, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'public',
		tags: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Paraglide JS']
	},
	{
		url: `https://github.com/kevinap29/antigravity-custom-agents`,
		image: `/img/antigravity-custom-agents.png`,
		name: `Antigravity Custom Agents`,
		descKey: 'project_antigravity_agents_desc',
		dateCreated: new Date(2026, 10, 23, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'public',
		tags: ['AI Agents', 'SDLC', 'Antigravity', 'PowerShell', 'Bash', '.NET Core', 'SvelteKit'],
		slug: 'antigravity-custom-agents'
	}
];

// Generate slugs automatically
const projectsWithSlugs = initialProjects.map((p) => ({
	...p,
	slug: p.slug ?? generateSlug(p.name)
})) as ProjectData[];

export const projectsData = {
	get all() {
		return projectsWithSlugs;
	}
};

const featuredProjectSlugs = [
	'portfolio-nurul-fitri',
	'mainapidev',
	'top-hashtags-app',
	'website-company-profile',
	'web-portofolio'
] as const;

export const featuredProjects = featuredProjectSlugs
	.map((slug) => projectsWithSlugs.find((project) => project.slug === slug))
	.filter((project): project is ProjectData => project !== undefined);
