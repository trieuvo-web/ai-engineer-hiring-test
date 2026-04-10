# Calibration Example: Borderline / No Hire

This is a reference submission for calibration. Use it to anchor your scores before evaluating actual candidates.

---

## Submission Summary

The code works and is reasonably structured. The Decision Document is written in the candidate's voice but doesn't take strong positions. The AI log is present and specific enough to be credible, but the candidate struggled in the oral to defend decisions they wrote. This is the profile that most commonly requires a second opinion.

---

## Decision Document Excerpt

> **Q1 — REQ-004: Alert when confidence is low**
>
> This was one of the more ambiguous parts of the spec. I decided to implement a simple logging mechanism where the system logs a warning whenever the confidence falls below a certain threshold. I chose 0.5 as a reasonable middle ground. The spec didn't define the alert channel, so I kept it simple with logging since adding Slack or email would require additional setup.

> **Q2 — REQ-005: 50ms tension with PostgreSQL**
>
> To keep evaluation fast, I wrote to the database asynchronously. This way the rule evaluation completes quickly without waiting for the database write. I tested it locally and it was well under 50ms. The trade-off is that in edge cases the trace might not be written if there's a crash, but for this assessment that seemed like an acceptable trade-off.

> **Q3 — Scope decisions**
>
> I focused on getting the core functionality working. I didn't add extensive error handling beyond the basic cases. I also kept the confidence alert simple rather than building a full notification system.

---

## What's weak

**Q1:** The candidate chose a threshold (0.5) without explaining why. "Reasonable middle ground" is not reasoning — it's a non-answer. They correctly chose logging over a notification system but don't explain why they eliminated other options.

**Q2:** Identifies the right approach (async) and acknowledges the data loss risk, but the reasoning is thin. "Tested it locally and it was well under 50ms" doesn't explain how they thought through the trade-off — it describes what they observed. The "acceptable trade-off" claim isn't grounded in anything (acceptable to whom? why?).

**Q3:** This is weak. "Focused on getting core functionality working" says nothing. Not adding "extensive error handling" is a decision — what error cases did they explicitly skip? Why?

---

## AI Log Excerpt

> **Tools used:** Claude Code for most of the implementation
>
> **What I delegated:** I asked Claude to help implement the controller and the Prisma schema. It did a good job.
>
> **What I kept:** I wrote the Decision Document myself.
>
> **Moment I corrected AI:** The pagination in the controller wasn't quite right at first — the total count query was off. I caught that in testing and fixed it.
>
> **Moment AI shaped my thinking:** Claude suggested using async/await for the database write to keep it non-blocking, which is what I ended up doing for the 50ms requirement.

---

## What's weak in the AI log

- "Pagination wasn't quite right" — what specifically was wrong? This is vague enough to be credible but not specific enough to be informative.
- "Claude suggested async/await" — this is technically the right approach but describing it as "async/await" (a language feature) rather than "fire-and-forget persistence" (an architectural pattern) suggests the candidate may not have thought through the implications deeply.
- Overall the log is brief and passes the minimum bar but doesn't demonstrate real engagement with how they directed AI.

---

## Oral Defense Notes

**When asked about the 50ms trade-off:**
> "I went with async because the spec said < 50ms. Async writes don't block the response."

When probed: "What happens if there's a crash between the evaluation and the write completing?"

> "That's a good point. I guess the trace would be lost. But for this test I figured that was okay."

**Assessment:** The candidate identifies the risk when prompted but didn't think through it independently. The Decision Document mentions "acceptable trade-off" but the oral reveals there was no real trade-off analysis — they went with async because the spec said < 50ms, full stop.

**When asked about Q3 (scope decisions):**
> "I just focused on the main requirements. I didn't have time to add everything."

When probed: "What's one thing you would have added if you had more time?"

> "Probably better error handling in the controller. Like handling database errors more gracefully."

**Assessment:** The candidate can identify a thing to improve when prompted, but still doesn't name a specific case. This suggests shallow engagement with scope decisions — they didn't make deliberate choices about what to include and exclude, they just implemented what they got to.

**When given the live requirement change ("audit-grade guarantees"):**
> "I'd have to change the async write to a synchronous one. That might break the 50ms requirement though."

When probed: "How would you resolve that conflict?"

> "Maybe... a queue? Like Redis? But that might be out of scope."

**Assessment:** The candidate identifies the right approach (queue) but without confidence or structure. They didn't ask a clarifying question (does the 50ms requirement still apply?), and they self-censored a valid answer because they weren't sure if it was "in scope."

---

## Pre-filled Score Card

**Candidate:** [Borderline / No Hire Calibration Example]

| Component | Criterion | Score | Notes |
|-----------|-----------|-------|-------|
| **Part 1B — Decision Document** | Q1 (REQ-004 conflict) | 2 | Chose threshold without reasoning; correctly avoided over-engineering but doesn't explain why |
| | Q2 (50ms tension) | 3 | Correct approach, risk acknowledged, but reasoning is thin — observed rather than analyzed |
| | Q3 (scope decisions) | 1 | Says nothing specific; "focused on core" is not a scope decision |
| | Voice / authenticity | 3 | Written in first person, personal, but positions are soft throughout |
| | Defends in oral | 2 | Could not explain their threshold choice; identified async risk only when prompted |
| **Part 3 — AI Log** | Specificity | 3 | Names specific tools, correction moment is somewhat specific; shapes-thinking moment is vague |
| | Correction/rejection moment | 3 | Pagination bug is credible but under-described |
| | AI-shaped thinking moment | 2 | "Claude suggested async" — describes AI's suggestion, not candidate's evaluation of it |
| | Consistency with submission | 4 | Log is consistent, no contradictions |
| | Honest vs performative | 3 | Passable; not clearly performative but also not particularly honest about what was hard |
| | Delegation vs ownership | 2 | Unclear where AI stopped and candidate started |

**Hire Recommendation: No Hire**

**Rationale:** The code works, and the candidate has the technical fundamentals. But the Decision Document reveals that they implemented without deeply reasoning through the design choices — they went async because the spec said < 50ms, not because they analyzed the trade-off. The oral confirmed this: they could identify problems when prompted but didn't independently work through implications. This is a pattern that matters for an AI Engineer role specifically — if a candidate can't reason through trade-offs in a take-home test with 2 days, they'll rely on AI output in production without sufficient critical evaluation.

---

## Discussion Notes for Two-Scorer Calibration

This profile commonly produces disagreement between scorers:

- **Scorer 1 argument for Hire:** The code works, the async approach is correct, the AI log is credible. The oral was weak but that might be nerves. With coaching, this candidate could develop the reasoning skills.

- **Scorer 2 argument for No Hire:** The Decision Document reveals shallow thinking, not just weak communication. "Acceptable trade-off" without grounding it in anything suggests the candidate didn't actually evaluate the trade-off. This pattern is risky for an AI Engineer who needs to critically evaluate AI-generated code.

**Resolution guidance:** When in doubt on a borderline case, weight the Decision Document heavily. It's the most controlled signal — the candidate had 2 days and no time pressure when writing it. If the written reasoning is shallow, the oral weakness is probably not nerves.
