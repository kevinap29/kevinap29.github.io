import { writable } from 'svelte/store';

type ProjectDataType = 'public' | 'private';

export interface ProjectData {
	url: string;
	image: string;
	name: string;
	desc: string;
	dateCreated: Date;
	dateFinished: Date | 'Sekarang';
	type: ProjectDataType;
}

const projects: ProjectData[] = [
	{
		url: `https://www.gj-energi.co.id/`,
		image: `img/gje-compro.png`,
		name: `Website Company Profile`,
		desc: `Website company profile untuk PT. Ginting Jaya Energy dibuat dengan <span class="font-bold">PHP, Laravel, Bootstrap, Javascript dan MySQL</span>.`,
		dateCreated: new Date(2021, 9, 7, 0, 0, 0),
		dateFinished: new Date(2021, 9, 21, 0, 0, 0),
		type: 'public'
	},
	{
		url: `https://rapidapi.com/kevinagustiansyah298-RSbcaTc-IDi/api/top-instagram-hashtag`,
		image: `img/tophashtags-rapidapi.png`,
		name: `Top Hashtags API`,
		desc: `Sebuah publik <span class="font-bold">API</span> yang bisa dipakai oleh semua developer yang membutuhkan dan saya publish ke <a class="anchor font-bold" href="https://www.rapidapi.com/" target="_blank">RapidAPI</a> dibuat dengan <span class="font-bold">Node JS, Sveltekit</span>.`,
		dateCreated: new Date(2021, 11, 6, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'public'
	},
	{
		url: `#`,
		image: `img/general-project.png`,
		name: `Sistem ERP PT. Ciptapapan Dinamika`,
		desc: `Membuat modul baru dan memelihara sistem ERP dengan teknologi <span class="font-bold">ASP.NET, SQL Server, Crystal Report, REST API, Javascript</span>.`,
		dateCreated: new Date(2022, 10, 10, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'private'
	},
	{
		url: `https://string-formatter.vercel.app`,
		image: `img/string-formatter.png`,
		name: `String Formatter`,
		desc: `Projek pribadi untuk memudahkan pekerjaan saya sehari-hari dengan teknologi <span class="font-bold">Node JS, Sveltekit, Bootstrap, Vercel, Github</span>.`,
		dateCreated: new Date(2023, 2, 28, 0, 0, 0),
		dateFinished: new Date(2023, 3, 15, 0, 0, 0),
		type: 'public'
	},
	{
		url: `#`,
		image: `img/general-project.png`,
		name: `Microservices PT. Ciptapapan Dinamika`,
		desc: `Membuat endpoint baru dan memelihara <span class="font-bold">Microservices</span> perusahaan dengan teknologi <span class="font-bold">.NET Core, SQL Server, REST API, Linq, EFCore</span>.`,
		dateCreated: new Date(2022, 10, 10, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'private'
	},
	{
		url: `#`,
		image: `img/general-project.png`,
		name: `Hangfire (Cron Jobs) PT. Ciptapapan Dinamika`,
		desc: `Membuat jobs baru dan memelihara semua jobs hangfire dengan teknologi <span class="font-bold">ASP.NET, SQL Server, REST API, Linq, EFCore, Hangfire</span>.`,
		dateCreated: new Date(2022, 10, 10, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'private'
	},
	{
		url: `https://kevinap29.github.io`,
		image: `img/web-portofolio.png`,
		name: `Web Portofolio`,
		desc: `Web portofolio untuk diri saya sendiri dengan teknologi <span class="font-bold">Node JS, Sveltekit, Skeleton, Tailwind CSS, Github</span>.`,
		dateCreated: new Date(2024, 6, 8, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'public'
	},
	{
		url: `https://rapidapi.com/kevinagustiansyah298-RSbcaTc-IDi/api/decode-nik-dan-kk`,
		image: `img/decode-nik-kk.png`,
		name: `Decode NIK & KK API`,
		desc: `Sebuah publik <span class="font-bold">API</span> yang bisa dipakai oleh semua developer yang membutuhkan dan saya publish ke <a class="anchor font-bold" href="https://www.rapidapi.com/" target="_blank">RapidAPI</a> dibuat dengan <span class="font-bold">Node JS, Sveltekit</span>.`,
		dateCreated: new Date(2021, 11, 6, 0, 0, 0),
		dateFinished: 'Sekarang',
		type: 'public'
	}
];

function getProjects() {
	const { subscribe } = writable(projects);

	return {
		subscribe
	};
}

export const projectStore = getProjects();
