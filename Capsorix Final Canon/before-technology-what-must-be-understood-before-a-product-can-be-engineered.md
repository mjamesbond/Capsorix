# Before Technology: What Must Be Understood Before a Product Can Be Engineered

*Engineering does not only build what a team has decided. It makes assumptions executable, and an executable assumption generates work that someone must perform for as long as the system runs.*

## A system that worked and could not be run

*The following is a composite drawn from recurring patterns in institutional software programmes. It does not describe a specific engagement.*

A public body administers a training subsidy. Two years after the decision to digitise it, the platform is live and does what was asked of it. Applications arrive through a form rather than an inbox. Eligibility is assessed against the published criteria without a human reading each file. Approved payments enter the finance queue automatically. Acceptance testing passed. The delivery was, by every measure the programme had defined, successful.

Within six months the department has built a parallel process in a shared spreadsheet, and the platform is used mainly to record decisions taken outside it.

Nothing broke. What happened is that the system began producing situations that belonged to nobody.

Applicants arrived who did not fit the criteria but plainly fell within the intent of the scheme: a trainee whose employer had changed mid-course, a provider whose accreditation was in renewal. Under the previous arrangement these were settled by an officer who knew the scheme, without ceremony and without a record. The rule, once executable, produced no outcome for them at all. Each case now required a decision that only a person could make, and no person had been given the authority to make it or the time in which to do so.

Then the policy changed. A ministerial decision extended eligibility to a new category of applicant. Previously that change reached the front line as a memo and took effect the following week. Now it required a specification, a developer, a release, and a budget line that had closed when the project did. The organisation had made its own policy slower to change than the process that produces policy.

Then the first appeals arrived. A citizen refused a subsidy is entitled to know why, and the refusal had been produced by a rule engine that nobody in the department could read, maintained by a supplier whose contract had ended. The obligation to explain had always existed. What had changed was that the person holding it no longer had access to the grounds.

None of these are defects. Each is work the system created, which the organisation had not agreed to do, could not see in advance, and had no one to assign it to. The project closed. The obligations did not.

## What execution adds

The proposition that products begin before technology has been established in this series, and it will not be re-argued here. The harder question is the operational one that follows from it. If serious work precedes engineering, what precisely is that work meant to produce, and how does a team know when it has produced enough?

The usual answer is epistemic: understand the problem, the users, the domain. Stated that way the requirement has no end. There is always more to learn about an institution, and teams that pursue understanding as a quantity either stop arbitrarily or do not stop at all.

A more exact answer follows from what engineering actually does to an assumption. It does three things, and only the first is widely recognised.

It fixes the assumption, which an earlier article in this series examined: some commitments become expensive to reverse because reversing them requires renegotiating an agreement with people outside the team.

It distributes the assumption. Before encoding, a belief about how work is done is held loosely by a few people who can adjust it silently as conditions change. After encoding, it is enforced on everyone who touches the system, including people who never held it and would have disagreed if asked.

And it obliges. This is the part that goes missing. A rule that a person applies can also be suspended by that person. A rule that a machine applies cannot suspend itself, so every case the rule cannot resolve becomes a demand on someone's attention, at a time nobody scheduled. Automation does not remove the residual work. It removes the easy part of it, leaves the difficult remainder to a person who now encounters it rarely and out of context, and this asymmetry is a well-established finding in the study of automated systems rather than a novelty of software.¹

The subject of this article is therefore not knowledge in general. It is the specific class of things that must be understood because the act of encoding them creates a permanent obligation, transfers a cost, or removes someone's ability to fix a problem later. A team has understood enough when it can say, for each of those, who will carry it.

## The arrangement being replaced is often a settlement

Before a product displaces an existing arrangement, the team needs an account of what that arrangement is for. The instinct is to read it as a design, and to treat its awkward parts as inefficiency awaiting removal. Many arrangements are not designs. They are settlements: the residue of a disagreement between parties with different interests, which was resolved by an accommodation that nobody wrote down because writing it down would have required someone to concede in public.

A finance team that insists on a paper signature after digital approval is often not being obstructive. It is holding a position won in an argument about liability. A step that appears redundant may be the visible part of an agreement between two directorates about who is answerable when a decision is wrong.

