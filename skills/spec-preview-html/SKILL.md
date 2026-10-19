---
name: spec-preview-html
description: Renders the functional and technical spec as one readable HTML page that a developer, a QA and a non-technical sponsor can all read without a meeting. Every Epic, Feature and Story carries a one-sentence plain summary next to its numbered sections, every term is in a glossary, the chapters follow a fixed order, and the page is generated from a data file, never edited by hand. Use when a tech lead asks for the backlog of a capability, when QA needs to understand what to test, when a sponsor wants to see what lands when, or before loading a batch into the tracker.
license: MIT
metadata:
  version: "1.1"
  author: Benjamin Tayar
  method: backlog-writing-system
---

# Spec preview as readable HTML

> A spec in a tracker is read one card at a time. A spec on one page is read as a product. The developer finds the sections, the QA finds the acceptance cases, the sponsor finds the sentence and the chart, and nobody has to ask what a term means.

## When to use

- A tech lead asks for "the backlog of X" and wants to read it top to bottom.
- QA needs to understand a capability before writing tests.
- A sponsor wants to see what lands when, in their own language.
- Before loading a batch into the tracker, as the review copy.

## Inputs

- The execution plan and the items (`execution-plan`, `backlog-standard`): Epic, Features, Stories with their numbered sections.
- The decomposition and the Now / Next / Later board, for phases, waves and relations.
- The start date and the derived schedule (`capacity-simulation`).
- The findings from checking the real artifacts the spec assumes exist: the live CRM, the spreadsheet, the catalog, the board.

Output: one HTML file, generated from a data file (JSON or YAML) by a script. The data file is what gets edited. The HTML is what gets read. The Acme example is live at https://benyoumen.github.io/backlog-writing-system/spec-preview.html.

## Procedure

1. Put every item in the data file with its numbered sections, and add the two layers of the double ruler: a plain summary and glossary entries.
2. Write the plain summary for every Epic, Feature and Story. One sentence. The subject is the person or the system, not the component. It says what starts to happen, not how. No acronym, no table name, no library name.
3. Write the glossary: one term per entry, a one-line definition, and where it appears. Every acronym, artifact name, system name and method term used anywhere on the page. If a term appears and is not defined, the page fails.
4. Generate the page in the fixed chapter order:

| # | Chapter | What it holds |
|---|---|---|
| 1 | Summary | Version, sources, status in the tracker, six metrics (epics, features, stories, effort, critical path, phases), "In 30 seconds", pending decisions by phase |
| 2 | Delivery phases | One block per phase: what reaches production, why this order, the story cards, the exit gate, the decisions the phase needs; then the weekly cadence: what is demonstrable each week |
| 3 | Schedule | A chart with one track per Epic, vertical bands for phases, a row of deliveries and checkpoints, the assumptions |
| 4 | Items by Epic | Epic, Features and Stories, each with its plain summary visible and its numbered sections in a collapsible block |
| 5 | What already exists | Material ready before kickoff and what each piece saves |
| 6 | Where it appears | Touchpoints: who sees it, in which channel, what this backlog builds, what depends on another team |
| 7 | Glossary | Every term, one line each |
| 8 | Open decisions | Decisions the backlog does not make, the findings from the artifact check, who answers what, what is already decided |
| 9 | Board order | The order of creation in the tracker |

5. Run the gates in the generator. The page is refused when a dependency points to a later phase, a cycle exists, story numbering has a hole or a duplicate, a story has no phase, the sum of story effort does not match the budget, or a term is undefined.
6. Derive every date from the one typed start date. No date is typed anywhere else.
7. Read the page as the three readers: the sponsor reads chapter 1 and the chart; the QA reads one Feature's acceptance cases and the never-cases; the developer reads one critical Story and the glossary. Fix in the data file, regenerate, read again.
8. Share the page with the tech lead and the sponsor before the batch is loaded into the tracker. Decisions from the review go back into the data file, never into the HTML.

## Rules

- Generated, never hand-edited. If you open the HTML to fix something, the defect is in the generator or the data file.
- The double ruler is not an extra. Plain summary and numbered sections live on the same item; the glossary covers the whole page.
- Plain summary: one sentence, subject is a person or a system, says what starts happening, no acronym, no table name, no library name.
- Fixed chapter order. Readers learn where to look once.
- The generator refuses an inconsistent plan rather than printing it. A wrong page read by three audiences costs more than a late one.
- Only the start date is typed. Every other date is derived.
- The findings from the artifact check are a chapter, not a chat message. What is only discovered by opening the live system is what the tech lead would otherwise rediscover while building.
- No person's name appears on the page. Roles do.

## Checklist

- [ ] Every Epic, Feature and Story has a plain summary that passes the three tests (subject, what starts happening, no jargon).
- [ ] Every term on the page is in the glossary with a one-line definition and where it appears.
- [ ] Chapters are in the fixed order, all nine present.
- [ ] Gates run: no later-phase dependency, no cycle, no numbering hole, every story has a phase, effort matches the budget, no undefined term.
- [ ] Only the start date is typed.
- [ ] The artifact check ran and its findings are in chapter 8.
- [ ] The page was read as sponsor, QA and developer, and the fixes went into the data file.
- [ ] The HTML carries a note that it is generated and where the data file lives.

## Example

Weak plain summary: "Implements the draft-generation contract consumable by the CRM writer through a versioned payload." A developer understands it; the sponsor does not. Also weak: "Improves the follow-up experience." Nobody learns anything.

Corrected: "After a customer meeting, the rep finds a drafted follow-up email with the facts it used listed beside it." And for the write path: "An approved CRM update is applied once, and if the record changed in the meantime the update stops and says so." (Illustrative; all plain sentences and glossary entries for the Acme example are in `../../examples/acme-sales-assistant/spec-preview-notes.md`.)

## Definition of done

The page is done when a sponsor can say what lands in each week from chapters 1 to 3, a QA can list what to test for one Feature from chapter 4, a developer can start one Story from chapter 4 and the glossary, and the generator reports zero gate failures.

## Related

- Sources: [`execution-plan`](../execution-plan/SKILL.md), [`backlog-standard`](../backlog-standard/SKILL.md), [`epic-feature-story-templates`](../epic-feature-story-templates/SKILL.md), [`prioritize-now-next-later`](../prioritize-now-next-later/SKILL.md), [`capacity-simulation`](../capacity-simulation/SKILL.md). The sentence itself: [`why-it-exists`](../why-it-exists/SKILL.md), [`user-story-writing`](../user-story-writing/SKILL.md).
- Why: [principle 4, the four-reader test](../../docs/principles.md#4-pass-the-four-reader-test); [the prioritization method, section 5](../../docs/prioritization.md); [the workflow, stage 4](../../docs/workflow.md).
- Template: [`spec-preview.md`](../../templates/spec-preview.md). Example data: [`spec-preview-notes.md`](../../examples/acme-sales-assistant/spec-preview-notes.md). Live page: [Acme spec preview](https://benyoumen.github.io/backlog-writing-system/spec-preview.html).
