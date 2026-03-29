
import { Species, Skill, Hindrance, Edge, Power } from './types';

export const SPECIES: Species[] = [
  { 
    id: 'species-humano',
    name: 'Humano', 
    description: 'En la mayoría de entornos de campaña los humanos suelen tener el beneficio racial de una ventaja adicional a su elección. Esta regla refleja su versatilidad y adaptabilidad, comparados con los miembros de otras especies.',
    abilities: [
      { id: 'ability-adaptable', name: 'Adaptable', description: 'Los seres humanos comienzan el juego con una ventaja de rango Novato a su elección. Deben, no obstante, cumplir los requisitos de la misma.' }
    ] 
  },
  { 
    id: 'species-acuariano',
    name: 'Acuariano', 
    description: 'Estos seres proceden de las aplastantes profundidades de los océanos. Son un pueblo fuerte y duro bajo las olas, aunque más vulnerables en tierra firme o las regiones cálidas de la superficie.',
    abilities: [
      { id: 'ability-acuatico', name: 'Acuático', description: 'Los acuarianos no se ahogan en el agua y pueden moverse a su Paso completo cuando nadan. Consulta Movimiento en la página 131 para determinar la velocidad normal nadando.' },
      { id: 'ability-dependencia', name: 'Dependencia', description: 'Los acuarianos deben sumergirse en el agua al menos una hora de cada veinticuatro o sufren de forma automática un nivel de fatiga hasta llegar a incapacitado. Al día siguiente de quedar incapacitados por culpa de la deshidratación, fallecen. Cada hora pasada en el agua permite restaurar un nivel de fatiga.' },
      { id: 'ability-dureza', name: 'Dureza', description: 'La vida en las profundidades de su mundo acuático ha aumentado el aguante y resistencia de sus cuerpos. Su Dureza aumenta en uno.' },
      { id: 'ability-vision-penumbra-acuariano', name: 'Visión en la penumbra', description: 'Los acuarianos están acostumbrados a la oscuridad de las profundidades. Pueden ignorar las penalizaciones por iluminación de penumbra y oscuridad.' }
    ] 
  },
  { 
    id: 'species-androide',
    name: 'Androide', 
    description: 'Los androides son seres semiorgánicos, creados con tecnología avanzada. El ejemplo que aquí presentamos imita al ser humano en casi todo, de tal modo que puede hacerse pasar por uno de ellos cuando lo desee (siempre que no sea examinado por un médico, claro). Su red neural avanzada le proporciona inteligencia artificial completa con una personalidad individual, manías y emociones equivalentes a los de cualquier otro ser sapiente.',
    abilities: [
      { id: 'ability-constructo', name: 'Constructo', description: 'Los androides añaden +2 a sus tiradas para recuperarse del aturdimiento, no respiran, ignoran un punto de penalización por heridas y son inmunes a enfermedades y venenos. Los constructos no sanan de forma natural. Para curarlos es necesario emplear la habilidad Reparar y cada intento consume una hora por herida sufrida; no están sujetos a “la hora de oro” (consulta la pág. 137).' },
      { id: 'ability-juramento-mayor-androide', name: 'Juramento (mayor)', description: 'Los constructos son fabricados con un propósito específico en mente. Los interpretados por los jugadores tienen directrices de comportamiento muy amplias, como servir a una corporación específica o una facción política. Funciona como la desventaja mayor Juramento respecto a ese conjunto específico de directrices. Si ello provoca en algún momento un conflicto de intereses, el jugador y el DJ deben determinar lo que la programación exige hacer al personaje.' },
      { id: 'ability-marginado-mayor-androide', name: 'Marginado (mayor)', description: 'Los androides sustraen dos a todas sus tiradas de Persuadir cuando interactúan con otros seres que no sean también androides. Además, en la mayoría de ambientaciones no tienen derechos legales (en general, se les trata como una propiedad).' },
      { id: 'ability-pacifista-mayor-androide', name: 'Pacifista (mayor)', description: 'A no ser que el androide esté diseñado para el combate, casi todas las sociedades avanzadas exigen la instalación de “circuitos Asimov”, un concepto basado en la Primera Ley de la Robótica del famoso escritor de ciencia ficción Isaac Asimov. Un ser artificial no puede dañar a un ser sapiente ni permitir, por acción o inacción, que un ser sapiente sea dañado. Se representa con la desventaja mayor Pacifista.' }
    ] 
  },
  { 
    id: 'species-aviano',
    name: 'Aviano', 
    description: 'Básicamente, los avianos son seres humanos con wings. Tienden a ser de complexión muy ligera, pues sus huesos están huecos. Algunos tienen alas de plumas, mientras que en otros son similares a las de los murciélagos o escamosas.',
    abilities: [
      { id: 'ability-fragil', name: 'Frágil', description: 'Debido a sus huesos huecos, todos los avianos sufren una penalización de -1 a su Dureza.' },
      { id: 'ability-mal-nadador-aviano', name: 'Mal nadador', description: 'Las alas de los avianos son un problema bajo el agua. Restan dos a todas sus tiradas de Atletismo (nadar) y cada paso de movimiento bajo el agua les cuesta el triple de lo normal.' },
      { id: 'ability-paso-reducido-aviano', name: 'Paso reducido', description: 'Su costumbre de desplazarse volando y la masa de las alas recogidas hacen que los avianos sean una pizca más lentos que otros humanoides al caminar. Reduce en uno su Paso racial (a 5) y su dado de carrera en un nivel (a d4).' },
      { id: 'ability-sentidos-agudos-aviano', name: 'Sentidos agudos', description: 'Los avianos tienen sentidos mucho más afinados que otros individuos. Comienzan con Notar d6 en lugar de d4. Esto aumenta su límite racial hasta d12+1.' },
      { id: 'ability-volar', name: 'Volar', description: 'Los avianos vuelan con Paso 12. Usan Atletismo para hacer maniobras aéreas.' }
    ],
    skillBonuses: { 'Notar': 6 }
  },
  { 
    id: 'species-elfo',
    name: 'Elfo', 
    description: 'Los elfos son un pueblo alto y esbelto, con orejas acabadas en punta y profundos ojos de llamativos colores. Independientemente de si proceden de bosques o de remotos valles ocultos, todos los elfos nacen con mayor gracilidad que los humanos, aunque también son de complexión más ligera. La esperanza de vida de los elfos suele superar los 300 años.',
    abilities: [
      { id: 'ability-agil-elfo', name: 'Ágil', description: 'Todos los elfos son gráciles y diestros. Comienzan el juego con Agilidad d6 en lugar de d4. Esto aumenta su límite racial hasta d12+1.' },
      { id: 'ability-manazas-elfo', name: 'Manazas', description: 'Los elfos muestran un innato rechazo por los objetos mecánicos y, por tanto, todos reciben la desventaja Manazas. Rechazarán emplear la mayoría de instrumentos y aparatos complejos.' },
      { id: 'ability-vision-penumbra-elfo', name: 'Visión en la penumbra', description: 'Los ojos de los elfos amplifican la luz existente. Otras especies afirman que se pueden ver las estrellas en sus pupilas. Sea como sea, ignoran las penalizaciones por iluminación de penumbra y oscuridad.' }
    ],
    attributeBonuses: { 'Agilidad': 6 }
  },
  { 
    id: 'species-enano',
    name: 'Enano', 
    description: 'Los enanos son un pueblo bajito, rechoncho y resistente, que habita en enormes cavernas excavadas en el interior de altas montañas. Son una especie belicosa y orgullosa, que frecuentemente se ve implicada en conflictos con otros pueblos menos civilizados, como los orcos o trasgos.',
    abilities: [
      { id: 'ability-aguante', name: 'Aguante', description: 'Los enanos son un pueblo vigoroso y resistente. Comienzan el juego con Vigor d6 en lugar de d4. Esto aumenta su límite racial hasta d12+1.' },
      { id: 'ability-lento', name: 'Lento', description: 'Los enanos reducen en uno su Paso racial (a 5) y su dado de carrera en un nivel (a d4).' },
      { id: 'ability-vision-penumbra-enano', name: 'Visión en la penumbra', description: 'Los ojos de los enanos están acostumbrados a la oscuridad de los entornos subterráneos. Pueden ignorar las penalizaciones por iluminación de penumbra y oscuridad.' }
    ],
    attributeBonuses: { 'Vigor': 6 }
  },
  { 
    id: 'species-mediano',
    name: 'Mediano', 
    description: 'Los medianos son criaturas pequeñas y ágiles, usualmente con cabello castaño o negro. Cuando se les compara con otras especies son frágiles, pero su alegre optimismo (e ingenio) les hace adoptar una actitud de osadía, convirtiéndolos en un reto a tener en cuenta cuando plantan cara a criaturas de hasta el doble de su tamaño.',
    abilities: [
      { id: 'ability-menudo', name: 'Menudo (Tamaño -1)', description: 'Los medianos rara vez superan los 120 cm de alto. Por ello, su Tamaño (y su Dureza) se reducen en uno.' },
      { id: 'ability-paso-reducido-mediano', name: 'Paso reducido', description: 'Reducen en uno su Paso racial (a 5) y su dado de carrera en un nivel (a d4).' },
      { id: 'ability-suertudo', name: 'Suertudo', description: 'Los medianos reciben un beni adicional por sesión de juego.' },
      { id: 'ability-vivaz', name: 'Vivaz', description: 'En general, los medianos son seres optimistas. Comienzan el juego con Espíritu d6 en lugar de d4. Esto aumenta su límite racial hasta d12+1.' }
    ],
    attributeBonuses: { 'Espíritu': 6 }
  },
  { 
    id: 'species-rakhasa',
    name: 'Rakhasa', 
    description: 'Los rakhasas son similares a seres humanos, pero poseen rasgos felinos. Hay muchos tipos y variantes: la brillante piel de un tigre, la pelambrera con manchas de un leopardo o el exótico aspecto de un gato siamés son ejemplos muy apropiados. Tienen afiladas zarpas y dientes, así como naturaleza cruel cuando llega el momento de disponer de sus presas.',
    abilities: [
      { id: 'ability-agil-rakhasa', name: 'Ágil', description: 'Su gracia felina les otorga Agilidad d6 en lugar de d4. Esto aumenta su límite racial hasta d12+1.' },
      { id: 'ability-enemigo-racial', name: 'Enemigo racial', description: 'La sociedad rakhasa creció a costa de otra. Elige una de las especies comunes de tu ambientación. Los miembros de estas dos culturas sufren una penalización de -2 a sus tiradas de Persuadir entre sí y, a menudo, se atacan nada más verse.' },
      { id: 'ability-garras-mordisco', name: 'Garras/Mordisco', description: 'Los colmillos y garras de los rakhasas se consideran Armas naturales (pág. 142) y causan con ellos FUE+d4.' },
      { id: 'ability-mal-nadador-rakhasa', name: 'Mal nadador', description: 'Es una actividad que no les gusta y en la que tampoco destacan demasiado. Deben restar dos a todas sus tiradas de Atletismo relacionadas con nadar y cada paso de movimiento nadando les cuesta el triple de lo normal.' },
      { id: 'ability-sanguinario-rakhasa', name: 'Sanguinario', description: 'Los rakhasas pueden ser muy crueles con sus enemigos, a menudo juegan con ellos por simple diversión. Rara vez toman prisioneros y sienten muy pocos remordimientos por ejecutarlos.' },
      { id: 'ability-vision-penumbra-rakhasa', name: 'Visión en la penumbra', description: 'Los ojos de los rakhasas amplifican la luz existente y permiten ignorar las penalizaciones por iluminación de penumbra y oscuridad.' }
    ],
    attributeBonuses: { 'Agilidad': 6 }
  },
  { 
    id: 'species-saurio',
    name: 'Saurio', 
    description: 'Los hombres lagarto proceden de junglas humeantes o profundos desiertos, donde han creado su propia civilización, aislados de las demás especies inteligentes.',
    abilities: [
      { id: 'ability-armadura-saurio', name: 'Armadura +2', description: 'Los saurios tienen una piel escamosa que funciona de forma similar a una armadura de cuero.' },
      { id: 'ability-marginado-menor-saurio', name: 'Marginado (menor)', description: 'Muchas otras especies desconfían de los saurios. Quizás se deba a sus extrañas costumbres y formas de actuar, su sibilante pronunciación o un miedo inconsciente hacia los ancestros reptil de estas criaturas. Sea como sea, los saurios sufren una penalización de -2 a Persuadir con todo el mundo excepto su propio pueblo.' },
      { id: 'ability-mordisco-saurio', name: 'Mordisco', description: 'El mordisco de un saurio causa FUE+d4 de daño y se considera un arma natural (consulta la página 142).' },
      { id: 'ability-sentidos-agudos-saurio', name: 'Sentidos agudos', description: 'Los afinados sentidos de los saurios les proporcionan la ventaja Alerta.' },
      { id: 'ability-susceptibilidad-medioambiental', name: 'Susceptibilidad medioambiental', description: 'Aunque no son auténticos seres de sangre fría, los saurios se desenvuelven muy mal en condiciones gélidas. Sufren una penalización de -4 para resistir todos los efectos medioambientales del frío.' }
    ] 
  },
  { 
    id: 'species-semielfo',
    name: 'Semielfo', 
    description: 'Muestran la gracilidad de los elfos, pero no su elegante fragilidad. Casi todos se adaptan bien al entorno, pero algunos sufren el rechazo de alguna de sus dos ramas familiares, pudiendo haber quedado marcados por ello.',
    abilities: [
      { id: 'ability-herencia', name: 'Herencia', description: 'Cada semielfo retiene bien la gracia de su pariente élfico o bien la adaptabilidad de su herencia humana. Durante la creación del personaje, el jugador elige entre comenzar con una ventaja gratuita a su elección o tener d6 en Agilidad, en lugar de d4 (esto también aumenta su límite racial hasta d12+1).' },
      { id: 'ability-marginado-menor-semielfo', name: 'Marginado (menor)', description: 'Los semielfos nunca están del todo cómodos ni en la sociedad humana ni en la élfica, pues tienen un pie en cada mundo, sin decidirse jamás por completo por uno de ellos. Debido a ello, sufren una penalización de -2 a las tiradas de Persuasión con todos excepto los miembros de su propia especie.' },
      { id: 'ability-vision-penumbra-semielfo', name: 'Visión en la penumbra', description: 'Los semielfos ignoran las penalizaciones por iluminación de penumbra y oscuridad.' }
    ],
    heritageChoices: [
      { id: 'heritage-humana', name: 'Herencia Humana', description: 'Ventaja gratuita de rango Novato.', attributeBonuses: {} },
      { id: 'heritage-elfica', name: 'Herencia Élfica', description: 'Agilidad d6 inicial y máximo d12+1.', attributeBonuses: { 'Agilidad': 6 } }
    ]
  },
];

