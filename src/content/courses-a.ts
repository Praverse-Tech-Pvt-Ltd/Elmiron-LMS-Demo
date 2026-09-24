import type { Course, Case } from './types';

/* Curriculum set A: industry foundation, markets, doctor engagement, selling skills,
   scientific communication, product and therapy area, and compliance (brief §1–17, §33–36).

   Content rules applied throughout:
   - Guidance aligns with approved product information, company policy, law, industry codes,
     medical ethics and pharmacovigilance.
   - No product-specific clinical data or claims. Product facts are marked
     "pending medical review" and must come from the current prescribing information.
   - All doctors, MRs and organisations in examples are fictional. */

/* ------------------------------------------------------------------ */
/* 1. Understanding the Pharmaceutical Industry (§1)                   */
/* ------------------------------------------------------------------ */
const pharmaIndustry: Course = {
  id: "pharma-industry",
  title: "Understanding the Pharmaceutical Industry",
  category: "foundation",
  level: "Beginner",
  objective: "Understand how a pharmaceutical company works, how a medicine reaches a patient, and where the medical representative fits in.",
  audience: "New medical representatives, trainees and anyone joining a commercial pharma team.",
  duration: "55 min",
  minutes: 55,
  modules: [
    {
      id: "pharma-industry-m1",
      title: "Industry overview",
      lessons: [
        {
          id: "pharma-industry-m1-l1",
          title: "How a pharmaceutical company operates",
          kind: "lesson",
          minutes: 5,
          summary: "A pharmaceutical company discovers, develops, makes and supplies medicines under strict regulation. Every function exists to get safe, effective, quality medicines to the right patients.",
          points: [
            "Medicines are among the most tightly regulated products in the world.",
            "Science, quality and compliance come before commercial goals.",
            "Functions depend on each other; no team works alone.",
            "Patient safety is everyone's responsibility, including field staff.",
          ],
        },
        {
          id: "pharma-industry-m1-l2",
          title: "The functions behind every medicine",
          kind: "video",
          minutes: 8,
          summary: "A short tour of the core functions: research and development, manufacturing, quality, regulatory, medical affairs, marketing, sales, distribution and pharmacovigilance.",
          points: [
            "R&D discovers molecules and runs clinical development.",
            "Manufacturing and Quality make every batch to approved standards.",
            "Regulatory Affairs secures and maintains product approvals.",
            "Medical Affairs provides scientific expertise and answers medical questions.",
            "Marketing, Sales and Distribution make approved products known and available.",
            "Pharmacovigilance monitors safety for as long as a product is marketed.",
          ],
        },
      ],
    },
    {
      id: "pharma-industry-m2",
      title: "The value chain",
      lessons: [
        {
          id: "pharma-industry-m2-l1",
          title: "From research to patient",
          kind: "flow",
          minutes: 5,
          summary: "A medicine passes through a long chain of steps before it helps a patient. Each step adds value and each has its own rules.",
          flow: ["Research", "Development", "Manufacturing", "Regulatory approval", "Marketing", "Distribution", "Doctor", "Patient"],
          points: [
            "Research and development can take many years before approval.",
            "Nothing may be promoted until regulators have approved it.",
            "Distribution keeps approved stock available where patients need it.",
            "The doctor decides; the MR supports with accurate information.",
          ],
        },
        {
          id: "pharma-industry-m2-l2",
          title: "Following one medicine through the chain",
          kind: "example",
          minutes: 3,
          summary: "A worked example of how the value chain shows up in an MR's ordinary week.",
          example: {
            title: "Why the chemist had no stock",
            body: "Ravi, an MR in Pune, hears from Dr. A. Mehta, urologist, that patients cannot find a product at nearby pharmacies. Instead of promising stock, Ravi checks with his area manager and the distribution team, learns that a stockist order was delayed, and returns to Dr. Mehta with an accurate update and an expected date. The problem sat in distribution, not with the doctor, and the answer came from the right team.",
          },
          points: [
            "Know which link in the chain owns a problem.",
            "Never promise what another team controls.",
            "Return with accurate facts, not reassurance.",
          ],
        },
      ],
    },
    {
      id: "pharma-industry-m3",
      title: "Roles in a pharma company",
      lessons: [
        {
          id: "pharma-industry-m3-l1",
          title: "Field sales roles",
          kind: "lesson",
          minutes: 5,
          summary: "The field team brings approved information to doctors and keeps the company connected to its customers.",
          points: [
            "Medical Representative: shares approved product information with doctors in a territory.",
            "Area Manager: coaches a team of MRs and reviews field quality.",
            "Regional Manager: leads several areas and sets regional priorities.",
            "Commercial team: sales operations, forecasting, trade and key accounts.",
          ],
        },
        {
          id: "pharma-industry-m3-l2",
          title: "Head office and specialist roles",
          kind: "lesson",
          minutes: 5,
          summary: "Specialist teams create the products, materials and approvals the field team relies on, and answer questions the field cannot.",
          points: [
            "Product Manager: owns brand strategy and develops approved promotional material.",
            "Marketing Manager: leads portfolio marketing plans and campaigns.",
            "Medical Affairs: scientific experts who answer medical queries and review materials.",
            "Regulatory Affairs: approvals, labelling and communication with regulators.",
            "Quality Assurance: ensures every batch meets approved quality standards.",
            "Distribution: moves stock through stockists and pharmacies to patients.",
          ],
        },
        {
          id: "pharma-industry-m3-l3",
          title: "Who should answer this?",
          kind: "scenario",
          minutes: 3,
          summary: "Knowing who owns a question is part of doing the job well.",
          question: {
            prompt: "Dr. N. Shah, a urologist in Ahmedabad, asks you for detailed data on using one of your products in a patient group that is not in its approved indication. What do you do?",
            choices: [
              {
                text: "Explain that you can only discuss the approved indication, and offer to pass her question to Medical Affairs / Medical Information for a scientific response.",
                quality: "best",
                feedback: "Correct. Medical Affairs is the right owner of unsolicited questions outside the label, and the doctor still gets a proper answer.",
              },
              {
                text: "Share an article you found online that seems to support that use.",
                quality: "noncompliant",
                feedback: "This is off-label promotion. MRs must not share material outside the approved indication.",
              },
              {
                text: "Tell her other doctors use it that way with good results.",
                quality: "noncompliant",
                feedback: "An unsupported, off-label statement. It could mislead the doctor and put patients at risk.",
              },
              {
                text: "Say you do not know and move on to your key message.",
                quality: "weak",
                feedback: "Honest, but the doctor's need is left unmet. Offer the Medical Information route.",
              },
            ],
            principle: "Route questions to the function that owns them. Medical questions outside the label go to Medical Affairs.",
          },
        },
      ],
    },
    {
      id: "pharma-industry-m4",
      title: "The role of a medical representative",
      lessons: [
        {
          id: "pharma-industry-m4-l1",
          title: "What an MR really does",
          kind: "video",
          minutes: 5,
          summary: "The MR is the company's everyday link with doctors: a reliable source of approved information, feedback and follow-up.",
          points: [
            "Know your products, disease area and approved materials thoroughly.",
            "Engage doctors with relevant, accurate and balanced information.",
            "Plan and manage your territory and call coverage.",
            "Report activity, safety information and outcomes accurately and on time.",
            "Promote ethically and build professional, long-term relationships.",
            "Gather market intelligence legitimately and share it with your team.",
          ],
        },
        {
          id: "pharma-industry-m4-l2",
          title: "A day in the life of an MR",
          kind: "example",
          minutes: 3,
          summary: "How the parts of the role fit together in one ordinary field day.",
          example: {
            title: "Priya's Tuesday in Nagpur",
            body: "Priya reviews her call plan over breakfast and checks which doctors are owed follow-ups. At her second call, Dr. R. Kulkarni mentions that a patient felt unwell after starting a company product; Priya notes the facts and reports them through the pharmacovigilance process that afternoon. At a pharmacy she observes that a competitor has launched a new pack size and records it for her manager. She ends the day by logging each call accurately in the CRM, including one question she has sent to Medical Information.",
          },
          points: [
            "Planning, calls, safety reporting and records all matter.",
            "Safety information is reported the same day.",
            "Market intelligence comes from legitimate observation.",
          ],
        },
      ],
    },
  ],
  takeaways: [
    "Every function in a pharma company exists to deliver safe, quality medicines to patients.",
    "The value chain runs from research to patient; promotion only follows approval.",
    "Know which role owns which question, and route requests correctly.",
    "The MR's value lies in accurate information, ethical conduct and reliable follow-up.",
  ],
  exercise: "Draw your company's value chain. For each step, name the team responsible and one person you would contact with a question about it.",
  knowledgeCheck: [
    {
      prompt: "Which function monitors a product's safety after launch?",
      choices: [
        { text: "Pharmacovigilance.", quality: "best", feedback: "Correct. Pharmacovigilance monitors safety for as long as the product is on the market." },
        { text: "Marketing.", quality: "weak", feedback: "Marketing develops approved promotion; it does not own safety monitoring." },
        { text: "Distribution.", quality: "weak", feedback: "Distribution moves stock. Safety monitoring sits with pharmacovigilance." },
        { text: "The sales team, who decide which reports are worth passing on.", quality: "noncompliant", feedback: "No one in sales filters safety information. Every report must be passed on." },
      ],
      principle: "Safety monitoring lasts for a product's whole life, and every employee passes on safety information.",
    },
    {
      prompt: "What must happen before a medicine can be promoted to doctors?",
      choices: [
        { text: "It must receive regulatory approval, and promotion must stay within the approved indication.", quality: "best", feedback: "Correct. Approval comes first, and promotion stays within the approved label." },
        { text: "Enough doctors must ask for it.", quality: "weak", feedback: "Demand does not permit promotion. Regulatory approval does." },
        { text: "Promotion can begin during trials if early results look good.", quality: "noncompliant", feedback: "Promoting an unapproved medicine is prohibited." },
        { text: "Stock must be available in every pharmacy.", quality: "weak", feedback: "Availability matters commercially, but it is not the legal requirement." },
      ],
      principle: "Promotion always follows approval and stays within the approved label.",
    },
    {
      prompt: "Which statement best describes the MR's role?",
      choices: [
        { text: "Share accurate, approved information that helps doctors make appropriate treatment decisions.", quality: "best", feedback: "Correct. The MR is a trusted source of approved information." },
        { text: "Increase prescriptions by any means available.", quality: "noncompliant", feedback: "'Any means' invites inducements and misleading claims. Results must come from ethical promotion." },
        { text: "Deliver samples and collect orders.", quality: "weak", feedback: "These may be small parts of the job, but they miss its scientific and ethical core." },
        { text: "Tell doctors what to prescribe.", quality: "weak", feedback: "Prescribing is the doctor's decision. The MR informs; the doctor decides." },
      ],
      principle: "The MR informs; the doctor decides. Value comes from accuracy, relevance and integrity.",
    },
  ],
  finalAssessment: { questions: 15, passMark: 80, attempts: 3 },
  certificate: "Course certificate",
  skills: ["sales", "compliance"],
  covers: [1],
};

/* ------------------------------------------------------------------ */
/* 2. Selling in the Indian Pharmaceutical Market (§2)                 */
/* ------------------------------------------------------------------ */
const indiaMarket: Course = {
  id: "india-market",
  title: "Selling in the Indian Pharmaceutical Market",
  category: "markets",
  level: "Intermediate",
  objective: "Understand how the Indian market is structured, who its stakeholders are, and how to plan territory work on legitimate, professional criteria.",
  audience: "Medical representatives and area managers working in India.",
  duration: "50 min",
  minutes: 50,
  markets: ["IN"],
  modules: [
    {
      id: "india-market-m1",
      title: "Market structure and key stakeholders",
      lessons: [
        {
          id: "india-market-m1-l1",
          title: "How the Indian market is structured",
          kind: "lesson",
          minutes: 5,
          summary: "India's market is led by branded generics, alongside generics, prescription and over-the-counter products, and distinct hospital, retail and institutional channels.",
          points: [
            "Branded generics: off-patent molecules sold under company brands.",
            "Generics: unbranded or trade generics, often competing mainly on price.",
            "Prescription (Rx) products are prescribed; OTC products are bought directly.",
            "Hospital channel: purchase committees, formularies and hospital pharmacies.",
            "Retail pharmacy: chemists supplied through stockists and distributors.",
            "Institutional: government, public-sector and corporate buyers, often via tenders.",
          ],
        },
        {
          id: "india-market-m1-l2",
          title: "Key stakeholders",
          kind: "video",
          minutes: 5,
          summary: "Many people shape whether a patient receives an appropriate medicine. Knowing each one's role helps you work professionally with all of them.",
          points: [
            "Doctors: general practitioners, consulting physicians and specialists decide treatment.",
            "Chemists and pharmacists dispense and influence local availability.",
            "Stockists and distributors hold and move stock through the territory.",
            "Hospital administrators and purchase committees shape formularies.",
            "Regulators and pricing authorities, such as CDSCO and NPPA, set the rules.",
            "Patients and caregivers: the reason the whole system exists.",
          ],
        },
      ],
    },
    {
      id: "india-market-m2",
      title: "Doctor segmentation",
      lessons: [
        {
          id: "india-market-m2-l1",
          title: "Segmenting doctors on legitimate criteria",
          kind: "lesson",
          minutes: 5,
          summary: "Segmentation helps you give each doctor relevant scientific information. It must rest only on professional criteria, never on personal or inappropriate factors.",
          points: [
            "Specialty and practice type: clinic, hospital or nursing home.",
            "Patient profile relevant to your therapy area.",
            "Relevance of your products to the doctor's practice.",
            "Existing engagement and the doctor's stated information preferences.",
            "Educational need: what scientific information would genuinely help?",
            "Never segment on gift response, personal traits or willingness to reciprocate.",
          ],
        },
        {
          id: "india-market-m2-l2",
          title: "Choosing segmentation criteria",
          kind: "scenario",
          minutes: 3,
          summary: "A practical test of what may and may not be used to prioritise doctors.",
          question: {
            prompt: "A colleague suggests adding a column to your doctor list that ranks doctors by how they respond to hospitality. What do you do?",
            choices: [
              {
                text: "Decline to use it, explain that segmentation must rest on specialty, patient profile, product relevance and educational need, and raise it with your manager or Compliance if it persists.",
                quality: "best",
                feedback: "Correct. You keep segmentation professional and flag a practice that could lead to inducements.",
              },
              {
                text: "Add the column; it is only for internal use.",
                quality: "noncompliant",
                feedback: "Internal use does not make it acceptable. Profiling doctors by response to hospitality links prescribing to benefits.",
              },
              {
                text: "Ignore the suggestion quietly and build your own list.",
                quality: "ok",
                feedback: "You avoid the wrong criterion, but the practice goes unchallenged. Say why it is inappropriate.",
              },
              {
                text: "Rank doctors only by their prescription volume.",
                quality: "weak",
                feedback: "Volume alone ignores relevance and educational need, and can push you towards pressure selling.",
              },
            ],
            principle: "Segment on professional relevance and educational need. Criteria linked to inducements are off-limits, even internally.",
          },
        },
      ],
    },
    {
      id: "india-market-m3",
      title: "Territory potential",
      lessons: [
        {
          id: "india-market-m3-l1",
          title: "Assessing territory potential",
          kind: "flow",
          minutes: 5,
          summary: "A structured way to understand your territory before you plan calls.",
          flow: [
            "Map doctors by specialty and practice",
            "Map hospitals, nursing homes and pharmacies",
            "Identify stockists and supply routes",
            "Note local competitors and their availability",
            "Assess potential for your therapy area",
            "Build a call plan and call frequency",
          ],
          points: [
            "Use company CRM data, public directories and your own visits.",
            "Potential means relevant patients, not personal connections.",
            "Revisit the map every quarter as the territory changes.",
          ],
        },
        {
          id: "india-market-m3-l2",
          title: "Mapping a new territory in Nashik",
          kind: "example",
          minutes: 3,
          summary: "How one MR built a professional picture of a new territory in her first month.",
          example: {
            title: "Sneha's first month",
            body: "Sneha takes over a territory in Nashik. She starts with the CRM list, then walks each area to confirm clinics, hospitals and pharmacies. She notes which urologists and gynaecologists see patients relevant to her therapy area, which pharmacies stock her products, and where competitor products are more available. She groups doctors by specialty and relevance, sets a realistic call frequency for each group, and shares two supply gaps with her area manager.",
          },
          points: [
            "Verify data on the ground; lists go out of date.",
            "Record availability gaps and share them with your manager.",
            "Set call frequency by relevance, not convenience.",
          ],
        },
      ],
    },
    {
      id: "india-market-m4",
      title: "Understanding the competition",
      lessons: [
        {
          id: "india-market-m4-l1",
          title: "Profiling competitors factually",
          kind: "video",
          minutes: 5,
          summary: "Knowing the competition helps you answer doctors' questions accurately. Stay factual and professional at all times.",
          points: [
            "Compare molecule, strength and dosage form accurately.",
            "Know each competitor's approved indication and stated positioning.",
            "Discuss scientific differentiation only as approved material supports.",
            "Note pricing context and local availability without speculation.",
            "Use only legitimate, public or company-approved sources.",
            "Never disparage a competitor or its products.",
          ],
        },
      ],
    },
    {
      id: "india-market-m5",
      title: "Prescription business fundamentals",
      lessons: [
        {
          id: "india-market-m5-l1",
          title: "What legitimately builds prescribing",
          kind: "lesson",
          minutes: 5,
          summary: "Sustainable prescription business rests on awareness, scientific confidence and availability for suitable patients, never on inducements.",
          points: [
            "Awareness: the doctor knows the product and its approved use.",
            "Scientific confidence: evidence presented clearly and honestly.",
            "Recall: consistent, relevant engagement over time.",
            "Appropriate positioning for suitable patients within the label.",
            "Availability: reliable stock where patients buy their medicines.",
            "No inducement ever forms part of a prescribing decision.",
          ],
        },
        {
          id: "india-market-m5-l2",
          title: "A hint of a favour",
          kind: "scenario",
          minutes: 3,
          summary: "Practise responding when prescribing is linked to a personal benefit.",
          question: {
            prompt: "Dr. V. Joshi, a GP in Indore, says he would 'look at your brand more' if you could arrange a new laptop for his clinic. What do you do?",
            choices: [
              {
                text: "Politely decline, explain that company policy and the applicable code do not allow it, refocus on the product's relevance to his patients, and inform your manager as your SOP requires.",
                quality: "best",
                feedback: "Correct. Clear, courteous and compliant, and the conversation returns to patient need.",
              },
              {
                text: "Say you will check whether the marketing budget can cover it.",
                quality: "noncompliant",
                feedback: "This treats an inducement as negotiable. Gifts linked to prescribing are not permitted.",
              },
              {
                text: "Laugh it off and change the subject without saying no.",
                quality: "weak",
                feedback: "Ambiguity can be read as a 'maybe'. Decline clearly and politely.",
              },
              {
                text: "Offer a smaller gift instead.",
                quality: "noncompliant",
                feedback: "A smaller inducement is still an inducement.",
              },
            ],
            principle: "Prescribing must rest on patient need and evidence. Decline clearly, stay courteous and refocus on the science.",
          },
        },
      ],
    },
  ],
  takeaways: [
    "India's market is led by branded generics across retail, hospital and institutional channels.",
    "Segment doctors only on professional criteria such as specialty, patient profile and educational need.",
    "Profile competitors factually and never disparage them.",
    "Prescription business is built on scientific confidence and availability, never inducements.",
  ],
  exercise: "List the 20 most relevant doctors in your territory using only legitimate segmentation criteria, and note one educational need for each.",
  knowledgeCheck: [
    {
      prompt: "Which is a legitimate criterion for segmenting doctors?",
      choices: [
        { text: "How relevant your products are to the doctor's patient profile.", quality: "best", feedback: "Correct. Product relevance to the doctor's patients is a professional criterion." },
        { text: "How receptive the doctor has been to gifts.", quality: "noncompliant", feedback: "This links prescribing to inducements and is never acceptable." },
        { text: "The doctor's personal lifestyle and interests.", quality: "noncompliant", feedback: "Personal profiling is inappropriate and intrusive." },
        { text: "Which doctors are easiest to meet.", quality: "weak", feedback: "Convenience is not relevance. You may miss doctors whose patients need the information." },
      ],
      principle: "Segment on specialty, practice, patient profile, product relevance, engagement and educational need only.",
    },
    {
      prompt: "What belongs in a competitor profile?",
      choices: [
        { text: "Molecule, strength, dosage form, approved indication, positioning, pricing context and availability, from legitimate sources.", quality: "best", feedback: "Correct. Factual, verifiable and professionally sourced." },
        { text: "Negative stories about the competitor to share with doctors.", quality: "noncompliant", feedback: "Spreading negative stories is disparagement and breaches codes." },
        { text: "Only price, because that is all doctors care about.", quality: "weak", feedback: "Too narrow, and it undervalues the doctor's clinical judgement." },
        { text: "Nothing; competitors are not relevant to an MR.", quality: "weak", feedback: "Doctors will ask. You need accurate context to answer professionally." },
      ],
      principle: "Know the competition factually. Compare professionally and never disparage.",
    },
    {
      prompt: "What builds sustainable prescription business?",
      choices: [
        { text: "Consistent, relevant scientific engagement, reliable availability and appropriate positioning for suitable patients.", quality: "best", feedback: "Correct. These are the legitimate drivers of prescribing." },
        { text: "Offering doctors benefits linked to prescription volumes.", quality: "noncompliant", feedback: "This is an inducement and is prohibited." },
        { text: "Repeating the brand name as often as possible.", quality: "weak", feedback: "Repetition without relevance irritates doctors and adds no value." },
        { text: "Visiting only the highest-prescribing doctors and ignoring the rest.", quality: "weak", feedback: "This ignores relevance and educational need across your territory." },
      ],
      principle: "Legitimate prescribing rests on awareness, evidence, recall, availability and patient suitability.",
    },
  ],
  finalAssessment: { questions: 15, passMark: 80, attempts: 3 },
  certificate: "Course certificate",
  skills: ["territory", "sales"],
  covers: [2],
};

