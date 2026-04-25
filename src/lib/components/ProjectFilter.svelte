<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge';
	import { m } from '$lib/paraglide/messages';
	import { i18n } from '$lib/i18n.svelte';
	import { cn } from '$lib/utils';
	import { Search } from '@lucide/svelte';

	let {
		searchQuery = $bindable(),
		selectedTags = $bindable(),
		visibilityFilter = $bindable(),
		availableTags = []
	} = $props<{
		searchQuery: string;
		selectedTags: string[];
		visibilityFilter: 'all' | 'public' | 'private';
		availableTags: string[];
	}>();

	function toggleTag(tag: string) {
		if (selectedTags.includes(tag)) {
			selectedTags = selectedTags.filter((t: string) => t !== tag);
		} else {
			selectedTags = [...selectedTags, tag];
		}
	}
</script>

<div class="space-y-6">
	<div class="flex flex-col md:flex-row gap-4 items-center">
		<div class="relative w-full">
			<Search class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input
				type="text"
				placeholder={m.search_project({}, { locale: i18n.current })}
				bind:value={searchQuery}
				class="pl-10 h-12 bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary transition-all shadow-sm"
			/>
		</div>

		<div class="flex p-1 bg-muted rounded-none w-full md:w-auto shrink-0 border border-border/50">
			{#each ['all', 'public', 'private'] as option}
				<button
					class={cn(
						'px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-none transition-all duration-200 grow md:grow-0 text-center whitespace-nowrap',
						visibilityFilter === option
							? 'bg-primary text-primary-foreground shadow-md'
							: 'text-muted-foreground hover:text-foreground hover:bg-background/50'
					)}
					onclick={() => visibilityFilter = option as 'all' | 'public' | 'private'}
				>
					{option === 'all'
						? m.visibility_all()
						: option === 'public'
							? m.visibility_public()
							: m.visibility_private()}
				</button>
			{/each}
		</div>
	</div>

	<div class="space-y-3">
		<div class="flex justify-between items-center">
			<h3 class="text-sm font-black uppercase tracking-widest text-muted-foreground">
				{m.filter_by_tag({}, { locale: i18n.current })}
			</h3>
			{#if selectedTags.length > 0}
				<button
					onclick={() => (selectedTags = [])}
					class="text-[10px] font-black uppercase tracking-tighter text-primary hover:underline transition-all"
				>
					Reset
				</button>
			{/if}
		</div>
		<div class="flex flex-wrap gap-2">
			{#each availableTags as tag}
				{@const isActive = selectedTags.includes(tag)}
				<button
					onclick={() => toggleTag(tag)}
					class="transition-all duration-200 transform hover:scale-105 active:scale-95"
				>
					<Badge
						variant={isActive ? 'default' : 'outline'}
						class={cn(
							'px-3 py-1 text-[10px] font-bold uppercase tracking-wide cursor-pointer transition-colors',
							isActive ? 'shadow-md' : 'hover:bg-primary/10 hover:border-primary/50'
						)}
					>
						{tag}
					</Badge>
				</button>
			{/each}
		</div>
	</div>
</div>
