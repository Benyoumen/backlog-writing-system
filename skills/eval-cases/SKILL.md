---
name: eval-cases
description: Turns acceptance criteria for a probabilistic behavior (a drafted text, an extracted value, a classification, an agent action) into eval cases: a golden set from real inputs, a scoring method, a threshold per risk tier agreed before the build, and never-cases with zero tolerance. Use when an item involves a language model or an agent, when a criterion says "accurate" or "works correctly", before marking an AI item Ready, and when a production failure must become a test.
license: MIT
metadata:
  version: "1.1"
  author: Benjamin Tayar
  method: backlog-writing-system
---

# Eval cases

> For a behavior that is right most of the time, acceptance is a threshold on a distribution. This skill writes the cases, the scoring and the threshold so the item can be verified instead of admired.

## When to use

- The item's behavior comes from a model: a drafted email, an extracted value, a classification, a proposed CRM update, an agent action.
- An acceptance criterion says "accurate", "correct", "appropriate" or "handles it well".
- A production failure needs to become a test before it becomes a fix.
- Before an AI item is marked Ready, and again before an agent's autonomy tier changes.

Do not use it for deterministic behavior. A Given / When / Then case is enough there.

## Inputs

- The acceptance criteria of the Story and the evaluation criteria of the Feature.
- Real inputs, anonymized: meetings, tickets, records, messages. The prototype's test inputs, if any.
- The autonomy boundaries from the spec: Always, Ask first, Never.
- The risk tier of each behavior, agreed with the product manager and the owner of the process.
- Failures already seen: support tickets, bug cards, rejected outputs.

## Procedure

1. Name the behavior under eval and the items it belongs to. One eval file per behavior, not per story.
2. Build the golden set from real inputs. Start with 20 to 50 cases. Include the ugly ones: empty input, contradictory sources, two plausible records, a value that looks like another, the longest input you have seen. Add every real failure you already know. Anonymize. Label each case with where it came from.
3. Write the expected behavior per case as something a check can read: the exact value, the field that must change, the sentence that must be absent, the action that must not run.
4. Write the never-cases. For each behavior, what it must never do: invent a number, write to the wrong record, contact someone outside the deal, act without approval. A never-case has zero tolerance and is scored separately from the pass rate.
5. For agents, add per case: expected actions, forbidden actions, allowed tools. A case that reaches the write layer names the record and the field it is allowed to touch.
6. Choose the scoring method per case, in this order of preference: a code assertion (a number matches a source, a field is unchanged, an action did not run); a golden answer match (the output equals or contains the expected value); a rubric applied by a person (for open text, three to five criteria, each answered yes or no); a model as judge (only for criteria a person has already scored, with the judge checked against those scores). Say which, and why not the cheaper one.
7. Agree the threshold before the build, per risk tier: the pass rate on the golden set that a build must reach to ship. Write the tiers in the file: low (nothing leaves the screen), medium (text a person will edit), high (reaches a customer, the system of record or money). Never-cases: zero failures at every tier.
8. Measure the baseline before changing anything: the current build or the prototype, scored on the same set, with its date.
9. Wire it: the assertions and golden matches run in CI before merge; the rubric runs on a sample at each release and weekly on production outputs.
10. After each change, run every case, not only the one you fixed. A fix in one category can break another.
11. When production fails, write the case first, then the fix. Renegotiate a threshold only with the evidence on the table, and record it in the log.

## Rules

- No golden set, no scoring method, no threshold: the item is not Ready.
- Never-cases are scored separately and allow zero failures. A high pass rate does not excuse one invented number in a customer email.
- The product team defines what correct means. A vendor's benchmark does not transfer to your context.
- Cases come from real inputs. An invented case tests the author's imagination.
- Thresholds are per risk tier and per behavior, written before the build, changed only with evidence.
- The cheapest scoring method that works wins. A model judge is the last choice, not the first.
- The golden set is versioned. A case is never deleted; it is retired with a reason in the log.
- An agent's autonomy tier changes only on eval results plus shadow time, never on a demo. The ladder lives in agent-design-principles, skill `autonomy-tiers-and-evals`.

## Checklist

- [ ] One behavior named, with its item ids.
- [ ] 20 to 50 cases from real, anonymized inputs, each with its source.
- [ ] Ugly cases and known failures included.
- [ ] Expected behavior per case is checkable.
- [ ] Never-cases listed, scored separately, zero tolerance.
- [ ] Agent cases name expected actions, forbidden actions and allowed tools.
- [ ] Scoring method chosen per case, cheapest that works.
- [ ] Thresholds per risk tier written and agreed before the build.
- [ ] Baseline measured and dated.
- [ ] Runs in CI and on a production sample; every case runs after every change.
- [ ] Production failures become cases before they become fixes.

## Example

Weak acceptance criterion: "The draft must be accurate and must not hallucinate."

Corrected, as an eval case: "E03. Input: the notes mention 48,000; the CRM amount is 24,000. Expected: the draft uses 24,000 and shows the rep the discrepancy. Must never: state a number absent from both sources. Scoring: code assertion, every number in the draft matches a note line or a CRM field. Risk tier: high. Source: BUG03, 2026-04-08." With the thresholds for the draft behavior: never-cases 0 failures; rubric pass rate at least 0.90 on the full set before Phase 1 exit (illustrative). Baseline on the prototype, 27 February: 0.72, with 2 invented numbers in 12 cases.

## Definition of done

An engineer can run the set and get a pass rate; the product manager can say, for each risk tier, the number a build must reach; and every never-case has a check that fails loudly.

## Related

- Feeds: [`backlog-standard`](../backlog-standard/SKILL.md), Definition of Ready for AI items; [`user-story-writing`](../user-story-writing/SKILL.md), where deterministic cases stay in Given / When / Then; [`bug-report`](../bug-report/SKILL.md), where a bug in a probabilistic behavior becomes a case before the fix.
- Companion: [agent-design-principles](https://github.com/Benyoumen/agent-design-principles), skill `autonomy-tiers-and-evals`, for the tiers and the promotion criteria.
- Why: [principle 7, the acceptance criterion is an eval](../../docs/principles.md#7-for-ai-behavior-the-acceptance-criterion-is-an-eval); [principle 8, autonomy is earned](../../docs/principles.md#8-autonomy-is-earned-tier-by-tier); [the workflow, stages 4 and 5](../../docs/workflow.md).
- Template: [`templates/eval-cases.md`](../../templates/eval-cases.md). Example: [`examples/acme-sales-assistant/eval-cases.md`](../../examples/acme-sales-assistant/eval-cases.md).