/* ------------------------------------------------------------------ */
/* 3. Understanding and Selling in Global Markets (§3)                 */
/* ------------------------------------------------------------------ */
const globalMarket: Course = {
  id: "global-market",
  title: "Understanding and Selling in Global Markets",
  category: "markets",
  level: "Advanced",
  objective: "Understand how international pharmaceutical markets differ, how companies enter them, and how to run a professional export sales process.",
  audience: "Area and regional managers, international business teams and advanced learners.",
  duration: "1 h 5 min",
  minutes: 65,
  modules: [
    {
      id: "global-market-m1",
      title: "Global markets and business models",
      lessons: [
        {
          id: "global-market-m1-l1",
          title: "How global markets differ",
          kind: "video",
          minutes: 8,
          summary: "Markets differ in regulation, pricing, payers, channels and the balance of innovator and generic medicines. This is a high-level orientation, not country-specific regulatory advice.",
          points: [
            "United States: large, innovator-led, with complex payer and pricing systems.",
            "Europe and UK: approvals and health technology assessment shape access.",
            "GCC, Saudi Arabia, UAE: national registration and strong hospital and tender channels.",
            "Africa: diverse markets where distributors, tenders and donor programmes matter.",
            "Southeast Asia and Latin America: mixed public–private systems, varied timelines.",
            "Australia: a national regulator and national reimbursement scheme shape access.",
          ],
        },
        {
          id: "global-market-m1-l2",
          title: "Innovator and generic business models",
          kind: "lesson",
          minutes: 5,
          summary: "Innovator and generic companies create value in different ways, and many companies operate both models.",
          points: [
            "Innovators invest in discovery and rely on patents and data protection.",
            "Generic companies supply off-patent medicines, competing on quality, cost and supply.",
            "Branded generics add brand building, common in many emerging markets.",
            "Biosimilars follow biologics after exclusivity ends, via their own pathway.",
            "Loss of exclusivity changes pricing, competition and commercial strategy.",
          ],
        },
      ],
    },
    {
      id: "global-market-m2",
      title: "Market entry and commercial models",
      lessons: [
        {
          id: "global-market-m2-l1",
          title: "Market entry concepts",
          kind: "lesson",
          minutes: 5,
          summary: "Before a product can be sold in a new country, it needs permission to be sold, a route to market and a price that payers and patients can support.",
          points: [
            "Registration and marketing authorisation: legal permission to sell.",
            "A local partner or distributor may be required to hold licences.",
            "Pricing may be set, negotiated or referenced to other countries.",
            "Reimbursement and market access decide whether payers fund the product.",
            "Supply chain: import, storage, cold chain and distribution requirements.",
            "Timelines vary widely; plan registration well ahead of launch.",
          ],
        },
        {
          id: "global-market-m2-l2",
          title: "Commercial models",
          kind: "lesson",
          minutes: 5,
          summary: "Companies choose how to commercialise in each market, trading control against cost and risk.",
          points: [
            "Direct: own subsidiary and team; highest control and highest cost.",
            "Distributor: a local partner imports, registers or sells for you.",
            "Licensing: another company commercialises your product under agreement.",
            "Co-marketing: two companies promote the product, often under different brands.",
            "Contract manufacturing and private label: you make it; the partner sells it.",
            "Strategic partnerships combine strengths in science, access or supply.",
          ],
        },
      ],
    },
    {
      id: "global-market-m3",
      title: "Customers and export sales",
      lessons: [
        {
          id: "global-market-m3-l1",
          title: "Global customer types",
          kind: "lesson",
          minutes: 3,
          summary: "International customers are usually organisations, not individual doctors. Each type buys for different reasons.",
          points: [
            "Importers and national distributors.",
            "Wholesalers and pharmacy chains.",
            "Hospitals, hospital groups and purchasing organisations.",
            "Government and tender bodies, including ministries of health.",
            "Licensing and co-marketing partners.",
            "NGOs and donor-funded procurement programmes.",
          ],
        },
        {
          id: "global-market-m3-l2",
          title: "The export sales process",
          kind: "flow",
          minutes: 5,
          summary: "Export sales follow a disciplined sequence. Skipping steps usually costs time, money or reputation later.",
          flow: [
            "Market selection",
            "Product selection",
            "Buyer identification",
            "Initial contact",
            "Qualification",
            "Commercial discussion",
            "Technical documentation",
            "Samples",
            "Negotiation",
            "Purchase order",
            "Supply follow-up",
          ],
          points: [
            "Qualify buyers before sharing sensitive commercial terms.",
            "Technical documentation and samples follow your company's approval process.",
            "Supply follow-up protects the relationship and the next order.",
          ],
        },
      ],
    },
    {
      id: "global-market-m4",
      title: "The international buyer pitch",
      lessons: [
        {
          id: "global-market-m4-l1",
          title: "Pitching to an importer",
          kind: "example",
          minutes: 5,
          summary: "A worked example of a professional first meeting with an international buyer.",
          example: {
            title: "Arjun meets an importer in Nairobi",
            body: "Arjun, an export manager, meets Mr. D. Otieno of a fictional Kenyan importer. He opens with a short company overview, the quality certifications the company actually holds, and the products relevant to the buyer's market. He explains registration status honestly and which dossiers are available, and describes supply capacity and typical lead times. He then asks about the buyer's registrations, channels and tender experience. He makes no promise on registration timelines he cannot control, and follows up within two days with approved documentation.",
          },
          points: [
            "Lead with credibility: quality, compliance and reliable supply.",
            "Ask as much as you tell; qualify the buyer.",
            "Promise only what your company has approved.",
          ],
        },
        {
          id: "global-market-m4-l2",
          title: "The exclusivity request",
          kind: "scenario",
          minutes: 3,
          summary: "Practise handling pressure for commitments on a first meeting.",
          question: {
            prompt: "On a first meeting, a regional distributor asks for exclusive rights across several countries at a price below your approved floor, and wants an answer today. What do you do?",
            choices: [
              {
                text: "Thank them, qualify their registrations, channels and volumes, explain that exclusivity and pricing need internal approval, and agree a date to return with a formal proposal.",
                quality: "best",
                feedback: "Correct. You protect the company, respect the buyer and keep the opportunity alive.",
              },
              {
                text: "Agree on the spot to secure the deal.",
                quality: "weak",
                feedback: "You would be committing to terms you are not authorised to give, without knowing the buyer's capabilities.",
              },
              {
                text: "Decline exclusivity immediately without exploring their capabilities.",
                quality: "weak",
                feedback: "Premature. The buyer may be a strong partner; qualify first and let the approval process decide.",
              },
              {
                text: "Offer a personal commission to their purchasing manager to secure the order.",
                quality: "noncompliant",
                feedback: "This is bribery and is prohibited under anti-bribery laws and company policy.",
              },
            ],
            principle: "Qualify before you commit. Commercial terms follow internal approval and are always free of improper payments.",
          },
        },
      ],
    },
    {
      id: "global-market-m5",
      title: "Country market assessment",
      lessons: [
        {
          id: "global-market-m5-l1",
          title: "The country assessment framework",
          kind: "lesson",
          minutes: 5,
          summary: "A consistent framework helps you compare countries objectively before committing resources.",
          points: [
            "Market size and demand for the therapy area.",
            "Competition: who is present, at what price and with what positioning.",
            "Regulatory complexity and realistic registration timelines.",
            "Pricing, reimbursement and market access conditions.",
            "Distribution structure and whether a local partner is required.",
            "Overall commercial potential weighed against cost and risk.",
          ],
        },
        {
          id: "global-market-m5-l2",
          title: "Assess one country market",
          kind: "assignment",
          minutes: 10,
          summary: "Apply the framework to a real country using public sources.",
          assignment: {
            brief: "Choose one country your company does not yet serve. Using credible public sources, assess it against the nine factors: market size, demand, competition, regulatory complexity, pricing, distribution, local partner requirement, market access and commercial potential.",
            deliverable: "A one-page assessment with a rating for each factor and a go / wait / no-go recommendation.",
            rubric: [
              "Covers all nine factors",
              "Uses credible, cited public sources",
              "Separates facts from assumptions",
              "Recommendation follows logically from the evidence",
              "Identifies key risks and next steps",
            ],
          },
        },
      ],
    },
  ],
  takeaways: [
    "Global markets differ in regulation, pricing, payers and channels.",
    "Market entry needs authorisation, a route to market, a price and a supply chain.",
    "Choose the commercial model that balances control, cost and risk.",
    "Run export sales as a disciplined process, free of improper payments.",
  ],
  exercise: "Compare two countries of your choice using the nine-factor assessment framework and present which you would prioritise and why.",
  knowledgeCheck: [
    {
      prompt: "What is a marketing authorisation?",
      choices: [
        { text: "Regulatory permission to sell a medicine in a specific country.", quality: "best", feedback: "Correct. Without it, the product cannot be sold there." },
        { text: "An agreement with a local distributor.", quality: "weak", feedback: "A distributor agreement is commercial, not regulatory." },
        { text: "A pricing approval.", quality: "weak", feedback: "Pricing approval is separate and may follow authorisation." },
        { text: "A permit needed only for innovator products.", quality: "weak", feedback: "Generic products also need marketing authorisation." },
      ],
      principle: "Authorisation comes first; commercial arrangements build on it.",
    },
    {
      prompt: "A buyer's purchasing manager hints that a personal payment would speed up the order. What do you do?",
      choices: [
        { text: "Decline, and report it through your company's compliance or anti-bribery process.", quality: "best", feedback: "Correct. Decline clearly and report as policy requires." },
        { text: "Pay it through the distributor so it does not appear in company records.", quality: "noncompliant", feedback: "Routing a bribe through a third party is still bribery, and concealing it makes it worse." },
        { text: "Ignore the remark and keep negotiating without mentioning it.", quality: "weak", feedback: "Silence can be misread, and the risk is left unreported." },
        { text: "Agree if the amount is small and customary locally.", quality: "noncompliant", feedback: "Local custom does not make a bribe acceptable." },
      ],
      principle: "Improper payments are never acceptable, whatever the amount, route or local custom.",
    },
    {
      prompt: "Which commercial model gives the most control but also the highest cost?",
      choices: [
        { text: "A direct presence with your own subsidiary and team.", quality: "best", feedback: "Correct. Direct presence maximises control and investment." },
        { text: "A distributor model.", quality: "weak", feedback: "Distributors lower cost but reduce your control." },
        { text: "Licensing.", quality: "weak", feedback: "Licensing hands commercial control to the licensee." },
        { text: "Private label supply.", quality: "weak", feedback: "The partner owns the brand and the market." },
      ],
      principle: "Each commercial model trades control against cost and risk.",
    },
  ],
  finalAssessment: { questions: 20, passMark: 80, attempts: 3 },
  certificate: "Course certificate",
  skills: ["global", "sales"],
  covers: [3],
};

/* ------------------------------------------------------------------ */
/* 4. Professional Doctor Engagement (§4)                              */
/* ------------------------------------------------------------------ */
const doctorEngagement: Course = {
  id: "doctor-engagement",
  title: "Professional Doctor Engagement",
  category: "doctor",
  level: "Beginner",
  objective: "Prepare for, open and conduct doctor meetings that are respectful, relevant and professional.",
  audience: "New and developing medical representatives.",
  duration: "45 min",
  minutes: 45,
  modules: [
    {
      id: "doctor-engagement-m1",
      title: "Before the meeting",
      lessons: [
        {
          id: "doctor-engagement-m1-l1",
          title: "Preparing for a doctor meeting",
          kind: "lesson",
          minutes: 5,
          summary: "Good calls are won before you enter the clinic. Preparation shows respect for the doctor's time.",
          points: [
            "Review the doctor's specialty, practice and previous discussions.",
            "Set one clear, realistic objective for the call.",
            "Choose approved materials relevant to the doctor's patients.",
            "Anticipate likely questions and know where the answers come from.",
            "Check clinic timings and respect appointment protocols.",
          ],
        },
        {
          id: "doctor-engagement-m1-l2",
          title: "Preparing to meet Dr. S. Rao",
          kind: "example",
          minutes: 3,
          summary: "A short example of focused preparation.",
          example: {
            title: "Following up a request",
            body: "On his last visit, Vikram was asked by Dr. S. Rao, a gynaecologist in Hyderabad, for a summary of a study. He raised the request with Medical Information, who sent a response. Before today's call he sets one objective: hand over the response and check whether it answered her question. He takes the approved leave-behind that matches her patients and plans to take no more than three minutes.",
          },
          points: [
            "One objective keeps the call focused.",
            "Closing a promised follow-up builds credibility.",
            "Plan the length of the call around the doctor's schedule.",
          ],
        },
      ],
    },
    {
      id: "doctor-engagement-m2",
      title: "Opening the conversation",
      lessons: [
        {
          id: "doctor-engagement-m2-l1",
          title: "A natural opening",
          kind: "flow",
          minutes: 3,
          summary: "A good opening moves naturally from greeting to a clinical topic that matters to the doctor.",
          flow: ["Greeting", "Introduction", "Purpose", "Relevant clinical topic", "Product discussion"],
          points: [
            "Keep each step brief and natural.",
            "State your purpose honestly and early.",
            "Link to a clinical topic that matters to this doctor.",
            "Move to the product only when its relevance is clear.",
          ],
        },
        {
          id: "doctor-engagement-m2-l2",
          title: "Avoiding the robotic script",
          kind: "video",
          minutes: 5,
          summary: "Doctors switch off when they hear a memorised script. Prepare your structure, then speak like a professional colleague.",
          points: [
            "Scripts help you prepare; they should not be recited.",
            "Adapt your words to the doctor's time and mood.",
            "Use the doctor's name and refer to your last discussion.",
            "Invite the doctor into the conversation rather than lecturing.",
            "Sound like a professional colleague, not an advertisement.",
          ],
        },
      ],
    },
    {
      id: "doctor-engagement-m3",
      title: "Understanding the doctor's needs",
      lessons: [
        {
          id: "doctor-engagement-m3-l1",
          title: "Listening and asking good questions",
          kind: "lesson",
          minutes: 5,
          summary: "Understanding comes before informing. Appropriate questions help you share only what is relevant.",
          points: [
            "Listen more than you speak, and let the doctor finish.",
            "Ask open questions about patients and practice, not personal matters.",
            "Clarify before responding: 'Could you tell me more about that?'",
            "Summarise what you heard to confirm understanding.",
            "Never press for prescribing commitments.",
          ],
        },
        {
          id: "doctor-engagement-m3-l2",
          title: "The doctor has five minutes",
          kind: "scenario",
          minutes: 3,
          summary: "Practise adapting a call to limited time.",
          question: {
            prompt: "Dr. M. Khan, a physician in Lucknow, says: 'I only have five minutes. What is it?' What do you do?",
            choices: [
              {
                text: "Thank him, state your purpose in one sentence, ask one question about relevant patients, and share one approved key message.",
                quality: "best",
                feedback: "Correct. Respectful, relevant and focused on what matters to his patients.",
              },
              {
                text: "Go through the full detail aid as quickly as you can.",
                quality: "weak",
                feedback: "Rushing everything means nothing lands, and it ignores his needs.",
              },
              {
                text: "Offer to come back at a better time and leave approved material.",
                quality: "ok",
                feedback: "Respectful, but you miss a short, useful exchange he has offered.",
              },
              {
                text: "Tell him the product is the best in its class, so he should prescribe it.",
                quality: "noncompliant",
                feedback: "An unsupported superiority claim and pressure to prescribe. Neither is acceptable.",
              },
            ],
            principle: "Less time calls for sharper relevance, not more words or bigger claims.",
          },
        },
      ],
    },
    {
      id: "doctor-engagement-m4",
      title: "Professional etiquette",
      lessons: [
        {
          id: "doctor-engagement-m4-l1",
          title: "Etiquette in the clinic",
          kind: "lesson",
          minutes: 3,
          summary: "Etiquette is how doctors judge whether you are worth their time.",
          points: [
            "Respect the doctor's time and the patients waiting.",
            "Be concise: one or two key messages per call.",
            "Listen without interrupting or arguing.",
            "Do not repeat the same message excessively.",
            "Make no claim you cannot support with approved material.",
            "Dress, speak and behave as a healthcare professional would expect.",
          ],
        },
        {
          id: "doctor-engagement-m4-l2",
          title: "First meeting with a new doctor",
          kind: "roleplay",
          minutes: 8,
          summary: "Practise a first meeting with an AI doctor: open naturally, understand needs and agree a next step.",
          points: [
            "Open with greeting, introduction and a clear purpose.",
            "Ask at least two open questions about the doctor's patients.",
            "Share only approved information relevant to those patients.",
            "Close by agreeing a specific follow-up.",
          ],
          aiScenario: "first-meeting",
        },
      ],
    },
  ],
  takeaways: [
    "Preparation shows respect and makes every call more relevant.",
    "Open naturally: greeting, introduction, purpose, clinical topic, then product.",
    "Listen and ask appropriate questions before you inform.",
    "Etiquette means brevity, respect and only supportable claims.",
  ],
  exercise: "Before your next three calls, write a one-line objective and two open questions for each doctor. Afterwards, note what you learned from their answers.",
  knowledgeCheck: [
    {
      prompt: "What is the best way to open a first meeting with a doctor?",
      choices: [
        { text: "Greet, introduce yourself and your company, state your purpose and link it to a relevant clinical topic.", quality: "best", feedback: "Correct. A natural, honest opening earns attention." },
        { text: "Launch straight into the product's benefits.", quality: "weak", feedback: "Without relevance established, the doctor has no reason to listen." },
        { text: "Recite the company script word for word.", quality: "weak", feedback: "Doctors notice a script straight away. Use structure, not recitation." },
        { text: "Open by offering a small gift to break the ice.", quality: "noncompliant", feedback: "Gifts to influence doctors are not permitted." },
      ],
      principle: "Earn attention with relevance and honesty, not scripts or gifts.",
    },
    {
      prompt: "A doctor disagrees with a point you made. What should you do?",
      choices: [
        { text: "Listen, ask what concerns them, and respond with approved evidence or offer a follow-up.", quality: "best", feedback: "Correct. Understanding the concern lets you respond accurately." },
        { text: "Argue until they accept your point.", quality: "weak", feedback: "Arguing damages the relationship and rarely persuades." },
        { text: "Repeat your key message three more times.", quality: "weak", feedback: "Repetition does not address the concern." },
        { text: "Make a stronger claim than the approved material supports.", quality: "noncompliant", feedback: "Overclaiming is misleading and breaches promotional rules." },
      ],
      principle: "Disagreement is a question in disguise. Clarify, then respond with approved evidence.",
    },
    {
      prompt: "Which question helps you understand a doctor's needs appropriately?",
      choices: [
        { text: "'Which patients in your practice do you find hardest to manage in this area?'", quality: "best", feedback: "Correct. Open, clinical and focused on patients." },
        { text: "'What would it take for you to prescribe our brand?'", quality: "noncompliant", feedback: "This invites a transactional answer and can imply an inducement." },
        { text: "'Do you like our product?'", quality: "weak", feedback: "A closed question that reveals little about patient need." },
        { text: "'Where are you going on holiday this year?'", quality: "weak", feedback: "Personal topics are not a basis for professional needs." },
      ],
      principle: "Ask open questions about patients and practice, never about commitments or personal matters.",
    },
  ],
  finalAssessment: { questions: 15, passMark: 80, attempts: 3 },
  certificate: "Course certificate",
  skills: ["engagement", "compliance"],
  covers: [4],
};

