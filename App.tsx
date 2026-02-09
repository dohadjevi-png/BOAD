
import React, { useState, useEffect, useMemo } from 'react';
import { AppSection, ActionTask, IndicatorValue, DiagnosticState, CompanyInfo, IsoDomain, ActionStep, UserProfile } from './types';
import { ISO_DOMAINS, INITIAL_KPI_DATA, UEMOA_COUNTRIES } from './constants';
import * as Icons from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip
} from 'recharts';

// --- Auth Components ---

const LoginPage: React.FC<{ onLogin: (u: UserProfile) => void, onSwitch: () => void }> = ({ onLogin, onSwitch }) => {
  const [email, setEmail] = useState('');
  return (
    <div className="max-w-md mx-auto mt-20 p-10 bg-white rounded-2xl shadow-xl border border-gray-100 animate-fadeIn">
      <div className="text-center mb-10">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icons.Lock className="text-[#004d3d] w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Connexion</h2>
        <p className="text-gray-500 mt-2 text-sm font-medium">Accédez à votre espace BOAD Impact</p>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Identifiant (Email)</label>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all text-black font-bold placeholder-gray-400" 
            placeholder="votre@email.com" 
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Mot de passe</label>
          <input 
            type="password" 
            className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all text-black font-bold placeholder-gray-400" 
            placeholder="••••••••" 
          />
        </div>
        <button onClick={() => onLogin({ email, fullName: 'Utilisateur Démo', position: 'Expert RSE', profession: 'Analyste Stratégique', department: 'Développement Durable' })} className="w-full bg-[#004d3d] text-white py-3.5 rounded-xl font-bold hover:bg-green-800 transition-all shadow-lg active:scale-95 uppercase tracking-wider">
          Se connecter
        </button>
        <button onClick={onSwitch} className="w-full border border-[#004d3d] text-[#004d3d] py-3 rounded-xl font-bold hover:bg-green-50 transition-all mt-4">
          Créer un compte
        </button>
      </div>
    </div>
  );
};

const SignupPage: React.FC<{ onSignup: (u: UserProfile) => void, onSwitch: () => void }> = ({ onSignup, onSwitch }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({ 
    email: '', 
    fullName: '', 
    position: '', 
    profession: '', 
    department: '' 
  });

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-10 bg-white rounded-2xl shadow-xl border border-gray-100 animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{step === 1 ? 'Inscription' : 'Complétez votre profil'}</h2>
        <p className="text-gray-500 mt-2 text-sm font-medium">
          {step === 1 ? 'Créez vos identifiants' : 'Ces informations figureront sur vos rapports officiels'}
        </p>
      </div>
      
      {step === 1 ? (
        <form onSubmit={nextStep} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Professionnel</label>
            <input 
              required
              type="email" 
              value={profile.email} 
              onChange={e => setProfile({...profile, email: e.target.value})} 
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all text-black font-bold" 
              placeholder="organisation@boad.org" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Mot de passe</label>
            <input 
              required
              type="password" 
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all text-black font-bold" 
              placeholder="••••••••" 
            />
          </div>
          <button type="submit" className="w-full bg-[#004d3d] text-white py-3.5 rounded-xl font-bold hover:bg-green-800 transition-all shadow-lg uppercase tracking-wider">
            Continuer l'inscription
          </button>
        </form>
      ) : (
        <div className="space-y-5 animate-fadeIn">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Nom Complet</label>
            <input 
              type="text" 
              value={profile.fullName} 
              onChange={e => setProfile({...profile, fullName: e.target.value})} 
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all text-black font-bold" 
              placeholder="Prénom et Nom" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Poste occupé</label>
            <input 
              type="text" 
              value={profile.position} 
              onChange={e => setProfile({...profile, position: e.target.value})} 
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all text-black font-bold" 
              placeholder="Ex: Directeur RSE" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Métier / Profession</label>
            <input 
              type="text" 
              value={profile.profession} 
              onChange={e => setProfile({...profile, profession: e.target.value})} 
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all text-black font-bold" 
              placeholder="Ex: Analyste Environnemental" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Direction / Département</label>
            <input 
              type="text" 
              value={profile.department} 
              onChange={e => setProfile({...profile, department: e.target.value})} 
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all text-black font-bold" 
              placeholder="Ex: Département du Développement Durable" 
            />
          </div>
          <button 
            onClick={() => onSignup(profile)} 
            disabled={!profile.fullName || !profile.position}
            className="w-full bg-[#1b8e61] text-white py-3.5 rounded-xl font-bold hover:bg-[#157a52] transition-all shadow-lg uppercase tracking-wider disabled:opacity-50"
          >
            Valider mon profil
          </button>
          <button onClick={() => setStep(1)} className="w-full text-gray-400 text-xs font-bold hover:underline">Retourner à l'étape précédente</button>
        </div>
      )}
      <p className="text-center text-sm text-gray-500 pt-6">
        Déjà inscrit ?
        <button onClick={onSwitch} className="ml-2 text-[#004d3d] font-bold hover:underline">Se connecter</button>
      </p>
    </div>
  );
};

