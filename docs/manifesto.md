# A backlog is a set of decisions

## The shift

In 2026 the cost of producing product artifacts collapsed. A PRD, a clickable prototype, fifty tickets, a working feature: each is an afternoon's work with a capable model. What did not get cheaper is knowing which of them should exist.

The evidence is uncomfortable. Marty Cagan's essay on the AI productivity paradox (July 2026) reports that most teams used AI to run their old project model faster, and shipped more output without better outcomes. The companies pulling ahead were the ones already good at discovery and strategy, because their advantage was never speed. Hilary Gridley's line in that essay is the one to remember: "It's never been faster to build, which means it's never been easier to run 10 times faster in the wrong direction." Lenny Rachitsky's reading of 320 podcast conversations lands on the same word: taste and judgment are the bottleneck when a model can generate unlimited output.

So the backlog matters more now, not less, and for a different reason. It is no longer the queue of work. It is the place where a product decision becomes legible: why this exists, what it changes for whom, how we will know, what it must never do. Every item is a small act of judgment. A backlog that reads well is a team that has decided well.

## Four readers

A backlog item used to have one reader: the engineer who would build it. Now it has four, and they read differently.

- The **engineer** needs what to build and how to verify it.
- The **designer** needs the person's situation and what is out of scope.
- The **executive** needs the why and the number, in one sentence, without jargon.
- The **coding agent**, which in many teams now writes the first version of the code, needs explicit intent, explicit boundaries and an explicit way to check its own work, because it cannot walk over to your desk.

The test of a good item is simple: can each of the four act on it without a meeting? Most of this method exists to make that test pass. The "why it exists" field is written from the consequence of the item not existing, in the executive's language. The acceptance criteria are written so the engineer and the agent can verify them. The boundaries (Always, Ask first, Never) are written so no reader has to guess how much autonomy the feature has.

## What changed for AI features

When the feature itself is an AI behavior, deterministic acceptance criteria stop working. A draft-email assistant does not pass or fail. It is right 92 times in 100, and the question is whether 92 is enough for this feature and this risk. Rick Pollick's phrase is exact: acceptance "is no longer a checkbox; it is a threshold on a distribution."

This method treats that as a backlog problem, not only an engineering one. For an AI behavior, the acceptance criterion is an eval: a golden set drawn from real inputs, a scoring method, a threshold agreed before the build, and negative cases that say what the feature must never do. Teresa Torres puts the ownership where it belongs. Defining what correct means "is the product team's job." If you cannot write the eval, the item is not ready.

The same logic governs autonomy. An agent earns the right to act alone by passing evals and shadow time at each tier: observe, alert, propose, act with review, act alone. Enthusiasm is not evidence. Irreversible actions stay capped until someone accepts the cost of an error in writing. That ladder lives in a companion repository, [agent-design-principles](https://github.com/Benyoumen/agent-design-principles), and this method links to it wherever an item touches an agent's permissions.

## What changed for the people and agents who build

The spec stopped being a document that sits next to the work. In spec-driven development the spec is the persistent context a coding agent works from, and files such as `AGENTS.md` and `CLAUDE.md` carry conventions, boundaries and test commands across sessions. A backlog written to this standard is already most of that context. The why tells the agent what matters. The acceptance criteria tell it when it is done. The Never list tells it what not to touch.

This is why the method insists on plain, direct, literal language, on one idea per item, and on no rule nested inside another rule. These were always good for a new engineer. They are now necessary for an agent, and the agent will show you, line by line, where your writing was vague.

## What did not change

Outcomes still beat output. Small batches still beat big ones: a vertical slice that crosses the whole stack and ships behavior teaches more than a layer that ships nothing. An honest weekly cadence still beats a roadmap that promises. Discovery still comes before delivery. Cagan's distinction between building to learn and building to earn is the right frame for when a prototype is enough and when a spec is required.

## A word on templates

Linear's method argues for short, plain issues instead of user stories, and calls the story format an anti-pattern. The disagreement is smaller than it looks. The goal on both sides is an item a reader can act on. This method keeps explicit sections because its items are read by four audiences, one of them a machine, and because explicit fields are what make a backlog queryable, snapshot-able and reviewable week after week. But the sections are scaffolding. A section that does not help one of the four readers gets deleted, and the standard says so.

## The stance

Write less, decide more. Start from the number. Prototype to learn, spec to commit. Write the why from the consequence of absence. Slice vertically. Make the acceptance criterion an eval when the behavior is probabilistic. Let autonomy be earned. Snapshot honestly. Write for the agent in the room. And when the model offers you ten options, delete nine.

The twelve principles, with sources, are in [principles.md](principles.md). The stages and gates are in [workflow.md](workflow.md).
