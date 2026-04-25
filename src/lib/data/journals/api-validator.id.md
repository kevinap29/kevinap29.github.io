---
title: "Membangun API Validator Serba Guna"
---

Validasi data adalah bagian kritis dari aplikasi apa pun. Saya membangun **All-in-One Validator API** menggunakan **TypeScript** untuk menyediakan layanan terpusat untuk memvalidasi email, nomor telepon, dan format *string* kustom. Tantangannya adalah memastikan latensi rendah dan *throughput* tinggi, yang saya capai dengan mengoptimalkan ekspresi reguler (*regex*) dan men-deploy-nya di infrastruktur *edge*.