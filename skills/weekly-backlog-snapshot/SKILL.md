---
name: weekly-backlog-snapshot
description: Maintains one living backlog document and freezes a dated, read-only snapshot of it every week, with what changed and KPIs with week-over-week delta. Use when asked for a weekly backlog cut, a versioned backlog, or to fold new feedback, dates or KPIs into the backlog.
---

# Weekly backlog snapshot

Keep one living backlog and one frozen photo per week. The living document is the source of truth. The snapshot is a copy made at the weekly cutoff, kept for history.

## Naming

- Living document: `<product>-backlog.md`
- Snapshot: `<product>-backlog_w{NN}.md`, where `NN` is the ISO week number of the cutoff day.
- The cutoff is a fixed weekday, for example Monday. Pick it once and never move it.

## Golden rules

1. Start from what exists. Never rebuild the backlog from scratch. Open the living document, change only what changed, keep everything else (item IDs, parents, statuses, stories).
2. Update the living document first, then freeze. The snapshot is a copy at the cutoff. Never edit a snapshot.
3. One source of truth per fact. If a full backlog exists elsewhere, the living document is a prioritized subset and must not contradict it. A shared fact that changes (ID, state, parent, date) changes in both places in the same pass.
4. Names of people never appear. Use the role ("a sales rep", "the sponsor").
5. Callout boxes are for instructions the reader must act on when migrating to the tracker: "do not create", "do not duplicate", state corrections, validation gates. Reading guidance is one or two plain sentences.
6. The version note goes in a Version history section at the end. The header only carries version number, date and cutoff week.

## Weekly checklist

- [ ] Delivery schedule: dates and status per stream match the roadmap shown in the weekly review.
- [ ] KPIs: current value per indicator, and from the second measurement the week-over-week delta (up, down, stable) with the same scope and period as last week.
- [ ] Feedback: each new piece of feedback becomes an adjustment item tied to an existing feature ID and the place it applies. Never a loose new feature. Triage each one: enters now, opens a decision, or "validated, keep as is". Anonymize the source.
- [ ] New or changed features: next free number under the epic, marked Create or Update, and MVP when it belongs to the priority cut.
- [ ] Summary: recount features and stories per block and in total.
- [ ] Header: version, date, cutoff week bumped. Version note added to Version history.

## Process

1. Find the ISO week of the cutoff day.
2. Update the living document with the checklist above.
3. Copy it to `<product>-backlog_w{NN}.md`.
4. Render both to the shareable format (HTML or PDF) with the same converter.
5. QA before delivering: every cited ID exists in the tracker or is marked Create; no person names; story cards are lists, not blocks of prose; anchors work; summary counts match the items.

## Good and bad

Good: "KPI 2, CRM update accuracy: 91%, stable vs w11. Scope: last 14 days, all pilot reps."
Bad: "Accuracy improved a lot this week." No number, no scope, no baseline.

Good: "Feedback from a rep: drafts ignore the customer's language. Adjustment tied to F-12 (draft generation), place: language detection rule. Decision: enters sprint."
Bad: A new feature "Multilingual everything" created from one comment.

## Definition of done

- Living document updated, version bumped, history entry written.
- Snapshot exists with the right week suffix and is identical to the living document at the cutoff.
- Both render without errors and pass the QA list.
- Corrections found later go into the living document and appear in the next snapshot. Old snapshots are not reopened.
