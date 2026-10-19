## Roadmap status, 2026-04-13 (week 2026-W16)

> Fictional example. Acme and all names, numbers and dates are invented to show the format.

Snapshot: `snapshots/2026-W16.json` | View: operational

### By stream

- **Phase 1, see and draft** (pilot): done 2026-03-27. 12 reps active. 4 of 4 stories closed (ACME-E01-F01-US01, F02-US01, F02-US02, F03-US02). One open bug on F02-US01 (BUG03).
- **Phase 2, send and write back** (build): 2 of 5 stories closed (F03-US01 write path, F02-US04 draft storage). F03-US03 in execution, waiting on the field mapping, 9 of 14 fields.
- **Phase 3, manager view** (planned): F04-US01. Starts after Phase 2.

### Progress by phase

| Phase | Outcome | Status | Items | Gate at risk? |
|---|---|---|---|---|
| 1 See and draft | Reps see drafts and CRM previews for real meetings | Done, in pilot | ACME-E01-F01-US01, F02-US01, F02-US02, F03-US02 | No |
| 2 Send and write back | Reps send follow-ups and approve CRM updates | In progress | F02-US03, F02-US04, F03-US01, F03-US03, F03-US04 | Yes, field mapping |
| 3 Manager view | Managers see sent, applied and ignored per rep | Not started | F04-US01 | No |

### Changes since last snapshot

- Added: ACME-E01-F05 Manager weekly digest (no phase, outside the first release)
- Removed: ACME-E01-F02-US05 Suggest a meeting time in the follow-up (out of scope)
- State changed: ACME-E01-F03-US03 Apply the CRM update, New to Active; ACME-E01-F02-US04 Store each draft, Active to Closed
- Date changed: Phase 2 end, 2026-04-21 to 2026-04-28, reason: owner availability

### Delay events logged

| Track | Segment | Item | Planned | New | Reason category | Area |
|---|---|---|---|---|---|---|
| Phase 2 | Field mapping | ACME-E01-F03 | 2026-04-21 | 2026-04-28 | owner availability | CRM admin team |

### Risks and drift

- Phase 3 has no active items; planned start is two weeks away, as expected.
- ACME-E01-F05 has no phase yet.
- No items without a track.
- Calibration: Phase 1 ran 9 working days over its declared plan (planned end 2026-03-16, done 2026-03-27). Declared durations are replaced by measured ones once 8 stories of a size are closed.

### Suggested next steps

- Product manager: confirm the CRM admin slot of 20 Apr this week, or the Phase 2 end moves again.
- Product manager: assign ACME-E01-F05 to a phase or mark it parked.
- Tech lead: ship the BUG03 fix with eval case E03 passing by 17 Apr.

Photo date: 2026-04-13.
