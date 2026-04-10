# Evaluation Rubric — AI Engineer Hiring Test

**Version:** 1.0 (draft — pass/fail threshold requires stakeholder confirmation before first live use)

---

## Overview

This rubric enables consistent scoring across independent raters. Two raters should score independently; final decision is based on the average if scores are within ±2 per dimension. If the gap is > 2 on any dimension, discuss before finalizing.

---

## Part 1A — Code Implementation (9 points)

### Correctness (0–3)

Does the implementation fulfill the spec requirements?

| Score | Criteria |
|-------|----------|
| **3** | `RuleTraceService.record()` and `getByRuleId()` work as specified. Pagination on GET /traces endpoint is functional. No obvious spec requirements skipped. |
| **2** | Core functionality works but minor spec requirements are missing (e.g., pagination present but `sort: newest first` not enforced, or missing `durationMs` field). |
| **1** | Partial implementation — some spec requirements present but others absent or non-functional. Docker environment starts but key endpoints fail. |
| **0** | Code does not run, or fulfills no spec requirements. |

### Edge Case Handling (0–3)

Are boundary conditions addressed?

| Score | Criteria |
|-------|----------|
| **3** | Handles empty result sets gracefully. REQ-005 (`< 50ms`) resolved via async/non-blocking approach (fire-and-forget, queue, etc.) not just optimistic hope. At least one test covers an error case. |
| **2** | Some edge cases handled but REQ-005 tension not explicitly resolved (writes synchronously and hopes it's fast enough). Tests cover happy path only. |
| **1** | No visible awareness of edge cases. Tests absent or only auto-generated with no assertions. |
| **0** | Code crashes on normal inputs. |

### Code Structure (0–3)

Is the code readable and maintainable for a team codebase?

| Score | Criteria |
|-------|----------|
| **3** | Follows NestJS module conventions. Types are explicit (no `any` on public interfaces). Logic is in the service, not the controller. Method and variable names are self-explanatory. |
| **2** | Generally follows conventions with minor issues (scattered logic, some implicit `any`, inconsistent naming). |
| **1** | Hard to follow. Mixed concerns, or clearly AI-generated boilerplate that was not cleaned up. |
| **0** | No discernible structure. |

**Part 1A total: _____ / 9**

---

## Part 1B — Decision Document (12 points)

Scored on the 4 oral defense dimensions, applied to the written document:

### Spec Ambiguity Recognition (0–3)

See `rubric/oral-defense.md` — same anchors apply to written document.

Key signal in writing: Does the candidate name specific ambiguities, or describe them vaguely?

**Score: _____ / 3**

### Trade-off Resolution Depth (0–3)

See `rubric/oral-defense.md` — same anchors apply.

Key signal in writing: Are alternatives named, or just the chosen approach?

**Score: _____ / 3**

### Verification Evidence Quality (0–3)

In the written context: Does the candidate describe how they validated their approach, not just what they built?

**Score: _____ / 3**

### Accountability Demonstration (0–3)

In the written context: Is the language first-person and specific? Transparent about assumptions?

**Score: _____ / 3**

**Part 1B total: _____ / 12**

---

## Part 2 — RAG Implementation (9 points)

### Correctness (0–3)

| Score | Criteria |
|-------|----------|
| **3** | Seed script runs. `search()` returns top-3 results. `score` field is populated (0–1). `matchReason` is non-empty and specific to the matched rule (not "this rule matched your query"). |
| **2** | Search runs but results are not ranked meaningfully, or `matchReason` is generic. Seed script requires manual steps not documented in README. |
| **1** | Service exists but doesn't return meaningful results. Or seed script requires significant debugging to run. |
| **0** | RAG feature absent or non-functional. |

### Embedding Choice + Reasoning (0–3)

| Score | Criteria |
|-------|----------|
| **3** | Embedding model choice is explicitly documented in README with ≥1 sentence of reasoning (why this model for this use case). The reasoning is specific (e.g., "used nomic-embed-text via Ollama to avoid API key dependency — trade-off is lower accuracy than OpenAI"). |
| **2** | Model choice is documented but reasoning is generic ("it's a common choice"). |
| **1** | Model is mentioned in code comments but not explained in README. |
| **0** | No documentation of embedding approach. |

### matchReason Quality (0–3)

| Score | Criteria |
|-------|----------|
| **3** | `matchReason` strings are specific to the rule's content (e.g., "Fraud detection rule for high-value cross-border transactions — matched your query about large international orders"). Different rules have meaningfully different reasons. |
| **2** | `matchReason` describes the rule category but not its specific content. |
| **1** | `matchReason` is a template string with rule metadata substituted in mechanically. |
| **0** | `matchReason` is empty, null, or always the same string. |

**Part 2 total: _____ / 9**

---

## Part 3 — AI Collaboration Log (9 points)

### Specificity + Credibility (0–3)

| Score | Criteria |
|-------|----------|
| **3** | Log has ≥5 entries. Prompts are described specifically (not "asked Claude to help"). At least one entry shows a modification or rejection of AI output. Timeline is plausible (entries correspond to what was built). |
| **2** | Log has ≥3 entries. Prompts are described but vague. Evidence of AI use is present but hard to verify against the submission. |
| **1** | Log has 1–2 entries, or reads as reconstructed after the fact rather than written during the test. |
| **0** | Log absent, or clearly fabricated (describes tasks not in the submission). |

### Verification Mindset (0–3)

| Score | Criteria |
|-------|----------|
| **3** | At least one entry shows the candidate ran or checked AI output before accepting it (ran tests, read the generated code, compared against spec). Distinct from entries where candidate accepted output without checking. |
| **2** | Some verification implied but not explicit. "I tested it" without describing what was tested. |
| **1** | No evidence of verification — all entries are "AI generated X, I used it." |
| **0** | Log absent. |

### Scope Control (0–3)

| Score | Criteria |
|-------|----------|
| **3** | Candidate describes at least one case where AI tried to over-scope (add extra features, use a more complex pattern than needed) and they redirected it. Or explains why they kept the scope tight. |
| **2** | No over-scoping entries but submission itself shows evidence of scope control (clean, focused implementation). |
| **1** | AI log + submission both show evidence of AI over-engineering that candidate accepted without pushback. |
| **0** | Log absent, or submission is a mass of unused code/boilerplate. |

**Part 3 total: _____ / 9**

---

## Overall Score

| Section | Max | Score |
|---------|-----|-------|
| Part 1A — Code | 9 | |
| Part 1B — Decision Document | 12 | |
| Part 2 — RAG | 9 | |
| Part 3 — AI Log | 9 | |
| **Total** | **39** | |

> **Pass/fail threshold: [TBD — requires stakeholder confirmation before first use]**
>
> Recommended placeholder: ≥24/39 (≈62%) with no dimension score of 0 on Part 1B or Oral.
> This must be validated against dry-run calibration and confirmed by the hiring manager.

---

## Automatic Disqualifiers

The following are immediate no-hire signals. Any single disqualifier overrides the score:

| Disqualifier | Observable trigger |
|-------------|-------------------|
| Code does not run | `docker-compose up && make test` (or equivalent setup) fails with no recoverable fix |
| AI log absent or trivially short | Missing file, OR fewer than 3 entries for the full test |
| Decision Document absent | Missing file — thin content is scored at 0–1, not disqualified |
| Oral: no understanding of own code | Candidate cannot explain a method they wrote when asked in straightforward terms |

---

## Inter-Rater Calibration Note

Before using this rubric with real candidates, two raters should independently score the same dry-run submission. If scores differ by > 2 points on any dimension, discuss and update scoring anchors before the first live use.

Reference calibration examples are in `interviewer/calibration/`.
