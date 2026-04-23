<script lang="ts">
	import { page } from '$app/state';
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Button } from "$lib/components/ui/button";
	import { Progress } from "$lib/components/ui/progress";
	
	import { skillStore } from '$lib/data/store/keahlian-store.svelte';
	import type { NameAndValue } from '$lib/data/schema';

	const websiteName = 'Kevin Agustiansyah Putra';
	const imageLocation = `/img/new-pas-foto.jpg`;

	type ColumnData = 'name' | 'value' | 'default';
	type OrderBy = 'asc' | 'desc' | 'default';

	let filterKeahlian = $state<ColumnData>('default');
	let orderByKeahlian = $state<OrderBy>('default');
	let filterAlat = $state<ColumnData>('default');
	let orderByAlat = $state<OrderBy>('default');

	function handleFilterAlatChange() {
		const temp = [...skillStore.alat].sort((a, b) => {
			if (filterAlat === 'name') {
				if (orderByAlat === 'desc') {
					return -a.name.localeCompare(b.name);
				} else {
					return a.name.localeCompare(b.name);
				}
			} else {
				if (orderByAlat === 'desc') {
					return b.value - a.value;
				} else {
					return a.value - b.value;
				}
			}
		});

		skillStore.updateAlat(temp);
	}

	function handleFilterKeahlianChange() {
		const temp = [...skillStore.keahlian].sort((a, b) => {
			if (filterKeahlian === 'name') {
				if (orderByKeahlian === 'desc') {
					return -a.name.localeCompare(b.name);
				} else {
					return a.name.localeCompare(b.name);
				}
			} else {
				if (orderByKeahlian === 'desc') {
					return b.value - a.value;
				} else {
					return a.value - b.value;
				}
			}
		});

		skillStore.updateKeahlian(temp);
	}
</script>

<svelte:head>
	<title>{websiteName}</title>
	<meta name="description" content={`Website Portofolio ${websiteName}`} />
	<meta
		name="keywords"
		content={`Kevin,Agustiansyah,Putra,${skillStore.keahlian.map((a) => a.name).join(',')}`}
	/>
	<meta property="og:title" content={websiteName} />
	<meta property="og:description" content={`Website Portofolio ${websiteName}`} />
	<meta property="og:image" content={imageLocation} />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:type" content="website" />
</svelte:head>

<div class="max-w-4xl mx-auto px-4 py-12 space-y-16">
	<section class="text-center space-y-6">
		<div class="space-y-2">
			<h2 class="text-lg font-medium text-primary tracking-wide uppercase">Hai, Nama Saya</h2>
			<h1 class="text-4xl font-extrabold tracking-tight lg:text-6xl">
				Kevin Agustiansyah Putra
			</h1>
		</div>
		<p class="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
			Saya sangat antusias dengan dunia pemograman web hingga cross platform. <br />
			Tools yang saya gemari saat membangun sebuah website seperti:
			<span class="font-bold text-foreground">Node.JS, Javascript, Typescript, .NET, C#, Mysql, Sql Server</span>
			dan masih banyak lagi.
		</p>
	</section>

	<section class="py-4 space-y-4">
		<div class="flex justify-between items-start">
			<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight"># Alat</h3>
			<div class="flex justify-between items-center gap-4">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Button {...props} variant="outline" size="icon" aria-label="Column">
								<svg class="size-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v14M9 5v14M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>
								</svg>
							</Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Label>Select Column</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.RadioGroup bind:value={filterAlat}>
							<DropdownMenu.RadioItem value="name" onclick={handleFilterAlatChange}>Name</DropdownMenu.RadioItem>
							<DropdownMenu.RadioItem value="value" onclick={handleFilterAlatChange}>Value</DropdownMenu.RadioItem>
						</DropdownMenu.RadioGroup>
					</DropdownMenu.Content>
				</DropdownMenu.Root>

				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Button {...props} variant="outline" size="icon" aria-label="Order By">
								<svg class="size-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4"/>
								</svg>
							</Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Label>Order By</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.RadioGroup bind:value={orderByAlat}>
							<DropdownMenu.RadioItem value="asc" onclick={handleFilterAlatChange}>Ascending</DropdownMenu.RadioItem>
							<DropdownMenu.RadioItem value="desc" onclick={handleFilterAlatChange}>Descending</DropdownMenu.RadioItem>
						</DropdownMenu.RadioGroup>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>

		<div class="space-y-6">
			{#each skillStore.alat as alat}
				<div class="space-y-2 transition-all hover:translate-x-1">
					<div class="flex justify-between items-center">
						<span class="font-medium">{alat.name}</span>
						<span class="text-sm text-muted-foreground">{alat.value}%</span>
					</div>
					<Progress value={alat.value} max={100} class="h-2" />
				</div>
			{/each}
		</div>
	</section>

	<section class="py-4 space-y-4">
		<div class="flex justify-between items-start">
			<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight"># Teknologi</h3>
			<div class="flex justify-between items-center gap-4">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Button {...props} variant="outline" size="icon" aria-label="Column">
								<svg class="size-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v14M9 5v14M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>
								</svg>
							</Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Label>Select Column</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.RadioGroup bind:value={filterKeahlian}>
							<DropdownMenu.RadioItem value="name" onclick={handleFilterKeahlianChange}>Name</DropdownMenu.RadioItem>
							<DropdownMenu.RadioItem value="value" onclick={handleFilterKeahlianChange}>Value</DropdownMenu.RadioItem>
						</DropdownMenu.RadioGroup>
					</DropdownMenu.Content>
				</DropdownMenu.Root>

				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Button {...props} variant="outline" size="icon" aria-label="Order By">
								<svg class="size-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4"/>
								</svg>
							</Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Label>Order By</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.RadioGroup bind:value={orderByKeahlian}>
							<DropdownMenu.RadioItem value="asc" onclick={handleFilterKeahlianChange}>Ascending</DropdownMenu.RadioItem>
							<DropdownMenu.RadioItem value="desc" onclick={handleFilterKeahlianChange}>Descending</DropdownMenu.RadioItem>
						</DropdownMenu.RadioGroup>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>

		<div class="space-y-6">
			{#each skillStore.keahlian as keahlian}
				<div class="space-y-2 transition-all hover:translate-x-1">
					<div class="flex justify-between items-center">
						<span class="font-medium">{keahlian.name}</span>
						<span class="text-sm text-muted-foreground">{keahlian.value}%</span>
					</div>
					<Progress value={keahlian.value} max={100} class="h-2" />
				</div>
			{/each}
		</div>
	</section>
</div>
