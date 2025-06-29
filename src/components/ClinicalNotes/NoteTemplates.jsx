import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { clinicalNotesService } from '../../services/ClinicalNotesService';

const { FiTemplate, FiEye, FiCheck, FiX } = FiIcons;

function NoteTemplates({ onSelect }) {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const templateData = await clinicalNotesService.getTemplates();
      setTemplates(templateData);
    } catch (error) {
      console.error('Failed to load templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      onSelect(selectedTemplate);
      setShowPreview(false);
      setSelectedTemplate(null);
    }
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  // Extended template collection with more clinical scenarios
  const extendedTemplates = [
    ...templates,
    {
      id: 'initial-examination',
      title: 'Initial Dental Examination',
      type: 'clinical-findings',
      content: `**Chief Complaint:** [Patient's primary concern]

**History of Present Illness:**
- Onset: [When did symptoms begin?]
- Duration: [How long have symptoms persisted?]
- Character: [Description of pain/discomfort]
- Aggravating factors: [What makes it worse?]
- Relieving factors: [What makes it better?]
- Previous treatment: [Any prior dental work?]

**Medical History:**
- Current medications: [List all medications]
- Allergies: [Known allergies]
- Systemic conditions: [Diabetes, heart disease, etc.]
- Previous surgeries: [Relevant surgical history]

**Dental History:**
- Last dental visit: [Date and reason]
- Oral hygiene habits: [Brushing/flossing frequency]
- Previous dental problems: [History of issues]

**Clinical Examination:**
**Extraoral:**
- General appearance: [Overall health appearance]
- Lymph nodes: [Palpation findings]
- TMJ: [Joint function and sounds]
- Facial symmetry: [Any asymmetries noted]

**Intraoral:**
- Oral hygiene: [Good/Fair/Poor]
- Gingival condition: [Health, color, texture]
- Tongue: [Appearance and mobility]
- Floor of mouth: [Examination findings]
- Palate: [Hard and soft palate examination]

**Periodontal Assessment:**
- Probing depths: [Record pocket depths]
- Bleeding on probing: [Presence/absence]
- Recession: [Gingival recession measurements]
- Mobility: [Tooth mobility grades]

**Dental Findings:**
[Chart existing restorations, caries, missing teeth]

**Radiographic Findings:**
[Description of X-ray findings]

**Diagnosis:**
- Primary diagnosis: [Main dental condition]
- Differential diagnosis: [Alternative possibilities]

**Treatment Plan:**
1. [Immediate needs]
2. [Phase I therapy]
3. [Definitive treatment]
4. [Maintenance]

**Prognosis:** [Overall prognosis for treatment]

**Patient Education:** [Topics discussed with patient]`
    },
    {
      id: 'oral-surgery-consultation',
      title: 'Oral Surgery Consultation',
      type: 'consultation',
      content: `**Consultation Date:** [Date]
**Referring Doctor:** [Referring dentist name]

**Chief Complaint:** [Reason for referral]

**History of Present Illness:**
- Pain level (1-10): [Pain scale rating]
- Pain characteristics: [Sharp, dull, throbbing, etc.]
- Swelling: [Location and duration]
- Difficulty chewing/swallowing: [Yes/No, details]

**Medical History Review:**
- Bleeding disorders: [Any bleeding issues]
- Cardiovascular conditions: [Heart conditions]
- Medications affecting healing: [Blood thinners, steroids]
- Smoking history: [Current/former smoker]
- Alcohol use: [Frequency and amount]

**Clinical Examination:**
**Extraoral:**
- Facial swelling: [Location, size, consistency]
- Lymphadenopathy: [Enlarged nodes]
- Trismus: [Mouth opening limitation]
- Paresthesia: [Numbness/tingling]

**Intraoral:**
- Site examination: [Detailed examination of surgical site]
- Adjacent teeth: [Condition of neighboring teeth]
- Bone density: [Clinical assessment]
- Tissue quality: [Gingival and mucosal health]

**Radiographic Analysis:**
- Panoramic findings: [Overall jaw assessment]
- Periapical findings: [Detailed root/bone assessment]
- CBCT findings (if applicable): [3D imaging results]

**Surgical Assessment:**
- Procedure complexity: [Simple/Complex]
- Anticipated complications: [Potential risks]
- Anesthesia considerations: [Local/sedation needs]

**Treatment Recommendations:**
- Primary treatment: [Recommended procedure]
- Alternative treatments: [Other options]
- Timeline: [Urgency and scheduling]

**Risks and Complications Discussed:**
- Bleeding: [Risk level and management]
- Infection: [Prevention and treatment]
- Nerve injury: [Risk assessment]
- Sinus involvement: [If applicable]

**Post-operative Instructions Provided:** [Yes/No]

**Follow-up Plan:** [Post-op appointment schedule]`
    },
    {
      id: 'orthodontic-evaluation',
      title: 'Orthodontic Evaluation',
      type: 'consultation',
      content: `**Patient Age:** [Age at evaluation]
**Evaluation Date:** [Date]

**Chief Complaint:** [Patient/parent concerns]

**Orthodontic History:**
- Previous orthodontic treatment: [Yes/No, details]
- Family orthodontic history: [Genetic considerations]
- Habits: [Thumb sucking, tongue thrusting, etc.]

**Facial Analysis:**
- Profile: [Straight, convex, concave]
- Facial symmetry: [Vertical and horizontal]
- Lip competence: [Lip seal at rest]
- Smile analysis: [Smile line, tooth display]

**Functional Analysis:**
- TMJ function: [Joint sounds, pain]
- Mandibular range of motion: [Opening, lateral]
- Muscle palpation: [Tender areas]
- Breathing pattern: [Nasal vs. mouth breathing]

**Intraoral Examination:**
**Dental Development:**
- Primary teeth present: [List]
- Permanent teeth present: [List]
- Missing/supernumerary teeth: [Noted absences/extras]
- Eruption sequence: [Normal/abnormal timing]

**Occlusal Analysis:**
- Angle Classification: [Class I, II, III]
- Overjet: [Horizontal overlap measurement]
- Overbite: [Vertical overlap measurement]
- Canine relationship: [Class I, II, III]
- Molar relationship: [Class I, II, III]

**Dental Irregularities:**
- Crowding: [Mild, moderate, severe]
- Spacing: [Generalized, localized]
- Rotations: [Specific teeth affected]
- Impactions: [Predicted impacted teeth]

**Arch Form and Symmetry:**
- Upper arch: [Shape and symmetry]
- Lower arch: [Shape and symmetry]
- Midline deviation: [Amount and direction]

**Radiographic Analysis:**
- Panoramic findings: [Root development, pathology]
- Cephalometric analysis: [Skeletal relationships]
- Airway assessment: [Upper airway evaluation]

**Growth Assessment:**
- Growth stage: [Prepubertal, pubertal, post-pubertal]
- Growth direction: [Vertical, horizontal, normal]
- Growth potential: [Remaining growth expected]

**Diagnosis:**
- Skeletal classification: [Class I, II, III]
- Dental classification: [Angle classification]
- Primary problems: [List in order of severity]

**Treatment Plan:**
- Phase I (if applicable): [Early intervention]
- Comprehensive treatment: [Full orthodontic plan]
- Estimated treatment time: [Duration]
- Retention plan: [Post-treatment retention]

**Treatment Goals:**
1. [Functional improvement]
2. [Aesthetic improvement]
3. [Stability considerations]

**Alternative Treatments:** [Other options discussed]`
    },
    {
      id: 'periodontal-maintenance',
      title: 'Periodontal Maintenance',
      type: 'follow-up',
      content: `**Maintenance Interval:** [3, 4, 6 month recall]
**Last Maintenance:** [Previous maintenance date]

**Interval History:**
- Oral hygiene compliance: [Patient self-report]
- Bleeding during brushing: [Yes/No, frequency]
- Pain or discomfort: [Location and description]
- Changes in medical history: [New medications/conditions]

**Clinical Assessment:**
**Plaque Control:**
- Plaque index: [Percentage or score]
- Areas of concern: [Specific locations]
- Improvement since last visit: [Better/same/worse]

**Gingival Health:**
- Gingival index: [Inflammation score]
- Bleeding on probing: [Percentage]
- Color and texture: [Normal/inflamed]
- Recession changes: [New recession noted]

**Periodontal Probing:**
- Pocket depths: [Record changes from baseline]
- Attachment levels: [Clinical attachment loss]
- Furcation involvement: [Grade I, II, III]
- Suppuration: [Presence/absence]

**Mobility Assessment:**
- Tooth mobility: [Grade 0, I, II, III]
- Changes from previous visit: [Improved/stable/worse]

**Radiographic Review:**
- Bone levels: [Changes from previous films]
- Calculus deposits: [Subgingival calculus visible]

**Treatment Provided:**
- Scaling areas: [Quadrants/sextants treated]
- Root planing: [Specific teeth]
- Polishing: [Completed]
- Fluoride application: [Yes/No]

**Oral Hygiene Instruction:**
- Brushing technique: [Modified Bass, etc.]
- Flossing instruction: [Technique reinforcement]
- Adjunctive aids: [Waterpik, interdental brushes]
- Antimicrobial rinse: [Recommended products]

**Home Care Assessment:**
- Current compliance: [Excellent/Good/Fair/Poor]
- Barriers to compliance: [Time, dexterity, motivation]
- Modifications needed: [Equipment or technique changes]

**Maintenance Outcome:**
- Overall periodontal health: [Stable/improving/declining]
- Patient compliance: [Excellent/Good/Fair/Poor]
- Risk factors: [Smoking, diabetes, stress]

**Next Maintenance:**
- Recommended interval: [3, 4, 6 months]
- Reasons for interval: [Risk factors, compliance]
- Special instructions: [Pre-medication, etc.]

**Patient Education Topics:**
- [Topics discussed during visit]

**Referrals:** [Specialist referrals if needed]`
    },
    {
      id: 'endodontic-treatment',
      title: 'Endodontic Treatment Note',
      type: 'treatment-plan',
      content: `**Tooth Number:** [Tooth being treated]
**Visit Number:** [1, 2, 3, etc.]
**Treatment Date:** [Date of treatment]

**Pre-operative Assessment:**
- Pain level (1-10): [Current pain level]
- Percussion test: [Positive/negative]
- Palpation test: [Positive/negative]
- Cold test: [Response]
- Electric pulp test: [Response]

**Radiographic Findings:**
- Periapical status: [Normal, radiolucency size]
- Root morphology: [Number and curvature of roots]
- Canal calcification: [Present/absent]
- Previous treatment: [Prior RCT, posts, etc.]

**Anesthesia:**
- Type: [Lidocaine, articaine, etc.]
- Technique: [Inferior alveolar, infiltration]
- Carpules used: [Number of cartridges]
- Effectiveness: [Complete/partial/inadequate]

**Access Preparation:**
- Isolation: [Rubber dam isolation]
- Access outline: [Conservative/traditional]
- Pulp chamber findings: [Hemorrhage, necrosis, calcification]

**Canal Instrumentation:**
**Working Length:**
- Apex locator reading: [Electronic measurement]
- Radiographic confirmation: [Working length X-ray]
- Final working length: [Measurement in mm]

**Cleaning and Shaping:**
- Hand files used: [K-files, Hedstrom files]
- Rotary system: [ProTaper, WaveOne, etc.]
- Final apical size: [File size at working length]
- Taper: [Final canal taper]

**Irrigation Protocol:**
- Primary irrigant: [NaOCl concentration]
- Secondary irrigant: [EDTA, CHX, etc.]
- Final rinse: [Saline, alcohol]
- Activation method: [Ultrasonic, manual]

**Canal Findings:**
- Pulp tissue: [Vital, necrotic, hemorrhagic]
- Debris: [Amount and character]
- Calcifications: [Location and severity]
- Perforations: [None, location if present]

**Intracanal Medication:**
- Medicament used: [Calcium hydroxide, etc.]
- Placement technique: [Lentulo spiral, etc.]
- Temporary seal: [Cavit, IRM, etc.]

**Obturation (if completed):**
- Technique: [Lateral condensation, warm vertical]
- Sealer used: [AH Plus, etc.]
- Gutta-percha: [Standard, thermoplasticized]
- Fill quality: [Adequate, overfill, underfill]

**Post-operative Instructions:**
- Pain management: [Ibuprofen, acetaminophen]
- Activity restrictions: [Chewing limitations]
- Follow-up: [Next appointment scheduled]

**Complications:**
- Instrument separation: [None, location if occurred]
- Perforation: [None, sealing attempt]
- Overfill: [None, amount if present]

**Prognosis:** [Excellent, good, fair, poor]

**Restoration Recommendations:**
- Core build-up: [Needed/not needed]
- Crown: [Recommended timing]
- Post: [Fiber post, metal post, none]`
    },
    {
      id: 'prosthodontic-treatment-plan',
      title: 'Prosthodontic Treatment Plan',
      type: 'treatment-plan',
      content: `**Treatment Planning Date:** [Date]
**Referring Doctor:** [If applicable]

**Chief Complaint:** [Patient's primary concern]

**Prosthodontic Assessment:**
**Missing Teeth:** [List missing teeth by number]
**Existing Prosthetics:** [Current dentures, bridges, implants]
**Condition of Existing Work:** [Good, fair, poor, failing]

**Oral Examination:**
**Remaining Teeth:**
- Prognosis: [Excellent, good, fair, poor, hopeless]
- Endodontic status: [RCT needed, previous RCT]
- Periodontal status: [Healthy, gingivitis, periodontitis]
- Restorative needs: [Crowns, fillings needed]

**Edentulous Areas:**
- Residual ridge: [Adequate, moderate, severe resorption]
- Tissue quality: [Firm, soft, mobile]
- Vestibular depth: [Adequate, shallow]
- Frenum attachments: [Normal, high, interfering]

**Occlusal Analysis:**
- Vertical dimension: [Normal, decreased, excessive]
- Centric relation: [Stable, unstable]
- Lateral excursions: [Canine guidance, group function]
- Anterior guidance: [Adequate, excessive, deficient]

**TMJ Assessment:**
- Joint sounds: [None, clicking, crepitus]
- Range of motion: [Normal, limited]
- Muscle tenderness: [Present/absent, location]
- Deviation on opening: [None, right, left]

**Esthetic Analysis:**
- Smile line: [High, average, low]
- Tooth proportions: [Ideal, needs adjustment]
- Color matching: [Existing teeth shade]
- Facial support: [Adequate, deficient, excessive]

**Treatment Options Presented:**

**Option 1: [Treatment description]**
- Advantages: [List benefits]
- Disadvantages: [List limitations]
- Cost estimate: [Fee range]
- Treatment time: [Duration]

**Option 2: [Alternative treatment]**
- Advantages: [List benefits]
- Disadvantages: [List limitations]
- Cost estimate: [Fee range]
- Treatment time: [Duration]

**Recommended Treatment Sequence:**
1. [Phase 1: Emergency/urgent care]
2. [Phase 2: Preparatory procedures]
3. [Phase 3: Definitive prosthetic treatment]
4. [Phase 4: Maintenance]

**Maintenance Requirements:**
- Professional cleanings: [Frequency]
- Home care instructions: [Special requirements]
- Follow-up appointments: [Schedule]
- Appliance adjustments: [As needed]

**Patient Education:**
- Treatment complexity explained: [Yes/No]
- Maintenance requirements discussed: [Yes/No]
- Alternative options presented: [Yes/No]
- Cost and insurance coverage: [Discussed]

**Prognosis:** [Excellent, good, fair, guarded]

**Next Appointment:** [Treatment to begin]`
    }
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <SafeIcon icon={FiTemplate} className="mr-2" />
            Note Templates
          </h3>
          <p className="text-sm text-gray-600">
            {extendedTemplates.length} templates available
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {extendedTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleTemplateSelect(template)}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-gray-900 text-sm">
                  {template.title}
                </h4>
                <SafeIcon icon={FiEye} className="text-gray-400 hover:text-blue-600" />
              </div>

              <div className="mb-3">
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                  {template.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>

              <p className="text-sm text-gray-600 line-clamp-3">
                {stripHtml(template.content).substring(0, 100)}...
              </p>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(template);
                  }}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Use Template
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Template Preview Modal */}
      {showPreview && selectedTemplate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowPreview(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedTemplate.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Template Preview
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleUseTemplate}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <SafeIcon icon={FiCheck} />
                  <span>Use This Template</span>
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <SafeIcon icon={FiX} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedTemplate.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>
              
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                  {selectedTemplate.content}
                </pre>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleUseTemplate}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Use Template
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default NoteTemplates;