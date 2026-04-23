<script lang="ts">
	import { page } from '$app/state';
	import { skillStore } from '$lib/data/store/keahlian-store.svelte';
	import { projectsData } from '$lib/data/store/project-store.svelte';
	import { Button } from "$lib/components/ui/button";

	const name = 'Kevin Agustiansyah';
	const title = 'Fullstack Developer';
	const email = 'kevinagustiansyah298@gmail.com';
	const phone = '+62 895 4100 69696';
	const location = 'Palembang, Indonesia';
	const github = 'github.com/kevinap29';
	const linkedin = 'linkedin.com/in/kevin-agustiansyah-9206041a3';

	// Experience Data (Hardcoded based on About page for precision)
	const experience = [
		{
			company: 'PT. Ciptapapan Dinamika',
			role: 'Web Programmer',
			period: '2022 - Sekarang',
			desc: 'Bertanggung jawab dalam pengembangan dan pemeliharaan sistem ERP perusahaan menggunakan ASP.NET, SQL Server, dan Microservices berbasis .NET Core. Mengelola cron jobs dengan Hangfire dan integrasi API.'
		},
		{
			company: 'PT. Astra Motor Palembang',
			role: 'Admin CRM',
			period: '2021 - 2022',
			desc: 'Mengelola database konsumen Honda Sumatera Selatan, melakukan pengolahan data menggunakan Excel untuk strategi retensi dan lead generation.'
		},
		{
			company: 'Freelance',
			role: 'Web Developer',
			period: '2021',
			desc: 'Mengembangkan website Company Profile untuk PT. Ginting Jaya Energi menggunakan Laravel dan MySQL.'
		}
	];

	// Education Data
	const education = [
		{
			school: 'STMIK Palcomtech (ITB Palcomtech)',
			degree: 'S1 Sistem Informasi',
			period: '2017 - 2021',
			desc: 'Lulus dengan IPK 3.67. Fokus pada pengembangan sistem informasi dan teknologi web.'
		}
	];

	function handlePrint() {
		window.print();
	}
</script>

