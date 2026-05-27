import type { DeepPartial, Dictionary } from "../types";

// Full French translation.
const fr: DeepPartial<Dictionary> = {
  meta: {
    title: "IQCDL — Permis International de Conduite en Informatique Quantique",
    description:
      "La certification internationale assistée par IA qui fait passer individus et organisations de la curiosité quantique à la préparation quantique. Évaluation de préparation guidée par IA, formation immersive et trajectoire claire vers l'ère post-quantique.",
  },
  common: {
    getStarted: "Commencer",
    learnMore: "En savoir plus",
    startAssessment: "Évaluation gratuite",
    bookDemo: "Réserver une démo",
    enroll: "S'inscrire",
    login: "Connexion",
    logout: "Déconnexion",
    dashboard: "Tableau de bord",
    minutes: "minutes",
    days: "jours",
    questions: "questions",
    passScore: "Score de réussite",
    duration: "Durée",
    backHome: "Retour à l'accueil",
    soon: "Bientôt",
    new: "Nouveau",
  },
  nav: {
    program: "Programme",
    assessment: "Préparation",
    roadmap: "Feuille de route",
    training: "Formation",
    standards: "Normes",
    pricing: "Tarifs",
    portal: "Portail",
    membership: "Adhésion",
    membershipDesc: "Choisissez votre façon de rejoindre le réseau IQCDL",
  },
  hero: {
    badge: "Conforme à NIST · ISO/IEC · IEEE · Feuille de route PQC de l'UE",
    titleLine1: "Votre permis pour mener",
    titleLine2: "l'ère quantique",
    subtitle:
      "IQCDL est la première certification internationale en informatique quantique assistée par IA. Évaluez votre risque post-quantique en 2 minutes, formez vos équipes et obtenez un titre reconnu mondialement.",
    ctaPrimary: "Obtenir mon score gratuit",
    ctaSecondary: "Découvrir le programme",
    trustedBy:
      "Adopté par des responsables sécurité, éducateurs et innovateurs dans le monde entier",
    chips: [
      "Reconnu dans 50+ pays",
      "Disponible en 6 langues",
      "Aligné sur les normes mondiales",
    ],
    card: {
      title: "Permis International de Conduite en Informatique Quantique",
      holder: "Titulaire",
      holderValue: "Votre nom ici",
      level: "Niveau",
      levelValue: "Fondation",
      validity: "Validité",
      validityValue: "3 ans",
      verified: "Vérifié",
      worldwide: "Reconnu mondialement",
    },
  },
  stats: {
    marketValue: "Marché quantique d'ici 2040",
    marketValueUnit: "106 Mrd $",
    jobsAccessible: "des emplois quantiques exigent une licence ou moins",
    jobsAccessibleUnit: "55 %",
    levels: "Niveaux de certification progressifs",
    levelsUnit: "2",
    standards: "Normes internationales alignées",
    standardsUnit: "8+",
  },
  tracks: {
    eyebrow: "Trois niveaux progressifs",
    title: "Un parcours clair — de la curiosité quantique à la maîtrise pratique",
    subtitle:
      "Commencez gratuitement avec Le Quantique pour Tous, bâtissez une aisance à l'échelle de l'organisation au niveau Fondation, puis passez au niveau Praticien pour la programmation et la migration post-quantique.",
    outlineTitle: "Plan de cours complet",
    everyone: {
      name: "Le Quantique pour Tous",
      tagline: "Sans code · Vibe coding · Intro gratuite",
      duration: "À votre rythme · ~4 heures",
      exam: "Quiz de validation · badge numérique",
      forWho:
        "Tout le monde — dirigeants, étudiants et curieux. Aucune maths ni code requis.",
      points: [
        "Construire une vraie intuition des qubits, superposition et intrication — sans maths",
        "Comprendre pourquoi le quantique compte pour votre secteur et vos données",
        "Manipuler de vrais circuits quantiques avec des outils sans code",
        "Lancer votre premier programme quantique en « vibe coding » assisté par IA",
        "Terminer en confiance, prêt pour le niveau Fondation",
      ],
      outline: [
        { label: "Module 1", title: "Le quantique démystifié", items: ["Ce qu'est vraiment un qubit — en clair", "Superposition et intrication par analogie", "Quantique vs classique"] },
        { label: "Module 2", title: "Pourquoi c'est important maintenant", items: ["Cas d'usage concrets par secteur", "La menace quantique sur le chiffrement, expliquée simplement", "« Récolter maintenant, déchiffrer plus tard »"] },
        { label: "Module 3", title: "Jouer avec le quantique (sans code)", items: ["Découverte d'IBM Quantum Composer et Quirk", "Construire un état de Bell en glissant des portes", "Lire et interpréter les résultats"] },
        { label: "Module 4", title: "Vibe-codez votre premier programme", items: ["Demander à une IA de générer un extrait Qiskit", "L'exécuter dans le cloud — sans installation", "L'ajuster en décrivant les changements"] },
        { label: "Module 5", title: "Votre prochaine étape", items: ["L'état d'esprit quantum-ready", "Comment parler quantique avec votre équipe", "Transition vers le niveau Fondation"] },
      ],
    },
    foundation: {
      name: "Niveau Fondation",
      tagline: "Culture quantique pour dirigeants",
      duration: "3 jours",
      exam: "150 QCM · 180 min · 70 % pour réussir",
      forWho:
        "RSSI, responsables IT, décideurs métier et responsables conformité",
      points: [
        "Fondamentaux quantiques : qubits, superposition et intrication",
        "La menace quantique sur la cryptographie actuelle (Shor & Grover)",
        "Théorème de Mosca et évaluation des risques organisationnels",
        "Cryptographie post-quantique et stratégie de migration",
        "Outils quantiques sans code (IBM Quantum Composer, Azure Quantum)",
      ],
      outline: [
        { label: "Jour 1", title: "Introduction à l'informatique quantique", items: ["Fondamentaux de l'informatique quantique", "Qubits, superposition et intrication", "Applications quantiques par secteur", "Pratique avec des simulateurs sans code"] },
        { label: "Jour 2", title: "La menace quantique sur la cryptographie", items: ["Comment le quantique casse le chiffrement actuel", "Algorithmes de Shor et Grover", "Théorème de Mosca pour l'évaluation des risques", "Introduction à la cryptographie post-quantique (PQC)"] },
        { label: "Jour 3", title: "Migration PQC et préparation organisationnelle", items: ["Stratégies de migration PQC", "L'approche en trois phases : Évaluer, Planifier, Mettre en œuvre", "Principes de crypto-agilité", "Cas d'usage sectoriels et plans d'action"] },
      ],
    },
    practitioner: {
      name: "Niveau Praticien",
      tagline: "Construire et migrer, en pratique",
      duration: "5 jours",
      exam: "150 QCM · 240 min · 75 % pour réussir",
      forWho:
        "Développeurs, spécialistes cryptographie, architectes sécurité et DevOps",
      points: [
        "Programmation quantique avec Qiskit et circuits quantiques",
        "Algorithmes de Shor et Grover, correction d'erreurs, VQA",
        "Implémentation de CRYSTALS-Kyber, Dilithium et SPHINCS+",
        "Systèmes hybrides classiques-PQC et TLS crypto-agile",
        "Inventaire cryptographique (CBOM) et feuilles de route de migration",
      ],
      outline: [
        { label: "Jour 1", title: "Fondamentaux de la programmation quantique", items: ["Configurer l'environnement de développement", "Bases de Qiskit et circuits quantiques", "Implémenter des algorithmes de base", "Visualiser les états quantiques"] },
        { label: "Jour 2", title: "Algorithmes quantiques avancés", items: ["Algorithme de factorisation de Shor", "Algorithme de recherche de Grover", "Correction d'erreurs quantiques", "Algorithmes quantiques variationnels"] },
        { label: "Jour 3", title: "Mise en œuvre de la cryptographie post-quantique", items: ["CRYSTALS-Kyber (ML-KEM)", "CRYSTALS-Dilithium (signatures)", "SPHINCS+ (signatures à base de hachage)", "Évaluation et comparaison des performances"] },
        { label: "Jour 4", title: "Solutions cryptographiques hybrides", items: ["Concevoir des systèmes hybrides classiques-PQC", "Implémenter TLS avec PQC", "Bâtir des architectures crypto-agiles", "Gestion et rotation des clés"] },
        { label: "Jour 5", title: "Planification de la migration et études de cas", items: ["Inventaire cryptographique (CBOM)", "Élaborer des feuilles de route de migration", "Analyser des études de cas réelles", "Créer des plans d'action organisationnels"] },
      ],
    },
    prereq: "Prérequis : niveau Fondation + bases de Python",
  },
  features: {
    eyebrow: "Pourquoi IQCDL",
    title:
      "Plus qu'un certificat — un système d'exploitation pour devenir quantum-ready",
    items: [
      {
        title: "Préparation guidée par IA",
        body: "Notre assistant Guide Quantique analyse votre contexte et produit un score de préparation, un profil de risque et des prochaines étapes sur mesure — dans toutes les langues.",
      },
      {
        title: "Bâti sur de vraies normes",
        body: "Programme aligné sur NIST FIPS 203/204/205, ISO/IEC 4879, IEEE P7131/P7132 et la feuille de route PQC de l'UE (2026–2035).",
      },
      {
        title: "Formation immersive et pratique",
        body: "Labos interactifs, simulateurs sans code et études de cas réelles dans les télécoms, la banque, la santé et le secteur public.",
      },
      {
        title: "Feuille de route de transformation",
        body: "Transformez les résultats de l'évaluation en un plan de migration par phases Évaluer → Planifier → Mettre en œuvre que toute votre organisation peut suivre.",
      },
      {
        title: "Reconnue mondialement",
        body: "Un titre bilingue et aligné à l'international qui atteste d'une expertise en sécurité quantique auprès des employeurs et régulateurs.",
      },
      {
        title: "Portail basé sur les rôles",
        body: "Espaces dédiés pour administrateurs, propriétaires de chapitres, centres, formateurs et apprenants — gérez cohortes, examens et certificats.",
      },
    ],
  },
  assessment: {
    eyebrow: "Gratuit · 3 minutes · assisté par IA",
    title: "Quel est votre niveau de préparation quantique ?",
    subtitle:
      "Répondez à quelques questions et notre moteur applique le théorème de Mosca et les bonnes pratiques PQC pour évaluer votre exposition et recommander un parcours.",
    start: "Démarrer l'évaluation",
    restart: "Recommencer",
    next: "Suivant",
    back: "Précédent",
    seeResults: "Voir mes résultats",
    questionOf: "Question {current} sur {total}",
    resultTitle: "Votre préparation quantique",
    resultScore: "Score de préparation",
    talkToGuide: "En discuter avec le Guide Quantique",
    recommendedTrack: "Parcours recommandé",
    breakdownTitle: "Préparation par dimension",
    nextStepsTitle: "Vos prochaines étapes prioritaires",
    moscaNote:
      "Théorème de Mosca : si (durée de vie des données + temps de migration) dépasse le temps avant des ordinateurs quantiques cryptographiquement pertinents, vous êtes déjà exposé.",
    levels: {
      critical: "Exposition critique",
      developing: "En développement",
      advancing: "En progression",
      ready: "Prêt pour le quantique",
    },
    dimensions: {
      exposure: "Exposition des données",
      visibility: "Visibilité cryptographique",
      agility: "Crypto-agilité",
      adoption: "Adoption PQC",
      people: "Personnes & compétences",
      governance: "Gouvernance",
    },
    tips: {
      exposure:
        "Identifiez les données à longue durée de vie et considérez-les comme exposées dès aujourd'hui (« récolter maintenant, déchiffrer plus tard »).",
      visibility:
        "Constituez un inventaire cryptographique (CBOM) — on ne peut migrer ce qu'on ne voit pas.",
      agility:
        "Abstrayez la cryptographie derrière des interfaces pour pouvoir changer d'algorithmes sans ré-architecturer.",
      adoption:
        "Lancez un pilote de PQC NIST (Kyber/Dilithium), idéalement en TLS hybride, sur un service à faible risque.",
      people:
        "Certifiez les dirigeants au niveau Fondation et développez une culture quantique large dans les équipes.",
      governance:
        "Mettez en place un plan de migration PQC avec budget, responsables et alignement sur NIS2 / les échéances réglementaires.",
    },
    questions: [
      {
        q: "Combien de temps vos données les plus sensibles doivent-elles rester confidentielles ?",
        help: "Théorème de Mosca : si (durée de vie + temps de migration) > temps avant le quantique, vous êtes déjà exposé.",
        options: ["1–2 ans", "3–5 ans", "6–10 ans", "Plus de 10 ans"],
      },
      {
        q: "Disposez-vous d'un inventaire de l'usage de la cryptographie (un CBOM) ?",
        help: "On ne peut migrer ce qu'on ne voit pas.",
        options: [
          "Aucun inventaire",
          "Partiel / informel",
          "Documenté pour les systèmes clés",
          "Complet et maintenu",
        ],
      },
      {
        q: "Quel est le niveau de crypto-agilité de vos systèmes aujourd'hui ?",
        help: "Crypto-agilité = changer d'algorithmes sans ré-architecturer.",
        options: [
          "Codé en dur partout",
          "Quelques abstractions",
          "Plutôt modulaire",
          "Totalement crypto-agile",
        ],
      },
      {
        q: "Votre équipe a-t-elle commencé à tester des algorithmes post-quantiques (Kyber, Dilithium) ?",
        help: "Le NIST a normalisé ML-KEM, ML-DSA et SLH-DSA dans FIPS 203/204/205.",
        options: ["Pas au courant", "Exploration", "Pilote", "En production / TLS hybride"],
      },
      {
        q: "Quel est le niveau de culture quantique de votre direction et de vos équipes ?",
        help: "La migration est un changement organisationnel, pas seulement technique.",
        options: [
          "Aucune sensibilisation",
          "Quelques pionniers",
          "Sensibilisation large",
          "Formés et certifiés",
        ],
      },
      {
        q: "Disposez-vous d'un plan de migration PQC financé avec des responsables clairs ?",
        help: "La migration est un programme pluriannuel — il faut budget et responsabilité.",
        options: [
          "Aucun plan",
          "Intention informelle",
          "Plan ébauché",
          "Feuille de route financée et pilotée",
        ],
      },
      {
        q: "Vos systèmes à longue durée de vie (firmware, certificats, appareils) peuvent-ils être mis à jour sur le terrain ?",
        help: "Les systèmes longue durée non actualisables sont les plus difficiles et risqués à migrer.",
        options: [
          "Non actualisables",
          "Manuel / difficile",
          "Plutôt actualisables",
          "Mise à jour à distance complète",
        ],
      },
      {
        q: "Dans quelle mesure comprenez-vous vos obligations réglementaires PQC (ex. NIS2) ?",
        help: "Les régulateurs fixent des échéances PQC ; la préparation à la conformité réduit risque et coût.",
        options: [
          "Non informé",
          "Quelque sensibilisation",
          "Obligations évaluées",
          "Conforme activement",
        ],
      },
    ],
  },
  roadmap: {
    eyebrow: "La transformation",
    title: "De la curiosité quantique à l'avantage quantique assisté par IA",
    subtitle:
      "Un parcours par phases aligné sur la feuille de route PQC de l'UE. Chaque jalon associe montée en compétences et réduction mesurable du risque.",
    phases: [
      {
        year: "Maintenant → 2026",
        title: "Sensibilisation & évaluation",
        body: "Instaurez la culture quantique, réalisez des évaluations de préparation et bâtissez votre premier inventaire cryptographique. Certifiez les dirigeants au niveau Fondation.",
        tag: "Évaluer",
      },
      {
        year: "2026 → 2030",
        title: "Planifier & protéger les actifs critiques",
        body: "Priorisez les données à haut risque et longue durée de vie. Pilotez la PQC et le TLS hybride sur les infrastructures critiques. Certifiez les praticiens et déployez une architecture crypto-agile.",
        tag: "Planifier",
      },
      {
        year: "2030 → 2035",
        title: "Mettre en œuvre à grande échelle",
        body: "Adoption large de la PQC sur tous les systèmes. Surveillance continue, crypto-agilité par défaut et flux quantiques assistés par IA pour l'optimisation et la découverte.",
        tag: "Mettre en œuvre",
      },
      {
        year: "Au-delà",
        title: "Avantage quantique assisté par IA",
        body: "Opérationnalisez quantique et IA ensemble — apprentissage automatique, optimisation et simulation assistés par le quantique — sur une base entièrement quantum-safe.",
        tag: "Avantage",
      },
    ],
  },
  standards: {
    eyebrow: "Bâti sur des normes internationales",
    title: "Une crédibilité auditable",
    subtitle:
      "IQCDL est aligné sur les cadres auxquels régulateurs, auditeurs et entreprises font déjà confiance.",
    groups: [
      {
        name: "Cryptographie post-quantique NIST",
        items: [
          "FIPS 203 — ML-KEM (CRYSTALS-Kyber)",
          "FIPS 204 — ML-DSA (CRYSTALS-Dilithium)",
          "FIPS 205 — SLH-DSA (SPHINCS+)",
        ],
      },
      {
        name: "ISO/IEC",
        items: [
          "ISO/IEC 4879 — Vocabulaire de l'informatique quantique",
          "ISO/IEC TR 29144 — Cryptographie quantum-safe",
        ],
      },
      {
        name: "IEEE",
        items: [
          "IEEE P7131 — Conception d'algorithmes quantiques",
          "IEEE P7132 — Implémentation d'algorithmes quantiques",
        ],
      },
      {
        name: "Union européenne",
        items: ["Feuille de route PQC de l'UE (2026–2035)", "Conformité à la directive NIS2"],
      },
    ],
  },
  pricing: {
    eyebrow: "Certification & formation",
    title: "Choisissez votre voie vers la préparation quantique",
    subtitle:
      "Tarifs transparents pour particuliers et organisations. Remises volume et académiques disponibles.",
    perSeat: "par participant",
    mostPopular: "Le plus populaire",
    plans: [
      {
        name: "Fondation",
        price: "390 $",
        period: "examen inclus",
        features: [
          "Programme Fondation de 3 jours",
          "Supports interactifs bilingues",
          "Banque de 150 questions d'entraînement",
          "Examen surveillé en ligne",
          "Certificat numérique valable 3 ans",
        ],
        cta: "S'inscrire en Fondation",
      },
      {
        name: "Praticien",
        price: "890 $",
        period: "examen inclus",
        features: [
          "Tout le niveau Fondation",
          "5 jours de labos pratiques (Qiskit + PQC)",
          "Études de cas réelles",
          "Examen basé sur des scénarios",
          "Playbook de crypto-agilité",
        ],
        cta: "S'inscrire en Praticien",
      },
      {
        name: "Organisation",
        price: "Sur mesure",
        period: "pour équipes & centres",
        features: [
          "Gestion des cohortes et centres",
          "Évaluation de préparation à grande échelle",
          "Habilitation des formateurs & co-branding",
          "Atelier feuille de route de migration",
          "Responsable de réussite dédié",
        ],
        cta: "Nous contacter",
      },
    ],
  },
  cta: {
    title: "L'ère post-quantique commence par une étape",
    subtitle:
      "Faites l'évaluation gratuite et obtenez un plan personnalisé par IA en deux minutes.",
    primary: "Commencer l'évaluation gratuite",
    secondary: "Parler au Guide Quantique",
  },
  footer: {
    tagline: "La norme internationale de préparation quantique.",
    product: "Produit",
    company: "Entreprise",
    resources: "Ressources",
    legal: "Mentions légales",
    rights: "© 2025 IQCDL. Tous droits réservés.",
    disclaimer:
      "À des fins éducatives. IQCDL fournit des connaissances en informatique quantique et cryptographie post-quantique mais ne garantit ni emploi ni résultats spécifiques.",
    links: {
      program: "Présentation du programme",
      foundation: "Niveau Fondation",
      practitioner: "Niveau Praticien",
      assessment: "Évaluation de préparation",
      roadmap: "Feuille de route de transformation",
      standards: "Normes & accréditation",
      about: "À propos",
      contact: "Contact",
      portal: "Connexion au portail",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
    },
  },
  assistant: {
    title: "Guide Quantique",
    subtitle: "Votre assistant IA de préparation quantique",
    placeholder: "Posez une question sur la préparation, la PQC, la formation…",
    send: "Envoyer",
    open: "Demander au Guide Quantique",
    greeting:
      "Bonjour ! Je suis le Guide Quantique. Je peux vous aider à comprendre le risque quantique, planifier votre migration PQC ou choisir le bon parcours IQCDL. Que souhaitez-vous explorer ?",
    suggestions: [
      "Suis-je menacé par les ordinateurs quantiques ?",
      "Qu'est-ce que le théorème de Mosca ?",
      "Fondation ou Praticien — lequel me convient ?",
      "Comment démarrer une migration PQC ?",
    ],
    poweredLive: "Propulsé par Claude",
    poweredLocal: "Guide intégré",
    thinking: "Réflexion…",
    error: "Une erreur s'est produite. Veuillez réessayer.",
  },
  auth: {
    title: "Bon retour",
    subtitle: "Connectez-vous au portail IQCDL",
    email: "E-mail",
    password: "Mot de passe",
    role: "Se connecter en tant que",
    signIn: "Se connecter",
    signingIn: "Connexion…",
    demoHint: "Portail de démo — choisissez un rôle pour prévisualiser son espace.",
    useDemo: "Utiliser un compte de démo",
    invalid: "Identifiants invalides. Essayez un compte de démo ci-dessous.",
    roles: {
      admin: "Administrateur",
      chapter: "Propriétaire de chapitre",
      center: "Centre de formation",
      trainer: "Formateur",
      student: "Apprenant",
    },
    roleDesc: {
      admin: "Supervision complète de la plateforme, normes & accréditation",
      chapter: "Réseau régional/national de chapitres et centres",
      center: "Gérer cohortes, plannings & examens",
      trainer: "Dispenser les cours & suivre la progression",
      student: "Apprendre, s'entraîner & obtenir son certificat",
    },
  },
  dashboard: {
    welcome: "Bienvenue",
    signedInAs: "Connecté en tant que",
    overview: "Vue d'ensemble",
    quickActions: "Actions rapides",
    admin: {
      title: "Administration de la plateforme",
      metrics: ["Apprenants actifs", "Certifiés à ce jour", "Centres de formation", "Chapitres"],
      panels: ["Accréditation & normes", "Approbations de centres", "Intégrité des examens", "Analytique globale"],
    },
    chapter: {
      title: "Gestion du chapitre",
      metrics: ["Centres du chapitre", "Inscrits ce trimestre", "Taux de réussite", "Revenus (annuel)"],
      panels: ["Réseau de centres", "Campagnes régionales", "Accréditation des formateurs", "Reporting"],
    },
    center: {
      title: "Opérations du centre",
      metrics: ["Cohortes actives", "Examens à venir", "Formateurs", "Places vendues"],
      panels: ["Planifier une cohorte", "Inscrire des apprenants", "Commander des vouchers d'examen", "Certificats"],
    },
    trainer: {
      title: "Mes classes",
      metrics: ["Mes cohortes", "Apprenants", "Progression moy.", "Score blanc moy."],
      panels: ["Supports de cours", "Progression des apprenants", "Devoirs & labos", "Permanences"],
    },
    student: {
      title: "Mon apprentissage",
      metrics: ["Progression du cours", "Meilleur examen blanc", "Score de préparation", "Jours avant l'examen"],
      panels: ["Continuer l'apprentissage", "Examen blanc", "Évaluation de préparation", "Mon certificat"],
      progressLabel: "Progression du niveau Fondation",
    },
  },
  exam: {
    title: "Examen blanc Fondation",
    subtitle:
      "Un examen blanc chronométré à choix multiples aligné sur le programme Fondation IQCDL. Réussissez-le pour débloquer votre certificat.",
    start: "Démarrer l'examen",
    instructions:
      "Vous disposez d'un temps limité pour répondre à toutes les questions. Vous pouvez naviguer avant de soumettre.",
    timeLeft: "Temps restant",
    questionLabel: "Question",
    of: "sur",
    next: "Suivant",
    prev: "Précédent",
    submit: "Soumettre l'examen",
    answered: "répondu",
    passed: "Félicitations — réussi !",
    failed: "Presque — continuez à réviser",
    yourScore: "Votre score",
    passMark: "Seuil de réussite",
    passBody:
      "Vous avez atteint le seuil de réussite Fondation. Votre certificat est disponible dans le portail.",
    failBody:
      "Vous y êtes presque. Révisez le programme et les conseils du Guide Quantique, puis repassez l'examen.",
    retake: "Repasser l'examen",
    viewCertificate: "Voir mon certificat",
    backToDashboard: "Retour au tableau de bord",
    correct: "correct",
  },
  certificate: {
    title: "Certificat de réussite",
    presentedTo: "Ceci certifie que",
    completed: "a satisfait avec succès aux exigences du",
    program: "Permis International de Conduite en Informatique Quantique",
    issued: "Délivré le",
    expires: "Valable jusqu'au",
    credentialId: "Identifiant du titre",
    verify: "Vérifiez sur iqcdl.org/verify",
    download: "Télécharger / Imprimer",
    backToDashboard: "Retour au tableau de bord",
    lockedTitle: "Votre certificat est verrouillé",
    lockedBody:
      "Réussissez l'examen blanc Fondation pour débloquer et télécharger votre certificat.",
    goToExam: "Aller à l'examen",
    signatory: "Directeur, Conseil de certification IQCDL",
  },
  membership: {
    eyebrow: "Adhésion",
    title: "Rejoignez le réseau IQCDL",
    subtitle:
      "Cinq façons de participer — de l'apprenant à l'administrateur. Choisissez l'adhésion qui vous convient et postulez en quelques minutes.",
    applyTitle: "Comment postuler",
    steps: [
      "Choisissez votre niveau d'adhésion",
      "Créez votre compte portail ou connectez-vous",
      "Soyez approuvé et commencez à opérer",
    ],
    apply: "Postuler / Se connecter",
    cta: "Devenir membre",
  },
};

export default fr;
