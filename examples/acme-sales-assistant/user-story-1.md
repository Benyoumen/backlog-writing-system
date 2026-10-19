# ACME-E01-F02-US02 - Show the facts behind each follow-up draft

Type: User Story. Parent: ACME-E01-F02 (a Feature, never an Epic).
Story Points: 3 (set in the field).
Predecessor: ACME-E01-F02-US01, the story that creates the draft (relation, not text).
Definition of Done: inherited from the team standard.

All values below are illustrative, for a fictional company.

## 1. Why it exists
Today the rep cannot tell which parts of a draft come from the notes and which the agent added. The rep rereads the whole meeting to check each line. Many reps will stop using the drafts because checking takes longer than writing.

## 2. Context
The draft already exists when this story starts. This story only adds the view that links each fact in the draft to the note line it came from.

## 3. Type
Functional.

## 4. User Story
As a sales rep, I need to see the note behind each fact in a draft, so that I can approve it without rereading the meeting.

## 5. Expected behavior
Each fact in the draft is marked. Selecting a mark shows the note line it came from. A fact that has no note line is shown as not found in the notes. The rep can remove any marked fact from the draft with one action. Marks are never included in the sent email.

## 6. Out of scope
- Creating the draft (ACME-E01-F02-US01).
- Sending the email (ACME-E01-F02-US03).
- Showing facts that come from the CRM record. This story covers meeting notes only.

## 7. Technical notes
Source marks are stored as offsets into the generated text, with the note ID and line number. The mark layer is stripped before the message body is passed to the mail service.

## 8. Traceability
Source: `prd.md`, capability follow-up-draft; `prototype-notes.md`, settled item "reps do not trust a draft without seeing where each fact came from" (links in the tracker).

## 9. Acceptance criteria
See the Acceptance Criteria field. It holds these cases:

```
Case: Rep sees where a fact came from
Given a draft with a marked fact is open
When the rep selects the mark
Then the note line that contains the fact is shown.

Case: Rep sees a fact with no source
Given the draft contains a fact that is not in the notes
When the rep opens the draft
Then that fact is labeled "not found in the notes".

Case: Rep removes a fact
Given a draft with a marked fact is open
When the rep removes the fact
Then the sentence containing it is deleted from the draft.

Case: Marks stay out of the email
Given a draft with marked facts was approved
When the email is sent
Then the sent email contains no marks and no labels.
```
