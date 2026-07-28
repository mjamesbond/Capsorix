# AI Is Cheap to Try and Expensive to Depend On

*Most organisations are no longer deciding whether to use artificial intelligence. They are deciding, usually without naming it, which parts of their work they can afford to stop being able to check.*

## The Request Arrives as an Answer

By the time the initiative reaches the room, it already has a name, a budget line, an executive sponsor, and two vendors on a shortlist. Someone has prepared a slide showing where the assistant will sit in the workflow. The demonstration went well. The discussion moves quickly through architecture, data access, and rollout sequencing.

Two questions have no owner in the room. What will this system decide, and how will anyone know when it is wrong.

The absence is not a failure of intelligence. The pressure producing it is real and mostly legitimate. Boards are asking. Competitors are announcing. Staff are already using these tools on their own accounts, whether or not policy permits it. In that environment, arriving with a proposal is a rational response to a question nobody has phrased carefully, and the proposal has to be specific enough to fund.

The standard corrective is to insist that the problem be defined before the technology is chosen. That corrective is right, and this publication has argued for it at length. It is also insufficient here, because it does not name what makes artificial intelligence different from the technologies it is usually applied to. The difference is not that AI is more powerful or less predictable in the abstract. It is that AI changes where the discipline has to live. Conventional software concentrates rigour in specification: decide what the system will do, build it, verify it once, operate it for years. Probabilistic systems move a permanent share of that rigour into operation. They are not verified and then run. They are run by being verified, continuously, for as long as they are relied upon.

That relocation is what most organisations have not budgeted for, in money, in attention, or in authority.

## The Adoption Question Was Settled Without You

It is worth being precise about how much of this decision is still open, because a great deal of current advice assumes a choice that has already been made.

Measured at the level of the firm, adoption remains modest. The U.S. Census Bureau's Business Trends and Outlook Survey, which samples roughly 1.2 million businesses on a biweekly cycle, found AI use holding between 17 and 20 percent from December 2025 through May 2026, standing at 19.8 percent in early May. Adoption tracks size closely: about 37 percent among firms with 250 or more employees, under 20 percent among firms with fewer than 20. Information and financial services run well above the national rate; retail trade sits well below it.

Measured any other way, the picture inverts. The same survey's data, weighted by employment rather than by firm, puts usage near a third. Individual-level surveys of workers report work-related generative AI use at roughly 41 percent as of late 2025. A survey of senior leaders estimates that around 78 percent of the labour force is employed by firms that have adopted AI in some form, and about 54 percent by firms using large language models. Add to this the capability arriving inside software already purchased, in the helpdesk, the CRM, the document suite, the code editor, and the practical position becomes clear.

Most organisations are not choosing whether to use artificial intelligence. They are discovering how much of it is already in the building, introduced by individuals solving their own problems and by vendors shipping features. The institutional decision, where one is made at all, tends to arrive after the fact.

This is why the familiar claim that most companies do not need AI yet, however satisfying, is answering a question that has closed. The open question is different and considerably harder. It concerns dependence: the point at which work can no longer be completed to standard, on time, or at volume without the system, and at which nobody is rechecking what it produces.

Adoption is reversible and cheap. Dependence is neither.

## What "We Need AI" Is Usually a Sentence About

The sentence carries at least five distinct meanings, and the first task of anyone receiving it is to establish which one is in play.

Sometimes it is a genuine **intervention**: a defined task where the capabilities of a model are materially suited to work the organisation currently performs badly, slowly, or not at all.

Sometimes it is an **aspiration**: the initiative exists because leadership needs to be seen to have one. This is not contemptible. Signalling has real value in capital markets and in recruitment. It becomes dangerous only when the signalling requirement is met by deploying a system into a live workflow, which is an expensive way to produce a press release.

Sometimes it is **avoidance**: an unresolved organisational problem, a contested decision right, a process nobody wants to redesign, a policy nobody wants to write down. Automation is proposed because it appears to route around the political cost of resolution. It does not. It encodes the unresolved condition and makes it faster.

