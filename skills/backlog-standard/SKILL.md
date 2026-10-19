---
name: backlog-standard
description: The writing standard for a three-level backlog (Epic, Feature, User Story): what each level says, the sections each one has, the fixed parent rule, where effort and dependencies live, the Definition of Ready and Done, and the rules for AI-behavior items. Use when creating, rewriting or reviewing backlog items, before loading a batch into your tracker (Jira, Azure DevOps, Linear or similar), or when someone asks "is this ready to upload?".
license: MIT
metadata:
  version: "1.1"
  author: Benjamin Tayar
  method: backlog-writing-system
---

# Backlog standard

> A backlog item exists to reduce interpretation, rework and clarification meetings, not to be long. This standard says what each level must say, where each piece of information lives, and which checks an item passes before it reaches the board.

## When to use

- Writing a new Epic, Feature or User Story, or a batch of them from a spec.
- Reviewing items before they are loaded into the tracker.
- Answering "is this ready to upload?" or "is this Ready for a sprint?".
- Deciding whether something is an Epic, a Feature or a Story.

Apply it to new work only. Do not rewrite items a developer is already implementing; a rewrite mid-implementation confuses the team and produces tickets about the ticket. If asked to clean up a backlog in progress, ask first: apply the standard to the next batch, or change what is already published? Change published items only on an explicit yes.

## Inputs

- The source document: the spec (`write-prd`), the decomposition (`decompose-spec`), the execution plan, discovery notes. The backlog does not repeat it; it turns it into delivery units and points back to it under Traceability.
- The templates in `templates/`: Epic (11 sections), Feature (15), User Story (9).
- The team's standard Definition of Done.
- For AI behavior, the eval cases (`eval-cases`). For work a coding agent will build, the agent brief (`agent-brief`).
- The numbering register and the decision log.

## Procedure

1. Read the source document whole.
2. Draw the tree before writing: Epics, the Features under each, the Stories under each. Check the roll-up: an Epic is the sum of its Features, a Feature the sum of its Stories. A sum that does not match is a declared open item, never a silent adjustment.
3. Reserve codes in the numbering register. Write the tracker id back after upload.
4. Write one family at a time (one Epic and its children) so vocabulary stays consistent inside it. Write "Why it exists" first, with `why-it-exists`.
5. Harmonize across families: one term per concept, equal depth between siblings, section names identical to the standard.
6. Run the level test (Rules, section 1) on every item and the fill rule on every section.
7. For every probabilistic behavior, attach eval cases. For every item a coding agent will build, attach an agent brief.
8. Validate structure with a script or the checklist, then a read-aloud pass with `why-it-exists` and `user-story-writing`, including on acceptance criteria.
9. A human reviews item by item before batch creation. Never publish an AI-generated batch straight to the board.
10. Upload one card and open it in the browser. Check the render (escaped quotes, doubled HTML entities, stripped lists show up here and nowhere else) and the form (some trackers do not show the Acceptance Criteria field on Epic or Feature forms; the API may store a value nobody sees; where the field is hidden, put criteria in the Description). Then upload the batch.
11. Record numbering, and record scope decisions in the decision log with date, decision, owner, reason and affected items.

## Rules

### 1. The three-line ruler

| Level | Says | Answers |
|---|---|---|
| Epic | A business outcome | What changes for the business when this exists? |
| Feature | A deliverable capability | What can a person do that they could not do before? |
| User Story | An implementable, testable behavior | What exactly happens, and how do we check it? |

Level test: if the technology changed tomorrow and the sentence stayed true, it belongs at business level and moves up. If it names a table, endpoint, method or class, it is implementation and moves down, to the Story's Technical notes or to the Epic's Technical details when it applies to the whole Epic.

### 2. Sections per level

| Level | Sections | Count |
|---|---|---|
| Epic | Why it exists, Problem, Objective, Success metrics, First-release scope, Business rules, Dependencies, Risks and mitigation, Governance and operation, Technical details, Estimate | 11 |
| Feature | Why it exists, Problem and context, Objective, Business value, Expected behavior, Acceptance criteria, Scope and limits, Business rules, Data and sources, Dependencies, Non-functional requirements, Evaluation criteria, Open items and decisions, Traceability, Estimate | 15 |
| User Story | Why it exists, Context, Type, User Story, Expected behavior, Out of scope, Technical notes, Traceability, Acceptance criteria | 9 |

