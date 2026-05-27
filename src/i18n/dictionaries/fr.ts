import type { DeepPartial, Dictionary } from "../types";

// Partial translation — any missing key falls back to English.
const fr: DeepPartial<Dictionary> = {
  meta: {
    title: "IQCDL — Permis International de Conduite en Informatique Quantique",
    description:
      "La certification internationale assistée par IA qui fait passer individus et organisations de la curiosité quantique à la préparation quantique.",
  },
  common: {
    startAssessment: "Commencer l'évaluation",
    login: "Connexion",
    logout: "Déconnexion",
    dashboard: "Tableau de bord",
    learnMore: "En savoir plus",
    enroll: "S'inscrire",
  },
  nav: {
    program: "Programme",
    assessment: "Préparation",
    roadmap: "Feuille de route",
    training: "Formation",
    standards: "Normes",
    pricing: "Tarifs",
    portal: "Portail",
  },
  hero: {
    badge: "Conforme à NIST · ISO/IEC · IEEE · Feuille de route PQC de l'UE",
    titleLine1: "Votre permis pour mener",
    titleLine2: "l'ère quantique",
    subtitle:
      "IQCDL est la certification internationale assistée par IA qui transforme l'incertitude quantique en un plan mesurable. Évaluez, formez, migrez en toute confiance.",
    ctaPrimary: "Évaluer ma préparation quantique",
    ctaSecondary: "Découvrir le programme",
    trustedBy: "Adopté par des responsables sécurité, éducateurs et innovateurs",
  },
  cta: {
    title: "L'ère post-quantique commence par une étape",
    subtitle: "Faites l'évaluation gratuite et obtenez un plan personnalisé par IA en deux minutes.",
    primary: "Commencer l'évaluation gratuite",
    secondary: "Parler au Guide Quantique",
  },
};

export default fr;
