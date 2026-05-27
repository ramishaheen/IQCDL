export interface ExamQuestion {
  q: string;
  options: string[];
  /** index into options of the correct answer */
  answer: number;
}

export const EXAM_PASS_MARK = 70;
export const EXAM_TIME_SECONDS = 360; // 6 minutes for the mock

// Foundation-level practice questions. Content is English (demo mock exam);
// the surrounding UI is fully localized.
export const EXAM_QUESTIONS: ExamQuestion[] = [
  {
    q: "What makes a qubit fundamentally different from a classical bit?",
    options: [
      "It can be in a superposition of 0 and 1 at once",
      "It is always exactly 0 or 1",
      "It runs faster but is otherwise identical",
      "It stores eight values like a byte",
    ],
    answer: 0,
  },
  {
    q: "Which quantum algorithm threatens RSA and elliptic-curve cryptography?",
    options: ["Grover's algorithm", "Shor's algorithm", "Dijkstra's algorithm", "RSA-2048"],
    answer: 1,
  },
  {
    q: "How does Grover's algorithm primarily affect symmetric cryptography?",
    options: [
      "It breaks AES completely",
      "It has no effect on symmetric keys",
      "It roughly halves the effective key strength",
      "It speeds up key generation",
    ],
    answer: 2,
  },
  {
    q: "“Harvest now, decrypt later” describes an attacker who…",
    options: [
      "Decrypts data instantly today",
      "Captures encrypted data now to decrypt once quantum computers mature",
      "Only targets symmetric keys",
      "Steals plaintext from databases",
    ],
    answer: 1,
  },
  {
    q: "Which NIST standard specifies ML-KEM (CRYSTALS-Kyber)?",
    options: ["FIPS 197", "FIPS 203", "FIPS 140-3", "FIPS 186"],
    answer: 1,
  },
  {
    q: "According to Mosca's Theorem, you are already at risk when…",
    options: [
      "You use any encryption at all",
      "Data shelf-life + migration time exceeds the time until quantum computers",
      "You have not bought a quantum computer",
      "Your keys are longer than 2048 bits",
    ],
    answer: 1,
  },
  {
    q: "What does “crypto-agility” mean?",
    options: [
      "Encrypting data very quickly",
      "Using multiple passwords",
      "The ability to swap cryptographic algorithms without re-architecting systems",
      "Rotating staff between security teams",
    ],
    answer: 2,
  },
  {
    q: "A CBOM (Cryptographic Bill of Materials) is…",
    options: [
      "A budget for cryptography tools",
      "An inventory of where and how cryptography is used",
      "A type of post-quantum algorithm",
      "A compliance certificate",
    ],
    answer: 1,
  },
  {
    q: "CRYSTALS-Dilithium (ML-DSA, FIPS 204) is used primarily for…",
    options: ["Key encapsulation", "Digital signatures", "Hashing", "Random number generation"],
    answer: 1,
  },
  {
    q: "What is typically the first phase of a PQC migration?",
    options: [
      "Implement PQC everywhere immediately",
      "Assess — build a cryptographic inventory and risk profile",
      "Delete all legacy systems",
      "Wait for quantum computers to arrive",
    ],
    answer: 1,
  },
];
