<script lang="ts">
	import { page } from '$app/state';
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import { Menu, User, Sun, Moon } from '@lucide/svelte';

	import type { NavUrl } from '$lib/types/nav';

	interface Props {
		urls: NavUrl[];
		onmenu?: () => void;
		onprofile?: () => void;
	}

	let { urls, onmenu, onprofile }: Props = $props();
</script>

<div
	class="flex justify-between items-center bg-background text-foreground h-16 px-4 sticky top-0 z-40 border-b"
>
	<div class="flex items-center gap-2">
		<Button variant="ghost" size="icon" class="lg:hidden" onclick={onmenu} aria-label="Menu">
			<Menu class="size-6" />
		</Button>
		<Button variant="ghost" size="icon" class="lg:hidden" onclick={onprofile} aria-label="Profile">
			<User class="size-6" />
		</Button>
	</div>

	<div class="hidden lg:block">
		<nav class="flex items-center gap-2">
			{#each urls as url}
				<Button
					variant={page.url.pathname === url.url ? 'secondary' : 'ghost'}
					class={page.url.pathname === url.url ? '' : 'text-foreground/80 hover:text-foreground'}
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
			<Sun class="size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon class="absolute size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
		</Button>
	</div>
</div>
