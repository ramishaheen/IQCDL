import type { DeepPartial, Dictionary } from "../types";

// Full Spanish translation.
const es: DeepPartial<Dictionary> = {
  meta: {
    title: "IQCDL — Licencia Internacional de Conducción en Computación Cuántica",
    description:
      "La certificación internacional asistida por IA que lleva a personas y organizaciones de la curiosidad cuántica a la preparación cuántica. Evaluación de preparación guiada por IA, formación inmersiva y una ruta clara hacia la era poscuántica.",
  },
  common: {
    getStarted: "Empezar",
    learnMore: "Saber más",
    startAssessment: "Evaluación gratuita",
    bookDemo: "Reservar una demo",
    enroll: "Inscribirse",
    login: "Iniciar sesión",
    logout: "Cerrar sesión",
    dashboard: "Panel",
    minutes: "minutos",
    days: "días",
    questions: "preguntas",
    passScore: "Nota de aprobado",
    duration: "Duración",
    backHome: "Volver al inicio",
    soon: "Próximamente",
    new: "Nuevo",
  },
  nav: {
    program: "Programa",
    assessment: "Preparación",
    roadmap: "Hoja de ruta",
    training: "Formación",
    standards: "Normas",
    pricing: "Precios",
    portal: "Portal",
    membership: "Membresía",
    membershipDesc: "Elige cómo unirte a la red IQCDL",
  },
  hero: {
    badge: "Alineado con NIST · ISO/IEC · IEEE · Hoja de ruta PQC de la UE",
    titleLine1: "Tu licencia para liderar",
    titleLine2: "la era cuántica",
    subtitle:
      "IQCDL es la primera certificación internacional en computación cuántica asistida por IA. Mide tu riesgo poscuántico en 2 minutos, forma a tus equipos y obtén una credencial reconocida mundialmente.",
    ctaPrimary: "Obtener mi puntuación gratis",
    ctaSecondary: "Explorar el programa",
    trustedBy:
      "Con la confianza de líderes de seguridad, educadores e innovadores de todo el mundo",
    chips: [
      "Reconocido en más de 50 países",
      "Disponible en 6 idiomas",
      "Alineado con normas globales",
    ],
    card: {
      title: "Licencia Internacional de Conducción en Computación Cuántica",
      holder: "Titular",
      holderValue: "Tu nombre aquí",
      level: "Nivel",
      levelValue: "Fundación",
      validity: "Validez",
      validityValue: "3 años",
      verified: "Verificado",
      worldwide: "Reconocido mundialmente",
    },
  },
  stats: {
    marketValue: "Mercado cuántico para 2040",
    marketValueUnit: "106 MM $",
    jobsAccessible: "de los empleos cuánticos requieren un grado o menos",
    jobsAccessibleUnit: "55 %",
    levels: "Niveles de certificación progresivos",
    levelsUnit: "2",
    standards: "Normas internacionales alineadas",
    standardsUnit: "8+",
  },
  tracks: {
    eyebrow: "Tres niveles progresivos",
    title: "Una ruta clara — de la curiosidad cuántica al dominio práctico",
    subtitle:
      "Empieza gratis con Computación Cuántica para Todos, crea fluidez en toda la organización en Fundación, y avanza a Practicante para la programación y la migración poscuántica.",
    outlineTitle: "Temario completo del curso",
    everyone: {
      name: "Computación Cuántica para Todos",
      tagline: "Sin código · Vibe coding · Intro gratis",
      duration: "A tu ritmo · ~4 horas",
      exam: "Cuestionario de finalización · insignia digital",
      forWho:
        "Todos — líderes de negocio, estudiantes y curiosos. Sin matemáticas ni código.",
      points: [
        "Construye una intuición real de cúbits, superposición y entrelazamiento — sin matemáticas",
        "Entiende por qué lo cuántico importa para tu sector y tus datos",
        "Arrastra y suelta circuitos cuánticos reales con herramientas sin código",
        "Ejecuta tu primer programa cuántico con ‘vibe coding’ asistido por IA",
        "Termina con confianza, listo para Fundación",
      ],
      outline: [
        { label: "Módulo 1", title: "Lo cuántico, desmitificado", items: ["Qué es realmente un cúbit — en lenguaje claro", "Superposición y entrelazamiento por analogía", "Cuántico vs clásico"] },
        { label: "Módulo 2", title: "Por qué importa ahora", items: ["Casos de uso reales por sector", "La amenaza cuántica al cifrado, explicada simple", "‘Recolectar ahora, descifrar después’"] },
        { label: "Módulo 3", title: "Juega con lo cuántico (sin código)", items: ["Recorrido por IBM Quantum Composer y Quirk", "Crea un estado de Bell arrastrando puertas", "Lee e interpreta los resultados"] },
        { label: "Módulo 4", title: "Vibe-codea tu primer programa", items: ["Pide a una IA que genere un fragmento de Qiskit", "Ejecútalo en la nube — sin instalar nada", "Ajústalo describiendo los cambios"] },
        { label: "Módulo 5", title: "Tu siguiente paso", items: ["La mentalidad quantum-ready", "Cómo hablar de lo cuántico con tu equipo", "Transición al nivel Fundación"] },
      ],
    },
    foundation: {
      name: "Nivel Fundación",
      tagline: "Alfabetización cuántica para líderes",
      duration: "3 días",
      exam: "150 preguntas · 180 min · 70 % para aprobar",
      forWho:
        "CISO, responsables de TI, decisores de negocio y responsables de cumplimiento",
      points: [
        "Fundamentos cuánticos: cúbits, superposición y entrelazamiento",
        "La amenaza cuántica a la criptografía actual (Shor y Grover)",
        "Teorema de Mosca y evaluación de riesgos organizacionales",
        "Criptografía poscuántica y estrategia de migración",
        "Herramientas cuánticas sin código (IBM Quantum Composer, Azure Quantum)",
      ],
      outline: [
        { label: "Día 1", title: "Introducción a la computación cuántica", items: ["Fundamentos de la computación cuántica", "Cúbits, superposición y entrelazamiento", "Aplicaciones cuánticas por sector", "Práctica con simuladores sin código"] },
        { label: "Día 2", title: "La amenaza cuántica a la criptografía", items: ["Cómo lo cuántico rompe el cifrado actual", "Algoritmos de Shor y Grover", "Teorema de Mosca para evaluar el riesgo", "Introducción a la criptografía poscuántica (PQC)"] },
        { label: "Día 3", title: "Migración PQC y preparación organizacional", items: ["Estrategias de migración PQC", "El enfoque de tres fases: Evaluar, Planificar, Implementar", "Principios de cripto-agilidad", "Casos de uso por sector y planes de acción"] },
      ],
    },
    practitioner: {
      name: "Nivel Practicante",
      tagline: "Construir y migrar, en la práctica",
      duration: "5 días",
      exam: "150 preguntas · 240 min · 75 % para aprobar",
      forWho:
        "Desarrolladores, especialistas en criptografía, arquitectos de seguridad y DevOps",
      points: [
        "Programación cuántica con Qiskit y circuitos cuánticos",
        "Algoritmos de Shor y Grover, corrección de errores, VQA",
        "Implementación de CRYSTALS-Kyber, Dilithium y SPHINCS+",
        "Sistemas híbridos clásicos-PQC y TLS cripto-ágil",
        "Inventario criptográfico (CBOM) y hojas de ruta de migración",
      ],
      outline: [
        { label: "Día 1", title: "Fundamentos de la programación cuántica", items: ["Configurar el entorno de desarrollo", "Bases de Qiskit y circuitos cuánticos", "Implementar algoritmos básicos", "Visualizar estados cuánticos"] },
        { label: "Día 2", title: "Algoritmos cuánticos avanzados", items: ["Algoritmo de factorización de Shor", "Algoritmo de búsqueda de Grover", "Corrección de errores cuánticos", "Algoritmos cuánticos variacionales"] },
        { label: "Día 3", title: "Implementación de criptografía poscuántica", items: ["CRYSTALS-Kyber (ML-KEM)", "CRYSTALS-Dilithium (firmas digitales)", "SPHINCS+ (firmas basadas en hash)", "Evaluación y comparación de rendimiento"] },
        { label: "Día 4", title: "Soluciones criptográficas híbridas", items: ["Diseñar sistemas híbridos clásicos-PQC", "Implementar TLS con PQC", "Construir arquitecturas cripto-ágiles", "Gestión y rotación de claves"] },
        { label: "Día 5", title: "Planificación de migración y casos de estudio", items: ["Inventario criptográfico (CBOM)", "Desarrollar hojas de ruta de migración", "Analizar casos reales", "Crear planes de acción organizacionales"] },
      ],
    },
    prereq: "Requisito: nivel Fundación + Python básico",
  },
  features: {
    eyebrow: "Por qué IQCDL",
    title:
      "Más que un certificado — un sistema operativo para volverse quantum-ready",
    items: [
      {
        title: "Preparación guiada por IA",
        body: "Nuestro asistente Guía Cuántica analiza tu contexto y genera una puntuación de preparación, un perfil de riesgo y próximos pasos a medida — en cualquier idioma.",
      },
      {
        title: "Construido sobre normas reales",
        body: "Plan de estudios alineado con NIST FIPS 203/204/205, ISO/IEC 4879, IEEE P7131/P7132 y la hoja de ruta PQC de la UE (2026–2035).",
      },
      {
        title: "Formación inmersiva y práctica",
        body: "Laboratorios interactivos, simuladores sin código y casos reales en telecomunicaciones, banca, salud y sector público.",
      },
      {
        title: "Hoja de ruta de transformación",
        body: "Convierte los resultados de la evaluación en un plan de migración por fases Evaluar → Planificar → Implementar que toda tu organización puede seguir.",
      },
      {
        title: "Reconocida mundialmente",
        body: "Una credencial bilingüe y alineada internacionalmente que demuestra experiencia en seguridad cuántica ante empleadores y reguladores.",
      },
      {
        title: "Portal basado en roles",
        body: "Espacios dedicados para administradores, propietarios de capítulos, centros, formadores y estudiantes — gestiona cohortes, exámenes y certificados.",
      },
    ],
  },
  assessment: {
    eyebrow: "Gratis · 3 minutos · asistido por IA",
    title: "¿Qué tan preparado estás para lo cuántico?",
    subtitle:
      "Responde unas preguntas y nuestro motor aplica el teorema de Mosca y las mejores prácticas PQC para puntuar tu exposición y recomendar una ruta.",
    start: "Iniciar evaluación",
    restart: "Repetir",
    next: "Siguiente",
    back: "Atrás",
    seeResults: "Ver mis resultados",
    questionOf: "Pregunta {current} de {total}",
    resultTitle: "Tu preparación cuántica",
    resultScore: "Puntuación de preparación",
    talkToGuide: "Comentar esto con la Guía Cuántica",
    recommendedTrack: "Ruta recomendada",
    breakdownTitle: "Preparación por dimensión",
    nextStepsTitle: "Tus próximos pasos prioritarios",
    moscaNote:
      "Teorema de Mosca: si (vida útil de los datos + tiempo de migración) supera el tiempo hasta ordenadores cuánticos criptográficamente relevantes, ya estás expuesto.",
    levels: {
      critical: "Exposición crítica",
      developing: "En desarrollo",
      advancing: "Avanzando",
      ready: "Listo para lo cuántico",
    },
    dimensions: {
      exposure: "Exposición de datos",
      visibility: "Visibilidad criptográfica",
      agility: "Cripto-agilidad",
      adoption: "Adopción de PQC",
      people: "Personas y habilidades",
      governance: "Gobernanza",
    },
    tips: {
      exposure:
        "Identifica los datos de larga vida útil y trátalos como expuestos hoy («recolectar ahora, descifrar después»).",
      visibility:
        "Crea un inventario criptográfico (CBOM) — no puedes migrar lo que no ves.",
      agility:
        "Abstrae la criptografía tras interfaces para poder cambiar algoritmos sin rearquitecturar.",
      adoption:
        "Comienza a pilotar PQC de NIST (Kyber/Dilithium), idealmente como TLS híbrido, en un servicio de bajo riesgo.",
      people:
        "Certifica a los líderes en el nivel Fundación y crea una amplia alfabetización cuántica en los equipos.",
      governance:
        "Establece un plan de migración PQC con presupuesto, responsables y alineación con NIS2 / plazos regulatorios.",
    },
    questions: [
      {
        q: "¿Cuánto tiempo deben permanecer confidenciales tus datos más sensibles?",
        help: "Teorema de Mosca: si (vida útil + tiempo de migración) > tiempo hasta lo cuántico, ya estás expuesto.",
        options: ["1–2 años", "3–5 años", "6–10 años", "Más de 10 años"],
      },
      {
        q: "¿Tienes un inventario de dónde se usa la criptografía (un CBOM)?",
        help: "No puedes migrar lo que no ves.",
        options: [
          "Sin inventario",
          "Parcial / informal",
          "Documentado para sistemas clave",
          "Completo y mantenido",
        ],
      },
      {
        q: "¿Qué tan cripto-ágiles son tus sistemas hoy?",
        help: "Cripto-agilidad = cambiar algoritmos sin rearquitecturar.",
        options: [
          "Codificado en todas partes",
          "Algo de abstracción",
          "Mayormente modular",
          "Totalmente cripto-ágil",
        ],
      },
      {
        q: "¿Tu equipo ha empezado a probar algoritmos poscuánticos (Kyber, Dilithium)?",
        help: "NIST estandarizó ML-KEM, ML-DSA y SLH-DSA en FIPS 203/204/205.",
        options: ["Sin conocimiento", "Explorando", "Piloto", "En producción / TLS híbrido"],
      },
      {
        q: "¿Qué tan alfabetizados en cuántica están tu liderazgo y tu personal?",
        help: "La migración es un cambio organizacional, no solo técnico.",
        options: [
          "Sin concienciación",
          "Algunos impulsores",
          "Concienciación amplia",
          "Formados y certificados",
        ],
      },
      {
        q: "¿Tienes un plan de migración PQC financiado con responsables claros?",
        help: "La migración es un programa plurianual — necesita presupuesto y rendición de cuentas.",
        options: [
          "Sin plan",
          "Intención informal",
          "Plan borrador",
          "Hoja de ruta financiada y con responsables",
        ],
      },
      {
        q: "¿Pueden actualizarse en campo tus sistemas de larga vida (firmware, certificados, dispositivos)?",
        help: "Los sistemas de larga vida no actualizables son los más difíciles y arriesgados de migrar.",
        options: [
          "No actualizables",
          "Manual / difícil",
          "Mayormente actualizables",
          "Totalmente actualizables en remoto",
        ],
      },
      {
        q: "¿Qué tan bien comprendes tus obligaciones regulatorias de PQC (p. ej. NIS2)?",
        help: "Los reguladores están fijando plazos PQC; la preparación para el cumplimiento reduce riesgo y coste.",
        options: [
          "Sin conocimiento",
          "Algo de conocimiento",
          "Obligaciones evaluadas",
          "Cumpliendo activamente",
        ],
      },
    ],
  },
  roadmap: {
    eyebrow: "La transformación",
    title: "De la curiosidad cuántica a la ventaja cuántica habilitada por IA",
    subtitle:
      "Un recorrido por fases alineado con la hoja de ruta PQC de la UE. Cada hito combina desarrollo de capacidades con reducción medible del riesgo.",
    phases: [
      {
        year: "Ahora → 2026",
        title: "Concienciación y evaluación",
        body: "Establece la alfabetización cuántica, realiza evaluaciones de preparación y crea tu primer inventario criptográfico. Certifica a los líderes en el nivel Fundación.",
        tag: "Evaluar",
      },
      {
        year: "2026 → 2030",
        title: "Planificar y proteger las joyas de la corona",
        body: "Prioriza los datos de alto riesgo y larga vida útil. Pilota PQC y TLS híbrido en infraestructura crítica. Certifica practicantes y monta una arquitectura cripto-ágil.",
        tag: "Planificar",
      },
      {
        year: "2030 → 2035",
        title: "Implementar a escala",
        body: "Adopción amplia de PQC en todos los sistemas. Monitorización continua, cripto-agilidad por defecto y flujos cuánticos habilitados por IA para optimización y descubrimiento.",
        tag: "Implementar",
      },
      {
        year: "Más allá",
        title: "Ventaja cuántica habilitada por IA",
        body: "Operacionaliza cuántica e IA juntas — aprendizaje automático, optimización y simulación asistidos por cuántica — sobre una base totalmente quantum-safe.",
        tag: "Ventaja",
      },
    ],
  },
  standards: {
    eyebrow: "Construido sobre normas internacionales",
    title: "Credibilidad auditable",
    subtitle:
      "IQCDL está alineado con los marcos en los que ya confían reguladores, auditores y empresas.",
    groups: [
      {
        name: "Criptografía poscuántica de NIST",
        items: [
          "FIPS 203 — ML-KEM (CRYSTALS-Kyber)",
          "FIPS 204 — ML-DSA (CRYSTALS-Dilithium)",
          "FIPS 205 — SLH-DSA (SPHINCS+)",
        ],
      },
      {
        name: "ISO/IEC",
        items: [
          "ISO/IEC 4879 — Vocabulario de computación cuántica",
          "ISO/IEC TR 29144 — Criptografía quantum-safe",
        ],
      },
      {
        name: "IEEE",
        items: [
          "IEEE P7131 — Diseño de algoritmos cuánticos",
          "IEEE P7132 — Implementación de algoritmos cuánticos",
        ],
      },
      {
        name: "Unión Europea",
        items: ["Hoja de ruta PQC de la UE (2026–2035)", "Cumplimiento de la directiva NIS2"],
      },
    ],
  },
  pricing: {
    eyebrow: "Certificación y formación",
    title: "Elige tu camino hacia la preparación cuántica",
    subtitle:
      "Precios transparentes para personas y organizaciones. Descuentos por volumen y académicos disponibles.",
    perSeat: "por plaza",
    mostPopular: "El más popular",
    plans: [
      {
        name: "Fundación",
        price: "390 $",
        period: "examen incluido",
        features: [
          "Plan de estudios Fundación de 3 días",
          "Materiales interactivos bilingües",
          "Banco de 150 preguntas de práctica",
          "Examen supervisado en línea",
          "Certificado digital válido 3 años",
        ],
        cta: "Inscribirse en Fundación",
      },
      {
        name: "Practicante",
        price: "890 $",
        period: "examen incluido",
        features: [
          "Todo lo de Fundación",
          "5 días de laboratorios prácticos (Qiskit + PQC)",
          "Casos reales",
          "Examen basado en escenarios",
          "Manual de cripto-agilidad",
        ],
        cta: "Inscribirse en Practicante",
      },
      {
        name: "Organización",
        price: "A medida",
        period: "para equipos y centros",
        features: [
          "Gestión de cohortes y centros",
          "Evaluación de preparación a escala",
          "Habilitación de formadores y co-branding",
          "Taller de hoja de ruta de migración",
          "Gerente de éxito dedicado",
        ],
        cta: "Hablar con nosotros",
      },
    ],
  },
  cta: {
    title: "La era poscuántica empieza con un paso",
    subtitle:
      "Haz la evaluación gratuita y obtén un plan personalizado por IA en dos minutos.",
    primary: "Iniciar evaluación gratuita",
    secondary: "Hablar con la Guía Cuántica",
  },
  footer: {
    tagline: "El estándar internacional de preparación cuántica.",
    product: "Producto",
    company: "Empresa",
    resources: "Recursos",
    legal: "Legal",
    rights: "© 2025 IQCDL. Todos los derechos reservados.",
    disclaimer:
      "Con fines educativos. IQCDL proporciona conocimientos de computación cuántica y criptografía poscuántica, pero no garantiza empleo ni resultados específicos.",
    links: {
      program: "Visión general del programa",
      foundation: "Nivel Fundación",
      practitioner: "Nivel Practicante",
      assessment: "Evaluación de preparación",
      roadmap: "Hoja de ruta de transformación",
      standards: "Normas y acreditación",
      about: "Acerca de",
      contact: "Contacto",
      portal: "Acceso al portal",
      privacy: "Política de privacidad",
      terms: "Términos de uso",
    },
  },
  assistant: {
    title: "Guía Cuántica",
    subtitle: "Tu asistente de IA para la preparación cuántica",
    placeholder: "Pregunta sobre preparación, PQC, formación…",
    send: "Enviar",
    open: "Preguntar a la Guía Cuántica",
    greeting:
      "¡Hola! Soy la Guía Cuántica. Puedo ayudarte a entender el riesgo cuántico, planificar tu migración PQC o elegir la ruta IQCDL adecuada. ¿Qué te gustaría explorar?",
    suggestions: [
      "¿Estoy en riesgo por los ordenadores cuánticos?",
      "¿Qué es el teorema de Mosca?",
      "¿Fundación o Practicante — cuál me conviene?",
      "¿Cómo inicio una migración PQC?",
    ],
    poweredLive: "Con tecnología de Claude",
    poweredLocal: "Guía integrada",
    thinking: "Pensando…",
    error: "Algo salió mal. Inténtalo de nuevo.",
  },
  auth: {
    title: "Bienvenido de nuevo",
    subtitle: "Inicia sesión en el portal IQCDL",
    email: "Correo electrónico",
    password: "Contraseña",
    role: "Iniciar sesión como",
    signIn: "Iniciar sesión",
    signingIn: "Iniciando sesión…",
    demoHint: "Portal de demo — elige un rol para previsualizar su espacio.",
    useDemo: "Usar una cuenta de demo",
    invalid: "Credenciales inválidas. Prueba una cuenta de demo abajo.",
    roles: {
      admin: "Administrador",
      chapter: "Propietario de capítulo",
      center: "Centro de formación",
      trainer: "Formador",
      student: "Estudiante",
    },
    roleDesc: {
      admin: "Supervisión completa de la plataforma, normas y acreditación",
      chapter: "Red regional/nacional de capítulos y centros",
      center: "Gestionar cohortes, horarios y exámenes",
      trainer: "Impartir cursos y seguir el progreso",
      student: "Aprender, practicar y obtener tu certificado",
    },
  },
  dashboard: {
    welcome: "Bienvenido",
    signedInAs: "Sesión iniciada como",
    overview: "Resumen",
    quickActions: "Acciones rápidas",
    admin: {
      title: "Administración de la plataforma",
      metrics: ["Estudiantes activos", "Certificados hasta ahora", "Centros de formación", "Capítulos"],
      panels: ["Acreditación y normas", "Aprobaciones de centros", "Integridad de exámenes", "Analítica global"],
    },
    chapter: {
      title: "Gestión del capítulo",
      metrics: ["Centros del capítulo", "Inscritos este trimestre", "Tasa de aprobados", "Ingresos (anual)"],
      panels: ["Red de centros", "Campañas regionales", "Acreditación de formadores", "Informes"],
    },
    center: {
      title: "Operaciones del centro",
      metrics: ["Cohortes activas", "Exámenes próximos", "Formadores", "Plazas vendidas"],
      panels: ["Programar una cohorte", "Registrar estudiantes", "Pedir vouchers de examen", "Certificados"],
    },
    trainer: {
      title: "Mis clases",
      metrics: ["Mis cohortes", "Estudiantes", "Progreso medio", "Nota simulacro media"],
      panels: ["Materiales del curso", "Progreso de estudiantes", "Tareas y laboratorios", "Tutorías"],
    },
    student: {
      title: "Mi aprendizaje",
      metrics: ["Progreso del curso", "Mejor simulacro", "Puntuación de preparación", "Días para el examen"],
      panels: ["Continuar aprendiendo", "Examen de práctica", "Evaluación de preparación", "Mi certificado"],
      progressLabel: "Progreso del nivel Fundación",
    },
  },
  exam: {
    title: "Examen de práctica Fundación",
    subtitle:
      "Un examen de práctica cronometrado de opción múltiple alineado con el plan de estudios Fundación de IQCDL. Apruébalo para desbloquear tu certificado.",
    start: "Iniciar examen",
    instructions:
      "Tendrás un tiempo límite para responder todas las preguntas. Puedes navegar antes de enviar.",
    timeLeft: "Tiempo restante",
    questionLabel: "Pregunta",
    of: "de",
    next: "Siguiente",
    prev: "Anterior",
    submit: "Enviar examen",
    answered: "respondida",
    passed: "¡Enhorabuena — aprobaste!",
    failed: "Casi — sigue estudiando",
    yourScore: "Tu puntuación",
    passMark: "Nota de aprobado",
    passBody:
      "Has alcanzado la nota de aprobado Fundación. Tu certificado ya está disponible en el portal.",
    failBody:
      "Estás cerca. Repasa el plan de estudios y los consejos de la Guía Cuántica, y vuelve a intentarlo.",
    retake: "Repetir examen",
    viewCertificate: "Ver mi certificado",
    backToDashboard: "Volver al panel",
    correct: "correctas",
  },
  certificate: {
    title: "Certificado de Logro",
    presentedTo: "Esto certifica que",
    completed: "ha completado con éxito los requisitos de la",
    program: "Licencia Internacional de Conducción en Computación Cuántica",
    issued: "Emitido",
    expires: "Válido hasta",
    credentialId: "ID de credencial",
    verify: "Verifica en iqcdl.org/verify",
    download: "Descargar / Imprimir",
    backToDashboard: "Volver al panel",
    lockedTitle: "Tu certificado está bloqueado",
    lockedBody:
      "Aprueba el examen de práctica Fundación para desbloquear y descargar tu certificado.",
    goToExam: "Ir al examen",
    signatory: "Director, Junta de Certificación IQCDL",
  },
  membership: {
    eyebrow: "Membresía",
    title: "Únete a la red IQCDL",
    subtitle:
      "Cinco formas de participar — del estudiante al administrador. Elige la membresía que encaje y solicítala en minutos.",
    applyTitle: "Cómo solicitar",
    steps: [
      "Elige tu nivel de membresía",
      "Crea tu cuenta del portal o inicia sesión",
      "Sé aprobado y comienza a operar",
    ],
    apply: "Solicitar / Iniciar sesión",
    cta: "Hazte miembro",
  },
};

export default es;
