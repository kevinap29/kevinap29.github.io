<script lang="ts">
    import type { PageServerData } from './$types'

    export let data: PageServerData

    $: ({ websiteName } = data)
</script>

<svelte:head>
    <title>{websiteName}</title>
</svelte:head>

<div class="container px-4 py-2">
    <section class="py-4">
        <div class="font-bold text-center space-y-5">
            <h1 class="h1">Hai, Nama Saya </h1>
            <h2 class="h1">Kevin Agustiansyah Putra</h2>
        </div>
    </section>

    <section class="py-4">

    </section>
</div>