# Execution plan: <capability>

Version: <n> | Sources: <product spec, tech spec, open-questions list> | Start date: <date>

## 1. Summary

**In 30 seconds.** <Two sentences: what goes live, in which order, and what the sponsor sees first.>

| Metric | Value |
|---|---|
| Epics | <n> |
| Features | <n> |
| Stories | <n> |
| Total effort (days) | <n> |
| Critical path (days) | <n> |
| Phases | <n> |
| Appetite (from the frame) | <n weeks of n people; state the gap if the effort overruns it> |

Pending decisions by phase: <list or see chapter 8>

## 2. Delivery phases

### Phase <n>: <name>

- What goes live: <behavior a person uses>
- Why in this order: <dependency or risk reason>
- Stories: <ids>
- Exit gate: <demonstrable result and the check that proves it>
- Decisions this phase needs: <ids from chapter 8>

### Weekly cadence

| Week | Demonstrable | Stories done |
|---|---|---|
| 1 | <what can be shown> | <ids> |

Every week has a row with something to show. An empty week means the queue is cut wrong.

## 3. Schedule

| Story | Size | Days | Depends on | Start (day) | End (day) |
|---|---|---|---|---|---|
| US01 | M | 3 | none | 1 | 3 |

Only the start date is typed. Every other date is derived from sizes and dependencies.

Critical path: <US chain and total days>.
Assumptions: <working days, parallel tracks, how checkpoints are counted>.

## 4. Items by epic

### Epic <n>: <title>

**Plain summary:** <one sentence, no jargon>

- Why: <paragraph>
- Goal: <paragraph>
- Metrics: <3 business outcomes>
- In scope: <4> | Out of scope: <3>
- Risks: <Risk: ... Mitigation: ...> x 3

#### Feature <n.m>: <title>

**Plain summary:** <one sentence>

- Why / context / goal / value
- Behavior: <4 bullets>
- Acceptance: <4 to 5 bullets>
- Dependencies, open questions

##### US<nn>: <verb-first title>

**Plain summary:** <one sentence>

- Statement: <one sentence>
- Why it exists: <paragraph>
- Demo: <what becomes demonstrable>
- Acceptance: <3 to 5 criteria, one per line>
- Exceptions: <1 to 3>
- Dependencies: <US ids>
- Traceability: <where in the spec this comes from>
- Done: <specific only>
- Size / days: <M, 3>

## 5. What already exists

| Material | What it saves |
|---|---|

## 6. Where it appears

| Touchpoint | Who sees it | Channel | Built by this backlog? | Depends on another team? |
|---|---|---|---|---|

## 7. Glossary

| Term | Definition (one line) | Appears in |
|---|---|---|

## 8. Open items

### Cross-cutting decisions

| Id | Decision | Who answers | Needed by |
|---|---|---|---|

### Findings from the artifact check

| Id | Finding | Where it appeared | Effect on the plan |
|---|---|---|---|

### Already decided

- <decision and date>

## 9. In the tracker

Order of creation: epics, features, stories, then dependency links, then iteration assignment.

## Gates run before sharing

- [ ] Story days per epic match the epic budget
- [ ] Story ids sequential, no gap, no duplicate
- [ ] Every story has a valid phase
- [ ] No dependency points to a later phase, an unknown id, or a cycle
- [ ] Every term used is in the glossary
- [ ] Every item has a plain summary