/* ------------------------------------------------------------------ */
/* 5. Effective Product Detailing (§5, §6)                             */
/* ------------------------------------------------------------------ */
const productDetailing: Course = {
  id: "product-detailing",
  title: "Effective Product Detailing",
  category: "selling",
  level: "Intermediate",
  objective: "Deliver structured, evidence-based product details that fit the time available and stay within approved claims.",
  audience: "Medical representatives who have completed basic product training.",
  duration: "1 h 5 min",
  minutes: 65,
  modules: [
    {
      id: "product-detailing-m1",
      title: "The detailing framework",
      lessons: [
        {
          id: "product-detailing-m1-l1",
          title: "The 7-step detailing framework",
          kind: "flow",
          minutes: 5,
          summary: "A detail that follows these seven steps is relevant, credible and compliant.",
          flow: [
            "Identify relevance",
            "Clinical need",
            "Present product",
            "Evidence",
            "Patient relevance",
            "Confirm understanding",
            "Close professionally",
          ],
          points: [
            "Each step earns the right to move to the next.",
            "Relevance and need come before the product.",
            "Evidence and patient relevance make the detail credible.",
            "Confirming understanding prevents misunderstanding and overclaiming.",
          ],
        },
        {
          id: "product-detailing-m1-l2",
          title: "Why structure beats improvisation",
          kind: "video",
          minutes: 5,
          summary: "A consistent structure keeps you focused on the doctor's patients and inside approved messages, even under pressure.",
          points: [
            "Structure keeps the detail focused on the doctor's patients.",
            "It helps you stay within approved messages.",
            "It scales from a 30-second to a 3-minute conversation.",
            "It makes coaching and self-review easier.",
          ],
        },
      ],
    },
    {
      id: "product-detailing-m2",
      title: "Relevance and clinical need (steps 1–2)",
      lessons: [
        {
          id: "product-detailing-m2-l1",
          title: "Identify relevance and clinical need",
          kind: "lesson",
          minutes: 5,
          summary: "Start with the doctor's patients, not your product. If there is no relevant need, there is no detail.",
          points: [
            "Start with the doctor's patients, not your product.",
            "Ask which patients present a challenge in this therapy area.",
            "Confirm the need in the doctor's own words before continuing.",
            "If there is no relevance, say so; do not force a detail.",
          ],
        },
        {
          id: "product-detailing-m2-l2",
          title: "The wrong specialty",
          kind: "scenario",
          minutes: 3,
          summary: "Practise recognising when a product is not relevant to a doctor.",
          question: {
            prompt: "Dr. P. Nair, a dermatologist in Kochi, agrees to see you. Your product's approved indication is in urology. What do you do?",
            choices: [
              {
                text: "Acknowledge the product may not be relevant to her practice, ask whether she sees or refers relevant patients, and offer approved information only if it would be useful.",
                quality: "best",
                feedback: "Correct. You test relevance honestly and respect her time.",
              },
              {
                text: "Suggest she could try it for some of her skin patients.",
                quality: "noncompliant",
                feedback: "This is off-label promotion. Promote only within the approved indication.",
              },
              {
                text: "Deliver the full detail anyway, since you are already there.",
                quality: "weak",
                feedback: "An irrelevant detail wastes her time and weakens your credibility.",
              },
              {
                text: "Thank her and leave politely.",
                quality: "ok",
                feedback: "Respectful, but a quick question about referrals might have shown some relevance.",
              },
            ],
            principle: "Relevance first. Never stretch a product beyond its approved indication to create relevance.",
          },
        },
      ],
    },
    {
      id: "product-detailing-m3",
      title: "Product, evidence and patient relevance (steps 3–5)",
      lessons: [
        {
          id: "product-detailing-m3-l1",
          title: "Present the product, evidence and patient relevance",
          kind: "lesson",
          minutes: 5,
          summary: "Present the product in approved words, back each message with its referenced evidence, and connect it to the patients the doctor described.",
          points: [
            "Present the product using approved wording and the approved indication.",
            "Support each key message with its referenced evidence.",
            "Include relevant safety information for a balanced picture.",
            "Connect the evidence to the patients the doctor described.",
            "Never extrapolate evidence beyond what the study showed.",
          ],
        },
        {
          id: "product-detailing-m3-l2",
          title: "A structured detail with Dr. A. Mehta",
          kind: "example",
          minutes: 3,
          summary: "The seven steps in a real conversation.",
          example: {
            title: "Karan's detail in Pune",
            body: "Karan asks Dr. A. Mehta, a urologist in Pune, which patients with chronic bladder symptoms he finds hardest to manage. Dr. Mehta describes patients who return repeatedly despite several treatments. Karan presents the product's approved indication using the exact wording in the detail aid, shows the approved, referenced study summary, and points out the key safety information. He asks, 'Does this match the patients you described?' Dr. Mehta asks a question Karan cannot answer, so Karan offers a Medical Information request and agrees to return with the response.",
          },
          points: [
            "The detail starts from the doctor's own patients.",
            "Approved wording, evidence and safety travel together.",
            "An honest 'I will find out' closes the call professionally.",
          ],
        },
      ],
    },
    {
      id: "product-detailing-m4",
      title: "Confirm and close (steps 6–7)",
      lessons: [
        {
          id: "product-detailing-m4-l1",
          title: "Confirm understanding and close professionally",
          kind: "lesson",
          minutes: 3,
          summary: "A professional close checks understanding and agrees a next step. It never asks for a commitment in return for anything.",
          points: [
            "Ask whether the information was clear and relevant.",
            "Invite questions and answer only what you can support.",
            "Summarise the key message in one sentence.",
            "Agree a next step: follow-up, material or a medical query.",
            "Never link the close to any benefit for the doctor.",
          ],
        },
      ],
    },
    {
      id: "product-detailing-m5",
      title: "30-second, 1-minute and 3-minute pitch",
      lessons: [
        {
          id: "product-detailing-m5-l1",
          title: "Scaling your pitch to the time available",
          kind: "lesson",
          minutes: 5,
          summary: "The same framework compresses or expands with the time the doctor gives you. The rules on claims never change.",
          points: [
            "30 seconds: purpose, one relevant need, one approved message.",
            "1 minute: add the key evidence point and patient relevance.",
            "3 minutes: the full framework, with safety information and questions.",
            "Every version stays within approved claims and fair balance.",
            "Always end with a clear, agreed next step.",
          ],
        },
        {
          id: "product-detailing-m5-l2",
          title: "Prepare a 60-second product pitch",
          kind: "assignment",
          minutes: 10,
          summary: "Build and rehearse a compliant 60-second pitch for review by your manager.",
          assignment: {
            brief: "Using only your current approved detail aid, prepare a 60-second pitch that follows the 7-step framework in compressed form.",
            deliverable: "A written pitch of about 150 words and a recorded run-through for your manager to review.",
            rubric: [
              "Opens with relevance to the doctor's patients",
              "Uses approved indication wording exactly",
              "Includes one referenced evidence point",
              "Includes appropriate safety information",
              "Fits within 60 seconds",
              "Ends with a professional close and next step",
            ],
          },
        },
        {
          id: "product-detailing-m5-l3",
          title: "The 60-second detail",
          kind: "roleplay",
          minutes: 8,
          summary: "Practise your 60-second pitch with an AI doctor who is short of time.",
          points: [
            "Open with relevance, not the brand name.",
            "Use one approved message and its evidence.",
            "Include balanced safety information.",
            "Agree a next step before the minute is up.",
          ],
          aiScenario: "sixty-second",
        },
      ],
    },
  ],
  takeaways: [
    "Follow the seven steps: relevance, need, product, evidence, patient relevance, confirm, close.",
    "Start with the doctor's patients; never create relevance by going off-label.",
    "Evidence and safety information always travel with the key message.",
    "Scale the pitch to the time available without changing the rules on claims.",
  ],
  exercise: "Record yourself delivering a 30-second, 1-minute and 3-minute version of the same detail, then check each against the seven steps.",
  knowledgeCheck: [
    {
      prompt: "What is the first step of the detailing framework?",
      choices: [
        { text: "Identify relevance to the doctor's practice.", quality: "best", feedback: "Correct. Relevance earns the right to continue." },
        { text: "Present the product.", quality: "weak", feedback: "Presenting before relevance is established rarely lands." },
        { text: "Show the evidence.", quality: "weak", feedback: "Evidence matters, but only once the need is clear." },
        { text: "Close with a request.", quality: "weak", feedback: "The close comes last, after understanding is confirmed." },
      ],
      principle: "Relevance before product. Every step earns the next.",
    },
    {
      prompt: "You have only 30 seconds. What should the pitch contain?",
      choices: [
        { text: "Your purpose, one relevant clinical need, one approved key message and a next step.", quality: "best", feedback: "Correct. Focused, relevant and compliant." },
        { text: "As many product features as you can fit in.", quality: "weak", feedback: "Overloading a short call means nothing is remembered." },
        { text: "The brand name, repeated.", quality: "weak", feedback: "Repetition without relevance adds no value." },
        { text: "A strong superiority claim to make an impression.", quality: "noncompliant", feedback: "Unsupported superiority claims are not permitted, however short the call." },
      ],
      principle: "Short calls need sharper relevance, not bigger claims.",
    },
    {
      prompt: "A doctor asks whether a study's results apply to a patient group the study did not include. You should:",
      choices: [
        { text: "Explain that the study did not include that group, and offer a Medical Information follow-up.", quality: "best", feedback: "Correct. Accurate and helpful without extrapolating." },
        { text: "Say the results probably apply to them as well.", quality: "noncompliant", feedback: "Extrapolating beyond the study population is misleading." },
        { text: "Change the subject.", quality: "weak", feedback: "Avoiding the question damages credibility." },
        { text: "Promise to send data you are not sure exists.", quality: "weak", feedback: "Do not promise what you cannot deliver. Route it to Medical Information." },
      ],
      principle: "Present evidence only for the population studied. Route wider questions to Medical Information.",
    },
  ],
  finalAssessment: { questions: 15, passMark: 80, attempts: 3 },
  certificate: "Course certificate",
  skills: ["sales", "science", "engagement"],
  covers: [5, 6],
};

/* ------------------------------------------------------------------ */
/* 6. Product Positioning and Differentiation (§7)                     */
/* ------------------------------------------------------------------ */
const positioning: Course = {
  id: "positioning",
  title: "Product Positioning and Differentiation",
  category: "selling",
  level: "Intermediate",
  objective: "Communicate approved product positioning and legitimate differentiation, and recognise claims that must never be made.",
  audience: "Medical representatives, area managers and product teams.",
  duration: "35 min",
  minutes: 35,
  modules: [
    {
      id: "positioning-m1",
      title: "What positioning means",
      lessons: [
        {
          id: "positioning-m1-l1",
          title: "Positioning in a regulated industry",
          kind: "lesson",
          minutes: 5,
          summary: "Positioning helps a doctor understand where a product fits for their patients. In pharma it must always sit inside the approved indication and be supported by evidence.",
          points: [
            "Positioning answers: for which patients, and why, within the label.",
            "It starts from patient need, not product features.",
            "Marketing develops it; Medical and Regulatory review approve it.",
            "MRs communicate approved positioning; they do not invent their own.",
          ],
        },
        {
          id: "positioning-m1-l2",
          title: "The positioning framework",
          kind: "flow",
          minutes: 3,
          summary: "Build every positioning conversation in this order.",
          flow: ["Patient need", "Clinical relevance", "Product information", "Evidence", "Appropriate positioning"],
          points: [
            "Begin with a real patient need the doctor recognises.",
            "Product information comes only from approved sources.",
            "Positioning is the conclusion, not the opening line.",
          ],
        },
      ],
    },
    {
      id: "positioning-m2",
      title: "Differentiation that holds up",
      lessons: [
        {
          id: "positioning-m2-l1",
          title: "Legitimate points of difference",
          kind: "video",
          minutes: 5,
          summary: "Differentiation is only credible, and only permitted, when approved material supports it.",
          points: [
            "Differentiate only on points that approved material supports.",
            "Examples may include formulation or dosing, where approved.",
            "Comparative claims need approved comparative evidence.",
            "Present differences factually, with balance and context.",
            "When in doubt, use the exact approved wording.",
          ],
        },
        {
          id: "positioning-m2-l2",
          title: "Positioning within the approved indication",
          kind: "example",
          minutes: 3,
          summary: "The framework applied in a short call.",
          example: {
            title: "Meera and Dr. R. Kulkarni",
            body: "Meera asks Dr. R. Kulkarni, a consulting physician in Nagpur, about patients whose symptoms persist despite first-line management. Dr. Kulkarni mentions a few who are frustrated with their progress. Meera explains, in the approved words, which patients the product is indicated for, shows the approved evidence summary and its safety information, and lets Dr. Kulkarni judge whether any of his patients fit. She does not describe the product as 'the best' or suggest uses outside the indication.",
          },
          points: [
            "Positioning follows the doctor's description of patient need.",
            "Approved words, evidence and safety information together.",
            "The doctor judges fit; the MR informs.",
          ],
        },
      ],
    },
    {
      id: "positioning-m3",
      title: "What should NOT be claimed",
      lessons: [
        {
          id: "positioning-m3-l1",
          title: "Claims to avoid",
          kind: "lesson",
          minutes: 5,
          summary: "Some statements are never acceptable, however confident you feel or however the doctor asks.",
          points: [
            "Uses outside the approved indication or patient population.",
            "Guaranteed outcomes or 'works for everyone' statements.",
            "Superiority without approved, head-to-head evidence.",
            "Absolute safety claims such as 'completely safe' or 'no side effects'.",
            "Comparisons that are selective, outdated or unsupported.",
            "Disparaging remarks about competitors or their products.",
          ],
        },
        {
          id: "positioning-m3-l2",
          title: "The tempting superlative",
          kind: "scenario",
          minutes: 3,
          summary: "Practise answering a leading question without overclaiming.",
          question: {
            prompt: "Dr. T. Das, a urologist in Kolkata, asks: 'So, is yours the best option?' What do you say?",
            choices: [
              {
                text: "Explain what the approved material supports for suitable patients, and let the doctor judge, without calling it 'the best'.",
                quality: "best",
                feedback: "Correct. Accurate, balanced and respectful of the doctor's judgement.",
              },
              {
                text: "'Yes, it is the best in its class.'",
                quality: "noncompliant",
                feedback: "An unsupported superiority claim. Not permitted without approved comparative evidence.",
              },
              {
                text: "'Most doctors I meet say it is the best.'",
                quality: "noncompliant",
                feedback: "Anecdote presented as evidence is still an unsupported claim.",
              },
              {
                text: "'I cannot comment on that.'",
                quality: "ok",
                feedback: "Safe, but unhelpful. You can share what the approved material does support.",
              },
            ],
            principle: "Let approved evidence speak. Never answer a leading question with an unsupported claim.",
          },
        },
      ],
    },
  ],
  takeaways: [
    "Positioning starts with patient need and ends with approved positioning.",
    "Differentiate only on what approved material supports.",
    "Never claim unapproved uses, guaranteed outcomes, unsupported superiority or absolute safety.",
    "Compare fairly and never disparage competitors.",
  ],
  exercise: "Take one approved key message and map it to the five steps of the positioning framework. Then list two statements about the product you must never make.",
  knowledgeCheck: [
    {
      prompt: "Where does the positioning framework start?",
      choices: [
        { text: "Patient need.", quality: "best", feedback: "Correct. Positioning is built on a real patient need." },
        { text: "Product features.", quality: "weak", feedback: "Features without need are just a list." },
        { text: "Price.", quality: "weak", feedback: "Price is context, not the foundation of positioning." },
        { text: "Competitor weaknesses.", quality: "weak", feedback: "Positioning against weaknesses slides towards disparagement." },
      ],
      principle: "Positioning starts with the patient and ends with approved positioning.",
    },
    {
      prompt: "Which statement is acceptable?",
      choices: [
        { text: "An approved key message quoted exactly, with its reference.", quality: "best", feedback: "Correct. Approved, referenced and accurate." },
        { text: "'This product has no side effects.'", quality: "noncompliant", feedback: "An absolute safety claim. Every medicine has potential adverse effects." },
        { text: "'It works for every patient.'", quality: "noncompliant", feedback: "A guaranteed outcome. No medicine works for everyone." },
        { text: "A reworded version of the approved message that sounds more persuasive.", quality: "noncompliant", feedback: "Rewording can change meaning. Use the approved wording." },
      ],
      principle: "Use approved wording exactly. Never guarantee outcomes or claim absolute safety.",
    },
    {
      prompt: "A doctor asks you to compare your product with a competitor. You have no approved comparative material. What do you do?",
      choices: [
        { text: "Explain that you have no approved comparison, share your product's approved information, and offer a Medical Information request.", quality: "best", feedback: "Correct. Honest and helpful within the rules." },
        { text: "Give your own view of the competitor's weaknesses.", quality: "noncompliant", feedback: "Personal opinion about a competitor is unsupported and can be disparaging." },
        { text: "Refuse to discuss anything further.", quality: "weak", feedback: "You can still share your product's approved information." },
        { text: "Show a comparison chart a colleague made.", quality: "noncompliant", feedback: "Unapproved material must never be used." },
      ],
      principle: "Compare only with approved, supportable information. Otherwise say so and route the question.",
    },
  ],
  finalAssessment: { questions: 10, passMark: 80, attempts: 3 },
  certificate: "Course certificate",
  skills: ["sales", "science"],
  covers: [7],
};

