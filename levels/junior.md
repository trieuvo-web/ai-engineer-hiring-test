# Level: Junior AI Engineer

**Target candidate:** 1–3 years experience. Has implemented features in production but has limited exposure to distributed systems design decisions.

---

## Test Structure

| Part | Description | Time budget |
|------|-------------|-------------|
| Part 1A | Code: implement `RuleTraceService` | ~3–4 hours |
| Part 1B | Decision Document (2 decisions instead of 3) | ~1 hour |
| **Part 2** | **Code Review Exercise** (replaces RAG feature) | ~1–2 hours |
| Part 3 | AI Collaboration Log | ongoing |
| Oral | 30-minute oral defense | — |

**Total take-home time budget:** ~5–7 hours

---

## Part 2 Variant — Code Review Exercise

Instead of implementing the RAG feature, review the provided diff in `review/candidate-pr-diff.md`.

**Task:** Write a code review of 300–600 words covering:
1. At least 2 issues you would flag (one functional, one structural)
2. At least 1 thing done well
3. One question you would ask the author before approving

Evaluation: Are comments specific (line references, reasoning)? Does the reviewer distinguish between correctness issues and style preferences? Is feedback constructive, not condescending?

---

## Scoring Thresholds (Junior)

| Dimension | Min acceptable for hire consideration |
|-----------|--------------------------------------|
| Spec Ambiguity Recognition | 1+ (acknowledges ambiguity exists) |
| Trade-off Resolution | 1+ (explains chosen approach) |
| Verification Evidence | 1+ (ran tests and can describe what they test) |
| Accountability | 1+ (honest about AI use) |
| Code correctness (Part 1A) | 2+ |
| Code review quality (Part 2) | 2+ |

**Overall threshold:** ≥20/35 with no Part 1A correctness score of 0.

> Note: the threshold above is a placeholder. Confirm with hiring manager before first live use.

---

## Oral Defense — Junior Format

**Duration:** 30 minutes

| Section | Time | Focus |
|---------|------|-------|
| Code walkthrough | 10 min | Walk through RuleTraceService. Can they explain their own code? |
| Decision Document | 10 min | Probe the 2 decisions. Can they defend them? |
| Live requirement change | 10 min | "Add support for tracing by user ID, not just ruleId." How do they approach the change? |

**Question bank for Junior oral:** Use questions from `interviewer/guide.md` marked `[J]` (or the first question per dimension when no level marker is present).

---

## Code weighting note

For Junior candidates, code quality carries more weight in the hire decision than for Mid/Senior: a weak Decision Document but clean, functional code with good tests is more acceptable at Junior level than at Senior level.

This reflects that Junior candidates are expected to grow into architectural judgment with mentorship, while strong code fundamentals are a harder-to-train baseline.
