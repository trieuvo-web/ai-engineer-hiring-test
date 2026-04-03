# AI Engineer Hiring Test

Welcome. This is a take-home assessment for the **AI Engineer** role.

**Time allowed:** 2 days
**Tools allowed:** Any AI coding assistant (Claude, Cursor, Copilot, etc.) — agents are **encouraged**
**Required:** An honest AI collaboration log (`ai-log.md`) — see [AI Usage Policy](#ai-usage-policy)

---

## What you're being evaluated on

We evaluate **decision-making, trade-off reasoning, and accountability** — not just code.

This project uses AI agents in production. We expect engineers to use them. What we cannot delegate to an agent is your judgment: what assumptions you made, why you chose one approach over another, and how you defend your reasoning live.

| Component | Weight | What we're looking for |
|-----------|--------|------------------------|
| Part 1A — Code | 15 pts | Correctness, structure, test coverage |
| Part 1B — Decision Document | 25 pts | Your reasoning on 3 specific architectural decisions |
| Part 2 — RAG implementation | 30 pts | Embedding choice rationale, retrieval quality |
| Part 3 — AI log | 30 pts | Honest evidence of how you collaborated with AI |
| Oral Defense | Separate | Live probing of your decisions (no trick questions, no domain knowledge required) |

---

## What you're building

You're joining a team that builds **RuleEngine** — a system for managing and evaluating business rules (discount eligibility, product recommendations, fraud detection).

**Stack:** NestJS + TypeScript + PostgreSQL + Qdrant (vector DB) + Ollama (local LLM)

---

## Submission structure

```
solution/
├── README.md                    ← Setup instructions + brief summary of your approach
├── src/
│   ├── rule-trace/              ← Part 1A: RuleTraceService + controller
│   └── rule-search/             ← Part 2: RuleSearchService
├── prisma/
│   └── schema.prisma
├── tests/
│   └── rule-trace.spec.ts
└── scripts/
    └── seed-qdrant.ts           ← seed script for Part 2
decision-doc.md                  ← Part 1B — your written reasoning (NOT AI-generated)
ai-log.md                        ← Part 3 — your AI collaboration log (honest and complete)
STATUS.md                        ← Optional: if submitting incomplete work, describe what's done
```

Submit as a **private GitHub repo** and invite `trieuvo-web` as a collaborator.

> **Partial submissions are accepted.** If you run out of time, include a `STATUS.md` explaining what is complete, what is incomplete, and any decisions you made under time pressure. We evaluate the quality of your judgment, not just completion.

---

## How to get started

1. **Fork this repo** (do not clone the main repo directly — fork it to your own GitHub account)
2. Keep your fork **private** and invite `trieuvo-web` as a collaborator when you're ready to submit
3. Read [SPEC.md](./SPEC.md) for the full technical specification
4. Work through Parts 1 and 2 using any AI tools you like
5. Write your Decision Document yourself (see [Part 1B](#part-1b--decision-document-25-points) below)
6. Maintain an honest AI log as you go (see [AI Usage Policy](#ai-usage-policy))
7. Submit and schedule your oral defense (see [Submission & Scheduling](#submission--scheduling))

---

## Part 1A — Code (15 points)

See [SPEC.md](./SPEC.md) for the full specification.

Implement:
- Prisma schema for `RuleTrace`
- `RuleTraceService` with methods: `record()` and `getByRuleId()`
- NestJS controller with endpoint from REQ-003 (with pagination)
- Unit tests: happy path + 1 error case

You may use AI to implement all of this. We evaluate code quality, not whether AI helped.

---

## Part 1B — Decision Document (25 points)

**Write this yourself. Do not use AI to generate or polish this section.**

This is the primary evaluation artifact. We want to read your reasoning, not a cleaned-up AI summary.

Answer these 3 questions in `decision-doc.md` (500–800 words total):

**Q1 — REQ-004 conflict:**
The spec says "alert when confidence is low" but doesn't define "low", doesn't specify the alert channel, and doesn't say who receives the alert. How did you resolve this? What assumptions did you make?

**Q2 — REQ-005 tension:**
REQ-005 requires rule evaluation to complete in < 50ms. REQ-001+002 require persisting to PostgreSQL (which has I/O latency). This is a real tension. How did you resolve it in your implementation?

**Q3 — Scope:**
What did you intentionally NOT implement, or implement differently from the literal spec? Why?

A template is provided in [`submission/decision-document.md`](./submission/decision-document.md).

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
- Use Qdrant for vector storage (see [docker-compose.yml](./docker-compose.yml))
- Use any embedding model — **explain your choice in your solution README**
- Include a seed script (`scripts/seed-qdrant.ts`) to insert the 15 rules into Qdrant
- Include 3 test queries with your expected top result

**No single correct answer.** We evaluate reasoning, not specific output values.

**Alternative (no Docker):** You may implement `RuleSearchService` using an in-memory vector store with cosine similarity. This is not penalized — we care about your approach, not infrastructure setup.

---

## Part 3 — AI Log (30 points)

Maintain an honest `ai-log.md` documenting how you used AI during the test. Write it as you go — not reconstructed afterward. Entries can be brief; bullet points are fine.

**Your `ai-log.md` must include:**

1. **Tools used** — which AI tools you used and for which parts
2. **What you delegated** — what you asked the AI to do, in your own words
3. **What you kept yourself** — what you decided not to delegate (and why)
4. **One moment you corrected or rejected AI output** — a specific example where you caught an error, questioned an assumption, or chose differently than the AI suggested
5. **One moment the AI shaped your thinking** — a specific example where the AI gave you an idea or framing you wouldn't have arrived at alone

A template is provided in [`submission/ai-log.md`](./submission/ai-log.md).

**Automatic disqualifier:** An absent, clearly fabricated, or purely performative AI log is an automatic disqualifier. "I used Claude to write all the code" with no further detail is insufficient. "I used Claude to write all the code, but rejected its approach to the 50ms problem because it suggested async fire-and-forget without acknowledging the data loss risk" — that's what we're looking for.

---

## Oral Defense (scheduled after submission)

**Duration:** ~45 minutes. No preparation required.

We will:
1. Walk through your code together (~15 min)
2. Discuss your Decision Document (~15 min)
3. Make one live requirement change and see how you adapt (~15 min)

No trick questions. No domain-specific knowledge required (no Tu Vi, no Vietnamese astrology, nothing project-specific). We're evaluating how you reason and communicate, not what you've memorized.

---

## Getting started (infrastructure)

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

**No Docker?** You can implement the in-memory vector store alternative for Part 2 (see above) and skip `docker compose`.

---

## Submission & Scheduling

### Submitting your work

1. Push your solution to your private fork
2. Invite `trieuvo-web` as a collaborator on GitHub
3. Send an email to **[hiring@example.com]** with subject: `AI Engineer Test Submission — [Your Name]`
   - Include your GitHub repo URL
   - Note which level you applied for (Junior / Mid / Senior) if applicable

### Scheduling your oral defense

Reply to your submission confirmation email with your available times, or use the scheduling link provided when you received this test.

**Cancellation / rescheduling:** Please give at least 24 hours notice by replying to your scheduling email.

---

## Clarifying questions

You are allowed to ask up to **2 clarifying questions** by emailing the hiring team. Use them wisely — part of what we're evaluating is how you handle ambiguity. Logistics questions (submission format, scheduling) don't count toward the 2.
