# Latar Belakang & Motivasi

Seiring berkembangnya asisten coding AI dari sekadar plugin pelengkap otomatis (autocomplete) menjadi alur kerja otonom (agentic workflows), tim rekayasa perangkat lunak menghadapi dua hambatan utama: **pembengkakan token (context rot)** dan **perubahan cakupan yang tidak terkontrol (scope creep)**. Tanpa batasan ketat dan spesialisasi domain, sesi interaksi LLM jangka panjang akan mengalami penurunan akurasi, memicu halusinasi yang merusak kode, dan melanggar konvensi arsitektur proyek.

Repositori **Antigravity Custom Agents** (`kevinap29/antigravity-custom-agents`) dibangun khusus untuk menjawab tantangan tersebut. Didesain secara spesifik untuk runtime multi-agent **Antigravity** dan **Gemini CLI**, repositori ini menyediakan infrastruktur teruji di lingkungan produksi yang mengubah eksperimen coding tunggal yang kacau menjadi rekayasa perangkat lunak tim yang terstruktur, disiplin, dan kolaboratif.

# Sorotan Arsitektur (Isolasi SDLC & Paralelisme Subagent)

Arsitektur ini didasarkan pada pola **Supervisor-Worker** yang memisahkan tanggung jawab di seluruh siklus hidup pengembangan perangkat lunak (SDLC):

### 1. Orkestrasi Lead Agent & Ambiguity Gate

Agent `lead` bertindak sebagai titik kontak utama dengan pengguna. Lead menerapkan **Ambiguity Gate** ketat, di mana kebutuhan bisnis, kontrak arsitektur, dan kriteria uji penerimaan harus disepakati secara tuntas sebelum kode apa pun ditulis atau dieksekusi.

### 2. Isolasi Peran melalui Subagent Spesialis

Alih-alih membebankan seluruh tugas pada satu model AI, pengerjaan didelegasikan ke subagent spesifik:

- **`system-architect`**: Merancang arsitektur sistem tingkat tinggi, ADR (Architectural Decision Records), dan batasan bounded context.
- **`frontend-mobile-dev`**: Berfokus eksklusif pada antarmuka modern (SvelteKit 2, Svelte 5 Runes, Tailwind CSS v4, Bits UI, dan .NET MAUI Hybrid Blazor).
- **`backend-dotnet-engineer`**: Menangani layanan backend, CQRS mediator, Vertical Slice Architecture, serta ekosistem .NET Core dan WebForms.
- **`database-engineer`**: Menegakkan paradigma DB-First, strategi pengindeksan, optimasi kueri, dan transaksi mutasi atomik.
- **`devops-infra-specialist`**: Mengelola stack Docker/Portainer di VPS Linux hemat RAM, registri privat Harbor, dan otomasi CI/CD.
- **`qa-code-reviewer`**: Mengaudit kode, memastikan zero regression, menegakkan analisis statis, dan memvalidasi keselarasan kontrak DTO sebelum rilis.
- **`debugger`**: Spesialis analisis akar masalah (root-cause analysis) untuk membaca log, call stack, dan exception runtime.
- **`technical-writer`**: Menjaga sinkronisasi dokumentasi teknis, catatan rilis, dan referensi API dengan basis kode.

### 3. Pesan Asinkron & Reactive Wakeup

Seluruh subagent beroperasi secara konkuren menggunakan protokol pesan internal (`send_message`), memungkinkan eksekusi tugas paralel tanpa polling berulang atau pemborosan giliran inferensi (turns).

# Modul Repositori (Agents, Domain Skills, Plugin RTK, GEMINI.md)

Repositori ini menyediakan ekosistem pengembangan perangkat lunak siap pakai yang lengkap:

### Skill Domain

- **`dotnet-webforms-patterns`**: Pola implementasi dan verifikasi statis untuk pemeliharaan aplikasi warisan .NET Framework 4.x / ASP.NET WebForms.
- **`frontend-mobile-patterns`**: Tata kelola lifecycle, state management modern, dan praktik build untuk SvelteKit serta .NET MAUI Hybrid Blazor.
- **`portainer-harbor-deploy`**: SOP dan konfigurasi Docker Compose siap produksi yang dioptimalkan untuk VPS berspesifikasi hemat memori.

### Plugin Penghemat Token RTK

Hook pre-command yang terintegrasi secara cerdas memadatkan output stdout/stderr hingga 70–90%, mempertahankan sinyal error penting seraya memangkas kebisingan log, trace build, dan instalasi dependensi.

### Profil Pengembang Global (`GEMINI.md`)

Matriks aturan terpusat yang mengatur standar teknologi, guardrail coding (Efisiensi Token, DRY, Zero Regression, KISS, Transaksi DB Atomik), serta penanganan shell lintas platform (PowerShell vs Bash).

# Dampak Nyata

Penerapan ekosistem multi-agent ini di berbagai proyek pribadi maupun komersial menghasilkan:

- **Preservasi Konteks Optimal**: Sesi berjam-jam tetap memiliki ketajaman penalaran tanpa mengalami degradasi ke siklus pengulangan instruksi.
- **Pengiriman Kode Tanpa Regresi**: Batasan arsitektur dan gate review QA mencegah perubahan tak terotorisasi menyusup ke branch utama.
- **Kualitas Produksi Terstandardisasi**: Konsistensi penulisan kode bersih, lokalisasi bahasa, dan validasi type check yang lolos 100% pada setiap pull request.
