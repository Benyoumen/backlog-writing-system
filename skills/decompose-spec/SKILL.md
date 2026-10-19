---
name: decompose-spec
description: Breaks an approved spec into small, verifiable tasks cut as vertical slices, ordered by dependency, each with an acceptance criterion, a named verification, a declared dependency and a size from XS to L. Anything above L is split, not estimated, and the whole fits inside the appetite set in the frame. Use when a spec exists but no plan does, when an item looks too big to start, when someone asks how long it will take, or when work can run in parallel.
license: MIT
metadata:
  version: "1.1"
  author: Benjamin Tayar
  method: backlog-writing-system
---

# Decompose the spec

> A good split is the difference between a team that moves and a team that stalls. Every task fits one focused work session, is verifiable on its own, and leaves the system working when it ends.

## When to use

- A spec is approved and no plan exists.
- An item looks too big to start.
- Someone asks how long it will take.
- Work could run in parallel and nobody has drawn what depends on what.

## Inputs

- The approved spec (`write-prd`).
- The appetite from the frame: the time the sponsor is willing to spend.
- The current board, any mockup, the data sources, and what already exists in the code base. Existing patterns are constraints, and reusing them is cheaper than inventing new ones.
- Your tracker's history of closed items, for sizes and durations.

Output: a plan document with the dependency graph, and task cards in your tracker (Jira, Azure DevOps, Linear or similar). The tracker is the list of record. The plan keeps an index of card ids, never a second copy of the list.

## Procedure

1. Read before writing: the spec, the board, the mockups, the data sources, the code base. Do not write a single card in this step.
2. Read the appetite. The decomposition must fit inside it. If it cannot, cut scope with the product manager before sizing anything; never stretch the appetite to fit the scope.
3. Draw the dependency graph, foundation first. Example for the Acme Field Sales Assistant:

```
Meeting and notes data
  |
  +-- Meeting list screen
  |     |
  |     +-- Follow-up draft
  |     |     |
  |     |     +-- Edit and send
  |     |
  |     +-- CRM update preview
  |           |
  |           +-- CRM write-back after approval
  |
  +-- Activity trail
```

Execution order follows the graph from the bottom up. Foundation first. Highest risk first, within what the foundation allows: if something is going to fail, it should fail in week one.

4. Cut vertical, never horizontal. Wrong (horizontal): model all the data; build all the screens; build all the writes; wire everything together. Nothing works end to end until the last step, and the last step always runs late. Right (vertical): the rep sees today's finished meetings with their notes (data and screen); the rep sees a drafted follow-up and the facts it used (rule and screen); the rep edits and sends the draft (screen and email write); the manager sees what was sent and what was ignored (trail and screen). Each slice delivers behavior you can demo in a meeting. In a system with an AI agent, at least one slice must cross all four layers: collect, decide, present, write. A slice that stops before the write never proves the autonomy contract, which is the part users distrust most.
5. Write each task:

| Element | Where it goes in the tracker |
|---|---|
| One-function title (no "and") | Title |
| What it delivers, in one paragraph | Description |
| Verifiable acceptance criterion | Acceptance criteria field |
| Verification: the proof that closes it (test, probe, eval, check against the source) | Acceptance criteria, last line |
| Dependency | Predecessor / successor link, never prose |
| Size | A numeric field (story points or days), so it enters capacity math |

A number in prose cannot be summed. A number in a field can.

6. Size, and split when needed:

| Size | Files touched | Points | Example |
|---|---|---|---|
| XS | 1 | 1 | one validation rule |
| S | 1 to 2 | 2 | one endpoint, one new field on a screen |
| M | 3 to 5 | 3 | one whole vertical slice |
| L | 5 to 8 | 5 | slice with an integration and a new screen |
| XL | 8 or more | none | not estimated: split |

Split when: it exceeds one focused session; the acceptance criterion does not fit in three bullets; it touches two independent subsystems; the title contains "and".

7. Take time from history, not opinion. For each closed item of the same type, measure creation to done in working days. Report p50 (the planning number) and p80 (the commitment number). The gap between them is the margin, and it exists because the slowest observed case is always slower than the typical one. With fewer than 8 closed comparable items, refuse to give a measured number: mark the estimate `declared` and say who declared it. Label every number `measured`, `partial` or `declared`. If size fields are mostly empty, the forecast falls back to item type; the fix is to fill the size field on every story that enters a sprint.
8. Order and checkpoints: dependency satisfied, foundation first; each task leaves the system working; a checkpoint every 2 or 3 tasks, with a review or acceptance stage in the board before anything is marked done; high risk early.

