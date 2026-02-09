
export enum AppSection {
  HOME = 'Accueil',
  LOGIN = 'Connexion',
  SIGNUP = 'Inscription',
  COMPANY_INFO = 'Entreprise',
  DIAGNOSTIC = 'Diagnostic',
  ACTION_PLAN = 'Plan d\'action',
  INDICATORS = 'Indicateurs',
  DASHBOARD = 'Dashboard',
  REPORT = 'Rapport'
}

export interface UserProfile {
  email: string;
  fullName: string;
  position: string;
  profession: string;
  department: string;
}

export interface CompanyInfo {
  name: string;
  sector: string;
  country: string;
  year: string;
  staffCount: string;
}

export interface IsoDomain {
  id: string;
  name: string;
  icon: string;
  questions: {
    text: string;
    recommendation: string;
  }[];
}

export interface ActionStep {
  id: string;
  label: string;
  completed: boolean;
}

export interface ActionTask {
  id: string;
  title: string;
  responsible: string;
  deadline: string;
  progress: number;
  status: 'En cours' | 'Terminé' | 'Retard';
  priority?: boolean;
  steps: ActionStep[];
}

export interface IndicatorValue {
  code: string;
  label: string;
  category: 'Environment' | 'Social' | 'Governance';
  value: string;
  unit: string;
}

export interface DiagnosticState {
  [domainId: string]: {
    [questionIndex: number]: number;
  };
}
