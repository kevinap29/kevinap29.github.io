<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Badge } from "$lib/components/ui/badge";
	import Reveal from '$lib/components/Reveal.svelte';
	import { Calendar, FolderGit2, BookOpen, Rocket, CheckCircle2, Wrench } from '@lucide/svelte';
	import { GitHub } from '$lib/components/icons';
	import { i18n } from "$lib/i18n.svelte";
	import type { JournalData } from "$lib/data/schema";

	let { 
		journal, 
		index, 
		title, 
		htmlContent 
	} = $props<{
		journal: JournalData;
		index: number;
		title: string;
		htmlContent: string;
	}>();

	const getTypeIcon = (type: string) => {
		switch (type) {
			case 'Launch': return Rocket;
			case 'Milestone': return CheckCircle2;
			case 'Learning': return BookOpen;
			case 'Refactor': return Wrench;
			case 'Case Study': return FolderGit2;
			default: return GitHub;
		}
	};

	const formatDate = (date: Date) => {
		return date.toLocaleDateString(i18n.current === 'id' ? 'id-ID' : 'en-US', {
			year: 'numeric',
			month: 'long'
		});
	};

	const TypeIcon = $derived(getTypeIcon(journal.type));
</script>

<Reveal delay={250 + (index * 50)} x={-20}>
	<div class="relative pl-12 md:pl-20 group">
		<!-- Timeline Dot -->
		<div class="absolute left-[11px] md:left-[27px] top-6 size-3.5 bg-background border-2 border-primary rounded-full group-hover:scale-150 transition-transform duration-300 z-10"></div>
		
		<Card.Root class="rounded-none border-primary/10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
			<div class="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 group-hover:bg-primary transition-colors"></div>
			<Card.Header class="pb-3 border-b border-border/50 bg-muted/10">
				<div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
					<div class="space-y-1.5">
						<div class="flex items-center gap-2 text-primary font-semibold text-sm">
							<TypeIcon class="size-4" />
							<span>{journal.type}</span>
							{#if journal.repo}
								<span class="text-muted-foreground/50 mx-1">•</span>
								<div class="text-muted-foreground transition-colors underline-offset-4 flex items-center gap-1">
									<GitHub class="size-3" />
									{journal.repo.split('/')[1] || journal.repo}
								</div>
							{/if}
						</div>
						<h3 class="font-black text-2xl tracking-tight">
							{title}
						</h3>
					</div>
					<div class="flex items-center gap-1.5 text-xs text-muted-foreground font-bold uppercase tracking-widest shrink-0 sm:mt-1">
						<Calendar class="size-3" />
						{formatDate(journal.date)}
					</div>
				</div>
			</Card.Header>
			<Card.Content class="pt-6">
				<div class="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-p:leading-relaxed prose-img:rounded-xl prose-img:border prose-pre:bg-muted/50 prose-pre:border prose-pre:rounded-none">
					{@html htmlContent}
				</div>
			</Card.Content>
			<Card.Footer class="bg-muted/5 border-t border-border/50 pt-4 pb-4">
				<div class="flex flex-wrap gap-2">
					{#each journal.tags as tag}
						<Badge variant="secondary" class="rounded-none text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors border-none">
							{tag}
						</Badge>
					{/each}
				</div>
			</Card.Footer>
		</Card.Root>
	</div>
</Reveal>
