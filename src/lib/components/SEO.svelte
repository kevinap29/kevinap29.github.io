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
</script>

<svelte:head>
	<title>{fullTitle}</title>
	{#if description}
		<meta name="description" content={description} />
		<meta property="og:description" content={description} />
	{/if}
	{#if keywords}
		<meta name="keywords" content={keywords} />
	{/if}
	<meta property="og:title" content={fullTitle} />
	{#if imageUrl}
		<meta property="og:image" content={imageUrl} />
	{/if}
	<meta property="og:url" content={page.url.href} />
	<meta property="og:type" content={type} />
</svelte:head>
