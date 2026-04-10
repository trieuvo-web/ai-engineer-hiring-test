# Level: Senior AI Engineer

**Target candidate:** 6+ years experience. Expected to architect systems, not just implement features. Should reason about operational concerns, failure modes, and team impact.

---

## Test Structure

| Part | Description | Time budget |
|------|-------------|-------------|
| Part 1A | Code: implement `RuleTraceService` | ~2–3 hours |
| Part 1B | Decision Document (3 decisions + operational concerns) | ~1.5–2 hours |
| **Part 2** | **System Design Document** (replaces RAG feature) | ~2–3 hours |
| Part 3 | AI Collaboration Log | ongoing |
| Oral | 60–75 minute oral defense | — |

**Total take-home time budget:** ~6–8 hours

---

## Part 2 Variant — System Design Document

Instead of implementing the RAG feature, write a system design document for scaling RuleEngine.

**Prompt:**

> RuleEngine currently handles 50 rules and ~10 req/s. The product team wants to grow to 10,000 rules and 1,000 req/s within 18 months. Describe how you would architect the system to support this growth.
>
> Address: data model changes, query patterns, caching strategy, the REQ-005 trace persistence problem at scale, and at least 2 failure modes with mitigation.

**Format:** Markdown document, 600–1,200 words. Diagrams optional but welcome.

**Evaluation:** Does the candidate identify the correct bottlenecks? Are trade-offs explicit? Are failure modes concrete (not just "it might be slow")? Is the scope realistic for an 18-month timeline?

---

## Part 1B — Senior Decision Document Requirements

Senior Decision Documents require 3 decisions AND each decision must include:
- At least one operational concern (observability, failure mode, rollback plan, or monitoring)
- An explicit statement of what the candidate would monitor in production to know if their approach is working

---

## Scoring Thresholds (Senior)

| Dimension | Min acceptable for hire consideration |
|-----------|--------------------------------------|
| Spec Ambiguity Recognition | 2+ |
| Trade-off Resolution | **3** (must demonstrate depth — alternatives + operating concerns + failure modes) |
| Verification Evidence | 2+ |
| Accountability | 2+ |
| Code correctness (Part 1A) | 2+ |
| System design quality (Part 2) | 2+ |

**Overall threshold:** ≥26/39 with minimum 2 on Trade-off Resolution.

> Note: the threshold above is a placeholder. Confirm with hiring manager before first live use.

---

## Oral Defense — Senior Format

**Duration:** 60–75 minutes

| Section | Time | Focus |
|---------|------|-------|
| Code walkthrough | 10 min | RuleTraceService — focus on design choices, not just functionality |
| Decision Document | 15 min | Probe operational concerns and failure mode reasoning |
| System Design (Part 2) | 20 min | Deep dive: challenge bottleneck assumptions, probe failure modes |
| Live requirement change | 15 min | "Regulatory change: all rule evaluation traces must be immutable and retained for 7 years. What changes in your architecture?" |
| Wrap-up | 5–10 min | "What part of this problem would you most want to revisit with a team?" |

**Escalation criteria for Senior:** If candidate cannot articulate a failure mode for their REQ-005 solution (beyond "it might be slow"), flag for second rater regardless of overall score.

---

## Strong Hire Signals (Senior-specific)

- System design explicitly addresses CAP theorem trade-offs or eventual consistency
- REQ-005 solution includes a discussion of at-least-once vs. exactly-once delivery
- Oral: candidate proactively asks about SLO/SLA requirements before proposing a scaling approach
- AI log shows evidence of deliberate scope control on the system design (resisted AI tendency to over-architect)
- Mentions operability concerns (what dashboards they would build, what alerts they would set) without prompting
