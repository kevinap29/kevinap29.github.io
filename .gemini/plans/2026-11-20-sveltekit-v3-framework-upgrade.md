# Rencana Upgrade Framework: Migrasi SvelteKit 3 & Ekosistem

- **Tanggal:** 2026-11-20
- **Proyek:** `kevinap29.github.io`
- **Status:** Deferred (Menunggu dukungan `peerDependencies` `@sveltejs/kit@^3.0.0` pada `@sveltejs/adapter-static` dan `bits-ui` / `runed`)

---

## 1. Latar Belakang & Kondisi Saat Ini

Pasca-penyelesaian rencana [2026-11-19-website-audit-fixes.md](./2026-11-19-website-audit-fixes.md), seluruh dependency produksi (`npm audit --omit=dev`) sudah mencapai **`0 vulnerabilities`**, dengan versi utama yang terpasang:

| Paket | Versi Terpasang | Status |
| :--- | :--- | :--- |
| `node` (Lokal / CI) | `v26.13.1` / `24` | Aktif |
| `svelte` | `5.58.0` | Ter-patch (`0` advisory) |
| `vite` / `@sveltejs/vite-plugin-svelte` | `8.3.8` / `7.3.1` | Ter-patch (`0` advisory) |
| `vitest` | `5.1.1` | Ter-patch (`0` advisory) |
| `zod` | `4.6.7` | Ter-patch (`0` advisory) |
| `@sveltejs/kit` | `2.70.4` | Terikat di v2 oleh peer dependency ekosistem |
| `@sveltejs/adapter-static` | `3.0.11` | `peerDependencies: { "@sveltejs/kit": "^2.0.0" }` |
| `bits-ui` (transitif `runed`, `svelte-toolbelt`) | `2.21.0` | `runed` meminta `peerDependencies: { "@sveltejs/kit": "^2.0.0" }` |
| `eslint` / `@eslint/js` | `9.39.5` | Deprecated warning (ESLint v10 sudah rilis; menunggu `eslint-plugin-svelte` mendukung `eslint@^10`) |

---

## 2. Rincian Temuan `npm audit` yang Tersisa (Dev Dependencies)

Hasil `npm audit` penuh menyisakan **5 vulnerabilities (`1 high`, `4 low`)** yang seluruhnya berasal dari satu rantai `@sveltejs/kit <=3.1.0`:

1. **`@sveltejs/kit <=3.1.0` (Severity: High — Fix tersedia di `@sveltejs/kit@3.4.0`):**
   - `GHSA-pfhg-q3qv-9q6r`: *URL redirection to untrusted site via enhanced form submission* (`use:enhance`)
   - `GHSA-27mw-82g8-phjj`: *XSS via untrusted `cache-control` header in prerendered page*
   - `GHSA-3r8g-jcqq-3p5j`: *DoS while parsing form data from a remote function's `form`*
   - `GHSA-6cf5-gc4q-fm3x`: *Private `query.batch` functions could collide*
2. **Dampak turunan di pohon dependency (4 Low):**
   - `@sveltejs/adapter-static` (`1.0.0-next.0 - 3.0.11`)
   - `runed` (`0.32.0 - 0.37.1`)
   - `bits-ui` (`>=2.11.8`)
   - `svelte-toolbelt` (`>=0.10.6`)

### Analisis Risiko pada `kevinap29.github.io`
- **Risiko Produksi: Nol (`0`).** Website ini di-compile menjadi file HTML/CSS/JS statis murni di folder `build/` menggunakan `@sveltejs/adapter-static` dan di-deploy ke GitHub Pages tanpa server Node.js runtime.
- Keempat celah pada `@sveltejs/kit <=3.1.0` tidak pernah tersentuh oleh kode aplikasi karena:
  - Formulir `/contact` mengirim request langsung dari browser ke `https://api.web3forms.com/submit` (tidak memakai SvelteKit Form Actions / `use:enhance`).
  - Prerendering hanya membaca file Markdown lokal (`src/lib/data/projects/*.md` & `src/lib/data/journals/*.md`), bukan meneruskan header `cache-control` dari server eksternal.
  - Fitur eksperimental SvelteKit *Remote Functions* (`form` dan `query.batch`) tidak digunakan.

