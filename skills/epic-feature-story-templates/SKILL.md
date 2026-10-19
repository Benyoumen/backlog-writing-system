---
name: epic-feature-story-templates
description: Fills the Epic (11 sections), Feature (15 sections) and User Story (9 sections) templates correctly, with what each section must contain, what to leave out, and how the levels differ. Use when drafting a new Epic, Feature or User Story from a spec or brief, or when checking that an item has the right sections in the right order.
---

# Epic, Feature and User Story templates

Blank templates are in `templates/`. Filled examples are in `examples/acme-sales-assistant/`. Structure rules are in `backlog-standard`. This skill says what goes in each section.

## How to use

1. Pick the template for the level.
2. Fill sections in order. Keep the names exactly.
3. For each section, apply the fill rule: fill it only if it helps someone decide, implement or test. Otherwise write `not applicable`.
4. Write "Why it exists" first, using `why-it-exists`.
5. Run the checklist at the end.

## Epic (11 sections)

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

## Feature (15 sections)

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
| 12 | Evaluation criteria | Quality of the capability as a whole: precision, latency, cost, human acceptance rate. Method and owner named. |
| 13 | Open items and decisions | Questions without an answer yet, each with an owner and a date to decide. |
| 14 | Traceability | Links to the source document, interview, decision or feedback. A link, not a loose reference. |
| 15 | Estimate | Effort in the field. |

## User Story (9 sections)

| # | Section | What it holds |
|---|---|---|
| 1 | Why it exists | The concrete behavior that fails, or the specific error that occurs, without this slice. |
| 2 | Context | Only what the developer needs from the parent that is not obvious. Do not repeat the Feature. |
| 3 | Type | Functional, Enabler or Fix. |
| 4 | User Story | One line. Functional: `As a <role>, I need <goal>, so that <result>.` Enabler: `Create <technical capability> to allow <Feature behavior>.` |
| 5 | Expected behavior | The behavior in plain sentences, including permanent rules. |
| 6 | Out of scope | What belongs to a neighboring story. |
| 7 | Technical notes | Exact technical terms, decided constraints, interfaces. The only place for tool jargon. |
| 8 | Traceability | Link to the source. |
| 9 | Acceptance criteria | One line pointing to the tracker's native field, where 3 to 6 cases live. |

Effort goes in Story Points. Dependencies go in Predecessor / Successor relations. The Definition of Done is inherited, not repeated.

## What differs between levels

- The child brings only the local cut. It does not repeat what the parent already says.
- Siblings have the same depth.
- "Why it exists" is different at each level (see `why-it-exists`).
- Technical detail moves down: Epic holds decisions that apply to everything, Story holds the specific interface.

## Checklist

- [ ] Template matches the level; section names and order are unchanged.
- [ ] Every section is filled, or says `not applicable` on purpose.
- [ ] Why it exists passes `why-it-exists`.
- [ ] Epic metrics are outcomes with a baseline, a target and a window.
- [ ] Feature has 4 to 8 criteria; Story has 3 to 6 cases.
- [ ] Effort is in the field and dependencies are relations.
- [ ] Traceability is a link.
- [ ] The child does not repeat the parent.

## Definition of done

The item can be pasted into the tracker unchanged, passes the `backlog-standard` checklist, and a reviewer can explain it aloud from the card alone.
