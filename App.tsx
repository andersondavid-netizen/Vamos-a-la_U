
import React, { useState } from 'react';
import { 
  Menu, 
  LogOut, 
  ClipboardCheck, 
  BookOpen, 
  University, 
  Calendar,
  AlertCircle,
  Lock,
  GraduationCap,
  ArrowRight,
  User as UserIcon,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  MapPin,
  CreditCard,
  BadgePercent,
  Search,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppStep, User, Test, TestResult } from './types';
import { GraduationIcons, SURVEY_QUESTIONS, PSYCHO_TESTS } from './constants';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { TestEngine } from './components/TestEngine';
import { ResultsView } from './components/ResultsView';

const MotionDiv = motion.div as any;

const TUTORS = [
  {
    id: 1,
    name: "Anderson Hernandez",
    role: "Psicólogo",
    photo: "https://i.pravatar.cc/150?u=anderson",
    desc: "Psicólogo especializado en orientación vocacional. Con experiencia práctica, Anderson te guiará con consejos reales sobre la vida universitaria y los retos académicos."
  },
  {
    id: 2,
    name: "Helio Fabio",
    role: "Psicólogo",
    photo: "https://i.pravatar.cc/150?u=helio",
    desc: "Psicólogo apasionado por el desarrollo personal. Su entusiasmo y dedicación te motivarán a entender el compromiso necesario para triunfar en tu carrera."
  },
  {
    id: 3,
    name: "Carol Quintero",
    role: "Psicóloga",
    photo: "https://i.pravatar.cc/150?u=carol",
    desc: "Psicóloga empática y cercana. Carol te ayudará a organizar tus ideas, manejar el estrés pre-universitario y encontrar tu verdadera vocación con paciencia."
  },
  {
    id: 4,
    name: "Vanessa Morales",
    role: "Psicóloga",
    photo: "",
    desc: "Psicóloga experta en orientación vocacional. Te acompañará paso a paso en el proceso de descubrir tus habilidades y pasiones para elegir la carrera ideal para ti."
  }
];

