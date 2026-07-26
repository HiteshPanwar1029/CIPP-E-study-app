// AIGP reference layer — the instruments, standards and frameworks the BoK
// names. Summaries are authored originally; laws are cited by article number
// and standards by their number and title (facts, not copyrightable text).

import type { LawRef } from '../../lib/types'

export const AIGP_REFS: LawRef[] = [
  // ── AI-specific law: EU AI Act ────────────────────────────────────────────
  {
    id: 'aia:Art.3',
    instrument: 'EU AI Act',
    citation: 'Art. 3',
    title: 'Definitions — AI system, provider, deployer',
    plainSummary:
      'Defines an AI system as a machine-based system operating with varying levels of autonomy, that may show adaptiveness, and that infers from input how to generate outputs (predictions, content, recommendations, decisions) influencing environments. Also fixes the role vocabulary: provider (develops and places on the market under its own name), deployer (uses under its own authority), importer, distributor.',
    domain: 'II',
    competency: 'II.C',
  },
  {
    id: 'aia:Art.5',
    instrument: 'EU AI Act',
    citation: 'Art. 5',
    title: 'Prohibited AI practices',
    plainSummary:
      'Bans subliminal or manipulative techniques causing significant harm, exploitation of vulnerabilities, social scoring by public or private actors leading to detrimental treatment in unrelated contexts, predictive policing based solely on profiling, untargeted scraping of facial images, emotion recognition in workplaces and education, biometric categorisation to infer sensitive attributes, and real-time remote biometric identification in public spaces for law enforcement (narrow authorised exceptions).',
    domain: 'II',
    competency: 'II.C',
  },
  {
    id: 'aia:Art.6',
    instrument: 'EU AI Act',
    citation: 'Art. 6 & Annex III',
    title: 'High-risk classification',
    plainSummary:
      'Two routes into high risk: (1) the AI is a safety component of a product covered by Annex I harmonisation law requiring third-party conformity assessment; (2) the use case is listed in Annex III — biometrics, critical infrastructure, education, employment, essential public and private services (incl. credit and insurance), law enforcement, migration, and administration of justice. A filter allows systems that perform only narrow procedural tasks to escape the classification, but profiling of natural persons is always high risk.',
    domain: 'II',
    competency: 'II.C',
  },
  {
    id: 'aia:Art.9',
    instrument: 'EU AI Act',
    citation: 'Art. 9',
    title: 'Risk management system',
    plainSummary:
      'High-risk providers must run a continuous, iterative risk-management process across the whole lifecycle: identify and analyse known and reasonably foreseeable risks to health, safety and fundamental rights; estimate risks from intended use and reasonably foreseeable misuse; adopt targeted mitigations; and test to verify them. Residual risk must be judged acceptable and communicated.',
    domain: 'II',
    competency: 'II.C',
  },
  {
    id: 'aia:Art.10',
    instrument: 'EU AI Act',
    citation: 'Art. 10',
    title: 'Data and data governance',
    plainSummary:
      'Training, validation and testing data must meet quality criteria: relevant, sufficiently representative, and to the best extent possible free of errors and complete for the intended purpose; with examination for possible biases and appropriate mitigation. Permits processing of special-category data strictly where necessary for bias detection and correction, subject to safeguards.',
    domain: 'III',
    competency: 'III.B',
  },
  {
    id: 'aia:Art.11',
    instrument: 'EU AI Act',
    citation: 'Art. 11 & Annex IV',
    title: 'Technical documentation',
    plainSummary:
      'Technical documentation must be drawn up BEFORE the system is placed on the market and kept up to date, demonstrating conformity and giving authorities what they need to assess it — system description, design choices, training methodologies and datasets, validation and testing procedures, metrics, and the risk-management system.',
    domain: 'III',
    competency: 'III.A',
  },
  {
    id: 'aia:Art.12',
    instrument: 'EU AI Act',
    citation: 'Art. 12',
    title: 'Record-keeping (logging)',
    plainSummary:
      'High-risk systems must technically allow automatic recording of events (logs) over their lifetime, to a degree appropriate to the intended purpose — enabling traceability, post-market monitoring and investigation of incidents.',
    domain: 'III',
    competency: 'III.C',
  },
  {
    id: 'aia:Art.13',
    instrument: 'EU AI Act',
    citation: 'Art. 13',
    title: 'Transparency and instructions for use',
    plainSummary:
      'High-risk systems must be sufficiently transparent for deployers to interpret output and use it appropriately, accompanied by instructions for use covering characteristics, capabilities, limitations, expected performance, known risks, human-oversight measures and maintenance. This is the provider-to-deployer information duty (distinct from Art. 50 user-facing transparency).',
    domain: 'II',
    competency: 'II.C',
  },
  {
    id: 'aia:Art.14',
    instrument: 'EU AI Act',
    citation: 'Art. 14',
    title: 'Human oversight',
    plainSummary:
      'High-risk systems must be designed so natural persons can effectively oversee them: understand capacities and limits, stay aware of automation bias, correctly interpret output, decide not to use the system or disregard/override it, and intervene or stop it. Oversight must be built into the design, not merely assigned in a policy.',
    domain: 'II',
    competency: 'II.C',
  },
  {
    id: 'aia:Art.15',
    instrument: 'EU AI Act',
    citation: 'Art. 15',
    title: 'Accuracy, robustness and cybersecurity',
    plainSummary:
      'High-risk systems must achieve appropriate levels of accuracy, robustness and cybersecurity and perform consistently across their lifecycle. Declared accuracy metrics go in the instructions for use. Addresses resilience to errors and inconsistencies, feedback loops from continued learning, and AI-specific attacks such as data poisoning, model poisoning, adversarial examples and model evasion.',
    domain: 'II',
    competency: 'II.C',
  },
  {
    id: 'aia:Art.17',
    instrument: 'EU AI Act',
    citation: 'Art. 17',
    title: 'Quality management system',
    plainSummary:
      'Providers of high-risk AI must operate a documented QMS covering the regulatory compliance strategy, design and testing procedures, data management, the risk-management system, post-market monitoring, incident reporting, communications with authorities, record keeping and accountability. This is where ISO/IEC 42001 evidence maps most directly.',
    domain: 'II',
    competency: 'II.C',
  },
  {
    id: 'aia:Art.26',
    instrument: 'EU AI Act',
    citation: 'Art. 26',
    title: 'Obligations of deployers',
    plainSummary:
      'Deployers must use high-risk systems per the instructions for use, assign human oversight to competent, trained and resourced people, ensure input data is relevant and sufficiently representative for the intended purpose, monitor operation, keep logs, inform workers’ representatives before workplace deployment, and notify the provider and authorities of serious incidents or risks.',
    domain: 'IV',
    competency: 'IV.C',
  },
  {
    id: 'aia:Art.27',
    instrument: 'EU AI Act',
    citation: 'Art. 27',
    title: 'Fundamental rights impact assessment (FRIA)',
    plainSummary:
      'Deployers that are public bodies, or private entities providing public services, plus deployers of credit-scoring and life/health insurance pricing systems, must assess before first use: the deployment process and period, categories of persons affected, specific risks of harm to them, human-oversight measures, and governance/complaint arrangements. May build on an existing DPIA rather than duplicate it.',
    domain: 'IV',
    competency: 'IV.B',
  },
  {
    id: 'aia:Art.43',
    instrument: 'EU AI Act',
    citation: 'Art. 43 & 48',
    title: 'Conformity assessment, declaration and CE marking',
    plainSummary:
      'Before placing a high-risk system on the market the provider runs a conformity assessment — internal control for most Annex III systems, or a notified-body assessment where required — then draws up the EU declaration of conformity and affixes the CE marking. Substantial modification restarts the obligation.',
    domain: 'II',
    competency: 'II.C',
  },
  {
    id: 'aia:Art.49',
    instrument: 'EU AI Act',
    citation: 'Art. 49 & 71',
    title: 'EU database registration',
    plainSummary:
      'Providers (and public-authority deployers) of Annex III high-risk systems must register in a public EU database before placing on the market or putting into service — the transparency backbone that lets the public and regulators see which high-risk systems are in use.',
    domain: 'II',
    competency: 'II.C',
  },
  {
    id: 'aia:Art.50',
    instrument: 'EU AI Act',
    citation: 'Art. 50',
    title: 'Transparency for certain AI systems',
    plainSummary:
      'Applies regardless of risk tier: tell people when they are interacting with an AI system unless obvious; mark synthetic audio, image, video and text in a machine-readable way; disclose emotion-recognition and biometric-categorisation use; and label deep fakes (with an exception for evidently artistic or satirical work).',
    domain: 'II',
    competency: 'II.C',
  },
  {
    id: 'aia:Art.53',
    instrument: 'EU AI Act',
    citation: 'Arts. 53 & 55',
    title: 'General-purpose AI model obligations',
    plainSummary:
      'All GPAI providers: technical documentation, information for downstream providers, a policy to respect EU copyright law (including TDM opt-outs), and a sufficiently detailed public summary of training content. GPAI with systemic risk adds model evaluation and adversarial testing, systemic-risk assessment and mitigation, serious-incident tracking and reporting, and adequate cybersecurity.',
    domain: 'II',
    competency: 'II.C',
  },
  {
    id: 'aia:Art.57',
    instrument: 'EU AI Act',
    citation: 'Arts. 57–60',
    title: 'Regulatory sandboxes and real-world testing',
    plainSummary:
      'Member States must establish AI regulatory sandboxes providing a controlled environment for development, training, testing and validation under supervisory guidance, with priority access for SMEs. Separate rules permit testing high-risk systems in real-world conditions outside sandboxes, with informed consent and safeguards.',
    domain: 'II',
    competency: 'II.C',
  },
  {
    id: 'aia:Art.72',
    instrument: 'EU AI Act',
    citation: 'Arts. 72 & 73',
    title: 'Post-market monitoring and serious-incident reporting',
    plainSummary:
      'Providers must run a documented post-market monitoring plan that actively collects and analyses performance data across the system’s lifetime, and report serious incidents to market-surveillance authorities — generally without undue delay and within fixed outer limits, with shorter deadlines for widespread infringements or death.',
    domain: 'III',
    competency: 'III.C',
  },
  {
    id: 'aia:Art.99',
    instrument: 'EU AI Act',
    citation: 'Arts. 99 & 101',
    title: 'Penalties',
    plainSummary:
      'Three tiers for operators: up to €35m or 7% of worldwide annual turnover for prohibited practices; up to €15m or 3% for most other obligations; up to €7.5m or 1% for supplying incorrect, incomplete or misleading information — whichever is higher, with lower caps favouring SMEs. GPAI model providers face a separate regime of up to €15m or 3% enforced by the Commission.',
    domain: 'II',
    competency: 'II.C',
  },
  // ── Existing privacy law applied to AI ────────────────────────────────────
  {
    id: 'gdpr:Art.5',
    instrument: 'GDPR',
    citation: 'Art. 5',
    title: 'Principles — purpose limitation, minimisation, accuracy',
    plainSummary:
      'The principles bite hardest on AI at three points: purpose limitation constrains re-using data collected for one purpose to train a model for another; minimisation disciplines data-hungry pipelines; accuracy is engaged when a model outputs false statements about identifiable people. Accountability requires being able to demonstrate all of it.',
    domain: 'II',
    competency: 'II.A',
  },
  {
    id: 'gdpr:Art.6',
    instrument: 'GDPR',
    citation: 'Arts. 6 & 9',
    title: 'Lawful basis and special-category data',
    plainSummary:
      'Every processing purpose in the AI lifecycle — collection, training, fine-tuning, inference — needs an Art. 6 basis; training on scraped data typically relies on legitimate interests and its three-step test. Special categories (including biometric data used to identify someone) additionally need an Art. 9 condition; the AI Act carves out a narrow permission to process them for bias detection.',
    domain: 'II',
    competency: 'II.A',
  },
  {
    id: 'gdpr:Art.22',
    instrument: 'GDPR',
    citation: 'Art. 22',
    title: 'Automated decision-making and profiling',
    plainSummary:
      'A right not to be subject to solely automated decisions with legal or similarly significant effects, unless necessary for a contract, authorised by law, or based on explicit consent — with safeguards of human intervention, expressing a view, and contesting the decision. SCHUFA (CJEU, 2023): a score that plays a determining role in a third party’s decision is itself the automated decision.',
    domain: 'II',
    competency: 'II.A',
  },
  {
    id: 'gdpr:Art.25',
    instrument: 'GDPR',
    citation: 'Art. 25',
    title: 'Data protection by design and by default',
    plainSummary:
      'Requires technical and organisational measures built in at the time of determining the means of processing — for AI this is where PETs live: anonymisation and pseudonymisation, differential privacy, federated learning, synthetic data, and defaults that limit what is collected and retained.',
    domain: 'II',
    competency: 'II.A',
  },
  {
    id: 'gdpr:Art.35',
    instrument: 'GDPR',
    citation: 'Art. 35',
    title: 'Data protection impact assessment',
    plainSummary:
      'Required before processing likely to result in high risk, especially with new technologies — systematic extensive profiling with significant effects, large-scale special-category data, and large-scale monitoring of public areas are mandatory triggers. For AI it is the natural starting point for an algorithmic impact assessment and can feed an AI Act FRIA.',
    domain: 'II',
    competency: 'II.A',
  },
  // ── Other existing law ───────────────────────────────────────────────────
  {
    id: 'law:nondiscrimination',
    instrument: 'Non-discrimination law',
    citation: 'Title VII / ECOA / FHA',
    title: 'Disparate treatment and disparate impact',
    plainSummary:
      'Existing US anti-discrimination statutes reach AI without naming it: Title VII (employment), the Equal Credit Opportunity Act (credit, with adverse-action notice duties), the Fair Housing Act, and insurance regulation. Facially neutral models that produce disparate impact on protected groups can violate them — the reason disaggregated outcome testing is a governance control, not a nicety.',
    domain: 'II',
    competency: 'II.B',
  },
  {
    id: 'law:ftc5',
    instrument: 'FTC Act',
    citation: '§ 5',
    title: 'Unfair or deceptive acts or practices',
    plainSummary:
      'The FTC polices AI claims and harms as UDAP: overstating what a model can do ("AI washing"), unsupported performance claims, and unfair data practices. Its remedies include algorithmic disgorgement — ordering deletion of models and algorithms built on improperly obtained data.',
    domain: 'II',
    competency: 'II.B',
  },
  {
    id: 'law:ip',
    instrument: 'IP law',
    citation: 'Copyright & TDM',
    title: 'Training data, output and IP',
    plainSummary:
      'Three pressure points: whether training on protected works is permitted (EU text-and-data-mining exceptions with machine-readable opt-outs; US fair-use litigation), whether AI output infringes, and whether AI-generated content can itself be protected — human authorship remains a requirement in major jurisdictions. Trade-secret and licensing terms govern most enterprise model and data use.',
    domain: 'II',
    competency: 'II.B',
  },
  {
    id: 'law:pld',
    instrument: 'EU Product Liability Directive',
    citation: 'Directive (EU) 2024/2853',
    title: 'Reformed product liability for software and AI',
    plainSummary:
      'The revised PLD explicitly treats software and AI systems as products, extends defectiveness to cover post-market updates, learning behaviour and cybersecurity vulnerabilities, covers data loss as damage, and eases the claimant’s burden with disclosure duties and rebuttable presumptions of defect and causation in technically complex cases.',
    domain: 'II',
    competency: 'II.B',
  },
  {
    id: 'law:dsa',
    instrument: 'EU Digital Services Act',
    citation: 'Arts. 27 & 38',
    title: 'Recommender-system transparency',
    plainSummary:
      'Platforms must explain in their terms the main parameters of recommender systems and why content is suggested; very large platforms must additionally offer at least one option not based on profiling. A worked example of algorithmic transparency obligations sitting outside the AI Act.',
    domain: 'II',
    competency: 'II.B',
  },
  {
    id: 'law:colorado',
    instrument: 'Colorado AI Act',
    citation: 'SB24-205',
    title: 'US state high-risk AI regulation',
    plainSummary:
      'The first comprehensive US state AI law: developers and deployers of "high-risk artificial intelligence systems" making consequential decisions (employment, education, financial services, healthcare, housing, insurance, legal services) owe reasonable care against algorithmic discrimination, with impact assessments, risk-management programmes, consumer notice, explanation and appeal rights, and AG enforcement.',
    domain: 'II',
    competency: 'II.C',
  },
  {
    id: 'law:korea',
    instrument: 'South Korea',
    citation: 'AI Framework Act',
    title: 'Asia-Pacific AI legislation',
    plainSummary:
      'South Korea’s framework legislation — the first comprehensive national AI statute in Asia — combines promotion of the AI industry with obligations for "high-impact" AI and generative AI, including transparency and labelling duties, safety obligations for large-scale compute training, and a domestic-representative requirement for large foreign providers.',
    domain: 'II',
    competency: 'II.C',
  },
  // ── Standards, frameworks and tools ──────────────────────────────────────
  {
    id: 'std:nist-rmf',
    instrument: 'NIST',
    citation: 'AI RMF 1.0',
    title: 'AI Risk Management Framework',
    plainSummary:
      'Voluntary US framework structured as four functions — GOVERN (cross-cutting culture, policies, accountability), MAP (context and risk identification), MEASURE (analysis, TEVV, metrics), MANAGE (prioritise, respond, monitor) — each broken into categories and subcategories, with a companion Playbook, Profiles and crosswalks. Defines seven trustworthiness characteristics, with valid and reliable as the foundation.',
    domain: 'II',
    competency: 'II.D',
  },
  {
    id: 'std:nist-genai',
    instrument: 'NIST',
    citation: 'AI 600-1',
    title: 'Generative AI Profile',
    plainSummary:
      'Tailors the AI RMF to generative AI, enumerating GenAI-specific risks — confabulation, dangerous or violent recommendations, data privacy leakage, environmental impact, harmful bias, human-AI configuration, information integrity, information security, intellectual property, obscene content, value-chain and component integration — and mapping suggested actions to the four functions.',
    domain: 'II',
    competency: 'II.D',
  },
  {
    id: 'std:iso42001',
    instrument: 'ISO/IEC',
    citation: '42001:2023',
    title: 'AI management system (AIMS)',
    plainSummary:
      'The certifiable AI management-system standard. Annex SL clauses 4–10 (context, leadership, planning, support, operation, performance evaluation, improvement) plus Annex A’s reference controls applied through a Statement of Applicability. Requires both an AI risk assessment and an AI system impact assessment — the outward-facing lens ISO 27001 lacks.',
    domain: 'II',
    competency: 'II.D',
  },
  {
    id: 'std:iso42005',
    instrument: 'ISO/IEC',
    citation: '42005:2025',
    title: 'AI system impact assessment',
    plainSummary:
      'Guidance on how to perform and document AI system impact assessments — when to trigger one, how to scope it across the lifecycle, what to consider for individuals, groups and society, and how to record and integrate results with an ISO/IEC 42001 AIMS and with existing privacy impact assessments.',
    domain: 'II',
    competency: 'II.D',
  },
  {
    id: 'std:iso22989',
    instrument: 'ISO/IEC',
    citation: '22989:2022',
    title: 'AI concepts and terminology',
    plainSummary:
      'The vocabulary standard: defines AI system, machine learning, model, training data, and the AI lifecycle stages, and describes AI system functional concepts. Doing terminology once, consistently, is what lets policies, contracts and risk registers across an organisation actually interoperate.',
    domain: 'II',
    competency: 'II.D',
  },
  {
    id: 'std:iso23894',
    instrument: 'ISO/IEC',
    citation: '23894:2023',
    title: 'AI risk management guidance',
    plainSummary:
      'Applies the ISO 31000:2018 risk-management process (principles, framework, process: establish context, identify, analyse, evaluate, treat, monitor, communicate) to AI-specific risk sources, so AI risk can be integrated with enterprise risk management rather than run as a silo.',
    domain: 'II',
    competency: 'II.D',
  },
  {
    id: 'std:oecd',
    instrument: 'OECD',
    citation: 'AI Principles',
    title: 'Values-based principles and classification framework',
    plainSummary:
      'The first intergovernmental AI standard (2019, updated 2024): inclusive growth and well-being; human rights and democratic values including fairness and privacy; transparency and explainability; robustness, security and safety; and accountability. The companion framework classifies AI systems along dimensions such as people and planet, economic context, data and input, AI model, and task and output.',
    domain: 'II',
    competency: 'II.D',
  },
  {
    id: 'std:coe',
    instrument: 'Council of Europe',
    citation: 'Framework Convention / HUDERIA',
    title: 'Binding AI treaty and human-rights risk methodology',
    plainSummary:
      'The 2024 Framework Convention on AI, Human Rights, Democracy and the Rule of Law is the first binding international AI treaty, open beyond Europe. HUDERIA is its companion methodology for human-rights, democracy and rule-of-law risk and impact assessment — context-based risk analysis, stakeholder engagement, impact assessment and iterative mitigation planning.',
    domain: 'II',
    competency: 'II.D',
  },
]
