# Score Card — AI Engineer Hiring Test

**Candidate:** ___________________________
**Interviewer:** ___________________________
**Date:** ___________________________
**Scorer:** ☐ Scorer 1 &nbsp;&nbsp; ☐ Scorer 2

Scale: **1** = Poor / Missing &nbsp; **2** = Weak &nbsp; **3** = Meets bar &nbsp; **4** = Strong &nbsp; **5** = Exceptional

---

## Part 1A — Code (15 pts)

| Criterion | Score (1–5) | Notes |
|-----------|-------------|-------|
| Correctness: RuleTraceService `record()` and `getByRuleId()` work as specified | | |
| Pagination: GET /traces?ruleId endpoint supports pagination | | |
| Test coverage: happy path + at least 1 error case | | |
| Code structure: clear, readable, follows NestJS conventions | | |

**Part 1A subtotal:** _____ / 20 (raw) → scaled to 15 pts

---

## Part 1B — Decision Document (25 pts)

| Criterion | Score (1–5) | Notes |
|-----------|-------------|-------|
| **Q1 (REQ-004 conflict):** Takes a specific position on "low" threshold; explains alert mechanism chosen; acknowledges assumptions explicitly | | |
| **Q2 (50ms tension):** Identifies the actual tension; describes a concrete resolution (async, caching, etc.); aware of trade-off risks | | |
| **Q3 (scope decisions):** Names specific things not implemented; gives reasoning grounded in priorities, not vagueness | | |
| **Voice / authenticity:** Written in first person with specific choices, not generic hedged language | | |
| **Defends decisions in oral:** Can explain any decision from the document without deflecting | | |

**Part 1B subtotal:** _____ / 25 (raw) → scaled to 25 pts

---

## Part 2 — RAG Implementation (30 pts)

| Criterion | Score (1–5) | Notes |
|-----------|-------------|-------|
| Embedding model choice: explicitly stated and rationale given | | |
| Qdrant integration: seed script inserts 15 rules; search returns results | | |
| Retrieval quality: top results are semantically relevant to test queries | | |
| Code quality: RuleSearchService is clean, typed, and testable | | |
| Reasoning depth: can explain their choices under questioning | | |
| *(Alternative: in-memory implementation)* If no Docker, implementation approach is sound and well-reasoned | | |

**Part 2 subtotal:** _____ / 25 (raw) → scaled to 30 pts

---

## Part 3 — AI Log (30 pts)

| Criterion | Score (1–5) | Notes |
|-----------|-------------|-------|
| **Specificity:** Names specific moments, not generic "I used Claude" | | |
| **Correction / rejection moment:** Describes a concrete case where they overrode the AI | | |
| **AI-shaped thinking moment:** Describes a concrete case where AI improved their approach | | |
| **Consistency with submission:** AI log matches the code and document in style and content | | |
| **Honest vs performative:** Log reads as a real record, not a compliance checkbox | | |
| **Delegation vs ownership:** Clear distinction between what AI did and what candidate decided | | |

**Part 3 subtotal:** _____ / 30 (raw) → scaled to 30 pts

---

## Oral Defense

| Criterion | Score (1–5) | Notes |
|-----------|-------------|-------|
| **Code explanation:** Can walk through their own code without hesitation | | |
| **Decision defense:** Can defend Decision Document choices with specifics | | |
| **Handles challenge:** Responds to live requirement change with structured thinking | | |
| **Intellectual honesty:** Comfortable saying "I don't know" or "I made a mistake here" | | |
| **Non-domain reasoning:** Can reason through unfamiliar constraints without domain knowledge | | |

**Oral subtotal:** _____ / 25 (raw) — unscored; inform hire recommendation

---

## Automatic Disqualifiers

> If any box is checked, the hire recommendation is **Auto-Disqualify** regardless of scores.

☐ **AI log absent** — no `ai-log.md` submitted, or file is empty / placeholder only

☐ **AI log clearly fabricated** — log contents cannot plausibly describe the actual submission (e.g., references tools or workflows that contradict the code)

☐ **AI log purely performative** — "I used Claude to write all the code" with no specifics whatsoever; no correction moment; no moment of AI shaping thinking

☐ **Decision Document clearly AI-generated** — passive, hedged throughout with no personal voice, no specific choices, reads as a summary of considerations rather than a decision

☐ **Candidate cannot explain their own code** — cannot describe what a central function does without reading from the file; cannot explain any claimed decision under questioning

☐ **Plagiarism / submitted others' work** — code or document is copied from a public source or prior candidate submission

---

## Hire Recommendation

☐ **Strong Hire** — exceptional across Decision Document, AI log, and oral; would be a clear yes to the team today

☐ **Hire** — meets bar on all components; one or two weak areas but overall solid judgment

☐ **Borderline** — meaningful strengths but meaningful gaps; escalate for second opinion

☐ **No Hire** — below bar on one or more critical components (Decision Document, oral defense); would need significant growth

☐ **Strong No Hire** — multiple critical misses or an automatic disqualifier

**Required rationale (2–4 sentences):**

___________________________________________
___________________________________________
___________________________________________
___________________________________________

---

## Scorer sign-off

**Scorer 1:** ___________________________ &nbsp; Date: ___________

**Scorer 2:** ___________________________ &nbsp; Date: ___________

**Final recommendation (after discussion):** ___________________________
