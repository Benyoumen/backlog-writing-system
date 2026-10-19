![Backlog Writing System](assets/banner.svg)

# Backlog Writing System

[![Field guide](https://img.shields.io/badge/field%20guide-live%20site-0ea5a4)](https://benyoumen.github.io/backlog-writing-system/)
[![Skills](https://img.shields.io/badge/skills-18-1f3a8a)](#skills)
[![Templates](https://img.shields.io/badge/templates-14-1f3a8a)](templates)
[![Format](https://img.shields.io/badge/format-Agent%20Skills%20(SKILL.md)-475569)](AGENTS.md)
[![License](https://img.shields.io/badge/license-MIT-475569)](LICENSE)

**A backlog is a set of decisions, not a queue of work.** In 2026 a PRD, a prototype or fifty tickets cost an afternoon. What did not get cheaper is knowing which of them should exist. This method puts the product manager's judgment where four readers can act on it without a meeting: the engineer, the designer, the executive, and the coding agent that now writes the first version of the code.

It covers the whole path: frame the problem, prototype to learn, spec to commit, slice vertically, write Epic / Feature / User Story items, turn acceptance criteria into evals when the behavior is probabilistic, brief the agent, file bugs that describe instead of diagnose, and run an honest weekly cadence.

> [!TIP]
> **Three minutes:** read the [field guide](https://benyoumen.github.io/backlog-writing-system/). **Thirty minutes:** read the [manifesto](docs/manifesto.md), the [twelve principles](docs/principles.md) and the [workflow](docs/workflow.md). **Then use it:** copy any folder from [`skills/`](skills) into your assistant's skills directory.

## Start here

| If you | Read | Then use |
|---|---|---|
| Write backlog items every week | [`examples/before-after.md`](examples/before-after.md), three weak items rewritten | [`backlog-standard`](skills/backlog-standard/SKILL.md), [`why-it-exists`](skills/why-it-exists/SKILL.md), [`user-story-writing`](skills/user-story-writing/SKILL.md) |
| Lead a team and own outcomes | [`docs/workflow.md`](docs/workflow.md), seven stages and seven gates | [`frame-the-problem`](skills/frame-the-problem/SKILL.md), [`write-prd`](skills/write-prd/SKILL.md), [`backlog-review-meeting`](skills/backlog-review-meeting/SKILL.md) |
| Ship AI features or build with coding agents | [`docs/principles.md`](docs/principles.md), principles 7, 8 and 11 | [`eval-cases`](skills/eval-cases/SKILL.md), [`agent-brief`](skills/agent-brief/SKILL.md), [`AGENTS.md`](AGENTS.md) |

## The workflow

![Workflow map: seven stages, seven gates, four loops](assets/workflow-map.svg)

Each gate is one question. When the answer is no, the work goes back one stage, not to a meeting.

| Stage | Gate question | Skills |
|---|---|---|
| 0 Frame | Can we say the number and the appetite in one sentence? | `frame-the-problem` |
| 1 Discover | What did we learn that changes the spec? | `prototype-to-spec` |
| 2 Decide | Could an engineer and a coding agent start without a meeting? | `write-prd` |
| 3 Slice | Does every slice ship behavior someone can verify? | `decompose-spec`, `execution-plan` |
| 4 Write | Does each item pass the four-reader test? | `backlog-standard`, `epic-feature-story-templates`, `why-it-exists`, `user-story-writing`, `eval-cases`, `agent-brief` |
| 5 Build and verify | Threshold met on the held-out set, and zero never-cases? | `sprint-planning`, `eval-cases` |
| 6 Ship and learn | Did the number move? What do we delete? | `weekly-backlog-snapshot`, `backlog-review-meeting`, `roadmap-status`, `publish-roadmap`, `bug-report` |

Full detail, the loops, and what changed at each stage in 2026: [`docs/workflow.md`](docs/workflow.md).

## What is different about this method

- **Four readers, one test.** Every item must let an engineer, a designer, an executive and a coding agent act without a meeting. The "why it exists" field is written from the consequence of the item not existing, in plain language.
- **Evals as acceptance criteria.** For probabilistic behavior, acceptance is a threshold on a distribution: a golden set from real inputs, a scoring method, a pass rate agreed before the build, and never-cases. An AI item without eval cases is not Ready.
- **Autonomy is earned.** Every spec states Always / Ask first / Never. The ladder from observing to acting alone, and the evidence each step needs, lives in the companion [agent-design-principles](https://github.com/Benyoumen/agent-design-principles).
- **Written for agents too.** [`AGENTS.md`](AGENTS.md) tells a coding agent how to compose these skills, what it must never invent, and how to verify before returning. Principle 11, applied to this repository.
- **Honest cadence.** Weekly snapshot with a cutoff and a "removed this week" section, a review that opens with last week's commitments, a roadmap that carries its photo date.

## Skills

Each skill is a folder with a `SKILL.md`: when to use, inputs, procedure, rules, checklist, a weak and a corrected example, definition of done. They work with Claude Code, Codex, Cursor and similar agents, and read fine as plain Markdown.

**Frame and decide**

| Skill | What it does |
|---|---|
| [`frame-the-problem`](skills/frame-the-problem/SKILL.md) | One page before any design tool: problem, who, evidence, the number, the appetite, not-doing |
| [`prototype-to-spec`](skills/prototype-to-spec/SKILL.md) | What a prototype settles, what it cannot, and the questions to answer before a ticket exists |
| [`write-prd`](skills/write-prd/SKILL.md) | A short spec in gated phases: goal with a number, boundaries Always / Ask first / Never, evals plan |

**Slice and plan**

| Skill | What it does |
|---|---|
| [`decompose-spec`](skills/decompose-spec/SKILL.md) | Vertical slices with acceptance, verification, dependency and size; appetite before estimate |
| [`execution-plan`](skills/execution-plan/SKILL.md) | Spec to ready-to-load items, phases and a schedule derived from dependencies |

**Write the items**

| Skill | What it does |
|---|---|
| [`backlog-standard`](skills/backlog-standard/SKILL.md) | The standard: hierarchy, one fixed parent, Story Points, Predecessor / Successor, Definition of Ready and Done |
| [`epic-feature-story-templates`](skills/epic-feature-story-templates/SKILL.md) | Epic (11 sections), Feature (15), User Story (9), and what each section must contain |
| [`why-it-exists`](skills/why-it-exists/SKILL.md) | The why, written from the consequence of absence |
| [`user-story-writing`](skills/user-story-writing/SKILL.md) | Seven writing rules so a story needs no rules inside rules |
| [`eval-cases`](skills/eval-cases/SKILL.md) | Acceptance criteria for AI behavior: golden set, scoring, threshold, never-cases |
| [`agent-brief`](skills/agent-brief/SKILL.md) | A story prepared for a coding agent: why, verifiable checks, verification command, Never list |
| [`bug-report`](skills/bug-report/SKILL.md) | Lean bug cards that describe what happened and never assert a cause |
| [`work-item-card`](skills/work-item-card/SKILL.md) | A five-second card for a task or follow-up |

**Run the cadence**

| Skill | What it does |
|---|---|
| [`sprint-planning`](skills/sprint-planning/SKILL.md) | Planning layer: owner, points and sprint, written back to the tracker |
| [`weekly-backlog-snapshot`](skills/weekly-backlog-snapshot/SKILL.md) | A living document plus a frozen weekly snapshot with deltas, including what was removed |
| [`backlog-review-meeting`](skills/backlog-review-meeting/SKILL.md) | The weekly sponsor review, with two mandatory anchors and a line for what was cut |
| [`roadmap-status`](skills/roadmap-status/SKILL.md) | The roadmap at the depth requested, from executive view to drill-down |
| [`publish-roadmap`](skills/publish-roadmap/SKILL.md) | Stakeholder formats from one source, versioned with a photo date |

## See it work

One fictional product, **Acme Field Sales Assistant** (an AI agent that drafts follow-up emails and updates the CRM after customer meetings), runs through every stage in [`examples/acme-sales-assistant/`](examples/acme-sales-assistant): frame, prototype notes, PRD, decomposition, execution plan, Epic, Feature, two User Stories, eval cases, an agent brief, a bug report, a weekly snapshot, a review outline and a roadmap status. All names, numbers and dates are fictional.

Start with [`examples/before-after.md`](examples/before-after.md): three weak backlog items rewritten to the standard, with a table of what changed.

## The twelve principles

Start from the number. Prototype to learn, spec to commit. Write the why from the consequence of absence. Pass the four-reader test. Vertical slices, appetite before estimate. Structure serves navigation, not ceremony. For AI behavior, the acceptance criterion is an eval. Autonomy is earned, tier by tier. Bugs describe, they do not diagnose. A roadmap is a dated photo, not a promise. Write for the agent in the room. Volume is not progress: delete nine.

Each one with the failure it prevents, where it lives in the method, and who is making the same argument now: [`docs/principles.md`](docs/principles.md). The argument behind them: [`docs/manifesto.md`](docs/manifesto.md).

## Use

```
skills/       18 skills, one folder each (SKILL.md)
templates/    14 fill-in templates
examples/     the Acme example, end to end, plus before-and-after rewrites
docs/         manifesto, principles, workflow, hierarchy, delivery flow, cadence
site/         the field guide, published with GitHub Pages
AGENTS.md     standing instructions for a coding agent using this repository
```

- **Claude Code:** copy a skill folder into `.claude/skills/` (project) or `~/.claude/skills/` (personal). The skill is then invoked by name.
- **Codex, Cursor and others:** point your `AGENTS.md` at the skill files you use, or paste a `SKILL.md` into the task.
- **People:** read the Markdown. Replace "your tracker" with Jira, Azure DevOps, Linear or whatever you use.

## Sources

The method takes its arguments from current practitioners, not its numbers: Cagan on the AI productivity paradox, Torres on evals as the product team's job, Pollick on acceptance as a threshold on a distribution, Linear on plain issues, the spec-driven development tooling that reads `AGENTS.md`. The full list with links is at the end of [`docs/principles.md`](docs/principles.md#sources).

## License

MIT. See [LICENSE](LICENSE).
