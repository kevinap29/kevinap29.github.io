<script lang="ts">
	let yearString =
		new Date().getFullYear() == 2024 ? '2024' : `2024 - ${new Date().getFullYear().toString()}`;
</script>

<footer class="flex justify-center items-center h-16 border-t mt-auto">
	<p class="text-sm text-muted-foreground">© Kevin Agustiansyah - {yearString}</p>
</footer>
