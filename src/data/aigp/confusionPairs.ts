// AIGP confusion pairs — rapid discrimination training on the concept pairs
// most often mixed up in AI governance.

import type { ConfusionPair } from '../../lib/types'

export const AIGP_CONFUSION_PAIRS: ConfusionPair[] = [
  {
    id: 'aicp_provider_deployer',
    a: 'Provider',
    b: 'Deployer',
    domain: 'II',
    competency: 'II.C',
    contrast:
      'Provider develops and places the system on the market under its own name; deployer uses it under its own authority.',
    items: [
      { prompt: 'Carries out the conformity assessment and affixes the CE marking.', answer: 'a' },
      { prompt: 'Must ensure input data is relevant and sufficiently representative for the intended purpose.', answer: 'b' },
      { prompt: 'Draws up the technical documentation before the system is placed on the market.', answer: 'a' },
      { prompt: 'Must inform workers and their representatives before workplace deployment.', answer: 'b' },
      { prompt: 'Registers an Annex III high-risk system in the EU database.', answer: 'a', note: 'Public-authority deployers also register their use.' },
      { prompt: 'Owes a fundamental-rights impact assessment under Art. 27 when it is a public body.', answer: 'b' },
    ],
  },
  {
    id: 'aicp_42001_42005',
    a: 'ISO/IEC 42001',
    b: 'ISO/IEC 42005',
    domain: 'II',
    competency: 'II.D',
    contrast:
      '42001 is the certifiable AI management system; 42005 is guidance on how to perform an AI system impact assessment.',
    items: [
      { prompt: 'The standard an organisation can be certified against.', answer: 'a' },
      { prompt: 'Gives the method for assessing impacts on individuals, groups and society.', answer: 'b' },
      { prompt: 'Structured on Annex SL clauses 4–10 with Annex A controls and a Statement of Applicability.', answer: 'a' },
      { prompt: 'Helps you decide when to trigger an assessment and what to document in it.', answer: 'b' },
      { prompt: 'Requires both an AI risk assessment and an AI system impact assessment.', answer: 'a', note: 'The requirement lives in 42001; the method lives in 42005.' },
      { prompt: 'Companion guidance rather than an auditable requirements standard.', answer: 'b' },
    ],
  },
  {
    id: 'aicp_datadrift_conceptdrift',
    a: 'Data drift',
    b: 'Concept drift',
    domain: 'III',
    competency: 'III.C',
    contrast:
      'Data drift = the input distribution changes. Concept drift = the relationship between inputs and the target changes.',
    items: [
      { prompt: 'A new customer segment shifts the age distribution of applicants.', answer: 'a' },
      { prompt: 'A recession changes what income actually predicts about default risk.', answer: 'b' },
      { prompt: 'Detectable by monitoring input distributions alone.', answer: 'a' },
      { prompt: 'Requires outcome monitoring against ground truth to detect.', answer: 'b' },
      { prompt: 'Fraud tactics evolve, so the same behavioural signals now mean something different.', answer: 'b' },
      { prompt: 'A sensor is replaced and now reports values on a different scale.', answer: 'a' },
    ],
  },
  {
    id: 'aicp_rag_finetune',
    a: 'RAG',
    b: 'Fine-tuning',
    domain: 'IV',
    competency: 'IV.A',
    contrast:
      'RAG retrieves current external context at inference time; fine-tuning changes the model’s weights through further training.',
    items: [
      { prompt: 'Best choice when the underlying documents change weekly.', answer: 'a' },
      { prompt: 'Adapts tone, format and task behaviour to your organisation.', answer: 'b' },
      { prompt: 'Lets you cite the source of each answer.', answer: 'a' },
      { prompt: 'Creates a training pipeline with its own data-governance burden.', answer: 'b' },
      { prompt: 'Knowledge can be updated by editing the document store, with no retraining.', answer: 'a' },
      { prompt: 'Risks baking sensitive training examples into the model itself.', answer: 'b' },
    ],
  },
  {
    id: 'aicp_art13_art50',
    a: 'Art. 13 (instructions to deployers)',
    b: 'Art. 50 (transparency to people)',
    domain: 'II',
    competency: 'II.C',
    contrast:
      'Art. 13 informs the professional deployer of a high-risk system; Art. 50 informs the people encountering AI, across risk tiers.',
    items: [
      { prompt: 'Requires telling a person they are interacting with an AI system.', answer: 'b' },
      { prompt: 'Requires stating the system’s expected accuracy metrics and known limitations.', answer: 'a' },
      { prompt: 'Requires deep fakes and synthetic media to be labelled.', answer: 'b' },
      { prompt: 'Applies only to high-risk systems.', answer: 'a' },
      { prompt: 'Covers disclosure of emotion recognition and biometric categorisation.', answer: 'b' },
      { prompt: 'Describes the human-oversight measures built into the system.', answer: 'a' },
    ],
  },
  {
    id: 'aicp_dpia_fria',
    a: 'DPIA (GDPR Art. 35)',
    b: 'FRIA (AI Act Art. 27)',
    domain: 'IV',
    competency: 'IV.B',
    contrast:
      'DPIA assesses risks of personal-data processing; FRIA assesses fundamental-rights impacts of deploying a high-risk AI system.',
    items: [
      { prompt: 'Triggered by processing likely to result in high risk, e.g. large-scale special-category data.', answer: 'a' },
      { prompt: 'Owed by public bodies and certain private deployers before first use of a high-risk system.', answer: 'b' },
      { prompt: 'Can be satisfied in part by building on the other assessment in this pair.', answer: 'b', note: 'Art. 27 expressly allows the FRIA to build on an existing DPIA.' },
      { prompt: 'Unmitigated high residual risk triggers prior consultation of the supervisory authority.', answer: 'a' },
      { prompt: 'Must describe the deployment period, categories of persons affected, and governance and complaint arrangements.', answer: 'b' },
      { prompt: 'Applies even when no AI is involved at all.', answer: 'a' },
    ],
  },
  {
    id: 'aicp_map_measure',
    a: 'MAP',
    b: 'MEASURE',
    domain: 'II',
    competency: 'II.D',
    contrast:
      'In the NIST AI RMF, Map establishes context and identifies risks; Measure analyses, tests and tracks them.',
    items: [
      { prompt: 'Documents intended purpose, deployment setting and affected stakeholders.', answer: 'a' },
      { prompt: 'Home of TEVV — test, evaluation, verification and validation.', answer: 'b' },
      { prompt: 'Identifies potential impacts before metrics are chosen.', answer: 'a' },
      { prompt: 'Produces disaggregated performance and fairness metrics tracked over time.', answer: 'b' },
      { prompt: 'Establishes the categorisation of the AI system and its capabilities.', answer: 'a' },
      { prompt: 'Assesses whether trustworthiness characteristics are actually being achieved.', answer: 'b' },
    ],
  },
  {
    id: 'aicp_highrisk_gpai',
    a: 'High-risk system rules',
    b: 'GPAI model rules',
    domain: 'II',
    competency: 'II.C',
    contrast:
      'High-risk duties attach to a system placed on the market for a listed use; GPAI duties attach to the general-purpose MODEL itself.',
    items: [
      { prompt: 'Conformity assessment, CE marking and EU database registration.', answer: 'a' },
      { prompt: 'A public summary of training content and an EU copyright policy.', answer: 'b' },
      { prompt: 'Human oversight designed into the system under Art. 14.', answer: 'a' },
      { prompt: 'Adversarial testing and systemic-risk mitigation once a threshold is met.', answer: 'b' },
      { prompt: 'Triggered by an Annex III use case such as recruitment or credit scoring.', answer: 'a' },
      { prompt: 'Information duties owed to downstream providers who build on the model.', answer: 'b' },
    ],
  },
]