<svelte:head>
	<title>Resume | {name}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="max-w-[21cm] mx-auto bg-white text-black p-[0.6cm] sm:p-[0.8cm] shadow-2xl print:shadow-none print:p-0 print:h-[29.7cm] print:w-[21cm] flex flex-col font-sans overflow-hidden min-h-screen sm:min-h-0">
	<!-- Print Control -->
	<div class="no-print flex justify-end mb-4">
		<Button onclick={handlePrint} variant="default" class="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-none px-6">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7"></path><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
			GENERATE PDF
		</Button>
	</div>

	<!-- Header Section -->
	<header class="flex flex-col sm:grid sm:grid-cols-3 gap-4 sm:gap-6 items-start sm:items-end border-b-4 border-black pb-4 mb-6">
		<div class="sm:col-span-2 space-y-1 w-full">
			<h1 class="text-3xl sm:text-4xl font-black uppercase tracking-tighter leading-none italic break-words">{name}</h1>
			<div class="flex items-center gap-3">
				<p class="text-base sm:text-lg font-bold text-primary tracking-[0.2em] uppercase">{title}</p>
				<div class="h-px flex-1 bg-black/10"></div>
			</div>
		</div>
		<div class="sm:col-span-1 text-left sm:text-right text-[10px] space-y-0.5 font-bold uppercase tracking-wider text-gray-600 w-full">
			<div class="flex sm:justify-end items-center gap-1.5">
				<span>{email}</span>
				<svg class="size-2.5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m3 7 9 6 9-6M4 5h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2Z"/></svg>
			</div>
			<div class="flex sm:justify-end items-center gap-1.5">
				<span>{phone}</span>
				<svg class="size-2.5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
			</div>
			<div class="flex sm:justify-end items-center gap-1.5">
				<span class="text-black underline lowercase">{linkedin.replace('linkedin.com/in/', '')}</span>
				<svg class="size-2.5 text-black" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
			</div>
		</div>
	</header>

	<!-- Summary -->
	<section class="mb-8">
		<div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
			<h2 class="text-lg font-black uppercase tracking-widest bg-black text-white px-3 py-0.5">Profil</h2>
			<p class="text-[12px] leading-relaxed font-medium text-gray-700">
				Pengembang Fullstack berpengalaman dengan keahlian di ekosistem **.NET** dan **Typescript**. 
				Terbukti sukses mentransformasi kebutuhan bisnis menjadi sistem ERP yang skalabel. 
				Fokus pada performa kode, arsitektur microservices, dan intuitif UI.
			</p>
		</div>
	</section>

	<div class="flex flex-col sm:grid sm:grid-cols-3 gap-8 sm:gap-10 flex-1 overflow-hidden">
		<!-- Left Column: Skills & Education -->
		<aside class="flex flex-col space-y-8">
			<section class="space-y-4">
				<h2 class="text-xs font-black uppercase tracking-[0.3em] text-primary border-l-4 border-primary pl-2">Tech Stack</h2>
				<div class="flex flex-wrap gap-1">
					{#each skillStore.keahlian as skill}
						<span class="text-[9px] font-bold uppercase px-1.5 py-0.5 border border-black">{skill.name}</span>
					{/each}
				</div>
			</section>

			<section class="space-y-4">
				<h2 class="text-xs font-black uppercase tracking-[0.3em] text-primary border-l-4 border-primary pl-2">Infrastructure</h2>
				<div class="flex flex-wrap gap-1">
					{#each skillStore.alat as tool}
						<span class="text-[9px] font-bold uppercase px-1.5 py-0.5 bg-black text-white">{tool.name}</span>
					{/each}
				</div>
			</section>

			<section class="space-y-4">
				<h2 class="text-xs font-black uppercase tracking-[0.3em] text-primary border-l-4 border-primary pl-2">Education</h2>
				{#each education as edu}
					<div class="space-y-1 relative pl-3 border-l border-gray-200">
						<div class="absolute -left-[3.5px] top-1 size-1.5 rounded-full bg-black"></div>
						<h3 class="font-bold text-[11px] leading-tight">{edu.school}</h3>
						<div class="flex justify-between items-center text-[8.5px] font-black text-gray-400 uppercase">
							<span>{edu.degree}</span>
							<span>{edu.period}</span>
						</div>
					</div>
				{/each}
			</section>
		</aside>

		<!-- Right Column: Experience & Projects -->
		<main class="sm:col-span-2 space-y-8">
			<section class="space-y-6">
				<h2 class="text-xs font-black uppercase tracking-[0.3em] text-primary border-l-4 border-primary pl-2">Experience</h2>
				<div class="space-y-6">
					{#each experience as exp}
						<div class="space-y-2 relative pl-4 border-l-2 border-black/5">
							<div class="absolute -left-[6px] top-1 size-2.5 border-2 border-black bg-white"></div>
							<div class="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2 sm:gap-0">
								<h3 class="font-black text-lg leading-none uppercase tracking-tight">{exp.role}</h3>
								<span class="text-[9px] font-black text-white bg-black px-1.5 py-0.5 uppercase tracking-widest">{exp.period}</span>
							</div>
							<p class="font-bold text-primary text-[10px] uppercase tracking-widest">{exp.company}</p>
							<p class="text-[12px] leading-snug text-gray-700 font-medium">
								{exp.desc}
							</p>
						</div>
					{/each}
				</div>
			</section>

			<section class="space-y-6">
				<h2 class="text-xs font-black uppercase tracking-[0.3em] text-primary border-l-4 border-primary pl-2">Projects</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
					{#each projectsData.filter(p => p.type === 'public').sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime()).slice(0, 6) as project}
						<div class="space-y-1">
							<div class="flex items-center justify-between">
								<h3 class="font-black text-[10px] uppercase tracking-tight">{project.name}</h3>
								{#if project.url !== '#'}
									<a href={project.url} target="_blank" class="text-[8px] font-black uppercase text-primary hover:underline">Link</a>
								{/if}
							</div>
							<p class="text-[10px] leading-snug text-gray-500 line-clamp-3">
								{@html project.desc.replace(/<span class="font-bold">/g, '<span class="font-black text-black">')}
							</p>
						</div>
					{/each}
				</div>
			</section>
		</main>
	</div>
</div>

<style>
	:global(body) {
		background-color: var(--muted);
	}
	
	@media print {
		:global(html, body, .bg-background, main) {
			background-color: white !important;
			color: black !important;
			print-color-adjust: exact;
			-webkit-print-color-adjust: exact;
		}
		:global(.container) {
			max-width: none !important;
			width: 100% !important;
			padding: 0 !important;
			margin: 0 !important;
		}
		:global(main.flex-1.container) {
			padding: 0 !important;
			margin: 0 !important;
		}
		@page {
			margin: 0;
			size: auto;
		}
	}
</style>
