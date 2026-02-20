
import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Question, Test, TestPart } from './types';

export const GraduationIcons = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.15]">
    {[...Array(120)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-pulse"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          transform: `rotate(${Math.random() * 360}deg)`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${5 + Math.random() * 7}s`
        }}
      >
        < GraduationCap 
          size={Math.random() * 20 + 25} 
          className="text-blue-300" 
          strokeWidth={1.2}
        />
      </div>
    ))}
  </div>
);

export const SURVEY_QUESTIONS: Question[] = [
  { id: 'q1', text: '1) Nombre completo', type: 'text' },
  { id: 'q2', text: '2) ¿Cuántos años tienes?', type: 'number' },
  { id: 'q3', text: '3) ¿Vives en zona urbana o rural?', type: 'radio', options: [{label: 'Urbana', value: 'urbana'}, {label: 'Rural', value: 'rural'}] },
  { id: 'q4', text: '4) Nivel académico', type: 'select', options: [
    { label: 'Grado académico', value: 'grado' },
    { label: 'Tecnólogo', value: 'tecnologo' },
    { label: 'Universitario', value: 'universitario' }
  ]},
  { id: 'q5', text: '5) ¿Con quién vives actualmente?', type: 'text' },
  { id: 'q6', text: '6) ¿Quién provee los recursos económicos para tus necesidades?', type: 'text' },
  { id: 'q7', text: '7) ¿A qué estrato socioeconómico perteneces?', type: 'select', options: ['1','2','3','4','5','6'].map(v => ({label: v, value: v})) },
  { id: 'q8', text: '8) ¿Quién de tu familia cuenta con los recursos para ayudarte a estudiar?', type: 'text' },
  { id: 'q9', text: '9) Total de ingresos de la familia:', type: 'radio', options: [
    { label: 'a) Menos de un salario mínimo mensual', value: 'a' },
    { label: 'b) De uno a dos salarios mínimos mensuales', value: 'b' },
    { label: 'c) Dos o más salarios mínimos mensuales', value: 'c' }
  ]},
  { id: 'q10', text: '8b) ¿Cómo describirías la situación económica de tu familia?', type: 'text' },
  { id: 'q11', text: '9b) ¿Cuál es el nivel educativo de tu padre, madre o cuidadores?', type: 'select', options: [
    { label: 'A. Primaria incompleta', value: 'A' },
    { label: 'B. Primaria completa', value: 'B' },
    { label: 'C. Secundaria incompleta', value: 'C' },
    { label: 'D. Secundaria completa', value: 'D' },
    { label: 'E. Técnico / Tecnólogo', value: 'E' },
    { label: 'F. Profesional incompleta', value: 'F' },
    { label: 'G. Profesional completa', value: 'G' },
    { label: 'H. Posgradual', value: 'H' },
    { label: 'I. No aplica', value: 'I' }
  ]},
  { id: 'q12', text: '10) ¿Qué servicios públicos hay en tu hogar?', type: 'text' },
  { id: 'q13', text: '11) ¿Con cuáles dispositivos tecnológicos cuentas para tus deberes?', type: 'text' },
  { id: 'q14', text: '12) ¿En qué tipo de vivienda te encuentras?', type: 'select', options: [
    { label: 'Casa', value: 'casa' },
    { label: 'Apartamento', value: 'apartamento' },
    { label: 'Habitación', value: 'habitacion' },
    { label: 'Hogar de paso', value: 'paso' },
    { label: 'Inquilinato', value: 'inquilinato' },
    { label: 'Otro', value: 'otro' }
  ]},
  { id: 'q15', text: '13) ¿Actualmente trabaja?', type: 'radio', options: [{label: 'Sí', value: 'si'}, {label: 'No', value: 'no'}] },
  { id: 'q16', text: '14) ¿Cuántas horas laborales completas a la semana?', type: 'number' },
  { id: 'q17', text: '15) ¿Has accedido a un beneficio económico del gobierno?', type: 'radio', options: [{label: 'SÍ', value: 'si'}, {label: 'NO', value: 'no'}] },
  { id: 'q18', text: '16) Medio de transporte que utiliza para llegar al colegio', type: 'select', options: [
    { label: 'A. Caminando', value: 'A' },
    { label: 'B. Bicicleta', value: 'B' },
    { label: 'C. Moto', value: 'C' },
    { label: 'D. Carro particular', value: 'D' },
    { label: 'E. Ruta privada', value: 'E' },
    { label: 'F. Transporte público', value: 'F' }
  ]}
];