/* ------------------------------------------------------------------ */
/* 7. Building Professional Doctor Relationships (§8)                  */
/* ------------------------------------------------------------------ */
const doctorRelationships: Course = {
  id: "doctor-relationships",
  title: "Building Professional Doctor Relationships",
  category: "doctor",
  level: "Intermediate",
  objective: "Build long-term professional relationships with doctors through consistency, reliability, scientific usefulness and respect, never through inducements.",
  audience: "Medical representatives and area managers.",
  duration: "35 min",
  minutes: 35,
  modules: [
    {
      id: "doctor-relationships-m1",
      title: "Foundations of professional relationships",
      lessons: [
        {
          id: "doctor-relationships-m1-l1",
          title: "What professional relationships are built on",
          kind: "lesson",
          minutes: 5,
          summary: "Doctors value representatives who are consistent, reliable, useful and credible. These qualities take time and cannot be bought.",
          points: [
            "Consistency: regular, predictable and relevant contact.",
            "Reliability: doing what you said, when you said.",
            "Scientific usefulness: every call adds something of value.",
            "Respect for the doctor's time, preferences and judgement.",
            "Credibility: accurate information and honest answers.",
          ],
        },
        {
          id: "doctor-relationships-m1-l2",
          title: "What relationships are never built on",
          kind: "lesson",
          minutes: 3,
          summary: "Relationships are never built on financial or personal inducements. Gifts, favours or benefits linked to prescribing damage trust and breach law and industry codes.",
          points: [
            "No gifts, cash, favours or personal benefits to influence prescribing.",
            "No hospitality beyond what the code and company policy permit.",
            "No personal services, such as bookings or errands, for doctors.",
            "Courtesy is welcome; favours and obligations are not.",
          ],
        },
      ],
    },
    {
      id: "doctor-relationships-m2",
      title: "Consistency and follow-up",
      lessons: [
        {
          id: "doctor-relationships-m2-l1",
          title: "Follow-up that earns trust",
          kind: "video",
          minutes: 5,
          summary: "Reliable follow-up is the single most visible sign that you respect a doctor's time.",
          points: [
            "Note every commitment you make during a call.",
            "Follow up within the time you promised.",
            "Route medical questions through Medical Information and close the loop.",
            "If there is a delay, tell the doctor before they have to ask.",
          ],
        },
        {
          id: "doctor-relationships-m2-l2",
          title: "Keeping a promise to Dr. P. Iyer",
          kind: "example",
          minutes: 3,
          summary: "How a small promise, kept well, builds credibility.",
          example: {
            title: "A delayed answer, handled well",
            body: "Anita promised Dr. P. Iyer, a gynaecologist in Chennai, an answer to a question about a product's use in older patients. She raised it with Medical Information the same day. When the response took longer than expected, Anita messaged the clinic through the approved channel to say it was on its way and when to expect it. On her next visit, Dr. Iyer thanked her for keeping him informed and asked a further question.",
          },
          points: [
            "Raise requests on the day you receive them.",
            "Communicate delays proactively.",
            "Reliability invites deeper scientific conversations.",
          ],
        },
      ],
    },
    {
      id: "doctor-relationships-m3",
      title: "Preferences and appropriate communication",
      lessons: [
        {
          id: "doctor-relationships-m3-l1",
          title: "Respecting preferences and boundaries",
          kind: "lesson",
          minutes: 3,
          summary: "Professional relationships respect how, when and whether a doctor wants to engage.",
          points: [
            "Ask how and when the doctor prefers to receive information.",
            "Use only approved channels and content for digital communication.",
            "Keep conversations professional; avoid personal or intrusive topics.",
            "Respect a doctor's decision not to meet or not to prescribe.",
          ],
        },
        {
          id: "doctor-relationships-m3-l2",
          title: "A request for a personal favour",
          kind: "scenario",
          minutes: 3,
          summary: "Practise keeping a relationship professional under personal pressure.",
          question: {
            prompt: "Dr. G. Reddy, whom you have visited for two years, asks you to use your contacts to get his nephew an internship at a hospital. What do you do?",
            choices: [
              {
                text: "Politely decline, explaining that you cannot provide personal favours, and keep the conversation on professional topics.",
                quality: "best",
                feedback: "Correct. Clear and courteous, and it protects both of you.",
              },
              {
                text: "Help, since it does not involve money.",
                quality: "noncompliant",
                feedback: "Personal favours are benefits in kind and can be inducements.",
              },
              {
                text: "Say you will try, then avoid the topic.",
                quality: "weak",
                feedback: "Vague promises create expectations and damage trust later.",
              },
              {
                text: "Decline and stop visiting the doctor.",
                quality: "weak",
                feedback: "Declining is right, but a professional relationship can continue.",
              },
            ],
            principle: "Relationships rest on professional value. Personal favours are benefits, and benefits are not permitted.",
          },
        },
      ],
    },
  ],
  takeaways: [
    "Trust grows from consistency, reliability, scientific usefulness, respect and credibility.",
    "Relationships are never built on financial or personal inducements.",
    "Follow up on every commitment and communicate delays early.",
    "Respect each doctor's preferences, boundaries and decisions.",
  ],
  exercise: "Review your last ten calls. List every commitment you made and whether you kept it on time. Close any open items this week.",
  knowledgeCheck: [
    {
      prompt: "What builds a long-term professional relationship with a doctor?",
      choices: [
        { text: "Reliable follow-up and scientifically useful information.", quality: "best", feedback: "Correct. Reliability and usefulness are what doctors value." },
        { text: "Regular gifts for the doctor's family.", quality: "noncompliant", feedback: "Gifts are inducements and are not permitted." },
        { text: "Frequent visits with the same message.", quality: "weak", feedback: "Frequency without value tests the doctor's patience." },
        { text: "Talking mainly about personal interests.", quality: "weak", feedback: "Rapport is fine, but the relationship must rest on professional value." },
      ],
      principle: "Earn trust through value and reliability, never benefits.",
    },
    {
      prompt: "You promised a study summary, but Medical Information needs more time. What do you do?",
      choices: [
        { text: "Tell the doctor about the delay and when to expect the response.", quality: "best", feedback: "Correct. Proactive communication keeps your credibility intact." },
        { text: "Wait until it arrives and say nothing.", quality: "weak", feedback: "The doctor may think you have forgotten." },
        { text: "Write your own summary of the study and send that instead.", quality: "noncompliant", feedback: "Self-made summaries are unapproved material." },
        { text: "Avoid the doctor until you have it.", quality: "weak", feedback: "Avoidance damages the relationship more than the delay." },
      ],
      principle: "Keep promises, and when you cannot, say so early.",
    },
    {
      prompt: "A doctor says she prefers to receive updates by email only. You should:",
      choices: [
        { text: "Respect the preference and use approved email channels and content.", quality: "best", feedback: "Correct. Respecting preferences is part of professionalism." },
        { text: "Keep visiting in person anyway.", quality: "weak", feedback: "Ignoring a stated preference erodes trust." },
        { text: "Send unapproved content through a personal messaging app.", quality: "noncompliant", feedback: "Only approved channels and content may be used." },
        { text: "Stop contacting her altogether.", quality: "weak", feedback: "She asked for email, not for no contact." },
      ],
      principle: "Engage the way the doctor prefers, through approved channels only.",
    },
  ],
  finalAssessment: { questions: 10, passMark: 80, attempts: 3 },
  certificate: "Course certificate",
  skills: ["engagement", "compliance"],
  covers: [8],
};

/* ------------------------------------------------------------------ */
/* 8. New Doctor Acquisition and Professional Introduction (§9)        */
/* ------------------------------------------------------------------ */
const newDoctor: Course = {
  id: "new-doctor",
  title: "New Doctor Acquisition and Professional Introduction",
  category: "doctor",
  level: "Intermediate",
  objective: "Identify relevant new doctors and introduce yourself and your company in a professional, compliant way that leads to an agreed follow-up.",
  audience: "Medical representatives expanding coverage or taking over a territory.",
  duration: "45 min",
  minutes: 45,
  modules: [
    {
      id: "new-doctor-m1",
      title: "The acquisition process",
      lessons: [
        {
          id: "new-doctor-m1-l1",
          title: "Nine steps to a professional introduction",
          kind: "flow",
          minutes: 5,
          summary: "Adding a new doctor follows a clear, respectful sequence from identification to follow-up.",
          flow: [
            "Identify the doctor through territory mapping",
            "Research specialty and practice",
            "Set the objective of the first call",
            "Request a meeting through clinic protocol",
            "Introduce yourself and your company",
            "Understand the doctor's practice and needs",
            "Share relevant, approved information",
            "Agree a follow-up",
            "Record the call and follow up",
          ],
          points: [
            "Relevance, not convenience, decides which doctors to approach.",
            "Respect clinic protocols from the very first contact.",
            "The first call aims to understand, not to sell hard.",
          ],
        },
        {
          id: "new-doctor-m1-l2",
          title: "Identifying and researching new doctors",
          kind: "lesson",
          minutes: 5,
          summary: "Find doctors whose patients may benefit from the information you carry, using legitimate sources only.",
          points: [
            "Use CRM, territory maps and public directories to find relevant doctors.",
            "Prioritise by specialty, patient profile and product relevance.",
            "Learn the practice setting: clinic, hospital or nursing home.",
            "Never gather personal information unrelated to professional practice.",
            "Check whether a colleague already covers the doctor.",
          ],
        },
      ],
    },
    {
      id: "new-doctor-m2",
      title: "The first call",
      lessons: [
        {
          id: "new-doctor-m2-l1",
          title: "Making a credible first impression",
          kind: "video",
          minutes: 5,
          summary: "The first call sets the tone for the whole relationship. Aim to be useful, brief and trustworthy.",
          points: [
            "Be punctual, well prepared and appropriately dressed.",
            "Introduce yourself, your company and your purpose clearly.",
            "Carry your company ID and approved materials only.",
            "Ask before you present; listen before you inform.",
            "Keep the first call short and useful.",
          ],
        },
        {
          id: "new-doctor-m2-l2",
          title: "First visit to Dr. K. Menon",
          kind: "example",
          minutes: 3,
          summary: "A first call that ends with an agreed next step.",
          example: {
            title: "Arun in Kochi",
            body: "Arun books a slot through the clinic assistant of Dr. K. Menon, a urologist in Kochi. He introduces himself and his company, explains that he supports urologists with information on the company's approved products, and asks which bladder conditions Dr. Menon sees most often. He shares one approved leave-behind relevant to what he hears, answers one question from the material, and notes a second question for Medical Information. They agree that Arun will return in three weeks with the response.",
          },
          points: [
            "Book through the clinic's own process.",
            "Ask about the practice before sharing information.",
            "End with a specific, agreed follow-up.",
          ],
        },
        {
          id: "new-doctor-m2-l3",
          title: "The clinic says no MR visits",
          kind: "scenario",
          minutes: 3,
          summary: "Practise respecting a clinic's policy while keeping the door open.",
          question: {
            prompt: "The receptionist tells you that the doctor does not meet medical representatives. What do you do?",
            choices: [
              {
                text: "Respect the policy, ask whether the doctor accepts information another way, such as approved email or a scheduled appointment, and leave your contact details.",
                quality: "best",
                feedback: "Correct. You respect the policy and offer a professional alternative.",
              },
              {
                text: "Offer the receptionist a small gift to get you in.",
                quality: "noncompliant",
                feedback: "Gifts to gain access are inducements, whoever receives them.",
              },
              {
                text: "Wait in the corridor to catch the doctor between patients.",
                quality: "weak",
                feedback: "Ignoring a clear policy is disrespectful and damages your company's reputation.",
              },
              {
                text: "Leave and try again next month.",
                quality: "ok",
                feedback: "Polite, but you missed the chance to ask how the doctor prefers to receive information.",
              },
            ],
            principle: "Respect access policies. Offer approved alternatives rather than workarounds.",
          },
        },
      ],
    },
    {
      id: "new-doctor-m3",
      title: "After the first call",
      lessons: [
        {
          id: "new-doctor-m3-l1",
          title: "Follow-up and continuity",
          kind: "lesson",
          minutes: 3,
          summary: "The first call only counts if the follow-up happens.",
          points: [
            "Record the call accurately on the same day.",
            "Send any promised approved material through approved channels.",
            "Route medical questions to Medical Information.",
            "Plan the next call around what you learned.",
          ],
        },
        {
          id: "new-doctor-m3-l2",
          title: "Introduce yourself to a new doctor",
          kind: "roleplay",
          minutes: 8,
          summary: "Practise the full first call with an AI doctor you have never met before.",
          points: [
            "Introduce yourself, your company and your purpose.",
            "Ask about the doctor's practice and patients.",
            "Share one relevant, approved piece of information.",
            "Agree a clear follow-up.",
          ],
          aiScenario: "first-meeting",
        },
      ],
    },
  ],
  takeaways: [
    "Follow the nine steps from identification to follow-up.",
    "Identify new doctors by professional relevance, using legitimate sources.",
    "Respect clinic protocols and access policies.",
    "A first call succeeds when it ends with an agreed, kept follow-up.",
  ],
  exercise: "Identify three new doctors relevant to your therapy area, and write a first-call objective and one opening question for each.",
  knowledgeCheck: [
    {
      prompt: "What is the first step in acquiring a new doctor?",
      choices: [
        { text: "Identify relevant doctors through legitimate territory mapping.", quality: "best", feedback: "Correct. Relevance comes first." },
        { text: "Visit every clinic on the street.", quality: "weak", feedback: "Untargeted visits waste your time and the doctors'." },
        { text: "Buy a list of doctors' personal phone numbers.", quality: "noncompliant", feedback: "This breaches privacy and data protection rules." },
        { text: "Start with the doctor whose clinic is nearest.", quality: "weak", feedback: "Convenience is not relevance." },
      ],
      principle: "Identify doctors by professional relevance, using legitimate sources only.",
    },
    {
      prompt: "On a first call, a doctor asks, 'What is in it for me?' How do you respond?",
      choices: [
        { text: "Explain the scientific information and support you can offer for their patients, and that you cannot offer personal benefits.", quality: "best", feedback: "Correct. Clear about your value and your boundaries." },
        { text: "Hint at possible future sponsorship.", quality: "noncompliant", feedback: "Implying benefits is an inducement." },
        { text: "Promise to visit often.", quality: "weak", feedback: "Frequency is not value." },
        { text: "Say 'whatever you need'.", quality: "weak", feedback: "Vague and open to misunderstanding. Be clear about what you can offer." },
      ],
      principle: "Your value is information and service for patients, not personal benefit.",
    },
    {
      prompt: "After a first call, what must happen?",
      choices: [
        { text: "Record the outcome accurately and follow up as agreed.", quality: "best", feedback: "Correct. Accurate records and kept promises build the relationship." },
        { text: "Wait for the doctor to contact you.", quality: "weak", feedback: "The follow-up is your responsibility." },
        { text: "Record it only if the doctor seemed interested.", quality: "weak", feedback: "Every call should be recorded accurately." },
        { text: "Record that the doctor agreed to prescribe, although they did not.", quality: "noncompliant", feedback: "Falsifying records is serious misconduct." },
      ],
      principle: "Record every call truthfully and keep every commitment.",
    },
  ],
  finalAssessment: { questions: 15, passMark: 80, attempts: 3 },
  certificate: "Course certificate",
  skills: ["engagement", "territory"],
  covers: [9],
};

/* ------------------------------------------------------------------ */
/* 9. Call Planning and the Doctor Call Cycle (§10, §11)               */
/* ------------------------------------------------------------------ */
const callPlanning: Course = {
  id: "call-planning",
  title: "Call Planning and the Doctor Call Cycle",
  category: "doctor",
  level: "Beginner",
  objective: "Plan every doctor call with a clear objective and approved message, run it through the full call cycle, and record the outcome accurately.",
  audience: "New and developing medical representatives.",
  duration: "50 min",
  minutes: 50,
  modules: [
    {
      id: "call-planning-m1",
      title: "The call plan",
      lessons: [
        {
          id: "call-planning-m1-l1",
          title: "What goes into a call plan",
          kind: "lesson",
          minutes: 5,
          summary: "A call plan has nine fields: doctor, specialty, objective, product, core message, scientific material, previous discussion, follow-up required and expected next action.",
          points: [
            "Doctor and specialty: who you are meeting and their practice.",
            "Objective: one specific, realistic aim for this call.",
            "Product and core message, taken from approved material.",
            "Scientific material you will use or leave behind.",
            "Previous discussion and any follow-up you owe.",
            "Expected next action: what should happen after the call.",
          ],
        },
        {
          id: "call-planning-m1-l2",
          title: "A call plan for Dr. R. Kulkarni",
          kind: "example",
          minutes: 3,
          summary: "A completed call plan, field by field.",
          example: {
            title: "Priya's plan for Tuesday",
            body: "Doctor: Dr. R. Kulkarni. Specialty: consulting physician, Nagpur. Objective: understand how she manages patients with chronic bladder symptoms and whether she refers them to urology. Product: the promoted product, within its approved indication only. Core message: approved key message 1 from the current detail aid. Scientific material: approved study summary leaflet. Previous discussion: she asked a dosing question, which was sent to Medical Information; the response has arrived. Follow-up required: hand over the Medical Information response. Expected next action: agree whether a further discussion would be useful.",
          },
          points: [
            "Every field is specific and factual.",
            "Pending follow-ups are part of the plan.",
            "The expected next action is realistic, not a prescribing target.",
          ],
        },
      ],
    },
    {
      id: "call-planning-m2",
      title: "The doctor call cycle",
      lessons: [
        {
          id: "call-planning-m2-l1",
          title: "The ten-stage call cycle",
          kind: "flow",
          minutes: 5,
          summary: "Every call, however short, moves through the same cycle from preparation to record.",
          flow: [
            "Preparation",
            "Opening",
            "Need identification",
            "Product discussion",
            "Evidence",
            "Questions",
            "Objection handling",
            "Close",
            "Follow-up",
            "Record outcome",
          ],
          points: [
            "Preparation and recording happen outside the clinic.",
            "Short calls compress the middle stages; none are skipped entirely.",
            "The cycle ends only when the outcome is recorded.",
          ],
        },
        {
          id: "call-planning-m2-l2",
          title: "Walking through a complete call",
          kind: "video",
          minutes: 8,
          summary: "A narrated walk-through of one complete call, stage by stage.",
          points: [
            "Preparation happens before you enter the clinic.",
            "Opening and need identification set the direction.",
            "Product discussion and evidence answer the need.",
            "Questions and objections deserve careful, honest responses.",
            "Close with an agreed next step and record the outcome promptly.",
          ],
        },
      ],
    },
    {
      id: "call-planning-m3",
      title: "Recording and follow-up",
      lessons: [
        {
          id: "call-planning-m3-l1",
          title: "Recording the outcome accurately",
          kind: "lesson",
          minutes: 3,
          summary: "Accurate records keep your follow-ups on track and are a compliance requirement.",
          points: [
            "Record the call on the same day, while details are fresh.",
            "Note what was discussed, questions raised and commitments made.",
            "Report any adverse event or complaint through the safety process, not only in CRM.",
            "Record facts, not assumptions or wishful thinking.",
          ],
        },
        {
          id: "call-planning-m3-l2",
          title: "When nothing was agreed",
          kind: "scenario",
          minutes: 3,
          summary: "Practise recording a call honestly when it did not go to plan.",
          question: {
            prompt: "The doctor listened politely but agreed no next step. How do you record the call?",
            choices: [
              {
                text: "Record accurately what was discussed, note that no next step was agreed, and set a relevant objective for the next call.",
                quality: "best",
                feedback: "Correct. Honest records help you plan a better next call.",
              },
              {
                text: "Record that the doctor agreed to prescribe, to help your numbers.",
                quality: "noncompliant",
                feedback: "Falsifying records is serious misconduct.",
              },
              {
                text: "Do not record the call, because nothing happened.",
                quality: "weak",
                feedback: "The call happened. Missing records create gaps in coverage and compliance.",
              },
              {
                text: "Record 'call done' with no further detail.",
                quality: "weak",
                feedback: "Too thin to help you or your manager plan the next call.",
              },
            ],
            principle: "Record what actually happened. Honest records make better plans.",
          },
        },
      ],
    },
    {
      id: "call-planning-m4",
      title: "Practice",
      lessons: [
        {
          id: "call-planning-m4-l1",
          title: "Create a call plan for three doctors",
          kind: "assignment",
          minutes: 10,
          summary: "Apply the nine-field call plan to real doctors in your territory.",
          assignment: {
            brief: "Choose three doctors from your territory with different specialties or practice types. Create a complete call plan for each.",
            deliverable: "Three call plans using all nine fields, shared with your area manager before your next field day.",
            rubric: [
              "All nine fields completed for each doctor",
              "Objectives are specific and realistic",
              "Core messages come from approved material only",
              "Previous discussions and pending follow-ups are captured",
              "Expected next actions are clear",
              "No inappropriate or personal information is recorded",
            ],
          },
        },
      ],
    },
  ],
  takeaways: [
    "Plan every call using the nine fields, with one clear objective.",
    "Follow the call cycle from preparation to recorded outcome.",
    "Record calls on the same day, truthfully and in useful detail.",
    "Safety information goes through the safety process, not only CRM.",
  ],
  exercise: "For one week, write a call plan before every call and compare it with what actually happened. Note one improvement for the following week.",
  knowledgeCheck: [
    {
      prompt: "Which of these belongs in a call plan?",
      choices: [
        { text: "A specific objective, the approved core message and the expected next action.", quality: "best", feedback: "Correct. These fields make the call focused and measurable." },
        { text: "The doctor's hobbies and family details.", quality: "noncompliant", feedback: "Personal information has no place in a call plan." },
        { text: "Only the doctor's name and appointment time.", quality: "weak", feedback: "Too little to guide a useful call." },
        { text: "The number of prescriptions you expect in return.", quality: "weak", feedback: "Plans set professional objectives, not prescribing expectations." },
      ],
      principle: "A call plan is professional, specific and based on approved content.",
    },
    {
      prompt: "In the call cycle, which stage comes immediately after the close?",
      choices: [
        { text: "Follow-up.", quality: "best", feedback: "Correct. Follow-up, then record outcome." },
        { text: "Preparation.", quality: "weak", feedback: "Preparation begins the cycle." },
        { text: "Opening.", quality: "weak", feedback: "Opening comes near the start of the call." },
        { text: "Evidence.", quality: "weak", feedback: "Evidence follows the product discussion." },
      ],
      principle: "The cycle runs from preparation to recorded outcome, with follow-up after the close.",
    },
    {
      prompt: "During a call, a doctor mentions that a patient had an unexpected reaction to a company product. Where does this go?",
      choices: [
        { text: "Into the company's adverse event reporting process within the required timeframe, as well as your call notes.", quality: "best", feedback: "Correct. Safety information must reach pharmacovigilance promptly." },
        { text: "Into your CRM notes only.", quality: "weak", feedback: "CRM notes do not replace a safety report." },
        { text: "Mentioned informally to a colleague.", quality: "weak", feedback: "Informal mentions are not reports." },
        { text: "Nowhere, because it could harm sales.", quality: "noncompliant", feedback: "Suppressing safety information is a serious breach." },
      ],
      principle: "Safety information always goes through the safety process, promptly.",
    },
  ],
  finalAssessment: { questions: 15, passMark: 80, attempts: 3 },
  certificate: "Course certificate",
  skills: ["territory", "engagement"],
  covers: [10, 11],
};

