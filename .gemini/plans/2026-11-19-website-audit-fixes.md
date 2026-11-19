# TODO & Rencana Perbaikan Website (`kevinap29.github.io`)

**Tanggal Audit:** 2026-11-19  
**Basis Temuan:** Verifikasi langsung kode sumber, `.github/workflows/`, output `svelte-check`, `prettier`, `eslint`, `vitest`, dan `vite build`.

---

## P0 — Critical (Blocker CI/CD, Build Sitemap & SEO)

### 1. Perbaiki CI Quality Gate: Lint, Prettier & Unit Test
- [x] **Kecualikan file auto-generated Paraglide di Prettier:** Tambahkan `src/lib/paraglide/` ke [.prettierignore](../../.prettierignore) agar `prettier --check .` tidak gagal pada 137 file hasil kompilasi Paraglide. *(Juga ditambahkan `.gemini/` ke `.prettierignore`.)*
- [x] **Berikan konfigurasi Vitest yang benar & pisahkan dari Playwright:**
  - Ubah script `"test:unit"` di [package.json](../../package.json#L19) dari `"vitest"` menjadi `"vitest run"` agar tidak hang di CI.
  - Tambahkan konfigurasi `test: { include: ['src/**/*.{test,spec}.{js,ts}'], exclude: ['tests/**'] }` di [vite.config.ts](../../vite.config.ts) agar Vitest tidak mengeksekusi [tests/scroll-to-top.test.ts](../../tests/scroll-to-top.test.ts) milik Playwright.
- [x] **Selesaikan 82 error ESLint (`npx eslint .`):**
  - Hapus unused imports/variables di [BentoCard.svelte](../../src/lib/components/BentoCard.svelte#L11) (`span`), [GitHub.svelte](../../src/lib/components/icons/GitHub.svelte) (`i18n`), [(app)/+layout.svelte](../../src/routes/%28app%29/%2Blayout.svelte) (`currentLang`), [contact/+page.svelte](../../src/routes/%28app%29/contact/%2Bpage.svelte) (`page`, `i18n`, `err`), dan [project/[slug]/+page.svelte](../../src/routes/%28app%29/project/%5Bslug%5D/%2Bpage.svelte) (`page`).
  - Ganti `Component<any>` pada [BentoCard.svelte](../../src/lib/components/BentoCard.svelte#L13) dengan `Component<{ class?: string }>`.
  - Hapus `@ts-ignore` yang sudah tidak diperlukan pada [(app)/+layout.svelte](../../src/routes/%28app%29/%2Blayout.svelte#L27-L37).
  - Hilangkan `{@html}` pada teks terjemahan `messages/*.json` (`about_*`, `project_*_desc`), dan tambahkan `eslint-disable-next-line svelte/no-at-html-tags` berdokumen pada output Markdown yang sudah disanitasi `DOMPurify` di `project/[slug]/+page.svelte` & `TimelineItem.svelte`.
  - Atasi error `svelte/valid-compile` (`custom_element_props_identifier`) pada `src/lib/components/ui/**` dan `icons/**` dengan `'svelte/valid-compile': ['error', { ignoreWarnings: true }]` di [.eslintrc.cjs](../../.eslintrc.cjs) dan filter `onwarn` di [svelte.config.js](../../svelte.config.js).

### 2. Perbaiki SEO Prerender (`http://sveltekit-prerender/`) & `hreflang` 404
- [x] **Gunakan domain produksi eksplisit di [SEO.svelte](../../src/lib/components/SEO.svelte):**
  - Menggunakan `SITE_URL = 'https://kevinap29.github.io'` untuk `canonicalUrl` dan `imageUrl` (dengan normalisasi `base` relatif saat prerender agar tidak menjadi `http://sveltekit-prerender/` atau `io./img/...`).
- [x] **Sinkronkan tag `hreflang` dengan strategi i18n aktual:**
  - Menghapus tag `hreflang` `/id/...` yang mengarah ke 404 dari [SEO.svelte](../../src/lib/components/SEO.svelte) karena i18n menggunakan client-side `localStorage`.

### 3. Perbaiki `scripts/generate-sitemap.js` Agar Tidak Merusak `static/sitemap.xml`
- [x] **Ekspansi dynamic route `[slug]` & sinkronisasi i18n:**
  - Memperbaiki [scripts/generate-sitemap.js](../../scripts/generate-sitemap.js) untuk mengekspansi seluruh slug proyek dari `src/lib/data/projects/*.en.md` menjadi `/project/<slug>/`, melewati segmen `[slug]` literal, menormalisasi root `/` serta `trailingSlash = 'always'`, dan tidak menyertakan URL `/id/...`.

---

## P1 — High (Bug UI, Konsistensi i18n & Data)

### 4. Perbaiki Active State Navigasi & Konsistensi `${base}` Path
- [x] **Fix active link di [MenuDrawer.svelte](../../src/lib/components/MenuDrawer.svelte#L17):** Mengganti `page.url.href === url.url` dengan helper bersama `isActiveRoute(page.url.pathname, url.url)` di [src/lib/utils.ts](../../src/lib/utils.ts).
- [x] **Fix active link di [PageHeader.svelte](../../src/lib/components/PageHeader.svelte#L35):** Menggunakan `isActiveRoute(page.url.pathname, url.url)` yang menormalisasi trailing slash (`/about/` vs `/about`).
- [x] **Gunakan `${base}` secara konsisten:** Menambahkan prefix `${base}` pada `navUrls` di [(app)/+layout.svelte](../../src/routes/%28app%29/%2Blayout.svelte), `src={project.image}` & CTA di [(app)/+page.svelte](../../src/routes/%28app%29/%2Bpage.svelte), `SideBar` (`imageLocation`), `project/+page.svelte`, `project/[slug]/+page.svelte`, `about/+page.svelte`, dan `+error.svelte`, serta mengatur `kit.paths.relative: false` di [svelte.config.js](../../svelte.config.js#L26-L29) agar URL tetap root/subpath absolut (bukan `./` atau `../`) dan selaras dengan `isActiveRoute()` serta Playwright.

### 5. Rapikan i18n, Hydration Language & Konten Terjemahan
- [x] **Perbaiki sintaks Markdown mentah di Resume (ID):** Menghapus tanda `**` pada `resume_summary` di [messages/id.json](../../messages/id.json#L57) (`**.NET**` dan `**Typescript**`).
- [x] **Samakan informasi stack `Top Hashtags App`:** Menyelaraskan `project_tophashtags_app_desc` di [messages/en.json](../../messages/en.json#L71) & [messages/id.json](../../messages/id.json#L72) menjadi `MAUI Hybrid Blazor, MudBlazor, dan RapidAPI`.
- [x] **Pisahkan markup HTML dari file terjemahan:**
  - Menghapus `<span class="font-bold">` dan `<a>` dari `project_*_desc` di [messages/id.json](../../messages/id.json) (diselesaikan sejak P0).
  - Merefaktor teks ber-HTML pada `about_*` ke elemen Svelte biasa tanpa `{@html}` (diselesaikan sejak P0).
- [x] **Lengkapi lokalisasi string yang masih hardcoded English:**
  - [project/[slug]/+page.svelte](../../src/routes/%28app%29/project/%5Bslug%5D/%2Bpage.svelte), [contact/+page.svelte](../../src/routes/%28app%29/contact/%2Bpage.svelte), [ProjectFilter.svelte](../../src/lib/components/ProjectFilter.svelte), dan [+error.svelte](../../src/routes/%2Berror.svelte) seluruhnya sudah terlokalisasi via Paraglide (`en` & `id`).
- [x] **Sinkronkan default locale & hapus duplikasi `i18n.init()`:**
  - Menyelaraskan `<html lang="id">` di [src/app.html](../../src/app.html#L2) dengan `DEFAULT_LANG = 'id'`, serta memperbarui `document.documentElement.lang` pada `init()` & `switchTo()` di [i18n.svelte.ts](../../src/lib/i18n.svelte.ts) (plus `{ reload: false }` pada `setLocale`).
  - Memanggil `i18n.init()` hanya satu kali di [src/routes/+layout.svelte](../../src/routes/%2Blayout.svelte) (`onMount`) dan menghapus duplikasinya di [(app)/+layout.svelte](../../src/routes/%28app%29/%2Blayout.svelte).
  - Menghapus `{#key i18n.current}` dari [(app)/+layout.svelte](../../src/routes/%28app%29/%2Blayout.svelte) dan memastikan seluruh pemanggilan `m.*()` (termasuk `skills-store.svelte.ts` dan perbaikan argumen `{ locale: i18n.current }` di `resume/+page.svelte`) reaktif terhadap `i18n.current`.

### 6. Perbaiki Logic Retry pada Contact Form
- [x] **Pindahkan `lastSubmittedAt = Date.now()`:** Pada [contact/+page.svelte](../../src/routes/%28app%29/contact/%2Bpage.svelte), mencatat `lastSubmittedAt` hanya ketika `result.success === true` sehingga kegagalan jaringan bisa langsung di-retry.

---

## P2 — Medium (UX Polish, Aset & Fitur Tertunda)

- [x] **Sinkronkan filter proyek ke URL Query Params:** Pada [project/+page.svelte](../../src/routes/%28app%29/project/%2Bpage.svelte), membaca `q`, `tags`, dan `type` saat `onMount` dan memperbarui URL query string secara reaktif via `replaceState` (`$app/navigation`) agar filter bisa di-share dan bertahan saat navigasi balik dari halaman detail.
- [x] **Tambahkan navigasi Next/Previous Project & Gallery pada Case Studies:** Menambahkan field opsional `gallery?: string[]` pada `ProjectDataSchema` ([src/lib/data/schema.ts](../../src/lib/data/schema.ts)), merender komponen `Carousel` galeri serta navigasi **Previous / Next Project** di bagian bawah [project/[slug]/+page.svelte](../../src/routes/%28app%29/project/%5Bslug%5D/%2Bpage.svelte).
- [x] **Perbaiki [static/icon/site.webmanifest](../../static/icon/site.webmanifest) & link di `app.html`:** Mengisi `name` & `short_name`, mengoreksi path ikon menjadi `/icon/android-chrome-*.png`, serta menambahkan `<link rel="apple-touch-icon" ... />` dan `<link rel="manifest" href="%sveltekit.assets%/icon/site.webmanifest" />` di [src/app.html](../../src/app.html).
- [x] **Rapikan penggunaan `highlight.js`:** Menghapus import `highlight.js` dan `github-dark.css` yang tidak terpakai dari [src/routes/+layout.svelte](../../src/routes/%2Blayout.svelte) (hasil audit memastikan `0` blok kode fenced pada seluruh file Markdown di `src/lib/data/projects/` dan `src/lib/data/journals/`).
- [x] **Perjelas copywriting & link repo di Journal:** Memperbarui `journal_intro` di [messages/en.json](../../messages/en.json) & [messages/id.json](../../messages/id.json) sebagai catatan tonggak pencapaian engineering, dan menjadikan `journal.repo` di [TimelineItem.svelte](../../src/lib/components/TimelineItem.svelte) tautan klikable ke GitHub untuk repositori publik (`kevinap29/*`).
- [x] **Tambahkan [.env.example](../../.env.example):** Mendokumentasikan `PUBLIC_WEB3FORMS_ACCESS_KEY` dan `BASE_PATH`.
- [x] **Kurangi kerapuhan E2E test di [tests/test.ts](../../tests/test.ts):** Mengambil ekspektasi teks secara dinamis dari kamus `messages/id.json` / `messages/en.json` berdasarkan atribut `<html lang>` serta memverifikasi tautan proyek unggulan secara fleksibel.

---

## P3 — Low (Cleanup, Dead Code & Optimasi Dependensi)

- [x] **Hapus dead code sisa SSR/Skeleton UI:**
  - Menghapus `src/hooks.server.ts` dan `src/lib/@server.ts`, membersihkan [src/lib/index.ts](../../src/lib/index.ts), serta menghapus atribut `data-theme="crimson"` di [src/app.html](../../src/app.html).
  - Menghapus interface `SkeletonTheme` yang tidak terpakai di [src/lib/@types.ts](../../src/lib/%40types.ts).
  - Memastikan [src/routes/+layout.svelte](../../src/routes/%2Blayout.svelte) tetap terpisah sebagai root layout untuk mencakup [src/routes/+error.svelte](../../src/routes/%2Berror.svelte) tanpa duplikasi `i18n.init()` maupun `highlight.js`.
- [x] **Audit & rapikan `package.json`:**
  - [x] Pindahkan `puppeteer`, `pdf-lib`, dan `fast-xml-parser` ke `devDependencies` (hanya dipakai di skrip CLI lokal `scripts/`).
  - [x] Hapus paket tak terpakai yang sudah terverifikasi 0 import (`@inlang/paraglide-sveltekit`, `formsnap`, `autoprefixer`, `postcss`, `paneforge`, `vaul-svelte`, serta `tailwindcss-animate` beserta `@plugin "tailwindcss-animate";` di `src/app.css`). *(Dipertahankan: `@internationalized/date` sebagai required peer dependency dari `bits-ui`, serta `embla-carousel-svelte` karena dipakai di `src/lib/components/ui/carousel/`).*
- [x] **Mutakhirkan [components.json](../../components.json):** Menyesuaikan `tailwind.css` ke `"src/app.css"` dan `tailwind.config` ke `""` agar sinkron dengan setup Tailwind CSS v4.
- [x] **Audit aset font di `static/fonts/`:** Terverifikasi `0` referensi di seluruh kode dan folder `static/fonts/` (`AbrilFatface.ttf`, `Quicksand.ttf`, `SpaceGrotesk.ttf`) sudah dihapus.
- [x] **Otomatiskan server preview di [scripts/generate-pdfs-from-sitemap.js](../../scripts/generate-pdfs-from-sitemap.js):** Menjalankan `vite preview --port 4173 --strictPort` secara otomatis jika port `4173` belum aktif, menunggu server siap, lalu menghentikan proses preview di blok `finally`.

---

## Upgrade Tech Stack & Vulnerability Patching

### Hasil `npm audit` Lokal (2026-11-19)
Total temuan: **57 vulnerabilities (`3 low`, `17 moderate`, `28 high`, `9 critical`)**. *(Catatan: 622 baris awal log terminal terpotong; daftar berikut mencakup temuan yang terlihat pada output terminal).*

- **Fixable dengan `npm audit fix` (non-breaking):**
  - `svelte` (`<=5.55.6`, **moderate**) — 4 advisory XSS/ReDoS (`GHSA-f3cj-j4f6-wq85`, `GHSA-rcqx-6q8c-2c42`, `GHSA-9rmh-mm8f-r9h6`, `GHSA-pr6f-5x2q-rwfp`).
  - `undici` (`8.0.0 - 8.12.1`, **high**) — 19 advisory (DoS, cache/cookie poisoning, TLS validation bypass, response truncation).
  - `ws` (`8.0.0 - 8.20.1`, **high**) — 2 advisory (`GHSA-58qx-3vcg-4xpx`, `GHSA-96hv-2xvq-fx4p`).
  - `solid-js` (`<1.9.4`, **high**) — XSS (`GHSA-3qxh-p7jc-5xh6`).
  - `source-map-js` (`1.0.0 - 1.2.1`, **high**) — DoS (`GHSA-68fv-2mgg-jv7q`).
  - `valibot` (`<=1.4.1`, **moderate**) — `flatten()` throw (`GHSA-5qjj-4xww-7phc`).
  - `ts-deepmerge` (`<8.0.0`, **moderate**, via `sveltekit-superforms 2.0.0-alpha.1 - 2.30.1`) — prototype method override DoS (`GHSA-87mf-gv2c-c62c`).
  - `postcss-selector-parser` (`<=6.1.4`, **moderate**, via `eslint-plugin-svelte`) — 2 DoS advisory (`GHSA-w9m9-85wc-3x92`, `GHSA-rj75-hqrm-r3gf`).
- **Butuh upgrade / `--force` (breaking changes) atau penghapusan dependency:**
  - `tinypool` (`<=2.1.1`, **critical**) — Prototype Pollution to RCE (`GHSA-5gmw-xhrv-c9v3`, `GHSA-85c8-ppgw-ccpr`); fix tersedia via `vitest@5.1.1` (breaking).
  - `postcss` (`<=8.5.22`, **high**, termasuk `vite/node_modules/postcss`) — 4 advisory (`GHSA-qx2v-qp2m-jg93`, `GHSA-6g55-p6wh-862q`, `GHSA-fxqj-rqcc-2cmp`, `GHSA-r28c-9q8g-f849`); fix tersedia di `postcss@8.5.33` (outside stated range).
  - `zod` (`<4.6.6`, **high**, via `sveltekit-superforms` & `chromium-bidi`) — memory exhaustion (`GHSA-mrhx-c7xc-m3w5`); fix tersedia di `zod@4.6.7` (breaking).
  - `@typescript-eslint/*` (`6.16.0 - 8.72.2`: `parser`, `type-utils`, `utils`, `eslint-plugin`, `typescript-estree`) — rentetan temuan dari versi lama yang terikat ESLint v8.
- **Belum ada patch upstream (`No fix available`):**
  - `sha.js` (`<=2.4.11`, **critical**, via `@lix-js/client >=2.1.0` — toolchain Inlang/Paraglide) — missing type checks (`GHSA-95m3-7q98-8xr5`), tidak terekspos ke bundle runtime statis tetapi perlu dimonitor.

### Rencana Aksi Upgrade & Patching
- [x] **Jalankan `npm audit` & `npm audit --omit=dev` lokal (2026-11-19):** `npm audit` menemukan 57 vulnerabilities; `npm audit --omit=dev` (sebelum pembersihan `package.json`) menemukan 40 vulnerabilities (`3 low`, `5 moderate`, `25 high`, `7 critical`) yang sebagian besar berasal dari `puppeteer` dan `@inlang/paraglide-sveltekit`. Eksekusi `npm audit fix` tertahan `EBADENGINE` pada `isomorphic-dompurify@3.22.0` (Node lokal `v22.17.0` < syarat `^22.22.2 || ^24.15.0 || >=26.0.0`).
- [x] **Bersihkan `package.json` & selaraskan versi Node CI/Deploy:**
  - Menghapus `@inlang/paraglide-sveltekit`, `formsnap`, `autoprefixer`, dan `postcss` (0 referensi di codebase), serta memindahkan `puppeteer`, `pdf-lib`, dan `fast-xml-parser` ke `devDependencies` (hanya dipakai `scripts/`).
  - Menaikkan `node-version` di [.github/workflows/ci.yml](../../.github/workflows/ci.yml#L21) dan [.github/workflows/deploy.yml](../../.github/workflows/deploy.yml#L25) dari `20` ke `24`.
- [x] **Upgrade Node.js lokal lalu jalankan `npm install` & `npm audit fix`:**
  - Node.js lokal di-upgrade via `winget` (`OpenJS.NodeJS.LTS` -> `v26.13.1`).
  - `npm install` & `npm audit fix` menyinkronkan `package-lock.json` (`0` extraneous packages): `sha.js` dan `deepmerge-ts` (**No fix available**) terhapus sepenuhnya, sementara paket berikut naik ke versi ter-patch: `svelte@5.58.0`, `@sveltejs/kit@2.70.4`, `isomorphic-dompurify@3.22.0` (`dompurify@3.4.18`), `devalue@5.9.4`, `undici@8.12.4`, `ws@8.23.0`, `js-yaml@4.3.2` / `3.15.2`, `postcss@8.5.33`, `fast-xml-parser@5.12.1`, `puppeteer@24.43.1`, dan `@typescript-eslint/*@8.73.0`.
  - Seluruh verifikasi (`check`, `lint`, `test:unit`, `build` dalam `40.71s`, dan `test:integration` `2 passed (52.6s)`) lolos.
- [x] **Upgrade ESLint v8 (EOL) & ekosistem `@typescript-eslint` / `eslint-plugin-svelte`:**
  - Menghapus `.eslintrc.cjs` dan `.eslintignore`, menambahkan [eslint.config.js](../../eslint.config.js) (flat config), serta menaikkan ke `eslint@9.39.5`, `@eslint/js@9.39.5`, `globals@15.15.0`, `eslint-plugin-svelte@3.24.1`, `eslint-config-prettier@10.1.8`, dan `@typescript-eslint/*@8.73.0`.
  - Memperbaiki 2 temuan `svelte/no-useless-mustaches` di [project/+page.svelte](../../src/routes/%28app%29/project/%2Bpage.svelte) dan [resume/+page.svelte](../../src/routes/%28app%29/resume/%2Bpage.svelte), serta 4 anotasi tipe `$props()` Svelte 5 di `PageHero.svelte`, `ProjectFilter.svelte`, `SEO.svelte`, dan `TimelineItem.svelte` untuk `svelte-check@4.7.8`.
- [x] **Upgrade toolchain Vite / Vitest & sisa advisory di `package.json`:**
  - Menaikkan ke `vite@8.3.8`, `@sveltejs/vite-plugin-svelte@7.3.1`, dan `vitest@5.1.1` (menutup advisory `esbuild <=0.24.2` dan critical `tinypool <=2.1.1`).
  - Menaikkan ke `puppeteer@25.18.1` (menutup advisory `extract-zip`), `zod@4.6.7` (menutup advisory `zod <4.6.6`), `@types/node@24.19.2`, `highlight.js@11.12.0`, `isomorphic-dompurify@3.23.0`, serta `"overrides": { "cookie": "^0.7.2" }`.
- [x] **Bersihkan sisa paket Tailwind v3 & UI tidak terpakai:**
  - Menghapus `@plugin "tailwindcss-animate";` dari [src/app.css](../../src/app.css) (seluruh utility animasi sudah ter-cover oleh `@import 'tw-animate-css';`), serta menghapus `tailwindcss-animate`, `paneforge`, dan `vaul-svelte` dari [package.json](../../package.json) (`@internationalized/date` tetap dipertahankan karena merupakan required `peerDependency` dari `bits-ui`).

---

## Kriteria Selesai (Verification Checklist)
Status verifikasi pasca-eksekusi **P0 + P1 + Upgrade Tech Stack**:
- [x] `npm audit --omit=dev` *(PASS: `found 0 vulnerabilities`, turun dari 40 vulnerabilities)*
- [x] `npm audit` *(turun dari 57 vulnerabilities [`9 critical`, `28 high`] menjadi hanya 5 [`0 critical`, `1 high`, `4 low`] pada satu rantai dev `@sveltejs/kit <=3.1.0` yang terikat peer `bits-ui`/`runed` & `@sveltejs/adapter-static`)*
- [x] `npm run paraglide:compile` *(PASS)*
- [x] `npm run check` *(PASS: `svelte-check@4.7.8` — `0 errors and 0 warnings`)*
- [x] `npm run lint` *(PASS: `prettier@3.10.1 --check . && eslint@9.39.5 .` exit code `0`)*
- [x] `npm run test:unit` *(PASS: `vitest@5.1.1` — 1 file, 4/4 tests passed dalam `1.81s`)*
- [x] `npm run test:integration` *(PASS: `playwright test` — `2 passed` mencakup `tests/test.ts` dan `tests/scroll-to-top.test.ts`)*
- [x] `npm run build` *(PASS: `vite@8.3.8` selesai dalam `25.99s`, menghasilkan `build/` dan `static/sitemap.xml` berisi 19 URL)*
