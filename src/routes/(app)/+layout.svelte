<script lang="ts">
	import { ModeWatcher } from "mode-watcher";
	import * as Sheet from "$lib/components/ui/sheet";
	
	import SideBar from '$lib/components/SideBar.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageFooter from '$lib/components/PageFooter.svelte';
	import MenuDrawer from '$lib/components/MenuDrawer.svelte';
	import type { NavUrl } from '$routes/types';
	import { House, CircleUser, Briefcase, FileText } from '@lucide/svelte';

	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages';
	import { i18n } from '$lib/i18n.svelte';

	let { children } = $props();

	// Reactive nav labels with icons — updates automatically when language changes
	let navUrls = $derived.by<NavUrl[]>(() => {
		// Use i18n.current to ensure this derived state updates on language change
		const currentLang = i18n.current;
		return [
			{ url: `/`, title: m.nav_home(), icon: House },
			{ url: `/about`, title: m.nav_about(), icon: CircleUser },
			{ url: `/project`, title: m.nav_project(), icon: Briefcase },
			{ url: `/resume`, title: m.nav_resume(), icon: FileText }
		];
	});

	let isSidebarOpen = $state(false);
	let isMenuOpen = $state(false);

	function closeDrawers() {
		isSidebarOpen = false;
		isMenuOpen = false;
	}
</script>

<ModeWatcher />

<div class="flex min-h-screen flex-col bg-background">
	<div class="flex flex-1">
		<!-- Desktop Sidebar -->
		<aside class="no-print hidden w-80 border-r lg:block sticky top-0 h-screen overflow-y-auto">
			<SideBar />
		</aside>

		<!-- Mobile Sidebars (Sheets) -->
		<Sheet.Root bind:open={isSidebarOpen}>
			<Sheet.Content side="left" class="p-0">
				<SideBar />
			</Sheet.Content>
		</Sheet.Root>

		<Sheet.Root bind:open={isMenuOpen}>
			<Sheet.Content side="top">
				<MenuDrawer urls={navUrls} onclick={closeDrawers} />
			</Sheet.Content>
		</Sheet.Root>

		<!-- Main Content Area -->
		<div class="flex flex-1 flex-col">
			<div class="no-print">
				<PageHeader
					urls={navUrls}
					onprofile={() => isSidebarOpen = true}
					onmenu={() => isMenuOpen = true}
				/>
			</div>
			
			<main class="flex-1 container mx-auto px-4 py-8">
				{#key i18n.current}
					{@render children()}
				{/key}
			</main>

			<div class="no-print">
				<PageFooter />
			</div>
		</div>
	</div>
</div>
