<script lang="ts">
	import { page } from '$app/state';

	const websiteName = 'Kevin Agustiansyah Putra';
	const imageLocation = `/img/new-pas-foto.jpg`;
</script>

<svelte:head>
	<title>About | {websiteName}</title>
	<meta name="description" content={`Tentang ${websiteName}`} />
	<meta name="keywords" content={'Kevin,Agustiansyah,Putra,Story,Experience'} />
	<meta property="og:title" content={`About | ${websiteName}`} />
	<meta property="og:description" content={`Tentang ${websiteName}`} />
	<meta property="og:image" content={imageLocation} />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:type" content="website" />
</svelte:head>

<div class="max-w-4xl mx-auto space-y-12 py-8">
	<section class="text-center space-y-4">
		<h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl">Tentang Saya</h1>
		<p class="text-xl text-muted-foreground">Perjalanan saya dalam dunia teknologi dan pengembangan perangkat lunak.</p>
	</section>

	<div class="grid gap-8">
		<section class="space-y-4">
			<h2 class="text-3xl font-bold tracking-tight border-b pb-2"># Permulaan</h2>
			<p class="leading-7 [&:not(:first-child)]:mt-6">
				Saya lulusan dari
				<span class="font-bold text-primary">STMIK Palcomtech (ITB Palcomtech)</span>
				jurusan Sistem Informasi (S1) dari 2017-2021 dengan IPK <span class="font-bold">3.67</span>.
				Awal saya belajar pemograman web dengan <span class="font-bold">PHP</span> dan
				<span class="font-bold">Mysql</span>, lalu dari <span class="font-bold">PHP</span> saya
				belajar tentang framework untuk <span class="font-bold">PHP</span> yaitu
				<span class="font-bold text-primary">Laravel</span>. Dengan <span class="font-bold">Laravel</span> saya
				pernah mendapatkan pekerjaan freelance dengan membuat sebuah website Company Profile
				<a class="text-primary font-bold hover:underline" href="https://www.gj-energi.co.id/" target="_blank"
					>PT. Ginting Jaya Energi</a
				>.
			</p>
		</section>

		<section class="space-y-4">
			<h2 class="text-3xl font-bold tracking-tight border-b pb-2"># Sebelum Lulus Kuliah</h2>
			<p class="leading-7 [&:not(:first-child)]:mt-6">
				Setelah saya menyelesaikan skirpsi, saya mendapatkan waktu senggang untuk membuat proyek untuk
				saya sendiri. Berawal dari melihat video youtube tentang membuat dan mempublish API di
				<a class="text-primary font-bold hover:underline" href="https://www.rapidapi.com/" target="_blank">RapidAPI</a> saya
				mencoba membuat salah satu project API saya yaitu
				<a
					class="text-primary font-bold hover:underline"
					href="https://rapidapi.com/kevinagustiansyah298-RSbcaTc-IDi/api/top-instagram-hashtag"
					target="_blank">Top Hastags Instagram</a
				>
				dengan menggunakan <span class="font-bold">Node JS</span> dan
				<span class="font-bold">Express JS</span>
				lalu saya ubah ke <span class="font-bold text-primary">Sveltekit</span> seiring berjalannya waktu dan saya sudah
				siap menggunakannya pada projek saya.
			</p>
		</section>

		<section class="space-y-4">
			<h2 class="text-3xl font-bold tracking-tight border-b pb-2"># Pengalaman Bekerja</h2>
			<div class="space-y-6">
				<div class="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
					<p class="leading-7">
						Setelah saya lulus kuliah dan wisuda pada tahun 2021, Alhamdulillah tidak perlu menunggu
						lama untuk mendapatkan pekerjaan. Saat itu saya diterima di <span class="font-bold text-primary"
							>PT. Astra Motor Palembang (Honda Motor Sumsel)</span
						>
						sebagai <span class="font-bold">Admin CRM</span>.
					</p>
				</div>
				
				<div class="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
					<p class="leading-7">
						Pekerjaan utama saya sebagai <span class="font-bold">Admin CRM</span> adalah untuk merekap
						data semua penjualan dan service motor se Sumatera Selatan dengan
						<span class="font-bold">Excel</span> untuk dijadikan sebagai data leads (petunjuk) agar konsumen
						mau datang kembali hingga menjadi retensi.
					</p>
				</div>

				<div class="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
					<p class="leading-7">
						Setelah 1 tahun bekerja sebagai <span class="font-bold">Admin CRM</span>, Alhamdulillah di
						tahun 2022 saya mendapatkan pekerjaan yang saya inginkan yaitu menjadi
						<span class="font-bold text-primary">Web Programmer</span>
						di <span class="font-bold">PT. Ciptapapan Dinamika</span>. Disini saya perlu memperdalam
						ilmu saya lagi dikarenakan saya belum pernah menggunakan
						<span class="font-bold">C#, .NET Core dan SQL Server</span>. Karena
						<span class="font-bold">C#</span>
						dan <span class="font-bold">Typescript</span> serupa tapi tak sama saya dapat beradaptasi
						dengan baik mungkin yang perlu saya pahami adalah konsep <span class="font-bold">.NET</span>
						dan <span class="font-bold">Node JS</span> yang berbeda.
					</p>
				</div>
			</div>
		</section>
	</div>
</div>
