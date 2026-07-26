// AIGP question bank — batch 6. Recall and comprehension items closing gaps
// left by the case-study batches, and holding the bank's cognitive mix in the
// band the real exam uses.

import type { Question } from '../../lib/types'

const q = (p: Omit<Question, 'source'>): Question => ({ source: 'authored', ...p })

export const AIGP_QUESTIONS_6: Question[] = [
  q({
    id: 'ai_q_131',
    type: 'single',
    domain: 'I',
    competency: 'I.A',
    bloomLevel: 'understand',
    lawRefs: [],
    stem: 'Which statement about narrow (weak) AI and general (strong) AI is accurate?',
    options: [
      { id: 'a', text: 'Essentially all AI in commercial use today is narrow — built for specific tasks — while general AI, matching human breadth across domains, remains hypothetical' },
      { id: 'b', text: 'General AI is already widely deployed in enterprises' },
      { id: 'c', text: 'Narrow AI cannot use machine learning' },
      { id: 'd', text: 'The distinction is defined in the EU AI Act' },
    ],
    correct: ['a'],
    explanation:
      'Governance relevance: risk arises from narrow systems deployed at scale in consequential contexts, not from speculative general intelligence. The AI Act regulates by risk of use, and does not turn on this distinction.',
  }),
  q({
    id: 'ai_q_132',
    type: 'single',
    domain: 'I',
    competency: 'I.B',
    bloomLevel: 'remember',
    lawRefs: [],
    stem: 'Which role typically holds day-to-day responsibility for coordinating an organisation’s AI governance programme?',
    options: [
      { id: 'a', text: 'The external auditor' },
      { id: 'b', text: 'A designated accountable function — often an AI governance lead or committee chair working across privacy, security, legal, data science and the business' },
      { id: 'c', text: 'The model’s training infrastructure team' },
      { id: 'd', text: 'The notified body' },
    ],
    correct: ['b'],
    explanation:
      'Coordination must sit inside the organisation with cross-functional reach. External auditors and notified bodies provide independent assessment precisely because they are not running the programme.',
  }),
  q({
    id: 'ai_q_133',
    type: 'single',
    domain: 'I',
    competency: 'I.C',
    bloomLevel: 'understand',
    lawRefs: [],
    stem: 'A "human-in-the-loop" configuration differs from "human-on-the-loop" in that:',
    options: [
      { id: 'a', text: 'Human-in-the-loop requires a person to act within the decision path before an outcome takes effect; human-on-the-loop means a person supervises and can intervene while the system operates' },
      { id: 'b', text: 'Human-on-the-loop is fully autonomous with no human role' },
      { id: 'c', text: 'They are synonymous' },
      { id: 'd', text: 'Human-in-the-loop applies only to generative AI' },
    ],
    correct: ['a'],
    explanation:
      'The distinction determines what the oversight control can actually catch: in-the-loop can prevent an individual bad outcome, on-the-loop generally detects patterns and intervenes after the fact. Human-out-of-the-loop describes full automation.',
  }),
  q({
    id: 'ai_q_134',
    type: 'single',
    domain: 'II',
    competency: 'II.A',
    bloomLevel: 'remember',
    lawRefs: ['gdpr:Art.5'],
    stem: 'Data minimisation in an AI context requires that personal data be:',
    options: [
      { id: 'a', text: 'Stored in the smallest possible file format' },
      { id: 'b', text: 'Adequate, relevant and limited to what is necessary for the purpose — which constrains how much data is collected for training, not only how it is stored' },
      { id: 'c', text: 'Deleted immediately after each inference' },
      { id: 'd', text: 'Anonymised in every case before use' },
    ],
    correct: ['b'],
    explanation:
      'Minimisation is a necessity test applied at collection and use. It sits in direct tension with the "more data is better" instinct of model development, which is why it must be enforced at the pipeline gate rather than argued afterwards.',
  }),
  q({
    id: 'ai_q_135',
    type: 'single',
    domain: 'II',
    competency: 'II.B',
    bloomLevel: 'understand',
    lawRefs: ['law:nondiscrimination'],
    stem: 'The difference between disparate treatment and disparate impact is that:',
    options: [
      { id: 'a', text: 'Disparate treatment involves differential treatment because of a protected characteristic; disparate impact arises where a neutral practice produces significantly worse outcomes for a protected group' },
      { id: 'b', text: 'Disparate impact requires proof of intent' },
      { id: 'c', text: 'Disparate treatment applies only to hiring' },
      { id: 'd', text: 'They are the same concept under different names' },
    ],
    correct: ['a'],
    explanation:
      'Intent-based versus outcome-based liability. AI systems most often create disparate-impact exposure, which is why disaggregated outcome testing — not a review of the feature list — is the operative control.',
  }),
  q({
    id: 'ai_q_136',
    type: 'single',
    domain: 'II',
    competency: 'II.C',
    bloomLevel: 'remember',
    lawRefs: ['aia:Art.26'],
    stem: 'Under the EU AI Act, a deployer of a high-risk system must retain the system’s automatically generated logs:',
    options: [
      { id: 'a', text: 'For 24 hours only' },
      { id: 'b', text: 'For a period appropriate to the intended purpose, and at least six months unless other law provides otherwise' },
      { id: 'c', text: 'Indefinitely, in all cases' },
      { id: 'd', text: 'There is no retention obligation on deployers' },
    ],
    correct: ['b'],
    explanation:
      'Deployers keep logs under their control for a purpose-appropriate period with a six-month floor, subject to other legal requirements. Note the tension to manage: logs support traceability while themselves being personal data subject to minimisation.',
  }),
  q({
    id: 'ai_q_137',
    type: 'single',
    domain: 'II',
    competency: 'II.C',
    bloomLevel: 'understand',
    lawRefs: ['aia:Art.53'],
    stem: 'A general-purpose AI model is presumed to present systemic risk when:',
    options: [
      { id: 'a', text: 'It is used by more than one million people' },
      { id: 'b', text: 'It has high-impact capabilities, presumed where the cumulative compute used for training exceeds a threshold set in the Act (with Commission power to designate models on other grounds)' },
      { id: 'c', text: 'It is released with open weights' },
      { id: 'd', text: 'It processes special-category data' },
    ],
    correct: ['b'],
    explanation:
      'The presumption is capability-based, proxied by training compute, with designation possible on other criteria. User numbers, licensing model and data types do not by themselves trigger the systemic-risk tier.',
  }),
  q({
    id: 'ai_q_138',
    type: 'single',
    domain: 'II',
    competency: 'II.D',
    bloomLevel: 'remember',
    lawRefs: ['std:iso42001'],
    stem: 'ISO/IEC 42001’s Annex A controls are applied to an organisation through:',
    options: [
      { id: 'a', text: 'Mandatory adoption of every control without exception' },
      { id: 'b', text: 'A Statement of Applicability recording which controls apply, how they are implemented, and the justification for any exclusions' },
      { id: 'c', text: 'A government-issued licence' },
      { id: 'd', text: 'Automatic mapping from the EU AI Act' },
    ],
    correct: ['b'],
    explanation:
      'The Statement of Applicability is the bridge between a generic control catalogue and one organisation’s risk profile — the same mechanism ISO 27001 uses, and the first document an auditor asks for.',
  }),
  q({
    id: 'ai_q_139',
    type: 'single',
    domain: 'III',
    competency: 'III.A',
    bloomLevel: 'remember',
    lawRefs: [],
    stem: 'In the AI lifecycle, which activity belongs to the PLANNING phase rather than the design or development phases?',
    options: [
      { id: 'a', text: 'Feature engineering' },
      { id: 'b', text: 'Determining business objectives, project scope, and the governance structure and responsibilities for the initiative' },
      { id: 'c', text: 'Model training' },
      { id: 'd', text: 'Hyperparameter tuning' },
    ],
    correct: ['b'],
    explanation:
      'Planning fixes objectives, scope and accountability before technical work starts. The other three are development activities — and each of them is far more expensive to redirect once underway.',
  }),
  q({
    id: 'ai_q_140',
    type: 'single',
    domain: 'III',
    competency: 'III.B',
    bloomLevel: 'understand',
    lawRefs: [],
    stem: 'Which testing activity is specifically intended to check that a model behaves acceptably on inputs unlike those it was trained on?',
    options: [
      { id: 'a', text: 'Unit testing of the data pipeline' },
      { id: 'b', text: 'Edge-case and out-of-distribution testing' },
      { id: 'c', text: 'Load testing' },
      { id: 'd', text: 'Regression testing of the user interface' },
    ],
    correct: ['b'],
    explanation:
      'Out-of-distribution and edge-case testing target brittleness — the sharp degradation on unfamiliar inputs that aggregate accuracy hides. The others test software behaviour rather than model generalisation.',
  }),
  q({
    id: 'ai_q_141',
    type: 'single',
    domain: 'III',
    competency: 'III.C',
    bloomLevel: 'remember',
    lawRefs: [],
    stem: 'Model versioning in production should bind each model version to:',
    options: [
      { id: 'a', text: 'The name of the engineer who trained it, only' },
      { id: 'b', text: 'The datasets, code and configuration that produced it, plus its evaluation results — so behaviour can be reproduced, investigated and rolled back' },
      { id: 'c', text: 'The marketing release number' },
      { id: 'd', text: 'The cloud region where it is served' },
    ],
    correct: ['b'],
    explanation:
      'Version binding is what makes rollback and investigation possible. Without it, "which model made this decision, trained on what?" — the first question in any incident or dispute — has no answer.',
  }),
  q({
    id: 'ai_q_142',
    type: 'single',
    domain: 'IV',
    competency: 'IV.A',
    bloomLevel: 'understand',
    lawRefs: [],
    stem: 'In a retrieval-augmented generation system, the retrieval component’s access permissions matter because:',
    options: [
      { id: 'a', text: 'They determine inference speed' },
      { id: 'b', text: 'The model can surface anything the retriever can reach, so over-broad retrieval scope becomes a data-exposure path — permissions must mirror the user’s own entitlements' },
      { id: 'c', text: 'They control the model’s temperature setting' },
      { id: 'd', text: 'They affect the licence cost' },
    ],
    correct: ['b'],
    explanation:
      'RAG turns document permissions into answer permissions. Retrieval scoped to the authenticated user’s entitlements is the control; a shared index over everything is one prompt away from disclosing what a user should never see.',
  }),
  q({
    id: 'ai_q_143',
    type: 'single',
    domain: 'IV',
    competency: 'IV.B',
    bloomLevel: 'remember',
    lawRefs: [],
    stem: 'When assessing a vendor’s AI system, "evidence of evaluation" most usefully means:',
    options: [
      { id: 'a', text: 'A statement in the sales contract that the system was tested' },
      { id: 'b', text: 'Documented results — methodology, datasets, metrics and disaggregated performance — that the customer can review and, where possible, verify' },
      { id: 'c', text: 'The vendor’s customer count' },
      { id: 'd', text: 'A press release describing the model as state of the art' },
    ],
    correct: ['b'],
    explanation:
      'Assurance requires artefacts, not assertions: what was measured, on which data, and how performance breaks down. Contractual statements matter for remedies, but they are not evidence that the system works for your population.',
  }),
  q({
    id: 'ai_q_144',
    type: 'single',
    domain: 'IV',
    competency: 'IV.C',
    bloomLevel: 'understand',
    lawRefs: [],
    stem: 'A "post-market monitoring plan" for a deployed AI system should specify:',
    options: [
      { id: 'a', text: 'Only the uptime target' },
      { id: 'b', text: 'What performance and safety data will be collected, how often it is reviewed, by whom, against what thresholds, and what triggers corrective action or reporting' },
      { id: 'c', text: 'The marketing roadmap' },
      { id: 'd', text: 'The model’s architecture diagram' },
    ],
    correct: ['b'],
    explanation:
      'A plan is only operational if it names the data, the cadence, the owner, the thresholds and the escalation route. Without thresholds and an owner, monitoring produces dashboards that nobody is accountable for acting on.',
  }),
]
