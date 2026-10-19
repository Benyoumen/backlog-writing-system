---
name: backlog-standard
description: The writing standard for a three-level backlog (Epic, Feature, User Story). Defines what each level says, the sections each one has, the fixed parent rule, where effort and dependencies live, Definition of Ready and Done, and the rules for AI-behavior items. Use when creating, rewriting or reviewing backlog items, before loading a batch into your tracker (Jira, Azure DevOps, Linear), or when someone asks "is this ready to upload?".
---

# Backlog standard

A backlog item exists to reduce interpretation, rework and clarification meetings. It does not exist to be long. This standard says what each level must say, where each piece of information lives, and which checks an item passes before it reaches the board.

Companion skills: `why-it-exists` (the first section of every item), `user-story-writing` (language and acceptance cases), `epic-feature-story-templates` (the section lists and how to fill them).

## 0. Scope: new work only

Apply the standard to new items. Do not rewrite items a developer is already implementing. A rewrite mid-implementation confuses the team and produces tickets about the ticket.

If asked to "clean up" a backlog in progress, ask first: apply the standard to the next batch, or change what is already published? Change published items only on an explicit yes.

## 1. The three-line ruler

| Level | Says | Answers |
|---|---|---|
| Epic | A business outcome | What changes for the business when this exists? |
| Feature | A deliverable capability | What can a person do that they could not do before? |
| User Story | An implementable, testable behavior | What exactly happens, and how do we check it? |

**Level test.** If the technology changed tomorrow and the sentence stayed true, it belongs at business level and moves up. If it names a table, endpoint, method or class, it is implementation. Move it down to the story's Technical notes, or to the Epic's Technical details when it applies to the whole Epic.

## 2. Sections per level

| Level | Sections | Count |
|---|---|---|
| Epic | Why it exists, Problem, Objective, Success metrics, First-release scope, Business rules, Dependencies, Risks and mitigation, Governance and operation, Technical details, Estimate | 11 |
| Feature | Why it exists, Problem and context, Objective, Business value, Expected behavior, Acceptance criteria, Scope and limits, Business rules, Data and sources, Dependencies, Non-functional requirements, Evaluation criteria, Open items and decisions, Traceability, Estimate | 15 |
| User Story | Why it exists, Context, Type, User Story, Expected behavior, Out of scope, Technical notes, Traceability, Acceptance criteria | 9 |

Section names stay identical across items so readers know where to look. Templates are in `templates/`.

## 3. Structural rules

**Fixed parent.** A User Story is always the child of a Feature, never of an Epic. A parent field that sometimes shows a Feature and sometimes an Epic cannot be read at a glance on the board.

**Three things live in fields or relations, not in prose.**

| Information | Lives in | Why |
|---|---|---|
| Effort | The Story Points field (Epic and Feature: an effort field) | A number in a field enters capacity planning. A number in prose does not. |
| Dependencies | A Predecessor / Successor relation | Queries and delivery plans read relations. No tool turns a sentence into a dependency. |
| Definition of Done | The team's standard DoD, inherited | Repeating the same list in every card adds length and no information. |

**Absorbed, not lost.** The old "exception cases" section became acceptance criteria, because the exceptions that matter are testable. "Evaluation criteria" sits on the Feature, because precision, latency and cost are measured on the whole capability, not on one slice of it. "Open items" stay on the Feature only.

**Codes in titles stay.** A title like `ACME-REU-F02-US02` is not replaced by the parent field. The field helps inside the board. The code travels outside it, in email, chat and meeting notes.

**Check the form.** Some trackers do not show the Acceptance Criteria field on Epic or Feature forms. The API may accept the write and store the value while nobody sees it. Test one item in the browser. Where the field is hidden, put criteria in the Description.

**Check the render.** Before loading a batch, create one item and open it. Escaped quotes, doubled HTML entities and stripped lists show up here and nowhere else.

## 4. Type field and Enablers

Every User Story has a Type: Functional, Enabler, or Fix. A Functional story has a persona. An Enabler does not pretend to have one.

- Good Enabler: `Create a single write path to the CRM to allow approved updates.`
- Bad Enabler: `As a user, I want a staging table.`

## 5. Five decisions that go wrong most often

