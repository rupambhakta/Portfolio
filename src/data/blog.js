// ─────────────────────────────────────────────────────────────
// BLOG CONTENT. Add a post by dropping a new object in `posts`.
// `body` is written in a small subset of Markdown (see components/blog/
// Markdown.jsx): ## / ### headings, **bold**, *italic*, `code`, > quotes,
// - lists, 1. lists, ```code blocks```, [links](url), ![alt](img), and ---.
// Keep the copy human: no em dashes anywhere.
// ─────────────────────────────────────────────────────────────

// Banner art per post. Swap any of these for your own image (see the banner
// prompt guide) by dropping a file in assets/blog/ and importing it here.
import coverVoice from '../assets/blog/voice-assistant-that-books-its-own-meetings.svg'
import coverAutomation from '../assets/blog/which-tasks-are-worth-automating.svg'
import coverSeo from '../assets/blog/multi-agent-seo-model-routing.svg'
import coverShipping from '../assets/blog/shipping-fast-without-shipping-junk.svg'
import coverWorkflow from '../assets/blog/multi-agent-workflow-architecture-hero.webp'
import workflowArchitecture from '../assets/blog/multi-agent-workflow-architecture-diagram.svg'
import workflowRecovery from '../assets/blog/multi-agent-workflow-recovery-flow.svg'
import coverUseCase from '../assets/blog/how-to-choose-an-ai-agent-use-case-hero.webp'
import decisionFunnel from '../assets/blog/ai-agent-use-case-decision-funnel.svg'
import autonomyLadder from '../assets/blog/ai-agent-autonomy-control-ladder.svg'
import coverChatbot from '../assets/blog/custom-ai-agent-vs-chatbot-hero.webp'
import chatInterfaceSystems from '../assets/blog/chatbot-agent-interface-systems.svg'
import chatbotComparison from '../assets/blog/chatbot-vs-custom-agent-comparison.svg'
import capabilityLadder from '../assets/blog/chatbot-to-custom-agent-capability-ladder.svg'
import blogSchedule from './blog-schedule.json'

// Page-level copy for /blog.
export const blogMeta = {
  eyebrow: 'The Journal',
  title: ['Notes from', 'the build.'],
  intro:
    'Field notes on AI agents, automation, and shipping full-stack products that people actually use. No hype, just what worked, what broke, and what I would do differently.',
}

