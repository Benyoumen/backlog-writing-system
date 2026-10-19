---
name: roadmap-status
description: Reads the live roadmap from the tracker and reports it at the depth requested, from a one-screen executive view to an item-level drill-down, with a weekly diff and a log of delay events. Use when asked for roadmap status, what changed this week, or planned versus actual.
---

# Roadmap status

One live source (the tracker), one history (dated snapshots), several views of the same data.

## Hard boundary: anonymity

Names of people appear only in internal views (detailed tree, time and people). The executive view and anything that goes to leadership stays anonymous. Never carry the assignee field into an executive slide.

## Step 0: always fix the week and the date

You, the agent, determine the ISO week and today's date and pass them as arguments. Scripts never generate dates. Derived files go in a `derived/` folder, created if missing.

## Step 1: pull live

1. Read the epics mapped in a `registry` file (a small JSON that maps each epic to a track and segment).
2. Query the tracker for the full hierarchy under those epics: epic, feature, story, task.
3. Fetch for each item: type, title, state, assignee, parent, iteration, tags.
4. Store the raw result, normalize it, and write a dated snapshot `snapshots/YYYY-Www.json`.
5. If the tracker returns nothing, say so explicitly. Never fill the gap from memory.

The weekly snapshot is the photo. Committing it preserves history and allows time travel.

## Step 2: compute derived data once

- Diff against the previous snapshot: added, removed, changed state, changed date.
- Delays: events logged with planned date, new date and reason.
- Calibration: actual duration against planned, per track.

## Depth levels

| Request | View | Content |
|---|---|---|
| executive | One-screen Gantt, anonymous | Tracks and segments, bar color from epic state, today line |
| operational (default) | Dashboard | Per stream: percent of stories done, what moved this week, delays |
| detailed | Tree | Epic to feature to story, state, owner, iteration. Internal only. |
| diff | What changed | Summary from the diff, in text for a quick answer |
| calibrate | Actual vs planned | Per track. Small sample at the start is expected. |
| feedback `<text>` | Log a delay | Append-only event |
| publish | Stakeholder formats | Use the `publish-roadmap` skill |

### Logging a delay event

Interpret the text and write one event: type, track, segment, item, planned date, new date, reason category, area, detail, date, author. The reason must be one of the categories defined in the registry. If data is missing (which segment, which dates), ask before writing. The log is append-only and nothing is erased.

## Rules

- One source: the executive view, the dashboard and the published roadmap all come from the same registry. Never edit a Gantt by hand. Change the registry and regenerate.
- Epic state becomes bar color the same way everywhere: active is in build, new is planned, closed is delivered.
- Items with no track are a warning: they descend from an epic missing from the registry. Add it.
- The dashboard is a photo, not live. Its header shows the photo date so the reader sees how fresh it is.
- Translate tracker states for leadership. A closed item means the team closed it. It does not mean the business accepted it.

## Output for a quick text status

```markdown
## Roadmap status, <date>

### By stream
- <stream> (<stage>): <summary and item IDs>

### Progress by phase
| Phase | Outcome | Status | Items | Gate at risk? |
|---|---|---|---|---|

### Risks and drift
- <phase with no active items, item with no phase, gate at risk>

### Suggested next steps
- <action and owner role>
```

Be concise and factual.

## QA before done

Run a visual check on the generated dashboard and on the executive slide. Deliver only after a pass.

## Definition of done

- Snapshot written for the week and date.
- Requested view generated from that snapshot only.
- Anonymity boundary respected.
- Any delay event has a valid reason category.
- Photo date visible in the output.
