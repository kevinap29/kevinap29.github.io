<script lang="ts">
    import type { PageServerData } from './$types'

	import { page } from '$app/stores'

    export let data: PageServerData

    $: ({ websiteName, imageLocation } = data)
</script>

<svelte:head>
    <title>Project | {websiteName}</title>
	<meta name="description" content={`Projek-projek ${websiteName}`}>
    <meta name="keywords" content={''}>
    <meta property="og:title" content={`Project | ${websiteName}`} />
    <meta property="og:description" content="Website Portofolio Kevin Agustiansyah Putra" />
    <meta property="og:image" content={imageLocation} />
    <meta property="og:url" content={$page.url.href} />
    <meta property="og:type" content="website" />
</svelte:head>