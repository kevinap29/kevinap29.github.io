<script lang="ts">
	import { fade } from 'svelte/transition';

	let progress = $state(0);

	function handleScroll() {
		const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

		if (height === 0) {
			progress = 0;
			return;
		}

		const scrolled = (winScroll / height) * 100;
		progress = Math.min(100, Math.max(0, scrolled));
	}
</script>

<svelte:window onscroll={handleScroll} />

{#if progress > 0}
	<div
		class="fixed top-0 left-0 right-0 z-50 h-1 bg-primary/10 pointer-events-none"
		transition:fade={{ duration: 200 }}
	>
		<div
			class="h-full bg-primary transition-all duration-150 ease-out shadow-[0_0_10px_rgba(var(--primary),0.5)]"
			style="width: {progress}%"
		></div>
	</div>
{/if}