Sometimes it is **embedded capability**, arriving as a component inside a broader product. Here the correct response is usually not an AI strategy but ordinary product judgement about whether the feature improves the system.

And sometimes it is **inquiry**: a request to find out what is now possible. This is a legitimate and often excellent use of budget, provided everyone understands that the output is knowledge rather than a system.

Underneath these categories sits a pattern worth naming, because it explains why AI requests cluster where they do. Demand concentrates on work the organisation never specified.

The reason is structural. Work that was written down has usually already been automated, or at least made legible to conventional tooling. Work that resists specification is precisely the work that looks remarkable when a model performs it, because no one could previously see how it was done. The expert who knows which supplier exceptions are tolerable, the officer who can tell a routine complaint from a serious one, the engineer who knows which alerts to ignore: this corpus has described such people as the part of the organisation that is secretly the software. They are the most common target of AI requests.

They are also the worst possible starting point, for one reason. If the work was never written down, the organisation holds no record of correct answers. It cannot say what the system should have done, so it cannot say whether the system did well. The condition that makes AI look necessary is the same condition that makes it impossible to evaluate.

A single question at intake exposes this. If this work were done well today, where would the record of it be? When the honest answer is that it lives in someone's judgement, the first deliverable of the initiative is a specification, not a system.

## One Word, Several Machines

The phrase artificial intelligence now covers a set of technologies with almost nothing in common operationally. Treating them as one thing is the most reliable way to misprice an initiative.

Extraction of structured fields from documents, where the extracted value can be reconciled against an authoritative record, is close to conventional software in its risk profile: the output is checkable in milliseconds and errors surface immediately. Classification and ranking systems are harder, since a bad ranking rarely announces itself. Forecasting carries the difficulty that the counterfactual is never observed. Generative text sits differently again: fluent, persuasive, and unaccompanied by any inherent signal of its own reliability. Retrieval-augmented systems improve on this by grounding claims in retrievable sources, which is not merely an accuracy improvement but a verification improvement, since a reader can check the citation faster than they can check the claim. Autonomous and semi-autonomous agents introduce a further category, in which errors compound across steps and the point of failure may be several actions upstream of the visible symptom.

Independent evaluation supports the intuition that these are not variations of one thing. The nonprofit METR measures the length of task, in human working time, that frontier models can complete autonomously. Its January 2026 update reports the fifty-percent-reliability horizon roughly doubling every seven months across the full period, with a faster rate since 2023. Two details matter more for operational purposes than the headline. Confidence intervals remain wide, and task duration is the strongest single predictor of failure. A system that is near-perfect on work a person would finish in minutes is a different proposition from the same system asked to run a multi-hour process unattended, even though both are the same model.

None of this is a hierarchy of sophistication. It is a hierarchy of checkability and consequence, which is a different ordering, and the one that should govern budget.

## The Two Costs That Did Not Fall Together

Here is the asymmetry that explains most of what organisations are currently getting right and wrong.

The cost of producing a plausible piece of work has collapsed. Stanford's AI Index recorded the cost of querying a model at a given capability level falling from roughly twenty dollars per million tokens in late 2022 to about seven cents two years later. Whatever the exact figure today, the direction is not in dispute and the magnitude is large.

The cost of checking that work has not moved. Reading a contract summary against the contract still takes a lawyer the same time it always did. Confirming that a customer response is correct still requires knowing the customer's actual entitlement. Verifying that a generated report is faithful to its sources still requires someone who understands both.

In computer science it is a commonplace that verifying an answer is usually cheaper than producing one. Inside an institution the reverse is frequently true. Verification requires context, access to records, subject-matter judgement, and the authority to act on a finding. The generator needs none of these. This inversion is the single most important economic fact about deploying AI in an organisation, and it is almost entirely absent from readiness frameworks.

Its consequence is an absorption limit. If a team can generate a hundred times more candidate work but check only marginally more of it, then beyond a certain volume the additional output is not value. It is unverified material entering the organisation's bloodstream with the same authority as verified material, distinguishable only by whoever remembers where it came from.

