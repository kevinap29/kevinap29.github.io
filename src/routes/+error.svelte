<script lang="ts">
	import { page } from '$app/state';
	import * as Card from "$lib/components/ui/card";
	import { Button } from '$lib/components/ui/button';
	import { House, RotateCcw } from '@lucide/svelte';
	import Reveal from '$lib/components/Reveal.svelte';

	const status = $derived(page.status);
	const message = $derived(page.error?.message || 'Something went wrong');
</script>

<div class="max-w-3xl mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[70vh]">
	<Reveal delay={250} y={40} class="w-full">
		<Card.Root class="rounded-none border-primary/10 shadow-2xl shadow-primary/5 overflow-hidden w-full text-center p-8 sm:p-16 relative">
			<!-- Background Glow -->
			<div class="absolute -right-20 -top-20 size-64 rounded-none bg-primary/5 blur-3xl pointer-events-none"></div>
			<div class="absolute -left-20 -bottom-20 size-64 rounded-none bg-primary/5 blur-3xl pointer-events-none"></div>

			<div class="relative z-10">
				<!-- Giant background number with overlay text -->
				<div class="relative mb-8 flex items-center justify-center min-h-[150px]">
					<h1 class="absolute inset-0 flex items-center justify-center text-[10rem] sm:text-[14rem] font-black tracking-tighter text-muted-foreground/5 select-none leading-none z-0">
						{status}
					</h1>
					<h2 class="relative z-10 text-3xl sm:text-5xl font-black uppercase tracking-tight text-foreground bg-background/50 backdrop-blur-sm px-6 py-2 border-y border-primary/10">
						{status === 404 ? 'Page Not Found' : 'An Error Occurred'}
					</h2>
				</div>

				<p class="text-muted-foreground text-base sm:text-lg max-w-md mx-auto mb-10 font-medium">
					{status === 404 
						? "The page you're looking for doesn't exist or has been moved." 
						: message}
				</p>

				<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
					<Button href="/" class="rounded-none h-12 px-8 font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all w-full sm:w-auto">
						<House class="mr-2 size-4" />
						Back to Home
					</Button>
					<Button 
						variant="outline" 
						class="rounded-none h-12 px-8 font-black uppercase tracking-widest text-xs border-primary/20 hover:bg-primary/5 transition-all w-full sm:w-auto"
						onclick={() => window.location.reload()}
					>
						<RotateCcw class="mr-2 size-4" />
						Try Again
					</Button>
				</div>
			</div>
		</Card.Root>
	</Reveal>
</div>