export const ATTRIBUTES = ['Agilidad', 'Astucia', 'Espíritu', 'Fuerza', 'Vigor'];

export const SKILLS: Omit<Skill, 'value'>[] = [
  { id: 'skill-apostar', name: 'Apostar', attribute: 'Astucia', isBasic: false, description: 'Habilidad para ganar dinero en juegos de azar.' },
  { id: 'skill-atletismo', name: 'Atletismo', attribute: 'Agilidad', isBasic: true, description: 'Habilidad física general, incluyendo correr, saltar, trepar y nadar.' },
  { id: 'skill-cabalgar', name: 'Cabalgar', attribute: 'Agilidad', isBasic: false, description: 'Habilidad para montar y controlar animales de montura.' },
  { id: 'skill-ciencia-extraña', name: 'Ciencia Extraña', attribute: 'Astucia', isBasic: false, description: 'Habilidad para crear y usar inventos tecnológicos extraños.' },
  { id: 'skill-ciencias', name: 'Ciencias', attribute: 'Astucia', isBasic: false, description: 'Conocimiento de disciplinas científicas como física, química o biología.' },
  { id: 'skill-conducir', name: 'Conducir', attribute: 'Agilidad', isBasic: false, description: 'Habilidad para manejar vehículos terrestres.' },
  { id: 'skill-conocimientos-generales', name: 'Conocimientos Generales', attribute: 'Astucia', isBasic: true, description: 'Sentido común y conocimientos básicos sobre el mundo.' },
  { id: 'skill-control', name: 'Control', attribute: 'Espíritu', isBasic: false, description: 'Habilidad para controlar y dirigir a otros, a menudo usada con animales o subordinados.' },
  { id: 'skill-disparar', name: 'Disparar', attribute: 'Agilidad', isBasic: false, description: 'Habilidad para usar armas a distancia como pistolas, arcos o rifles.' },
  { id: 'skill-electronica', name: 'Electrónica', attribute: 'Astucia', isBasic: false, description: 'Habilidad para reparar y usar dispositivos electrónicos complejos.' },
  { id: 'skill-fe', name: 'Fe', attribute: 'Espíritu', isBasic: false, description: 'Habilidad para canalizar el poder divino a través de la fe.' },
  { id: 'skill-hechiceria', name: 'Hechicería', attribute: 'Astucia', isBasic: false, description: 'Habilidad para manipular las fuerzas mágicas.' },
  { id: 'skill-humanidades', name: 'Humanidades', attribute: 'Astucia', isBasic: false, description: 'Conocimiento de historia, filosofía, artes y otras disciplinas humanas.' },
  { id: 'skill-idioma', name: 'Idioma', attribute: 'Astucia', isBasic: false, description: 'Habilidad para hablar y entender lenguas extranjeras.' },
  { id: 'skill-interpretar', name: 'Interpretar', attribute: 'Espíritu', isBasic: false, description: 'Habilidad para actuar, cantar o tocar instrumentos.' },
  { id: 'skill-intimidar', name: 'Intimidar', attribute: 'Espíritu', isBasic: false, description: 'Habilidad para asustar o coaccionar a otros.' },
  { id: 'skill-investigar', name: 'Investigar', attribute: 'Astucia', isBasic: false, description: 'Habilidad para buscar información en libros, registros o bases de datos.' },
  { id: 'skill-latrocinio', name: 'Latrocinio', attribute: 'Agilidad', isBasic: false, description: 'Habilidad para forzar cerraduras, robar bolsillos o desactivar trampas.' },
  { id: 'skill-sanar', name: 'Sanar', attribute: 'Astucia', isBasic: false, description: 'Habilidad para tratar heridas y enfermedades.' },
  { id: 'skill-navegar', name: 'Navegar', attribute: 'Agilidad', isBasic: false, description: 'Habilidad para manejar barcos y otras embarcaciones acuáticas.' },
  { id: 'skill-notar', name: 'Notar', attribute: 'Astucia', isBasic: true, description: 'Habilidad para percibir detalles, detectar emboscadas o encontrar objetos ocultos.' },
  { id: 'skill-ocultismo', name: 'Ocultismo', attribute: 'Astucia', isBasic: false, description: 'Conocimiento de lo sobrenatural, lo arcano y lo prohibido.' },
  { id: 'skill-ordenadores', name: 'Ordenadores', attribute: 'Astucia', isBasic: false, description: 'Habilidad para usar, hackear y programar sistemas informáticos.' },
  { id: 'skill-pelear', name: 'Pelear', attribute: 'Agilidad', isBasic: false, description: 'Habilidad para el combate cuerpo a cuerpo, con o sin armas.' },
  { id: 'skill-persuadir', name: 'Persuadir', attribute: 'Espíritu', isBasic: true, description: 'Habilidad para convencer a otros mediante la diplomacia o el encanto.' },
  { id: 'skill-pilotar', name: 'Pilotar', attribute: 'Agilidad', isBasic: false, description: 'Habilidad para manejar aviones, naves espaciales u otros vehículos aéreos.' },
  { id: 'skill-provocar', name: 'Provocar', attribute: 'Astucia', isBasic: false, description: 'Habilidad para insultar o distraer a los enemigos en combate.' },
  { id: 'skill-psionica', name: 'Psiónica', attribute: 'Astucia', isBasic: false, description: 'Habilidad para usar poderes mentales.' },
  { id: 'skill-reparar', name: 'Reparar', attribute: 'Astucia', isBasic: false, description: 'Habilidad para arreglar objetos mecánicos o tecnológicos.' },
  { id: 'skill-sigilo', name: 'Sigilo', attribute: 'Agilidad', isBasic: true, description: 'Habilidad para moverse sin ser visto ni oído.' },
  { id: 'skill-supervivencia', name: 'Supervivencia', attribute: 'Astucia', isBasic: false, description: 'Habilidad para encontrar comida, agua y refugio en la naturaleza.' },
  { id: 'skill-tacticas', name: 'Tácticas', attribute: 'Astucia', isBasic: false, description: 'Habilidad para planificar y ejecutar estrategias militares o de combate.' },
  { id: 'skill-concentracion', name: 'Concentración', attribute: 'Espíritu', isBasic: false, description: 'Habilidad para usar poderes mediante la fuerza de voluntad pura.' },
];

export const ARCANE_BACKGROUNDS = [
  { 
    id: 'ab-magia',
    name: 'Magia', 
    skill: 'Hechicería', 
    powerPoints: 10, 
    powers: 3,
    description: 'Los magos van desde los clásicos hechiceros de fantasía a los modernos ocultistas que han descubierto antiguos y terribles secretos. Sus poderes suelen provenir de la manipulación de energías místicas mediante rituales, palabras de poder o gestos específicos. Habilidad: Hechicería (Astucia).'
  },
  { 
    id: 'ab-milagros',
    name: 'Milagros', 
    skill: 'Fe', 
    powerPoints: 10, 
    powers: 3,
    description: 'Los personajes con este trasfondo son canales de una deidad o fuerza superior. Sus poderes son dones divinos que se manifiestan a través de su fe y devoción. Habilidad: Fe (Espíritu).'
  },
  { 
    id: 'ab-psionica',
    name: 'Psiónica', 
    skill: 'Psiónica', 
    powerPoints: 10, 
    powers: 3,
    description: 'Los psiónicos son individuos que han aprendido a liberar el potencial latente de su propia mente. Sus poderes son manifestaciones de su voluntad y fuerza mental. Habilidad: Psiónica (Astucia).'
  },
  { 
    id: 'ab-ciencia-extrana',
    name: 'Ciencia Extraña', 
    skill: 'Ciencia Extraña', 
    powerPoints: 15, 
    powers: 2,
    description: 'Los científicos extraños son inventores geniales (o locos) que crean artefactos que desafían las leyes de la física convencional. Sus poderes están ligados a sus inventos. Habilidad: Ciencia Extraña (Astucia).'
  },
  { 
    id: 'ab-dotado',
    name: 'Dotado', 
    skill: 'Concentración', 
    powerPoints: 15, 
    powers: 1,
    description: 'Los dotados son individuos con un talento sobrenatural innato que no requiere estudio ni fe, simplemente sucede. Habilidad: Concentración (Espíritu).'
  },
];