// Each post carries a `tint` (ember / violet / cyan / green) used for its
// cover and accents, so the listing stays colourful without leaning on red.
const postSource = [
  {
    slug: 'custom-ai-agent-vs-chatbot',
    title: 'Custom AI Agent vs Chatbot: Which Does Your Business Actually Need?',
    excerpt:
      'A practical comparison for choosing the smallest conversational system that can solve the real workflow.',
    tag: 'AI Agents',
    tint: 'violet',
    cover: coverChatbot,
    coverAlt: 'Abstract comparison of a simple chatbot path and a branching custom AI agent workflow with business tools and an approval checkpoint.',
    ogImage: '/images/blog/custom-ai-agent-vs-chatbot-og.webp',
    heroLines: ['CHATBOT OR', 'CUSTOM AGENT?'],
    heroSubline: 'CHOOSE THE SMALLEST SYSTEM THAT SOLVES THE WORKFLOW.',
    date: '2026-08-19',
    featured: true,
    author: 'Rupam Bhakta',
    seoTitle: 'Custom AI Agent vs Chatbot: Which Does Your Business Actually Need?',
    metaDescription:
      'Compare a custom AI agent vs chatbot by workflow, autonomy, tool use, risk, cost, and business value before choosing what to build.',
    body: `Businesses often ask for a chatbot when they actually need workflow automation. Others ask for an AI agent when a focused chatbot would be cheaper, faster, and easier to control.

The interface does not settle the question. Both systems can appear as the same chat bubble on a website. The difference is what happens behind that interface.

When comparing a custom AI agent vs chatbot, choose a chatbot if the job is mainly to answer approved questions, collect information, and route a conversation along known paths. Choose a custom agent only when the system must decide what to do next, use tools, maintain workflow state, and take bounded actions across several steps.

## Custom AI agent vs chatbot: the short answer

A chatbot is usually the right choice when the conversation itself is the product. It answers questions, gathers details, recommends the next page, or hands the user to a person.

A custom AI agent is justified when conversation is only the entry point. The real job continues after the message: inspect context, select a tool, complete a sequence of actions, check the result, and decide whether to continue or escalate.

The comparison is easiest to make by looking at the workflow behind the interface:

- Main purpose: a chatbot holds a useful conversation; a custom agent completes a bounded business workflow.
- Path: a chatbot follows mostly predefined routes; an agent chooses dynamically within explicit limits.
- Knowledge: a chatbot uses FAQs, documents, product, or policy content; an agent combines knowledge with live workflow state.
- Tool use: a chatbot may have no tool or one narrow lookup; an agent may use several approved read or action tools.
- Actions: a chatbot collects, recommends, routes, and hands off; an agent may create, update, schedule, analyse, or coordinate.
- Risk: a chatbot usually risks a poor answer or missed handoff; an agent can affect records, customers, money, or operations.
- Evaluation: a chatbot is judged on answer quality and conversation completion; an agent also needs end-to-end task, tool, policy, and recovery checks.
- Typical build: a chatbot is smaller and easier to maintain; an agent needs more integration, testing, monitoring, and governance.

This is not a hierarchy. An agent is not automatically better. It carries more capability and therefore needs more control.

[OpenAI's practical guide to building agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) distinguishes agents from LLM applications that do not let the model control workflow execution. It describes an agent as a system that manages a workflow, selects tools, checks progress, and can halt or return control to a person [1].

![A chat interface can hide two very different systems: one responds along a known path, while the other controls part of a workflow.](${chatInterfaceSystems})

## What I mean by a chatbot

The word “chatbot” covers several levels of capability. I separate them by what the system is allowed to do.

### Scripted chatbot

A scripted chatbot follows a decision tree. It can show buttons, collect contact details, ask a fixed sequence of questions, and route the user based on selected answers.

This is a good fit when the business process is stable and the available choices are known. There is little reason to add model-driven decision-making if a predictable flow already solves the problem.

### Grounded AI chatbot

A grounded chatbot uses an LLM to understand natural language and answer from approved business content. Retrieval can bring relevant passages from policies, services, or product documents into the response.

The model provides flexible language. The application still controls the workflow. It decides which sources are available, when to request contact details, when to refuse, and when to hand off.

### Tool-assisted chatbot

A chatbot may also use one tightly constrained tool, such as checking appointment availability or looking up an order status. That does not automatically make the whole product an autonomous agent.

I still treat it as a chatbot when the application calls the tool at a known point and the model is not deciding how to execute a broader workflow.

## What changes when it becomes a custom AI agent

A custom agent has responsibility for part of the process, not only the conversation.

It may:

- interpret a goal from an open-ended request;
- decide which information is missing;
- select from several approved tools;
- plan or revise the next step using tool results;
- maintain state across a multi-step task;
- stop when a success condition is met;
- pause for human approval or hand off when it reaches a boundary.

[Anthropic's guidance on building effective agents](https://www.anthropic.com/engineering/building-effective-agents) draws a useful architectural distinction. A workflow follows code paths defined in advance. An agent dynamically directs its own process and tool use. Its guidance also recommends starting with the simplest solution and adding complexity only when the outcome improves enough to justify the extra cost and latency [2].

![Comparison diagram showing a chatbot answering, collecting, and routing along a known path, and a custom agent planning, using tools, and acting through an approval gate.](${chatbotComparison})

## Choose a chatbot when the conversation is the job

I would start with a chatbot when most of these statements are true:

- The main need is to answer recurring questions from approved content.
- The conversation follows a small number of predictable routes.
- The system collects details but a person completes the work.
- A wrong answer can be contained through citation, refusal, or handoff.
- The required information changes occasionally, not every hour.
- The business wants a visible, auditable experience rather than autonomous execution.

Good examples include:

- an FAQ assistant for services, policies, locations, and opening hours;
- a lead-capture bot that asks qualifying questions and sends the result to a team;
- a product-finder that recommends from a controlled catalogue;
- a support assistant that retrieves approved troubleshooting steps;
- an appointment enquiry flow that collects details before staff confirm the booking.

In these cases, a focused chatbot is usually easier to evaluate. You can test whether it used the right source, answered accurately, collected required fields, and handed off at the correct point.

## Choose a custom AI agent when the workflow is the job

An agent becomes useful when the next step depends on context and the system must act on the result.

I would consider one when:

- the task spans several systems or tools;
- the order of steps changes by case;
- inputs are unstructured or incomplete;
- the system must inspect results before choosing the next action;
- a person currently spends time coordinating the workflow rather than simply answering questions;
- success can be defined and checked at the end of the task;
- permissions, approvals, retry limits, and handoff rules can be made explicit.

Examples include:

- reviewing an inbound lead, enriching the company record, scoring fit, drafting outreach, and updating the CRM;
- reading a support request, checking the account and order, proposing a resolution, updating the ticket, and escalating exceptions;
- researching a topic across approved sources, producing a structured report, validating required sections, and requesting missing evidence;
- coordinating appointment availability, collecting required details, booking a slot, sending confirmation, and recording the outcome.

The word “custom” matters because these workflows depend on a business's own systems, policies, permissions, data model, and definition of done. The model is one component. The product also needs application logic, tool interfaces, authentication, state, logging, evaluations, and recovery behaviour.

## The hybrid option is usually the best starting point

Many useful products sit between a basic chatbot and an open-ended agent.

[GetParlix](/work/getparlix) is a useful example from my own product work. The user sees a conversational assistant, but the product is designed around a bounded business outcome. It can answer from uploaded business information, collect booking details, check availability, prevent double-booking, send confirmations, and hand the conversation to a person when needed.

I would not describe every turn as autonomous. The reliable design comes from keeping deterministic controls around high-value facts and actions. The model handles natural language and chooses within a narrow workflow. The application owns permissions, booking rules, validation, and handoff.

That hybrid pattern often gives a business most of the value it expects from an “agent” without granting broad freedom on day one.

![Start with the least capable system that solves the problem. Add autonomy only when the workflow genuinely needs it.](${capabilityLadder})

## The hidden cost is not the chat interface

The conversation UI is often the simplest part of either build. The cost difference appears behind it.

### Knowledge and data

A chatbot needs clean source content and a way to retrieve it. An agent also needs live operational data, well-defined tool inputs, stable identifiers, and rules for conflicting information.

### Integrations and permissions

A chatbot may read documents. An agent may read and change business systems. Each action needs authentication, authorisation, parameter validation, audit logs, and least-privilege access.

### Failure recovery

A poor chatbot response can often be corrected in the conversation. A poor agent decision may create a duplicate booking, send the wrong message, change a record, or trigger several downstream actions.

That requires idempotency, retry limits, approval checkpoints, safe stopping conditions, and a clear owner for exceptions.

[OWASP's agentic AI guidance](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) warns that excessive agency can turn one mistaken decision into changes across multiple connected systems. It recommends decomposing high-impact operations, using minimal credentials, favouring reversible actions, and requiring confirmation before irreversible changes [3].

### Evaluation and operations

For a chatbot, I test answer accuracy, source use, refusal behaviour, lead capture, and handoff. For an agent, I also test every tool call, state transition, permission boundary, recovery path, and final business outcome.

[NIST's Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence) treats risk management as ongoing work across design, development, deployment, use, and evaluation [4]. That lifecycle view matters more as the system gains access and autonomy.

## A decision test for your business

Before choosing either system, write down the workflow and answer these questions:

- What exact outcome should the system produce? If the answer is only “talk to customers,” define the conversation's purpose.
- Does the path change by case? If the steps are stable, a scripted or grounded chatbot may be enough.
- Must it use live tools? Separate read-only lookups from actions that change state.
- Who owns the result? Every automated workflow needs an operational owner.
- What is the worst plausible mistake? Record whether it is reversible and who would be affected.
- Where must a person approve or take over? Put the checkpoint before the high-impact action.
- How will success be tested? Use representative cases and observable pass conditions.
- Can the first version do less? Remove tools, permissions, and branches until only the essential workflow remains.

If the useful outcome ends after the answer or handoff, build the chatbot. If the useful outcome requires several context-dependent actions, prototype a bounded agent. If only one action is needed, a hybrid assistant may be the better design.

## Red flags that should stop an agent build

I would pause the project when:

- nobody can define the workflow or the final outcome;
- policies conflict and no owner can resolve them;
- the first release needs broad permission to send, delete, publish, pay, or modify records;
- there is no representative test set;
- success depends on subjective impressions of whether the agent “seems smart”;
- the process changes faster than the team can maintain instructions and integrations;
- a simple form, search feature, or deterministic automation already solves the job.

These do not always kill the idea. They usually mean the scope needs to shrink before development starts.

## Frequently asked questions

### Is an AI agent just a more advanced chatbot?

No. A chatbot is a conversational interface. An agent is a system that controls part of a workflow, selects tools or steps, observes results, and works toward a defined outcome. A product can use chat as the interface for either architecture.

### Can a chatbot book appointments or update a CRM?

Yes. A chatbot can call a narrow tool at a predefined point. It becomes more agent-like when the model decides which actions to take, in what order, and whether the workflow is complete.

### Is a custom AI agent more expensive than a chatbot?

Usually. The agent needs more integrations, permissions, workflow state, evaluations, monitoring, and failure recovery. The real cost depends on the number of tools, the impact of actions, data quality, and how much human review remains.

### Should a small business start with a chatbot or an AI agent?

Start with the smallest system that produces value. For most first projects, that is a grounded chatbot or a tool-assisted assistant with one controlled action. Add broader agent behaviour only after the narrow workflow is measured and reliable.

## Build the capability the workflow requires

The right choice is not based on which term sounds more advanced. It is based on where the useful work ends.

If the business needs accurate answers, structured lead capture, and a clean handoff, a chatbot is probably enough. If it needs a system to coordinate several context-dependent steps across tools, a custom agent may be justified.

I prefer to start one level lower than the initial request. Prove the knowledge, conversation, tool, and evaluation separately. Then add autonomy where it removes real coordination work without removing control.

If you have a workflow in mind, [send me the process](/contact). I will tell you honestly whether it needs a chatbot, a bounded agent, or simpler automation.

## References

1. [OpenAI, A practical guide to building agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/), accessed August 17, 2026.
2. [Anthropic, Building effective agents](https://www.anthropic.com/engineering/building-effective-agents), published December 19, 2024, accessed August 17, 2026.
3. [OWASP GenAI Security Project, LLM06:2025 Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/), accessed August 17, 2026.
4. [NIST, Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence), updated April 8, 2026, accessed August 17, 2026.`,
  },
  {
    slug: 'how-to-choose-an-ai-agent-use-case',
    title: 'How to Choose the Right AI Agent Use Case Before You Build',
    excerpt:
      'A practical framework for deciding whether a workflow needs an agent, a simpler automation, or no software change yet.',
    tag: 'AI Agents',
    tint: 'cyan',
    cover: coverUseCase,
    coverAlt: 'Abstract workflow paths narrowing to one controlled AI agent use case.',
    ogImage: '/images/blog/how-to-choose-an-ai-agent-use-case-og.webp',
    heroLines: ['CHOOSE THE RIGHT', 'AI AGENT USE CASE'],
    heroSubline: 'BOUND THE WORKFLOW. MEASURE THE OUTCOME. CONTROL THE RISK.',
    date: '2026-08-18',
    featured: true,
    author: 'Rupam Bhakta',
    seoTitle: 'How to Choose the Right AI Agent Use Case Before You Build',
    metaDescription:
      'Learn how to choose an AI agent use case by testing workflow fit, business value, data readiness, failure risk, permissions, and measurable success.',
    body: `The most expensive AI agent mistake usually happens before anyone writes code. A team starts with the technology, finds an impressive demo, and then tries to force a business process into it.

I start from the opposite direction. I look for a bounded workflow with a clear owner, useful data, repeated decisions, and an outcome that can be checked. Only then do I ask whether an agent is the smallest system that can handle it.

If you are working out how to choose an AI agent use case, assess six things before you build: the workflow boundary, the need for judgment, the actions and tools involved, the available data, the cost of failure, and the definition of success. A good agent use case needs flexibility that fixed rules cannot provide, but it must still operate inside explicit controls.

## How to choose an AI agent use case: the short answer

A strong use case usually has these characteristics:

- People already perform the workflow and can explain its goal.
- The work contains ambiguity, exceptions, or unstructured information.
- The system needs to choose between steps or tools as the situation changes.
- Inputs, policies, and example outcomes are available.
- The workflow happens often enough to justify the build and ongoing maintenance.
- High-impact actions can be constrained, approved, reversed, or handed to a person.
- Success can be measured on real tasks, not by whether a demo looks intelligent.

If most of those statements are false, I would not start with an agent. A form, rules engine, search feature, scheduled automation, or better process may solve the problem with less cost and less operational risk.

[OpenAI's practical guide to building agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) makes a similar distinction. It recommends agents where workflows involve complex decisions, difficult-to-maintain rules, or heavy use of unstructured data. It also says a deterministic solution may be enough when those conditions are absent [1].

That distinction matters. An agent is not a more fashionable name for every automation.

![A use case should pass each decision gate before it reaches an agent prototype.](${decisionFunnel})

## Start with the workflow, not the model

“We need an AI agent” is not yet a use case. It is a technology preference.

A usable starting point sounds more like this:

> When a new website enquiry arrives, identify the person's intent, answer from approved business information, collect the details needed for a booking, check availability, and ask for human help when the request falls outside policy.

That statement gives me something I can design. It has a trigger, an outcome, boundaries, required information, tools, and an escalation condition.

Before discussing a model or framework, write the workflow in one sentence:

> When [trigger] happens, the system should [outcome] using [approved information and tools], except when [handoff or stop condition].

If the team cannot complete that sentence consistently, the process is probably not ready to automate. An agent will not repair unclear ownership, conflicting policies, or missing data. It will make those problems move faster.

## Six tests I use before recommending an agent

### 1. Is the outcome specific and owned?

Choose one outcome that a person is responsible for today. “Improve customer service” is too broad. “Prepare a complete draft response for a support ticket and route uncertain cases to the service manager” is testable.

I want to know:

- What starts the workflow?
- What does done look like?
- Who owns the result?
- Where must the agent stop?
- What should happen when information is missing?

A clear boundary prevents the first version from becoming a vague assistant with too many tools and no reliable definition of completion.

### 2. Does the work require judgment?

Agents earn their complexity when the next step cannot always be chosen with a stable if/then rule.

Good signals include:

- interpreting free-text enquiries, emails, documents, or conversations;
- applying policy to cases with exceptions;
- deciding which source or tool is relevant;
- planning several dependent steps;
- asking a useful follow-up question when context is incomplete.

If the task is “copy a value from this field into that system every Friday,” use conventional automation. If it is “read an enquiry, work out what the person needs, collect missing details, and choose the right workflow,” an agent may be justified.

### 3. Does it need to act, or only assist?

Separate knowledge work from action.

An assistant may retrieve information, summarise a document, classify a request, or draft a response. An agent controls part of the workflow and may call tools to check a calendar, update a record, create a task, or send a message.

This gives me a useful progression:

- Read-only: retrieve, classify, or summarise.
- Draft: prepare an action for a person to approve.
- Low-risk action: perform reversible actions within a narrow scope.
- High-impact action: require explicit approval, deterministic validation, or a human handoff.

The best first version is often read-only or draft mode. It lets the team test reasoning quality before granting live permissions.

### 4. Are the knowledge and tools ready?

An agent cannot reliably apply a policy that exists only in one employee's memory. It also cannot complete a workflow if the required systems are inaccessible or inconsistent.

Check whether you have:

- approved source documents and policies;
- representative examples of normal and difficult cases;
- APIs or controlled interfaces for necessary actions;
- clear user identities and permission scopes;
- structured records for facts that must be exact;
- a person who can resolve conflicts in the source material.

This is where many promising ideas fail their first review. The missing work is not prompt engineering. It is cleaning knowledge, defining policy, or exposing a safe tool.

### 5. Is the value large enough to maintain the system?

Do not count only build time. An agent also needs evaluations, monitoring, model and prompt changes, integration maintenance, security review, and someone to own exceptions.

Estimate the current workflow using real operating data:

- cases per week;
- minutes per case;
- percentage of cases that follow a repeatable pattern;
- waiting time or missed-opportunity cost;
- error and rework rate;
- cost of review after automation;
- ongoing infrastructure and maintenance cost.

A frequent, slow workflow with consistent inputs may be a strong candidate. A rare task that saves five minutes but requires access to sensitive systems probably is not.

### 6. Can failure be contained and measured?

Every agent will eventually encounter an input it did not handle during development. The question is not whether failure is possible. The question is what the system can do when it is wrong.

[OWASP's Excessive Agency guidance](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) describes the risk created by unnecessary functionality, excessive permissions, or too much autonomy. Its guidance is practical: minimise available tools and permissions, enforce authorisation outside the model, and require approval for high-impact actions [2].

For each proposed action, record:

- the worst plausible mistake;
- whether the action is reversible;
- the data or people affected;
- the permission required;
- the approval rule;
- the retry limit;
- the handoff owner;
- the log needed to investigate it.

[NIST's Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence) treats risk management as work across design, development, use, and evaluation, not a final checklist added at launch [3]. I use the same principle at the use-case stage. If the team cannot describe the risk owner and control path, the use case is not ready.

![Increase autonomy only as permissions, reversibility, monitoring, and approval controls become stronger.](${autonomyLadder})

## Score the use case before you prototype

I use a simple scorecard to compare ideas. It is a decision aid, not a scientific model. Score each factor from 0 to 2.

- Workflow clarity: 0 if the goal and owner are unclear, 1 if the goal is clear but exceptions are not, and 2 if the goal, owner, boundary, and handoff are clear.
- Need for judgment: 0 if stable rules solve it, 1 if some interpretation is needed, and 2 if context and exceptions drive the next step.
- Tool use: 0 if no external action is needed, 1 if one controlled tool is needed, and 2 if several tools or dependent actions are required.
- Data readiness: 0 if sources conflict or are missing, 1 if useful data needs cleanup, and 2 if approved sources and examples are available.
- Business value: 0 for a rare or low-cost task, 1 for moderate volume or delay, and 2 for frequent, slow, costly, or time-sensitive work.
- Failure control: 0 if failure is high-impact and hard to contain, 1 if review can contain most errors, and 2 if actions are bounded, reversible, or approved.
- Evaluation readiness: 0 if success is subjective, 1 if some checks are available, and 2 if representative tasks and pass criteria exist.

Use the total as a conversation starter:

- 0–5: Fix the process or use a simple tool.
- 6–9: Test an AI-assisted feature, usually read-only or draft-first.
- 10–12: A bounded single-agent prototype may be justified.
- 13–14: Strong candidate, but still start with the smallest controlled workflow.

A high score does not automatically justify a multi-agent design. It only says the business problem may justify agent behaviour.

## Choose the smallest sufficient system

Once the use case passes the screen, choose the least complex architecture that can handle it.

### Rules or workflow automation

Choose this when steps and conditions are stable. A typical example is moving a submitted form into a CRM and notifying the owner.

### AI-assisted feature

Choose this when language understanding helps, but a person owns execution. Summarising a support ticket and drafting a reply is a good example.

### Single bounded agent

Choose this when the system must choose tools or steps within one clear goal, such as answering approved questions, collecting booking details, and checking availability.

### Multi-agent workflow

Choose this when the work contains distinct specialist roles, separate context, or independently testable stages, such as researching, analysing, planning, drafting, validating, and assembling a structured output.

This is visible across my own product work. [GetParlix](/work/getparlix) fits a bounded agent pattern because the conversational workflow can answer from business information, collect booking details, check availability, and hand off when needed. [Seowyn](/work/seowyn) has a different shape: one website input leads through a multi-agent pipeline to specialised SEO deliverables and a prioritised plan. [HeatMapIQ](/work/heatmapiq) is the useful counterexample. Its rule-based engine can produce a complete report, while AI enrichment is optional. The product does not need to make AI the only path to value.

That last pattern is worth remembering. Sometimes the right AI agent use case is actually an ordinary software product with one carefully chosen AI layer.

## Define the evaluation before the build

Do not wait for a prototype to decide what good means.

Create a small set of representative tasks from the real workflow, including normal cases, incomplete inputs, policy exceptions, tool failures, and requests that should be refused or handed off. Remove personal or confidential data unless it is explicitly approved for testing.

For each task, define checks such as:

- Was the final outcome correct?
- Did the agent use the right source and tool?
- Were tool parameters valid?
- Did it avoid prohibited actions?
- Did it ask for missing information?
- Did it stop or escalate at the right point?
- How much human correction was required?
- What were the latency and run cost?

[Anthropic's evaluation guidance](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) separates deterministic checks, model-based graders, and human review. It also distinguishes capability evaluations from regression evaluations that protect behaviour the system already handles [4]. The practical lesson is that no single score is enough. Test outcomes, tool use, policy compliance, and human judgment together.

If a team cannot assemble representative tasks or agree on a pass condition, I treat that as a warning. They may still have an interesting demo idea, but not a deployable use case.

## Use a staged validation plan

Before funding a full product, I would validate the use case in five stages:

1. Map the current workflow. Record triggers, inputs, decisions, actions, exceptions, owners, and systems.
2. Collect representative cases. Include easy cases, edge cases, missing data, tool failures, and handoff situations.
3. Build a narrow prototype. Use read-only access or draft mode. Give it one goal and the minimum tools.
4. Run the evaluation set. Measure task completion, correction rate, policy violations, latency, cost, and escalation quality.
5. Decide with evidence. Expand, redesign, reduce the scope, switch to deterministic automation, or stop.

Stopping is a valid outcome. A short prototype that proves an agent is unnecessary can save more money than a successful demo.

## Common use cases I would reject or reshape

I would pause an agent build when:

- the underlying process changes every week;
- nobody owns the outcome or exceptions;
- the task is infrequent and low-value;
- the required knowledge is outdated or contradictory;
- success cannot be distinguished from a confident-sounding answer;
- the first version needs broad write, send, delete, publish, or payment permissions;
- a mistake would create legal, safety, financial, or customer harm without meaningful review;
- the team wants multiple agents before proving one bounded workflow.

These are not permanent rejections. Most can be reshaped. Narrow the goal, improve the source data, start in draft mode, keep a person at the approval point, or automate only the deterministic part.

## Frequently asked questions

### What makes a good AI agent use case?

A good AI agent use case is a bounded, repeated workflow that needs contextual judgment, uses available data and tools, creates enough value to maintain, and has measurable outcomes plus clear failure controls.

### When should I use automation instead of an AI agent?

Use conventional automation when the workflow follows stable rules, inputs are structured, and each step can be defined in advance. It will usually be cheaper, faster, and easier to test.

### Should I start with one agent or multiple agents?

Start with one bounded agent. Add specialised agents only when separate roles, context, permissions, or evaluations make the workflow easier to control and test.

### How do I measure whether an AI agent is successful?

Measure task completion, factual and policy accuracy, correct tool use, escalation quality, human correction, latency, cost, and failures on representative real-world tasks. Track regression tests as the system changes.

## The decision comes before the architecture

The right place to begin is not a model comparison or an orchestration diagram. It is a workflow that is clear enough to evaluate and valuable enough to maintain.

Choose a real process. Bound the outcome. Identify where judgment is necessary. Restrict the tools. Put a person at high-impact decisions. Define the tests before granting autonomy.

That is how I decide whether an agent is worth building. It also makes the architecture much easier to choose.

If you have a repetitive workflow in mind, [send me the process](/contact). I will tell you honestly whether it needs an agent, a simpler automation, or a process fix first.

## References

1. [OpenAI, A practical guide to building agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/), accessed August 17, 2026.
2. [OWASP GenAI Security Project, LLM06:2025 Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/), accessed August 17, 2026.
3. [NIST, Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence), accessed August 17, 2026.
4. [Anthropic, Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), accessed August 17, 2026.`,
  },
  {
    slug: 'multi-agent-workflow-architecture',
    title: 'Multi-Agent Workflow Architecture: Reliable Systems Under Control',
    excerpt:
      'How I used bounded roles, code-led orchestration, durable state, validation, and human gates to keep a complex agent workflow inspectable and recoverable.',
    tag: 'AI Agents',
    tint: 'ember',
    cover: coverWorkflow,
    coverAlt: 'Multi-agent workflow architecture hero showing a controlled orchestration rail and bounded specialist nodes.',
    ogImage: '/images/blog/multi-agent-workflow-architecture-og.webp',
    heroLines: ['BUILDING RELIABLE', 'MULTI-AGENT WORKFLOW', 'ARCHITECTURE WITH CONTROL'],
    heroSubline: 'BOUNDED ROLES. DURABLE STATE. HUMAN GATES.',
    date: '2026-08-16',
    featured: true,
    author: 'Rupam Bhakta',
    seoTitle: 'Multi-Agent Workflow Architecture: Reliable Control by Design',
    metaDescription:
      'See how a reliable multi-agent workflow architecture uses bounded agents, durable state, validation, retries, and human approval without losing control.',
    body: `A reliable multi-agent system needs a control plane that can explain what runs next, why it runs, and when it must stop.

A multi-agent workflow architecture fails when nobody can answer a simple question: who owns the next decision?

That was the core constraint behind Seowyn. The platform starts with one website address and turns it into a foundation audit, keyword and competitor research, content assets, campaign planning, and a prioritised 90-day roadmap. The [public case study](/work/seowyn) describes a multi-agent pipeline with model routing. The difficult part was never making several models produce text. It was keeping the workflow observable when tasks ran for different lengths, depended on earlier evidence, or failed for different reasons.

My direct answer is this: reliability comes from putting autonomy inside a deterministic control plane. A coordinator owns state and sequence. Specialist agents receive narrow contracts. Every output is validated before it can become another agent's input. Long-running work is queued. Retries have budgets. High-impact or ambiguous results stop at a human gate.

## The problem was coordination, not model intelligence

A single model can often complete a surprisingly long task. Splitting work across agents only earns its complexity when the task has distinct reasoning domains, incompatible toolsets, or stages that benefit from parallel execution. [OpenAI's agent guidance](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) makes the same point: start with one agent, then split when complex instructions or overlapping tools become difficult to manage [1].

Seowyn crosses that line because a technical audit, keyword discovery, competitor evidence, long-form writing, and a 90-day plan are different jobs. They need different inputs, tools, output formats, and quality checks. Treating them as one enormous conversation would make the run hard to resume, compare, or diagnose.

The architecture therefore separates two kinds of work:

- The control plane decides what may run, what it depends on, how many times it may retry, and what constitutes completion.
- The model plane handles bounded reasoning inside a task contract. It can suggest and synthesise, but it cannot silently redefine the workflow.

## The multi-agent workflow architecture

![Control-led architecture from request through bounded specialist agents, validation, synthesis, and a human approval gate.](${workflowArchitecture})

The diagram is deliberately asymmetric. Agents are not peers chatting until they agree. A central coordinator owns the run. That manager pattern is useful when one component must combine specialist outputs and enforce shared controls. [OpenAI's orchestration documentation](https://openai.github.io/openai-agents-python/multi_agent/) distinguishes this from handoffs, where a specialist takes over the interaction [2].

## 1. Make each agent sign a contract

An agent should not receive the entire project history and a vague request to help. It should receive a versioned input, an allowed tool set, an output schema, a retry limit, and a clear stop condition. This reduces accidental scope growth and makes failures comparable across runs.

The following is a synthetic, valid JSON example. It illustrates the contract shape and does not expose Seowyn's private prompts or source code.

\`\`\`json
{
  "job_id": "seo_01HXYZ",
  "task": "keyword_research",
  "input_refs": ["site_snapshot:v3"],
  "allowed_tools": ["search_data_api"],
  "output_schema": "KeywordSetV2",
  "max_attempts": 3,
  "requires_human_approval": false
}
\`\`\`

The important detail is that the contract stores references to approved inputs rather than copying an uncontrolled transcript into every prompt. It also gives the validator something concrete to check.

## 2. Keep business state outside the model conversation

Chat history is context, not a reliable database. The run needs a durable record of task status, input versions, produced artefacts, validation results, attempt count, and reason codes. Seowyn's published stack includes PostgreSQL, Redis, and Celery. That combination supports a useful separation: durable business records belong in the database, while queue messages coordinate work that may be retried or redelivered.

[Celery's task documentation](https://docs.celeryq.dev/en/stable/userguide/tasks.html) warns that tasks should ideally be idempotent because messages can be delivered again. It also supports bounded retries, exponential backoff, and jitter [3]. Idempotency means that running the same task twice with the same inputs does not create unintended duplicate effects.

Database transactions still need care. [PostgreSQL's transaction documentation](https://www.postgresql.org/docs/18/mvcc.html) explains how Read Committed gives each command a fresh snapshot, while stronger isolation can reject conflicting work and require the application to retry [5]. In practice, the workflow should use uniqueness constraints, compare-and-set transitions, or row locks where duplicate task claims would be harmful.

## 3. Parallelise evidence collection, not dependent decisions

Parallel work is useful when tasks do not depend on one another. Audit checks, keyword discovery, and competitor collection may be able to fan out after the website snapshot is ready. The synthesis stage must wait for the required evidence set.

[Celery's workflow primitives](https://docs.celeryq.dev/en/stable/userguide/canvas.html) map cleanly to this idea. A group runs independent tasks in parallel, a chain links dependent steps, and a chord runs a callback only after a group has completed [4]. The documentation also warns that synchronisation has overhead. Parallelism should therefore reflect the dependency graph, not a desire to make the architecture look more agentic.

## Control comes from explicit gates

The most important control is not a longer system prompt. It is an executable gate between stages. I use four kinds of gate in this architecture pattern:

- Schema gate. Reject malformed or incomplete output before another task can consume it.
- Evidence gate. Require source references for claims that will influence later recommendations.
- Policy gate. Block actions outside the task's allowed tools, tenant boundary, or data scope.
- Human gate. Pause when the decision is ambiguous, high-impact, irreversible, or intended for publication.

Guardrails are layered. [OpenAI's guidance](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) describes input, tool-use, and output guardrails, together with human intervention for sensitive or failure-prone workflows [1]. No single check proves that an answer is correct. The aim is to catch different failure classes at the boundary where they become actionable.

## Failure must have a named next state

![Failure recovery state diagram showing accepted, running, validating, succeeded, retry wait, human review, and failed states.](${workflowRecovery})

A generic failed flag is not enough. A timeout, invalid schema, rate limit, missing source, policy rejection, and human-review request have different next actions. Each transition should carry a run ID, task ID, input version, route, attempt count, timestamp, and reason code.

This is also why live progress should be an event stream rather than an optimistic spinner. Seowyn's published stack includes WebSockets. [FastAPI's WebSocket support](https://fastapi.tiangolo.com/advanced/websockets/) allows a client and server to keep a connection open and exchange messages, which is suitable for pushing state transitions to the interface [6]. The browser should still be able to reload the canonical run state from the API after a disconnect.

## What this architecture does not solve

More control does not remove uncertainty. A validator can accept a plausible but weak answer. Two agents can repeat the same source and create false confidence. A model route that worked last month can change after a provider update. Queue delivery guarantees do not automatically make business effects safe.

The architecture limits the blast radius, preserves evidence, and makes a run resumable. It does not guarantee perfect research, rankings, or business outcomes. Model and prompt changes still need versioning and evaluation against representative tasks. Sensitive actions still need explicit authorisation.

## What I would keep boring

The durable parts of this system are conventional software: task contracts, state transitions, database constraints, logs, timeouts, retry budgets, and approval queues. Model names can change without forcing the workflow to change. That is the point of model routing, which I discuss in [Multi-agent SEO: putting four models on one job](/blog/multi-agent-seo-model-routing). The same discipline appears in [shipping fast without shipping junk](/blog/shipping-fast-without-shipping-junk): define what must stay true before optimising the clever part.

The [Seowyn case study](/work/seowyn) shows the product context behind this architecture. Its public workflow starts with one URL and produces twelve deliverables plus a prioritised 90-day roadmap. The reliability lesson is smaller: every autonomous step needs a bounded role, durable state, a validator, and a clear owner when the machine cannot decide.

## The lesson

A reliable multi-agent workflow architecture is not a room full of capable agents. It is a controlled sequence of contracts, state transitions, and gates. Code owns the workflow. Models handle the uncertain reasoning inside it. Humans retain authority over the decisions that deserve judgement.

If your team has a multi-step workflow that feels too fragile to automate, send me the workflow through the [contact page](/contact). I will tell you honestly where agents help, where deterministic code is safer, and where a human should stay in the loop.

## References

1. [OpenAI, A practical guide to building agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/).
2. [OpenAI Agents SDK, Agent orchestration](https://openai.github.io/openai-agents-python/multi_agent/).
3. [Celery 5.6 documentation, Tasks](https://docs.celeryq.dev/en/stable/userguide/tasks.html).
4. [Celery 5.6 documentation, Canvas: Designing Workflows](https://docs.celeryq.dev/en/stable/userguide/canvas.html).
5. [PostgreSQL 18 documentation, Concurrency Control](https://www.postgresql.org/docs/18/mvcc.html).
6. [FastAPI documentation, WebSockets](https://fastapi.tiangolo.com/advanced/websockets/).`,
  },
  {
    slug: 'voice-assistant-that-books-its-own-meetings',
    title: 'How I built a 24/7 assistant that books its own meetings',
    excerpt:
      'A chat and voice agent that answers questions, qualifies leads, and puts real meetings on a calendar. Here is the architecture, the parts that were hard, and the parts that surprised me.',
    tag: 'AI Agents',
    tint: 'ember',
    cover: coverVoice,
    date: '2026-06-24',
    featured: true,
    author: 'Rupam Bhakta',
    body: `Most "AI chat" widgets are a search box wearing a costume. They answer a question and then go quiet. I wanted the opposite: an assistant that treats a conversation like a job, carries it forward, and ends with something useful on the calendar.

That became GetParlix, a 24/7 chat and voice assistant that drops onto any website with one line of code. This is how it works under the hood.

## The shape of the problem

A good assistant has to do four things well, and they pull in different directions:

- Answer accurately from a specific business's own material, not the open internet.
- Hold the thread across a long back and forth without losing context.
- Know when a visitor is a real lead and move them toward a booking.
- Stay fast enough that talking to it never feels like waiting.

If you optimise only for accuracy you get something slow and cautious. If you optimise only for speed you get something confidently wrong. The interesting work is in the balance.

## Retrieval first, generation second

Every client uploads their own documents: pricing, policies, product notes, FAQs. I chunk that content, embed it, and store the vectors in **PostgreSQL with pgvector**. When a visitor asks something, the assistant retrieves the most relevant chunks and answers *from those*, with the raw model only used to phrase the reply.

> The model is not the source of truth. The client's documents are. The model is just the voice.

This one decision removes most hallucination. If the answer is not in the retrieved context, the assistant says so and offers to connect the visitor with a human instead of inventing a number.

## Voice without the awkward pauses

The voice layer runs on the **OpenAI Realtime API** over a WebSocket, so audio streams both ways instead of waiting for a full turn to finish. The trick that made it feel natural was letting the model start speaking as soon as it had a confident opening, then continue as retrieval finished in the background.

\`\`\`js
// Stream partial audio the moment the first sentence is ready,
// instead of blocking on the full response.
socket.on('response.audio.delta', (chunk) => {
  speaker.play(chunk)
})
\`\`\`

## Booking is a first-class feature, not a link

The part people underrate: qualifying and booking. The assistant asks a couple of natural questions, decides whether the visitor fits, and if they do it opens a real slot and writes the meeting to the calendar. No "here is a link, good luck." The booking engine is its own service so it can enforce availability and avoid double-booking.

### What surprised me

1. Visitors trust a bot that admits what it does not know far more than one that always has an answer.
2. Voice sessions are longer and convert better than chat, but only when latency stays under about a second.
3. Ninety percent of the value came from retrieval quality, not from the model choice.

## Where it goes next

The next step is memory across visits, so a returning lead does not start from zero. But the core lesson holds: an assistant is only worth embedding if a business can trust it to run without someone watching it. Build for that trust first, and the wow follows.`,
  },
  {
    slug: 'which-tasks-are-worth-automating',
    title: 'The automation mindset: which tasks are actually worth it',
    excerpt:
      'Not everything repetitive should be automated. A simple, honest way to decide what to build, what to leave alone, and how to avoid automating a mess.',
    tag: 'Automation',
    tint: 'cyan',
    cover: coverAutomation,
    date: '2026-06-10',
    author: 'Rupam Bhakta',
    body: `The fastest way to waste a month is to automate the wrong task really well. I have done it, so now I run every idea through the same short filter before writing a line of code.

## The three questions

Before automating anything, I ask:

1. **How often does it actually happen?** Not how annoying it is, how *frequent*. A painful task you do twice a year is a bad target.
2. **Is the process stable?** If the steps change every week, you will spend more time maintaining the automation than you saved.
3. **What happens when it fails?** Automation fails silently and at scale. If a failure is expensive and hard to notice, you need guardrails before you need speed.

If a task is frequent, stable, and safe to get wrong occasionally, it is a strong candidate. Miss any one of those and I think twice.

## Do not automate a mess

Here is the trap. When a workflow is messy, automation feels like the fix. It is not. You are just making the mess run faster.

> Fix the process on paper first. If you cannot explain it in five plain steps, it is not ready to be automated.

Clean, then automate. Every time I skipped the clean step, I regretted it.

## Start with the boring 80 percent

The highest return is almost never the clever, edge-case-heavy part. It is the boring, high-volume middle. Copying data between two tools. Sending the same three follow-ups. Formatting a report the same way every Monday.

Automate that first, watch it for a week, and only then reach for the hard parts. The unglamorous wins compound quietly, and they rarely break.

## A quick gut check

If you can describe the task to a new teammate in two sentences and they could do it correctly, a machine probably can too. If it takes you ten minutes and a lot of "it depends," leave it with a human for now.`,
  },
  {
    slug: 'multi-agent-seo-model-routing',
    title: 'Multi-agent SEO: putting four models on one job',
    excerpt:
      'Seowyn runs a coordinated team of AI agents that audit a site and return a real growth plan. Here is why several models beat one, and how the routing actually works.',
    tag: 'AI Agents',
    tint: 'violet',
    cover: coverSeo,
    date: '2026-05-28',
    author: 'Rupam Bhakta',
    body: `One model doing everything is simple to build and mediocre at everything. The moment I split the work across specialised agents, quality jumped. Seowyn is the result: a platform where a team of agents audits a site, researches competitors, and hands back a ninety day growth plan with ready-to-use deliverables.

## Why more than one model

Different models are genuinely good at different things, and pretending otherwise leaves quality on the table.

- One model is a strong, structured researcher.
- Another writes with a warmer, more human voice.
- A third is cheap and fast, perfect for high-volume classification.
- A fourth is excellent at strict, schema-bound output.

Routing each step to the model that fits it is the whole game.

## The orchestration layer

A coordinator breaks a job into tasks and dispatches each to the agent best suited for it. The heavy, long-running work runs on background workers with **Celery and Redis**, so the interface stays responsive while a full audit runs for minutes.

\`\`\`python
ROUTES = {
    "keyword_research": "reasoning-heavy",
    "draft_article":    "warm-writer",
    "classify_intent":  "fast-cheap",
    "structured_audit": "schema-strict",
}

def route(task):
    return ROUTES.get(task.kind, "default")
\`\`\`

Each agent returns structured output, the coordinator stitches the pieces together, and the user watches real-time progress instead of a spinner.

## Guardrails matter more than cleverness

With several models in play, the failure modes multiply. So every agent's output is validated against a schema before it moves downstream. If an agent returns something malformed, it is retried or routed elsewhere, and the run keeps going.

> A multi-agent system is only as trustworthy as its weakest validation step. Spend your time there.

## The takeaway

Multi-agent is not about stacking models for show. It is about matching each unit of work to the tool that does it best, then being strict about what each one is allowed to hand off. Do that, and a pipeline of ordinary steps produces a result no single model could.`,
  },
  {
    slug: 'shipping-fast-without-shipping-junk',
    title: 'Shipping fast without shipping junk',
    excerpt:
      'Speed and quality are not opposites. A short, practical checklist I run before anything I build goes in front of real users.',
    tag: 'Full-Stack',
    tint: 'green',
    cover: coverShipping,
    date: '2026-05-15',
    author: 'Rupam Bhakta',
    body: `"Move fast" gets a bad name because people hear "skip the basics." That is not it. Moving fast means having a small set of non-negotiables that are so routine they cost you almost nothing, so you can be reckless about everything else.

## My pre-ship checklist

None of this is clever. That is the point.

1. **It works on a phone.** Most first visits are mobile. If it breaks on a small screen, it is broken.
2. **The error states exist.** Empty, loading, and failed are real screens, not afterthoughts.
3. **Nothing secret is in the client.** Keys live on the server. Always.
4. **One real user could use it without me.** If it needs a tour, it needs work.

That is the whole list for a first release. Four things, done every time.

## Boring architecture, interesting product

The product should be interesting. The stack under it should be boring and predictable: **React** on the front, a clean **REST API**, a database you understand, and deployment you can repeat in your sleep. Save your creativity for the thing the user actually touches.

> Boring infrastructure is a feature. It fails less, and it fails in ways you can predict.

## Ship, watch, then decide

The last step is the one people skip: ship the smallest honest version, then *watch it* with real usage before adding anything. Half the features I was sure I needed turned out to be unnecessary once I saw how people actually used the thing.

Fast and careful are not a trade. They are the same habit, practised until it is quiet.`,
  },
]

// The source bundle contains every authored post, but only posts marked
// published in the schedule are exposed to the journal and route resolver.
const scheduleBySlug = new Map(blogSchedule.map((entry) => [entry.slug, entry]))
export const posts = postSource.filter((post) => scheduleBySlug.get(post.slug)?.status === 'published')

// ── helpers ───────────────────────────────────────────────────
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return `${MONTHS[m - 1]} ${d}, ${y}`
}

export function readingTime(body) {
  const words = body.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export const allTags = ['All', ...Array.from(new Set(posts.map((p) => p.tag)))]

export function getPost(slug) {
  return posts.find((p) => p.slug === slug)
}

// Posts other than `slug`, newest first, for the "keep reading" section.
export function relatedPosts(slug, n = 2) {
  return posts.filter((p) => p.slug !== slug).slice(0, n)
}

// Previous (older) and next (newer) post, by list order (newest first).
export function adjacentPosts(slug) {
  const i = posts.findIndex((p) => p.slug === slug)
  return {
    newer: i > 0 ? posts[i - 1] : null,
    older: i >= 0 && i < posts.length - 1 ? posts[i + 1] : null,
  }
}
