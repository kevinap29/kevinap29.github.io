<script lang="ts">
	import { projectsData } from '$lib/data/store/project-store.svelte';
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import ProjectFilter from "$lib/components/ProjectFilter.svelte";
	import { m } from '$lib/paraglide/messages';
	import { i18n } from '$lib/i18n.svelte';
	import type { MessageFunction } from '$lib/types/messages';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { base } from '$app/paths';
	import SEO from '$lib/components/SEO.svelte';
	import Reveal from '$lib/components/Reveal.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import { Search } from '@lucide/svelte';

	let { data } = $props();
	let websiteName = $derived(data.websiteName);
	let imageLocation = $derived(data.imageLocation);

	// Filter States (Svelte 5 Runes)
	let searchQuery = $state('');
	let selectedTags = $state<string[]>([]);
	let visibilityFilter = $state<'all' | 'public' | 'private'>('all');

	// Derived Data
	const availableTags = $derived([...new Set(projectsData.all.flatMap(p => p.tags))].sort());
	
	const filteredProjects = $derived(
		projectsData.all
			.filter(p => {
				const messageFunc = (m as unknown as Record<string, unknown>)[p.descKey];
				const localizedDesc = typeof messageFunc === 'function' 
					? (messageFunc as (p: object, o: object) => string)({}, { locale: i18n.current }).toLowerCase()
					: '';
				const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
									 localizedDesc.includes(searchQuery.toLowerCase());
				
				const matchesTags = selectedTags.length === 0 || 
								   selectedTags.some(t => p.tags.includes(t));
				
				const matchesVisibility = visibilityFilter === 'all' || p.type === visibilityFilter;
				
				return matchesSearch && matchesTags && matchesVisibility;
			})
			.sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime())
	);

	const formatDate = (date: Date) => date.toLocaleDateString(i18n.current === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'long' });
</script>

<SEO 
	title={m.nav_project({}, { locale: i18n.current })} 
	description={m.project_intro({}, { locale: i18n.current })} 
	keywords={`Kevin,Agustiansyah,Putra,project`}
	image={imageLocation}
	{websiteName}
/>

<div class="max-w-7xl mx-auto px-4 py-8 space-y-12">
	<PageHero 
		title={m.project_title({}, { locale: i18n.current })} 
		description={m.project_intro({}, { locale: i18n.current })} 
	/>

	<Reveal delay={500} y={20}>
		<section class="max-w-4xl mx-auto">
			<ProjectFilter 
				bind:searchQuery 
				bind:selectedTags 
				bind:visibilityFilter
				{availableTags}
			/>
		</section>
	</Reveal>

	<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative min-h-[400px]">
		{#each filteredProjects as project, i (project.name)}
			<div animate:flip={{ duration: 300 }} in:fade={{ duration: 200 }} out:fade={{ duration: 100 }}>
				<Reveal delay={750 + (i * 100)} y={20}>
					<Card.Root class="overflow-hidden flex flex-col group h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-primary/5">
						<div class="relative aspect-video overflow-hidden">
							<img
								src={`${base}/${project.image}`}
								class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
								alt={project.name}
							/>
							<div class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
								<span class="text-white text-xs font-black uppercase tracking-widest">
									{project.type}
								</span>
							</div>
						</div>
						<Card.Header class="space-y-2">
							<div class="flex justify-between items-start gap-2">
								<Card.Title class="text-xl font-black leading-tight group-hover:text-primary transition-colors">{project.name}</Card.Title>
							</div>
							<Card.Description class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
								<span class="size-1.5 rounded-none bg-primary/40"></span>
								{formatDate(project.dateCreated)} 
								- 
								{#if project.dateFinished === 'Sekarang'}
									{m.present({}, { locale: i18n.current })}
								{:else if typeof project.dateFinished === 'string'}
									{project.dateFinished}
								{:else}
									{formatDate(project.dateFinished)}
								{/if}
							</Card.Description>
						</Card.Header>
						<Card.Content class="grow space-y-4">
							<div class="text-sm leading-relaxed text-muted-foreground font-medium">
								{@html (m as unknown as Record<string, MessageFunction>)[project.descKey]({}, { locale: i18n.current })}
							</div>
							<div class="flex flex-wrap gap-1.5">
								{#each project.tags as tag}
									<Badge variant="secondary" class="text-[9px] font-black uppercase px-2 py-0.5 bg-secondary/50 hover:bg-secondary transition-colors">
										{tag}
									</Badge>
								{/each}
							</div>
						</Card.Content>
						<Card.Footer class="flex flex-col gap-2 pt-4 border-t bg-muted/20">
							<Button href="/project/{project.slug}" class="w-full font-black uppercase tracking-widest text-xs shadow-sm hover:shadow-md transition-all">
								{m.project_case_study_btn({}, { locale: i18n.current })}
							</Button>
						</Card.Footer>
					</Card.Root>
				</Reveal>
			</div>
		{:else}
			<div class="col-span-full py-20 text-center space-y-4" in:fade>
				<div class="inline-flex p-4 rounded-none bg-muted">
					<Search class="size-8 text-muted-foreground" />
				</div>
				<h3 class="text-xl font-black uppercase tracking-widest">{m.no_project_found()}</h3>
				<p class="text-muted-foreground font-medium">{m.no_project_desc({}, { locale: i18n.current })}</p>
				<Button variant="link" onclick={() => { searchQuery = ''; selectedTags = []; visibilityFilter = 'all'; }} class="font-bold uppercase text-xs">
					{m.no_project_reset({}, { locale: i18n.current })}
				</Button>
			</div>
		{/each}
	</section>
</div>
