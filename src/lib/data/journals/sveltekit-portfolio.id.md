---
title: 'Membangun Portofolio Ini'
---

Pada Q3 2024, saya memutuskan untuk memigrasikan portofolio saya ke _stack_ modern menggunakan **SvelteKit**, **Svelte 5 Runes**, dan **Tailwind CSS**.

Tantangan utamanya adalah mencapai keseimbangan antara desain visual tingkat tinggi (seperti efek _glassmorphism_ dan animasi yang mulus) dengan performa super cepat untuk SEO. Dengan menggunakan `adapter-static`, saya berhasil melakukan _generate_ seluruh situs secara statis, yang menghasilkan nol _runtime hydration error_ dan skor Lighthouse yang sempurna.

Fitur garis waktu (_timeline_) yang sedang Anda baca saat ini dibangun dengan mem-_parsing_ berkas Markdown pada saat _build_ menggunakan `gray-matter` dan `marked`!
