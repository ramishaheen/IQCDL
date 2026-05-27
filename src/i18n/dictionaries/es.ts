import type { DeepPartial, Dictionary } from "../types";

// Partial translation — any missing key falls back to English.
const es: DeepPartial<Dictionary> = {
  meta: {
    title: "IQCDL — Licencia Internacional de Conducción en Computación Cuántica",
    description:
      "La certificación internacional asistida por IA que lleva a personas y organizaciones de la curiosidad cuántica a la preparación cuántica.",
  },
  common: {
    startAssessment: "Iniciar evaluación",
    login: "Iniciar sesión",
    logout: "Cerrar sesión",
    dashboard: "Panel",
    learnMore: "Saber más",
    enroll: "Inscribirse",
  },
  nav: {
    program: "Programa",
    assessment: "Preparación",
    roadmap: "Hoja de ruta",
    training: "Formación",
    standards: "Normas",
    pricing: "Precios",
    portal: "Portal",
  },
  hero: {
    badge: "Alineado con NIST · ISO/IEC · IEEE · Hoja de ruta PQC de la UE",
    titleLine1: "Tu licencia para liderar",
    titleLine2: "la era cuántica",
    subtitle:
      "IQCDL es la certificación internacional asistida por IA que convierte la incertidumbre cuántica en un plan medible. Evalúa, forma y migra con confianza.",
    ctaPrimary: "Medir mi preparación cuántica",
    ctaSecondary: "Explorar el programa",
    trustedBy: "Con la confianza de líderes de seguridad, educadores e innovadores",
  },
  cta: {
    title: "La era poscuántica empieza con un paso",
    subtitle: "Haz la evaluación gratuita y obtén un plan personalizado por IA en dos minutos.",
    primary: "Iniciar evaluación gratuita",
    secondary: "Hablar con la Guía Cuántica",
  },
};

export default es;
