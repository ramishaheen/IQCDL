export const ASSISTANT_SYSTEM_PROMPT = `You are the "Quantum Guide", the AI assistant for IQCDL — the International Quantum Computing Driving License.

Your job is to help individuals and organizations understand quantum risk and become quantum-ready. Be warm, concise (2–4 short paragraphs max), and practical. Use plain language; explain jargon briefly.

Key facts you know:
- IQCDL has two levels: Foundation (3 days, 150 MCQ, 70% pass, for leaders/decision-makers) and Practitioner (5 days, 150 MCQ, 75% pass, hands-on, for developers/security architects). Practitioner requires Foundation + basic Python.
- The quantum threat: Shor's algorithm breaks RSA/ECC; Grover's weakens symmetric crypto. "Harvest now, decrypt later" means data stolen today can be decrypted once quantum computers mature.
- Mosca's Theorem: if (data shelf-life + migration time) > time-until-cryptographically-relevant-quantum-computers, you are ALREADY at risk and must act now.
- Post-Quantum Cryptography (PQC) standards: NIST FIPS 203 (ML-KEM / CRYSTALS-Kyber), FIPS 204 (ML-DSA / CRYSTALS-Dilithium), FIPS 205 (SLH-DSA / SPHINCS+).
- Migration is a 3-phase journey: Assess (build a cryptographic inventory / CBOM) → Plan (prioritize crown jewels, pilot hybrid TLS) → Implement (broad PQC adoption, crypto-agility). Aligned to the EU PQC Roadmap 2026–2035.
- IQCDL aligns with NIST, ISO/IEC 4879, IEEE P7131/P7132, and the EU PQC Roadmap & NIS2.

When relevant, gently point users to: the free Readiness Assessment, the Foundation or Practitioner track, or the Transformation Roadmap. Never invent prices or guarantees. If asked something outside quantum/PQC/IQCDL, answer briefly and steer back.

Respond in the same language the user writes in.`;

interface KbEntry {
  patterns: RegExp[];
  answer: string;
}

const KB: KbEntry[] = [
  {
    patterns: [/mosca/i],
    answer:
      "Mosca's Theorem is the simplest way to know if you're already at risk. Add two numbers: how long your data must stay secret (its shelf-life) plus how long it will take you to migrate to quantum-safe cryptography. If that total is greater than the time until powerful quantum computers arrive, then data you protect today could be exposed later — so you need to start now.\n\nThe free Readiness Assessment applies exactly this logic to give you a score and a recommended path.",
  },
  {
    patterns: [/risk|at risk|threat|danger|harvest|decrypt later|exposed/i],
    answer:
      "Most organizations are more exposed than they think, because of \"harvest now, decrypt later\": attackers can capture your encrypted data today and decrypt it once quantum computers are powerful enough. Anything with a long confidentiality shelf-life — health records, financial data, state secrets, IP — is at risk first.\n\nThe quantum threat comes from Shor's algorithm (which breaks RSA and elliptic-curve encryption) and Grover's algorithm (which weakens symmetric keys). The fix is post-quantum cryptography (PQC). Try the 2-minute Readiness Assessment to gauge your exposure.",
  },
  {
    patterns: [/foundation|practitioner|which level|which track|right for me|beginner|start with/i],
    answer:
      "It depends on your role:\n\n• Foundation Level (3 days) is for leaders, CISOs, IT managers, compliance and anyone who needs to understand quantum risk and lead a response. No coding required.\n\n• Practitioner Level (5 days) is hands-on for developers, cryptography specialists and security architects — Qiskit programming, implementing Kyber/Dilithium/SPHINCS+, and building crypto-agile systems. It expects Foundation knowledge plus basic Python.\n\nIf you're driving strategy, start with Foundation. If you'll be implementing, you'll want both.",
  },
  {
    patterns: [/pqc|post.?quantum|kyber|dilithium|sphincs|migrat|crypto.?agil/i],
    answer:
      "A PQC migration follows three phases:\n\n1. Assess — build a cryptographic inventory (a CBOM): find every place you use encryption, and how long that data must stay secret.\n2. Plan — prioritize your \"crown jewels\" (long-lived, high-value data), and pilot post-quantum algorithms like CRYSTALS-Kyber (FIPS 203) and Dilithium (FIPS 204), often as hybrid TLS.\n3. Implement — roll out broadly and make systems crypto-agile so you can swap algorithms without re-architecting.\n\nThe Transformation Roadmap on this site maps these to the EU PQC timeline (2026–2035).",
  },
  {
    patterns: [/qubit|superposition|entangle|what is quantum|how does quantum/i],
    answer:
      "A classical bit is either 0 or 1. A qubit can be in a superposition of both at once, and qubits can be entangled so their states are linked. That lets a quantum computer explore many possibilities in parallel, which is why certain problems — like factoring the large numbers behind RSA encryption — become tractable.\n\nThe Foundation Level covers all of this with no-code simulators, so you can build intuition without heavy math.",
  },
  {
    patterns: [/price|cost|how much|fee|pricing|pay/i],
    answer:
      "IQCDL offers Foundation and Practitioner tracks for individuals, plus custom Organization plans for teams and training centers (with cohort management and a migration-roadmap workshop). You can see the current options on the Pricing section — and academic and volume discounts are available. I won't quote exact figures here so you always get the latest pricing.",
  },
  {
    patterns: [/standard|nist|iso|ieee|fips|accredit|recogni/i],
    answer:
      "IQCDL is built on the frameworks regulators already trust: the NIST PQC standards (FIPS 203 ML-KEM, FIPS 204 ML-DSA, FIPS 205 SLH-DSA), ISO/IEC 4879 (quantum vocabulary), IEEE P7131/P7132 (quantum algorithm design & implementation), and the EU PQC Roadmap with NIS2. That alignment is what makes the credential meaningful to employers and auditors.",
  },
  {
    patterns: [/assess|readiness|score|evaluate|where do i start|begin/i],
    answer:
      "Great place to start: the free Readiness Assessment. It asks five quick questions — about your data's shelf-life, whether you have a cryptographic inventory, how crypto-agile your systems are, and your team's quantum literacy — then applies Mosca's Theorem to give you a readiness score and a recommended track. It takes about two minutes.",
  },
];

const FALLBACK =
  "I'm the Quantum Guide — I can help with quantum risk, post-quantum cryptography, planning a migration, or choosing between the Foundation and Practitioner tracks. A good first step is the free 2-minute Readiness Assessment, which scores your exposure and recommends a path. What would you like to dig into?";

/** Offline, rule-based answer used when no ANTHROPIC_API_KEY is configured. */
export function localAnswer(message: string): string {
  for (const entry of KB) {
    if (entry.patterns.some((p) => p.test(message))) {
      return entry.answer;
    }
  }
  return FALLBACK;
}
