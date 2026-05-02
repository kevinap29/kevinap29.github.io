import { type JournalData } from '../schema';

const initialJournals: JournalData[] = [
	{
		slug: 'sveltekit-portfolio',
		titleKey: 'journal_sveltekit_title',
		date: new Date(2024, 6, 8, 0, 0, 0),
		type: 'Launch',
		repo: 'kevinap29/kevinap29.github.io',
		tags: ['SvelteKit', 'Tailwind', 'Shadcn']
	},
	{
		slug: 'ftp-upload-integration',
		titleKey: 'journal_ftp_upload_title',
		date: new Date(2023, 7, 15, 0, 0, 0),
		type: 'Case Study',
		repo: 'CRM/General',
		tags: ['.NET Core', 'SQL Server', 'API']
	},
	{
		slug: 'hashtags-maui',
		titleKey: 'journal_title_hashtags_maui',
		date: new Date(2025, 8, 18, 0, 0, 0),
		type: 'Launch',
		repo: 'hashtags-maui',
		tags: ['C#', '.NET MAUI', 'Mobile']
	},
	{
		slug: 'api-validator',
		titleKey: 'journal_title_api_validator',
		date: new Date(2025, 8, 5, 0, 0, 0),
		type: 'Launch',
		repo: 'api-validator',
		tags: ['TypeScript', 'Node.js', 'API']
	},
	{
		slug: 'scraping-api',
		titleKey: 'journal_title_scraping_api',
		date: new Date(2025, 7, 16, 0, 0, 0),
		type: 'Case Study',
		repo: 'scraping-api',
		tags: ['TypeScript', 'Web Scraping', 'Puppeteer']
	},
	{
		slug: 'sveltekit-lib',
		titleKey: 'journal_title_sveltekit_lib',
		date: new Date(2025, 6, 27, 0, 0, 0),
		type: 'Launch',
		repo: 'sveltekit-lib',
		tags: ['TypeScript', 'SvelteKit', 'Library']
	},
	{
		slug: 'http-request',
		titleKey: 'journal_title_http_request',
		date: new Date(2025, 0, 25, 0, 0, 0),
		type: 'Learning',
		repo: 'http-request',
		tags: ['TypeScript', 'HTTP', 'Networking']
	},
	{
		slug: 'ollama-chatbot',
		titleKey: 'journal_title_ollama_chatbot',
		date: new Date(2025, 0, 6, 0, 0, 0),
		type: 'Case Study',
		repo: 'ollama-chatbot',
		tags: ['Svelte', 'AI', 'Ollama']
	},
	{
		slug: 'api-user-dot',
		titleKey: 'journal_title_api_user_dot',
		date: new Date(2024, 6, 5, 0, 0, 0),
		type: 'Milestone',
		repo: 'API_User_DOT',
		tags: ['C#', '.NET Core', 'REST API']
	},
	{
		slug: 'blazor-resume',
		titleKey: 'journal_title_blazor_resume',
		date: new Date(2024, 5, 17, 0, 0, 0),
		type: 'Launch',
		repo: 'BlazorResume',
		tags: ['Blazor', 'SCSS', 'C#']
	},
	{
		slug: 'sistem-keuangan',
		titleKey: 'journal_title_sistem_keuangan',
		date: new Date(2023, 3, 20, 0, 0, 0),
		type: 'Case Study',
		repo: 'sistem-keuangan',
		tags: ['Svelte', 'Finance', 'Dashboard']
	},
	{
		slug: 'mainapidev',
		titleKey: 'journal_title_mainapidev',
		date: new Date(2022, 11, 21, 0, 0, 0),
		type: 'Launch',
		repo: 'mainapidev',
		tags: ['TypeScript', 'API', 'SvelteKit']
	},
	{
		slug: 'laravel-blog',
		titleKey: 'journal_title_laravel_blog',
		date: new Date(2021, 7, 5, 0, 0, 0),
		type: 'Learning',
		repo: 'laravelBlog',
		tags: ['PHP', 'Laravel', 'MySQL']
	},
	{
		slug: 'tugasakhir-is',
		titleKey: 'journal_title_tugasakhir_is',
		date: new Date(2021, 0, 3, 0, 0, 0),
		type: 'Milestone',
		repo: 'tugasakhir-is',
		tags: ['PHP', 'Academic', 'Information System']
	},
	{
		slug: 'api-php',
		titleKey: 'journal_title_api_php',
		date: new Date(2020, 10, 30, 0, 0, 0),
		type: 'Refactor',
		repo: 'api',
		tags: ['PHP', 'REST API', 'Backend']
	},
	{
		slug: 'ppdbv3',
		titleKey: 'journal_title_ppdbv3',
		date: new Date(2020, 5, 3, 0, 0, 0),
		type: 'Case Study',
		repo: 'ppdbv3',
		tags: ['PHP', 'MySQL', 'Education']
	},
	{
		slug: 'undangan-kakak',
		titleKey: 'journal_title_undangan_kakak',
		date: new Date(2022, 5, 28, 0, 0, 0),
		type: 'Launch',
		repo: 'undangan-kakak',
		tags: ['Svelte', 'Frontend', 'Animation']
	},
	{
		slug: 'new-api-hashtags',
		titleKey: 'journal_title_new_api_hashtags',
		date: new Date(2023, 0, 13, 0, 0, 0),
		type: 'Refactor',
		repo: 'new-api-hashtags',
		tags: ['TypeScript', 'API', 'Node.js']
	},
	{
		slug: 'advent-svelte',
		titleKey: 'journal_title_advent_svelte',
		date: new Date(2024, 0, 5, 0, 0, 0),
		type: 'Learning',
		repo: 'advent-svelte',
		tags: ['Svelte', 'Ecosystem', 'Challenges']
	},
	{
		slug: 'api-nik-kk',
		titleKey: 'journal_title_api_nik_kk',
		date: new Date(2024, 7, 9, 0, 0, 0),
		type: 'Case Study',
		repo: 'api_nik_kk',
		tags: ['TypeScript', 'Data Validation', 'Indonesian Identity']
	},
	{
		slug: 'launch-portofolio-nurulfitri',
		titleKey: 'journal_nurulfitri_title',
		date: new Date(2026, 3, 28, 0, 0, 0),
		type: 'Launch',
		repo: 'kevinap29/portofolio-nurulfitri',
		tags: ['SvelteKit', 'Portfolio', 'Frontend']
	}
];

export const journalsData = {
	get all() {
		return initialJournals.sort((a, b) => b.date.getTime() - a.date.getTime());
	}
};
