// Confusion pairs — discrimination training for classically confused CIPP/E
// concept pairs. Each prompt describes ONE of the two concepts; the learner
// picks which. All prompts and notes are authored originally; law is cited by
// article number and cases by name only.

import type { ConfusionPair } from '../lib/types'

export const CONFUSION_PAIRS: ConfusionPair[] = [
  {
    id: 'cp_edpb_edps',
    a: 'EDPB',
    b: 'EDPS',
    domain: 'IV',
    competency: 'IV.C',
    contrast:
      'EDPB = the board of all national SAs ensuring consistent GDPR application; EDPS = the supervisory authority for the EU institutions themselves.',
    items: [
      {
        prompt:
          'Issues guidelines and binding consistency decisions so national supervisory authorities apply the GDPR uniformly.',
        answer: 'a',
      },
      {
        prompt: 'Supervises the processing of personal data by EU institutions, bodies and agencies.',
        answer: 'b',
      },
      {
        prompt:
          'Composed of the head of one supervisory authority from each Member State (plus the other body in this pair).',
        answer: 'a',
        note: 'The EDPS is a member of the EDPB — but with limited voting rights.',
      },
      {
        prompt: 'Enforces Regulation (EU) 2018/1725 rather than the GDPR itself.',
        answer: 'b',
        note: 'Reg. 2018/1725 is the GDPR-equivalent regime for the EU institutions.',
      },
      {
        prompt: 'Adopts opinions on draft adequacy decisions and Art. 65 dispute-resolution decisions.',
        answer: 'a',
      },
      {
        prompt: 'Provides the secretariat that supports the board’s work.',
        answer: 'b',
        note: 'Classic trap: the EDPS provides the EDPB’s secretariat (Art. 75).',
      },
    ],
  },
  {
    id: 'cp_scc_bcr',
    a: 'SCCs',
    b: 'BCRs',
    domain: 'III',
    competency: 'III.D',
    contrast:
      'SCCs = Commission-adopted contract clauses any exporter/importer can sign as-is; BCRs = binding internal rules for intra-group transfers, approved by a supervisory authority.',
    items: [
      {
        prompt: 'Adopted by the European Commission as ready-made contractual terms.',
        answer: 'a',
      },
      {
        prompt:
          'Require approval by the competent supervisory authority under the consistency mechanism.',
        answer: 'b',
        note: 'Art. 47 — approved by the SA via the Art. 63 consistency mechanism.',
      },
      {
        prompt: 'Best suited to a one-off transfer between two unrelated companies.',
        answer: 'a',
      },
      {
        prompt: 'Designed for repeated transfers inside a multinational corporate group.',
        answer: 'b',
      },
      {
        prompt: 'Must be used without modifying the safeguard text itself (though clauses can be added).',
        answer: 'a',
        note: 'Post-Schrems II, BOTH still need a transfer impact assessment of the destination law.',
      },
      {
        prompt:
          'A legally binding internal code that data subjects can enforce as third-party beneficiaries across the group.',
        answer: 'b',
      },
    ],
  },
  {
    id: 'cp_art33_art34',
    a: 'Art. 33 (notify the SA)',
    b: 'Art. 34 (tell data subjects)',
    domain: 'II',
    competency: 'II.B',
    contrast:
      'Art. 33 = notify the supervisory authority within 72 h unless the breach is unlikely to result in risk; Art. 34 = communicate to data subjects only when the risk is HIGH.',
    items: [
      {
        prompt: 'Carries the 72-hour deadline, counted from awareness of the breach.',
        answer: 'a',
      },
      {
        prompt: 'Triggered only where the breach is likely to result in a HIGH risk to individuals.',
        answer: 'b',
      },
      {
        prompt: 'Required unless the breach is unlikely to result in any risk to rights and freedoms.',
        answer: 'a',
        note: 'Different thresholds: any risk → SA; high risk → data subjects.',
      },
      {
        prompt:
          'Not required if the affected data were rendered unintelligible (e.g. encrypted) or the high risk has since been mitigated.',
        answer: 'b',
        note: 'Art. 34(3) exceptions.',
      },
      {
        prompt: 'May be done in phases, with reasons given for any delay.',
        answer: 'a',
      },
      {
        prompt:
          'Can be replaced by a public communication where individual notice would involve disproportionate effort.',
        answer: 'b',
      },
    ],
  },
  {
    id: 'cp_controller_processor',
    a: 'Controller',
    b: 'Processor',
    domain: 'II',
    competency: 'II.A',
    contrast:
      'Controller determines the purposes and essential means of processing; processor acts only on the controller’s documented instructions.',
    items: [
      {
        prompt: 'Decides WHY the personal data are processed.',
        answer: 'a',
      },
      {
        prompt: 'Must not engage a sub-processor without prior written authorisation.',
        answer: 'b',
        note: 'Art. 28(2).',
      },
      {
        prompt: 'Primarily responsible for answering data-subject access requests.',
        answer: 'a',
      },
      {
        prompt:
          'Processes only on documented instructions — and becomes a controller for any processing where it starts deciding purposes itself.',
        answer: 'b',
        note: 'Art. 28(10).',
      },
      {
        prompt: 'Chooses the “essential means” — which data, how long, who may access.',
        answer: 'a',
        note: 'EDPB guidance: non-essential (technical) means may be left to the processor.',
      },
      {
        prompt: 'On discovering a personal data breach, must notify the other party in this pair without undue delay.',
        answer: 'b',
        note: 'Art. 33(2): processor → controller; the controller then handles SA notification.',
      },
    ],
  },
  {
    id: 'cp_108_108plus',
    a: 'Convention 108',
    b: 'Convention 108+',
    domain: 'I',
    competency: 'I.A',
    contrast:
      '108 (1981) = the first binding international data-protection treaty; 108+ (2018, Protocol CETS 223) = its GDPR-era modernisation.',
    items: [
      {
        prompt:
          'Opened for signature in 1981 as the first legally binding international data-protection instrument.',
        answer: 'a',
      },
      {
        prompt: 'Adds breach notification and strengthened, independent supervisory authorities.',
        answer: 'b',
      },
      {
        prompt: 'Contemporary of the (non-binding) 1980 OECD Guidelines.',
        answer: 'a',
      },
      {
        prompt: 'Adopted in 2018 to modernise the treaty for the digital era.',
        answer: 'b',
      },
      {
        prompt: 'Known formally as the amending Protocol CETS No. 223.',
        answer: 'b',
      },
      {
        prompt: 'Influenced the drafting of Data Protection Directive 95/46/EC.',
        answer: 'a',
        note: 'A Council of Europe treaty — open to non-European states, unlike EU law.',
      },
    ],
  },
  {
    id: 'cp_erasure_restriction',
    a: 'Erasure (Art. 17)',
    b: 'Restriction (Art. 18)',
    domain: 'II',
    competency: 'II.C',
    contrast:
      'Erasure = the data are deleted; restriction = the data are kept but frozen — stored, and otherwise processed only in narrow cases.',
    items: [
      {
        prompt: 'The “right to be forgotten”, anchored in the Google Spain judgment.',
        answer: 'a',
      },
      {
        prompt: 'Applies while the accuracy of contested data is being verified.',
        answer: 'b',
      },
      {
        prompt:
          'Data may still be stored, but otherwise processed only with consent or for legal claims.',
        answer: 'b',
        note: 'Art. 18(2).',
      },
      {
        prompt: 'Can be refused where processing is necessary for freedom of expression and information.',
        answer: 'a',
        note: 'Art. 17(3)(a).',
      },
      {
        prompt:
          'The option for a data subject who opposes deletion (e.g. needs the data for a claim) but wants processing halted.',
        answer: 'b',
      },
      {
        prompt:
          'Where the data were made public, obliges the controller to take reasonable steps to inform other controllers processing them.',
        answer: 'a',
        note: 'Art. 17(2).',
      },
    ],
  },
  {
    id: 'cp_gdpr_eprivacy',
    a: 'GDPR',
    b: 'ePrivacy Directive',
    domain: 'I',
    competency: 'I.C',
    contrast:
      'GDPR = the general regime for personal data; ePrivacy = lex specialis for electronic communications — cookies, e-marketing, confidentiality.',
    items: [
      {
        prompt:
          'Governs placing cookies or similar tech on a user’s device — even where no personal data are involved.',
        answer: 'b',
        note: 'Art. 5(3) ePrivacy protects the terminal equipment, not just personal data.',
      },
      {
        prompt: 'Directly applicable in every Member State without national implementing law.',
        answer: 'a',
        note: 'A directive (like ePrivacy) must be transposed nationally; a regulation applies directly.',
      },
      {
        prompt: 'Supplies the definition of “consent” that cookie banners must satisfy.',
        answer: 'a',
        note: 'Planet49: pre-ticked boxes fail this consent standard.',
      },
      {
        prompt:
          'Sets the opt-in rule for unsolicited electronic marketing, with the existing-customer “soft opt-in” exception.',
        answer: 'b',
      },
      {
        prompt: 'As lex specialis, its specific rules prevail for electronic-communications matters.',
        answer: 'b',
      },
      {
        prompt:
          'Requires an Article 6 lawful basis for any onward processing of personal data harvested via cookies.',
        answer: 'a',
      },
    ],
  },
  {
    id: 'cp_adequacy_safeguards',
    a: 'Adequacy (Art. 45)',
    b: 'Appropriate safeguards (Art. 46)',
    domain: 'III',
    competency: 'III.D',
    contrast:
      'Adequacy = a Commission decision on a third country’s legal order, so transfers flow freely; appropriate safeguards = the exporter itself supplies the protection (SCCs, BCRs, codes, certification).',
    items: [
      {
        prompt: 'A finding by the European Commission about a third country’s legal system as a whole.',
        answer: 'a',
      },
      {
        prompt: 'The route relying on SCCs, BCRs, approved codes of conduct or certification.',
        answer: 'b',
      },
      {
        prompt: 'Struck down twice for the US — Safe Harbour in Schrems I, Privacy Shield in Schrems II.',
        answer: 'a',
      },
      {
        prompt:
          'Requires the exporter to assess destination-country law itself and supplement protections where needed (a TIA).',
        answer: 'b',
      },
      {
        prompt: 'Under it, transfers need no further authorisation and flow as if intra-EEA.',
        answer: 'a',
        note: 'The EU–US Data Privacy Framework also operates through this mechanism.',
      },
      {
        prompt:
          'Enforceable data-subject rights and effective remedies must be built into the transfer tool itself.',
        answer: 'b',
      },
    ],
  },
  {
    id: 'cp_objection_withdrawal',
    a: 'Objection (Art. 21)',
    b: 'Withdrawal of consent (Art. 7(3))',
    domain: 'II',
    competency: 'II.C',
    contrast:
      'Objection targets processing based on legitimate interests or public task; withdrawal ends processing that was based on consent.',
    items: [
      {
        prompt: 'Available only where consent was the lawful basis for the processing.',
        answer: 'b',
      },
      {
        prompt: 'For direct marketing it is absolute — no balancing test, processing must simply stop.',
        answer: 'a',
        note: 'Art. 21(2)–(3).',
      },
      {
        prompt: 'Must be as easy to do as the act that first permitted the processing.',
        answer: 'b',
        note: 'Art. 7(3): withdrawing must be as easy as giving consent.',
      },
      {
        prompt:
          'The controller may continue if it demonstrates compelling legitimate grounds that override the individual’s interests.',
        answer: 'a',
      },
      {
        prompt: 'Does not make the processing that already happened retroactively unlawful.',
        answer: 'b',
      },
      {
        prompt: 'Applies to processing based on Art. 6(1)(e) or (f), including profiling.',
        answer: 'a',
      },
    ],
  },
  {
    id: 'cp_dpia_priorconsult',
    a: 'DPIA (Art. 35)',
    b: 'Prior consultation (Art. 36)',
    domain: 'IV',
    competency: 'IV.B',
    contrast:
      'DPIA = the controller’s own assessment of likely-high-risk processing; prior consultation = going to the SA when the DPIA still shows unmitigated high risk.',
    items: [
      {
        prompt:
          'Required before processing “likely to result in a high risk”, e.g. large-scale special-category data.',
        answer: 'a',
      },
      {
        prompt: 'Triggered only when residual risk remains high despite the planned mitigations.',
        answer: 'b',
      },
      {
        prompt: 'Conducted by the controller, who must seek the advice of the DPO where one is designated.',
        answer: 'a',
      },
      {
        prompt: 'The supervisory authority must respond with written advice within eight weeks (extendable by six).',
        answer: 'b',
      },
      {
        prompt: 'Systematic large-scale monitoring of a publicly accessible area is a textbook trigger.',
        answer: 'a',
        note: 'Art. 35(3) lists the mandatory cases.',
      },
      {
        prompt: 'Can end with the SA exercising any of its powers — including banning the processing.',
        answer: 'b',
      },
    ],
  },
]
