import type { CompetencyNode } from '../lib/types'

// Performance indicators paraphrased from the IAPP CIPP/E BoK v1.3.3 (original
// wording; the BoK text itself is not reproduced). Blueprint min/max verbatim.
export const COMPETENCY_NODES: CompetencyNode[] = [
  {
    id: 'I.A', domain: 'I', title: 'Origins & historical context of European DP law',
    blueprintMinQ: 1, blueprintMaxQ: 3,
    performanceIndicators: [
      'Historical rationale for data protection',
      'Human-rights law and early instruments (OECD Guidelines, Convention 108 and 108+, Treaty of Lisbon)',
      'The drive for a harmonised European approach and its challenges (e.g. Brexit)',
    ],
  },
  {
    id: 'I.B', domain: 'I', title: 'Roles & functions of EU institutions',
    blueprintMinQ: 1, blueprintMaxQ: 2,
    performanceIndicators: [
      'Council of Europe and the European Court of Human Rights',
      'European Parliament, European Commission, European Council and Council of the EU',
      'Court of Justice of the European Union (CJEU)',
    ],
  },
  {
    id: 'I.C', domain: 'I', title: 'Legislative framework',
    blueprintMinQ: 5, blueprintMaxQ: 8,
    performanceIndicators: [
      'CoE Convention 108 (1981); Data Protection Directive 95/46/EC',
      'ePrivacy Directive 2002/58/EC (as amended); e-Commerce Directive 2000/31/EC',
      'GDPR (EU) 2016/679 and related law; NIS/NIS2 Directives; the EU AI Act',
    ],
  },
  {
    id: 'II.A', domain: 'II', title: 'Basic GDPR concepts',
    blueprintMinQ: 3, blueprintMaxQ: 5,
    performanceIndicators: [
      'Personal data; sensitive/special categories of personal data',
      'Pseudonymous vs anonymous data',
      'Key principles of lawful processing; controller and processor (with EDPB guidance); data subject',
    ],
  },
  {
    id: 'II.B', domain: 'II', title: 'Security of personal data',
    blueprintMinQ: 7, blueprintMaxQ: 11,
    performanceIndicators: [
      'Appropriate technical & organisational measures (encryption, access controls)',
      'Breach-notification requirements (with EDPB guidance)',
      'Responsible vendor management; sharing personal data with third parties',
    ],
  },
  {
    id: 'II.C', domain: 'II', title: 'Data subjects’ rights',
    blueprintMinQ: 8, blueprintMaxQ: 12,
    performanceIndicators: [
      'Access, rectification, erasure/RTBF, restriction, objection',
      'Consent and its withdrawal; rights around automated decision-making and profiling',
      'Data portability; restrictions on data-subject rights (with EDPB guidance)',
    ],
  },
  {
    id: 'III.A', domain: 'III', title: 'Processing principles',
    blueprintMinQ: 2, blueprintMaxQ: 4,
    performanceIndicators: [
      'Fairness & lawfulness; purpose limitation; proportionality/minimisation',
      'Accuracy; storage limitation (retention)',
      'Integrity and confidentiality',
    ],
  },
  {
    id: 'III.B', domain: 'III', title: 'Lawful processing bases',
    blueprintMinQ: 3, blueprintMaxQ: 5,
    performanceIndicators: [
      'Consent, contractual necessity, legal obligation/vital interests/public interest',
      'Legitimate interest (with EDPB guidance)',
      'Processing of special categories of personal data',
    ],
  },
  {
    id: 'III.C', domain: 'III', title: 'Information-provision obligations',
    blueprintMinQ: 4, blueprintMaxQ: 6,
    performanceIndicators: [
      'The transparency principle',
      'Key components of privacy notices',
      'Layered privacy notices',
    ],
  },
  {
    id: 'III.D', domain: 'III', title: 'International data transfers',
    blueprintMinQ: 4, blueprintMaxQ: 6,
    performanceIndicators: [
      'Rationale for prohibiting transfers; adequate jurisdiction',
      'Safe Harbor / Privacy Shield / the Schrems decisions / EU-US Data Privacy Framework',
      'SCCs and BCRs; codes of conduct and certifications; derogations; transfer impact assessments (TIAs)',
    ],
  },
  {
    id: 'IV.A', domain: 'IV', title: 'Territorial & material scope',
    blueprintMinQ: 2, blueprintMaxQ: 4,
    performanceIndicators: [
      'Establishment vs non-establishment in the EU (with EDPB guidance)',
      'Scope of processing and the exemptions the GDPR allows',
    ],
  },
  {
    id: 'IV.B', domain: 'IV', title: 'Accountability requirements',
    blueprintMinQ: 4, blueprintMaxQ: 8,
    performanceIndicators: [
      'Obligations of controllers, joint controllers and processors; data protection by design & by default',
      'Documentation and cooperation with regulators; DPIAs and the criteria for them',
      'Mandatory DPO; the role of auditing',
    ],
  },
  {
    id: 'IV.C', domain: 'IV', title: 'Supervision & enforcement structure',
    blueprintMinQ: 1, blueprintMaxQ: 3,
    performanceIndicators: [
      'Roles and powers of the EDPB and the EDPS',
      'Other supervisory authorities',
      'The lead supervisory authority / one-stop-shop (with EDPB guidance)',
    ],
  },
  {
    id: 'IV.D', domain: 'IV', title: 'Consequences for violations',
    blueprintMinQ: 1, blueprintMaxQ: 3,
    performanceIndicators: [
      'Procedures and fines for infringements',
      'Conditions for class actions',
      'Compensation to data subjects',
    ],
  },
  {
    id: 'V.A', domain: 'V', title: 'Employment',
    blueprintMinQ: 3, blueprintMaxQ: 5,
    performanceIndicators: [
      'Legal basis for employee data; storage of personnel records and its risks',
      'Workplace monitoring and data loss prevention; BYOD pros and cons',
      'EU Works Councils and whistleblowing systems',
    ],
  },
  {
    id: 'V.B', domain: 'V', title: 'Surveillance',
    blueprintMinQ: 1, blueprintMaxQ: 3,
    performanceIndicators: [
      'Surveillance by public authorities; interception of communications',
      'CCTV, geolocation, biometrics/facial recognition (with EDPB guidance)',
    ],
  },
  {
    id: 'V.C', domain: 'V', title: 'Direct marketing',
    blueprintMinQ: 2, blueprintMaxQ: 4,
    performanceIndicators: [
      'Compliance requirements for marketing processing',
      'Online behavioural targeting (with EDPB guidance)',
    ],
  },
  {
    id: 'V.D', domain: 'V', title: 'Internet technology & communications',
    blueprintMinQ: 2, blueprintMaxQ: 4,
    performanceIndicators: [
      'Cloud computing; web cookies',
      'Social-media platforms and dark patterns (with EDPB guidance); search-engine marketing',
      'AI/ML compliance and ethics issues',
    ],
  },
]
