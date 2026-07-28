# The Decisions a System Makes Before Anyone Agrees to Them

*Software rarely fails because a team built too early. It fails because a handful of technical decisions quietly committed an organisation to a version of itself that no one examined.*

## Three decisions made before lunch

By eleven o'clock the meeting has produced four decisions. The platform will be web-first, with a mobile companion later. The team will use a managed relational database rather than the document store someone proposed. Approvals will be modelled as a state machine with five states. A first release is targeted for the end of the quarter.

Everyone present would describe these as technical decisions, and in the vocabulary of the meeting they are. But three of the four were not technical at all.

Choosing five approval states asserts that the organisation's approval process has five meaningful conditions and that everything else is an error. Modelling an application as belonging to one applicant asserts that the person who submits is the person the organisation is dealing with. Assigning approval rights to a role called *director* asserts that the person who holds legal authority is the person who exercises it.

Each of these is a claim about how an institution actually works. Each can be false. None was stated as a claim, so none was examined. By the afternoon all three are in a schema, and within a quarter they will be in production data, in an audit trail, in a report someone is judged on, and in the working assumptions of four teams.

The framework choice, meanwhile, was genuinely technical and genuinely reversible. It received most of the discussion.

This inversion is the subject of this article. The problem in most product initiatives is not that engineering begins too soon. Engineering should begin early, because building is one of the few reliable ways to learn anything. The problem is that a small number of decisions permanently encode claims about an organisation's reality, they are made under a technical description, and they are almost never recognised as the moment at which the product's fate was fixed.

## Why downstream questions feel like progress

Technical questions have three properties that make them irresistible early in a project, and none of those properties has anything to do with their importance.

They are decidable. A team can settle a database choice in an afternoon and be right. Nothing in the surrounding organisational reality can be settled in an afternoon, and much of it cannot be settled at all.

They are legible. A framework decision, an architecture diagram, and a delivery date are visible artefacts that a steering committee can inspect. An accurate understanding of how a department actually handles exceptions is not an artefact. It cannot be shown in a slide without being flattened into something that is no longer the understanding.

They are attributable. Someone can own the cloud decision. Ownership of "we have correctly modelled how authority works in this ministry" belongs to no one, which usually means it belongs to whoever writes the permissions code, working alone, at speed, with no source of truth.

That last point deserves more attention than it usually gets. In most organisations, engineers are the only people whose work refuses to remain vague. A strategy can stay abstract. A policy can contain the phrase *as appropriate*. A schema cannot. When the institution has not decided who may approve on behalf of whom, the engineer must decide, because the code will not compile otherwise. The organisation's unresolved questions are therefore resolved silently, by the person furthest from the authority to resolve them, at the moment of implementation.

The incentive structure reinforces this. Funding, procurement, and approval processes almost always demand technical specificity before institutional understanding exists. To obtain a budget, a team must describe a system. Describing the system requires committing to its structure. The structure encodes the institutional claims. The claims are then treated as settled because they appear in an approved document.

Two further mechanisms deserve naming. Estimates manufacture the appearance of certainty: a plan with dates implies that the shape of the thing is known, when dates are usually the least reliable output of an early project. And demonstrations become specifications. Once a stakeholder has seen a working screen, that screen is no longer a question. It has become the thing the organisation is now discussing, and every later attempt to change it will be experienced as regression.

## Writing software and changing a system are not the same act

A product is not primarily an interface or a codebase. It is a deliberate intervention in an arrangement that already exists and already works, in the specific sense that it has been producing outcomes, absorbing failures, and surviving for years.

This framing is not new. Evaluation science has worked this way for decades. Pawson and Tilley's realist evaluation argues that programmes do not simply work or fail; they activate particular mechanisms, for particular people, under particular conditions, and the useful question is what works for whom in what circumstances.¹ Implementation research makes a related point about adoption: a new practice does not spread because it is better, but because people do the work of making sense of it, committing to it, operating it, and appraising it.² Product teams rarely borrow from either literature, and the omission is expensive.

The most useful consequence of the intervention framing is a change in the first question asked about an existing process. The instinctive question is *how does it work?* The more revealing question is *what does it absorb?*