export const POWERS: Power[] = [
  { id: 'power-armadura', name: 'Armadura', rank: 'Novato', points: '2', range: 'Toque', duration: '5 (1/asalto)', description: 'Otorga +2 a la Armadura (+4 con un aumento).' },
  { id: 'power-aturdir', name: 'Aturdir', rank: 'Novato', points: '2', range: 'Cono o Plantilla Mediana', duration: 'Instantánea', description: 'Los objetivos deben resistir con Vigor o quedar Aturdidos.' },
  { id: 'power-aumento-reduccion-rasgo', name: 'Aumento/Reducción de Rasgo', rank: 'Novato', points: '2', range: 'Astucia', duration: '5 (1/asalto)', description: 'Aumenta o reduce un Atributo o Habilidad en un tipo de dado (dos con un aumento).' },
  { id: 'power-barrera', name: 'Barrera', rank: 'Novato', points: '2', range: 'Astucia', duration: '5 (1/asalto)', description: 'Crea una sección de muro de 5" (10m) de largo.' },
  { id: 'power-ceguera', name: 'Ceguera', rank: 'Novato', points: '2', range: 'Astucia', duration: 'Instantánea', description: 'El objetivo debe resistir con Vigor o quedar cegado.' },
  { id: 'power-confusion', name: 'Confusión', rank: 'Novato', points: '1', range: 'Astucia', duration: 'Instantánea', description: 'El objetivo debe resistir con Astucia o quedar Distraído y Vulnerable.' },
  { id: 'power-curacion', name: 'Curación', rank: 'Novato', points: '3', range: 'Toque', duration: 'Instantánea', description: 'Sana una herida sufrida en la última hora (dos con un aumento).' },
  { id: 'power-deflexion', name: 'Deflexión', rank: 'Novato', points: '2', range: 'Astucia', duration: '5 (1/asalto)', description: 'Los ataques a distancia contra el objetivo sufren un -2 (-4 con un aumento).' },
  { id: 'power-detectar-ocultar-arcano', name: 'Detectar/Ocultar Arcano', rank: 'Novato', points: '2', range: 'Vista', duration: '5 (Detectar) / 1 hora (Ocultar)', description: 'Permite ver lo invisible/mágico o esconderlo.' },
  { id: 'power-disfraz', name: 'Disfraz', rank: 'Novato', points: '2', range: 'Toque', duration: '10 minutos (1/10 min)', description: 'Cambia la apariencia física del objetivo.' },
  { id: 'power-dormir', name: 'Dormir', rank: 'Novato', points: '2', range: 'Astucia', duration: '10 minutos (1/10 min)', description: 'El objetivo debe resistir con Espíritu o caer dormido.' },
  { id: 'power-empatia', name: 'Empatía', rank: 'Novato', points: '1', range: 'Astucia', duration: '5 (1/asalto)', description: 'Otorga +2 a las tiradas de Persuadir contra el objetivo.' },
  { id: 'power-enmarañar', name: 'Enmarañar', rank: 'Novato', points: '2', range: 'Astucia', duration: 'Instantánea', description: 'Atrapa a los objetivos en redes, lianas, etc.' },
  { id: 'power-escudo', name: 'Escudo', rank: 'Novato', points: '1', range: 'Toque', duration: '5 (1/asalto)', description: 'Otorga +2 a la Parada (+4 con un aumento).' },
  { id: 'power-explosion', name: 'Explosión', rank: 'Novato', points: '3', range: 'Astucia x2', duration: 'Instantánea', description: 'Causa 2d6 de daño en una Plantilla Mediana.' },
  { id: 'power-hablar-idiomas', name: 'Hablar Idiomas', rank: 'Novato', points: '1', range: 'Astucia', duration: '10 minutos (1/10 min)', description: 'Permite hablar y entender cualquier idioma.' },
  { id: 'power-luz-oscuridad', name: 'Luz/Oscuridad', rank: 'Novato', points: '2', range: 'Astucia', duration: '10 minutos (1/10 min)', description: 'Crea luz u oscuridad en una Plantilla Grande.' },
  { id: 'power-miedo', name: 'Miedo', rank: 'Novato', points: '2', range: 'Astucia', duration: 'Instantánea', description: 'Causa una tirada de Miedo a los objetivos.' },
  { id: 'power-proyectil', name: 'Proyectil', rank: 'Novato', points: '1-3', range: 'Astucia x2', duration: 'Instantánea', description: 'Lanza proyectiles mágicos que causan 2d6 de daño.' },
  { id: 'power-puñetazo', name: 'Puñetazo', rank: 'Novato', points: '1', range: 'Toque', duration: '5 (1/asalto)', description: 'Aumenta el daño de los ataques desarmados en +2.' },
  { id: 'power-relieve', name: 'Relieve', rank: 'Novato', points: '1', range: 'Toque', duration: 'Instantánea', description: 'Elimina un nivel de Fatiga o el estado Aturdido.' },
  { id: 'power-sonido-silencio', name: 'Sonido/Silencio', rank: 'Novato', points: '1', range: 'Astucia x2', duration: 'Instantánea (Sonido) / 5 (Silencio)', description: 'Crea sonidos o silencio absoluto.' },
  { id: 'power-telequinesis', name: 'Telequinesis', rank: 'Novato', points: '5', range: 'Astucia', duration: '5 (1/asalto)', description: 'Mueve objetos con la mente usando Espíritu.' },
  { id: 'power-velocidad', name: 'Velocidad', rank: 'Novato', points: '2', range: 'Astucia', duration: '5 (1/asalto)', description: 'Dobla el Paso del objetivo e ignora penalizaciones por terreno difícil.' },
  { id: 'power-volar', name: 'Volar', rank: 'Novato', points: '3', range: 'Astucia', duration: '5 (1/asalto)', description: 'Permite al objetivo volar con Paso 12.' },
  { id: 'power-zancada', name: 'Zancada', rank: 'Novato', points: '1', range: 'Astucia', duration: '5 (1/asalto)', description: 'Aumenta el Paso en +2.' },
  
  { id: 'power-caminar-paredes', name: 'Caminar por las Paredes', rank: 'Experimentado', points: '2', range: 'Toque', duration: '5 (1/asalto)', description: 'Permite caminar por superficies verticales o techos.' },
  { id: 'power-chequeo-miedo', name: 'Chequeo de Miedo', rank: 'Experimentado', points: '2', range: 'Astucia', duration: 'Instantánea', description: 'Obliga a los objetivos a realizar una tirada de Miedo.' },
  { id: 'power-disipar', name: 'Disipar', rank: 'Experimentado', points: '1', range: 'Astucia', duration: 'Instantánea', description: 'Anula los efectos de otros poderes.' },
  { id: 'power-divinacion', name: 'Divinación', rank: 'Experimentado', points: '5', range: 'Personal', duration: '1 minuto', description: 'Permite obtener información del pasado, presente o futuro.' },
  { id: 'power-golpe', name: 'Golpe', rank: 'Experimentado', points: '2', range: 'Toque', duration: '5 (1/asalto)', description: 'Aumenta el daño de un arma en +2 (+4 con un aumento).' },
  { id: 'power-invisibilidad', name: 'Invisibilidad', rank: 'Experimentado', points: '5', range: 'Personal', duration: '5 (1/asalto)', description: 'Vuelve al objetivo invisible (-4 a ser impactado).' },
  { id: 'power-lectura-mentes', name: 'Lectura de Mentes', rank: 'Experimentado', points: '2', range: 'Astucia', duration: 'Instantánea', description: 'Permite leer los pensamientos superficiales del objetivo.' },
  { id: 'power-marioneta', name: 'Marioneta', rank: 'Experimentado', points: '3', range: 'Astucia', duration: '5 (1/asalto)', description: 'Controla las acciones del objetivo.' },
  { id: 'power-teletransporte', name: 'Teletransporte', rank: 'Experimentado', points: '2', range: 'Astucia', duration: 'Instantánea', description: 'Mueve al objetivo hasta 12" (24m) de distancia.' },
  
  { id: 'power-curacion-mayor', name: 'Curación Mayor', rank: 'Veterano', points: '10', range: 'Toque', duration: 'Instantánea', description: 'Sana cualquier número de heridas o incluso miembros perdidos.' },
  { id: 'power-drenar-puntos-poder', name: 'Drenar Puntos de Poder', rank: 'Veterano', points: '3', range: 'Astucia', duration: 'Instantánea', description: 'Roba 1d6 puntos de poder al objetivo.' },
  { id: 'power-resurreccion', name: 'Resurrección', rank: 'Veterano', points: '30', range: 'Toque', duration: 'Instantánea', description: 'Devuelve la vida a un fallecido recientemente.' },
];

