# Spec: <feature or capability>

> Status: Draft | In review | Approved | Shipped
> Owner: <role>
> Last updated: <date>
> Reviewers: <engineering lead, design, compliance if relevant>

## Assumptions I am making

1. <assumption>
2. <assumption>

Correct these before the spec is reviewed.

## Capability map (only if the request bundles testable capabilities)

| Module | Responsibility | Depends on |
|---|---|---|
| <module-id> | <one line> | <module-id or none> |

Build order: <module-id, module-id, ...>

## Goal

<What this is, for whom, and why now. Three lines at most.>

## Success criterion

<A condition that can be verified, with a number and a date.>

## Autonomy boundaries

- Always: <actions the agent takes without asking>
- Ask first: <actions that need a human approval>
- Never: <actions the agent must not take>

## Data source and system of record

| Field or fact | Owner system | Mirror or copy? |
|---|---|---|
| <field> | <system> | <where it is copied, if anywhere> |

Each field has exactly one owner.

## Entry points and commands

<Full commands with arguments, APIs, scheduled jobs, local ports.>

## How it is verified

| Success criterion | Proof (gate, probe, eval, real-user test, check against the source) |
|---|---|
| <criterion> | <proof> |

## Out of scope

- <what we will not do in this slice, and why>

## Open questions

| Question | Who answers | Needed by |
|---|---|---|
| <question> | <role> | <phase or date> |

## Review log

| Phase | Reviewer | Date | Decision |
|---|---|---|---|
| Map | | | |
| Specify | | | |
| Plan | | | |
| Tasks | | | |