export const EPQR_QUESTIONS_TEXT = [
  "¿Tienes muchos pasatiempos diferentes?", "¿Piensas las cosas antes de hacerlas?", "¿Tu estado de ánimo sube y baja con frecuencia?", 
  "¿Alguna vez has aceptado elogios por algo que sabías que hizo otra persona?", "¿Te importa mucho lo que piensen los demás?", "¿Eres una persona habladora?", 
  "¿Te preocuparía estar en deuda?", "¿A veces te sientes muy triste sin razón?", "¿Das dinero a obras de caridad?", 
  "¿De niño alguna vez fuiste codicioso y tomaste más de lo que te tocaba?", "¿Eres bastante alegre y animado?", "¿Te afectaría mucho ver sufrir a un niño o animal?", 
  "¿Te preocupas mucho por cosas que has dicho o hecho?", "¿Te molestan las personas que no saben comportarse?", "¿Si dices que harás algo, siempre cumples aunque sea incómodo?", 
  "¿Puedes divertirte en una fiesta animada?", "¿Eres una persona irritable?", "¿La gente debería respetar siempre la ley?", 
  "¿Alguna vez has culpado a otro por algo que en realidad fue tu culpa?", "¿Disfrutas conociendo gente nueva?", "¿Son muy importantes las buenas maneras?", 
  "¿Te hieren fácilmente los sentimientos?", "¿Todos tus hábitos son buenos y deseables?", "¿Te mantienes en segundo plano en reuniones sociales?", 
  "¿Probarías drogas que puedan tener efectos extraños o peligrosos?", "¿A menudo te sientes aburrido o harto?", "¿Alguna vez has tomado algo que pertenecía a otra persona?", 
  "¿Te gusta salir mucho?", "¿Prefieres hacer las cosas a tu manera en vez de seguir las reglas?", "¿Disfrutas haciendo daño a las personas que amas?", 
  "¿Te sientes culpable con frecuencia?", "¿Hablas a veces de cosas de las que no sabes nada?", "¿Prefieres leer a conocer gente?", 
  "¿Tienes enemigos que quieren hacerte daño?", "¿Dirías que eres una persona nerviosa?", "¿Tienes muchos amigos?", 
  "¿Disfrutas con bromas prácticas que a veces pueden herir a la gente?", "¿Te preocupas mucho?", "¿De niño hacías lo que te decían inmediatamente y sin quejarte?", 
  "¿Te considerarías despreocupado y alegre?", "¿Son muy importantes las buenas maneras y la limpieza?", "¿Has ido muchas veces en contra de lo que querían tus padres?", 
  "¿Te preocupas por cosas terribles que podrían pasar?", "¿Alguna vez has roto o perdido algo que pertenecía a otra persona?", "¿Sueles tomar la iniciativa para hacer nuevos amigos?", 
  "¿Te considerarías una persona tensa o muy nerviosa?", "¿Eres mayormente callado cuando estás con otras personas?", "¿Crees que el matrimonio es algo anticuado y debería desaparecer?", 
  "¿A veces te jactas un poco?", "¿Eres más permisivo con lo correcto e incorrecto que la mayoría?", "¿Puedes animar una fiesta?", 
  "¿Tratas de no ser grosero con la gente?", "¿Después de una experiencia embarazosa te preocupas mucho tiempo?", "¿Generalmente 'miras antes de saltar'?", 
  "¿Has insistido alguna vez en hacer las cosas a tu manera?", "¿Sufres de 'nervios'?", "¿Te sientes a menudo solo?", 
  "¿Puedes confiar en general en que la gente diga la verdad?", "¿Siempre practicas lo que predicas?", "¿Te hieren fácilmente cuando critican tu trabajo o a ti?", 
  "¿Es mejor seguir las reglas de la sociedad que ir por tu propio camino?", "¿Alguna vez has llegado tarde a una cita o al trabajo?", "¿Te gusta tener mucho movimiento y emoción a tu alrededor?", 
  "¿Te gustaría que la gente te temiera?", "¿A veces estás lleno de energía y otras veces muy lento?", "¿A veces dejas para mañana lo que deberías hacer hoy?", 
  "¿La gente te considera una persona muy animada?", "¿La gente te dice muchas mentiras?", "¿Crees que uno tiene deberes especiales hacia su familia?", 
  "¿Eres sensible a ciertas cosas?", "¿Siempre admites cuando te equivocas?", "¿Te sentirías muy mal por un animal atrapado en una trampa?", 
  "¿Cuando te enojas, te cuesta controlarte?"
];

