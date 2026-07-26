// src/data/aigp/blueprint.ts
//
// The AIGP tagging spine — derived directly from the IAPP AIGP Body of
// Knowledge & Exam Blueprint, VERSION 2.1 (approved by the AIGP EDB
// 9 September 2025; effective 2 February 2026; supersedes 2.0.1).
//
// Per-competency min/max question counts are taken verbatim from the BoK.
// Each domain's published range equals the sum of its competencies' ranges,
// and the domain midpoints sum to 85 scored items — the exam is 100 items /
// 180 minutes, so ~15 are unscored pretest items (the same shape as CIPP/E).

import type { Domain } from '../../lib/blueprint'

export const AIGP_DOMAINS: Domain[] = [
  {
    id: 'I',
    title: 'Understanding the foundations of AI governance',
    shortTitle: 'Foundations',
    minQ: 16,
    maxQ: 20,
    competencies: [
      { id: 'I.A', domain: 'I', title: 'Understand what AI is and why it needs governance', minQ: 4, maxQ: 6 },
      { id: 'I.B', domain: 'I', title: 'Establish and communicate organizational expectations for AI governance', minQ: 5, maxQ: 7 },
      { id: 'I.C', domain: 'I', title: 'Establish policies and procedures across the AI life cycle', minQ: 6, maxQ: 8 },
    ],
  },
  {
    id: 'II',
    title: 'Understanding how laws, standards and frameworks apply to AI',
    shortTitle: 'Laws & Standards',
    minQ: 19,
    maxQ: 23,
    competencies: [
      { id: 'II.A', domain: 'II', title: 'How existing data privacy laws apply to AI', minQ: 4, maxQ: 6 },
      { id: 'II.B', domain: 'II', title: 'How other types of existing laws apply to AI', minQ: 4, maxQ: 6 },
      { id: 'II.C', domain: 'II', title: 'Main elements of AI-specific laws', minQ: 6, maxQ: 8 },
      { id: 'II.D', domain: 'II', title: 'Main industry standards and tools that apply to AI', minQ: 3, maxQ: 5 },
    ],
  },
  {
    id: 'III',
    title: 'Understanding how to govern AI development',
    shortTitle: 'Governing Development',
    minQ: 21,
    maxQ: 25,
    competencies: [
      { id: 'III.A', domain: 'III', title: 'Govern the designing and building of the AI system', minQ: 6, maxQ: 8 },
      { id: 'III.B', domain: 'III', title: 'Govern data collection and use in training and testing', minQ: 6, maxQ: 8 },
      { id: 'III.C', domain: 'III', title: 'Govern release, monitoring and maintenance', minQ: 8, maxQ: 10 },
    ],
  },
  {
    id: 'IV',
    title: 'Understanding how to govern AI deployment and use',
    shortTitle: 'Governing Deployment',
    minQ: 21,
    maxQ: 25,
    competencies: [
      { id: 'IV.A', domain: 'IV', title: 'Evaluate key factors and risks relevant to the deployment decision', minQ: 6, maxQ: 8 },
      { id: 'IV.B', domain: 'IV', title: 'Perform key activities to assess the AI system', minQ: 5, maxQ: 7 },
      { id: 'IV.C', domain: 'IV', title: 'Govern the deployment and use of the AI system', minQ: 9, maxQ: 11 },
    ],
  },
]

/** Scored items on the real AIGP exam (100 delivered, ~15 unscored pretest). */
export const AIGP_SCORED_ITEMS = 85
/** Items on a full AIGP mock form. */
export const AIGP_FULL_FORM = 100

