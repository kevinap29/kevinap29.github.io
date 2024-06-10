<script lang="ts">
    import { page } from '$app/stores'
    import { goto } from '$app/navigation'
    import ArrowLeftOutline from 'flowbite-svelte-icons/ArrowLeftOutline.svelte'

    // $: queryStatus = $page.url.searchParams.get('status')
    // $: queryMessage = $page.url.searchParams.get('message')
</script>

<div class="flex justify-center items-center h-full mx-auto">
    <div class="card size-2/4 flex justify-center items-center mx-auto">
        <section class="p-4 text-center space-y-8">
            <!-- <p class="h1 font-bold">{queryStatus}</p>
            <p class="h3">{queryMessage}</p> -->
            <button class="btn variant-glass-tertiary space-x-3" on:click={async () => await goto($page.url.origin)}>
                <ArrowLeftOutline /> 
                Go Back
            </button>
        </section>
    </div>
</div>