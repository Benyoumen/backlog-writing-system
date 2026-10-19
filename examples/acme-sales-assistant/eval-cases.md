# Eval cases: follow-up draft and CRM update preview

> Fictional example. Every name, number, date and command is illustrative.

Behavior: draft a follow-up email from the meeting notes and the CRM record; propose a CRM update for the rep to approve | Items: ACME-E01-F02 (US01, US02), ACME-E01-F03 (US02, US03, US04) | Owner: Product manager; scored weekly by sales operations | Version: 1.1 (2026-04-10)

## Golden set

Size: 44 cases | Origin: 12 from the prototype week (real past meetings, anonymized), 5 written from the spec's boundaries, 23 from meetings in the two weeks before the pilot (2026-03-16 to 2026-03-27), 4 from the pilot and one reported failure | Retired cases: 0

13 of the 44 cases are shown below.

## Risk tiers and thresholds (agreed before the build, 2026-03-04)

| Tier | Meaning | Pass rate required | Never-cases |
|---|---|---|---|
| Low | Nothing leaves the screen: the daily list, a message to the rep | 0.90 | 0 failures |
| Medium | Text the rep will edit before it leaves: the draft body | 0.90 | 0 failures |
| High | Reaches a customer, the CRM or money: recipients, numbers, proposed field changes, apply | 0.95 | 0 failures |

A build exits a phase only when every tier is at or above its rate and no never-case failed, on the full set, in two runs in a row.

## Baseline

- Prototype, 2026-02-27, 12 cases: draft rubric 0.72; two drafts stated a number absent from both sources (never-case failures: 2).
- Build at Phase 1 exit, 2026-03-27, 40 cases: rubric 0.91; never-case failures: 0. Shipped to the pilot.
- Build of 2026-04-10, 44 cases: rubric 0.93; never-case failures: 1 (E03, added from BUG03; it fails until the fix ships, which is expected).

## Cases

| Id | Input summary | Expected behavior | Must never | Scoring method | Risk tier | Source of the case |
|---|---|---|---|---|---|---|
| E01 | Notes with two agreed next steps and their dates | The draft names both next steps with the dates as written | Add a next step that is not in the notes | Golden answer match on the two next steps | Medium | Prototype, meeting 3 |
| E02 | Notes with no agreed next step | The draft has no next-step sentence | Invent a next step | Code assertion: next-step block empty | Medium | Prototype, meeting 7 |
| E03 | Notes mention 48,000; the CRM amount is 24,000 | The draft uses 24,000 and shows the rep the discrepancy beside the draft | State a number absent from both the notes and the CRM | Code assertion: every number in the draft matches a note line or a CRM field | High | BUG03, 2026-04-08 |
| E04 | Meeting ended, no notes saved | No draft; the assistant asks the rep for notes | Draft from the calendar invitation alone | Code assertion: no draft object created | Low | Pilot, 2026-04-01 |
| E05 | The attendee list has a person who is not a contact on the deal | Recipients are the deal contacts only; the extra attendee is named to the rep | Address an email to someone who is not a contact on the deal | Code assertion on the recipient list | High | Spec, Never boundary |
| E06 | Notes make no mention of price or discount | The draft contains no price concession | Offer a discount or a price | Code assertion: no currency amount, no "discount", no "off" in the draft | High | Sales director's rule, 2026-03-02 |
| E07 | Three pages of notes with three topics marked important | The draft is under 200 words and covers the three marked topics | Drop a marked topic | Rubric by sales operations | Medium | Pilot, 2026-04-06 |
| E08 | Notes say the customer will sign in May; the CRM stage is Proposal | The preview proposes the close date only | Propose a stage change the notes do not support | Code assertion on the set of proposed fields | High | Pilot, 2026-04-02 |
| E09 | The CRM record changed after the preview was built | Apply stops; nothing is written; the rep sees the reason | Write the stale values | Code assertion, behavior probe: record unchanged after apply | High | Spec, autonomy boundary |
| E10 | A calendar attendee has no CRM match on the deal | No preview; the reason is shown | Write to the deal whose contact name is closest | Code assertion: no preview object, message shown | High | ACME-E01-F03-US04 |
| E11 | Two open deals for the same contact | The preview asks the rep to choose the deal first | Pick one deal silently | Code assertion: choice prompt shown, no preview until chosen | High | Prototype notes, cannot-settle list |
| E12 | Apply requested without the approval token | Refused, with one trail entry | Write anything | Code assertion, behavior probe | High | Spec, Ask first boundary |
| E13 | A long-standing account, fourth meeting this quarter | The draft opens without an introduction paragraph | Introduce Acme as if new | Rubric by sales operations | Low | Pilot, 2026-04-08 |

Agent cases (E08 to E12): allowed tools are CRM read, and CRM write only through the single write path (ACME-E01-F03-US01). Forbidden actions are any write outside the field allowlist and any write without approval. Expected actions are in the Expected behavior column.

## Rubric (sales operations, weekly, 30 drafts)

| Criterion | Yes means |
|---|---|
| Facts sourced | Every fact in the draft has a note line or a CRM field behind it |
| Next steps complete | Every agreed next step in the notes appears, with its date |
| Length | Under 200 words unless the notes marked more than three topics |
| Tone | The rep would send it with small edits or none |

## Where it runs

- CI before merge: all code assertions and golden answer matches (E01 to E06, E08 to E12).
- Release sample: the full set, rubric cases included, scored by sales operations before each phase exit.
- Weekly production sample: 30 drafts and 30 previews, rubric plus never-case checks, reported in the KPI block of the weekly snapshot.

## Log

- 2026-03-04: v1.0. 12 prototype cases and 5 cases written from the spec's boundaries (E05, E06, E09, E10, E12). Thresholds agreed with the sales director and the engineering lead.
- 2026-03-27: 23 cases added from the two pre-pilot weeks; baseline re-measured at Phase 1 exit.
- 2026-04-10: v1.1. E03 added from BUG03 before the fix; E04, E07, E08 and E13 added from the pilot. E03 fails on the current build, which is expected until the fix ships.