There is a further complication, which is that people are poor judges of whether the assistance helped. In a randomised controlled trial published in July 2025, METR gave sixteen experienced open-source developers real tasks in repositories they knew well. Before starting, they expected AI tools to make them about 24 percent faster. Afterwards, they estimated they had been about 20 percent faster. Measured, they were 19 percent slower. The organisation should note the honest sequel: METR's 2026 follow-up on later tools found evidence of speedup, but with selection effects the researchers judged serious enough to redesign the experiment, and they now treat the original figure as historical. The durable finding is not the sign of the effect. It is that competent professionals, working on their own code, were wrong about the direction of their own productivity.

If that is true of skilled practitioners measuring themselves on familiar work, the confidence of a steering committee reviewing a demonstration deserves proportionate humility.

The design implication is more useful than the warning. If verification is the constraint, then a substantial part of the engineering work in a good AI product consists of manufacturing cheap verification. Grounding outputs in citable sources so a reader can check in seconds. Constraining outputs to formats that can be validated automatically. Choosing tasks where an authoritative record exists to reconcile against. Preferring work whose failure is self-revealing, where the code does not compile, the total does not balance, or the customer replies immediately. Building sampling infrastructure so that unchecked output is at least measured. These are not governance activities. They are product decisions, and they determine whether the intervention has a ceiling.

## Where the Right Answer Is Kept

Every proposed AI intervention should be able to answer four questions about the task, none of which concern the model.

Does a correct answer exist, and is it accessible? What does checking one output cost, relative to producing it by hand? How long until an error becomes visible, and to whom? What does one uncaught error cost, and can it be undone?

The ceiling of the intervention is set by the least favourable answer. This is why organisational maturity is a poor predictor of success. A sophisticated institution can select an intervention whose ground truth is inaccessible and fail. A small team with modest formal maturity can run a narrow intervention well, because the task is bounded, the output is checkable, errors are reversible, and one named person owns the workflow.

Clinical prediction offers the best-documented illustration, precisely because the field publishes its disappointments. In 2021, researchers at Michigan Medicine externally validated a widely deployed proprietary sepsis prediction model across more than 38,000 hospitalisations. The vendor reported hospital-level discrimination between 0.76 and 0.83. Measured externally, it achieved an area under the curve of 0.63, with sensitivity of 33 percent and a positive predictive value of 12 percent.

The instructive part is what happened next. A successor model, validated in 2026 across four health systems and more than 227,000 inpatient encounters, performed far better, with reported discrimination between 0.82 and 0.92. The model improved substantially. The operational findings did not disappear: high variability between institutions, low positive predictive value, and high alert burden, with the authors recommending local validation, workflow integration to handle false positives, and strategies to reduce alerting noise.

A better model did not remove the institutional work. It relocated it. The organisation still has to determine local performance, absorb the false positives, and protect the attention of the people receiving alerts. Any executive weighing an AI proposal on the strength of a vendor benchmark should sit with that pair of studies for a moment.

Benchmarks are fragile in a more basic way, too. When METR moved its evaluations from one harness to another, holding the models and tasks constant, scores shifted enough to be statistically significant for two of the five models tested. If the measuring apparatus can move the result, a number produced in a vendor's environment says little about behaviour in yours.

## The Reviewer Who Cannot Review

The universal answer to all of this is to keep a human in the loop. It is a good instinct and a weak control, and the reasons have been documented since well before modern machine learning.

Lisanne Bainbridge's 1983 paper on the ironies of automation observed that automating the routine portion of a task leaves the operator only the difficult residue, while removing the everyday practice that built the competence to handle it. The subsequent literature on automation bias adds that reviewers under-detect machine error, particularly as volume rises and time per item falls. Both findings translate directly. Alert burden in clinical systems is the same phenomenon with a different name.

Meaningful review requires four things simultaneously, and organisations rarely check for all four. The reviewer needs **time**, budgeted rather than absorbed. **Context** sufficient to evaluate the specific case, not merely to judge whether the output reads well. **Authority** to reject, and to have the rejection stick. And **incentives** that do not punish rejection, because a reviewer measured on throughput will approve.

Where any of these is missing, human review is not oversight. It is a signature.

