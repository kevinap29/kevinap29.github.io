<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { i18n } from '$lib/i18n.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import * as Carousel from '$lib/components/ui/carousel';
	import { ChevronLeft, ChevronRight, ExternalLink, Calendar, Tag } from '@lucide/svelte';
	import { base } from '$app/paths';
	import { projectsData } from '$lib/data/store/project-store.svelte';
	import Reveal from '$lib/components/Reveal.svelte';
	import SEO from '$lib/components/SEO.svelte';

	let { data } = $props();
	const project = $derived(data.project);
	const galleryImages = $derived(project.gallery ?? []);

	const sortedProjects = $derived(
		[...projectsData.all].sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime())
	);
	const currentIndex = $derived(sortedProjects.findIndex((p) => p.slug === project.slug));
	const prevProject = $derived(currentIndex > 0 ? sortedProjects[currentIndex - 1] : null);
	const nextProject = $derived(
		currentIndex >= 0 && currentIndex < sortedProjects.length - 1
			? sortedProjects[currentIndex + 1]
			: null
	);

	// Reactive content based on current language
	const currentData = $derived(
		data.localizedData[i18n.current] || data.localizedData['en'] || { content: '' }
	);
	const content = $derived(currentData.content);

	const formatDate = (date: Date) =>
		date.toLocaleDateString(i18n.current === 'id' ? 'id-ID' : 'en-US', {
			year: 'numeric',
			month: 'long'
		});
</script>

<SEO
	title={`${project.name} | ${m.project_case_study_label({}, { locale: i18n.current })}`}
	description={project.name}
	image={project.image}
/>

