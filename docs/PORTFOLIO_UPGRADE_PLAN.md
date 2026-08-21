# Portfolio Upgrade Plan: AI-Native Platform Architect

## Outcome

Evolve the portfolio from a visually strong “Senior Full-Stack Java/DevOps” landing page into an evidence-led portfolio for:

- Principal AI-Native Platform Architect
- Staff/Principal Software Engineer
- Principal Data Platform or MDM Architect
- Integration Architect
- AI Evaluation / LLM Quality Engineer

The visual identity can remain technical and terminal-inspired, but the information architecture must communicate architecture judgment, AI augmentation, measurable delivery, governance, and the ability to turn legacy enterprise systems into reliable platforms.

## Current assessment

The repository is a public GitHub Pages Vite application at `anupdavin/portfolio-full-stack`, currently aligned with the `main` commit `0b89d40df63454eaf6fe33465aeff6e7d0ada3ab`.

Strengths:

- Strong first-impression visual language and recognizable terminal theme.
- React, TypeScript, Vite, Framer Motion, responsive sections, and a local knowledge assistant.
- Relevant enterprise foundations: Java, Spring, Kafka, databases, containers, Kubernetes, cloud, and CI/CD.
- Existing GitHub Pages deployment path and reusable section components.

Credibility and product risks to address before a public refresh:

- The public narrative says “Senior Full-Stack Java Architect” but does not yet surface the newer AI + data + platform positioning.
- The assistant previously downloaded and ran a small GPT-2 model in the browser. The active branch now uses deterministic local retrieval with source labels, prompt-injection refusal behavior, and an explicit no-evidence fallback; a hosted model adapter remains optional future work.
- Percentage-based “proficiency” scores imply precision without an assessment method. Replace them with evidence tags, depth labels, and linked case studies.
- The public page contains placeholder or overly broad destinations such as a generic resume link, generic GitHub link, and generic Calendly link.
- The current contact form displays a successful-send alert without a delivery integration. It must either open a real mail workflow or clearly state that it is a draft/contact handoff.
- The repository contains a duplicate legacy `portfolio-app` tree. It is not the active Vite entrypoint and should eventually be archived or removed after confirming no deployment dependency.
- Claims and dates need one source of truth. Remove invented or stale figures and label illustrative architecture demos as illustrative.

## North-star information architecture

### 1. Hero: outcome before technology

Recommended message:

> Principal AI-Native Platform Architect building reliable Java, data, cloud, and agent-augmented systems for regulated enterprises.

The first viewport should answer four questions immediately:

1. What level is Anup operating at?
2. What hard problems does he solve?
3. What evidence proves it?
4. What should a recruiter, CTO, or client do next?

Keep the terminal command as a visual cue, but pair it with plain language and a single primary CTA: `View architecture case studies`.

### 2. Proof bar

Use only numbers that can be defended from a resume, project record, or approved public case study. Prefer:

- years and role scope;
- systems modernized;
- transaction/event scale where approved;
- deployment or reconciliation improvements;
- reliability, security, or compliance outcomes;
- teams, stakeholders, or delivery ownership.

Avoid “lines of code,” unsupported satisfaction scores, and generic project counts. They do not demonstrate seniority as effectively as architecture decisions and outcomes.

### 3. Capability map

Replace skill percentages with five capability groups:

| Capability | Evidence to show |
| --- | --- |
| AI-native engineering | RAG assistant, prompt/version control, evaluation set, guardrails, model/provider boundary |
| Platform engineering | Java 21/25, Spring Boot, Kubernetes, AKS/AWS, CI/CD, supply-chain/security gates |
| Data and MDM | TIBCO EBX, Boomi DataHub, CDC, Kafka, reconciliation, data quality, stewardship |
| Distributed systems | Outbox, idempotency, exactly-once boundaries, saga/workflow, observability |
| Enterprise delivery | MAS TRM/PCI-DSS context, stakeholder alignment, modernization sequencing, operational handover |

Each group should link to at least one project or architecture artifact.

### 4. Case studies, not generic project cards

Prioritize four deep case studies:

1. **Person MDM / EBX container modernization** — legacy EBX/JBoss/JDK 8 to EBX 6.2.2 container edition, Maven, JDK 21, Tomcat, Kubernetes, MS SQL, CI/CD and security gates. Clearly mark confidential details and use sanitized diagrams.
2. **RAG knowledge assistant** — ingestion, chunking, embeddings, retrieval, citations, fallback behavior, evaluation cases, and cost/latency trade-offs.
3. **Agent-augmented engineering workflow** — GitHub Copilot, Claude Code, Codex, custom agents, tool permissions, human review, and measurable productivity/quality outcomes.
4. **Event-driven reconciliation or payment platform** — Kafka, CDC, idempotency, outbox, retries, exactly-once boundaries, observability, and regulated delivery.

Every case study should use the same structure:

`Context → Constraints → Architecture → Key decisions → Failure modes → Outcome → What I would improve next`

### 5. AI Engineering Lab

Create a dedicated interactive section with three small, honest demonstrations:

- **Retrieval demo:** ask a question, show retrieved source cards, answer, confidence/fallback, and the evaluation case ID.
- **Agent workflow demo:** show a static or locally simulated plan/execute/review trace; never imply a live production tool call when it is not one.
- **Evaluation dashboard:** show a small golden dataset with answerability, groundedness, citation coverage, refusal/guardrail behavior, latency, and cost fields.

