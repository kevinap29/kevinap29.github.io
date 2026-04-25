import { z } from 'zod';

export type MessageKey = keyof typeof import('../paraglide/messages').m;

export const ProjectDataSchema = z.object({
	url: z.string(),
	image: z.string(),
	name: z.string(),
	descKey: z.string() as z.ZodType<MessageKey>,
	dateCreated: z.date(),
	dateFinished: z.union([z.date(), z.literal('Sekarang')]),
	type: z.enum(['public', 'private']),
	tags: z.array(z.string()),
	slug: z.string().optional()
});

export const ListOfProjectDataSchema = z.array(ProjectDataSchema);

export type ProjectData = z.infer<typeof ProjectDataSchema>;
export interface ProjectMetadata {
	tech_stack?: string[];
	problem?: string;
	[key: string]: unknown;
}

export const JournalDataSchema = z.object({
	slug: z.string(),
	titleKey: z.string() as z.ZodType<MessageKey>,
	date: z.date(),
	type: z.enum(['Launch', 'Milestone', 'Learning', 'Refactor', 'Case Study']),
	repo: z.string().optional(),
	tags: z.array(z.string())
});

export type JournalData = z.infer<typeof JournalDataSchema>;
