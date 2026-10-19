# Review meeting w16, 2026-04-13

> Fictional example. Acme and all names, numbers and dates are invented to show the format.

Folder: `reviews/w16/` | File: `review_w16_2026-04-13.html` and `.pdf`

Inputs found in the folder: `_input_sponsor-email_2026-04-06.md`, the w16 snapshot

## 1. Cover

- ACME FIELD SALES ASSISTANT, WEEK 16
- 13 Apr 2026, Sales Productivity program, sponsor: VP Sales

## 2. Actions summary

Lead: What moved since the last meeting.

| Status | Commitment from last week | What came out or what is next | Date |
|---|---|---|---|
| Done | Confirm which CRM field holds the deal value (finding A1) | `amount` is the field; the two other value fields are ignored by the draft and the preview | 9 Apr |
| Decided | Decide whether drafts may use transcripts (D1) | Typed notes only for the pilot; transcripts revisited at expansion | 8 Apr |
| In progress | Map the CRM fields for the update step | 9 of 14 fields mapped; the CRM admin slot moved to 20 Apr, so Phase 2 end moves to 28 Apr | 28 Apr |
| Not started | Define the rep opt-out rule | Starts after the field mapping | 20 Apr |

## 3. Topic slides

| # | Title | Points | Source |
|---|---|---|---|
| 3 | Pilot results, week two | 62 percent of follow-ups sent within 2 hours of the meeting, up from 54 percent. 58 percent of drafts used with small edits or none. | Weekly snapshot w16 |
| 4 | A draft showed twice the deal value | One draft on 8 Apr showed 48,000 for a deal the CRM holds at 24,000. Origin found on 10 Apr: the draft read two value fields and summed them. Eval case E03 added; fix in sprint 3. | BUG03, eval cases v1.1 |
| 5 | Language in drafts | A rep received an English draft for a customer who writes in Portuguese. The first release is English only; sponsor decision on 20 Apr on whether language detection enters Phase 3. | Feedback triage |
| 6 | Manager digest request | A manager asked to see which drafts were never sent. Recorded as F05, outside the first release. | Feedback triage |

## 7. What we cut (one line)

Cut this week: the meeting-time suggestion in the follow-up (F02-US05, needs calendar write access, out of scope); the read-receipt option (D2, decided no on 6 Apr).

## 8. Updated schedule (second to last)

- Today line: 13 Apr 2026
- Track subtitles, with what changed this week emphasized:
  - Phase 1, see and draft: done 27 Mar; pilot running with 12 reps
  - Phase 2, send and write back: build in progress, 9 of 14 fields mapped, **end moved to 28 Apr**
  - Phase 3, manager view: starts after Phase 2, planned 12 May
  - Expansion decision: 1 Jun
- Bars changed this week: Phase 2 end, 21 Apr to 28 Apr (reason logged: CRM admin availability)
- Legend: development, test and deploy bars are estimates.

## 9. Next steps

| Commitment | Owner (role) | Deadline |
|---|---|---|
| Ship the BUG03 fix with eval case E03 passing | Tech lead | 17 Apr |
| Decide on language detection for Phase 3 | Sponsor | 20 Apr |
| Finish the CRM field mapping | Product manager | 24 Apr |
| Define the rep opt-out rule | Product manager | 24 Apr |

## QA

- [x] Previous week's folder untouched
- [x] Every last-week commitment has a status
- [x] What we cut is present, one line
- [x] Schedule is second to last, subtitles match bars
- [x] No invented content, no person names
- [x] Every label survives a cold read
