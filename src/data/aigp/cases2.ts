// AIGP case studies, batch 2 — deployment, training data, bias auditing and
// third-party model risk. Original scenarios modelled on documented failures.

import type { Question } from '../../lib/types'
import type { AiGpCase } from './cases'

export const AIGP_CASES_2: AiGpCase[] = [
  {
    id: 'case_clinic_triage',
    title: 'The model that worked — elsewhere',
    premise: 'A clinical model validated on one population underperforms on another.',
    groundedIn:
      'Modelled on repeated findings that clinical prediction and risk-scoring models degrade or discriminate when applied to populations unlike their training data — including widely reported cases where a proxy variable encoded existing inequity.',
    scenario:
      'Lakeside Health licenses a deterioration-prediction model trained on data from a large urban academic hospital network. Its published accuracy is strong. Lakeside serves a rural population with a different age profile, different comorbidity patterns and a higher proportion of patients who present late. Six months after deployment, an internal audit finds the model’s sensitivity is markedly lower for patients over 75 and for those whose first contact is the emergency department. Clinicians have begun describing it as "usually right", and escalation rates for borderline cases have fallen.',
  },
  {
    id: 'case_scraped_corpus',
    title: 'The convenient corpus',
    premise: 'A training set is assembled quickly, with rights and provenance unexamined.',
    groundedIn:
      'Modelled on enforcement patterns around training data: regulators have ordered deletion of models built on improperly obtained data, and 2026 EDPB guidance requires per-deployment legitimate-interest assessment and minimisation before scraping.',
    scenario:
      'Cadence Analytics builds a customer-sentiment model. To hit a launch date, the data team assembles a corpus from three sources: transcripts from the company’s own support system, a purchased dataset whose licence they have not read closely, and text scraped from public forums and review sites. No record is kept of which records came from where. The purchased dataset turns out to include content the seller had no right to license, and the forum scrape captured usernames and, in places, personal details users had posted about themselves.',
  },
  {
    id: 'case_promotion_audit',
    title: 'The audit nobody wanted',
    premise: 'A promotion-recommendation tool shows a disparity late in its life.',
    groundedIn:
      'Modelled on the Amazon recruiting-tool failure (bias learned from historical decisions, proxies surviving feature deletion) and on jurisdictions such as New York City that now require bias audits of automated employment decision tools.',
    scenario:
      'Halden Group has used an internal tool for three years to recommend employees for promotion, trained on a decade of past promotion decisions. A new HR analytics lead runs the first disaggregated analysis and finds that recommendation rates for women in technical grades are roughly 40% of those for men with comparable performance ratings. Gender is not an input. The tool’s recommendations are followed by managers in about 90% of cases. Legal asks whether the analysis should have been run at all, "since now we know".',
  },
  {
    id: 'case_vendor_switch',
    title: 'The model that changed underneath',
    premise: 'A vendor deprecates the model version an application depends on.',
    groundedIn:
      'Reflects a routine operational reality of hosted models: providers retire and update model versions on their own schedule, silently changing behaviour that downstream validation, prompts and monitoring baselines were built around.',
    scenario:
      'Tessellate Insurance uses a hosted LLM to summarise claims documents for adjusters. The integration was validated a year ago against a specific model version. The vendor announces that version will be retired in 60 days and traffic will move to a newer one. Tessellate’s contract contains no notice provision for model changes. The team’s prompts were tuned to the old version’s behaviour, the summarisation quality metrics were baselined on it, and adjusters have come to rely on a consistent summary format. Nobody currently owns re-validation.',
  },
]

const q = (p: Omit<Question, 'source'>): Question => ({ source: 'authored', ...p })

const inCase = (caseId: string, items: Omit<Question, 'source'>[]): Question[] => {
  const c = AIGP_CASES_2.find((x) => x.id === caseId)!
  return items.map((i) => q({ ...i, scenario: c.scenario, caseId: c.id, caseTitle: c.title }))
}

