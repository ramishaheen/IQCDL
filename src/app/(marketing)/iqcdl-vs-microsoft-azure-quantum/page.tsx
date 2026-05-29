import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title:
    "IQCDL vs Microsoft Azure Quantum — Choosing Your Quantum Certification",
  description:
    "IQCDL vs Microsoft Azure Quantum Developer / AI-102 — vendor-neutral vs Azure-platform quantum credentials compared on PQC, multilingual delivery, exam format and audience fit.",
  alternates: {
    canonical: "https://iqcdl.org/iqcdl-vs-microsoft-azure-quantum",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is IQCDL compatible with Azure Quantum?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. IQCDL is vendor-neutral, so the curriculum applies regardless of whether you build on Azure Quantum, IBM Quantum, AWS Braket or open-source. IQCDL Foundation covers Azure Quantum tooling alongside IBM Quantum Composer.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <main className="container-x prose prose-lg prose-invert mx-auto max-w-4xl py-16">
        <h1>IQCDL vs Microsoft Azure Quantum credentials</h1>
        <p className="lead">
          Microsoft&apos;s quantum offering is delivered through the{" "}
          <strong>Azure Quantum</strong> platform and Microsoft Learn paths.{" "}
          <strong>IQCDL</strong> is a vendor-neutral standalone certification
          covering quantum literacy, post-quantum cryptography migration and
          standards alignment — regardless of which cloud you build on.
        </p>
        <h2>At a glance</h2>
        <table>
          <thead>
            <tr><th>&nbsp;</th><th>IQCDL</th><th>Microsoft Azure Quantum (Learn paths)</th></tr>
          </thead>
          <tbody>
            <tr><td>Vendor-neutral</td><td>✅</td><td>❌ Azure platform</td></tr>
            <tr><td>Standalone certification</td><td>✅ all three levels</td><td>partial (within broader Azure paths)</td></tr>
            <tr><td>Coverage of Azure Quantum tools</td><td>✅ in Foundation</td><td>✅ native</td></tr>
            <tr><td>PQC implementation (FIPS 203/204/205)</td><td>✅ Practitioner tier</td><td>partial</td></tr>
            <tr><td>Quantum literacy tier (no coding)</td><td>✅ IQCDL Foundation</td><td>partial</td></tr>
            <tr><td>Free intro tier</td><td>✅ Quantum Computing for Everyone</td><td>✅ Microsoft Learn free</td></tr>
            <tr><td>AI-guided readiness assessment</td><td>✅ Quantum Guide</td><td>❌</td></tr>
            <tr><td>Multilingual</td><td>6 languages</td><td>limited</td></tr>
            <tr><td>Standards alignment</td><td>NIST + ISO/IEC + IEEE + EU PQC + NIS2</td><td>Azure-tooling primary</td></tr>
            <tr><td>Best for</td><td>Cross-cloud teams, security architects, CISOs</td><td>Teams committed to Azure Quantum</td></tr>
          </tbody>
        </table>

        <h2>Multilingual organisations: a practical note</h2>
        <p>
          If your organisation operates across Europe, MENA or East Asia, the
          multilingual factor alone tilts the case toward IQCDL — six native
          languages (English, Spanish, French, German, Arabic, Chinese) at
          launch is rare in cybersecurity certification.
        </p>
        <p>
          <a href="/programs">Explore IQCDL programs →</a>{" "}
          <a href="/assessment">Take the free Quantum Guide assessment →</a>
        </p>
      </main>
    </>
  );
}
