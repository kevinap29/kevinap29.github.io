<script lang="ts">
	import { cn } from "$lib/utils";
	import { type Component, type Snippet } from "svelte";

	let { 
		class: className,
		title,
		description,
		icon: Icon,
		value,
		span = "col-span-1 row-span-1",
		children
	}: {
		class?: string;
		title: string;
		description?: string;
		icon?: Component<any>;
		value?: number;
		span?: string;
		children?: Snippet;
	} = $props();
</script>

<div 
	class={cn(
		"group relative h-full w-full overflow-hidden rounded-none border border-border/50 bg-muted/30 p-6 transition-all duration-500 hover:bg-muted/50 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 hover:scale-[1.02]",
		className
	)}
>
	<!-- Background Glow -->
	<div class="absolute -right-10 -top-10 size-32 rounded-none bg-primary/5 blur-3xl transition-all duration-500 group-hover:bg-primary/10 group-hover:scale-150"></div>
	
	<div class="relative z-10 flex h-full flex-col justify-between">
		<div class="flex items-center gap-4">
			{#if Icon}
				<div class="inline-flex size-12 shrink-0 items-center justify-center rounded-none bg-background shadow-sm border border-border/50 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
					<Icon class="size-6 text-primary" />
				</div>
			{/if}
			
			<div class="flex-1 space-y-1 min-w-0">
				<h3 class="text-xl font-black tracking-tight leading-tight group-hover:text-primary transition-colors">
					{title}
				</h3>
				{#if description}
					<p class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 leading-tight">
						{description}
					</p>
				{/if}
			</div>
		</div>

		{#if value !== undefined}
			<div class="space-y-2">
				<div class="flex justify-between items-end">
					<span class="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Proficiency</span>
					<span class="text-sm font-black tabular-nums text-primary">{value}%</span>
				</div>
				<div class="h-1.5 w-full overflow-hidden rounded-none bg-primary/10">
					<div 
						class="h-full bg-primary transition-all duration-1000 ease-out" 
						style="width: {value}%"
					></div>
				</div>
			</div>
		{/if}

		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
