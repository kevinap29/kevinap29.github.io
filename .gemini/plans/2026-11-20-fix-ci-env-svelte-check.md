# Fix CI `svelte-check` Missing `$env/static/public` (`PUBLIC_WEB3FORMS_ACCESS_KEY`)

## 1. Masalah (Root Cause)
Pada GitHub Actions ([.github/workflows/ci.yml](file:///d:/Kevin/www/kevinap29.github.io/.github/workflows/ci.yml)), step `npm run check` (`svelte-kit sync && svelte-check --tsconfig ./tsconfig.json`) gagal dengan error:
```text
Error: Module '"$env/static/public"' has no exported member 'PUBLIC_WEB3FORMS_ACCESS_KEY'. (ts)
```
Hal ini terjadi karena `svelte-kit sync` membaca environment variables dari `process.env` atau file `.env` untuk men-generate tipe TypeScript modul `$env/static/public` di `.svelte-kit/ambient.d.ts`. Di GitHub Actions runner:
1. File `.env` tidak di-commit ke repository (di-ignore oleh `.gitignore`).
2. [.github/workflows/ci.yml](file:///d:/Kevin/www/kevinap29.github.io/.github/workflows/ci.yml) belum mendefinisikan `env.PUBLIC_WEB3FORMS_ACCESS_KEY` (berbeda dengan [.github/workflows/deploy.yml](file:///d:/Kevin/www/kevinap29.github.io/.github/workflows/deploy.yml#L10-L11) yang sudah memiliki blok `env`), dan pada Pull Request dari fork atau ketika secret belum diset, `${{ secrets.PUBLIC_WEB3FORMS_ACCESS_KEY }}` juga bisa bernilai kosong jika tidak diberi fallback atau jika variabel tidak terdefinisi di environment job.

## 2. Solusi Arsitektur
1. **Update [.github/workflows/ci.yml](file:///d:/Kevin/www/kevinap29.github.io/.github/workflows/ci.yml):**
   Tambahkan blok `env` pada job `quality-gate`:
   ```yaml
   env:
     PUBLIC_WEB3FORMS_ACCESS_KEY: ${{ secrets.PUBLIC_WEB3FORMS_ACCESS_KEY || 'ci-placeholder-key' }}
   ```
   Sehingga `svelte-kit sync` selalu mengenali key `PUBLIC_WEB3FORMS_ACCESS_KEY` saat men-generate tipe `$env/static/public`, baik ketika secret tersedia maupun pada PR CI check.
2. **Update [README.md](file:///d:/Kevin/www/kevinap29.github.io/README.md):**
   Sinkronkan dokumentasi bagian CI/CD & Environment Variables jika diperlukan.
