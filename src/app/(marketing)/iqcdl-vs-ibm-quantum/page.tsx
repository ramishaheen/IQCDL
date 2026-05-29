import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "IQCDL vs IBM Quantum Developer — Vendor-Neutral or IBM-Specific?",
  description:
    "IQCDL vs IBM Quantum Developer Certification — compare vendor-neutrality, NIST PQC coverage, Qiskit depth, hardware access, exam format, target audience and cost.",
  alternates: { canonical: "https://iqcdl.org/iqcdl-vs-ibm-quantum" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is IBM Quantum Developer Certification the same as IQCDL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. IBM Quantum Developer validates skills specifically on the IBM Quantum platform and Qiskit SDK. IQCDL is vendor-neutral and covers quantum literacy plus post-quantum cryptography migration regardless of which platform you build on.",
      },
    },
    {
      "@type": "Question",
      name: "Does IQCDL teach Qiskit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — IQCDL Practitioner covers Qiskit programming as one of multiple tools for implementing quantum algorithms, alongside dedicated coverage of CRYSTALS-Kyber, CRYSTALS-Dilithium and SPHINCS+ for PQC.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <main className="container-x prose prose-lg prose-invert mx-auto max-w-4xl py-16">
        <h1>IQCDL vs IBM Quantum Developer Certification</h1>
        <p className="lead">
          Both credentials touch quantum programming, but they answer different
          questions. <strong>IBM Quantum Developer</strong> proves you can build
          on IBM&apos;s quantum platform. <strong>IQCDL</strong> proves you can
          lead your organisation&apos;s quantum-readiness and post-quantum
          cryptography migration — independent of any single vendor&apos;s
          hardware.
        </p>
        <h2>At a glance</h2>
        <table>
          <thead>
            <tr><th>&nbsp;</th><th>IQCDL</th><th>IBM Quantum Developer</th></tr>
          </thead>
          <tbody>
            <tr><td>Vendor-neutral</td><td>✅</td><td>❌ IBM Quantum platform-specific</td></tr>
            <tr><td>Qiskit programming</td><td>✅ in Practitioner tier</td><td>✅ deep</td></tr>
            <tr><td>NIST PQC migration (FIPS 203/204/205)</td><td>✅ core curriculum</td><td>indirect</td></tr>
            <tr><td>Post-quantum cryptography focus</td><td>✅ explicit</td><td>partial</td></tr>
            <tr><td>Foundation tier (no coding)</td><td>✅ IQCDL Foundation</td><td>❌</td></tr>
            <tr><td>Free intro tier</td><td>✅ Quantum Computing for Everyone</td><td>partial</td></tr>
            <tr><td>AI-guided readiness assessment</td><td>✅ Quantum Guide</td><td>❌</td></tr>
            <tr><td>Languages</td><td>6</td><td>English (primary)</td></tr>
            <tr><td>ISO/IEC + IEEE alignment</td><td>✅ ISO/IEC 4879, IEEE P7131/P7132</td><td>partial</td></tr>
            <tr><td>EU PQC Roadmap + NIS2</td><td>✅</td><td>not directly</td></tr>
            <tr><td>Best for</td><td>CISOs, security architects, broad quantum-readiness</td><td>Developers building on IBM Quantum</td></tr>
          </tbody>
        </table>

        <h2>Where IQCDL goes beyond IBM Quantum Developer</h2>
        <ul>
          <li><strong>Post-quantum cryptography:</strong> CRYSTALS-Kyber, Dilithium, SPHINCS+ hands-on (FIPS 203/204/205)</li>
          <li><strong>Hybrid classical-PQC systems:</strong> crypto-agile TLS architecture</li>
          <li><strong>Migration tooling:</strong> Cryptographic Bill of Materials (CBOM), migration roadmaps</li>
          <li><strong>Mosca&apos;s theorem applied to enterprise risk</strong></li>
          <li><strong>NIS2 / EU PQC Roadmap compliance angles</strong></li>
          <li><strong>AI-supported readiness assessment</strong> (Quantum Guide)</li>
        </ul>
        <p>
          <a href="/programs">Explore IQCDL programs →</a>{" "}
          <a href="/assessment">Take the free Quantum Guide assessment →</a>
        </p>
      </main>
    </>
  );
}
