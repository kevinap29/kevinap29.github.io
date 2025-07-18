import { writable } from 'svelte/store';

export interface INameAndValue {
	name: string;
	value: number;
}

const listOfKeahlian: INameAndValue[] = [
	{ name: 'MySQL', value: 73 },
	{ name: 'PHP', value: 72 },
	{ name: 'Laravel', value: 72 },
	{ name: 'HTML', value: 92 },
	{ name: 'CSS', value: 76 },
	{ name: 'Bootstrap CSS', value: 81 },
	{ name: 'Tailwind CSS', value: 79 },
	{ name: 'Node JS', value: 82 },
	{ name: 'Express JS', value: 77 },
	{ name: 'Javascript', value: 86 },
	{ name: 'Typescript', value: 84 },
	{ name: 'Svelte JS', value: 84 },
	{ name: 'Sveltekit JS', value: 88 },
	{ name: 'Skeleton (Sveltekit Components Library)', value: 86 },
	{ name: 'Prisma ORM', value: 85 },
	{ name: 'SQL Server', value: 84 },
	{ name: 'C#', value: 85 },
	{ name: 'ASP.NET', value: 83 },
	{ name: '.NET Core', value: 82 },
	{ name: 'Crystal Report', value: 84 },
	{ name: 'EFCore', value: 86 },
	{ name: 'Blazor', value: 79 },
	{ name: 'MudBlazor (Blazor Components Library)', value: 77 },
	{ name: 'MAUI Hybrin Blazor', value: 76 },
	{ name: 'REST API', value: 89 },
	{ name: 'Hangfire', value: 84 },
	{ name: 'Ocelot API Gateway', value: 86 },
	{ name: 'Linq', value: 87 },
	{ name: 'PWA (Progressive Web Application)', value: 78 },
	{ name: 'Power BI', value: 76 }
];

const listOfAlat: INameAndValue[] = [
	{ name: 'Visual Studio 2008', value: 77 },
	{ name: 'Visual Studio 2019', value: 83 },
	{ name: 'Visual Studio 2022', value: 83 },
	{ name: 'Visual Studio Code', value: 85 },
	{ name: 'Postman', value: 81 },
	{ name: 'PHPMyAdmin', value: 81 },
	{ name: 'SQL Server Management Studio 18', value: 82 },
	{ name: 'SQL Server Management Studio 20', value: 80 },
	{ name: 'Git', value: 81 },
	{ name: 'Github', value: 83 },
	{ name: 'Power Query M', value: 73 }
];

function generateStore<T>(data: T) {
	const { subscribe, update } = writable(data);

	return {
		subscribe,
		update: (data: T) =>
			update((store) => {
				store = data;

				return store;
			})
	};
}

export const keahlianStore = generateStore(listOfKeahlian);
export const alatStore = generateStore(listOfAlat);
