---
name: backlog-review-meeting
description: Builds the weekly backlog review deck for a program sponsor. It closes last week honestly and opens next week with dated commitments, using a fixed slide sequence with two mandatory anchors. Use when preparing or revising the weekly sponsor review.
---

# Backlog review meeting

The deck has one job: close the previous week with honesty and open the next with dated commitments. Everything between is variable.

## Step 0: fix the week and the destination

1. Week number: if the PM states it, that wins. Otherwise compute the ISO week.
2. Folder: `reviews/w{NN}/`. File: `review_w{NN}_YYYY-MM-DD.html` (meeting date) with a PDF of the same name beside it.
3. Never overwrite the previous week's folder. It is the record of what was promised.
4. The folder also holds inputs the PM drops there (roadmap picture, feedback document, pasted email). Look inside before asking anything.

### The follow-up email is the contract

After the meeting the PM sends the sponsor a short email with the agreements. Save it into the next week's folder as `_input_sponsor-email_YYYY-MM-DD.md`: the text sent, plus a table with Commitment, Declared deadline, and What to ask if there is no evidence. When the email and memory disagree, the email wins, because it is what the sponsor read.

## Step 1: gather facts before writing a slide

Read in this order:
1. The input file in the week's folder.
2. Last week's deck, especially Next steps. Each line becomes a line in this week's Actions summary. A commitment in the email but not in the deck also enters.
3. This week's meeting notes. Prefer structured summaries over full transcripts; pull a transcript only when you need an exact quote.
4. The specs and artifacts cited, so nothing is described from memory.
5. The tracker state for any topic with a card.

Never invent the content of a meeting you did not read. If a topic has no source, find it or ask.

## Step 2: canonical slide sequence

| # | Slide | Required | Rule |
|---|---|---|---|
| 1 | Cover | yes | Title with week number highlighted. Date, program, sponsor line. |
| 2 | Actions summary | yes (anchor 1) | One row per commitment from last week. See Step 3. |
| 3+ | Topic slides | no | One slide per subject the PM brings. Alternate dark and light, never more than 3 light in a row. |
| n-1 | Updated schedule | yes (anchor 2) | Always the second to last slide. See Step 4. |
| n | Next steps | yes | Dated commitments. They return as next week's Actions summary. |

The schedule comes near the end so the sponsor reads the facts first and the timeline second.

If the PM drops an image into the folder, that image is the slide. Embed it as base64 so the deck survives being sent outside the folder. Image slides carry no lead line.

## Step 3: Actions summary

Answers one question: of what we agreed last week, what happened?

1. List every commitment from last week. One per row, no grouping, no hiding.
2. Give each a status from a closed vocabulary:

| Status | Use when |
|---|---|
| Done | Delivered. Say what came out and the date. |
| Decided | It was a decision and it was made. Say which. |
| In progress | Work is moving. Say whether it is on time. |
| Not started | Nothing yet. Still shown, with the date it starts. |

Work described as happening is In progress, not Not started. Avoid "Late", "Pending" or "Did not advance": the first sounds like blame, the others say nothing.

3. Sort by execution level: Done, Decided, In progress, Not started.
4. What you do not know, you ask. Collect every open question for the edition into one batch with likely answers as options. Never fill a status by inference.
5. Lead of one line at most, such as "What moved since the last meeting."
6. A topic that loses its own slide stays as a row here and returns in Next steps if a commitment is open.

Never omit an item that did not move. Never write a cause nobody stated. Never mark Done something that only had a meeting scheduled.

## Step 4: Updated schedule slide

Position is fixed: second to last. Show only the program the sponsor follows, with the delivered work out of the picture.

Fix the axis window once (for example 4 months). The position of a date is `(date - window start) / window length * 100`.

Each edition, update three things:
1. The "today" line, to the meeting date.
2. The subtitle of each track, saying where it is now. The part that changed this week is emphasized.
3. The bars, only when reality changed. Development, test and deploy bars are estimates, and the legend must keep saying so.

The subtitle and the bar must tell the same story. If the bar ends on a date, the label cannot state another.

## Step 5: writing the middle

Density is the recurring defect. If a card passes two lines, cut.

| Element | Ceiling |
|---|---|
| Lead under the title | One line, only if it adds to the title |
| Card body | One sentence, up to 18 words |
| Actions summary row | One sentence, up to 14 words |
| Cards per slide | 6, in a grid of 3 |

- Minimum body font in the room: 14.5px on a 1280x720 stage. If text does not fit, fix the text, never the font.
- Slide titles: sentence case, up to 6 words, factual. Name the subject, not the editorial verdict.
- Every decision carries its "why this way". The sponsor does not have to agree, only to understand the criterion.
- A request from the user becomes an explicit destination: "enters in X" or "recorded without decision". Feedback without one is noise.
- Describe the mechanism, never the metaphor. "The rep reads the system as another boss with a whip" becomes "From policing to executing: the agent drafts and writes to the CRM."
- Name deliverables in full. Shortening is fine while the short form is still the name. When the cut leaves a word that means something else outside the program, use the whole name.
- Names of people: decision owners may appear with their role in an internal governance deck. Sources of feedback stay anonymous unless the PM asks otherwise, and then say it is an exception.
- Read each one or two word label out of context. If it sounds like slang, rename it.
- Bar tool names and internal jargon from decks that circulate as PDF. Every term must survive a cold read.

## Good and bad

Good row: "Done | Follow-up draft template approved by sales leadership | 12 Mar"
Bad row: "Template stuff mostly sorted" (no status from the vocabulary, no date, no object)

## Definition of done

- Previous week's folder untouched. New folder and file named by week and date.
- Cover, Actions summary, schedule (second to last) and Next steps all present.
- Every last-week commitment appears with a status from the closed vocabulary.
- Today line and track subtitles updated, matching the bars.
- Density ceilings respected. No invented content, no person names outside the allowed cases.
