---
title: 'Meluncurkan SveltStart AI: Boilerplate AI SaaS Produksi Berbasis Svelte 5 Runes'
---

Merilis **SveltStart AI** (`https://sveltstart-ai.mainapidev.web.id`), boilerplate komersial AI SaaS yang dibangun dengan **SvelteKit 3**, **Svelte 5 Runes**, **Tailwind CSS v4**, **PostgreSQL + Drizzle ORM**, **Better Auth**, serta sistem pembayaran **Polar.sh**.

Sorotan teknis utama:

- **Streaming AI Multi-Provider (Vercel AI SDK v7)**: Pipeline streaming chat terpadu lintas OpenAI, Anthropic, dan OpenRouter dengan penyimpanan riwayat percakapan di PostgreSQL serta rendering Markdown.
- **Better Auth Mandiri & Dukungan Transaction Pooler**: Autentikasi berbasis Drizzle (Email/Password + OAuth Google & GitHub) yang dikonfigurasi dengan `prepare: false` untuk kompatibilitas transaction pooler Supabase/Supavisor.
- **Monetisasi Polar.sh MoR & Keamanan Webhook**: Integrasi `@polar-sh/sdk` untuk checkout, customer portal, dan penanganan webhook yang dilengkapi pengujian unit penolakan signature tidak valid dengan Vitest.
- **Validasi Zod 4 Khusus Server**: Menjaga skema validasi tetap berada di sisi server agar ukuran bundle client tetap ramping dan cepat.
