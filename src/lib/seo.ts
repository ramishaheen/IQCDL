import type { Metadata } from "next";

export const SITE = {
  url: "https://iqcdl.org",
  name: "IQCDL",
  longName: "International Quantum Computing Driving License",
  twitter: "@iqcdl",
};

// AEO: concise, factual Q&A surfaced to answer engines and rich results.
export const FAQ: { q: string; a: string }[] = [
  {
    q: "What is the IQCDL?",
    a: "The International Quantum Computing Driving License (IQCDL) is a vendor-neutral international certification that takes individuals and organizations from quantum-curious to quantum-ready — with an AI-powered readiness assessment, immersive training and a standards-aligned, verifiable credential.",
  },
  {
    q: "Why does quantum computing threaten today's encryption?",
    a: "A cryptographically-relevant quantum computer running Shor's algorithm can break RSA and elliptic-curve cryptography — the backbone of HTTPS, VPNs, signatures and banking. Adversaries are already harvesting encrypted data now to decrypt it later, so long-lived secrets are effectively exposed today.",
  },
  {
    q: "What are the NIST post-quantum cryptography standards?",
    a: "NIST has finalized the first post-quantum standards: FIPS 203 (ML-KEM) for key encapsulation, FIPS 204 (ML-DSA) for digital signatures, and FIPS 205 (SLH-DSA) for hash-based signatures. Organizations should start a crypto inventory and pilot hybrid TLS.",
  },
  {
    q: "What is Mosca's Theorem?",
    a: "Mosca's Theorem states that if the time your data must stay secret plus the time needed to migrate to post-quantum cryptography is greater than the time until a quantum computer can break today's encryption, then you are already exposed and must act now.",
  },
  {
    q: "What training and certification levels does IQCDL offer?",
    a: "IQCDL offers three tracks: Quantum Computing for Everyone (free, zero-code), the Foundation level for leaders and decision-makers, and the Practitioner level for developers and security architects — each leading to a verifiable certificate.",
  },
  {
    q: "How much does IQCDL membership cost?",
    a: "IQCDL Community membership is $19 per year (auto-renewing). Verified members get the member community, AI quantum-expert agents, the Quantum Guide chat, a free online course and a 10% course discount.",
  },
  {
    q: "What is the International Quantum Computing Index (IQCI)?",
    a: "The IQCI is an AI-generated, vendor-neutral index that scores every country's quantum readiness across eight categories — research, talent, investment, infrastructure, policy, PQC security, environmental sustainability and ethics — and is refreshed every quarter.",
  },
  {
    q: "What is the Global Quantum Award (GQA)?",
    a: "The GQA is a biennial award for SMEs and government entities, assessed by a neutral AI jury against a published rubric. Entry to the international categories is $1,000 and all award proceeds advance the UN Sustainable Development Goals.",
  },
];

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE.longName,
    alternateName: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/icon.svg`,
    description:
      "The international standard for quantum-readiness: AI-powered assessment, immersive training, post-quantum cryptography and a verifiable, vendor-neutral credential.",
    foundingDate: "2025",
    email: "admin@iqcdl.org",
    sameAs: [] as string[],
    knowsAbout: [
      "Quantum computing",
      "Post-quantum cryptography",
      "NIST FIPS 203/204/205",
      "Quantum readiness",
      "Cryptographic agility",
    ],
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: ["en", "ar", "fr", "es", "de", "zh"],
    publisher: { "@type": "Organization", name: SITE.longName },
  };
}

export function faqLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

// Per-page metadata helper: keeps title/description/canonical/OG consistent.
export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${SITE.url}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${opts.title} · IQCDL`,
      description: opts.description,
      url,
      type: "website",
      siteName: "IQCDL",
    },
    twitter: {
      card: "summary_large_image",
      title: `${opts.title} · IQCDL`,
      description: opts.description,
    },
  };
}
