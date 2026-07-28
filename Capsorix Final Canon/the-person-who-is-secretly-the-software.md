---
title: "The Person Who Is Secretly the Software"
subtitle: "Why critical business logic accumulates in people rather than systems — and what it costs long before anyone notices"
slug: "the-person-who-is-secretly-the-software"
description: "In most companies, part of the operating logic lives in one person's judgment rather than in any system. Why that happens, what it quietly costs, and how well-designed software can hold institutional knowledge without reducing people to processes."
excerpt: "There is usually one person whose calendar does not explain what they do. Their title says one thing; the organisation's behaviour says another. When a situation is unclear, they are the one who gets called."
author: "Capsorix Editorial"
category: "Insights"
tags:
  - Institutional Knowledge
  - Operations
  - Product Strategy
  - Business Automation
  - Digital Transformation
  - Scaling
published: "2026-07-27"
updated: "2026-07-27"
readingTime: "8 min read"
featuredImage: "/images/insights/person-who-is-secretly-the-software/cover.jpg"
seoTitle: "The Person Who Is Secretly the Software | Capsorix"
seoDescription: "Why business logic ends up living in one person's judgment instead of in systems, what that dependency costs, and how good software captures it without flattening expertise."
canonical: "https://capsorix.tech/insights/the-person-who-is-secretly-the-software"
ogImage: "/images/insights/person-who-is-secretly-the-software/og.jpg"
draft: false
---

# The Person Who Is Secretly the Software

**Why critical business logic accumulates in people rather than systems — and what it costs long before anyone notices**

---

## Executive Summary

- In most established companies, part of the operating logic sits in no system. It sits in the judgment of one or two people who absorbed it over years.
- The dependency stays invisible because it works. Human compensation produces no error message.
- The primary cost is not continuity risk but a ceiling: on decision throughput, on quality under load, and on the ability to replicate the business elsewhere.
- Documentation alone does not resolve it. It is written when need is lowest, read when urgency is highest, decays without warning, and describes the general case when the value sits in the exceptions.
- Good software resolves it by enacting knowledge rather than storing it — embedding the structure of a decision into a workflow that is exercised daily.
- The objective is not to replace the expert, but to ensure judgment is required only where judgment is genuinely required.

---

## Introduction

There is usually one person whose calendar does not explain what they do.

Their title says operations manager, or senior analyst, or account director. The organisation's behaviour says something else. When a situation is unclear — a client asks for terms that are not quite standard, a supplier misses a date, a case does not fit the categories — they are the one who gets called. Not because a process directs anyone to them, but because everyone has learned that they will know.

Over enough years, that person stops performing a role and becomes closer to a component: the routing layer, the exception handler. They are, functionally, part of the software the company runs on, except that they were never specified, never versioned, cannot be deployed twice, and are documented nowhere.

We have found this in nearly every company we have worked with. It is rarely a symptom of poor management. It is usually a company that grew faster than its systems, staffed by people capable enough to absorb the difference.

This article is not an argument that such people are a liability. It is an argument that they are a ceiling.

> **Image suggestion:**
> A wide editorial illustration in muted greys with a single warm accent. An architectural floor plan rendered as a technical schematic — thin, precise line work, every room drawn identically except one, filled in solid accent colour, with fine hairlines radiating from it to every other room in the building. No faces, no figures, no stock imagery. Generous whitespace, restrained composition.

---

## The Hidden Dependency Problem

Every business runs on rules, and most are written down: price lists, approval thresholds, service levels, credit terms, escalation paths. What is almost never written down is when the rules do not apply.

Consider a standard commercial policy — net-30 terms, volume discounts at defined tiers, approval above a threshold. Underneath it sits an undocumented layer. Net-30, unless the client's sector treats net-45 as normal and insisting signals inexperience. The stated discount tier, unless this is a first order from an account worth pursuing, in which case the tier is granted early and recovered at renewal. Approval above the threshold, unless the request routes through the one region where the approver is slow and the deal will not survive the delay.

None of that is written anywhere. Most of it is correct. It represents years of pattern recognition about how the business behaves under conditions the policy never anticipated.

Michael Polanyi described the general form: we know more than we are able to articulate. Expertise of this kind is not withheld. It is difficult to retrieve on demand, because it was never stored as a rule. It was stored as recognition, available only when a matching situation appears.

The documented layer covers the ordinary case. The undocumented layer covers the exceptions, where most of the margin and most of the risk sit.

---

## Why Businesses Don't Notice It

The dependency stays invisible because it works.

