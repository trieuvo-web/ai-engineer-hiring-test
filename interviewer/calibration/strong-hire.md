# Calibration Example: Strong Hire

This is a reference submission for calibration. Use it to anchor your scores before evaluating actual candidates.

---

## Decision Document Excerpt

> **Q1 — REQ-004: Alert when confidence is low**
>
> I defined "low" as confidence < 0.4. I picked this threshold because the seed data has confidence values ranging from 0.3 to 0.95, and I wanted something that would trigger on the bottom quartile without flooding logs during normal operation. The choice is arbitrary and should be tunable — I hardcoded it as a constant `MIN_CONFIDENCE_THRESHOLD = 0.4` with a comment explaining why it needs to be config-driven in production.
>
> For the alert mechanism, I logged a warning using NestJS's built-in Logger. I considered emitting an event (EventEmitter2) but decided against it — the spec doesn't say anyone consumes these alerts, and adding an event bus for an undefined consumer would be over-engineering. If there was a real consumer (Slack webhook, email), I'd add it then. I documented this as a scope decision in Q3.
>
> Assumption: "alert" means "record that this happened" at this stage. If the interviewer tells me "alert means Slack message", that changes the implementation significantly — but that clarification wasn't in the spec and I didn't want to block on it.

> **Q2 — REQ-005: 50ms evaluation with PostgreSQL persistence**
>
> I implemented async fire-and-forget for the trace write. The rule evaluation returns immediately after recording the trace to a local buffer; the database write happens asynchronously. This keeps evaluation under 50ms in practice.
>
> The trade-off I knowingly made: if the service crashes between evaluation and the database write completing, the trace is lost. I considered three alternatives: (1) skip persistence entirely and log to stdout, (2) write synchronously and accept that some evaluations will exceed 50ms, (3) use a queue (Redis/SQS). I ruled out (1) because REQ-002 says persist to PostgreSQL — it's explicit. I ruled out (3) because it introduces infrastructure complexity without a spec requirement for durability guarantees. I chose async because it satisfies both REQ-005 and REQ-002 under normal conditions and the spec doesn't mention durability guarantees for traces.
>
> I would revisit this decision if the team told me "trace data is used for billing" — that changes the durability requirement completely.

---

## AI Log Excerpt

> **What I delegated:** Asked Claude to scaffold the NestJS controller and write the Prisma schema. It got both roughly right on the first pass.
>
> **What I kept:** The 50ms decision was entirely mine. Claude initially suggested writing synchronously to PostgreSQL and "tuning the connection pool to reduce latency." I rejected this because it doesn't address the fundamental I/O problem — a well-tuned pool still adds ~5-20ms per write, which eats into a 50ms budget that already includes rule evaluation time. I went with async instead and documented the risk.
>
> **Moment AI shaped my thinking:** I was going to emit an EventEmitter2 event for the confidence alert. Claude pointed out that if no one subscribes to the event, it silently does nothing — which is worse than a logged warning because at least the log is inspectable. I kept the log approach, which was actually in my original plan, but the framing helped me articulate why.
>
> **Moment I corrected AI:** The seed script Claude wrote used `qdrant-js` v1 API syntax. I'm on v1.7, and the API changed — `client.upsert()` now takes a different payload shape. I caught it when the script threw a 422. Fixed it by reading the qdrant-js changelog, not by asking Claude again (since it had already given me the wrong version once).

---

## Pre-filled Score Card

**Candidate:** [Strong Hire Calibration Example]

| Component | Criterion | Score | Notes |
|-----------|-----------|-------|-------|
| **Part 1B — Decision Document** | Q1 (REQ-004 conflict) | 5 | Specific threshold (0.4), reasoned elimination of alternatives, correctly scopes to what spec actually requires |
| | Q2 (50ms tension) | 5 | Names trade-off explicitly (data loss on crash), explains 3 alternatives and why each was rejected, would revisit under different requirements |
| | Q3 (scope decisions) | 4 | Connects scope decisions back to Q1/Q2 — coherent picture of reasoning |
| | Voice / authenticity | 5 | First person throughout, specific numbers, no hedging on actual decisions |
| | Defends in oral | 5 | *(score after oral)* |
| **Part 3 — AI Log** | Specificity | 5 | Names specific tools, specific moments, specific errors caught |
| | Correction/rejection moment | 5 | Qdrant API version mismatch — concrete, verifiable, shows real debugging |
| | AI-shaped thinking moment | 4 | EventEmitter silent-failure observation — useful, candidate had already chosen correct approach but articulates it better |
| | Consistency with submission | 5 | Log references specific decisions that match the code and document |
| | Honest vs performative | 5 | No idealization — includes an AI error, describes own prior plan, doesn't claim AI was either perfect or useless |
| | Delegation vs ownership | 5 | Clear: AI did scaffolding, candidate decided on 50ms strategy |

**Hire Recommendation: Strong Hire**

**Rationale:** The Decision Document shows genuine engineering judgment — specific threshold choices, named trade-offs, explicit risks (data loss on crash), and an explicit "I would revisit this if..." that demonstrates the candidate understands requirements shape design. The AI log is consistent with the submission and includes a real debugging moment (wrong API version). The oral defense should confirm but the written evidence is already compelling.

---

## Oral Defense Notes (for calibration)

**When asked about the 50ms trade-off:**
> "My implementation uses async fire-and-forget. The trace is written to a local buffer and flushed to Postgres asynchronously. The rule evaluation returns immediately. The risk is data loss if the service crashes between evaluation and write — I noted this in my Decision Document. I considered a queue but the spec doesn't require durability guarantees for traces, so I kept it simple."

**When asked about the confidence threshold:**
> "I picked 0.4 as an arbitrary starting point. It should be config-driven — I have a comment in the code about that. If you told me the product requires a different threshold, I'd just change the constant. The choice of alert mechanism (log warning) was more considered — I didn't want to emit an event with no consumer."

**When given the live requirement change ("audit-grade guarantees — every trace must confirm persisted"):**
> "That changes everything about my 50ms approach. If we need confirmed persistence, async fire-and-forget is out. Options: (1) accept that some evaluations exceed 50ms and remove or soften that requirement, (2) write to PostgreSQL synchronously with aggressive timeouts and connection tuning, (3) write to an append-only log on disk and sync to PostgreSQL on a background thread with explicit ACK before returning. I'd want to know if the < 50ms requirement is still in effect and if there's a tolerance for the P99 latency."

This response is scored 5 on "Handles challenge" — candidate immediately identifies what breaks, presents options, and asks a clarifying question before proposing a solution.
