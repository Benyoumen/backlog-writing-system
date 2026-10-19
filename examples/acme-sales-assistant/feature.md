# ACME-E01-F01 - Draft a follow-up email from the meeting notes

Type: Feature. Parent: ACME-E01. Children: ACME-E01-F01-US01, ACME-E01-F01-US02.

All values below are illustrative, for a fictional company.

## 1. Why it exists
Today the rep writes each follow-up email after the fact, usually in the evening. Meetings from the morning get an answer a day later, and some customers never get one.

## 2. Problem and context
The rep takes notes during the meeting and has the CRM record open on the same day. All the facts for a good follow-up already exist. The gap is the time to turn them into an email.

## 3. Objective
Give the rep a ready draft within minutes of a meeting ending, so that approving or editing it takes less time than writing it.

## 4. Business value
More meetings are followed up within one working day. This moves the first metric of ACME-E01 directly.

## 5. Expected behavior
When a meeting ends and the rep has saved notes, the agent prepares a draft email to the meeting attendees. The draft refers to the topics discussed, the agreed next steps and the dates mentioned. The agent shows the rep the draft and the notes it used. The rep edits, approves or discards it. The agent never sends an email by itself.

## 6. Acceptance criteria
1. Given a meeting with saved notes has ended, when the rep opens the assistant, then a draft for that meeting is listed.
2. Given a draft is shown, when the rep opens it, then it lists each fact used and the note line it came from.
3. Given the notes contain no agreed next step, when the draft is created, then the draft has no next-step sentence.
4. Given a draft is open, when the rep approves it, then the email is sent from the rep's own mailbox.
5. Given a draft is open, when the rep discards it, then nothing is sent and the meeting is marked as handled.
6. Given the meeting has no saved notes, when the rep opens the assistant, then no draft is created and the assistant asks for notes.

## 7. Scope and limits
In: draft creation, source display, edit, approve, discard.
Out: logging the outcome in the CRM (ACME-E01-F02), phone calls, attachments and languages other than English.

## 8. Business rules
- A draft uses only facts from the rep's notes and the CRM record of the opportunity.
- The email is always sent from the rep's mailbox, never from a shared address.
- One meeting has at most one active draft.

## 9. Data and sources
| Data | Source system | Source of truth? |
|---|---|---|
| Meeting end time and attendees | Calendar | Yes |
| Meeting notes | Notes tool | Yes |
| Opportunity name, stage and owner | CRM | Yes |

## 10. Dependencies
Predecessors: calendar access granted (ACME-E01-D01).
Successors: ACME-E01-F02 reads the approved email to log the outcome.

## 11. Non-functional requirements
- A draft appears within five minutes of the rep saving the notes.
- Notes and drafts are visible only to the rep who owns the meeting.
- Every draft logs the input, the output, the model version, the user and the time, and is kept for 12 months.

## 12. Evaluation criteria
- Quality: at least 60% of drafts are sent with no edits or small edits, measured weekly over the first 8 weeks.
- Fallback: when the draft cannot be created, the rep sees a message and can write the email manually.
- Autonomy guardrail: no email is sent without explicit approval.
- Auditability: all drafts are logged as described in the non-functional requirements.
- Evaluation method: sales operations reviews 30 randomly chosen drafts each week against a written checklist.

## 13. Open items and decisions
| Question | Owner | Decide by |
|---|---|---|
| Should drafts include the rep's signature block? | Sales director | Before first release |
| Which mailbox provider do reps use? | Sales operations | Before sprint planning |

## 14. Traceability
Source: product brief, section "Follow-up after meetings" (link in the tracker).

## 15. Estimate
Effort: 21
Basis: estimated by the developers during sprint planning.
