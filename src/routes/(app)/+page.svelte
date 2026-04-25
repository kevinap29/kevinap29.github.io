<script lang="ts">
	import { cn } from "$lib/utils";
	import { m } from '$lib/paraglide/messages';
	import { i18n } from '$lib/i18n.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import BentoGrid from '$lib/components/BentoGrid.svelte';
	import BentoCard from '$lib/components/BentoCard.svelte';
	import Reveal from '$lib/components/Reveal.svelte';
	import { technologySkills, toolSkills } from '$lib/data/store/skills-store.svelte';
	
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
	<Reveal delay={250} y={40}>
		<section class="text-center space-y-6">
			<div class="space-y-2">
				<h2 class="text-lg font-medium text-primary tracking-wide uppercase">{m.hello_name({}, { locale: i18n.current })}</h2>
				<h1 class="text-4xl font-extrabold tracking-tight lg:text-6xl">
					Kevin Agustiansyah Putra
				</h1>
			</div>
			<p class="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
				{m.hero_description({}, { locale: i18n.current })} <br />
				<span class="font-bold text-foreground">{m.hero_tools({}, { locale: i18n.current })}</span>
				{m.hero_tools_suffix({}, { locale: i18n.current })}
			</p>
		</section>
	</Reveal>

	<section class="py-12 space-y-8">
		<Reveal delay={500}>
			<div class="text-center space-y-2">
				<h2 class="text-3xl font-black tracking-tighter sm:text-5xl uppercase">{m.section_technology()}</h2>
				<p class="text-muted-foreground font-bold uppercase tracking-widest text-xs">{m.section_tech_subtitle()}</p>
			</div>
		</Reveal>

		<BentoGrid>
			{#each technologySkills as skill, i}
				<Reveal delay={500 + (i * 100)} y={20} class={cn("h-full", skill.span)}>
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
		<Reveal delay={750}>
			<div class="text-center space-y-2">
				<h2 class="text-3xl font-black tracking-tighter sm:text-5xl uppercase">{m.section_tools()}</h2>
				<p class="text-muted-foreground font-bold uppercase tracking-widest text-xs">{m.section_tools_subtitle()}</p>
			</div>
		</Reveal>

		<BentoGrid class="auto-rows-[10rem]">
			{#each toolSkills as skill, i}
				<Reveal delay={750 + (i * 100)} y={20} class={cn("h-full", skill.span)}>
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