Every stable arrangement absorbs variety somewhere. Cases arrive that the rules do not cover. Information is missing. Two departments disagree. Someone is owed a favour. A deadline collides with a holiday. In a functioning organisation these are handled, usually by a person who is exercising judgement that no document records. Ashby's law of requisite variety states the constraint formally: only variety can absorb variety. If the absorber is removed and nothing of equivalent flexibility replaces it, the variety does not disappear. It reappears somewhere less convenient, usually as a queue, an escalation, or a workaround built in a spreadsheet.

An earlier article in this series described the person who is secretly the software: the individual whose accumulated judgement holds a process together. Seen through this lens, that person is an absorber. A system that automates the documented process replaces the documentation, not the absorption. The documented process was never what was running.

The corresponding rule is simple to state and uncomfortable to apply. Before removing a manual step, name what that step absorbs and name what will absorb it afterwards. If the answer is "the new system will handle it," the answer is incomplete until someone can say which specific behaviour of the system handles which specific class of irregularity.

## What a requirement throws away

A requirement is a compression of reality. Compression is not a neutral act, and the losses are not random.

What survives compression is what is easy to state: entities, steps, roles, rules, and the sequence in which things are supposed to happen. What is discarded is discretion, the frequency and character of exceptions, the informal negotiation that precedes formal action, the reasons the rules exist, and the local knowledge that determines when a rule is applied strictly and when it is not.

Human factors research names this gap directly. Hollnagel distinguishes work-as-imagined, which is what designers, managers and regulators believe happens, from work-as-done, which is what actually happens as people adjust continuously to conditions.³ Scott's study of state simplification makes the political version of the same argument: to govern something at scale you must first make it legible, and the process of making it legible discards the practical local knowledge that made it function.⁴ Lipsky's account of street-level bureaucracy adds the sharpest form: in many public systems, the discretion exercised by front-line staff *is* the policy, whatever the statute says.⁵

The consequence for product work is specific. Requirements compression preserves the information needed to build the system and discards the information that determines whether it will be used. That asymmetry is the mechanism behind the familiar outcome of a technically correct system with no adoption.

This is why the idea that features contain assumptions is worth more than its usual treatment as a slogan. A feature is a compressed claim set, and it can be decompressed. Consider a line that appears in almost every internal system: *notify the reviewer when a case is assigned to them.*

Unpacked, it asserts that assignment is a discrete event; that a case has one reviewer; that assignment precedes review rather than following an informal agreement about who will take it; that reviewers work from a queue rather than from relationships and obligations; that reviewers are unaware of pending work; and that the delay this feature exists to reduce is caused by that unawareness.

Six claims, each of which can be tested, several of which are false in any given organisation. If the real cause of delay is capacity rather than awareness, the feature does not increase throughput. It increases the number of people who know they are late.

Decompression is cheap. It takes minutes per feature and requires no research budget. It is worth doing because it converts an unexamined design into a list of statements that can be checked, and because it usually reveals that the disagreement in the room was never about the feature.

## The six decisions that carry institutional weight

Not all technical decisions are equal, and the usual way of ranking them is wrong. Teams tend to rank by technical difficulty or by cost of migration. The more useful criterion is different:

> A decision is load-bearing when reversing it requires renegotiating an agreement with people outside the engineering team.

Migration cost is an engineering problem, and engineering problems yield to effort. Renegotiation cost is an institutional problem, and institutional problems yield to authority, timing, and politics, none of which the team controls. This distinction, rather than technical complexity, is what separates decisions that can be revisited from decisions that will be defended for a decade.

Six decisions consistently meet this test in systems that operate inside institutions.

**The ontology.** What the system says exists, and what counts as one of a thing. Whether an *application* belongs to a person or an entity. Whether a *case* is a document, a request, or a relationship. Bowker and Star's study of classification systems shows how such choices become invisible infrastructure carrying real consequences for whoever falls between categories.⁶ Reversing an ontology means re-describing an organisation's world and migrating every record that was written under the old description. Useful test: name three real cases from the last quarter that do not fit the proposed definition, and say what the system will do with them.

**The authority model.** Who may act, who may act on behalf of whom, and who may override. This is where the gap between formal and actual authority becomes structural. Reversing it means renegotiating decision rights, which is a political act, not a release. Useful test: compare who is recorded as approving the last ten decisions with who actually made them.