export const CHASIDE_QUESTIONS_TEXT = [
  "¿Aceptarías trabajar escribiendo artículos en la sección económica de un diario?", "¿Te ofrecerías para organizar la despedida de soltero de uno de tus amigos?", 
  "¿Te gustaría dirigir/crear un proyecto de urbanización en tu provincia?", "¿A una frustración siempre opones un pensamiento positivo?", 
  "¿Te dedicarías a socorrer a personas accidentadas o atacadas por asaltantes?", "¿Cuando eras chico, te interesaba saber cómo estaban construidos tus juguetes?", 
  "¿Te interesan más los misterios de la naturaleza que los secretos de la tecnología?", "¿Escuchas atentamente los problemas que te plantean tus amigos?", 
  "¿Te ofrecerías para explicar a tus compañeros un determinado tema que ellos no entendieron?", "¿Eres exigente y crítico con tu equipo de trabajo?", 
  "¿Te atrae armar rompecabezas o puzzles?", "¿Te gustaría conocer la diferencia entre macroeconomía y microeconomía?", 
  "¿Usar uniforme te hace sentir distinto, importante?", "¿Participarías como profesional en un espectáculo de acrobacia aérea?", 
  "¿Organizas tu dinero de manera que te alcance hasta el próximo cobro?", "¿Convences fácilmente a otras personas sobre la validez de tus argumentos?", 
  "¿Te gustaría estar informado sobre los nuevos descubrimientos que se están realizando sobre el origen del Universo?", "¿Ante una situación de emergencia actúas rápidamente?", 
  "¿Cuando tienes que resolver un problema matemático, perseveras hasta encontrar la solución?", "¿Si te convocara tu club preferido para planificar, organizar y dirigir un campo de deportes, aceptarías?", 
  "¿Eres el que pone un toque de alegría en las fiestas?", "¿Crees que los detalles son tan importantes como el todo?", 
  "¿Te sentirías a gusto trabajando en un ámbito hospitalario?", "¿Te gustaría participar para mantener el orden ante grandes desórdenes y cataclismos?", 
  "¿Pasarías varias horas leyendo algún libro de tu interés?", "¿Planificas detalladamente tus trabajos antes de empezar?", 
  "¿Entablas una relación casi personal con tu ordenador?", "¿Disfrutas modelando con arcilla?", 
  "¿Ayudas habitualmente a los no videntes a cruzar la calle?", "¿Consideras importante que desde la educación secundaria se fomente la actitud crítica?", 
  "¿Aceptarías que las mujeres formaran parte de las fuerzas armadas?", "¿Te gustaría crear nuevas técnicas para descubrir patologías de enfermedades?", 
  "¿Participarías en una campaña de prevención contra el sida?", "¿Te interesan los temas relacionados al pasado y la evolución del hombre?", 
  "¿Te incluirías en un proyecto de investigación sísmica?", "¿Dedicas algún día de la semana a actividades corporales?", 
  "¿Te interesan actividades de mucha acción y reacción rápida?", "¿Te ofrecerías como voluntario en la NASA?", 
  "¿Te gusta más el trabajo manual que el intelectual?", "¿Estarías dispuesto a renunciar a un momento placentero para ayudar?", 
  "¿Participarías en investigaciones sobre violencia en el fútbol?", "¿Te gustaría trabajar en un laboratorio mientras estudias?", 
  "¿Arriesgarías tu vida para salvar a otro?", "¿Te agradaría hacer un curso de primeros auxilios?", 
  "¿Tolerarías empezar tantas veces como sea necesario?", "¿Distribuyes tus horarios adecuadamente?", 
  "¿Harías un curso para aprender a fabricar instrumentos?", "¿Elegirías una profesión alejada de tu familia (ej: marino)?", 
  "¿Te radicarías en una zona agrícola-ganadera?", "¿Te entusiasma producir ideas originales en grupo?", 
  "¿Te resulta fácil coordinar un grupo de trabajo?", "¿Te resultó interesante el estudio de las ciencias biológicas?", 
  "¿Te sentirías a gusto como gerente de comercialización?", "¿Te incluirías en proyectos de desarrollo de recursos nacionales?", 
  "¿Tienes interés por las causas que determinan fenómenos?", "¿Descubriste algún filósofo que expresara tus ideas?", 
  "¿Desearías que te regalen un instrumento musical?", "¿Aceptarías colaborar con normas en lugares públicos?", 
  "¿Crees que tus ideas son importantes?", "¿Te dispones a reparar artefactos descompuestos?", 
  "¿Formarías parte de un equipo de preservación de flora y fauna?", "¿Leerías revistas sobre avances en salud?", 
  "¿Preservar las raíces culturales te parece importante?", "¿Te gustaría investigar sobre la distribución de la riqueza?", 
  "¿Te gustaría realizar tareas en una nave (velas, casco)?", "¿Crees en poseer alta tecnología armamentista?", 
  "¿La libertad y la justicia son valores fundamentales?", "¿Aceptarías una práctica en industria alimenticia?", 
  "¿Consideras que la salud pública debe ser prioritaria?", "¿Te interesaría investigar una nueva vacuna?", 
  "¿Preferís el rol de coordinador?", "¿Te ofreces como mediador en discusiones?", 
  "¿Estás de acuerdo con soldados profesionales?", "¿Lucharías por una causa justa?", 
  "¿Investigarías científicamente cultivos agrícolas?", "¿Harías diseños de prendas de moda?", 
  "¿Visitarías un observatorio astronómico?", "¿Dirigirías importación y exportación?", 
  "¿Te cohibes al entrar a lugares nuevos?", "¿Te gratificaría trabajar con niños?", 
  "¿Harías el diseño de un cartel para campaña?", "¿Dirigirías un grupo de teatro?", 
  "¿Enviarías tu CV a una empresa automotriz?", "¿Participarías en defensa internacional?", 
  "¿Te costearías estudios trabajando en auditoría?", "¿Defiendes causas perdidas?", 
  "¿Participarías en campaña por emergencia epidémica?", "¿Sabes qué significa ADN o ARN?", 
  "¿Elegirías carrera usando idioma extranjero?", "¿Trabajar con máquinas es más gratificante?", 
  "¿Te gustaría ser asesor contable?", "¿Cuidarías a un enfermo?", 
  "¿Te atrae investigar misterios del universo?", "¿El trabajo individual te resulta más rápido?", 
  "¿Ayudarías a personas con carencias?", "¿Consideras la combinación de colores al vestir?", 
  "¿Dirigirías la construcción de una hidroeléctrica?", "¿Te interesa el concepto de PIB?"
];