export const HINDRANCES: Hindrance[] = [
  { 
    id: 'hindrance-analfabeto',
    name: 'Analfabeto', 
    type: 'Menor', 
    description: 'Tu héroe no sabe leer ni escribir. Puede que sea capaz de firmar con su nombre o reconocer un par de palabras comunes, pero es incapaz de leer un periódico, un contrato o las instrucciones de un frasco de veneno. En entornos modernos, esto puede ser una desventaja social importante. El personaje no puede realizar tiradas de Investigación o cualquier otra que requiera leer o escribir.' 
  },
  { 
    id: 'hindrance-anciano',
    name: 'Anciano', 
    type: 'Mayor', 
    description: 'Tu héroe es mayor. Ha vivido mucho y tiene mucha experiencia, pero su cuerpo ya no es lo que era. Reduce su Paso en 1 y sufre una penalización de -1 a todas sus tiradas de Fuerza y Vigor (esto no reduce el tipo de dado, sino el resultado de la tirada). A cambio, su sabiduría le otorga 5 puntos de habilidad adicionales que debe gastar en habilidades de Astucia. Estos puntos no pueden usarse para comprar nuevas habilidades, solo para mejorar las existentes.' 
  },
  { 
    id: 'hindrance-anemico',
    name: 'Anémico', 
    type: 'Menor', 
    description: 'Tu héroe es enfermizo y tiene poca resistencia física. Resta 1 a todas sus tiradas de Vigor, incluyendo las tiradas para resistir el cansancio, el veneno o las enfermedades, así como las tiradas para recuperarse de heridas o fatiga.' 
  },
  { 
    id: 'hindrance-apacible',
    name: 'Apacible', 
    type: 'Menor', 
    description: 'Tu héroe es de naturaleza pacífica y evita el conflicto siempre que puede. No es un cobarde, simplemente prefiere resolver los problemas hablando. Resta 2 a sus tiradas de Intimidar. Además, si se ve obligado a luchar, suele intentar usar ataques no letales o simplemente defenderse hasta que la situación se calme.' 
  },
  { 
    id: 'hindrance-apocado',
    name: 'Apocado', 
    type: 'Mayor', 
    description: 'Tu héroe es tímido y se amilana fácilmente ante la presencia de otros o en situaciones de estrés social. Resta 2 a sus tiradas de Espíritu cuando intente resistir una prueba de voluntad o una tirada de Intimidar. En situaciones sociales, suele quedarse en un segundo plano y dejar que otros hablen por él.' 
  },
  { 
    id: 'hindrance-arrogante',
    name: 'Arrogante', 
    type: 'Mayor', 
    description: 'Tu héroe cree que es mejor que los demás y no duda en hacérselo saber. Siempre busca el desafío más difícil para demostrar su superioridad, lo que a menudo le mete en problemas innecesarios. Debe humillar a sus oponentes siempre que sea posible y nunca acepta ayuda a menos que sea absolutamente vital.' 
  },
  { 
    id: 'hindrance-avaricioso-menor',
    name: 'Avaricioso', 
    type: 'Menor', 
    description: 'Tu héroe es tacaño con el dinero y siempre intenta regatear o conseguir la mejor parte del botín. Se siente incómodo si tiene que compartir sus recursos sin obtener algo a cambio. Siempre está buscando formas de ahorrar o ganar un poco más de dinero, incluso a costa de pequeñas comodidades.' 
  },
  { 
    id: 'hindrance-avaricioso-mayor',
    name: 'Avaricioso', 
    type: 'Mayor', 
    description: 'Tu héroe es extremadamente codicioso. El dinero y las posesiones materiales son su única prioridad. Hará casi cualquier cosa por una moneda de oro, incluso traicionar a sus compañeros si la oferta es lo suficientemente tentadora. Su vida gira en torno a la acumulación de riqueza y nunca tiene suficiente.' 
  },
  { 
    id: 'hindrance-avergonzado-menor',
    name: 'Avergonzado', 
    type: 'Menor', 
    description: 'Tu héroe tiene algo de lo que se avergüenza, como un pasado criminal menor o un fracaso público. Intenta ocultarlo, pero el miedo a que se descubra le hace estar siempre en guardia. Si su secreto es descubierto, sufre una penalización de -2 a sus tiradas de Persuadir con aquellos que lo conocen.' 
  },
  { 
    id: 'hindrance-avergonzado-mayor',
    name: 'Avergonzado', 
    type: 'Mayor', 
    description: 'Tu héroe vive atormentado por una gran vergüenza que ha arruinado su reputación. Si su secreto sale a la luz, perderá el respeto de todos los que le rodean y será tratado como un paria. Hará cualquier cosa para evitar que esto ocurra, lo que puede ser usado como chantaje por sus enemigos.' 
  },
  { 
    id: 'hindrance-bocazas',
    name: 'Bocazas', 
    type: 'Menor', 
    description: 'Tu héroe no sabe guardar secretos. Si sabe algo interesante, tarde o temprano terminará contándoselo a alguien, a menudo en el peor momento posible. No es que sea malintencionado, simplemente le encanta hablar y ser el centro de atención con noticias jugosas.' 
  },
  { 
    id: 'hindrance-buscado-menor',
    name: 'Buscado', 
    type: 'Menor', 
    description: 'Las autoridades buscan a tu héroe por un delito menor o una confusión. No es un criminal peligroso, pero tiene que evitar a la guardia de la ciudad y puede ser arrestado si es reconocido. Esto complica los viajes y la estancia en lugares civilizados.' 
  },
  { 
    id: 'hindrance-buscado-mayor',
    name: 'Buscado', 
    type: 'Mayor', 
    description: 'Tu héroe es un fugitivo de la justicia por un delito grave que no cometió (o sí). Hay una recompensa por su cabeza y los cazadores de recompensas le siguen el rastro. Es un criminal convicto o un traidor a los ojos de la ley y será ejecutado o encarcelado de por vida si es capturado.' 
  },
  { 
    id: 'hindrance-canalla',
    name: 'Canalla', 
    type: 'Menor', 
    description: 'Tu héroe es un sinvergüenza y un pícaro. No es necesariamente malo, pero sus métodos son poco éticos y a menudo irritan a las personas más honorables. Sufre una penalización de -2 a sus tiradas de Persuadir con individuos de alta moralidad o autoridades.' 
  },
  { 
    id: 'hindrance-cauto',
    name: 'Cauto', 
    type: 'Menor', 
    description: 'Tu héroe es excesivamente cuidadoso y nunca toma riesgos innecesarios. Esto a menudo le hace perder oportunidades o tardar demasiado en actuar en situaciones críticas. Siempre planea cada paso meticulosamente, lo que puede desesperar a sus compañeros más impulsivos.' 
  },
  { 
    id: 'hindrance-ciego',
    name: 'Ciego', 
    type: 'Mayor', 
    description: 'Un individuo que ha perdido completamente la visión. Sufre una penalización de -6 a todas las tareas que dependan de la vista. Por el lado bueno, un personaje ciego recibe una ventaja adicional totalmente gratuita para compensar una desventaja tan seria.' 
  },
  { 
    id: 'hindrance-cobarde',
    name: 'Cobarde', 
    type: 'Mayor', 
    description: 'Tu héroe huye del peligro a la primera oportunidad. No tiene estómago para la lucha. Resta 2 a todas sus tiradas de Miedo. En combate, suele buscar cobertura o intentar escapar a menos que esté acorralado.' 
  },
  { 
    id: 'hindrance-codigo-de-honor',
    name: 'Código de Honor', 
    type: 'Mayor', 
    description: 'Tu héroe vive según un estricto código moral que rige todas sus acciones. Nunca miente, nunca ataca a un enemigo desarmado y siempre cumple su palabra, incluso si eso le pone en peligro mortal. Si rompe su código, sufre una gran crisis de conciencia y puede perder sus beneficios de espíritu.' 
  },
  { 
    id: 'hindrance-cojo-menor',
    name: 'Cojo', 
    type: 'Menor', 
    description: 'Tu héroe camina con dificultad debido a una vieja herida o un defecto de nacimiento. Reduce su Paso en 1 y su dado de carrera se reduce en un tipo (por ejemplo, de d6 a d4).' 
  },
  { 
    id: 'hindrance-cojo-mayor',
    name: 'Cojo', 
    type: 'Mayor', 
    description: 'Tu héroe tiene una pierna inútil o le falta. Reduce su Paso en 2 y su dado de carrera es siempre un d4. Sufre una penalización de -2 a todas las tiradas de Atletismo que requieran movilidad de las piernas.' 
  },
  { 
    id: 'hindrance-corto-de-vista-menor',
    name: 'Corto de Vista', 
    type: 'Menor', 
    description: 'Tu héroe necesita gafas para ver de lejos. Resta 1 a las tiradas de Notar que dependan de la vista a larga distancia. Si pierde las gafas, la penalización aumenta a -2 y afecta a todas las tiradas de ataque a distancia.' 
  },
  { 
    id: 'hindrance-corto-de-vista-mayor',
    name: 'Corto de Vista', 
    type: 'Mayor', 
    description: 'Tu héroe es casi ciego sin sus gafas. Resta 2 a las tiradas de Notar que dependan de la vista. Si pierde las gafas, es incapaz de distinguir nada que esté a más de un par de metros y sufre una penalización de -4 a todas las tiradas de ataque.' 
  },
  { 
    id: 'hindrance-curioso',
    name: 'Curioso', 
    type: 'Mayor', 
    description: 'Tu héroe no puede evitar investigar cosas nuevas, abrir puertas cerradas o leer libros prohibidos. Su curiosidad a menudo supera su sentido común. Si ve algo misterioso, debe realizar una tirada de Astucia para no ir a investigarlo de inmediato.' 
  },
  { 
    id: 'hindrance-delirio-menor',
    name: 'Delirio', 
    type: 'Menor', 
    description: 'Tu héroe cree en algo que no es cierto, como que los gatos son espías del gobierno o que la luna está hecha de queso. Es inofensivo, pero la gente le mira raro y sufre una penalización de -1 a Persuadir con aquellos que conocen su delirio.' 
  },
  { 
    id: 'hindrance-delirio-mayor',
    name: 'Delirio', 
    type: 'Mayor', 
    description: 'Tu héroe sufre una locura importante que afecta a su comportamiento diario. Puede creer que es un rey en el exilio o que tiene una misión divina que nadie más comprende. Esto le causa problemas constantes y una penalización de -2 a Persuadir.' 
  },
  { 
    id: 'hindrance-deseo-mortal',
    name: 'Deseo Mortal', 
    type: 'Menor', 
    description: 'Tu héroe busca una muerte gloriosa en combate para redimirse de un pecado pasado o simplemente porque cree que es su destino. No es suicida, pero nunca rechaza un desafío y siempre se ofrece voluntario para las misiones más peligrosas.' 
  },
  { 
    id: 'hindrance-despiadado-menor',
    name: 'Despiadado', 
    type: 'Menor', 
    description: 'Tu héroe no muestra compasión con sus enemigos una vez que la batalla ha terminado. No toma prisioneros a menos que sea estrictamente necesario y no duda en rematar a los heridos si cree que pueden ser una amenaza futura.' 
  },
  { 
    id: 'hindrance-despiadado-mayor',
    name: 'Despiadado', 
    type: 'Mayor', 
    description: 'Tu héroe es cruel y brutal. Disfruta con el sufrimiento ajeno y no duda en torturar o matar a inocentes para conseguir sus objetivos. Es una persona temida y odiada, y su falta de empatía es evidente para todos.' 
  },
  { 
    id: 'hindrance-despistado',
    name: 'Despistado', 
    type: 'Mayor', 
    description: 'Tu héroe no presta atención a su entorno. Siempre está absorto en sus pensamientos, ya sean científicos, filosóficos o simplemente sueños despiertos. Resta 2 a todas las tiradas de Notar y Conocimientos Generales.' 
  },
  { 
    id: 'hindrance-dubitativo',
    name: 'Dubitativo', 
    type: 'Menor', 
    description: 'Tu héroe duda en los momentos críticos. Siempre es el último en reaccionar cuando surge un problema inesperado. En el primer asalto de cualquier combate, roba dos cartas de iniciativa y quédate con la peor.' 
  },
  { 
    id: 'hindrance-enemigo-menor',
    name: 'Enemigo', 
    type: 'Menor', 
    description: 'Alguien con cierta influencia quiere ver a tu héroe arruinado o humillado. Aparecerá de vez en cuando para complicarle la vida, saboteando sus planes o difamando su nombre.' 
  },
  { 
    id: 'hindrance-enemigo-mayor',
    name: 'Enemigo', 
    type: 'Mayor', 
    description: 'Alguien poderoso quiere ver a tu héroe muerto. Enviará asesinos, usará todos sus recursos legales o militares para acabar con él. Es una amenaza constante que pende sobre su cabeza.' 
  },
  { 
    id: 'hindrance-envidioso-menor',
    name: 'Envidioso', 
    type: 'Menor', 
    description: 'Tu héroe envidia lo que otros tienen, ya sea dinero, fama o talento. Siempre intenta superar a los demás de forma mezquina y se siente resentido por el éxito ajeno.' 
  },
  { 
    id: 'hindrance-envidioso-mayor',
    name: 'Envidioso', 
    type: 'Mayor', 
    description: 'La envidia consume a tu héroe. Es capaz de sabotear a sus propios aliados si cree que están recibiendo más atención que él. Su resentimiento es obvio y daña sus relaciones personales.' 
  },
  { 
    id: 'hindrance-esceptico',
    name: 'Escéptico', 
    type: 'Menor', 
    description: 'Tu héroe no cree en lo sobrenatural, la magia o los dioses. Siempre busca una explicación lógica, incluso cuando tiene una bola de fuego delante de la cara. Sufre una penalización de -2 a las tiradas de Miedo causadas por fenómenos mágicos o sobrenaturales (porque no cree en ellos hasta que es tarde).' 
  },
  { 
    id: 'hindrance-exceso-de-confianza',
    name: 'Exceso de Confianza', 
    type: 'Mayor', 
    description: 'Tu héroe cree que es invencible y que puede superar cualquier obstáculo. Nunca se retira de una pelea y siempre toma el camino más peligroso. Cree que su destino es la grandeza y que nada puede detenerle.' 
  },
  { 
    id: 'hindrance-feo-menor',
    name: 'Feo', 
    type: 'Menor', 
    description: 'Tu héroe es desagradable a la vista debido a cicatrices, rasgos deformes o falta de higiene. Resta 1 a todas sus tiradas de Persuadir. La gente suele evitar el contacto visual con él.' 
  },
  { 
    id: 'hindrance-feo-mayor',
    name: 'Feo', 
    type: 'Mayor', 
    description: 'Tu héroe es horripilante. Su aspecto causa rechazo inmediato en la mayoría de las personas. Resta 2 a todas sus tiradas de Persuadir. En algunas culturas, puede ser tratado como un monstruo.' 
  },
  { 
    id: 'hindrance-fobia-menor',
    name: 'Fobia', 
    type: 'Menor', 
    description: 'Tu héroe tiene un miedo irracional a algo común, como las arañas, las alturas o los espacios cerrados. Resta 1 a todas sus tiradas cuando esté en presencia de su fobia.' 
  },
  { 
    id: 'hindrance-fobia-mayor',
    name: 'Fobia', 
    type: 'Mayor', 
    description: 'Tu héroe tiene un pánico paralizante a algo. Debe realizar una tirada de Miedo con una penalización de -2 cuando se enfrente a su fobia. Si falla, queda aterrorizado y debe huir o quedar paralizado.' 
  },
  { 
    id: 'hindrance-habito-menor',
    name: 'Hábito', 
    type: 'Menor', 
    description: 'Tu héroe tiene una costumbre molesta, como hurgarse la nariz, hablar solo o usar muletillas constantes. Resta 1 a sus tiradas de Persuadir en situaciones sociales debido a la irritación que causa en los demás.' 
  },
  { 
    id: 'hindrance-habito-mayor',
    name: 'Hábito', 
    type: 'Mayor', 
    description: 'Tu héroe tiene una adicción grave que afecta a su salud y a su bolsillo. Si no satisface su hábito con regularidad (cada 24 horas), sufre niveles de fatiga que pueden llevarle a la muerte.' 
  },
  { 
    id: 'hindrance-heroico',
    name: 'Heroico', 
    type: 'Mayor', 
    description: 'Tu héroe siempre ayuda a los necesitados, incluso si eso le pone en peligro mortal. No puede ignorar una petición de auxilio legítima y siempre intenta hacer lo correcto, sin importar el coste personal.' 
  },
  { 
    id: 'hindrance-impulsivo',
    name: 'Impulsivo', 
    type: 'Mayor', 
    description: 'Tu héroe actúa antes de pensar. Si ve una palanca, la tira. Si ve un enemigo, carga. Nunca espera a tener un plan y su impaciencia a menudo mete al grupo en problemas.' 
  },
  { 
    id: 'hindrance-joven-menor',
    name: 'Joven', 
    type: 'Menor', 
    description: 'Tu héroe es un adolescente que aún no ha alcanzado la madurez física. Reduce su Tamaño en 1 y su Dureza en 1. Además, solo dispone de 10 puntos de habilidad en lugar de 12. A cambio, recibe un beni adicional por sesión debido a su suerte de principiante.' 
  },
  { 
    id: 'hindrance-joven-mayor',
    name: 'Joven', 
    type: 'Mayor', 
    description: 'Tu héroe es un niño. Reduce su Tamaño en 2 y su Dureza en 2. Sus dados de Fuerza y Vigor se reducen en un tipo (mínimo d4). Además, solo dispone de 10 puntos de habilidad en lugar de 12. A cambio, recibe dos benis adicionales por sesión.' 
  },
  { 
    id: 'hindrance-juramento-menor',
    name: 'Juramento', 
    type: 'Menor', 
    description: 'Tu héroe ha hecho una promesa menor a una persona o institución. Debe cumplirla siempre que no entre en conflicto directo con su supervivencia o sus objetivos principales.' 
  },
  { 
    id: 'hindrance-juramento-mayor',
    name: 'Juramento', 
    type: 'Mayor', 
    description: 'Tu héroe ha dedicado su vida a una causa sagrada o una misión vital. Nada le desviará de su camino y sacrificará cualquier cosa por cumplir su juramento.' 
  },
  { 
    id: 'hindrance-leal',
    name: 'Leal', 
    type: 'Menor', 
    description: 'Tu héroe nunca abandona a sus amigos. Si un compañero está en peligro, hará todo lo posible por ayudarle, incluso si es arriesgado. Es un pilar de confianza para el grupo.' 
  },
  { 
    id: 'hindrance-mal-nadador',
    name: 'Mal Nadador', 
    type: 'Menor', 
    description: 'Tu héroe se hunde como una piedra en el agua. Resta 2 a todas sus tiradas de Atletismo relacionadas con nadar y su Paso en el agua se reduce a la mitad.' 
  },
  { 
    id: 'hindrance-mala-suerte',
    name: 'Mala Suerte', 
    type: 'Mayor', 
    description: 'Tu héroe parece haber nacido bajo una estrella negra. Recibe un beni menos de lo normal al comienzo de cada sesión de juego (mínimo 0).' 
  },
  { 
    id: 'hindrance-manazas',
    name: 'Manazas', 
    type: 'Menor', 
    description: 'Tu héroe es torpe con los objetos mecánicos y la tecnología. Resta 2 a todas sus tiradas de Reparar y de usar aparatos complejos. Si saca un 1 en el dado de habilidad al usar un objeto mecánico, este se rompe.' 
  },
  { 
    id: 'hindrance-manco',
    name: 'Manco', 
    type: 'Mayor', 
    description: 'A tu héroe le falta un brazo. No puede usar armas de dos manos y sufre una penalización de -2 en cualquier tarea que requiera el uso de ambas manos.' 
  },
  { 
    id: 'hindrance-mania',
    name: 'Manía', 
    type: 'Menor', 
    description: 'Tu héroe tiene una obsesión menor, como lavarse las manos constantemente o alinear sus cubiertos. Si no puede realizar su manía, sufre una penalización de -1 a sus tiradas de Espíritu debido al estrés.' 
  },
  { 
    id: 'hindrance-marginado-menor',
    name: 'Marginado', 
    type: 'Menor', 
    description: 'Tu héroe pertenece a un grupo social despreciado por la mayoría. Sufre una penalización de -2 a sus tiradas de Persuadir con personas ajenas a su grupo debido a los prejuicios.' 
  },
  { 
    id: 'hindrance-marginado-mayor',
    name: 'Marginado', 
    type: 'Mayor', 
    description: 'Tu héroe es un paria total. Es perseguido o despreciado activamente por la sociedad dominante. Su mera presencia puede causar hostilidad o miedo.' 
  },
  { 
    id: 'hindrance-mudo',
    name: 'Mudo', 
    type: 'Mayor', 
    description: 'Tu héroe no puede hablar. Debe comunicarse mediante gestos, escritura o telepatía si dispone de ella. Esto hace que las interacciones sociales sean extremadamente difíciles.' 
  },
  { 
    id: 'hindrance-obeso',
    name: 'Obeso', 
    type: 'Menor', 
    description: 'Tu héroe tiene un sobrepeso considerable. Aumenta su Tamaño en 1 (y por tanto su Dureza), pero reduce su Paso en 1 y su dado de carrera es siempre un d4. Además, su dado de Fuerza nunca puede ser superior a d8.' 
  },
  { 
    id: 'hindrance-obligaciones-menor',
    name: 'Obligaciones', 
    type: 'Menor', 
    description: 'Tu héroe tiene responsabilidades que le quitan tiempo, como un trabajo a tiempo parcial o una familia que cuidar. Esto puede impedirle participar en algunas aventuras o requerir que regrese a casa con frecuencia.' 
  },
  { 
    id: 'hindrance-obligaciones-mayor',
    name: 'Obligaciones', 
    type: 'Mayor', 
    description: 'Tu héroe está atado por grandes responsabilidades que dominan su vida, como ser el gobernante de una región o el único protector de un pueblo. Sus deberes siempre son lo primero.' 
  },
  { 
    id: 'hindrance-obsesion-menor',
    name: 'Obsesión', 
    type: 'Menor', 
    description: 'Tu héroe está obsesionado con algo, como encontrar un tesoro legendario o demostrar una teoría científica. Siempre intenta dirigir la conversación hacia su tema y gasta sus recursos en ello.' 
  },
  { 
    id: 'hindrance-obsesion-mayor',
    name: 'Obsesión', 
    type: 'Mayor', 
    description: 'Una obsesión domina la vida de tu héroe. Es capaz de sacrificarlo todo, incluyendo su vida y la de sus amigos, por conseguir su objetivo obsesivo.' 
  },
  { 
    id: 'hindrance-pacifista-menor',
    name: 'Pacifista', 
    type: 'Menor', 
    description: 'Tu héroe evita la violencia necesaria y solo lucha en defensa propia o para proteger a otros. Nunca mata a un enemigo que se rinde o que está incapacitado.' 
  },
  { 
    id: 'hindrance-pacifista-mayor',
    name: 'Pacifista', 
    type: 'Mayor', 
    description: 'Tu héroe se niega a usar la violencia bajo cualquier circunstancia. Intentará detener las peleas mediante la palabra y nunca causará daño directo a otro ser vivo, incluso si su vida corre peligro.' 
  },
  { 
    id: 'hindrance-patoso',
    name: 'Patoso', 
    type: 'Mayor', 
    description: 'Tu héroe siempre se tropieza, tira las cosas o hace ruido cuando intenta ser sigiloso. Resta 2 a sus tiradas de Sigilo y Atletismo. Es un peligro para cualquier misión de infiltración.' 
  },
  { 
    id: 'hindrance-pequeño',
    name: 'Pequeño', 
    type: 'Menor', 
    description: 'Tu héroe es muy bajito para su especie. Reduce su Tamaño en 1 y, por tanto, su Dureza en 1.' 
  },
  { 
    id: 'hindrance-pobreza',
    name: 'Pobreza', 
    type: 'Menor', 
    description: 'Tu héroe empieza con la mitad del dinero inicial y parece que nunca es capaz de ahorrar nada. Siempre está endeudado o vive al día.' 
  },
  { 
    id: 'hindrance-sanguinario',
    name: 'Sanguinario', 
    type: 'Mayor', 
    description: 'Tu héroe es cruel con sus enemigos y disfruta con su sufrimiento. Nunca toma prisioneros y a menudo se ensaña con los caídos. Sufre una penalización de -4 a Persuadir con personas honorables.' 
  },
  { 
    id: 'hindrance-secreto-menor',
    name: 'Secreto', 
    type: 'Menor', 
    description: 'Tu héroe oculta algo que podría causarle problemas sociales o legales si se descubriera. Vive con el miedo constante de ser expuesto.' 
  },
  { 
    id: 'hindrance-secreto-mayor',
    name: 'Secreto', 
    type: 'Mayor', 
    description: 'Tu héroe oculta algo que podría arruinar su vida o llevarle a la ejecución si saliera a la luz. Sus enemigos pueden usar este secreto para controlarlo.' 
  },
  { 
    id: 'hindrance-sensible-menor',
    name: 'Sensible', 
    type: 'Menor', 
    description: 'Tu héroe se ofende fácilmente por cualquier comentario o crítica. Resta 1 a sus tiradas de Persuadir cuando se sienta insultado. Suele guardar rencor por pequeñas afrentas.' 
  },
  { 
    id: 'hindrance-sensible-mayor',
    name: 'Sensible', 
    type: 'Mayor', 
    description: 'Tu héroe es extremadamente emocional y voluble. Sus sentimientos dictan sus acciones por encima de la lógica. Sufre una penalización de -2 a Persuadir debido a sus estallidos emocionales.' 
  },
  { 
    id: 'hindrance-sordo-menor',
    name: 'Sordo', 
    type: 'Menor', 
    description: 'Tu héroe tiene problemas de audición. Resta 2 a todas las tiradas de Notar que dependan del oído. Tiene dificultades para seguir conversaciones en lugares ruidosos.' 
  },
  { 
    id: 'hindrance-sordo-mayor',
    name: 'Sordo', 
    type: 'Mayor', 
    description: 'Tu héroe es totalmente sordo. Es inmune a los ataques basados en el sonido, pero es incapaz de oír nada. Sufre una penalización de -4 a Notar en situaciones donde el sonido sea clave.' 
  },
  { 
    id: 'hindrance-suspicaz-menor',
    name: 'Suspicaz', 
    type: 'Menor', 
    description: 'Tu héroe no se fía de nadie y siempre espera lo peor de los demás. Resta 1 a todas sus tiradas de Persuadir debido a su actitud defensiva y poco amigable.' 
  },
  { 
    id: 'hindrance-suspicaz-mayor',
    name: 'Suspicaz', 
    type: 'Mayor', 
    description: 'La paranoia domina a tu héroe. Cree que todo el mundo conspira contra él y que incluso sus amigos tienen motivos ocultos. Es extremadamente difícil ganar su confianza.' 
  },
  { 
    id: 'hindrance-tozudo',
    name: 'Tozudo', 
    type: 'Menor', 
    description: 'Tu héroe siempre quiere tener la razón y rara vez admite un error. Es difícil convencerle de que cambie de opinión, incluso ante pruebas evidentes.' 
  },
  { 
    id: 'hindrance-tuerto',
    name: 'Tuerto', 
    type: 'Mayor', 
    description: 'A tu héroe le falta un ojo. Resta 2 a todas las tiradas que requieran percepción de profundidad, como disparar armas a distancia o conducir vehículos a alta velocidad.' 
  },
  { 
    id: 'hindrance-vengativo-menor',
    name: 'Vengativo', 
    type: 'Menor', 
    description: 'Tu héroe no olvida una afrenta y siempre busca la oportunidad de devolver el golpe, aunque sea de forma sutil. No descansará hasta que se haya hecho "justicia" según su criterio.' 
  },
  { 
    id: 'hindrance-vengativo-mayor',
    name: 'Vengativo', 
    type: 'Mayor', 
    description: 'Tu héroe vive para la venganza. No descansará hasta que aquellos que le perjudicaron hayan pagado con creces, a menudo con su vida. Esta obsesión puede nublar su juicio.' 
  },
];

