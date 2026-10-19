---
name: write-prd
description: Writes the product spec (PRD or functional spec) before any card or code exists, in gated phases: an optional capability map, then the goal with a numeric success criterion, the autonomy boundaries (Always / Ask first / Never), the data sources and system of record, how it is verified, the evals plan for probabilistic behavior, what is out of scope, and the open questions. Use when opening a new feature, when a request is vague, when it spans several modules, or when someone says "write the spec before we create tickets".
license: MIT
metadata:
  version: "1.1"
  author: Benjamin Tayar
  method: backlog-writing-system
---

# Write the spec before the card

> The spec is the agreement between the product manager and whoever builds: what we are doing, why, where the boundaries are, and how we will know it is finished. A card written without a spec is guessing with traceability.

## When to use

- Opening a new capability, after the frame and the prototype notes exist.
- A request is ambiguous ("make it faster", "reps need help").
- The change crosses more than one module, needs an architecture decision, or exceeds half a day.

Do not use it for a one-line fix, a copy change, or a change whose requirement is already unambiguous and self-contained. Do not duplicate: if the work already has a spec in another format, keep that format. This skill owns the questions, the minimum content and the gates; the existing document owns the layout. Two documents holding the same truth means one of them is wrong.

## Inputs

- The frame: the number and the appetite (`frame-the-problem`).
- The prototype notes, if a prototype was built (`prototype-to-spec`): what it settled, what it could not, the silent assumptions.
- The confirmed intent from stakeholder interviews and the list of things the team will not do.
- Access to the systems the spec will name as sources of truth, to check rather than guess.

## Procedure

The gated flow:

```
MAP (only when needed) -> SPECIFY -> PLAN -> TASKS -> BUILD
          |                  |         |        |
      PM reviews        PM reviews  PM reviews PM reviews
```

Do not move to a phase before the previous one is reviewed. The gate is what makes the spec worth anything.

### Phase 0. Capability map (the exception, not the rule)

Most requests describe one capability. If so, skip to Specify. Decompose before specifying when the request bundles capabilities that can be tested separately: each has its own consumer or data; the acceptance criteria group into blocks that could ship in different weeks; one of them could be cut without rewriting the others.

```markdown
# Capability map: Acme Field Sales Assistant

| Module | Responsibility | Depends on |
|---|---|---|
| meeting-intake | Which meetings ended and what notes exist | none |
| follow-up-draft | Draft the follow-up email from the notes | meeting-intake |
| crm-writeback | Propose and apply the CRM update, with preview | meeting-intake |
| activity-trail | Record what was suggested, sent and ignored | follow-up-draft, crm-writeback |

Build order: meeting-intake, then follow-up-draft and crm-writeback in parallel, then activity-trail
```

- Use a stable identifier in lowercase with hyphens, chosen once and never renamed.
- Dependencies point one way. If two modules need each other, they are one module.
- The contract between modules lives in the spec of the one that supplies it, not in the map.
- The map passes a gate. Reviewing ten lines is cheap; redoing three Features is not.
- The map is the draft of your Epic and Features. After it, run Specify through Build per module in dependency order.

### Phase 1. Specify

First, put the assumptions on the table, including the silent ones found in the prototype:

```
ASSUMPTIONS I AM MAKING:
1. The assistant reads the CRM through its API and writes only after the rep approves a preview.
2. Deal value comes from the CRM. Meeting notes come from the notes tool.
3. This applies to account executives, not to customer success in this slice.
4. No chat-tool integration in this slice.
-> Correct me now, or I proceed with these.
```

An unstated assumption is the most expensive kind of misunderstanding. The spec exists to expose it before the card does.

Then write what the spec covers:

1. Goal and success criterion. What we build, for whom, and the number that says it worked, taken from the frame. Without a number it is an intention, not a criterion.
2. Autonomy boundaries: Always / Ask first / Never. For any agent, this is the section that decides the product. It is the autonomy contract the screen must later honor, written before the screen exists. Always: read the CRM, build a preview, order the queue, record the trail. Ask first: write to the CRM, send an email to a customer, change a deal stage. Never: delete history, contact a customer without review, invent data that has no source.
3. Data source and system of record. Which system owns each field, where state lives, what is only a mirror. A field with two owners is a spec defect.
4. Entry points and commands. How it actually runs: script, API, scheduled job, local agent port. Write the full command with its arguments, not just the tool name.
5. How it is verified. The proof it works: automated gate, behavior probe, eval set, test with a real user, check against the source. "Looks right" is not verification.
6. Evals plan, for every probabilistic behavior: which behavior, where the golden set comes from and how big it starts, how it is scored, the threshold per risk tier, the never-cases. The full set is written with `eval-cases`; the spec commits to its existence and its thresholds before the build.
7. Out of scope and open questions. The first comes from stakeholder interviews and the "we will not do" list. The second is what still waits for a human answer, each with an owner and a date.

Translate a vague request into a criterion before writing anything else:

