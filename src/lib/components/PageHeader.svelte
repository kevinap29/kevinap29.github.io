<script lang="ts">
	import { page } from '$app/stores'
	import { LightSwitch } from '@skeletonlabs/skeleton';

	const urls = {
		home: `${$page.url.origin}/`,
		about: `${$page.url.origin}/about/`
	}
</script>

<div class="flex justify-between items-center variant-glass-surface h-12 border-b border-surface-400-500-token mx-auto px-4">
	<button type="button" class="lg:hidden btn variant-glass-surface" on:click>
		<svg
			class="w-6 h-6 text-gray-800 dark:text-white"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-width="2"
				d="M5 7h14M5 12h14M5 17h14"
			/>
		</svg>
	</button>
	<nav class="flex justify-between items-center gap-5 overflow-x-auto overflow-y-hidden">
		<a href={urls.home} class="p-2 hover:variant-filled-primary {$page.url.href === urls.home ? 'variant-filled-primary' : 'anchor'}">Beranda</a>
		<a href={urls.about} class="p-2 hover:variant-filled-primary {$page.url.href === urls.about ? 'variant-filled-primary' : 'anchor'}">Tentang Saya</a>
	</nav>
	<div class="flex justify-between items-center space-x-8">
		<LightSwitch />
	</div>
</div>

<!-- <div class="card p-4 w-72 shadow-xl" data-popup="popupTheme">
    <ListBox>
        {#each listTheme as theme}
            <ListBoxItem bind:group={appTheme} name={`${theme.icon} ${theme.name}`} value={theme.value}>{`${theme.icon} ${theme.name}`}</ListBoxItem>
        {/each}
    </ListBox>
</div> -->
