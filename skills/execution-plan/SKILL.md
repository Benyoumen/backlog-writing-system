---
name: execution-plan
description: Turns a product spec and a tech spec into an execution plan with ready-to-load Epic, Feature and Story items, delivery phases, a schedule derived from dependencies, a weekly cadence of demonstrable results, and a list of open decisions. Every item carries a one-sentence plain-language summary and a shared glossary. Use when a spec is approved and the team needs a phased plan, when a tech lead asks for the backlog of a new capability, or when a sponsor must see when each piece becomes usable.
license: MIT
metadata:
  version: "1.1"
  author: Benjamin Tayar
  method: backlog-writing-system
---

# Execution plan

> A spec says what to build. A plan says in which order, in which phases, and when each phase becomes something a person can use. One document, plus the items ready to load into your tracker.

## When to use

- A spec is approved and the team needs a phased plan.
- A tech lead asks for the backlog of a new capability.
- A sponsor must see when each piece becomes usable.

It sits between `write-prd` (what and why), `decompose-spec` (how to cut tasks) and `backlog-standard` (how each card reads). On a content conflict for a card, the backlog standard wins. On a conflict about the layout of the plan, this skill wins.

## Inputs

- The product spec (intent and functional contract) and the tech spec (implementation). When they diverge, the product spec wins.
- The decomposition with its dependency graph and sizes.
- The appetite from the frame.
- The open-questions list.
- Access to the real artifacts the spec assumes exist: the spreadsheet, the live CRM, the catalog, the board.

## Procedure

1. Read the sources whole. The plan does not repeat the spec. It translates it into deliverable behavior, and each item points to its origin under traceability.
2. Close the effort budget against the appetite. If no estimate exists, write one, and justify each number by comparison with a component already estimated. The estimate is an input to the plan, not a consequence of the deadline. If the number overruns the appetite or the roadmap window, the document states the gap instead of hiding it.
3. Decompose (see `decompose-spec`). Epic per component, Feature per deliverable capability, Story per behavior a developer can test. Acceptance review and deploy do not become stories: they run per phase, in parallel. An Enabler story does not pretend to have a persona.
4. Declare dependencies item by item and check that none crosses into a later phase.
5. Cut into phases: a first usable release, then later phases, each with demonstrable value, a checkpoint and a go-live. The first release depends on nothing owned by a third party. Every week has something demonstrable. If a week comes out empty, the queue is cut wrong.
6. Write the plain summaries and the glossary for everything. This is the dual-reader rule, not an extra.
7. Derive the schedule. No date is typed except the start date. Every other date is computed from sizes and dependencies.
8. Run the artifact check: open the spreadsheet, the live CRM, the catalog and the board to test whether the spec's assumptions are true. Record each finding with an id, where it appeared, and its effect on the plan.
9. Run the gates (Rules). Then read the result: the headline metrics, one whole phase, one critical story and the glossary.

## Rules

### The dual-reader rule

Every element must be enough for a developer to execute and clear to someone who is not technical. Do not solve this by writing simpler and losing precision. Solve it with two layers in the same item:

| Layer | Field | For whom | Acceptance test |
|---|---|---|---|
| One sentence, no jargon | `plain_summary` | Non-technical reader | A person outside the team reads it and knows what changes in someone's work |
| Numbered sections | The standard sections of Epic, Feature and Story | Whoever builds and tests | The developer opens the card and needs no meeting |
| Vocabulary | `glossary` | Both | No term appears in the document without a glossary entry |

The plain summary is one sentence. The subject is the person or the system, not the component. It says what starts happening, not how. No acronyms, no table names, no library names. The glossary has one term per entry, defined in one line, plus where it appears: acronyms, artifact names, system names, and every method term the document uses (single queue, critical path, checkpoint, wave).

### Chapters, fixed order

1. Summary: version, sources, board status, a few headline metrics, the appetite, "In 30 seconds", pending decisions per phase.
2. Delivery phases: one block per phase (what goes live, why in this order, the story cards, the exit gate, the decisions the phase needs), then the weekly cadence: what is demonstrable in each week.
3. Schedule: one track per epic, vertical bands for phases, a row of checkpoints, and the assumptions.
4. Items by epic: Epic, Features and Stories, each with `plain_summary` and its numbered sections.
5. What already exists: material ready before kickoff, and what each piece saves.
6. Where it appears: the touchpoints with users, who sees it, in which channel, what the backlog builds and what depends on another team.
7. Glossary.
8. Open items: decisions the backlog does not make, the findings from the artifact check, who answers what, and what is already decided.
9. In the tracker: the order in which items are created.

The chapter that usually goes missing is the findings from the artifact check. A pending-decisions list holds what the product knows it has not decided. It does not hold what only appears when someone opens the spreadsheet, the live CRM, the catalog and the board. Checking costs hours and saves weeks. Without the block, the finding dies in a chat and the tech lead rediscovers it while building.

### Writing ruler

Targets, not limits. Straying far from them is a signal that something is wrong. Re-measure against your own approved plans before citing numbers.

