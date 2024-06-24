<script lang="ts">
	import { page } from '$app/stores';
	import type { NavUrl } from '$routes/types';

	export let urls: NavUrl[]
	
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