```markdown
### Checkpoint: after tasks 1 to 3
- [ ] The verification passes
- [ ] The slice works end to end with real data
- [ ] The PM saw it and approved before the next task started
```

9. Write the plan with `templates/execution-plan.md`, or this short form:

```markdown
# Plan: <feature>

## In one sentence
<What this delivers and for whom.>

## Appetite
<From the frame. The slices below fit inside it.>

## Slices
### Phase 1: foundation
- [ ] #1234 <task>  (M, 3 pts)
- [ ] #1235 <task>

### Checkpoint: foundation
- [ ] Verification passes, slice demonstrable

## Risks
| Risk | Impact | Mitigation |

## Open questions
- <what depends on the PM or tech lead>
```

## Rules

- Appetite before estimate. The appetite is an input; the estimate is checked against it. When they disagree, scope moves, not the appetite.
- The chain decides the order, not the score. A low-value slice that a valuable one depends on is cut and scheduled first, with its inherited priority written on the card (`prioritize-now-next-later`).
- Vertical, never horizontal. At least one slice reaches the write layer.
- No task is XL. Above L you split; you do not estimate.
- Dependencies live in the tracker's link field, not in prose.
- Every number carries a label: `measured`, `partial` or `declared`.
- Never rewrite a plan that still has open tasks. Those tasks may be in progress in another session. Stop and ask.
- Never mass-close or delete cards from another plan to make room.

Rationalizations to reject:

| Excuse | Reality |
|---|---|
| "I will discover it as I go." | That is how rework starts. Ten minutes of planning saves a sprint. |
| "The tasks are obvious." | Write them anyway. Explicit tasks expose hidden dependencies. |
| "Planning is overhead." | Planning is the task. Executing without a plan is typing. |
| "I keep it all in my head." | Sessions end, context is finite, and the next person has no access to your head. |
| "I know the estimate from experience." | Compute it from history and compare. If they match, good. If not, you just measured your bias. |
| "We will make the appetite bigger." | Then the frame is wrong and goes back to the sponsor. The plan does not decide that. |

## Checklist

- [ ] The decomposition fits inside the appetite, or scope was cut with the PM before sizing.
- [ ] Every task has a verifiable acceptance criterion.
- [ ] Every task names the proof that verifies it.
- [ ] Dependencies are in the tracker's link field, not in prose.
- [ ] No task is XL.
- [ ] The cut is vertical, and at least one slice reaches the write layer.
- [ ] There is a checkpoint between phases.
- [ ] Time comes from history with a label, or is declared and marked declared.
- [ ] The plan holds an index of card ids, not a second task list.
- [ ] No plan with open tasks was overwritten.

## Example

Weak: "Task 1: data model. Task 2: all the API endpoints. Task 3: all the screens. Task 4: integrate. Estimate: 6 weeks, we have done this before."

Corrected: "Appetite: six weeks of two people (frame). Slices: US01 the rep sees finished meetings with notes (M, 3); US02 the rep sees a draft with its facts (M, 3); US03 the rep edits and sends (M, 3, reaches the write layer); US04 the rep sees a CRM preview (M, 3); US05 approved update applied (L, 5, write layer). Dependencies as links. Durations labeled `declared` because fewer than 8 comparable items are closed. Critical path 13 working days, inside the appetite." (Illustrative; the full decomposition is in `../../examples/acme-sales-assistant/decomposition.md`.)

## Definition of done

The plan is done when a developer who was not in the conversation can pick the first task, finish it in one session, prove it with the named verification, and know which task unlocks next, without asking anyone.

## Related

- Before: [`write-prd`](../write-prd/SKILL.md), [`frame-the-problem`](../frame-the-problem/SKILL.md) for the appetite. After: [`prioritize-now-next-later`](../prioritize-now-next-later/SKILL.md) for the bands, the chain and the waves, [`capacity-simulation`](../capacity-simulation/SKILL.md) for the dates, [`execution-plan`](../execution-plan/SKILL.md), [`backlog-standard`](../backlog-standard/SKILL.md).
- Why: [principle 5, sequence by the chain, not by the score](../../docs/principles.md#5-sequence-by-the-chain-not-by-the-score); [the prioritization method](../../docs/prioritization.md); [the delivery flow](../../docs/delivery-flow.md).
- Template: [`execution-plan.md`](../../templates/execution-plan.md). Example: [`decomposition.md`](../../examples/acme-sales-assistant/decomposition.md).
