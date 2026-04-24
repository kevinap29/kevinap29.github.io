import { ListOfNameAndValueSchema, type NameAndValue } from '../schema';

const listOfKeahlian: NameAndValue[] = ListOfNameAndValueSchema.parse([
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
	{ name: 'Shadcn Svelte', value: 90 }, // Added this!
	{ name: 'Prisma ORM', value: 85 },
	{ name: 'SQL Server', value: 84 },
	{ name: 'C#', value: 85 },
	{ name: 'ASP.NET', value: 83 },
	{ name: '.NET Core', value: 82 },
	{ name: 'Crystal Report', value: 84 },
	{ name: 'EFCore', value: 86 },
	{ name: 'Blazor', value: 79 },
	{ name: 'MudBlazor (Blazor Components Library)', value: 77 },
	{ name: 'MAUI Hybrid Blazor', value: 76 },
	{ name: 'REST API', value: 89 },
	{ name: 'Hangfire', value: 84 },
	{ name: 'Ocelot API Gateway', value: 86 },
	{ name: 'Linq', value: 87 },
	{ name: 'PWA (Progressive Web Application)', value: 78 },
	{ name: 'Power BI', value: 76 }
]);

const listOfAlat: NameAndValue[] = ListOfNameAndValueSchema.parse([
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
]);

class SkillStore {
	keahlian = $state<NameAndValue[]>(listOfKeahlian);
	alat = $state<NameAndValue[]>(listOfAlat);

	updateKeahlian(data: NameAndValue[]) {
		this.keahlian = ListOfNameAndValueSchema.parse(data);
	}

	updateAlat(data: NameAndValue[]) {
		this.alat = ListOfNameAndValueSchema.parse(data);
	}
}

export const skillStore = new SkillStore();
