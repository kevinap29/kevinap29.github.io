<script lang="ts">
	import Reveal from '$lib/components/Reveal.svelte';

	let { 
		title, 
		description, 
		delay = 250 
	} = $props<{ 
		title: string; 
		description: string; 
		delay?: number 
	}>();
</script>

<Reveal {delay} y={40}>
	<section class="text-center space-y-4">
		<h1 class="text-4xl font-black tracking-tighter lg:text-6xl uppercase italic">
			{title}
		</h1>
		{#if description}
			<p class="text-xl text-muted-foreground font-medium max-w-2xl mx-auto italic">
				"{description}"
			</p>
		{/if}
	</section>
</Reveal>
