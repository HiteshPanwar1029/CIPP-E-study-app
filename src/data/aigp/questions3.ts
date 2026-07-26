// AIGP question bank — batch 3. Domains I & II, deepening coverage with more
// applied scenarios, multi-select items and cross-framework discrimination.

import type { Question } from '../../lib/types'

const q = (p: Omit<Question, 'source'>): Question => ({ source: 'authored', ...p })

export const AIGP_QUESTIONS_3: Question[] = [
  // ── I.A (3) ───────────────────────────────────────────────────────────────
  q({
    id: 'ai_q_116',
    type: 'single',
    domain: 'I',
    competency: 'I.A',
    bloomLevel: 'analyze',
    lawRefs: [],
    stem: 'An executive argues that AI governance is unnecessary because "we already have model validation in our risk function". The strongest counter-argument is:',
    options: [
      { id: 'a', text: 'Model validation is expensive and duplicative' },
      { id: 'b', text: 'Statistical validation answers whether the model performs; governance additionally addresses whether it should exist, who it affects, how people can contest it, and what happens when it drifts or is misused' },
      { id: 'c', text: 'Regulators require a separate department' },
      { id: 'd', text: 'Model validation cannot measure accuracy in ML systems' },
    ],
    correct: ['b'],
    explanation:
      'Validation is a necessary component of governance, not a substitute for it. Purpose legitimacy, affected-party rights, transparency, redress, human oversight design, incident handling and lifecycle accountability all sit outside what a validation function measures.',
  }),
  q({
    id: 'ai_q_117',
    type: 'multiple',
    domain: 'I',
    competency: 'I.A',
    bloomLevel: 'apply',
    lawRefs: [],
    stem: 'A retailer deploys AI to predict which customers will churn and offers them discounts. Select THREE harms a governance review should still consider despite the benign purpose.',
    options: [
      { id: 'a', text: 'Differential pricing that systematically disadvantages some groups' },
      { id: 'b', text: 'Customers being profiled and targeted without meaningful awareness' },
      { id: 'c', text: 'The model consuming more cloud compute than forecast' },
      { id: 'd', text: 'Erroneous predictions denying loyal customers offers they would otherwise receive' },
      { id: 'e', text: 'The marketing team disliking the user interface' },
    ],
    correct: ['a', 'b', 'd'],
    explanation:
      'Low-stakes framing hides real exposure: unequal treatment across groups, opaque profiling, and individual-level error costs. Cost overruns and internal UX complaints are project issues, not harms to people — though compute cost does belong in an environmental-impact discussion.',
  }),
  q({
    id: 'ai_q_118',
    type: 'single',
    domain: 'I',
    competency: 'I.A',
    bloomLevel: 'understand',
    lawRefs: [],
    stem: 'Which pairing of an AI characteristic with its governance consequence is correct?',
    options: [
      { id: 'a', text: 'Opacity → you cannot always explain an individual output, so explanation and contestability must be designed in rather than assumed' },
      { id: 'b', text: 'Autonomy → the model needs more training data' },
      { id: 'c', text: 'Scale → outputs become deterministic' },
      { id: 'd', text: 'Data dependency → the system becomes easier to audit' },
    ],
    correct: ['a'],
    explanation:
      'Opacity is why transparency duties, model cards, logging and human-oversight design exist. The other pairings are non-sequiturs: autonomy raises action risk, scale multiplies harm rather than removing randomness, and data dependency makes auditing harder, not easier.',
  }),

  // ── I.B (3) ───────────────────────────────────────────────────────────────
  q({
    id: 'ai_q_119',
    type: 'single',
    domain: 'I',
    competency: 'I.B',
    bloomLevel: 'analyze',
    lawRefs: [],
    stem: 'A company appoints its CISO as the accountable owner for AI governance. The most likely blind spot is:',
    options: [
      { id: 'a', text: 'Model security and adversarial robustness' },
      { id: 'b', text: 'Fairness, transparency and rights-related harms, which sit outside a security remit and need privacy, legal, business and affected-stakeholder input' },
      { id: 'c', text: 'Incident response processes' },
      { id: 'd', text: 'Access control for training data' },
    ],
    correct: ['b'],
    explanation:
      'Placing AI governance under any single function biases what gets seen: security frames risk as confidentiality, integrity and availability. AI risk is broader, which is why the BoK stresses cross-functional structures rather than a single owning department — the security-adjacent items are exactly what a CISO would cover well.',
  }),
  q({
    id: 'ai_q_120',
    type: 'single',
    domain: 'I',
    competency: 'I.B',
    bloomLevel: 'apply',
    lawRefs: [],
    stem: 'A data science team resists governance review, saying it slows delivery. The most effective governance response is:',
    options: [
      { id: 'a', text: 'Escalate to enforce compliance through mandate alone' },
      { id: 'b', text: 'Risk-tier the process so low-risk use cases pass through a fast lane and scrutiny concentrates where consequences are real — and engage early, when changes are cheap' },
      { id: 'c', text: 'Exempt the team while it builds prototypes' },
      { id: 'd', text: 'Require every model to be reviewed by an external auditor' },
    ],
    correct: ['b'],
    explanation:
      'Uniform heavyweight process is the main cause of governance avoidance. Proportionate triage plus early involvement keeps friction where risk is, and preserves influence — a review that arrives after the build is a veto, while one that arrives during design is a design input. Blanket exemptions create the shadow-AI problem.',
  }),
  q({
    id: 'ai_q_121',
    type: 'multiple',
    domain: 'I',
    competency: 'I.B',
    bloomLevel: 'apply',
    lawRefs: [],
    stem: 'Select THREE signals that an organisation’s AI governance has genuine senior-leadership support.',
    options: [
      { id: 'a', text: 'A documented, board-approved risk appetite for AI use cases' },
      { id: 'b', text: 'Budget and headcount allocated to governance activities, not only to model building' },
      { id: 'c', text: 'A published corporate values statement mentioning responsible AI' },
      { id: 'd', text: 'Evidence that a proposed use case was actually stopped or reshaped on governance grounds' },
      { id: 'e', text: 'An annual all-staff email from the CEO about AI' },
    ],
    correct: ['a', 'b', 'd'],
    explanation:
      'Support is demonstrated by resourcing, an articulated risk appetite, and at least one instance of governance changing an outcome. Statements and emails cost nothing and prove nothing — the "has anything ever been stopped?" question is the sharpest maturity test.',
  }),

  // ── I.C (4) ───────────────────────────────────────────────────────────────
  q({
    id: 'ai_q_122',
    type: 'single',
    domain: 'I',
    competency: 'I.C',
    bloomLevel: 'apply',
    lawRefs: [],
    stem: 'Which item most belongs in an AI acceptable-use policy for employees using generative tools?',
    options: [
      { id: 'a', text: 'The mathematical basis of transformer architectures' },
      { id: 'b', text: 'What data may and may not be entered, which tools are sanctioned, the requirement to verify output before relying on it, and disclosure rules for AI-assisted work' },
      { id: 'c', text: 'The vendor’s pricing tiers' },
      { id: 'd', text: 'Instructions for fine-tuning models' },
    ],
    correct: ['b'],
    explanation:
      'An acceptable-use policy must be actionable by non-specialists at the moment of use: what goes in, which tool, what checking is required, and what must be declared. Technical background and commercial detail belong elsewhere.',
  }),
  q({
    id: 'ai_q_123',
    type: 'single',
    domain: 'I',
    competency: 'I.C',
    bloomLevel: 'analyze',
    lawRefs: [],
    stem: 'An AI policy requires an impact assessment for "high-risk" systems but never defines the term. The predictable consequence is:',
    options: [
      { id: 'a', text: 'Teams over-assess, wasting resources' },
      { id: 'b', text: 'Inconsistent and self-serving classification — teams under pressure to ship will read the ambiguity in their own favour, and the organisation cannot demonstrate consistent treatment to a regulator' },
      { id: 'c', text: 'Nothing, since risk is inherently subjective' },
      { id: 'd', text: 'Legal will classify every system individually' },
    ],
    correct: ['b'],
    explanation:
      'Undefined trigger criteria are the most common structural defect in first-generation AI policies. Classification must be operational — anchored to legal categories, decision consequence, affected population and data sensitivity — with the answer recorded at intake so treatment is auditable.',
  }),
  q({
    id: 'ai_q_124',
    type: 'multiple',
    domain: 'I',
    competency: 'I.C',
    bloomLevel: 'remember',
    lawRefs: [],
    stem: 'Select THREE fields that an AI inventory entry should capture to be operationally useful.',
    options: [
      { id: 'a', text: 'Purpose and the decisions the system informs or makes' },
      { id: 'b', text: 'Role (developer / provider / deployer) and accountable owner' },
      { id: 'c', text: 'The programming language used' },
      { id: 'd', text: 'Risk classification, data categories processed and populations affected' },
      { id: 'e', text: 'The number of lines of code' },
    ],
    correct: ['a', 'b', 'd'],
    explanation:
      'The inventory must answer the questions governance and regulators ask: what is it for, who is accountable and in what legal role, how risky is it and whose data and rights are involved. Implementation trivia adds maintenance cost without decision value.',
  }),
  q({
    id: 'ai_q_125',
    type: 'single',
    domain: 'I',
    competency: 'I.C',
    bloomLevel: 'apply',
    lawRefs: [],
    stem: 'A company’s data-retention policy says customer records are deleted after 24 months. A model was trained on records now past that point. The governance question this raises is:',
    options: [
      { id: 'a', text: 'Nothing — deletion applies to databases, not models' },
      { id: 'b', text: 'Whether the trained model still embeds those records, what retention means for model artefacts and derived data, and how deletion requests propagate to models and backups' },
      { id: 'c', text: 'Whether the model should be retrained for accuracy reasons only' },
      { id: 'd', text: 'Whether the retention period should be extended to match model life' },
    ],
    correct: ['b'],
    explanation:
      'Existing policies rarely contemplate derived artefacts, which is exactly why the BoK requires evaluating and updating them for AI. Models can memorise training examples, so retention, erasure and rectification must be reasoned through for model artefacts — a decision to be documented, not ignored.',
  }),

  // ── II.A (3) ──────────────────────────────────────────────────────────────
  q({
    id: 'ai_q_219',
    type: 'single',
    domain: 'II',
    competency: 'II.A',
    bloomLevel: 'analyze',
    lawRefs: ['gdpr:Art.5'],
    stem: 'A data subject asks a company to erase their personal data, which was included in a model’s training set. The most accurate governance position is:',
    options: [
      { id: 'a', text: 'The request cannot apply to models, so it is refused' },
      { id: 'b', text: 'Assess whether the model retains personal data; act on source datasets and pipelines, evaluate whether retraining, unlearning or output filtering is required and proportionate, and document the reasoning and any technical limits' },
      { id: 'c', text: 'The model must be deleted and rebuilt in every case' },
      { id: 'd', text: 'Erasure applies only to backups' },
    ],
    correct: ['b'],
    explanation:
      'Neither reflexive refusal nor automatic model destruction is right. The analysis turns on whether the model constitutes or contains personal data, what is technically achievable, and proportionality — with the reasoning documented, since a regulator will ask what you considered.',
  }),
  q({
    id: 'ai_q_220',
    type: 'single',
    domain: 'II',
    competency: 'II.A',
    bloomLevel: 'apply',
    lawRefs: ['gdpr:Art.35'],
    stem: 'Which AI deployment most clearly requires a data protection impact assessment before it starts?',
    options: [
      { id: 'a', text: 'An internal tool that summarises publicly available industry news' },
      { id: 'b', text: 'A system that scores job applicants and automatically rejects those below a threshold' },
      { id: 'c', text: 'A model that forecasts warehouse stock levels' },
      { id: 'd', text: 'A grammar checker used on internal documents' },
    ],
    correct: ['b'],
    explanation:
      'Systematic evaluation of individuals with significant effects is a mandatory trigger, and applicant screening stacks further criteria (automated decisions, potentially vulnerable subjects, innovative technology). The others process little or no personal data with no significant effect on people.',
  }),
  q({
    id: 'ai_q_221',
    type: 'multiple',
    domain: 'II',
    competency: 'II.A',
    bloomLevel: 'apply',
    lawRefs: ['gdpr:Art.6'],
    stem: 'A company plans to use a third-party LLM API to process customer support transcripts. Select THREE data-protection questions that must be answered before launch.',
    options: [
      { id: 'a', text: 'What lawful basis covers sending customer personal data to the provider, and is it compatible with the original collection purpose' },
      { id: 'b', text: 'Whether the provider uses the submitted data to train its own models, and whether that is contractually excluded' },
      { id: 'c', text: 'Whether transcripts leave the EEA and, if so, which transfer mechanism applies' },
      { id: 'd', text: 'How many tokens the model can process per request' },
      { id: 'e', text: 'Which programming language the integration uses' },
    ],
    correct: ['a', 'b', 'c'],
    explanation:
      'The three recurring failure points when adopting an AI API: basis and purpose compatibility, secondary use of your data by the provider, and international transfers (with a processor contract behind all of it). Context windows and implementation language are engineering details.',
  }),

  // ── II.B (3) ──────────────────────────────────────────────────────────────
  q({
    id: 'ai_q_222',
    type: 'single',
    domain: 'II',
    competency: 'II.B',
    bloomLevel: 'apply',
    lawRefs: ['law:ip'],
    stem: 'A company uses a generative model to produce marketing images and wants exclusive rights in them. The most accurate advice is:',
    options: [
      { id: 'a', text: 'Fully AI-generated output may not attract copyright protection in major jurisdictions absent sufficient human authorship, so exclusivity should not be assumed — and there is separate infringement risk if output resembles protected works' },
      { id: 'b', text: 'The company automatically owns copyright because it paid for the tool' },
      { id: 'c', text: 'The model provider owns the output in all cases' },
      { id: 'd', text: 'AI output is always in the public domain worldwide' },
    ],
    correct: ['a'],
    explanation:
      'Two distinct issues: protectability (human authorship requirements limit what can be owned) and infringement exposure (output may reproduce protected expression). Contractual terms allocate rights between vendor and customer but cannot create copyright that does not exist.',
  }),
  q({
    id: 'ai_q_223',
    type: 'single',
    domain: 'II',
    competency: 'II.B',
    bloomLevel: 'analyze',
    lawRefs: ['law:nondiscrimination'],
    stem: 'An insurer’s pricing model raises premiums in areas that correlate strongly with ethnicity, using only claims-history and geographic data. Legal review says no protected attribute is used. The governance conclusion is:',
    options: [
      { id: 'a', text: 'No further action, since the model uses only actuarial data' },
      { id: 'b', text: 'Proxy discrimination risk is live: test outcomes across protected groups, evaluate whether a less discriminatory alternative achieves similar accuracy, and document the justification — insurance is also a regulated non-discrimination context' },
      { id: 'c', text: 'Remove geography entirely, as it is always unlawful' },
      { id: 'd', text: 'Discrimination law does not apply to pricing models' },
    ],
    correct: ['b'],
    explanation:
      'Actuarial justification is a defence to be evidenced, not assumed. The defensible pattern is measure impact, search for less discriminatory alternatives, and record why the chosen design is justified. Blanket feature removal is neither required nor necessarily lawful-making.',
  }),
  q({
    id: 'ai_q_224',
    type: 'single',
    domain: 'II',
    competency: 'II.B',
    bloomLevel: 'understand',
    lawRefs: ['law:ftc5'],
    stem: '"AI washing" describes:',
    options: [
      { id: 'a', text: 'Cleaning training data before model development' },
      { id: 'b', text: 'Overstating a product’s AI capabilities or performance in a way that can amount to a deceptive practice' },
      { id: 'c', text: 'Removing bias from a model’s outputs' },
      { id: 'd', text: 'Migrating AI workloads between cloud providers' },
    ],
    correct: ['b'],
    explanation:
      'Regulators treat exaggerated AI claims as ordinary deception — the marketing exposure is real and separate from any AI-specific statute. Governance implication: capability claims should be substantiated by evaluation evidence before they reach a customer-facing page.',
  }),

  // ── II.C (4) ──────────────────────────────────────────────────────────────
  q({
    id: 'ai_q_225',
    type: 'single',
    domain: 'II',
    competency: 'II.C',
    bloomLevel: 'apply',
    lawRefs: ['aia:Art.14'],
    stem: 'To satisfy the human-oversight requirement for a high-risk system, a provider must:',
    options: [
      { id: 'a', text: 'State in the contract that the deployer is responsible for oversight' },
      { id: 'b', text: 'Design the system so overseers can understand its capacities and limits, remain aware of automation bias, interpret output, disregard or override it, and stop it' },
      { id: 'c', text: 'Require a second model to check the first' },
      { id: 'd', text: 'Provide an annual training video' },
    ],
    correct: ['b'],
    explanation:
      'Oversight is a design obligation on the provider, operationalised by the deployer. Building in interpretable output, uncertainty signals, override paths and stop controls is what makes oversight possible; contractual allocation and generic training do not.',
  }),
  q({
    id: 'ai_q_226',
    type: 'multiple',
    domain: 'II',
    competency: 'II.C',
    bloomLevel: 'analyze',
    lawRefs: ['aia:Art.5'],
    stem: 'Select THREE practices prohibited outright under EU AI Act Art. 5.',
    options: [
      { id: 'a', text: 'Emotion recognition used on employees in the workplace' },
      { id: 'b', text: 'Biometric categorisation to infer sensitive attributes such as race or political opinion' },
      { id: 'c', text: 'AI used to score creditworthiness of consumers' },
      { id: 'd', text: 'Untargeted scraping of facial images from the internet to build recognition databases' },
      { id: 'e', text: 'AI used to sort CVs for a recruiter' },
    ],
    correct: ['a', 'b', 'd'],
    explanation:
      'Credit scoring and CV sorting are HIGH-RISK Annex III uses — permitted with heavy obligations. The prohibited list targets practices judged incompatible with fundamental rights regardless of safeguards; no DPIA, consent or oversight cures them.',
  }),
  q({
    id: 'ai_q_227',
    type: 'single',
    domain: 'II',
    competency: 'II.C',
    bloomLevel: 'analyze',
    lawRefs: ['aia:Art.57'],
    stem: 'A startup wants to test an innovative high-risk AI system before full compliance is achievable. Under the EU AI Act it may:',
    options: [
      { id: 'a', text: 'Deploy freely, since research is exempt in all circumstances' },
      { id: 'b', text: 'Apply to a national AI regulatory sandbox for supervised development and testing, with priority access for SMEs — supervision and safeguards apply, and obligations are not waived once the system reaches the market' },
      { id: 'c', text: 'Self-certify a two-year exemption' },
      { id: 'd', text: 'Test only outside the EU' },
    ],
    correct: ['b'],
    explanation:
      'Sandboxes provide supervised space to develop and validate, plus regulatory dialogue — not a compliance holiday. Separate rules govern real-world testing outside sandboxes, with informed consent and safeguards. Pure scientific R&D has its own carve-out, but that is not the same as deploying to users.',
  }),
  q({
    id: 'ai_q_228',
    type: 'single',
    domain: 'II',
    competency: 'II.C',
    bloomLevel: 'apply',
    lawRefs: ['aia:Art.49'],
    stem: 'Why does the EU AI Act require public registration of Annex III high-risk systems in an EU database?',
    options: [
      { id: 'a', text: 'To collect fees from providers' },
      { id: 'b', text: 'To create societal visibility of which high-risk systems are in use and by whom, supporting market surveillance, research and public scrutiny' },
      { id: 'c', text: 'To publish the systems’ source code' },
      { id: 'd', text: 'To replace conformity assessment' },
    ],
    correct: ['b'],
    explanation:
      'Registration is a transparency mechanism at the level of the market rather than the individual: it lets authorities and the public see the landscape of high-risk deployment. It publishes descriptive information, not source code, and sits alongside — not instead of — conformity assessment.',
  }),

  // ── II.D (2) ──────────────────────────────────────────────────────────────
  q({
    id: 'ai_q_229',
    type: 'multiple',
    domain: 'II',
    competency: 'II.D',
    bloomLevel: 'analyze',
    lawRefs: ['std:nist-rmf', 'std:iso42001', 'std:oecd'],
    stem: 'Select THREE accurate statements about how the major AI frameworks relate to each other.',
    options: [
      { id: 'a', text: 'NIST AI RMF supplies risk vocabulary and practices but cannot be certified against' },
      { id: 'b', text: 'ISO/IEC 42001 supplies an auditable management system that can carry RMF-style practices inside it' },
      { id: 'c', text: 'Compliance with any one framework establishes legal compliance with the EU AI Act' },
      { id: 'd', text: 'OECD principles are values-based and influence both national law and other frameworks' },
      { id: 'e', text: 'The frameworks are mutually exclusive and an organisation must choose one' },
    ],
    correct: ['a', 'b', 'd'],
    explanation:
      'They are complementary layers — values (OECD), practice vocabulary (NIST), certifiable process (ISO) — and one programme can serve all three plus regulatory duties. But no framework confers legal compliance; harmonised standards can support a presumption of conformity for what they cover, which is narrower.',
  }),
  q({
    id: 'ai_q_230',
    type: 'single',
    domain: 'II',
    competency: 'II.D',
    bloomLevel: 'apply',
    lawRefs: ['std:iso23894', 'std:nist-rmf'],
    stem: 'An enterprise risk team already runs ISO 31000 processes and asks how AI risk fits in. The best answer is:',
    options: [
      { id: 'a', text: 'AI risk needs an entirely separate process disconnected from enterprise risk' },
      { id: 'b', text: 'ISO/IEC 23894 applies the ISO 31000 process to AI-specific risk sources, so AI risk can be integrated into existing enterprise risk management rather than siloed' },
      { id: 'c', text: 'ISO 31000 already covers AI fully, so nothing changes' },
      { id: 'd', text: 'Enterprise risk management must be replaced by the NIST AI RMF' },
    ],
    correct: ['b'],
    explanation:
      'Integration is the point: 23894 maps AI-specific risk sources onto a process the organisation already runs. Neither a disconnected silo nor "nothing changes" is right — AI introduces genuinely new risk sources that generic ERM does not enumerate.',
  }),
]