The operational distinction matters because the two kinds of awkwardness respond differently to being automated. Inefficiency, removed, stays removed. A settlement, removed, reopens the dispute it was concealing, and the dispute now arrives during a software rollout, attached to a system that one of the parties will experience as the instrument of the other's victory. The team will read the resulting resistance as change management, and will attempt to solve with training and communication a problem that is neither.

The practical work is modest. For each part of the current process that appears unnecessary, the question is not why it is done but what would be reopened if it stopped. Where the answer is nothing, it is inefficiency. Where the answer names a party, a liability, or an old argument, the product is not making a process improvement. It is proposing a new settlement, and the parties to the old one will need to agree to it before the code makes it real.

## Sponsor, operator, subject

Roles in a specification describe what people do in the system. They rarely describe the interests those people hold in relation to it. Three positions need to be understood separately, because they are usually occupied by different parties and only one of them is in the room.

The **sponsor** wants the product and pays for it. Their interest is generally in visibility, cost, or control, and they will be judged on the delivery rather than on the operation.

The **operator** must run the product after it exists: the clerk, the moderator, the caseworker, the support desk, the administrator who maintains the reference lists. Their interest is in throughput, in not being blamed, and in preserving the discretion that lets them handle the day's irregularities.

The **subject** is acted upon by the product: the citizen whose application is assessed, the employee whose hours are recorded, the supplier whose invoice is scored. The subject often has no choice about participating, no representative in the design, and no route of appeal that the design has considered.

An earlier article in this series noted that enterprise systems tend to accrue benefit upward while pushing cost downward. The three-position reading extends that observation into a requirement. The interests of the sponsor are always articulated, because the sponsor commissions the work. The interests of the operator surface if anyone interviews them, and they are the reason a technically correct system is quietly bypassed. The interests of the subject appear in the design only if someone deliberately introduces them, and their absence is not visible in any artefact the team produces, because a system that works badly for its subjects still works.

The concrete pre-engineering question is which of the three bears the cost of the system being wrong. Where the sponsor bears it, the arrangement is self-correcting: they will fund a fix. Where the operator bears it, the system will be worked around, and the workaround will be invisible until it has become the process. Where the subject bears it, nothing corrects at all, because the person harmed has no standing in the mechanism that would produce a correction. That third case is where a product needs an explicit design decision, and it is the one most often left to be discovered in operation.

## Every rule is somebody's rule

A rule that is about to be encoded needs two things established: what it says, which teams generally capture, and where it came from, which they generally do not.

Provenance determines who can change the rule later. A threshold set by statute can be changed only by legislation, on a timescale the organisation does not control. A figure fixed in a ministerial decision changes when the minister decides. A limit that exists because a director set it in a meeting four years ago can be changed by the current director in an afternoon. A convention that no one remembers adopting can be changed by anyone with the confidence to propose it, which in practice means it will never be changed, because no one is willing to be the person who proposed it.

These four rules look identical in a requirements document. They look identical in code. They differ entirely in what happens when reality moves.

The failure this prevents is specific and common. A team encodes a rule whose origin nobody checked. Later the rule is wrong, or contested, or an exception is needed urgently, and the organisation discovers that it has no procedure for changing it, because the rule never had an owner. It was a habit that acquired authority by being implemented. Software is unusually good at converting a habit into a permanent constraint, since a value in a table is indistinguishable, to everyone downstream, from a value in a statute.

Work on the governance of shared resources has long held that rules survive when the people affected by them can take part in modifying them, and when the parties who monitor compliance are accountable to those same people.² The version of that principle for product work is narrower and immediately actionable. Before a rule is encoded, name the party who could authorise a change to it, and confirm that the party still exists and still believes the rule is theirs. Where no such party can be named, the rule should be made configurable by someone identified, or the team should decline to encode it and leave the judgement where it currently sits.

The same discipline applies to constraints that come from outside. Regulatory approval, procurement rules, security accreditation, and dependencies on another organisation's roadmap are not conditions to be worked around. They set the tempo of the project, and the tempo belongs to a party the team cannot direct. A constraint discovered late is not a constraint. It is a redesign.

## What a field means is not in the schema

Existing data is the most persuasive material a team encounters during discovery, and the most likely to be misread. A populated column looks like a fact. It is a record of what someone entered, under a particular instruction, for a particular purpose, while being measured on something.

