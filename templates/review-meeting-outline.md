# Review meeting w<NN>, <YYYY-MM-DD>

Folder: `reviews/w<NN>/` | File: `review_w<NN>_<YYYY-MM-DD>.html` and `.pdf`

Inputs found in the folder: <list, or "none">

## 1. Cover (required)

- Title with the week number highlighted
- Date, program, sponsor line

## 2. Actions summary (required, anchor 1)

Lead (one line): <what moved since the last meeting>

| Status | Commitment from last week | What came out or what is next | Date |
|---|---|---|---|
| Done | | | |
| Decided | | | |
| In progress | | | |
| Not started | | | |

Sorted: Done, Decided, In progress, Not started. One row per commitment. Open questions go in one batch to the PM.

## 3. Topic slides (optional, one subject each)

| # | Title (sentence case, up to 6 words) | One-sentence points (up to 18 words) | Source |
|---|---|---|---|
| 3 | | | <meeting notes, spec> |

Ceilings: 6 cards per slide, grid of 3, no card over two lines.

## n-2. What we cut (required, one line)

Cut this week: <items removed, with the reason, from the snapshot's Removed this week section>. "Nothing was cut this week" is a valid line and is still shown.

## n-1. Updated schedule (required, anchor 2, always second to last)

- Today line: <meeting date>
- Track subtitles (what changed this week is emphasized):
  - <track>: <where it is now>
- Bars changed this week: <none, or which and why>
- Legend: development, test and deploy bars are estimates.

## n. Next steps (required)

| Commitment | Owner (role) | Deadline |
|---|---|---|
| | | |

These return as next week's Actions summary.

## QA

- [ ] Previous week's folder untouched
- [ ] Every last-week commitment has a status
- [ ] What we cut is present, one line
- [ ] Schedule is second to last, subtitles match bars
- [ ] No invented content, no person names outside allowed cases
- [ ] Every label survives a cold read
