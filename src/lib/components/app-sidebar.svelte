<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	import * as Avatar from "$lib/components/ui/avatar/index.js";
</script>

<Sidebar.Root collapsible="icon">
	<Sidebar.Header>
		<Avatar.Root>
			<Avatar.Image width="48" src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group />
		<Sidebar.Group />
	</Sidebar.Content>
	<Sidebar.Footer />
</Sidebar.Root>
