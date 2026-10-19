# Spec: Acme Field Sales Assistant, follow-up after customer meetings

> Fictional example. Acme is not a real company and every name, number and system below is invented to show the method.
>
> Status: Approved | Owner: Product manager | Last updated: 2026-03-02

## Assumptions I am making

1. The assistant reads the CRM through its API and writes to it only after the rep approves a preview.
2. Deal value and stage come from the CRM. Meeting notes come from the notes tool. Calendar events come from the calendar.
3. This slice covers account executives. Customer success is out.
4. The follow-up email is sent from the rep's own mailbox, never from a shared address.
5. No chat-tool integration in this slice.

All five were confirmed by the product manager before this spec went to review.

## Capability map

| Module | Responsibility | Depends on |
|---|---|---|
| meeting-intake | Which meetings ended and which notes exist | none |
| follow-up-draft | Draft the follow-up email from the notes and send it after the rep edits | meeting-intake |
| crm-writeback | Propose a CRM update, show a preview and apply it after approval | meeting-intake |
| activity-trail | Record what was suggested, sent, applied and ignored | follow-up-draft, crm-writeback |

Build order: meeting-intake, then follow-up-draft and crm-writeback in parallel, then activity-trail.

## Goal

Account executives at Acme spend part of every day writing follow-ups and updating the CRM after meetings. The assistant drafts the email and proposes the CRM update, so the rep reviews instead of writing. It matters now because late follow-ups are the most common reason the sales manager gives for deals going quiet.

## Success criterion

Within 60 days of launch, at least 80 percent of follow-ups for meetings that have notes are sent within 2 hours of the meeting end. The baseline is measured in the two weeks before launch, and this spec assumes it is "next business day" until that measurement exists.

## Autonomy boundaries

- Always: read the CRM, read the calendar and notes, build a draft, build a CRM update preview, order the daily list of finished meetings, record the trail.
- Ask first: send an email to a customer, write any field to the CRM, change a deal stage.
- Never: delete or overwrite CRM history, send an email the rep did not review, state a fact in a draft that has no source in the notes or the CRM, contact anyone who is not already a contact on the deal.

## Data source and system of record

| Field or fact | Owner system | Mirror or copy? |
|---|---|---|
| Meeting start, end, attendees | Calendar | Copied into the daily list, refreshed on open |
| Meeting notes | Notes tool | Read only, never copied outside the draft |
| Deal value, stage, contacts | CRM | Copied into the draft for display, read again before every write |
| Sent email | Mailbox | Not copied, only its id is stored in the trail |
| Trail of suggestions and decisions | Assistant database | Owner |

Each field has exactly one owner.

## Entry points and commands

- Daily list: a web screen the rep opens, fed by `GET /meetings/finished?rep=<id>&date=<yyyy-mm-dd>`.
- Draft: `POST /drafts` with `meeting_id`.
- Send: `POST /drafts/<id>/send`, runs only after an explicit rep action.
- CRM preview: `POST /crm-updates/preview` with `meeting_id`. Apply: `POST /crm-updates/<id>/apply`, runs only after approval.

## How it is verified

| Success criterion | Proof |
|---|---|
| 80 percent of follow-ups sent within 2 hours | Timestamp comparison between meeting end and sent email, computed weekly from the trail |
| Drafts contain no unsourced fact | Eval set of 40 meetings with notes, each draft facts checked against notes and CRM, pass mark of 100 percent on "no invented facts" |
| No CRM write without approval | Behavior probe: attempt apply without approval, expect refusal and a trail entry |
| Rep can approve a CRM update in fewer than 3 clicks | Usability test with five reps |

## Out of scope

- Customer success meetings, because their notes follow another format.
- Scheduling the next meeting, because that needs calendar write access we have not agreed.
- Editing a CRM record that belongs to another rep.

## Open questions

| Question | Who answers | Needed by |
|---|---|---|
| Can the assistant read transcripts as well as typed notes? | Sales operations | Before phase 1 exit |
| Is a read receipt acceptable on follow-ups? | Sales manager | Before phase 2 |
| How long is the trail kept? | Legal | Before phase 3 |

## Review log

| Phase | Reviewer | Date | Decision |
|---|---|---|---|
| Map | Product manager | 2026-03-02 | Approved |
| Specify | Product manager, engineering lead | 2026-03-04 | Approved with the autonomy boundaries unchanged |
| Plan | Engineering lead | 2026-03-05 | Approved, see `decomposition.md` |
| Tasks | Product manager | 2026-03-06 | Approved, see `execution-plan.md` |