Four questions establish whether a field can carry the weight a product is about to put on it.

What was it for. Data produced to satisfy a reporting requirement is shaped by that requirement. A category chosen from a list of eight because none of the eight fitted is a compromise recorded as a fact, and the compromise will be systematic rather than random. Any product that reuses the field for a different purpose inherits a distortion it cannot see.

Who is measured on it. Where a field feeds a target, its distribution reflects the target. Dates cluster before deadlines. Statuses skip the state that would be reported as a delay. This is ordinary organisational behaviour rather than misconduct, and it is entirely invisible in the data itself.

Whether it is an observation or a judgement. Fields such as risk level, priority, complexity, and category are interpretations produced by a person applying tacit criteria. They can be recorded, they can be reported, and they cannot be treated as inputs to an automated decision without first establishing what the person was doing when they assigned them. This is the point at which an automation proposal most often fails quietly, because a model trained on judgements learns the judge rather than the phenomenon.

How it decays. Addresses, employment status, accreditations, and authorisations are true on the day of capture and progressively false afterwards. A design that treats them as current is asserting a refresh obligation, and that obligation will fall on someone. If the design does not say who, the answer is the subject, who will be asked to prove something the organisation already believed it knew.

Data does not arrive raw, and describing it as raw is what allows the arrangements that produced it to disappear from view.³ The consequence for product work is concrete: a product that changes the arrangement changes the meaning of its own historical data, usually at the moment it most needs a baseline.

## Failure that nobody is positioned to see

Every product has failure modes that its own monitoring cannot detect, and they are reliably the ones that matter most.

Technical monitoring observes the system: errors, latency, throughput, queue depth. Institutional monitoring observes the sponsor's interests: volumes, processing times, completion rates. Both are configured by people who share the assumptions the product encoded. Neither detects a failure that consists of the system doing exactly what it was built to do, to someone it was not built for.

The instructive question is not what could go wrong. It is which failures would be silent, and for whom. Consider a case that fell outside the rule and was never resubmitted. Nothing in the system records an applicant who abandoned an attempt, and no measure of processing time is affected, because the case never entered the process. Consider a subject who is refused in a way the organisation would regard as wrong if it knew. That refusal is a normal outcome in every log that exists.

Two structural properties determine whether such failures ever surface. The first is whether the person harmed has a channel that reaches someone with the authority to act, rather than a support queue whose function is to explain the system to the person it has failed. The second is whether anything the organisation routinely looks at would change if the failure were occurring at scale. Where the answer to both is no, the product does not merely have a risk. It has a category of harm that is structurally invisible, which is a design decision even when nobody made it deliberately.

The safety literature is unambiguous about the general form of this problem. Adequate control of a hazard requires a controller who has responsibility for it, authority to act, and an accurate model of what the system is doing.⁴ Products routinely satisfy the first condition by naming an owner, and fail the second and third, which is why so many named owners can describe a problem they are not able to correct.

## The obligations a system manufactures

The most useful pre-engineering exercise is also the least practised. Before the architecture is fixed, list the continuing work the system will create, and assign each item to a named party with the authority and the capacity to perform it. An earlier article in this series named operability as a category of uncertainty. Its content is this list.

**Deciding what the rules cannot decide.** Every encoded rule produces residual cases. Someone must have standing to resolve them, a route by which they arrive, and time allocated to the task. Where this is unassigned, the residue accumulates in an inbox and the department builds a shadow process.

**Maintaining the world the system refers to.** Reference lists, organisational units, categories, eligible providers, tariffs, and thresholds all change without notice. Each is a small permanent maintenance duty, and collectively they determine whether the system remains accurate in its second year.

**Translating policy into configuration.** When the governing rules change, someone must convert the change into the system's terms, and this requires understanding both. It is not a developer task and not a policy task, and in most organisations it is nobody's job, which is why systems drift out of compliance with the policies they were built to enforce.

**Explaining decisions.** If the system produces outcomes affecting people, someone must be able to state the grounds in language that satisfies an appeal, an auditor, or a regulator. That capability has to be designed into the system and staffed outside it.

**Stewarding data.** Retention, correction, access, and disclosure are obligations attached to holding records, and they attach to the organisation regardless of whether anyone was assigned them. A correction request that the design did not anticipate becomes a database intervention, which is a governance failure however competently it is performed.

