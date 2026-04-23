<script lang="ts">
	import { page } from '$app/state';
	import { projectsData } from '$lib/data/store/project-store.svelte';
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";

	const websiteName = 'Kevin Agustiansyah Putra';
	const imageLocation = `/img/new-pas-foto.jpg`;

	const sortedProjects = $derived(projectsData.slice().sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime()));
</script>

<svelte:head>
	<title>Project | {websiteName}</title>
	<meta name="description" content={`Projek-projek ${websiteName}`} />
	<meta name="keywords" content={`Kevin,Agustiansyah,Putra,project`} />
	<meta property="og:title" content={`Project | ${websiteName}`} />
	<meta property="og:description" content="Website Portofolio Kevin Agustiansyah Putra" />
	<meta property="og:image" content={imageLocation} />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:type" content="website" />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 py-8 space-y-12">
	<section class="text-center space-y-4">
		<h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl">Projek</h1>
		<p class="text-xl text-muted-foreground">
			Kumpulan projek yang pernah saya kerjakan, baik open-source maupun profesional.
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
						{project.dateCreated.toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })} 
						- 
						{typeof project.dateFinished === 'string' ? project.dateFinished : project.dateFinished.toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}
					</Card.Description>
				</Card.Header>
				<Card.Content class="flex-grow">
					<div class="text-sm leading-relaxed text-muted-foreground">
						{@html project.desc}
					</div>
				</Card.Content>
				<Card.Footer class="pt-4 border-t bg-muted/30">
					{#if project.url !== '#'}
						<Button href={project.url} target="_blank" class="w-full" variant="outline">
							Lihat Projek
						</Button>
					{:else}
						<Button disabled class="w-full" variant="ghost">
							Privat
						</Button>
					{/if}
				</Card.Footer>
			</Card.Root>
		{/each}
	</section>
</div>
