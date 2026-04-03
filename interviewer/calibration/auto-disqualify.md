# Calibration Example: Auto-Disqualify

This is a reference submission for calibration. It illustrates three distinct automatic disqualifier patterns. Real submissions may trigger only one — any single disqualifier is sufficient.

---

## Pattern A: AI Log Absent / Placeholder

**What you'll see:**

```
# AI Collaboration Log

I used Claude Code to assist with some parts of the implementation.
```

Or the file is missing entirely. Or it contains only the template text with nothing filled in.

**Why this disqualifies:**

The AI log is a scored component, and it's the primary signal for AI Engineer-specific judgment. An absent or placeholder log does not fail a checkbox — it signals that the candidate did not engage with what we're actually evaluating. This is different from a weak log (which might score 2-3 points across criteria). A missing log is not a low score; it's a signal that the candidate didn't read the instructions or chose not to follow them.

**How to handle in practice:**

If the log is absent, check the automatic disqualifier box and proceed to hire recommendation (Auto-Disqualify). Do not continue scoring other components. Write one sentence in the rationale field: "AI log absent — candidate submitted no collaboration log despite it being a required and scored component."

**Edge case:** A log that says "I did not use AI for any part of this assessment" with a brief explanation is not an automatic disqualifier — it is a scored response that will score very low on delegation/ownership criteria but is not absent. Score it accordingly.

---

## Pattern B: AI Log Clearly Fabricated

**What you'll see:**

The AI log references tools, interactions, or workflows that are inconsistent with the rest of the submission. Examples:

- Log says "used Cursor to edit the RAG implementation" but the code has commit messages from VS Code (or vice versa)
- Log describes asking the AI to "generate 20 test cases" but the submission has 2 tests
- Log references a specific debugging session ("the AI caught a null pointer in my seed script") but the seed script has an unresolved null pointer bug
- Log says "I rejected the AI's suggestion to use a queue" but the code uses exactly the queue setup the AI would have suggested (right down to the variable names)

**Why this disqualifies:**

Fabrication is not just a process failure — it's a signal about judgment. An AI Engineer who fabricates their AI collaboration log is demonstrating that they believe the right answer is "I critically evaluated AI output" even when they didn't. This is exactly the failure mode we're trying to screen against: treating AI output as a credibility signal rather than a tool to evaluate.

**How to handle in practice:**

If you suspect fabrication based on internal inconsistencies, note the specific contradictions in the rationale field. Do not challenge the candidate about it in the oral — the score card should stand on the written evidence. If you are uncertain, mark it Borderline and escalate rather than guessing.

**Important:** A log that is wrong about minor details (misremembers exact wording, slightly off on timing) is not fabrication. The standard is "cannot plausibly describe the actual submission," not "is not a perfect record."

---

## Pattern C: Decision Document Clearly AI-Generated

**What you'll see:**

> **Q1 — REQ-004: Alert when confidence is low**
>
> When considering the challenge of alerting on low confidence, there are several important factors to take into account. First, it is crucial to establish what constitutes "low" confidence in the context of this system. This requires careful consideration of the domain requirements and the impact of false positives versus false negatives. One possible approach would be to implement a configurable threshold that can be adjusted based on operational needs. Additionally, the alert mechanism should be designed with scalability in mind, potentially leveraging modern event-driven architectures to ensure reliable delivery across different notification channels.

**Patterns that indicate AI generation:**
- Passive voice throughout ("there are several factors to consider", "it is important to note")
- No first-person decisions ("one possible approach would be" instead of "I chose")
- No specific numbers or values chosen
- Hedged on every statement ("potentially", "one could argue", "in some cases")
- Addresses all considerations without resolving any of them
- Reads as a summary of options, not a record of decisions
- Structured like a consulting deliverable, not engineering reasoning

**Why this disqualifies:**

The Decision Document is the central evaluation artifact. "Write this yourself" is explicit in the instructions, and the reason it matters is stated: we want to read their reasoning. An AI-generated Decision Document means we have no signal on the primary evaluation criterion for this role.

**What it does NOT disqualify:**
- Well-written and polished — candidates can edit their own writing
- No typos or awkward phrasing — this is not a test of writing skill
- Uses technical terms correctly — candidates can know their domain
- Has a clear structure — organizing one's thoughts is a skill

The specific disqualifier is: passive voice + no personal positions + generic trade-off language + no specific choices made. All four together, not just one or two.

**How to handle in practice:**

If the Decision Document triggers this disqualifier, ask one or two questions in the oral before marking the box. Some candidates write in a more formal register but can defend their reasoning verbally. If they can explain the reasoning behind a "specific" choice that isn't actually specific in the document (e.g., "you wrote you chose a threshold — what threshold?"), and they have a real answer, weight the oral more heavily and do not check the auto-disqualify box.

If they cannot explain any decision from the document, or say "the AI helped me structure my thoughts" about the Decision Document specifically, check the box.

---

## Pre-filled Score Card (Pattern C illustrated)

**Candidate:** [Auto-Disqualify Calibration — Pattern C]

| Component | Criterion | Score | Notes |
|-----------|-----------|-------|-------|
| **Part 1B — Decision Document** | Q1 (REQ-004 conflict) | — | Auto-disqualifier triggered — scoring not completed |
| | Q2 (50ms tension) | — | |
| | Q3 (scope decisions) | — | |
| | Voice / authenticity | — | |
| | Defends in oral | — | Probed Q1 threshold — candidate said "I think I wrote 0.5, I'm not sure why" |

**Automatic Disqualifier checked:** ☑ Decision Document clearly AI-generated

**Hire Recommendation: Auto-Disqualify**

**Rationale:** Decision Document reads throughout in passive voice with no specific choices made and no personal positions taken. Probed in oral: candidate could not recall or explain the threshold choice from Q1, confirming the document was not written from their own reasoning. The code quality was acceptable (Part 1A) which makes this a more difficult conversation, but the explicit instructions and the primary evaluation purpose of the Decision Document make this a clear disqualifier.

---

## On the Difficulty of Auto-Disqualifiers

Auto-disqualifiers are intentionally rare and require clear evidence. When in doubt:

1. Probe in the oral before deciding
2. If borderline, escalate rather than auto-disqualifying
3. Document the specific evidence in the rationale field

The goal is not to catch candidates — it is to ensure that when a disqualifier is applied, it is defensible and consistent across interviewers.