export const EDGES: Edge[] = [
  {
    id: 'edge-acaparador',
    name: 'Acaparador', 
    requirements: 'Novato, Astucia d6+', 
    effects: 'Tu héroe tiene un talento natural para encontrar objetos útiles. Recibe un bono de +2 a todas las tiradas de Notar para encontrar equipo o suministros.' 
  },
  { 
    id: 'edge-acrobata',
    name: 'Acróbata', 
    requirements: 'Novato, Agilidad d8+, Atletismo d8+', 
    effects: 'Tu héroe es extremadamente ágil. Recibe un bono de +2 a las tiradas de Atletismo para realizar maniobras acrobáticas y +1 a su Parada si no lleva armadura pesada.' 
  },
  { 
    id: 'edge-afortunado',
    name: 'Afortunado', 
    requirements: 'Novato', 
    effects: 'Tu héroe parece tener una suerte increíble. Recibe un beni adicional al comienzo de cada sesión de juego.' 
  },
  { 
    id: 'edge-agitador',
    name: 'Agitador', 
    requirements: 'Experimentado, Espíritu d8+', 
    effects: 'Tu héroe puede usar las habilidades Intimidar o Provocar contra todos los enemigos en un área de plantilla de ráfaga pequeña.' 
  },
  { 
    id: 'edge-alerta',
    name: 'Alerta', 
    requirements: 'Novato', 
    effects: 'Tu héroe siempre está atento a su entorno. Recibe un bono de +2 a todas sus tiradas de Notar.' 
  },
  { 
    id: 'edge-ambas-manos',
    name: 'Ambas manos', 
    requirements: 'Novato, Agilidad d8+', 
    effects: 'Tu héroe es experto en luchar con un arma en cada mano. Si realiza un ataque con cada mano (cuerpo a cuerpo), no sufre la penalización por acción múltiple.' 
  },
  { 
    id: 'edge-ambidiestro',
    name: 'Ambidiestro', 
    requirements: 'Novato, Agilidad d8+', 
    effects: 'Tu héroe puede usar ambas manos con la misma habilidad. Ignora la penalización de -2 por usar la mano torpe.' 
  },
  { 
    id: 'edge-amenazador',
    name: 'Amenazador', 
    requirements: 'Experimentado, Intimidar d8+', 
    effects: 'Tu héroe es verdaderamente aterrador. Recibe un bono de +2 a todas sus tiradas de Intimidar.' 
  },
  { 
    id: 'edge-aristocrata',
    name: 'Aristócrata', 
    requirements: 'Novato', 
    effects: 'Tu héroe proviene de la nobleza o de una familia de gran prestigio. Recibe un bono de +2 a las tiradas de Persuadir cuando trata con la alta sociedad o autoridades.' 
  },
  { 
    id: 'edge-arma-distintiva',
    name: 'Arma Distintiva', 
    requirements: 'Novato, Pelear o Disparar d8+', 
    effects: 'Tu héroe tiene un arma especial con la que ha entrenado extensamente. Recibe un bono de +1 a las tiradas de ataque y +1 a la Parada mientras empuñe ese arma específica.' 
  },
  { 
    id: 'edge-as',
    name: 'As', 
    requirements: 'Novato, Agilidad d8+', 
    effects: 'Tu héroe es un piloto o conductor excepcional. Recibe un bono de +2 a las tiradas de Conducir, Pilotar y Navegar. Además, puede gastar benis para realizar tiradas de Vigor por su vehículo para ignorar Heridas.' 
  },
  { 
    id: 'edge-asesino',
    name: 'Asesino', 
    requirements: 'Novato, Agilidad d8+, Pelear d6+, Sigilo d8+', 
    effects: 'Tu héroe es un maestro de la muerte silenciosa. Añade +2 a sus tiradas de daño cuando ataca a un enemigo por sorpresa o por la espalda.' 
  },
  { 
    id: 'edge-atractivo',
    name: 'Atractivo', 
    requirements: 'Novato, Vigor d6+', 
    effects: 'Tu héroe es físicamente muy agraciado. Recibe un bono de +1 a las tiradas de Persuadir e Interpretar.' 
  },
  { 
    id: 'edge-barrido',
    name: 'Barrido', 
    requirements: 'Novato, Fuerza d8+, Pelear d8+', 
    effects: 'Tu héroe puede atacar a todos los enemigos adyacentes con una sola acción. Realiza una única tirada de Pelea con una penalización de -2 y compárala con la Parada de cada oponente.' 
  },
  { 
    id: 'edge-barrido-mejorado',
    name: 'Barrido mejorado', 
    requirements: 'Experimentado, Barrido', 
    effects: 'Como Barrido, pero el héroe ignora la penalización de -2.' 
  },
  { 
    id: 'edge-beni-adicional',
    name: 'Beni adicional', 
    requirements: 'Legendario', 
    effects: 'Tu héroe es una leyenda viviente y recibe un beni adicional al comienzo de cada sesión.' 
  },
  { 
    id: 'edge-berserk',
    name: 'Berserk', 
    requirements: 'Novato', 
    effects: 'Cuando tu héroe sufre una Herida, debe realizar una tirada de Espíritu o entrar en un estado de furia ciega. Recibe un bono de +2 a las tiradas de Pelea y Fuerza, y +2 a la Dureza (en furia), pero no puede usar habilidades que requieran concentración.' 
  },
  { 
    id: 'edge-bloqueo',
    name: 'Bloqueo', 
    requirements: 'Experimentado, Pelear d8+', 
    effects: 'Tu héroe es experto en defenderse en combate cuerpo a cuerpo. Su Parada aumenta en +1.' 
  },
  { 
    id: 'edge-bloqueo-mejorado',
    name: 'Bloqueo mejorado', 
    requirements: 'Veterano, Bloqueo', 
    effects: 'Tu héroe es un maestro de la defensa. Su Parada aumenta en un total de +2.' 
  },
  { 
    id: 'edge-bruto',
    name: 'Bruto', 
    requirements: 'Novato, Fuerza d6+, Vigor d6+', 
    effects: 'Tu héroe es un luchador nato que usa su fuerza bruta. Puede usar su Fuerza en lugar de Agilidad para calcular su movimiento y para resistir ciertas maniobras de combate.' 
  },
  { 
    id: 'edge-calculador',
    name: 'Calculador', 
    requirements: 'Novato, Astucia d8+', 
    effects: 'Tu héroe es un estratega frío. Si obtiene un 5 o menos en su carta de acción, puede ignorar hasta 2 puntos de penalización por cobertura o iluminación en su primer ataque.' 
  },
  { 
    id: 'edge-carismatico',
    name: 'Carismático', 
    requirements: 'Novato, Espíritu d8+', 
    effects: 'Tu héroe tiene una personalidad magnética. Recibe un beni adicional que solo puede usarse para repetir tiradas de Persuadir o Interpretar.' 
  },
  { 
    id: 'edge-chatarrero',
    name: 'Chatarrero', 
    requirements: 'Novato, Afortunado', 
    effects: 'Tu héroe tiene un talento especial para encontrar objetos útiles. Una vez por sesión, puede encontrar un objeto útil que necesite en ese momento.' 
  },
  { 
    id: 'edge-concentracion',
    name: 'Concentración', 
    requirements: 'Experimentado, Trasfondo Arcano', 
    effects: 'La duración de los poderes con mantenimiento se duplica antes de tener que pagar el coste de mantenimiento.' 
  },
  { 
    id: 'edge-conexiones',
    name: 'Conexiones', 
    requirements: 'Novato', 
    effects: 'Tu héroe tiene una red de contactos en una organización o grupo social. Puede pedir favores, información o equipo una vez por sesión.' 
  },
  { 
    id: 'edge-contraataque',
    name: 'Contraataque', 
    requirements: 'Experimentado, Pelear d8+', 
    effects: 'Una vez por asalto, si un enemigo falla un ataque de Pelea contra tu héroe, este puede realizar un ataque de Pelea inmediato contra ese enemigo como acción gratuita.' 
  },
  { 
    id: 'edge-contraataque-mejorado',
    name: 'Contraataque mejorado', 
    requirements: 'Veterano, Contraataque', 
    effects: 'Tu héroe puede realizar un contraataque contra todos los enemigos que fallen un ataque de Pelea contra él en el mismo asalto.' 
  },
  { 
    id: 'edge-curandero',
    name: 'Curandero', 
    requirements: 'Novato, Espíritu d8+', 
    effects: 'Tu héroe tiene un don para la medicina. Recibe un bono de +2 a todas las tiradas de Sanar.' 
  },
  { 
    id: 'edge-desenfundado-rapido',
    name: 'Desenfundado rápido', 
    requirements: 'Novato, Agilidad d8+', 
    effects: 'Tu héroe puede desenvainar un arma (o sacarla de su funda) como acción gratuita. Además, si tiene que realizar una tirada de Agilidad para ver quién actúa primero en un duelo, recibe un bono de +2.' 
  },
  { 
    id: 'edge-dificil-de-matar',
    name: 'Difícil de Matar', 
    requirements: 'Novato, Espíritu d6+', 
    effects: 'Tu héroe es increíblemente resistente. Ignora las penalizaciones por Heridas al realizar tiradas de Incapacitación.' 
  },
  { 
    id: 'edge-drenaje-de-alma',
    name: 'Drenaje de alma', 
    requirements: 'Experimentado, Trasfondo Arcano, Habilidad arcana d8+', 
    effects: 'Cuando el héroe se queda sin Puntos de Poder, puede realizar una tirada de Espíritu para obtener 5 PP a cambio de sufrir un nivel de fatiga.' 
  },
  { 
    id: 'edge-duro-de-pelar',
    name: 'Duro de pelar', 
    requirements: 'Veterano, Difícil de Matar', 
    effects: 'Si tu héroe resultase muerto, realiza una tirada de Espíritu. Si tiene éxito, queda Incapacitado en su lugar.' 
  },
  { 
    id: 'edge-erudito',
    name: 'Erudito', 
    requirements: 'Novato, Habilidad de conocimiento d8+', 
    effects: 'Tu héroe es un experto en un campo de estudio específico. Elige una habilidad de conocimiento (Ciencias, Humanidades, Idioma, Investigar u Ocultismo) que tengas a d8 o más. Recibe un bono de +2 a todas las tiradas de esa habilidad. Puedes elegir esta ventaja varias veces, aplicándola a una habilidad distinta cada vez.' 
  },
  { 
    id: 'edge-esquiva',
    name: 'Esquiva', 
    requirements: 'Experimentado, Agilidad d8+', 
    effects: 'Tu héroe es experto en evitar ataques a distancia. Los ataques de disparo contra él sufren una penalización de -2.' 
  },
  { 
    id: 'edge-esquiva-mejorada',
    name: 'Esquiva mejorada', 
    requirements: 'Veterano, Esquiva', 
    effects: 'Tu héroe es casi imposible de alcanzar a distancia. Los ataques de disparo contra él sufren una penalización de -4.' 
  },
  { 
    id: 'edge-experto',
    name: 'Experto', 
    requirements: 'Legendario, Profesional', 
    effects: 'El dado de la habilidad elegida en Profesional aumenta a d12+2.' 
  },
  { 
    id: 'edge-fama',
    name: 'Fama', 
    requirements: 'Novato', 
    effects: 'Tu héroe es conocido por sus hazañas. Recibe un bono de +1 a las tiradas de Persuadir con aquellos que lo reconozcan.' 
  },
  { 
    id: 'edge-fama-mejorada',
    name: 'Fama mejorada', 
    requirements: 'Experimentado, Fama', 
    effects: 'Tu héroe es una celebridad. El bono de Persuadir aumenta a +2.' 
  },
  { 
    id: 'edge-fervor',
    name: 'Fervor', 
    requirements: 'Experimentado, Mando', 
    effects: 'Los aliados en el Radio de Mando de tu héroe añaden +1 a sus tiradas de daño en combate cuerpo a cuerpo.' 
  },
  { 
    id: 'edge-finta',
    name: 'Finta', 
    requirements: 'Novato, Pelear d8+', 
    effects: 'Tu héroe es un maestro del engaño en combate. Puede realizar una finta (usando Pelear contra la Parada del objetivo) para que este quede Distraído o Vulnerable.' 
  },
  { 
    id: 'edge-fornido',
    name: 'Fornido', 
    requirements: 'Novato, Fuerza d6+, Vigor d6+', 
    effects: 'Tu héroe es excepcionalmente robusto. Su Tamaño aumenta en +1 y su Dureza en +1. Además, su Fuerza se considera un tipo de dado superior a efectos de Carga.' 
  },
  { 
    id: 'edge-frenesi',
    name: 'Frenesí', 
    requirements: 'Experimentado, Pelear d8+', 
    effects: 'Tu héroe puede realizar un ataque de Pelea adicional por asalto con una penalización de -2 a todas sus tiradas de Pelea ese turno.' 
  },
  { 
    id: 'edge-frenesi-mejorado',
    name: 'Frenesí mejorado', 
    requirements: 'Veterano, Frenesí', 
    effects: 'Como Frenesí, pero el héroe ignora la penalización de -2.' 
  },
  { 
    id: 'edge-golpe-de-poder',
    name: 'Golpe de poder', 
    requirements: 'Novato, Pelear d10+', 
    effects: 'Tu héroe puede sacrificar precisión por potencia. Puede restar 2 a su tirada de Pelea para añadir +4 al daño si impacta.' 
  },
  { 
    id: 'edge-humillar',
    name: 'Humillar', 
    requirements: 'Experimentado, Provocar d8+', 
    effects: 'Tu héroe puede usar la habilidad Provocar para hacer que un enemigo quede Vulnerable además de Distraído.' 
  },
  { 
    id: 'edge-impetu',
    name: 'Ímpetu', 
    requirements: 'Novato, Espíritu d8+', 
    effects: 'Tu héroe tiene una energía y entusiasmo contagiosos. Recibe un bono de +2 a sus tiradas cuando gasta un beni para repetir una tirada.' 
  },
  { 
    id: 'edge-indomable',
    name: 'Indomable', 
    requirements: 'Experimentado, Espíritu d8+', 
    effects: 'Tu héroe es increíblemente difícil de doblegar. Recibe un bonificador de +2 a sus tiradas para resistir poderes o ataques sociales.' 
  },
  { 
    id: 'edge-inspiracion',
    name: 'Inspiración', 
    requirements: 'Novato, Mando', 
    effects: 'Los aliados en el Radio de Mando de tu héroe reciben un bono de +1 a sus tiradas de Espíritu para recuperarse del estado Sacudido.' 
  },
  { 
    id: 'edge-inspiracion-heroica',
    name: 'Inspiración heroica', 
    requirements: 'Heroico, Inspiración', 
    effects: 'Los aliados bajo el mando de tu héroe pueden repetir cualquier tirada de Espíritu fallida, no solo para recuperarse de estar Aturdidos.' 
  },
  { 
    id: 'edge-instinto-asesino',
    name: 'Instinto asesino', 
    requirements: 'Experimentado', 
    effects: 'Tu héroe tiene un instinto letal. Puede repetir cualquier tirada de dados de daño que obtenga un 1 en el dado de habilidad (no en el dado salvaje).' 
  },
  { 
    id: 'edge-investigador',
    name: 'Investigador', 
    requirements: 'Novato, Astucia d8+, Investigar d8+', 
    effects: 'Tu héroe es un experto en encontrar información. Recibe un bono de +2 a todas las tiradas de Investigar y Notar (cuando busca pistas).' 
  },
  { 
    id: 'edge-investigador-jefe',
    name: 'Investigador jefe', 
    requirements: 'Experimentado, Investigador', 
    effects: 'Tu héroe puede realizar una tirada de Investigación en la mitad del tiempo normal y con un bono adicional de +2.' 
  },
  { 
    id: 'edge-ladron',
    name: 'Ladrón', 
    requirements: 'Novato, Agilidad d8+, Sigilo d6+, Latrocinio d6+, Atletismo d6+', 
    effects: 'Tu héroe es un experto en infiltración y robo. Recibe un bono de +1 a las tiradas de Sigilo en entornos urbanos, Latrocinio y Atletismo para trepar.' 
  },
  { 
    id: 'edge-lider-de-hombres',
    name: 'Líder de hombres', 
    requirements: 'Experimentado, Mando', 
    effects: 'Los aliados bajo el mando del héroe añaden +1 a sus tiradas de Espíritu para recuperarse del estado Sacudido (esto se apila con Inspiración).' 
  },
  { 
    id: 'edge-lider-nato',
    name: 'Líder nato', 
    requirements: 'Experimentado, Espíritu d8+, Mando', 
    effects: 'Tu héroe puede entregar sus propios benis a cualquier aliado que se encuentre en su Radio de Mando.' 
  },
  { 
    id: 'edge-linguista',
    name: 'Lingüista', 
    requirements: 'Novato, Astucia d6+', 
    effects: 'Tu héroe tiene un don para los idiomas. Conoce un número de idiomas adicionales igual a la mitad de su dado de Astucia.' 
  },
  { 
    id: 'edge-luchador-improvisado',
    name: 'Luchador improvisado', 
    requirements: 'Experimentado, Astucia d6+', 
    effects: 'Tu héroe puede convertir cualquier cosa en un arma. Ignora la penalización de -2 por usar armas improvisadas.' 
  },
  { 
    id: 'edge-mando',
    name: 'Mando', 
    requirements: 'Novato, Espíritu d6+', 
    effects: 'Tu héroe es un líder natural. Los aliados en su Radio de Mando pueden repetir sus tiradas de Espíritu para recuperarse del estado Sacudido.' 
  },
  { 
    id: 'edge-mandibula-de-hierro',
    name: 'Mandíbula de hierro', 
    requirements: 'Novato, Vigor d8+', 
    effects: 'Tu héroe es capaz de encajar golpes que dejarían fuera de combate a otros. Recibe un bono de +2 a las tiradas de Vigor para resistir el estado Aturdido.' 
  },
  { 
    id: 'edge-manitas',
    name: 'Manitas', 
    requirements: 'Novato, Astucia d10+', 
    effects: 'Tu héroe tiene una amplia gama de conocimientos básicos. No sufre la penalización de -2 por usar habilidades en las que no tiene entrenamiento (excepto habilidades arcanas).' 
  },
  { 
    id: 'edge-mantener-la-linea',
    name: '¡Mantener la línea!', 
    requirements: 'Experimentado, Mando', 
    effects: 'Los aliados en el Radio de Mando de tu héroe añaden +1 a su Dureza.' 
  },
  { 
    id: 'edge-maestro',
    name: 'Maestro', 
    requirements: 'Heroico, Habilidad d12+', 
    effects: 'Elige una habilidad en la que tengas d12+. Tu héroe puede repetir una tirada fallida de esa habilidad una vez por sesión.' 
  },
  { 
    id: 'edge-maestro-de-armas',
    name: 'Maestro de armas', 
    requirements: 'Maestro, Pelear d12+', 
    effects: 'Tu héroe es un maestro en el uso de armas de cuerpo a cuerpo. Su Parada aumenta en +1.' 
  },
  { 
    id: 'edge-maestro-de-combate',
    name: 'Maestro de combate', 
    requirements: 'Maestro, Pelear d12+', 
    effects: 'Tu héroe es un maestro en el combate cuerpo a cuerpo. Ignora hasta 2 puntos de penalizaciones por acciones múltiples si una de ellas es un ataque de Pelea.' 
  },
  { 
    id: 'edge-maestro-legendario',
    name: 'Maestro Legendario', 
    requirements: 'Legendario, Experto', 
    effects: 'El dado de la habilidad elegida en Experto aumenta a d12+3.' 
  },
  { 
    id: 'edge-matagigantes',
    name: 'Matagigantes', 
    requirements: 'Veterano', 
    effects: 'Tu héroe es un experto en enfrentarse a criaturas mucho más grandes que él. Recibe un bonificador de +1d6 al daño cuando ataca a una criatura de Tamaño 4 o superior.' 
  },
  { 
    id: 'edge-mcgyver',
    name: 'McGyver', 
    requirements: 'Novato, Astucia d6+, Reparar d6+, Notar d8+', 
    effects: 'Tu héroe puede improvisar herramientas y dispositivos con casi cualquier cosa. Puede realizar tiradas de Reparar sin herramientas y crear dispositivos temporales útiles.' 
  },
  { 
    id: 'edge-mentalista',
    name: 'Mentalista', 
    requirements: 'Experimentado, Astucia d8+, Trasfondo Arcano (Psiónica)', 
    effects: 'Tu héroe recibe un bono de +2 a todas sus tiradas enfrentadas cuando usa poderes psiónicos.' 
  },
  { 
    id: 'edge-montaraz',
    name: 'Montaraz', 
    requirements: 'Novato, Espíritu d6+, Supervivencia d8+', 
    effects: 'Tu héroe es un experto en la vida al aire libre. Recibe un bono de +2 a las tiradas de Supervivencia y Sigilo en entornos naturales.' 
  },
  { 
    id: 'edge-muy-afortunado',
    name: 'Muy Afortunado', 
    requirements: 'Novato, Afortunado', 
    effects: 'Tu héroe tiene una suerte excepcional. Recibe un beni adicional al comienzo de cada sesión (esto se apila con Afortunado, para un total de dos benis adicionales).' 
  },
  { 
    id: 'edge-muy-atractivo',
    name: 'Muy Atractivo', 
    requirements: 'Novato, Atractivo', 
    effects: 'Tu héroe es una belleza de leyenda. Recibe un bono de +2 a las tiradas de Persuadir e Interpretar.' 
  },
  { 
    id: 'edge-muy-rico',
    name: 'Muy Rico', 
    requirements: 'Novato, Rico', 
    effects: 'Tu héroe es inmensamente rico. Empieza con cinco veces el dinero inicial y tiene unos ingresos muy elevados.' 
  },
  { 
    id: 'edge-nervios-de-acero',
    name: 'Nervios de acero', 
    requirements: 'Novato, Vigor d8+', 
    effects: 'Tu héroe puede ignorar un nivel de penalización por Heridas.' 
  },
  { 
    id: 'edge-nervios-de-acero-mejorados',
    name: 'Nervios de acero mejorados', 
    requirements: 'Novato, Nervios de acero', 
    effects: 'Tu héroe ignora hasta dos niveles de penalización por Heridas.' 
  },
  { 
    id: 'edge-pies-ligeros',
    name: 'Pies Ligeros', 
    requirements: 'Novato, Agilidad d6+', 
    effects: 'Tu héroe es muy rápido. Su Paso aumenta en +2 y su dado de carrera aumenta en un tipo de dado.' 
  },
  { 
    id: 'edge-pistolero',
    name: 'Pistolero', 
    requirements: 'Novato, Agilidad d8+', 
    effects: 'Tu héroe es experto en usar dos armas de fuego simultáneamente. Si realiza un ataque con cada mano (a distancia), no sufre la penalización por acción múltiple.' 
  },
  { 
    id: 'edge-presencia-de-mando',
    name: 'Presencia de mando', 
    requirements: 'Experimentado, Mando', 
    effects: 'El Radio de Mando de tu héroe aumenta a 10 casillas (20 metros).' 
  },
  { 
    id: 'edge-primer-golpe',
    name: 'Primer golpe', 
    requirements: 'Novato, Agilidad d8+', 
    effects: 'Una vez por asalto, tu héroe puede realizar un ataque de Pelea gratuito contra cualquier enemigo que se mueva a una posición adyacente a él.' 
  },
  { 
    id: 'edge-primer-golpe-mejorado',
    name: 'Primer golpe mejorado', 
    requirements: 'Heroico, Primer golpe', 
    effects: 'Como Primer golpe, pero el héroe puede realizar un ataque gratuito contra cada enemigo que se mueva a una posición adyacente.' 
  },
  { 
    id: 'edge-profesional',
    name: 'Profesional', 
    requirements: 'Legendario, Habilidad d12+', 
    effects: 'Elige una habilidad en la que tengas d12+. El dado de esa habilidad aumenta a d12+1.' 
  },
  { 
    id: 'edge-pulso-firme',
    name: 'Pulso firme', 
    requirements: 'Novato, Agilidad d8+', 
    effects: 'Tu héroe ignora la penalización por plataforma inestable y reduce a la mitad la penalización por movimiento al disparar.' 
  },
  { 
    id: 'edge-rapido',
    name: 'Rápido', 
    requirements: 'Novato, Agilidad d8+', 
    effects: 'Tu héroe tiene unos reflejos asombrosos. Si roba una carta de acción de valor 5 o inferior, puede descartarla y robar una nueva hasta obtener una superior a 5.' 
  },
  { 
    id: 'edge-recarga-rapida',
    name: 'Recarga rápida', 
    requirements: 'Experimentado, Espíritu d6+, Trasfondo Arcano', 
    effects: 'Tu héroe recupera 10 Puntos de Poder por cada hora de descanso o actividad ligera.' 
  },
  { 
    id: 'edge-recarga-rapida-mejorada',
    name: 'Recarga rápida mejorada', 
    requirements: 'Veterano, Recarga rápida', 
    effects: 'Tu héroe recupera 20 Puntos de Poder por cada hora de descanso o actividad ligera.' 
  },
  { 
    id: 'edge-reflejos-de-combate',
    name: 'Reflejos de Combate', 
    requirements: 'Novato', 
    effects: 'Tu héroe reacciona rápidamente en combate. Recibe un bono de +2 a las tiradas de Espíritu para recuperarse del estado Sacudido.' 
  },
  { 
    id: 'edge-replica',
    name: 'Réplica', 
    requirements: 'Experimentado, Astucia d6+, Provocar d6+', 
    effects: 'Si un enemigo falla una tirada de Provocar contra tu héroe, este queda Distraído automáticamente.' 
  },
  { 
    id: 'edge-resistencia-arcana',
    name: 'Resistencia arcana', 
    requirements: 'Novato, Espíritu d8+', 
    effects: 'La magia y otros efectos sobrenaturales tienen más dificultades para afectar a este héroe. Recibe un bono de +2 a las tiradas de Rasgo para resistir poderes y +2 a la Armadura contra daño provocado por poderes.' 
  },
  { 
    id: 'edge-resistencia-arcana-mejorada',
    name: 'Resistencia arcana mejorada', 
    requirements: 'Novato, Resistencia arcana', 
    effects: 'Como Resistencia arcana, pero el bono aumenta a +4.' 
  },
  { 
    id: 'edge-resistente',
    name: 'Resistente', 
    requirements: 'Legendario, Vigor d10+', 
    effects: 'Tu héroe es una leyenda de la resistencia. Su Dureza aumenta en +1 adicional.' 
  },
  { 
    id: 'edge-retirada',
    name: 'Retirada', 
    requirements: 'Novato, Agilidad d8+', 
    effects: 'Tu héroe es experto en salir de situaciones peligrosas. Los enemigos no reciben un ataque gratuito cuando el héroe se retira del combate cuerpo a cuerpo.' 
  },
  { 
    id: 'edge-retirada-mejorada',
    name: 'Retirada mejorada', 
    requirements: 'Novato, Retirada', 
    effects: 'Como Retirada, pero el héroe puede retirarse incluso si está rodeado por múltiples enemigos.' 
  },
  { 
    id: 'edge-rico',
    name: 'Rico', 
    requirements: 'Novato', 
    effects: 'Tu héroe tiene acceso a una gran cantidad de recursos económicos. Empieza con el triple del dinero inicial y tiene un salario o ingresos regulares.' 
  },
  { 
    id: 'edge-rock-and-roll',
    name: '¡Rock and Roll!', 
    requirements: 'Experimentado, Disparar d8+', 
    effects: 'Tu héroe sabe cómo manejar el retroceso de las armas automáticas. Ignora la penalización por fuego de supresión o ráfaga si no se mueve en su turno.' 
  },
  { 
    id: 'edge-sanador-rapido',
    name: 'Sanador Rápido', 
    requirements: 'Novato, Vigor d8+', 
    effects: 'Tu héroe se recupera de las heridas con una rapidez asombrosa. Recibe un bono de +2 a sus tiradas de Vigor para la curación natural.' 
  },
  { 
    id: 'edge-sangre-fria',
    name: 'Sangre fría', 
    requirements: 'Experimentado, Astucia d8+', 
    effects: 'Tu héroe mantiene la calma bajo presión. Roba una carta de acción adicional en combate y quédate con la mejor.' 
  },
  { 
    id: 'edge-sangre-fria-mejorada',
    name: 'Sangre fría mejorada', 
    requirements: 'Veterano, Sangre fría', 
    effects: 'Como Sangre fría, pero el héroe roba dos cartas adicionales y se queda con la mejor.' 
  },
  { 
    id: 'edge-sentir-el-peligro',
    name: 'Sentir el Peligro', 
    requirements: 'Novato', 
    effects: 'Tu héroe tiene un sexto sentido para las emboscadas. Realiza una tirada de Notar con un bono de +2 para detectar ataques sorpresa o trampas.' 
  },
  { 
    id: 'edge-sin-piedad',
    name: 'Sin piedad', 
    requirements: 'Experimentado', 
    effects: 'Tu héroe no muestra clemencia. Puede gastar un beni para añadir +1d6 al daño de un ataque que ya haya impactado.' 
  },
  { 
    id: 'edge-soldado',
    name: 'Soldado', 
    requirements: 'Novato, Fuerza d6+, Vigor d6+', 
    effects: 'Tu héroe ha recibido entrenamiento militar. Su Fuerza se considera un tipo de dado superior para determinar la Carga y los requisitos de Fuerza de las armas y armaduras.' 
  },
  { 
    id: 'edge-tactico',
    name: 'Táctico', 
    requirements: 'Experimentado, Astucia d8+, Tácticas d8+', 
    effects: 'Al comienzo del combate, el héroe realiza una tirada de Tácticas. Con un éxito, roba una carta de acción adicional para el grupo (dos con un aumento).' 
  },
  { 
    id: 'edge-tactico-veterano',
    name: 'Táctico veterano', 
    requirements: 'Veterano, Táctico', 
    effects: 'Como Táctico, pero el héroe roba dos cartas de acción adicionales para el grupo (tres con un aumento).' 
  },
  { 
    id: 'edge-tirador',
    name: 'Tirador', 
    requirements: 'Experimentado, Atletismo o Disparar d8+', 
    effects: 'Tu héroe es un tirador paciente. Si no se mueve en su turno, ignora hasta 2 puntos de penalización por cobertura, iluminación o disparar a larga distancia.' 
  },
  { 
    id: 'edge-tirador-de-elite',
    name: 'Tirador de élite', 
    requirements: 'Experimentado, Atletismo d8+ o Disparar d8+', 
    effects: 'Tu héroe es un tirador excepcional. Si obtiene un Joker en su carta de iniciativa, dobla el daño de sus ataques de Disparar o Atletismo (lanzar).' 
  },
  { 
    id: 'edge-trasfondo-arcano',
    name: 'Trasfondo Arcano', 
    requirements: 'Novato', 
    effects: 'Este es el primer paso para que tu personaje tenga acceso a poderes sobrenaturales. Al elegir esta ventaja, debes seleccionar un tipo específico de Trasfondo Arcano (Magia, Milagros, Psiónica, Ciencia Extraña o Dotado). Cada uno tiene su propia habilidad, puntos de poder iniciales y número de poderes conocidos.' 
  },
  { 
    id: 'edge-puntos-de-poder-adicionales',
    name: 'Puntos de poder adicionales', 
    requirements: 'Novato, Trasfondo Arcano', 
    effects: 'Tu héroe aumenta sus puntos de poder máximos en 5. Se puede elegir más de una vez, pero solo una por rango.' 
  },
  { 
    id: 'edge-nuevo-poder',
    name: 'Nuevo poder', 
    requirements: 'Novato, Trasfondo Arcano', 
    effects: 'Tu héroe aprende un nuevo poder de su rango o inferior. Se puede elegir más de una vez.' 
  },
  { 
    id: 'edge-valiente',
    name: 'Valiente', 
    requirements: 'Novato, Espíritu d6+', 
    effects: 'Tu héroe es excepcionalmente valiente. Recibe un bono de +2 a todas sus tiradas de Miedo.' 
  },
  { 
    id: 'edge-voluntad-de-hierro',
    name: 'Voluntad de Hierro', 
    requirements: 'Novato, Espíritu d8+', 
    effects: 'Tu héroe tiene una determinación inquebrantable. Recibe un bono de +2 a las tiradas de Espíritu para resistir la Intimidación y la Provocación.' 
  },
];

