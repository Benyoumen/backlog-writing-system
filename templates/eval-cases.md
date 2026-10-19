# Eval cases: <behavior>

Behavior: <one line> | Items: <story and feature ids> | Owner: <role> | Version: <n> (<date>)

## Golden set

Size: <n> cases | Origin: <real inputs, anonymized; prototype inputs; production failures> | Retired cases: <n, reasons in the log>

## Risk tiers and thresholds (agreed before the build)

| Tier | Meaning | Pass rate required | Never-cases |
|---|---|---|---|
| Low | Nothing leaves the screen | <0.xx> | 0 failures |
| Medium | Text a person will edit before it leaves | <0.xx> | 0 failures |
| High | Reaches a customer, the system of record or money | <0.xx> | 0 failures |

<The shipping rule: which tiers must pass, on which set, how many runs in a row.>

## Baseline

<Build or prototype scored, date, result per tier, never-case failures.>

## Cases

| Id | Input summary | Expected behavior | Must never | Scoring method | Risk tier | Source of the case |
|---|---|---|---|---|---|---|
| E01 | | | | code assertion / golden answer / rubric / model judge | | |

For agent cases add: expected actions, forbidden actions, allowed tools.

## Rubric (when a person or a model scores)

| Criterion | Yes means |
|---|---|
| | |

## Where it runs

- CI before merge: <which cases>
- Release sample: <which cases, who scores>
- Weekly production sample: <size, who reviews, where the result is reported>

## Log

- <date>: <case added or retired, threshold change with its evidence, baseline re-measured>
