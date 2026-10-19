# Twelve principles

Each principle gives the rule, the failure it prevents, where it lives in this method, and who is making the same argument now. Sources are at the end.

## 1. Start from the number

**Rule.** An initiative names the outcome and the number it will move before anyone builds. No number, no initiative. There is a question to investigate instead.

**Prevents.** Output that feels like progress. Teams that used AI to accelerate their project model shipped more and improved nothing.

**In this method.** [`frame-the-problem`](../skills/frame-the-problem/SKILL.md) and [`write-prd`](../skills/write-prd/SKILL.md): goal and success criterion with a number. The weekly review reads the number back.

**Who is saying it.** Cagan's AI productivity paradox: the problem was never speed, it was that the ideas were not worth building. Gridley: "it's never been easier to run 10 times faster in the wrong direction."

## 2. Prototype to learn, spec to commit

**Rule.** Build prototypes to find out whether something could work and whether anyone wants it. Write the spec to record the decision, the boundaries and the success criterion. A prototype's assumptions are not requirements until someone writes them down and signs them.

**Prevents.** The prototype-as-spec failure: a convincing demo ships with its guesses intact, and the why is never written.

**In this method.** [`prototype-to-spec`](../skills/prototype-to-spec/SKILL.md) lists what a prototype settles and what it cannot. [`write-prd`](../skills/write-prd/SKILL.md) is deliberately short.

**Who is saying it.** Cagan separates building to learn from building to earn. Aakash Gupta: the ten-page PRD died, the alignment PRD did not. PMs at Affirm and Uber build their own prototypes; Slack runs tiny squads that prototype constantly. Lenny Rachitsky lists taste and judgment first among durable skills, the bottleneck when generation is free.

## 3. Write the why from the consequence of absence

**Rule.** The "why it exists" field starts with what happens if the item does not exist: to whom, how often, what it costs. If nothing happens, cut the item.

**Prevents.** Justification by feature: "we need a filter because users want to filter."

**In this method.** [`why-it-exists`](../skills/why-it-exists/SKILL.md), mandatory on Epic, Feature and Story.

**Who is saying it.** Amazon's working-backwards practice (write the announcement first, then decide) is the older form of the same test.

## 4. Pass the four-reader test

**Rule.** An engineer, a designer, an executive and a coding agent must each be able to act on the item without a meeting. Direct sentences, one idea per item, no figurative language, no rule inside a rule.

**Prevents.** The item only its author understands. The agent that fills gaps with guesses.

**In this method.** [`user-story-writing`](../skills/user-story-writing/SKILL.md), seven rules. [`agent-brief`](../skills/agent-brief/SKILL.md).

**Who is saying it.** Linear writes plain-language issues and calls user stories an anti-pattern; the shared point is clarity for the reader. Spec-driven development makes the spec the agent's persistent context.

## 5. Vertical slices; appetite before estimate

**Rule.** Every slice crosses the stack (collect, decide, show, write) and ships behavior a person can verify. Decide the appetite, the time you are willing to spend, before you estimate. Above size L you split; you do not estimate.

**Prevents.** Layers that ship nothing. Estimates that become promises.

**In this method.** [`decompose-spec`](../skills/decompose-spec/SKILL.md), [`execution-plan`](../skills/execution-plan/SKILL.md).

**Who is saying it.** Basecamp's Shape Up (appetite, scope hammering). DORA's findings on small batches. Cagan's building-to-earn phase expects commercial quality per slice, not a demo.

## 6. Structure serves navigation, not ceremony

**Rule.** Three levels, one fixed parent (a Story always belongs to a Feature), dependencies as relations, effort in Story Points. Enabler work has no persona and does not invent one. Any section that does not help one of the four readers gets deleted.

**Prevents.** Fake users. Template filling. A backlog nobody can query.

**In this method.** [`backlog-standard`](../skills/backlog-standard/SKILL.md), [`epic-feature-story-templates`](../skills/epic-feature-story-templates/SKILL.md).

