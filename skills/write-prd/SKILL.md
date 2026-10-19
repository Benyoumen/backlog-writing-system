---
name: write-prd
description: Write the product spec (PRD or functional spec) before any card or code exists, in gated phases: optional capability map, then goal and a numeric success criterion, autonomy boundaries (Always / Ask first / Never), data source and system of record, how it is verified, what is out of scope, and open questions. Each phase is reviewed before the next. Use when opening a new feature, when a request is vague ("make it faster", "reps need help"), when a request spans several modules, or when someone says "write the spec before we create tickets".
---

# write-prd: the spec before the card

## Why this exists

The spec is the agreement between the PM and whoever builds: what we are doing, why, and how we will know it is finished. A card written without a spec is guessing with traceability.

Input: the confirmed intent from stakeholder interviews and, when scope was open, a short problem page. Output: a spec that `decompose-spec` splits into tasks and that your backlog standard turns into Epic, Feature and Story.

## When to use it, and when not

Use it when opening a new capability, when the request is ambiguous, when the change crosses more than one module, when an architecture decision is needed, or when the work exceeds half a day.

Do not use it for a one-line fix, a copy change, or a change whose requirement is already unambiguous and self-contained.

Do not duplicate. If the work already has a spec in another format, keep that format. This skill owns the questions, the minimum content and the gates. The existing document owns the layout. Two documents holding the same truth means one of them is wrong.

## The gated flow

```
MAP (only when needed) -> SPECIFY -> PLAN -> TASKS -> BUILD
          |                  |         |        |
      PM reviews        PM reviews  PM reviews PM reviews
```

Do not move to a phase before the previous one is reviewed. The gate is what makes the spec worth anything.

## Phase 0. Capability map (the exception, not the rule)

Most requests describe one capability. If so, skip to Specify.

Decompose before specifying when the request bundles capabilities that can be tested separately: each has its own consumer or data; the acceptance criteria group into blocks that could ship in different weeks; one of them could be cut without rewriting the others.

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
- The map passes a gate. Reviewing ten lines is cheap. Redoing three Features is not.
- The map is the draft of your Epic and Features. After it, run Specify through Build per module in dependency order.

## Phase 1. Specify

### First, put the assumptions on the table

```
ASSUMPTIONS I AM MAKING:
1. The assistant reads the CRM through its API and writes only after the rep approves a preview.
2. Deal value comes from the CRM. Meeting notes come from the notes tool.
3. This applies to account executives, not to customer success in this slice.
4. No chat-tool integration in this slice.
-> Correct me now, or I proceed with these.
```

An unstated assumption is the most expensive kind of misunderstanding. The spec exists to expose it before the card does.

### What the spec covers

1. **Goal and success criterion.** What we build, for whom, and the number that says it worked. Without a number it is an intention, not a criterion.
2. **Autonomy boundaries: Always / Ask first / Never.** For any agent, this is the section that decides the product. It is the autonomy contract that the screen must later honor, written before the screen exists.
   - Always: read the CRM, build a preview, order the queue, record the trail.
   - Ask first: write to the CRM, send an email to a customer, change a deal stage.
   - Never: delete history, contact a customer without review, invent data that has no source.
3. **Data source and system of record.** Which system owns each field, where state lives, what is only a mirror. A field with two owners is a spec defect.
4. **Entry points and commands.** How it actually runs: script, API, scheduled job, local agent port. Write the full command with its arguments, not just the tool name.
5. **How it is verified.** The proof it works: automated gate, behavior probe, eval set, test with a real user, check against the source. "Looks right" is not verification.
6. **Out of scope and open questions.** The first comes from stakeholder interviews and the "we will not do" list. The second is what still waits for a human answer.

### Translate a vague request into a criterion

```
REQUEST:  "reps need help following up faster"

REWRITTEN CRITERIA:
- After a meeting ends, the rep sees a drafted follow-up without opening the CRM.
- Each draft names the notes and CRM facts it used, one line each.
- Approving the CRM update takes fewer than 3 clicks.
-> Are these the right targets?
```

This lets you iterate against a target instead of guessing what "help" means.

## Phase 2. Plan

With the approved spec: components and dependencies, build order, risks with mitigations, what can run in parallel, and where the checkpoints sit. The mechanics of the dependency graph and vertical slices belong to `decompose-spec`, which is canonical. If they disagree, `decompose-spec` wins.

## Phase 3. Tasks

Split into implementable items, each with an acceptance criterion and a verification, ordered by dependency. The task list lives in your tracker, not in a checklist file. Run `decompose-spec`, then write the cards with your backlog standard.

## Phase 4. Build

Out of scope for this skill. What comes back here is a changed decision: if a decision changes, update the spec the same day, or the spec becomes fiction.

## Keep the spec alive

Update it when a decision or scope changes. Commit it with the delivery. Cite the spec in the card, not the other way round. An outdated spec still beats none, but a spec nobody has touched in a month is no longer a source of anything.

## Rationalizations to reject

| Excuse | Reality |
|---|---|
| "A spec will slow us down." | Fifteen minutes of spec prevents the sprint that rebuilds the wrong feature. |
| "We talked, everyone knows." | The builder was not in the conversation, and the conversation has no written autonomy boundary. |
| "It is obvious, no need to write it." | What is obvious to the PM is the developer's first question. |
| "I will write the spec after the card." | A spec after the card is minutes, not agreement. |
| "The existing document already covers it." | Then that document is the spec. Run the gates on it and do not create a second one. |

## Checklist

- [ ] Assumptions were listed and the PM could correct them
- [ ] The goal says who it is for and why now
- [ ] The success criterion has a number and a date
- [ ] All three boundaries are written, and "Ask first" is not empty for an agent
- [ ] Every field has exactly one declared source of truth
- [ ] Each success criterion has a named proof
- [ ] "Out of scope" exists and came from confirmed intent
- [ ] No phase advanced without review
- [ ] If a spec already existed, no new document holds the same truth

## Definition of done

The spec is done when a developer and a tester who never attended a meeting can read it, say what must exist, what the agent may never do, where each value comes from, and what result counts as success, and the PM has signed off on each phase.
