---
name: weekly-backlog-snapshot
description: Maintains one living backlog document and freezes a dated, read-only snapshot of it every week, with what changed, what was removed, and KPIs with week-over-week delta. Use when asked for a weekly backlog cut, a versioned backlog, or to fold new feedback, dates or KPIs into the backlog.
license: MIT
metadata:
  version: "1.1"
  author: Benjamin Tayar
  method: backlog-writing-system
---

# Weekly backlog snapshot

> One living backlog and one frozen photo per week. The living document is the source of truth; the snapshot is the copy made at the cutoff, kept for history, and it reports what was removed as well as what was added.

## When to use

- The weekly cutoff day, every week, once the program is running.
- New feedback, dates or KPI values must be folded into the backlog.
- Someone asks for "the backlog as of week NN".

## Inputs

- The living backlog document: `<product>-backlog.md`.
- The tracker, for item ids, states and parents.
- The KPI values for the week, with the same scope and period as last week.
- New feedback, anonymized to the role.
- The roadmap shown in the weekly review, for dates and status per stream.
- The list of items removed this week, with the reason for each.

## Procedure

1. Find the ISO week of the cutoff day. The cutoff is a fixed weekday, for example Monday. Pick it once and never move it.
2. Update the living document, in this order:
   - Delivery schedule: dates and status per stream match the roadmap shown in the weekly review.
   - KPIs: current value per indicator, and from the second measurement the week-over-week delta (up, down, stable) with the same scope and period as last week.
   - Feedback: each new piece becomes an adjustment item tied to an existing feature id and the place it applies. Never a loose new feature. Triage each one: enters now, opens a decision, or "validated, keep as is". Anonymize the source.
   - New or changed features: next free number under the epic, marked Create or Update, and MVP when it belongs to the priority cut.
   - Removed this week: every item cut, split away or retired, with its id, the reason, and where the essential content went (another item, a non-functional requirement, nowhere). Nothing disappears silently.
   - Summary: recount features and stories per block and in total.
   - Header: version, date, cutoff week bumped. Version note added to Version history.
3. Copy the living document to `<product>-backlog_w{NN}.md`.
4. Render both to the shareable format (HTML or PDF) with the same converter.
5. QA before delivering: every cited id exists in the tracker or is marked Create; no person names; story cards are lists, not blocks of prose; anchors work; summary counts match the items; the removed list and the added list both reconcile with last week's counts.

## Rules

1. Start from what exists. Never rebuild the backlog from scratch. Open the living document, change only what changed, keep everything else (item ids, parents, statuses, stories).
2. Update the living document first, then freeze. The snapshot is a copy at the cutoff. Never edit a snapshot. Corrections found later go into the living document and appear in the next snapshot.
3. One source of truth per fact. If a full backlog exists elsewhere, the living document is a prioritized subset and must not contradict it. A shared fact that changes (id, state, parent, date) changes in both places in the same pass.
4. Names of people never appear. Use the role ("a sales rep", "the sponsor").
5. Callout boxes are for instructions the reader must act on when migrating to the tracker: "do not create", "do not duplicate", state corrections, validation gates. Reading guidance is one or two plain sentences.
6. The version note goes in a Version history section at the end. The header only carries version number, date and cutoff week.
7. The snapshot reports removals with the same care as additions. A week with nothing removed is reported as such, not omitted.

## Checklist

- [ ] Cutoff week computed; header version, date and week bumped.
- [ ] Delivery schedule matches the roadmap in the weekly review.
- [ ] Every KPI has a value, a scope, a period and a delta from the second week on.
- [ ] Every feedback item is tied to an existing feature id and has a decision.
- [ ] New or changed features have the next free number and a Create or Update mark.
- [ ] Removed this week lists id, reason and destination for every cut item.
- [ ] Summary counts reconcile with last week plus additions minus removals.
- [ ] Snapshot file named with the right week suffix; identical to the living document at the cutoff.
- [ ] Both render; no person names; anchors work.

## Example

Weak KPI line: "Accuracy improved a lot this week." (no number, no scope, no baseline)

Corrected: "Follow-ups sent within 2 hours of the meeting: 62 percent, up from 54 percent (w15). Scope: 12 pilot reps, last 14 days." And a removal line: "ACME-E01-F02-US05 Suggest a meeting time in the follow-up: removed. Needs calendar write access, which the spec puts out of scope. Content kept as an open decision on the Feature." (Illustrative.)

## Definition of done

Living document updated, version bumped, history entry written; snapshot exists with the right week suffix and is identical to the living document at the cutoff; additions and removals both listed and reconciled; both files render and pass the QA list.

## Related

- The same week: [`roadmap-status`](../roadmap-status/SKILL.md), [`backlog-review-meeting`](../backlog-review-meeting/SKILL.md), [`sprint-planning`](../sprint-planning/SKILL.md). The number it reads back: [`frame-the-problem`](../frame-the-problem/SKILL.md).
- Why: [principle 10, a roadmap is a dated photo](../../docs/principles.md#10-a-roadmap-is-a-dated-photo-not-a-promise); [principle 12, delete nine](../../docs/principles.md#12-volume-is-not-progress-delete-nine); [the operating cadence](../../docs/operating-cadence.md).
- Template: [`weekly-snapshot.md`](../../templates/weekly-snapshot.md). Example: [`weekly-snapshot.md`](../../examples/acme-sales-assistant/weekly-snapshot.md).