// --- Main Components ---

const CompanyInfoPage: React.FC<{ onSave: (c: CompanyInfo) => void }> = ({ onSave }) => {
  const [info, setInfo] = useState<CompanyInfo>({ name: '', sector: '', country: '', year: '2025', staffCount: '271' });
  return (
    <div className="max-w-2xl mx-auto bg-white p-12 rounded-2xl shadow-xl border border-gray-100 animate-fadeIn">
      <h2 className="text-3xl font-bold text-[#004d3d] mb-4">Nouvelle Évaluation</h2>
      <p className="text-gray-500 mb-10 text-sm font-medium">Renseignez les détails pour le rapport de performance.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-2">
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Nom de l'organisation</label>
          <input 
            type="text" 
            value={info.name} 
            onChange={e => setInfo({...info, name: e.target.value})} 
            className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-green-500 font-bold text-black" 
            placeholder="Nom officiel" 
          />
        </div>
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Secteur</label>
          <select value={info.sector} onChange={e => setInfo({...info, sector: e.target.value})} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-green-500 font-bold text-black">
            <option value="">Sélectionner...</option>
            <option value="Banque & Finance">Banque & Finance</option>
            <option value="Agro-industrie">Agro-industrie</option>
            <option value="Infrastructures">Infrastructures</option>
            <option value="Énergie">Énergie</option>
            <option value="Services">Services</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Pays</label>
          <select value={info.country} onChange={e => setInfo({...info, country: e.target.value})} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-green-500 font-bold text-black">
            <option value="">Choisir...</option>
            {UEMOA_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Exercice</label>
          <input type="number" value={info.year} onChange={e => setInfo({...info, year: e.target.value})} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-black" />
        </div>
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Effectif</label>
          <input type="number" value={info.staffCount} onChange={e => setInfo({...info, staffCount: e.target.value})} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-black" />
        </div>
      </div>
      <button onClick={() => onSave(info)} className="mt-12 w-full bg-[#1b8e61] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#157a52] transition-all shadow-lg uppercase tracking-widest">
        Valider et Continuer
      </button>
    </div>
  );
};

const HomePage: React.FC<{ company: CompanyInfo, onStart: () => void }> = ({ company, onStart }) => (
  <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 flex flex-col lg:flex-row gap-12 animate-fadeIn">
    <div className="flex-1">
      <h1 className="text-4xl font-black text-[#1b8e61] mb-8 tracking-tight">Tableau de Pilotage RSE</h1>
      <p className="text-gray-600 mb-10 text-lg leading-relaxed font-medium">
        Évaluez votre maturité selon l'ISO 26000 et générez automatiquement vos plans de progrès. 
        Suivez vos indicateurs de performance extra-financière en temps réel.
      </p>
      <div className="space-y-4 mb-10">
        {[
          "Diagnostic ISO 26000 détaillé",
          "Génération automatique de plans d'actions",
          "Suivi granulaire des étapes de réalisation",
          "Reporting de performance automatisé"
        ].map((item, i) => (
          <div key={i} className="flex items-center space-x-3 text-gray-700 font-bold">
            <Icons.CheckCircle2 className="text-green-500 w-5 h-5" />
            <span>{item}</span>
          </div>
        ))}
      </div>
      <button onClick={onStart} className="bg-[#1b8e61] text-white px-12 py-4 rounded-2xl font-black text-lg hover:bg-[#157a52] shadow-xl active:scale-95 uppercase tracking-widest transition-all">
        Lancer le Diagnostic
      </button>
    </div>
    <div className="w-full lg:w-96 shrink-0 bg-gray-50 p-8 rounded-[2rem] border border-gray-100 flex flex-col justify-center text-center">
       <div className="bg-[#cc3333] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Icons.Target className="text-white w-8 h-8" />
       </div>
       <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Effectif Identifié</p>
       <p className="text-4xl font-black text-gray-900 mb-4">{company.staffCount} Agents</p>
       <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="bg-red-500 h-full w-2/3"></div>
       </div>
    </div>
  </div>
);

// --- Diagnostic Module ---

const DiagnosticPage: React.FC<{ 
  state: DiagnosticState, 
  onUpdate: (d: string, q: number, v: number) => void,
  onFinish: () => void 
}> = ({ state, onUpdate, onFinish }) => {
  const [activeDomainId, setActiveDomainId] = useState<string | null>(null);

  const activeDomain = ISO_DOMAINS.find(d => d.id === activeDomainId);

  const completedDomainsCount = useMemo(() => {
    return ISO_DOMAINS.filter(d => Object.keys(state[d.id] || {}).length === 7).length;
  }, [state]);

  if (activeDomain) {
    return (
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 animate-fadeIn max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10 border-b border-gray-50 pb-6">
          <div className="flex items-center space-x-4">
            <button onClick={() => setActiveDomainId(null)} className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-gray-500">
              <Icons.ChevronLeft size={24} />
            </button>
            <div>
              <h2 className="text-2xl font-black text-[#1b8e61]">{activeDomain.name}</h2>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Questions de maturité</p>
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-2xl text-[#1b8e61]">
            {React.createElement((Icons as any)[activeDomain.icon] || Icons.HelpCircle, { size: 24 })}
          </div>
        </div>

        <div className="space-y-6">
          {activeDomain.questions.map((q, idx) => (
            <div key={idx} className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 group hover:bg-white transition-all">
              <p className="flex-1 text-black font-bold leading-relaxed">{q.text}</p>
              <div className="flex space-x-2">
                {[0, 1, 2, 3, 4].map(v => (
                  <button
                    key={v}
                    onClick={() => onUpdate(activeDomain.id, idx, v)}
                    className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center transition-all ${
                      state[activeDomain.id]?.[idx] === v
                        ? 'bg-[#1b8e61] text-white shadow-lg scale-110'
                        : 'bg-white text-gray-400 hover:text-green-600 border border-gray-100'
                    }`}
                  >
                    <span className="text-[9px] font-black uppercase mb-0.5">{v}</span>
                    <span className="text-[7px] font-black opacity-60">
                      {v === 0 ? 'Inex' : v === 1 ? 'Faib' : v === 2 ? 'Emer' : v === 3 ? 'Stru' : 'Exem'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button onClick={() => setActiveDomainId(null)} className="bg-[#1b8e61] text-white px-12 py-4 rounded-2xl font-black text-lg hover:bg-[#157a52] transition-all flex items-center space-x-4 shadow-xl active:scale-95 uppercase tracking-widest">
            <Icons.Check className="w-6 h-6" />
            <span>Valider les réponses</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-4xl font-black text-[#1b8e61] mb-4">Diagnostic RSE</h2>
        <p className="text-gray-500 font-bold">Complétez chaque domaine de la liste pour générer votre plan de progrès.</p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-50">
          {ISO_DOMAINS.map((domain) => {
            const count = Object.keys(state[domain.id] || {}).length;
            const progress = Math.round((count / 7) * 100);
            return (
              <div 
                key={domain.id} 
                onClick={() => setActiveDomainId(domain.id)}
                className="p-6 flex flex-col md:flex-row items-center gap-6 hover:bg-green-50/30 cursor-pointer transition-all group"
              >
                <div className="p-4 bg-green-50 rounded-2xl text-[#1b8e61] group-hover:bg-[#1b8e61] group-hover:text-white transition-all shadow-sm">
                  {React.createElement((Icons as any)[domain.icon] || Icons.HelpCircle, { size: 24 })}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-black text-gray-900 group-hover:text-green-800 transition-colors">{domain.name}</h3>
                  <div className="mt-2 flex items-center space-x-4">
                     <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#1b8e61] transition-all duration-700" style={{ width: `${progress}%` }}></div>
                     </div>
                     <span className="text-[10px] font-black text-gray-400 uppercase w-20 text-right">{count}/7 Questions</span>
                  </div>
                </div>
                <Icons.ChevronRight className="text-gray-200 group-hover:text-green-500 transition-all group-hover:translate-x-1" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-center mt-12 space-y-4">
        <div className="flex items-center space-x-3 text-sm font-bold text-gray-400">
           <Icons.Info size={16} />
           <span>{completedDomainsCount} / 7 domaines entièrement complétés</span>
        </div>
        <button 
          onClick={onFinish} 
          className={`px-16 py-6 rounded-[2rem] font-black text-xl shadow-2xl transition-all active:scale-95 uppercase tracking-widest flex items-center space-x-4 ${
            completedDomainsCount === 7 
              ? 'bg-[#004d3d] text-white hover:bg-green-900' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
           <Icons.Zap />
           <span>Valider et Voir le Plan d'Action</span>
        </button>
      </div>
    </div>
  );
};

// --- Action Plan Module ---

const ActionPlanPage: React.FC<{ 
  tasks: ActionTask[], 
  onDelete: (id: string) => void,
  onUpdateStep: (taskId: string, stepId: string, completed: boolean) => void,
  onTogglePriority: (id: string) => void
}> = ({ tasks, onDelete, onUpdateStep, onTogglePriority }) => {
  const rate = tasks.length > 0 ? Math.round(tasks.reduce((a, t) => a + t.progress, 0) / tasks.length) : 0;
  return (
    <div className="space-y-10 animate-fadeIn max-w-5xl mx-auto">
      <div className="bg-[#1b8e61] p-10 rounded-[2.5rem] text-white flex flex-col md:flex-row justify-between items-center shadow-2xl gap-8">
        <div>
          <h2 className="text-4xl font-black mb-2 uppercase tracking-tight">Plan d'action</h2>
          <p className="text-green-50 font-bold opacity-80">Suivez la réalisation de vos recommandations stratégiques.</p>
        </div>
        <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md border border-white/20 text-center min-w-[200px]">
           <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">Réalisation Globale</p>
           <p className="text-5xl font-black">{rate}%</p>
        </div>
      </div>

      <div className="space-y-6">
        {tasks.map(t => (
          <div key={t.id} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 group">
             <div className="flex flex-col md:flex-row justify-between gap-6 mb-8 border-b border-gray-50 pb-6">
                <div className="flex items-start space-x-4">
                   <button onClick={() => onTogglePriority(t.id)} className={`p-2 rounded-xl transition-all ${t.priority ? 'bg-amber-100 text-amber-600' : 'bg-gray-50 text-gray-300'}`}>
                      <Icons.Star size={20} fill={t.priority ? 'currentColor' : 'none'} />
                   </button>
                   <div>
                      <h3 className="text-xl font-black text-gray-900 group-hover:text-green-700 transition-colors">{t.title}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-[10px] font-black uppercase text-gray-400">
                         <span><Icons.User size={12} className="inline mr-1"/> {t.responsible}</span>
                         <span><Icons.Calendar size={12} className="inline mr-1"/> {t.deadline}</span>
                      </div>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-3xl font-black text-[#1b8e61] mb-1">{t.progress}%</p>
                   <button onClick={() => onDelete(t.id)} className="text-[10px] font-black uppercase text-red-400 hover:text-red-600 transition-colors">Supprimer l'action</button>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {t.steps.map(s => (
                  <label key={s.id} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-green-50 transition-colors group/step">
                     <input type="checkbox" checked={s.completed} onChange={e => onUpdateStep(t.id, s.id, e.target.checked)} className="peer hidden" />
                     <div className="w-6 h-6 rounded-lg border-2 border-gray-200 peer-checked:bg-[#1b8e61] peer-checked:border-[#1b8e61] flex items-center justify-center transition-all">
                        <Icons.Check className="text-white opacity-0 peer-checked:opacity-100 w-4 h-4" />
                     </div>
                     <span className="text-sm font-bold text-gray-600 group-hover/step:text-green-800">{s.label}</span>
                  </label>
                ))}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Report Module ---

const ReportPage: React.FC<{ 
  diagState: DiagnosticState, 
  kpis: IndicatorValue[],
  tasks: ActionTask[],
  company: CompanyInfo,
  user: UserProfile
}> = ({ diagState, kpis, tasks, company, user }) => {
  const radarData = useMemo(() => {
    return ISO_DOMAINS.map(domain => {
      const answers = Object.values(diagState[domain.id] || {}) as number[];
      const avg = answers.length > 0 ? answers.reduce((a, b) => a + b, 0) / answers.length : 0;
      return { subject: domain.name, A: avg, fullMark: 4 };
    });
  }, [diagState]);

  const score = useMemo(() => {
    let total = 0, count = 0;
    Object.values(diagState).forEach(domain => {
      Object.values(domain).forEach(val => { total += val; count++; });
    });
    return count > 0 ? (total / count).toFixed(1) : "0.0";
  }, [diagState]);

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fadeIn" id="printable-report">
      <div className="bg-white p-16 shadow-2xl rounded-[3rem] border border-gray-100 print:shadow-none print:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 border-b-4 border-[#004d3d] pb-10">
          <div className="flex items-center space-x-6">
             <div className="bg-[#cc3333] p-4 rounded-3xl shadow-xl">
                <Icons.Target className="text-white w-12 h-12" />
             </div>
             <div>
                <h1 className="text-5xl font-black text-gray-900 uppercase tracking-tighter">RAPPORT RSE</h1>
                <p className="text-2xl font-bold text-[#1b8e61] tracking-widest">{company.name}</p>
             </div>
          </div>
          <div className="text-center md:text-right mt-10 md:mt-0">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Score Maturité Global</p>
             <span className="text-8xl font-black text-[#004d3d] leading-none">{score}</span>
             <p className="text-[10px] font-black text-green-700 bg-green-50 px-6 py-2.5 rounded-full mt-4 uppercase tracking-widest inline-block border border-green-100">BOAD IMPACT RSE</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
           <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8 border-l-4 border-[#1b8e61] pl-3">Détails de l'Expert & Entité</h3>
              <div className="grid grid-cols-2 gap-y-6 text-sm">
                <div><p className="text-gray-400 font-bold uppercase text-[9px] mb-1">Nom Complet</p><p className="font-black text-black">{user.fullName}</p></div>
                <div><p className="text-gray-400 font-bold uppercase text-[9px] mb-1">Email</p><p className="font-black text-black">{user.email}</p></div>
                <div><p className="text-gray-400 font-bold uppercase text-[9px] mb-1">Poste</p><p className="font-black text-black">{user.position}</p></div>
                <div><p className="text-gray-400 font-bold uppercase text-[9px] mb-1">Direction</p><p className="font-black text-black">{user.department}</p></div>
                <div><p className="text-gray-400 font-bold uppercase text-[9px] mb-1">Organisation</p><p className="font-black text-black">{company.name}</p></div>
                <div><p className="text-gray-400 font-bold uppercase text-[9px] mb-1">Pays</p><p className="font-black text-black">{company.country}</p></div>
              </div>
           </div>
           <div className="h-64 flex items-center justify-center bg-white rounded-[2.5rem] border border-gray-50 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{fontSize: 8, fontWeight: 900, fill: '#64748b'}} />
                  <Radar name="Performance" dataKey="A" stroke="#1b8e61" strokeWidth={3} fill="#1b8e61" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="space-y-16">
           <div>
              <h3 className="text-xl font-black text-gray-900 mb-8 border-l-4 border-amber-400 pl-4 uppercase tracking-tight">Actions Prioritaires</h3>
              <div className="grid grid-cols-1 gap-4">
                 {tasks.filter(t => t.priority).map(t => (
                   <div key={t.id} className="p-6 bg-amber-50/50 rounded-2xl border border-amber-100 flex justify-between items-center group">
                      <span className="font-bold text-black text-sm">{t.title}</span>
                      <span className="text-[10px] font-black bg-white px-3 py-1 rounded-full text-amber-700 shadow-sm border border-amber-50 uppercase tracking-widest">{t.progress}% Réalisé</span>
                   </div>
                 ))}
              </div>
           </div>

           <div>
              <h3 className="text-xl font-black text-gray-900 mb-8 border-l-4 border-blue-500 pl-4 uppercase tracking-tight">Indicateurs de Performance</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                 {kpis.map(k => (
                   <div key={k.code} className="p-6 bg-blue-50/30 rounded-2xl border border-blue-50 flex justify-between items-center">
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{k.label}</span>
                      <div className="text-right">
                         <span className="text-2xl font-black text-black">{k.value}</span>
                         <span className="text-[10px] font-black text-blue-700 ml-1 uppercase">{k.unit}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="mt-24 pt-10 border-t border-gray-100 text-center print:hidden">
           <button onClick={() => window.print()} className="bg-[#004d3d] text-white px-20 py-6 rounded-[2rem] font-black text-xl hover:bg-green-900 shadow-2xl transition-all active:scale-95 uppercase tracking-widest flex items-center space-x-4 mx-auto">
              <Icons.Printer size={28} />
              <span>Générer le PDF Officiel</span>
           </button>
           <p className="text-gray-400 text-xs font-black uppercase tracking-[0.6em] mt-10">BOAD IMPACT RSE — RAPPORT DE PERFORMANCE</p>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('boad_user_profile');
    return saved ? JSON.parse(saved) : null;
  });
  const [isSignup, setIsSignup] = useState(false);
  const [currentSection, setCurrentSection] = useState<AppSection>(AppSection.HOME);
  const [company, setCompany] = useState<CompanyInfo>(() => {
    const saved = localStorage.getItem('boad_company');
    return saved ? JSON.parse(saved) : { name: '', sector: '', country: '', year: '2025', staffCount: '271' };
  });
  const [diagState, setDiagState] = useState<DiagnosticState>(() => {
    const saved = localStorage.getItem('boad_diag');
    return saved ? JSON.parse(saved) : {};
  });
  const [tasks, setTasks] = useState<ActionTask[]>(() => {
    const saved = localStorage.getItem('boad_tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [kpis, setKpis] = useState<IndicatorValue[]>(INITIAL_KPI_DATA);

  useEffect(() => {
    localStorage.setItem('boad_diag', JSON.stringify(diagState));
    localStorage.setItem('boad_tasks', JSON.stringify(tasks));
    localStorage.setItem('boad_company', JSON.stringify(company));
    localStorage.setItem('boad_user_profile', JSON.stringify(user));
  }, [diagState, tasks, company, user]);

  const handleLogin = (profile: UserProfile) => {
    setUser(profile);
    setCurrentSection(AppSection.COMPANY_INFO);
  };

  const generateAutomaticPlan = () => {
    const newTasks: ActionTask[] = [];
    ISO_DOMAINS.forEach(domain => {
      domain.questions.forEach((q, idx) => {
        const val = diagState[domain.id]?.[idx];
        if (val !== undefined && val <= 1) {
          newTasks.push({
            id: `auto-${domain.id}-${idx}`,
            title: q.recommendation,
            responsible: user?.fullName || "Direction RSE",
            deadline: "2025-12-31",
            progress: 0,
            status: 'En cours',
            priority: true,
            steps: [
              { id: '1', label: 'Étude & Cadrage', completed: false },
              { id: '2', label: 'Implémentation locale', completed: false },
              { id: '3', label: 'Suivi post-action', completed: false }
            ]
          });
        }
      });
    });
    setTasks(newTasks);
    setCurrentSection(AppSection.ACTION_PLAN);
  };

  const updateActionStep = (taskId: string, stepId: string, completed: boolean) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const newSteps = t.steps.map(s => s.id === stepId ? { ...s, completed } : s);
        const completedSteps = newSteps.filter(s => s.completed).length;
        const newProgress = Math.round((completedSteps / newSteps.length) * 100);
        return {
          ...t, steps: newSteps, progress: newProgress,
          status: newProgress === 100 ? 'Terminé' : 'En cours'
        };
      }
      return t;
    }));
  };

  const renderContent = () => {
    if (!user) {
      return isSignup 
        ? <SignupPage onSignup={handleLogin} onSwitch={() => setIsSignup(false)} /> 
        : <LoginPage onLogin={handleLogin} onSwitch={() => setIsSignup(true)} />;
    }
    switch (currentSection) {
      case AppSection.COMPANY_INFO: return <CompanyInfoPage onSave={c => { setCompany(c); setCurrentSection(AppSection.HOME); }} />;
      case AppSection.HOME: return <HomePage company={company} onStart={() => setCurrentSection(AppSection.DIAGNOSTIC)} />;
      case AppSection.DIAGNOSTIC: return <DiagnosticPage state={diagState} onUpdate={(d,q,v) => setDiagState(p => ({...p, [d]: {...(p[d]||{}), [q]:v}}))} onFinish={generateAutomaticPlan} />;
      case AppSection.ACTION_PLAN: return <ActionPlanPage tasks={tasks} onDelete={id => setTasks(tasks.filter(t=>t.id!==id))} onUpdateStep={updateActionStep} onTogglePriority={id => setTasks(tasks.map(t=>t.id===id?{...t,priority:!t.priority}:t))} />;
      case AppSection.REPORT: return <ReportPage diagState={diagState} kpis={kpis} tasks={tasks} company={company} user={user} />;
      case AppSection.INDICATORS: return (
        <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 animate-fadeIn">
          <h2 className="text-3xl font-black text-[#1b8e61] mb-10 uppercase tracking-tight">Saisie des Indicateurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {kpis.map(k => (
              <div key={k.code} className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{k.label} ({k.code})</label>
                <div className="flex items-center bg-gray-50 border border-gray-200 p-4 rounded-2xl focus-within:bg-white focus-within:ring-2 focus-within:ring-green-500 transition-all">
                  <input type="text" value={k.value} onChange={e => setKpis(kpis.map(ki => ki.code === k.code ? {...ki, value: e.target.value} : ki))} className="bg-transparent flex-1 outline-none font-black text-black text-lg" />
                  <span className="text-xs font-black text-green-700 bg-green-50 px-3 py-1 rounded-lg ml-2">{k.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      default: return <HomePage company={company} onStart={() => setCurrentSection(AppSection.DIAGNOSTIC)} />;
    }
  };

  const NavItem = ({ s, icon }: { s: AppSection, icon: any }) => (
    <button
      onClick={() => setCurrentSection(s)}
      className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all flex items-center space-x-3 ${
        currentSection === s ? 'bg-white text-[#004d3d] shadow-2xl scale-105' : 'text-green-50 hover:bg-white/10'
      }`}
    >
      {React.createElement(icon, { size: 16 })}
      <span>{s}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <header className="bg-[#004d3d] text-white shadow-xl h-20 flex items-center sticky top-0 z-50 print:hidden border-b border-green-800/50">
        <div className="max-w-[1440px] mx-auto w-full px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => setCurrentSection(AppSection.HOME)}>
            <div className="bg-white p-2 rounded-xl group-hover:rotate-12 transition-transform duration-500 shadow-xl">
              <Icons.Target className="text-[#004d3d] w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter leading-none uppercase">BOAD IMPACT RSE</span>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-green-300">Management Durable</span>
            </div>
          </div>
          {user && (
            <nav className="flex items-center space-x-2">
              <NavItem s={AppSection.DIAGNOSTIC} icon={Icons.ClipboardCheck} />
              <NavItem s={AppSection.ACTION_PLAN} icon={Icons.ListTodo} />
              <NavItem s={AppSection.INDICATORS} icon={Icons.BarChart3} />
              <NavItem s={AppSection.REPORT} icon={Icons.FileText} />
              <div className="w-[1px] h-8 bg-green-700/50 mx-4"></div>
              <button onClick={() => { setUser(null); localStorage.clear(); window.location.reload(); }} className="p-3 bg-green-900/50 rounded-xl hover:bg-red-600 transition-all text-white">
                <Icons.LogOut size={18} />
              </button>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-[1440px] mx-auto w-full px-8 py-12">
        {renderContent()}
      </main>

      <footer className="bg-white border-t border-gray-100 py-16 print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center space-y-6">
           <div className="flex items-center space-x-4 opacity-40 grayscale contrast-150">
              <Icons.Target className="text-[#004d3d] w-8 h-8" />
              <span className="font-black tracking-tighter text-2xl text-gray-900 uppercase">BOAD IMPACT RSE</span>
           </div>
           <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.5em] text-center max-w-xl leading-loose">
             Banque Ouest Africaine de Développement — Plateforme de pilotage stratégique de l'impact sociétal
           </p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.6s cubic-bezier(0.2, 1, 0.3, 1) forwards; }
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
          main { padding: 0 !important; max-width: 100% !important; margin: 0 !important; }
          header { display: none !important; }
          #printable-report { margin: 0 !important; border: none !important; box-shadow: none !important; padding: 0 !important; }
        }
      `}</style>
    </div>
  );
};

export default App;
