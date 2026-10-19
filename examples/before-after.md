# Before and after: three weak items rewritten to the standard

All items belong to the fictional Acme Field Sales Assistant. Each pair shows the original, the rewrite and what changed, with the rule that drove it.

---

## 1. An Epic

### Before

> **Title:** AI follow-up engine
>
> **Description:** Build an intelligent engine that harnesses LLMs to automate the post-meeting workflow end to end. Assumes 2 dedicated developers. Success metrics: 95% accuracy, p95 latency under 2 seconds, cost under $0.02 per run.

### After

> **Title:** ACME-E01 - Customer follow-up is sent and logged within a day of every meeting
>
> **Why it exists:** After a customer meeting, Acme reps write the follow-up email and update the CRM days later, or not at all. Customers wait for an answer, and sales leaders forecast from records that no longer match the deals.
>
> **Success metrics:** 80% of meetings followed up within one working day. 90% of opportunities updated after the last meeting. 60% of drafts sent with no edits or small edits in the first 8 weeks.
>
> **Technical details:** Latency under 2 seconds at the 95th percentile and cost per run are tracked as non-functional requirements. The language model is a decided platform choice.
>
> **Estimate:** 31. Basis: sum of the four Features, estimated by the developers.

### What changed

| Problem in the original | Rule applied |
|---|---|
| The title names a technology, not an outcome. | An Epic says a business outcome (`backlog-standard`, section 1). |
| No "Why it exists", and no affected role. | Start from the consequence of the item not existing (`why-it-exists`). |
| Accuracy, latency and cost are listed as success metrics. | Epic metrics measure outcomes, not machines. Machine metrics move down. |
| "Assumes 2 dedicated developers". | No team-allocation assumptions in the specification. |
| "Harnesses LLMs", "intelligent engine", "end to end". | Plain language, no figurative or inflated terms. |
| No baseline, window or target per metric. | Every metric has a baseline, a target and a window. |

---

## 2. A Feature

### Before

> **Title:** Email draft module
>
> **Description:** The agent drafts emails. The system handles edge cases properly. The agent should work correctly and be fast.
>
> **Acceptance criteria:** Drafts are accurate; the rep can approve; errors are handled; logging is implemented; audit trail is stored.

### After

> **Title:** ACME-E01-F02 - Draft a follow-up email from the meeting notes
>
> **Why it exists:** Today the rep writes each follow-up email after the fact, usually in the evening. Meetings from the morning get an answer a day later, and some customers never get one.
>
> **Acceptance criteria (6):** Given a meeting with saved notes has ended, when the rep opens the assistant, then a draft for that meeting is listed. Given the notes contain no agreed next step, when the draft is created, then the draft has no next-step sentence. Given a draft is open, when the rep approves it, then the email is sent from the rep's own mailbox. (three more, see `examples/acme-sales-assistant/feature.md`)
>
> **Non-functional requirements:** A draft appears within five minutes. Every draft logs input, output, model version, user and time.
>
> **Evaluation criteria:** At least 60% of drafts sent with small or no edits over 8 weeks, reviewed weekly on 30 random drafts.

### What changed

| Problem in the original | Rule applied |
|---|---|
| The title names a module, not a capability the rep can use. | A Feature says a deliverable capability. |
| "Works correctly", "handles edge cases properly", "be fast". | Acceptance criteria state exactly what happens and are observable. |
| Criteria are joined with semicolons and mix behavior, quality and logging. | One criterion per line. Acceptance, evaluation and done are three different things. |
| "Accurate" has no number, window or method. | Quality has a number, a window and a named evaluation method. |
| "Logging is implemented" and "audit trail is stored" sit in acceptance. | Logging and audit belong in non-functional requirements, not in acceptance or stories. |
| No rule or state change is written as Given / When / Then. | Use Given / When / Then wherever a rule, decision or state change exists. |

---

## 3. A User Story

### Before

> **Title:** Staging table, audit trail, retention and permission checks for drafts
>
> **Story:** As a user, I want a staging table so that drafts are stored.
>
> **Why it exists:** Without this slice, the system would not persist drafts properly, which would be a game changer for trust.
>
> **Acceptance criteria:**
> - Scenario 1: drafts are saved.
> - Scenario 2: the system handles failures appropriately and the audit trail is complete.
> - Scenario 3: if the save fails and then the retry also fails and then the fallback queue is full, an alert fires and the rep is notified by email and chat unless notifications are muted.

### After

This item is split, then cut.

**Kept as a story (Enabler):**

> **Title:** ACME-E01-F02-US04 - Store each draft until the rep approves or discards it
>
> **Type:** Enabler
>
> **Story:** Create storage for drafts to allow the rep to review a draft later in the day.
>
> **Why it exists:** Today a draft disappears when the rep closes the screen. The rep must ask the agent again, and the second draft can differ from the first. Reps then distrust the drafts and stop using them.
>
> **Acceptance criteria:**
> ```
> Case: Draft is still there after the rep returns
> Given a draft was created and not yet approved or discarded
> When the rep opens the assistant the next day
> Then the same draft is listed with the same text.
>
> Case: Discarded draft is removed from the list
> Given a draft was discarded
> When the rep opens the assistant
> Then the draft is not listed.
>
> Case: Another rep cannot see the draft
> Given a draft belongs to one rep
> When a different rep opens the assistant
> Then the draft is not listed for them.
> ```

**Moved out of stories:**

- "Audit trail" and "retention" go to the Feature's non-functional requirements.
- "Permission checks" becomes the third case above, because it changes what the rep sees.
- The save-fails-then-retry-fails case is cut. It is an exception of an exception, and the rep takes no different action because of it.

### What changed

| Problem in the original | Rule applied |
|---|---|
| The title stacks four topics. | One main function, sayable in one sentence (`user-story-writing`, rule 5). |
| "As a user, I want a staging table". | An Enabler has no persona: `Create <capability> to allow <behavior>`. |
| "Without this slice," opens the why, and "game changer" is figurative. | Start with the fact. No formula opener, no figurative language (rules 1 and 3). |
| "Scenario 1", "handles failures appropriately". | Cases are named by behavior and the Then is observable (rule 6). |
| A three-step failure chain with a mute condition. | The cut for an exception of an exception: absorb, move or cut. |
| Audit trail and retention written as stories. | Non-functional requirements, not stories (rule 7). |

---

## Pattern across the three

1. Start from the consequence, in plain language, naming a person.
2. Keep each level at its own altitude: outcome, capability, behavior.
3. Make every check observable, and put every number next to a window and a method.
4. Put logging and audit in non-functional requirements.
5. Cut anything that only the author can explain.
