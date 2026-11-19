---
title: 'Meluncurkan Diskonin: Platform Kurasi Promo Lintas Platform dengan .NET 10 & MAUI Blazor Hybrid'
---

Meluncurkan **Diskonin** (`https://diskonin.mainapidev.web.id`), platform kurasi promo dan utilitas belanja cerdas berbasis **.NET 10 LTS**, **ASP.NET Core Blazor Server**, dan **.NET MAUI Blazor Hybrid** (Android) yang berbagi satu Razor Class Library (`Diskonin.Shared`).

Pencapaian arsitektur utama meliputi:

- **Mesin SQLite WAL Konkurensi Tinggi**: Mengonfigurasi `PRAGMA journal_mode = WAL` dengan write coalescing berbasis `System.Threading.Channels` serta batch `SqliteTransaction` untuk menangani analitik klik berfrekuensi tinggi tanpa penguncian database.
- **Pipeline Ingesti Python & C# Terpusat**: Otomatisasi kurasi produk dari Shopee Collection dan Telegram Ops di 25 kategori dengan inferensi prioritas harga berbobot serta proteksi anomali anti-kehilangan data.
- **Utilitas Belanja Cerdas**: Membangun Grafik Histori Harga 7/30 Hari, Personal Monthly Budget Tracker, Smart Discount Calculator, dan Side-by-Side Product Comparison.
- **Deploy VPS Hemat RAM & Cloudflare Tunnel**: Berjalan di VPS Ubuntu melalui `cloudflared` langsung ke Kestrel dengan kompilasi GitHub Actions CI/CD di luar VPS, persistensi Data Protection keys, serta proteksi rate-limit pada autentikasi admin.