**Moderating and adjudicating content.** Where a product carries material produced by people, someone must decide what is not acceptable, at what volume, under what standard, and with what protection for the person deciding. This is continuing work of a demanding kind, and it cannot be added after launch because launch is when it begins.

**Escalating and stopping.** Someone must be able to say that the system is producing harm and to suspend part of it without suspending everything, which requires that a partial stop was built.

A system whose manufactured obligations exceed the capacity of the organisation that must hold them is not ready to be engineered, however well specified it is. The list is not a governance formality. It changes the design: obligations that cannot be staffed have to be engineered away, by narrowing scope, by leaving a judgement with the person who currently exercises it, or by not automating a decision that nobody can afford to stand behind.

## Transition is a period of double work

The transition is usually treated as a communications exercise scheduled near the end. It is more accurately a period during which the organisation runs two systems, and the cost of doing so falls on the operators.

Three things need to be understood before the design is fixed rather than after. What existing process is being subtracted, and who has the authority to subtract it, since a system introduced alongside an untouched predecessor produces double entry and will lose. What must remain familiar, because a transition can absorb a change of medium or a change of procedure, and rarely both at once. And what the organisation will do with work already in flight when the switch occurs, which is a question about the data model as much as about the plan, and is expensive to answer once the model exists.

## The Pre-Encoding Review

The material above can be organised as a working method rather than a framework. We use it as a review held once, deliberately, at the point where a team is about to commit to schemas, permissions, workflows, integrations, and automated decisions. Its status is a practitioner working method: it reflects our own practice and is offered as such, not as a validated instrument.

### What the review asks

The review takes the small set of assumptions that are about to become executable, and for each one asks four questions.

Who can change this later, and does that party know they own it. This covers rules, thresholds, categories, and the definitions of the entities the system will treat as real.

What continuing work does this create, and who has been assigned it with the time to do it. This covers the manufactured obligations listed above.

Who bears the cost if this assumption is wrong, and can they do anything about it. This distinguishes assumptions the team will be able to correct from assumptions whose errors are borne by people with no route to a correction.

How would we find out that this is wrong. This requires a detection path that does not depend on the assumption being true.

### What counts as passing

The review is not passed by producing good answers. It is passed by producing names. An assumption whose owner is unnamed has no owner. An obligation assigned to a department rather than a person is unassigned. A detection path that resolves to a report nobody reads is not a detection path.

Where a name cannot be found, the finding is not a risk to be logged. It is an instruction to change the design, reduce the scope, or postpone the commitment until the name exists. The review's purpose is to move that discovery from month eighteen to week six, where it is still cheap.

## A bounded example: confidential civic correspondence

Haqak is a platform intended to let Egyptian citizens contact their parliamentary representative directly and in confidence, in order to raise complaints, demands, and collective requests. We describe it here only as an example of the distinction this article is making, and make no claim about adoption, endorsement, institutional partnership, or measured effect.

As an engineering problem it is unremarkable. Authenticated accounts, structured submissions, routing by constituency, a case record, and notification are all well-understood components, and a competent team could build a working version quickly.

As an understanding problem it is severe, and the difficulty sits almost entirely in the obligations the product would manufacture.

A promise of confidentiality is a permanent operational commitment, not a feature. It determines what may be logged, who may hold administrative access, what a lawful request for records would compel, and what the platform must be able to say honestly to a citizen at the point of submission. That commitment has to be designed at the level of the data model, because a promise the architecture cannot keep is worse than no promise.

Political neutrality is likewise an operating duty rather than a design stance. Someone must decide what is a complaint and what is campaigning, at volume, under a standard that can be defended when the ruling is contested. The obligation is continuous, it requires a policy that exists before the first contested case, and it must be held by a party who can absorb the pressure that accompanies the decision.

A submission also raises a question the technology cannot settle: what a representative's response is understood to be. Whether a reply is a private courtesy, a public record, or an undertaking is a question about legitimacy and expectation, and encoding a status field called *responded* asserts an answer to it.

The subjects in this arrangement bear most of the risk. A citizen who raises a grievance about a local matter is exposed in ways the platform's sponsor is not. That asymmetry does not make the product wrong. It establishes that certain commitments cannot be discovered during operation, because the cost of discovering them falls on people who did not consent to the experiment. This is the sense in which a product can be entirely buildable and not yet ready to be engineered.

