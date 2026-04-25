# PRD: Filter & Pencarian pada Halaman Project

## 1. Pendahuluan

Dokumen ini mendefinisikan persyaratan fungsional dan teknis untuk penambahan fitur pencarian dan penyaringan proyek pada halaman Project di web portofolio Kevin Agustiansyah Putra.

## 2. Tujuan

Memudahkan pengunjung untuk mengeksplorasi proyek-proyek yang telah dikerjakan dengan memberikan kontrol navigasi yang lebih baik melalui pencarian teks dan filter kategori teknologi.

## 3. User Stories

| ID    | Peran      | Keinginan                                | Alasan                                                                      |
| ----- | ---------- | ---------------------------------------- | --------------------------------------------------------------------------- |
| US-01 | Pengunjung | Mencari proyek melalui teks              | Menemukan proyek tertentu dengan cepat tanpa scrolling                      |
| US-02 | Pengunjung | Memfilter proyek berdasarkan teknologi   | Melihat spesialisasi Kevin di stack tertentu (misal: .NET saja)             |
| US-03 | Pengunjung | Memfilter proyek berdasarkan visibilitas | Membedakan antara proyek open-source (public) dan sistem internal (private) |

## 4. Persyaratan Fungsional

### 4.1. Pencarian Teks

- Input pencarian yang bersifat reaktif.
- Mencocokkan teks (case-insensitive) terhadap nama proyek dan deskripsi proyek.

### 4.2. Penyaringan Teknologi (Tags)

- Daftar kategori teknologi (tags) yang diambil secara dinamis dari data proyek.
- Pengguna dapat memilih satu atau lebih tag.
- Menampilkan proyek yang mengandung tag yang dipilih.

### 4.3. Penyaringan Visibilitas

- Opsi untuk menampilkan "Semua", "Public", atau "Private".

### 4.4. UI/UX

- Komponen input pencarian yang modern menggunakan `shadcn-svelte`.
- Layout yang responsif (tetap rapi di mobile).
- State pencarian dan filter harus sinkron dengan URL (optional but recommended) atau minimal reaktif secara lokal.

## 5. Spesifikasi Teknis

### 5.1. Perubahan Skema Data (`src/lib/data/schema.ts`)

```typescript
export const ProjectDataSchema = z.object({
	// ... existing fields
	tags: z.array(z.string()) // Field baru
});
```

### 5.2. Pembaruan Data (`src/lib/data/store/project-store.svelte.ts`)

Setiap objek proyek perlu ditambahkan array `tags`. Contoh:

```typescript
{
    name: "Website Company Profile",
    tags: ["PHP", "Laravel", "Bootstrap"],
    // ...
}
```

### 5.3. Logika Filter (Svelte 5 Runes)

Menggunakan `$state` untuk input dan `$derived` untuk hasil akhir:

```typescript
let searchQuery = $state('');
let selectedTags = $state<string[]>([]);
let visibilityFilter = $state<'all' | 'public' | 'private'>('all');

const filteredProjects = $derived(
	projectsData.all.filter((p) => {
		const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesTags = selectedTags.length === 0 || selectedTags.some((t) => p.tags.includes(t));
		const matchesVisibility = visibilityFilter === 'all' || p.type === visibilityFilter;
		return matchesSearch && matchesTags && matchesVisibility;
	})
);
```

## 6. Kriteria Penerimaan (Acceptance Criteria)

- [ ] Pengguna dapat mengetik di search bar dan grid proyek langsung terupdate.
- [ ] Pengguna dapat mengklik tag teknologi dan hanya proyek dengan teknologi tersebut yang muncul.
- [ ] Jika tidak ada proyek yang cocok, tampilkan pesan "Proyek tidak ditemukan".
- [ ] UI menggunakan komponen `shadcn-svelte` yang konsisten dengan desain saat ini.

## 7. Rencana Rilis

1. Update Data Schema & Store.
2. Implementasi UI Filter di halaman Project.
3. Integrasi logika reaktif Svelte 5.
4. Testing & QA.
