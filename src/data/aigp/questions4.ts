// AIGP question bank — batch 4. Domains III & IV, weighted to the blueprint's
// heaviest competencies, with multi-paragraph case-study scenarios of the kind
// the real exam uses.

import type { Question } from '../../lib/types'

const q = (p: Omit<Question, 'source'>): Question => ({ source: 'authored', ...p })

export const AIGP_QUESTIONS_4: Question[] = [
  // ── III.A (4) ─────────────────────────────────────────────────────────────
  q({
    id: 'ai_q_320',
    type: 'single',
    domain: 'III',
    competency: 'III.A',
    bloomLevel: 'analyze',
    lawRefs: [],
    stem: 'CASE: A logistics firm plans an AI system to allocate shifts to warehouse staff, optimising for throughput. Workers will be ranked by predicted productivity. The project lead says no personal decisions are being made because "the system only suggests a schedule". The governance review should conclude:',
    options: [
      { id: 'a', text: 'No further assessment is needed, since a manager publishes the final schedule' },
      { id: 'b', text: 'The system materially affects earnings and working conditions, so it needs impact assessment, worker information and consultation, meaningful override capacity, and testing for disparate effects — a nominal manager sign-off does not make it non-consequential' },
      { id: 'c', text: 'The only issue is the accuracy of the productivity prediction' },
      { id: 'd', text: 'Employment law is irrelevant because the employer owns the schedule' },
    ],
    correct: ['b'],
    explanation:
      '"It only suggests" is the most common way consequential systems avoid scrutiny. If the recommendation is routinely followed, it drives the outcome — the SCHUFA reasoning in a workplace setting. Algorithmic management of workers also stacks DPIA criteria (scoring, vulnerable subjects, monitoring) and triggers worker-information duties.',
  }),
  q({
    id: 'ai_q_321',
    type: 'multiple',
    domain: 'III',
    competency: 'III.A',
    bloomLevel: 'apply',
    lawRefs: [],
    stem: 'Select THREE things a pre-deployment pilot should be designed to reveal that offline evaluation cannot.',
    options: [
      { id: 'a', text: 'How real users interpret and act on the system’s output' },
      { id: 'b', text: 'Whether the deployment population differs from the training population in practice' },
      { id: 'c', text: 'The model’s training loss curve' },
      { id: 'd', text: 'Operational failure modes at the human and process boundary (handoffs, escalation, workload)' },
      { id: 'e', text: 'The number of model parameters' },
    ],
    correct: ['a', 'b', 'd'],
    explanation:
      'Offline metrics test the model; pilots test the socio-technical system — interpretation, real-world distribution and process fit. Training curves and parameter counts are known before any pilot begins.',
  }),
  q({
    id: 'ai_q_322',
    type: 'single',
    domain: 'III',
    competency: 'III.A',
    bloomLevel: 'apply',
    lawRefs: [],
    stem: 'During design, a team documents its decisions in a running record: use case, alternatives considered, risks identified, mitigations chosen and why, and open issues. The primary governance value is:',
    options: [
      { id: 'a', text: 'It makes the project look thorough to management' },
      { id: 'b', text: 'It creates contemporaneous evidence of reasonable, risk-aware decision-making — reconstructable later for conformity, audits, incidents and liability, when memory and staff have moved on' },
      { id: 'c', text: 'It replaces the need for testing' },
      { id: 'd', text: 'It transfers liability to the individuals who signed off' },
    ],
    correct: ['b'],
    explanation:
      'Governance is judged on what you knew and did at the time. Contemporaneous records are the difference between a defensible decision and an unevidenced assertion — and they cannot be recreated after an incident. Documentation never substitutes for testing or shifts liability onto signatories.',
  }),
  q({
    id: 'ai_q_323',
    type: 'single',
    domain: 'III',
    competency: 'III.A',
    bloomLevel: 'understand',
    lawRefs: [],
    stem: 'In an algorithmic impact assessment, "positionality" refers to:',
    options: [
      { id: 'a', text: 'Where the model is hosted geographically' },
      { id: 'b', text: 'Examining how the assessors’ own perspectives, backgrounds and blind spots shape which harms they notice and whose interests they weigh' },
      { id: 'c', text: 'The position of a feature in the input vector' },
      { id: 'd', text: 'The system’s market positioning' },
    ],
    correct: ['b'],
    explanation:
      'A homogeneous team systematically fails to imagine harms it will never experience — which is why the BoK pairs positionality exercises with stakeholder engagement that deliberately includes diverse demographics, disciplines and lived experience.',
  }),

  // ── III.B (4) ─────────────────────────────────────────────────────────────
  q({
    id: 'ai_q_324',
    type: 'single',
    domain: 'III',
    competency: 'III.B',
    bloomLevel: 'analyze',
    lawRefs: [],
    stem: 'A team wants to improve a medical-triage model’s fairness and proposes simply adding more training data. The most important caveat is:',
    options: [
      { id: 'a', text: 'More data always improves fairness' },
      { id: 'b', text: 'More data helps only if it corrects representation gaps; if the LABELS themselves encode biased historical decisions, additional data of the same kind entrenches the bias' },
      { id: 'c', text: 'Fairness is unrelated to training data' },
      { id: 'd', text: 'More data will slow training unacceptably' },
    ],
    correct: ['b'],
    explanation:
      'Two distinct diagnoses with opposite remedies: sampling gaps need more or better-targeted data, while biased ground truth needs a different label definition, a different target variable or a different approach entirely. Diagnosing which one you have precedes any data collection.',
  }),
  q({
    id: 'ai_q_325',
    type: 'multiple',
    domain: 'III',
    competency: 'III.B',
    bloomLevel: 'apply',
    lawRefs: ['aia:Art.10'],
    stem: 'Select THREE checks that belong in a data-governance review before a dataset is used for training.',
    options: [
      { id: 'a', text: 'Documented lawful rights to collect and use the data for this purpose' },
      { id: 'b', text: 'Representativeness for the population the system will be applied to' },
      { id: 'c', text: 'The file format and compression method' },
      { id: 'd', text: 'Provenance: where it came from, how it was transformed, and who is accountable for it' },
      { id: 'e', text: 'Whether the dataset is stored on SSD or spinning disk' },
    ],
    correct: ['a', 'b', 'd'],
    explanation:
      'Rights, representativeness and provenance are the three questions that determine legal exposure, fairness and auditability. Storage media and file formats are engineering concerns with no governance consequence.',
  }),
  q({
    id: 'ai_q_326',
    type: 'single',
    domain: 'III',
    competency: 'III.B',
    bloomLevel: 'apply',
    lawRefs: [],
    stem: 'A team uses synthetic data to augment a sparse training set. The main governance caution is:',
    options: [
      { id: 'a', text: 'Synthetic data is always unlawful to use' },
      { id: 'b', text: 'Synthetic data inherits the properties and biases of the generator and its source data, and may still carry re-identification risk — so it must be validated for fidelity and privacy rather than assumed safe' },
      { id: 'c', text: 'Synthetic data removes the need for testing' },
      { id: 'd', text: 'Synthetic data cannot improve model performance' },
    ],
    correct: ['b'],
    explanation:
      'Synthetic data is a useful PET but not a privacy or fairness solvent: if generated from biased real data it reproduces those patterns, and poorly generated synthetic data can leak information about real records. Validate both fidelity and privacy properties, and document the analysis.',
  }),
  q({
    id: 'ai_q_327',
    type: 'single',
    domain: 'III',
    competency: 'III.B',
    bloomLevel: 'understand',
    lawRefs: [],
    stem: 'Interpretability testing during development is primarily intended to establish:',
    options: [
      { id: 'a', text: 'That the model runs fast enough in production' },
      { id: 'b', text: 'Whether the factors driving the model’s outputs can be identified and are legitimate for the use case — surfacing reliance on spurious or unacceptable features before release' },
      { id: 'c', text: 'That the training data was encrypted' },
      { id: 'd', text: 'The size of the model file' },
    ],
    correct: ['b'],
    explanation:
      'Interpretability work regularly reveals that a model has latched onto an artefact — a data-collection quirk or a proxy for a protected trait — that produces good test scores for the wrong reasons. Finding that before release is far cheaper than after.',
  }),

  // ── III.C (6) ─────────────────────────────────────────────────────────────
  q({
    id: 'ai_q_328',
    type: 'single',
    domain: 'III',
    competency: 'III.C',
    bloomLevel: 'analyze',
    lawRefs: [],
    stem: 'CASE: Six months after launch, a customer-service model’s accuracy metrics look stable, but complaint volumes about "unhelpful answers" have tripled. Monitoring shows no data drift. The most likely explanation to investigate first is:',
    options: [
      { id: 'a', text: 'The model has been corrupted and must be rolled back immediately' },
      { id: 'b', text: 'The tracked metric does not capture what users actually value — the system may be answering the measured task well while failing the real one (e.g. new product lines, changed policies, or questions outside its scope)' },
      { id: 'c', text: 'Complaints are unrelated to the system' },
      { id: 'd', text: 'Accuracy metrics are always unreliable' },
    ],
    correct: ['b'],
    explanation:
      'Metric–outcome divergence is a classic monitoring failure: instrumentation measures the proxy chosen at launch, while the world and the question mix move on. Complaint signals are real monitoring data — the fix starts with re-examining whether the metric still represents user value, not with an immediate rollback.',
  }),
  q({
    id: 'ai_q_329',
    type: 'multiple',
    domain: 'III',
    competency: 'III.C',
    bloomLevel: 'apply',
    lawRefs: [],
    stem: 'Select THREE elements of a defensible AI incident-management process.',
    options: [
      { id: 'a', text: 'Severity-based triage criteria defined in advance' },
      { id: 'b', text: 'Cross-functional root-cause analysis covering data, model, integration and human factors' },
      { id: 'c', text: 'A rule that incidents are only logged if a customer complains' },
      { id: 'd', text: 'Defined regulatory reporting paths and deadlines' },
      { id: 'e', text: 'Deleting logs after an incident is resolved to reduce liability' },
    ],
    correct: ['a', 'b', 'd'],
    explanation:
      'Pre-agreed severity criteria prevent ad-hoc minimisation under pressure; cross-functional root-cause analysis finds causes that a single team would miss; and reporting paths matter because AI Act serious-incident deadlines are short. Complaint-gated logging guarantees blind spots, and destroying evidence compounds liability.',
  }),
  q({
    id: 'ai_q_330',
    type: 'single',
    domain: 'III',
    competency: 'III.C',
    bloomLevel: 'apply',
    lawRefs: [],
    stem: 'A challenger model outperforms the incumbent champion on offline metrics. Before promoting it, governance should require:',
    options: [
      { id: 'a', text: 'Immediate replacement, since the metrics are better' },
      { id: 'b', text: 'Comparison on fairness and subgroup performance as well as headline accuracy, evaluation on current production-like data, a staged rollout with monitoring, and a documented rollback plan' },
      { id: 'c', text: 'Retention of the champion indefinitely, since change is risk' },
      { id: 'd', text: 'Approval by the vendor' },
    ],
    correct: ['b'],
    explanation:
      'Aggregate improvement can hide subgroup regression, and offline gains do not always survive contact with production. Champion/challenger discipline exists to make model change safe — staged, measured on the dimensions that matter, and reversible.',
  }),
  q({
    id: 'ai_q_331',
    type: 'single',
    domain: 'III',
    competency: 'III.C',
    bloomLevel: 'understand',
    lawRefs: ['aia:Art.12'],
    stem: 'The EU AI Act’s logging requirement for high-risk systems exists primarily to:',
    options: [
      { id: 'a', text: 'Improve model accuracy over time' },
      { id: 'b', text: 'Ensure traceability of the system’s functioning appropriate to its purpose — supporting post-market monitoring, incident investigation and authorities’ ability to reconstruct what happened' },
      { id: 'c', text: 'Allow marketing to analyse user behaviour' },
      { id: 'd', text: 'Satisfy data-retention obligations' },
    ],
    correct: ['b'],
    explanation:
      'Logs are the evidentiary backbone: without them nobody — provider, deployer, authority or affected individual — can establish what the system did and why. Note the tension to manage: logs support accountability while themselves being personal data subject to minimisation and retention limits.',
  }),
  q({
    id: 'ai_q_332',
    type: 'single',
    domain: 'III',
    competency: 'III.C',
    bloomLevel: 'analyze',
    lawRefs: [],
    stem: 'An organisation red-teams its customer-facing LLM once, before launch, and records no further exercises. The governance weakness is:',
    options: [
      { id: 'a', text: 'Red teaming should never be done before launch' },
      { id: 'b', text: 'One-off assurance decays: models are updated, prompts and integrations change, and attack techniques evolve — so red teaming must be periodic and repeated after material change' },
      { id: 'c', text: 'Red teaming should be replaced by accuracy testing' },
      { id: 'd', text: 'Only external firms may perform red teaming' },
    ],
    correct: ['b'],
    explanation:
      'A point-in-time result describes a system that no longer exists after the next model update or integration change, and the adversary landscape moves independently of you. Adversarial assurance belongs on a schedule and in the change-management trigger list.',
  }),
  q({
    id: 'ai_q_333',
    type: 'single',
    domain: 'III',
    competency: 'III.C',
    bloomLevel: 'apply',
    lawRefs: ['aia:Art.72'],
    stem: 'What distinguishes post-market monitoring from ordinary production monitoring?',
    options: [
      { id: 'a', text: 'Nothing — the terms are synonymous' },
      { id: 'b', text: 'Post-market monitoring is a documented, planned regulatory obligation to actively collect and analyse performance and safety data across the system’s lifetime, feeding corrective action and incident reporting — not just operational dashboards' },
      { id: 'c', text: 'Post-market monitoring is performed by the regulator' },
      { id: 'd', text: 'Post-market monitoring only applies after an incident occurs' },
    ],
    correct: ['b'],
    explanation:
      'The distinction is the documented plan, the active and systematic collection duty, and the link to corrective action and reporting. Dashboards are an input to it, not the obligation itself — and the duty runs from market placement, not from the first incident.',
  }),

  // ── IV.A (4) ──────────────────────────────────────────────────────────────
  q({
    id: 'ai_q_420',
    type: 'single',
    domain: 'IV',
    competency: 'IV.A',
    bloomLevel: 'analyze',
    lawRefs: [],
    stem: 'CASE: A bank wants an LLM assistant to answer customers’ account questions using their transaction data. Latency must be low, answers must be current, and regulators expect the bank to explain any answer given. Which architecture best fits these constraints?',
    options: [
      { id: 'a', text: 'A fine-tuned model trained monthly on customer transaction extracts' },
      { id: 'b', text: 'Retrieval-augmented generation over the bank’s live systems of record, with source citations, scoped retrieval per authenticated customer, and logged prompts and responses' },
      { id: 'c', text: 'A public general-purpose chatbot with the transaction data pasted into the prompt by staff' },
      { id: 'd', text: 'A model trained from scratch on the bank’s data' },
    ],
    correct: ['b'],
    explanation:
      'RAG satisfies all three constraints: current data without retraining, citations that make answers explainable and checkable, and per-customer access scoping that keeps one customer’s data out of another’s answer. Fine-tuning on transaction data bakes personal data into weights and goes stale; (c) is an uncontrolled disclosure; (d) is disproportionate.',
  }),
  q({
    id: 'ai_q_421',
    type: 'multiple',
    domain: 'IV',
    competency: 'IV.A',
    bloomLevel: 'apply',
    lawRefs: [],
    stem: 'Select THREE questions that should be answered before adopting an agentic AI system with access to internal tools.',
    options: [
      { id: 'a', text: 'Which actions are irreversible, and which require human approval before execution' },
      { id: 'b', text: 'What least-privilege scopes and spend or rate limits constrain the agent’s tool access' },
      { id: 'c', text: 'How many tokens the underlying model supports' },
      { id: 'd', text: 'How agent actions are logged and how a sequence of actions can be reconstructed and reversed' },
      { id: 'e', text: 'Which colour scheme the interface uses' },
    ],
    correct: ['a', 'b', 'd'],
    explanation:
      'Agentic risk is action risk, so the controls are permissions, approval gates on irreversible steps, and an audit trail supporting reconstruction and rollback. Context-window size is a capability detail; interface styling is irrelevant to risk.',
  }),
  q({
    id: 'ai_q_422',
    type: 'single',
    domain: 'IV',
    competency: 'IV.A',
    bloomLevel: 'understand',
    lawRefs: [],
    stem: 'A team argues that using a smaller model would be "less risky by definition". The accurate response is:',
    options: [
      { id: 'a', text: 'Correct — risk scales directly with model size' },
      { id: 'b', text: 'Risk is driven by the use case, autonomy and consequence, not parameter count; a small model making consequential decisions about people is far riskier than a large model drafting internal meeting notes' },
      { id: 'c', text: 'Smaller models cannot be governed' },
      { id: 'd', text: 'Only frontier models are regulated' },
    ],
    correct: ['b'],
    explanation:
      'Every risk-based regime keys obligations to use and consequence, not capability alone. Model scale affects specific risks (systemic-risk GPAI thresholds, evaluation difficulty, cost) but never determines the risk tier of an application.',
  }),
  q({
    id: 'ai_q_423',
    type: 'single',
    domain: 'IV',
    competency: 'IV.A',
    bloomLevel: 'apply',
    lawRefs: [],
    stem: 'Which consideration most strongly favours an on-premise or private-cloud deployment over a public API for a given use case?',
    options: [
      { id: 'a', text: 'The team prefers to manage infrastructure' },
      { id: 'b', text: 'The data processed is highly sensitive or subject to residency and confidentiality constraints that the vendor’s terms cannot satisfy' },
      { id: 'c', text: 'On-premise models are inherently more accurate' },
      { id: 'd', text: 'Public APIs cannot be monitored' },
    ],
    correct: ['b'],
    explanation:
      'The decisive factor is whether data can lawfully and safely leave your control given residency, confidentiality and contractual constraints. Accuracy is model-specific, monitoring is possible either way, and infrastructure preference is not a governance criterion.',
  }),

  // ── IV.B (3) ──────────────────────────────────────────────────────────────
  q({
    id: 'ai_q_424',
    type: 'single',
    domain: 'IV',
    competency: 'IV.B',
    bloomLevel: 'analyze',
    lawRefs: [],
    stem: 'A vendor’s contract caps total liability at 12 months of fees — roughly €40,000 — for an AI system that will make credit decisions affecting thousands of customers. The governance conclusion is:',
    options: [
      { id: 'a', text: 'Acceptable, since liability caps are standard commercial practice' },
      { id: 'b', text: 'The cap is materially misaligned with the deployer’s realistic exposure (regulatory fines, remediation, collective claims), so it should be negotiated, supplemented with indemnities and insurance, or reflected in a documented risk-acceptance decision at the right level' },
      { id: 'c', text: 'Liability caps are unenforceable, so the term is irrelevant' },
      { id: 'd', text: 'The vendor bears all regulatory liability regardless of contract' },
    ],
    correct: ['b'],
    explanation:
      'Contractual caps do not limit the deployer’s regulatory exposure — the authority pursues the deployer, who then has a capped commercial claim against the vendor. Recognising the gap and deciding consciously (negotiate, insure or accept at the right level) is the governance act.',
  }),
  q({
    id: 'ai_q_425',
    type: 'multiple',
    domain: 'IV',
    competency: 'IV.B',
    bloomLevel: 'apply',
    lawRefs: ['aia:Art.27'],
    stem: 'Select THREE elements an AI Act fundamental-rights impact assessment must address.',
    options: [
      { id: 'a', text: 'The deployment process and the period over which the system will be used' },
      { id: 'b', text: 'The categories of natural persons likely to be affected and specific risks of harm to them' },
      { id: 'c', text: 'The model’s training compute budget' },
      { id: 'd', text: 'Human-oversight measures and the governance and complaint arrangements' },
      { id: 'e', text: 'The vendor’s annual revenue' },
    ],
    correct: ['a', 'b', 'd'],
    explanation:
      'Art. 27 is about deployment reality: how and for how long the system is used, who it affects and how, and what oversight and redress exist. Compute budgets and vendor financials are procurement facts, not fundamental-rights analysis.',
  }),
  q({
    id: 'ai_q_426',
    type: 'single',
    domain: 'IV',
    competency: 'IV.B',
    bloomLevel: 'apply',
    lawRefs: [],
    stem: 'During vendor assessment, the supplier offers a benchmark score showing 94% accuracy. The most useful follow-up question is:',
    options: [
      { id: 'a', text: 'Can you raise it to 97%?' },
      { id: 'b', text: 'On what data, for which population and task, measured how — and how does performance break down across the subgroups and edge cases in our deployment context?' },
      { id: 'c', text: 'Which cloud region produced that number?' },
      { id: 'd', text: 'How long did evaluation take?' },
    ],
    correct: ['b'],
    explanation:
      'A single aggregate number is close to meaningless without its evaluation context: a benchmark on a population unlike yours predicts little, and aggregate accuracy hides subgroup failures. Demanding the disaggregated breakdown is the core vendor-assurance skill.',
  }),

  // ── IV.C (6) ──────────────────────────────────────────────────────────────
  q({
    id: 'ai_q_427',
    type: 'single',
    domain: 'IV',
    competency: 'IV.C',
    bloomLevel: 'analyze',
    lawRefs: [],
    stem: 'CASE: A hospital deploys a vendor triage model. Two months in, clinicians report it under-prioritises patients presenting atypically. The vendor says the model performs to specification and the contract contains no obligation to retrain. What should the hospital do FIRST?',
    options: [
      { id: 'a', text: 'Continue using it, since the vendor confirms specification compliance' },
      { id: 'b', text: 'Treat the clinician reports as a safety signal: log and quantify the pattern, assess patient risk, apply compensating controls (override guidance, escalation rules, or restricting scope) while pursuing the vendor and considering incident-reporting duties' },
      { id: 'c', text: 'Switch off the system without any fallback process' },
      { id: 'd', text: 'Wait for a formal complaint before acting' },
    ],
    correct: ['b'],
    explanation:
      'Specification compliance is not safety: the deployer owns risk in its own context. Frontline reports are primary monitoring evidence, and the deployer can act immediately through operational controls while contractual and reporting routes run in parallel. Abrupt shutdown without a fallback can itself harm patients.',
  }),
  q({
    id: 'ai_q_428',
    type: 'multiple',
    domain: 'IV',
    competency: 'IV.C',
    bloomLevel: 'apply',
    lawRefs: [],
    stem: 'Select THREE practical controls that reduce automation bias among staff using an AI decision-support tool.',
    options: [
      { id: 'a', text: 'Displaying confidence levels and known limitations alongside each recommendation' },
      { id: 'b', text: 'Requiring reviewers to record a brief reason when accepting high-impact recommendations, not only when overriding them' },
      { id: 'c', text: 'Setting throughput targets that assume the AI is correct' },
      { id: 'd', text: 'Auditing override rates and outcomes to detect rubber-stamping' },
      { id: 'e', text: 'Hiding the model’s uncertainty to avoid confusing users' },
    ],
    correct: ['a', 'b', 'd'],
    explanation:
      'Effective mitigations make disagreement feasible and visible: show uncertainty, make acceptance an active judgement rather than the default, and monitor whether oversight is real. Throughput targets premised on model correctness and hidden uncertainty actively manufacture automation bias.',
  }),
  q({
    id: 'ai_q_429',
    type: 'single',
    domain: 'IV',
    competency: 'IV.C',
    bloomLevel: 'apply',
    lawRefs: [],
    stem: 'An organisation wants to measure whether its human-oversight control is genuinely operating. The most informative metric is:',
    options: [
      { id: 'a', text: 'The number of staff trained on the system' },
      { id: 'b', text: 'The override rate together with the OUTCOMES of overridden and non-overridden decisions — showing whether reviewers exercise judgement and whether that judgement is well-calibrated' },
      { id: 'c', text: 'The percentage of decisions reviewed' },
      { id: 'd', text: 'The average time the system takes to produce a recommendation' },
    ],
    correct: ['b'],
    explanation:
      'Review coverage and training counts measure inputs; override behaviour paired with outcomes measures whether oversight changes decisions and whether it changes them for the better. A near-zero override rate and an indiscriminately high one are both warning signs.',
  }),
  q({
    id: 'ai_q_430',
    type: 'single',
    domain: 'IV',
    competency: 'IV.C',
    bloomLevel: 'analyze',
    lawRefs: [],
    stem: 'A generative assistant deployed for internal drafting is found to be producing occasional confidential-sounding details about named colleagues. The most complete governance response is:',
    options: [
      { id: 'a', text: 'Instruct staff not to ask about colleagues' },
      { id: 'b', text: 'Investigate the source (retrieval scope, prompt history reuse, fine-tuning data or memorisation), contain it, assess whether a personal-data breach occurred and notification is required, and add technical controls plus monitoring before resuming full use' },
      { id: 'c', text: 'Disable the assistant permanently' },
      { id: 'd', text: 'Report it to the vendor and take no internal action' },
    ],
    correct: ['b'],
    explanation:
      'This is simultaneously a technical defect, a possible personal-data breach with notification timelines, and a control gap. A user instruction addresses none of the causes, and delegating entirely to the vendor ignores the deployer’s own controller obligations and assessment duties.',
  }),
  q({
    id: 'ai_q_431',
    type: 'single',
    domain: 'IV',
    competency: 'IV.C',
    bloomLevel: 'understand',
    lawRefs: [],
    stem: 'Why should a deployment plan define system-DEACTIVATION criteria before launch rather than during an incident?',
    options: [
      { id: 'a', text: 'To satisfy documentation requirements' },
      { id: 'b', text: 'Because in the middle of an incident the people who could shut it down face pressure, ambiguity and business cost — pre-agreed thresholds and a named authority convert a contested judgement call into a decision someone can actually take' },
      { id: 'c', text: 'Because regulators require deactivation within 24 hours' },
      { id: 'd', text: 'Because systems must be deactivated annually for review' },
    ],
    correct: ['b'],
    explanation:
      'Decisions made calmly in advance survive pressure far better than decisions negotiated during a crisis. Pre-agreed triggers, a named decision owner and a rehearsed fallback are what turn "we can switch it off" from an aspiration into a control.',
  }),
  q({
    id: 'ai_q_432',
    type: 'multiple',
    domain: 'IV',
    competency: 'IV.C',
    bloomLevel: 'apply',
    lawRefs: [],
    stem: 'A deployed AI system is being extended to a new country. Select THREE governance activities that should be repeated rather than assumed to carry over.',
    options: [
      { id: 'a', text: 'Legal analysis — different AI, privacy, sector and employment rules may apply' },
      { id: 'b', text: 'Performance and fairness evaluation on the new population, whose distribution may differ from the original' },
      { id: 'c', text: 'Renaming the system for the local market' },
      { id: 'd', text: 'Impact assessment covering the new deployment context, affected groups and redress routes' },
      { id: 'e', text: 'Re-running the original vendor procurement from scratch' },
    ],
    correct: ['a', 'b', 'd'],
    explanation:
      'Geographic expansion changes the law, the population and the context — the three inputs that drove the original assessment. Rebranding is a marketing task, and re-procuring an existing contracted system is disproportionate unless the terms fail to cover the new jurisdiction.',
  }),
]
