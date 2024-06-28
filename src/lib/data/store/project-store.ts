import { writable } from 'svelte/store';

export interface ProjectData {
	url: string;
	image: string;
	name: string;
	desc: string;
}

const projects: ProjectData[] = [
	{
		url: `https://www.gj-energi.co.id/`,
		image: `img/gje-compro.png`,
		name: `Website Company Profile`,
		desc: `Website company profile untuk PT. Ginting Jaya Energy dibuat dengan <span class="font-bold">PHP, Laravel, Bootstrap, Javascript dan MySQL</span>.`
	},
	{
		url: `https://rapidapi.com/kevinagustiansyah298-RSbcaTc-IDi/api/top-instagram-hashtag`,
		image: `img/tophashtags-rapidapi.png`,
		name: `Top Hashtags API`,
		desc: `Sebuah publik <span class="font-bold">API</span> yang bisa dipakai oleh semua developer yang membutuhkan dan saya publish ke <a class="anchor font-bold" href="https://www.rapidapi.com/" target="_blank">RapidAPI</a> dibuat dengan <span class="font-bold">Node JS, Sveltekit</span>.`
	},
	{
		url: `#`,
		image: `img/general-project.png`,
		name: `Sistem ERP PT. Ciptapapan Dinamika`,
		desc: `Membuat modul baru dan memelihara sistem ERP dengan teknologi <span class="font-bold">ASP.NET, SQL Server, Crystal Report, REST API, Javascript</span>.`
	}
];

function getProjects() {
	const { subscribe } = writable(projects);

	return {
		subscribe
	};
}

export const projectStore = getProjects();
