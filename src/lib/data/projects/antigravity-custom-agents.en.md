# Background & Motivation

As AI coding assistants have grown from simple autocomplete plugins into autonomous agentic workflows, software development teams face two major bottlenecks: **context rot (token pollution)** and **unregulated scope creep**. Without strict guardrails and domain specializations, standard LLM interactions degrade over long sessions, hallucinate breaking changes, and violate established project patterns.

The **Antigravity Custom Agents** repository (`kevinap29/antigravity-custom-agents`) was created to solve these exact engineering hurdles. Designed specifically for the **Antigravity** multi-agent runtime and **Gemini CLI**, it delivers a battle-tested infrastructure that transforms single-agent chaotic hacking into structured, disciplined, and collaborative team engineering.

# Architectural Highlights (Isolated SDLC & Parallel Subagents)

The architecture is built on a **Supervisor-Worker** pattern that strictly enforces separation of concerns across the entire software development lifecycle (SDLC):

### 1. Lead Agent Orchestration & Ambiguity Gates
The `lead` agent operates as the single primary contact point with the user. It enforces an upfront **Ambiguity Gate** where requirements, architectural contracts, and acceptance test cases must be completely resolved before any code is modified or executed.

### 2. Isolated Roles via Specialized Subagents
Rather than overloading one agent with every responsibility, tasks are delegated to dedicated, single-purpose roles:
- **`system-architect`**: Produces high-level system designs, ADRs (Architectural Decision Records), and bounded context definitions.
- **`frontend-mobile-dev`**: Focuses solely on modern UI/UX stacks (SvelteKit 2, Svelte 5 Runes, Tailwind CSS v4, Bits UI, and .NET MAUI Hybrid Blazor).
- **`backend-dotnet-engineer`**: Handles backend services, CQRS mediators, Vertical Slice Architecture, and .NET Core / WebForms implementations.
- **`database-engineer`**: Enforces strict DB-First paradigms, indexing, query optimization, and atomic transaction safety.
- **`devops-infra-specialist`**: Manages Docker/Portainer stacks on memory-constrained Linux VPS, Harbor registry integration, and CI/CD pipelines.
- **`qa-code-reviewer`**: Audits pull requests, verifies zero regressions, enforces static analysis, and checks contract fidelity before deployment.
- **`debugger`**: Root-cause analysis specialist for diagnosing logs, stack traces, and runtime exceptions.
- **`technical-writer`**: Keeps documentation, release notes, and API references synchronized with codebases.

### 3. Asynchronous Messaging & Reactive Wakeups
Subagents operate concurrently using native asynchronous messaging (`send_message`), allowing parallel task execution without polling loops or wasted turns.

# Repository Modules (Agents, Domain Skills, RTK Plugin, GEMINI.md)

The repository provides a complete, turnkey developer environment:

### Domain Skills
- **`dotnet-webforms-patterns`**: Implementation and static verification patterns for legacy .NET Framework 4.x / ASP.NET WebForms applications.
- **`frontend-mobile-patterns`**: Lifecycle, state management, and build best practices for SvelteKit and .NET MAUI Hybrid Blazor.
- **`portainer-harbor-deploy`**: Production-tested SOPs and Compose configurations optimized for resource-efficient VPS deployments.

### RTK Token Optimizer Plugin
Integrated pre-command hooks compress command stdout/stderr by up to 70–90%, preserving critical error signals while eliminating verbose token waste from log outputs, build traces, and package installations.

### Global Developer Profile (`GEMINI.md`)
A centralized rule matrix that sets global tech stacks, coding guardrails (Token Efficiency, DRY, Zero Regression, KISS, Atomic DB mutations), and platform-specific shell quirks (PowerShell vs Bash).

# Real-world Impact

By deploying this multi-agent suite across personal and enterprise projects:
- **Context Preservation**: Multi-hour sessions maintain crisp reasoning without degrading into repetitive loops.
- **Zero Regression Delivery**: Architectural boundaries and mandatory QA review gates prevent unapproved changes from slipping into main branches.
- **Standardized Production Quality**: Consistent adherence to clean code, localized messages, and automated type checks across every pull request.
