---
name: agent-brief
description: Prepares a User Story so a coding agent can execute it without a meeting: the why in one paragraph, the acceptance criteria as verifiable checks, the verification commands, the Never list, the inputs with their source of truth, what to return, and when to stop and ask. Use when a story will be built partly or fully by a coding agent, or when an agent built the wrong thing well.
license: MIT
metadata:
  version: "1.1"
  author: Benjamin Tayar
  method: backlog-writing-system
---

# Agent brief

> A story written for a person who can walk to your desk is not enough for an agent that cannot. The brief adds what the agent needs and nothing else.

## When to use

- A story is about to be handed to a coding agent (Claude Code, Codex, Cursor, Kiro or similar) for a first implementation.
- An agent delivered something that matched the words of the story and missed its intent.
- The same conventions are being repeated in every prompt; they belong in a standing file instead.

Do not use it to replace the story. The brief points to the story and adds the execution layer.

## Inputs

- The User Story, written to `backlog-standard`, with its acceptance cases.
- The eval cases, if the story has probabilistic behavior.
- The repository's standing context file (`AGENTS.md` or `CLAUDE.md`): conventions, commands, do-not-touch paths.
- The spec's autonomy boundaries and data sources.

## Procedure

1. Write the why in one paragraph, in plain language: what breaks today, for whom, and what changes when the story ships. The agent uses this to resolve what the acceptance criteria do not cover.
2. Rewrite each acceptance criterion as a check the agent can run or a state it can observe. "Approved update is written" becomes "the test `test_accepts_approved` passes" or "after the call, the sandbox record shows the new value".
3. Write the verification commands in full, with arguments, in the order to run them. Include the probe that must fail (the call without approval) as well as the tests that must pass.
4. Write the Never list: files and directories not to touch, actions not to take (no migrations, no change to the approval token format, no production credentials), data not to use. Take the spec's Never boundary and add the repository's.
5. List the inputs and their source of truth: configuration files, schemas, sample data, the sandbox. Say which copy is authoritative when two exist.
6. Say what to return: the branch or diff, the output of the verification commands, a short note on what was not done and why, and any assumption the agent had to make.
7. Say when to stop and ask: a missing input, a check that cannot pass without touching the Never list, two readings of a criterion, work that exceeds the story's size.
8. Move anything that is true for every story into `AGENTS.md` or `CLAUDE.md`: test command, branch naming, where secrets live, code style, review rules. Each brief then stays under one page.

## Rules

- The brief never contradicts the story. If it must, the story is wrong and gets fixed first.
- Every acceptance criterion in the brief is a check or an observable state. No "works correctly".
- The Never list is explicit. An agent does not infer what it must not touch.
- The agent does not change its own autonomy, the threshold of an eval, or the Never list. Those are decisions recorded by people.
- A brief that passes one page is a sign the story is too big. Split the story, not the brief.
- Standing conventions live in one file at the repository root, read by every agent session, versioned with the code.

## Checklist

- [ ] Why in one paragraph, plain language.
- [ ] Each acceptance criterion is a runnable check or an observable state.
- [ ] Verification commands written in full and in order, including the probe that must fail.
- [ ] Never list covers files, actions and data.
- [ ] Inputs listed with one source of truth each.
- [ ] Return format stated.
- [ ] Stop-and-ask conditions stated.
- [ ] Repository conventions are in `AGENTS.md` or `CLAUDE.md`, not repeated in the brief.
- [ ] Under one page.

## Example

Weak: "Implement the CRM write path as per the story. Make sure it is secure and well tested."

Corrected: "Why: today any part of the assistant could write to the CRM and nobody can tell what changed a field. Checks: `pytest tests/crm_write_path -q` passes; the probe `make probe-write-without-approval` returns a refusal and one trail entry. Never: touch `mail/`, `db/migrations/`, the approval token format or production credentials; write any field not in `config/crm-allowlist.yaml`. Inputs: the allowlist file (source of truth: the list the sales director approved), the CRM sandbox. Return: a branch, the two command outputs, and a note on anything skipped. Stop and ask if the preview proposes a field the allowlist lacks." (Commands and paths illustrative.)

## Definition of done

A coding agent starting from a clean session reads the brief and the standing file, builds the story, runs the verification commands, and returns a result a reviewer can accept or reject without a meeting.

## Related

- The story it serves: [`backlog-standard`](../backlog-standard/SKILL.md), [`user-story-writing`](../user-story-writing/SKILL.md).
- Probabilistic checks: [`eval-cases`](../eval-cases/SKILL.md).
- This repository's own standing file, as a worked example of the pattern: [`AGENTS.md`](../../AGENTS.md).
- Why: [principle 11, write for the agent in the room](../../docs/principles.md#11-write-for-the-agent-in-the-room); [principle 4, the four-reader test](../../docs/principles.md#4-pass-the-four-reader-test).
- Template: [`templates/agent-brief.md`](../../templates/agent-brief.md). Example: [`examples/acme-sales-assistant/agent-brief.md`](../../examples/acme-sales-assistant/agent-brief.md).
