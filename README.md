# AI Engineer Hiring Test

Welcome. This is a take-home assessment for the **AI Engineer** role.

**Time allowed:** 2 days
**Tools allowed:** Any AI coding assistant (Claude, Cursor, Copilot, etc.)
**Required:** Submit your AI conversation log — see Part 3.

---

## What you're building

You're joining a team that builds **RuleEngine** — a system for managing and evaluating business rules (discount eligibility, product recommendations, fraud detection).

**Stack:** NestJS + TypeScript + PostgreSQL + Qdrant (vector DB) + Ollama (local LLM)

---

## Submission structure

```
submission/
├── README.md                    ← Setup instructions + AI usage reflection
├── decision-document.md         ← Part 1B — your written reasoning (NOT AI-generated)
├── src/
│   ├── rule-trace/              ← Part 1A: RuleTraceService + controller
│   └── rule-search/             ← Part 2: RuleSearchService
├── prisma/
│   └── schema.prisma
├── tests/
│   └── rule-trace.spec.ts
├── scripts/
│   └── seed-qdrant.ts           ← seed script for Part 2
└── ai-conversation-log/
    └── session.md               ← Part 3: raw AI conversation export
```

Submit as a **private GitHub repo** and invite `trieuvo-web` as a collaborator.

---

## Part 1 — Ambiguous Spec Implementation (40 points)

See [SPEC.md](./SPEC.md) for the full specification.

### Part 1A — Code (15 points)

Using any AI assistant you like, implement:

- Prisma schema for `RuleTrace`
- `RuleTraceService` with methods: `record()` and `getByRuleId()`
- NestJS controller with endpoint from REQ-003 (with pagination)
- Unit tests: happy path + 1 error case

### Part 1B — Decision Document (25 points)

**Write this yourself. Do not use AI to write this section.**

This is the primary evaluation artifact. We want to read your reasoning, not a polished AI summary.

Answer these 3 questions in `decision-document.md` (500–800 words total):

**Q1 — REQ-004 conflict:**
The spec says "alert when confidence is low" but doesn't define "low", doesn't specify the alert channel, and doesn't say who receives the alert. How did you resolve this? What assumptions did you make?

**Q2 — REQ-005 tension:**
REQ-005 requires rule evaluation to complete in < 50ms. REQ-001+002 require persisting to PostgreSQL (which has I/O latency). This is a real tension. How did you resolve it in your implementation?

**Q3 — Scope:**
What did you intentionally NOT implement, or implement differently from the literal spec? Why?

---

## Part 2 — RAG Mini-feature (30 points)

Implement `RuleSearchService` — given a natural language query, return the top-3 most relevant rules.

```typescript
interface SearchResult {
  rule: Rule;
  score: number;
  matchReason: string; // why this rule matched the query
}

class RuleSearchService {
  async search(query: string): Promise<SearchResult[]>;
}
```

Seed data: 15 rules are provided in [`data/rules.json`](./data/rules.json).

**Requirements:**
- Use Qdrant for vector storage (see [docker-compose.yml](./docker-compose.yml) to start Qdrant)
- Use any embedding model — **explain your choice in your submission README**
- Include a seed script (`scripts/seed-qdrant.ts`) to insert the 15 rules into Qdrant
- Include 3 test queries with your expected top result

**No single correct answer.** We evaluate reasoning, not specific output values.

**Alternative (no Docker):** You may implement `RuleSearchService` using an in-memory vector store with cosine similarity. This is not penalized — we care about your approach, not infrastructure setup.

---

## Part 3 — AI Collaboration Log (30 points)

Export and submit your full conversation with your AI assistant (Claude, Cursor, ChatGPT, etc.).

If you used multiple tools, submit the log from your primary session.

**Do not clean up or edit the log.** We want to see the real process.

In your submission `README.md`, add a short section (100–200 words):

> *"How I used AI in this test — what I delegated to AI, what I did myself, and the moment(s) I chose not to trust the AI's output."*

---

## Part 4 — Oral Defense (30 minutes, scheduled after submission)

No preparation needed.

We will:
1. Walk through your code together (10 min)
2. Ask about your Decision Document (10 min)
3. Make one live requirement change and see how you adapt (10 min)

---

## Getting started

```bash
# 1. Start infrastructure
docker compose up -d

# 2. Install dependencies
npm install

# 3. Generate Prisma client
npx prisma generate

# 4. Push schema to database
npx prisma db push

# 5. Seed Qdrant (after implementing your seed script)
npx ts-node scripts/seed-qdrant.ts
```

---

## Questions?

You are allowed to ask up to **2 clarifying questions** by emailing the hiring team. Use them wisely — part of what we're evaluating is how you handle ambiguity.
