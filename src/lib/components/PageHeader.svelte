<script lang="ts">
	import { page } from '$app/state';
	import { toggleMode } from "mode-watcher";
	import { Button } from "$lib/components/ui/button";
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	
	import type { NavUrl } from '$lib/types/nav';

	interface Props {
		urls: NavUrl[];
		onmenu?: () => void;
		onprofile?: () => void;
	}

	let { urls, onmenu, onprofile }: Props = $props();

</script>

<div class="flex justify-between items-center bg-background text-foreground h-16 px-4 sticky top-0 z-40 border-b">
	<div class="flex items-center gap-2">
		<Button variant="ghost" size="icon" class="lg:hidden" onclick={onmenu} aria-label="Menu">
			<svg class="size-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
				<path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"/>
			</svg>
		</Button>
		<Button variant="ghost" size="icon" class="lg:hidden" onclick={onprofile} aria-label="Profile">
			<svg class="size-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
				<path fill-rule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clip-rule="evenodd"/>
			</svg>
		</Button>
	</div>

	<div class="hidden lg:block">
		<nav class="flex items-center gap-2">
			{#each urls as url}
				<Button 
					variant={page.url.href === url.url ? "secondary" : "ghost"} 
					class={page.url.href === url.url ? "" : "text-foreground/80 hover:text-foreground"}
					href={url.url}
				>
					{#if url.icon}
						<url.icon class="mr-2 size-4" />
					{/if}
					{url.title}
				</Button>
			{/each}
		</nav>
	</div>

	<div class="flex items-center gap-2">
		<LanguageSwitcher />
		<Button variant="ghost" size="icon" onclick={toggleMode} aria-label="Toggle Theme">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">
				<circle cx="12" cy="12" r="4" />
				<path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M22 12h2" /><path d="m4.93 19.07 1.41-1.41" /><path d="m17.66 6.34 1.41-1.41" />
			</svg>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100">
				<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
			</svg>
		</Button>
	</div>
</div>

