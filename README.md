# Kevin Agustiansyah Putra — Portfolio Website (`kevinap29.github.io`)

Website portofolio pribadi berbasis **SvelteKit 2** dan **Svelte 5 Runes** yang di-build secara statis (`@sveltejs/adapter-static`) untuk **GitHub Pages** dan **Vercel**. Proyek ini menampilkan halaman profil, daftar proyek dengan filter interaktif, studi kasus proyek berbasis Markdown, jurnal perjalanan developer, resume siap cetak (A4 PDF), serta formulir kontak.

---

## Tech Stack

| Kategori              | Teknologi                                                                                            |
| :-------------------- | :--------------------------------------------------------------------------------------------------- |
| **Framework**         | SvelteKit 2 (`^2.0.0`), Svelte 5 (`^5.0.0`, Runes API)                                               |
| **Bahasa**            | TypeScript (`strict: true`)                                                                          |
| **Styling & UI**      | Tailwind CSS v4 (`@tailwindcss/vite`), `tw-animate-css`, Shadcn-Svelte / `bits-ui`, `@lucide/svelte` |
| **Theme**             | `mode-watcher` (Light/Dark mode, desain sharp-corner `--radius: 0rem`)                               |
| **i18n**              | `@inlang/paraglide-js` (Bahasa Inggris `en` & Indonesia `id`, client-side `localStorage`)            |
| **Konten & Validasi** | `marked`, `gray-matter`, `isomorphic-dompurify`, `zod`                                               |
| **Contact Form**      | Web3Forms API (`PUBLIC_WEB3FORMS_ACCESS_KEY`)                                                        |
| **Testing & Quality** | `svelte-check`, Vitest, Playwright, ESLint, Prettier                                                 |
| **Build & Tooling**   | `@sveltejs/adapter-static`, Puppeteer + `pdf-lib` + `fast-xml-parser` (PDF & sitemap scripts)        |

---

## Struktur Proyek

```text
.
├── .docs/specs/                  # Dokumen PRD fitur (i18n, case studies, filter, scroll-to-top)
├── .github/workflows/            # CI Quality Gate (ci.yml) & GitHub Pages Deploy (deploy.yml)
├── messages/                     # Kamus terjemahan sumber (en.json, id.json)
├── project.inlang/               # Konfigurasi Inlang Paraglide
├── scripts/                      # Utilitas CLI: generate-sitemap.js & generate-pdfs-from-sitemap.js
├── static/                       # Aset statis: img/, icon/, robots.txt, sitemap.xml, PDF CV
├── tests/                        # E2E tests Playwright (test.ts, scroll-to-top.test.ts)
└── src/
    ├── app.css                   # Konfigurasi Tailwind v4, theme tokens (oklch), @media print, .prose
    ├── app.html                  # Template HTML root
    ├── index.test.ts             # Unit test Vitest (integritas file proyek & sanitasi DOMPurify)
    ├── lib/
    │   ├── i18n.svelte.ts        # State manager i18n berbasis Svelte 5 $state & localStorage
    │   ├── utils.ts              # Helper cn(), generateSlug(), dan tipe utilitas UI
    │   ├── components/           # Komponen aplikasi (SEO, SideBar, PageHeader, ProjectFilter, Reveal, dll.)
    │   │   ├── icons/            # Ikon SVG kustom (GitHub, LinkedIn)
    │   │   └── ui/               # Komponen primitif Shadcn-Svelte (button, card, sheet, badge, dll.)
    │   ├── data/
    │   │   ├── schema.ts         # Skema Zod: ProjectDataSchema & JournalDataSchema
    │   │   ├── store/            # Store statis: project-store.svelte.ts, journal-store.svelte.ts, skills-store.svelte.ts
    │   │   ├── projects/         # Konten studi kasus Markdown: [slug].{en,id}.md (30 file)
    │   │   └── journals/         # Konten timeline jurnal Markdown: [slug].{en,id}.md (46 file)
    │   └── paraglide/            # Hasil kompilasi otomatis Paraglide-JS
    └── routes/
        ├── +layout.server.ts     # Prerender = true, trailingSlash = 'always', data profil global
        ├── +layout.svelte        # Root layout & inisialisasi CSS/i18n
        ├── +error.svelte         # Halaman error 404/500 kustom
        └── (app)/                # Route group utama dengan Sidebar, Header, Footer, & Drawers
            ├── +layout.svelte    # App shell, ModeWatcher, View Transitions, ScrollToTop, ProgressBar
            ├── +page.svelte      # Home: Hero CTA, 6 Featured Projects, Bento Grid Tech & Tools
            ├── about/            # Halaman cerita perjalanan & kolaborasi AI
            ├── contact/          # Halaman kontak & form Web3Forms dengan anti-bot client-side
            ├── journal/          # Timeline kronologis 23 aktivitas/milestone developer
            ├── project/          # Direktori 15 proyek dengan search, tag filter, & visibility filter
            ├── project/[slug]/   # Halaman detail studi kasus proyek (Markdown SSG)
            └── resume/           # Halaman CV format A4 print-ready
```

