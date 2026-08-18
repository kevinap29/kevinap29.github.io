# Implementation Plan: CI Quality Gate & Security Hardening

> **For Hermes:** Use the `subagent-driven-development` or `test-driven-development` skill to execute this plan task-by-task when triggered.

**Goal:** Strengthen the repository's continuous integration and safety posture by adding an automated GitHub Actions CI Quality Gate and hardening Markdown rendering plus contact form anti-abuse mechanisms.

**Architecture:**

1. **GitHub Actions Workflow (`ci.yml`):** Runs on `pull_request` and `push` to `main`. Executes type checking (`svelte-check`), linting (`eslint` + `prettier`), unit tests (`vitest`), and static build verification without publishing.
2. **Markdown Rendering Hardening:** Upgrades raw `marked.parse` usage to sanitize HTML outputs via DOMPurify/isomorphic-dompurify (or DOMPurify-backed schema sanitizer), protecting against XSS in localized case studies and journal markdown.
3. **Contact Form Protection:** Strengthens Web3Forms submission on `src/routes/(app)/contact/+page.svelte` by adding client-side rate-limiting / honeypot timestamp checks, payload length caps, and explicit error feedback before hitting the external endpoint.

**Tech Stack:** SvelteKit 2, Svelte 5, TypeScript, GitHub Actions, DOMPurify / isomorphic-dompurify, Playwright, Vitest.

---

### Task 1: Create Automated GitHub Actions CI Quality Gate

**Objective:** Ensure every PR and push passes type checking, linting, unit testing, and production build checks automatically.

**Files:**

- Create: `.github/workflows/ci.yml`
- Test: `.github/workflows/ci.yml` (local lint / workflow schema check)

**Step 1: Write workflow definition**

Create `.github/workflows/ci.yml`:

```yaml
name: CI Quality Gate

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality-gate:
    name: Typecheck, Lint & Unit Tests
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Compile translations
        run: npm run paraglide:compile

      - name: Run Svelte check
        run: npm run check

      - name: Run Linter & Formatter check
        run: npm run lint

      - name: Run Unit Tests
        run: npm run test:unit
```

**Step 2: Verify workflow file locally**

Run: `git check-ignore -v .github/workflows/ci.yml || true`
Expected: File is tracked and not ignored by `.gitignore`.

**Step 3: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add github actions quality gate workflow"
```

---

### Task 2: Harden Markdown Rendering Against XSS

**Objective:** Sanitize HTML output produced by `marked.parse` before passing it to Svelte `@html` blocks in project and journal details.

**Files:**

- Modify: `package.json`
- Modify: `src/routes/(app)/project/[slug]/+page.server.ts`
- Modify: `src/routes/(app)/journal/+page.server.ts`
- Test: `src/index.test.ts`

**Step 1: Add DOMPurify dependency**

Run: `npm install isomorphic-dompurify`

**Step 2: Add failing unit test for XSS sanitization**

Add to `src/index.test.ts`:

```typescript
import DOMPurify from 'isomorphic-dompurify';

describe('Markdown Hardening', () => {
	it('sanitizes malicious script tags from rendered HTML', () => {
		const dirtyHtml =
			'<p>Safe content</p><script>alert("xss")</script><img src="x" onerror="alert(1)">';
		const cleanHtml = DOMPurify.sanitize(dirtyHtml);
		expect(cleanHtml).not.toContain('<script>');
		expect(cleanHtml).not.toContain('onerror');
		expect(cleanHtml).toContain('<p>Safe content</p>');
	});
});
```

**Step 3: Verify test passes & apply sanitizer to load functions**

In `src/routes/(app)/project/[slug]/+page.server.ts`:

```typescript
import DOMPurify from 'isomorphic-dompurify';