export const PMA_VERBAL_QUESTIONS: Question[] = [
  { id: 'v1', text: 'HÚMEDO es a...', subCategory: 'verbal', type: 'radio', options: [{label: 'A. Seco', value: 'a'}, {label: 'B. Humano', value: 'b'}, {label: 'C. Mojado', value: 'c'}, {label: 'D. Moderado', value: 'd'}], correctAnswer: 'c' },
  { id: 'v2', text: 'RÁPIDO es a...', subCategory: 'verbal', type: 'radio', options: [{label: 'A. Mayor', value: 'a'}, {label: 'B. Veloz', value: 'b'}, {label: 'C. Estrecho', value: 'c'}, {label: 'D. Vigoroso', value: 'd'}], correctAnswer: 'b' },
  { id: 'v3', text: 'ESPLÉNDIDO es a...', subCategory: 'verbal', type: 'radio', options: [{label: 'A. Salvaje', value: 'a'}, {label: 'B. Excelente', value: 'b'}, {label: 'C. Rígido', value: 'c'}, {label: 'D. Alegre', value: 'd'}], correctAnswer: 'b' },
  { id: 'v4', text: 'ACOSTUMBRADO es a...', subCategory: 'verbal', type: 'radio', options: [{label: 'A. Nocturno', value: 'a'}, {label: 'B. Radial', value: 'b'}, {label: 'C. Selecto', value: 'c'}, {label: 'D. Usual', value: 'd'}], correctAnswer: 'd' },
  { id: 'v5', text: 'FLUIDO es a...', subCategory: 'verbal', type: 'radio', options: [{label: 'A. Lívido', value: 'a'}, {label: 'B. Muerto', value: 'b'}, {label: 'C. Hablador', value: 'c'}, {label: 'D. Líquido', value: 'd'}], correctAnswer: 'd' },
  { id: 'v6', text: 'PEREZOSO es a...', subCategory: 'verbal', type: 'radio', options: [{label: 'A. Salvaje', value: 'a'}, {label: 'B. Cruzado', value: 'b'}, {label: 'C. Ocioso', value: 'c'}, {label: 'D. Útil', value: 'd'}], correctAnswer: 'c' },
  { id: 'v7', text: 'DESIERTO es a...', subCategory: 'verbal', type: 'radio', options: [{label: 'A. Abandonado', value: 'a'}, {label: 'B. Absurdo', value: 'b'}, {label: 'C. Alborotado', value: 'c'}, {label: 'D. Monótono', value: 'd'}], correctAnswer: 'a' },
  { id: 'v8', text: 'RARO es a...', subCategory: 'verbal', type: 'radio', options: [{label: 'A. Sagrado', value: 'a'}, {label: 'B. Basto', value: 'b'}, {label: 'C. Débil', value: 'c'}, {label: 'D. Escaso', value: 'd'}], correctAnswer: 'd' },
  { id: 'v9', text: 'CONTENTO es a...', subCategory: 'verbal', type: 'radio', options: [{label: 'A. Sucio', value: 'a'}, {label: 'B. Continuo', value: 'b'}, {label: 'C. Satisfecho', value: 'c'}, {label: 'D. Calumnioso', value: 'd'}], correctAnswer: 'c' },
  { id: 'v10', text: 'ENFURECIDO es a...', subCategory: 'verbal', type: 'radio', options: [{label: 'A. Agradable', value: 'a'}, {label: 'B. Pobre', value: 'b'}, {label: 'C. Doméstico', value: 'c'}, {label: 'D. Enojado', value: 'd'}], correctAnswer: 'd' }
];

