<script lang="ts">
	import { page } from '$app/state';
	import { i18n } from '$lib/i18n.svelte';
	import { projectsData } from '$lib/data/store/project-store.svelte';
	import { Button } from "$lib/components/ui/button";
	import * as m from '$lib/paraglide/messages';
	import { FileDown } from 'lucide-svelte';

	const name = 'Kevin Agustiansyah';
	const title = 'Fullstack Developer';
	const email = 'kevinagustiansyah298@gmail.com';
	const phone = '+62 895 4100 69696';
	const location = 'Palembang, Indonesia';
	const websiteName = 'Kevin Agustiansyah Putra';

	const keahlian = [
		'Node.JS', 'Javascript', 'Typescript', '.NET', 'C#', 'Mysql', 'Sql Server',
		'Sveltekit', 'Bootstrap', 'Tailwind CSS', 'Flutter', 'Dart', 'Laravel'
	];

	const alat = [
		'Git', 'Github', 'Vercel', 'Hangfire', 'Crystal Report', 'REST API', 'Linq', 'EFCore'
	];

	// Experience Data (Reactive & Localized)
	const experience = $derived([
		{
			company: 'PT. Ciptapapan Dinamika',
			role: 'Web Programmer',
			period: i18n.current === 'id' ? '2022 - Sekarang' : '2022 - Present',
			desc: m.resume_exp_ciptapapan_desc({}, { locale: i18n.current })
		},
		{
			company: 'PT. Astra Motor Palembang',
			role: 'Admin CRM',
			period: '2021 - 2022',
			desc: m.resume_exp_astra_desc({}, { locale: i18n.current })
		},
		{
			company: 'Freelance',
			role: 'Web Developer',
			period: '2021',
			desc: m.resume_exp_freelance_desc({}, { locale: i18n.current })
		}
	]);

	// Education Data (Reactive & Localized)
	const education = $derived([
		{
			school: 'STMIK Palcomtech (ITB Palcomtech)',
			degree: i18n.current === 'id' ? 'S1 Sistem Informasi' : 'Bachelor of Information Systems',
			period: '2017 - 2021',
			desc: m.resume_edu_desc({}, { locale: i18n.current })
		}
	]);

	function printResume() {
		window.print();
	}
</script>

<svelte:head>
	<title>{m.nav_resume({}, { locale: i18n.current })} | {websiteName}</title>
	<meta name="description" content={m.resume_profile({}, { locale: i18n.current })} />
	<meta name="keywords" content={`Kevin,Agustiansyah,Putra,resume`} />
	<meta property="og:title" content={`${m.nav_resume({}, { locale: i18n.current })} | ${websiteName}`} />
	<meta property="og:description" content={m.resume_profile({}, { locale: i18n.current })} />
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="max-w-[21cm] mx-auto bg-white text-black p-[0.6cm] sm:p-[0.8cm] shadow-2xl print:shadow-none print:p-0 print:h-[29.7cm] print:w-[21cm] flex flex-col font-sans overflow-hidden min-h-screen sm:min-h-0">
	
	<!-- Header Section -->
	<header class="flex flex-col sm:grid sm:grid-cols-3 gap-4 sm:gap-6 items-start sm:items-end border-b-4 border-black pb-4 mb-6">
		<div class="sm:col-span-2 space-y-1 w-full">
			<h1 class="text-3xl sm:text-4xl font-black uppercase tracking-tighter leading-none italic wrap-break-word">{name}</h1>
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
				<span class="text-black underline lowercase">linkedin.com/in/kevin-agustiansyah-9206041a3</span>
				<svg class="size-2.5 text-black" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
			</div>
		</div>
	</header>

	<!-- Summary -->
	<section class="mb-8">
		<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
			<h2 class="text-lg font-black uppercase tracking-widest bg-black text-white px-3 py-0.5">{m.resume_profile({ locale: i18n.current })}</h2>
			<Button onclick={printResume} variant="outline" size="sm" class="no-print flex items-center gap-2">
				<FileDown class="size-4" />
				{m.resume_generate_pdf({ locale: i18n.current })}
			</Button>
		</div>
		<p class="text-[12px] leading-relaxed font-medium text-gray-700">
			{m.resume_summary({ locale: i18n.current })}
		</p>
	</section>

	<div class="flex flex-col sm:grid sm:grid-cols-3 gap-8 sm:gap-10 flex-1 overflow-hidden">
		<!-- Left Column: Skills & Education -->
		<aside class="flex flex-col space-y-8">
			<section class="space-y-4">
				<h2 class="text-xs font-black uppercase tracking-[0.3em] text-primary border-l-4 border-primary pl-2">{m.resume_tech_stack({ locale: i18n.current })}</h2>
				<div class="flex flex-wrap gap-1">
					{#each keahlian as skill}
						<span class="text-[9px] font-bold uppercase px-1.5 py-0.5 border border-black">{skill}</span>
					{/each}
				</div>
			</section>

			<section class="space-y-4">
				<h2 class="text-xs font-black uppercase tracking-[0.3em] text-primary border-l-4 border-primary pl-2">{m.resume_infrastructure({ locale: i18n.current })}</h2>
				<div class="flex flex-wrap gap-1">
					{#each alat as tool}
						<span class="text-[9px] font-bold uppercase px-1.5 py-0.5 bg-black text-white">{tool}</span>
					{/each}
				</div>
			</section>

			<section class="space-y-4">
				<h2 class="text-xs font-black uppercase tracking-[0.3em] text-primary border-l-4 border-primary pl-2">{m.resume_education({ locale: i18n.current })}</h2>
				{#each education as edu}
					<div class="space-y-1 relative pl-3 border-l border-gray-200">
						<div class="absolute left-[-3.5px] top-1 size-1.5 rounded-full bg-black"></div>
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
				<h2 class="text-xs font-black uppercase tracking-[0.3em] text-primary border-l-4 border-primary pl-2">{m.resume_experience({ locale: i18n.current })}</h2>
				<div class="space-y-6">
					{#each experience as exp}
						<div class="space-y-2 relative pl-4 border-l-2 border-black/5">
							<div class="absolute left-[-6px] top-1 size-2.5 border-2 border-black bg-white"></div>
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
				<h2 class="text-xs font-black uppercase tracking-[0.3em] text-primary border-l-4 border-primary pl-2">{m.resume_projects({ locale: i18n.current })}</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
					{#each projectsData.all.filter(p => p.type === 'public').sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime()).slice(0, 6) as project}
						<div class="space-y-1">
							<div class="flex items-center justify-between">
								<h3 class="font-black text-[10px] uppercase tracking-tight">{project.name}</h3>
								{#if project.url !== '#'}
									<a href={project.url} target="_blank" class="text-[8px] font-black uppercase text-primary hover:underline">Link</a>
								{/if}
							</div>
							<p class="text-[10px] leading-snug text-gray-500 line-clamp-3">
								{@html (m as any)[project.descKey]({}, { locale: i18n.current }).replace(/<span class="font-bold">/g, '<span class="font-black text-black">')}
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
			margin: 0.5cm;
			size: A4;
		}
		.no-print {
			display: none !important;
		}
	}
</style>
