---
name: publish-roadmap
description: Generates stakeholder-ready roadmap formats (HTML document, slide deck, Gantt page, PDF, PPTX) from one source file, versioned per publication with a visual diff against the previous one. Use when the roadmap needs to be distributed, not just checked.
license: MIT
metadata:
  version: "1.1"
  author: Benjamin Tayar
  method: backlog-writing-system
---

# Publish roadmap

> Every distribution format is derived from one source. Derived formats are never edited by hand: edit the source and publish again.

## When to use

- Stakeholders need a version of the roadmap they can open, forward or print.
- The weekly review needs its light-skin schedule slide regenerated.
- A roadmap changed and the previous publication is now wrong.

## Inputs

- A strategic roadmap in markdown: phases and outcomes.
- A Gantt file with one row per deliverable and bars per month and status. For a live version, generate it from the tracker (see `roadmap-status`) using the registry that maps epics to tracks.
- The full backlog, to check consistency before publishing.
- The publish script, which accepts source and output directory arguments.

## Procedure

1. Ask whether the PM wants to edit the source before publishing.
2. Check consistency with the backlog (Rules) and fix the source, never the output.
3. Run the publish script.
4. Read its table of OK or FAILED per format and report: the path of the new version and of `latest/`; how many lines changed against the previous version; any format that failed, and why.
5. Offer to open `latest/roadmap-document.html` or the diff.

What each publication produces:

| File | Purpose |
|---|---|
| `roadmap-document.html` | Scrolling document with the Gantt at the top |
| `roadmap-deck.html` | Slide deck, Gantt as the second slide |
| `roadmap-gantt.html` | Dedicated full-page Gantt |
| `roadmap-gantt.pdf` | Wide-page PDF for sharing or print |
| `roadmap.pdf` | PDF of the document |
| `roadmap.pptx` | PowerPoint, with a Gantt slide and a dark and light rhythm |
| `_source.md`, `_gantt_source.md` | Snapshots of the sources for that version |
| `_diff-vs-previous.html` | Visual diff against the previous publication |

Folder layout:

```
roadmap/
  publications/YYYY-MM-DD_HHMM/   one folder per version
  latest/                          copy of the newest, a stable link for stakeholders
  CHANGELOG.md                     what changed in each publication
```

The Gantt shows month columns, a today line, bars colored by status, milestones, and an "updated today" pill that appears when the Gantt source changed since the last publication.

## Rules

- One source, two skins: a dark skin for the published Gantt and a light skin for the slide used in the weekly sponsor review. Epic state sets the bar color identically in both. A validation file for the light slide is generated separately and enters the weekly deck only by explicit decision of the PM.
- The roadmap content must match the full backlog, which is the single source for the program. A reader should be able to trust either one. Facts that must match: the priority deliverables and their composition, item identity (ids and codes), block scope, sequence and dates, channels, and cadence.
- When a shared fact changes, update the backlog and the roadmap in the same pass, then search both for stale terms and swapped ids before publishing.
- Every publication carries its photo date on every page.
- Language: no slang or figurative phrases, plain verbs and objects; name each deliverable by its real name; the output formats of the agents' own reports are stated as they are, not mixed with the roadmap's formats.

## Checklist

- [ ] PM asked whether to edit the source first.
- [ ] Backlog and roadmap checked for contradictions; stale terms and swapped ids searched.
- [ ] All formats generated, or each failure reported with its reason.
- [ ] `latest/` points to the new version and CHANGELOG has an entry.
- [ ] Diff opened or summarized.
- [ ] Photo date visible on every page.

## Example

Weak: a Gantt edited by hand in the slide tool, with one bar moved to match what the sponsor was told on the phone, and no changelog entry.

Corrected: the registry and the Gantt source updated with the delay event (ACME-E01-F03, 2026-04-21 to 2026-04-28, owner availability), the backlog's delivery schedule updated in the same pass, publication `2026-04-13_0900` generated in all formats, CHANGELOG entry "Phase 2 end moved one week; reason logged", diff shows 3 lines changed. (Illustrative.)

## Definition of done

All formats generated, or each failure reported with its reason; `latest/` points to the new version and CHANGELOG has an entry; diff opened or summarized; source and backlog checked for contradictions.

## Related

- The data: [`roadmap-status`](../roadmap-status/SKILL.md). The backlog it must match: [`weekly-backlog-snapshot`](../weekly-backlog-snapshot/SKILL.md). The deck that uses the light skin: [`backlog-review-meeting`](../backlog-review-meeting/SKILL.md).
- Why: [principle 10, a roadmap is a dated photo](../../docs/principles.md#10-a-roadmap-is-a-dated-photo-not-a-promise); [the operating cadence](../../docs/operating-cadence.md).