1. **Epic metrics measure outcomes, not machines.** Accuracy, latency, tokens and cost are not Epic success metrics. They go to Technical details, Non-functional requirements or observability. Good Epic metrics: completion per step, critical items still open, time to resolution, share of alerts handled.
2. **Decided technical detail stays.** Do not hide a package, runtime, table or region to make a card sound more like product. The developer needs it. What the backlog must not do is invent architecture that engineering still owns.
3. **No team assumptions.** Do not write "assumes two dedicated developers". Allocation is unstable and must not shape the specification.
4. **Enablers do not fake a persona.** See section 4.
5. **Acceptance, evaluation and done are three different things.** Acceptance asks whether the behavior exists. Evaluation asks whether its quality is good enough. Done asks whether the delivery has tests, logs, security review and documentation. Do not repeat one inside another.

## 6. Acceptance criteria

State exactly what must happen. Never write "the agent must work correctly".

Use Given / When / Then when the item has a rule, a decision, an exception, an ambiguity or a state change. Simple existence is better as a direct statement.

```
Given the same event was already processed
When it is received again
Then no new run is created.
```

On a Feature, write 4 to 8 criteria. On a User Story, follow `user-story-writing` (3 to 6 cases). One criterion per list line, never joined with semicolons.

## 7. AI behavior items: five dimensions

A probabilistic item (language model output, extraction, classification, scoring) carries these in its acceptance criteria or its Feature evaluation criteria:

1. **Quality with a number and a window.** Example: at least 90 percent of drafts accepted without edits, measured over four weeks.
2. **Fallback.** What the user sees when the AI fails.
3. **Autonomy guardrail.** What needs human confirmation. Nothing irreversible runs without it.
4. **Auditability.** Input, output, prompt or model version, user and timestamp are logged.
5. **Evaluation method.** Who measures, on what test set or sample, with which production metric. No evaluation method, no Definition of Ready.

## 8. Granularity

- A delivery that fits one sentence and one day is a story under an existing Feature, not a new Feature.
- A defect is a Fix, not a Feature.
- A Feature enters a sprint only when the stories for its first-release cut exist.
- A parent does not close while a child is open.

## 9. Definition of Ready and Definition of Done

**Ready (enters a sprint).** Parent set. Title follows the grammar. Acceptance criteria written. Estimated by the developers, not by the author. Dependencies linked. Data source named. Evaluation method named if the item involves AI.

**Done (closes).** Criteria verified, with a comment saying who verified and how. In production, or demo accepted. Render intact. Living documents updated if scope changed.

## 10. Fill rule

Fill a field when it helps someone decide, implement correctly, or test and accept the delivery. If it helps none of the three, write `not applicable` or omit it. A simple story may have no evaluation criteria. An Epic may list two risks.

## 11. Writing

Use direct order. Sentences run 8 to 22 words. No cleft sentences ("It is X that..."). No colon joining two ideas. No chain of subordinate clauses. Use the imperative when the text speaks to whoever executes. Run the `why-it-exists` and `user-story-writing` checks before saving, including on acceptance criteria.

## 12. Procedure for a new batch

1. Read the source document (product brief, spec, discovery notes). The backlog does not repeat it. It turns it into delivery units and points back to it under Traceability.
2. Draw the tree before writing: Epics, the Features under each, the Stories under each. Check the roll-up: an Epic is the sum of its Features, a Feature the sum of its Stories. A sum that does not match is a declared open item, never a silent adjustment.
3. Reserve codes in a numbering register, and write the tracker ID back after upload.
4. Write one family at a time (one Epic and its children) so vocabulary stays consistent inside it.
5. Harmonize across families: one term per concept, equal depth between siblings, section names identical to the standard.
6. Validate structure with a script or checklist, and register with a read-aloud pass.
7. A human reviews item by item before batch creation. Never publish an AI-generated batch straight to the board.
8. Upload one card, check it in the browser, then upload the batch.
9. Record numbering, and record scope decisions in a decision log with date, decision, owner, reason and affected items.

## Checklist

- [ ] Epic says an outcome, Feature a capability, Story a behavior.
- [ ] All sections of the level are present, in order, with standard names.
- [ ] Story parent is a Feature.
- [ ] Effort is in the field, dependencies are relations, DoD is inherited.
- [ ] Type is set; Enabler has no persona.
- [ ] Epic metrics are outcomes, not machine metrics.
- [ ] Acceptance criteria are observable; Given / When / Then where a rule or state change exists.
- [ ] AI items carry the five dimensions.
- [ ] No team-allocation assumptions.
- [ ] Child does not repeat what the parent already says.
- [ ] Rendered correctly on one real card.

## Definition of done for this skill

A reviewer can open any item written with it, find every section in the expected place, and explain the item aloud without opening the source document.
