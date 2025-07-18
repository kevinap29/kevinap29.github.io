<script lang="ts">
	import { page } from '$app/stores';
	import { LightSwitch,popup,type PopupSettings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';

	import type { NavUrl } from '$routes/types';

	export let urls: NavUrl[];

	const dispatch = createEventDispatcher();

	const popUpDownloadResume : PopupSettings = {
		event: 'hover',
		target: 'popupHoverDownloadResume',
		placement: 'bottom'
	};
</script>

<div
	class="flex justify-between items-center variant-glass-surface h-12 border-b border-surface-400-500-token mx-auto px-4"
>
	<button
		type="button"
		class="lg:hidden btn variant-glass-surface"
		on:click={() => dispatch('menu')}
	>
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
	<button
		type="button"
		class="lg:hidden btn variant-glass-surface"
		on:click={() => dispatch('profile')}
	>
		<svg
			class="w-6 h-6 text-gray-800 dark:text-white"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				fill-rule="evenodd"
				d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>
	<div class="hidden lg:block">
		<nav class="flex justify-between items-center gap-5 overflow-x-auto overflow-y-hidden">
			{#each urls as url}
				<a
					href={url.url}
					class="p-2 hover:variant-glass-primary {$page.url.href === url.url
						? 'variant-filled-primary'
						: 'anchor'}"
					on:click>{url.title}</a
				>
			{/each}
		</nav>
	</div>
	<div class="flex justify-between items-center space-x-8">
		<div class="flex justify-between items-center space-x-8">
			<a href="{$page.url.origin}/portofolio_kevin_agustiansyah.pdf" class="btn variant-glass-surface " target="_blank"
				use:popup={popUpDownloadResume}
			>
				<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M14 2H6C5.44772 2 5 2.44772 5 3V21C5 21.5523 5.44772 22 6 22H18C18.5523 22 19 21.5523 19 21V8L14 2Z" stroke="currentColor" stroke-width="2"/>
					<path d="M14 2V8H19" stroke="currentColor" stroke-width="2"/>
					<path d="M12 13V17M12 17L10 15M12 17L14 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</a>
			<div class="card p-4 bg-surface-100-800-token z-50" data-popup="popupHoverDownloadResume">
				<p>Download Resume</p>
			</div>
		</div>
		<div class="flex justify-between items-center space-x-8">
			<LightSwitch />
		</div>
	</div>
</div>