**The exception model.** Whether irregular cases are a first-class path with named owners or an error state that falls out of the workflow. This choice determines the core of the system and cannot be added later without rebuilding it. Useful test: before designing the standard path, measure what share of real volume followed it exactly last year. In institutional processes the answer is often low enough that the standard path is the exception.

**The boundary of record.** Which system is authoritative for which fact, and therefore which department or institution owns which truth. An integration is a technical artefact; the agreement underneath it is a treaty. Reversing it means reopening a negotiation between organisations that may have taken a year to conclude. Useful test: list every fact the system will assert as authoritative and name who currently owns it.

**The unit of accountability.** What the system records as an action, attributed to whom, and therefore who is answerable when something goes wrong. Audit trails are legal instruments before they are logs. If the system attributes to an individual an action that the organisation understands as collective, it has changed the distribution of liability without anyone deciding to. Reversing that is a legal and cultural matter.

**The measurement model.** What the system counts, because what a system counts becomes what the organisation manages. A metric that exists in a dashboard becomes a management object within months and acquires a history that people are judged against. Reversing it invalidates a time series that has become an asset, and it changes incentives in ways that are difficult to predict and impossible to unwind quietly.

There is a seventh candidate we have not yet settled: the representation of time. How a system handles retroactivity, effective dates, and backdated corrections encodes strong claims about whether the organisation's past is editable. In some regulated environments this belongs firmly on the list. We are treating it as an open question rather than asserting completeness.

Everything else is comparatively cheap. Framework, language, hosting, styling, most service boundaries, and the entire first version of the interface can be changed by a team that decides to change them. Cheap does not mean unimportant. It means that changing them does not require a meeting with the ministry.

## The encoding threshold

This clarifies what "before technology" actually means, and reveals that the phrase is misleading as usually stated.

Nothing needs to happen before technology. Engineering is a mode of inquiry, and often the fastest one available. A prototype can settle in three days a question that interviews would misanswer for three months, because people describe their work as they believe it should be done rather than as they do it. Technical exploration also reveals whether an idea is possible or affordable, which is a form of understanding no amount of stakeholder consultation produces.

What needs to happen before *encoding* is different. Encoding is the moment at which a belief stops being a belief and becomes a structure that other people build on and depend on. The standard follows directly:

> No commitment should be harder to reverse than the belief underneath it is well supported.

When that rule is violated, there are exactly two legitimate responses, and both are real work. Raise the evidence, by observation, record analysis, or a disposable build. Or lower the reversal cost, by keeping the decision soft: an abstraction, a configuration, a deliberately narrow first scope, a parallel path that leaves the old process running.

The second option has its own price, and naming it prevents the opposite failure. Generality is expensive and often wasted. A team that responds to every uncertainty by building configurability produces a system that encodes nothing and does nothing, which is its own way of avoiding a decision. The rule is a coupling, not a preference for softness.

The same standard resolves the question of when building is inquiry and when it is disguised commitment. The test is disposability, and it is answered in advance:

> Name the result that would cause you to delete this.

A prototype built to answer that question is research. The same prototype, demonstrated to a steering committee without that framing, is a commitment that has not been recognised as one. Nothing about the code differs. What differs is whether the organisation has begun depending on it.

## A composite case: the permit that was never really refused

*The following is a composite constructed from patterns common to institutional digitisation programmes. It is illustrative and does not describe a specific Capsorix client engagement.*

A regulatory authority issues operating permits. The process takes an average of eleven weeks against a published service standard of four. The request arrives already specified: replace the manual process with an application, and add an AI model to prioritise the backlog.

The documented process has six steps. The first substantive finding was that it has seven.

Between the applicant's arrival and formal submission there is an unofficial pre-check. A clerk reviews the file informally, identifies what is missing or wrong, and returns it without registering it. The applicant corrects the file and submits it properly. This step exists because a formal rejection becomes a statistic, and rejection rates are reported upward. The office's low rejection rate is not evidence of high application quality; it is produced by avoiding formal rejection.

An application that digitises submission as the entry point destroys this step. Formal rejections rise sharply in the first quarter. The rise is read at headquarters as a performance failure. The predictable response is that offices route applicants around the system, and the system becomes a record-keeping burden attached to a process it does not represent.

