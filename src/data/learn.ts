// Original concept-first teaching notes, one per competency. Law cited by
// article/recital number and cases by name (facts). No third-party text copied.
export interface LearnNote {
  competency: string
  summary: string
  keyPoints: string[]
  anchorCase?: string
}

export const LEARN_NOTES: LearnNote[] = [
  {
    competency: 'I.A',
    summary: `European data protection grew out of post-war human-rights thinking: a right to private life (ECHR Art. 8; EU Charter Art. 7) and a distinct right to protection of personal data (Charter Art. 8). Early instruments — the OECD Guidelines (1980) and the binding Council of Europe Convention 108 (1981) — set principles that a patchwork of national laws then implemented, driving the push for a harmonised European approach that culminated in the GDPR.`,
    keyPoints: [
      'Privacy as a fundamental right (ECHR Art. 8; Charter Arts. 7 & 8)',
      'OECD Guidelines (1980, non-binding) and Convention 108 (1981, binding)',
      'Harmonisation drive led to the GDPR; Brexit shows the fragmentation risk',
    ],
  },
  {
    competency: 'I.B',
    summary: `Several institutions shape EU data protection. The European Commission alone can propose legislation; the Parliament and Council of the EU co-legislate; the European Council sets political direction; and the Court of Justice (CJEU) interprets the law. The Council of Europe and its European Court of Human Rights sit outside the EU but underpin the rights framework.`,
    keyPoints: [
      'Commission holds the sole right of legislative initiative',
      'Parliament + Council co-legislate; European Council sets direction',
      'CJEU interprets EU law; the ECtHR (Council of Europe) enforces the ECHR',
    ],
  },
  {
    competency: 'I.C',
    summary: `The framework runs from Convention 108 and the 1995 Data Protection Directive to today's GDPR — a directly applicable Regulation that replaced the fragmented Directive. Alongside it sit the Law Enforcement Directive, the ePrivacy Directive (cookies and communications), and newer regimes such as NIS2 and the EU AI Act.`,
    keyPoints: [
      'Directive 95/46/EC gave way to the GDPR (uniform Regulation)',
      'ePrivacy Directive is lex specialis for cookies and communications',
      'LED 2016/680 for law enforcement; NIS2 and the AI Act are adjacent',
    ],
  },
  {
    competency: 'II.A',
    summary: `The GDPR protects personal data — any information relating to an identified or identifiable living person (Art. 4). Special categories (Art. 9) get extra protection. Roles matter: the controller sets the purposes and means of processing; the processor acts only on the controller's instructions. Pseudonymous data stays personal; only truly anonymous data falls outside scope.`,
    keyPoints: [
      'Personal data = identified/identifiable living person (see Breyer on IP addresses)',
      'Controller vs processor vs joint controller (see Fashion ID)',
      'Pseudonymous data is in scope; anonymous data is out of scope',
    ],
    anchorCase: 'case:Breyer',
  },
  {
    competency: 'II.B',
    summary: `Article 32 requires technical and organisational measures appropriate to the risk — encryption, access controls, resilience and regular testing. Personal-data breaches must be notified to the supervisory authority without undue delay and, where feasible, within 72 hours (Art. 33), and to affected individuals where the risk is high (Art. 34). Processors and vendors must be bound by an Article 28 contract.`,
    keyPoints: [
      'Risk-based measures (Art. 32): encryption, access control, testing',
      '72-hour breach notice to the authority (Art. 33); high risk means tell individuals (Art. 34)',
      'Vendor due diligence plus a mandatory Article 28 processor contract',
    ],
  },
  {
    competency: 'II.C',
    summary: `Individuals have rights to access, rectification, erasure (the right to be forgotten), restriction, portability and objection, plus safeguards around automated decisions (Arts. 15–22). Most are qualified rather than absolute — erasure yields to legal claims or free expression — but the right to object to direct marketing is absolute. Requests are generally free and answered within one month.`,
    keyPoints: [
      'Access, rectification, erasure, restriction, portability, objection',
      'Erasure is qualified (see Google Spain); the marketing objection is absolute',
      'One-month response; safeguards for solely automated decisions (Art. 22)',
    ],
    anchorCase: 'case:Google-Spain',
  },
  {
    competency: 'III.A',
    summary: `Article 5 sets six processing principles — lawfulness/fairness/transparency, purpose limitation, data minimisation, accuracy, storage limitation, and integrity & confidentiality — plus overarching accountability. They apply to every processing activity and are the yardstick regulators measure against.`,
    keyPoints: [
      'Six Article 5 principles plus accountability',
      'Purpose limitation governs reuse; minimisation limits what you collect',
      'Storage limitation means justified, finite retention periods',
    ],
  },
  {
    competency: 'III.B',
    summary: `Article 6 provides six lawful bases: consent, contract, legal obligation, vital interests, public task, and legitimate interests (which needs a three-part balancing test). Special-category data requires an additional Article 9 condition on top of the Article 6 basis.`,
    keyPoints: [
      'Six Article 6 bases — choose the right one per purpose',
      'Legitimate interests = purpose test + necessity test + balancing test',
      'Special categories need an extra Article 9 condition (e.g. explicit consent)',
    ],
  },
  {
    competency: 'III.C',
    summary: `Transparency (Art. 12) requires concise, clear information, given at the time of collection (Art. 13) or, where data comes from a third party, with the source disclosed (Art. 14). Layered notices present the key points up front with links to fuller detail.`,
    keyPoints: [
      'Notice at collection (Art. 13); disclose the source for indirect data (Art. 14)',
      'Contents: identity, purposes, legal basis, recipients, retention, rights',
      'Layered notices keep it concise and intelligible',
    ],
  },
  {
    competency: 'III.D',
    summary: `Transfers outside the EEA need a Chapter V basis: an adequacy decision (Art. 45), appropriate safeguards such as SCCs or BCRs (Arts. 46–47), or a narrow derogation (Art. 49). After Schrems II, exporters must assess the destination's laws and add supplementary measures where protection falls short; the EU-US Data Privacy Framework is the current adequacy route to certified US organisations.`,
    keyPoints: [
      'Adequacy (Art. 45), then safeguards SCCs/BCRs (Arts. 46–47), then derogations (Art. 49)',
      'Schrems II: assess the destination and add supplementary measures (TIA)',
      'Safe Harbor and Privacy Shield were struck down; the DPF succeeds them',
    ],
    anchorCase: 'case:Schrems-II',
  },
  {
    competency: 'IV.A',
    summary: `The GDPR applies to processing in the context of an EU establishment and, under Art. 3(2), to non-EU organisations that offer goods or services to, or monitor the behaviour of, people in the EU. "Establishment" is read flexibly, and the household exemption does not cover filming public space.`,
    keyPoints: [
      'Establishment limb and targeting/monitoring limb (Art. 3)',
      'Establishment can be a minimal but stable arrangement (Weltimmo)',
      'The household exemption is narrow (Ryneš)',
    ],
  },
  {
    competency: 'IV.B',
    summary: `Accountability means controllers must not only comply but be able to demonstrate it: data protection by design and by default (Art. 25), records of processing (Art. 30), data protection impact assessments for high-risk processing (Art. 35, with prior consultation under Art. 36), a data protection officer where Article 37 triggers apply, and auditing.`,
    keyPoints: [
      'Accountability = comply and evidence it',
      'DP by design/default (Art. 25); records (Art. 30); DPIA (Art. 35)',
      'Mandatory DPO triggers (Art. 37); auditing supports assurance',
    ],
  },
  {
    competency: 'IV.C',
    summary: `Independent supervisory authorities enforce the GDPR, coordinated by the European Data Protection Board for consistency, while the European Data Protection Supervisor oversees the EU institutions themselves. For cross-border processing, the lead authority of the main establishment runs a one-stop-shop (Art. 56).`,
    keyPoints: [
      'National authorities + EDPB (consistency) + EDPS (EU institutions)',
      'One-stop-shop / lead supervisory authority (Art. 56)',
      'The consistency mechanism resolves cross-border disagreements',
    ],
  },
  {
    competency: 'IV.D',
    summary: `Infringements carry administrative fines in two tiers — up to €10M or 2%, and up to €20M or 4% of global annual turnover (Art. 83) — set using factors like gravity, intent and cooperation. Individuals can also claim compensation for material or non-material damage (Art. 82) and be represented collectively (Art. 80).`,
    keyPoints: [
      'Two fine tiers (Art. 83): €10M/2% and €20M/4% of global turnover',
      'Fine factors: gravity, intent, mitigation, cooperation (Art. 83(2))',
      'Compensation (Art. 82); representative actions (Art. 80)',
    ],
  },
  {
    competency: 'V.A',
    summary: `Employee data is sensitive in practice because consent is rarely "freely given" at work, so contract or legal obligation usually fit better (Art. 88 lets member states add rules). Monitoring must be necessary, proportionate and transparent; personnel records need justified retention; and BYOD, works councils and whistleblowing add further constraints.`,
    keyPoints: [
      'Consent is unreliable at work — prefer contract/legal obligation/legitimate interests',
      'Monitoring must be necessary, proportionate and transparent',
      'Mind works councils, whistleblowing schemes and BYOD',
    ],
  },
  {
    competency: 'V.B',
    summary: `Surveillance technology engages heightened rules: CCTV must be proportionate and signposted; interception of communications is tightly limited (blanket retention was struck down in Digital Rights Ireland); and biometrics and facial recognition are special-category data and typically high-risk.`,
    keyPoints: [
      'CCTV: proportionate coverage, clear signage, short retention',
      'No blanket communications retention (Digital Rights Ireland)',
      'Biometrics / facial recognition = special category + DPIA',
    ],
    anchorCase: 'case:Digital-Rights-Ireland',
  },
  {
    competency: 'V.C',
    summary: `Electronic direct marketing generally needs prior opt-in consent under ePrivacy, with a narrow "soft opt-in" for similar products to existing customers; the right to object to marketing is absolute. Online behavioural advertising raises transparency and valid-consent concerns.`,
    keyPoints: [
      'Opt-in for e-marketing; soft opt-in for existing customers only',
      'Absolute right to object to marketing (Art. 21)',
      'Behavioural advertising: transparency and consent challenges',
    ],
  },
  {
    competency: 'V.D',
    summary: `Online contexts stack the rules: cloud providers are usually processors (Art. 28) and may involve international transfers; non-essential cookies need consent (Planet49); dark patterns undermine valid consent; and AI/ML raises fairness, transparency and automated-decision issues.`,
    keyPoints: [
      'Cloud provider = processor (Art. 28), plus possible transfer',
      'Cookie consent (ePrivacy; Planet49); dark patterns invalidate consent',
      'AI/ML: bias, transparency and Art. 22 automated decisions',
    ],
    anchorCase: 'case:Planet49',
  },
]
