<script lang="ts">
	import { page } from '$app/state';
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Button } from "$lib/components/ui/button";
	import { Progress } from "$lib/components/ui/progress";
	import * as m from '$lib/paraglide/messages';
	
	import type { NameAndValue } from '$lib/data/schema';

	const keahlianData: NameAndValue[] = [
		{ name: 'Node.JS', value: 90 },
		{ name: 'Javascript', value: 90 },
		{ name: 'Typescript', value: 85 },
		{ name: '.NET', value: 80 },
		{ name: 'C#', value: 85 },
		{ name: 'MySql', value: 80 },
		{ name: 'Sql Server', value: 80 },
		{ name: 'Sveltekit', value: 85 },
		{ name: 'Bootstrap', value: 85 },
		{ name: 'Tailwind CSS', value: 90 },
		{ name: 'Flutter', value: 75 },
		{ name: 'Dart', value: 75 },
		{ name: 'Laravel', value: 75 }
	];

	const alatData: NameAndValue[] = [
		{ name: 'Git', value: 90 },
		{ name: 'Github', value: 90 },
		{ name: 'Vercel', value: 80 },
		{ name: 'Hangfire', value: 75 },
		{ name: 'Crystal Report', value: 70 },
		{ name: 'REST API', value: 85 },
		{ name: 'Linq', value: 80 },
		{ name: 'EFCore', value: 80 }
	];

	const websiteName = 'Kevin Agustiansyah Putra';
	const imageLocation = `/img/new-pas-foto.jpg`;

	type ColumnData = 'name' | 'value' | 'default';
	type OrderBy = 'asc' | 'desc' | 'default';

	let filterKeahlian = $state<ColumnData>('default');
	let orderByKeahlian = $state<OrderBy>('default');
	let filterAlat = $state<ColumnData>('default');
	let orderByAlat = $state<OrderBy>('default');

	let currentKeahlian = $state<NameAndValue[]>([...keahlianData]);
	let currentAlat = $state<NameAndValue[]>([...alatData]);

	function handleFilterAlatChange() {
		const temp = [...alatData].sort((a: NameAndValue, b: NameAndValue) => {
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

		currentAlat = temp;
	}

	function handleFilterKeahlianChange() {
		const temp = [...keahlianData].sort((a: NameAndValue, b: NameAndValue) => {
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

		currentKeahlian = temp;
	}
</script>

<svelte:head>
	<title>{websiteName}</title>
	<meta name="description" content={m.meta_description({ name: websiteName }, { locale: i18n.current })} />
	<meta
		name="keywords"
		content={`Kevin,Agustiansyah,Putra,${keahlianData.map((a: NameAndValue) => a.name).join(',')}`}
	/>
	<meta property="og:title" content={websiteName} />
	<meta property="og:description" content={m.meta_description({ name: websiteName }, { locale: i18n.current })} />
	<meta property="og:image" content={imageLocation} />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:type" content="website" />
</svelte:head>

<div class="max-w-4xl mx-auto px-4 py-12 space-y-16">
	<section class="text-center space-y-6">
		<div class="space-y-2">
			<h2 class="text-lg font-medium text-primary tracking-wide uppercase">{m.hello_name({}, { locale: i18n.current })}</h2>
			<h1 class="text-4xl font-extrabold tracking-tight lg:text-6xl">
				Kevin Agustiansyah Putra
			</h1>
		</div>
		<p class="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
			{m.hero_description({}, { locale: i18n.current })} <br />
			<span class="font-bold text-foreground">{m.hero_tools({}, { locale: i18n.current })}</span>
			{m.hero_tools_suffix({}, { locale: i18n.current })}
		</p>
	</section>

	<section class="py-4 space-y-4">
		<div class="flex justify-between items-start">
			<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">{m.section_tools({}, { locale: i18n.current })}</h3>
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
						<DropdownMenu.Label>{m.select_column()}</DropdownMenu.Label>
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
						<DropdownMenu.Label>{m.order_by({}, { locale: i18n.current })}</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.RadioGroup bind:value={orderByAlat}>
							<DropdownMenu.RadioItem value="asc" onclick={handleFilterAlatChange}>{m.ascending({}, { locale: i18n.current })}</DropdownMenu.RadioItem>
							<DropdownMenu.RadioItem value="desc" onclick={handleFilterAlatChange}>{m.descending({}, { locale: i18n.current })}</DropdownMenu.RadioItem>
						</DropdownMenu.RadioGroup>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			{#each currentAlat as alat}
				<div class="space-y-1">
					<div class="flex justify-between text-sm font-medium">
						<span>{alat.name}</span>
						<span>{alat.value}%</span>
					</div>
					<Progress value={alat.value} class="h-2" />
				</div>
			{/each}
		</div>
	</section>

	<section class="py-4 space-y-4">
		<div class="flex justify-between items-start">
			<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">{m.section_technology({}, { locale: i18n.current })}</h3>
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
						<DropdownMenu.Label>{m.select_column()}</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.RadioGroup bind:value={filterKeahlian}>
							<DropdownMenu.RadioItem value="name" onclick={handleFilterKeahlianChange}>{m.nav_about()}</DropdownMenu.RadioItem>
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
						<DropdownMenu.Label>{m.order_by({}, { locale: i18n.current })}</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.RadioGroup bind:value={orderByKeahlian}>
							<DropdownMenu.RadioItem value="asc" onclick={handleFilterKeahlianChange}>{m.ascending({}, { locale: i18n.current })}</DropdownMenu.RadioItem>
							<DropdownMenu.RadioItem value="desc" onclick={handleFilterKeahlianChange}>{m.descending({}, { locale: i18n.current })}</DropdownMenu.RadioItem>
						</DropdownMenu.RadioGroup>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			{#each currentKeahlian as keahlian}
				<div class="space-y-1">
					<div class="flex justify-between text-sm font-medium">
						<span>{keahlian.name}</span>
						<span>{keahlian.value}%</span>
					</div>
					<Progress value={keahlian.value} class="h-2" />
				</div>
			{/each}
		</div>
	</section>
</div>
