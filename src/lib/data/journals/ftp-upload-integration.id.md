---
title: "Mengoptimalkan Upload FTP"
---

Selama Q3 2023, saya ditugaskan untuk memperkuat fungsionalitas transfer file di seluruh modul GRC API (CRM, Lapak, dan General).

Sistem sebelumnya mengandalkan mekanisme upload secara massal (*batch*) yang rentan terhadap kegagalan sebagian dan *timeout* jaringan. Saya melakukan *refactor* pada fungsionalitas upload agar memproses file tunggal secara berurutan menggunakan **.NET Core** dan **C#**, sambil secara bersamaan mengimplementasikan lapisan verifikasi `FTPFileExists`.

Dengan menerapkan teknik pemrograman defensif dan memastikan Kode Status HTTP yang benar (seperti *Bad Request* jika file hilang), keandalan API manajemen dokumen kami meningkat drastis, menciptakan jalur distribusi file tingkat *enterprise* yang sangat kokoh.