export const PMA_SPATIAL_QUESTIONS: Question[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `e${i+1}`,
  text: `Identifica cuál de las figuras de la derecha es la MISMA que el modelo de la izquierda (rotada). Fila ${i+1}.`,
  subCategory: 'espacial',
  type: 'radio',
  options: ['A', 'B', 'C', 'D', 'E', 'F'].map(v => ({ label: v, value: v.toLowerCase() })),
  imagePrompt: `A single geometric line symbol for a mental test, minimalist black and white style, showing a model and its rotated variations.`
}));

export const PMA_LOGIC_QUESTIONS: Question[] = [
  { id: 'r1', text: 'a b c c d d e f f...', subCategory: 'raciocinio', type: 'radio', options: [{label: 'g', value: 'g'}, {label: 'h', value: 'h'}, {label: 'k', value: 'k'}, {label: 'j', value: 'j'}], correctAnswer: 'g' },
  { id: 'r2', text: 'a x a y b x b y c x...', subCategory: 'raciocinio', type: 'radio', options: [{label: 'c', value: 'c'}, {label: 'y', value: 'y'}, {label: 'd', value: 'd'}, {label: 'z', value: 'z'}], correctAnswer: 'c' },
  { id: 'r3', text: 'a b c a b c d e f d e...', subCategory: 'raciocinio', type: 'radio', options: [{label: 'f', value: 'f'}, {label: 'g', value: 'g'}, {label: 'h', value: 'h'}, {label: 'e', value: 'e'}], correctAnswer: 'f' }
];

