---
name: prioritize-now-next-later
description: Places Epics, Features and User Stories in Now / Next / Later by asking three questions of each item, how much it moves the number (an ROI impact score), when it is committed, and what has to exist first (the enabling chain), then cuts Now into waves that each end with something a person can use. Use when a backlog has more than the team can build, when a sponsor asks what comes first, when a high-value feature cannot start because nobody scheduled what it depends on, or at every weekly review when items move.
license: MIT
metadata:
  version: "1.1"
  author: Benjamin Tayar
  method: backlog-writing-system
---

# Prioritize with Now / Next / Later and the enabling chain

> Finding the real problem is half the job. The other half is cutting the work in the order that lets the team find its pace: no waiting on foundations nobody scheduled, no half-built features that cannot ship, something a person can use every week.

## When to use

- The backlog holds more than the team can build in the appetite.
- A sponsor asks "what comes first, and when do I see it?".
- The most valuable Feature sits at the top of the list and cannot start, because the two things it depends on sit at the bottom.
- The weekly review, every week: items move between bands with a reason, and what was removed is reported.

## Inputs

- The frame: the Epic's number and the appetite (`frame-the-problem`).
- The decomposition: Features, stories, sizes in Story Points, dependencies as relations (`decompose-spec`).
- Evidence for the impact and reach of each Feature: baseline measurements, prototype results, interview notes. Where there is none, say so in the confidence column.
- The team's known capacity, if any, for the waves (`capacity-simulation`).
- Last week's board, if one exists.

Output: the Now / Next / Later board (`templates/now-next-later-board.md`), the chain drawn, wave 1 in order, and the weekly demonstrables.

## Procedure

1. List the candidates: every Feature under the Epic, plus any Enabler the decomposition produced. One row each.
2. Ask question one, how much does it move the number. Score each Feature:

| Factor | Scale | Question |
|---|---|---|
| Impact | 3 high, 2 medium, 1 low | If this ships, how far does the Epic's number move? |
| Reach | share of the people or volume affected, 0 to 1 | Who gets the effect, how often? |
| Confidence | 3 measured, 2 estimated, 1 guessed | What evidence sits behind impact and reach? |
| Effort | Story Points of its stories | What does it cost, from the people who will build it? |

ROI impact = (Impact × Reach × Confidence) ÷ Effort. The score orders candidates. It does not place them.

3. Apply the two honesty rules before reading any score. No estimate, no rank: a Feature without estimated stories gets no score and goes to "to refine". Impact means the Epic's number: accuracy, latency, tokens and cost are technical criteria, not impact.
4. Ask question two, when. Place each scored Feature in a band:

| Band | Meaning | What it commits |
|---|---|---|
| Now | The current delivery cycle. Decomposed, estimated, dependency-complete | A demonstrable result at the end of the cycle |
| Next | After Now. Likely and scoped, not estimated to the story | A direction, reviewed weekly, moved up only when its chain is ready |
| Later | An idea with a written reason to exist. No scope, no estimate | Nothing, except the why, kept |

5. Ask question three, what has to exist first. For each Now Feature, list its prerequisites from the dependency relations: data feeds, write paths, permission models, approval screens. Pull every prerequisite into Now, whatever its own score, and mark it with inherited priority: "Now, enabling F02". The inherited priority is visible on the card and on the board.
6. Draw the chain and check it: every dependency is a relation, none points to a later band or a later wave, there is no cycle, and implied edges are removed (if A depends on B and B on C, do not also draw A to C).
7. Find the go-live set: the smallest set of Now Features that makes the Epic's first valuable outcome usable in production. That set, in dependency order, is wave 1. Everything else in Now goes to a later wave.
8. Order inside a wave: dependency first, then the riskiest item first where the order is free. A Feature never splits across two sprints. Keep a reserve of each sprint for enabling and platform work (a third is a good start), so foundations never wait for the product to finish.
9. Read the weekly demonstrables off the waves: what a person can see or use in week 1, week 2, week 3. An empty week means the slicing is wrong, not that the team is slow. Send it back to `decompose-spec`.
10. Run `capacity-simulation` when the team is known, and keep the board as the record of the order.
11. Every weekly review: re-read the board, move items with a one-line reason each, and report what was removed.

