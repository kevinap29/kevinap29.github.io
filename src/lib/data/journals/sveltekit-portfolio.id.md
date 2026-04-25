---
title: "Membangun Portofolio Ini"
---

Pada Q3 2024, saya memutuskan untuk memigrasikan portofolio saya ke _stack_ modern menggunakan **SvelteKit**, **Svelte 5 Runes**, dan **Tailwind CSS**. 

Tantangan utamanya adalah mencapai keseimbangan antara desain visual tingkat tinggi (seperti efek _glassmorphism_ dan animasi yang mulus) dengan performa super cepat untuk SEO. Dengan menggunakan `adapter-static`, saya berhasil melakukan *generate* seluruh situs secara statis, yang menghasilkan nol *runtime hydration error* dan skor Lighthouse yang sempurna.

Fitur garis waktu (*timeline*) yang sedang Anda baca saat ini dibangun dengan mem-_parsing_ berkas Markdown pada saat *build* menggunakan `gray-matter` dan `marked`!
