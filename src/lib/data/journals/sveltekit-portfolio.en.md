---
title: "Building this Portfolio"
---

On Q3 2024, I decided to migrate my portfolio to a modern stack using **SvelteKit**, **Svelte 5 Runes**, and **Tailwind CSS**. 

The main challenge was achieving a balance between high-end visual design (glassmorphism, smooth animations) and incredibly fast performance for SEO. By adopting `adapter-static`, I managed to statically generate the entire site, resulting in zero runtime hydration errors and perfect Lighthouse scores.

This timeline feature you're reading right now is built by parsing Markdown files at build-time using `gray-matter` and `marked`!
