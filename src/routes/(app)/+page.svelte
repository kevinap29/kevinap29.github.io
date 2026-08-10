<script lang="ts">
	import { cn } from '$lib/utils';
	import { m } from '$lib/paraglide/messages';
	import { i18n } from '$lib/i18n.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import BentoGrid from '$lib/components/BentoGrid.svelte';
	import BentoCard from '$lib/components/BentoCard.svelte';
	import Reveal from '$lib/components/Reveal.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { ArrowRight, BriefcaseBusiness } from '@lucide/svelte';
	import { featuredProjects } from '$lib/data/store/project-store.svelte';
	import { technologySkills, toolSkills } from '$lib/data/store/skills-store.svelte';
	import type { MessageFunction } from '$lib/types/messages';

	let { data } = $props();
	let websiteName = $derived(data.websiteName);
	let imageLocation = $derived(data.imageLocation);
</script>

<SEO
	description={m.meta_description({ name: websiteName }, { locale: i18n.current })}
	keywords={`Kevin,Agustiansyah,Putra,${technologySkills.map((s) => s.title).join(',')},${toolSkills.map((s) => s.title).join(',')}`}
	image={imageLocation}
	{websiteName}
/>

<div class="max-w-4xl mx-auto px-4 py-12 space-y-16">
	<Reveal delay={100} y={40}>
		<section class="text-center space-y-6">
			<div class="space-y-2">
				<h2 class="text-3xl font-medium text-primary tracking-wide uppercase">
					{m.hello_name({}, { locale: i18n.current })}
				</h2>
				<h1 class="text-4xl font-extrabold tracking-tight lg:text-6xl">Kevin Agustiansyah Putra</h1>
			</div>
			<p class="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
				{m.hero_value_proposition({}, { locale: i18n.current })}
			</p>
			<p class="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
				{m.hero_description({}, { locale: i18n.current })} <br />
				<span class="font-bold text-foreground">{m.hero_tools({}, { locale: i18n.current })}</span>
				{m.hero_tools_suffix({}, { locale: i18n.current })}
			</p>
			<div class="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
				<Button href="/project" size="lg" class="font-bold">
					<BriefcaseBusiness />
					{m.hero_primary_cta({}, { locale: i18n.current })}
					<ArrowRight />
				</Button>
				<Button href="/contact" variant="outline" size="lg" class="font-bold">
					{m.hero_secondary_cta({}, { locale: i18n.current })}
				</Button>
			</div>
		</section>
	</Reveal>

	<section class="py-4 space-y-8">
		<Reveal delay={200}>
			<div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<div class="space-y-2">
					<h2 class="text-3xl font-black tracking-tighter sm:text-5xl uppercase">
						{m.featured_projects_title({}, { locale: i18n.current })}
					</h2>
					<p class="max-w-2xl text-muted-foreground">
						{m.featured_projects_subtitle({}, { locale: i18n.current })}
					</p>
				</div>
				<Button href="/project" variant="outline" class="w-fit font-bold">
					{m.featured_projects_view_all({}, { locale: i18n.current })}
					<ArrowRight />
				</Button>
			</div>
		</Reveal>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each featuredProjects as project, i (project.slug)}
				<Reveal delay={250 + i * 75} y={20} class="h-full">
					<article class="flex h-full flex-col overflow-hidden border border-primary/10 bg-card">
						<img src={project.image} alt={project.name} class="aspect-video w-full object-cover" />
						<div class="flex grow flex-col space-y-4 p-5">
							<div class="space-y-2">
								<h3 class="text-xl font-black tracking-tight">{project.name}</h3>
								<p class="text-sm leading-relaxed text-muted-foreground">
									{@html (m as unknown as Record<string, MessageFunction>)[project.descKey](
										{},
										{ locale: i18n.current }
									)}
								</p>
							</div>
							<div class="flex flex-wrap gap-1.5">
								{#each project.tags.slice(0, 3) as tag}
									<Badge variant="secondary" class="text-[9px] font-black uppercase">
										{tag}
									</Badge>
								{/each}
							</div>
							<Button href="/project/{project.slug}" class="mt-auto w-full font-bold">
								{m.project_case_study_btn({}, { locale: i18n.current })}
								<ArrowRight />
							</Button>
						</div>
					</article>
				</Reveal>
			{/each}
		</div>
	</section>

	<section class="py-12 space-y-8">
		<Reveal delay={200}>
			<div class="text-center space-y-2">
				<h2 class="text-3xl font-black tracking-tighter sm:text-5xl uppercase">
					{m.section_technology()}
				</h2>
				<p class="text-muted-foreground font-bold uppercase tracking-widest text-xs">
					{m.section_tech_subtitle()}
				</p>
			</div>
		</Reveal>

		<BentoGrid>
			{#each technologySkills as skill, i}
				<Reveal delay={200 + i * 100} y={20} class={cn('h-full', skill.span)}>
					<BentoCard
						title={skill.title}
						description={skill.description()}
						value={skill.value}
						icon={skill.icon}
						class={skill.className}
					/>
				</Reveal>
			{/each}
		</BentoGrid>
	</section>

	<section class="py-12 space-y-8">
		<Reveal delay={300}>
			<div class="text-center space-y-2">
				<h2 class="text-3xl font-black tracking-tighter sm:text-5xl uppercase">
					{m.section_tools()}
				</h2>
				<p class="text-muted-foreground font-bold uppercase tracking-widest text-xs">
					{m.section_tools_subtitle()}
				</p>
			</div>
		</Reveal>

		<BentoGrid class="auto-rows-[10rem]">
			{#each toolSkills as skill, i}
				<Reveal delay={300 + i * 100} y={20} class={cn('h-full', skill.span)}>
					<BentoCard
						title={skill.title}
						description={skill.description()}
						value={skill.value}
						icon={skill.icon}
						class={skill.className}
					/>
				</Reveal>
			{/each}
		</BentoGrid>
	</section>
</div>