---

## Arsitektur & Cara Kerja Fitur Utama

### 1. Static Site Generation (SSG) & App Shell

- [svelte.config.js](svelte.config.js) menggunakan `@sveltejs/adapter-static` dengan `fallback: '404.html'` dan `prerender: { entries: ['*'] }`.
- [src/routes/+layout.server.ts](src/routes/+layout.server.ts) menetapkan `prerender = true`, `trailingSlash = 'always'`, dan menyalurkan metadata global (`websiteName`, `imageLocation`, `jobTitle`, `email`, `phone`, `socials`).
- [src/routes/(app)/+layout.svelte](<src/routes/(app)/+layout.svelte>) merender sticky desktop sidebar (`SideBar.svelte`), mobile slide-over sheets (`Sheet` untuk profil dan `MenuDrawer`), `PageHeader`, `PageFooter`, `LoadingProgressBar`, `ScrollToTop`, `ModeWatcher`, serta View Transitions API (`document.startViewTransition`) pada `onNavigate`.

### 2. Multi-Bahasa / i18n (`en` & `id`)

- Sumber teks berada di [messages/en.json](messages/en.json) dan [messages/id.json](messages/id.json) yang dikompilasi ke `src/lib/paraglide/`.
- Karena situs di-deploy sebagai static site di GitHub Pages tanpa server routing, [src/lib/i18n.svelte.ts](src/lib/i18n.svelte.ts) mengelola bahasa aktif (`DEFAULT_LANG = 'id'`) secara reaktif dengan `$state` dan menyimpannya di `localStorage` (`key: 'lang'`).
- Pergantian bahasa dilakukan via [LanguageSwitcher.svelte](src/lib/components/LanguageSwitcher.svelte) tanpa reload halaman.

### 3. Project Showcase, Filter & Case Studies

- **Daftar Proyek:** [src/lib/data/store/project-store.svelte.ts](src/lib/data/store/project-store.svelte.ts) menyimpan 15 proyek (`public` dan `private`) tervalidasi skema Zod ([src/lib/data/schema.ts](src/lib/data/schema.ts)), plus 6 proyek unggulan (`featuredProjects`) untuk halaman Home.
- **Filter Interaktif:** [src/routes/(app)/project/+page.svelte](<src/routes/(app)/project/+page.svelte>) dan [ProjectFilter.svelte](src/lib/components/ProjectFilter.svelte) menyediakan pencarian teks (nama & deskripsi terlokalisasi), filter multi-tag (logika OR), dan filter visibilitas (`all` / `public` / `private`).
- **Case Studies:** [src/routes/(app)/project/[slug]/+page.server.ts](<src/routes/(app)/project/%5Bslug%5D/+page.server.ts>) memuat seluruh file `/src/lib/data/projects/*.md` via `import.meta.glob(..., { query: '?raw', eager: true })`, mengonversi Markdown ke HTML menggunakan `marked`, dan membersihkannya dengan `DOMPurify.sanitize()` (`isomorphic-dompurify`).

