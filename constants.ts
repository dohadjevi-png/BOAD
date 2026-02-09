
import { IsoDomain, IndicatorValue } from './types';

export const UEMOA_COUNTRIES = [
  "Bénin", "Burkina Faso", "Côte d'Ivoire", "Guinée-Bissau", 
  "Mali", "Niger", "Sénégal", "Togo"
];

export const ISO_DOMAINS: IsoDomain[] = [
  {
    id: 'gov',
    name: 'Gouvernance',
    icon: 'Gavel',
    questions: [
      { text: "L'organisation dispose-t-elle d'une politique RSE formalisée et adoptée par la direction ?", recommendation: "Rédiger et faire valider une charte RSE engageant la direction." },
      { text: "Existe-t-il un mécanisme de concertation avec les parties prenantes externes ?", recommendation: "Mettre en place un comité de liaison avec les parties prenantes." },
      { text: "Les objectifs RSE sont-ils suivis régulièrement par le Conseil d'Administration ?", recommendation: "Intégrer le suivi RSE à l'ordre du jour permanent du CA." },
      { text: "Existe-t-il un code de conduite éthique diffusé à tous les agents ?", recommendation: "Diffuser et faire signer le code de conduite éthique." },
      { text: "La structure assure-t-elle une transparence financière totale ?", recommendation: "Publier un rapport annuel de transparence certifié." },
      { text: "Dispositif anti-corruption : existe-t-il une cartographie des risques ?", recommendation: "Réaliser une cartographie des risques de corruption." },
      { text: "Responsabilité : existe-t-il un responsable RSE dédié ?", recommendation: "Nommer un Directeur ou Responsable RSE officiel." }
    ]
  },
  {
    id: 'hr',
    name: 'Droits de l\'Homme',
    icon: 'Users',
    questions: [
      { text: "Une politique d'égalité et de non-discrimination est-elle appliquée au recrutement ?", recommendation: "Mettre en œuvre une politique RH inclusive et non discriminatoire." },
      { text: "L'organisation respecte-t-elle la liberté d'association syndicale ?", recommendation: "Formaliser le respect du dialogue social et syndical." },
      { text: "Prévention du travail forcé/enfants : audit des fournisseurs ?", recommendation: "Inclure des clauses sociales strictes dans les contrats fournisseurs." },
      { text: "Existe-t-il un mécanisme interne de réclamation/alerte ?", recommendation: "Installer une plateforme d'alerte éthique sécurisée." },
      { text: "Les données personnelles des agents sont-elles protégées ?", recommendation: "Nommer un délégué à la protection des données." },
      { text: "Accessibilité : les locaux sont-ils adaptés aux PMR ?", recommendation: "Mettre aux normes d'accessibilité les agences physiques." },
      { text: "Sensibilisation : les agents sont-ils formés aux droits humains ?", recommendation: "Organiser des sessions de sensibilisation aux droits de l'homme." }
    ]
  },
  {
    id: 'lab',
    name: 'Relations & conditions de travail',
    icon: 'Briefcase',
    questions: [
      { text: "Des actions régulières de prévention santé sont-elles menées ?", recommendation: "Lancer un plan de prévention santé au travail." },
      { text: "Plan de formation : chaque agent bénéficie-t-il de formations annuelles ?", recommendation: "Allouer un budget formation équitable par collaborateur." },
      { text: "Hygiène & Sécurité : port des équipements respecté ?", recommendation: "Renforcer les contrôles de sécurité sur site." },
      { text: "Protection sociale : couverture santé pour tous ?", recommendation: "Garantir une assurance santé optimale pour l'ensemble du personnel." },
      { text: "Dialogue social : réunions CSE/délégués régulières ?", recommendation: "Planifier des instances de concertation mensuelles." },
      { text: "Équilibre vie pro/vie privée : politique de déconnexion ?", recommendation: "Rédiger une charte du bon usage des outils numériques." },
      { text: "Bien-être : espaces de repos aménagés ?", recommendation: "Aménager des salles de détente et de convivialité." }
    ]
  },
  {
    id: 'env',
    name: 'Environnement',
    icon: 'Leaf',
    questions: [
      { text: "Mesures de réduction de la consommation électrique suivies ?", recommendation: "Installer des minuteries et passer à l'éclairage LED." },
      { text: "Actions de protection ou de compensation écologique (reboisement) ?", recommendation: "Financer un projet de restauration forestière locale." },
      { text: "Gestion des déchets : tri sélectif en place ?", recommendation: "Mettre en place des bacs de tri et un circuit de recyclage papier." },
      { text: "Utilisation durable : réduction de l'usage du papier ?", recommendation: "Digitaliser 100% des processus administratifs." },
      { text: "Émissions de gaz à effet de serre : bilan carbone réalisé ?", recommendation: "Effectuer un bilan carbone Scope 1, 2 et 3." },
      { text: "Consommation d'eau : dispositifs d'économie installés ?", recommendation: "Installer des robinets à arrêt automatique." },
      { text: "Mobilité : encouragement au covoiturage ou transport propre ?", recommendation: "Mettre en place un plan de mobilité durable." }
    ]
  },
  {
    id: 'fair',
    name: 'Loyauté des pratiques',
    icon: 'ShieldCheck',
    questions: [
      { text: "Actions anti-corruption : formation des agents ?", recommendation: "Former les équipes achats aux risques de corruption." },
      { text: "Respect des délais de paiement fournisseurs ?", recommendation: "Optimiser les processus de règlement pour payer à 30 jours." },
      { text: "Critères RSE inclus dans les appels d'offres ?", recommendation: "Noter la performance RSE des fournisseurs (Poids 15%)." },
      { text: "Protection de la propriété intellectuelle ?", recommendation: "Renforcer les clauses de confidentialité et brevets." },
      { text: "Marketing responsable : publicité honnête ?", recommendation: "Adopter une charte de communication responsable." },
      { text: "Loyauté de la concurrence respectée ?", recommendation: "Interdire toute pratique d'entente illégale." },
      { text: "Données clients : cybersécurité renforcée ?", recommendation: "Réaliser un audit de pénétration informatique annuel." }
    ]
  },
  {
    id: 'cons',
    name: 'Questions consommateurs',
    icon: 'ShoppingCart',
    questions: [
      { text: "Information claire sur les produits et services ?", recommendation: "Améliorer la transparence des fiches produits." },
      { text: "Protection de la santé et sécurité des clients ?", recommendation: "Mettre en œuvre un contrôle qualité rigoureux." },
      { text: "Consommation durable encouragée auprès des clients ?", recommendation: "Lancer des produits de 'Finance Verte' dédiés." },
      { text: "SAV : gestion rapide des réclamations clients ?", recommendation: "S'engager sur un délai de réponse client < 48h." },
      { text: "Éducation : sensibilisation client au DD ?", recommendation: "Organiser des webinaires clients sur l'impact." },
      { text: "Protection de la vie privée des clients ?", recommendation: "Mettre à jour les mentions légales de protection des données." },
      { text: "Accessibilité des services bancaires pour tous ?", recommendation: "Faciliter l'accès aux services pour les non-voyants/malentendants." }
    ]
  },
  {
    id: 'comm',
    name: 'Communauté & dév. local',
    icon: 'Globe',
    questions: [
      { text: "Emploi local : priorité aux agents de la zone UEMOA ?", recommendation: "Formaliser la priorité au recrutement local qualifié." },
      { text: "Soutien aux infrastructures locales ?", recommendation: "Contribuer au financement d'écoles ou de centres de santé." },
      { text: "Mécénat : soutien aux associations culturelles ?", recommendation: "Allouer un budget de mécénat pour l'art africain." },
      { text: "Dév. économique : soutien aux PME locales ?", recommendation: "Créer un fonds de garantie pour les start-ups locales." },
      { text: "Dialogue avec les communautés hôtes ?", recommendation: "Organiser des forums de discussion avec les riverains." },
      { text: "Soutien à l'éducation et la culture ?", recommendation: "Offrir des bourses d'études aux étudiants méritants." },
      { text: "Investissement social : projets à fort impact ?", recommendation: "Privilégier les projets à haute intensité de main d'œuvre." }
    ]
  }
];

export const INITIAL_KPI_DATA: IndicatorValue[] = [
  { code: 'ENV1', label: 'Consommation électrique', category: 'Environment', value: '15000', unit: 'kWh' },
  { code: 'ENV2', label: 'Émissions CO2', category: 'Environment', value: '450', unit: 'tCO2e' },
  { code: 'SOC1', label: 'Effectif total', category: 'Social', value: '271', unit: 'agents' },
  { code: 'SOC2', label: 'Parité Femmes/Hommes', category: 'Social', value: '42', unit: '%' },
  { code: 'GOV1', label: 'Comité RSE actif', category: 'Governance', value: 'Oui', unit: 'bool' },
];