The second finding concerned identity. Most applications are not submitted by the businesses that need the permit. They are submitted by agents who handle many applications and hold the practical relationship with the authority. The proposed data model had one applicant per application and no representation of agents. This is an ontology error, and it is not cosmetic: the entire correction loop, the reputation signals staff rely on, and the natural unit of communication all belong to the agent, not the applicant.

The third finding concerned authority. The legal signatory is a director; the regulation does not permit delegation. In practice, directors are frequently unavailable, and the paper process accommodates this through ambiguity, since a stamp does not record the hand that applied it. Software does not tolerate ambiguity. A digital system with an authenticated identity on every approval would make the actual practice visibly unlawful. The office would not adopt it. The paper process was not less rigorous than the digital one; it was performing a function the digital design had not accounted for.

The fourth finding was quantitative and came from the exceptions log rather than from interviews. A substantial minority of applications each year involved conditions the standard path did not cover: heritage-zone sites, incomplete land records, foreign ownership structures. Staff described these as unusual. The log showed they were routine. A five-state workflow with an error path would have pushed a significant share of real volume outside the system on day one.

The fifth finding concerned the AI request. Prioritisation was currently determined by a mixture of legitimate urgency, institutional relationships, and pressure from above. There was no historical record of what should have been prioritised, only of what was, which meant there was nothing to learn from except the existing pattern. A model trained on it would reproduce the pattern with the added authority of appearing objective. Read carefully, the request for AI prioritisation was not a request for better sequencing. It was a request to move an uncomfortable discretionary decision somewhere it could not be attributed to a person. We regard this reading as a practitioner interpretation rather than an established finding, but it recurs often enough to be worth testing explicitly whenever an AI feature is proposed for a decision no one wants to sign.

Understanding this changed the product substantially, and the changes were not adjustments to the feature list.

The pre-check was preserved and made explicit as a readiness review, a state that is formally not a submission and generates no rejection statistic. The absorber was kept and given a name. Agents became first-class actors with their own identity, history, and correction workflow. Exceptions became a named path with assigned owners rather than an error state, which changed the core workflow model. Land records remained authoritative in the existing cadastral system and were referenced rather than copied, which meant a slower integration but avoided asserting ownership of a fact another institution owns. AI prioritisation was not built. AI-assisted completeness checking was, because document presence has verifiable ground truth, and because it strengthened the pre-check rather than replacing discretion. The authority question was escalated as a policy matter, and the first release deliberately stopped short of recording final approval, because encoding an unlawful delegation is worse than not automating it.

Two further consequences are worth noting. The headline metric changed from processing time to time-to-first-correctable-response, because processing time rewards early rejection and the organisation had already demonstrated how it responds to that incentive. And rollout was organised by office rather than by function, because the office is the unit at which consent is actually granted.

The research that produced these findings took a few weeks and consisted mainly of reading the exceptions log, sitting with clerks, and comparing recorded approvers with actual ones. It was not expensive. What would have been expensive is that four of the six load-bearing decisions in the original architecture were wrong, and two of them, the identity model and the accountability attribution, could not have been corrected after the system held a year of records.

## Which unknowns must be closed, and which can only be closed by building

The point of the argument is not that teams should understand reality before acting. That is impossible, and pursuing it produces its own well-known failure. The point is that unknowns should be sorted by which decision they block and how expensive that decision is to reverse, not by how interesting they are.

Four categories are sufficient in practice.

Unknowns that determine a load-bearing decision must be closed before that decision is encoded. The cheapest reliable method is usually not interviewing. It is examining records: exception logs, email threads, the shadow spreadsheet, the last fifty completed cases, the list of who actually signed. People misdescribe their own processes, not from dishonesty but because work-as-done is largely tacit.

Unknowns about behaviour and desirability usually cannot be closed by research and should be closed by building something people can actually use. This is where the argument for speed is entirely correct. Build it, keep it small, and keep the six encodings soft while doing so.

Unknowns about performance, cost, and technical feasibility should be closed by a spike with the disposability test attached. These are cheap and they belong at the beginning, not after the architecture is committed.

