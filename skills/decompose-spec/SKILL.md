---
name: decompose-spec
description: Break an approved spec into small, verifiable tasks cut as vertical slices, ordered by dependency, each with an acceptance criterion, a named verification, a declared dependency and a size from XS to L. Anything above L is split, not estimated. Use when a spec exists but no plan does, when an item looks too big to start, when someone asks how long it will take, or when work can be run in parallel.
---

# decompose-spec: from spec to tasks with a defensible schedule

## Why this exists

A good split is the difference between a team that moves and a team that stalls. Every task must fit one focused work session, be verifiable on its own, and leave the system working when it ends.

Input: an approved spec (see `write-prd`). Output: a plan document with the dependency graph, and task cards in your tracker (Jira, Azure DevOps, Linear or similar). The tracker is the list of record. The plan keeps an index of card ids, never a second copy of the list.

## Step 1. Read before writing

Read the spec, the current board, any mockup, the data sources, and what already exists in the codebase. Existing patterns are constraints, and reusing them is cheaper than inventing new ones. Do not write a single card in this step.

## Step 2. Draw the dependency graph

Draw what depends on what, foundation first. Example for the Acme Field Sales Assistant:

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

## Step 3. Cut vertical, never horizontal

Wrong (horizontal slices):

1. Model all the data
2. Build all the screens
3. Build all the writes
4. Wire everything together

Nothing works end to end until step 4, and step 4 always runs late.

Right (vertical slices):

1. The rep sees today's finished meetings with their notes (data + screen)
2. The rep sees a drafted follow-up and the facts it used (rule + screen)
3. The rep edits and sends the draft (screen + email write)
4. The manager sees what was sent and what was ignored (trail + screen)

Each slice delivers behavior you can demo in a meeting. In a system with an AI agent, at least one slice must cross all four layers: **collect, decide, present, write**. A slice that stops before the write never proves the autonomy contract, which is the part users distrust most.

## Step 4. Write each task

| Element | Where it goes in the tracker |
|---|---|
| One-function title (no "and") | Title |
| What it delivers, in one paragraph | Description |
| Verifiable acceptance criterion | Acceptance criteria field |
| Verification: the proof that closes it (test, probe, eval, check against the source) | Acceptance criteria, last line |
| Dependency | Predecessor / successor link, never prose |
| Size | A numeric field (story points or days), so it enters capacity math |

A number in prose cannot be summed. A number in a field can.

## Step 5. Size, and when to split

| Size | Files touched | Points | Example |
|---|---|---|---|
| XS | 1 | 1 | one validation rule |
| S | 1 to 2 | 2 | one endpoint, one new field on a screen |
| M | 3 to 5 | 3 | one whole vertical slice |
| L | 5 to 8 | 5 | slice with an integration and a new screen |
| XL | 8 or more | none | **not estimated: split** |

Split when: it exceeds one focused session; the acceptance criterion does not fit in three bullets; it touches two independent subsystems; the title contains "and".

## Step 6. Time from history, not opinion

Take the dates from your own tracker history: for each closed item of the same type, measure creation to done in working days. Report **p50** (the planning number) and **p80** (the commitment number). The gap between them is the margin, and it exists because the slowest observed case is always slower than the typical one.

Rules:

- With fewer than 8 closed comparable items, refuse to give a measured number. Mark the estimate `declared` and say who declared it.
- Label every number `measured`, `partial` or `declared`.
- If size fields are mostly empty, the forecast falls back to item type. The fix is to fill the size field on every story that enters a sprint.

## Step 7. Order and checkpoints

1. Dependency satisfied: foundation first.
2. Each task leaves the system working.
3. A checkpoint every 2 or 3 tasks, with a review or acceptance stage in the board before anything is marked done.
4. High risk early.

```markdown
### Checkpoint: after tasks 1 to 3
- [ ] The verification passes
- [ ] The slice works end to end with real data
- [ ] The PM saw it and approved before the next task started
```

## Plan template

Use `templates/execution-plan.md` for the full plan, or this short form:

```markdown
# Plan: <feature>

## In one sentence
<What this delivers and for whom.>

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

## Rules for existing work

- Never rewrite a plan that still has open tasks. Those tasks may be in progress in another session. Stop and ask.
- Never mass-close or delete cards from another plan to make room.

## Rationalizations to reject

| Excuse | Reality |
|---|---|
| "I will discover it as I go." | That is how rework starts. Ten minutes of planning saves a sprint. |
| "The tasks are obvious." | Write them anyway. Explicit tasks expose hidden dependencies. |
| "Planning is overhead." | Planning is the task. Executing without a plan is typing. |
| "I keep it all in my head." | Sessions end, context is finite, and the next person has no access to your head. |
| "I know the estimate from experience." | Compute it from history and compare. If they match, good. If not, you just measured your bias. |

## Checklist

- [ ] Every task has a verifiable acceptance criterion
- [ ] Every task names the proof that verifies it
- [ ] Dependencies are in the tracker's link field, not in prose
- [ ] No task is XL
- [ ] The cut is vertical, and at least one slice reaches the write layer
- [ ] There is a checkpoint between phases
- [ ] Time comes from history with a label, or is declared and marked declared
- [ ] The plan holds an index of card ids, not a second task list
- [ ] No plan with open tasks was overwritten

## Definition of done

The plan is done when a developer who was not in the conversation can pick the first task, finish it in one session, prove it with the named verification, and know which task unlocks next, without asking anyone.
