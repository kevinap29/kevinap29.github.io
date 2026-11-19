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
	}: {
		title?: string;
		description?: string;
		image?: string;
		keywords?: string;
		websiteName?: string;
		type?: string;
	} = $props();

	const SITE_URL = 'https://kevinap29.github.io';
	const normalizedBase = $derived(base.startsWith('/') ? base : '');
	const fullTitle = $derived(title ? `${title} | ${websiteName}` : websiteName);
	const imageUrl = $derived(
		image
			? image.startsWith('http')
				? image
				: `${SITE_URL}${normalizedBase}${image.startsWith('/') ? image : `/${image}`}`
			: null
	);
	const canonicalUrl = $derived(`${SITE_URL}${page.url.pathname}`);
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

	<!-- Canonical -->
	<link rel="canonical" href={canonicalUrl} />

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