### 4. Developer Journal (Timeline)

- [src/lib/data/store/journal-store.svelte.ts](src/lib/data/store/journal-store.svelte.ts) berisi 23 entri dengan tipe (`Launch`, `Milestone`, `Learning`, `Refactor`, `Case Study`), tanggal, repo, dan tag.
- [src/routes/(app)/journal/+page.server.ts](<src/routes/(app)/journal/+page.server.ts>) membaca `/src/lib/data/journals/*.md`, memisahkan frontmatter via `gray-matter`, mengonversi konten via `marked`, lalu menyaring HTML lewat `DOMPurify.sanitize()`.

### 5. Resume Print-Ready & Contact Form

- **Resume:** [src/routes/(app)/resume/+page.svelte](<src/routes/(app)/resume/+page.svelte>) menyusun layout CV 2 kolom berukuran A4 (`max-w-[21cm]`) dengan CSS `@media print` khusus yang menyembunyikan elemen `.no-print` dan mereset animasi `Reveal` agar tetap tercetak.
- **Contact Form:** [src/routes/(app)/contact/+page.svelte](<src/routes/(app)/contact/+page.svelte>) mengirim payload langsung dari client ke `https://api.web3forms.com/submit` dengan proteksi anti-spam client-side (honeypot `botcheck`, jeda minimal 2 detik setelah render, cooldown 30 detik antar-kirim, serta batas panjang nama 100 karakter & pesan 2000 karakter).

---

## Panduan Menambah Konten

### Menambah Proyek & Studi Kasus Baru

1. Tambahkan key deskripsi di `messages/en.json` dan `messages/id.json`, lalu jalankan `npm run paraglide:compile`.
2. Tambahkan gambar thumbnail ke `static/img/`.
3. Tambahkan entri baru pada `initialProjects` di [src/lib/data/store/project-store.svelte.ts](src/lib/data/store/project-store.svelte.ts) (slug otomatis dibentuk dari `name` lewat `generateSlug()`, atau tentukan `slug` eksplisit).
4. Buat dua file studi kasus Markdown tanpa frontmatter (disyaratkan oleh [src/index.test.ts](src/index.test.ts)):
   - `src/lib/data/projects/<slug>.en.md`
   - `src/lib/data/projects/<slug>.id.md`
5. Jalankan `npm run generate:sitemap` (atau `npm run build`) agar `static/sitemap.xml` otomatis menyertakan URL `/project/<slug>/`.

### Menambah Entri Jurnal Baru

1. Tambahkan key judul di `messages/en.json` dan `messages/id.json`, lalu jalankan `npm run paraglide:compile`.
2. Tambahkan entri ke `initialJournals` di [src/lib/data/store/journal-store.svelte.ts](src/lib/data/store/journal-store.svelte.ts).
3. Buat dua file Markdown (opsional frontmatter `title`):
   - `src/lib/data/journals/<slug>.en.md`
   - `src/lib/data/journals/<slug>.id.md`

---

## Environment Variables

| Variabel                      | Sifat                                   | Kegunaan                                                             |
| :---------------------------- | :-------------------------------------- | :------------------------------------------------------------------- |
| `PUBLIC_WEB3FORMS_ACCESS_KEY` | Wajib (saat build/runtime Contact Form) | Access key untuk mengirim pesan pada `/contact` ke Web3Forms API.    |
| `BASE_PATH`                   | Opsional                                | Prefix base path SvelteKit (`kit.paths.base` di `svelte.config.js`). |

---

## Scripts Tersedia

