// AI & Governance module — a combined, self-contained study section covering
// the EU AI Act, GDPR × AI, AI ethics frameworks, DPIA methodology, and AI
// governance frameworks. All notes and questions are authored originally; law
// is cited by article number and cases/instruments by name.
//
// Deliberately OUTSIDE the CIPP/E blueprint pool: these questions never enter
// drills, mocks, or readiness stats (much of this material goes beyond the
// exam). Section accuracy is tracked separately in the `moduleStats` table.

import type { Question } from '../lib/types'

export interface CaseStudy {
  title: string
  /** What actually happened — dates, actors, numbers. */
  facts: string
  /** The analytical takeaway a practitioner should extract. */
  lesson: string
}

export interface AiGovSection {
  id: string
  title: string
  tagline: string
  summary: string
  keyPoints: string[]
  caseStudies: CaseStudy[]
  questions: Question[]
}

const q = (partial: Omit<Question, 'type' | 'source'>): Question => ({
  type: 'single',
  source: 'authored',
  ...partial,
})

export const AIGOV_SECTIONS: AiGovSection[] = [
  {
    id: 'ag_ai_act',
    title: 'EU AI Act',
    tagline: 'Risk-based regulation of AI systems — Regulation (EU) 2024/1689',
    summary: `The AI Act is the first comprehensive, horizontal AI law. It regulates AI systems by RISK TIER: a short list of prohibited practices (Art. 5 — e.g. social scoring by public authorities, untargeted scraping of facial images, emotion recognition in the workplace and education); high-risk systems (safety components under Annex I, and stand-alone Annex III uses such as recruitment, credit scoring, education and law enforcement) which carry the heavy obligations — risk management, data governance, logging, human oversight, conformity assessment; limited-risk transparency duties (Art. 50 — tell people they're talking to a machine, label deepfakes); and minimal-risk systems, which are unregulated. General-purpose AI models get their own chapter: documentation and copyright/training-content duties for all GPAI, plus evaluation, adversarial testing and incident reporting where a model poses systemic risk. Roles matter: the PROVIDER develops and places the system on the market; the DEPLOYER uses it under its own authority — each has distinct duties. The Act entered into force on 1 August 2024 and applies in stages: prohibitions and AI-literacy duties from 2 February 2025, GPAI rules from 2 August 2025, and most remaining rules from 2 August 2026 — though the 2026 "digital omnibus" simplification package postponed the high-risk obligations (Annex III systems to 2 December 2027; Annex I embedded AI to 2 August 2028). Fines reach €35m or 7% of worldwide turnover for prohibited practices. Governance runs through the Commission's AI Office, the European AI Board and national market-surveillance authorities. The AI Act complements — never replaces — the GDPR: one regulates the product, the other the personal-data processing, and both can apply to the same system.`,
    keyPoints: [
      'Risk pyramid: prohibited (Art. 5) → high-risk (Annex I & III) → transparency (Art. 50) → minimal',
      'Provider (develops/places on market) vs deployer (uses under own authority) — different duties',
      'GPAI: docs + copyright policy for all; evaluation, adversarial testing, incident reporting if systemic risk',
      'Staged application from Aug 2024; 2026 omnibus delayed high-risk duties to Dec 2027 / Aug 2028',
      'Fines up to €35m / 7% turnover (prohibited practices); AI Office + AI Board + national authorities',
      'Complements the GDPR — both regimes can apply to the same AI system',
    ],
    caseStudies: [
      {
        title: 'Clearview AI — the practice the Act now bans',
        facts:
          'Clearview scraped tens of billions of facial images from the public web into a recognition database sold to law enforcement. French, Italian, Greek and Dutch supervisory authorities fined it roughly €100m cumulatively under the GDPR (biometric special-category data, no lawful basis, ignored access requests). Clearview, with no EU establishment, largely ignored the fines — prompting noyb to file a criminal complaint and the Dutch DPA to explore holding directors personally liable.',
        lesson:
          'Untargeted scraping of facial images is now an Art. 5 AI Act prohibited practice on top of the GDPR violations — two regimes, two penalty ceilings, cumulative exposure. But the saga also shows the enforcement-reach problem: a paper ban on a foreign defendant with no EU assets is hard to execute. Expect regulators to shift pressure onto EU customers and deployers of such tools.',
      },
      {
        title: 'The staged-application gap',
        facts:
          'Prohibitions became applicable on 2 February 2025, but the Act’s penalty regime and the AI Office only became operational on 2 August 2025 — and as of early 2026 no prohibited-practice enforcement action had been announced. Meanwhile the June 2026 digital-omnibus delayed the high-risk obligations to December 2027 (Annex III) and August 2028 (Annex I).',
        lesson:
          'Track three separate dates for any obligation: when it becomes law, when it becomes applicable, and when it becomes enforceable with penalties by an operational authority. Between those dates conduct can be unlawful yet weakly enforced — which is not a compliance strategy, since GDPR enforcement and civil claims still apply, and the AI Act itself remains a moving target.',
      },
    ],
    questions: [
      q({
        id: 'ag_aa_01',
        domain: 'I',
        competency: 'I.C',
        bloomLevel: 'remember',
        lawRefs: [],
        stem: 'Which practice is outright PROHIBITED by Article 5 of the EU AI Act?',
        options: [
          { id: 'a', text: 'Social scoring by public authorities leading to detrimental treatment in unrelated contexts' },
          { id: 'b', text: 'AI-assisted CV screening for recruitment' },
          { id: 'c', text: 'A customer-service chatbot that does not mention it is an AI' },
          { id: 'd', text: 'A spam filter that classifies email' },
        ],
        correct: ['a'],
        explanation:
          'Social scoring with disproportionate, context-detached detrimental treatment is banned (Art. 5). CV screening is HIGH-RISK (Annex III), an undisclosed chatbot breaches the Art. 50 TRANSPARENCY duty, and a spam filter is minimal-risk.',
      }),
      q({
        id: 'ag_aa_02',
        domain: 'I',
        competency: 'I.C',
        bloomLevel: 'understand',
        lawRefs: [],
        stem: 'A credit-scoring AI system used to evaluate consumers is classified under the AI Act as:',
        options: [
          { id: 'a', text: 'Prohibited — creditworthiness scoring is banned' },
          { id: 'b', text: 'High-risk under Annex III, with risk-management, data-governance and human-oversight obligations' },
          { id: 'c', text: 'Limited-risk, requiring only a transparency notice' },
          { id: 'd', text: 'Outside the Act, because credit is regulated by financial law' },
        ],
        correct: ['b'],
        explanation:
          'Creditworthiness evaluation of natural persons is an Annex III high-risk use: permitted, but subject to the full high-risk regime (risk management, data quality, logging, human oversight, conformity assessment) — not banned, and not merely a transparency case.',
      }),
      q({
        id: 'ag_aa_03',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'apply',
        lawRefs: [],
        stem: 'A bank licenses a third-party AI CV-screening tool and uses it to shortlist its own job applicants. Under the AI Act the bank is primarily a:',
        options: [
          { id: 'a', text: 'Provider' },
          { id: 'b', text: 'Deployer' },
          { id: 'c', text: 'Distributor' },
          { id: 'd', text: 'Notified body' },
        ],
        correct: ['b'],
        explanation:
          'The developer that places the system on the market is the provider; the bank USING it under its own authority is the deployer — with its own duties (use per instructions, human oversight, input-data relevance, and in some cases a fundamental-rights impact assessment). A deployer can become a provider if it substantially modifies the system or markets it under its own name.',
      }),
      q({
        id: 'ag_aa_04',
        domain: 'I',
        competency: 'I.C',
        bloomLevel: 'remember',
        lawRefs: [],
        stem: 'The maximum fine for using a PROHIBITED AI practice is:',
        options: [
          { id: 'a', text: '€10m or 2% of worldwide annual turnover' },
          { id: 'b', text: '€20m or 4% of worldwide annual turnover' },
          { id: 'c', text: '€35m or 7% of worldwide annual turnover' },
          { id: 'd', text: 'There is no fixed ceiling' },
        ],
        correct: ['c'],
        explanation:
          'Prohibited practices carry the top tier: up to €35m or 7% of worldwide turnover, whichever is higher — deliberately above the GDPR’s €20m/4% ceiling. Lower AI Act tiers apply to other violations and to supplying misleading information.',
      }),
      q({
        id: 'ag_aa_05',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'understand',
        lawRefs: [],
        stem: 'A general-purpose AI model is classified as posing SYSTEMIC risk. Beyond the baseline GPAI duties, its provider must additionally:',
        options: [
          { id: 'a', text: 'Obtain a licence from the European AI Board before release' },
          { id: 'b', text: 'Perform model evaluations and adversarial testing, and report serious incidents' },
          { id: 'c', text: 'Open-source the model weights' },
          { id: 'd', text: 'Store all training data in the EU' },
        ],
        correct: ['b'],
        explanation:
          'All GPAI providers owe technical documentation, a copyright policy and a training-content summary. Systemic-risk models (presumed at very large training compute) add state-of-the-art evaluation, adversarial (red-team) testing, systemic-risk mitigation, incident reporting and cybersecurity — not licensing, open-sourcing or data-localisation.',
      }),
      q({
        id: 'ag_aa_06',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'analyze',
        lawRefs: [],
        stem: 'An employer wants to run emotion-recognition AI on office CCTV to gauge staff morale. The BEST analysis is:',
        options: [
          { id: 'a', text: 'Permitted if a DPIA is completed first' },
          { id: 'b', text: 'Prohibited by the AI Act in the workplace; and the GDPR would separately govern any processing of employee data' },
          { id: 'c', text: 'Permitted as a legitimate interest of the employer' },
          { id: 'd', text: 'Only the GDPR applies, because CCTV is not an AI system' },
        ],
        correct: ['b'],
        explanation:
          'Emotion recognition in the workplace is an Art. 5 prohibited practice (narrow medical/safety exceptions aside) — no DPIA or lawful basis can cure a banned use. The two regimes apply cumulatively: the AI Act to the system, the GDPR to the personal-data processing.',
      }),
      q({
        id: 'ag_aa_07',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'analyze',
        lawRefs: [],
        stem: 'In 2026 a startup builds a facial-recognition search engine by scraping public social-media photos, Clearview-style, and sells access to EU police forces. Its total legal exposure is best described as:',
        options: [
          { id: 'a', text: 'None — the photos were publicly available' },
          { id: 'b', text: 'GDPR only, as the Clearview fines showed' },
          { id: 'c', text: 'Cumulative: GDPR violations (biometric data, no lawful basis — the ~€100m Clearview precedent) PLUS the AI Act Art. 5 untargeted-scraping prohibition with its €35m/7% ceiling' },
          { id: 'd', text: 'AI Act only, since it is the more recent law' },
        ],
        correct: ['c'],
        explanation:
          '"Publicly available" is not a lawful basis, and biometric identification data is special-category (Art. 9). The Clearview fines (FR/IT/GR/NL, ~€100m) rested entirely on the GDPR; since 2 February 2025 the same conduct is ALSO an AI Act prohibited practice. The regimes stack — neither displaces the other, and its EU deployers (police forces) carry their own exposure.',
      }),
      q({
        id: 'ag_aa_08',
        domain: 'I',
        competency: 'I.C',
        bloomLevel: 'apply',
        lawRefs: [],
        stem: 'A company ran a prohibited social-scoring system in March 2025 — after the prohibitions applied (2 Feb 2025) but before the penalty regime took effect (2 Aug 2025). The accurate legal characterisation:',
        options: [
          { id: 'a', text: 'The conduct was lawful until August 2025' },
          { id: 'b', text: 'The conduct was unlawful from February 2025 — exposed to national remedies, injunctions and parallel GDPR enforcement — but AI Act fines could not yet be imposed' },
          { id: 'c', text: 'The AI Office could fine it €35m immediately' },
          { id: 'd', text: 'Only a warning was legally possible, ever' },
        ],
        correct: ['b'],
        explanation:
          'Applicability and finability diverged for six months: prohibitions bound from 2 February 2025, while administrative fines and an operational AI Office arrived 2 August 2025. Unlawful-but-not-yet-finable conduct still grounds injunctions, civil claims and GDPR penalties — the gap is not a safe harbour.',
      }),
      q({
        id: 'ag_aa_09',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'analyze',
        lawRefs: [],
        stem: 'In July 2026, an HR-tech provider sells an Annex III CV-screening system in the EU. Which compliance picture is correct?',
        options: [
          { id: 'a', text: 'All AI Act duties already apply in full' },
          { id: 'b', text: 'Nothing applies until December 2027' },
          { id: 'c', text: 'Prohibitions, AI-literacy and transparency duties already apply, but the full high-risk regime was pushed to 2 December 2027 by the omnibus — while GDPR duties (Art. 22 safeguards, DPIA, transparency to candidates) bind TODAY' },
          { id: 'd', text: 'Only national employment law applies to hiring tools' },
        ],
        correct: ['c'],
        explanation:
          'The omnibus delayed the Annex III high-risk obligations (risk management, conformity assessment) to Dec 2027 — but earlier-staged duties stand, and the GDPR never waited: automated CV rejection engages Art. 22, WP248 criteria make a DPIA near-certain, and candidates must be told how they are assessed (Deliveroo shows opacity itself gets fined). The delay buys conformity-assessment time, not a compliance holiday.',
      }),
    ],
  },
  {
    id: 'ag_gdpr_ai',
    title: 'GDPR × AI',
    tagline: 'How data-protection law bites on training, models and automated decisions',
    summary: `The GDPR applies in full whenever an AI system processes personal data — in training, fine-tuning or use. The friction points are predictable. LAWFUL BASIS: model training (especially on scraped data) usually rides on legitimate interests, which demands the three-step test — legitimate purpose, necessity (no less-intrusive way), and a balancing against individuals' interests and reasonable expectations; EDPB Opinion 28/2024 walks through exactly this for AI models and confirms that a model trained on personal data is NOT automatically anonymous — that must be shown case by case. PRINCIPLES: purpose limitation constrains re-using old data for training; minimisation disciplines data-hungry pipelines; accuracy is engaged when a model "hallucinates" false statements about a real person (with rectification under Art. 16); storage limitation still applies to training corpora. AUTOMATED DECISIONS: Art. 22 gives a right not to be subject to a SOLELY automated decision with legal or similarly significant effects, unless it is necessary for a contract, authorised by law, or based on explicit consent — and even then the controller owes safeguards: meaningful human intervention, the right to express a view, and the right to contest. The CJEU's SCHUFA judgment held that a credit score itself can BE the Art. 22 decision where it plays a determining role in a third party's decision — you cannot outsource the automated decision and escape Art. 22. Transparency (Arts. 13–15) adds "meaningful information about the logic involved" for such decisions.`,
    keyPoints: [
      'Training on personal data needs a lawful basis — usually legitimate interests, three-step test (EDPB Op. 28/2024)',
      'Models trained on personal data are not automatically anonymous — demonstrate it case by case',
      'Art. 22: no solely automated decision with legal/significant effects, except contract / law / explicit consent',
      'Art. 22(3) safeguards: human intervention, express your view, contest the decision',
      'SCHUFA: a determining credit score is itself the automated decision — no outsourcing escape',
      'Hallucinations about real people engage accuracy (Art. 5(1)(d)) and rectification (Art. 16)',
    ],
    caseStudies: [
      {
        title: 'Garante v OpenAI — €15m imposed, then annulled on jurisdiction',
        facts:
          'After temporarily blocking ChatGPT in March 2023, Italy’s Garante fined OpenAI €15m in December 2024: no proper legal basis for training on personal data, transparency failures, an unnotified breach, and no age verification — plus an ordered six-month public awareness campaign. In March 2026 a Rome court annulled the fine: once OpenAI designated its Irish entity as main establishment, the one-stop-shop mechanism made the Irish DPC — not the Garante — the competent lead authority.',
        lesson:
          'The only GDPR fine against a generative-AI launch died on competence, not merits: the lawfulness of training was never adjudicated. Main-establishment strategy effectively selects your lead regulator — critics call it forum shopping; the court called it the law. The substantive questions moved instead to EDPB guidance (Opinion 28/2024, and the July 2026 training-data guidelines).',
      },
      {
        title: 'Meta’s EU training programme — pause, resume, litigate',
        facts:
          'In 2024 Meta announced it would train AI on EU users’ public posts under legitimate interests. noyb filed complaints in 11 Member States; under Irish DPC pressure Meta paused in June 2024, then resumed in May 2025 with more prominent notice and an advance objection mechanism. noyb answered with a cease-and-desist and threatened collective action. In July 2026 the EDPB adopted training-data guidelines requiring per-deployment legitimate-interest assessments, pre-scraping data minimisation and a strict anonymisation standard.',
        lesson:
          'Legitimate interests can carry AI training, but only with a documented balancing test and a real, frictionless, EX-ANTE objection right — retrofitted opt-outs after training are structurally too late. Note the enforcement pattern: coordinated NGO complaints plus lead-authority pressure changed behaviour twice without any fine being issued.',
      },
    ],
    questions: [
      q({
        id: 'ag_ga_01',
        domain: 'II',
        competency: 'II.C',
        bloomLevel: 'understand',
        lawRefs: [],
        stem: 'Article 22 GDPR permits a solely automated decision with legal or similarly significant effects only where:',
        options: [
          { id: 'a', text: 'The controller has a legitimate interest and performed a DPIA' },
          { id: 'b', text: 'It is necessary for a contract, authorised by Union/Member State law, or based on explicit consent' },
          { id: 'c', text: 'A human reviews at least 10% of the decisions' },
          { id: 'd', text: 'The decision can be appealed to a court' },
        ],
        correct: ['b'],
        explanation:
          'Art. 22(2) has exactly three gateways: contractual necessity, legal authorisation, or explicit consent. Legitimate interests is NOT one of them, and sampling human review does not make a decision non-solely-automated.',
      }),
      q({
        id: 'ag_ga_02',
        domain: 'II',
        competency: 'II.C',
        bloomLevel: 'apply',
        lawRefs: [],
        stem: 'A scoring agency computes a creditworthiness score; lenders in practice follow it almost mechanically when granting loans. Under the SCHUFA judgment:',
        options: [
          { id: 'a', text: 'Only the lender makes a "decision", so Art. 22 never applies to the agency' },
          { id: 'b', text: 'The score itself is an Art. 22 automated decision, because it plays a determining role in the outcome' },
          { id: 'c', text: 'Art. 22 is inapplicable because credit scores are statistical, not personal data' },
          { id: 'd', text: 'The agency merely needs to publish its algorithm' },
        ],
        correct: ['b'],
        explanation:
          'The CJEU held the automated establishment of a score is itself the "decision" where third parties draw strongly on it — otherwise Art. 22 could be evaded by splitting scoring from the formal decision. Scores about identifiable people are personal data.',
      }),
      q({
        id: 'ag_ga_03',
        domain: 'III',
        competency: 'III.B',
        bloomLevel: 'apply',
        lawRefs: [],
        stem: 'A developer relies on legitimate interests to train a model on scraped public web data. The claim is WEAKEST at which step if the same model quality was achievable with far less personal data?',
        options: [
          { id: 'a', text: 'The purpose (legitimacy) step' },
          { id: 'b', text: 'The necessity step' },
          { id: 'c', text: 'The balancing step' },
          { id: 'd', text: 'Legitimate interests never applies to training' },
        ],
        correct: ['b'],
        explanation:
          'Necessity asks whether the interest could reasonably be achieved by less intrusive means — if it could, the basis fails there before any balancing. Training AI can be a legitimate purpose; the balancing step weighs expectations and impact, but the hypothesis targets necessity.',
      }),
      q({
        id: 'ag_ga_04',
        domain: 'II',
        competency: 'II.A',
        bloomLevel: 'remember',
        lawRefs: [],
        stem: 'According to EDPB Opinion 28/2024, an AI model trained on personal data is:',
        options: [
          { id: 'a', text: 'Always anonymous once training ends, so the GDPR stops applying' },
          { id: 'b', text: 'Always personal data, so the GDPR applies to the model forever' },
          { id: 'c', text: 'Not automatically anonymous — anonymity must be demonstrated case by case' },
          { id: 'd', text: 'Pseudonymous by definition' },
        ],
        correct: ['c'],
        explanation:
          'The EDPB rejected both absolutes: a model is anonymous only if personal data cannot be extracted or regurgitated with reasonably likely means — assessed case by case, with the burden on the controller.',
      }),
      q({
        id: 'ag_ga_05',
        domain: 'II',
        competency: 'II.C',
        bloomLevel: 'remember',
        lawRefs: [],
        stem: 'Which trio are the Art. 22(3) safeguards owed when an automated decision proceeds under the contract or consent gateways?',
        options: [
          { id: 'a', text: 'Human intervention, expressing one’s point of view, contesting the decision' },
          { id: 'b', text: 'Compensation, erasure, portability' },
          { id: 'c', text: 'Encryption, pseudonymisation, access controls' },
          { id: 'd', text: 'Notice, choice, onward-transfer limits' },
        ],
        correct: ['a'],
        explanation:
          'Art. 22(3): at minimum the right to obtain human intervention, to express one’s point of view, and to contest the decision. (c) is security; (d) is old Privacy-Shield language.',
      }),
      q({
        id: 'ag_ga_06',
        domain: 'II',
        competency: 'II.C',
        bloomLevel: 'analyze',
        lawRefs: [],
        stem: 'A chatbot asserts, falsely, that a named real person was convicted of fraud. Which GDPR hooks most directly apply?',
        options: [
          { id: 'a', text: 'None — model outputs are opinions, not data' },
          { id: 'b', text: 'The accuracy principle (Art. 5(1)(d)) and the right to rectification (Art. 16)' },
          { id: 'c', text: 'Only the ePrivacy Directive' },
          { id: 'd', text: 'Data portability (Art. 20)' },
        ],
        correct: ['b'],
        explanation:
          'A false factual statement about an identifiable person is inaccurate personal data: the accuracy principle and rectification (plus possibly erasure) are engaged — the core of several supervisory-authority complaints against chatbot providers. Criminal-offence data also gets special Art. 10 treatment.',
      }),
      q({
        id: 'ag_ga_07',
        domain: 'IV',
        competency: 'IV.C',
        bloomLevel: 'analyze',
        lawRefs: [],
        stem: 'In March 2026 a Rome court annulled the Garante’s €15m fine against OpenAI. The decisive ground was:',
        options: [
          { id: 'a', text: 'Training on personal data was found lawful under legitimate interests' },
          { id: 'b', text: 'The fine was disproportionate to OpenAI’s turnover' },
          { id: 'c', text: 'One-stop-shop: with OpenAI’s main establishment in Ireland, the Irish DPC — not the Garante — was the competent lead supervisory authority' },
          { id: 'd', text: 'ChatGPT outputs are not personal data' },
        ],
        correct: ['c'],
        explanation:
          'The court never reached the merits — it held Italy lacked competence once the one-stop-shop applied. Two takeaways: establishing an EU main establishment routes enforcement to one lead SA (Art. 56), and the substantive lawfulness of generative-AI training remained unadjudicated, settled instead through EDPB guidance.',
      }),
      q({
        id: 'ag_ga_08',
        domain: 'III',
        competency: 'III.B',
        bloomLevel: 'apply',
        lawRefs: [],
        stem: 'A platform wants to train AI on its EU users’ public posts relying on legitimate interests, learning from Meta’s 2024–25 experience. The minimum viable design is:',
        options: [
          { id: 'a', text: 'Bury the change in updated terms of service' },
          { id: 'b', text: 'Prominent advance notice + an easy objection mechanism that is honoured BEFORE training starts + a documented legitimate-interest assessment with real minimisation' },
          { id: 'c', text: 'Explicit opt-in consent is the only lawful route' },
          { id: 'd', text: 'No obligations arise because the posts are public' },
        ],
        correct: ['b'],
        explanation:
          'Regulators did not rule out legitimate interests — they forced Meta to pause until notice and ex-ante objection were real. Consent is not mandatory for non-special-category public posts, but "public" never waives the GDPR. The July 2026 EDPB guidelines codify this: per-deployment LIA, pre-collection minimisation, honoured objections.',
      }),
      q({
        id: 'ag_ga_09',
        domain: 'III',
        competency: 'III.B',
        bloomLevel: 'apply',
        lawRefs: [],
        stem: 'Under the EDPB’s July 2026 training-data guidelines, a developer scraping the web for training data must now:',
        options: [
          { id: 'a', text: 'Nothing new — scraping public data was and remains unregulated' },
          { id: 'b', text: 'Run a legitimate-interest assessment per deployment, minimise BEFORE collection (filter at scraping time), and meet a strict standard before claiming the resulting model is anonymous' },
          { id: 'c', text: 'Obtain a licence from the EDPB' },
          { id: 'd', text: 'Store all training data in the EU' },
        ],
        correct: ['b'],
        explanation:
          'The guidelines ended the scrape-first-justify-later era: the LIA is per-deployment (training a model ≠ deploying it for a new purpose), minimisation must operate at collection rather than post-hoc, and model-anonymity claims face the demanding Opinion 28/2024 standard. No licensing or localisation duty exists.',
      }),
    ],
  },
  {
    id: 'ag_ethics',
    title: 'AI Ethics Frameworks',
    tagline: 'Trustworthy AI, OECD Principles, UNESCO — the soft-law layer',
    summary: `Before and alongside binding law sits a soft-law layer that shapes design choices and, increasingly, statutory text. The EU High-Level Expert Group's Ethics Guidelines for Trustworthy AI (2019) frame trustworthy AI as LAWFUL, ETHICAL and ROBUST, and unpack it into seven requirements: human agency and oversight; technical robustness and safety; privacy and data governance; transparency; diversity, non-discrimination and fairness; societal and environmental well-being; and accountability — a checklist that visibly influenced the AI Act. The OECD AI Principles (2019, updated 2024) were the first INTERGOVERNMENTAL AI standard: inclusive growth and well-being; human rights and democratic values (including fairness and privacy); transparency and explainability; robustness, security and safety; and accountability. UNESCO's Recommendation on the Ethics of AI (2021) is the first near-universal instrument, adopted by all member states. The common spine across frameworks — fairness, transparency/explainability, human oversight, privacy, accountability — matters practically: ethics fills the space law leaves open (a system can be lawful yet biased, opaque or manipulative), guides choices where rules are silent, and often previews the next round of regulation.`,
    keyPoints: [
      'HLEG Trustworthy AI: lawful + ethical + robust, unpacked into 7 requirements',
      'The 7: human agency/oversight, robustness/safety, privacy/data governance, transparency, fairness, well-being, accountability',
      'OECD AI Principles (2019) — first intergovernmental AI standard; updated 2024',
      'UNESCO Recommendation (2021) — first near-universal AI-ethics instrument',
      'Common spine: fairness, explainability, human oversight, privacy, accountability',
      'Ethics reaches where law is silent — lawful-but-biased is still an ethics failure',
    ],
    caseStudies: [
      {
        title: 'Amazon’s scrapped recruiting engine — bias in, bias out',
        facts:
          'From 2014 Amazon built a tool scoring CVs one to five stars, trained on ten years of its own hiring data — overwhelmingly male in technical roles. The model learned to penalise the word “women’s” (as in “women’s chess club captain”) and downgraded graduates of all-women’s colleges. Engineers stripped the explicit terms but could not guarantee the model wasn’t finding subtler proxies, and Amazon scrapped it around 2017–18 before production use (Reuters, 2018).',
        lesson:
          'Bias enters through historical training data, not malicious design — the model faithfully learned that past hiring favoured men. Feature hygiene (deleting gendered words) fails because models find proxies; only outcome-level disparate-impact testing reveals the problem. The overlooked half of the story: this was a governance SUCCESS — rigorous pre-deployment testing killed a harmful system before it touched real candidates.',
      },
      {
        title: 'The Dutch childcare-benefits scandal (toeslagenaffaire)',
        facts:
          'The Dutch tax administration’s risk-classification model used nationality (Dutch/non-Dutch) as a fraud-risk indicator. Roughly 26,000 families — disproportionately of foreign origin — were wrongly branded fraudsters and forced to repay benefits in full, with devastating consequences. The Dutch DPA fined the tax authority €2.75m (2021); the scandal forced the entire Rutte government to resign in January 2021. Earlier, the SyRI welfare-fraud system had been struck down by The Hague court (2020) as violating ECHR Art. 8.',
        lesson:
          'The complete anatomy of an algorithmic catastrophe: a discriminatory input feature + opacity + punitive automation + no effective route to challenge = ruined lives and a fallen government. Every ethics-framework requirement it violated (fairness, transparency, human agency, accountability) had been published years earlier — frameworks fail without institutional teeth, which is precisely the gap DPIAs, Art. 22 rights and the AI Act’s high-risk regime try to close.',
      },
    ],
    questions: [
      q({
        id: 'ag_et_01',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'remember',
        lawRefs: [],
        stem: 'Which of these is one of the EU HLEG’s seven requirements for Trustworthy AI?',
        options: [
          { id: 'a', text: 'Diversity, non-discrimination and fairness' },
          { id: 'b', text: 'Profit maximisation' },
          { id: 'c', text: 'Full automation of oversight' },
          { id: 'd', text: 'Data localisation' },
        ],
        correct: ['a'],
        explanation:
          'The seven: human agency & oversight; technical robustness & safety; privacy & data governance; transparency; diversity, non-discrimination & fairness; societal & environmental well-being; accountability. The distractors invert the guidelines’ spirit (human, not automated, oversight).',
      }),
      q({
        id: 'ag_et_02',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'remember',
        lawRefs: [],
        stem: 'The first INTERGOVERNMENTAL standard on AI (2019) came from:',
        options: [
          { id: 'a', text: 'The OECD' },
          { id: 'b', text: 'UNESCO' },
          { id: 'c', text: 'The G7' },
          { id: 'd', text: 'ISO' },
        ],
        correct: ['a'],
        explanation:
          'The OECD AI Principles (2019, updated 2024) were the first intergovernmental AI standard, later echoed by the G20. UNESCO’s Recommendation followed in 2021 as the first near-universal instrument; ISO produces technical standards, not intergovernmental policy.',
      }),
      q({
        id: 'ag_et_03',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'understand',
        lawRefs: [],
        stem: 'The HLEG guidelines say trustworthy AI must be three things throughout its lifecycle:',
        options: [
          { id: 'a', text: 'Lawful, ethical and robust' },
          { id: 'b', text: 'Fast, cheap and accurate' },
          { id: 'c', text: 'Open-source, auditable and federated' },
          { id: 'd', text: 'Certified, insured and licensed' },
        ],
        correct: ['a'],
        explanation:
          'Lawful (comply with law), ethical (respect principles and values even where law is silent), robust (technically and socially, since well-intentioned systems can still cause harm). The seven requirements operationalise these pillars.',
      }),
      q({
        id: 'ag_et_04',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'understand',
        lawRefs: [],
        stem: 'UNESCO’s 2021 Recommendation on the Ethics of AI is notable because it:',
        options: [
          { id: 'a', text: 'Is legally binding on all UN members' },
          { id: 'b', text: 'Was the first AI-ethics instrument adopted by virtually all states worldwide' },
          { id: 'c', text: 'Replaced the OECD Principles' },
          { id: 'd', text: 'Only covers military AI' },
        ],
        correct: ['b'],
        explanation:
          'Adopted by UNESCO’s full membership, it is the first near-universal AI-ethics standard — influential but non-binding (a recommendation, not a treaty), and complementary to, not a replacement of, the OECD Principles.',
      }),
      q({
        id: 'ag_et_05',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'apply',
        lawRefs: [],
        stem: 'A lender’s model is documented (architecture and training data published), yet rejected applicants cannot learn why THEY were refused. The gap is best described as one of:',
        options: [
          { id: 'a', text: 'Robustness' },
          { id: 'b', text: 'Explainability — individual-level reasons, beyond system-level transparency' },
          { id: 'c', text: 'Data minimisation' },
          { id: 'd', text: 'Accountability' },
        ],
        correct: ['b'],
        explanation:
          'Transparency about the system is not the same as explaining a specific decision to the person affected. Ethics frameworks (and Arts. 13–15/22 GDPR) demand meaningful individual-level explanation for significant decisions.',
      }),
      q({
        id: 'ag_et_06',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'analyze',
        lawRefs: [],
        stem: 'A hiring model uses postcode as a feature. Counsel confirms no law is breached, yet postcode strongly proxies for ethnicity locally. An ethics-framework analysis concludes:',
        options: [
          { id: 'a', text: 'Lawful means acceptable — ship it' },
          { id: 'b', text: 'The fairness/non-discrimination requirement is engaged: proxy discrimination is an ethical failure even when technically lawful' },
          { id: 'c', text: 'Only a DPIA can answer this' },
          { id: 'd', text: 'Remove all features to be safe' },
        ],
        correct: ['b'],
        explanation:
          'This is exactly the space ethics frameworks exist for: lawful-but-harmful. Fairness requires testing for and mitigating proxy discrimination (feature audits, disparate-impact metrics). A DPIA helps document the risk but does not settle the ethical judgment; (d) is not a serious mitigation.',
      }),
      q({
        id: 'ag_et_07',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'analyze',
        lawRefs: [],
        stem: 'Amazon’s engineers deleted explicitly gendered terms (“women’s”) from their recruiting model’s vocabulary, yet still could not certify it unbiased and scrapped it. Why was feature-deletion insufficient?',
        options: [
          { id: 'a', text: 'The model was too small to retrain' },
          { id: 'b', text: 'The training data itself encoded a male-favouring outcome distribution, so the model reconstructs the signal through proxy features that correlate with gender' },
          { id: 'c', text: 'Deleting features is illegal under US law' },
          { id: 'd', text: 'Bias only comes from the choice of algorithm, not the data' },
        ],
        correct: ['b'],
        explanation:
          'When the target variable (historical hiring outcomes) is itself skewed, the model will find whatever correlated features remain — hobbies, colleges, verb choices — to reproduce that skew. That is proxy discrimination. The reliable detection method is outcome-level: disaggregated performance and selection-rate testing across groups, not vocabulary hygiene.',
      }),
      q({
        id: 'ag_et_08',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'analyze',
        lawRefs: [],
        stem: 'Mapped against the HLEG Trustworthy AI requirements, the Dutch childcare-benefits system failed because of:',
        options: [
          { id: 'a', text: 'A single failure: using nationality as a feature' },
          { id: 'b', text: 'A compounding chain: discriminatory input (fairness), no insight into risk-scoring (transparency), punitive automation without meaningful review (human agency & oversight), and no effective challenge route (accountability)' },
          { id: 'c', text: 'Purely technical robustness defects' },
          { id: 'd', text: 'Nothing — the system operated as legally mandated' },
        ],
        correct: ['b'],
        explanation:
          'Single-cause readings miss why it became a catastrophe: any one failure alone might have been caught by the others. The nationality feature was the seed, but opacity prevented detection, automation scaled the harm to ~26,000 families, and the absence of remedy let it run for years — a chain failure across at least four of the seven HLEG requirements.',
      }),
      q({
        id: 'ag_et_09',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'apply',
        lawRefs: [],
        stem: 'Which single pre-deployment practice would most reliably have caught Amazon’s recruiting bias?',
        options: [
          { id: 'a', text: 'Measuring only overall ranking accuracy against past hiring decisions' },
          { id: 'b', text: 'Removing gender and names from CVs before scoring' },
          { id: 'c', text: 'Disaggregated evaluation: comparing the model’s scores and selection rates across demographic groups on held-out data' },
          { id: 'd', text: 'Using a larger language model' },
        ],
        correct: ['c'],
        explanation:
          'Accuracy against biased historical decisions VALIDATES the bias rather than detecting it, and (b) is the feature-hygiene approach that demonstrably failed. Only disaggregated outcome testing — selection rates and error rates per group — surfaces proxy discrimination regardless of which features carry it. Model size is orthogonal.',
      }),
    ],
  },
  {
    id: 'ag_dpia',
    title: 'DPIA Methodology',
    tagline: 'When and how to run an Article 35 assessment — and its AI Act cousin',
    summary: `A DPIA is required BEFORE any processing likely to result in a high risk to rights and freedoms, particularly with new technologies (Art. 35(1)). Three triggers are mandatory (Art. 35(3)): systematic and extensive profiling with legal or similarly significant effects; large-scale processing of special-category or criminal-offence data; and systematic large-scale monitoring of publicly accessible areas. Beyond those, the WP248 guidelines list nine risk criteria (evaluation/scoring, automated decisions with significant effect, systematic monitoring, sensitive data, large scale, dataset matching/combining, vulnerable data subjects, innovative technology, and processing that blocks rights or services) — meeting TWO or more usually means: do the DPIA. The assessment itself has four required parts (Art. 35(7)): a systematic description of the processing and purposes; an assessment of necessity and proportionality; an assessment of the risks to data subjects; and the measures envisaged to address those risks. Method: involve the DPO early, seek data-subject views where appropriate, document decisions, and treat the DPIA as a living document reviewed when risk changes. If residual risk STAYS high after mitigation, Art. 36 requires prior consultation of the supervisory authority, which has eight weeks (extendable by six) to give written advice — and may ultimately restrict or ban the processing. For high-risk AI, the DPIA increasingly pairs with the AI Act's fundamental-rights impact assessment (FRIA, Art. 27) owed by certain deployers — public bodies and providers of essential services — which may build on the DPIA rather than duplicate it.`,
    keyPoints: [
      'Art. 35(3) mandatory triggers: extensive profiling w/ significant effects · large-scale special categories · large-scale public monitoring',
      'WP248: nine criteria; two or more → do a DPIA',
      'Art. 35(7) contents: description · necessity & proportionality · risks · mitigating measures',
      'Involve the DPO; seek data-subject views where appropriate; review as risk evolves',
      'Residual high risk → Art. 36 prior consultation (8 weeks + 6 extension); SA can ban the processing',
      'High-risk AI: DPIA pairs with the AI Act FRIA (Art. 27) for certain deployers',
    ],
    caseStudies: [
      {
        title: 'Deliveroo’s “Frank” — the missing DPIA as a headline violation',
        facts:
          'Deliveroo Italy managed riders through “Frank”, an algorithm assigning orders and feeding a shift-booking system. In 2021 the Garante fined it €2.5m, finding opaque algorithmic management (riders could not understand how they were scored), excessive data collection (geolocation and message retention beyond need), inadequate security (Art. 32) — and NO data protection impact assessment despite systematic evaluation of workers with significant effects on their earnings.',
        lesson:
          'Algorithmic management of workers is a textbook DPIA case — it stacks at least three WP248 criteria (evaluation/scoring, vulnerable data subjects, systematic monitoring). And the process failure was fined in its own right: the Art. 35 violation stood alongside the substantive ones. “We would have passed a DPIA” is no defence for never doing one.',
      },
      {
        title: 'Toeslagenaffaire as the DPIA counterfactual',
        facts:
          'The Dutch tax authority’s fraud-risk model — nationality as a risk factor, ~26,000 families harmed, €2.75m DPA fine, government resignation — operated for years. A candid Art. 35 assessment of the model would have had to document a special-category-adjacent discriminatory feature, the absence of meaningful human review of risk flags, and processing whose effect was to block families’ access to essential benefits (a WP248 criterion by itself).',
        lesson:
          'A DPIA is only as good as its honesty: each red flag was visible ex ante to anyone required to write it down and assess necessity, proportionality and risks to PEOPLE rather than to the organisation. Rubber-stamp DPIAs — vague risks, mitigations like “staff will exercise care”, no residual-risk re-scoring, no review cycle — deliver paperwork, not protection.',
      },
    ],
    questions: [
      q({
        id: 'ag_dp_01',
        domain: 'IV',
        competency: 'IV.B',
        bloomLevel: 'remember',
        lawRefs: [],
        stem: 'Which of these is NOT one of the Art. 35(3) mandatory DPIA triggers?',
        options: [
          { id: 'a', text: 'Systematic, extensive profiling with legal or similarly significant effects' },
          { id: 'b', text: 'Large-scale processing of special-category data' },
          { id: 'c', text: 'Systematic large-scale monitoring of publicly accessible areas' },
          { id: 'd', text: 'Any use of a processor established outside the EEA' },
        ],
        correct: ['d'],
        explanation:
          'The three listed in (a)–(c) are the Art. 35(3) triggers. Using a non-EEA processor raises Chapter V transfer questions, not a per-se DPIA duty.',
      }),
      q({
        id: 'ag_dp_02',
        domain: 'IV',
        competency: 'IV.B',
        bloomLevel: 'understand',
        lawRefs: [],
        stem: 'The WP248 guidelines’ practical rule of thumb for when a DPIA is needed:',
        options: [
          { id: 'a', text: 'Any processing of personal data requires one' },
          { id: 'b', text: 'Meeting two or more of the nine risk criteria usually means a DPIA is required' },
          { id: 'c', text: 'Only the three Art. 35(3) triggers ever require one' },
          { id: 'd', text: 'The supervisory authority decides case by case on request' },
        ],
        correct: ['b'],
        explanation:
          'WP248 lists nine criteria (scoring, significant automated decisions, monitoring, sensitive data, large scale, matching datasets, vulnerable subjects, innovative tech, rights/service blocking). Two or more → presume a DPIA. Art. 35(3) is a floor, not the whole test.',
      }),
      q({
        id: 'ag_dp_03',
        domain: 'IV',
        competency: 'IV.B',
        bloomLevel: 'remember',
        lawRefs: [],
        stem: 'Which element is NOT a required part of a DPIA under Art. 35(7)?',
        options: [
          { id: 'a', text: 'A systematic description of the processing and its purposes' },
          { id: 'b', text: 'An assessment of necessity and proportionality' },
          { id: 'c', text: 'Approval of the assessment by the supervisory authority' },
          { id: 'd', text: 'The measures envisaged to address the risks' },
        ],
        correct: ['c'],
        explanation:
          'A DPIA is a self-assessment: description, necessity/proportionality, risk assessment, mitigation. The SA is consulted only when residual risk remains high (Art. 36) — there is no general approval requirement.',
      }),
      q({
        id: 'ag_dp_04',
        domain: 'IV',
        competency: 'IV.B',
        bloomLevel: 'apply',
        lawRefs: [],
        stem: 'A city plans live facial recognition across its central square to spot wanted persons. The correct data-protection sequencing is:',
        options: [
          { id: 'a', text: 'No DPIA — public spaces carry no privacy expectation' },
          { id: 'b', text: 'DPIA required (large-scale public monitoring + biometrics); if residual risk stays high, prior consultation under Art. 36 — and the AI Act separately restricts real-time remote biometric ID' },
          { id: 'c', text: 'A DPIA after six months of live operation' },
          { id: 'd', text: 'Only the AI Act applies to biometric systems' },
        ],
        correct: ['b'],
        explanation:
          'This stacks triggers: systematic large-scale public monitoring AND large-scale biometric (special-category) data → DPIA before deployment; unresolved high risk → Art. 36. In parallel, the AI Act treats real-time remote biometric identification in public spaces for law enforcement as prohibited save narrow, authorised exceptions. DPIAs are always ex ante.',
      }),
      q({
        id: 'ag_dp_05',
        domain: 'IV',
        competency: 'IV.B',
        bloomLevel: 'understand',
        lawRefs: [],
        stem: 'After mitigation, a DPIA still shows high residual risk. The controller must:',
        options: [
          { id: 'a', text: 'Proceed, but document the risk acceptance' },
          { id: 'b', text: 'Consult the supervisory authority before processing (Art. 36); the SA has 8 weeks, extendable by 6, to respond' },
          { id: 'c', text: 'Notify the EDPB directly' },
          { id: 'd', text: 'Abandon the processing in all cases' },
        ],
        correct: ['b'],
        explanation:
          'Unmitigated high risk is precisely the Art. 36 prior-consultation trigger. The SA gives written advice within 8 (+6) weeks and can use any of its powers, including a ban — but consultation, not automatic abandonment, is the legal step.',
      }),
      q({
        id: 'ag_dp_06',
        domain: 'IV',
        competency: 'IV.B',
        bloomLevel: 'analyze',
        lawRefs: [],
        stem: 'A public agency deploys a high-risk AI system for benefits decisions. How do the DPIA and the AI Act FRIA relate?',
        options: [
          { id: 'a', text: 'The FRIA replaces the DPIA for AI systems' },
          { id: 'b', text: 'They are complementary: the DPIA covers personal-data risks, the FRIA (Art. 27 AI Act) covers broader fundamental-rights impacts — and may build on the existing DPIA' },
          { id: 'c', text: 'The DPIA is only needed if the FRIA finds risk' },
          { id: 'd', text: 'Neither applies to public authorities' },
        ],
        correct: ['b'],
        explanation:
          'Public-body deployers of high-risk AI owe a FRIA under AI Act Art. 27, which explicitly can build on the GDPR DPIA to avoid duplication. Neither displaces the other: different instruments, overlapping method, one coherent assessment file in practice.',
      }),
      q({
        id: 'ag_dp_07',
        domain: 'IV',
        competency: 'IV.B',
        bloomLevel: 'analyze',
        lawRefs: [],
        stem: 'The Garante fined Deliveroo €2.5m partly for never conducting a DPIA on its rider-management algorithm. Which WP248 criteria made the DPIA obligatory?',
        options: [
          { id: 'a', text: 'None — worker data is exempt from DPIAs' },
          { id: 'b', text: 'Only "large scale" applied' },
          { id: 'c', text: 'At least three stacked: systematic evaluation/scoring of individuals, vulnerable data subjects (workers in a dependency relationship), and systematic monitoring — well past the two-criteria threshold' },
          { id: 'd', text: 'The use of any algorithm automatically requires a DPIA' },
        ],
        correct: ['c'],
        explanation:
          'Employees and platform workers count as vulnerable subjects because of the power imbalance; Frank scored them systematically and the app monitored them continuously. Two criteria usually suffice — Deliveroo had at least three. But (d) overreaches: a spam filter is algorithmic and needs no DPIA. The lesson is criterion-stacking analysis, not reflexive DPIAs for everything.',
      }),
      q({
        id: 'ag_dp_08',
        domain: 'IV',
        competency: 'IV.B',
        bloomLevel: 'apply',
        lawRefs: [],
        stem: 'Had a candid DPIA been run on the Dutch benefits fraud model, which findings should have stopped or reshaped the processing?',
        options: [
          { id: 'a', text: 'Server capacity and uptime risks' },
          { id: 'b', text: 'Nationality as a risk feature (discriminatory processing), no meaningful human review of automated risk flags, and effects that blocked families’ access to essential benefits' },
          { id: 'c', text: 'Only the absence of encryption at rest' },
          { id: 'd', text: 'Nothing — fraud prevention justifies any design' },
        ],
        correct: ['b'],
        explanation:
          'A DPIA assesses risks to RIGHTS AND FREEDOMS: discrimination, exclusion from services, and lack of human intervention are exactly what Art. 35(7)’s risk assessment must confront — "preventing access to a service or benefit" is itself a WP248 criterion. Security items like encryption matter but were not the harm vector; and necessity/proportionality analysis exists precisely because purposes never justify all means.',
      }),
      q({
        id: 'ag_dp_09',
        domain: 'IV',
        competency: 'IV.B',
        bloomLevel: 'analyze',
        lawRefs: [],
        stem: 'Two DPIAs list mitigations for an AI screening tool. A: “The team will take care to avoid bias.” B: “Quarterly disaggregated selection-rate testing across protected groups, threshold ±20%, owned by the ML lead, results to the DPO; residual risk re-scored after each cycle.” What makes B adequate where A is not?',
        options: [
          { id: 'a', text: 'B is longer' },
          { id: 'b', text: 'B’s measures are specific, measurable, assigned to an owner, monitored on a cycle, and feed back into a residual-risk re-assessment — A is an unverifiable intention' },
          { id: 'c', text: 'A is adequate if senior management signs it' },
          { id: 'd', text: 'Neither matters, since DPIAs are internal documents' },
        ],
        correct: ['b'],
        explanation:
          'Art. 35(7)(d) requires "measures envisaged to ADDRESS the risks" — an aspiration addresses nothing and leaves residual risk unassessable (which matters, because unmitigated high residual risk triggers Art. 36). Regulators read DPIAs in enforcement: Deliveroo and the toeslagenaffaire both show process quality being judged after the harm. Sign-off does not convert intentions into measures.',
      }),
    ],
  },
  {
    id: 'ag_governance',
    title: 'AI Governance Frameworks',
    tagline: 'NIST AI RMF, ISO/IEC 42001, CoE Convention — operationalising it all',
    summary: `Governance frameworks translate principles and law into organisational machinery. The NIST AI Risk Management Framework (AI RMF 1.0, 2023, voluntary) is built on four functions — GOVERN (culture, roles, policies), MAP (context and risks), MEASURE (assess and track), MANAGE (prioritise and respond) — widely used as a common vocabulary even outside the US. ISO/IEC 42001:2023 is the first CERTIFIABLE AI management-system standard (an "AIMS" — think ISO 27001, but for AI): plan-do-check-act, leadership commitment, risk and impact assessment, lifecycle controls, supplier management; organisations can be audited and certified against it, and harmonised standards in this family are expected to underpin the AI Act's presumption of conformity. ISO/IEC 23894 gives AI-specific risk-management guidance layered on ISO 31000. Internationally, the Council of Europe Framework Convention on AI, Human Rights, Democracy and the Rule of Law (2024) is the first BINDING international AI treaty, open to non-European states. Inside an organisation, the recurring building blocks are: an AI inventory/registry (you cannot govern what you have not catalogued); a cross-functional governance committee; clear role mapping to legal categories (provider vs deployer); lifecycle risk gates from design to decommissioning; documentation, monitoring and incident channels; and vendor/third-party AI due diligence. The frameworks interlock: NIST RMF gives the risk vocabulary, ISO 42001 the certifiable management system, and both map onto AI Act obligations — so one well-designed programme can serve all three.`,
    keyPoints: [
      'NIST AI RMF 1.0 (2023, voluntary): Govern · Map · Measure · Manage',
      'ISO/IEC 42001:2023 — first certifiable AI management-system (AIMS) standard; ISO 27001 analogue',
      'ISO/IEC 23894 — AI risk-management guidance on ISO 31000 foundations',
      'CoE Framework Convention on AI (2024) — first binding international AI treaty',
      'Org building blocks: AI inventory → committee → role mapping → lifecycle gates → monitoring → vendor diligence',
      'Interlock: NIST vocabulary + ISO 42001 certification + harmonised standards ≈ AI Act conformity path',
    ],
    caseStudies: [
      {
        title: 'The certification wave, 2024–26',
        facts:
          'AWS became the first major cloud provider with accredited ISO 42001 certification (November 2024, scoped to services including Bedrock, Q, Textract and Transcribe). Anthropic followed as the first frontier lab (January 2025); Microsoft certified its Copilot family per service. By 2026, public estimates put global certificates above 350, and enterprise procurement questionnaires increasingly demand 42001 or documented NIST RMF alignment from AI vendors.',
        lesson:
          'Soft law hardens through markets faster than through regulators: certification became a de facto vendor requirement before most AI Act obligations even applied. For buyers, the operative skill is reading the certificate SCOPE — “AWS is certified” actually means “these named services are within a certified AIMS”.',
      },
      {
        title: 'Regulators adopting a voluntary framework',
        facts:
          'US agencies including the FTC, EEOC and CFPB reference AI-RMF-aligned practices when assessing whether a company’s AI development met reasonable standards of care, and federal departments have mapped their AI risk practices to the framework. Enterprises such as Workday and Google publicly adopted it as their governance vocabulary.',
        lesson:
          'A framework nobody is legally required to follow can still define negligence: once regulators and courts treat RMF-style risk management as what a reasonable organisation does, NOT having documented Map/Measure/Manage evidence becomes the liability. Voluntary frameworks are how tomorrow’s standard of care gets written.',
      },
    ],
    questions: [
      q({
        id: 'ag_gv_01',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'remember',
        lawRefs: [],
        stem: 'The four functions of the NIST AI Risk Management Framework are:',
        options: [
          { id: 'a', text: 'Govern, Map, Measure, Manage' },
          { id: 'b', text: 'Identify, Protect, Detect, Respond' },
          { id: 'c', text: 'Plan, Do, Check, Act' },
          { id: 'd', text: 'Assess, Certify, Audit, Renew' },
        ],
        correct: ['a'],
        explanation:
          'Govern (cross-cutting culture and accountability), Map (context/risk identification), Measure, Manage. (b) is the NIST CYBERSECURITY Framework — a classic mix-up; (c) is the ISO management-system cycle.',
      }),
      q({
        id: 'ag_gv_02',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'remember',
        lawRefs: [],
        stem: 'ISO/IEC 42001:2023 is best described as:',
        options: [
          { id: 'a', text: 'A binding international treaty on AI' },
          { id: 'b', text: 'The first certifiable AI management-system standard' },
          { id: 'c', text: 'An EU harmonised technical standard for GPAI models' },
          { id: 'd', text: 'A voluntary ethics code with no audit mechanism' },
        ],
        correct: ['b'],
        explanation:
          'ISO 42001 defines an auditable, certifiable AI management system (AIMS) — the ISO 27001 analogue for AI. It is neither a treaty nor (itself) an EU harmonised standard, though standards in its family feed the AI Act conformity path.',
      }),
      q({
        id: 'ag_gv_03',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'understand',
        lawRefs: [],
        stem: 'The 2024 Council of Europe Framework Convention on AI is significant because it is:',
        options: [
          { id: 'a', text: 'The first legally binding international treaty on AI and human rights, open beyond Europe' },
          { id: 'b', text: 'An EU regulation that supersedes the AI Act' },
          { id: 'c', text: 'A voluntary industry pledge' },
          { id: 'd', text: 'A trade agreement on AI chips' },
        ],
        correct: ['a'],
        explanation:
          'Like Convention 108 before it in data protection, the CoE produced the first binding international AI instrument, open to non-member states (the US, UK and EU signed in 2024). It sets principles; it does not displace the AI Act.',
      }),
      q({
        id: 'ag_gv_04',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'apply',
        lawRefs: [],
        stem: 'A multinational wants an org-level AI governance programme it can have independently AUDITED AND CERTIFIED. The natural choice is:',
        options: [
          { id: 'a', text: 'The HLEG Trustworthy AI guidelines' },
          { id: 'b', text: 'The NIST AI RMF' },
          { id: 'c', text: 'ISO/IEC 42001' },
          { id: 'd', text: 'The OECD AI Principles' },
        ],
        correct: ['c'],
        explanation:
          'Only ISO 42001 carries a certification scheme. HLEG, NIST RMF and OECD are valuable frameworks/principles but not certifiable management-system standards — a company can ALIGN with them, not be certified against them.',
      }),
      q({
        id: 'ag_gv_05',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'understand',
        lawRefs: [],
        stem: 'The usual FIRST step when standing up AI governance in an organisation is:',
        options: [
          { id: 'a', text: 'Buying bias-testing tooling' },
          { id: 'b', text: 'Building an AI inventory / registry of systems in use and development' },
          { id: 'c', text: 'Appointing a notified body' },
          { id: 'd', text: 'Publishing an ethics charter' },
        ],
        correct: ['b'],
        explanation:
          'You cannot classify risk, assign AI Act roles, or scope DPIAs for systems you have not catalogued — the inventory (including shadow AI and vendor AI) grounds everything else. Charters and tooling come after; notified bodies are external conformity assessors, not appointments you make.',
      }),
      q({
        id: 'ag_gv_06',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'analyze',
        lawRefs: [],
        stem: 'A provider of a high-risk AI system already runs an ISO/IEC 42001-certified management system. Its cleanest argument under the AI Act is that:',
        options: [
          { id: 'a', text: 'Certification exempts it from the AI Act entirely' },
          { id: 'b', text: 'Its AIMS evidences much of the required quality/risk-management system, and compliance with harmonised standards yields a presumption of conformity' },
          { id: 'c', text: 'It may skip CE marking' },
          { id: 'd', text: 'It becomes a deployer instead of a provider' },
        ],
        correct: ['b'],
        explanation:
          'The AI Act requires providers to run quality- and risk-management systems; harmonised European standards (being developed on foundations like 42001) give a presumption of conformity for what they cover. Certification never exempts from the law, CE marking, or role obligations — it is evidence, not immunity.',
      }),
      q({
        id: 'ag_gv_07',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'apply',
        lawRefs: [],
        stem: 'An enterprise buyer wants independently AUDITED assurance about an AI vendor’s governance before contracting. Which demand actually delivers that?',
        options: [
          { id: 'a', text: 'A statement that the vendor "follows NIST AI RMF"' },
          { id: 'b', text: 'A copy of the vendor’s AI ethics charter' },
          { id: 'c', text: 'An accredited ISO/IEC 42001 certificate whose scope covers the specific service being purchased' },
          { id: 'd', text: 'The vendor’s marketing whitepaper on responsible AI' },
        ],
        correct: ['c'],
        explanation:
          'Only certification carries third-party audit. RMF alignment is self-declared (valuable, but unverified), and charters/whitepapers are marketing. The scope condition is the practitioner detail: AWS and Microsoft certify NAMED services — a certificate scoped elsewhere in the vendor’s business assures nothing about the product you are buying.',
      }),
      q({
        id: 'ag_gv_08',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'analyze',
        lawRefs: [],
        stem: 'The FTC and EEOC cite AI-RMF-aligned practices when judging whether a company acted reasonably. The governance consequence of this pattern:',
        options: [
          { id: 'a', text: 'None — voluntary frameworks have no legal effect' },
          { id: 'b', text: 'The RMF becomes directly binding US law' },
          { id: 'c', text: 'A voluntary framework becomes a de facto standard of care: documented Map/Measure/Manage evidence is a due-diligence defence, and its absence is what plaintiffs and regulators point to' },
          { id: 'd', text: 'Only ISO standards can have this effect' },
        ],
        correct: ['c'],
        explanation:
          'This is soft law’s classic hardening path (negligence law works the same way with industry practice). The framework stays formally voluntary, but reasonableness gets measured against it — so the rational strategy is to generate the documentation trail regardless of legal obligation. The same dynamic drives EU harmonised standards under the AI Act.',
      }),
    ],
  },
  {
    id: 'ag_nist',
    title: 'NIST AI RMF — deep dive',
    tagline: 'Govern · Map · Measure · Manage, trustworthiness characteristics, GenAI Profile',
    summary: `The NIST AI Risk Management Framework (AI RMF 1.0, January 2023) is a voluntary, rights-preserving framework for managing AI risk across the lifecycle — it prescribes no thresholds and is meant to be tailored. Its core is four FUNCTIONS. GOVERN is cross-cutting: it builds the culture, policies, accountability structures, and workforce competence that the other three functions depend on. MAP establishes context: intended purpose, deployment setting, stakeholders, and the identification of risks and potential impacts — the function where you first understand WHAT you have and WHO it can affect. MEASURE assesses and tracks those risks with quantitative and qualitative methods; this is the home of TEVV — test, evaluation, verification and validation — plus metrics for the framework's trustworthiness characteristics. MANAGE prioritises risks and allocates responses: mitigation, monitoring, incident response, decommissioning. The framework defines SEVEN characteristics of trustworthy AI: valid & reliable (the foundational one — nothing else matters if the system doesn't work), safe, secure & resilient, accountable & transparent, explainable & interpretable, privacy-enhanced, and fair with harmful bias managed. Around the core sit Profiles (use-case tailorings), a companion Playbook of suggested actions, and crosswalks to other frameworks. The Generative AI Profile (NIST AI 600-1, July 2024) tailors the RMF to GenAI-specific risks such as confabulation, information-integrity harms and data-privacy leakage. The RMF treats AI risk as socio-technical — measured at individual, organisational and ecosystem level — and, unlike ISO/IEC 42001, it is not certifiable: you align with it; you cannot be certified against it.`,
    keyPoints: [
      'Four functions: GOVERN (cross-cutting culture/accountability) · MAP (context & risk identification) · MEASURE (assessment, TEVV) · MANAGE (prioritise & respond)',
      'Seven trustworthiness characteristics — valid & reliable is the foundation for the rest',
      'Profiles + Playbook + crosswalks; Generative AI Profile (NIST AI 600-1, 2024) for GenAI risks like confabulation',
      'Voluntary, rights-preserving, no fixed thresholds — tailor to context; socio-technical view of risk',
      'Not certifiable — organisations align with it (contrast ISO/IEC 42001)',
    ],
    caseStudies: [
      {
        title: 'Air Canada’s chatbot — confabulation with a court judgment',
        facts:
          'Air Canada’s website chatbot told a passenger he could book a full-fare bereavement flight and claim the discount retroactively — contradicting the airline’s actual policy on the same website. When Air Canada refused the refund, the British Columbia Civil Resolution Tribunal (February 2024) ordered it to pay, expressly rejecting the airline’s argument that the chatbot was “a separate legal entity responsible for its own actions”.',
        lesson:
          'In RMF vocabulary this is a chain failure: Govern (no accountability for chatbot output as company representation), Measure (no grounding TEVV against the authoritative policy source before deployment), Manage (no monitoring or correction channel). It is also the canonical CONFABULATION example the Generative AI Profile targets — and the legal holding generalises: organisations own their models’ statements.',
      },
      {
        title: 'From voluntary framework to standard of care',
        facts:
          'US federal agencies mapped AI risk practices to the RMF, and regulators — FTC, EEOC, CFPB — reference RMF-aligned practice when evaluating whether AI development met reasonable standards. Enterprises like Workday and Google adopted it publicly; NIST added the Generative AI Profile (AI 600-1, July 2024) enumerating twelve GenAI risks including confabulation, information integrity and data privacy.',
        lesson:
          'The RMF’s power is not enforcement but vocabulary and evidence: a documented Map→Measure→Manage trail, refreshed per the GenAI Profile for LLM deployments, is what "we acted reasonably" looks like on paper when a regulator, court or enterprise customer asks.',
      },
    ],
    questions: [
      q({
        id: 'ag_ni_01',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'remember',
        lawRefs: [],
        stem: 'Which trustworthiness characteristic does the NIST AI RMF treat as FOUNDATIONAL to all the others?',
        options: [
          { id: 'a', text: 'Valid and reliable' },
          { id: 'b', text: 'Privacy-enhanced' },
          { id: 'c', text: 'Explainable and interpretable' },
          { id: 'd', text: 'Fair, with harmful bias managed' },
        ],
        correct: ['a'],
        explanation:
          'The RMF calls validity and reliability the necessary condition: a system that does not perform as intended cannot meaningfully be safe, fair or transparent. The other six characteristics build on that base.',
      }),
      q({
        id: 'ag_ni_02',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'understand',
        lawRefs: [],
        stem: 'What makes GOVERN different from the other three RMF functions?',
        options: [
          { id: 'a', text: 'It applies only to generative AI' },
          { id: 'b', text: 'It is cross-cutting: the culture, policies and accountability it creates feed every other function' },
          { id: 'c', text: 'It is optional for small organisations' },
          { id: 'd', text: 'It is performed by the regulator, not the organisation' },
        ],
        correct: ['b'],
        explanation:
          'Govern is not a lifecycle stage but the environment the others operate in — leadership commitment, roles, policies, workforce competence and risk culture that Map, Measure and Manage all draw on.',
      }),
      q({
        id: 'ag_ni_03',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'apply',
        lawRefs: [],
        stem: 'A team documents an AI system’s intended purpose, deployment context, affected stakeholders and potential downstream impacts before any metrics are chosen. In RMF terms they are performing:',
        options: [
          { id: 'a', text: 'MAP' },
          { id: 'b', text: 'MEASURE' },
          { id: 'c', text: 'MANAGE' },
          { id: 'd', text: 'An ISO 42001 surveillance audit' },
        ],
        correct: ['a'],
        explanation:
          'Establishing context and identifying risks/impacts is the Map function — it precedes Measure (assessing and tracking with TEVV and metrics) and Manage (prioritising and responding).',
      }),
      q({
        id: 'ag_ni_04',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'remember',
        lawRefs: [],
        stem: 'TEVV — test, evaluation, verification and validation — sits primarily in which RMF function?',
        options: [
          { id: 'a', text: 'Govern' },
          { id: 'b', text: 'Map' },
          { id: 'c', text: 'Measure' },
          { id: 'd', text: 'Manage' },
        ],
        correct: ['c'],
        explanation:
          'Measure is the assessment engine of the framework: quantitative and qualitative evaluation of the risks Map identified, including TEVV activities and tracking metrics for the trustworthiness characteristics.',
      }),
      q({
        id: 'ag_ni_05',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'understand',
        lawRefs: [],
        stem: 'The NIST Generative AI Profile (AI 600-1, 2024) exists to:',
        options: [
          { id: 'a', text: 'Replace the AI RMF for LLM providers' },
          { id: 'b', text: 'Tailor the RMF to GenAI-specific risks such as confabulation and information-integrity harms' },
          { id: 'c', text: 'Certify generative models as trustworthy' },
          { id: 'd', text: 'Ban high-risk generative uses' },
        ],
        correct: ['b'],
        explanation:
          'Profiles adapt the core framework to a use case or technology. The GenAI Profile maps generative-AI risks (confabulation/hallucination, information integrity, data-privacy leakage, and others) to suggested RMF actions — it neither replaces the RMF nor certifies or bans anything.',
      }),
      q({
        id: 'ag_ni_06',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'analyze',
        lawRefs: [],
        stem: 'Which statement about the AI RMF’s legal nature is accurate?',
        options: [
          { id: 'a', text: 'It is binding on all US federal contractors' },
          { id: 'b', text: 'Organisations can be certified against it after third-party audit' },
          { id: 'c', text: 'It is voluntary and non-certifiable — organisations align with it and often pair it with a certifiable standard like ISO/IEC 42001' },
          { id: 'd', text: 'It is enforced by the FTC' },
        ],
        correct: ['c'],
        explanation:
          'The RMF is voluntary guidance: hugely influential as shared vocabulary and practice, but there is no RMF certificate and no direct enforcement. Programmes wanting auditable assurance implement RMF practices inside an ISO/IEC 42001 management system.',
      }),
      q({
        id: 'ag_ni_07',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'analyze',
        lawRefs: [],
        stem: 'Air Canada’s chatbot invented a refund policy; a tribunal rejected the defence that the bot was “a separate legal entity” and ordered payment. Diagnosed with RMF functions, the failures were:',
        options: [
          { id: 'a', text: 'Only a Measure failure — better benchmarks would have fixed everything' },
          { id: 'b', text: 'Govern (no accountability for bot output as company representation), Measure (no grounding tests against the real policy before launch), and Manage (no monitoring or correction path once deployed)' },
          { id: 'c', text: 'A Map failure only, since chatbots are unmappable' },
          { id: 'd', text: 'None — the tribunal got it wrong, as AI output is not the company’s statement' },
        ],
        correct: ['b'],
        explanation:
          'Single-function diagnoses miss how the framework works together: Govern should have established that chatbot answers are company statements needing an owner; Measure should have caught policy-contradicting outputs via grounding TEVV; Manage should have detected and corrected them in production. The legal point stands regardless of framework: organisations own their models’ statements.',
      }),
      q({
        id: 'ag_ni_08',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'apply',
        lawRefs: [],
        stem: 'In the Generative AI Profile’s risk taxonomy, a customer-service LLM confidently asserting a refund policy that does not exist is the canonical example of:',
        options: [
          { id: 'a', text: 'Confabulation' },
          { id: 'b', text: 'Data poisoning' },
          { id: 'c', text: 'Model inversion' },
          { id: 'd', text: 'Prompt injection' },
        ],
        correct: ['a'],
        explanation:
          'AI 600-1 uses "confabulation" for confidently generated false content (deliberately avoiding the anthropomorphic "hallucination"). Data poisoning corrupts training data, model inversion extracts training data, and prompt injection manipulates the model via crafted input — different risks with different controls.',
      }),
      q({
        id: 'ag_ni_09',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'apply',
        lawRefs: [],
        stem: 'Under MEASURE, a team must assess the fairness of a loan-screening model. The RMF-consistent approach is:',
        options: [
          { id: 'a', text: 'Report a single overall accuracy number' },
          { id: 'b', text: 'Disaggregated evaluation — performance, selection and error rates broken out per demographic group — using a fairness definition chosen for the deployment context, tracked over time' },
          { id: 'c', text: 'Rely on the vendor’s assurance that the model is fair' },
          { id: 'd', text: 'Fairness cannot be measured, so document it as an accepted risk' },
        ],
        correct: ['b'],
        explanation:
          'Aggregate accuracy hides exactly the disparities that matter (the Amazon lesson), and the RMF stresses that fairness has multiple, context-dependent, sometimes mutually incompatible definitions — the organisation must pick and justify one per use case, then track it. Vendor assurances are Map-stage input, not Measure-stage evidence.',
      }),
    ],
  },
  {
    id: 'ag_iso42001',
    title: 'ISO/IEC 42001 — deep dive',
    tagline: 'The certifiable AIMS: clauses 4–10, Annex A controls, impact assessment, audits',
    summary: `ISO/IEC 42001:2023 defines an AI management system (AIMS) — the first standard an organisation can be CERTIFIED against for AI governance. It follows ISO's harmonised (Annex SL) structure, so its requirement clauses 4–10 mirror ISO 27001 and 9001: context of the organisation, leadership, planning, support, operation, performance evaluation, and improvement — a plan-do-check-act loop. Two assessments sit at its heart: an AI RISK assessment (what could go wrong and how likely/severe) and, distinctively, an AI system IMPACT assessment considering consequences for individuals, groups and society — a lens ISO 27001 does not have, and one that maps naturally onto DPIA and FRIA work (guidance in companion standard ISO/IEC 42005:2025). Annex A provides the reference control set — 38 controls in 9 objective areas (AI policies, internal organisation, resources, impact assessment, lifecycle, data for AI, information for interested parties, responsible use, and third-party relationships) — applied via a Statement of Applicability, with implementation guidance in Annex B. Certification works like other management-system standards: an accredited certification body (requirements for those bodies are in ISO/IEC 42006:2025) runs stage 1 and stage 2 audits, then surveillance audits within a three-year recertification cycle. Organisations already holding ISO 27001 typically INTEGRATE the AIMS with their ISMS rather than building parallel machinery, since the clause skeletons align. Two boundaries matter: the certificate attests that the MANAGEMENT SYSTEM meets the standard — it does not certify any individual AI system as safe or lawful; and certification never substitutes for legal compliance, though a well-scoped AIMS is strong evidence toward AI Act quality-management obligations.`,
    keyPoints: [
      'Annex SL structure — clauses 4–10 (context → leadership → planning → support → operation → evaluation → improvement), PDCA',
      'Twin assessments: AI risk assessment + AI system IMPACT assessment (individuals/society) — the 27001 differentiator; ISO/IEC 42005:2025 gives the method',
      'Annex A: 38 controls in 9 areas, selected via a Statement of Applicability; Annex B guidance',
      'Certification: accredited body (ISO/IEC 42006:2025), stage 1 + 2, surveillance, 3-year cycle',
      'Integrate with an existing ISO 27001 ISMS — shared clause skeleton',
      'Certifies the management system, not any single AI system — and never substitutes for legal compliance',
    ],
    caseStudies: [
      {
        title: 'AWS, Anthropic, Microsoft — reading the scope line',
        facts:
          'AWS’s November 2024 certificate — the first accredited one for a major cloud provider — covers a defined set of services (Amazon Bedrock, Q, Textract, Transcribe), not "AWS". Microsoft likewise certifies named products (GitHub Copilot, Microsoft 365 Copilot, Security Copilot). Anthropic’s January 2025 certification covers its AI development and deployment management system. Over 350 organisations held certificates by 2026.',
        lesson:
          'A 42001 certificate attaches to a scoped AIMS plus its Statement of Applicability — never to a brand. Due diligence means reading the scope statement and asking whether the service YOU are buying sits inside it. A certificate scoped to a vendor’s internal helpdesk says nothing about their hiring-screening product.',
      },
      {
        title: 'ISO/IEC 42006 — professionalising the auditors',
        facts:
          'Early demand produced a market of AI "certificates" of very mixed rigour, some issued by unaccredited bodies. ISO/IEC 42006:2025 answered by setting requirements for the certification bodies themselves — auditor competence in AI, audit-time calculation, and rules for certification documents — with accreditation bodies (e.g. Standards Council of Canada) publishing transition deadlines.',
        lesson:
          'When a standard becomes commercially valuable, certificate shopping follows; the assurance chain is only as strong as the auditor. The practical check: is the certificate issued by a body accredited against 42006? Unaccredited badges are marketing, not assurance.',
      },
    ],
    questions: [
      q({
        id: 'ag_is_01',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'remember',
        lawRefs: [],
        stem: 'Structurally, ISO/IEC 42001 is organised as:',
        options: [
          { id: 'a', text: 'Four functions: Govern, Map, Measure, Manage' },
          { id: 'b', text: 'Harmonised (Annex SL) clauses 4–10 — context, leadership, planning, support, operation, evaluation, improvement' },
          { id: 'c', text: 'A risk pyramid from prohibited to minimal risk' },
          { id: 'd', text: 'Seven trustworthiness characteristics' },
        ],
        correct: ['b'],
        explanation:
          'The Annex SL skeleton is what makes 42001 a management-system standard and lets it integrate with ISO 27001/9001. (a) is the NIST AI RMF, (c) the AI Act, (d) NIST’s trustworthiness list — a classic cross-framework confusion set.',
      }),
      q({
        id: 'ag_is_02',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'understand',
        lawRefs: [],
        stem: 'The requirement that most distinguishes ISO/IEC 42001 from ISO/IEC 27001 is:',
        options: [
          { id: 'a', text: 'Management review meetings' },
          { id: 'b', text: 'An AI system impact assessment considering consequences for individuals, groups and society' },
          { id: 'c', text: 'A Statement of Applicability' },
          { id: 'd', text: 'Internal audits' },
        ],
        correct: ['b'],
        explanation:
          '27001 assesses risk to the ORGANISATION’s information; 42001 adds an outward-facing impact assessment on people and society (method guidance in ISO/IEC 42005) — the same conceptual move a DPIA or FRIA makes. Management review, SoA and internal audit exist in both.',
      }),
      q({
        id: 'ag_is_03',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'remember',
        lawRefs: [],
        stem: 'Annex A of ISO/IEC 42001 contains:',
        options: [
          { id: 'a', text: 'The list of prohibited AI practices' },
          { id: 'b', text: '38 reference controls in 9 areas, applied via a Statement of Applicability' },
          { id: 'c', text: 'Model contractual clauses for AI vendors' },
          { id: 'd', text: 'Accreditation requirements for certification bodies' },
        ],
        correct: ['b'],
        explanation:
          'Annex A is the control catalogue (policies, internal organisation, resources, impact assessment, lifecycle, data, information for interested parties, responsible use, third parties); Annex B gives implementation guidance. Certification-body requirements live in ISO/IEC 42006; prohibitions are AI Act law, not ISO controls.',
      }),
      q({
        id: 'ag_is_04',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'apply',
        lawRefs: [],
        stem: 'A company already certified to ISO/IEC 27001 wants 42001. The sensible implementation approach is to:',
        options: [
          { id: 'a', text: 'Build a fully separate AIMS with its own leadership and audit programme' },
          { id: 'b', text: 'Integrate the AIMS into the existing ISMS — shared clause structure, combined audits, extended risk register' },
          { id: 'c', text: 'Ask the certification body to convert the 27001 certificate' },
          { id: 'd', text: 'Drop 27001, since 42001 supersedes it' },
        ],
        correct: ['b'],
        explanation:
          'The Annex SL skeleton is identical, so context, leadership, audit and improvement machinery can be shared; what 42001 adds is the AI-specific scope, impact assessment and Annex A controls. Certificates are not convertible, and the standards cover different domains — neither supersedes the other.',
      }),
      q({
        id: 'ag_is_05',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'understand',
        lawRefs: [],
        stem: 'How is ISO/IEC 42001 certification actually granted?',
        options: [
          { id: 'a', text: 'Self-declaration on the company website' },
          { id: 'b', text: 'A one-off government inspection' },
          { id: 'c', text: 'Stage 1 + stage 2 audits by an accredited certification body, then surveillance audits in a three-year cycle' },
          { id: 'd', text: 'Filing the Statement of Applicability with ISO' },
        ],
        correct: ['c'],
        explanation:
          'Standard management-system certification mechanics apply: an accredited body (meeting ISO/IEC 42006:2025) audits documentation (stage 1) and implementation (stage 2), then keeps the certificate honest with surveillance and recertification. ISO itself certifies nobody.',
      }),
      q({
        id: 'ag_is_06',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'analyze',
        lawRefs: [],
        stem: 'A vendor advertises: “Our chatbot is ISO 42001-certified, so it is legally compliant and safe.” The accurate correction is:',
        options: [
          { id: 'a', text: 'Correct — certification covers the product and its legal compliance' },
          { id: 'b', text: '42001 certifies the organisation’s MANAGEMENT SYSTEM, not any individual AI system — and certification never substitutes for legal compliance' },
          { id: 'c', text: 'Correct, provided the certificate is under three years old' },
          { id: 'd', text: 'Wrong only because chatbots are out of 42001’s scope' },
        ],
        correct: ['b'],
        explanation:
          'The certificate attests that governance processes meet the standard within the audited scope. It says nothing dispositive about one product’s safety or lawfulness — GDPR and AI Act duties apply regardless. Chatbots are not excluded from AIMS scope; the flaw is the category error, not the product type.',
      }),
      q({
        id: 'ag_is_07',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'analyze',
        lawRefs: [],
        stem: 'A vendor’s sales deck shows an ISO 42001 badge; the certificate’s scope statement reads “AIMS for internal IT service-desk automation”. You are buying their AI hiring-screening product. The correct assessment:',
        options: [
          { id: 'a', text: 'The badge covers the company, so the hiring product is assured' },
          { id: 'b', text: 'The certificate is irrelevant to your purchase: the hiring product sits outside the certified scope — exactly why AWS and Microsoft certificates name specific services' },
          { id: 'c', text: 'ISO certificates cannot be scoped' },
          { id: 'd', text: 'The badge is fraudulent by definition' },
        ],
        correct: ['b'],
        explanation:
          'Scope is the whole game in management-system certification: the audit examined the service-desk AIMS and nothing else. The badge is legitimate but immaterial to the product you are buying. Procurement due diligence = scope statement + Statement of Applicability + accredited issuer, then contract-level assurances for the actual product.',
      }),
      q({
        id: 'ag_is_08',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'apply',
        lawRefs: [],
        stem: 'An organisation already runs mature GDPR DPIAs. Implementing 42001’s AI system impact assessment, it should:',
        options: [
          { id: 'a', text: 'Run the two assessments as unrelated parallel documents' },
          { id: 'b', text: 'Extend the DPIA machinery: keep its rights-and-freedoms core, broaden the lens to societal and non-personal-data harms (ISO/IEC 42005 gives the method), and cross-reference one assessment file' },
          { id: 'c', text: 'Skip it — a DPIA fully satisfies the 42001 requirement' },
          { id: 'd', text: 'Replace DPIAs with the ISO assessment, since ISO supersedes the GDPR' },
        ],
        correct: ['b'],
        explanation:
          'The assessments overlap heavily but are not congruent: a DPIA is bounded by personal-data processing, while the 42001/42005 impact assessment also reaches societal effects, environmental impacts and harms not routed through personal data (and applies where no personal data is processed at all). One extended methodology avoids duplication; neither instrument can replace the other — the same integration logic as DPIA + FRIA.',
      }),
      q({
        id: 'ag_is_09',
        domain: 'V',
        competency: 'V.D',
        bloomLevel: 'analyze',
        lawRefs: [],
        stem: 'Why did ISO/IEC 42006:2025 need to exist at all?',
        options: [
          { id: 'a', text: 'To add more Annex A controls for organisations' },
          { id: 'b', text: 'Because commercially valuable certification invites certificate shopping: 42006 disciplines the CERTIFIERS — AI-specific auditor competence, audit-time rules, certification-document requirements — so an accredited 42001 certificate means something' },
          { id: 'c', text: 'To make ISO 42001 legally binding in the EU' },
          { id: 'd', text: 'To replace ISO/IEC 17021 for all management systems' },
        ],
        correct: ['b'],
        explanation:
          '42006 regulates certification bodies, not certified organisations — it layers AI-specific requirements on the generic ISO/IEC 17021-1 regime for management-system certifiers. The assurance chain (standard → auditor → accreditor) is only as credible as its weakest link; when early AI badges of mixed rigour appeared, hardening the auditor link was the fix.',
      }),
    ],
  },
]

export const AIGOV_QUESTION_COUNT = AIGOV_SECTIONS.reduce((n, s) => n + s.questions.length, 0)
