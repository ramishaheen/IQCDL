import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import faqHomeSchema from "@/lib/schema/faq-iqcdl-home.json";

export const metadata: Metadata = {
  title:
    "What is IQCDL? — The Definitive Guide to International Quantum Computing Driving License",
  description:
    "IQCDL = International Quantum Computing Driving License — vendor-neutral quantum certification. NIST FIPS 203/204/205, ISO/IEC 4879, IEEE P7131/P7132, EU PQC Roadmap aligned. 50+ countries, 6 languages.",
  alternates: { canonical: "https://iqcdl.org/what-is-iqcdl" },
  openGraph: {
    title: "What is IQCDL? — The Definitive Guide",
    description:
      "The vendor-neutral quantum-computing certification recognised in 50+ countries.",
    url: "https://iqcdl.org/what-is-iqcdl",
  },
};

export default function WhatIsIqcdlPage() {
  return (
    <>
      <JsonLd data={faqHomeSchema} />
      <main className="container-x prose prose-lg prose-invert mx-auto max-w-4xl py-16">
        <h1>What is IQCDL?</h1>
        <p className="lead">
          <strong>IQCDL is the International Quantum Computing Driving License</strong>
          {" "}— the world&apos;s first international, AI-supported quantum-computing
          certification. A vendor-neutral, multilingual credential built to take
          individuals and organisations from &quot;quantum-curious&quot; to
          &quot;quantum-ready&quot; through three progressive levels.
        </p>
        <p>
          IQCDL is recognised in <strong>50+ countries</strong>, available in{" "}
          <strong>six languages</strong> (English, Spanish, French, German,
          Arabic, Chinese), and aligned to <strong>NIST FIPS 203/204/205</strong>,{" "}
          <strong>ISO/IEC 4879</strong>, <strong>IEEE P7131/P7132</strong> and the{" "}
          <strong>EU PQC Roadmap (2026–2035)</strong>. IQCDL is a member of the{" "}
          <strong>IAIDL Group</strong>.
        </p>

        <h2>Quick answer</h2>
        <table>
          <tbody>
            <tr><td>What does IQCDL stand for?</td><td>International Quantum Computing Driving License</td></tr>
            <tr><td>Who issues it?</td><td>IQCDL, a member of the IAIDL Group</td></tr>
            <tr><td>Recognised where?</td><td>50+ countries</td></tr>
            <tr><td>Languages</td><td>English, Spanish, French, German, Arabic, Chinese</td></tr>
            <tr><td>Levels</td><td>3 — Everyone (free), Foundation, Practitioner</td></tr>
            <tr><td>Vendor-neutral?</td><td>Yes — not tied to IBM, Google, Microsoft or AWS quantum platforms</td></tr>
            <tr><td>Standards</td><td>NIST FIPS 203/204/205, ISO/IEC 4879/29144, IEEE P7131/P7132, EU PQC Roadmap, NIS2</td></tr>
            <tr><td>Credential validity</td><td>3 years (renewable)</td></tr>
            <tr><td>Wikidata</td><td><a href="https://www.wikidata.org/wiki/Q139972584">Q139972584</a></td></tr>
          </tbody>
        </table>

        <h2>Why does the quantum era need its own driving license?</h2>
        <p>
          The arrival of cryptographically relevant quantum computers will break
          virtually all currently deployed public-key cryptography (RSA, ECDSA,
          ECDH). NIST has already published the first three post-quantum
          cryptography standards in response. The EU PQC Roadmap targets
          2026–2035 for migration. NIS2 mandates crypto-agility.
        </p>
        <p>
          Most organisations face the same workforce gap: leaders need to
          understand what they&apos;re signing off on, and engineers need to know
          how to actually implement PQC. IQCDL is the credential designed to
          fill that gap — mapped to real standards rather than research lectures
          or vendor stacks.
        </p>

        <h2>How does IQCDL compare to other quantum credentials?</h2>
        <table>
          <thead>
            <tr><th>Feature</th><th>IQCDL</th><th>ISC2 PQC</th><th>IBM Quantum</th><th>Qiskit Developer</th><th>Azure Quantum</th></tr>
          </thead>
          <tbody>
            <tr><td>Vendor-neutral</td><td>✅</td><td>✅</td><td>❌</td><td>❌</td><td>❌</td></tr>
            <tr><td>Free intro tier</td><td>✅</td><td>❌</td><td>❌</td><td>❌</td><td>❌</td></tr>
            <tr><td>Foundation tier (no coding)</td><td>✅</td><td>partial</td><td>❌</td><td>❌</td><td>❌</td></tr>
            <tr><td>Hands-on PQC implementation</td><td>✅</td><td>partial</td><td>partial</td><td>partial</td><td>partial</td></tr>
            <tr><td>AI-guided readiness assessment</td><td>✅</td><td>❌</td><td>❌</td><td>❌</td><td>❌</td></tr>
            <tr><td>Multilingual</td><td>✅ 6 languages</td><td>English</td><td>English</td><td>English</td><td>English</td></tr>
          </tbody>
        </table>

        <h2>The three IQCDL levels</h2>
        <h3>Quantum Computing for Everyone — Free</h3>
        <p>Zero-code, self-paced (~4 hours), digital badge on completion.</p>
        <h3>IQCDL Foundation — Leaders</h3>
        <p>
          Three days. 150 MCQs, 180 minutes, 70% pass mark. Quantum fundamentals,
          the threat to today&apos;s cryptography, Mosca&apos;s theorem, PQC migration
          strategy.
        </p>
        <h3>IQCDL Practitioner — Engineers</h3>
        <p>
          Five days. 150 MCQs, 240 minutes, 75% pass mark. Qiskit programming,
          Shor&apos;s and Grover&apos;s algorithms, CRYSTALS-Kyber/Dilithium/SPHINCS+
          implementation, hybrid classical-PQC, crypto-agile TLS, CBOM,
          migration roadmaps. Prerequisite: Foundation + basic Python.
        </p>

        <h2>What is the Quantum Guide?</h2>
        <p>
          The Quantum Guide is the AI assistant on iqcdl.org that interviews you
          about your organisational context and produces a tailored
          quantum-readiness score, risk profile and recommended next steps. It
          runs in any of the six supported languages and produces output in
          approximately two minutes.
        </p>

        <h2>How IQCDL fits into the IAIDL Group</h2>
        <ul>
          <li><strong>IAIDL Group</strong> — umbrella entity (<a href="https://www.wikidata.org/wiki/Q139972499">Q139972499</a>)</li>
          <li><strong>IAIDL</strong> — AI competency certification (<a href="https://www.wikidata.org/wiki/Q139972531">Q139972531</a>)</li>
          <li><strong>IAIDL College</strong> — UK delivery college (<a href="https://www.wikidata.org/wiki/Q139972583">Q139972583</a>)</li>
          <li><strong>IQCDL</strong> — this credential (<a href="https://www.wikidata.org/wiki/Q139972584">Q139972584</a>)</li>
        </ul>

        <p>
          Single contact for admissions, partnerships and administration:{" "}
          <a href="mailto:admin@iqcdl.org">admin@iqcdl.org</a>.
        </p>
      </main>
    </>
  );
}
