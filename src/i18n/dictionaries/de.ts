import type { DeepPartial, Dictionary } from "../types";

// Partial translation — any missing key falls back to English.
const de: DeepPartial<Dictionary> = {
  meta: {
    title: "IQCDL — Internationaler Quantencomputing-Führerschein",
    description:
      "Die KI-gestützte internationale Zertifizierung, die Einzelpersonen und Organisationen von quantenneugierig zu quantenbereit führt.",
  },
  common: {
    startAssessment: "Bewertung starten",
    login: "Anmelden",
    logout: "Abmelden",
    dashboard: "Dashboard",
    learnMore: "Mehr erfahren",
    enroll: "Jetzt anmelden",
  },
  nav: {
    program: "Programm",
    assessment: "Bereitschaft",
    roadmap: "Roadmap",
    training: "Schulung",
    standards: "Standards",
    pricing: "Preise",
    portal: "Portal",
  },
  hero: {
    badge: "Konform mit NIST · ISO/IEC · IEEE · EU-PQC-Roadmap",
    titleLine1: "Ihr Führerschein für",
    titleLine2: "das Quantenzeitalter",
    subtitle:
      "IQCDL ist die KI-gestützte internationale Zertifizierung, die Quantenunsicherheit in einen messbaren Plan verwandelt. Bewerten, schulen und migrieren Sie mit Zuversicht.",
    ctaPrimary: "Meine Quantenbereitschaft messen",
    ctaSecondary: "Programm entdecken",
    trustedBy: "Vertraut von Sicherheitsverantwortlichen, Lehrenden und Innovatoren",
  },
  cta: {
    title: "Das Post-Quanten-Zeitalter beginnt mit einem Schritt",
    subtitle: "Machen Sie die kostenlose Bewertung und erhalten Sie in zwei Minuten einen KI-Plan.",
    primary: "Kostenlose Bewertung starten",
    secondary: "Mit dem Quantum Guide sprechen",
  },
};

export default de;