// Inside load loop after marked.parse:
const rawHtml = await marked.parse(rawContent);
const cleanHtml = DOMPurify.sanitize(rawHtml);
localizedData[lang] = { content: cleanHtml };
```

In `src/routes/(app)/journal/+page.server.ts`:

```typescript
import DOMPurify from 'isomorphic-dompurify';

// Inside load loop after marked.parse:
const rawHtml = await marked.parse(content);
const cleanHtml = DOMPurify.sanitize(rawHtml);
```

**Step 4: Run checks and tests**

Run: `npm run check && npx vitest run src/index.test.ts`
Expected: PASS with zero errors.

**Step 5: Commit**

```bash
git add package.json package-lock.json src/routes/(app)/project/[slug]/+page.server.ts src/routes/(app)/journal/+page.server.ts src/index.test.ts
git commit -m "security: sanitize markdown HTML output with DOMPurify"
```

---

### Task 3: Harden Contact Form Anti-Abuse Controls

**Objective:** Protect the Web3Forms endpoint from rapid repeated submissions, spam bots, and oversized payloads.

**Files:**

- Modify: `src/routes/(app)/contact/+page.svelte`
- Test: `tests/test.ts` (or dedicated contact form integration test)

**Step 1: Add rate-limiting & timestamp honeypot state**

In `src/routes/(app)/contact/+page.svelte`:

```typescript
let formRenderedAt = $state(Date.now());
let lastSubmittedAt = $state(0);
let validationError = $state<string | null>(null);

async function handleSubmit(e: SubmitEvent) {
	e.preventDefault();
	validationError = null;

	// Anti-bot check 1: Filled honeypot
	if (formState.botcheck) {
		status = 'error';
		validationError = 'Spam detected.';
		return;
	}

	// Anti-bot check 2: Submitted too quickly (< 2 seconds after page load)
	if (Date.now() - formRenderedAt < 2000) {
		status = 'error';
		validationError = 'Please wait a moment before submitting.';
		return;
	}

	// Anti-abuse check 3: Rate limit (1 submission per 30 seconds)
	if (Date.now() - lastSubmittedAt < 30000) {
		status = 'error';
		validationError = 'Please wait 30 seconds between messages.';
		return;
	}

	// Anti-abuse check 4: Payload length caps
	if (formState.name.trim().length > 100 || formState.message.trim().length > 2000) {
		status = 'error';
		validationError = 'Name or message exceeds maximum length.';
		return;
	}

	status = 'sending';
	lastSubmittedAt = Date.now();
	// ... continue to Web3Forms fetch
}
```

**Step 2: Render validation error notice in UI**

Update form error block:

```svelte
{#if status === 'error'}
	<div class="flex items-center gap-2 text-destructive text-sm font-bold" in:fade>
		<AlertCircle class="size-4" />
		{validationError || m.form_error()}
	</div>
{/if}
```

**Step 3: Verify form behavior and run integration tests**

Run: `npm run check && npx playwright test tests/test.ts`
Expected: PASS without regressions.

**Step 4: Commit**

```bash
git add src/routes/(app)/contact/+page.svelte
git commit -m "security: add rate-limiting, length caps, and honeypot time checks to contact form"
```

---

### Task 4: Complete Verification & Final Checks

**Objective:** Execute full repository quality gate locally before push.

**Files:** None (Execution & Status Audit)

**Step 1: Run full test suite**

Run:

```bash
npm run check
npm run lint
npm run test:unit
```

Expected: All steps pass with 0 errors.

**Step 2: Commit plan & status log**

```bash
git add implementation-plan/ci-and-hardening-plan.md
git commit -m "docs: add implementation plan for CI quality gate and security hardening"
```

---

### Summary Checklist for Implementation

- [ ] Automated `.github/workflows/ci.yml` added & tested.
- [ ] `isomorphic-dompurify` installed and applied to `marked.parse` outputs.
- [ ] Contact form protected with honeypot timestamp, rate limit, and payload limits.
- [ ] Zero `svelte-check` or `eslint` warnings introduced.
