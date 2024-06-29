<script lang="ts">
	// import type { PageServerData } from './$types';

	import { page } from '$app/stores';
	import { projectStore } from '$lib/data/store/project-store';

	// export let data: PageServerData;
	const websiteName = 'Kevin Agustiansyah Putra';
	const imageLocation = `${$page.url.origin}/img/new-pas-foto.jpg`;
	// $: ({ websiteName, imageLocation } = data);
</script>

<svelte:head>
	<title>Project | {websiteName}</title>
	<meta name="description" content={`Projek-projek ${websiteName}`} />
	<meta name="keywords" content={`Kevin,Agustiansyah,Putra,project`} />
	<meta property="og:title" content={`Project | ${websiteName}`} />
	<meta property="og:description" content="Website Portofolio Kevin Agustiansyah Putra" />
	<meta property="og:image" content={imageLocation} />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:type" content="website" />
</svelte:head>

<div class="container px-4 py-2 space-y-4">
	<section class="py-4">
		<div class="text-center space-y-5">
			<h1 class="h1 font-bold">Projek</h1>
			<p>
				Projek yang pernah saya buat, terdiri dari projek yang tersedia untuk publik atau privasi
			</p>
		</div>
	</section>

	<section class="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
		{#each $projectStore as project}
			{#if project.url === "#"}
				<div class="card card-hover overflow-hidden" >
					<header>
						<img
							src={`${$page.url.origin}/${project.image}`}
							class="bg-black/50 w-full aspect-[21/9]"
							alt={project.name}
						/>
					</header>
					<section class="p-4 space-y-5">
						<h1 class="h3 font-bold">{project.name}</h1>
						<p class="">
							{@html project.desc}
						</p>
					</section>
					<!-- <footer class="grid grid-cols-2 p-4 place-content-baseline">
						<h3>Di buat: </h3>
						<span>{project.dateCreated.toLocaleDateString()}</span>
						<h3>Sampai: </h3>
						<span>{typeof project.dateFinished !== 'string' ? project.dateFinished.toLocaleDateString() : project.dateFinished}</span>
						<h3>Type: </h3>
						<span>{project.type}</span>
					</footer> -->
				</div>
			{:else}
				<a href={project.url} class="card card-hover overflow-hidden" target="_blank">
					<header>
						<img
							src={`${$page.url.origin}/${project.image}`}
							class="bg-black/50 w-full aspect-[21/9]"
							alt={project.name}
						/>
					</header>
					<section class="p-4 space-y-5">
						<h1 class="h3 font-bold">{project.name}</h1>
						<p class="">
							{@html project.desc}
						</p>
					</section>
					<!-- <footer class="grid grid-cols-2 p-4 place-content-baseline">
						<h3>Di buat: </h3>
						<span>{project.dateCreated.toLocaleDateString()}</span>
						<h3>Sampai: </h3>
						<span>{typeof project.dateFinished !== 'string' ? project.dateFinished.toLocaleDateString() : project.dateFinished}</span>
						<h3>Type: </h3>
						<span>{project.type}</span>
					</footer> -->
				</a>
			{/if}
		{/each}
	</section>
</div>
