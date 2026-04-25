# PRD: Scroll to Top Feature

## Overview

Add a "Scroll to Top" button that appears when the user scrolls down the page, providing a quick way to return to the top of the content with a smooth animation.

## Goals

- Enhance user navigation on long pages (Journal, Project Details).
- Maintain the premium, minimal aesthetic of the portfolio.
- Use Svelte 5 Runes for state management.

## Technical Specifications

### Component: `ScrollToTop.svelte`

- **Path**: `src/lib/components/ScrollToTop.svelte`
- **State**:
  - `isVisible`: Boolean, controlled by a scroll event listener.
- **Logic**:
  - Show button when `window.scrollY > 300`.
  - Function `scrollToTop()` using `window.scrollTo({ top: 0, behavior: 'smooth' })`.
- **UI**:
  - Fixed position: `bottom-8 right-8`.
  - Styling: Rounded-none (matching project style), border-primary/20, bg-background/80, backdrop-blur-md.
  - Icon: `ArrowUp` from `@lucide/svelte`.
  - Transition: Svelte's `fade` and `fly` for entering/exiting.

### Layout Integration

- **Path**: `src/routes/(app)/+layout.svelte`
- **Action**: Import and place `ScrollToTop` component at the end of the layout.

## Edge Cases

- **Mobile Devices**: Ensure the button doesn't block critical mobile UI elements (though `bottom-8` is usually safe).
- **Reduced Motion**: Respect `prefers-reduced-motion` media query (standard `window.scrollTo` behavior usually handles this, but worth noting).

## UI States

- **Hidden**: `window.scrollY <= 300`.
- **Visible**: `window.scrollY > 300`.
- **Hover**: Subtle scale up and primary glow.