| Field | Target | Quantity |
|---|---|---|
| Epic: why, problem, goal | 1 short paragraph each | 1 |
| Epic: success metrics | 70 to 140 characters each | 3 |
| Epic: in scope / out of scope | 55 to 210 characters each | 4 / 3 |
| Epic: risks | each as "Risk: ... Mitigation: ..." | 3 |
| Feature: behavior bullets | 50 to 140 characters | about 4 |
| Feature: acceptance bullets | 46 to 120 characters | 4 to 5 |
| Story: title | 40 to 56 characters, starts with a verb | 1 |
| Story: statement | one sentence | 1 |
| Story: demo line | one sentence, what becomes demonstrable | 1 |
| Story: acceptance | one criterion per line | 3 to 5 |
| Story: exceptions | | 1 to 3 |
| Plain summary (all levels) | about 100 to 175 characters | 1 |

Effort: days per story in half-day steps, nothing above 4.5, and anything above 3 needs a justification. Aim for 2 to 3 Features per Epic and 1 to 5 Stories per Feature. Average days per story is the best detector of bad decomposition: far below your usual, acceptance criteria became items; far above, an item hides two behaviors.

### Register

Third person, present tense, complete sentences ending in a period. The subject is who acts: the agent, the rep, the Feature, the capability. Never use: long dashes, "we" or "let us", rhetorical questions, personal names (role titles are fine), ticket numbers from other tools, methodology jargon without translation, promises about team size or allocation. A schedule may assume parallel tracks; it does not promise people. Acceptance criteria use Given / When / Then only when there is a rule, decision, exception, ambiguity or state change. One criterion per line, never chained with semicolons.

### Gates (the plan is not printed or shared if any fails)

| Gate | Why it exists |
|---|---|
| Sum of story days per epic equals the epic's budget | The document must not contradict the estimate |
| Total effort fits the appetite, or the gap is stated | The plan does not hide an overrun |
| Story ids are sequential from 1 to N, with no gap and no duplicate | A numbering gap becomes a lost card |
| Every story has a valid phase | A story with no phase enters no delivery |
| A dependency never points to a later phase | A phase that depends on the future never closes |
| A dependency on an unknown story id fails | A typo would silently shorten the critical path |
| A dependency cycle fails | The queue deadlocks |
| Phase checkpoints fit inside the checkpoint and deploy budget | What is left is final stabilization |
| Required story fields are present | A missing field found mid-render is worse than an early error |

Reduce transitive dependencies: if A depends on B and C, and C already depends on B, drop A to B. The schedule then does not look more blocked than it is.

### Common traps

1. Epic metrics measure business outcome, not the machine. Accuracy, latency, tokens and cost belong in technical notes or non-functional requirements.
2. Already decided technical details stay. The backlog does not invent architecture that still belongs to engineering.
3. Team-size assumptions do not enter. Allocation is not stable and must not condition the spec.
4. Acceptance, evaluation and done are three different things. Do not repeat one inside another.
5. A typed date rots at the first scope change.
6. A phase is not an architecture layer. A phase that delivers "the data layer" has no demonstrable value. A phase delivers something a person uses.
7. Do not rewrite a plan in progress. This standard applies to new plans. Before tidying a published plan, ask.

## Checklist

- [ ] Sources read whole, and each item points to its origin.
- [ ] Total effort fits the appetite, or the gap is stated in the summary.
- [ ] Every item has a plain summary, and every term is in the glossary.
- [ ] No story above 4.5 days, and the average days per story looks sane.
- [ ] Every dependency checked: no cycle, no unknown id, nothing into a later phase.
- [ ] Every phase has a demonstrable result and an exit gate.
- [ ] Every week of the cadence has something demonstrable.
- [ ] Only the start date is typed; all other dates are derived.
- [ ] The artifact check ran and its findings are in the open-items chapter.
- [ ] Open decisions name who answers them.

## Example

Weak plain summary: "Implements the draft-generation contract consumable by the CRM writer via versioned payload." (a developer understands, a non-technical reader does not). Also weak: "Improves the user experience of the follow-up journey." (says nothing).

Corrected: "After a customer meeting, the rep gets a drafted follow-up email instead of writing it from scratch." And: "A CRM update that would change a deal stage is never applied without the rep approving it."

## Definition of done

The plan is done when a tech lead can load every item into the tracker in the stated order, a sponsor can read the weekly cadence and know what they will see each week, and nobody has to ask what a term means or where an item came from.

## Related

- Before: [`write-prd`](../write-prd/SKILL.md), [`decompose-spec`](../decompose-spec/SKILL.md). After: [`backlog-standard`](../backlog-standard/SKILL.md), [`sprint-planning`](../sprint-planning/SKILL.md), [`roadmap-status`](../roadmap-status/SKILL.md).
- Why: [principle 5, vertical slices, appetite before estimate](../../docs/principles.md#5-vertical-slices-appetite-before-estimate); [principle 10, a roadmap is a dated photo](../../docs/principles.md#10-a-roadmap-is-a-dated-photo-not-a-promise); [the delivery flow](../../docs/delivery-flow.md).
- Template: [`execution-plan.md`](../../templates/execution-plan.md). Example: [`execution-plan.md`](../../examples/acme-sales-assistant/execution-plan.md).
