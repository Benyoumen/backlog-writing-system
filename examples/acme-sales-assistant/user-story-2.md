# ACME-E01-F02-US01 - Create one write path to the CRM for approved updates

Type: User Story. Parent: ACME-E01-F02 (a Feature, never an Epic).
Story Points: 5 (set in the field).
Successors: every story in ACME-E01-F02 that writes to the CRM (relation, not text).
Definition of Done: inherited from the team standard.

All values below are illustrative, for a fictional company.

## 1. Why it exists
Today any part of the agent could write to the CRM on its own. When a field changes, the sales director cannot tell what changed it or who approved it. Reps lose trust when a value is wrong and nobody can undo it.

## 2. Context
Every update in this Feature passes through this write path. Each later story chooses which field to update. This story does not choose fields.

## 3. Type
Enabler.

## 4. User Story
Create a single write path to the CRM to allow approved updates in ACME-E01-F02.

## 5. Expected behavior
The write path accepts an update only with a rep's approval attached. It writes only fields on the list the sales director approved. It records who approved, what the old value was, what the new value is and when. It can restore the old value on request. No other part of the agent can write to the CRM.

## 6. Out of scope
- Choosing which fields to update (stories later in ACME-E01-F02).
- Showing the update to the rep for approval (ACME-E01-F02-US02).
- Any write that is not part of an approved follow-up.

## 7. Technical notes
Implemented as a service with one endpoint. The field allowlist is read from configuration and checked on every call. Revert uses the stored previous value and fails if the field changed after the write.

## 8. Traceability
Source: product brief, section "CRM updates" (link in the tracker).

## 9. Acceptance criteria
See the Acceptance Criteria field. It holds these cases:

```
Case: Approved update is written
Given an update for an allowed field has the rep's approval
When the write path receives it
Then the new value is saved in the CRM.

Case: Update without approval is refused
Given an update for an allowed field has no approval
When the write path receives it
Then nothing is saved in the CRM.

Case: Field outside the list is refused
Given an update has the rep's approval and targets a field not on the approved list
When the write path receives it
Then nothing is saved in the CRM.

Case: Change is recorded
Given an approved update was saved
When the sales director opens the change history
Then it shows the approver, the old value, the new value and the time.

Case: Rep restores an old value
Given an approved update was saved and the field has not changed since
When the rep asks to undo it
Then the CRM field shows the old value again.
```
