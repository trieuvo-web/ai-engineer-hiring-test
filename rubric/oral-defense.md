# Rubric: Oral Defense Scoring

This rubric guides interviewers during the 45-minute oral defense session.
Scores are used alongside code and written artifacts in the overall evaluation.

---

## Overview

The oral defense evaluates what coding agents cannot substitute for: judgment, accountability, and the ability to defend trade-offs under live questioning.

**Maximum score:** 12 points (4 dimensions × 0–3)

---

## Dimension 1 — Spec Ambiguity Recognition

**Question focus:** Can the candidate articulate what was ambiguous in the spec and why it required a decision?

| Score | What it looks like |
|-------|--------------------|
| **3** | Names ≥2 specific ambiguities (e.g., "REQ-004 didn't define 'low' or who receives the alert, so I had to choose"). Explains why each ambiguity required a decision rather than an assumption. Can immediately point to the part of their Decision Document or code that resolves it. |
| **2** | Acknowledges ambiguity exists and can name it, but explanation is surface-level ("there were unclear parts"). Resolves it in their submission but cannot fully articulate the decision process. |
| **1** | Notices only obvious gaps when prompted. Treats ambiguity as a spec deficiency rather than a design choice opportunity. Cannot explain how they resolved it. |
| **0** | Does not recognize any ambiguity in the spec, or claims the spec was clear and they "just followed it." |

**Probing questions:**
- "What parts of the spec did you find unclear?"
- "What did 'low confidence' mean to you? How did you decide on that interpretation?"
- "If you sent this spec to a colleague, what would you warn them about?"

---

## Dimension 2 — Trade-off Resolution Depth

**Question focus:** Can the candidate defend their architectural choices, with awareness of alternatives?

| Score | What it looks like |
|-------|--------------------|
| **3** | Names ≥2 alternatives they considered for a key decision. Articulates the trade-off (e.g., "fire-and-forget means we might lose traces under failure, but that's acceptable for debug data vs. blocking evaluation"). Doesn't collapse when asked "what would change your mind?" — has a concrete answer. |
| **2** | Explains the approach they chose but alternatives are vague ("I could have done it differently"). Can articulate one trade-off when pressed. Needs interviewer prompting to go beyond the implementation. |
| **1** | Describes what they did but cannot explain why. Alternatives are absent or generic. "It just seemed right" or "the agent suggested it." |
| **0** | Cannot describe their implementation approach or says "I'm not sure why it works this way." |

**Probing questions:**
- "Walk me through your REQ-005 solution. What did you trade off?"
- "What would you do differently if this was a high-volume production service?"
- "What would change your mind about the approach you chose?"

---

## Dimension 3 — Verification Evidence Quality

**Question focus:** Did the candidate systematically test their own work, beyond "it runs"?

| Score | What it looks like |
|-------|--------------------|
| **3** | Can describe specific edge cases they tested. Has clear mental model of failure modes. Mentions testing with boundary values (e.g., "I tested what happens at exactly 50ms", "I tested with an empty confidence value"). Can explain a case where testing caught a bug. |
| **2** | Ran the provided tests and possibly added one case. Can describe what the tests cover. Does not have a systematic edge-case strategy but can explain how to build one. |
| **1** | "I ran the tests and they passed." No clear understanding of what the tests are actually covering. Cannot explain a failure mode for their implementation. |
| **0** | Did not run any tests, or tests are clearly broken but candidate is unaware. |

**Probing questions:**
- "How do you know your RuleTrace implementation meets the < 50ms requirement?"
- "What would break your implementation if I changed the load from 1 RPS to 1000 RPS?"
- "Walk me through one test you wrote. Why did you choose that case?"

---

## Dimension 4 — Accountability Demonstration

**Question focus:** Is the candidate honest and transparent about AI use, and do they own their decisions?

| Score | What it looks like |
|-------|--------------------|
| **3** | Specific about what AI helped with and what they did themselves. Can point to at least one moment where they chose NOT to follow the AI output (and explains why). Own their architectural decisions even if the AI proposed them ("I chose this because…", not "the AI suggested this"). |
| **2** | Honest about AI use but vague on specifics. Accepts ownership of final decisions but cannot describe the process of verification or correction. AI log is credible but thin. |
| **1** | AI log is present but generic. Cannot explain whether AI output was modified. Deflects when asked about specific decisions ("I just followed the agent's recommendation"). |
| **0** | No AI log, or clearly fabricated. Cannot explain their own code in the oral. Decision Document language is indistinguishable from AI output with no personal voice. |

**Probing questions:**
- "Tell me about a moment you changed or rejected what the AI suggested."
- "Walk me through this line of code. Did you write it, or did the agent write it? How did you verify it?"
- "How did you use AI for your Decision Document? [follow-up if they say "I didn't": Why not?]"

---

## Automatic No-Hire Flags

Any of the following should be escalated to a second reviewer before a final decision:

- Candidate cannot explain the purpose of their own `RuleTraceService.record()` method
- Candidate's oral answers contradict their Decision Document in a way they cannot reconcile
- Candidate's explanation of REQ-005 shows no awareness of the async/sync trade-off
- Decision Document reads as AI output and candidate cannot expand on any of it in their own words
- Score of 0 on any single dimension

---

## Interviewer Notes

- Score immediately after each section, not at the end of the oral
- Do not show scores to the candidate
- If borderline on a dimension (between scores), note a specific quote from the candidate to anchor your score
- Complete the score card before discussing with a second rater