## The strongest objection

The most serious objection to this argument is that it describes a paralysis, and that a great many successful products were built by people who understood none of this and learned it afterwards.

The objection is correct about the evidence and wrong about the inference. What distinguishes those cases is not that the teams were unencumbered. It is where the cost of their errors landed. A team building a consumer product, an internal tool, a developer library, or anything whose subjects can decline to participate is absorbing its own mistakes. Its users leave, its metrics fall, and the feedback returns to the party who can act on it. In that situation the fastest route to understanding is to build, and the argument here should be applied thinly if at all.

The argument gains force in proportion to three conditions: the subject cannot easily refuse the system, the cost of error falls on someone other than the team, and the correction path is institutional rather than technical. Where all three hold, which is the normal situation for public services, regulated processes, safety-relevant systems, and platforms carrying civic or political material, learning by operating means learning at someone else's expense.

There is a second objection worth conceding. Everything described here can become an instrument of avoidance. A review that generates a register of unnamed owners, circulated for comment, is a way of not starting. The defence is a constraint on the method rather than a claim about it: the review is held once, it is bounded to the assumptions about to be encoded, and each of its findings must change the design, the scope, or the sequence. A finding that changes none of these is not a finding.

## The threshold

A team has understood enough to begin engineering when three conditions hold together.

Each assumption about to be made executable has a party who can change it later, and that party knows the assumption is theirs. Each continuing obligation the system will create has a named holder with the authority and the capacity to discharge it. And the uncertainty that remains is uncertainty the team itself will pay for.

The third condition is the one that resolves the question of how much research is enough, because it sorts remaining uncertainty by who suffers if it is unresolved rather than by how interesting it is.

### Where the remaining uncertainty sits

Uncertainty the team bears is acceptable, and it should be closed by building. Preferences, interface design, sequencing, and most questions of desirability belong here, and are answered faster by something people can use than by any amount of enquiry.

Uncertainty about cost, performance, or technical viability is closed by a bounded technical exercise, which is cheap, belongs at the beginning, and should be undertaken with an explicit statement of what result would cause it to be discarded.

Uncertainty about what the organisation actually does is closed by examining records rather than by asking. Exception logs, correspondence, the last several dozen completed cases, and the identity of the person who actually signed are better evidence of practice than any description of it.

Uncertainty about how the arrangement will behave once the system is inside it can only be closed by operating, which means a bounded pilot: one office, one category of case, a defined duration, the previous path still available, and a stated condition under which the pilot stops.

And uncertainty whose cost falls on a subject who cannot refuse, cannot detect the error, and cannot obtain a correction is not a research task. It is a limit. Where such an uncertainty attaches to a decision the system would make automatically, the responsible action is to narrow the system until the decision is no longer automatic, or to leave the judgement with the person who holds it now.

None of this requires a team to know what it is doing before it starts, which is not available in serious work. It requires something more modest and considerably more testable. Before an assumption becomes executable, someone must be identifiable who owns it, someone must be identifiable who will do the work it creates, and someone must be identifiable who will notice if it is wrong. Where those three people exist and can be named, engineering is the right way to continue learning. Where they cannot, the system will not be held by the organisation that commissioned it, and building it sooner only fixes the error more firmly.

## Source notes

1. Lisanne Bainbridge, "Ironies of Automation," *Automatica* 19, no. 6 (1983): 775–779. Automation removes the tractable portion of a task and leaves the operator with the residue, under conditions that make the residue harder to perform.
2. Elinor Ostrom, *Governing the Commons: The Evolution of Institutions for Collective Action* (Cambridge University Press, 1990). On the durability of rules that those affected can participate in modifying, and on accountable monitoring.
3. Lisa Gitelman, ed., *"Raw Data" Is an Oxymoron* (MIT Press, 2013). On the production of data within specific arrangements, and the consequences of treating it as given.
4. Nancy G. Leveson, *Engineering a Safer World: Systems Thinking Applied to Safety* (MIT Press, 2011). On control structures in which responsibility, authority, and an accurate model of the controlled process must be held together for control to be adequate.

The composite case in the opening section is constructed from recurring patterns in institutional software programmes and does not describe a specific engagement. The Pre-Encoding Review is a practitioner working method rather than an established or validated framework.
