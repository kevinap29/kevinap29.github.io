<script lang="ts">
	import { page } from '$app/stores'
	import { Avatar } from '@skeletonlabs/skeleton';
</script>

<div class="flex justify-center items-center mx-auto py-4">
	<Avatar
		src={`${$page.url.origin}/img/pas-foto.jpg`}
		width="w-48 card-hover"
		border="border border-surface-400-500-token"
		shadow="shadow-lg"
	/>
	<!-- <Avatar
		initials="KA"
		width="w-48 card-hover"
		border="border border-surface-400-500-token"
		shadow="shadow-lg"
		background="variant-glass-primary"
	/> -->
</div>
<div class="text-center space-y-1">
	<p class="h3 font-bold">Kevin Agustiansyah</p>
</div>
