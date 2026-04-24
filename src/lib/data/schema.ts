import { z } from "zod";
import type { MessageKey } from "../types/messages";

export const NameAndValueSchema = z.object({
	name: z.string().min(1),
	value: z.number().min(0).max(100),
});

export const ListOfNameAndValueSchema = z.array(NameAndValueSchema);

export type NameAndValue = z.infer<typeof NameAndValueSchema>;

export const ProjectDataSchema = z.object({
	url: z.string(),
	image: z.string(),
	name: z.string(),
	desc: z.string().optional(),
	descKey: z.string() as z.ZodType<MessageKey>,
	dateCreated: z.date(),
	dateFinished: z.union([z.date(), z.literal('Sekarang')]),
	type: z.enum(['public', 'private']),
});

export const ListOfProjectDataSchema = z.array(ProjectDataSchema);

export type ProjectData = z.infer<typeof ProjectDataSchema>;
