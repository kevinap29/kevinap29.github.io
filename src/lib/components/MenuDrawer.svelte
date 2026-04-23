<script lang="ts">
	import { page } from '$app/state';
	import { Button } from "$lib/components/ui/button";
	import type { NavUrl } from '$routes/types';

	let { urls, onclick } = $props<{
		urls: NavUrl[];
		onclick?: () => void;
	}>();
</script>

<nav class="flex flex-col gap-4 p-8 items-center">
	{#each urls as url}
		<Button 
			variant={page.url.href === url.url ? "secondary" : "ghost"} 
			href={url.url}
			class="w-full text-lg justify-start gap-4 px-6"
			onclick={onclick}
		>
			{#if url.icon}
				<url.icon class="size-6" />
			{/if}
			{url.title}
		</Button>
	{/each}
</nav>
