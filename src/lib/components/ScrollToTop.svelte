<script lang="ts">
	import { fly } from 'svelte/transition';
	import { ArrowUp } from '@lucide/svelte';
	import { cn } from '$lib/utils';
	import { Button } from "$lib/components/ui/button";

	/**
	 * Props for the ScrollToTop component.
	 */
	interface ScrollToTopProps {
		/**
		 * The scroll threshold in pixels before the button becomes visible.
		 * @default 300
		 */
		threshold?: number;
		/**
		 * Additional CSS classes to apply to the button container.
		 */
		class?: string;
	}

	let { 
		threshold = 300, 
		class: className 
	}: ScrollToTopProps = $props();

	let scrollY = $state(0);

	/**
	 * Visibility is derived from the current scroll position.
	 * This ensures the UI stays in sync with the underlying state automatically.
	 */
	let isVisible = $derived(scrollY > threshold);

	/**
	 * Scrolls the window to the top with a smooth behavior.
	 */
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	$effect(() => {
		const updateScroll = () => {
			scrollY = window.scrollY;
		};

		// Initial sync
		updateScroll();
		
		window.addEventListener('scroll', updateScroll, { passive: true });
		return () => window.removeEventListener('scroll', updateScroll);
	});
</script>

{#if isVisible}
	<div 
		class={cn("fixed bottom-8 right-8 z-50", className)}
		transition:fly={{ y: 20, duration: 400 }}
	>
		<Button
			variant="outline"
			size="icon"
			onclick={scrollToTop}
			class={cn(
				"size-12 shadow-2xl transition-all duration-300",
				"bg-background/80 backdrop-blur-md border border-primary/20 text-primary",
				"hover:bg-primary hover:text-primary-foreground hover:scale-110 active:scale-95 hover:shadow-primary/30",
				"rounded-none"
			)}
			aria-label="Scroll to top"
		>
			<ArrowUp class="size-6" />
		</Button>
	</div>
{/if}
