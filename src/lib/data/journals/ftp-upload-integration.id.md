---
title: 'Mengoptimalkan Upload FTP'
---

Selama Q3 2023, saya ditugaskan untuk memperkuat fungsionalitas transfer file di seluruh modul GRC API (CRM, Lapak, dan General).

Sistem sebelumnya mengandalkan mekanisme upload secara massal (_batch_) yang rentan terhadap kegagalan sebagian dan _timeout_ jaringan. Saya melakukan _refactor_ pada fungsionalitas upload agar memproses file tunggal secara berurutan menggunakan **.NET Core** dan **C#**, sambil secara bersamaan mengimplementasikan lapisan verifikasi `FTPFileExists`.

Dengan menerapkan teknik pemrograman defensif dan memastikan Kode Status HTTP yang benar (seperti _Bad Request_ jika file hilang), keandalan API manajemen dokumen kami meningkat drastis, menciptakan jalur distribusi file tingkat _enterprise_ yang sangat kokoh.