A system under strain produces evidence: incidents, alerts, backlogs, error rates. Someone can point at a chart. A person under strain produces longer hours and a functioning business. Every metric leadership reviews suggests an organisation in good order, because that person is the reason it is in good order.

It is often invisible to them as well. They do not experience themselves as holding a system together. They experience a job they are good at that involves a great many interruptions.

The third reason is structural. The organisation chart records authority. What matters operationally is a different diagram — who is contacted when a situation is ambiguous. Call it the call graph. It is the true map of where a company's knowledge sits, and almost no company has drawn it. One document is a tree; the other is a dense set of connections converging on very few nodes.

---

## The Cost of Institutional Memory

The usual framing is continuity risk: what happens if that person leaves. It is real, and the least interesting version, because everyone already knows it and has quietly decided to live with it. The costs that matter are being paid now.

**A ceiling on throughput.** Non-standard decisions can only be made as fast as one person attends to them. This does not present as failure. It presents as a business that has become slightly harder to run: quotes taking longer, approvals queueing, delays everyone attributes to volume. Growth does not stop. It thickens.

**Degradation under load.** As volume rises, the same judgment is applied faster and with less context. Nobody detects the difference, including them, because the output looks identical. Quality erodes first and is measured last.

**Non-replicability.** A second office, a new market, an acquired team: each requires the same undocumented layer and none has it. The role can be hired; eight years of context cannot. Expansions that underperform for this reason are almost always diagnosed as something else.

**The cost to the person.** They cannot be promoted, because the position depends on them, nor take extended leave without a backlog forming. Competence becomes confinement, and it is frequently why such people eventually leave — not for compensation, but because the role has no exit.

---

## Why More Documentation Alone Doesn't Solve It

The instinctive response is a documentation initiative. It is reasonable, and it consistently underdelivers, for four structural reasons.

- **It is written when need is lowest and read when urgency is highest.** What is composed calmly in a quiet week is rarely what a colleague needs on a Friday afternoon with a client waiting.
- **It decays without warning.** Code that is wrong fails. A document that is wrong is believed. There is no test suite for a wiki, and no alert when a page and reality diverge.
- **It captures the general case.** The value sits in the exceptions, and exceptions resist enumeration. An expert recognises one instantly and can list perhaps a tenth on request.
- **The incentives are inverted.** Writing costs the expert the most time and returns the least benefit. This is not obstruction; it is economics, and should be treated as such.

Beneath all four sits a deeper issue. Documentation moves the cognitive load onto the reader at the moment of decision. It requires a less experienced person to know a relevant rule exists, locate it, interpret it correctly, and apply it under pressure — precisely the task the expert was performing.

Documentation is necessary. It was never designed to carry this weight.

> **Image suggestion:**
> A minimal editorial diagram contrasting two states. On the left, a document rendered in thin grey line work — static, closed, inert. On the right, the same information redrawn as a live workflow: connected nodes with one branch highlighted in the accent colour to indicate an active decision path. Typographic labels only, no depiction of people. Wide margins, single accent colour, Swiss-modernist restraint.

---

## How Good Software Changes the Situation

The distinction that matters is between **storing** knowledge and **enacting** it. A document describes what should happen. A well-designed system *is* what happens.

**Embedded knowledge is exercised daily, so it cannot decay silently.** If the logic inside a working system is wrong, it produces a wrong outcome someone notices and corrects. The rule is tested every time it runs. This is what makes software a better container than prose: it fails loudly.

**Capture happens through use, not interview.** Asking an expert to write down what they know requests recall where the knowledge is held as recognition. A system that records the decision as it is made, with one line of reasoning, accumulates the exception structure no documentation project would surface. After a year, that record is more complete than anything the expert could have written from memory.

**Encode the structure; leave the judgment.** Software should absorb the mechanical portion: retrieval of relevant history, eligibility checks, threshold enforcement, routing, assembly of context. What remains is the part that genuinely required a person. This is the answer to the fear that systems flatten expertise into procedure. A well-built system does not encode the expert; it removes from their desk everything that never needed them.

**Treat the exception path as the product.** Most internal systems are designed around the ninety per cent of cases that were never the problem. When the tenth appears, the system cannot express *this one is different, and here is why*, so it routes the case back to the person and the dependency survives intact.

---

## Realistic Business Examples

**Distribution.** A distributor's CRM holds customers, its ERP holds price lists, its matrix holds thresholds. None holds which customers accept a longer lead time for a better price, which supplier's stated dates are optimistic in the fourth quarter, or which orders can be split without a complaint. When the person who quotes is away, quotes are still produced — accurate against the price list, worse against the relationship. The company does not lose the order. It loses margin, and nothing records it.