/* ------------------------------------------------------------------ */
/* 10. Handling Doctor Questions and Objections (§12, §13)             */
/* ------------------------------------------------------------------ */
const objectionHandling: Course = {
  id: "objection-handling",
  title: "Handling Doctor Questions and Objections",
  category: "selling",
  level: "Intermediate",
  objective: "Respond to doctors' questions and objections calmly, accurately and within approved information, and know when to refer to Medical Affairs.",
  audience: "Medical representatives and area managers.",
  duration: "1 h",
  minutes: 60,
  modules: [
    {
      id: "objection-handling-m1",
      title: "Understanding objections",
      lessons: [
        {
          id: "objection-handling-m1-l1",
          title: "Common objection categories",
          kind: "lesson",
          minutes: 5,
          summary: "Most objections are genuine questions. Recognising the category helps you respond with the right approved information.",
          points: [
            "Efficacy and evidence: 'Does it work, and how do you know?'",
            "Safety: 'What should I watch for in my patients?'",
            "Price and availability: 'Can my patients afford and obtain it?'",
            "Experience: 'I have not used it' or 'it did not suit my patient.'",
            "Competitor preference: 'I already use another product.'",
            "Patient suitability: 'Which of my patients would it suit?'",
          ],
        },
        {
          id: "objection-handling-m1-l2",
          title: "LISTEN, CLARIFY, RESPOND, SUPPORT, CONFIRM",
          kind: "flow",
          minutes: 5,
          summary: "A five-step framework for handling any objection professionally.",
          flow: ["LISTEN", "CLARIFY", "RESPOND", "SUPPORT", "CONFIRM"],
          points: [
            "Listen fully, without interrupting or becoming defensive.",
            "Clarify: ask what lies behind the concern.",
            "Respond with approved, accurate information.",
            "Support with referenced evidence, or offer a medical follow-up.",
            "Confirm that the doctor's concern has been addressed.",
          ],
        },
      ],
    },
    {
      id: "objection-handling-m2",
      title: "When you do not know",
      lessons: [
        {
          id: "objection-handling-m2-l1",
          title: "Never invent an answer",
          kind: "lesson",
          minutes: 3,
          summary: "If you do not know, say so. Offer an accurate answer through the medical or scientific channel and follow up as promised. An invented answer can harm patients and destroys trust.",
          points: [
            "'I do not know, but I will find out' is a professional answer.",
            "Submit medical questions to Medical Information in writing.",
            "Tell the doctor when to expect a response.",
            "Never guess doses, interactions or safety information.",
          ],
        },
        {
          id: "objection-handling-m2-l2",
          title: "A question beyond your training",
          kind: "scenario",
          minutes: 3,
          summary: "Practise handling a question you cannot answer.",
          question: {
            prompt: "Dr. H. Pillai asks whether your product interacts with a medicine her elderly patient takes. It is not covered in your detail aid. What do you do?",
            choices: [
              {
                text: "Say you do not want to guess, point her to the prescribing information, and offer a Medical Information request with a clear follow-up date.",
                quality: "best",
                feedback: "Correct. Honest, safe and helpful.",
              },
              {
                text: "Say you are sure there is no problem.",
                quality: "noncompliant",
                feedback: "An invented safety answer could harm a patient.",
              },
              {
                text: "Suggest she searches online.",
                quality: "weak",
                feedback: "Unhelpful and unreliable. The company has a proper channel for this.",
              },
              {
                text: "Say you will ask your manager and get back to her.",
                quality: "ok",
                feedback: "Honest, but your manager is not the medical channel. Use Medical Information.",
              },
            ],
            principle: "Never invent an answer. Confirm through Medical Information and follow up.",
          },
        },
      ],
    },
    {
      id: "objection-handling-m3",
      title: "Competitor objections",
      lessons: [
        {
          id: "objection-handling-m3-l1",
          title: "Handling competitor preference professionally",
          kind: "video",
          minutes: 5,
          summary: "When a doctor prefers a competitor, respect that experience and respond only with approved, supportable information.",
          points: [
            "Respect the doctor's experience with the competitor.",
            "Never criticise a competitor emotionally or personally.",
            "Compare only on approved, supportable information.",
            "Company approval processes govern every comparative claim.",
            "Focus on where your product may fit for suitable patients.",
          ],
        },
        {
          id: "objection-handling-m3-l2",
          title: "I prefer the competitor",
          kind: "roleplay",
          minutes: 8,
          summary: "Practise with an AI doctor who is loyal to a competitor product.",
          points: [
            "Acknowledge the preference without arguing.",
            "Clarify what the doctor values in the current choice.",
            "Share approved information on where your product may fit.",
            "Avoid any disparaging or unsupported comparison.",
          ],
          aiScenario: "competitor-preference",
        },
      ],
    },
    {
      id: "objection-handling-m4",
      title: "Price objections and practice",
      lessons: [
        {
          id: "objection-handling-m4-l1",
          title: "The price objection",
          kind: "roleplay",
          minutes: 8,
          summary: "Practise responding to an AI doctor who is worried about cost for patients.",
          points: [
            "Clarify: cost for which patients, compared with what?",
            "Give factual pricing context without discounts or deals.",
            "Discuss value only as approved material supports.",
            "Never offer benefits to offset a price concern.",
          ],
          aiScenario: "price-objection",
        },
        {
          id: "objection-handling-m4-l2",
          title: "Explain how you would respond to this objection",
          kind: "assignment",
          minutes: 10,
          summary: "Apply the five-step framework to a real objection from your territory.",
          assignment: {
            brief: "Your manager will assign one real objection from your territory. Explain, step by step, how you would respond using LISTEN, CLARIFY, RESPOND, SUPPORT, CONFIRM.",
            deliverable: "A written response plan of up to 300 words, naming the approved material you would use and any medical follow-up route.",
            rubric: [
              "Identifies the objection category correctly",
              "Includes a clarifying question before responding",
              "Uses approved, accurate information only",
              "Names the supporting evidence or medical follow-up route",
              "Confirms resolution with the doctor",
              "Contains no inducement, disparagement or off-label content",
            ],
          },
        },
      ],
    },
  ],
  takeaways: [
    "Treat objections as genuine questions and identify their category.",
    "Use LISTEN, CLARIFY, RESPOND, SUPPORT, CONFIRM every time.",
    "If you do not know, say so and follow up through Medical Information.",
    "Handle competitor objections with approved, supportable information and no disparagement.",
  ],
  exercise: "Write down the three objections you hear most often. For each, draft a clarifying question and identify the approved material that supports your response.",
  knowledgeCheck: [
    {
      prompt: "What is the correct order of the objection-handling framework?",
      choices: [
        { text: "Listen, clarify, respond, support, confirm.", quality: "best", feedback: "Correct. Understand first, then respond and support." },
        { text: "Respond, support, listen, clarify, confirm.", quality: "weak", feedback: "Responding before listening risks answering the wrong concern." },
        { text: "Clarify, respond, confirm, listen, support.", quality: "weak", feedback: "Listening must come first." },
        { text: "Support, respond, confirm, listen, clarify.", quality: "weak", feedback: "Evidence without understanding rarely addresses the real concern." },
      ],
      principle: "Understand the objection before you answer it.",
    },
    {
      prompt: "A doctor asks something you cannot answer. What do you do?",
      choices: [
        { text: "Say you do not know, and arrange a Medical Information response with a follow-up date.", quality: "best", feedback: "Correct. Honest and reliable." },
        { text: "Give your best guess confidently.", quality: "noncompliant", feedback: "Guessing medical information can harm patients." },
        { text: "Change the subject.", quality: "weak", feedback: "Avoidance damages your credibility." },
        { text: "Promise an answer but never follow up.", quality: "weak", feedback: "An unkept promise is worse than no promise." },
      ],
      principle: "Never invent an answer. Refer to Medical Information and follow up.",
    },
    {
      prompt: "A doctor says a competitor's product is better. What is the best approach?",
      choices: [
        { text: "Acknowledge their experience, clarify what they value, and share approved information on where your product may fit.", quality: "best", feedback: "Correct. Respectful and evidence-led." },
        { text: "Point out the competitor's weaknesses based on rumours.", quality: "noncompliant", feedback: "Rumours are unsupported, and sharing them is disparagement." },
        { text: "Agree and leave.", quality: "weak", feedback: "You miss the chance to share relevant, approved information." },
        { text: "Argue that they are wrong.", quality: "weak", feedback: "Arguing damages the relationship and rarely persuades." },
      ],
      principle: "Respect preferences, clarify needs and compare only with approved information.",
    },
  ],
  finalAssessment: { questions: 15, passMark: 80, attempts: 3 },
  certificate: "Course certificate",
  skills: ["sales", "science", "compliance"],
  covers: [12, 13],
};

/* ------------------------------------------------------------------ */
/* 11. Scientific Communication for MRs (§14, §15)                     */
/* ------------------------------------------------------------------ */
const scientificCommunication: Course = {
  id: "scientific-communication",
  title: "Scientific Communication for MRs",
  category: "science",
  level: "Intermediate",
  objective: "Understand clinical study basics, read a study accurately and discuss evidence with doctors without exaggerating or going beyond the label.",
  audience: "Medical representatives, area managers and marketing teams.",
  duration: "55 min",
  minutes: 55,
  modules: [
    {
      id: "scientific-communication-m1",
      title: "Scientific foundations",
      lessons: [
        {
          id: "scientific-communication-m1-l1",
          title: "Clinical trials and study design",
          kind: "video",
          minutes: 8,
          summary: "How clinical studies are designed, and why design determines what a study can and cannot show.",
          points: [
            "Clinical development runs in phases, from small studies to large trials.",
            "Randomisation allocates treatment by chance to reduce bias.",
            "Blinding keeps patients or investigators unaware of the treatment given.",
            "A comparator may be a placebo or an active treatment.",
            "Observational studies show associations, not necessarily cause and effect.",
          ],
        },
        {
          id: "scientific-communication-m1-l2",
          title: "Efficacy, safety and endpoints",
          kind: "lesson",
          minutes: 5,
          summary: "Studies measure pre-defined outcomes. Knowing which outcome was primary tells you what the study was designed to prove.",
          points: [
            "Efficacy: how well a treatment works under study conditions.",
            "Safety: adverse events and tolerability observed in the study.",
            "Primary endpoint: the main pre-specified measure of success.",
            "Secondary endpoints support, but cannot replace, the primary result.",
            "Always present efficacy together with relevant safety information.",
          ],
        },
        {
          id: "scientific-communication-m1-l3",
          title: "Statistical versus clinical significance",
          kind: "lesson",
          minutes: 5,
          summary: "A statistically significant result is unlikely to be due to chance. Whether it matters to patients is a separate, clinical question.",
          points: [
            "Statistical significance: a result unlikely to be due to chance alone.",
            "Clinical significance: whether the difference matters to patients.",
            "A statistically significant result may still be clinically small.",
            "Confidence intervals show the likely range of the true effect.",
            "Present data neutrally and let the doctor judge clinical relevance.",
          ],
        },
      ],
    },
    {
      id: "scientific-communication-m2",
      title: "Reading a clinical study",
      lessons: [
        {
          id: "scientific-communication-m2-l1",
          title: "How to read a clinical study",
          kind: "flow",
          minutes: 5,
          summary: "Read every study in the same order, so you understand what it tested before you look at what it found.",
          flow: ["Title", "Objective", "Population", "Treatment", "Comparator", "Endpoint", "Results", "Limitations", "Conclusion"],
          points: [
            "The population tells you who the results apply to.",
            "Check the comparator before interpreting any difference.",
            "Identify the primary endpoint and whether it was met.",
            "Note the limitations the authors themselves report.",
            "Never exaggerate conclusions beyond what the study shows.",
          ],
        },
        {
          id: "scientific-communication-m2-l2",
          title: "Reading a study summary with Dr. N. Shah",
          kind: "example",
          minutes: 5,
          summary: "Using the reading order to discuss an approved study summary accurately.",
          example: {
            title: "Walking through a study, not selling it",
            body: "Dr. N. Shah, a urologist in Ahmedabad, asks about the study behind a claim in an approved leaflet. Deepa opens the approved study summary and walks through it in order: the objective, who was included, what was compared, and the primary endpoint. She reads the result exactly as the summary states it, then points out the limitations the authors listed. When Dr. Shah asks whether the findings apply to a group the study did not include, Deepa says the study cannot answer that and offers a Medical Information request.",
          },
          points: [
            "Walk through design before results.",
            "State results exactly as written; do not round up.",
            "Limitations are part of an honest discussion.",
          ],
        },
      ],
    },
    {
      id: "scientific-communication-m3",
      title: "Communicating science accurately",
      lessons: [
        {
          id: "scientific-communication-m3-l1",
          title: "Label, approved indication and reference publications",
          kind: "lesson",
          minutes: 5,
          summary: "The product label defines what you may promote. Reference publications support approved claims; they never extend them.",
          points: [
            "The prescribing information (label) is the primary approved source.",
            "Promote only within the approved indication.",
            "Reference publications support approved claims; they do not extend them.",
            "Quote findings accurately, with population and limitations.",
            "Unsolicited off-label questions go to Medical Information.",
          ],
        },
        {
          id: "scientific-communication-m3-l2",
          title: "The study says more than the label",
          kind: "scenario",
          minutes: 3,
          summary: "Practise handling a published study that goes beyond the approved indication.",
          question: {
            prompt: "A doctor asks about a published study of your product that included patients outside the approved indication. What do you do?",
            choices: [
              {
                text: "Explain that you can discuss only the approved indication, and offer a Medical Information response to her question.",
                quality: "best",
                feedback: "Correct. Compliant, and the doctor still gets a scientific answer.",
              },
              {
                text: "Summarise the off-label findings, since they are published.",
                quality: "noncompliant",
                feedback: "Publication does not make off-label promotion acceptable.",
              },
              {
                text: "Leave a copy of the full paper without comment.",
                quality: "noncompliant",
                feedback: "Distributing off-label material proactively is still promotion.",
              },
              {
                text: "Say the study is not relevant.",
                quality: "weak",
                feedback: "Dismissive and inaccurate. Route the question properly instead.",
              },
            ],
            principle: "Publications support the label; they never extend it. Off-label questions go to Medical Information.",
          },
        },
        {
          id: "scientific-communication-m3-l3",
          title: "Discuss a clinical study with a doctor",
          kind: "roleplay",
          minutes: 8,
          summary: "Practise discussing an approved study summary with an AI doctor who asks probing scientific questions.",
          points: [
            "Walk through design before results.",
            "Quote results and limitations accurately.",
            "Stay within the approved indication.",
            "Refer questions you cannot answer to Medical Information.",
          ],
          aiScenario: "scientific-discussion",
        },
      ],
    },
  ],
  takeaways: [
    "Study design determines what a study can and cannot show.",
    "Separate statistical significance from clinical relevance, and present both neutrally.",
    "Read studies in order: title, objective, population, treatment, comparator, endpoint, results, limitations, conclusion.",
    "Never exaggerate conclusions or extend them beyond the approved label.",
  ],
  exercise: "Take one approved study summary and complete the nine-step reading order in writing, including limitations. Discuss it with your manager or a Medical Affairs colleague.",
  knowledgeCheck: [
    {
      prompt: "What does the primary endpoint represent?",
      choices: [
        { text: "The main pre-specified outcome the study was designed to measure.", quality: "best", feedback: "Correct. It defines what the study set out to prove." },
        { text: "Any positive result reported in the paper.", quality: "weak", feedback: "Positive results on other endpoints are not the primary result." },
        { text: "The last result in the results section.", quality: "weak", feedback: "Position in the paper does not define the primary endpoint." },
        { text: "Whichever endpoint makes the product look best.", quality: "noncompliant", feedback: "Choosing favourable endpoints to promote is misleading." },
      ],
      principle: "Know the primary endpoint before interpreting any result.",
    },
    {
      prompt: "A result is statistically significant, but the difference is small. How should you present it?",
      choices: [
        { text: "Accurately, with the actual result and its context, letting the doctor judge clinical relevance.", quality: "best", feedback: "Correct. Neutral and accurate." },
        { text: "As a major breakthrough.", quality: "noncompliant", feedback: "Exaggerating a result is misleading." },
        { text: "Leave it out entirely.", quality: "weak", feedback: "Omitting relevant data is not balanced either." },
        { text: "As proof that the product works for everyone.", quality: "noncompliant", feedback: "No study proves that. It is an unsupported, guaranteed-outcome claim." },
      ],
      principle: "Present results accurately. Statistical significance is not the same as clinical importance.",
    },
    {
      prompt: "Which part of a study tells you who the results apply to?",
      choices: [
        { text: "The study population.", quality: "best", feedback: "Correct. Results apply to the population studied." },
        { text: "The conclusion.", quality: "weak", feedback: "Conclusions summarise; the population defines applicability." },
        { text: "The title.", quality: "weak", feedback: "Titles rarely give enough detail." },
        { text: "The journal's reputation.", quality: "weak", feedback: "Reputation does not tell you who was studied." },
      ],
      principle: "Check the population before you apply any result.",
    },
  ],
  finalAssessment: { questions: 15, passMark: 80, attempts: 3 },
  certificate: "Course certificate",
  skills: ["science", "compliance"],
  covers: [14, 15],
};

/* ------------------------------------------------------------------ */
/* 12. Elmiron Product Knowledge Masterclass (§16)                     */
/*     No product facts here by design: every product-specific item is */
/*     pending medical review and must come from the current PI.       */
/* ------------------------------------------------------------------ */
const PENDING = "Approved content pending medical review — sourced from the current prescribing information.";

