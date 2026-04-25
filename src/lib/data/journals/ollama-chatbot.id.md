---
title: "Chatbot AI Lokal dengan Ollama dan Svelte"
---

Saya mengintegrasikan *Large Language Model* (LLM) lokal ke dalam antarmuka web menggunakan **Ollama** dan **Svelte**. Tantangannya adalah mengelola respons teks yang mengalir (*streaming*) dengan mulus di UI. Dengan memanfaatkan reaktivitas Svelte dan Streams API, saya mencapai efek mengetik seperti ChatGPT yang berjalan sepenuhnya secara lokal tanpa biaya API eksternal.