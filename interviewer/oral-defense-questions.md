# Oral Defense Questions

Required questions are marked **[R]**. Probes are used when an answer is shallow or vague. Use probes as follow-ups, not as a sequence to work through.

All questions are designed to require explanation and reasoning, not recall. No question requires knowledge of this project's specific domain (Tu Vi, Vietnamese astrology, etc.).

---

## Section 1: Code Walkthrough

### Part 1A — RuleTraceService

**[R]** Walk me through your RuleTraceService. What does it do and what decisions did you make while implementing it?

**[R]** Your `record()` method writes to PostgreSQL. REQ-005 says evaluation must complete in < 50ms. How did you handle that tension?

- *Probe (if "async"):* What happens to the trace if the service crashes after evaluation but before the write completes?
- *Probe (if "synchronous"):* Have you measured the latency? What did you observe?
- *Probe (shallow answer):* What were the alternatives you considered? Why did you rule them out?

**[R]** What does your `getByRuleId()` return if the ruleId doesn't exist in the database?

- *Probe:* Is that the behavior you'd want in production? What would the caller do with that response?

What's one thing in this code you'd do differently if you had another 2 hours?

- *Probe:* Why that specifically?

### Part 2 — RAG / RuleSearchService

**[R]** You chose [embedding model from their submission]. Why that one?

- *Probe:* What alternatives did you consider?
- *Probe:* What would break if you had to switch to a locally-hosted model tomorrow?

**[R]** Walk me through your seed script. How did you decide how to structure the embeddings?

- *Probe:* If two rules are semantically very similar but different in category, what does your implementation return? Is that the right behavior?

Give me a test query. What do you expect to come back?

- *Probe (if they give a simple query):* Give me a harder one — something where you're not sure what the top result should be.

---

## Section 2: Decision Document

### Q1 — REQ-004: Alert when confidence is low

**[R]** In your Decision Document you answered Q1 about the confidence alert. Tell me what you wrote, in your own words.

- *Probe:* What threshold did you pick? Why that number specifically?
- *Probe:* You said you'd [log / emit event / send alert]. What happens in production if no one is watching the logs?
- *Probe:* The spec says "alert" — how confident are you that logging is what the spec author meant?

If the product manager told you tomorrow that this alert needs to go to a Slack channel, what would you change?

### Q2 — REQ-005: 50ms evaluation with PostgreSQL

**[R]** In your Decision Document you described how you handled the 50ms tension. Explain your approach.

- *Probe:* Walk me through the timing. How did you verify it's actually under 50ms?
- *Probe:* You mentioned [their approach] — what's the data loss risk in that design?
- *Probe:* If this system scaled to 10,000 rule evaluations per second, would your approach still work?

What would change in your design if trace data was used for billing?

### Q3 — Scope decisions

**[R]** Your Decision Document mentions you intentionally didn't implement [their specific item]. What would that implementation have looked like?

- *Probe:* How long would it have taken you?
- *Probe:* If a real product manager asked you to add it now, what's the first question you'd ask?

If you had another 4 hours, what would you add first? Why that?

---

## Section 3: AI Log

### AI Collaboration Process

**[R]** In your AI log you described [specific moment from their log — correction or rejection]. Tell me more about that.

- *Probe:* How did you catch it? What made you suspicious that the AI output was wrong?
- *Probe:* Did you ask the AI to fix it, or did you fix it yourself? Why?

**[R]** You wrote that [moment AI shaped their thinking]. What would you have done if the AI hadn't framed it that way?

- *Probe:* How do you tell the difference between AI output that's teaching you something and AI output that's confidently wrong?

Is there anything in your submission where you think the AI output wasn't quite right, but you shipped it anyway?

- *Probe (if yes):* Tell me about that.
- *Probe (if no):* That's unusual — walk me through one decision where you pushed back on the AI.

---

## Section 4: Live Requirement Change

Choose **one** based on the submission:

---

**Option A — Audit-grade persistence guarantee**
*(Use if candidate implemented async fire-and-forget)*

> New requirement: trace data is now used for billing — every rule evaluation must confirm persisted before returning a response. No fire-and-forget. The < 50ms requirement remains.

- *If they immediately propose a solution:* Wait — what breaks first in your current design?
- *If they ask a clarifying question (e.g., "does 50ms still apply?"):* Yes. What does that change?
- **Expected strong response:** Identifies that async is out, asks whether 50ms is negotiable, proposes options (synchronous + tight timeout, local disk WAL + async flush, queue with ACK), acknowledges trade-offs of each.
- **Expected weak response:** "I'd make the write synchronous" — without identifying that this may break the 50ms constraint or asking about durability tolerance.

---

**Option B — Self-hosted embedding model**
*(Use if candidate used an API-based embedding model like OpenAI)*

> New requirement: for data privacy reasons, no data can leave the company's infrastructure. Your embedding model must be self-hosted. You're switching from [their model] to nomic-embed-text running on Ollama locally.

- *If they ask about dimension mismatch:* Good question — assume same dimensions, but latency is 3x higher.
- **Expected strong response:** Identifies that existing embeddings in Qdrant must be regenerated (not just swapped), asks about latency impact on search SLA, considers whether embedding quality changes the score thresholds.
- **Expected weak response:** "I'd just swap out the API call" — without recognizing that existing embeddings in Qdrant were generated with the old model and will produce incorrect similarity scores.

---

**Option C — Multi-tenancy**
*(Use as fallback for any submission)*

> New requirement: the system needs to support multiple clients. Each client has isolated rules and traces — Client A's rules must not appear in Client B's search results or trace queries.

- *If they don't ask about isolation level:* Does isolation need to be at the database level, the application level, or both?
- **Expected strong response:** Identifies multiple isolation approaches (separate Qdrant collections per tenant, row-level filtering with tenant ID, separate databases), discusses trade-offs (operability vs simplicity vs cost), asks about data volume and tenant count.
- **Expected weak response:** "I'd add a tenantId field" — without recognizing that a filter on a shared Qdrant collection may leak metadata or that row-level isolation has performance implications at scale.

---

## Scoring guidance for Section 4

| Score | Description |
|-------|-------------|
| 5 | Immediately identifies what breaks; asks at least one clarifying question; presents 2+ options with explicit trade-offs; demonstrates awareness of second-order effects |
| 4 | Identifies what breaks; proposes a valid solution with at least one trade-off named |
| 3 | Identifies what breaks; proposes a solution but misses key trade-offs; asks a clarifying question only when prompted |
| 2 | Identifies what breaks only when prompted; proposes a solution but cannot explain why it's better than alternatives |
| 1 | Does not identify what breaks; proposes a solution without reasoning; or unable to propose a solution at all |