const elmironMasterclass: Course = {
  id: "elmiron-masterclass",
  title: "Elmiron Product Knowledge Masterclass",
  category: "product",
  level: "Certification",
  objective: "Master Elmiron product knowledge from approved sources, and communicate it accurately and within the approved indication, ready for product certification.",
  audience: "Medical representatives and managers promoting Elmiron, after completing the IC/BPS disease awareness course.",
  duration: "1 h",
  minutes: 60,
  modules: [
    {
      id: "elmiron-masterclass-m1",
      title: "Product identity",
      lessons: [
        {
          id: "elmiron-masterclass-m1-l1",
          title: "Molecule, brand and therapeutic class",
          kind: "video",
          minutes: 5,
          summary: "What you will learn: the molecule (generic) name, brand name, presentations and therapeutic class, exactly as stated in the current prescribing information. " + PENDING,
          points: [
            "Molecule: " + PENDING,
            "Brand name and presentations: " + PENDING,
            "Therapeutic class: " + PENDING,
            "Method: learn names and class exactly as written; never paraphrase.",
          ],
        },
        {
          id: "elmiron-masterclass-m1-l2",
          title: "Learning a product from approved sources",
          kind: "flow",
          minutes: 3,
          summary: "Product knowledge must come from approved sources in a controlled order, never from the internet, colleagues' notes or memory.",
          flow: [
            "Current prescribing information",
            "Company-approved training content",
            "Medical review sign-off",
            "Approved promotional material",
            "Compliant field conversation",
          ],
          points: [
            "The prescribing information is the reference for every product fact.",
            "Use only training content released after medical review.",
            "Check the version and date of every document you use.",
            "Discard superseded material as your company instructs.",
          ],
        },
      ],
    },
    {
      id: "elmiron-masterclass-m2",
      title: "Indication and mechanism",
      lessons: [
        {
          id: "elmiron-masterclass-m2-l1",
          title: "The approved indication",
          kind: "lesson",
          minutes: 5,
          summary: "The approved indication defines the only use you may promote. " + PENDING,
          points: [
            "Indication wording: " + PENDING,
            "Always quote the approved indication wording exactly.",
            "Never broaden, narrow or reinterpret the indication.",
            "Indications can differ by country; check the label for your market.",
            "Questions beyond the indication go to Medical Information.",
          ],
        },
        {
          id: "elmiron-masterclass-m2-l2",
          title: "Mechanism of action",
          kind: "lesson",
          minutes: 3,
          summary: "What you will learn: how to describe the mechanism of action using only approved wording. " + PENDING,
          points: [
            "Mechanism description: " + PENDING,
            "Describe the mechanism only as approved material words it.",
            "Avoid simplified explanations that imply unproven benefits.",
            "If asked for more detail, offer a Medical Information response.",
          ],
        },
      ],
    },
    {
      id: "elmiron-masterclass-m3",
      title: "Dosage, administration and safety",
      lessons: [
        {
          id: "elmiron-masterclass-m3-l1",
          title: "Dosage and administration",
          kind: "lesson",
          minutes: 3,
          summary: "What you will learn: the approved dose, administration instructions and any special directions. " + PENDING,
          points: [
            "Dose and administration: " + PENDING,
            "Quote dosing exactly as stated; never give individual dosing advice.",
            "Refer patient-specific dosing questions to Medical Information.",
          ],
        },
        {
          id: "elmiron-masterclass-m3-l2",
          title: "Warnings, adverse effects, contraindications and interactions",
          kind: "lesson",
          minutes: 5,
          summary: "What you will learn: the approved safety information, which must accompany any promotional discussion. " + PENDING,
          points: [
            "Warnings and precautions: " + PENDING,
            "Adverse effects: " + PENDING,
            "Contraindications and interactions: " + PENDING,
            "Always give balanced safety information alongside any benefit message.",
            "Report any adverse event you hear about through the company process.",
          ],
        },
      ],
    },
    {
      id: "elmiron-masterclass-m4",
      title: "Evidence and patient profile",
      lessons: [
        {
          id: "elmiron-masterclass-m4-l1",
          title: "Evidence and the appropriate patient profile",
          kind: "lesson",
          minutes: 5,
          summary: "What you will learn: which approved studies support the key messages, and which patients fall within the approved indication. Approved content pending medical review — sourced from the current prescribing information and approved reference publications.",
          points: [
            "Key evidence: approved content pending medical review.",
            "Appropriate patient profile: " + PENDING,
            "Present each study with population, comparator, endpoint and limitations.",
            "Never extrapolate results to patients the studies did not include.",
          ],
        },
      ],
    },
    {
      id: "elmiron-masterclass-m5",
      title: "FAQs, objections and approved messages",
      lessons: [
        {
          id: "elmiron-masterclass-m5-l1",
          title: "FAQs, objections and approved promotional messages",
          kind: "lesson",
          minutes: 5,
          summary: "What you will learn: the company's approved FAQ responses, objection responses and key promotional messages. Approved content pending medical and regulatory review.",
          points: [
            "FAQs: approved responses pending medical review, to be issued by Medical Affairs.",
            "Objection responses: approved wording pending medical review.",
            "Approved promotional messages: pending medical and regulatory review.",
            "Use the current approved version; never mix old and new materials.",
            "If a question is not covered, route it to Medical Information.",
          ],
        },
        {
          id: "elmiron-masterclass-m5-l2",
          title: "A question outside the approved indication",
          kind: "scenario",
          minutes: 3,
          summary: "Practise staying within the approved indication when a doctor asks about other uses.",
          question: {
            prompt: "Dr. L. Fernandes, a urologist in Goa, asks whether Elmiron can be used for a condition that is not in its approved indication. What do you do?",
            choices: [
              {
                text: "Explain that you can discuss only the approved indication, and offer to raise a Medical Information request for her question.",
                quality: "best",
                feedback: "Correct. You stay within the label and the doctor still gets a scientific response.",
              },
              {
                text: "Say that some doctors do use it that way.",
                quality: "noncompliant",
                feedback: "This is off-label promotion and an unsupported claim.",
              },
              {
                text: "Share a published case report you found.",
                quality: "noncompliant",
                feedback: "Sharing off-label material proactively is promotion outside the label.",
              },
              {
                text: "Say you are not sure and move on without offering help.",
                quality: "weak",
                feedback: "Compliant, but unhelpful. Offer the Medical Information route.",
              },
            ],
            principle: "Promote only the approved indication. Route every other question to Medical Information.",
          },
        },
        {
          id: "elmiron-masterclass-m5-l3",
          title: "Product knowledge recall drill",
          kind: "roleplay",
          minutes: 8,
          summary: "Practise recalling approved product information with an AI doctor who asks rapid, realistic questions. Answers will be checked against approved content once medical review is complete.",
          points: [
            "Answer only from approved content, word for word where required.",
            "Say 'I will confirm through Medical Information' when unsure.",
            "Include safety information whenever you discuss benefits.",
            "Keep every answer within the approved indication.",
          ],
          aiScenario: "product-recall",
        },
      ],
    },
  ],
  takeaways: [
    "Every product fact must come from the current prescribing information and approved material.",
    "Quote the approved indication exactly; never broaden or reinterpret it.",
    "Balance any benefit message with the approved safety information.",
    "Route questions outside approved content to Medical Information.",
  ],
  exercise: "Using the current prescribing information, build an index showing where each of the 16 checklist items is found (section and heading), from molecule to approved promotional messages. Do not paraphrase content; ask your manager to check it against the approved version.",
  knowledgeCheck: [
    {
      prompt: "How should you state Elmiron's indication to a doctor?",
      choices: [
        { text: "Quote the approved indication wording exactly as in the current prescribing information.", quality: "best", feedback: "Correct. Exact wording prevents unintended broadening." },
        { text: "Summarise it in your own words.", quality: "weak", feedback: "Paraphrasing can change the meaning of the indication." },
        { text: "Describe a broader use that some doctors find helpful.", quality: "noncompliant", feedback: "This is off-label promotion." },
        { text: "Use the wording from an older detail aid you kept.", quality: "weak", feedback: "Superseded material may no longer be accurate or approved." },
      ],
      principle: "Quote the approved indication exactly, from the current version.",
    },
    {
      prompt: "Where must Elmiron product facts come from?",
      choices: [
        { text: "The current prescribing information and company-approved material.", quality: "best", feedback: "Correct. These are the only approved sources." },
        { text: "Colleagues' notes.", quality: "weak", feedback: "Informal notes may be inaccurate or out of date." },
        { text: "Internet forums and patient blogs.", quality: "noncompliant", feedback: "Unverified sources must never be used for product information." },
        { text: "Your memory of last year's training.", quality: "weak", feedback: "Information changes. Always check the current approved version." },
      ],
      principle: "Approved sources only, in their current version.",
    },
    {
      prompt: "A doctor asks about a side effect that is not covered in your materials. What do you do?",
      choices: [
        { text: "Refer to the prescribing information, offer a Medical Information response, and report any patient event described.", quality: "best", feedback: "Correct. Accurate, helpful and compliant with safety reporting." },
        { text: "Say it has never been reported.", quality: "noncompliant", feedback: "An invented safety statement could harm patients." },
        { text: "Guess based on similar products.", quality: "weak", feedback: "Guessing is not acceptable for safety information." },
        { text: "Ignore the question.", quality: "weak", feedback: "Safety questions always deserve a proper response." },
      ],
      principle: "Never guess on safety. Use the prescribing information, Medical Information and the safety reporting process.",
    },
  ],
  finalAssessment: { questions: 20, passMark: 80, attempts: 3 },
  certificate: "Elmiron Product Certified",
  skills: ["product", "science", "compliance"],
  covers: [16],
};

/* ------------------------------------------------------------------ */
/* 13. IC/BPS — Disease Awareness (§17)                                */
/*     General, textbook-level and non-promotional. Clinical content   */
/*     is pending medical review before release.                       */
/* ------------------------------------------------------------------ */
const MED_REVIEW = "Clinical content pending medical review.";

const icBpsAwareness: Course = {
  id: "ic-bps-awareness",
  title: "Interstitial Cystitis / Bladder Pain Syndrome — Disease Awareness",
  category: "product",
  level: "Beginner",
  mandatory: true,
  objective: "Build a general, textbook-level understanding of interstitial cystitis / bladder pain syndrome (IC/BPS): how patients experience it, how it is diagnosed and how it is managed, so that conversations with doctors are informed and non-promotional.",
  audience: "Medical representatives and managers working in urology, gynaecology and related therapy areas.",
  duration: "45 min",
  minutes: 45,
  modules: [
    {
      id: "ic-bps-awareness-m1",
      title: "The bladder and the disease",
      lessons: [
        {
          id: "ic-bps-awareness-m1-l1",
          title: "Bladder anatomy and physiology",
          kind: "lesson",
          minutes: 5,
          summary: "The bladder stores urine and releases it under voluntary control. Understanding normal function helps you follow how IC/BPS affects patients. " + MED_REVIEW,
          points: [
            "The bladder is a hollow, muscular organ in the pelvis.",
            "Its wall contains the detrusor muscle, which contracts to empty it.",
            "A specialised lining, the urothelium, acts as a barrier to urine.",
            "Nerves signal fullness and coordinate storage and emptying.",
            "Normal filling is felt as a gradual, painless urge to pass urine.",
          ],
        },
        {
          id: "ic-bps-awareness-m1-l2",
          title: "What is IC/BPS?",
          kind: "video",
          minutes: 5,
          summary: "IC/BPS is a chronic condition of bladder-related pain, pressure or discomfort with urinary symptoms, diagnosed once other causes have been excluded. " + MED_REVIEW,
          points: [
            "A chronic pain condition perceived as arising from the bladder.",
            "Usually accompanied by urinary urgency or frequency.",
            "Diagnosed only after excluding infection and other identifiable causes.",
            "The cause is not fully understood; several mechanisms are proposed.",
            "It can seriously affect sleep, work, relationships and wellbeing.",
            "Reported more often in women, but men are affected too.",
          ],
        },
      ],
    },
    {
      id: "ic-bps-awareness-m2",
      title: "Symptoms and diagnosis",
      lessons: [
        {
          id: "ic-bps-awareness-m2-l1",
          title: "Recognising the symptoms",
          kind: "lesson",
          minutes: 3,
          summary: "Symptoms vary between patients and over time, often with flares. " + MED_REVIEW,
          points: [
            "Pain, pressure or discomfort that often worsens as the bladder fills.",
            "Urgency and frequent urination, including at night.",
            "Symptoms may ease temporarily after passing urine.",
            "Flares may follow triggers, which vary between patients.",
            "Symptoms can overlap with infection, overactive bladder and other conditions.",
          ],
        },
        {
          id: "ic-bps-awareness-m2-l2",
          title: "How IC/BPS is diagnosed",
          kind: "lesson",
          minutes: 5,
          summary: "IC/BPS is largely a diagnosis of exclusion, made by the treating doctor. " + MED_REVIEW,
          points: [
            "A detailed history and physical examination.",
            "Urine tests to exclude infection and other causes.",
            "Symptom questionnaires and voiding diaries may be used.",
            "Cystoscopy may be used in selected patients, at specialist discretion.",
            "Diagnosis and testing are always the doctor's decisions, never the MR's.",
          ],
        },
      ],
    },
    {
      id: "ic-bps-awareness-m3",
      title: "Treatment landscape and patient journey",
      lessons: [
        {
          id: "ic-bps-awareness-m3-l1",
          title: "The treatment landscape",
          kind: "lesson",
          minutes: 5,
          summary: "Management is individualised and often multimodal, guided by current clinical guidelines and the treating doctor. " + MED_REVIEW,
          points: [
            "Patient education, self-care and behavioural changes.",
            "Physical therapy approaches for suitable patients.",
            "Oral medicines and pain management.",
            "Intravesical therapies, delivered directly into the bladder.",
            "Procedures reserved for selected patients by specialists.",
            "Guidelines differ by country; follow current local guidance.",
          ],
        },
        {
          id: "ic-bps-awareness-m3-l2",
          title: "The patient journey",
          kind: "flow",
          minutes: 3,
          summary: "Patients often see several doctors before they are diagnosed. Knowing the journey helps you understand each doctor's role. " + MED_REVIEW,
          flow: [
            "First symptoms",
            "Primary care consultation",
            "Tests to exclude other causes",
            "Specialist referral",
            "Diagnosis",
            "Individualised management",
            "Ongoing review",
          ],
          points: [
            "Journeys can be long; symptoms are often first attributed to infection.",
            "GPs, gynaecologists and urologists may all be involved.",
            "Ongoing review adjusts management over time.",
          ],
        },
        {
          id: "ic-bps-awareness-m3-l3",
          title: "A doctor asks you for treatment advice",
          kind: "scenario",
          minutes: 3,
          summary: "Practise keeping disease conversations non-promotional and within your role.",
          question: {
            prompt: "Dr. B. Sen, a GP in Kolkata, describes a patient with bladder pain and asks: 'What would you give her?' What do you do?",
            choices: [
              {
                text: "Explain that treatment decisions are the doctor's, offer approved disease-awareness material, and offer a Medical Information response if she would find it useful.",
                quality: "best",
                feedback: "Correct. You respect clinical judgement and stay within your role.",
              },
              {
                text: "Recommend your company's product for the patient.",
                quality: "noncompliant",
                feedback: "MRs do not give treatment advice for individual patients. This is promotion, not information.",
              },
              {
                text: "Tell her what another doctor in the area usually prescribes.",
                quality: "weak",
                feedback: "Second-hand prescribing habits are not evidence, and sharing them is inappropriate.",
              },
              {
                text: "Say you cannot comment and leave.",
                quality: "weak",
                feedback: "You avoid advice, but you could have offered approved information or a medical route.",
              },
            ],
            principle: "Diagnosis and treatment are the doctor's decisions. MRs offer approved information and the medical route.",
          },
        },
      ],
    },
    {
      id: "ic-bps-awareness-m4",
      title: "Product role",
      lessons: [
        {
          id: "ic-bps-awareness-m4-l1",
          title: "Where a promoted product fits",
          kind: "lesson",
          minutes: 3,
          summary: "A promoted product fits only within its approved indication and the treatment context described in its prescribing information. Product-specific positioning is pending medical review.",
          points: [
            "Product position: approved content pending medical review, from the current prescribing information.",
            "Discuss products only within their approved indication.",
            "Place any product within the guideline-based treatment context, not above it.",
            "Keep disease-awareness conversations separate from promotional ones.",
            "Complete the product masterclass before promoting any product.",
          ],
        },
      ],
    },
  ],
  takeaways: [
    "IC/BPS is a chronic bladder pain condition, diagnosed after other causes are excluded.",
    "Symptoms vary, often flare, and can seriously affect quality of life.",
    "Management is individualised, multimodal and guided by current guidelines.",
    "Disease awareness is non-promotional; any product fits only within its approved indication.",
  ],
  exercise: "Draw the IC/BPS patient journey for your territory. Mark which doctors you visit at each stage and what non-promotional, approved information would help each of them.",
  knowledgeCheck: [
    {
      prompt: "How is IC/BPS usually diagnosed?",
      choices: [
        { text: "By excluding other causes, based on history, examination and tests chosen by the doctor.", quality: "best", feedback: "Correct. It is largely a diagnosis of exclusion." },
        { text: "With a single blood test.", quality: "weak", feedback: "No single blood test diagnoses IC/BPS." },
        { text: "By cystoscopy in every patient.", quality: "weak", feedback: "Cystoscopy may be used in selected patients, at specialist discretion." },
        { text: "Using a symptom checklist the MR hands to patients.", quality: "noncompliant", feedback: "MRs never take part in diagnosing patients." },
      ],
      principle: "Diagnosis belongs to the doctor, and IC/BPS is largely a diagnosis of exclusion.",
    },
    {
      prompt: "A doctor asks you which treatment to give a patient. What is the right approach?",
      choices: [
        { text: "Explain that treatment decisions are the doctor's, and offer approved, non-promotional information or a Medical Information response.", quality: "best", feedback: "Correct. You stay within your role and still help." },
        { text: "Recommend your company's product.", quality: "noncompliant", feedback: "Individual treatment advice is outside an MR's role." },
        { text: "Suggest what other doctors usually do.", quality: "weak", feedback: "Hearsay is not evidence." },
        { text: "Refuse to discuss the condition at all.", quality: "weak", feedback: "You can still share approved disease information." },
      ],
      principle: "MRs inform; doctors treat.",
    },
    {
      prompt: "How should disease-awareness content be used?",
      choices: [
        { text: "As general, non-promotional education, kept separate from product promotion.", quality: "best", feedback: "Correct. Disease awareness must not become disguised promotion." },
        { text: "To imply that your product solves every symptom described.", quality: "noncompliant", feedback: "This turns education into unsupported promotion." },
        { text: "Only when a doctor asks about your product.", quality: "weak", feedback: "Disease awareness has value in its own right." },
        { text: "To help pharmacists diagnose customers.", quality: "noncompliant", feedback: "Diagnosis is for the treating doctor." },
      ],
      principle: "Keep disease education general, accurate and separate from promotion.",
    },
  ],
  finalAssessment: { questions: 15, passMark: 80, attempts: 3 },
  certificate: "Course certificate",
  skills: ["disease", "science"],
  covers: [17],
};

