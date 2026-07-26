// Original concept-first teaching notes, one per AIGP competency (BoK v2.1).
// Law cited by article number, standards by number. No third-party text copied.

import type { LearnNote } from '../learn'

export const AIGP_LEARN_NOTES: LearnNote[] = [
  {
    competency: 'I.A',
    summary: `AI governance exists because AI systems differ from ordinary software in ways that defeat ordinary controls. They are PROBABILISTIC rather than deterministic (the same input can yield different outputs, and "correct" becomes a statistical claim), OPAQUE (even builders often cannot explain a specific output), AUTONOMOUS to varying degrees, fast and vast in scale, DATA-DEPENDENT (they inherit whatever the training data encodes), and adaptive — behaviour can drift after release. Harms therefore land at several levels: individuals (civil rights, safety, economic opportunity), groups (discrimination against sub-populations), organisations (reputational, legal, financial), society (democratic process, information integrity, labour displacement) and the ecosystem (energy, water, supply chain). The responsible-AI principles that answer these risks recur across every framework: fairness, safety and reliability, privacy and security, transparency and explainability, accountability, and human-centricity.`,
    keyPoints: [
      'AI traits driving governance: probabilistic, opaque, autonomous, fast/large-scale, data-dependent, drifting',
      'Harm levels: individual · group · organisation · society · ecosystem',
      'Common responsible-AI principles: fairness, safety/reliability, privacy/security, transparency/explainability, accountability, human-centricity',
      'AI is a SOCIO-TECHNICAL system — context of use determines harm, so governance is never purely technical',
    ],
  },
  {
    competency: 'I.B',
    summary: `Governance is organisational plumbing before it is paperwork. Roles must be named — an accountable executive, an AI governance committee or review board, legal/privacy, security, data science, the business owner of each use case, and often an ethics function — because AI risk spans disciplines no single team can cover. Cross-functional collaboration is a requirement, not a nicety: privacy counsel cannot assess model drift, and ML engineers cannot assess discrimination exposure. Training and awareness must reach everyone (the AI Act's AI-literacy duty makes this explicit for providers and deployers), pitched differently for executives, builders and end users. And the programme must be PROPORTIONATE: a 50-person startup and a global bank need different structures, so scale governance to size, maturity, sector, product risk and stated risk tolerance. Finally, know which role you occupy — developer, provider, deployer, or user — because obligations attach to roles, and many organisations occupy several at once.`,
    keyPoints: [
      'Name accountable roles: exec sponsor, AI governance committee, legal/privacy, security, data science, business owner',
      'Cross-functional by necessity — no single discipline can see all AI risk',
      'Training/AI literacy tiered by audience; an AI Act duty, not just good practice',
      'Proportionality: scale the programme to size, maturity, industry, risk tolerance',
      'Role mapping (developer / provider / deployer / user) determines which obligations attach',
    ],
  },
  {
    competency: 'I.C',
    summary: `Policies turn principles into repeatable decisions across the lifecycle: use-case intake and assessment, risk classification, ethics by design, data acquisition and use, development, training and testing, deployment approval, monitoring, documentation, and incident management. Two moves matter most. First, EXTEND rather than duplicate: privacy, security, data governance, records and IP policies already exist — amend them for AI (model retention, training-data provenance, acceptable-use of generative tools) instead of building a parallel rulebook nobody follows. Second, close the third-party gap: most organisations consume far more AI than they build, so procurement standards, vendor due diligence, contractual terms (training-data rights, IP indemnity, security, audit, incident notice, model-change notification) and acceptable-use policies for staff are where governance actually bites. The AI inventory underpins all of it — you cannot govern what you have not catalogued, including shadow AI and AI embedded in purchased software.`,
    keyPoints: [
      'Lifecycle policy coverage: intake → risk classification → design → data → build/test → release → monitor → incidents',
      'Amend existing privacy/security/data-governance/IP policies rather than duplicating them',
      'Third-party risk is the main exposure: procurement standards, due diligence, contract terms, acceptable use',
      'AI inventory/registry (incl. shadow AI and embedded vendor AI) is the foundational control',
    ],
  },
  {
    competency: 'II.A',
    summary: `Privacy law applies to AI in full — there is no AI exception. Transparency: people must be told about processing, and for significant automated decisions given meaningful information about the logic involved. Lawful basis: every purpose in the pipeline needs one, and training on scraped data typically leans on legitimate interests with its three-step test (purpose, necessity, balancing). Purpose limitation constrains reusing operational data for training; minimisation and privacy by design pull toward PETs — anonymisation, pseudonymisation, differential privacy, federated learning, synthetic data. Controller obligations map onto AI directly: DPIAs for high-risk processing, Art. 28 contracts with processors (including model vendors), cross-border transfer mechanisms, data-subject rights (access, erasure and rectification are genuinely hard against trained models), incident and breach handling, and records. Special-category data — notably biometrics — needs an additional condition; note the AI Act's narrow permission to process it specifically for bias detection and correction.`,
    keyPoints: [
      'No AI exception: transparency, lawful basis, purpose limitation, minimisation all apply to training and inference',
      'Art. 22 rights + "meaningful information about the logic" for significant automated decisions',
      'Privacy by design → PETs: anonymisation, pseudonymisation, differential privacy, federated learning, synthetic data',
      'DPIA, processor contracts, transfers, DSRs, breach notification, records — all attach to AI processing',
      'Biometrics/special categories need an extra condition; narrow AI Act carve-out for bias correction',
    ],
  },
  {
    competency: 'II.B',
    summary: `Much of the law governing AI was written before AI. NON-DISCRIMINATION statutes (employment, credit, lending, housing, insurance) reach models that produce disparate impact even where no protected attribute is used as a feature — which is why disaggregated outcome testing is a legal control, not just an ethical one. CONSUMER PROTECTION law (unfair or deceptive practices) polices exaggerated capability claims, "AI washing", and unfair data practices; regulators have ordered deletion of models built on improperly obtained data. PRODUCT LIABILITY is being reformed: the EU's revised Product Liability Directive treats software and AI as products, covers post-market updates and learning behaviour, counts data loss as damage, and eases claimants' burden with disclosure duties and rebuttable presumptions. INTELLECTUAL PROPERTY cuts three ways — rights to use training data (TDM exceptions and opt-outs in the EU, fair-use litigation in the US), infringement risk in output, and the limited protectability of AI-generated content absent human authorship. Sector rules (financial services, medical devices, DSA recommender transparency) layer on top.`,
    keyPoints: [
      'Disparate impact liability applies even without protected attributes as features → test outcomes',
      'Consumer-protection/UDAP: capability claims, AI washing, unfair data practices; algorithmic disgorgement as a remedy',
      'Reformed EU PLD: software/AI are products; covers updates, learning, cybersecurity; presumptions ease proof',
      'IP: rights to train (TDM opt-outs vs fair use), output infringement, human authorship for protection',
      'Sectoral and platform law (e.g. DSA recommender transparency) applies in parallel',
    ],
  },
  {
    competency: 'II.C',
    summary: `AI-specific law converges on a RISK-TIERED design, best seen in the EU AI Act: prohibited practices (Art. 5); high-risk systems (Annex I safety components and Annex III use cases) carrying the heavy regime — risk management (Art. 9), data governance (Art. 10), technical documentation (Art. 11), logging (Art. 12), instructions for use (Art. 13), human oversight (Art. 14), accuracy/robustness/cybersecurity (Art. 15), quality management (Art. 17), conformity assessment and CE marking, and registration; limited-risk transparency duties (Art. 50); and minimal risk. General-purpose AI models get a separate chapter (Art. 53: documentation, copyright policy, training-content summary; Art. 55 adds evaluation, adversarial testing and incident reporting for systemic risk). Obligations attach by ROLE — provider, deployer, importer, distributor — and a deployer becomes a provider by substantially modifying a system or putting its own name on it. Enforcement runs to €35m/7% for prohibited practices, €15m/3% for most other breaches, €7.5m/1% for misleading information. The same architecture recurs elsewhere: Colorado's SB24-205 (consequential decisions, duty of care against algorithmic discrimination, impact assessments), South Korea's AI Framework Act (high-impact AI, generative labelling), and sandboxes for supervised innovation.`,
    keyPoints: [
      'Risk pyramid: prohibited → high-risk (Annex I & III) → transparency (Art. 50) → minimal',
      'High-risk stack: risk mgmt · data governance · tech docs · logs · instructions · human oversight · accuracy/robustness/security · QMS · conformity + CE · registration',
      'GPAI: docs, copyright policy, training-content summary; systemic risk adds evaluation, adversarial testing, incident reporting',
      'Obligations attach by role; substantial modification or own-branding turns a deployer into a provider',
      'Penalties €35m/7% · €15m/3% · €7.5m/1%; sandboxes enable supervised real-world testing',
      'Same pattern globally: Colorado SB24-205, South Korea AI Framework Act',
    ],
  },
  {
    competency: 'II.D',
    summary: `Three instrument families do most of the operational work. The NIST AI RMF (voluntary, US-origin, globally used) organises practice into GOVERN (cross-cutting culture, policy, accountability), MAP (context and risk identification), MEASURE (analysis, TEVV, metrics) and MANAGE (prioritise, respond, monitor), each with categories and subcategories, plus a Playbook, Profiles (notably the Generative AI Profile, AI 600-1) and crosswalks; it defines seven trustworthiness characteristics with valid & reliable as the base. The ISO/IEC family is the certifiable route: 22989 fixes terminology, 42001 defines the auditable AI management system (Annex SL clauses 4–10, Annex A controls, Statement of Applicability, plus BOTH an AI risk assessment and an AI system impact assessment), 42005 gives the impact-assessment method, and 23894 layers AI risk management onto ISO 31000. The OECD supplies the values-based principles and a classification framework for describing any system (people & planet, economic context, data & input, AI model, task & output). Practical point: NIST gives vocabulary and evidence, ISO gives certifiable process, and both map onto AI Act duties — one well-built programme can serve all three.`,
    keyPoints: [
      'NIST AI RMF: Govern · Map · Measure · Manage + Playbook, Profiles (GenAI 600-1), crosswalks; 7 trustworthiness characteristics',
      'ISO/IEC 22989 terminology · 42001 certifiable AIMS · 42005 impact assessment · 23894 risk mgmt on ISO 31000',
      '42001 requires an AI risk assessment AND an AI system impact assessment (individuals, groups, society)',
      'OECD: values-based principles + classification framework dimensions',
      'NIST = vocabulary/evidence, ISO = certifiable process, both crosswalk to AI Act obligations',
    ],
  },
  {
    competency: 'III.A',
    summary: `Governing design starts before any model is chosen. Define the BUSINESS CONTEXT and use case precisely — what decision is being made, about whom, with what consequence — because everything downstream (risk tier, oversight design, metrics) follows from it; the first honest question is whether AI is the right tool at all. Then perform or review an IMPACT ASSESSMENT, extending PIA/DPIA machinery to algorithmic harms. Risk work is structured, not intuitive: identify internal and external risks and contributing factors, plot them on a PROBABILITY/SEVERITY harms matrix, and apply a RISK MITIGATION HIERARCHY — avoid or eliminate the risk first, then reduce it by design, then add controls and human oversight, and only then transfer or accept residual risk with documented justification. Stakeholder mapping (including affected people who are not users) and pre-deployment pilots surface what internal review misses. Architecture and model selection is itself a governance decision: an interpretable model may be worth a small accuracy loss where the decision is consequential. Document as you go — technical documentation must exist before market placement, and undocumented design rationale cannot be evidenced later.`,
    keyPoints: [
      'Define use case, affected people and consequence first; ask whether AI is warranted at all',
      'Perform/review an impact assessment early, extending PIA/DPIA practice',
      'Probability/severity harms matrix + mitigation hierarchy: avoid → reduce by design → control/oversee → transfer → accept & justify',
      'Stakeholder mapping incl. non-user affected people; pilots and benchmarking before scale',
      'Model selection trades accuracy against interpretability — a governance call, not just a technical one',
      'Document contemporaneously (AI Act: technical documentation before placing on the market)',
    ],
  },
  {
    competency: 'III.B',
    summary: `Data governance decides most of a model's risk profile. Establish LAWFUL RIGHTS to collect and use every dataset — privacy basis, licence terms, TDM opt-outs, contractual restrictions — and document them; "we found it online" is not a right. Assess data QUALITY, QUANTITY, INTEGRITY and FIT-FOR-PURPOSE: representativeness for the deployment population is the fairness lever (the Amazon recruiting failure was a data problem, not an algorithm problem), and statistical sampling exposes gaps. Record LINEAGE AND PROVENANCE — where each dataset came from, how it was transformed, which model versions consumed it — because reproducing results, honouring deletion requests and investigating incidents all depend on it. Then plan and perform testing as a programme, not an afterthought: unit and integration tests, validation and performance testing on held-out data, security testing (data and model poisoning, adversarial examples, extraction), BIAS testing disaggregated across groups, and interpretability checks. Watch for leakage between training and test sets, and for evaluation that merely reproduces historically biased outcomes. Document methods and results so conformity, audits and later retraining can rely on them.`,
    keyPoints: [
      'Document lawful rights to collect/use each dataset — privacy basis, licences, TDM opt-outs, contract limits',
      'Assess quality, quantity, integrity, fit-for-purpose; representativeness for the DEPLOYMENT population drives fairness',
      'Lineage and provenance: dataset → transformation → model version, needed for reproducibility, DSRs and incidents',
      'Testing programme: unit/integration, validation, performance, security (poisoning, adversarial, extraction), bias, interpretability',
      'Avoid train/test leakage and metrics that validate historical bias',
    ],
  },
  {
    competency: 'III.C',
    summary: `Release is a gate, not an event. Assess READINESS against pre-agreed criteria and prepare release artefacts — the model card or fact sheet (intended use, out-of-scope uses, training data summary, disaggregated performance, limitations), conformity documentation, and instructions for use. After launch the obligations grow rather than end: run CONTINUOUS MONITORING for performance decay, DATA DRIFT (input distribution shifts) and CONCEPT DRIFT (the input–output relationship itself changes), plus latency, cost and abuse signals, on a defined maintenance, update and retraining schedule. Periodic deeper assurance layers on top: audits, RED TEAMING, threat modelling and security testing. Incidents need a managed pipeline — detection, triage by severity, response, root-cause analysis with cross-functional stakeholders (brittleness, poor robustness, data-quality gaps, insufficient testing, drift), documentation, and regulatory reporting where required (AI Act serious-incident duties and post-market monitoring plans). Version every model and bind it to the datasets and code that produced it, so rollback is real. And keep transparency current: technical documentation, deployer instructions and public disclosures must reflect the system as it is now, not as it launched.`,
    keyPoints: [
      'Readiness gate + model card/fact sheet (intended use, out-of-scope uses, disaggregated performance, limitations)',
      'Continuous monitoring: performance decay, DATA drift vs CONCEPT drift, latency/cost, misuse signals',
      'Periodic assurance: audits, red teaming, threat modelling, security testing',
      'Incident pipeline: detect → triage → respond → root cause → document → report (AI Act serious incidents)',
      'Version models and bind them to datasets/code so rollback and reproduction are possible',
      'Keep technical documentation, deployer instructions and public disclosures current post-release',
    ],
  },
  {
    competency: 'IV.A',
    summary: `Deployment decisions start with fit, not features. Establish the USE-CASE CONTEXT: business objective, required performance and error tolerance (a false positive in fraud triage is not a false positive in medical triage), data availability and sensitivity, ethical constraints, and workforce readiness to actually operate the system. Then choose the MODEL TYPE deliberately — classic ML (predictable, cheaper, easier to validate and explain) versus generative (flexible, but confabulation-prone and harder to evaluate); proprietary API (fast, but you inherit vendor choices and export your data) versus open-weights (control and on-premise options, but you own the safety and maintenance burden); small models (cheap, deployable at the edge) versus large; language versus multimodal. Finally the DEPLOYMENT ARCHITECTURE: cloud, on-premise or edge (data residency, latency, cost, control), and how to adapt the model — as-is, prompt engineering, RETRIEVAL-AUGMENTED GENERATION (grounding answers in your own current sources, which usually beats fine-tuning for factual accuracy and keeps knowledge updatable), fine-tuning (style and task specialisation, at the cost of a training pipeline and its data-governance burden), or agentic architectures, whose autonomy and tool access materially raise the risk profile.`,
    keyPoints: [
      'Context first: objective, error tolerance, data availability/sensitivity, ethics, workforce readiness',
      'Classic vs generative; proprietary API vs open weights; small vs large; language vs multimodal — each a risk trade-off',
      'Cloud vs on-premise vs edge: residency, latency, cost, control',
      'Adaptation ladder: as-is → prompting → RAG (grounding, updatable) → fine-tuning (style/task, heavier governance) → agentic (highest risk)',
      'Buying does not transfer accountability — the deployer still owes oversight, monitoring and transparency',
    ],
  },
  {
    competency: 'IV.B',
    summary: `Assessment before deployment has three strands. First, perform or review an IMPACT ASSESSMENT on the selected system — even when someone else built it, since harms materialise in YOUR context, with your data and your population; where the AI Act applies, public bodies and certain private deployers owe a fundamental-rights impact assessment (Art. 27) that may build on an existing DPIA. Second, work the VENDOR AGREEMENT as a risk instrument: what data the vendor may use for its own training, IP ownership and indemnity for outputs, security and sub-processor terms, service levels and accuracy claims, audit and evidence rights, notice of model changes or deprecation, incident notification timelines, liability caps against your realistic exposure, and exit/portability. Ask for the ISO/IEC 42001 certificate SCOPE, model cards and evaluation results — not marketing claims. Third, understand what changes when you deploy your OWN proprietary model: you take on provider-level obligations and far higher potential liability, but gain control over data, evaluation and fixes. Third-party AI is not third-party accountability — the deployer answers to its own regulators and customers.`,
    keyPoints: [
      'Impact-assess the system in YOUR deployment context; AI Act Art. 27 FRIA for public bodies and certain deployers',
      'Vendor contract as control: training-data use, IP/indemnity, security, SLAs, audit rights, model-change and incident notice, liability caps, exit',
      'Demand evidence: certificate scope, model cards, evaluation results — not marketing claims',
      'Building your own model shifts you toward provider obligations and higher liability, with more control',
      'Procuring AI never outsources accountability',
    ],
  },
  {
    competency: 'IV.C',
    summary: `Governing use in production means running the controls you promised. Apply the policies operationally: data governance for inputs (staff pasting confidential data into a chatbot is the classic failure), risk and issue management, access controls, and USER TRAINING that covers the system's limits and the automation-bias trap — people over-trust confident-sounding output, which is exactly how a nominally human-in-the-loop control becomes a rubber stamp. Monitor continuously (performance, drift, misuse, cost) on a defined schedule, with periodic audits, red teaming, threat modelling and security testing. Document incidents, issues, risks and post-market monitoring plans. Deliberately FORECAST SECONDARY AND UNINTENDED USES — a tool built for one purpose will be pointed at another, and downstream harm is foreseeable if you look — and constrain them technically as well as contractually. Maintain external COMMUNICATION PLANS: user-facing AI disclosure, notice to affected individuals, explanation and redress channels, regulator contacts. Finally, build and test a KILL SWITCH: a documented policy and technical controls to deactivate, restrict or localise the system for regulatory, safety or performance reasons — with a decision owner and a fallback process, because "turn it off" is worthless if nobody may authorise it and no manual process still exists.`,
    keyPoints: [
      'Operational controls: input data governance, access control, issue management, user training on limits and automation bias',
      'Human-in-the-loop only works with authority, time, information and incentives to overrule',
      'Continuous monitoring + periodic audits, red teaming, threat modelling, security testing',
      'Forecast secondary/unintended uses and downstream harms; constrain technically, not just contractually',
      'External communication: AI disclosure, notice, explanation, redress, regulator channels',
      'Deactivation/localisation policy with a named decision owner, tested fallback and rollback',
    ],
  },
]
