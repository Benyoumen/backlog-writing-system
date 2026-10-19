# Agent brief: <story id and title>

Story: <link or path> | Standing context: `AGENTS.md` or `CLAUDE.md` at the repository root | Size: <story points> | Date: <YYYY-MM-DD>

## Why (one paragraph)

<What breaks today, for whom, and what changes when this ships.>

## Checks (acceptance criteria as verifiable checks)

| Criterion | Check or observable state |
|---|---|
| | |

## Verification commands, in order

```
<command 1>
<command 2, the probe that must fail>
```

<Where they run: sandbox, never production.>

## Never

- Files and directories: <paths>
- Actions: <no migrations, no change to the token format, no production credentials, ...>
- Data: <what not to use, and what to use instead>

## Inputs and their source of truth

| Input | Where | Source of truth |
|---|---|---|
| | | |

## Return

- <branch or diff>
- <output of the verification commands>
- <note: what was not done and why, assumptions made, where the story and the code base disagreed>

## Stop and ask when

- <a missing input>
- <a check cannot pass without touching the Never list>
- <two readings of a criterion>
- <the work exceeds the story's size>