/* ------------------------------------------------------------------ */
/* 14. Ethical Pharma Marketing and Claim Compliance (§33, §34)        */
/* ------------------------------------------------------------------ */
const ethicalMarketing: Course = {
  id: "ethical-marketing",
  title: "Ethical Pharma Marketing and Claim Compliance",
  category: "compliance",
  level: "Beginner",
  mandatory: true,
  recertification: "Every 12 months",
  objective: "Promote medicines ethically, and make sure every claim, interaction and sample complies with company policy, industry codes and the law.",
  audience: "All customer-facing staff: medical representatives, managers, and marketing and medical teams.",
  duration: "50 min",
  minutes: 50,
  versions: [
    { market: "IN", label: "India · UCPMP 2024", note: "The Uniform Code for Pharmaceutical Marketing Practices (UCPMP) 2024 applies. Follow it together with company SOPs and applicable Indian law." },
    { market: "UK", label: "UK · local code", note: "Follow the applicable UK industry code of practice and company SOPs." },
    { market: "ALL", label: "Global baseline", note: "Follow IFPMA-aligned company policy and applicable local law in every market." },
  ],
  modules: [
    {
      id: "ethical-marketing-m1",
      title: "Ethical promotion",
      lessons: [
        {
          id: "ethical-marketing-m1-l1",
          title: "What ethical promotion means",
          kind: "video",
          minutes: 5,
          summary: "Ethical promotion gives doctors accurate, balanced information to support appropriate treatment decisions. It never distorts those decisions.",
          points: [
            "Promotion informs prescribing; it must never distort it.",
            "Information must be accurate, balanced, up to date and verifiable.",
            "Interactions with doctors must be professional and transparent.",
            "Patient safety and trust outweigh any commercial target.",
          ],
        },
        {
          id: "ethical-marketing-m1-l2",
          title: "Company policy, codes and law",
          kind: "lesson",
          minutes: 3,
          summary: "Your conduct is governed by three layers: applicable law, industry codes and company policy. Where they differ, follow the strictest.",
          points: [
            "Law sets the minimum; breaches bring penalties for you and the company.",
            "Industry codes set agreed standards for promotion and interactions.",
            "Company policy and SOPs often go further than the code.",
            "When in doubt, ask Compliance before you act.",
          ],
        },
      ],
    },
    {
      id: "ethical-marketing-m2",
      title: "Claims compliance",
      lessons: [
        {
          id: "ethical-marketing-m2-l1",
          title: "Approved claims and accurate information",
          kind: "lesson",
          minutes: 5,
          summary: "Only approved, referenced claims may be used, exactly as approved and with balanced safety information.",
          points: [
            "Use only approved promotional material, in its current version.",
            "Every claim must be supported by referenced evidence.",
            "Present benefits together with relevant safety information.",
            "Never alter, annotate or create your own material.",
            "Scientific information must not mislead, including by omission.",
          ],
        },
        {
          id: "ethical-marketing-m2-l2",
          title: "Five things you must never claim",
          kind: "lesson",
          minutes: 3,
          summary: "These claims are never acceptable, however the conversation develops.",
          points: [
            "An unapproved indication or patient group.",
            "A guaranteed outcome.",
            "Superiority that approved evidence does not support.",
            "False or absolute safety claims, such as 'completely safe'.",
            "Comparisons that are unsupported, selective or unfair.",
          ],
        },
        {
          id: "ethical-marketing-m2-l3",
          title: "Checking a claim before you use it",
          kind: "flow",
          minutes: 3,
          summary: "Run every claim through five quick checks. If any answer is no, do not use it.",
          flow: [
            "Is it in current approved material?",
            "Is it within the approved indication?",
            "Is it supported by the referenced evidence?",
            "Is it balanced with safety information?",
            "Use it exactly as approved",
          ],
          points: [
            "One 'no' means the claim cannot be used.",
            "Unsure? Ask Medical Affairs or Compliance first.",
          ],
        },
      ],
    },
    {
      id: "ethical-marketing-m3",
      title: "Interactions, samples and boundaries",
      lessons: [
        {
          id: "ethical-marketing-m3-l1",
          title: "Appropriate interactions and avoiding inducements",
          kind: "lesson",
          minutes: 5,
          summary: "Every interaction with a healthcare professional needs a legitimate purpose, and nothing may be offered to influence prescribing.",
          points: [
            "No gifts, cash or personal benefits to healthcare professionals.",
            "Hospitality only where the code and policy permit, and never lavish.",
            "Nothing may be offered to induce prescribing, recommending or supplying.",
            "Sponsorships and payments must be documented, transparent and approved.",
            "Every interaction needs a legitimate scientific or educational purpose.",
          ],
        },
        {
          id: "ethical-marketing-m3-l2",
          title: "Samples and professional boundaries",
          kind: "lesson",
          minutes: 3,
          summary: "Samples help doctors become familiar with a product. They are never a reward, and professional boundaries apply at all times.",
          points: [
            "Samples go only to qualified prescribers, as the code and policy allow.",
            "Record every sample given; never sell or trade samples.",
            "Samples are for familiarisation, never a reward.",
            "Keep relationships professional; avoid personal favours and social pressure.",
          ],
        },
      ],
    },
    {
      id: "ethical-marketing-m4",
      title: "Scenarios and practice",
      lessons: [
        {
          id: "ethical-marketing-m4-l1",
          title: "A doctor asks for a sponsored trip",
          kind: "scenario",
          minutes: 3,
          summary: "Practise declining an inappropriate request while keeping the relationship professional.",
          question: {
            prompt: "Dr. J. Kapoor, a senior physician in Delhi, asks whether your company can sponsor a family holiday abroad, timed around a conference, 'as usual'. What do you do?",
            choices: [
              {
                text: "Politely decline, explain that company policy and the applicable code do not permit it, and inform your manager or Compliance as your SOP requires.",
                quality: "best",
                feedback: "Correct. Clear, courteous and compliant. Any legitimate engagement can only go through the company's approved process.",
              },
              {
                text: "Offer to book it through a travel agent so it is not linked to the company.",
                quality: "noncompliant",
                feedback: "Concealing a benefit makes the breach worse, not better.",
              },
              {
                text: "Offer to sponsor only his conference registration if his prescriptions increase.",
                quality: "noncompliant",
                feedback: "Linking any support to prescribing is an inducement.",
              },
              {
                text: "Say you will check, and hope he forgets.",
                quality: "weak",
                feedback: "Vague answers create expectations. Decline clearly and politely.",
              },
            ],
            principle: "Never offer personal travel or leisure. Decline clearly, follow policy and report as required.",
          },
        },
        {
          id: "ethical-marketing-m4-l2",
          title: "Handling an off-label request",
          kind: "roleplay",
          minutes: 8,
          summary: "Practise responding to an AI doctor who asks about use outside the approved indication.",
          points: [
            "Acknowledge the question without discussing off-label use.",
            "Explain that you can discuss only the approved indication.",
            "Offer a Medical Information response to the unsolicited request.",
            "Record the request as your company process requires.",
          ],
          aiScenario: "off-label",
        },
      ],
    },
  ],
  takeaways: [
    "Promotion must be accurate, balanced, approved and within the indication.",
    "Never claim unapproved uses, guaranteed outcomes, unsupported superiority, absolute safety or unfair comparisons.",
    "Nothing may be offered to influence prescribing; samples are never a reward.",
    "Follow the strictest of law, code and company policy, and ask Compliance when unsure.",
  ],
  exercise: "Take two pieces of promotional material you use and run each key claim through the five-question claim check. Note the reference and safety information that goes with each.",
  knowledgeCheck: [
    {
      prompt: "Which claim is acceptable?",
      choices: [
        { text: "A key message quoted exactly from current approved material, with its reference.", quality: "best", feedback: "Correct. Approved, referenced and unaltered." },
        { text: "'This medicine is completely safe.'", quality: "noncompliant", feedback: "An absolute safety claim is never acceptable." },
        { text: "'Every patient will improve.'", quality: "noncompliant", feedback: "A guaranteed outcome is never acceptable." },
        { text: "A reworded version of the approved message that sounds more persuasive.", quality: "noncompliant", feedback: "Rewording can change meaning and creates an unapproved claim." },
      ],
      principle: "Use approved claims exactly, with their references and safety information.",
    },
    {
      prompt: "Which interaction is appropriate?",
      choices: [
        { text: "A scientific discussion using approved material, within the approved indication.", quality: "best", feedback: "Correct. Legitimate purpose, approved content." },
        { text: "Giving a gift voucher after a good call.", quality: "noncompliant", feedback: "Gifts to healthcare professionals are not permitted." },
        { text: "Paying for the doctor's family dinner.", quality: "noncompliant", feedback: "Personal hospitality is an inducement." },
        { text: "Visiting several times a week with the same message.", quality: "weak", feedback: "Not a breach, but it wastes the doctor's time and adds no value." },
      ],
      principle: "Every interaction needs a legitimate purpose and nothing of personal value.",
    },
    {
      prompt: "Company policy is stricter than the industry code. What do you follow?",
      choices: [
        { text: "The stricter company policy.", quality: "best", feedback: "Correct. Always follow the strictest applicable standard." },
        { text: "The code only.", quality: "weak", feedback: "Company policy also binds you." },
        { text: "Whichever is more convenient at the time.", quality: "noncompliant", feedback: "Compliance is not optional or situational." },
        { text: "Whatever the doctor prefers.", quality: "weak", feedback: "The doctor's preference does not change the rules." },
      ],
      principle: "When standards differ, follow the strictest.",
    },
  ],
  finalAssessment: { questions: 20, passMark: 80, attempts: 3 },
  certificate: "Ethical Marketing certificate",
  skills: ["compliance"],
  covers: [33, 34],
};

/* ------------------------------------------------------------------ */
/* 15. Adverse Event Reporting for Field Staff (§35, §36)              */
/* ------------------------------------------------------------------ */
const aeReporting: Course = {
  id: "ae-reporting",
  title: "Adverse Event Reporting for Field Staff",
  category: "compliance",
  level: "Beginner",
  mandatory: true,
  objective: "Recognise adverse events, special safety situations and product complaints, and report them promptly through the company process without investigating them yourself.",
  audience: "All field staff and customer-facing employees.",
  duration: "55 min",
  minutes: 55,
  modules: [
    {
      id: "ae-reporting-m1",
      title: "Recognising safety information",
      lessons: [
        {
          id: "ae-reporting-m1-l1",
          title: "What may constitute an adverse event",
          kind: "video",
          minutes: 5,
          summary: "An adverse event is any unwanted medical occurrence in a patient given a medicine, whether or not it is thought to be caused by the medicine. If in doubt, report it.",
          points: [
            "Any unwanted medical occurrence after a medicine is used.",
            "Causality does not matter; report even if it seems unrelated.",
            "Information can come from doctors, pharmacists, patients or online.",
            "Report even if details are missing; the safety team follows up.",
          ],
        },
        {
          id: "ae-reporting-m1-l2",
          title: "Special safety situations",
          kind: "lesson",
          minutes: 3,
          summary: "Some situations must be reported even when no adverse event has occurred.",
          points: [
            "Exposure during pregnancy or breastfeeding.",
            "Overdose, misuse, abuse or medication error.",
            "Lack of expected effect.",
            "Use outside the approved indication.",
            "Occupational exposure.",
            "Check your company SOP for the full list.",
          ],
        },
        {
          id: "ae-reporting-m1-l3",
          title: "Product complaints",
          kind: "lesson",
          minutes: 3,
          summary: "A product complaint concerns the quality, packaging, labelling or appearance of a product, such as broken tablets, damaged packs or a suspected counterfeit.",
          points: [
            "Examples: damaged packs, discoloured tablets, missing leaflets, wrong labels.",
            "Suspected counterfeit or tampered products must be reported.",
            "A complaint may also involve an adverse event; report both.",
            "Keep the product sample if possible, as your SOP directs.",
          ],
        },
      ],
    },
    {
      id: "ae-reporting-m2",
      title: "Reporting correctly",
      lessons: [
        {
          id: "ae-reporting-m2-l1",
          title: "Where and when to report",
          kind: "lesson",
          minutes: 5,
          summary: "Report through the channel your company specifies, usually a pharmacovigilance email, portal or phone line, within the timeframe set by company process.",
          points: [
            "Know your company's pharmacovigilance contact details.",
            "Report within your SOP timeframe, typically 24 hours or one working day.",
            "The clock starts when you first become aware of the information.",
            "Record what you were told factually, without interpretation.",
            "Keep a copy or reference of every report you submit.",
          ],
        },
        {
          id: "ae-reporting-m2-l2",
          title: "Report, don't investigate",
          kind: "lesson",
          minutes: 3,
          summary: "MRs never investigate medical events themselves. Your role is to pass on accurate information quickly; the safety team handles follow-up.",
          points: [
            "Do not assess causality or seriousness yourself.",
            "Collect only the details your SOP asks for.",
            "Do not give medical advice about the patient's management.",
            "Do not promise outcomes, refunds or replacements.",
            "Tell the reporter the safety team may contact them.",
          ],
        },
        {
          id: "ae-reporting-m2-l3",
          title: "Handling a product complaint",
          kind: "flow",
          minutes: 3,
          summary: "Every product complaint follows the same five steps.",
          flow: [
            "Listen",
            "Record required information",
            "Do not make unsupported commitments",
            "Escalate through approved process",
            "Follow company procedure",
          ],
          points: [
            "Required information usually includes product, batch number and expiry.",
            "Never promise refunds or replacements you are not authorised to give.",
            "Never discard the product in question.",
          ],
        },
      ],
    },
    {
      id: "ae-reporting-m3",
      title: "Practice",
      lessons: [
        {
          id: "ae-reporting-m3-l1",
          title: "An unexpected reaction mentioned in passing",
          kind: "scenario",
          minutes: 3,
          summary: "Practise recognising and reporting safety information that comes up casually.",
          question: {
            prompt: "At the end of a call, Dr. U. Patil mentions that a patient developed an unexpected rash after starting one of your company's products. She says it is probably nothing. What do you do?",
            choices: [
              {
                text: "Thank her, note the details she is willing to share, explain that the safety team may contact her, and report it through the company process within the required timeframe.",
                quality: "best",
                feedback: "Correct. Prompt, factual reporting without investigating.",
              },
              {
                text: "Agree it is probably nothing and do not report it.",
                quality: "noncompliant",
                feedback: "Causality does not decide reportability. This must be reported.",
              },
              {
                text: "Ask detailed medical questions to decide whether the product caused it.",
                quality: "weak",
                feedback: "Investigation is the safety team's job, not yours.",
              },
              {
                text: "Mention it at next month's team meeting.",
                quality: "noncompliant",
                feedback: "Far too late, and a meeting is not a reporting channel.",
              },
            ],
            principle: "Report every adverse event promptly, whatever its suspected cause. Report; don't investigate.",
          },
        },
        {
          id: "ae-reporting-m3-l2",
          title: "A doctor reports an adverse event",
          kind: "roleplay",
          minutes: 8,
          summary: "Practise receiving adverse event information from an AI doctor and explaining the next steps.",
          points: [
            "Listen and thank the doctor for the information.",
            "Note the basic details your SOP requires.",
            "Do not assess causality or give medical advice.",
            "Explain that the safety team may follow up.",
          ],
          aiScenario: "adverse-event",
        },
        {
          id: "ae-reporting-m3-l3",
          title: "A pharmacist raises a product complaint",
          kind: "roleplay",
          minutes: 8,
          summary: "Practise handling a product complaint from an AI pharmacist, using the five-step process.",
          points: [
            "Listen fully before responding.",
            "Record product, batch number, expiry and description.",
            "Make no unsupported commitments.",
            "Escalate through the approved complaint process.",
          ],
          aiScenario: "product-complaint",
        },
      ],
    },
  ],
  takeaways: [
    "Report any adverse event, whatever its suspected cause, and special safety situations too.",
    "Report within the company SOP timeframe, typically within one working day.",
    "Never investigate, assess causality or give medical advice yourself.",
    "Handle complaints with the five steps: listen, record, no commitments, escalate, follow procedure.",
  ],
  exercise: "Find your company's pharmacovigilance and product complaint contact details and save them on your phone. Then write down, in your own words, the reporting timeframe from your SOP.",
  knowledgeCheck: [
    {
      prompt: "Which of these should be reported as an adverse event?",
      choices: [
        { text: "Any unwanted medical occurrence after using a company product, even if the cause is uncertain.", quality: "best", feedback: "Correct. Causality is not required for reporting." },
        { text: "Only events the doctor confirms were caused by the product.", quality: "weak", feedback: "Confirmation of cause is not needed." },
        { text: "Only serious events needing hospital admission.", quality: "weak", feedback: "Non-serious events must be reported too." },
        { text: "Only events that will not affect sales.", quality: "noncompliant", feedback: "Filtering safety reports for commercial reasons is a serious breach." },
      ],
      principle: "If in doubt, report. Causality and seriousness are for the safety team to assess.",
    },
    {
      prompt: "When should you report safety information?",
      choices: [
        { text: "Within the timeframe in your company SOP, typically within one working day of becoming aware.", quality: "best", feedback: "Correct. The clock starts when you first hear about it." },
        { text: "At the end of the month.", quality: "weak", feedback: "Too late for regulatory timelines." },
        { text: "Only if the doctor asks you to.", quality: "noncompliant", feedback: "Reporting is your obligation, whether or not the doctor asks." },
        { text: "Once you have gathered all the details yourself.", quality: "weak", feedback: "Report straight away; the safety team gathers the details." },
      ],
      principle: "Report promptly, within your SOP timeframe, from the moment you become aware.",
    },
    {
      prompt: "A pharmacist shows you a damaged pack of a company product. What do you do?",
      choices: [
        { text: "Listen, record the required details, make no unsupported commitments and escalate through the approved complaint process.", quality: "best", feedback: "Correct. This follows the five-step complaint process." },
        { text: "Promise a full refund and replacement straight away.", quality: "weak", feedback: "You cannot make commitments the process has not approved." },
        { text: "Take the pack and throw it away.", quality: "noncompliant", feedback: "Discarding the product destroys evidence the quality team needs." },
        { text: "Tell the pharmacist to contact the distributor instead.", quality: "weak", feedback: "You are now aware of it, so you must escalate it yourself." },
      ],
      principle: "Record facts and escalate. Never promise outcomes or discard evidence.",
    },
  ],
  finalAssessment: { questions: 15, passMark: 80, attempts: 3 },
  certificate: "Pharmacovigilance awareness certificate",
  skills: ["compliance"],
  covers: [35, 36],
};

