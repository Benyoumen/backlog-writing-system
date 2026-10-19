# Spec preview: the plain sentences and the glossary

> Fictional example. This is the data behind the readable page at https://benyoumen.github.io/backlog-writing-system/spec-preview.html: the one-sentence plain summary of every item, written for the sponsor and the QA, and the glossary that covers the whole page. The numbered sections of each item are in `epic.md`, `feature.md`, `user-story-1.md`, `user-story-2.md` and `execution-plan.md`. Method: `skills/spec-preview-html`. Generated from a data file on 2026-03-06; never edited by hand.

## In 30 seconds

Reps first see their finished meetings with a drafted follow-up and a CRM update preview. Then they send and apply them with their own approval. The manager gets a weekly view last.

## Plain sentences

Each one passes three tests: the subject is a person or a system, it says what starts to happen, and it uses no acronym, table name or library name.

| Item | Plain summary |
|---|---|
| ACME-E01 Customer follow-up within a day of every meeting | After a customer meeting, the rep reviews a drafted follow-up and a proposed CRM update instead of writing both from scratch, and the customer hears back the same day. |
| ACME-E01-F01 Meetings and notes | The rep sees which meetings just ended and what was noted in each, in one place. |
| ACME-E01-F01-US01 Show today's finished meetings with their notes | After each meeting, the rep sees what happened in it without opening three tools. |
| ACME-E01-F02 Follow-up draft and send | The rep gets a drafted follow-up, edits it and sends it from their own mailbox. |
| ACME-E01-F02-US01 Draft a follow-up email from the meeting notes | After a meeting, the rep finds a ready draft of the follow-up email. |
| ACME-E01-F02-US02 Show the facts behind each draft | Next to each draft, the rep sees every fact it used and the note line it came from. |
| ACME-E01-F02-US03 Send the follow-up after the rep edits it | The rep edits the draft and sends it, and nothing is ever sent without that action. |
| ACME-E01-F02-US04 Store each draft until the rep approves or discards it | A draft waits for the rep's decision for as long as needed, and one meeting never has two drafts. |
| ACME-E01-F03 CRM write-back | The assistant proposes the CRM update, shows it, and applies it only when the rep approves. |
| ACME-E01-F03-US01 Create a single write path to the CRM | Every change the assistant makes to the CRM goes through one door, so each one is checked and logged the same way. |
| ACME-E01-F03-US02 Show a CRM update preview for a finished meeting | After a meeting, the rep sees exactly which CRM fields would change and why. |
| ACME-E01-F03-US03 Apply the CRM update the rep approved | An approved CRM update is applied once, and if the record changed in the meantime the update stops and says so. |
| ACME-E01-F03-US04 Block the update when the contact has no CRM match | If a meeting attendee is not a contact on the deal, the assistant proposes nothing and says why. |
| ACME-E01-F04 Activity trail | The manager sees what the assistant suggested and what the reps did with it. |
| ACME-E01-F04-US01 Show the manager what was sent, applied and ignored | The sales manager sees, per rep and per week, how many suggestions were sent, applied or ignored. |

Two sentences that were rejected during the review, and why: "Implements the draft-generation contract consumable by the CRM writer through a versioned payload" (the sponsor could not say what changes for a rep); "Improves the follow-up experience" (nobody could say what starts to happen).

## The six metrics of the summary

| Metric | Value |
|---|---|
| Epics | 1 |
| Features | 4 |
| Stories | 10 |
| Total effort (points) | 31 |
| Critical path (working days) | 15, derived in `capacity-plan.md` |
| Phases | 3 |

## Glossary

| Term | Definition | Appears in |
|---|---|---|
| Rep | An account executive who meets customers and owns opportunities in the CRM | everywhere |
| CRM | The system where deals, opportunities and contacts are recorded | everywhere |
| Opportunity | A deal in the CRM, with a stage, a value and an owner | F03 |
| Contact on the deal | A person listed in the CRM as part of an opportunity | F03-US04 |
| Draft | An email written by the assistant that the rep has not sent | F02 |
| Preview | The list of CRM changes shown before anything is written, with old and new values | F03-US02, F03-US03 |
| Write path | The one route through which the assistant changes the CRM | F03-US01 |
| Trail | The record of what was suggested, sent, applied and ignored | F04 |
| Enabler | A story that builds something the product needs without a person using it directly | F02-US04, F03-US01 |
| Autonomy boundary | A written limit on what the assistant may do without asking: Always, Ask first, Never | spec, F02-US03, F03-US03 |
| Eval case | A real input with the expected behavior, used to measure the assistant before it ships | F02, F03 |
| Never-case | A behavior with zero tolerance, scored separately from the pass rate | F02, F03 |
| Phase | A group of stories that reaches production together with a demonstrable result | chapter 2 |
| Wave | The order of Features inside the Now band; wave 1 is the go-live set | chapter 2 |
| Critical path | The chain of dependent stories that sets the landing date | chapter 3 |
| Checkpoint | A review after a group of stories before the next group starts | chapter 2 |
| Appetite | The time the sponsor is willing to spend, decided before any estimate | chapter 1 |
| Story Points | The size of a story on the Fibonacci scale, set by the developers | chapter 3 |
| Pilot | The first period of real use by a chosen group of reps | chapter 2 |
| Sandbox | A copy of the CRM for testing, where nothing reaches a customer | chapter 5 |

## Where it appears

| Touchpoint | Who sees it | Channel | Built by this backlog | Depends on another team |
|---|---|---|---|---|
| Daily list, drafts and previews | Account executive | Web screen | Yes | No |
| Sent follow-up | Customer | The rep's mailbox | The send action only | Mail admin must allow sending as the rep |
| Weekly activity view | Sales manager | Web screen | Yes | No |

## Gates run by the generator on 2026-03-06

- [x] No dependency points to a later phase
- [x] No cycle
- [x] Story numbering has no hole and no duplicate
- [x] Every story has a phase
- [x] Story effort sums to the Epic budget (3 + 11 + 15 + 2 = 31)
- [x] Every term on the page is in the glossary
- [x] Only the start date is typed
