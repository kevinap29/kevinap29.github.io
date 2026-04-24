import { ListOfProjectDataSchema, type ProjectData } from '../schema';

const initialProjects: ProjectData[] = [
	{
		url: `https://www.gj-energi.co.id/`,
		image: `img/gje-compro.png`,
		name: `Website Company Profile`,
		descKey: 'project_gje_desc',
		dateCreated: new Date(2021, 9, 7, 0, 0, 0),
		dateFinished: new Date(2021, 9, 21, 0, 0, 0),
		type: 'public'
	},
	{
		url: `https://rapidapi.com/kevinagustiansyah298-RSbcaTc-IDi/api/top-instagram-hashtag`,
		image: `img/tophashtags-rapidapi.png`,
		name: `Top Hashtags API`,
		descKey: 'project_tophashtags_desc',
		dateCreated: new Date(2021, 11, 6, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'public'
	},
	{
		url: `#`,
		image: `img/general-project.png`,
		name: `Sistem ERP PT. Ciptapapan Dinamika`,
		descKey: 'project_erp_desc',
		dateCreated: new Date(2022, 10, 10, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'private'
	},
	{
		url: `https://string-formatter.vercel.app`,
		image: `img/string-formatter.png`,
		name: `String Formatter`,
		descKey: 'project_formatter_desc',
		dateCreated: new Date(2023, 2, 28, 0, 0, 0),
		dateFinished: new Date(2023, 3, 15, 0, 0, 0),
		type: 'public'
	},
	{
		url: `#`,
		image: `img/general-project.png`,
		name: `Microservices PT. Ciptapapan Dinamika`,
		descKey: 'project_microservices_desc',
		dateCreated: new Date(2022, 10, 10, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'private'
	},
	{
		url: `#`,
		image: `img/general-project.png`,
		name: `Hangfire (Cron Jobs) PT. Ciptapapan Dinamika`,
		descKey: 'project_hangfire_desc',
		dateCreated: new Date(2022, 10, 10, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'private'
	},
	{
		url: `https://kevinap29.github.io`,
		image: `img/web-portofolio.png`,
		name: `Web Portofolio`,
		descKey: 'project_portofolio_desc',
		dateCreated: new Date(2024, 6, 8, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'public'
	},
	{
		url: `https://rapidapi.com/kevinagustiansyah298-RSbcaTc-IDi/api/decode-nik-dan-kk`,
		image: `img/decode-nik-kk.png`,
		name: `Decode NIK & KK API`,
		descKey: 'project_nik_desc',
		dateCreated: new Date(2021, 11, 6, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'public'
	},
	{
		url: `https://rapidapi.com/kevinagustiansyah298-RSbcaTc-IDi/api/sky-scrapper3`,
		image: `img/skyscrapper-rapidapi.png`,
		name: `Sky Scrapper API`,
		descKey: 'project_sky_desc',
		dateCreated: new Date(2021, 11, 10, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'public'
	},
	{
		url: `https://play.google.com/store/apps/details?id=com.mainapidev.top_hashtags`,
		image: `img/tophashtags-app.png`,
		name: `Top Hashtags App`,
		descKey: 'project_tophashtags_app_desc',
		dateCreated: new Date(2022, 5, 1, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'public'
	},
	{
		url: `https://rapidapi.com/kevinagustiansyah298-RSbcaTc-IDi/api/all-in-one-validator-api`,
		image: `img/allinone-validator.png`,
		name: `All In One Validator API`,
		descKey: 'project_validator_desc',
		dateCreated: new Date(2021, 11, 15, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'public'
	}
];

export const projectsData = {
	get all() {
		// Return raw data. Components will handle the translation 
		// to ensure full reactivity with Svelte 5 runes.
		return initialProjects as ProjectData[];
	}
};
