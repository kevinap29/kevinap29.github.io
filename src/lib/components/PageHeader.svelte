<script lang="ts">
	import {
		// ListBox,
		// ListBoxItem,
		// popup,
		// type PopupSettings,
		LightSwitch
	} from '@skeletonlabs/skeleton';

	// import type { SkeletonTheme } from '$lib/@types';

	// export let listTheme: SkeletonTheme[], appTheme: string;

	// const popupTheme: PopupSettings = {
	// 	// Represents the type of event that opens/closed the popup
	// 	event: 'click',
	// 	// Matches the data-popup value on your popup element
	// 	target: 'popupTheme',
	// 	// Defines which side of your trigger the popup will appear
	// 	placement: 'bottom'
	// };
</script>

<div
	class="flex justify-between items-center variant-glass-surface h-12 border-b border-surface-400-500-token mx-auto px-4"
>
	<!-- <button class="btn variant-glass-surface" use:popup={popupTheme}>
        Theme
        <CaretDownOutline />
    </button> -->
	<button type="button" class="btn variant-glass-surface">
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
	<div class="flex justify-between items-center space-x-8">
		<button type="button" class="btn variant-glass-surface" on:click={async () => {
			const getLocalTranslate = localStorage.getItem('translate')

			try {
				if (!getLocalTranslate) throw Error()

				if (getLocalTranslate === 'id') {
					localStorage.setItem('translate', 'en')
				} else {
					localStorage.setItem('translate', 'id')
				}
			} catch (e) {
				console.table(e)
			}
		}}>
			<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 19 3.5-9 3.5 9m-6.125-2h5.25M3 7h7m0 0h2m-2 0c0 1.63-.793 3.926-2.239 5.655M7.5 6.818V5m.261 7.655C6.79 13.82 5.521 14.725 4 15m3.761-2.345L5 10m2.761 2.655L10.2 15"/>
			</svg>
		</button>
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
