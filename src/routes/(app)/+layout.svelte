<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { ModeWatcher } from 'mode-watcher';
	import * as Sheet from '$lib/components/ui/sheet';

	import SideBar from '$lib/components/SideBar.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageFooter from '$lib/components/PageFooter.svelte';
	import MenuDrawer from '$lib/components/MenuDrawer.svelte';
	import LoadingProgressBar from '$lib/components/LoadingProgressBar.svelte';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import type { NavUrl } from '$lib/types/nav';
	import { House, CircleUser, Briefcase, FileText, Mail, Activity } from '@lucide/svelte';

	import { m } from '$lib/paraglide/messages';
	import { i18n } from '$lib/i18n.svelte';
	import { onNavigate } from '$app/navigation';

	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	// Reactive nav labels with icons — updates automatically when language changes
	let navUrls = $derived.by<NavUrl[]>(() => {
		return [
			{ url: `${base}/`, title: m.nav_home({}, { locale: i18n.current }), icon: House },
			{ url: `${base}/about`, title: m.nav_about({}, { locale: i18n.current }), icon: CircleUser },
			{
				url: `${base}/project`,
				title: m.nav_project({}, { locale: i18n.current }),
				icon: Briefcase
			},
			{ url: `${base}/resume`, title: m.nav_resume({}, { locale: i18n.current }), icon: FileText },
			{
				url: `${base}/journal`,
				title: m.nav_journal({}, { locale: i18n.current }),
				icon: Activity
			},
			{ url: `${base}/contact`, title: m.nav_contact({}, { locale: i18n.current }), icon: Mail }
		];
	});

	let isSidebarOpen = $state(false);
	let isMenuOpen = $state(false);

	function closeDrawers() {
		isSidebarOpen = false;
		isMenuOpen = false;
	}
</script>

<LoadingProgressBar />
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
					onprofile={() => (isSidebarOpen = true)}
					onmenu={() => (isMenuOpen = true)}
				/>
			</div>

			<main class="flex-1 container mx-auto px-4 py-8 overflow-x-hidden">
				{#key page.url.pathname}
					{@render children()}
				{/key}
			</main>

			<div class="no-print">
				<PageFooter />
			</div>
		</div>
	</div>
	<div class="no-print">
		<ScrollToTop />
	</div>
</div>
