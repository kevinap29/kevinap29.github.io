<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		child: childProp,
		children,
		...restProps
	}: DropdownMenuPrimitive.TriggerProps = $props();
</script>

{#if childProp}
	<DropdownMenuPrimitive.Trigger bind:ref data-slot="dropdown-menu-trigger" {...restProps}>
		{#snippet child({ props })}
			{@render childProp({ props })}
		{/snippet}
	</DropdownMenuPrimitive.Trigger>
{:else}
	<DropdownMenuPrimitive.Trigger bind:ref data-slot="dropdown-menu-trigger" {...restProps}>
		{@render children?.()}
	</DropdownMenuPrimitive.Trigger>
{/if}
