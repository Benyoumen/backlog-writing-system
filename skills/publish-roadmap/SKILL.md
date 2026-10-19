---
name: publish-roadmap
description: Generates stakeholder-ready roadmap formats (HTML document, slide deck, Gantt page, PDF, PPTX) from one source file, versioned per publication with a visual diff against the previous one. Use when the roadmap needs to be distributed, not just checked.
---

# Publish roadmap

Every distribution format is derived from one source. Derived formats are never edited by hand: edit the source and publish again.

## Sources

- A strategic roadmap in markdown (phases and outcomes).
- A Gantt file with one row per deliverable and bars per month and status. For a live version, generate it from the tracker (see `roadmap-status`) using a registry that maps epics to tracks.

One source, two skins: a dark skin for the published Gantt and a light skin for the slide used in the weekly sponsor review. Epic state sets the bar color identically in both. A validation file for the light slide is generated separately and enters the weekly deck only by explicit decision of the PM.

## What each publication produces

| File | Purpose |
|---|---|
| `roadmap-document.html` | Scrolling document with the Gantt at the top |
| `roadmap-deck.html` | Slide deck, Gantt as the second slide |
| `roadmap-gantt.html` | Dedicated full-page Gantt |
| `roadmap-gantt.pdf` | Landscape PDF for sharing or print |
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

## How to run

1. Ask whether the PM wants to edit the source before publishing.
2. Run the publish script. It accepts source and output directory arguments.
3. Read its table of OK or FAILED per format and report to the user:
   - the path of the new version and of `latest/`
   - how many lines changed against the previous version
   - any format that failed, and why
4. Offer to open `latest/roadmap-document.html` or the diff.

## Consistency with the backlog

The roadmap content must match the full backlog, which is the single source for the program. A reader should be able to trust either one.

Facts that must match: the priority deliverables and their composition, item identity (IDs and codes), block scope, sequence and dates, channels, and cadence.

When a shared fact changes, update the backlog and the roadmap in the same pass, then search both for stale terms and swapped IDs before publishing.

## Language

- No slang or figurative phrases. Plain verbs and objects.
- Name each deliverable by its real name.
- Output formats of the agents' own reports are stated as they are, not mixed with the roadmap's formats.

## Definition of done

- All formats generated, or each failure reported with its reason.
- `latest/` points to the new version and CHANGELOG has an entry.
- Diff opened or summarized.
- Source and backlog checked for contradictions.
