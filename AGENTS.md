# Agent Context & Repository Guide

## Stack Summary

- **Framework:** SvelteKit 2 + Svelte 5 (Runes) + Vite
- **Language & Types:** TypeScript 5, Zod
- **Styling:** Tailwind CSS v4, Bits UI, Lucide Icons
- **i18n:** Paraglide JS (`messages/en.json`, `messages/id.json`)
- **Testing:** Vitest (`npm run test:unit`), Playwright (`npm run test:integration`)
- **Static Export:** `@sveltejs/adapter-static` (`npm run build`)

## Key Commands

- Dev Server: `npm run dev`
- Compile i18n Messages: `npm run paraglide:compile`
- Type & Svelte Check: `npm run check`
- Unit Tests: `npm run test:unit`
- Production Build: `npm run build`
- Sitemap Generator: `npm run generate:sitemap`

## Repository Architecture & Content Rules

- **Projects Store:** `src/lib/data/store/project-store.svelte.ts`
- **Journals Store:** `src/lib/data/store/journal-store.svelte.ts`
- **Projects Markdown:** `src/lib/data/projects/<slug>.<lang>.md` (_Dilarang frontmatter YAML_)
- **Journals Markdown:** `src/lib/data/journals/<slug>.<lang>.md` (_Wajib frontmatter YAML dengan title_)
- **Translation Keys Parity:** Setiap penambahan key di `messages/en.json` wajib ada di `messages/id.json` agar `npm run test:unit` lolos.