export const AIGP_CASE_QUESTIONS_2: Question[] = [
  // ── Case 5: the model that worked elsewhere ───────────────────────────────
  ...inCase('case_clinic_triage', [
    {
      id: 'ai_q_c501',
      type: 'single',
      domain: 'IV',
      competency: 'IV.B',
      bloomLevel: 'analyze',
      lawRefs: [],
      stem: 'What should Lakeside have done differently before deployment?',
      options: [
        { id: 'a', text: 'Negotiated a lower licence fee' },
        { id: 'b', text: 'Validated the model on its OWN population — disaggregated by age, presentation route and other locally relevant strata — rather than relying on the vendor’s published accuracy from a different population' },
        { id: 'c', text: 'Required the vendor to open-source the model' },
        { id: 'd', text: 'Waited for the model to be CE marked' },
      ],
      correct: ['b'],
      explanation:
        'Published accuracy describes performance on the validation population, and generalisation to a different case mix is an empirical question, not an assumption. Local, disaggregated validation before go-live is the control — and it is exactly what deployer-side impact assessment is for.',
    },
    {
      id: 'ai_q_c502',
      type: 'single',
      domain: 'IV',
      competency: 'IV.C',
      bloomLevel: 'analyze',
      lawRefs: [],
      stem: 'Clinicians now call the model "usually right" and escalate borderline cases less often. This is best described as:',
      options: [
        { id: 'a', text: 'Successful adoption and change management' },
        { id: 'b', text: 'Automation bias degrading the human-oversight control: reliance has grown precisely where the model is weakest, so oversight no longer catches the errors it was meant to catch' },
        { id: 'c', text: 'Concept drift' },
        { id: 'd', text: 'A data-quality problem in the source records' },
      ],
      correct: ['b'],
      explanation:
        'The dangerous pattern is that trust and weakness coincide: the model is least reliable for older, late-presenting patients, and those are exactly the borderline cases now being escalated less. Falling escalation rates are a monitoring signal about the humans, not just the model.',
    },
    {
      id: 'ai_q_c503',
      type: 'multiple',
      domain: 'III',
      competency: 'III.C',
      bloomLevel: 'apply',
      lawRefs: [],
      stem: 'Select THREE actions Lakeside should take now, in the right spirit of proportionate response.',
      options: [
        { id: 'a', text: 'Inform clinicians of the identified performance gaps and adjust guidance so the model is not relied on for the affected patient groups' },
        { id: 'b', text: 'Quantify patient-safety impact to date and determine whether incident reporting or clinical review of past cases is required' },
        { id: 'c', text: 'Remove the model silently to avoid alarming staff' },
        { id: 'd', text: 'Engage the vendor on retraining or recalibration, with local validation as an acceptance condition' },
        { id: 'e', text: 'Continue as-is and re-audit in twelve months' },
      ],
      correct: ['a', 'b', 'd'],
      explanation:
        'Tell the people relying on it, understand the harm already done, and fix the root cause with a validation gate. Silent removal destroys the trust and the audit trail that incident handling depends on; deferring action for a year is not a response to a known safety gap.',
    },
    {
      id: 'ai_q_c504',
      type: 'single',
      domain: 'IV',
      competency: 'IV.A',
      bloomLevel: 'understand',
      lawRefs: [],
      stem: 'Which factor in the deployment-decision framework was most clearly underweighted here?',
      options: [
        { id: 'a', text: 'Deployment topology (cloud versus on-premise)' },
        { id: 'b', text: 'Fit between the use-case context — population, presentation patterns, error tolerance — and the conditions under which the model was developed and validated' },
        { id: 'c', text: 'Model size' },
        { id: 'd', text: 'Licence cost' },
      ],
      correct: ['b'],
      explanation:
        'Context fit is the first question in the deployment decision, and in a clinical setting error tolerance is asymmetric: a missed deterioration is not comparable to a false alert. Infrastructure and commercial terms matter, but they were never the risk here.',
    },
  ]),

  // ── Case 6: the convenient corpus ─────────────────────────────────────────
  ...inCase('case_scraped_corpus', [
    {
      id: 'ai_q_c601',
      type: 'single',
      domain: 'III',
      competency: 'III.B',
      bloomLevel: 'analyze',
      lawRefs: ['aia:Art.10'],
      stem: 'Beyond the specific licensing problem, what is the most consequential structural failure?',
      options: [
        { id: 'a', text: 'The corpus was too small' },
        { id: 'b', text: 'No provenance record: because nobody can say which records came from which source, Cadence cannot isolate the tainted data, prove rights for the rest, honour deletion requests, or scope remediation short of rebuilding' },
        { id: 'c', text: 'The team used more than one data source' },
        { id: 'd', text: 'Support transcripts should never be used for training' },
      ],
      correct: ['b'],
      explanation:
        'Lineage is what converts a data problem into a bounded problem. Without it, every remedy — targeted deletion, rights evidence, retraining a clean model — becomes all-or-nothing, which is how a licensing defect escalates into scrapping a model.',
    },
    {
      id: 'ai_q_c602',
      type: 'single',
      domain: 'II',
      competency: 'II.B',
      bloomLevel: 'apply',
      lawRefs: ['law:ftc5', 'law:ip'],
      stem: 'What is the realistic worst-case exposure from the improperly licensed dataset?',
      options: [
        { id: 'a', text: 'A refund of the dataset purchase price' },
        { id: 'b', text: 'Infringement claims from rightsholders plus, in some jurisdictions, an order to delete the models and algorithms derived from the data — algorithmic disgorgement — not merely the dataset' },
        { id: 'c', text: 'A requirement to credit the original authors' },
        { id: 'd', text: 'No exposure, since Cadence bought the data in good faith' },
      ],
      correct: ['b'],
      explanation:
        'The derived asset is the value at risk. Good-faith purchase may support a claim against the seller, but it does not cure a lack of rights against the rightsholder — which is why licence diligence on training data is a commercial control, not paperwork.',
    },
    {
      id: 'ai_q_c603',
      type: 'multiple',
      domain: 'II',
      competency: 'II.A',
      bloomLevel: 'apply',
      lawRefs: ['gdpr:Art.5', 'gdpr:Art.6'],
      stem: 'The forum scrape captured personal data. Select THREE data-protection questions Cadence must now answer.',
      options: [
        { id: 'a', text: 'What lawful basis covered the scraping, and was a legitimate-interest assessment performed before collection' },
        { id: 'b', text: 'Whether minimisation was applied at collection — filtering personal data out at scraping time rather than after the fact' },
        { id: 'c', text: 'Whether the forum’s visual design was reproduced' },
        { id: 'd', text: 'Whether affected individuals can be informed and their rights (objection, erasure) can be honoured against the corpus and any model trained on it' },
        { id: 'e', text: 'How many GPUs were used in training' },
      ],
      correct: ['a', 'b', 'd'],
      explanation:
        'These are precisely the points the 2026 EDPB training-data guidance emphasises: a documented per-deployment LIA, minimisation before collection, and the practical ability to honour rights. Publicly posted personal data remains personal data.',
    },
    {
      id: 'ai_q_c604',
      type: 'single',
      domain: 'I',
      competency: 'I.C',
      bloomLevel: 'apply',
      lawRefs: [],
      stem: 'Which policy control would most reliably have prevented this situation?',
      options: [
        { id: 'a', text: 'A rule that all training data must be stored in the EU' },
        { id: 'b', text: 'A data-intake gate: no dataset enters a training pipeline without a recorded source, documented rights to use it for this purpose, and an owner — enforced technically, not by convention' },
        { id: 'c', text: 'A requirement that only open-source models be used' },
        { id: 'd', text: 'Annual data-protection training for the data team' },
      ],
      correct: ['b'],
      explanation:
        'Governance works when it sits in the pipeline rather than in a document: register the dataset, record rights and owner, or the pipeline rejects it. Training raises awareness but does not stop a team under deadline pressure; residency and model licensing address different risks entirely.',
    },
  ]),

  // ── Case 7: the audit nobody wanted ───────────────────────────────────────
  ...inCase('case_promotion_audit', [
    {
      id: 'ai_q_c701',
      type: 'single',
      domain: 'II',
      competency: 'II.B',
      bloomLevel: 'analyze',
      lawRefs: ['law:nondiscrimination'],
      stem: 'Legal asks whether the analysis should have been run "since now we know". The correct governance answer is:',
      options: [
        { id: 'a', text: 'Correct — knowledge creates liability, so testing should be avoided' },
        { id: 'b', text: 'Wrong: the disparity exists whether or not it is measured, discovery is likely through other routes, and deliberate ignorance is neither a defence nor consistent with accountability — testing is a control, and failing to test is itself a finding' },
        { id: 'c', text: 'Correct, provided the results are not written down' },
        { id: 'd', text: 'It depends on whether any employee has complained' },
      ],
      correct: ['b'],
      explanation:
        'Deliberate non-measurement is a governance failure and, in several regimes, aggravating rather than protective. Accountability requires being able to demonstrate that outcomes were monitored — and some jurisdictions now mandate bias audits of automated employment decision tools outright.',
    },
    {
      id: 'ai_q_c702',
      type: 'single',
      domain: 'III',
      competency: 'III.B',
      bloomLevel: 'analyze',
      lawRefs: [],
      stem: 'Gender is not an input, yet the disparity is large. The most likely mechanism is:',
      options: [
        { id: 'a', text: 'Random variation that will disappear with more data' },
        { id: 'b', text: 'The model learned from a decade of past promotion decisions that were themselves skewed, and reconstructs the pattern through correlated proxies such as tenure, role history, project allocation or manager-written text' },
        { id: 'c', text: 'A software bug in the scoring function' },
        { id: 'd', text: 'Insufficient model capacity' },
      ],
      correct: ['b'],
      explanation:
        'Biased ground truth plus proxy features is the Amazon pattern exactly. It is not fixed by adding data of the same kind, and not detectable by inspecting the feature list — only outcome testing reveals it, which is why the audit found what three years of operation had not.',
    },
    {
      id: 'ai_q_c703',
      type: 'multiple',
      domain: 'IV',
      competency: 'IV.C',
      bloomLevel: 'apply',
      lawRefs: [],
      stem: 'Select THREE appropriate immediate responses.',
      options: [
        { id: 'a', text: 'Suspend or restrict reliance on the tool’s recommendations pending investigation, with a defined interim process for promotion decisions' },
        { id: 'b', text: 'Investigate root cause — label bias, proxy features, feedback loops from managers following recommendations — and assess the impact on past decisions' },
        { id: 'c', text: 'Delete the analysis and the underlying data' },
        { id: 'd', text: 'Report to the accountable executive and record the issue in the risk register with an owner and remediation plan' },
        { id: 'e', text: 'Instruct managers to override the tool more often, without changing anything else' },
      ],
      correct: ['a', 'b', 'd'],
      explanation:
        'Stop the harm, understand it, and escalate it through a governed process. Destroying evidence compounds the exposure severely, and asking managers to override more without diagnosis or guidance neither fixes the model nor is measurable.',
    },
    {
      id: 'ai_q_c704',
      type: 'single',
      domain: 'IV',
      competency: 'IV.C',
      bloomLevel: 'analyze',
      lawRefs: [],
      stem: 'Managers follow the tool’s recommendations about 90% of the time. What does this figure most importantly indicate?',
      options: [
        { id: 'a', text: 'The tool is highly accurate' },
        { id: 'b', text: 'The recommendation effectively determines the outcome, so treating it as "just advisory" understates its consequence — and, in the Art. 22 sense, a nominally human decision can be substantively automated' },
        { id: 'c', text: 'Managers are well trained on the tool' },
        { id: 'd', text: 'The tool should be made mandatory to improve consistency' },
      ],
      correct: ['b'],
      explanation:
        'This is SCHUFA reasoning applied internally: where a score or recommendation plays a determining role, the legal and ethical treatment should follow the substance, not the label. A high follow rate with low scrutiny is evidence about the oversight control, not about accuracy.',
    },
  ]),

  // ── Case 8: the model that changed underneath ─────────────────────────────
  ...inCase('case_vendor_switch', [
    {
      id: 'ai_q_c801',
      type: 'single',
      domain: 'IV',
      competency: 'IV.B',
      bloomLevel: 'analyze',
      lawRefs: [],
      stem: 'What contractual gap does this situation expose most sharply?',
      options: [
        { id: 'a', text: 'The absence of a volume discount' },
        { id: 'b', text: 'No notice or change-control provision for model updates and deprecation — so the vendor can materially change system behaviour on its own timetable while Tessellate carries the validation and compliance consequences' },
        { id: 'c', text: 'Missing service-level agreements on uptime' },
        { id: 'd', text: 'No limitation-of-liability clause' },
      ],
      correct: ['b'],
      explanation:
        'Model-change notice is the AI-specific term teams most often omit. Without it, your validated system silently becomes a different system — which is why notice periods, version pinning where available, and deprecation timelines belong in the contract alongside security and data terms.',
    },
    {
      id: 'ai_q_c802',
      type: 'multiple',
      domain: 'III',
      competency: 'III.C',
      bloomLevel: 'apply',
      lawRefs: [],
      stem: 'Select THREE activities that should happen within the 60-day window.',
      options: [
        { id: 'a', text: 'Re-validate on the new version against the original acceptance criteria, including quality and any fairness or safety checks' },
        { id: 'b', text: 'Re-baseline monitoring metrics and re-tune prompts, then compare old-versus-new outputs on a representative sample' },
        { id: 'c', text: 'Assume equivalence because the vendor describes the new version as an improvement' },
        { id: 'd', text: 'Assign a named owner for the migration and document the outcome as a change record' },
        { id: 'e', text: 'Notify adjusters of behaviour changes only after complaints arrive' },
      ],
      correct: ['a', 'b', 'd'],
      explanation:
        'A model version change is a change to the system: re-validate, re-baseline, and record who decided it was fit to promote. "Newer is better" is a vendor claim about aggregate benchmarks, not about your task — and users who rely on a consistent format deserve warning before it changes, not after.',
    },
    {
      id: 'ai_q_c803',
      type: 'single',
      domain: 'I',
      competency: 'I.C',
      bloomLevel: 'apply',
      lawRefs: [],
      stem: '"Nobody currently owns re-validation." The structural fix is:',
      options: [
        { id: 'a', text: 'Assign it to whoever has capacity this quarter' },
        { id: 'b', text: 'Every inventoried AI system carries a named accountable owner responsible for its lifecycle — including vendor-change response — so ownership does not have to be negotiated during each event' },
        { id: 'c', text: 'Escalate every model change to the board' },
        { id: 'd', text: 'Move to an on-premise model to avoid vendor changes' },
      ],
      correct: ['b'],
      explanation:
        'Named ownership per system in the inventory is what makes change response routine rather than improvised. Board escalation for every version bump is unworkable, and self-hosting trades vendor-change risk for a full maintenance and safety burden — a decision on its own merits, not a fix for an ownership gap.',
    },
    {
      id: 'ai_q_c804',
      type: 'single',
      domain: 'IV',
      competency: 'IV.A',
      bloomLevel: 'understand',
      lawRefs: [],
      stem: 'Which deployment consideration does this case most directly illustrate?',
      options: [
        { id: 'a', text: 'Hosted third-party models trade convenience for control: the vendor governs version lifecycle, so change management, re-validation and exit planning must be designed around that dependency' },
        { id: 'b', text: 'Generative models cannot be used for document summarisation' },
        { id: 'c', text: 'Fine-tuning always outperforms prompting' },
        { id: 'd', text: 'Cloud deployment is inherently non-compliant' },
      ],
      correct: ['a'],
      explanation:
        'This is the central trade-off in the buy-versus-host decision. Choosing a hosted model is legitimate and usually sensible — but it imports a dependency that governance must plan for explicitly, rather than discovering at a 60-day notice.',
    },
  ]),
]
