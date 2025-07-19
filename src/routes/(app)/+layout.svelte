<script lang="ts">
	import {
		AppShell,
		initializeStores,
		Drawer,
		getDrawerStore,
		type DrawerSettings
	} from '@skeletonlabs/skeleton';

	import SideBar from '$lib/components/SideBar.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageFooter from '$lib/components/PageFooter.svelte';
	import MenuDrawer from '$lib/components/MenuDrawer.svelte';

	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { supabase } from '$lib/data/supabase';
	import { browser } from '$app/environment';

	// import type { LayoutServerData } from './$types'

	// export let data: LayoutServerData

	//$: ({ navUrls } = data)

	initializeStores();

	interface NavUrl {
		url: string;
		title: string;
	}

	const navUrls: NavUrl[] = [
		{ url: `${$page.url.origin}/`, title: 'Beranda' },
		{ url: `${$page.url.origin}/about/`, title: 'Tentang Saya' },
		{ url: `${$page.url.origin}/project/`, title: 'Projek' }
	];
	const drawerStore = getDrawerStore();
	const drawerSidebarSetting: DrawerSettings = {
		id: 'sidebar',
		width: 'w-full',
		bgDrawer: 'variant-glass-surface'
	};
	const drawerMenuSetting: DrawerSettings = {
		id: 'menu',
		width: 'w-full',
		bgDrawer: 'variant-glass-surface'
	};

	async function handleDrawerOpenClick(setting: DrawerSettings) {
		drawerStore.open(setting);
	}

	async function handleDrawerCloseClick() {
		drawerStore.close();
	}

	async function incrementPageView(link: string) {
		await supabase.rpc('increment_page_counter', { link });
	}

	afterNavigate(async () => {
		if (!browser || import.meta.env.DEV) return; // ⛔ Skip on dev or SSR

		const url = $page.url.origin + $page.url.pathname;
		console.log(url);
		await incrementPageView(url);
	});
</script>

<Drawer>
	{#if $drawerStore.id === 'sidebar'}
		<div class="flex justify-end">
			<button
				type="button"
				class="btn text-error-100-800-token text-xl"
				on:click={async () => handleDrawerCloseClick()}
			>
				<svg
					class="w-6 h-6"
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
						stroke-linejoin="round"
						stroke-width="2"
						d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					/>
				</svg>
			</button>
		</div>
		<SideBar />
	{/if}

	{#if $drawerStore.id === 'menu'}
		<div class="flex justify-end">
			<button
				type="button"
				class="btn text-error-100-800-token text-xl"
				on:click={async () => handleDrawerCloseClick()}
			>
				<svg
					class="w-6 h-6"
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
						stroke-linejoin="round"
						stroke-width="2"
						d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					/>
				</svg>
			</button>
		</div>
		<MenuDrawer urls={navUrls} on:click={async () => handleDrawerCloseClick()} />
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
		<PageHeader
			urls={navUrls}
			on:profile={async () => await handleDrawerOpenClick(drawerSidebarSetting)}
			on:menu={async () => await handleDrawerOpenClick(drawerMenuSetting)}
		/>
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">
		<PageFooter />
	</svelte:fragment>
</AppShell>