## Rules

- Three questions, every time: how much it moves the number, when, what has to exist first. A board built on the first question alone cannot be executed.
- No estimate, no rank. "To refine" is a band for honesty, not for parking.
- A Now Feature pulls its whole chain into Now. Inherited priority is written on the card.
- A dependency is a relation, never a sentence. A dependency never points to a later band or wave. No cycles. Reduce implied edges.
- Wave 1 is the go-live set, and it is what the sponsor is promised. Everything else is Next until it is not.
- Every week has something demonstrable, or the cut is wrong.
- Items move only in the weekly review, with a reason. Removed items are reported with the same care as added ones.
- Dates are never typed on the board. They are derived from capacity and the chain.

## Checklist

- [ ] Every Feature under the Epic is on the board, one row each.
- [ ] Every scored Feature has estimated stories; unestimated Features are in "to refine".
- [ ] Impact was scored against the Epic's number, not against a machine metric.
- [ ] Each Now Feature's prerequisites are in Now with their inherited priority written.
- [ ] The chain is drawn as relations: no later-band dependency, no cycle, no implied edge.
- [ ] Wave 1 is the smallest go-live set, in dependency order, risk first where free.
- [ ] Each week of the cadence has a demonstrable.
- [ ] A reserve for enabling work is set; no Feature splits across sprints.
- [ ] The review log has one line per move, with a reason, and a Removed line.

## Example

Weak board: "Priority 1: Propose the CRM update (highest value). Priority 2: Draft the follow-up email. Priority 3: Manager analytics. Priority 4: Meeting notes ingestion (low value, do when there is time)." The team starts on priority 1 and stops on day two: there are no notes to read.

Corrected: "Now: F01 Meetings and notes (impact 1, Now, enabling F02 and F03), F02 Follow-up draft and send (impact 3), F03 CRM write-back (impact 3), F04 Activity trail (impact 2, the measurement of the number). Wave 1, in order: F01, F02 and F03 in parallel, F04. Next: F05 Manager weekly digest, when F04 has two weeks of data. Later: F06 drafts in a second language, reason kept, decision due 2026-04-20. To refine: F07 schedule the next meeting, no stories yet. Week 1 demonstrable: the list of finished meetings with notes." (Illustrative; the full board is in `../../examples/acme-sales-assistant/prioritization.md`.)

## Definition of done

The board is done when a sponsor can read what lands first and why a low-scoring Feature is being built before a high-scoring one, when an engineer can start wave 1 without a meeting, and when every week of the cycle names something a person will see.

## Related

- Before: [`frame-the-problem`](../frame-the-problem/SKILL.md) for the number and the appetite, [`decompose-spec`](../decompose-spec/SKILL.md) for the stories, sizes and relations. After: [`capacity-simulation`](../capacity-simulation/SKILL.md) for the dates, [`execution-plan`](../execution-plan/SKILL.md) for the phases, [`backlog-review-meeting`](../backlog-review-meeting/SKILL.md) for the weekly moves.
- Why: [the prioritization method](../../docs/prioritization.md); [principle 5, sequence by the chain, not by the score](../../docs/principles.md#5-sequence-by-the-chain-not-by-the-score); [principle 1, start from the number](../../docs/principles.md#1-start-from-the-number); [principle 12, delete nine](../../docs/principles.md#12-volume-is-not-progress-delete-nine).
- Template: [`now-next-later-board.md`](../../templates/now-next-later-board.md). Example: [`prioritization.md`](../../examples/acme-sales-assistant/prioritization.md).
