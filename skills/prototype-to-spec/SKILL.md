---
name: prototype-to-spec
description: Moves from a prototype, built by the product manager with AI tools or by the team, to a spec: what the prototype settled, what it could not settle, the questions to answer before any ticket, and how to record prototype notes. Use after a demo convinces the room, when someone says "the prototype is the spec", or before turning a prototype into tickets.
license: MIT
metadata:
  version: "1.1"
  author: Benjamin Tayar
  method: backlog-writing-system
---

# Prototype to spec

> A prototype teaches; a spec commits. This skill records what the prototype taught and stops its guesses from becoming requirements.

## When to use

- A prototype exists and someone wants tickets from it.
- A demo convinced the sponsor and the team is about to build "what we saw".
- You are the product manager, you built the prototype yourself with an AI tool, and you need to hand it over.

Do not use it to decide whether to prototype at all. That decision comes from the frame.

## Inputs

- The frame: the number and the appetite.
- The prototype, with its prompts, its inputs, and a dated list of what was tested with whom.
- Notes from the people who tried it, in their words.

## Procedure

1. Date and name the prototype. Say what it is made of (tool, model, data) and what it is not (not production code, not real data unless stated, not reviewed for security).
2. List what the prototype settled, one line each, with the evidence: desirability (who wanted it and what they said or did), flow (the order of steps that made sense to the person), feasibility signal (the data was reachable, the model produced usable output on real inputs).
3. List what the prototype cannot settle: edge cases it never saw, failure modes (invented facts, wrong record, silence), data at scale, latency and cost, the cost of a wrong action in production, permissions and privacy. Say for each where it will be settled: a spec section, an eval case, a probe.
4. Extract the assumptions the prototype made silently: a default, a shortcut, a hard-coded value, an order of operations. Each goes to the spec's assumptions list. None is a requirement until the product manager confirms it in writing.
5. Write the questions to answer before any ticket, each with an owner and a date. They become the spec's open questions or decisions.
6. Decide what carries over: screens as reference, prompts as a starting point, test inputs as the first golden-set cases. Nothing else does, including the code.
7. Hand over to `write-prd` with the notes. The spec cites the prototype notes under traceability.

## Rules

- A prototype's assumptions are not requirements until they are written in the spec and signed by the product manager.
- The prototype never enters the tracker as a ticket. Its lessons do.
- Edge cases, failure modes and the cost of a wrong action are never marked settled by a prototype. Only an eval or a production probe settles them.
- Real inputs used in the prototype become candidate golden-set cases, anonymized.
- A prototype that was never put in front of the person who has the problem settles nothing about desirability, whatever the room thought of the demo.

## Checklist

- [ ] Prototype dated and named, with tool, data and who tried it.
- [ ] Settled list with one piece of evidence per line.
- [ ] Cannot-settle list with the place each item will be settled.
- [ ] Silent assumptions extracted and sent to the spec as assumptions.
- [ ] Questions before any ticket, each with an owner and a date.
- [ ] Kept items named: screens, prompts, test inputs. Everything else discarded.
- [ ] Spec traceability points to these notes.

## Example

Weak: "The demo went great and leadership loved it. Build it exactly like the prototype: it sends the email and updates the CRM automatically."

Corrected: "Settled: five reps wanted the draft and asked to see the source of each fact (desirability, flow). The notes API returns usable text (feasibility). Not settled: what happens when the notes state a price the CRM contradicts; what a wrong price in a customer email costs; two open deals for the same contact. Silent assumption found: the prototype sent from a shared mailbox; the spec will state the rep's own mailbox once confirmed. Before any ticket: which CRM fields may be written (sales director, by 2 March). The prototype's 12 meetings become the first golden-set cases."

## Definition of done

The spec writer can start without opening the prototype, every silent assumption is on the spec's assumptions list, and no ticket was created from the demo.

## Related

- Before: [`frame-the-problem`](../frame-the-problem/SKILL.md). After: [`write-prd`](../write-prd/SKILL.md), [`eval-cases`](../eval-cases/SKILL.md), where the prototype inputs seed the golden set.
- Why: [principle 2, prototype to learn, spec to commit](../../docs/principles.md#2-prototype-to-learn-spec-to-commit); [the workflow, stage 1](../../docs/workflow.md).
- Template: [`templates/prototype-notes.md`](../../templates/prototype-notes.md). Example: [`examples/acme-sales-assistant/prototype-notes.md`](../../examples/acme-sales-assistant/prototype-notes.md).
