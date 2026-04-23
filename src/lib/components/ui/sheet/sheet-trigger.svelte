<script lang="ts">
	import { Dialog as SheetPrimitive } from "bits-ui";

	let { ref = $bindable(null), child: childProp, children, ...restProps }: SheetPrimitive.TriggerProps = $props();
</script>

{#if childProp}
	<SheetPrimitive.Trigger bind:ref data-slot="sheet-trigger" {...restProps}>
		{#snippet child({ props })}
			{@render childProp({ props })}
		{/snippet}
	</SheetPrimitive.Trigger>
{:else}
	<SheetPrimitive.Trigger bind:ref data-slot="sheet-trigger" {...restProps}>
		{@render children?.()}
	</SheetPrimitive.Trigger>
{/if}
