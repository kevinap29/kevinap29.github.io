<script lang="ts">
	import { i18n, availableLanguages } from '$lib/i18n.svelte';
	import { Button } from '$lib/components/ui/button';

	// Display labels for each language code
	const labels: Record<string, string> = {
		en: 'EN',
		id: 'ID'
	};
</script>

<div class="flex items-center gap-1" aria-label="Language switcher">
	{#each availableLanguages as lang}
		<Button
			variant={i18n.current === lang ? 'default' : 'ghost'}
			size="sm"
			class="h-7 px-2 text-xs font-semibold uppercase tracking-widest"
			onclick={() => i18n.switchTo(lang)}
			aria-current={i18n.current === lang ? 'true' : undefined}
			aria-label={`Switch to ${lang === 'en' ? 'English' : 'Indonesian'}`}
		>
			{labels[lang]}
		</Button>
	{/each}
</div>