**Who is saying it.** Linear's minimal required fields (title, team, status). The sections here exist because four audiences and a weekly snapshot read them, not for their own sake.

## 7. For AI behavior, the acceptance criterion is an eval

**Rule.** When the behavior is probabilistic, acceptance is a threshold on a distribution: a golden set from real inputs, a scoring method (code checks first, a rubric or a model judge when needed), a pass rate agreed before the build, and negative cases that say what it must never do. If you cannot write the eval, the item is not ready.

**Prevents.** The feature that meets every criterion, passes CI, is right 92 times in 100, and becomes the top source of support tickets two weeks later.

**In this method.** [`eval-cases`](../skills/eval-cases/SKILL.md). [`write-prd`](../skills/write-prd/SKILL.md) requires an evals plan for AI parts. The Definition of Ready includes it.

**Who is saying it.** Teresa Torres: defining correctness "is the product team's job"; prefer code assertions, then golden sets, then model-as-judge; set a baseline before changing anything. Rick Pollick: "Acceptance is no longer a checkbox; it is a threshold on a distribution." Critical Path: if you can't write the eval, you can't ship the feature.

## 8. Autonomy is earned, tier by tier

**Rule.** Observe, alert, propose, act with review, act alone. Promotion by evals on a held-out set and by shadow time, never by enthusiasm. Irreversible actions stay capped until the owner accepts the cost of an error in writing. Demotion is one bad week away.

**Prevents.** The agent that sends the email on day one.

