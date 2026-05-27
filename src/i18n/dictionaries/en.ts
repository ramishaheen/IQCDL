const en = {
  meta: {
    title: "IQCDL — International Quantum Computing Driving License",
    description:
      "The global certification that takes individuals and organizations from quantum-curious to quantum-ready. AI-guided readiness, immersive training, and a clear path to the post-quantum era.",
  },
  common: {
    getStarted: "Get Started",
    learnMore: "Learn more",
    startAssessment: "Start free assessment",
    bookDemo: "Book a demo",
    enroll: "Enroll now",
    login: "Log in",
    logout: "Log out",
    dashboard: "Dashboard",
    minutes: "minutes",
    days: "days",
    questions: "questions",
    passScore: "Pass score",
    duration: "Duration",
    backHome: "Back to home",
    soon: "Coming soon",
    new: "New",
  },
  nav: {
    program: "Program",
    assessment: "Readiness",
    roadmap: "Roadmap",
    training: "Training",
    standards: "Standards",
    pricing: "Pricing",
    portal: "Portal",
  },
  hero: {
    badge: "Aligned with NIST · ISO/IEC · IEEE · EU PQC Roadmap",
    titleLine1: "Your license to lead",
    titleLine2: "the quantum era",
    subtitle:
      "IQCDL is the international, AI-supported certification that turns quantum uncertainty into a measurable plan. Assess your readiness, train your people, and migrate to post-quantum security with confidence.",
    ctaPrimary: "Measure my quantum readiness",
    ctaSecondary: "Explore the program",
    trustedBy: "Trusted by security leaders, educators and innovators worldwide",
  },
  stats: {
    marketValue: "Quantum market by 2040",
    marketValueUnit: "$106B",
    jobsAccessible: "of quantum jobs need a bachelor's or less",
    jobsAccessibleUnit: "55%",
    levels: "Progressive certification levels",
    levelsUnit: "2",
    standards: "International standards aligned",
    standardsUnit: "8+",
  },
  tracks: {
    eyebrow: "Two progressive levels",
    title: "A clear path — from quantum literacy to hands-on mastery",
    subtitle:
      "Start with Foundation to build organization-wide fluency, then advance to Practitioner for hands-on quantum programming and post-quantum migration.",
    foundation: {
      name: "Foundation Level",
      tagline: "Quantum for Everyone",
      duration: "3 days",
      exam: "150 MCQs · 180 min · 70% to pass",
      forWho: "CISOs, IT leaders, business decision-makers & compliance officers",
      points: [
        "Quantum fundamentals: qubits, superposition & entanglement",
        "The quantum threat to today's cryptography (Shor & Grover)",
        "Mosca's Theorem & organizational risk assessment",
        "Post-quantum cryptography & migration strategy",
        "No-code quantum tools (IBM Quantum Composer, Azure Quantum)",
      ],
    },
    practitioner: {
      name: "Practitioner Level",
      tagline: "Build & migrate, hands-on",
      duration: "5 days",
      exam: "150 MCQs · 240 min · 75% to pass",
      forWho: "Developers, cryptography specialists, security architects & DevOps",
      points: [
        "Quantum programming with Qiskit & quantum circuits",
        "Shor's & Grover's algorithms, error correction, VQAs",
        "Implementing CRYSTALS-Kyber, Dilithium & SPHINCS+",
        "Hybrid classical-PQC systems & crypto-agile TLS",
        "Cryptographic inventory (CBOM) & migration roadmaps",
      ],
    },
    prereq: "Prerequisite: Foundation Level + basic Python",
  },
  features: {
    eyebrow: "Why IQCDL",
    title: "More than a certificate — an operating system for going quantum-ready",
    items: [
      {
        title: "AI-guided readiness",
        body: "Our Quantum Guide assistant interviews your context and produces a tailored readiness score, risk profile and next steps — in any language.",
      },
      {
        title: "Built on real standards",
        body: "Curriculum mapped to NIST FIPS 203/204/205, ISO/IEC 4879, IEEE P7131/P7132 and the EU PQC Roadmap (2026–2035).",
      },
      {
        title: "Immersive, hands-on training",
        body: "Interactive labs, no-code simulators and real-world case studies across telecom, banking, healthcare and government.",
      },
      {
        title: "Transformation roadmap",
        body: "Turn assessment results into a phased Assess → Plan → Implement migration plan your whole organization can follow.",
      },
      {
        title: "Globally recognized",
        body: "A bilingual, internationally aligned credential that signals quantum-security expertise to employers and regulators.",
      },
      {
        title: "Role-based portal",
        body: "Dedicated workspaces for admins, chapter owners, centers, trainers and students — manage cohorts, exams and certificates.",
      },
    ],
  },
  assessment: {
    eyebrow: "Free · 3 minutes · AI-supported",
    title: "How quantum-ready are you?",
    subtitle:
      "Answer a few questions and our engine applies Mosca's Theorem and PQC best practice to score your exposure and recommend a path.",
    start: "Begin assessment",
    restart: "Retake",
    next: "Next",
    back: "Back",
    seeResults: "See my results",
    questionOf: "Question {current} of {total}",
    resultTitle: "Your quantum readiness",
    resultScore: "Readiness score",
    talkToGuide: "Discuss this with the Quantum Guide",
    recommendedTrack: "Recommended track",
    breakdownTitle: "Readiness by dimension",
    nextStepsTitle: "Your top next steps",
    moscaNote:
      "Mosca's Theorem: if (data shelf-life + migration time) exceeds the time until cryptographically-relevant quantum computers, you are already exposed.",
    levels: {
      critical: "Critical exposure",
      developing: "Developing",
      advancing: "Advancing",
      ready: "Quantum-ready",
    },
    dimensions: {
      exposure: "Data exposure",
      visibility: "Crypto visibility",
      agility: "Crypto-agility",
      adoption: "PQC adoption",
      people: "People & skills",
      governance: "Governance",
    },
    tips: {
      exposure:
        "Identify long-shelf-life data and treat it as 'harvest-now, decrypt-later' at risk today.",
      visibility:
        "Build a cryptographic inventory (CBOM) — you can't migrate what you can't see.",
      agility:
        "Abstract cryptography behind interfaces so algorithms can be swapped without re-architecting.",
      adoption:
        "Start piloting NIST PQC (Kyber/Dilithium), ideally as hybrid TLS, on a low-risk service.",
      people:
        "Certify leaders at Foundation level and build broad quantum literacy across teams.",
      governance:
        "Stand up a PQC migration plan with budget, owners and alignment to NIS2 / regulatory timelines.",
    },
    questions: [
      {
        q: "How long must your most sensitive data stay confidential?",
        help: "Mosca's Theorem: if (shelf-life + migration time) > time-to-quantum, you are already exposed.",
        options: ["1–2 years", "3–5 years", "6–10 years", "More than 10 years"],
      },
      {
        q: "Do you have an inventory of where cryptography is used (a CBOM)?",
        help: "You cannot migrate what you cannot see.",
        options: ["No inventory", "Partial / informal", "Documented for key systems", "Complete & maintained"],
      },
      {
        q: "How crypto-agile are your systems today?",
        help: "Crypto-agility = swapping algorithms without re-architecting.",
        options: ["Hard-coded everywhere", "Some abstraction", "Mostly modular", "Fully crypto-agile"],
      },
      {
        q: "Has your team begun testing post-quantum algorithms (Kyber, Dilithium)?",
        help: "NIST standardized ML-KEM, ML-DSA and SLH-DSA in FIPS 203/204/205.",
        options: ["Not aware", "Exploring", "Piloting", "In production / hybrid TLS"],
      },
      {
        q: "How quantum-literate is your leadership and workforce?",
        help: "Migration is an organizational change, not just a technical one.",
        options: ["No awareness", "A few champions", "Broad awareness", "Trained & certified"],
      },
      {
        q: "Do you have a funded PQC migration plan with clear owners?",
        help: "Migration is a multi-year program — it needs budget and accountability.",
        options: ["No plan", "Informal intent", "Drafted plan", "Funded & owned roadmap"],
      },
      {
        q: "Can your long-lived systems (firmware, certificates, devices) be updated in the field?",
        help: "Un-updatable long-lived systems are the hardest and riskiest to migrate.",
        options: ["Not updatable", "Manual / hard", "Mostly updatable", "Fully remote-updatable"],
      },
      {
        q: "How well do you understand your PQC regulatory obligations (e.g. NIS2)?",
        help: "Regulators are setting PQC timelines; compliance readiness reduces risk and cost.",
        options: ["Unaware", "Some awareness", "Assessed obligations", "Actively compliant"],
      },
    ],
  },
  roadmap: {
    eyebrow: "The transformation",
    title: "From quantum-curious to AI-enabled quantum advantage",
    subtitle:
      "A phased journey aligned to the EU PQC Roadmap. Each milestone pairs capability-building with measurable risk reduction.",
    phases: [
      {
        year: "Now → 2026",
        title: "Awareness & assessment",
        body: "Establish quantum literacy, run readiness assessments, and build your first cryptographic inventory. Certify leaders at Foundation Level.",
        tag: "Assess",
      },
      {
        year: "2026 → 2030",
        title: "Plan & protect the crown jewels",
        body: "Prioritize high-risk, long-shelf-life data. Pilot PQC and hybrid TLS on critical infrastructure. Certify practitioners and stand up crypto-agile architecture.",
        tag: "Plan",
      },
      {
        year: "2030 → 2035",
        title: "Implement at scale",
        body: "Broad PQC adoption across all systems. Continuous monitoring, crypto-agility by default, and AI-enabled quantum workflows for optimization and discovery.",
        tag: "Implement",
      },
      {
        year: "Beyond",
        title: "AI-enabled quantum advantage",
        body: "Operationalize quantum + AI together — quantum-assisted machine learning, optimization and simulation — on a fully quantum-safe foundation.",
        tag: "Advantage",
      },
    ],
  },
  standards: {
    eyebrow: "Built on international standards",
    title: "Credibility you can audit",
    subtitle:
      "IQCDL is mapped to the frameworks that regulators, auditors and enterprises already trust.",
    groups: [
      {
        name: "NIST Post-Quantum Cryptography",
        items: ["FIPS 203 — ML-KEM (CRYSTALS-Kyber)", "FIPS 204 — ML-DSA (CRYSTALS-Dilithium)", "FIPS 205 — SLH-DSA (SPHINCS+)"],
      },
      {
        name: "ISO/IEC",
        items: ["ISO/IEC 4879 — Quantum computing vocabulary", "ISO/IEC TR 29144 — Quantum-safe cryptography"],
      },
      {
        name: "IEEE",
        items: ["IEEE P7131 — Quantum algorithm design", "IEEE P7132 — Quantum algorithm implementation"],
      },
      {
        name: "European Union",
        items: ["EU PQC Roadmap (2026–2035)", "NIS2 Directive compliance"],
      },
    ],
  },
  pricing: {
    eyebrow: "Certification & training",
    title: "Choose your path to quantum-readiness",
    subtitle: "Transparent pricing for individuals and organizations. Volume and academic discounts available.",
    perSeat: "per seat",
    mostPopular: "Most popular",
    plans: [
      {
        name: "Foundation",
        price: "$390",
        period: "incl. exam",
        features: ["3-day Foundation curriculum", "Bilingual interactive materials", "150-question practice bank", "Online proctored exam", "3-year digital certificate"],
        cta: "Enroll in Foundation",
      },
      {
        name: "Practitioner",
        price: "$890",
        period: "incl. exam",
        features: ["Everything in Foundation", "5-day hands-on labs (Qiskit + PQC)", "Real-world case studies", "Scenario-based exam", "Crypto-agility playbook"],
        cta: "Enroll in Practitioner",
      },
      {
        name: "Organization",
        price: "Custom",
        period: "for teams & centers",
        features: ["Cohort & center management", "Readiness assessment at scale", "Trainer enablement & co-branding", "Migration roadmap workshop", "Dedicated success manager"],
        cta: "Talk to us",
      },
    ],
  },
  cta: {
    title: "The post-quantum era starts with one step",
    subtitle: "Take the free readiness assessment and get an AI-tailored plan in two minutes.",
    primary: "Start free assessment",
    secondary: "Talk to the Quantum Guide",
  },
  footer: {
    tagline: "The international standard for quantum-readiness.",
    product: "Product",
    company: "Company",
    resources: "Resources",
    legal: "Legal",
    rights: "© 2025 IQCDL. All rights reserved.",
    disclaimer:
      "For educational purposes. IQCDL provides knowledge of quantum computing and post-quantum cryptography but does not guarantee employment or specific outcomes.",
    links: {
      program: "Program overview",
      foundation: "Foundation level",
      practitioner: "Practitioner level",
      assessment: "Readiness assessment",
      roadmap: "Transformation roadmap",
      standards: "Standards & accreditation",
      verify: "Verify a certificate",
      about: "About",
      contact: "Contact",
      portal: "Portal login",
      privacy: "Privacy policy",
      terms: "Terms of use",
    },
  },
  assistant: {
    title: "Quantum Guide",
    subtitle: "Your AI quantum-readiness assistant",
    placeholder: "Ask about readiness, PQC, training…",
    send: "Send",
    open: "Ask the Quantum Guide",
    greeting:
      "Hi! I'm the Quantum Guide. I can help you understand quantum risk, plan your PQC migration, or pick the right IQCDL track. What would you like to explore?",
    suggestions: [
      "Am I at risk from quantum computers?",
      "What is Mosca's Theorem?",
      "Foundation or Practitioner — which is right for me?",
      "How do I start a PQC migration?",
    ],
    poweredLive: "Powered by Claude",
    poweredLocal: "Built-in guide",
    thinking: "Thinking…",
    error: "Something went wrong. Please try again.",
  },
  auth: {
    title: "Welcome back",
    subtitle: "Sign in to the IQCDL portal",
    email: "Email",
    password: "Password",
    role: "Sign in as",
    signIn: "Sign in",
    signingIn: "Signing in…",
    demoHint: "Demo portal — pick a role to preview its workspace.",
    useDemo: "Use demo account",
    invalid: "Invalid credentials. Try a demo account below.",
    roles: {
      admin: "Administrator",
      chapter: "Chapter Owner",
      center: "Training Center",
      trainer: "Trainer",
      student: "Student",
    },
    roleDesc: {
      admin: "Full platform oversight, standards & accreditation",
      chapter: "Regional/country chapter & center network",
      center: "Manage cohorts, schedules & exams",
      trainer: "Deliver courses & track learner progress",
      student: "Learn, practice & earn your certificate",
    },
  },
  dashboard: {
    welcome: "Welcome",
    signedInAs: "Signed in as",
    overview: "Overview",
    quickActions: "Quick actions",
    admin: {
      title: "Platform administration",
      metrics: ["Active learners", "Certified to date", "Training centers", "Chapters"],
      panels: ["Accreditation & standards", "Center approvals", "Exam integrity", "Global analytics"],
    },
    chapter: {
      title: "Chapter management",
      metrics: ["Centers in chapter", "Enrolled this quarter", "Pass rate", "Revenue (YTD)"],
      panels: ["Center network", "Regional campaigns", "Trainer accreditation", "Reporting"],
    },
    center: {
      title: "Center operations",
      metrics: ["Active cohorts", "Upcoming exams", "Trainers", "Seats sold"],
      panels: ["Schedule a cohort", "Register students", "Order exam vouchers", "Certificates"],
    },
    trainer: {
      title: "My classes",
      metrics: ["My cohorts", "Learners", "Avg. progress", "Avg. mock score"],
      panels: ["Course materials", "Learner progress", "Assignments & labs", "Office hours"],
    },
    student: {
      title: "My learning",
      metrics: ["Course progress", "Mock exam best", "Readiness score", "Days to exam"],
      panels: ["Continue learning", "Practice exam", "Readiness assessment", "My certificate"],
      progressLabel: "Foundation Level progress",
    },
  },
  exam: {
    title: "Foundation mock exam",
    subtitle:
      "A timed, multiple-choice practice exam aligned to the IQCDL Foundation curriculum. Pass to unlock your certificate.",
    start: "Start exam",
    instructions:
      "You'll have a time limit to answer all questions. You can move back and forth before submitting.",
    timeLeft: "Time left",
    questionLabel: "Question",
    of: "of",
    next: "Next",
    prev: "Previous",
    submit: "Submit exam",
    answered: "answered",
    passed: "Congratulations — you passed!",
    failed: "Not quite — keep studying",
    yourScore: "Your score",
    passMark: "Pass mark",
    passBody:
      "You've met the Foundation pass mark. Your certificate is now available in the portal.",
    failBody:
      "You're close. Review the curriculum and the Quantum Guide's tips, then retake the exam.",
    retake: "Retake exam",
    viewCertificate: "View my certificate",
    backToDashboard: "Back to dashboard",
    correct: "correct",
  },
  certificate: {
    title: "Certificate of Achievement",
    presentedTo: "This certifies that",
    completed: "has successfully completed the requirements for the",
    program: "International Quantum Computing Driving License",
    issued: "Issued",
    expires: "Valid until",
    credentialId: "Credential ID",
    verify: "Verify at iqcdl.org/verify",
    download: "Download / Print",
    backToDashboard: "Back to dashboard",
    lockedTitle: "Your certificate is locked",
    lockedBody:
      "Pass the Foundation mock exam to unlock and download your certificate.",
    goToExam: "Go to the exam",
    signatory: "Director, IQCDL Certification Board",
  },
};

export default en;
export type Dictionary = typeof en;
