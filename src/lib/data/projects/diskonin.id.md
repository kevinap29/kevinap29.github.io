# Tantangan

Pembeli e-commerce sering kali kewalahan oleh "harga coret" yang dinaikkan secara semu serta tautan promo yang tersebar di berbagai kanal media sosial, sehingga sulit membedakan diskon asli dari sekadar gimmick pemasaran. Di sisi rekayasa perangkat lunak, membangun platform kurasi promo lintas platform untuk Web dan Android menghadapi dua tantangan besar: regulasi ketat Google Play Store terhadap aplikasi _thin-affiliate_ serta keterbatasan RAM saat menjalankan aplikasi web .NET secara real-time di VPS Ubuntu hemat memori.

# Implementasi Teknis

Saya merancang **Diskonin** sebagai solusi multi-project **.NET 10 LTS** (`Diskonin.sln`) yang dipadukan dengan **Python 3.10+ Ingestion Engine**, berbagi satu Razor Class Library (`Diskonin.Shared`) untuk **ASP.NET Core Blazor Server** (Web) dan **.NET MAUI Blazor Hybrid** (Android).

### Keputusan Teknis Utama:

- **Shared Razor Class Library (RCL) & Zero-npm Tailwind CLI**: Seluruh komponen UI, ikon SVG Razor kustom, serta `LucideBlazor` ditempatkan di `Diskonin.Shared`. Styling dikompilasi secara statis melalui Standalone Tailwind CLI menjadi bundle minified ~33 KB (`app.css`) dengan skema Dark Mode bawaan (`Slate-950`), menghilangkan ketergantungan CDN saat runtime demi First Contentful Paint (FCP) instan serta dukungan offline di Android MAUI.
- **SQLite WAL Konkurensi Tinggi & Write Coalescing**: Database katalog (`products.db`) berjalan di atas SQLite dengan mode **WAL (Write-Ahead Logging)** (`PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL; PRAGMA busy_timeout = 10000;`). Untuk mencegah `SQLite Error 5: database is locked` pada endpoint klik publik berfrekuensi tinggi (`/out/{id}`), penulisan metrik klik di-buffer di memori menggunakan `System.Threading.Channels` dan ditulis secara periodik dalam batch `SqliteTransaction`.
- **Mesin Ingesti Terpusat & Proteksi Anomali Data**: Data produk terkurasi ditarik dari Shopee Collection dan grup Telegram internal (`Diskonin Ops`) dengan inferensi prioritas harga berbobot (`shopee_share` hingga `estimated`) di 25 kategori. Dilengkapi proteksi anomali yang membatalkan penimpaan data jika respons upstream mengembalikan 0 produk akibat perubahan skema atau pemblokiran WAF.
- **Hardening VPS Hemat RAM & Stabilitas SignalR**: Di-deploy pada VPS Ubuntu melalui **Cloudflare Named Tunnel (`cloudflared`)** langsung ke Kestrel dengan `ForwardedHeadersOptions` untuk sirkuit WebSocket SignalR Blazor Server, kunci `IDataProtectionProvider` persisten, serta guardrail Dependency Injection ketat (mencegah registrasi tipe primitif yang memutus `ComponentHub.StartCircuit`). Seluruh kompilasi binary dilakukan di **GitHub Actions CI/CD** agar tidak memicu Linux OOM Killer di VPS.

# Fitur Utama

- **Grafik Histori Harga 7 & 30 Hari**: Menampilkan riwayat perubahan harga agar pengguna dapat memverifikasi keaslian diskon secara transparan.
- **Utilitas Belanja Cerdas Mandiri**: Dilengkapi _Personal Monthly Budget Tracker_, _Smart Discount Calculator_, dan _Side-by-Side Product Comparison_ sebagai nilai tambah fungsional yang mematuhi kebijakan Google Play Store.
- **Katalog Terkurasi 25 Kategori & Video Ulasan**: Pencarian cepat, filter kategori, badge persentase diskon terverifikasi, serta embed video ulasan produk.
- **Keamanan Admin & Chrome Custom Tabs**: Endpoint `/admin/login` dilindungi rate limiter ketat (`AdminGatePolicy`) dan sesi cookie HTTP-only terenkripsi, serta pembukaan tautan eksternal di Android melalui **Chrome Custom Tabs**.

# Hasil Akhir

**Diskonin** telah beroperasi penuh di produksi pada `https://diskonin.mainapidev.web.id`, menghadirkan eksplorasi katalog promo yang sangat cepat, bebas konflik penguncian database SQLite di bawah trafik konkuren, serta efisiensi pemeliharaan satu basis kode UI untuk Web dan Android.
