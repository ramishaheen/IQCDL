import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title:
    "IQCDL vs Qiskit Developer — Which Quantum Programming Credential to Pick",
  description:
    "Compare IQCDL and Qiskit Developer Certificate — IBM tooling depth vs. vendor-neutral quantum literacy and post-quantum cryptography migration.",
  alternates: { canonical: "https://iqcdl.org/iqcdl-vs-qiskit-developer" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does IQCDL cover Qiskit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — IQCDL Practitioner covers Qiskit programming as part of a broader, vendor-neutral PQC implementation curriculum.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <main className="container-x prose prose-lg prose-invert mx-auto max-w-4xl py-16">
        <h1>IQCDL vs Qiskit Developer Certificate</h1>
        <p className="lead">
          The Qiskit Developer Certificate validates SDK proficiency.{" "}
          <strong>IQCDL</strong> validates quantum-readiness and post-quantum
          cryptography migration capability — using Qiskit as one of multiple
          tools, alongside vendor-neutral architecture and standards knowledge.
        </p>
        <h2>At a glance</h2>
        <table>
          <thead>
            <tr><th>&nbsp;</th><th>IQCDL</th><th>Qiskit Developer</th></tr>
          </thead>
          <tbody>
            <tr><td>Vendor-neutral</td><td>✅</td><td>❌ Qiskit / IBM tooling</td></tr>
            <tr><td>Qiskit programming depth</td><td>✅ in Practitioner</td><td>✅ deep</td></tr>
            <tr><td>Other quantum SDKs covered</td><td>✅ (Azure Quantum, IBM Quantum Composer)</td><td>❌</td></tr>
            <tr><td>PQC implementation (FIPS 203/204/205)</td><td>✅ core curriculum</td><td>❌ not in scope</td></tr>
            <tr><td>Quantum literacy tier (no coding)</td><td>✅ IQCDL Foundation</td><td>❌</td></tr>
            <tr><td>Free intro tier</td><td>✅ Quantum Computing for Everyone</td><td>partial</td></tr>
            <tr><td>Organisational risk assessment</td><td>✅ Mosca&apos;s theorem + Quantum Guide</td><td>❌</td></tr>
            <tr><td>Standards alignment</td><td>NIST + ISO/IEC + IEEE + EU PQC</td><td>IBM Qiskit ecosystem</td></tr>
            <tr><td>Best for</td><td>Security architects, CISOs, PQC engineers</td><td>Quantum software engineers on IBM stack</td></tr>
          </tbody>
        </table>

        <h2>The key distinction</h2>
        <p>
          Qiskit Developer is a <strong>tooling-depth credential</strong> — it
          proves you can write and reason about quantum programs in the Qiskit
          SDK. IQCDL Practitioner is a <strong>capability credential</strong> —
          it proves you can identify what to migrate, when, and how. Different
          jobs.
        </p>

        <h2>If you&apos;re a security architect or CISO</h2>
        <p>
          <strong>IQCDL is the better fit.</strong> Qiskit Developer is too
          narrow. You need the cryptographic landscape, migration architecture
          (hybrid TLS, CBOM, crypto-agility), and regulatory drivers (NIS2, EU
          PQC Roadmap). IQCDL Foundation covers the leadership view; IQCDL
          Practitioner covers the implementation view.
        </p>
        <p>
          <a href="/programs">Explore IQCDL programs →</a>{" "}
          <a href="/assessment">Take the free Quantum Guide assessment →</a>
        </p>
      </main>
    </>
  );
}
