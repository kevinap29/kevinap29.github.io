<script lang="ts">
	import { page } from '$app/state';
	import { projectsData } from '$lib/data/store/project-store.svelte';
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import * as m from '$lib/paraglide/messages';
	import { i18n } from '$lib/i18n.svelte';
	import type { MessageFunction } from '$lib/types/messages';

	const websiteName = 'Kevin Agustiansyah Putra';
	const imageLocation = `/img/new-pas-foto.jpg`;

	const sortedProjects = $derived(projectsData.all.slice().sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime()));
	
	const formatDate = (date: Date) => date.toLocaleDateString(i18n.current === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'long' });
</script>

<svelte:head>
	<title>{m.nav_project({}, { locale: i18n.current })} | {websiteName}</title>
	<meta name="description" content={m.project_intro({}, { locale: i18n.current })} />
	<meta name="keywords" content={`Kevin,Agustiansyah,Putra,project`} />
	<meta property="og:title" content={`${m.nav_project({}, { locale: i18n.current })} | ${websiteName}`} />
	<meta property="og:description" content={m.project_intro({}, { locale: i18n.current })} />
	<meta property="og:image" content={imageLocation} />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:type" content="website" />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 py-8 space-y-12">
	<section class="text-center space-y-4">
		<h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl">{m.project_title({}, { locale: i18n.current })}</h1>
		<p class="text-xl text-muted-foreground">
			{m.project_intro({}, { locale: i18n.current })}
		</p>
	</section>

	<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each sortedProjects as project}
			<Card.Root class="overflow-hidden flex flex-col group h-full transition-all hover:shadow-lg">
				<div class="relative aspect-video overflow-hidden">
					<img
						src={`${page.url.origin}/${project.image}`}
						class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
						alt={project.name}
					/>
					<div class="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0"></div>
				</div>
				<Card.Header>
					<div class="flex justify-between items-start">
						<Card.Title class="text-xl">{project.name}</Card.Title>
						<span class="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-secondary-foreground uppercase tracking-wider">
							{project.type}
						</span>
					</div>
					<Card.Description class="text-xs text-muted-foreground">
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
				<Card.Content class="grow">
					<div class="text-sm leading-relaxed text-muted-foreground">
						{@html (m as unknown as Record<string, MessageFunction>)[project.descKey]({}, { locale: i18n.current })}
					</div>
				</Card.Content>
				<Card.Footer class="pt-4 border-t bg-muted/30">
					{#if project.url !== '#'}
						<Button href={project.url} target="_blank" class="w-full" variant="outline">
							{m.project_view_btn({}, { locale: i18n.current })}
						</Button>
					{:else}
						<Button disabled class="w-full" variant="ghost">
							{m.project_private_btn()}
						</Button>
					{/if}
				</Card.Footer>
			</Card.Root>
		{/each}
	</section>
</div>