The public site should not expose provider keys or call privileged enterprise systems. A hosted model adapter can be added later behind a small backend; the default demo must work offline from curated, versioned content.

### 6. Leadership and working style

Add a short section showing how Anup works:

- clarify the business invariant;
- map the current system and migration seams;
- choose the smallest safe architecture step;
- instrument before optimizing;
- use AI for acceleration with human review and tests;
- leave behind documentation, runbooks, and ownership.

This is more persuasive for principal roles than another technology logo wall.

## AI architecture direction

### Phase A: deterministic, local-first assistant

- Store portfolio facts in typed JSON/TypeScript records with source IDs and last-reviewed dates.
- Use lexical or embedding retrieval over those records.
- Return source cards and a clear “not in the portfolio evidence” fallback.
- Keep generation optional. If enabled, use a backend adapter with server-side secrets and request limits.
- Add an evaluation fixture with representative recruiter, client, and adversarial questions.
- Add prompt-injection-resistant behavior: retrieved content is data, never instructions; do not reveal hidden prompts or private contact data unless the user intentionally selects an approved contact path.

### Phase B: agent and MCP demonstration

Use a sandboxed, read-only demonstration with mock tools such as:

- `list_case_studies`
- `retrieve_architecture_decision`
- `compare_delivery_options`
- `summarize_evidence`

Show the tool schema, trace, approval boundary, and result. Do not connect the public site directly to GitHub, email, databases, or employer systems.

### Phase C: observable and governable AI

When a backend exists, instrument model calls, retrieval, tool calls, latency, token usage, errors, and evaluation scores. Keep PII and prompt content out of logs by default. Add a short “AI safety and governance” note referencing the risk controls used in the demo.

## Local verification sandbox

The repository now has a local-only verification lane. It must remain safe to run repeatedly and must never authenticate, commit, or push.

```bash
npm run verify:local
```

The gate should:

1. validate the active app structure;
2. parse and validate the local knowledge base;
3. build to `.local-sandbox/dist` with `/` as the base path;
4. lint the active app and configuration;
5. inspect metadata, placeholder links, default template residue, and obvious secret patterns;
6. serve the isolated build on a loopback port;
7. smoke-test the HTML shell, SPA fallback, static knowledge endpoint, and built assets;
8. report bundle-size and content-quality warnings separately from hard failures;
9. leave the GitHub Pages `docs/` output untouched.

Before a branch is pushed, use this sequence:

```bash
git status --short
npm ci
npm run verify:local
git diff --check
```

Only after the local gate passes should a feature branch be pushed and a GitHub Actions check be allowed to run. The production build remains a separate deliberate step because it writes the GitHub Pages `docs/` directory.

## Delivery sequence

### Milestone 0 — baseline and credibility (completed in this branch)

- Make `verify:local` deterministic and useful.
- Make the active app lint-clean.
- Remove or explicitly report placeholder links, fake-success contact behavior, stale identity claims, and default template residue.
- Establish a single typed content source in `src/content/portfolio.ts`.

### Milestone 1 — positioning and content (completed in this branch)

- Rewrite hero, metadata, navigation labels, About section, and contact CTA for principal AI + platform positioning.
- Replace percentage skill cards with evidence-backed capability cards.
- Add sanitized EBX/MDM, RAG, agent workflow, and event-driven case studies.

### Milestone 2 — AI lab (first implementation completed; extend later)

- Replace the GPT-2-first experience with deterministic retrieval plus an optional future model adapter.
- Add source labels, an explicit no-evidence fallback, prompt-injection refusal behavior, and an offline demo mode.
- Expose a static retrieve → augment → evaluate trace with explicit tool and approval boundaries in the AI Lab section.

### Milestone 3 — quality and observability

- Add route/interaction checks, mobile layout checks, reduced-motion behavior, keyboard navigation, and accessibility assertions.
- Add bundle budgets and an explicit decision about whether browser embeddings remain justified.
- Add optional backend tracing and evaluation reporting.

### Milestone 4 — public release

- Run the local gate on a clean checkout.
- Review all public claims and links manually.
- Push a feature branch and inspect the GitHub Pages deployment.
- Keep rollback simple: one focused pull request per milestone.

## Definition of done for the refreshed portfolio

- A recruiter can understand the role target and differentiator in ten seconds.
- A technical reviewer can inspect at least four credible architecture case studies.
- AI work is demonstrated through retrieval, evaluation, tool boundaries, and operational thinking—not only a chatbot badge.
- Every quantitative claim has an evidence source or is labelled illustrative.
- The site works without a model download or provider key.
- Local verification passes with no hard failures or quality warnings.
- Mobile, keyboard, reduced-motion, and direct GitHub Pages navigation have been checked.
- No private employer data, credentials, or unapproved client details are published.

## Reference standards

- [Model Context Protocol tools](https://modelcontextprotocol.io/specification/2026-07-28/server/tools)
- [Model Context Protocol resources](https://modelcontextprotocol.io/specification/2026-07-28/server/resources)
- [OpenTelemetry GenAI observability](https://opentelemetry.io/blog/2026/genai-observability/)
- [NIST Generative AI Risk Management Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)
