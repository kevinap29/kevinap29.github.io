---
title: 'Launching SveltStart AI: Production Svelte 5 Runes AI SaaS Boilerplate'
---

Released **SveltStart AI** (`https://sveltstart-ai.mainapidev.web.id`), a commercial AI SaaS starter boilerplate built with **SvelteKit 3**, **Svelte 5 Runes**, **Tailwind CSS v4**, **PostgreSQL + Drizzle ORM**, **Better Auth**, and **Polar.sh** billing.

Key engineering highlights:

- **Multi-Provider AI Streaming (Vercel AI SDK v7)**: Unified streaming chat across OpenAI, Anthropic, and OpenRouter with PostgreSQL conversation persistence and Markdown/code-copy support.
- **Self-Hosted Better Auth & Supabase Pooler Support**: Drizzle-backed authentication (Email/Password + Google & GitHub OAuth) with `prepare: false` transaction-pooler compatibility.
- **Polar.sh MoR Billing & Webhook Security**: Integrated `@polar-sh/sdk` checkout, customer portal, and webhook handlers verified by Vitest signature-rejection unit tests.
- **Server-Only Zod 4 Validation**: Strict boundary keeping validation schemas out of browser bundles for a lean client footprint.
