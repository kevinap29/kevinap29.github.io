<script lang="ts">
    import { onMount } from 'svelte'
    import type { PageServerData } from './$types'

    export let data: PageServerData;

    $: getLocalTranslate = ''

    onMount(async () => {
        
    })
</script>

<!-- <div class="container h-full mx-auto flex justify-center items-center px-4">
    <p class="h1 font-bold">Hi, My Name is Kevin Agustiansyah</p>
</div> -->
<div class="container px-4 py-2">
	<p class="h1 font-bold text-center">
        {data.pageTitleId}
    </p>
</div>
