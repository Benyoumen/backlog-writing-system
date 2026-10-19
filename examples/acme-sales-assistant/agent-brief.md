# Agent brief: ACME-E01-F03-US01, Create one write path to the CRM for approved updates

> Fictional example. Paths, commands and counts are illustrative, for a fictional code base.

Story: `user-story-2.md` | Standing context: the Acme repository's `AGENTS.md` (test command, branch naming, where secrets live, code style) | Size: 5 story points | Date: 2026-03-12

## Why (one paragraph)

Today any part of the assistant could write to the CRM on its own, and when a field changes nobody can tell what changed it or who approved it. This story creates the only door through which an approved update reaches the CRM. Every later story in ACME-E01-F03 chooses which fields to change; none of them writes directly. When this ships, the sales director can open the history of any field and see the approver, the old value, the new value and the time, and the rep can undo a change.

## Checks (acceptance criteria as verifiable checks)

| Criterion (from the story's acceptance cases) | Check or observable state |
|---|---|
| Approved update is written | `pytest tests/crm_write_path/test_accepts_approved.py -q` passes; the sandbox record shows the new value |
| Update without approval is refused | `make probe-write-without-approval` returns HTTP 403 and the trail has one new entry of type `refused` |
| Field outside the list is refused | `pytest tests/crm_write_path/test_allowlist.py -q` passes; the sandbox record is unchanged |
| Change is recorded | After one approved write, `GET /trail?record=<id>` returns approver, old value, new value and timestamp |
| Rep restores an old value | `pytest tests/crm_write_path/test_revert.py -q` passes; revert fails with a clear error when the field changed after the write |

## Verification commands, in order

```
pytest tests/crm_write_path -q
make probe-write-without-approval
make probe-revert-after-change
```

All three run against the CRM sandbox, never against production.

## Never

- Files and directories: `mail/` (sending is ACME-E01-F02-US03), `db/migrations/`, `ui/preview/` (the preview screen is ACME-E01-F03-US02).
- Actions: change the approval token format; add a second write path; call the CRM API from anywhere except `crm/write_path.py`; use production credentials; change any eval threshold.
- Data: real customer records. Use the sandbox export in `fixtures/crm_sandbox/`.

## Inputs and their source of truth

| Input | Where | Source of truth |
|---|---|---|
| Field allowlist | `config/crm-allowlist.yaml` | The list the sales director approved on 2026-03-02; the file mirrors it |
| CRM API contract | `docs/crm-api.md` | The CRM vendor's API reference, version pinned in the file |
| Approval token format | `auth/approval.py` | Decided in the spec; not to be changed here |
| Sandbox records | `fixtures/crm_sandbox/` | A copy; the sandbox itself is the truth for a live check |

## Return

- A branch named `f03-us01-crm-write-path`.
- The output of the three verification commands.
- A note listing anything not done, any assumption made, and any place where the story and the code base disagreed.

## Stop and ask when

- The preview (ACME-E01-F03-US02) proposes a field that is not in the allowlist.
- A check cannot pass without touching a path on the Never list.
- The CRM sandbox rejects a revert for a reason the story does not cover.
- The work exceeds 5 story points: report what is done and what remains.