This is why decision authority should be treated as a gradient rather than a switch. Low-consequence assistance, where the output is a draft the recipient would have written anyway, requires little. Bounded operational automation, acting within a defined range with an owner and a stop control, requires evidence of stability. Expert decision support, where a qualified person retains the decision, requires that the system show its working. High-consequence recommendation, where the human review is nominal in practice because volume is high, should be assessed as if the system were deciding, because effectively it is. Delegated authority, where the system acts without review, demands the strongest evidence of all: sustained measured performance, an error budget agreed in advance, monitoring that detects degradation before customers do, and a named person who can switch it off without convening a committee.

The honest test of any oversight arrangement is simple. In the last quarter, how many outputs did the reviewer reject, and what happened when they did? If the answer is none, or nothing, the loop is decorative.

## A Case Where the Instrument Was Wrong

*The following is a composite, assembled from patterns common across engagements. It is not a description of a single client, and no figures are asserted.*

A services organisation of a few hundred people asks for an internal assistant. Staff spend a great deal of time answering questions about entitlements, procedures, and exceptions. The proposal is to index the policy library and let people ask in natural language. The value case is plausible and the technology is well within reach.

The first week of work is spent on the corpus rather than the model. Three findings emerge in order.

The policy library contains multiple documents addressing the same question, issued at different times, none marked as superseded. Where they conflict, staff have been resolving the conflict by asking two long-serving colleagues, whose answers are consistent with each other and not always consistent with any document. And a material share of real cases are handled by exceptions that are granted routinely, understood by everyone, and written down nowhere.

An assistant built on this corpus would answer confidently and be wrong in a specific, damaging way: it would be wrong in the direction of whichever document happened to rank highest, with no signal of the ambiguity that the two colleagues have been silently resolving for years. Worse, it would be unfalsifiable internally, because the organisation has no authoritative statement of the correct answer to compare against. The first time the error surfaced would be in a dispute with a client or a regulator.

What should happen instead is unglamorous and considerably cheaper. Establish which document governs and retire the rest. Interview the two colleagues and write down the exceptions, which converts tacit practice into policy and, incidentally, reduces a serious continuity risk. Assign an owner to the policy set with authority to resolve conflicts. Only then does the question of retrieval arise, and by that point a well-built search over a clean, owned corpus, showing the source alongside each answer, may resolve most of the demand at a fraction of the cost and with verification built in.

One concession is important, because it is the strongest argument against the position taken here. The prototype was not a waste. It was the most efficient diagnostic instrument available. Nothing else would have surfaced the contradiction in the policy library as quickly, because nothing else forced the organisation to state, in machine-readable form, what its rules actually were. The error would have been to interpret the prototype as a nearly finished product rather than as a completed survey.

Exploration returns knowledge about the organisation. That is a real return. It is simply not the same as a system.

## A Case Where the Instrument Was Right

*Also composite. Structure and reasoning are representative; specifics are illustrative.*

An operations team receives a high volume of inbound documents from external parties in inconsistent formats: some structured, many scanned, a long tail of one-off layouts. Staff key a small number of fields from each into an internal system. The work is high-volume, low-judgement, and unpleasant.

Deterministic approaches have been tried. Template matching works on the formats that were anticipated and fails on the tail, which is where the cost sits. Rules multiply, and each new sender adds maintenance. This is not a case where conventional automation is being unfairly disparaged. It has been attempted and it caps out.

The intervention qualifies on every question that matters. The task is bounded and well defined. Ground truth exists and is accessible, because most extracted fields can be reconciled automatically against an authoritative internal record: an account identifier either matches or does not, a total either reconciles or does not, a date either falls in a valid range or does not. Verification therefore costs close to nothing per item, and error is visible immediately rather than in a quarterly review. Consequence is real but bounded and reversible, since a mis-keyed field is corrected downstream. Volume is high enough that a modest per-item saving compounds. And the workflow has an owner who already carries responsibility for its quality.

