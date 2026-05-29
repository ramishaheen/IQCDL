import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title:
    "IQCDL vs ISC2 PQC — Which Quantum Certification is Right for You? (2026)",
  description:
    "Compare IQCDL and (ISC)² PQC certifications. Vendor-neutrality, standards alignment, exam format, target audience, language coverage, and how they stack with CISSP.",
  alternates: { canonical: "https://iqcdl.org/iqcdl-vs-isc2-pqc" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Should I take IQCDL or ISC2 PQC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you already hold a CISSP or are pursuing one, ISC2 PQC fits the (ISC)² ecosystem. If you want a standalone vendor-neutral quantum credential with a free intro tier, multilingual delivery and an organisational maturity path via the IAIDL Group, choose IQCDL. The two stack well — CISSP + IQCDL Foundation is a strong CISO profile.",
      },
    },
    {
      "@type": "Question",
      name: "Are IQCDL and ISC2 PQC mutually exclusive?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. They cover overlapping ground (NIST PQC standards, migration concepts) from different angles. Many security leaders carry both.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <main className="container-x prose prose-lg prose-invert mx-auto max-w-4xl py-16">
        <h1>IQCDL vs ISC2 PQC — which quantum certification is right for you?</h1>
        <p className="lead">
          Both IQCDL and the (ISC)² post-quantum cryptography certification are
          vendor-neutral and aligned to the NIST PQC standards. The differences
          come down to <strong>scope, audience, and ecosystem</strong>.
        </p>
        <h2>At a glance</h2>
        <table>
          <thead>
            <tr><th>&nbsp;</th><th>IQCDL</th><th>(ISC)² PQC</th></tr>
          </thead>
          <tbody>
            <tr><td>Vendor-neutral</td><td>✅</td><td>✅</td></tr>
            <tr><td>Free intro tier</td><td>✅ Quantum Computing for Everyone</td><td>❌</td></tr>
            <tr><td>Foundation tier (no coding)</td><td>✅ IQCDL Foundation</td><td>partial</td></tr>
            <tr><td>Hands-on PQC implementation tier</td><td>✅ IQCDL Practitioner</td><td>partial</td></tr>
            <tr><td>AI-guided readiness assessment</td><td>✅ Quantum Guide</td><td>❌</td></tr>
            <tr><td>Languages</td><td>6 (en, es, fr, de, ar, zh)</td><td>English</td></tr>
            <tr><td>Country recognition</td><td>50+</td><td>(ISC)² member network</td></tr>
            <tr><td>Organisational AI maturity path</td><td>✅ via IAIDL Group AIMA</td><td>❌</td></tr>
            <tr><td>Best stacks with</td><td>CISSP, CCSP, IAIDL Advanced</td><td>CISSP (same ecosystem)</td></tr>
            <tr><td>Standards alignment</td><td>NIST FIPS 203/204/205, ISO/IEC 4879, IEEE P7131/P7132, EU PQC Roadmap, NIS2</td><td>NIST PQC, (ISC)² CBK</td></tr>
          </tbody>
        </table>

        <h2>Who should pick which?</h2>
        <h3>Pick IQCDL if you</h3>
        <ul>
          <li>Want a standalone vendor-neutral quantum credential not tied to any single membership body</li>
          <li>Need multilingual delivery (your team or organisation spans multiple language regions)</li>
          <li>Want to start with a free intro tier before committing to a paid certification</li>
          <li>Need an organisational maturity path (via the IAIDL Group&apos;s AIMA framework)</li>
          <li>Want hands-on PQC implementation training as a dedicated tier (IQCDL Practitioner)</li>
        </ul>
        <h3>Pick (ISC)² PQC if you</h3>
        <ul>
          <li>Already hold a CISSP, CCSP or other (ISC)² credential and want to stay in that ecosystem</li>
          <li>Are looking primarily for English-language certification within the (ISC)² CBK structure</li>
          <li>Need CPE credits for existing (ISC)² certifications</li>
        </ul>

        <h2>Can I take both?</h2>
        <p>
          Yes — and many security leaders do. The two cover overlapping NIST PQC
          fundamentals from different angles.{" "}
          <strong>CISSP + IQCDL Foundation</strong> is a particularly strong CISO
          profile, combining general security depth with a multilingual
          quantum-specific credential.
        </p>
        <p>
          <a href="/programs">Explore IQCDL programs →</a>{" "}
          <a href="/assessment">Take the free Quantum Guide assessment →</a>
        </p>
      </main>
    </>
  );
}