**In this method.** Boundaries Always / Ask first / Never in every spec. The ladder itself is in [agent-design-principles](https://github.com/Benyoumen/agent-design-principles), skill `autonomy-tiers-and-evals`.

**Who is saying it.** Pollick on runtime guardrails for the tail. Torres on error analysis as a continuous habit. Microsoft's HAX guidelines and Google's PAIR guidebook on keeping people in control.

## 9. Bugs describe, they do not diagnose

**Rule.** A bug card records what the person saw, what the source said, what was expected, and where. It never asserts a cause in the title or the description. It links to the story whose behavior broke and asks for the origin of the data to be verified.

**Prevents.** Fixing the hypothesis instead of the defect. Blame.

**In this method.** [`bug-report`](../skills/bug-report/SKILL.md).

**Who is saying it.** Standard incident practice. It matters more with AI features because the cause is often a data or prompt input nobody checked.

## 10. A roadmap is a dated photo, not a promise

**Rule.** Snapshot the backlog weekly with a cutoff, show the delta, and open the review with last week's commitments. The roadmap carries its photo date on every page.

**Prevents.** Roadmaps that promise dates no one re-derived. Reviews that re-litigate instead of advance.

**In this method.** [`weekly-backlog-snapshot`](../skills/weekly-backlog-snapshot/SKILL.md), [`backlog-review-meeting`](../skills/backlog-review-meeting/SKILL.md), [`roadmap-status`](../skills/roadmap-status/SKILL.md), [`publish-roadmap`](../skills/publish-roadmap/SKILL.md).

**Who is saying it.** Cagan's 2026 essays on predictable roadmaps versus outcomes. Linear on keeping product discussion at the feature level, not in the task.

## 11. Write for the agent in the room

**Rule.** Assume a coding agent will read the item and act on it. Give it the why, the acceptance criteria as verifiable checks, the Never list, and the verification command. Keep standing conventions in `AGENTS.md` or `CLAUDE.md`, not in people's heads.

**Prevents.** The agent that builds the wrong thing well.

**In this method.** [`agent-brief`](../skills/agent-brief/SKILL.md). This repository's own [`AGENTS.md`](../AGENTS.md) shows how the skills compose for an agent.

**Who is saying it.** Spec-driven development: GitHub Spec Kit, Kiro's steering files (`product.md` for what the product does and why), Claude Code's `CLAUDE.md`. Lenny: "First AI came for coding, next it's coming for deciding what to code."

## 12. Volume is not progress: delete nine

**Rule.** When the model offers ten PRDs, ten prototypes or a hundred tickets, pick one and delete nine. Measure the backlog by what it removed this week as well as what it added.

**Prevents.** The noise AI makes free: more documents, more tickets, more updates, no better decisions.

**In this method.** The weekly snapshot reports items removed. The review deck has a line for what was cut.

**Who is saying it.** Practitioner pushback in 2026 surveys of product managers. Chip Huyen, quoted by Cagan: "AI makes building easier, but the hardest part remains knowing what to build."

## Sources

Read in October 2026. Most are practitioner essays, not studies; the method takes their arguments, not their numbers.

- Marty Cagan, [The AI Productivity Paradox](https://www.svpg.com/the-ai-productivity-paradox/), SVPG, July 2026. Also [AI Product Management 2 Years In](https://www.svpg.com/ai-product-management-2-years-in/) and [The Product Operating Model](https://www.svpg.com/the-product-operating-model/).
- Teresa Torres, [AI Evals: A Hands-On Guide for Product Teams](https://www.producttalk.org/ai-evals/), Product Talk, September 2026.
- Rick Pollick, [Evals Are the New Acceptance Criteria](https://rickpollick.com/blog/evals-are-the-new-acceptance-criteria), June 2026.
- Critical Path, [If you can't write the eval, you can't ship the AI feature](https://buttondown.com/critical-path/archive/if-you-cant-write-the-eval-you-cant-ship-the-ai/).
- Chen Ye Zhu, [Golden Eval Sets: Behavioral Product Specs for Production GenAI](https://chenyezhu.com/writing/golden-eval-set-prd-genai-system/).
- Aakash Gupta, [AI killed the 10 page PRD. But the PRD isn't dead](https://aakashgupta.medium.com/ai-killed-the-10-page-prd-but-the-prd-isnt-dead-8801efe44b36) and [The AI Product Operating Model](https://www.news.aakashg.com/p/ai-product-operating-model).
- Lenny Rachitsky, [the ten skills for the age of AI](https://x.com/lennysan/status/2010884315794849901) (January 2026) and ["First AI came for coding, next it's coming for deciding what to code"](https://x.com/lennysan/status/2024299332904849545).
- Linear, [Write issues, not user stories](https://linear.app/method/write-issues-not-user-stories) and the [Linear Method](https://linear.app/docs/linear-method).
- Product School, [Product Management Trends: 11 Shifts Shaping 2026](https://productschool.com/blog/product-fundamentals/product-management-trends).
- LogRocket, [Is the PRD dead?](https://blog.logrocket.com/product-management/prd-alternatives-modern-product-teams/) and [How we replaced PRDs with AI prototypes](https://stories.logrocket.com/p/thought-leadership-how-we-replaced-prds-ai-prototypes).
- Uber Engineering, [AI prototyping](https://www.uber.com/gr/el/blog/ai-prototyping).
- David Haberlah, [What 638 practitioner voices reveal about PMs' AI transformation](https://medium.com/@haberlah/what-638-practitioner-voices-reveal-about-pms-ai-transformation-7d2fd16be10d).
- Spec-driven development: [Spec-Driven Development in 2026](https://dev.to/krlz/spec-driven-development-in-2026-what-it-is-the-tooling-and-how-teams-actually-use-it-2fk2), [GitHub Spec Kit and Kiro](https://omidsaffari.com/blog/spec-driven-development), [Kiro](https://kiro.dev/).
- Basecamp, [Shape Up](https://basecamp.com/shapeup). DORA, [research on software delivery](https://dora.dev).
- Microsoft, [HAX Toolkit](https://www.microsoft.com/en-us/haxtoolkit/). Google, [People + AI Guidebook](https://pair.withgoogle.com/guidebook/).
