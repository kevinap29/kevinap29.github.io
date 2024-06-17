<script lang="ts">
    import type { PageServerData } from './$types'

    import { page } from '$app/stores'

    import { ListBox, ListBoxItem, ProgressBar, RadioGroup, RadioItem, popup, type PopupSettings } from '@skeletonlabs/skeleton';

    import { keahlianStore } from '$lib/data/store/keahlian-store'
    
    export let data: PageServerData

    type FilterKeahlian = 'name' | 'value' | 'default'
    type OrderBy = 'asc' | 'desc' | 'default'

    
    const popupFilterColumnClick: PopupSettings = {
        event: 'click',
        target: 'popupFilterColumnClick',
        placement: 'bottom'
    };

    const popupOrderColumnClick: PopupSettings = {
        event: 'click',
        target: 'popupOrderColumnClick',
        placement: 'bottom'
    };
                        

    $: ({ websiteName } = data)
    $: filterKeahlian = 'default' as FilterKeahlian
    $: orderByKeahlian = 'default' as OrderBy

    async function handleFilterKeahlianChange() {
        const tempKeahlian = $keahlianStore.sort((a, b) => {
            if (filterKeahlian === 'name') {
                if (orderByKeahlian === 'desc') {
                    return -a.name.localeCompare(b.name)
                } else {
                    return a.name.localeCompare(b.name)
                }
            } else {
                if (orderByKeahlian === 'desc') {
                    return b.value - a.value
                } else {
                    return a.value - b.value
                }
            }
        });

        keahlianStore.clear()

        keahlianStore.update(tempKeahlian)
    }
</script>

<svelte:head>
    <title>{websiteName}</title>
    <meta name="description" content="Kevin Agustiansyah Putra">
    <meta name="keywords" content={$keahlianStore.map(a => a.name).toString()}>
    <meta property="og:title" content="Kevin Agustiansyah Putra" />
    <meta property="og:description" content="Website Portofolio Kevin Agustiansyah Putra" />
    <meta property="og:image" content={`${$page.url.origin}/img/new-pas-foto.jpg`} />
    <meta property="og:url" content={$page.url.href} />
    <meta property="og:type" content="website" />
</svelte:head>

<div class="container px-4 py-2">
    <section class="py-4">
        <div class="text-center space-y-5">
            <h1 class="h1 font-bold ">Hai, Nama Saya </h1>
            <h1 class="h1 font-bold card-hover">Kevin Agustiansyah Putra</h1>
            <p>
                Saya sangat antusias dengan dunia pemograman web hingga cross platform. <br> 
                Tools yang saya gemari saat membangun sebuah website seperti: <span class="font-bold">Node.JS, Javascript, Typescript, .NET, C#, Mysql, Sql Server</span> <br>
                dan masih banyak lagi.
            </p>
        </div>
    </section>

    <section class="py-4 space-y-4">
        <div class="flex justify-between items-start">
            <h3 class="h3 font-bold "># Keahlian</h3>
            <div class="flex justify-between items-center gap-4">
                <button class="btn variant-filled" use:popup={popupFilterColumnClick}>
                    <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v14M9 5v14M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>
                    </svg>                      
                </button>
                <div class="card p-4 bg-surface-100-800-token" data-popup="popupFilterColumnClick">
                    <ListBox>
                        <ListBoxItem bind:group={filterKeahlian} name="name" value="name" on:change={handleFilterKeahlianChange}>Name</ListBoxItem>
                        <ListBoxItem bind:group={filterKeahlian} name="value" value="value" on:change={handleFilterKeahlianChange}>Value</ListBoxItem>
                    </ListBox>
                </div>
                <button class="btn variant-filled" use:popup={popupOrderColumnClick}>
                    <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4"/>
                    </svg>                      
                </button>
                <div class="card p-4 bg-surface-100-800-token" data-popup="popupOrderColumnClick">
                    <ListBox>
                        <ListBoxItem bind:group={orderByKeahlian} name="asc" value="asc" on:change={handleFilterKeahlianChange}>Ascending</ListBoxItem>
                        <ListBoxItem bind:group={orderByKeahlian} name="desc" value="desc" on:change={handleFilterKeahlianChange}>Descending</ListBoxItem>
                    </ListBox>
                </div>
            </div>
        </div>

        <dl class="list-dl space-y-2">
            {#each $keahlianStore as keahlian}
                <div class="space-y-4 card-hover">
                    <span class="flex-auto">
                        <dt class="h6 font-bold">{keahlian.name}</dt>
                        <dd>
                            <ProgressBar value={keahlian.value} max={100} />
                        </dd>
                    </span>
                    <span class="badge variant-filled-primary">{keahlian.value}%</span>
                </div>
            {/each}
        </dl>
    </section>
</div>