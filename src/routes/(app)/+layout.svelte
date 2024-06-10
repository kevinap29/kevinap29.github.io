<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';

	import SideBar from '$lib/components/SideBar.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageFooter from '$lib/components/PageFooter.svelte';

	// import type { LayoutData } from './$types';

	// export let data: LayoutData;
</script>

<AppShell>
	<!-- (header) -->
	<svelte:fragment slot="sidebarLeft">
		<SideBar />
	</svelte:fragment>
	<!-- (sidebarRight) -->
	<svelte:fragment slot="pageHeader">
		<PageHeader />
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">
		<PageFooter />
	</svelte:fragment>
</AppShell>