Section names stay identical across items so readers know where to look. What goes in each is in `epic-feature-story-templates`.

### 3. Structure

- Fixed parent. A User Story is always the child of a Feature, never of an Epic. A parent field that sometimes shows a Feature and sometimes an Epic cannot be read at a glance on the board.
- Three things live in fields or relations, not in prose:

| Information | Lives in | Why |
|---|---|---|
| Effort | The Story Points field (Epic and Feature: an effort field) | A number in a field enters capacity planning. A number in prose does not. |
| Dependencies | A Predecessor / Successor relation | Queries and delivery plans read relations. No tool turns a sentence into a dependency. |
| Definition of Done | The team's standard DoD, inherited | Repeating the same list in every card adds length and no information. |

- Absorbed, not lost. The old "exception cases" section became acceptance criteria, because the exceptions that matter are testable. "Evaluation criteria" sits on the Feature, because precision, latency and cost are measured on the whole capability, not on one slice. "Open items" stay on the Feature only.
- Codes in titles stay. A title like `ACME-E01-F02-US02` is not replaced by the parent field. The field helps inside the board; the code travels outside it, in email, chat and meeting notes.
- Granularity. A delivery that fits one sentence and one day is a story under an existing Feature, not a new Feature. A defect is a Fix, not a Feature. A Feature enters a sprint only when the stories for its first-release cut exist. A parent does not close while a child is open.
- Sections are scaffolding. Any section that helps none of the four readers (engineer, designer, executive, coding agent) is marked `not applicable` or omitted. The standard exists for the readers, not for itself.

### 4. Type field and Enablers

Every User Story has a Type: Functional, Enabler or Fix. A Functional story has a persona. An Enabler does not pretend to have one.

- Good Enabler: `Create a single write path to the CRM to allow approved updates.`
- Bad Enabler: `As a user, I want a staging table.`

### 5. Five decisions that go wrong most often

1. Epic metrics measure outcomes, not machines. Accuracy, latency, tokens and cost are not Epic success metrics. They go to Technical details, Non-functional requirements or observability. Good Epic metrics: completion per step, critical items still open, time to resolution, share of alerts handled.
2. Decided technical detail stays. Do not hide a package, runtime, table or region to make a card sound more like product. The developer needs it. What the backlog must not do is invent architecture that engineering still owns.
3. No team assumptions. Do not write "assumes two dedicated developers". Allocation is unstable and must not shape the specification.
4. Enablers do not fake a persona. See section 4.
5. Acceptance, evaluation and done are three different things. Acceptance asks whether the behavior exists. Evaluation asks whether its quality is good enough. Done asks whether the delivery has tests, logs, security review and documentation. Do not repeat one inside another.

### 6. Acceptance criteria

State exactly what must happen. Never write "the agent must work correctly".

Use Given / When / Then when the item has a rule, a decision, an exception, an ambiguity or a state change. Simple existence reads better as a direct statement.

```
Given the same event was already processed
When it is received again
Then no new run is created.
```

On a Feature, write 4 to 8 criteria. On a User Story, follow `user-story-writing` (3 to 6 cases). One criterion per list line, never joined with semicolons.

### 7. AI behavior items

A probabilistic item (language model output, extraction, classification, scoring, an agent action) carries five dimensions in its acceptance criteria or in its Feature's evaluation criteria:

1. Quality with a number and a window. Example: at least 90 percent of drafts accepted without edits, measured over four weeks.
2. Fallback. What the person sees when the AI fails.
3. Autonomy guardrail. What needs human confirmation. Nothing irreversible runs without it.
4. Auditability. Input, output, prompt or model version, user and timestamp are logged.
5. Evaluation method. Who measures, on what set, with which production metric.

