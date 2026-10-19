---
name: epic-feature-story-templates
description: Fills the Epic (11 sections), Feature (15 sections) and User Story (9 sections) templates correctly: what each section must contain, what to leave out, and how the levels differ. Use when drafting a new Epic, Feature or User Story from a spec or brief, or when checking that an item has the right sections in the right order.
license: MIT
metadata:
  version: "1.1"
  author: Benjamin Tayar
  method: backlog-writing-system
---

# Epic, Feature and User Story templates

> The section lists for the three levels and what goes in each, so every reader finds the same information in the same place on every item.

## When to use

- Drafting a new item from a spec, a decomposition or an execution plan.
- Checking that an item has the right sections, in the right order, with the standard names.
- Deciding which section a piece of information belongs to.

Structure rules are in `backlog-standard`. This skill says what goes in each section.

## Inputs

- The blank templates in `templates/`: `epic.md`, `feature.md`, `user-story.md`.
- The source document the item comes from.
- `why-it-exists` for the first section, `user-story-writing` for the Story's language and cases, `eval-cases` for probabilistic behavior, `agent-brief` for a Story a coding agent will build.

## Procedure

1. Pick the template for the level.
2. Fill sections in order. Keep the names exactly.
3. Write "Why it exists" first, with `why-it-exists`.
4. For each section, apply the fill rule: fill it only if it helps someone decide, implement or test. Otherwise write `not applicable`.
5. Put information at its altitude. Decisions that apply to everything go to the Epic's Technical details; the specific interface goes to the Story's Technical notes.
6. For a Feature with AI behavior, point section 12 (Evaluation criteria) to the eval cases file. For a Story a coding agent will build, link the agent brief from Technical notes.
7. Run the checklist.

## Rules

### Epic (11 sections)

| # | Section | What it holds |
|---|---|---|
| 1 | Why it exists | The business result that does not happen if the whole block is not built. |
| 2 | Problem | Who is affected, how often, and what it costs them today. Facts, not adjectives. |
| 3 | Objective | The outcome in one or two sentences. Business language. |
| 4 | Success metrics | Outcome metrics with a baseline, a target and a window. No machine metrics. |
| 5 | First-release scope | What is in the first release, and what is explicitly out. |
| 6 | Business rules | Rules that hold across the Epic. Each one testable. |
| 7 | Dependencies | Other Epics, teams, data or decisions this needs. Linked as relations in the tracker. |
| 8 | Risks and mitigation | Real risks with an owner and a mitigation. Two good risks beat ten generic ones. |
| 9 | Governance and operation | Who approves, who operates, how changes are controlled. |
| 10 | Technical details | Decided architecture, platform and constraints. Exact terms. |
| 11 | Estimate | Effort in the effort field, with the basis of the estimate. No team-size assumptions. |

### Feature (15 sections)

| # | Section | What it holds |
|---|---|---|
| 1 | Why it exists | The capability missing from someone's day and what they do manually meanwhile. |
| 2 | Problem and context | The situation the Feature responds to. |
| 3 | Objective | What the capability achieves, in one or two sentences. |
| 4 | Business value | The result for the business, tied to an Epic metric. |
| 5 | Expected behavior | What the capability does, in plain sentences. Permanent rules live here. |
| 6 | Acceptance criteria | 4 to 8 criteria, Given / When / Then where there is a rule or state change. In the Description if the tracker hides the field. |
| 7 | Scope and limits | What is in, what is out, and where this Feature ends. |
| 8 | Business rules | Rules specific to this Feature. |
| 9 | Data and sources | Which system provides which data, and which is the source of truth. |
| 10 | Dependencies | Predecessors and successors, as relations. |
| 11 | Non-functional requirements | Performance, security, retention, audit, availability. Where logging and audit trails belong. |
| 12 | Evaluation criteria | Quality of the capability as a whole: precision, latency, cost, human acceptance rate. Method and owner named. For AI behavior, the golden set, the scoring, the threshold per risk tier and the never-cases live in the eval cases file; this section links to it. |
| 13 | Open items and decisions | Questions without an answer yet, each with an owner and a date to decide. |
| 14 | Traceability | Links to the source document, interview, decision or feedback. A link, not a loose reference. |
| 15 | Estimate | Effort in the field. |

