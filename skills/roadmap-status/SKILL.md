---
name: roadmap-status
description: Reads the live roadmap from the tracker and reports it at the depth requested, from a one-screen executive view to an item-level drill-down, with a weekly diff and a log of delay events. Use when asked for roadmap status, what changed this week, or planned versus actual.
license: MIT
metadata:
  version: "1.1"
  author: Benjamin Tayar
  method: backlog-writing-system
---

# Roadmap status

> One live source (the tracker), one history (dated snapshots), several views of the same data. The output is a photo with a date, never a promise.

## When to use

- Someone asks for the roadmap status, planned versus actual, or what changed this week.
- The weekly review needs its schedule slide.
- A delay must be logged with its reason.

## Inputs

- A `registry` file: a small JSON that maps each epic to a track and a segment, and lists the allowed reason categories for delays.
- Read access to the tracker.
- The previous dated snapshot, for the diff.
- The ISO week and today's date, which you determine and pass as arguments. Scripts never generate dates.

## Procedure

1. Fix the week and the date. Derived files go in a `derived/` folder, created if missing.
2. Pull live: read the epics mapped in the registry; query the tracker for the full hierarchy under them (epic, feature, story, task); fetch for each item type, title, state, assignee, parent, iteration, tags; store the raw result, normalize it, and write a dated snapshot `snapshots/YYYY-Www.json`. If the tracker returns nothing, say so explicitly. Never fill the gap from memory. Committing the snapshot preserves history and allows time travel.
3. Compute derived data once: the diff against the previous snapshot (added, removed, changed state, changed date); delays, as events logged with planned date, new date and reason; calibration, actual duration against planned, per track.
4. Produce the view requested:

| Request | View | Content |
|---|---|---|
| executive | One-screen Gantt, anonymous | Tracks and segments, bar color from epic state, today line |
| operational (default) | Dashboard | Per stream: percent of stories done, what moved this week, delays |
| detailed | Tree | Epic to feature to story, state, owner, iteration. Internal only. |
| diff | What changed | Summary from the diff, in text for a quick answer |
| calibrate | Actual vs planned | Per track. A small sample at the start is expected, and declared durations are expected to miss. |
| feedback `<text>` | Log a delay | Append-only event |
| publish | Stakeholder formats | Use `publish-roadmap` |

5. To log a delay event: interpret the text and write one event with type, track, segment, item, planned date, new date, reason category, area, detail, date, author. The reason must be one of the categories in the registry. If data is missing (which segment, which dates), ask before writing. The log is append-only and nothing is erased.
6. QA before done: run a visual check on the generated dashboard and on the executive slide. Deliver only after a pass.

## Rules

- Anonymity is a hard boundary. Names of people appear only in internal views (detailed tree, time and people). The executive view and anything that goes to leadership stays anonymous. Never carry the assignee field into an executive slide.
- One source: the executive view, the dashboard and the published roadmap all come from the same registry. Never edit a Gantt by hand. Change the registry and regenerate.
- Epic state becomes bar color the same way everywhere: active is in build, new is planned, closed is delivered.
- Items with no track are a warning: they descend from an epic missing from the registry. Add it.
- The dashboard is a photo, not live. Its header shows the photo date so the reader sees how fresh it is.
- Translate tracker states for leadership. A closed item means the team closed it. It does not mean the business accepted it.
- A date moves only with a logged event and a reason category. A date that moved without an event is a defect of the process, not of the tracker.

Output for a quick text status:

```markdown
## Roadmap status, <date>

### By stream
- <stream> (<stage>): <summary and item ids>

### Progress by phase
| Phase | Outcome | Status | Items | Gate at risk? |
|---|---|---|---|---|

### Risks and drift
- <phase with no active items, item with no phase, gate at risk>

### Suggested next steps
- <action and owner role>
```

Be concise and factual.

## Checklist

- [ ] Week and date fixed by you, not by a script.
- [ ] Snapshot written for the week; raw result stored and normalized.
- [ ] Requested view generated from that snapshot only.
- [ ] Diff against the previous snapshot computed.
- [ ] Anonymity boundary respected in anything that leaves the team.
- [ ] Any delay event has a valid reason category and nothing was erased.
- [ ] Photo date visible in the output.
- [ ] Visual check passed on the dashboard and the executive slide.

## Example

Weak: "CRM update is a bit late, should be fine by end of month." (no date, no reason, no item)

Corrected: "Phase 2, send and write back: end moved from 2026-04-21 to 2026-04-28. Delay event logged: item ACME-E01-F03, reason category owner availability, area CRM admin team. Gate at risk: yes, field mapping at 9 of 14. Photo date 2026-04-13." (Illustrative.)

## Definition of done

Snapshot written for the week and date; the requested view generated from that snapshot only; anonymity boundary respected; any delay event has a valid reason category; photo date visible in the output.

## Related

- The same week: [`weekly-backlog-snapshot`](../weekly-backlog-snapshot/SKILL.md), [`backlog-review-meeting`](../backlog-review-meeting/SKILL.md). Distribution: [`publish-roadmap`](../publish-roadmap/SKILL.md). The plan the dates derive from: [`execution-plan`](../execution-plan/SKILL.md).
- Why: [principle 10, a roadmap is a dated photo](../../docs/principles.md#10-a-roadmap-is-a-dated-photo-not-a-promise); [the operating cadence](../../docs/operating-cadence.md).
- Template: [`roadmap-status.md`](../../templates/roadmap-status.md). Example: [`roadmap-status.md`](../../examples/acme-sales-assistant/roadmap-status.md).
