# Interviewer Guide — AI Engineer Hiring Test

This guide enables an interviewer with distributed systems experience to evaluate a candidate submission and run the oral defense independently.

---

## Test Philosophy

We're hiring AI Engineers for a team that uses coding agents in production. The test is deliberately designed to let candidates use agents — we expect them to. The question is not "did they use AI?" but "do they know what AI cannot do for them?"

**What agents can do:** implement a spec, generate boilerplate, write tests, scaffold infrastructure.

**What agents cannot do:** make judgment calls, own trade-offs, defend decisions under live questioning.

The Decision Document and oral defense evaluate judgment. The AI log evaluates transparency and self-awareness. The code evaluates whether the implementation is sound — not that the candidate typed every character.

**Implication for scoring:** A candidate who used Claude to write all the code but wrote an honest, insightful Decision Document and defends their reasoning well in the oral is a stronger hire signal than a candidate with perfect code and a vague Decision Document. Weight accordingly.

---

## Pre-Oral Preparation (~30 minutes)

Before the oral defense, review the submission:

### 1. Read the Decision Document first (15 min)
- Do the three answers sound like the candidate's voice, or polished AI output?
  - Red flags: passive voice, hedged language on every statement, "we should consider...", "it's important to note...", generic trade-offs without specific numbers or choices
  - Green flags: personal pronouns ("I chose...", "I assumed..."), specific thresholds or values chosen, references to what they actually built
- Note any decisions you want to probe in the oral
- Flag any automatic disqualifiers (see score card)

### 2. Scan the code (10 min)
- Does it run? (Check if there's a test output or README setup steps that look credible)
- Does the RuleTrace implementation make sense structurally?
- Does the RAG implementation reflect the embedding choice they claimed?
- Note specific lines or choices to ask about

### 3. Read the AI log (5 min)
- Does it match the rest of the submission? (If they say they wrote the Decision Document themselves, does the style match?)
- Is it specific enough to be credible, or does it read as a generic placeholder?
- Note specific entries to follow up on

---

## Oral Defense Script

### Opening (2 min)

> "Thanks for submitting. We've reviewed your code and Decision Document. The next 45 minutes is a conversation, not a quiz — we want to understand how you think. There are no trick questions and nothing you need to know about this specific project. Let's start by walking through your code."

---

### Section 1: Code Walkthrough (~15 min)

Start with a neutral, open prompt:

> "Walk me through your RuleTraceService. Tell me what it does and any decisions you made while implementing it."

Listen for: whether they can describe their own code clearly. Follow up on any areas that look interesting or unclear:

> "You're persisting to PostgreSQL here. REQ-005 says evaluation must complete in < 50ms. How did you handle that?"

> "Your `record()` method — what happens if the database is unavailable? Did you think about that?"

> "For Part 2, you mentioned you used [embedding model]. Why that one over alternatives?"

> "Show me the seed script. How did you decide how to structure the embeddings?"

**Soft probe (if answer is shallow):**
> "Say more about that. What were the alternatives you considered?"

---

### Section 2: Decision Document (~15 min)

For each of the 3 questions, ask the candidate to explain their answer in their own words first:

> "In your Decision Document, you answered Q1 about REQ-004 — the confidence alert. Can you tell me what you wrote, in your own words?"

Then probe:

**Q1 probes (confidence / alert):**
- "What threshold did you pick for 'low confidence'? Why that number specifically?"
- "You said you'd log the alert. What would happen in production if no one reads the logs?"
- "If the product manager asked you tomorrow why the alert wasn't working, what would you tell them?"

**Q2 probes (50ms / PostgreSQL tension):**
- "Walk me through the timing. How did you verify it's under 50ms?"
- "Your solution uses [async/sync approach]. What data loss risk does that introduce, if any?"
- "If this system scaled to 10,000 rule evaluations per second, would your approach still work?"

**Q3 probes (scope decisions):**
- "You said you didn't implement X. What would implementing X have looked like?"
- "If you had another 4 hours, what would you add first and why?"

**Red flags to probe:**
- Candidate cannot explain a decision from their own document: "I'm not sure why I wrote that" or deflects to the AI
- Decision Document appears to have been written by AI: probe by asking for specifics not in the document
- Candidate says "the AI suggested X so I went with X" without any personal judgment

---

### Section 3: Live Requirement Change (~15 min)

> "I'm going to add one new requirement. You don't need to implement it right now — I just want to hear how you'd approach it."

**Use one of these (your choice based on their submission):**

**Option A (if they implemented async persistence):**
> "New requirement: the client needs audit-grade guarantees — every rule evaluation must be confirmed persisted before returning a response. No fire-and-forget. How does that change your design? What breaks?"

**Option B (if their RAG uses a specific model):**
> "New requirement: the embedding model must be self-hosted — no external API calls. The team is switching from OpenAI embeddings to a local Ollama model. What changes in your implementation? What's the risk?"

**Option C (general):**
> "New requirement: the system now needs to support multi-tenancy. Each client has isolated rules and traces. What's the first thing you'd need to change in your current design?"

Listen for:
- Do they identify the right risks and trade-offs?
- Do they ask clarifying questions before proposing a solution?
- Are they comfortable saying "I don't know exactly, but I'd start by..."?

**Good signal:** Candidate asks "does the < 50ms constraint still apply?" or "does isolation need to be at the database level or application level?" — this is someone who knows requirements have hidden constraints.

**Weak signal:** Candidate immediately proposes an implementation without identifying what breaks first.

---

### Closing (2 min)

> "Thanks — that's all from me. Do you have any questions about the team or how we use AI in our workflow?"

Note: This is not scored, but it's informative. Candidates who ask thoughtful questions about AI usage in production often have genuine interest in the role.

---

## Score Card Walkthrough

See [`score-card.md`](./score-card.md) for the complete scoring instrument.

**Filling out the score card:**
1. Score each criterion independently — don't let overall impression anchor you
2. Write at least one sentence in the rationale field for any score of 1, 2, or 5 — these are the most informative
3. Check automatic disqualifiers before writing hire recommendation — a disqualifier overrides all scores
4. Hire recommendation requires a written rationale

**Handling ties:**
- Two scorers disagree by 1 point on a criterion: use the lower score, note in rationale
- Two scorers disagree by 2+ points: discuss before finalizing; if unresolved, escalate

**When to escalate:**
- You're uncertain whether an automatic disqualifier applies
- The hire recommendation is Borderline (neither clear hire nor clear no hire) after discussion

---

## Calibration

Before using this guide for the first time, review the three calibration examples in [`calibration/`](./calibration/):
- [`strong-hire.md`](./calibration/strong-hire.md)
- [`borderline-no-hire.md`](./calibration/borderline-no-hire.md)
- [`auto-disqualify.md`](./calibration/auto-disqualify.md)

These include sample Decision Document excerpts, AI log excerpts, and pre-filled score cards with rationales. Calibrate your scoring against these before evaluating candidates.
