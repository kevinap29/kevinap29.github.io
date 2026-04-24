# PRD - Project Case Studies (Detailed View)

## 1. Overview
Transform the current project portfolio from a simple grid of cards into a deep-dive showcase. Each project will have its own dedicated page (Case Study) to explain the technical challenges, architectural decisions, and final outcomes.

## 2. User Stories
- As a **Recruiter**, I want to read the "thought process" behind a project so I can evaluate the developer's problem-solving skills.
- As a **Visitor**, I want to see screenshots and specific tech stack details for a project to understand its complexity.
- As a **Developer (Owner)**, I want an easy way to add new case studies using Markdown without changing the UI code.

## 3. Technical Specifications

### 3.1. URL Structure
- List Page: `/project` (Existing)
* Detailed Page: `/project/[slug]` (New)

### 3.2. Data Architecture
- **Content Storage**: Local Markdown files (`.md`) stored in `src/lib/data/projects/*.md`.
- **Metadata Integration**: The existing `ProjectDataSchema` will be extended with a `slug` field to map projects to their Markdown files.
- **Parsing**: Use `mdsvex` or a simple frontmatter parser to extract metadata and content.

### 3.3. Case Study Content Schema
Each Markdown file should contain:
- **Title**: (from store)
- **Problem Statement**: What was the challenge?
- **Technical Implementation**:
    - Why this stack? (e.g., Why MAUI instead of React Native?)
    - Architecture (Diagrams if possible).
- **Key Features**: List of what was built.
- **Gallery**: Grid of images/screenshots.
- **Results**: Final outcome or link to demo.

## 4. UI/UX Design (Premium Aesthetics)

### 4.1. Case Study Page Layout
- **Hero Section**: Full-width project image with glassmorphism overlay for the title.
- **Sticky Sidebar**: Quick stats (Tech Stack, Role, Timeline, Github Link).
- **Smooth Navigation**: "Next Project" / "Previous Project" at the bottom of the page.
- **Animations**: Using Svelte transitions (`fly`, `fade`) and Tailwind animations for content reveal.

### 4.2. Shadcn Components to Use
- **Breadcrumb**: Navigation back to projects.
- **Separator**: Dividing sections.
- **AspectRatio**: For responsive project screenshots.
- **Carousel**: For the image gallery.
- **Typography**: Consistent headings and body text.

## 5. Success Criteria
- [ ] Navigating from a project card to its detail page is seamless.
- [ ] Detail page loads in < 200ms (Static Generation).
- [ ] Fully responsive on mobile (Sidebar moves to bottom/top).
- [ ] SEO: Each project page has unique Meta Tags (Title, Desc, OG Image).

## 6. Open Questions / Design Decisions
- **CMS vs Markdown**: Is Markdown acceptable, or do you prefer a headless CMS (Sanity/Strapi)? (Recommended: Markdown for speed/simplicity).
- **Image Hosting**: Should images stay in `/static/img/` or move to a CDN?
