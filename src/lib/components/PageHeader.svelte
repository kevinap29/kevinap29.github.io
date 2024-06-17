<script lang="ts">
	import { base } from '$app/paths'
	import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<div class="flex justify-between items-center variant-glass-surface h-12 border-b border-surface-400-500-token mx-auto px-4">
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
	<div class="flex justify-between items-center gap-5">
		<a href={base} class="anchor">Beranda</a>
		<a href={`${base}/about`} class="anchor">Tentang Saya</a>
	</div>
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
