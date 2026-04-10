# Spec: RAG Mini-Feature — Semantic Rule Search

**Part 2 of the AI Engineer hiring test.**
This spec is self-contained: you do not need to complete Part 1 first.

---

## Context

RuleEngine stores hundreds of business rules (discount eligibility, fraud detection, product recommendations). Operations teams need to find relevant rules by describing what they want in plain language — not by remembering exact rule IDs or names.

**Your task:** implement `RuleSearchService` — a semantic search service that takes a natural language query and returns the top-3 most relevant rules from the seed data.

---

## Interface

```typescript
interface Rule {
  id: string;
  name: string;
  description: string;
  category: "discount" | "eligibility" | "fraud";
  conditions: Record<string, unknown>;
}

interface SearchResult {
  rule: Rule;
  score: number;     // similarity score, 0.0–1.0
  matchReason: string; // human-readable explanation of why this rule matched
}

class RuleSearchService {
  async search(query: string): Promise<SearchResult[]>;
  // Returns top-3 results, ordered by score descending
  // Returns empty array (not error) if no relevant results
}
```

---

## Seed Data

`data/rules.json` contains 15 rules across 3 categories. Your seed script must:
1. Load the 15 rules
2. Generate embeddings for each rule (using the `description` field, or a combination of fields — your choice)
3. Store embeddings in Qdrant (or an in-memory alternative — see Storage Options below)

---

## Storage Options

You may use either:

**Option A — Qdrant** (docker-compose.yml already includes Qdrant):
- Use the `@qdrant/js-client-rest` package (already in package.json)
- Collection name: `rules`

**Option B — In-memory mock** (for candidates who prefer not to run Qdrant locally):
- Implement a simple cosine-similarity search over an in-memory store
- This is acceptable — use what lets you focus on the interesting part

Document your choice and the reason in your README.

---

## Embedding Model

Your choice. Some options:

| Option | Notes |
|--------|-------|
| OpenAI `text-embedding-3-small` | High quality, requires API key |
| Ollama `nomic-embed-text` | Local, no API key (docker-compose includes Ollama) |
| `@xenova/transformers` | In-process, no external dependency |
| Any other | Explain your choice in README |

**Requirement:** explain your embedding model choice in your README (1–2 sentences: why this model for this use case).

---

## Requirements

**REQ-RAG-001:** `RuleSearchService.search(query)` returns the top-3 most semantically relevant rules for the given query.

**REQ-RAG-002:** Results are ordered by `score` descending.

**REQ-RAG-003:** Each `SearchResult.matchReason` must be a non-empty string that explains why the rule matched. This can be generated (e.g., from the rule description) — it does not need to be AI-generated.

**REQ-RAG-004:** A seed script (`scripts/seed-qdrant.ts` or `scripts/seed.ts`) must exist and run successfully.

**REQ-RAG-005:** Response time for a single query must be under 500ms after the seed data is loaded (embedding + retrieval combined).

---

## Deliverables

1. `src/rule-search/rule-search.service.ts` — the service implementation
2. `scripts/seed-qdrant.ts` (or `scripts/seed.ts`) — seed script
3. 3 test queries in your README with the expected top-1 result for each

No single "correct" implementation exists. We're evaluating your reasoning, not matching a specific output.

---

## Evaluation Focus

| What we look at | What we're NOT looking for |
|-----------------|---------------------------|
| Embedding model choice + stated reasoning | Using a specific model |
| `matchReason` is meaningful, not generic | A specific matchReason format |
| Seed script runs without errors | Qdrant specifically (in-memory is fine) |
| 3 test queries with plausible expected results | Exact test output |