### Mengapa Tidak Menggunakan `npm audit fix --force` Saat Ini
- Menjalankan `npm audit fix --force` akan memaksa instalasi `@sveltejs/kit@3.4.0` meskipun `@sveltejs/adapter-static@3.0.11` dan `runed` masih meminta `@sveltejs/kit@^2.0.0`.
- Hal ini menghasilkan konflik `ERESOLVE` yang akan menggagalkan langkah `npm ci` pada workflow GitHub Actions ([.github/workflows/ci.yml](../../.github/workflows/ci.yml#L25)).

---

## 3. Prasyarat Sebelum Memulai Upgrade (Pre-Flight Checklist)

Jalankan pengecekan berikut secara berkala di terminal lokal sebelum mengeksekusi migrasi ke SvelteKit 3:

```powershell
npm view @sveltejs/adapter-static peerDependencies
npm view runed peerDependencies
npm view bits-ui dependencies
npm view eslint-plugin-svelte peerDependencies
```

- [ ] `@sveltejs/adapter-static` sudah merilis versi yang mendukung `@sveltejs/kit: "^3.0.0"` (atau `"^2.0.0 || ^3.0.0"`).
- [ ] `runed` (dan `bits-ui`) sudah merilis versi yang mendukung `@sveltejs/kit: "^3.0.0"`.
- [ ] *(Opsional)* `eslint-plugin-svelte` sudah mendukung `eslint: "^10.0.0"` di `peerDependencies`.

---

## 4. Rencana Tahapan Eksekusi Upgrade

### Tahap 1 — Upgrade `@sveltejs/kit` v3 & Ekosistem Komponen
- [ ] Perbarui spesifikasi di [package.json](../../package.json):
  - `"@sveltejs/kit": "^3.4.0"`
  - `"@sveltejs/adapter-static"` ke versi terbaru yang mendukung SvelteKit 3
  - `"bits-ui"` ke versi terbaru yang menarik `runed` dengan dukungan SvelteKit 3
- [ ] Jalankan `npm install` (tanpa `--force` / `--legacy-peer-deps`) dan pastikan `npm ls --depth=0` keluar dengan exit code `0`.

### Tahap 2 — Penyesuaian Kode & Konfigurasi SvelteKit 3
- [ ] **[svelte.config.js](../../svelte.config.js):** Verifikasi opsi `adapter-static` (`fallback: '404.html'`), `kit.paths` (`base`, `relative: false`), dan `kit.prerender.entries`.
- [ ] **[vite.config.ts](../../vite.config.ts):** Pastikan plugin `sveltekit()` berjalan normal bersama `@tailwindcss/vite` dan `vitest/config`.
- [ ] **Server Load & Routing (`src/routes/**`):**
  - Verifikasi [src/routes/+layout.server.ts](../../src/routes/%2Blayout.server.ts) (`prerender = true`, `trailingSlash = 'always'`).
  - Verifikasi signature `PageServerLoad` dan helper `error(404, ...)` di [src/routes/(app)/project/[slug]/+page.server.ts](../../src/routes/%28app%29/project/%5Bslug%5D/%2Bpage.server.ts) serta [src/routes/(app)/journal/+page.server.ts](../../src/routes/%28app%29/journal/%2Bpage.server.ts).
  - Verifikasi pemakaian `$app/state` (`page`), `$app/paths` (`base`), dan `$app/navigation` (`onNavigate`, `replaceState`).

### Tahap 3 — (Opsional) Upgrade ESLint v9 ke ESLint v10
- [ ] Jika `eslint-plugin-svelte` sudah mendukung ESLint v10, naikkan `"eslint"` dan `"@eslint/js"` di [package.json](../../package.json) ke `"^10.0.0"` (`@typescript-eslint/*@8.73.0` dan `eslint-config-prettier@10.1.8` saat ini sudah mendukung ESLint v10).
- [ ] Verifikasi [eslint.config.js](../../eslint.config.js) dengan `npm run lint`.

### Tahap 4 — Verifikasi Akhir (Quality Gate)
- [ ] `npm audit --omit=dev` → `found 0 vulnerabilities`
- [ ] `npm audit` → `found 0 vulnerabilities`
- [ ] `npm run paraglide:compile` → PASS (exit code `0`)
- [ ] `npm run check` → PASS (`0 errors and 0 warnings`)
- [ ] `npm run lint` → PASS (`prettier --check . && eslint .` exit code `0`)
- [ ] `npm run test:unit` → PASS (`vitest run` exit code `0`)
- [ ] `npm run build` → PASS (`vite build` + `@sveltejs/adapter-static` ke `build/`)
- [ ] `npm run test:integration` → PASS (`playwright test` 2/2 passed)