The design follows from the verification profile rather than from the model. Extract, reconcile automatically where a record exists, and route by confidence: high-confidence reconciled items pass through, everything else enters a human queue that already existed and is now shorter. Sample a fixed proportion of the automated path continuously, because the failure to guard against is not a visible error but a silent drift in the composition of incoming documents. Agree an error budget in advance, so that degradation triggers a defined response rather than a debate.

The honest accounting matters. The review queue does not go to zero, and designing for zero would be the mistake. The team now maintains an evaluation set and re-runs it when the underlying model changes, which is a permanent obligation it did not have before. Inference cost is real and rises with volume. The intervention is worth it, and it is a system with an operating cost, not a feature that was switched on.

The contrast with the previous case is not about technology. Both involved competent teams and capable models. The difference is that in one, the organisation could tell whether the output was right, at low cost, immediately, and in the other it could not.

## Validation Is a Subscription

The cost conversation is usually conducted at the wrong altitude. Model access is a small and falling share of the total, and treating it as the price of the system reliably produces a business case that breaks at scale.

The FinOps Foundation's 2026 practitioner survey, drawn from around 1,200 practitioners responsible for more than 83 billion dollars in annual cloud spend, found that 73 percent of organisations reported AI costs exceeding their original projections, and places 80 to 90 percent of AI expenditure in inference rather than training. The share of practitioners with a mandate to manage AI spend moved from 31 percent in 2024 to 63 percent in 2025 to 98 percent in 2026. Practitioner surveys carry selection effects and should be read as directional. The direction is consistent and worth internalising: unit cost fell while total cost surprised most of the organisations paying it.

The larger omission is not inference. It is that the artefact does not hold still.

Suppliers retire the models underneath production systems on their own timetables. Snapshots that organisations validated against are withdrawn with months of notice, and on some managed platforms superseded versions are automatically upgraded to successors. In one instructive case in 2026, a major provider deprecated not only model snapshots but its own evaluation product and agent-building tooling, with shutdown dates the same year. The instruments teams used to verify their systems were themselves on a lifecycle.

Regulation moves on a comparable rhythm. Organisations that built compliance programmes around the EU AI Act's original August 2026 date for high-risk obligations spent the first half of 2026 re-planning: the Digital Omnibus on AI, adopted in June 2026, deferred stand-alone high-risk obligations to December 2027 and embedded-product obligations to August 2028, while leaving most transparency obligations on their original schedule and adding new prohibitions. Any plan whose logic depended on a date rather than on a capability has now been rewritten twice.

The fair objection is that conventional software also changes, also fails, also embeds institutional assumptions and bias. That is correct, and this publication has argued it. The difference is specific rather than rhetorical. When a deterministic dependency changes, the behaviour it was specified to produce is written down, and a regression suite can assert it. When a probabilistic dependency changes, what was written down is a distribution of acceptable behaviour, and the only way to know whether the new version still falls inside it is to run an evaluation the organisation must have built and must maintain.

Deterministic software is verified once and operated thereafter. Probabilistic software is operated by being verified continuously. Validation is not a milestone in the plan. It is a line in the budget that recurs.

## What Earns Dependence

None of this argues for delay. It argues for distinguishing between five commitments that are routinely discussed as one.

**Exploration** should be cheap, frequent, and expected. Its purpose is to learn what is possible and what the organisation actually looks like when examined through a model. It requires little governance beyond data handling and security discipline, and it should not require a business case, because demanding one before the knowledge exists is how organisations remain uninformed. An organisation that has not experimented is not being prudent.

**A pilot** is a bounded operational test with real users, a defined evaluation, a stated hypothesis about value, and an owner. It requires knowing in advance what result would cause it to stop.

**Deployment** places the system in a live workflow with continuing responsibility. It requires the four questions to have been answered, monitoring proportionate to consequence, a named owner, and a stop control that a person can operate without convening a committee.

**Scaling** extends across teams, decisions, or institutional boundaries. It requires evidence that performance holds in the new contexts rather than the assumption that it will, which is the specific failure the multi-site clinical validations document.

**Delegation**, in which the system exercises meaningful decision authority, requires everything above plus something organisations rarely prepare: an agreed definition of acceptable failure, a process for disputed decisions, monitoring for unequal performance across groups and contexts, and a named accountable individual.

