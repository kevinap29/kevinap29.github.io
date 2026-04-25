import { m } from '$lib/paraglide/messages';
import {
	Server,
	Database,
	Layout,
	Palette,
	Cpu,
	GitBranch,
	Cloud,
	Zap,
	FileCode,
	Layers,
	Globe,
	type LucideIcon
} from '@lucide/svelte';

export interface SkillItem {
	title: string;
	description: () => string;
	value: number;
	icon: LucideIcon;
	span?: string;
	className?: string;
}

export const technologySkills: SkillItem[] = [
	{
		title: 'Node.JS',
		description: () => m.tech_desc_node(),
		value: 90,
		icon: Server,
		span: 'md:col-span-2 md:row-span-2',
		className: 'bg-green-500/5 hover:bg-green-500/10 border-green-500/20'
	},
	{
		title: 'SvelteKit',
		description: () => m.tech_desc_sveltekit(),
		value: 85,
		icon: Layout,
		span: 'md:col-span-2 md:row-span-1',
		className: 'bg-orange-500/5 hover:bg-orange-500/10 border-orange-500/20'
	},
	{
		title: 'TypeScript',
		description: () => m.tech_desc_typescript(),
		value: 85,
		icon: FileCode,
		span: 'md:col-span-1 md:row-span-1',
		className: 'bg-blue-500/5 hover:bg-blue-500/10 border-blue-500/20'
	},
	{
		title: '.NET / C#',
		description: () => m.tech_desc_dotnet(),
		value: 85,
		icon: Cpu,
		span: 'md:col-span-1 md:row-span-1',
		className: 'bg-purple-500/5 hover:bg-purple-500/10 border-purple-500/20'
	},
	{
		title: 'Tailwind CSS',
		description: () => m.tech_desc_tailwind(),
		value: 90,
		icon: Palette,
		span: 'md:col-span-2 md:row-span-1',
		className: 'bg-cyan-500/5 hover:bg-cyan-500/10 border-cyan-500/20'
	},
	{
		title: 'SQL Databases',
		description: () => m.tech_desc_sql(),
		value: 80,
		icon: Database,
		span: 'md:col-span-1 md:row-span-1'
	}
];

export const toolSkills: SkillItem[] = [
	{
		title: 'Git & GitHub',
		description: () => m.tech_desc_git(),
		value: 90,
		icon: GitBranch,
		span: 'md:col-span-2 md:row-span-1'
	},
	{
		title: 'Vercel',
		description: () => m.tech_desc_vercel(),
		value: 80,
		icon: Cloud
	},
	{
		title: 'REST API',
		description: () => m.tech_desc_rest(),
		value: 85,
		icon: Globe
	},
	{
		title: 'EF Core / Linq',
		description: () => m.tech_desc_efcore(),
		value: 80,
		icon: Layers
	},
	{
		title: 'Hangfire',
		description: () => m.tech_desc_hangfire(),
		value: 75,
		icon: Zap
	}
];
