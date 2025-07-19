<script lang="ts">
    import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { supabase } from '$lib/data/supabase';
	import { browser } from '$app/environment';

	let count: number | null = null;
	let error: string | null = null;

    export let link: string;

	async function fetchPageCount() {
		if (!browser) return;

		const { data, error: err } = await supabase
			.from('page_counter')
			.select('count')
			.eq('url', link)
			.maybeSingle();

		if (err) {
			console.error('Failed to fetch page count:', err);
			error = err.message;
			return;
		}

		count = data?.count ?? 0;
	}

	onMount(async () => {
		await fetchPageCount();
	});

    beforeNavigate(async () => {
		await fetchPageCount();
	});

	afterNavigate(async () => {
		await fetchPageCount();
	});
</script>

<div class="flex justify-evenly items-top hover:cursor-default">
    <slot />
    <span class="badge-icon variant-filled-surface">{count}</span>
</div>