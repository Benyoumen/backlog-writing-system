# Acme Field Sales Assistant backlog, snapshot w16

> Fictional example. Acme and all names, numbers and dates are invented to show the format.

Version: 1.3 | Date: 2026-04-13 | Cutoff week: 16

## Summary

| Block | Features | Stories |
|---|---|---|
| ACME-E01-F01 Meetings and notes | 1 | 1 |
| ACME-E01-F02 Follow-up draft and send | 1 | 4 |
| ACME-E01-F03 CRM write-back | 1 | 4 |
| ACME-E01-F04 Activity trail | 1 | 1 |
| ACME-E01-F05 Manager weekly digest (created this week, outside the first release) | 1 | 0 |
| Total | 5 | 10 |

Reconciliation: w15 had 4 Features and 11 Stories; this week 1 Feature was created and 1 Story was removed.

## Delivery schedule

| Stream | Stage | Planned date | Status |
|---|---|---|---|
| Phase 1, see and draft (F01-US01, F02-US01, F02-US02, F03-US02) | Pilot with 12 reps | 2026-03-27, exited | Done |
| Phase 2, send and write back (F02-US03, F02-US04, F03-US01, F03-US03, F03-US04) | Build | 2026-04-28, moved from 2026-04-21 | In progress |
| Phase 3, manager view (F04-US01) | Planned | 2026-05-12 | Not started |
| Expansion to all reps | Decision | 2026-06-01 | Not started |

## KPIs

| Indicator | Scope and period | Current (w16) | Previous (w15) | Week-over-week |
|---|---|---|---|---|
| Follow-ups sent within 2 hours of the meeting end | 12 pilot reps, last 14 days; until Phase 2 the rep copies the draft and sends from the mailbox | 62% | 54% | Up 8 points |
| Drafts with no unsourced fact (never-case check) | Weekly sample of 30 drafts | 29 of 30 | 30 of 30 | Down 1 (BUG03; eval case E03 added) |
| Drafts used with no edits or small edits | 12 pilot reps, last 14 days | 58% | 51% | Up 7 points |
| Opportunities with a CRM update after the last meeting | 12 pilot reps, last 14 days | 44% | 43% | Stable; the CRM write goes live in Phase 2 |

## Feedback adjustments

| Source (role) | Feedback | Tied to item | Where it applies | Decision |
|---|---|---|---|---|
| A sales rep | Drafts ignore the customer's language | ACME-E01-F02 Follow-up draft and send | Language detection rule; the first release is English only | Opens a decision: sponsor, by 2026-04-20 |
| A sales manager | Wants to see which drafts were never sent | ACME-E01-F04 Activity trail | Weekly digest | Creates ACME-E01-F05, outside the first release |
| A sales rep | A long-standing account should not get an introduction paragraph | ACME-E01-F02 Follow-up draft and send | Draft rubric | Enters now as eval case E13 |
| A sales rep | Tone of the first draft is right | ACME-E01-F02 Follow-up draft and send | None | Validated, keep as is |

## New or changed features

| ID | Title | Action | MVP? |
|---|---|---|---|
| ACME-E01-F02 | Follow-up draft and send | Update: eval case E13 added; BUG03 open on F02-US01 | yes |
| ACME-E01-F05 | Manager weekly digest | Create | no |

## Removed this week

| ID | Title | Reason | Where the content went |
|---|---|---|---|
| ACME-E01-F02-US05 | Suggest a meeting time in the follow-up | Needs calendar write access, which the spec puts out of scope | Open decision on ACME-E01-F02, owner: sponsor |

## Version history

- v1.3 (2026-04-13, w16): KPI block refreshed with week-over-week delta. Four feedback items triaged. F05 created, outside the first release. F02-US05 removed. BUG03 recorded on F02-US01.
- v1.2 (2026-04-06, w15): Phase 2 end moved to 2026-04-28 after the CRM admin slot moved. F02-US05 created from a rep's request, pending review.
- v1.1 (2026-03-30, w14): Pilot start. Phase 1 marked done. First KPI measurement.
- v1.0 (2026-03-09, w11): Backlog loaded from the execution plan: 1 Epic, 4 Features, 10 Stories.
