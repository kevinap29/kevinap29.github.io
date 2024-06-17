<script lang="ts">
	import { AppShell, initializeStores, Drawer, getDrawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';

	import SideBar from '$lib/components/SideBar.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageFooter from '$lib/components/PageFooter.svelte';

	initializeStores();

	const drawerStore = getDrawerStore();
	const drawerSidebarSetting: DrawerSettings = {
		id: 'sidebar',
		width: 'w-full',
		bgDrawer: 'variant-glass-surface'
	}

	async function handleSidebarOpenClick() {
		drawerStore.open(drawerSidebarSetting)
	}

	async function handleSidebarCloseClick() {
		drawerStore.close();
	}
</script>

<Drawer>
	{#if $drawerStore.id === 'sidebar'}
		<div class="flex justify-end">
			<button type="button" class="btn text-error-100-800-token text-xl" on:click={async () => handleSidebarCloseClick()}>
				<svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
				</svg>			  
			</button>
		</div>
		<SideBar />
	{/if}
</Drawer>

<AppShell>
	<!-- (header) -->
	<svelte:fragment slot="sidebarLeft">
		<div class="w-0 lg:w-80 min-h-full variant-glass-surface border-r border-surface-400-500-token">
			<SideBar />
		</div>
	</svelte:fragment>
	<!-- (sidebarRight) -->
	<svelte:fragment slot="pageHeader">
		<PageHeader on:click={async () => await handleSidebarOpenClick()}/>
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">
		<PageFooter />
	</svelte:fragment>
</AppShell>
