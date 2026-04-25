<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { i18n } from '$lib/i18n.svelte';

	import Reveal from '$lib/components/Reveal.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import { Bot, BookOpen, GraduationCap, Briefcase } from '@lucide/svelte';
	
	let { data } = $props();
	let websiteName = $derived(data.websiteName);
	let imageLocation = $derived(data.imageLocation);
</script>

<SEO 
	title={m.nav_about({}, { locale: i18n.current })} 
	description={m.about_intro({}, { locale: i18n.current })}
	keywords="Kevin,Agustiansyah,Putra,Story,Experience,AI,Collaboration"
	image={imageLocation}
	{websiteName}
/>

<div class="max-w-4xl mx-auto space-y-12 py-12 px-4">
	<PageHero 
		title={m.about_title({}, { locale: i18n.current })} 
		description={m.about_intro({}, { locale: i18n.current })} 
	/>

	<div class="grid gap-8">
		<!-- AI Section -->
		<Reveal delay={400} y={20}>
			<section class="p-8 border-2 border-primary/20 bg-primary/5 relative overflow-hidden group">
				<div class="absolute -right-4 -top-4 size-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500"></div>
				<div class="relative space-y-6">
					<div class="flex items-center gap-4 border-b border-primary/10 pb-4">
						<Bot class="size-8 text-primary" />
						<h2 class="text-2xl font-black uppercase tracking-tighter">{m.about_ai_title({}, { locale: i18n.current })}</h2>
					</div>
					<p class="text-lg leading-relaxed font-bold text-foreground/90 italic">
						"{m.about_ai_content({}, { locale: i18n.current })}"
					</p>
				</div>
			</section>
		</Reveal>

		<!-- The Beginning -->
		<Reveal delay={600} y={20}>
			<section class="p-8 border bg-card text-card-foreground shadow-sm space-y-6 relative group overflow-hidden">
				<div class="absolute -right-4 -top-4 size-24 bg-muted/50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
				<div class="flex items-center gap-4 border-b pb-4">
					<BookOpen class="size-6 text-primary" />
					<h2 class="text-2xl font-black uppercase tracking-tighter">{m.about_start_title({}, { locale: i18n.current }).replace('# ', '')}</h2>
				</div>
				<div class="prose prose-stone dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:text-muted-foreground">
					<p>
						{@html m.about_start_content({}, { locale: i18n.current })}
					</p>
				</div>
			</section>
		</Reveal>

		<!-- College -->
		<Reveal delay={800} y={20}>
			<section class="p-8 border bg-card text-card-foreground shadow-sm space-y-6 relative group overflow-hidden">
				<div class="absolute -right-4 -top-4 size-24 bg-muted/50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
				<div class="flex items-center gap-4 border-b pb-4">
					<GraduationCap class="size-6 text-primary" />
					<h2 class="text-2xl font-black uppercase tracking-tighter">{m.about_college_title({}, { locale: i18n.current }).replace('# ', '')}</h2>
				</div>
				<div class="prose prose-stone dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:text-muted-foreground">
					<p>
						{@html m.about_college_content({}, { locale: i18n.current })}
					</p>
				</div>
			</section>
		</Reveal>

		<!-- Work Experience -->
		<Reveal delay={1000} y={20}>
			<section class="p-8 border bg-card text-card-foreground shadow-sm space-y-6 relative group overflow-hidden">
				<div class="absolute -right-4 -top-4 size-24 bg-muted/50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
				<div class="flex items-center gap-4 border-b pb-4">
					<Briefcase class="size-6 text-primary" />
					<h2 class="text-2xl font-black uppercase tracking-tighter">{m.about_work_title({}, { locale: i18n.current }).replace('# ', '')}</h2>
				</div>
				<div class="space-y-8 prose prose-stone dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:text-muted-foreground">
					<div class="relative pl-6 border-l-2 border-primary/20 space-y-2">
						<div class="absolute -left-[9px] top-1 size-4 bg-primary border-4 border-background"></div>
						<p>
							{@html m.about_work_p1({}, { locale: i18n.current })}
						</p>
					</div>
					
					<div class="relative pl-6 border-l-2 border-primary/20 space-y-2">
						<div class="absolute -left-[9px] top-1 size-4 bg-primary border-4 border-background"></div>
						<p>
							{@html m.about_work_p2({}, { locale: i18n.current })}
						</p>
					</div>

					<div class="relative pl-6 border-l-2 border-primary/20 space-y-2">
						<div class="absolute -left-[9px] top-1 size-4 bg-primary border-4 border-background"></div>
						<p>
							{@html m.about_work_p3({}, { locale: i18n.current })}
						</p>
					</div>
				</div>
			</section>
		</Reveal>
	</div>
</div>