<div class="max-w-5xl mx-auto px-4 py-8 space-y-8">
	<Reveal delay={100} y={10}>
		<!-- Breadcrumb -->
		<Breadcrumb.Root>
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link href={`${base}/`}
						>{m.nav_home({}, { locale: i18n.current })}</Breadcrumb.Link
					>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Link href={`${base}/project`}
						>{m.nav_project({}, { locale: i18n.current })}</Breadcrumb.Link
					>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Link href={`${base}/project/${project.slug}`}>{project.name}</Breadcrumb.Link>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</Reveal>

	<Reveal delay={200} y={40}>
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

				<div
					class="aspect-video rounded-none overflow-hidden border border-border/50 shadow-2xl relative group"
				>
					<img
						src={`${base}${project.image}`}
						alt={project.name}
						class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
					/>
					<div class="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
				</div>
			</div>

			<div class="space-y-8">
				<div
					class="p-6 rounded-none bg-muted/30 border border-border/50 space-y-6 backdrop-blur-sm"
				>
					<div class="space-y-4">
						<h3 class="text-xs font-black uppercase tracking-widest text-primary">
							{m.project_info({}, { locale: i18n.current })}
						</h3>
						<div class="space-y-4">
							<div class="flex items-center gap-3">
								<div class="p-2 rounded-none bg-background shadow-sm">
									<Calendar class="size-4 text-muted-foreground" />
								</div>
								<div>
									<p
										class="text-[10px] font-black uppercase text-muted-foreground leading-none mb-1"
									>
										{m.project_timeline({}, { locale: i18n.current })}
									</p>
									<p class="text-sm font-bold">
										{formatDate(project.dateCreated)} -
										{#if project.dateFinished === 'Sekarang'}
											{m.present({}, { locale: i18n.current })}
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
									<p
										class="text-[10px] font-black uppercase text-muted-foreground leading-none mb-1"
									>
										{m.project_type({}, { locale: i18n.current })}
									</p>
									<p class="text-sm font-bold uppercase tracking-widest">
										{project.type === 'public'
											? m.visibility_public({}, { locale: i18n.current })
											: m.visibility_private({}, { locale: i18n.current })}
									</p>
								</div>
							</div>
						</div>
					</div>

					<Separator />

					<div class="flex flex-col gap-3">
						{#if project.url !== '#'}
							<Button
								href={project.url}
								target="_blank"
								class="w-full font-black uppercase tracking-widest rounded-none h-12 shadow-lg hover:shadow-primary/20 transition-all"
							>
								<ExternalLink class="size-4 mr-2" />
								{m.project_live_demo({}, { locale: i18n.current })}
							</Button>
						{/if}
						<Button
							variant="outline"
							href={`${base}/project`}
							class="w-full font-black uppercase tracking-widest rounded-none h-12"
						>
							<ChevronLeft class="size-4 mr-2" />
							{m.project_back_to_projects({}, { locale: i18n.current })}
						</Button>
					</div>
				</div>
			</div>
		</section>
	</Reveal>

	<Separator />

	<Reveal delay={300} y={20}>
		<!-- Content Section -->
		<section class="grid grid-cols-1 lg:grid-cols-3 gap-12">
			<div
				class="lg:col-span-2 prose prose-stone dark:prose-invert prose-headings:font-black prose-headings:tracking-tighter prose-p:text-muted-foreground prose-p:leading-relaxed max-w-none"
			>
				{#if content}
					<!-- eslint-disable-next-line svelte/no-at-html-tags -- Markdown HTML is sanitized via DOMPurify in +page.server.ts -->
					{@html content}
				{:else}
					<div class="py-20 text-center border-2 border-dashed rounded-none space-y-4">
						<p class="text-muted-foreground font-bold uppercase tracking-widest text-sm">
							{m.project_case_study_soon({}, { locale: i18n.current })}
						</p>
						<p class="text-xs text-muted-foreground/60 max-w-xs mx-auto">
							{m.project_case_study_soon_desc({}, { locale: i18n.current })}
						</p>
					</div>
				{/if}
			</div>
		</section>
	</Reveal>

	{#if galleryImages.length > 0}
		<Separator />

		<Reveal delay={350} y={20}>
			<section class="space-y-6">
				<h2 class="text-2xl font-black uppercase tracking-tighter">
					{m.project_gallery_title({}, { locale: i18n.current })}
				</h2>
				<div class="px-10">
					<Carousel.Root class="w-full max-w-4xl mx-auto">
						<Carousel.Content>
							{#each galleryImages as img, idx}
								<Carousel.Item>
									<div
										class="aspect-video overflow-hidden border border-border/50 bg-muted/20 shadow-md"
									>
										<img
											src={`${base}${img}`}
											alt={`${project.name} - ${idx + 1}`}
											class="w-full h-full object-cover"
											loading="lazy"
										/>
									</div>
								</Carousel.Item>
							{/each}
						</Carousel.Content>
						<Carousel.Previous />
						<Carousel.Next />
					</Carousel.Root>
				</div>
			</section>
		</Reveal>
	{/if}

	<Separator />

	<Reveal delay={400} y={20}>
		<!-- Next / Previous Project Navigation -->
		<nav class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2" aria-label="Project navigation">
			{#if prevProject}
				<a
					href={`${base}/project/${prevProject.slug}`}
					class="group p-6 border border-border/50 bg-muted/10 hover:bg-muted/30 hover:border-primary/40 transition-all flex items-center gap-4"
				>
					<ChevronLeft
						class="size-5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all shrink-0"
					/>
					<div class="min-w-0">
						<p class="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
							{m.project_prev({}, { locale: i18n.current })}
						</p>
						<p class="font-black text-lg truncate group-hover:text-primary transition-colors">
							{prevProject.name}
						</p>
					</div>
				</a>
			{:else}
				<div class="hidden sm:block"></div>
			{/if}

			{#if nextProject}
				<a
					href={`${base}/project/${nextProject.slug}`}
					class="group p-6 border border-border/50 bg-muted/10 hover:bg-muted/30 hover:border-primary/40 transition-all flex items-center justify-end gap-4 text-right"
				>
					<div class="min-w-0">
						<p class="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
							{m.project_next({}, { locale: i18n.current })}
						</p>
						<p class="font-black text-lg truncate group-hover:text-primary transition-colors">
							{nextProject.name}
						</p>
					</div>
					<ChevronRight
						class="size-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0"
					/>
				</a>
			{/if}
		</nav>
	</Reveal>
</div>
