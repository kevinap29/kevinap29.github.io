---
title: 'Launching Diskonin: Cross-Platform Deal Discovery with .NET 10 & MAUI Blazor Hybrid'
---

Launched **Diskonin** (`https://diskonin.mainapidev.web.id`), a curated deal discovery and smart shopping utility platform built on **.NET 10 LTS**, **ASP.NET Core Blazor Server**, and **.NET MAUI Blazor Hybrid** (Android) sharing a single Razor Class Library (`Diskonin.Shared`).

Key architectural milestones include:

- **High-Concurrency SQLite WAL Engine**: Configured `PRAGMA journal_mode = WAL` with `System.Threading.Channels` write coalescing and batched `SqliteTransaction` commits to handle high-frequency outbound click analytics without database locking.
- **Centralized Python & C# Ingestion Pipeline**: Automated deal ingestion from Shopee Collections and Telegram Ops across 25 categories with weighted price-priority inference and zero-item anomaly protection.
- **Smart Shopping Utilities**: Built a 7d/30d Price History Graph, Personal Monthly Budget Tracker, Smart Discount Calculator, and Side-by-Side Product Comparison.
- **Low-RAM VPS & Cloudflare Tunnel Deployment**: Deployed on an Ubuntu VPS via `cloudflared` direct-to-Kestrel with off-VPS GitHub Actions CI/CD builds, persistent Data Protection keys, and rate-limited admin authentication.