export const WEAPONS = [
  { id: 'w-daga', name: 'Daga', damage: 'FUE+d4', weight: 1, cost: 25, notes: 'Fácil de ocultar' },
  { id: 'w-espada-corta', name: 'Espada corta', damage: 'FUE+d6', weight: 2, cost: 100, notes: 'Incluye sables y similares' },
  { id: 'w-espada-larga', name: 'Espada larga', damage: 'FUE+d8', weight: 3, cost: 300, notes: 'Incluye cimitarras y similares' },
  { id: 'w-gran-espada', name: 'Gran espada', damage: 'FUE+d10', weight: 8, cost: 400, notes: 'Dos manos, Parada -1' },
  { id: 'w-hacha-mano', name: 'Hacha de mano', damage: 'FUE+d6', weight: 2, cost: 100, notes: '' },
  { id: 'w-hacha-batalla', name: 'Hacha de batalla', damage: 'FUE+d8', weight: 4, cost: 300, notes: '' },
  { id: 'w-gran-hacha', name: 'Gran hacha', damage: 'FUE+d10', weight: 10, cost: 400, notes: 'Dos manos, AP 2' },
  { id: 'w-maza', name: 'Maza', damage: 'FUE+d6', weight: 4, cost: 100, notes: 'AP 2 contra armaduras rígidas' },
  { id: 'w-lanza', name: 'Lanza', damage: 'FUE+d6', weight: 5, cost: 100, notes: 'Alcance 1, dos manos' },
  { id: 'w-alabarda', name: 'Alabarda', damage: 'FUE+d8', weight: 12, cost: 250, notes: 'Alcance 1, dos manos' },
  { id: 'w-arco', name: 'Arco', damage: '2d6', range: '12/24/48', weight: 3, cost: 250, notes: 'FUE d6 requerida' },
  { id: 'w-ballesta', name: 'Ballesta', damage: '2d6', range: '15/30/60', weight: 10, cost: 500, notes: 'AP 2, 1 asalto para recargar' },
  { id: 'w-honda', name: 'Honda', damage: 'FUE+d4', range: '4/8/16', weight: 1, cost: 10, notes: '' },
  { id: 'w-pistola-9mm', name: 'Pistola (9mm)', damage: '2d6', range: '12/24/48', weight: 3, cost: 200, notes: 'AP 1, Semiautomática' },
  { id: 'w-revolver-357', name: 'Revólver (.357)', damage: '2d6+1', range: '10/20/40', weight: 4, cost: 250, notes: 'AP 1, Revólver' },
  { id: 'w-escopeta', name: 'Escopeta', damage: '1-3d6', range: '12/24/48', weight: 8, cost: 150, notes: 'Bono a impactar' },
  { id: 'w-rifle-asalto', name: 'Rifle de asalto', damage: '2d8', range: '24/48/96', weight: 8, cost: 500, notes: 'AP 2, Auto, Tres disparos' },
];

export const ARMOR = [
  { id: 'a-cuero', name: 'Cuero', bonus: 2, weight: 8, cost: 80, notes: 'Cubre torso, brazos y piernas' },
  { id: 'a-malla', name: 'Cota de malla', bonus: 3, weight: 25, cost: 300, notes: 'Cubre torso' },
  { id: 'a-placas', name: 'Coraza de placas', bonus: 4, weight: 30, cost: 500, notes: 'Cubre torso' },
  { id: 'a-kevlar', name: 'Chaleco de Kevlar', bonus: 2, weight: 5, cost: 250, notes: 'AP 4 contra balas' },
  { id: 'a-casco', name: 'Casco', bonus: 3, weight: 4, cost: 40, notes: 'Cubre cabeza' },
];

export const SHIELDS = [
  { id: 's-pequeño', name: 'Escudo pequeño', parryBonus: 1, coverBonus: 0, weight: 4, cost: 50, notes: '' },
  { id: 's-mediano', name: 'Escudo mediano', parryBonus: 2, coverBonus: 0, weight: 8, cost: 100, notes: '' },
  { id: 's-grande', name: 'Escudo grande', parryBonus: 2, coverBonus: 2, weight: 12, cost: 200, notes: 'Contra ataques a distancia' },
];
