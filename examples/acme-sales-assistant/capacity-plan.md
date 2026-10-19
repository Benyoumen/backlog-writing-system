# Capacity plan: ACME-E01 Customer follow-up within a day of every meeting

> Fictional example. Version 1.0, run at sprint planning on 2026-03-09 | Start date: Monday 2026-03-09, day 1 (the only date typed) | Sprint length: two weeks | Reserve for enabling work: one third | Source: Now / Next / Later board v1.0, `prioritization.md`. The team, the capacities and every number are illustrative. The interactive version of this plan is at https://benyoumen.github.io/backlog-writing-system/capacity.html.

## 1. Team

| Person (fictional) | Weekly capacity (points) | Label | Basis |
|---|---|---|---|
| Ana | 5 | reference | No history: the starting rule, one point per working day minus ceremonies |
| Bruno | 5 | reference | Same |
| Clara | 4 | reference | Four days a week on this Epic |
| Diego | 3 | reference | Three days a week on this Epic |

Team capacity per week: 17 points. Acme has no closed items yet, so nothing is `measured` or `partial`; the plan says "no history" and uses the reference.

## 2. Stories in the simulation

Now band, wave 1. Ten stories, 31 points. Points in a working day per person: Ana 1.0, Bruno 1.0, Clara 0.8, Diego 0.6.

| Story | Feature | Points | Type | Depends on | Owner |
|---|---|---|---|---|---|
| ACME-E01-F01-US01 Show today's finished meetings with their notes | F01 | 3 | Functional | none | Ana |
| ACME-E01-F03-US01 Create a single write path to the CRM | F03 | 5 | Enabler | none | Bruno |
| ACME-E01-F02-US01 Draft a follow-up email from the meeting notes | F02 | 3 | Functional | F01-US01 | Ana |
| ACME-E01-F03-US02 Show a CRM update preview for a finished meeting | F03 | 3 | Functional | F01-US01 | Clara |
| ACME-E01-F02-US02 Show the facts behind each draft | F02 | 3 | Functional | F02-US01 | Ana |
| ACME-E01-F02-US04 Store each draft until the rep approves or discards it | F02 | 2 | Enabler | F02-US01 | Diego |
| ACME-E01-F03-US04 Block the update when the contact has no CRM match | F03 | 2 | Functional | F03-US02 | Clara |
| ACME-E01-F03-US03 Apply the CRM update the rep approved | F03 | 5 | Functional | F03-US01, F03-US02 | Bruno |
| ACME-E01-F02-US03 Send the follow-up after the rep edits it | F02 | 3 | Functional | F02-US02, F02-US04 | Ana |
| ACME-E01-F04-US01 Show the manager what was sent, applied and ignored | F04 | 2 | Functional | F02-US03, F03-US03 | Ana |

To refine: F07 Schedule the next meeting (no stories). Not in Now: F05 (Next), F06 (Later).

## 3. Schedule, derived

A story starts only when its predecessors are done. One story per person at a time. The two Enablers are allocated first inside the reserve. Day 1 is 2026-03-09; day 5 is 03-13, day 10 is 03-20, day 15 is 03-27.

| Story | Owner | Start (day) | End (day) | Lands |
|---|---|---|---|---|
| F01-US01 Finished meetings list | Ana | 1 | 3 | 03-11 |
| F03-US01 Single write path (Enabler) | Bruno | 1 | 5 | 03-13 |
| F02-US01 Draft the follow-up | Ana | 4 | 6 | 03-16 |
| F03-US02 CRM update preview | Clara | 4 | 7 | 03-17 |
| F02-US02 Facts behind each draft | Ana | 7 | 9 | 03-19 |
| F02-US04 Store each draft (Enabler) | Diego | 7 | 10 | 03-20 |
| F03-US03 Apply the approved update | Bruno | 8 | 12 | 03-24 |
| F03-US04 Block unmatched contact | Clara | 8 | 10 | 03-20 |
| F02-US03 Send after the rep edits | Ana | 11 | 13 | 03-25 |
| F04-US01 Manager sees sent, applied, ignored | Ana | 14 | 15 | 03-27 |

## 4. Landing

| Item | Lands on day | Date |
|---|---|---|
| F01 Meetings and notes | 3 | 2026-03-11 |
| F03 CRM write-back | 12 | 2026-03-24 |
| F02 Follow-up draft and send | 13 | 2026-03-25 |
| F04 Activity trail | 15 | 2026-03-27 |
| Epic, development complete | 15 | 2026-03-27 |

Development of all ten stories lands on day 15, which is the phase 1 exit in the timeline. Go-live of phases 2 and 3 is gated by the pilot and the evals, not by capacity, so the roadmap dates (04-28 and 05-12) come from the phase gates in `execution-plan.md` and `roadmap-status.md`, not from this plan.

## 5. Load per person per week

Points used / capacity. Idle means less than half the capacity used.

| Week | Ana | Bruno | Clara | Diego | Team | Idle |
|---|---|---|---|---|---|---|
| 1 (03-09 to 03-13) | 5 / 5 | 5 / 5 | 1.6 / 4 | 0 / 3 | 11.6 / 17 | Clara, Diego: nothing they can take is unblocked before day 4 and day 7 |
| 2 (03-16 to 03-20) | 4 / 5 | 3 / 5 | 3.4 / 4 | 2 / 3 | 12.4 / 17 | Bruno waits three days for the preview before the apply story can start |
| 3 (03-23 to 03-27) | 5 / 5 | 2 / 5 | 0.4 / 4 | 0 / 3 | 7.4 / 17 | Clara, Diego: wave 1 has nothing left for them; wave 2 is not estimated |

31 of 51 available points used over three weeks. The gap is the chain, not the people: the stories that can start on day 1 are two, and everything else waits for them.

## 6. Critical path

The email chain on one person: F01-US01 (3) to F02-US01 (3) to F02-US02 (3) to F02-US03 (3) to F04-US01 (2), 14 points plus one waiting day for the stored draft, which sets day 15. The CRM chain (F01-US01, F03-US02, F03-US03) finishes on day 12 and is not the constraint. What sets the date is the chain, not the capacity.

## 7. What-ifs

| Move | Epic lands | Delta | What moved the date |
|---|---|---|---|
| Base | day 15, 2026-03-27 | | chain |
| Diego from 3 to 5 points a week, and the facts view (F02-US02) moves to him while Ana takes the stored-draft Enabler | day 14, 2026-03-26 | one day earlier | capacity, barely: the email chain still runs through Ana |
| A fifth person at 5 points a week | day 15 | none | nothing is unblocked for them; capacity was never the constraint |
| F04 Activity trail moves to the pilot week (it only reads what the others produce) | day 13, 2026-03-25 for wave 1 | two days earlier for the go-live set | chain: the last link is removed from wave 1 |
| Cut F03-US04 Block unmatched contact | day 15 | none | it is not on the critical path, and it is a never-case of the autonomy contract, so it stays |

What the sponsor took from the table on 2026-03-09: adding people does not move the date; the Enablers go first; the trail can follow in the pilot week if the two reviewed actions need the days. Written to the tracker through `sprint-planning` after the dry run and the one-item check.

## Gates before sharing

- [x] Every capacity labeled (all reference, no history)
- [x] Every story has points, a wave and its relations
- [x] No story before its predecessors, no Feature split across sprints (all of wave 1 fits in sprint 1 and the first week of sprint 2, with F04 whole in week 3)
- [x] Reserve allocated first: both Enablers start on their earliest possible day
- [x] Only the start date typed
- [x] Nothing written to the tracker by this plan