/** Performance indicators, verbatim in substance from the BoK v2.1 tree. */
export const AIGP_COMPETENCY_NODES = [
  {
    id: 'I.A',
    domain: 'I' as const,
    title: 'Understand what AI is and why it needs governance',
    blueprintMinQ: 4,
    blueprintMaxQ: 6,
    performanceIndicators: [
      'Know the generally accepted definitions and types of AI',
      'Identify risks and harms posed by AI to individuals, groups, organizations and society',
      'Identify the unique characteristics of AI that require governance (complexity, opacity, autonomy, speed and scale, data dependency, probabilistic outputs)',
      'Identify and apply the common principles of responsible AI',
    ],
  },
  {
    id: 'I.B',
    domain: 'I' as const,
    title: 'Establish and communicate organizational expectations for AI governance',
    blueprintMinQ: 5,
    blueprintMaxQ: 7,
    performanceIndicators: [
      'Define roles and responsibilities for AI governance stakeholders',
      'Establish cross-functional collaboration in the AI governance program',
      'Create and deliver training and awareness on AI terminology, strategy and governance',
      'Differentiate governance approaches by company size, maturity, industry, objectives and risk tolerance',
      'Identify differences among AI developers, providers, deployers and users',
    ],
  },
  {
    id: 'I.C',
    domain: 'I' as const,
    title: 'Establish policies and procedures across the AI life cycle',
    blueprintMinQ: 6,
    blueprintMaxQ: 8,
    performanceIndicators: [
      'Create and implement policies for oversight and accountability across all life cycle stages',
      'Evaluate and update existing policies (privacy, security, data governance, IP) for AI',
      'Create, update and implement policies, assessments and contracts to manage third-party risk',
    ],
  },
  {
    id: 'II.A',
    domain: 'II' as const,
    title: 'How existing data privacy laws apply to AI',
    blueprintMinQ: 4,
    blueprintMaxQ: 6,
    performanceIndicators: [
      'Apply transparency, choice, lawful basis and purpose limitation requirements to AI',
      'Apply data minimization and privacy by design requirements to AI',
      'Apply controller obligations to AI (impact assessments, processors, transfers, data subject rights, ADM, incidents, records)',
      'Apply the requirements for sensitive or special categories of data (e.g., biometrics)',
    ],
  },
  {
    id: 'II.B',
    domain: 'II' as const,
    title: 'How other types of existing laws apply to AI',
    blueprintMinQ: 4,
    blueprintMaxQ: 6,
    performanceIndicators: [
      'Apply intellectual property laws to AI (including limits on training data)',
      'Apply nondiscrimination laws to AI (employment, credit, lending, housing, insurance)',
      'Apply consumer protection laws to AI (unfair and deceptive acts or practices)',
      'Apply product liability laws to AI (design and manufacturing defects)',
    ],
  },
  {
    id: 'II.C',
    domain: 'II' as const,
    title: 'Main elements of AI-specific laws',
    blueprintMinQ: 6,
    blueprintMaxQ: 8,
    performanceIndicators: [
      'Understand the risk classification framework and what falls into each category',
      'Understand requirements for risk management, data governance, technical documentation, conformity/impact assessments and record keeping',
      'Understand requirements for human oversight, transparency and notification, and quality management',
      'Understand the distinct requirements for general-purpose AI models',
      'Understand the enforcement framework and penalties for noncompliance',
      'Understand differences by organizational context (providers, deployers, importers, distributors)',
    ],
  },
  {
    id: 'II.D',
    domain: 'II' as const,
    title: 'Main industry standards and tools that apply to AI',
    blueprintMinQ: 3,
    blueprintMaxQ: 5,
    performanceIndicators: [
      'Understand OECD principles, framework, policies and recommended practices for trustworthy AI',
      'Understand the NIST AI Risk Management Framework and Playbook (core functions, categories, subcategories)',
      'Understand the core ISO AI standards (22989, 42001, 42005)',
    ],
  },
  {
    id: 'III.A',
    domain: 'III' as const,
    title: 'Govern the designing and building of the AI system',
    blueprintMinQ: 6,
    blueprintMaxQ: 8,
    performanceIndicators: [
      'Define the business context and use case of the AI system',
      'Perform or review an impact assessment on the AI system',
      'Apply policies, procedures, best practices and ethical considerations to design and build',
      'Identify and manage internal and external risks (probability/severity harms matrix, risk mitigation hierarchy, stakeholder mapping, benchmarking, pilots)',
      'Document the designing and building process',
    ],
  },
  {
    id: 'III.B',
    domain: 'III' as const,
    title: 'Govern data collection and use in training and testing',
    blueprintMinQ: 6,
    blueprintMaxQ: 8,
    performanceIndicators: [
      'Establish data governance requirements (lawful rights to collect and use; quality, quantity, integrity, fit-for-purpose)',
      'Establish and document data lineage and provenance',
      'Plan and perform training and testing (unit, integration, validation, performance, security, bias, interpretability)',
      'Identify and manage issues and risks during training and testing',
      'Document the training and testing process',
    ],
  },
  {
    id: 'III.C',
    domain: 'III' as const,
    title: 'Govern release, monitoring and maintenance',
    blueprintMinQ: 8,
    blueprintMaxQ: 10,
    performanceIndicators: [
      'Assess readiness and prepare for release (model card, conformity requirements)',
      'Conduct continuous monitoring and schedule maintenance, updates and retraining',
      'Conduct periodic assessment of performance, reliability and safety (audits, red teaming, threat modeling, security testing)',
      'Manage and document incidents, issues and risks',
      'Collaborate cross-functionally to understand why incidents arise (brittleness, robustness, data quality, testing gaps, drift)',
      'Make public disclosures to meet transparency obligations',
    ],
  },
  {
    id: 'IV.A',
    domain: 'IV' as const,
    title: 'Evaluate key factors and risks relevant to the deployment decision',
    blueprintMinQ: 6,
    blueprintMaxQ: 8,
    performanceIndicators: [
      'Understand the context of the AI use case (objectives, performance requirements, data availability, ethics, workforce readiness)',
      'Understand differences in AI model types (classic vs. generative, proprietary vs. open source, small vs. large, language vs. multimodal)',
      'Understand differences in deployment options (cloud vs. on-premise vs. edge; as-is, fine-tuning, RAG, agentic architectures)',
    ],
  },
  {
    id: 'IV.B',
    domain: 'IV' as const,
    title: 'Perform key activities to assess the AI system',
    blueprintMinQ: 5,
    blueprintMaxQ: 7,
    performanceIndicators: [
      'Perform or review an impact assessment on the selected AI system',
      'Identify and evaluate key terms and risks in the vendor or licensing agreement',
      'Identify risks and opportunities unique to deploying your own proprietary model',
    ],
  },
  {
    id: 'IV.C',
    domain: 'IV' as const,
    title: 'Govern the deployment and use of the AI system',
    blueprintMinQ: 9,
    blueprintMaxQ: 11,
    performanceIndicators: [
      'Apply policies, procedures, best practices and ethical considerations to deployment',
      'Conduct continuous monitoring and schedule maintenance, updates and retraining',
      'Conduct periodic assessment of performance, reliability and safety',
      'Document incidents, issues, risks and post-market monitoring plans',
      'Forecast and reduce risks of secondary or unintended uses and downstream harms',
      'Establish external communication plans',
      'Create and implement a policy and controls to deactivate or localize an AI system',
    ],
  },
]
