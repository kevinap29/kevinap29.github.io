# Rencana Penambahan Konten Proyek Baru: Diskonin (`diskonin`)

- **Tanggal:** 2026-11-20
- **Proyek Target:** `Diskonin`
- **Repository:** `kevinap29/diskonin` (Private)
- **Production URL:** `https://diskonin.mainapidev.web.id`
- **Branch Kerja:** `feat/add-diskonin-project`

---

## 1. Tujuan
Menambahkan proyek **Diskonin** (yang sudah rilis ke production di `https://diskonin.mainapidev.web.id`) ke dalam website portofolio `kevinap29.github.io`, mencakup:
1. Direktori Proyek (`/project`) & Featured Projects di halaman Beranda (`/`).
2. Halaman Studi Kasus Mendalam (`/project/diskonin`) dalam Bahasa Indonesia & Bahasa Inggris.
3. Entri Timeline Perjalanan Developer (`/journal`).
4. Pembaruan otomatis `static/sitemap.xml` dan unit test integritas konten (`src/index.test.ts`).

---

## 2. Checklist File yang Akan Ditambahkan / Diperbarui

### A. Aset Gambar (`static/img/`)
- [x] Tangkap screenshot resolusi tinggi (`1280x720` @ 2x) langsung dari `https://diskonin.mainapidev.web.id` ke [static/img/diskonin.png](../../static/img/diskonin.png) via Puppeteer.

### B. Lokalisasi Terjemahan (`messages/en.json` & `messages/id.json`)
- [x] Tambahkan key deskripsi proyek `project_diskonin_desc` di [messages/en.json](../../messages/en.json) dan [messages/id.json](../../messages/id.json).
- [x] Tambahkan key judul jurnal `journal_diskonin_title` di [messages/en.json](../../messages/en.json) dan [messages/id.json](../../messages/id.json).
- [x] Jalankan `npm run paraglide:compile`.

### C. Store Data Proyek (`src/lib/data/store/project-store.svelte.ts`)
- [x] Tambahkan objek proyek **Diskonin** ke `initialProjects` di [src/lib/data/store/project-store.svelte.ts](../../src/lib/data/store/project-store.svelte.ts):
  - `url`: `'https://diskonin.mainapidev.web.id'`
  - `image`: `'/img/diskonin.png'`
  - `name`: `'Diskonin'`
  - `slug`: `'diskonin'` (otomatis via `generateSlug`)
  - `descKey`: `'project_diskonin_desc'`
  - `dateCreated`: `new Date(2026, 10, 3, 0, 0, 0)` (3 November 2026, sesuai `createdAt` repo GitHub)
  - `dateFinished`: `'Sekarang'`
  - `type`: `'public'` (memiliki live production web app)
  - `tags`: `['.NET 10', 'C#', 'MAUI Hybrid Blazor', 'SQLite', 'Tailwind CSS', 'Python']`
- [x] Masukkan `'diskonin'` ke daftar `featuredProjectSlugs` agar tampil di urutan teratas halaman Beranda (`/`).

### D. Artikel Case Study Markdown (`src/lib/data/projects/`)
*(Catatan: Tanpa frontmatter YAML, sesuai aturan unit test di [src/index.test.ts](../../src/index.test.ts#L10-L35)).*
- [x] Buat [src/lib/data/projects/diskonin.en.md](../../src/lib/data/projects/diskonin.en.md) (meliputi *The Challenge*, *Technical Implementation*, *Key Features*, dan *The Outcome* berdasarkan `TECH_SPEC.md` & `AGENTS.md`).
- [x] Buat [src/lib/data/projects/diskonin.id.md](../../src/lib/data/projects/diskonin.id.md) (meliputi *Tantangan*, *Implementasi Teknis*, *Fitur Utama*, dan *Hasil Akhir* berdasarkan `TECH_SPEC.md` & `AGENTS.md`).

### E. Entri Developer Journal (`src/lib/data/store/journal-store.svelte.ts` & `src/lib/data/journals/`)
- [x] Tambahkan entri `launch-diskonin` (`2026-11-11`) ke `initialJournals` di [src/lib/data/store/journal-store.svelte.ts](../../src/lib/data/store/journal-store.svelte.ts).
- [x] Buat [src/lib/data/journals/launch-diskonin.en.md](../../src/lib/data/journals/launch-diskonin.en.md) dan [src/lib/data/journals/launch-diskonin.id.md](../../src/lib/data/journals/launch-diskonin.id.md).

---

## 3. Verifikasi & Quality Gate
- [x] `npm run paraglide:compile` (exit code `0`)
- [x] `npm run generate:sitemap` (memastikan `/project/diskonin/` masuk ke `static/sitemap.xml` — total 20 URL)
- [x] `npm run check` (`0 errors and 0 warnings`)
- [x] `npm run lint` (`prettier --check . && eslint .` exit code `0`)
- [x] `npm run test:unit` (`vitest run` — memverifikasi `diskonin.en.md` & `diskonin.id.md` bebas frontmatter & valid)
- [x] `npm run build` (`vite build` + `@sveltejs/adapter-static`)