### User Story (9 sections)

| # | Section | What it holds |
|---|---|---|
| 1 | Why it exists | The concrete behavior that fails, or the specific error that occurs, without this slice. |
| 2 | Context | Only what the developer needs from the parent that is not obvious. Do not repeat the Feature. |
| 3 | Type | Functional, Enabler or Fix. |
| 4 | User Story | One line. Functional: `As a <role>, I need <goal>, so that <result>.` Enabler: `Create <technical capability> to allow <Feature behavior>.` |
| 5 | Expected behavior | The behavior in plain sentences, including permanent rules. |
| 6 | Out of scope | What belongs to a neighboring story. |
| 7 | Technical notes | Exact technical terms, decided constraints, interfaces. The only place for tool jargon. The link to the agent brief, when one exists. |
| 8 | Traceability | Link to the source. |
| 9 | Acceptance criteria | One line pointing to the tracker's native field, where 3 to 6 cases live. For probabilistic behavior, the line points to the eval cases file instead. |

Effort goes in Story Points. Dependencies go in Predecessor / Successor relations. The Definition of Done is inherited, not repeated.

### What differs between levels

- The child brings only the local cut. It does not repeat what the parent already says.
- Siblings have the same depth.
- "Why it exists" is different at each level (see `why-it-exists`).
- Technical detail moves down: the Epic holds decisions that apply to everything, the Story holds the specific interface.

## Checklist

- [ ] Template matches the level; section names and order are unchanged.
- [ ] Every section is filled, or says `not applicable` on purpose.
- [ ] Why it exists passes `why-it-exists`.
- [ ] Epic metrics are outcomes with a baseline, a target and a window.
- [ ] Feature has 4 to 8 criteria; Story has 3 to 6 cases.
- [ ] A Feature with AI behavior links its eval cases from section 12.
- [ ] Effort is in the field and dependencies are relations.
- [ ] Traceability is a link.
- [ ] The child does not repeat the parent.

## Example

Weak Feature, section 12: "Evaluation criteria: the drafts should be high quality."

Corrected: "Quality: at least 60 percent of drafts sent with no edits or small edits, measured weekly over the first 8 weeks. Fallback: when no draft can be created, the rep sees a message and writes the email manually. Autonomy guardrail: no email is sent without explicit approval. Auditability: every draft logs input, output, model version, user and time. Evaluation method: the eval cases in `eval-cases.md`, run before each phase exit, plus 30 random drafts reviewed weekly by sales operations against the rubric." (Numbers illustrative.)

## Definition of done

The item can be pasted into the tracker unchanged, passes the `backlog-standard` checklist, and a reviewer can explain it aloud from the card alone.

## Related

- The structure rules: [`backlog-standard`](../backlog-standard/SKILL.md). The first section: [`why-it-exists`](../why-it-exists/SKILL.md). The Story's language: [`user-story-writing`](../user-story-writing/SKILL.md). Probabilistic acceptance: [`eval-cases`](../eval-cases/SKILL.md). Agent execution: [`agent-brief`](../agent-brief/SKILL.md).
- Why: [principle 6, structure serves navigation](../../docs/principles.md#6-structure-serves-navigation-not-ceremony); [the hierarchy](../../docs/hierarchy.md).
- Templates: [`epic.md`](../../templates/epic.md), [`feature.md`](../../templates/feature.md), [`user-story.md`](../../templates/user-story.md). Examples: [`epic.md`](../../examples/acme-sales-assistant/epic.md), [`feature.md`](../../examples/acme-sales-assistant/feature.md), [`user-story-1.md`](../../examples/acme-sales-assistant/user-story-1.md), [`user-story-2.md`](../../examples/acme-sales-assistant/user-story-2.md).
