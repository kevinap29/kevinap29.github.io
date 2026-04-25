<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	let {
		class: className,
		children
	}: {
		class?: string;
		children: Snippet;
	} = $props();
</script>

<div
	class={cn('grid auto-rows-[12rem] grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6', className)}
>
	{@render children()}
</div>
