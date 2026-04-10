# Level: Mid AI Engineer

**Target candidate:** 3–6 years experience. Can implement production features independently and reason about distributed systems trade-offs.

---

## Test Structure (Standard)

This is the baseline test. All other levels adjust from this configuration.

| Part | Description | Time budget |
|------|-------------|-------------|
| Part 1A | Code: implement `RuleTraceService` | ~3–4 hours |
| Part 1B | Decision Document (3 decisions) | ~1–1.5 hours |
| Part 2 | RAG mini-feature (see `spec/rag-feature.md`) | ~2–3 hours |
| Part 3 | AI Collaboration Log | ongoing |
| Oral | 45-minute oral defense | — |

**Total take-home time budget:** ~6–8 hours

---

## Scoring Thresholds (Mid)

| Dimension | Min acceptable for hire consideration |
|-----------|--------------------------------------|
| Spec Ambiguity Recognition | 2+ (names ambiguities and explains decision process) |
| Trade-off Resolution | 2+ (explains approach AND acknowledges alternatives) |
| Verification Evidence | 2+ (systematic test strategy, not just "it passes") |
| Accountability | 2+ (specific about AI use, owns decisions) |
| Code correctness (Part 1A) | 2+ |
| RAG correctness (Part 2) | 1+ |

**Overall threshold:** ≥24/39 with no dimension score of 0 on Part 1B.

> Note: the threshold above is a placeholder. Confirm with hiring manager before first live use.

---

## Oral Defense — Mid Format

**Duration:** 45 minutes

| Section | Time | Focus |
|---------|------|-------|
| Code walkthrough | 15 min | RuleTraceService + RAG implementation |
| Decision Document | 15 min | All 3 decisions. Probe for alternatives considered. |
| Live requirement change | 10 min | "Add confidence trending — track whether a rule's average confidence is improving or degrading over time." |
| Wrap-up | 5 min | "What would you do differently with more time?" |

**Question bank:** Use questions from `interviewer/guide.md`. For Mid level, use all standard questions. Expect at least one "what would change your mind?" follow-up per dimension.

---

## Strong Hire Signals (Mid-specific)

- Decision Document frames REQ-005 as a distributed systems problem (fire-and-forget, at-least-once, or queue-based write with explicit failure mode discussion)
- RAG embedding choice mentions trade-offs (latency vs. quality, self-hosted vs. API, multilingual support)
- AI log shows at least one case where candidate redirected AI scope
- Oral: candidate asks a clarifying question about the live requirement change before proposing a solution
