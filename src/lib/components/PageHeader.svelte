<script lang="ts">
	import {
		// ListBox,
		// ListBoxItem,
		// popup,
		type PopupSettings,
		LightSwitch,
		setInitialClassState
	} from '@skeletonlabs/skeleton';
	// import { CaretDownOutline } from 'flowbite-svelte-icons';

	// import type { SkeletonTheme } from '$lib/@types';

	// export let listTheme: SkeletonTheme[], appTheme: string;

	const popupTheme: PopupSettings = {
		// Represents the type of event that opens/closed the popup
		event: 'click',
		// Matches the data-popup value on your popup element
		target: 'popupTheme',
		// Defines which side of your trigger the popup will appear
		placement: 'bottom'
	};
</script>

<svelte:head>{@html `<script>(${setInitialClassState.toString()})();</script>`}</svelte:head>

<div
	class="flex justify-between items-center variant-glass-surface h-12 border-b border-surface-400-500-token mx-auto px-4"
>
	<!-- <button class="btn variant-glass-surface" use:popup={popupTheme}>
        Theme
        <CaretDownOutline />
    </button> -->
	<button class="btn variant-glass-surface">
        sidebar
    </button>
	<LightSwitch />
</div>

<!-- <div class="card p-4 w-72 shadow-xl" data-popup="popupTheme">
    <ListBox>
        {#each listTheme as theme}
            <ListBoxItem bind:group={appTheme} name={`${theme.icon} ${theme.name}`} value={theme.value}>{`${theme.icon} ${theme.name}`}</ListBoxItem>
        {/each}
    </ListBox>
</div> -->