**Professional services.** A scheduling system knows availability. It does not know which matters overrun their block, which client requires the senior partner regardless of complexity, or which two appointment types should never be adjacent. The result is a calendar that is technically full and operationally fragile.

**Collections.** An aging report ranks receivables by days outstanding and amount. The correct action depends on what the report does not hold: whether a client is slow from cash flow or from paperwork, which pays after one call, and which escalates to legal if pursued too firmly. This is why automated collections often make outcomes worse, and why the controller still works the list by hand.

When automation fails on work of this kind, the usual conclusion is that it cannot be automated. The accurate conclusion is that the system modelled the process and discarded the knowledge.

---

## Practical Principles

1. **Draw the call graph.** For one month, record who is contacted when a situation is unclear, then compare it to the organisation chart. The difference is your real operating structure.
2. **Measure time to independent decision.** Not time to productivity — time until a new hire can decide alone, without checking. It is the most honest measure of how much of your business is undocumented.
3. **Start where decisions are repeated and consequential.** Not the most sophisticated judgment in the company; the most frequent one carrying financial or reputational weight.
4. **Capture at the point of decision.** One required field — *why this one?* — at the moment a non-standard choice is made produces better institutional knowledge in a quarter than a documentation programme does in a year.
5. **Build with the expert, not around them.** Introduced as a replacement, a system earns cooperation without candour, and the exceptions stay unspoken. Their incentive must be leverage: fewer interruptions, better work, a role they can eventually leave.
6. **Design the exception path first.** If the system cannot express a deviation and its reasoning, hard cases route back to the person and nothing structural changes.

---

## The Capsorix Perspective

We begin engagements by looking for who gets called, before examining any existing system. It is a faster route to the real operating model than any process map, and it shows where software will change the business rather than merely digitise it.

We treat that person as the primary design partner rather than a stakeholder interviewed once. Exception structure emerges through sustained collaboration, in fragments, while looking at real cases. It does not emerge from a requirements workshop.

We measure success by whether their role changed shape. If the same person is still answering the same questions after delivery, the project produced software but not capability.

The objective was never to extract someone's knowledge and dispense with the person. It is to give the organisation a memory, so that its most capable operators spend their judgment where it belongs. Companies that handle this well do not lose their best people. They stop wasting them.

---

## Key Takeaways

- Find who gets called. The call graph, not the organisation chart, shows where your knowledge actually sits.
- Track time to independent decision. It measures how much of your business is undocumented.
- Encode the frequent, consequential decisions first — not the most sophisticated ones.
- Capture reasoning at the point of decision rather than commissioning documentation after the fact.
- Design the exception path first, or the hard cases will route back to the same person.
- Judge the result by whether the expert's role shifted from answering to reviewing.

---

## Conclusion

The person who is secretly the software is usually among the most capable operators in the company. Describing them as a risk is both inaccurate and ungenerous; they are the reason the business functions at its current scale.

The problem is not that they exist. It is that the organisation holds no copy of what they know, and no means of making it available to anyone else at the moment it is needed. That is a design failure in the company's systems, not in the person.

Software's role here is narrow and important. It is not to replace judgment, and not to convert expertise into procedure. It is to ensure that judgment is required only where judgment is genuinely required.

The question is not whether your company depends on people. Every company does, and should. The question is whether it depends on them for the things only people can do.

---

## Publishing Notes

**Suggested internal links**

- `/services/business-automation` — anchor on *"embedding the structure of a decision into a workflow"*
- `/services/product-strategy` — anchor on *"software but not capability"*
- `/services/enterprise-software` — anchor on *"treat the exception path as the product"*
- `/insights/` — Knowledge Center index, from the closing section
- Future companion pieces: *Designing the Exception Path*, *Time to Independent Decision as an Operating Metric*, *Why Internal Tools Fail Quietly*

**Suggested external references**

- Michael Polanyi, *The Tacit Dimension* (1966) — the foundational treatment of knowledge that resists articulation.
- Ikujiro Nonaka and Hirotaka Takeuchi, *The Knowledge-Creating Company* (1995) — on converting tacit knowledge into organisational capability.
- The GitLab Handbook (handbook.gitlab.com) — a public, sustained example of institutional knowledge maintained as infrastructure rather than as an initiative.
- Melvin Conway, *How Do Committees Invent?* (1968) — on the correspondence between organisational structure and system design.
