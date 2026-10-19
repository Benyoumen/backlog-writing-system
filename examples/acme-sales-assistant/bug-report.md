# Bug report example

> Fictional example. The company, the customer, the numbers and the links are invented.

## Title

```
[BUG] Acme Field Sales Assistant - F02 - US01 - BUG03 - Follow-up draft shows a deal value twice the CRM value
```

## Description

The follow-up draft for one meeting shows a deal value that does not match the CRM.

- **The rep saw** a deal value of 48,000 in the draft for the [Northwind renewal](https://crm.acme.example/deals/1042), on 2026-04-08.
- **The CRM holds** an amount of 24,000 for the same deal.

**Why it matters.** The value goes into a sentence the customer reads. A wrong number in a customer email changes the price the customer expects and reaches them before the rep can correct it.

## Repro steps

**What happened**

The rep opened the draft for the Northwind renewal meeting that ended at 15:30. The draft says "as discussed, the renewal at 48,000". The CRM record for [Northwind renewal](https://crm.acme.example/deals/1042) shows an amount of 24,000. The notes for the meeting do not state a value.

**Before fixing, find where the value came from**

1. **Data origin.** Which source did the draft run read to produce 48,000: the CRM, the notes, a cached copy, or another? Record what it read, not what it should have read.
2. **Field read.** The CRM holds three value fields for this deal (listed below). Find which one entered the draft, or which combination.
3. **Value on the day.** The record was updated at 16:40, after the meeting ended. Check the value that held when the draft was generated, not only the value today.
4. **Reach.** Only this deal, or other drafts generated in the same run too?

**Source reading on 2026-04-08** (deal 1042): amount 24000 · recurring_amount 12000 · one_time_amount 12000 · stage Proposal · updated_at 2026-04-08T16:40Z.

**Not verified.** The draft generation log for this run. The log was not reachable from the environment used to write this card.

**Eval case.** The input is recorded as case E03 in `eval-cases.md` (v1.1, 2026-04-10). The fix is accepted when E03 passes and every other case still passes.

**Done when**

- The origin of the value 48,000 is identified and recorded on this item.
- A draft for the Northwind renewal shows the value the CRM holds at generation time.
- The CRM update preview (ACME-E01-F03-US02) and the draft (ACME-E01-F02-US01) show the same value for the same deal.
- Eval case E03 passes on the full set with no other case regressing.

## System info

Production web app, draft generation, pilot with 12 reps, seen on 2026-04-08. The CRM is the source of truth for deal value, as stated in the spec.

## Fields

| Field | Value |
|---|---|
| Parent | ACME-E01-F02-US01, Draft a follow-up email from the meeting notes |
| Related | ACME-E01-F03-US02, Show a CRM update preview for a finished meeting. Comment: it displays a deal value and should be compared. |
| Severity | 2 - High (a wrong number is visible to the customer) |
| Priority | 2 |
| Iteration | Sprint 3 (2026-04-06 to 2026-04-17) |

## Why this card is written this way

- It does not say why the value is 48,000. It lists what to check.
- The first verification item asks which source the run read.
- The deal name is a link to the record.
- The line "Not verified" says what was not checked and why.
- The parent is ACME-E01-F02-US01, where the symptom appears, not the Feature or the Epic.
- The failing input became eval case E03 before the fix started, so the fix is proven by the set, not by one retry.
