# The Acme example, end to end

> Fictional. Acme is not a real company. Every person, number, date, command and system in this folder is invented to show the method, and every number is illustrative.

## The product

Acme Field Sales Assistant drafts the follow-up email after a customer meeting and proposes the CRM update, for account executives who meet three to five customers a day. The rep reviews, edits and approves; the assistant never sends or writes on its own. The first release is one Epic, four Features and ten User Stories.

## Timeline (2026)

| Date | ISO week | What happened | File |
|---|---|---|---|
| 02-16 | w8 | Frame approved: the number and the appetite | [frame.md](frame.md) |
| 02-23 to 02-27 | w9 | Prototype week with five reps | [prototype-notes.md](prototype-notes.md) |
| 03-02 | w10 | Spec approved | [prd.md](prd.md) |
| 03-04 | w10 | Eval cases v1.0; thresholds agreed per risk tier | [eval-cases.md](eval-cases.md) |
| 03-05 | w10 | Decomposition into seven vertical slices | [decomposition.md](decomposition.md) |
| 03-06 | w10 | Execution plan approved | [execution-plan.md](execution-plan.md) |
| 03-09 | w11 | Build starts; Epic, Features and Stories loaded into the tracker | [epic.md](epic.md), [feature.md](feature.md), [user-story-1.md](user-story-1.md), [user-story-2.md](user-story-2.md) |
| 03-12 | w11 | Agent brief for the CRM write path | [agent-brief.md](agent-brief.md) |
| 03-27 | w13 | Phase 1 exit: see and draft. Evals pass on 40 cases | |
| 03-30 | w14 | Pilot starts with 12 reps; weekly snapshots and sponsor reviews start | |
| 04-08 | w15 | BUG03: a draft shows twice the CRM value | [bug-report.md](bug-report.md) |
| 04-10 | w15 | Eval cases v1.1: E03 added from BUG03, before the fix | [eval-cases.md](eval-cases.md) |
| 04-13 | w16 | The weekly snapshot, the sponsor review and the roadmap status shown here | [weekly-snapshot.md](weekly-snapshot.md), [review-meeting-outline.md](review-meeting-outline.md), [roadmap-status.md](roadmap-status.md) |
| 04-28 | w18 | Phase 2 planned go-live: send and write back (moved from 04-21) | |
| 05-12 | w20 | Phase 3 planned: manager view | |
| 05-29 | w22 | Success criterion read, 60 days after the pilot start | |
| 06-01 | w23 | Expansion decision | |

## Files in workflow order

| Stage | File | What it shows |
|---|---|---|
| 0 Frame | [frame.md](frame.md) | The problem in a rep's words, the number (80 percent within 2 hours), the appetite (six weeks of two people), the not-doing list |
| 1 Discover | [prototype-notes.md](prototype-notes.md) | What a one-week prototype settled, what it could not, and the silent assumptions it carried |
| 2 Decide | [prd.md](prd.md) | The spec: capability map, goal with a number, Always / Ask first / Never, sources of truth, evals plan, out of scope |
| 3 Slice | [decomposition.md](decomposition.md) | Seven vertical slices with sizes, dependencies, verification per slice and checkpoints |
| 3 Slice | [execution-plan.md](execution-plan.md) | Three phases, a schedule derived from dependencies, plain summaries, glossary, findings from the artifact check |
| 4 Write | [epic.md](epic.md) | The Epic: outcome, metrics with baseline and window, scope, rules, risks |
| 4 Write | [feature.md](feature.md) | The draft Feature, 15 sections, six acceptance criteria, evaluation criteria pointing to the eval cases |
| 4 Write | [user-story-1.md](user-story-1.md) | A Functional story: show the facts behind each draft, with four acceptance cases |
| 4 Write | [user-story-2.md](user-story-2.md) | An Enabler story with no persona: one write path to the CRM |
| 4 Write | [eval-cases.md](eval-cases.md) | The golden set, risk tiers, thresholds, never-cases, baseline and log for the two probabilistic behaviors |
| 4 Write | [agent-brief.md](agent-brief.md) | The write-path story prepared for a coding agent: checks, commands, Never list, inputs, return, stop-and-ask |
| 6 Learn | [bug-report.md](bug-report.md) | A bug card that describes the symptom, asks for the data origin, and never asserts a cause |
| 6 Learn | [weekly-snapshot.md](weekly-snapshot.md) | Snapshot w16: schedule, KPIs with deltas, feedback triage, what was added and what was removed |
| 6 Learn | [review-meeting-outline.md](review-meeting-outline.md) | The sponsor review w16: last week's commitments with a status each, topics, what we cut, schedule, next steps |
| 6 Learn | [roadmap-status.md](roadmap-status.md) | The roadmap as a dated photo: phases, changes since last week, one delay event with its reason |

Start with [../before-after.md](../before-after.md): three weak items rewritten to the standard, with a table of what changed. Its third item becomes the Enabler story ACME-E01-F02-US04 in this backlog.

## How the plan's slices became tracker items

The plan keeps slice ids (US01 to US07). The tracker keeps codes. The numbering register maps one to the other.

| Plan slice | Tracker item | Note |
|---|---|---|
| US01 Show today's finished meetings with their notes | ACME-E01-F01-US01 | |
| US02 Draft a follow-up email from the meeting notes | ACME-E01-F02-US01 and ACME-E01-F02-US02 | Split at backlog writing: the fact view became its own story after the prototype showed reps needed it |
| US03 Send the follow-up after the rep edits it | ACME-E01-F02-US03 | |
| US04 Show a CRM update preview for a finished meeting | ACME-E01-F03-US02 | |
| US05 Apply the CRM update the rep approved | ACME-E01-F03-US01 (Enabler) and ACME-E01-F03-US03 | The single write path was extracted as an Enabler, with its own agent brief |
| US06 Block the update when the contact has no CRM match | ACME-E01-F03-US04 | |
| US07 Show the manager what was sent, applied and ignored | ACME-E01-F04-US01 | |
| Added after review | ACME-E01-F02-US04 Store each draft until the rep approves or discards it | Enabler, from the rewrite in before-after.md |

Seven slices, ten stories. Features: ACME-E01-F01 Meetings and notes, F02 Follow-up draft and send, F03 CRM write-back, F04 Activity trail. A fifth Feature, F05 Manager weekly digest, was created from feedback in w16 and is not in the first release.
