---
title: 'Membangun API Validator Serba Guna'
---

Validasi data adalah bagian kritis dari aplikasi apa pun. Saya membangun **All-in-One Validator API** menggunakan **TypeScript** untuk menyediakan layanan terpusat untuk memvalidasi email, nomor telepon, dan format _string_ kustom. Tantangannya adalah memastikan latensi rendah dan _throughput_ tinggi, yang saya capai dengan mengoptimalkan ekspresi reguler (_regex_) dan men-deploy-nya di infrastruktur _edge_.
