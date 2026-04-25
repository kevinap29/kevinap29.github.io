<script lang="ts">
	import { type Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		delay?: number;
		duration?: number;
		y?: number;
		x?: number;
		threshold?: number;
		once?: boolean;
		class?: string;
	}

	let {
		children,
		delay = 0,
		duration = 1000,
		y = 20,
		x = 0,
		threshold = 0.1,
		once = true,
		class: className = ''
	}: Props = $props();

	let visible = $state(false);
	let element = $state<HTMLElement>();

	$effect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					visible = true;
					if (once) observer.disconnect();
				} else if (!once) {
					visible = false;
				}
			},
			{ threshold }
		);

		if (element) observer.observe(element);
		return () => observer.disconnect();
	});

	const transformStyle = $derived(
		visible ? 'translate(0, 0) scale(1)' : `translate(${x}px, ${y}px) scale(0.98)`
	);
</script>

<div
	bind:this={element}
	class="transition-all ease-[cubic-bezier(0.16,1,0.3,1)] {className}"
	style:opacity={visible ? 1 : 0}
	style:transform={transformStyle}
	style:transition-duration="{duration}ms"
	style:transition-delay="{delay}ms"
>
	{@render children()}
</div>
