<script lang="ts">
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages';
	import { i18n } from '$lib/i18n.svelte';

	let { data } = $props();
	let websiteName = $derived(data.websiteName);
	let imageLocation = $derived(data.imageLocation);
</script>

<svelte:head>
	<title>{m.nav_about({}, { locale: i18n.current })} | {websiteName}</title>
	<meta name="description" content={m.about_intro({}, { locale: i18n.current })} />
	<meta name="keywords" content={'Kevin,Agustiansyah,Putra,Story,Experience'} />
	<meta property="og:title" content={`${m.nav_about({}, { locale: i18n.current })} | ${websiteName}`} />
	<meta property="og:description" content={m.about_intro({}, { locale: i18n.current })} />
	<meta property="og:image" content={imageLocation} />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:type" content="website" />
</svelte:head>

<div class="max-w-4xl mx-auto space-y-12 py-8">
	<section class="text-center space-y-4">
		<h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl">{m.about_title({}, { locale: i18n.current })}</h1>
		<p class="text-xl text-muted-foreground">{m.about_intro({}, { locale: i18n.current })}</p>
	</section>

	<div class="grid gap-8">
		<section class="space-y-4">
			<h2 class="text-3xl font-bold tracking-tight border-b pb-2">{m.about_start_title({}, { locale: i18n.current })}</h2>
			<p class="leading-7 not-first:mt-6">
				{@html m.about_start_content({}, { locale: i18n.current })}
			</p>
		</section>

		<section class="space-y-4">
			<h2 class="text-3xl font-bold tracking-tight border-b pb-2">{m.about_college_title({}, { locale: i18n.current })}</h2>
			<p class="leading-7 not-first:mt-6">
				{@html m.about_college_content({}, { locale: i18n.current })}
			</p>
		</section>

		<section class="space-y-4">
			<h2 class="text-3xl font-bold tracking-tight border-b pb-2">{m.about_work_title({}, { locale: i18n.current })}</h2>
			<div class="space-y-6">
				<div class="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
					<p class="leading-7">
						{@html m.about_work_p1({}, { locale: i18n.current })}
					</p>
				</div>
				
				<div class="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
					<p class="leading-7">
						{@html m.about_work_p2({}, { locale: i18n.current })}
					</p>
				</div>

				<div class="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
					<p class="leading-7">
						{@html m.about_work_p3({}, { locale: i18n.current })}
					</p>
				</div>
			</div>
		</section>
	</div>
</div>
