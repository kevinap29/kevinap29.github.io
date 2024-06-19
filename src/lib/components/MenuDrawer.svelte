<script lang="ts">
	import { page } from '$app/stores';

	const urls = [
		{ url: `${$page.url.origin}/`, title: 'Beranda' },
		{ url: `${$page.url.origin}/about/`, title: 'Tentang Saya' }
		// { url: `${$page.url.origin}/project/`, title: 'Projek' },
	];
</script>

<nav class="grid grid-rows-1 p-8 text-center space-y-4">
	{#each urls as url}
		<a
			href={url.url}
			class="p-2 hover:variant-glass-primary {$page.url.href === url.url
				? 'variant-filled-primary'
				: 'anchor'}"
			on:click>{url.title}</a
		>
	{/each}
</nav>
