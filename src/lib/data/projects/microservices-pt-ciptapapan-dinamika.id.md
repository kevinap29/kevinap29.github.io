---
title: Microservices PT. Ciptapapan Dinamika
problem: Seiring pertumbuhan sistem ERP, arsitektur monolitik mulai mengalami hambatan performa dan menjadi sulit untuk diskalakan secara independen.
solution: Melakukan refaktor logika bisnis kritis ke dalam arsitektur microservices modern menggunakan .NET, RabbitMQ untuk pengiriman pesan, dan Docker untuk kontainerisasi.
tech_stack:
  - .NET
  - C#
  - Microservices
  - RabbitMQ
  - Docker
---

# Tantangan

Memisahkan sistem perusahaan yang besar tanpa mengganggu operasi harian adalah tantangan teknis yang signifikan. Kami membutuhkan cara agar layanan yang berbeda dapat berkomunikasi dengan andal dan menangani lonjakan lalu lintas yang tinggi.

# Implementasi Teknis

Saya memanfaatkan **RabbitMQ** sebagai broker pesan untuk mengimplementasikan arsitektur berbasis peristiwa (event-driven). Ini memungkinkan komunikasi asinkron dan memastikan bahwa kegagalan layanan tidak akan menjatuhkan seluruh sistem.

### Keputusan Arsitektur Utama:

- **API Gateway**: Titik masuk terpusat untuk semua permintaan klien, menangani autentikasi dan perutean.
- **Service Discovery**: Diimplementasikan untuk memungkinkan layanan saling menemukan secara dinamis.
- **Dockerization**: Setiap layanan dikontainerisasi untuk memastikan perilaku yang konsisten di seluruh lingkungan pengembangan, pementasan, dan produksi.

# Hasil Akhir

Transisi ke microservices meningkatkan uptime sistem menjadi 99,9% dan mengurangi waktu respons untuk modul padat data lebih dari 60%.
