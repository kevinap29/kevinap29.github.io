<script lang="ts">
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages';
	import { i18n } from '$lib/i18n.svelte';
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import { Separator } from "$lib/components/ui/separator";
	import * as Breadcrumb from "$lib/components/ui/breadcrumb";
	import { ChevronLeft, ExternalLink, Calendar, Tag } from "@lucide/svelte";
	import type { ProjectMetadata } from '$lib/data/schema';
	import { base } from '$app/paths';
	import Reveal from '$lib/components/Reveal.svelte';
	import SEO from '$lib/components/SEO.svelte';

	let { data } = $props();
	const project = $derived(data.project);
	
	// Reactive content based on current language
	const currentData = $derived(data.localizedData[i18n.current] || data.localizedData['en'] || { content: '', metadata: {} as ProjectMetadata });
	const content = $derived(currentData.content);
	const metadata = $derived(currentData.metadata);

	const formatDate = (date: Date) => date.toLocaleDateString(i18n.current === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'long' });
</script>

<SEO 
	title={`${project.name} | Case Study`} 
	description={metadata?.problem || project.name}
	image={project.image}
/>

<div class="max-w-5xl mx-auto px-4 py-8 space-y-8">
	<Reveal delay={250} y={10}>
		<!-- Breadcrumb -->
		<Breadcrumb.Root>
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Link href="/project">{m.nav_project()}</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Link href="/project/{project.slug}">{project.name}</Breadcrumb.Link>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</Reveal>

	<Reveal delay={500} y={40}>
		<!-- Hero Section -->
		<section class="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
			<div class="lg:col-span-2 space-y-6">
				<div class="space-y-4">
					<div class="flex flex-wrap gap-2">
						{#each project.tags as tag}
							<Badge variant="secondary" class="font-bold uppercase tracking-wider text-[10px]">
								{tag}
							</Badge>
						{/each}
					</div>
					<h1 class="text-4xl md:text-6xl font-black tracking-tighter leading-none">
						{project.name}
					</h1>
				</div>

				<div class="aspect-video rounded-none overflow-hidden border border-border/50 shadow-2xl relative group">
					<img 
						src={`${base}/${project.image}`} 
						alt={project.name}
						class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
					/>
					<div class="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
				</div>
			</div>

			<div class="space-y-8">
				<div class="p-6 rounded-none bg-muted/30 border border-border/50 space-y-6 backdrop-blur-sm">
					<div class="space-y-4">
						<h3 class="text-xs font-black uppercase tracking-widest text-primary">Project Info</h3>
						<div class="space-y-4">
							<div class="flex items-center gap-3">
								<div class="p-2 rounded-none bg-background shadow-sm">
									<Calendar class="size-4 text-muted-foreground" />
								</div>
								<div>
									<p class="text-[10px] font-black uppercase text-muted-foreground leading-none mb-1">Timeline</p>
									<p class="text-sm font-bold">
										{formatDate(project.dateCreated)} - 
										{#if project.dateFinished === 'Sekarang'}
											{m.present()}
										{:else}
											{formatDate(project.dateFinished)}
										{/if}
									</p>
								</div>
							</div>
							<div class="flex items-center gap-3">
								<div class="p-2 rounded-none bg-background shadow-sm">
									<Tag class="size-4 text-muted-foreground" />
								</div>
								<div>
									<p class="text-[10px] font-black uppercase text-muted-foreground leading-none mb-1">Type</p>
									<p class="text-sm font-bold uppercase tracking-widest">{project.type}</p>
								</div>
							</div>
						</div>
					</div>

					<Separator />

					<div class="flex flex-col gap-3">
						{#if project.url !== '#'}
							<Button href={project.url} target="_blank" class="w-full font-black uppercase tracking-widest rounded-none h-12 shadow-lg hover:shadow-primary/20 transition-all">
								<ExternalLink class="size-4 mr-2" />
								Live Demo
							</Button>
						{/if}
						<Button variant="outline" href="/project" class="w-full font-black uppercase tracking-widest rounded-none h-12">
							<ChevronLeft class="size-4 mr-2" />
							Back to Projects
						</Button>
					</div>
				</div>
				
				{#if metadata?.tech_stack}
					<div class="space-y-4 px-2">
						<h3 class="text-xs font-black uppercase tracking-widest text-muted-foreground">Main Technologies</h3>
						<ul class="space-y-2">
							{#each metadata.tech_stack as tech}
								<li class="flex items-center gap-2 text-sm font-bold">
									<span class="size-1.5 rounded-none bg-primary"></span>
									{tech}
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>
		</section>
	</Reveal>

	<Separator />

	<Reveal delay={750} y={20}>
		<!-- Content Section -->
		<section class="grid grid-cols-1 lg:grid-cols-3 gap-12">
			<div class="lg:col-span-2 prose prose-stone dark:prose-invert prose-headings:font-black prose-headings:tracking-tighter prose-p:text-muted-foreground prose-p:leading-relaxed max-w-none">
				{#if content}
					{@html content}
				{:else}
					<div class="py-20 text-center border-2 border-dashed rounded-none space-y-4">
						<p class="text-muted-foreground font-bold uppercase tracking-widest text-sm">Detailed case study coming soon</p>
						<p class="text-xs text-muted-foreground/60 max-w-xs mx-auto">I'm currently documenting the process and technical challenges of this project.</p>
					</div>
				{/if}
			</div>
			
			<div class="hidden lg:block space-y-6">
				{#each metadata?.problem ? [metadata.problem] : [] as problem}
					<div class="p-6 rounded-none bg-primary/5 border border-primary/10 space-y-3">
						<h4 class="text-[10px] font-black uppercase tracking-widest text-primary">The Challenge</h4>
						<p class="text-sm font-medium leading-relaxed italic text-foreground/80">
							"{problem}"
						</p>
					</div>
				{/each}
			</div>
		</section>
	</Reveal>
</div>
