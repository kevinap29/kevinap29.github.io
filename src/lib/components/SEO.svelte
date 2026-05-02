<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';

	let {
		title,
		description,
		image,
		keywords,
		websiteName = 'Kevin Agustiansyah',
		type = 'website'
	} = $props<{
		title?: string;
		description?: string;
		image?: string;
		keywords?: string;
		websiteName?: string;
		type?: string;
	}>();

	const fullTitle = $derived(title ? `${title} | ${websiteName}` : websiteName);
	const imageUrl = $derived(image ? (image.startsWith('http') ? image : `${base}${image}`) : null);
	const canonicalUrl = $derived(page.url.href);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	{#if description}
		<meta name="description" content={description} />
		<meta property="og:description" content={description} />
		<meta name="twitter:description" content={description} />
	{/if}
	{#if keywords}
		<meta name="keywords" content={keywords} />
	{/if}

	<!-- Canonical & Hreflang -->
	<link rel="canonical" href={canonicalUrl} />
	<link rel="alternate" hreflang="en" href={canonicalUrl.replace('/id/', '/').replace('/id', '')} />
	<link rel="alternate" hreflang="id" href={canonicalUrl.includes('/id') ? canonicalUrl : canonicalUrl.replace(page.url.origin + base, page.url.origin + base + '/id')} />
	<link rel="alternate" hreflang="x-default" href={canonicalUrl.replace('/id/', '/').replace('/id', '')} />

	<!-- Open Graph -->
	<meta property="og:title" content={fullTitle} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content={type} />
	{#if imageUrl}
		<meta property="og:image" content={imageUrl} />
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	{#if imageUrl}
		<meta name="twitter:image" content={imageUrl} />
	{/if}
</svelte:head>