The evaluation method is a set of eval cases (`eval-cases`): a golden set from real inputs, a scoring method, a threshold per risk tier agreed before the build, and never-cases with zero tolerance. "At least 90 percent" is not a criterion until the set it is measured on exists.

### 8. Definition of Ready and Definition of Done

Ready (enters a sprint): parent set; title follows the grammar; acceptance criteria written; estimated by the developers, not by the author; dependencies linked; data source named. For an AI item: eval cases exist with a golden set, a scoring method and a threshold. No eval cases, not Ready. For an item a coding agent will execute: an agent brief exists.

Done (closes): criteria verified, with a comment saying who verified and how. For an AI item: threshold met and zero never-case failures on the full set. In production, or demo accepted. Render intact. Living documents updated if scope changed.

### 9. Fill rule

Fill a field when it helps someone decide, implement correctly, or test and accept the delivery. If it helps none of the three, write `not applicable` or omit it. A simple story may have no evaluation criteria. An Epic may list two risks.

### 10. Writing

Use direct order. Sentences run 8 to 22 words. No cleft sentences ("It is X that..."). No colon joining two ideas. No chain of subordinate clauses. Use the imperative when the text speaks to whoever executes.

## Checklist

- [ ] Epic says an outcome, Feature a capability, Story a behavior.
- [ ] All sections of the level are present, in order, with standard names, or marked `not applicable` on purpose.
- [ ] Story parent is a Feature.
- [ ] Effort is in the field, dependencies are relations, DoD is inherited.
- [ ] Type is set; Enabler has no persona.
- [ ] Epic metrics are outcomes, not machine metrics.
- [ ] Acceptance criteria are observable; Given / When / Then where a rule or state change exists.
- [ ] AI items carry the five dimensions and point to their eval cases.
- [ ] Items a coding agent will build have an agent brief.
- [ ] No team-allocation assumptions.
- [ ] Child does not repeat what the parent already says.
- [ ] Rendered correctly on one real card.

## Example

Weak Epic: title "AI follow-up engine"; success metrics "95 percent accuracy, p95 latency under 2 seconds, cost under 0.02 per run"; description "assumes 2 dedicated developers".

Corrected: title "ACME-E01 - Customer follow-up is sent and logged within a day of every meeting"; success metric "80 percent of meetings followed up within one working day", with a baseline, a target and a window; latency and cost move to Technical details; the staffing assumption is deleted. The full rewrite, with a Feature and a Story, is in `../../examples/before-after.md`.

## Definition of done

A reviewer can open any item written with it, find every section in the expected place, explain the item aloud without opening the source document, and see for every AI item which eval set it is measured against.

## Related

- Companions: [`why-it-exists`](../why-it-exists/SKILL.md), [`user-story-writing`](../user-story-writing/SKILL.md), [`epic-feature-story-templates`](../epic-feature-story-templates/SKILL.md), [`eval-cases`](../eval-cases/SKILL.md), [`agent-brief`](../agent-brief/SKILL.md).
- Upstream: [`write-prd`](../write-prd/SKILL.md), [`decompose-spec`](../decompose-spec/SKILL.md), [`prioritize-now-next-later`](../prioritize-now-next-later/SKILL.md), [`execution-plan`](../execution-plan/SKILL.md). Downstream: [`spec-preview-html`](../spec-preview-html/SKILL.md) renders the batch as one readable page; [`capacity-simulation`](../capacity-simulation/SKILL.md) turns the points and relations into landing dates.
- Why: [principle 6, structure serves navigation](../../docs/principles.md#6-structure-serves-navigation-not-ceremony); [principle 4, the four-reader test](../../docs/principles.md#4-pass-the-four-reader-test); [principle 7, the acceptance criterion is an eval](../../docs/principles.md#7-for-ai-behavior-the-acceptance-criterion-is-an-eval); [the hierarchy](../../docs/hierarchy.md).
- Templates: [`epic.md`](../../templates/epic.md), [`feature.md`](../../templates/feature.md), [`user-story.md`](../../templates/user-story.md). Examples: [`examples/acme-sales-assistant/`](../../examples/acme-sales-assistant/README.md).
