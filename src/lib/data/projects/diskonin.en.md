# The Challenge

E-commerce shoppers are frequently overwhelmed by inflated "anchor prices" and fragmented promo links across social channels, making it difficult to tell whether a discount is genuine. At the same time, building a cross-platform deal discovery product for both Web and Android faces two major hurdles: strict Google Play Store policies against "thin affiliate" apps and tight memory constraints when hosting a real-time .NET web application on a low-RAM Ubuntu VPS.

# Technical Implementation

I architected **Diskonin** as a multi-project **.NET 10 LTS** solution (`Diskonin.sln`) paired with a centralized **Python 3.10+ Ingestion Engine**, sharing a single Razor Class Library (`Diskonin.Shared`) across **ASP.NET Core Blazor Server** (Web) and **.NET MAUI Blazor Hybrid** (Android).

### Key Technical Decisions:

- **Shared Razor Class Library (RCL) & Zero-npm Tailwind CLI**: All UI components, custom Razor SVG icons, and `LucideBlazor` icons live in `Diskonin.Shared`. Styling is compiled statically via the Standalone Tailwind CLI into a ~33 KB minified bundle (`app.css`) with a built-in Slate-950 dark theme—eliminating runtime CDN dependencies for instant First Contentful Paint (FCP) and offline support on Android MAUI.
- **High-Concurrency SQLite WAL & Write Coalescing**: The catalog (`products.db`) runs on SQLite in **WAL (Write-Ahead Logging)** mode (`PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL; PRAGMA busy_timeout = 10000;`). To prevent `SQLite Error 5: database is locked` on high-frequency public outbound click routes (`/out/{id}`), writes are buffered in-memory using `System.Threading.Channels` and flushed in periodic `SqliteTransaction` batches.
- **Centralized Ingestion & Anti-Data-Loss Protection**: Curated product deals are ingested from Shopee Collections and a private Telegram operations group (`Diskonin Ops`) using weighted price-priority inference (`shopee_share` down to `estimated`) across 25 categories. An anomaly guard aborts destructive overwrites if upstream GraphQL responses return zero items due to WAF blocks or schema shifts.
- **Low-RAM VPS & SignalR Hardening**: Hosted on an Ubuntu Linux VPS exposed via a **Cloudflare Named Tunnel (`cloudflared`)** directly to Kestrel with `ForwardedHeadersOptions` enabled for Blazor Server SignalR WebSockets, persistent `IDataProtectionProvider` keys, and strict DI container guardrails (preventing primitive type registrations from hijacking `ComponentHub.StartCircuit` implicit `[FromServices]` binding). All Roslyn builds run off-VPS in **GitHub Actions CI/CD** to avoid Linux OOM kills.

# Key Features

- **7-Day & 30-Day Price History Graph**: Tracks historical pricing so users can verify authentic discounts versus artificial price markups.
- **Smart Shopping Utilities**: Includes a **Personal Monthly Budget Tracker**, **Smart Discount Calculator**, and **Side-by-Side Product Comparison**—providing standalone utility compliant with Google Play Store regulations.
- **Curated 25-Category Catalog & Video Reviews**: Fast search and category filtering with embedded review videos and verified discount badges.
- **Hardened Admin Gate & Native Custom Tabs**: Rate-limited `/admin/login` (`AdminGatePolicy`) with encrypted HTTP-only session cookies on Web, and **Chrome Custom Tabs** integration on Android MAUI.

# The Outcome

**Diskonin** is live in production at `https://diskonin.mainapidev.web.id`, delivering sub-second catalog browsing, zero SQLite lock contention under concurrent traffic, and a unified codebase across Web and Android.
