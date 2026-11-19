# Tantangan

Tugas latar belakang harus tangguh terhadap restart server dan kegagalan. Kami membutuhkan sistem yang memberikan visibilitas jelas ke status tugas dan memungkinkan percobaan ulang serta pemantauan yang mudah.

# Implementasi Teknis

**Hangfire** diintegrasikan ke dalam ekosistem .NET yang ada, menyediakan cara yang persisten dan andal untuk mengelola pekerjaan latar belakang menggunakan SQL Server sebagai backend penyimpanan.

### Fitur Utama:

- **Pelaporan Otomatis**: Menghasilkan dan mengirimkan ringkasan kinerja harian melalui email kepada manajemen.
- **Pemeliharaan Database**: Pembersihan dan optimasi tabel log besar yang dijadwalkan.
- **Dashboard Pemantauan**: UI real-time untuk melacak tingkat keberhasilan/kegagalan tugas dan waktu eksekusi.

# Hasil Akhir

Implementasi Hangfire menghilangkan kebutuhan akan eksekusi tugas manual, menghemat sekitar 15 jam kerja per minggu dan memastikan bahwa proses bisnis kritis tidak pernah melewatkan tenggat waktu.