export const PMA_NUMERIC_QUESTIONS: Question[] = [
  { id: 'n1', text: '61 + 34 + 78 + 53 = 226', subCategory: 'numerica', type: 'verification', options: [{label: 'Bien', value: 'b'}, {label: 'Mal', value: 'm'}], correctAnswer: 'b' },
  { id: 'n2', text: '31 + 59 + 52 + 68 = 200', subCategory: 'numerica', type: 'verification', options: [{label: 'Bien', value: 'b'}, {label: 'Mal', value: 'm'}], correctAnswer: 'm' },
  { id: 'n3', text: '31 + 44 + 36 + 48 = 164', subCategory: 'numerica', type: 'verification', options: [{label: 'Bien', value: 'b'}, {label: 'Mal', value: 'm'}], correctAnswer: 'm' },
  { id: 'n4', text: '66 + 73 + 29 + 33 = 202', subCategory: 'numerica', type: 'verification', options: [{label: 'Bien', value: 'b'}, {label: 'Mal', value: 'm'}], correctAnswer: 'm' }
];

export const PSYCHO_TESTS: Test[] = [
  {
    id: 'pma',
    title: 'PMA - Habilidades Mentales Primarias',
    description: 'Explora tu potencial intelectual a través de 5 sub-pruebas específicas: Verbal, Espacial, Raciocinio, Números y Fluidez.',
    questions: [], // Fallback
    parts: [
      { id: 'pma-v', title: 'Comprensión Verbal', description: 'Selecciona el sinónimo de la palabra en mayúsculas.', questions: PMA_VERBAL_QUESTIONS },
      { id: 'pma-e', title: 'Comprensión Espacial', description: 'Reconoce figuras rotadas en el espacio de dos dimensiones.', questions: PMA_SPATIAL_QUESTIONS },
      { id: 'pma-r', title: 'Raciocinio', description: 'Identifica la letra que sigue en la serie lógica.', questions: PMA_LOGIC_QUESTIONS },
      { id: 'pma-n', title: 'Manejo de Números', description: 'Verifica si la suma de las columnas es correcta (B) o incorrecta (M).', questions: PMA_NUMERIC_QUESTIONS },
      { id: 'pma-f', title: 'Fluidez Verbal', description: 'Escribe el mayor número de palabras posibles que comiencen con la letra que se te indique. (5 minutos)', questions: [{ id: 'f1', text: 'Escribe palabras que empiecen por la letra "C":', type: 'fluency', subCategory: 'fluidez' }], timeLimit: 300 }
    ]
  },
  {
    id: 'chaside',
    title: 'Test CHASIDE',
    description: 'Determina tus intereses y aptitudes profesionales para una mejor elección de carrera.',
    questions: CHASIDE_QUESTIONS_TEXT.map((txt, i) => ({
      id: `chaside-${i+1}`,
      text: `${i+1}. ${txt}`,
      type: 'radio',
      options: [{label: 'Sí', value: 'si'}, {label: 'No', value: 'no'}]
    }))
  },
  {
    id: 'epq-r',
    title: 'EPQ-R - Test de Personalidad',
    description: 'Cuestionario de 73 preguntas para evaluar las dimensiones básicas de tu personalidad.',
    questions: EPQR_QUESTIONS_TEXT.map((txt, i) => ({
      id: `epqr-${i+1}`,
      text: `${i+1}. ${txt}`,
      type: 'radio',
      options: [{label: 'Sí', value: 'si'}, {label: 'No', value: 'no'}]
    }))
  }
];