Unknowns about adoption cannot be closed in advance at all. They are managed rather than resolved, by making rollout reversible: one office, one team, one category of case, with the previous path still running and a defined condition for stopping.

Two rules keep this from becoming an excuse for delay. Every research activity must name the decision it will change; research that changes no decision is documentation, not discovery, and should be cancelled. And any question that cannot be answered in less time than it would take to build a disposable version of the thing should be answered by building the disposable version.

## Where this argument weakens

The case is strongest where a product enters an institution that already has authority structures, records, accountability, and history. It is weaker elsewhere, and the boundaries should be stated plainly.

Where there is no incumbent system, the ontology is invented rather than discovered. Developer tools, novel consumer products, and frontier technology often must be built before anyone can say what they are for, and the demand to understand institutional reality first would be incoherent. But the rule does not vanish; its content changes. For infrastructure products the load-bearing decisions are the public interface and the data format, because once others depend on them the reversal cost becomes external and political in exactly the same way. Interfaces become institutions.

Technology-push development is legitimate and common. Capability frequently precedes any clear account of need. The argument here is not that need must be established first; it is that a team should know which of its commitments are irreversible whatever the order of discovery.

For genuinely small, reversible products the whole system may be a decision that can be unwound in a week. The overhead proposed here is then unjustified, and saying so matters, because a method that claims universal application is usually being defended rather than used.

The separation between product and technology is, finally, false, and the argument does not depend on it. Engineers routinely understand institutional reality better than anyone with the word product in their title, and product specialists routinely misjudge what is expensive to change. The distinction proposed here is not between disciplines. It is between exploration and commitment, and both disciplines do both.

The objection that discovery becomes organisational avoidance is correct and common. It is the reason the rules above are stated as constraints on research rather than as encouragement for it.

## Technology as a settled claim about the world

A running system is an argument that has stopped being argued.

Every schema is a settled question about what exists. Every permission is a settled question about who may act. Every required field is a settled question about what must be known before someone is allowed to proceed. Every report is a settled question about what deserves to be counted. Once the system is in operation, the organisation will not experience these as positions taken by a team in a meeting. It will experience them as facts, and it will reorganise itself around them, which is precisely what a successful product does.

That is the reason the standard for encoding differs from the standard for building. Build early, build often, and keep almost everything soft, because most of a system is cheap to change and the fastest route to understanding usually runs through something that works. But when a decision is about to fix what exists, who decides, what counts as an exception, who owns which truth, who is answerable, and what will be measured, the team has stopped writing software. It is writing part of the organisation's operating constitution, in a medium that does not accept amendments easily.

A product will not be judged on the sophistication of that artefact. It will be judged on whether the condition it was built to change actually changed, for the people it was meant to change it for, under the conditions that actually obtain. The technology is where that understanding becomes durable. It is a poor place to discover that the understanding was wrong.

---

## Source notes

1. Ray Pawson and Nick Tilley, *Realistic Evaluation* (Sage, 1997). The context–mechanism–outcome configuration, and the reframing of evaluation around what works for whom in what circumstances.
2. Carl May and Tracy Finch, "Implementing, Embedding, and Integrating Practices: An Outline of Normalization Process Theory," *Sociology* 43, no. 3 (2009): 535–554. Adoption as the collective work of sense-making, engagement, enactment and appraisal.
3. Erik Hollnagel, *Safety-I and Safety-II: The Past and Future of Safety Management* (Ashgate, 2014), and *From Safety-I to Safety-II: A White Paper* (2015). The distinction between work-as-imagined and work-as-done.
4. James C. Scott, *Seeing Like a State* (Yale University Press, 1998). Legibility, simplification, and the displacement of local practical knowledge.
5. Michael Lipsky, *Street-Level Bureaucracy: Dilemmas of the Individual in Public Services* (Russell Sage Foundation, 1980). Front-line discretion as effective policy.
6. Geoffrey C. Bowker and Susan Leigh Star, *Sorting Things Out: Classification and Its Consequences* (MIT Press, 1999). Classification as invisible infrastructure with material consequences.

W. Ross Ashby's law of requisite variety is drawn from *An Introduction to Cybernetics* (Chapman & Hall, 1956). The composite case is constructed from recurring patterns in institutional digitisation programmes and does not describe a specific client engagement.
