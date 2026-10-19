# Prototype notes: follow-up draft and CRM preview

> Fictional example. Every person, number and date is illustrative.

Dates: 2026-02-23 to 2026-02-27 | Built by: Product manager with an AI coding tool | Data: 12 real past meetings, notes anonymized, CRM records exported to a file | Tried by: 5 account executives, 1 sales manager

## What it is

A single page. The rep pastes meeting notes and picks the deal from a short list; the page produces a draft follow-up email and a table of proposed CRM changes. Nothing is sent and nothing is written. It is not production code, it reads a file export instead of the CRM, it ran on one laptop, and it was not reviewed for security.

## Settled (with evidence)

| What | Evidence | Kind |
|---|---|---|
| Reps want the draft | All five asked when they could use it; three tried to copy a draft into their mailbox during the session | desirability |
| Reps do not trust a draft without seeing where each fact came from | Four of five asked "where did it get that from" on the first draft; the version that listed the note line behind each fact was accepted without the question | flow |
| The CRM preview must show the old value next to the new one | Two reps refused a preview that showed only the new value | flow |
| The notes tool can supply usable text | The API returned the notes for all 12 meetings, with a delay of up to 10 minutes after the meeting end | feasibility |
| The draft tone is an acceptable starting point | Five of five kept the opening and the sign-off and edited the middle | desirability |

## Cannot settle (and where it will be settled)

| What | Why the prototype cannot settle it | Settled by |
|---|---|---|
| Notes that state a price the CRM contradicts | None of the 12 meetings had one | Eval case E03 in `eval-cases.md` |
| Two open deals for the same contact | Not in the sample | Eval case E11; spec, Ask first boundary |
| The cost of a wrong number in a customer email | A prototype on a laptop has no customers | Spec, risk tier high; never-case with zero tolerance |
| Behavior with no notes, or notes that arrive late | The sample only had complete notes | Spec, out of scope and Feature rules; finding A2 in the execution plan |
| Load and latency for 38 reps | One laptop, one rep at a time | Non-functional requirements; measured in the pilot |
| Who may see whose drafts | One user in the prototype | Spec, data sources and Never boundary |

## Silent assumptions found

| Assumption in the prototype | Goes to |
|---|---|
| The email is sent from a shared address | Spec assumptions: changed to the rep's own mailbox, confirmed 2026-03-02 |
| Drafts are in English | Spec, out of scope for the first release |
| The rep picks the deal from a list | Spec: the assistant matches the deal from the calendar attendees and asks when there is more than one match |
| Deal value is read from the export file | Spec: the CRM is the source of truth and is read again before every write |

## Questions before any ticket

| Question | Owner | By |
|---|---|---|
| Which CRM fields may the assistant propose to change? | Sales director | 2026-03-02 |
| May the assistant read transcripts as well as typed notes? | Sales operations | Before Phase 1 exit (decision D1) |
| Is a read receipt acceptable on follow-ups? | Sales manager | Before Phase 2 (decision D2) |

## Kept from the prototype

- Screens: the draft view with the fact list, as the reference for ACME-E01-F02-US02.
- Prompts: the draft prompt, as a starting point; it changes when the eval set says so.
- Test inputs: the 12 meetings become the first cases of the golden set in `eval-cases.md`.

Everything else is discarded, including the code.
