<script lang="ts">
	let yearString =
		new Date().getFullYear() == 2024 ? '2024' : `2024 - ${new Date().getFullYear().toString()}`;
</script>

<div
	class="flex justify-center items-center variant-glass-surface h-12 border-t border-surface-400-500-token mx-auto"
>
	<p class="text-surface-600-300-token">© Kevin Agustiansyah - {yearString}</p>
</div>
