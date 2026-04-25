<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { i18n } from '$lib/i18n.svelte';
	import Reveal from '$lib/components/Reveal.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import TimelineItem from '$lib/components/TimelineItem.svelte';
	import { GitHub } from '$lib/components/icons';

	let { data } = $props();
	let journalsInfo = $derived(data.journalsInfo);
	let localizedJournals = $derived(data.localizedJournals[i18n.current] || []);
	let websiteName = $derived(data.websiteName);
	let imageLocation = $derived(data.imageLocation);

	function getJournalContent(slug: string) {
		const match = localizedJournals.find(j => j.slug === slug);
		return match ? match.html : '<p>Content missing.</p>';
	}

	function getTitle(slug: string) {
		const match = localizedJournals.find(j => j.slug === slug);
		return match?.metadata?.title || slug;
	}
</script>

<SEO 
	title={m.nav_journal({}, { locale: i18n.current })} 
	description={m.journal_intro({}, { locale: i18n.current })}
	image={imageLocation}
	{websiteName}
/>

<div class="max-w-4xl mx-auto px-4 py-8 space-y-12">
	<PageHero 
		title={m.journal_title({}, { locale: i18n.current })} 
		description={m.journal_intro({}, { locale: i18n.current })} 
	/>

	<section class="relative">
		{#if journalsInfo.length === 0}
			<Reveal delay={500} y={20}>
				<div class="text-center py-20 text-muted-foreground bg-muted/20 border border-dashed p-8 rounded-none">
					<GitHub class="size-12 mx-auto mb-4 opacity-20" />
					<p class="font-bold">{m.journal_empty({}, { locale: i18n.current })}</p>
				</div>
			</Reveal>
		{:else}
			<!-- Vertical Line -->
			<div class="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border"></div>

			<div class="space-y-12 relative">
				{#each journalsInfo as journal, i}
					<TimelineItem 
						{journal} 
						index={i} 
						title={getTitle(journal.slug)} 
						htmlContent={getJournalContent(journal.slug)} 
					/>
				{/each}
			</div>
		{/if}
	</section>
</div>