```
REQUEST:  "reps need help following up faster"

REWRITTEN CRITERIA:
- After a meeting ends, the rep sees a drafted follow-up without opening the CRM.
- Each draft names the notes and CRM facts it used, one line each.
- Approving the CRM update takes fewer than 3 clicks.
-> Are these the right targets?
```

This lets you iterate against a target instead of guessing what "help" means.

### Phase 2. Plan

With the approved spec: components and dependencies, build order, risks with mitigations, what can run in parallel, and where the checkpoints sit. The mechanics of the dependency graph and vertical slices belong to `decompose-spec`, which is canonical. If they disagree, `decompose-spec` wins.

### Phase 3. Tasks

Split into implementable items, each with an acceptance criterion and a verification, ordered by dependency. The task list lives in your tracker, not in a checklist file. Run `decompose-spec`, then write the cards with `backlog-standard`.

### Phase 4. Build

Out of scope for this skill. What comes back here is a changed decision: if a decision changes, update the spec the same day, or the spec becomes fiction.

### Keep the spec alive

Update it when a decision or scope changes. Commit it with the delivery. Cite the spec in the card, not the other way round. An outdated spec still beats none, but a spec nobody has touched in a month is no longer a source of anything.

## Rules

- No phase advances without the product manager's review.
- The success criterion has a number and a date, and it is the frame's number unless the frame was revised in writing.
- For any agent, all three boundaries are written and "Ask first" is not empty.
- Every field has exactly one declared source of truth.
- Every probabilistic behavior has an evals plan with a threshold before the build. No evals plan, no Specify gate.
- A prototype's assumptions enter as assumptions to confirm, never as requirements.
- The spec is short. The ten-page document that nobody reads is the failure this skill prevents; the decision record is what it keeps.

Rationalizations to reject:

| Excuse | Reality |
|---|---|
| "A spec will slow us down." | Fifteen minutes of spec prevents the sprint that rebuilds the wrong feature. |
| "We talked, everyone knows." | The builder was not in the conversation, and the conversation has no written autonomy boundary. |
| "It is obvious, no need to write it." | What is obvious to the PM is the developer's first question. |
| "I will write the spec after the card." | A spec after the card is minutes, not agreement. |
| "The prototype is the spec." | The prototype shows what was built; it does not record the why, the boundaries, the sources or the threshold. |
| "The existing document already covers it." | Then that document is the spec. Run the gates on it and do not create a second one. |

## Checklist

- [ ] Assumptions were listed, including the prototype's silent ones, and the PM could correct them.
- [ ] The goal says who it is for and why now.
- [ ] The success criterion has a number and a date.
- [ ] All three boundaries are written, and "Ask first" is not empty for an agent.
- [ ] Every field has exactly one declared source of truth.
- [ ] Each success criterion has a named proof.
- [ ] Every probabilistic behavior has an evals plan with a threshold per risk tier and never-cases.
- [ ] "Out of scope" exists and came from confirmed intent.
- [ ] No phase advanced without review.
- [ ] If a spec already existed, no new document holds the same truth.

## Example

Weak: "Build an assistant that helps reps follow up faster and keeps the CRM clean. It should be accurate and safe."

Corrected: "Goal: after a meeting, the rep reviews a drafted follow-up and a proposed CRM update instead of writing both. Success: 80 percent of follow-ups sent within 2 hours, within 60 days of launch. Always: read the CRM, build a draft and a preview, record the trail. Ask first: send an email, write any CRM field. Never: state a fact with no source, contact anyone not on the deal. Sources: deal value from the CRM, notes from the notes tool. Verified by: an eval set of 40 meetings with 100 percent on 'no invented facts', and a probe that attempts a write without approval and expects a refusal. Evals plan: golden set from pre-launch meetings, code assertions on numbers and recipients, rubric on the draft, threshold 0.95 for anything that reaches the customer." (Numbers illustrative; the full spec is in `../../examples/acme-sales-assistant/prd.md`.)

## Definition of done

The spec is done when a developer and a tester who never attended a meeting can read it, say what must exist, what the agent may never do, where each value comes from, and what result counts as success, and the PM has signed off on each phase.

## Related

- Before: [`frame-the-problem`](../frame-the-problem/SKILL.md), [`prototype-to-spec`](../prototype-to-spec/SKILL.md). After: [`decompose-spec`](../decompose-spec/SKILL.md), [`execution-plan`](../execution-plan/SKILL.md), [`backlog-standard`](../backlog-standard/SKILL.md), [`eval-cases`](../eval-cases/SKILL.md).
- Why: [principle 1, start from the number](../../docs/principles.md#1-start-from-the-number); [principle 2, prototype to learn, spec to commit](../../docs/principles.md#2-prototype-to-learn-spec-to-commit); [principle 8, autonomy is earned](../../docs/principles.md#8-autonomy-is-earned-tier-by-tier); [the workflow, stage 2](../../docs/workflow.md).
- Template: [`prd.md`](../../templates/prd.md). Example: [`prd.md`](../../examples/acme-sales-assistant/prd.md).