const UNIVERSITIES_BOGOTA = [
  {
    id: 'unal',
    name: "Universidad Nacional de Colombia",
    type: "Pública",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Escudo_de_la_Universidad_Nacional_de_Colombia.svg/1200px-Escudo_de_la_Universidad_Nacional_de_Colombia.svg.png",
    description: "La institución educativa más importante del país con enfoque en investigación.",
    costRange: "Según estrato y PBM (Puntaje Básico de Matrícula)",
    programs: ["Medicina", "Ingeniería Civil", "Derecho", "Artes Plásticas", "Física"],
    support: ["Matrícula Cero (Política de Gratuidad)", "Becas de Posgrado", "Apoyos alimentarios y transporte"],
    scholarships: "Excelencia Académica, Mejores Bachilleres, Programa PAES."
  },
  {
    id: 'uniandes',
    name: "Universidad de los Andes",
    type: "Privada",
    logo: "https://uniandes.edu.co/sites/default/files/logo-uniandes.png",
    description: "Líder en excelencia académica y redes internacionales.",
    costRange: "$20M - $32M por semestre",
    programs: ["Administración", "Ingeniería de Sistemas", "Economía", "Diseño", "Arquitectura"],
    support: ["Quiero Estudiar (Beca 95-100%)", "Préstamos condonables", "Fondo para transporte"],
    scholarships: "Beca Bachiller Excelencia, Beca de Talento, Apoyos socioeconómicos."
  },
  {
    id: 'javeriana',
    name: "Pontificia Universidad Javeriana",
    type: "Privada",
    logo: "https://www.javeriana.edu.co/recursos_temas/javeriana-theme/images/logo_javeriana.png",
    description: "Formación integral inspirada en valores humanos y excelencia científica.",
    costRange: "$12M - $30M por semestre",
    programs: ["Comunicación Social", "Psicología", "Odontología", "Ingeniería Industrial", "Teología"],
    support: ["Créditos con la universidad", "Descuentos por hermanos", "Convenios con cajas de compensación"],
    scholarships: "Beca Excelencia Académica, Beca Fe y Alegría, Beca por Deporte."
  },
  {
    id: 'rosario',
    name: "Universidad del Rosario",
    type: "Privada",
    logo: "https://urosario.edu.co/themes/custom/urosario/logo.svg",
    description: "Tradición y modernidad en la formación de los líderes del futuro.",
    costRange: "$10M - $28M por semestre",
    programs: ["Relaciones Internacionales", "Jurisprudencia (Derecho)", "Gestión y Desarrollo", "Medicina"],
    support: ["Beca Sueño Ser (100%)", "Financiación Directa", "Becas de Honor"],
    scholarships: "Beca Mérito Académico, Beca URosario, Beca Juan Agustín Uricoechea."
  },
  {
    id: 'distrital',
    name: "Universidad Distrital Francisco José de Caldas",
    type: "Pública",
    logo: "https://www.udistrital.edu.co/sites/default/files/logo-ud.png",
    description: "Institución pública de la capital enfocada en tecnología e ingeniería.",
    costRange: "Socioeconómico (Matrícula Cero aplica)",
    programs: ["Licenciaturas", "Ingeniería Electrónica", "Tecnología en Sistemas", "Artes ASAB"],
    support: ["Política de Gratuidad", "Apoyo alimentario (Bonos)", "Relatorías"],
    scholarships: "Mejores promedios, Admisión por mérito deportivo."
  },
  {
    id: 'sabana',
    name: "Universidad de La Sabana",
    type: "Privada",
    logo: "https://www.unisabana.edu.co/fileadmin/Recursos_Institucionales/Logos/Logo_Unisabana_2020.png",
    description: "Enfoque en la formación humana, excelencia académica e investigación con impacto social.",
    costRange: "$10M - $25M por semestre",
    programs: ["Medicina", "Comunicación Audiovisual", "Ingeniería Informática", "Gastronomía", "Derecho"],
    support: ["Becas Excelencia", "Fondo de Solidaridad", "Financiación a corto y largo plazo"],
    scholarships: "Beca Excelencia, Beca Alumni, Beca Familia."
  },
  {
    id: 'externado',
    name: "Universidad Externado de Colombia",
    type: "Privada",
    logo: "https://www.uexternado.edu.co/wp-content/uploads/2017/01/logo-externado.png",
    description: "Promueve el libre examen, la tolerancia y el respeto por las ideas ajenas.",
    costRange: "$8M - $20M por semestre",
    programs: ["Derecho", "Finanzas", "Comunicación Social", "Economía", "Turismo"],
    support: ["Crédito directo", "Descuentos por pronto pago", "Convenios ICETEX"],
    scholarships: "Becas por mérito académico, Descuentos a egresados."
  },
  {
    id: 'bosque',
    name: "Universidad El Bosque",
    type: "Privada",
    logo: "https://www.unbosque.edu.co/sites/default/files/logo_unbosque_0.png",
    description: "Comprometida con la cultura de la vida, su calidad y su sentido.",
    costRange: "$7M - $22M por semestre",
    programs: ["Medicina", "Odontología", "Psicología", "Ingeniería Ambiental", "Diseño Industrial"],
    support: ["Crédito institucional", "Descuentos por convenios", "Apoyo psicológico"],
    scholarships: "Becas de excelencia, Beca Fundadores."
  },
  {
    id: 'pedagogica',
    name: "Universidad Pedagógica Nacional",
    type: "Pública",
    logo: "https://www.upn.edu.co/wp-content/uploads/2021/04/logo-upn.png",
    description: "La educadora de educadores, líder en la formación de maestros en Colombia.",
    costRange: "Socioeconómico (Matrícula Cero aplica)",
    programs: ["Licenciatura en Educación Física", "Licenciatura en Matemáticas", "Licenciatura en Artes", "Licenciatura en Biología"],
    support: ["Política de Gratuidad", "Apoyo alimentario", "Residencias universitarias"],
    scholarships: "Exención de matrícula por mérito, Monitorías."
  },
  {
    id: 'salle',
    name: "Universidad de La Salle",
    type: "Privada",
    logo: "https://www.lasalle.edu.co/images/logo-lasalle.png",
    description: "Formación integral con compromiso social y desarrollo rural.",
    costRange: "$5M - $15M por semestre",
    programs: ["Arquitectura", "Medicina Veterinaria", "Zootecnia", "Optometría", "Ingeniería Ambiental"],
    support: ["Proyecto Utopía", "Financiación directa", "Descuentos familiares"],
    scholarships: "Beca Indivisa Manent, Beca de Excelencia Académica."
  }
];

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.LANDING);
  const [activeTab, setActiveTab] = useState<'tests' | 'tutors' | 'tasks' | 'uni'>('tests');
  const [user, setUser] = useState<User | null>(null);
  const [activeTest, setActiveTest] = useState<Test | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showTestWarning, setShowTestWarning] = useState(false);
  const [selectedUni, setSelectedUni] = useState<typeof UNIVERSITIES_BOGOTA[0] | null>(null);
  const [schedulingTutor, setSchedulingTutor] = useState<string | null>(null);
  const [lastAccount, setLastAccount] = useState<{username: string, password: string, fullName: string, age: number, school: string, course: string} | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [checklistAnswers, setChecklistAnswers] = useState<Record<number, boolean | null>>({});

  const CHECKLIST_QUESTIONS = [
    "Considera que a partir de la información que le proporcionó el orientador pudo determinar una o varias opciones de carrera ?",
    "¿Hay algo en lo que no estuvo de acuerdo durante el proceso?",
    "¿Se ha sentido cómodo en la carrera elegida?",
    "¿Cree que si cumple con las habilidades necesarias para continuar con la carrera elegida ?",
    "¿Se ha sentido cómod@ y encuentra temas de interés en las materias de la carrera?",
    "Pudo continuar con su proceso académico con normalidad o hay algún detalle que crea que puede mejorar con la ayuda del profesional en psicología?",
    "Necesita ayuda en algo relacionado con el cambio de colegio a universidad?",
    "Considera que sus hábitos de estudio le son útiles en su carrera?",
    "Actualmente la información proporcionada de becas y gestiones académicas se le es útil ?",
    "¿Usaste alguna de las estrategias discutidas para disminuir los riesgos económicos o sociales?",
    "¿Te han sido útiles las rutas de apoyo o \"tareas\" que se acordaron en la sesión de entrenamiento?",
    "¿Identificaste a tiempo alguna de las barreras (económicas, de risgo Psicosocial o de consumo) que se mencionaron durante las sesiones?",
    "¿Sientes que el protocolo te preparó lo suficiente para los desafíos de la transición a la educación superior?",
    "¿Has recomendado o recomendarías este proceso a otros jóvenes en tu misma situación?"
  ];

  const pageVariants = {
    initial: { opacity: 0, scale: 0.98, filter: 'blur(10px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 1.02, filter: 'blur(10px)' }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const fullName = formData.get('fullName') as string;
    const username = formData.get('username') as string;
    const ageValue = formData.get('age') as string;
    const school = formData.get('school') as string;
    const course = formData.get('course') as string;
    const password = formData.get('password') as string;
    
    const age = parseInt(ageValue) || 0;
    const newUser: User = { fullName, username, age, school, course };
    setUser(newUser);
    setLastAccount({ username, password, fullName, age, school, course });
    setStep(AppStep.SURVEY);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (lastAccount && username === lastAccount.username && password === lastAccount.password) {
      setUser({
        fullName: lastAccount.fullName,
        username: lastAccount.username,
        age: lastAccount.age,
        school: lastAccount.school,
        course: lastAccount.course
      });
      setLoginError(null);
      setStep(AppStep.DASHBOARD);
    } else {
      setLoginError("Usuario o contraseña incorrectos.");
    }
  };

  const handleGoogleLogin = () => {
    const simulatedGoogleUser: User = {
      fullName: "Estudiante Invitado",
      username: "google_user",
      age: 17,
      school: "Institución Educativa",
      course: "11°"
    };
    setUser(simulatedGoogleUser);
    setStep(AppStep.SURVEY);
  };

  const calculateResults = (testId: string, answers: Record<string, any>) => {
    let result: TestResult;
    
    if (testId === 'pma') {
      result = {
        testId: 'pma',
        scores: { 'Verbal': 45, 'Espacial': 18, 'Raciocinio': 28, 'Números': 65, 'Fluidez': 35 },
        maxScores: { 'Verbal': 50, 'Espacial': 20, 'Raciocinio': 30, 'Números': 70, 'Fluidez': 50 },
        interpretation: "Tu capacidad de razonamiento lógico y verbal es excepcional. Posees una gran agilidad mental para resolver problemas abstractos y una excelente base numérica."
      };
    } else {
      result = {
        testId: testId,
        scores: { 'Resultado': 85 },
        maxScores: { 'Resultado': 100 },
        interpretation: "Has completado la evaluación con éxito. Tus resultados indican un perfil equilibrado con gran potencial de aprendizaje."
      };
    }
    
    setTestResult(result);
    setStep(AppStep.RESULTS);
  };

  const handleSchedule = (name: string) => {
    setSchedulingTutor(name);
    setTimeout(() => setSchedulingTutor(null), 3000);
  };

  const menuOptions = [
    { label: 'Pruebas', icon: ClipboardCheck, id: 'tests' },
    { label: 'Check List', icon: BookOpen, id: 'tasks' },
    { label: 'Mi Universidad', icon: University, id: 'uni' },
    { label: 'Agenda tu tutoría', icon: Calendar, id: 'tutors' }
  ];

  const renderLanding = () => (
    <MotionDiv 
      key="landing"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col items-center justify-center min-h-screen text-center px-4 relative z-10"
    >
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="mb-8 p-4 bg-blue-600/20 rounded-full shadow-2xl border border-blue-500/20"
      >
        <GraduationCap size={80} className="text-blue-400" />
      </motion.div>
      <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
        Vamos a la <span className="text-blue-500">Universidad</span>
      </h1>
      <p className="text-xl text-slate-400 mb-10 max-w-2xl font-light leading-relaxed">
        Tu camino académico comienza aquí. Evalúate, prepárate y alcanza tus metas universitarias con nuestra plataforma integral.
      </p>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button size="lg" onClick={() => setStep(AppStep.REGISTER)} className="shadow-blue-500/40">
          Registrarme <ArrowRight className="ml-2" size={20} />
        </Button>
        <Button 
          size="lg" 
          variant="secondary" 
          onClick={handleGoogleLogin} 
          className="bg-white hover:bg-slate-100 border-none shadow-md flex gap-3 items-center justify-center transition-all"
        >
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-slate-900 font-bold">Continuar con Google</span>
        </Button>
        <Button size="lg" variant="outline" onClick={() => setStep(AppStep.LOGIN)}>Ya tengo cuenta</Button>
      </div>
    </MotionDiv>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500/30 overflow-x-hidden">
      <GraduationIcons />
      <AnimatePresence mode="wait">
        {step === AppStep.LANDING && renderLanding()}
        
        {step === AppStep.REGISTER && (
          <MotionDiv key="reg" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col items-center justify-center min-h-screen p-4 relative z-10">
            <div className="w-full max-w-lg bg-slate-900/90 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]">
              <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-3">
                <GraduationCap className="text-blue-400" size={32} /> Registro Estudiantil
              </h2>
              <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Input label="Nombre completo" name="fullName" required placeholder="Ej: Juan Perez" />
                </div>
                <Input label="Nombre de usuario" name="username" required placeholder="juanp123" />
                <Input label="Edad" name="age" type="number" required placeholder="17" />
                <Input label="Colegio al cual pertenece" name="school" required placeholder="Nombre de tu institución" />
                <Input label="Curso" name="course" required placeholder="Ej: 11-02" />
                <div className="md:col-span-2">
                  <Input label="Crea una contraseña segura" name="password" type="password" required placeholder="••••••••" />
                </div>
                <div className="md:col-span-2 space-y-3 mt-4">
                  <Button type="submit" className="w-full" size="lg">Continuar al Perfil <ArrowRight className="ml-2" size={18} /></Button>
                  <button type="button" onClick={() => setStep(AppStep.LANDING)} className="text-sm text-slate-500 hover:text-white w-full text-center transition-colors">Volver al inicio</button>
                </div>
              </form>
            </div>
          </MotionDiv>
        )}

        {step === AppStep.LOGIN && (
          <MotionDiv key="login" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col items-center justify-center min-h-screen p-4 relative z-10">
            <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-2xl">
              <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                <Lock className="text-blue-400" size={24} /> Iniciar Sesión
              </h2>
              {loginError && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-2"><AlertCircle size={16} />{loginError}</div>}
              <form onSubmit={handleLogin} className="space-y-6">
                <Input label="Usuario" name="username" required placeholder="tu usuario" />
                <Input label="Contraseña" name="password" type="password" required placeholder="••••••••" />
                <Button type="submit" className="w-full mt-2" size="lg">Entrar</Button>
                <button type="button" onClick={() => setStep(AppStep.LANDING)} className="text-sm text-slate-500 hover:text-white w-full text-center transition-colors">Volver</button>
              </form>
            </div>
          </MotionDiv>
        )}

        {step === AppStep.SURVEY && (
          <MotionDiv key="survey" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen py-16 px-4 max-w-4xl mx-auto relative z-10">
            <div className="bg-slate-900/70 backdrop-blur-2xl border border-white/5 p-10 rounded-[2.5rem] shadow-2xl">
              <header className="mb-12 border-b border-white/5 pb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">Cuestionario Sociodemográfico</h2>
                  <p className="text-slate-400 text-sm mt-1">Completa tu perfil para acceder a las pruebas</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-2xl">
                  <ClipboardCheck className="text-blue-400" size={32} />
                </div>
              </header>
              <form onSubmit={(e) => { e.preventDefault(); setStep(AppStep.DASHBOARD); }} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {SURVEY_QUESTIONS.map((q, idx) => (
                    <div key={q.id} className="space-y-3">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">{q.text}</label>
                      {q.type === 'text' && <input className="w-full bg-slate-800/40 border border-slate-700/50 rounded-xl p-3.5 text-slate-100 focus:border-blue-500 focus:outline-none transition-all" placeholder="..." />}
                      {q.type === 'number' && <input type="number" className="w-full bg-slate-800/40 border border-slate-700/50 rounded-xl p-3.5 text-slate-100 focus:border-blue-500 focus:outline-none transition-all" placeholder="0" />}
                      {q.type === 'radio' && (
                        <div className="grid grid-cols-1 gap-2">
                          {q.options?.map(opt => (
                            <label key={opt.value} className="flex items-center gap-3 bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 cursor-pointer hover:bg-slate-800/50 transition-all">
                              <input type="radio" name={q.id} className="accent-blue-500" />
                              <span className="text-sm">{opt.label}</span>
                            </label>
                          ))}
                        </div>
                      )}
                      {q.type === 'select' && (
                        <div className="relative">
                          <select className="w-full bg-slate-800/40 border border-slate-700/50 rounded-xl p-3.5 text-slate-100 focus:border-blue-500 focus:outline-none transition-all appearance-none">
                            <option value="">Seleccionar...</option>
                            {q.options?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                            <ArrowRight size={16} className="rotate-90" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                  <p className="text-slate-500 text-sm italic">Todos los campos son obligatorios para el análisis psicotécnico.</p>
                  <Button size="lg" className="min-w-[240px] shadow-blue-500/20">Finalizar Perfil <CheckCircle2 className="ml-2" size={20} /></Button>
                </div>
              </form>
            </div>
          </MotionDiv>
        )}

        {step === AppStep.DASHBOARD && (
          <MotionDiv key="dash" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen pt-28 px-6 relative z-10">
            {/* Nav del Dashboard */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/60 backdrop-blur-xl border-b border-white/5 h-20 flex items-center justify-between px-8">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('tests')}>
                <div className="p-2 bg-blue-600/10 rounded-lg">
                  <GraduationCap className="text-blue-500" size={28} />
                </div>
                <span className="font-bold tracking-tight text-xl">U-Path <span className="text-slate-500 font-normal">| Panel</span></span>
              </div>
              <button 
                onClick={() => setShowMenu(!showMenu)} 
                className={`p-3 border border-white/5 rounded-2xl transition-all shadow-lg backdrop-blur-md flex items-center gap-2 group ${showMenu ? 'bg-blue-600 text-white' : 'bg-slate-900/50 hover:bg-slate-800'}`}
              >
                <span className="hidden md:inline text-sm font-bold uppercase tracking-widest px-2">Menú de Navegación</span>
                {showMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            </nav>

            {/* LISTA DESPLEGABLE DENTRO DE LA APP (Sidebar Overlay) */}
            <AnimatePresence>
              {showMenu && (
                <>
                  <MotionDiv 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55]" 
                    onClick={() => setShowMenu(false)} 
                  />
                  <MotionDiv 
                    initial={{ x: '100%' }} 
                    animate={{ x: 0 }} 
                    exit={{ x: '100%' }} 
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-slate-900/95 backdrop-blur-2xl border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] z-[60] p-8 flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-12">
                      <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Menu className="text-blue-500" /> Opciones
                      </h3>
                      <button onClick={() => setShowMenu(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <ChevronRight size={24} />
                      </button>
                    </div>

                    <div className="flex-grow space-y-4">
                      {menuOptions.map((item, i) => (
                        <MotionDiv 
                          key={i} 
                          initial={{ opacity: 0, x: 20 }} 
                          animate={{ opacity: 1, x: 0 }} 
                          transition={{ delay: i * 0.1 }}
                        >
                          <button 
                            className={`w-full text-left px-6 py-5 rounded-3xl transition-all font-semibold text-lg flex items-center gap-5 group shadow-lg border ${activeTab === item.id ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-white/5 border-white/5 hover:bg-blue-600/10 text-slate-300 hover:text-blue-400'}`}
                            onClick={() => {
                              setActiveTab(item.id as any);
                              setShowMenu(false);
                            }}
                          >
                            <div className={`p-3 rounded-2xl transition-all ${activeTab === item.id ? 'bg-blue-500 text-white' : 'bg-slate-800 group-hover:bg-blue-500/20 group-hover:scale-110'}`}>
                              <item.icon size={24} className={activeTab === item.id ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'} />
                            </div>
                            {item.label}
                          </button>
                        </MotionDiv>
                      ))}
                    </div>

                    <div className="pt-8 border-t border-white/5">
                      <button 
                        onClick={() => { setShowMenu(false); setStep(AppStep.LANDING); }} 
                        className="w-full text-left px-6 py-5 text-red-400 hover:bg-red-500/10 rounded-3xl font-bold flex items-center gap-5 transition-all"
                      >
                        <div className="p-3 bg-red-500/10 rounded-2xl">
                          <LogOut size={24} />
                        </div>
                        Cerrar Sesión
                      </button>
                    </div>
                  </MotionDiv>
                </>
              )}
            </AnimatePresence>

            <div className="max-w-6xl mx-auto py-10">
              <header className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold">
                    {activeTab === 'tests' && <>Hola, <span className="text-blue-500">{user?.fullName?.split(' ')[0]}</span> 👋</>}
                    {activeTab === 'tutors' && <>Agenda tu <span className="text-blue-500">Tutoría</span></>}
                    {activeTab === 'tasks' && <>Check <span className="text-blue-500">List</span></>}
                    {activeTab === 'uni' && <>Mi <span className="text-blue-500">Universidad</span></>}
                  </h2>
                  <div className="flex items-center gap-3 text-slate-400 mt-2 text-lg">
                    <UserIcon size={18} />
                    <span>{user?.school} | {user?.course}</span>
                  </div>
                </div>
                {activeTab !== 'tests' && (
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('tests')} className="rounded-full gap-2">
                    <ChevronLeft size={16} /> Volver a Pruebas
                  </Button>
                )}
              </header>

              <AnimatePresence mode="wait">
                {activeTab === 'tests' && (
                  <MotionDiv 
                    key="tests-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                  >
                    {PSYCHO_TESTS.map(test => (
                      <MotionDiv 
                        key={test.id} 
                        whileHover={{ y: -8 }} 
                        className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-8 rounded-[2.5rem] flex flex-col hover:border-blue-500/40 transition-all shadow-xl group relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[50px] -mr-16 -mt-16 group-hover:bg-blue-600/10 transition-all" />
                        <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform"><ClipboardCheck size={28} /></div>
                        <h3 className="text-2xl font-bold mb-4">{test.title}</h3>
                        <p className="text-slate-400 mb-8 flex-grow leading-relaxed text-sm">{test.description}</p>
                        <Button onClick={() => { setActiveTest(test); setShowTestWarning(true); }} className="w-full py-4 rounded-2xl">Realizar Prueba</Button>
                      </MotionDiv>
                    ))}
                  </MotionDiv>
                )}

                {activeTab === 'tutors' && (
                  <MotionDiv 
                    key="tutors-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                  >
                    {TUTORS.map(tutor => (
                      <MotionDiv 
                        key={tutor.id} 
                        whileHover={{ y: -8 }} 
                        className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-8 rounded-[2.5rem] flex flex-col hover:border-blue-500/40 transition-all shadow-xl group relative overflow-hidden"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          {tutor.photo ? (
                            <img 
                              src={tutor.photo} 
                              alt={tutor.name} 
                              className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500/20"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-blue-500/20 flex items-center justify-center">
                              <UserIcon size={24} className="text-slate-400" />
                            </div>
                          )}
                          <div>
                            <h3 className="text-xl font-bold text-white">{tutor.name}</h3>
                            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">{tutor.role}</span>
                          </div>
                        </div>
                        <p className="text-slate-400 mb-8 flex-grow leading-relaxed text-sm italic">"{tutor.desc}"</p>
                        <Button 
                          onClick={() => handleSchedule(tutor.name)} 
                          className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 group-hover:shadow-blue-500/20"
                        >
                          <Calendar size={18} /> Agendar Entrevista
                        </Button>
                      </MotionDiv>
                    ))}
                  </MotionDiv>
                )}

                {activeTab === 'uni' && (
                  <MotionDiv 
                    key="uni-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {UNIVERSITIES_BOGOTA.map(uni => (
                        <MotionDiv 
                          key={uni.id} 
                          whileHover={{ y: -8 }} 
                          className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-8 rounded-[2.5rem] flex flex-col hover:border-blue-500/40 transition-all shadow-xl group relative overflow-hidden"
                        >
                          <div className="flex items-start justify-between mb-6">
                            <div className="p-4 bg-white/5 rounded-2xl">
                              <University className="text-blue-500" size={32} />
                            </div>
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${uni.type === 'Pública' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'}`}>
                              {uni.type}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">{uni.name}</h3>
                          <p className="text-slate-400 text-sm mb-6 flex-grow">{uni.description}</p>
                          
                          <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 text-slate-300">
                              <CreditCard size={18} className="text-blue-500" />
                              <span className="text-xs font-medium">Costo: {uni.costRange}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-300">
                              <BadgePercent size={18} className="text-blue-500" />
                              <span className="text-xs font-medium">Becas: {uni.scholarships.split(',')[0]}...</span>
                            </div>
                          </div>
                          
                          <Button 
                            onClick={() => setSelectedUni(uni)} 
                            className="w-full py-4 rounded-2xl flex items-center justify-center gap-2"
                          >
                            <Search size={18} /> Ver Oferta Completa
                          </Button>
                        </MotionDiv>
                      ))}
                    </div>
                  </MotionDiv>
                )}

                {activeTab === 'tasks' && (
                  <MotionDiv 
                    key="tasks-tab"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-8 rounded-[3rem]">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                          <BookOpen size={32} className="text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">Cuestionario de Seguimiento</h3>
                          <p className="text-slate-400">Responde Sí o No a las siguientes preguntas sobre tu proceso.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {CHECKLIST_QUESTIONS.map((question, index) => (
                          <div key={index} className="bg-slate-950/50 p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <p className="text-slate-200 text-lg flex-1">{question}</p>
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => setChecklistAnswers(prev => ({ ...prev, [index]: true }))}
                                className={`px-6 py-2 rounded-xl font-medium transition-all ${checklistAnswers[index] === true ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                              >
                                Sí
                              </button>
                              <button
                                onClick={() => setChecklistAnswers(prev => ({ ...prev, [index]: false }))}
                                className={`px-6 py-2 rounded-xl font-medium transition-all ${checklistAnswers[index] === false ? 'bg-red-600 text-white shadow-lg shadow-red-500/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                              >
                                No
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </MotionDiv>
                )}
              </AnimatePresence>
            </div>
          </MotionDiv>
        )}

        {step === AppStep.TEST_MODE && activeTest && (
          <TestEngine test={activeTest} onFinish={(ans) => calculateResults(activeTest.id, ans)} onExit={() => setStep(AppStep.DASHBOARD)} />
        )}

        {step === AppStep.RESULTS && testResult && (
          <ResultsView result={testResult} onClose={() => { setStep(AppStep.DASHBOARD); setActiveTab('tests'); }} />
        )}
      </AnimatePresence>

      {/* Modal Detalle Universidad */}
      <AnimatePresence>
        {selectedUni && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 overflow-y-auto py-10">
            <MotionDiv 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl" 
              onClick={() => setSelectedUni(null)} 
            />
            <MotionDiv 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }} 
              className="bg-slate-900 border border-white/10 rounded-[3rem] max-w-2xl w-full relative z-10 shadow-2xl overflow-hidden"
            >
              <div className="h-32 bg-blue-600/20 relative">
                <button 
                  onClick={() => setSelectedUni(null)} 
                  className="absolute top-6 right-6 p-2 bg-slate-950/50 hover:bg-slate-950 rounded-full transition-all text-white"
                >
                  <X size={20} />
                </button>
                <div className="absolute -bottom-10 left-10 p-4 bg-slate-900 border border-white/10 rounded-3xl shadow-xl">
                  <University size={48} className="text-blue-500" />
                </div>
              </div>
              
              <div className="px-10 pt-16 pb-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-blue-500/20">
                    Bogotá, D.C.
                  </span>
                  <span className="px-3 py-1 bg-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">
                    {selectedUni.type}
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-4">{selectedUni.name}</h3>
                <p className="text-slate-400 mb-8 leading-relaxed">{selectedUni.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-bold text-blue-400 uppercase tracking-widest text-xs">
                      <BookOpen size={16} /> Programas Ofertados
                    </h4>
                    <ul className="space-y-2">
                      {selectedUni.programs.map((prog, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> {prog}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-bold text-blue-400 uppercase tracking-widest text-xs">
                      <CreditCard size={16} /> Información Financiera
                    </h4>
                    <p className="text-slate-300 text-sm font-medium">{selectedUni.costRange}</p>
                    <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/10">
                      <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Apoyos Económicos</p>
                      <ul className="space-y-1">
                        {selectedUni.support.map((supp, i) => (
                          <li key={i} className="text-xs text-blue-300 flex items-center gap-1">
                            <CheckCircle2 size={12} /> {supp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-slate-950/50 rounded-3xl border border-white/5 mb-8">
                  <h4 className="flex items-center gap-2 font-bold text-amber-400 uppercase tracking-widest text-xs mb-4">
                    <BadgePercent size={16} /> Becas Disponibles
                  </h4>
                  <p className="text-sm text-slate-300 italic">"{selectedUni.scholarships}"</p>
                </div>

                <div className="flex gap-4">
                  <Button className="flex-grow py-4 rounded-2xl gap-2">
                    Visitar Sitio Web <ExternalLink size={18} />
                  </Button>
                  <Button variant="outline" className="py-4 px-6 rounded-2xl" onClick={() => setSelectedUni(null)}>
                    Cerrar
                  </Button>
                </div>
              </div>
            </MotionDiv>
          </div>
        )}
      </AnimatePresence>

      {/* Notificación de Agendamiento Exitoso */}
      <AnimatePresence>
        {schedulingTutor && (
          <MotionDiv 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold border border-white/20"
          >
            <UserCheck size={24} />
            <span>¡Cita agendada con {schedulingTutor}!</span>
          </MotionDiv>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTestWarning && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setShowTestWarning(false)} />
            <MotionDiv initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-slate-900 border border-white/10 p-10 rounded-[3rem] max-w-md w-full relative z-10 text-center shadow-2xl">
              <AlertCircle size={48} className="text-amber-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">¿Preparado para iniciar?</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">Estás por iniciar la prueba psicotécnica. Asegúrate de tener conexión estable y tiempo suficiente para completarla.</p>
              <div className="flex flex-col gap-3">
                <Button className="w-full py-4 rounded-2xl" onClick={() => { setShowTestWarning(false); setStep(AppStep.TEST_MODE); }}>Iniciar Ahora</Button>
                <Button variant="outline" className="w-full py-4 rounded-2xl border-white/5" onClick={() => setShowTestWarning(false)}>Cancelar</Button>
              </div>
            </MotionDiv>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