| Script                     | Perintah                                                              | Keterangan                                                                                                                |
| :------------------------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `npm run dev`              | `npm run paraglide:compile && vite dev --host`                        | Menjalankan dev server lokal setelah kompilasi i18n.                                                                      |
| `npm run build`            | `npm run paraglide:compile && npm run generate:sitemap && vite build` | Kompilasi i18n, generate `static/sitemap.xml` (termasuk slug proyek), dan build statis ke `build/`.                       |
| `npm run preview`          | `vite preview --host`                                                 | Preview hasil build statis (gunakan `npm run preview:open` untuk membuka browser otomatis).                               |
| `npm run check`            | `svelte-kit sync && svelte-check --tsconfig ./tsconfig.json`          | Type-check TypeScript & Svelte.                                                                                           |
| `npm run lint`             | `prettier --check . && eslint .`                                      | Cek formatting & linting.                                                                                                 |
| `npm run format`           | `prettier --write .`                                                  | Memformat kode dengan Prettier.                                                                                           |
| `npm run test:unit`        | `vitest run`                                                          | Menjalankan Vitest unit tests pada `src/`.                                                                                |
| `npm run test:integration` | `playwright test`                                                     | Menjalankan E2E tests di folder `tests/` (menjalankan `build && preview` pada port `4173`).                               |
| `npm run generate:sitemap` | `node scripts/generate-sitemap.js`                                    | Generate `static/sitemap.xml` dari rute statis `src/routes` dan slug proyek `src/lib/data/projects/*.en.md`.              |
| `npm run generate:pdf`     | `node scripts/generate-pdfs-from-sitemap.js`                          | Generate `static/portofolio_kevin_agustiansyah.pdf` via Puppeteer (otomatis menjalankan `vite preview` pada port `4173`). |

---

## CI/CD & Deployment

- **CI Quality Gate** ([.github/workflows/ci.yml](.github/workflows/ci.yml)): berjalan pada `push` dan `pull_request` ke `main` — menyuntikkan `PUBLIC_WEB3FORMS_ACCESS_KEY` (dengan fallback placeholder `ci-placeholder-key`) untuk typegen `svelte-kit sync`, lalu menjalankan `paraglide:compile`, `check`, `lint`, dan `test:unit`.
- **GitHub Pages Deploy** ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)): berjalan pada `push` ke `main` — menyuntikkan `PUBLIC_WEB3FORMS_ACCESS_KEY` dari GitHub Secrets, menjalankan `npm run build`, dan mengunggah `build/` ke GitHub Pages.

### Status Verifikasi Terakhir (2026-11-20)

- `npm audit --omit=dev`: **PASS** (`found 0 vulnerabilities`)
- `npm run check`: **PASS** (`svelte-check@4.7.8` — `0 errors, 0 warnings`)
- `npm run lint`: **PASS** (`prettier@3.10.1` + `eslint@9.39.5` flat config & `eslint-plugin-svelte@3.24.1`)
- `npm run test:unit`: **PASS** (`vitest@5.1.1` — 1 file, `4 passed` di [src/index.test.ts](src/index.test.ts))
- `npm run test:integration`: **PASS** (`playwright test` — `2 passed` dalam `52.6s` mencakup [tests/test.ts](tests/test.ts) dan [tests/scroll-to-top.test.ts](tests/scroll-to-top.test.ts))
- `npm run build`: **PASS** (`vite@8.3.8`, `generate:sitemap` 21 URL, dan `@sveltejs/adapter-static`)

---

## Status Audit Kode & Rencana Upgrade Framework

- **Audit & Perbaikan Kode (P0–P3 + Upgrade Toolchain):** Seluruh item pada [.gemini/plans/2026-11-19-website-audit-fixes.md](.gemini/plans/2026-11-19-website-audit-fixes.md) telah diselesaikan (`npm audit --omit=dev` = `0 vulnerabilities`).
- **Rencana Migrasi SvelteKit 3 & ESLint 10 (Backlog):** Panduan prasyarat dan tahapan upgrade dari `@sveltejs/kit@2.70.4` ke `@sveltejs/kit@^3.4.0` (menunggu dukungan peer dependency `@sveltejs/adapter-static` dan `bits-ui` / `runed`) terdokumentasi di [.gemini/plans/2026-11-20-sveltekit-v3-framework-upgrade.md](.gemini/plans/2026-11-20-sveltekit-v3-framework-upgrade.md).