The asymmetry between these is what should drive posture. An unfounded experiment costs some money and some time, and often returns knowledge even when it fails. Unfounded dependence costs the ability to notice that anything is wrong, and it is discovered by the people the organisation serves rather than by the organisation.

The practical version of the test fits on a page. What decision or work product is at stake, and what does one uncaught error cost. Where is the correct answer kept, and who holds it. What does checking cost, who pays for it, and can they absorb it at volume. When does error become visible, and to whom. What is the simplest intervention that would resolve the underlying condition, and has it been tried. Who owns the system after launch, and what can they stop without permission.

An initiative that cannot answer these is not necessarily a bad idea. It is an idea at the exploration stage that has been priced as a deployment.

## The Capability No Vendor Can Sell You

There is a useful way to picture the position. Imagine the work of an organisation plotted against two properties: how expensive it is to check an output, and how consequential and irreversible an error would be. Somewhere across that field runs a frontier. Below it, dependence is defensible. Above it, dependence means the organisation has agreed to stop being able to tell whether it is doing its job.

The instinct is to believe that buying a better model moves the frontier. It does not, or not much. Model capability shifts an intervention's position slightly and mostly on one axis. What moves the frontier itself is the organisation's capacity to verify: authoritative records that make reconciliation possible, owners who can be held to a result, evaluation sets that outlive the model that prompted them, reviewers with time and authority, and the ordinary institutional habit of writing down what the right answer is.

That capacity is not on any vendor's price list. It is built slowly, it is unglamorous, and it compounds. Its most valuable property is that it is not specific to artificial intelligence. An organisation that can tell when a model is wrong can generally also tell when a supplier, a process, or a strategy is wrong, which is a description of an institution that is capable of learning.

So the question to put to the initiative with the budget line and the shortlist is not whether the organisation is ready for AI. Readiness in the abstract is not a coherent property and cannot be assessed. The question is narrower and answerable. For this specific decision, in this specific workflow: what have we agreed to stop checking ourselves, what would it cost to check it, and who will notice when it is wrong.

Organisations should be learning about these systems continuously, at low cost, without ceremony, and starting now. They should be considerably slower to depend on them. The distance between those two sentences is where the work is.

---

### Source notes

Adoption figures are from the U.S. Census Bureau's Business Trends and Outlook Survey (data collected 14 December 2025 to 3 May 2026) and its 2026 AI supplement working paper; worker-level and firm-leader estimates are from a Federal Reserve FEDS Note, *Monitoring AI Adoption in the U.S. Economy*, 3 April 2026.

Time-horizon measurements and evaluation-harness sensitivity are from METR, *Time Horizon 1.1*, 29 January 2026. The developer productivity trial is METR, *Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity*, 10 July 2025, together with its methodological update of 24 February 2026.

External validation of the sepsis prediction model is Wong et al., *JAMA Internal Medicine*, 2021;181:1065–1070. The multicentre validation of the successor model was published in *JAMA Network Open* in 2026.

Cost figures are from the Stanford Institute for Human-Centered AI, *AI Index 2025*, and the FinOps Foundation, *State of FinOps 2026*.

Model lifecycle statements are drawn from provider deprecation documentation consulted on 28 July 2026. Regulatory dates reflect the Digital Omnibus on AI adopted by the European Parliament on 16 June 2026 and the Council on 29 June 2026, amending Regulation (EU) 2024/1689.

On the limits of human oversight, see Lisanne Bainbridge, *Ironies of Automation*, Automatica, 1983, and Raja Parasuraman and Victor Riley, *Humans and Automation: Use, Misuse, Disuse, Abuse*, Human Factors, 1997.

A widely circulated 2025 figure claiming that 95 percent of enterprise AI pilots produce no measurable return is deliberately not cited in support of any claim here. It originates in a self-described preliminary paper that was not peer reviewed and whose authors work on the class of technology the paper recommends.

Both extended cases in this article are composites, assembled from recurring patterns rather than drawn from a single organisation. No client results, figures, or outcomes are asserted.