/* ------------------------------------------------------------------ */
/* 16. UCPMP 2024 — Ethical Promotion (§33, India)                     */
/*     General guidance only. Exact provisions: check the current      */
/*     code text and company SOP.                                      */
/* ------------------------------------------------------------------ */
const ucpmp2024: Course = {
  id: "ucpmp-2024",
  title: "UCPMP 2024 — Ethical Promotion",
  category: "compliance",
  level: "Intermediate",
  mandatory: true,
  markets: ["IN"],
  objective: "Apply the Uniform Code for Pharmaceutical Marketing Practices (UCPMP) 2024 in everyday field work in India.",
  audience: "Field staff, managers and marketing teams working in India.",
  duration: "40 min",
  minutes: 40,
  modules: [
    {
      id: "ucpmp-2024-m1",
      title: "The code in daily field work",
      lessons: [
        {
          id: "ucpmp-2024-m1-l1",
          title: "What UCPMP 2024 covers",
          kind: "video",
          minutes: 5,
          summary: "UCPMP 2024, issued by the Department of Pharmaceuticals, sets standards for how companies promote medicines and interact with healthcare professionals in India. Always check the current code text and your company SOP.",
          points: [
            "Applies to pharmaceutical companies and those acting for them.",
            "Covers claims, materials, gifts, samples, hospitality, CME and sponsorship.",
            "Addresses benefits to healthcare professionals and their family members.",
            "Complaints are handled through the mechanism the code sets out.",
            "Company SOPs may be stricter; always follow the stricter rule.",
            "Check the current code text for exact provisions and updates.",
          ],
        },
        {
          id: "ucpmp-2024-m1-l2",
          title: "Claims and promotional material",
          kind: "lesson",
          minutes: 5,
          summary: "Promotion must be accurate, balanced and verifiable, and consistent with the product's approval.",
          points: [
            "Claims must be consistent with approved product information.",
            "Information must be balanced, up to date and capable of substantiation.",
            "Avoid absolute or unqualified claims such as 'safe' or 'no side effects'.",
            "Words like 'new' have conditions; check the code before using them.",
            "Comparisons must be factual, fair and capable of substantiation.",
            "Never disparage competitors or their products.",
          ],
        },
      ],
    },
    {
      id: "ucpmp-2024-m2",
      title: "Gifts, hospitality, samples, sponsorship and CME",
      lessons: [
        {
          id: "ucpmp-2024-m2-l1",
          title: "Gifts and hospitality",
          kind: "lesson",
          minutes: 5,
          summary: "Gifts and personal benefits to healthcare professionals and their family members are not permitted. Travel and hospitality are tightly restricted; check the current code text and your company SOP.",
          points: [
            "No gifts or personal benefits to HCPs or their family members.",
            "No cash or monetary grants for personal benefit.",
            "Travel and hospitality only in the narrow cases the code permits.",
            "Any permitted informational or educational items must follow code limits.",
            "Unsure? Check the current code text and company SOP first.",
          ],
        },
        {
          id: "ucpmp-2024-m2-l2",
          title: "Samples",
          kind: "lesson",
          minutes: 3,
          summary: "Samples are for familiarisation and are closely controlled. Check the current code text and your company SOP for exact limits.",
          points: [
            "Samples only to HCPs qualified to prescribe the product.",
            "Samples must be clearly marked as free samples, not for sale.",
            "Follow code and SOP limits on quantity, pack size and value.",
            "Keep accurate records of every sample distributed.",
            "Never use samples as a reward or inducement.",
          ],
        },
        {
          id: "ucpmp-2024-m2-l3",
          title: "Sponsorship and CME",
          kind: "lesson",
          minutes: 5,
          summary: "Continuing medical education (CME) and sponsorship must serve a genuine educational purpose and be transparent. Check the current code text and your company SOP.",
          points: [
            "CME needs a genuine educational purpose and transparent, verifiable guidelines.",
            "Sponsorship details must be disclosed as the code requires.",
            "The code restricts events in foreign locations; check the current text.",
            "Speaker arrangements and payments must be documented and approved.",
            "Your role: follow the approved process; never promise sponsorship.",
          ],
        },
      ],
    },
    {
      id: "ucpmp-2024-m3",
      title: "Applying the code",
      lessons: [
        {
          id: "ucpmp-2024-m3-l1",
          title: "Before any interaction with a healthcare professional",
          kind: "flow",
          minutes: 3,
          summary: "Five quick checks before any interaction that involves something of value, an event or a claim.",
          flow: [
            "Is there a legitimate purpose?",
            "Does the code permit it?",
            "Does company SOP permit it?",
            "Is it documented and approved?",
            "Proceed and record",
          ],
          points: [
            "Any 'no' means stop and ask Compliance.",
            "Documentation protects you, the doctor and the company.",
          ],
        },
        {
          id: "ucpmp-2024-m3-l2",
          title: "The conference invitation",
          kind: "scenario",
          minutes: 3,
          summary: "Practise applying the code to a common request.",
          question: {
            prompt: "Dr. M. Qureshi, a cardiologist in Hyderabad, asks you to cover his travel and hotel for an international conference he plans to attend as a delegate. What do you do?",
            choices: [
              {
                text: "Explain that the code and company policy do not allow you to arrange this, and that any legitimate engagement can only go through the company's approved process.",
                quality: "best",
                feedback: "Correct. Clear, accurate and professional.",
              },
              {
                text: "Arrange it through a stockist so the company is not named.",
                quality: "noncompliant",
                feedback: "Using a third party to hide a benefit is still a breach, and a more serious one.",
              },
              {
                text: "Offer to cover only the hotel.",
                quality: "noncompliant",
                feedback: "A partial benefit is still a benefit the code restricts.",
              },
              {
                text: "Say you will ask, then avoid him afterwards.",
                quality: "weak",
                feedback: "Avoidance creates expectations and damages trust. Answer clearly.",
              },
            ],
            principle: "Travel and hospitality for HCPs are tightly restricted. Decline clearly and use only approved processes.",
          },
        },
      ],
    },
  ],
  takeaways: [
    "UCPMP 2024 governs promotion and HCP interactions in India; company SOPs may be stricter.",
    "No gifts or personal benefits to HCPs or their family members.",
    "Samples, CME and sponsorship follow strict, documented processes.",
    "When unsure, check the current code text and your SOP, and ask Compliance.",
  ],
  exercise: "List every type of interaction you had with healthcare professionals last month, and run each through the five checks. Flag anything you are unsure about for Compliance.",
  knowledgeCheck: [
    {
      prompt: "Under UCPMP 2024, may you give a personal gift to a doctor's family member?",
      choices: [
        { text: "No. Gifts and personal benefits to HCPs and their family members are not permitted.", quality: "best", feedback: "Correct." },
        { text: "Yes, if it is below a certain value.", quality: "noncompliant", feedback: "Personal gifts are not permitted, whatever their value." },
        { text: "Yes, if it is given at a festival.", quality: "noncompliant", feedback: "Festivals do not create an exception." },
        { text: "Yes, if the doctor does not know about it.", quality: "noncompliant", feedback: "Concealment makes a breach worse." },
      ],
      principle: "No gifts or personal benefits to healthcare professionals or their families.",
    },
    {
      prompt: "Who may receive product samples?",
      choices: [
        { text: "Healthcare professionals qualified to prescribe the product, with records kept.", quality: "best", feedback: "Correct." },
        { text: "Pharmacists, to sell at a discount.", quality: "noncompliant", feedback: "Samples must never be sold." },
        { text: "Any patient who asks.", quality: "weak", feedback: "Samples go to qualified prescribers, not directly to patients." },
        { text: "Doctors, as a thank-you for prescribing.", quality: "noncompliant", feedback: "Samples used as a reward are an inducement." },
      ],
      principle: "Samples go to qualified prescribers, are recorded and are never a reward.",
    },
    {
      prompt: "You are unsure whether an activity is permitted under the code. What do you do?",
      choices: [
        { text: "Check the current code text and company SOP, and ask Compliance before acting.", quality: "best", feedback: "Correct. Ask before you act." },
        { text: "Go ahead and ask later.", quality: "weak", feedback: "Once done, a breach cannot be undone." },
        { text: "Do what colleagues usually do.", quality: "weak", feedback: "Custom is not compliance." },
        { text: "Assume it is fine if competitors do it.", quality: "noncompliant", feedback: "Other companies' conduct does not change your obligations." },
      ],
      principle: "When in doubt, check the code and SOP and ask Compliance first.",
    },
  ],
  finalAssessment: { questions: 15, passMark: 80, attempts: 3 },
  certificate: "UCPMP 2024 certificate",
  skills: ["compliance"],
  covers: [33],
};

/* ------------------------------------------------------------------ */
/* Exports                                                             */
/* ------------------------------------------------------------------ */
export const COURSES_A: Course[] = [
  pharmaIndustry,
  indiaMarket,
  globalMarket,
  doctorEngagement,
  productDetailing,
  positioning,
  doctorRelationships,
  newDoctor,
  callPlanning,
  objectionHandling,
  scientificCommunication,
  elmironMasterclass,
  icBpsAwareness,
  ethicalMarketing,
  aeReporting,
  ucpmp2024,
];

/* Role-play and case-based practice (brief §39, §41). Feedback on every
   choice follows: strong aspects / weak aspects / what a better response does. */
export const CASES_A: Case[] = [
  {
    id: "case-busy-doctor",
    title: "Sixty seconds with a busy doctor",
    kind: "roleplay",
    skill: "engagement",
    courseId: "product-detailing",
    situation: "Dr. A. Mehta, a urologist in Pune, has a full waiting room. As you walk in he says: 'You have one minute.'",
    question: {
      prompt: "You have 60 seconds with a busy doctor. How do you introduce the product?",
      choices: [
        {
          text: "Thank him, state your purpose in one line, ask briefly about a relevant patient type, share one approved key message with its safety context, and agree a next step.",
          quality: "best",
          feedback: "Strong: respects his time, starts from patient relevance and stays within approved content. Weak: very little, provided the message is quoted exactly. Better: this is the model answer; finish by confirming when you will follow up.",
        },
        {
          text: "Speed-read the detail aid from start to finish.",
          quality: "weak",
          feedback: "Strong: you covered the material. Weak: nothing lands when rushed, and there is no relevance or dialogue. Better: choose one relevant approved message and ask one question.",
        },
        {
          text: "Offer to return at a better time and leave an approved leave-behind.",
          quality: "ok",
          feedback: "Strong: respectful and professional. Weak: misses the short, useful exchange he offered. Better: use the minute well, then offer a follow-up.",
        },
        {
          text: "Say: 'It's the best option for your patients. Just try it.'",
          quality: "noncompliant",
          feedback: "Strong: it is brief. Weak: an unsupported superiority claim plus pressure to prescribe. Better: share an approved, referenced message and let the doctor decide.",
        },
      ],
      principle: "Less time calls for sharper relevance, not more words or bigger claims.",
    },
  },
  {
    id: "case-competitor-preference",
    title: "I already prescribe another product",
    kind: "roleplay",
    skill: "sales",
    courseId: "objection-handling",
    situation: "Dr. S. Rao, a gynaecologist in Hyderabad, listens briefly and says: 'I already prescribe another product. Why should I consider yours?'",
    question: {
      prompt: "How do you respond to 'I already prescribe another product. Why should I consider yours?'",
      choices: [
        {
          text: "Acknowledge her experience, ask what she values in her current choice and which patients are harder to manage, then share approved information on where your product may fit.",
          quality: "best",
          feedback: "Strong: respectful, curious and evidence-led. Weak: none, provided you stay within approved material. Better: confirm whether what you shared meets her need and agree a next step.",
        },
        {
          text: "Tell her the other product has quality problems you have heard about.",
          quality: "noncompliant",
          feedback: "Strong: none. Weak: unverified disparagement damages trust and breaches industry codes. Better: compare only with approved, supportable information.",
        },
        {
          text: "Say 'ours is better' and repeat your key message.",
          quality: "weak",
          feedback: "Strong: confident. Weak: an unsupported comparison, and it ignores her experience. Better: clarify what she values before responding.",
        },
        {
          text: "Accept her preference and leave approved material for her to read.",
          quality: "ok",
          feedback: "Strong: respectful and compliant. Weak: you did not explore whether any of her patients might benefit. Better: ask one clarifying question before leaving.",
        },
      ],
      principle: "Respect existing choices, explore needs, and differentiate only with approved evidence.",
    },
  },
  {
    id: "case-off-label",
    title: "An off-label question",
    kind: "case",
    skill: "compliance",
    courseId: "ethical-marketing",
    situation: "Dr. L. Fernandes, a urologist in Goa, asks whether your product can be used for a patient group not included in its approved indication. She mentions a paper she has read.",
    question: {
      prompt: "How do you respond to her question?",
      choices: [
        {
          text: "Explain that you can discuss only the approved indication, and offer to submit her unsolicited question to Medical Information for a scientific response.",
          quality: "best",
          feedback: "Strong: compliant, and her need is still met through the right channel. Weak: none. Better: record the request as your process requires and confirm when she will hear back.",
        },
        {
          text: "Say the paper looks promising and that other doctors use it that way.",
          quality: "noncompliant",
          feedback: "Strong: none. Weak: off-label promotion and an unsupported claim. Better: stay within the label and refer to Medical Information.",
        },
        {
          text: "Offer to send her more papers that support that use.",
          quality: "noncompliant",
          feedback: "Strong: responsive. Weak: proactively distributing off-label material is promotion. Better: only Medical Information may respond to unsolicited off-label requests.",
        },
        {
          text: "Say 'I can't talk about that' and end the discussion.",
          quality: "weak",
          feedback: "Strong: avoids off-label promotion. Weak: leaves her question unanswered. Better: offer the Medical Information route.",
        },
      ],
      principle: "Never promote off-label. Unsolicited off-label questions go to Medical Information.",
    },
  },
  {
    id: "case-unexpected-reaction",
    title: "A patient's unexpected reaction",
    kind: "case",
    skill: "compliance",
    courseId: "ae-reporting",
    situation: "While discussing another topic, Dr. U. Patil, a physician in Kolhapur, mentions that a patient felt dizzy after starting one of your company's products. She adds that it is probably unrelated.",
    question: {
      prompt: "What do you do with this information?",
      choices: [
        {
          text: "Thank her, note the facts she shares, explain that the safety team may follow up, and report it through the company process within the SOP timeframe.",
          quality: "best",
          feedback: "Strong: prompt, factual and within your role. Weak: none. Better: keep a record of your report reference.",
        },
        {
          text: "Agree it is unrelated and do not report it.",
          quality: "noncompliant",
          feedback: "Strong: none. Weak: suspected causality does not decide reportability; this is a missed report. Better: report every adverse event you hear about.",
        },
        {
          text: "Ask detailed medical questions to work out whether the product caused it.",
          quality: "weak",
          feedback: "Strong: shows concern. Weak: investigation is the safety team's job, not yours. Better: collect only what your SOP requires and report.",
        },
        {
          text: "Mention it at next month's team meeting.",
          quality: "noncompliant",
          feedback: "Strong: none. Weak: far too late, and a meeting is not a reporting channel. Better: report within the SOP timeframe, typically one working day.",
        },
      ],
      principle: "Report all adverse events promptly, whatever the suspected cause. Report; don't investigate.",
    },
  },
  {
    id: "case-unknown-answer",
    title: "A question you can't answer",
    kind: "roleplay",
    skill: "science",
    courseId: "scientific-communication",
    situation: "Dr. H. Pillai, a geriatrician in Thiruvananthapuram, asks whether your product needs a dose adjustment for a patient with reduced kidney function. It is not in your training materials.",
    question: {
      prompt: "How do you respond?",
      choices: [
        {
          text: "Say you do not want to give an inaccurate answer, point her to the prescribing information, and offer a Medical Information request with a clear follow-up date.",
          quality: "best",
          feedback: "Strong: honest, safe and helpful. Weak: none. Better: confirm with the medical team and follow up exactly when promised.",
        },
        {
          text: "Say no adjustment should be needed, based on what you remember.",
          quality: "noncompliant",
          feedback: "Strong: none. Weak: an invented dosing answer could harm a patient. Better: never guess; confirm through Medical Information.",
        },
        {
          text: "Suggest she checks online.",
          quality: "weak",
          feedback: "Strong: none. Weak: unreliable, and it shifts your responsibility onto her. Better: use the company's medical channel.",
        },
        {
          text: "Promise to ask your manager and get back to her.",
          quality: "ok",
          feedback: "Strong: honest about not knowing. Weak: your manager is not the medical channel. Better: raise a Medical Information request and confirm when she will hear back.",
        },
      ],
      principle: "Never invent an answer. Confirm with the medical team and follow up.",
    },
  },
  {
    id: "case-price-concern",
    title: "Price concern",
    kind: "roleplay",
    skill: "sales",
    courseId: "objection-handling",
    situation: "Dr. R. Kulkarni, a consulting physician in Nagpur, says: 'Most of my patients pay out of pocket. Your product is too expensive for them.'",
    question: {
      prompt: "How do you respond to the price concern?",
      choices: [
        {
          text: "Acknowledge the concern, clarify which patients and compared with what, share factual pricing and pack information, and discuss value only as approved material supports.",
          quality: "best",
          feedback: "Strong: treats price as a genuine patient concern and stays factual. Weak: none. Better: confirm whether this addresses her concern.",
        },
        {
          text: "Offer bulk free samples so her patients do not have to buy it.",
          quality: "noncompliant",
          feedback: "Strong: none. Weak: samples are not a pricing tool and must not be used as an inducement. Better: give factual pricing context.",
        },
        {
          text: "Say price should not matter if the product works.",
          quality: "weak",
          feedback: "Strong: none. Weak: dismissive of a real patient burden. Better: clarify and respond with facts.",
        },
        {
          text: "Promise a special discount through a local chemist if she prescribes more.",
          quality: "noncompliant",
          feedback: "Strong: none. Weak: links a commercial benefit to prescribing, which is an inducement. Better: share only approved pricing information.",
        },
      ],
      principle: "Treat price as a patient concern: clarify, give facts, and never offer inducements.",
    },
  },
  {
    id: "case-evidence-request",
    title: "Show me the evidence",
    kind: "roleplay",
    skill: "science",
    courseId: "scientific-communication",
    situation: "Dr. N. Shah, a urologist in Ahmedabad, points at your leaflet and says: 'This makes a claim. Show me the study behind it.'",
    question: {
      prompt: "What is the best response to a request for evidence?",
      choices: [
        {
          text: "Show the referenced study from the approved material, explaining the population, comparator, endpoint and limitations accurately, and offer the full publication through the approved route.",
          quality: "best",
          feedback: "Strong: welcomes scrutiny and presents the evidence honestly. Weak: none. Better: ask whether the study answers her question.",
        },
        {
          text: "Say the claim is approved, so it must be true.",
          quality: "weak",
          feedback: "Strong: none. Weak: approval is not an explanation, and it sounds defensive. Better: walk through the study.",
        },
        {
          text: "Summarise the study more positively than the authors did.",
          quality: "noncompliant",
          feedback: "Strong: none. Weak: exaggerating results is misleading. Better: quote results and limitations accurately.",
        },
        {
          text: "Promise to send the reference later.",
          quality: "ok",
          feedback: "Strong: responsive. Weak: misses the chance to discuss the evidence now. Better: show the approved study summary during the call.",
        },
      ],
      principle: "Welcome requests for evidence, and present studies accurately, including their limitations.",
    },
  },
  {
    id: "case-not-interested",
    title: "The doctor who isn't interested",
    kind: "roleplay",
    skill: "engagement",
    courseId: "doctor-relationships",
    situation: "Dr. G. Reddy, a general practitioner in Vijayawada, says: 'I'm not interested. I don't see patients who need this.'",
    question: {
      prompt: "How do you respond?",
      choices: [
        {
          text: "Thank him, ask briefly whether he sees or refers patients with relevant symptoms, and if not, respect his view and adjust your call plan.",
          quality: "best",
          feedback: "Strong: checks relevance once and respects his judgement. Weak: none. Better: record the outcome accurately and review relevance later.",
        },
        {
          text: "Keep visiting weekly with the same message until he changes his mind.",
          quality: "weak",
          feedback: "Strong: persistent. Weak: ignores his stated view and wastes both your time. Better: respect his judgement and plan accordingly.",
        },
        {
          text: "Offer sponsorship for a clinic event to win his interest.",
          quality: "noncompliant",
          feedback: "Strong: none. Weak: an offer of value to gain interest is an inducement. Better: engage only on scientific relevance.",
        },
        {
          text: "Leave politely and remove him from your list without asking anything.",
          quality: "ok",
          feedback: "Strong: respectful. Weak: you did not check whether he refers relevant patients. Better: ask one relevance question first.",
        },
      ],
      principle: "Respect a doctor's judgement. Check relevance once, then plan your time accordingly.",
    },
  },
  {
    id: "case-product-complaint",
    title: "Discoloured tablets at the pharmacy",
    kind: "case",
    skill: "compliance",
    courseId: "ae-reporting",
    situation: "A pharmacist in Jaipur shows you a strip of tablets from one of your company's products that looks discoloured, and says customers have been asking about it.",
    question: {
      prompt: "What do you do?",
      choices: [
        {
          text: "Listen, record the required details (product, batch number, expiry and description), make no unsupported commitments, and escalate through the approved complaint process.",
          quality: "best",
          feedback: "Strong: follows the five-step complaint process. Weak: none. Better: also ask whether any patient experienced a problem, and if so report it as an adverse event too.",
        },
        {
          text: "Take the strips and discard them to avoid further complaints.",
          quality: "noncompliant",
          feedback: "Strong: none. Weak: destroys evidence the quality team needs. Better: keep the sample as your SOP directs and escalate.",
        },
        {
          text: "Promise an immediate replacement and refund.",
          quality: "weak",
          feedback: "Strong: customer-focused. Weak: a commitment you are not authorised to make. Better: escalate and let the process decide.",
        },
        {
          text: "Tell the pharmacist to contact the distributor instead.",
          quality: "weak",
          feedback: "Strong: none. Weak: you are now aware of the complaint and must escalate it. Better: record it and report it yourself.",
        },
      ],
      principle: "Handle complaints by recording facts and escalating, never by promising outcomes or discarding evidence.",
    },
  },
  {
    id: "case-export-exclusivity",
    title: "Exclusivity on the first meeting",
    kind: "case",
    skill: "global",
    courseId: "global-market",
    situation: "An importer in Nairobi asks for exclusive rights across East Africa at a price below your approved floor, and wants an answer today.",
    question: {
      prompt: "How do you handle the request?",
      choices: [
        {
          text: "Thank them, qualify their registrations, channels and volumes, explain that exclusivity and pricing need internal approval, and agree a date to return with a formal proposal.",
          quality: "best",
          feedback: "Strong: protects the company and keeps the opportunity open. Weak: none. Better: confirm the follow-up in writing the same day.",
        },
        {
          text: "Agree today to secure the deal.",
          quality: "weak",
          feedback: "Strong: decisive. Weak: commits to terms you are not authorised to give, without qualifying the buyer. Better: qualify first and seek approval.",
        },
        {
          text: "Decline outright and end the meeting.",
          quality: "weak",
          feedback: "Strong: protects pricing. Weak: may lose a capable partner. Better: explore their capabilities before responding.",
        },
        {
          text: "Offer a personal commission to their procurement manager to secure the order.",
          quality: "noncompliant",
          feedback: "Strong: none. Weak: this is bribery and breaches anti-bribery law and company policy. Better: keep every commercial term transparent and approved.",
        },
      ],
      principle: "Qualify before you commit. Commercial terms need internal approval and must be free of improper payments.",
    },
  },
];
