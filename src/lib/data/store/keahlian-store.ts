import { writable } from 'svelte/store'

export interface Keahlian {
    name: string
    value: number
}

const listOfKeahlian: Keahlian[] = [
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
    { name: 'SQL Server', value: 82 },
    { name: 'SQL Server', value: 82 },
    { name: 'C#', value: 81 },
    { name: 'ASP.NET', value: 83 },
    { name: '.NET Core', value: 80 },
    { name: 'EFCore', value: 86 },
    { name: 'Blazor', value: 77 },
    { name: 'MudBlazor (Blazor Components Library)', value: 75 },
    { name: 'MAUI Hybrin Blazor', value: 76 },
    { name: 'REST API', value: 89 },
    { name: 'Hangfire', value: 84 },
    { name: 'Ocelot API Gateway', value: 86 },
]

function getKeahlianStore() {
    const { subscribe, update } = writable(listOfKeahlian)

    return {
        subscribe,
        update: (keahlian: Keahlian[]) => update(store => store = keahlian),
        clear: () => update(store => store = [])
    }
}

export const keahlianStore = getKeahlianStore()