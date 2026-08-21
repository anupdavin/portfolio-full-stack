export type Accent = 'green' | 'blue' | 'purple' | 'yellow' | 'cyan'

export type ProofPoint = {
  value: string
  label: string
  color: `text-${Accent}-400`
}

export type Capability = {
  id: string
  label: string
  summary: string
  tags: string[]
  evidence: string[]
  accent: Accent
}

export type CaseStudy = {
  id: string
  title: string
  category: string
  clientType: string
  description: string
  problemsSolved: string[]
  tech: string[]
  details: {
    challenge: string
    solution: string
    impact: string
  }
  metrics: Record<string, string>
  codeSnippet: string
  status: string
  sourceNote: string
  image?: string
}

export const portfolioContent = {
  identity: {
    name: 'Anup Davin Mathivanan',
    headline: 'Principal AI-Native Platform Architect',
    roleLine: 'Staff Software Engineer • Java • Data & MDM • Cloud Platforms',
    subline: 'Distributed systems, trustworthy AI augmentation, and enterprise modernization',
    location: 'Singapore • India ties • Remote-ready',
    availability: 'Open to selective principal / staff opportunities and architecture engagements',
  },
  about: {
    summary:
      'I design and modernize the platforms behind high-stakes business workflows. My work sits at the intersection of modern Java, data and master data management, cloud-native delivery, distributed systems, and AI-assisted engineering.',
    approach:
      'The goal is not to add a chatbot to an old system. It is to make the whole delivery loop more capable: clear boundaries, reliable data, observable services, evaluated AI behavior, and human decisions where they matter.',
    principles: [
      'Evidence before hype: every public claim is labeled as production evidence, sanitized experience, or a portfolio lab.',
      'Local-first verification: builds, type checks, lint, preview routes, and content scans run before a change is pushed.',
      'Augmentation with guardrails: retrieval, tools, memory, and agents remain inspectable, permissioned, and testable.',
    ],
  },
  proofPoints: [
    { value: '9+', label: 'years in enterprise engineering', color: 'text-green-400' },
    { value: '5', label: 'legacy systems modernized', color: 'text-blue-400' },
    { value: 'JDK 21/25', label: 'modern Java delivery', color: 'text-purple-400' },
    { value: 'RAG + MCP', label: 'AI systems with guardrails', color: 'text-yellow-400' },
  ] satisfies ProofPoint[],
  capabilities: [
    {
      id: 'ai-native',
      label: 'AI-native delivery',
      summary: 'RAG, tool use, evaluation, and agent memory treated as product surfaces—not magic layers.',
      tags: ['Spring AI', 'RAG', 'MCP', 'pgvector', 'Evals'],
      evidence: [
        'Knowledge-assistant patterns with retrieval, citations, fallback behavior, and evaluation fixtures.',
        'Agent workflows with human review, token / credit guardrails, and test gates.',
      ],
      accent: 'green',
    },
    {
      id: 'platform',
      label: 'Platform engineering',
      summary: 'Cloud-native runtimes and delivery paths that make enterprise change safer to operate.',
      tags: ['Java 21/25', 'Spring Boot', 'Kubernetes', 'AKS', 'AWS'],
      evidence: [
        'Modernized services toward containerized deployment on Kubernetes, including Rancher / K3s environments.',
        'Built release paths around health checks, dependency governance, security scanning, and repeatable verification.',
      ],
      accent: 'blue',
    },
    {
      id: 'data-mdm',
      label: 'Data & MDM',
      summary: 'Master data, CDC, reconciliation, and relational persistence designed around business identity.',
      tags: ['TIBCO EBX', 'Boomi DataHub', 'Kafka / CDC', 'SQL', 'Vector data'],
      evidence: [
        'Person MDM modernization from legacy EBX / JBoss / JDK 8 operations toward containerized delivery.',
        'Reconciliation flows using CDC, idempotency, outbox, exactly-once boundaries, and saga patterns.',
      ],
      accent: 'purple',
    },
    {
      id: 'distributed-systems',
      label: 'Distributed systems',
      summary: 'Bounded services and event-driven workflows that make failure modes explicit and recoverable.',
      tags: ['Kafka', 'CDC', 'Outbox', 'Idempotency', 'Sagas'],
      evidence: [
        'Kafka reconciliation reduced a documented multi-hour process to under 20 minutes.',
        'Designed for replay, observability, operational ownership, and graceful degradation.',
      ],
      accent: 'cyan',
    },
    {
      id: 'enterprise-delivery',
      label: 'Enterprise delivery',
      summary: 'Architecture that respects regulated environments, existing constraints, and the people operating them.',
      tags: ['MAS TRM', 'PCI-DSS', 'SonarQube', 'Fortify', 'Maven'],
      evidence: [
        'Delivery experience across regulated payment, insurance, logistics, and enterprise integration contexts.',
        'Balances modernization with compatibility, security review, migration sequencing, and team enablement.',
      ],
      accent: 'yellow',
    },
  ] satisfies Capability[],
  caseStudies: [
    {
      id: 'mdm-modernization',
      title: 'Person MDM modernization',
      category: 'Data & MDM',
      clientType: 'Sanitized enterprise case study',
      description: 'A migration path from legacy EBX / JBoss / JDK 8 operations toward containerized EBX delivery on JDK 21 and Kubernetes.',
      problemsSolved: ['Runtime and JDK modernization', 'Jakarta / container compatibility', 'Migration safety', 'Release governance'],
      tech: ['TIBCO EBX', 'Java 21', 'Tomcat 10.1', 'Kubernetes', 'Maven', 'MS SQL'],
      details: {
        challenge: 'Modernize a central person-data platform while preserving integration contracts, operational controls, and the constraints of an enterprise runtime.',
        solution: 'Sequenced the runtime upgrade, dependency governance, container packaging, readiness checks, ingress behavior, and security quality gates so each change could be verified independently.',
        impact: 'A public-safe summary of the modernization approach. Employer-specific topology, data, and performance details are intentionally omitted.',
      },
      metrics: { Status: 'Sanitized', Focus: 'Migration safety', Runtime: 'JDK 21', Platform: 'Kubernetes' },
      codeSnippet: `// Migration gate: verify the runtime before changing the data contract\npublic record RuntimeGate(String javaVersion, String container, boolean ready) {}\n\nRuntimeGate gate = new RuntimeGate("21", "Tomcat 10.1", healthChecks.pass());\nassertThat(gate.ready()).isTrue();`,
      status: 'Sanitized experience',
      sourceNote: 'Public summary; employer and client details intentionally omitted.',
    },
    {
      id: 'rag-knowledge-assistant',
      title: 'Grounded knowledge assistant',
      category: 'AI Engineering Lab',
      clientType: 'Portfolio lab / proof of concept',
      description: 'A retrieval-first assistant pattern that shows sources, fallback behavior, evaluation cases, and explicit limits.',
      problemsSolved: ['Untrusted answers', 'Missing source traceability', 'Prompt injection risk', 'No regression signal'],
      tech: ['Spring AI', 'RAG', 'Embeddings', 'pgvector', 'Evaluation fixtures'],
      details: {
        challenge: 'Make an AI interface useful without turning confident language into an unreviewable source of truth.',
        solution: 'Separate retrieval from generation, return source identifiers, define no-answer behavior, add prompt-injection cases, and keep the default demo deterministic and local.',
        impact: 'The lab is designed to demonstrate the engineering controls around AI behavior. It is not presented as a production client deployment.',
      },
      metrics: { Status: 'Lab', Contract: 'Cited answers', Default: 'Local-first', Gate: 'Eval fixtures' },
      codeSnippet: `const answer = await assistant.ask({\n  question,\n  retrieve: true,\n  requireSources: true,\n  onNoEvidence: 'abstain',\n})`,
      status: 'Portfolio lab',
      sourceNote: 'Illustrative implementation; model and provider claims are intentionally bounded.',
    },
    {
      id: 'agent-augmented-engineering',
      title: 'Agent-augmented engineering loop',
      category: 'AI-Native Delivery',
      clientType: 'Sanitized delivery practice',
      description: 'A human-in-the-loop workflow for using Copilot, Claude Code, Codex, and custom agents without giving up reviewability.',
      problemsSolved: ['Slow feedback loops', 'Unbounded tool use', 'Prompt drift', 'Review bottlenecks'],
      tech: ['GitHub Copilot', 'Claude Code', 'Codex', 'MCP', 'CI / CD', 'Evaluation'],
      details: {
        challenge: 'Increase engineering leverage while keeping generated changes inside normal repository, test, security, and review boundaries.',
        solution: 'Use agents for bounded discovery and implementation tasks, require typed outputs and tests, keep credentials out of prompts, and measure workflow quality rather than raw generation volume.',
        impact: 'A reusable operating model for AI-augmented teams: faster exploration, clearer handoffs, and fewer unverifiable claims about what automation actually did.',
      },
      metrics: { Status: 'Sanitized', Mode: 'Human-in-the-loop', Controls: 'Tests + review', Surface: 'MCP tools' },
      codeSnippet: `type ChangeGate = {\n  tests: 'pass' | 'fail'\n  security: 'pass' | 'fail'\n  reviewer: 'approved' | 'pending'\n}`,
      status: 'Sanitized practice',
      sourceNote: 'Public summary; internal prompts, repositories, and client data are not exposed.',
    },
    {
      id: 'event-driven-reconciliation',
      title: 'Event-driven reconciliation',
      category: 'Distributed Systems',
      clientType: 'Enterprise integration evidence',
      description: 'Kafka and CDC patterns for reconciliation workflows where idempotency, replay, and operational visibility matter.',
      problemsSolved: ['Multi-hour reconciliation', 'Duplicate events', 'Partial failure', 'Opaque recovery paths'],
      tech: ['Apache Kafka', 'CDC', 'Outbox', 'Idempotency', 'Sagas', 'SQL'],
      details: {
        challenge: 'Move reconciliation from a slow, opaque batch path to a workflow that can be observed, retried, and explained.',
        solution: 'Combine CDC, durable event publication, idempotent consumers, exactly-once boundaries where appropriate, and explicit saga recovery paths.',
        impact: 'Documented project evidence reduced a multi-hour reconciliation process to under 20 minutes. The surrounding system details remain sanitized.',
      },
      metrics: { Status: 'Documented', 'Run time': '<20 min', Backbone: 'Kafka + CDC', Recovery: 'Replayable' },
      codeSnippet: `@KafkaListener(topics = "reconciliation.events")\npublic void consume(Event event) {\n    if (dedupeStore.seen(event.id())) return;\n    outbox.applyIdempotently(event);\n}`,
      status: 'Documented evidence',
      sourceNote: 'Outcome is summarized from project evidence; topology and client identifiers are omitted.',
    },
  ] satisfies CaseStudy[],
  aiLab: {
    summary: 'A small, local simulation of the controls that make AI augmentation reviewable: retrieve evidence, propose a bounded action, then evaluate the result.',
    notice: 'No provider key, GitHub account, email account, or private enterprise system is connected to this demo.',
    trace: [
      { id: 'retrieve', label: 'Retrieve', command: 'evidence.search(query)', detail: 'Select public records by lexical overlap and keep their source titles attached.', accent: 'green' },
      { id: 'augment', label: 'Augment', command: 'plan.with(boundaries)', detail: 'Turn evidence into a bounded answer or workflow suggestion; retrieved text is data, not instructions.', accent: 'blue' },
      { id: 'evaluate', label: 'Evaluate', command: 'gate(answer)', detail: 'Require evidence, refuse unsupported claims, and keep the fallback visible when the corpus is silent.', accent: 'purple' },
    ],
    evaluation: [
      { label: 'Grounding', value: 'Sources attached' },
      { label: 'No-answer path', value: 'Explicit fallback' },
      { label: 'Tool boundary', value: 'Read-only mock' },
      { label: 'Default mode', value: 'Offline / local' },
    ],
  },
  contact: {
    email: 'davinanup@gmail.com',
    linkedin: 'https://www.linkedin.com/in/anup-davin-mathivanan',
    github: 'https://github.com/anupdavin',
    repository: 'https://github.com/anupdavin/portfolio-full-stack',
    whatsapp: 'https://wa.me/6583985072',
    singaporePhone: '+65 8398 5072',
    indiaPhone: '+91 95004 99143',
  },
} as const
