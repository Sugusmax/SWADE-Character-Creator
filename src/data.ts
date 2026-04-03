
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
  { id: 'skill-sanar', name: 'Medicina', attribute: 'Astucia', isBasic: false, description: 'Habilidad para diagnosticar y curar heridas o enfermedades, así como descifrar pistas forenses.' },
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
    description: 'Tu héroe no sabe leer ni escribir.' 
  },
  { 
    id: 'hindrance-anciano',
    name: 'Anciano', 
    type: 'Mayor', 
    description: 'Tu héroe es de edad avanzada. Sufres -1 al Paso y el dado de carrera es un d4. Además, restas 1 a todas las tiradas de Agilidad, Fuerza y Vigor, pero ganas 5 puntos extra de habilidad (solo para Astucia).' 
  },
  { 
    id: 'hindrance-anemico',
    name: 'Anémico', 
    type: 'Menor', 
    description: 'Tu héroe es enfermizo. Sufres una penalización de -2 a las tiradas de Vigor para resistir la fatiga.' 
  },
  { 
    id: 'hindrance-apacible',
    name: 'Apacible', 
    type: 'Menor', 
    description: 'Tu héroe evita el conflicto. Sufres una penalización de -2 a todas las tiradas de Intimidar.' 
  },
  { 
    id: 'hindrance-apocado',
    name: 'Apocado', 
    type: 'Mayor', 
    description: 'Tu héroe tiene dificultades para expresarse. Sufres -1 a Intimidar, Interpretar, Persuadir y Provocar cuando la comunicación sea verbal.' 
  },
  { 
    id: 'hindrance-arrogante',
    name: 'Arrogante', 
    type: 'Mayor', 
    description: 'Tu héroe se cree superior a los demás. Siempre busca el desafío más difícil para demostrar su valía.' 
  },
  { 
    id: 'hindrance-avaricioso-menor',
    name: 'Avaricioso', 
    type: 'Menor', 
    description: 'Tu héroe es tacaño con su dinero y posesiones.' 
  },
  { 
    id: 'hindrance-avaricioso-mayor',
    name: 'Avaricioso', 
    type: 'Mayor', 
    description: 'La codicia consume a tu héroe. Hará casi cualquier cosa por dinero.' 
  },
  { 
    id: 'hindrance-avergonzado-menor',
    name: 'Avergonzado', 
    type: 'Menor', 
    description: 'Tu héroe oculta un secreto o fracaso menor de su pasado.' 
  },
  { 
    id: 'hindrance-avergonzado-mayor',
    name: 'Avergonzado', 
    type: 'Mayor', 
    description: 'Tu héroe vive atormentado por una gran vergüenza o un crimen del pasado.' 
  },
  { 
    id: 'hindrance-bocazas',
    name: 'Bocazas', 
    type: 'Menor', 
    description: 'Tu héroe es incapaz de guardar un secreto.' 
  },
  { 
    id: 'hindrance-buscado-menor',
    name: 'Buscado', 
    type: 'Menor', 
    description: 'Las autoridades buscan a tu héroe por un delito menor.' 
  },
  { 
    id: 'hindrance-buscado-mayor',
    name: 'Buscado', 
    type: 'Mayor', 
    description: 'Tu héroe es un fugitivo de la justicia por un delito grave.' 
  },
  { 
    id: 'hindrance-canalla',
    name: 'Canalla', 
    type: 'Menor', 
    description: 'Tu héroe tiene una actitud prepotente. Sufres una penalización de -1 a todas las tiradas de Persuadir.' 
  },
  { 
    id: 'hindrance-cauto',
    name: 'Cauto', 
    type: 'Menor', 
    description: 'Tu héroe planea cada paso con excesiva meticulosidad.' 
  },
  { 
    id: 'hindrance-ciego',
    name: 'Ciego', 
    type: 'Mayor', 
    description: 'Tu héroe es ciego. Sufre -6 a todas las tareas que dependan de la visión, pero gana una ventaja adicional.' 
  },
  { 
    id: 'hindrance-cobarde',
    name: 'Cobarde', 
    type: 'Mayor', 
    description: 'Tu héroe se asusta con facilidad. Sufre una penalización de -2 a todas las tiradas de Miedo y para resistir la Intimidación.' 
  },
  { 
    id: 'hindrance-codigo-de-honor',
    name: 'Código de Honor', 
    type: 'Mayor', 
    description: 'Tu héroe vive según un estricto código moral.' 
  },
  { 
    id: 'hindrance-cojo-menor',
    name: 'Cojo', 
    type: 'Menor', 
    description: 'Tu héroe tiene una pierna lesionada. Sufre -1 al Paso y su dado de carrera es un d4. Además, sufre -2 a Atletismo en tiradas que dependan de la movilidad.' 
  },
  { 
    id: 'hindrance-cojo-mayor',
    name: 'Cojo', 
    type: 'Mayor', 
    description: 'Tu héroe apenas puede caminar. Sufre -2 al Paso y su dado de carrera es un d4-1. Sufre -4 a Atletismo en tiradas que dependan de la movilidad.' 
  },
  { 
    id: 'hindrance-corto-de-vista-menor',
    name: 'Corto de Vista', 
    type: 'Menor', 
    description: 'Tu héroe necesita gafas. Si no las lleva, sufre -1 en las tiradas de rasgo que dependan de la visión de lejos.' 
  },
  { 
    id: 'hindrance-corto-de-vista-mayor',
    name: 'Corto de Vista', 
    type: 'Mayor', 
    description: 'La visión de tu héroe es muy deficiente. Sin gafas, sufre una penalización de -2 en todas las tiradas de rasgo que dependan de la visión de lejos.' 
  },
  { 
    id: 'hindrance-curioso',
    name: 'Curioso', 
    type: 'Mayor', 
    description: 'Tu héroe no puede evitar investigar cualquier misterio.' 
  },
  { 
    id: 'hindrance-delirio-menor',
    name: 'Delirio', 
    type: 'Menor', 
    description: 'Tu héroe cree en algo falso.' 
  },
  { 
    id: 'hindrance-delirio-mayor',
    name: 'Delirio', 
    type: 'Mayor', 
    description: 'Tu héroe sufre una locura importante.' 
  },
  { 
    id: 'hindrance-deseo-mortal',
    name: 'Deseo Mortal', 
    type: 'Menor', 
    description: 'Tu héroe busca un final glorioso en combate.' 
  },
  { 
    id: 'hindrance-despiadado-menor',
    name: 'Despiadado', 
    type: 'Menor', 
    description: 'Tu héroe no muestra compasión con sus enemigos derrotados.' 
  },
  { 
    id: 'hindrance-despiadado-mayor',
    name: 'Despiadado', 
    type: 'Mayor', 
    description: 'Tu héroe es cruel y disfruta con el sufrimiento ajeno.' 
  },
  { 
    id: 'hindrance-despistado',
    name: 'Despistado', 
    type: 'Mayor', 
    description: 'Tu héroe no presta atención a su entorno. Sufre una penalización de -1 a todas las tiradas de Conocimientos Generales y Notar.' 
  },
  { 
    id: 'hindrance-dubitativo',
    name: 'Dubitativo', 
    type: 'Menor', 
    description: 'Tu héroe duda en combate. En el primer asalto, roba dos cartas de iniciativa y se queda con la peor.' 
  },
  { 
    id: 'hindrance-enemigo-menor',
    name: 'Enemigo', 
    type: 'Menor', 
    description: 'Alguien con cierta influencia quiere ver a tu héroe arruinado.' 
  },
  { 
    id: 'hindrance-enemigo-mayor',
    name: 'Enemigo', 
    type: 'Mayor', 
    description: 'Alguien muy poderoso quiere ver a tu héroe muerto.' 
  },
  { 
    id: 'hindrance-envidioso-menor',
    name: 'Envidioso', 
    type: 'Menor', 
    description: 'Tu héroe envidia los logros o posesiones de los demás.' 
  },
  { 
    id: 'hindrance-envidioso-mayor',
    name: 'Envidioso', 
    type: 'Mayor', 
    description: 'La envidia consume a tu héroe y sabotea a sus aliados.' 
  },
  { 
    id: 'hindrance-esceptico',
    name: 'Escéptico', 
    type: 'Menor', 
    description: 'Tu héroe no cree en lo sobrenatural.' 
  },
  { 
    id: 'hindrance-exceso-de-confianza',
    name: 'Exceso de Confianza', 
    type: 'Mayor', 
    description: 'Tu héroe cree que es invencible.' 
  },
  { 
    id: 'hindrance-feo-menor',
    name: 'Feo', 
    type: 'Menor', 
    description: 'La apariencia de tu héroe es desagradable. Sufre una penalización de -1 a todas las tiradas de Persuadir.' 
  },
  { 
    id: 'hindrance-feo-mayor',
    name: 'Feo', 
    type: 'Mayor', 
    description: 'Tu héroe es repulsivo. Sufre una penalización de -2 a todas las tiradas de Persuadir.' 
  },
  { 
    id: 'hindrance-fobia-menor',
    name: 'Fobia', 
    type: 'Menor', 
    description: 'Tu héroe tiene un miedo irracional. Sufre -1 a todas sus tiradas de rasgo en presencia de su fobia.' 
  },
  { 
    id: 'hindrance-fobia-mayor',
    name: 'Fobia', 
    type: 'Mayor', 
    description: 'Tu héroe siente terror ante su fobia. Sufre -2 a todas sus tiradas de rasgo en presencia de su fobia.' 
  },
  { 
    id: 'hindrance-habito-menor',
    name: 'Hábito', 
    type: 'Menor', 
    description: 'Tu héroe tiene una costumbre molesta o adicción leve que puede incomodar a otros.' 
  },
  { 
    id: 'hindrance-habito-mayor',
    name: 'Hábito', 
    type: 'Mayor', 
    description: 'Tu héroe sufre una adicción grave o hábito compulsivo que afecta su vida diaria.' 
  },
  { 
    id: 'hindrance-heroico',
    name: 'Heroico', 
    type: 'Mayor', 
    description: 'Tu héroe siempre ayuda a los necesitados.' 
  },
  { 
    id: 'hindrance-impulsivo',
    name: 'Impulsivo', 
    type: 'Mayor', 
    description: 'Tu héroe actúa por instinto sin pensar.' 
  },
  { 
    id: 'hindrance-joven-menor',
    name: 'Joven', 
    type: 'Menor', 
    description: 'Tu héroe es muy joven. Solo dispones de 4 puntos para atributos (en lugar de 5) y 10 para habilidades (en lugar de 12). Como compensación, recibes un beni adicional al comienzo de cada sesión.' 
  },
  { 
    id: 'hindrance-joven-mayor',
    name: 'Joven', 
    type: 'Mayor', 
    description: 'Tu héroe es apenas un niño. Solo dispones de 3 puntos para atributos (en lugar de 5) y 10 para habilidades (en lugar de 12). Como compensación, recibes un beni adicional al comienzo de cada sesión.' 
  },
  { 
    id: 'hindrance-juramento-menor',
    name: 'Juramento', 
    type: 'Menor', 
    description: 'Tu héroe ha hecho una promesa menor.' 
  },
  { 
    id: 'hindrance-juramento-mayor',
    name: 'Juramento', 
    type: 'Mayor', 
    description: 'Tu héroe ha dedicado su vida a una causa.' 
  },
  { 
    id: 'hindrance-leal',
    name: 'Leal', 
    type: 'Menor', 
    description: 'Tu héroe nunca abandona a sus amigos.' 
  },
  { 
    id: 'hindrance-mal-nadador',
    name: 'Mal Nadador', 
    type: 'Menor', 
    description: 'Tu héroe se siente incómodo en el agua. Sufre -2 a Atletismo para nadar.' 
  },
  { 
    id: 'hindrance-mala-suerte',
    name: 'Mala Suerte', 
    type: 'Mayor', 
    description: 'Recibes un beni menos al comienzo de cada sesión.' 
  },
  { 
    id: 'hindrance-manazas',
    name: 'Manazas', 
    type: 'Menor', 
    description: 'Tu héroe es torpe con objetos delicados. Sufre una penalización de -2 al usar instrumentos mecánicos o electrónicos.' 
  },
  { 
    id: 'hindrance-manco',
    name: 'Manco', 
    type: 'Mayor', 
    description: 'Tu héroe ha perdido un brazo. Sufre una penalización de -4 a las tareas que requieran el uso de las dos manos.' 
  },
  { 
    id: 'hindrance-mania',
    name: 'Manía', 
    type: 'Menor', 
    description: 'Tu héroe tiene un hábito repetitivo narrativo.' 
  },
  { 
    id: 'hindrance-marginado-menor',
    name: 'Marginado', 
    type: 'Menor', 
    description: 'Tu héroe no encaja en la sociedad. Sufre una penalización de -2 a Persuadir con aquellos ajenos a su grupo.' 
  },
  { 
    id: 'hindrance-marginado-mayor',
    name: 'Marginado', 
    type: 'Mayor', 
    description: 'Tu héroe es un paria social. Sufre una penalización de -2 a Persuadir con aquellos ajenos a su grupo y no tiene derechos legales.' 
  },
  { 
    id: 'hindrance-mudo',
    name: 'Mudo', 
    type: 'Mayor', 
    description: 'Tu héroe no puede hablar.' 
  },
  { 
    id: 'hindrance-obeso',
    name: 'Obeso', 
    type: 'Menor', 
    description: 'Tu héroe tiene sobrepeso. Gana +1 a Tamaño, pero su Paso se reduce en 1 y su dado de carrera es un d4.' 
  },
  { 
    id: 'hindrance-obligaciones-menor',
    name: 'Obligaciones', 
    type: 'Menor', 
    description: 'Tu héroe tiene responsabilidades que le quitan tiempo.' 
  },
  { 
    id: 'hindrance-obligaciones-mayor',
    name: 'Obligaciones', 
    type: 'Mayor', 
    description: 'Tu héroe está atado por grandes responsabilidades.' 
  },
  { 
    id: 'hindrance-obsesion-menor',
    name: 'Obsesión', 
    type: 'Menor', 
    description: 'Tu héroe tiene una fijación con algo.' 
  },
  { 
    id: 'hindrance-obsesion-mayor',
    name: 'Obsesión', 
    type: 'Mayor', 
    description: 'Una obsesión absoluta domina la vida de tu héroe.' 
  },
  { 
    id: 'hindrance-pacifista-menor',
    name: 'Pacifista', 
    type: 'Menor', 
    description: 'Tu héroe evita la violencia innecesaria.' 
  },
  { 
    id: 'hindrance-pacifista-mayor',
    name: 'Pacifista', 
    type: 'Mayor', 
    description: 'Tu héroe se niega a usar la violencia contra seres vivos.' 
  },
  { 
    id: 'hindrance-patoso',
    name: 'Patoso', 
    type: 'Mayor', 
    description: 'Tu héroe es torpe. Sufre una penalización de -2 a todas las tiradas de Sigilo y Atletismo.' 
  },
  { 
    id: 'hindrance-pequeño',
    name: 'Pequeño', 
    type: 'Menor', 
    description: 'Tu héroe es menudo. Sufre -1 a su Tamaño y a su Dureza.' 
  },
  { 
    id: 'hindrance-pobreza',
    name: 'Pobreza', 
    type: 'Menor', 
    description: 'Tu héroe empieza con la mitad del dinero inicial.' 
  },
  { 
    id: 'hindrance-sanguinario',
    name: 'Sanguinario', 
    type: 'Mayor', 
    description: 'Tu héroe nunca toma prisioneros (desventaja narrativa).' 
  },
  { 
    id: 'hindrance-secreto-menor',
    name: 'Secreto', 
    type: 'Menor', 
    description: 'Tu héroe oculta algo vergonzoso.' 
  },
  { 
    id: 'hindrance-secreto-mayor',
    name: 'Secreto', 
    type: 'Mayor', 
    description: 'Tu héroe oculta un secreto terrible.' 
  },
  { 
    id: 'hindrance-sensible-menor',
    name: 'Sensible', 
    type: 'Menor', 
    description: 'Tu héroe se ofende fácilmente. Sufre -2 a las tiradas para resistir Provocar.' 
  },
  { 
    id: 'hindrance-sensible-mayor',
    name: 'Sensible', 
    type: 'Mayor', 
    description: 'Tu héroe es muy fácil de provocar. Sufre -4 a las tiradas para resistir Provocar.' 
  },
  { 
    id: 'hindrance-sordo-menor',
    name: 'Sordo', 
    type: 'Menor', 
    description: 'Tu héroe tiene dificultades auditivas. Sufre -4 a las tiradas de Notar que dependan del oído.' 
  },
  { 
    id: 'hindrance-sordo-mayor',
    name: 'Sordo', 
    type: 'Mayor', 
    description: 'Tu héroe es sordo. Falla automáticamente tiradas de Notar basadas en el oído.' 
  },
  { 
    id: 'hindrance-suspicaz-menor',
    name: 'Suspicaz', 
    type: 'Menor', 
    description: 'Tu héroe no confía en los demás.' 
  },
  { 
    id: 'hindrance-suspicaz-mayor',
    name: 'Suspicaz', 
    type: 'Mayor', 
    description: 'La paranoia domina a tu héroe. Sufre -2 a las tiradas de Apoyo.' 
  },
  { 
    id: 'hindrance-tozudo',
    name: 'Tozudo', 
    type: 'Menor', 
    description: 'Tu héroe siempre quiere tener la última palabra.' 
  },
  { 
    id: 'hindrance-tuerto',
    name: 'Tuerto', 
    type: 'Mayor', 
    description: 'Tu héroe ha perdido un ojo. Sufre -2 a las tiradas de rasgo a más de diez metros, no a las habilidades.' 
  },
  { 
    id: 'hindrance-vengativo-menor',
    name: 'Vengativo', 
    type: 'Menor', 
    description: 'Tu héroe no olvida una afrenta.' 
  },
  { 
    id: 'hindrance-vengativo-mayor',
    name: 'Vengativo', 
    type: 'Mayor', 
    description: 'Tu héroe vive para la venganza.' 
  },
];

export const EDGES: Edge[] = [
  { id: 'edge-acaparador', name: 'Acaparador', requirements: 'Novato, Astucia d8+', effects: 'Encuentra un objeto esencial una vez por sesión.' },
  { id: 'edge-acrobata', name: 'Acróbata', requirements: 'Novato, Agilidad d8+, Atletismo d8+', effects: '+2 a Atletismo (maniobras acrobáticas) y +1 a Parada (sin armadura pesada).' },
  { id: 'edge-acrobata-marcial', name: 'Acróbata Marcial', requirements: 'Experimentado, Acróbata', effects: 'Ignora terreno difícil y -2 a ser impactado por ataques a distancia si se mueve.' },
  { id: 'edge-afortunado', name: 'Afortunado', requirements: 'Novato', effects: '+1 beni al comienzo de cada sesión.' },
  { id: 'edge-afortunado-muy', name: 'Afortunado, Muy', requirements: 'Novato, Afortunado', replaces: 'Afortunado', effects: '+2 benis al comienzo de cada sesión.' },
  { id: 'edge-alcurnia', name: 'Alcurnia', requirements: 'Novato', effects: '+2 a Conocimientos Generales y red de contactos con la clase alta.' },
  { id: 'edge-alerta', name: 'Alerta', requirements: 'Novato', effects: '+2 a Notar.' },
  { id: 'edge-ambidextro', name: 'Ambidextro', requirements: 'Novato, Agilidad d8+', effects: 'Ignora la penalización de -2 por usar la mano torpe.' },
  { id: 'edge-amenazador', name: 'Amenazador', requirements: 'Novato, Intimidar d6+', effects: '+2 a Intimidar.' },
  { id: 'edge-animar', name: 'Animar', requirements: 'Novato, Espíritu d8+', effects: 'Puedes realizar un apoyo con Espíritu para ayudar a un aliado.' },
  { id: 'edge-ardor', name: 'Ardor', requirements: 'Experimentado, Mando', effects: '+1 al daño cuerpo a cuerpo para aliados en Radio de Mando.' },
  { id: 'edge-arma-distintiva', name: 'Arma Distintiva', requirements: 'Novato, Pelear d8+ o Disparar d8+', effects: '+1 a Pelear o Disparar con un arma específica, y +1 a Parada.' },
  { id: 'edge-arma-distintiva-mejorada', name: 'Arma Distintiva Mejorada', requirements: 'Experimentado, Arma Distintiva', replaces: 'Arma Distintiva', effects: '+2 a Pelear o Disparar con el arma específica, y +2 a Parada.' },
  { id: 'edge-artifice', name: 'Artífice', requirements: 'Novato, Trasfondo Arcano', effects: 'Permite crear objetos mágicos temporales.' },
  { id: 'edge-artista-marcial', name: 'Artista Marcial', requirements: 'Novato, Pelear d6+', effects: 'Tus ataques desarmados hacen Fuerza+d4 de daño y nunca se consideran desarmados.' },
  { id: 'edge-artista-marcial-mejorado', name: 'Artista Marcial Mejorado', requirements: 'Experimentado, Artista Marcial', replaces: 'Artista Marcial', effects: 'Tus ataques desarmados hacen Fuerza+d6 de daño.' },
  { id: 'edge-as', name: 'As', requirements: 'Novato, Agilidad d8+', effects: '+2 a Conducir, Pilotar y Navegar. Gasta benis para ignorar Heridas del vehículo.' },
  { id: 'edge-asesino', name: 'Asesino', requirements: 'Novato, Agilidad d8+, Pelear d6+, Sigilo d8+', effects: '+2 al daño por sorpresa o por la espalda.' },
  { id: 'edge-ataque-repentino', name: 'Ataque Repentino', requirements: 'Novato, Agilidad d8+', effects: 'Ataque gratuito cuando un enemigo entra en tu alcance.' },
  { id: 'edge-ataque-repentino-mejorado', name: 'Ataque Repentino Mejorado', requirements: 'Heroico, Ataque Repentino', replaces: 'Ataque Repentino', effects: 'Hasta tres ataques gratuitos por turno.' },
  { id: 'edge-atractivo', name: 'Atractivo', requirements: 'Novato, Vigor d6+', effects: '+1 a Persuadir e Interpretar.' },
  { id: 'edge-atractivo-muy', name: 'Atractivo, Muy', requirements: 'Novato, Atractivo', replaces: 'Atractivo', effects: '+2 a Persuadir e Interpretar.' },
  { id: 'edge-ayudante', name: 'Ayudante', requirements: 'Novato, Espíritu d8+', effects: 'Puedes repetir cualquier tirada de Apoyo.' },
  { id: 'edge-barrido', name: 'Barrido', requirements: 'Novato, Fuerza d8+, Pelear d8+', effects: 'Ataca a todos los enemigos adyacentes (-2 a la tirada).' },
  { id: 'edge-barrido-mejorado', name: 'Barrido Mejorado', requirements: 'Experimentado, Barrido', replaces: 'Barrido', effects: 'Ignora el -2 de Barrido.' },
  { id: 'edge-berserk', name: 'Berserk', requirements: 'Novato', effects: 'Tras ser herido, +2 a Pelear, Daño cuerpo a cuerpo y Dureza, -2 a Parada e ignora penalizaciones por Heridas.' },
  { id: 'edge-bestia', name: 'Bestia', requirements: 'Novato', effects: 'Puedes gastar tus propios Benis por tus animales.' },
  { id: 'edge-bloqueo', name: 'Bloqueo', requirements: 'Experimentado, Pelear d8+', effects: '+1 a Parada.' },
  { id: 'edge-bloqueo-mejorado', name: 'Bloqueo Mejorado', requirements: 'Veterano, Bloqueo', replaces: 'Bloqueo', effects: '+2 a Parada.' },
  { id: 'edge-calculador', name: 'Calculador', requirements: 'Novato, Astucia d8+', effects: 'Ignora hasta 2 puntos de penalizaciones en una acción si no se mueve.' },
  { id: 'edge-callejear', name: 'Callejear', requirements: 'Novato, Astucia d6+', effects: '+2 a Persuadir e Investigar en entornos urbanos.' },
  { id: 'edge-campeon', name: 'Campeón', requirements: 'Novato, Espíritu d8+, Pelear d6+', effects: '+2 al daño y Dureza contra criaturas del mal.' },
  { id: 'edge-canalizacion', name: 'Canalización', requirements: 'Novato, Trasfondo Arcano, Habilidad Arcana d8+', effects: 'Si saca un aumento en la tirada de activación, el coste en PP se reduce en 1.' },
  { id: 'edge-carismatico', name: 'Carismático', requirements: 'Novato, Espíritu d8+', effects: '+2 a Persuadir.' },
  { id: 'edge-chi', name: 'Chi', requirements: 'Veterano, Artista Marcial', effects: 'Usa tu energía interna para potenciar tus habilidades.' },
  { id: 'edge-con-un-par', name: 'Con un Par', requirements: 'Novato, Agilidad d8+', effects: 'Si ataca cuerpo a cuerpo con una mano, puede hacer otro ataque con la otra sin penalización por acción múltiple.' },
  { id: 'edge-concentracion', name: 'Concentración', requirements: 'Experimentado, Astucia d8+', effects: 'La duración de los poderes con Duración 5 o más se duplica.' },
  { id: 'edge-conexiones', name: 'Conexiones', requirements: 'Novato', effects: '+2 a Persuadir con el grupo y una vez por sesión puede pedir un favor.' },
  { id: 'edge-contraataque', name: 'Contraataque', requirements: 'Experimentado, Pelear d8+', effects: 'Una vez por asalto, si un enemigo falla un ataque cuerpo a cuerpo, ataque gratis a -2.' },
  { id: 'edge-contraataque-mejorado', name: 'Contraataque Mejorado', requirements: 'Veterano, Contraataque', replaces: 'Contraataque', effects: 'Como Contraataque, pero sin el penalizador de -2.' },
  { id: 'edge-coraje-liquido', name: 'Coraje Líquido', requirements: 'Novato, Vigor d8+', effects: 'Beber alcohol otorga +1 dado de Vigor e ignora un nivel de Herida durante una hora.' },
  { id: 'edge-curacion-rapida', name: 'Curación Rápida', requirements: 'Novato, Vigor d8+', effects: '+2 a Vigor en tiradas de curación natural.' },
  { id: 'edge-curandero', name: 'Curandero', requirements: 'Novato, Espíritu d8+', effects: '+2 a todas las tiradas de Medicina (incluyendo mágicas).' },
  { id: 'edge-demagogo', name: 'Demagogo', requirements: 'Experimentado, Espíritu d8+', effects: 'Afectas a múltiples oponentes con Provocar o Intimidar.' },
  { id: 'edge-dificil-de-matar', name: 'Difícil de Matar', requirements: 'Novato, Espíritu d6+', effects: 'Ignora penalizaciones por Heridas en tiradas de Incapacitación.' },
  { id: 'edge-dificil-de-matar-aun-mas', name: 'Difícil de Matar, Aún Más', requirements: 'Veterano, Difícil de Matar', replaces: 'Difícil de Matar', effects: 'Tira un dado para sobrevivir a la muerte.' },
  { id: 'edge-disparo-doble', name: 'Disparo Doble', requirements: 'Novato, Disparar d6+', effects: 'Dispara dos flechas/proyectiles a la vez.' },
  { id: 'edge-disparo-mortal', name: 'Disparo Mortal', requirements: 'Heroico, Tirador', effects: 'Aumenta drásticamente el daño a distancia.' },
  { id: 'edge-disparo-rapido', name: 'Disparo Rápido', requirements: 'Novato, Agilidad d6+, Disparar d6+', effects: 'Ataque a distancia adicional con penalización.' },
  { id: 'edge-disparo-rapido-mejorado', name: 'Disparo Rápido Mejorado', requirements: 'Experimentado, Disparo Rápido', replaces: 'Disparo Rápido', effects: 'Ignora la penalización de Disparo Rápido.' },
  { id: 'edge-drenar-el-alma', name: 'Drenar el Alma', requirements: 'Experimentado, Trasfondo Arcano', effects: 'Sacrificas fatiga por puntos de poder.' },
  { id: 'edge-erudito', name: 'Erudito', requirements: 'Novato, Habilidad de conocimiento d8+', effects: '+2 a una habilidad de conocimiento específica.' },
  { id: 'edge-esfuerzo-extra', name: 'Esfuerzo Extra', requirements: 'Novato, Espíritu d8+', effects: 'Gasta un beni para añadir un bono a una tirada de rasgo.' },
  { id: 'edge-esquiva', name: 'Esquiva', requirements: 'Experimentado, Agilidad d8+', effects: '-2 a ataques de disparo contra ti.' },
  { id: 'edge-esquiva-mejorada', name: 'Esquiva Mejorada', requirements: 'Veterano, Esquiva', replaces: 'Esquiva', effects: '-4 a ataques de disparo contra ti.' },
  { id: 'edge-experto', name: 'Experto', requirements: 'Legendario, Profesional', effects: 'El dado de la habilidad elegida aumenta a d12+2.' },
  { id: 'edge-famoso', name: 'Famoso', requirements: 'Novato', effects: '+1 a Persuadir.' },
  { id: 'edge-famoso-muy', name: 'Famoso, Muy', requirements: 'Experimentado, Famoso', replaces: 'Famoso', effects: '+2 a Persuadir.' },
  { id: 'edge-fervor', name: 'Fervor', requirements: 'Experimentado, Mando', effects: '+1 al daño cuerpo a cuerpo para aliados.' },
  { id: 'edge-finta', name: 'Finta', requirements: 'Novato, Pelear d8+', effects: 'Realiza finta para que el objetivo quede Distraído o Vulnerable.' },
  { id: 'edge-fornido', name: 'Fornido', requirements: 'Novato, Fuerza d6+, Vigor d6+', effects: '+1 a Tamaño y Dureza. Mejora la capacidad de carga.' },
  { id: 'edge-frenesi', name: 'Frenesí', requirements: 'Experimentado, Pelear d8+', effects: 'Ataque de Pelea adicional (-2 a la tirada).' },
  { id: 'edge-frenesi-mejorado', name: 'Frenesí Mejorado', requirements: 'Veterano, Frenesí', replaces: 'Frenesí', effects: 'Ignora el -2 de Frenesí.' },
  { id: 'edge-fuerza-de-voluntad', name: 'Fuerza de Voluntad', requirements: 'Novato, Espíritu d8+', effects: '+2 a resistir ataques sociales y poderes mentales.' },
  { id: 'edge-fuga', name: 'Fuga', requirements: 'Novato, Agilidad d8+', effects: 'Evitas ataque gratuito al huir de combate.' },
  { id: 'edge-fuga-mejorada', name: 'Fuga Mejorada', requirements: 'Novato, Fuga', replaces: 'Fuga', effects: 'Como Fuga, pero contra múltiples oponentes.' },
  { id: 'edge-golpe-poderoso', name: 'Golpe Poderoso', requirements: 'Novato, Pelear d10+', effects: '-2 a Pelea para +4 al daño.' },
  { id: 'edge-gorila', name: 'Gorila', requirements: 'Novato, Fuerza d8+', effects: 'Bonos al combate cuerpo a cuerpo basados en la fuerza bruta.' },
  { id: 'edge-guerrero-impio-sagrado', name: 'Guerrero Impío/Sagrado', requirements: 'Novato, Espíritu d8+', effects: 'Canaliza poder divino para el combate.' },
  { id: 'edge-hombre-de-recursos', name: 'Hombre de Recursos', requirements: 'Novato, Astucia d10+', effects: 'No sufres penalización por habilidades sin entrenamiento.' },
  { id: 'edge-hueso-duro-de-roer', name: 'Hueso Duro de Roer', requirements: 'Legendario, Vigor d10+', effects: 'Dureza +1.' },
  { id: 'edge-hueso-muy-duro-de-roer', name: 'Hueso Muy Duro de Roer', requirements: 'Legendario, Hueso Duro de Roer', replaces: 'Hueso Duro de Roer', effects: 'Dureza +2.' },
  { id: 'edge-humillar', name: 'Humillar', requirements: 'Experimentado, Provocar d8+', effects: 'Provocar hace que el enemigo quede Vulnerable además de Distraído.' },
  { id: 'edge-improvisacion', name: 'Improvisación', requirements: 'Novato, Astucia d6+', effects: 'Ignora penalizaciones por usar herramientas improvisadas.' },
  { id: 'edge-inspiracion', name: 'Inspiración', requirements: 'Experimentado, Mando', effects: 'Bonos de apoyo a los aliados en Radio de Mando.' },
  { id: 'edge-instinto-asesino', name: 'Instinto Asesino', requirements: 'Experimentado', effects: 'Puedes repetir cualquier tirada de dados de daño que obtenga un 1.' },
  { id: 'edge-inventor', name: 'Inventor', requirements: 'Novato, McGyver', effects: 'Permite crear dispositivos tecnológicos temporales.' },
  { id: 'edge-investigador', name: 'Investigador', requirements: 'Novato, Astucia d8+, Investigar d8+', effects: '+2 a Investigar y Notar (pistas).' },
  { id: 'edge-kid-dos-pistolas', name: 'Kid Dos Pistolas', requirements: 'Novato, Agilidad d8+', effects: 'Ataque adicional con arma de fuego en la mano mala sin penalización.' },
  { id: 'edge-ladron', name: 'Ladrón', requirements: 'Novato, Agilidad d8+, Sigilo d6+', effects: '+1 a Sigilo (urbano), Latrocinio y Atletismo (trepar).' },
  { id: 'edge-leñador', name: 'Leñador', requirements: 'Novato, Espíritu d6+, Supervivencia d8+', effects: '+2 a Supervivencia y Sigilo en la naturaleza.' },
  { id: 'edge-lider-nato', name: 'Líder Nato', requirements: 'Experimentado, Espíritu d8+, Mando', effects: 'Puedes entregar tus benis a aliados en Radio de Mando.' },
  { id: 'edge-linguista', name: 'Lingüista', requirements: 'Novato, Astucia d6+', effects: 'Conoces idiomas adicionales.' },
  { id: 'edge-maestro', name: 'Maestro', requirements: 'Heroico, Habilidad d12+', effects: 'Repite una tirada fallida de esa habilidad (1/sesión).' },
  { id: 'edge-maestro-de-armas', name: 'Maestro de Armas', requirements: 'Maestro, Pelear d12+', effects: '+1 a Parada.' },
  { id: 'edge-maestro-de-armas-mejorado', name: 'Maestro de Armas Mejorado', requirements: 'Maestro, Maestro de Armas', replaces: 'Maestro de Armas', effects: '+2 a Parada.' },
  { id: 'edge-mago', name: 'Mago', requirements: 'Novato, Trasfondo Arcano (Magia)', effects: 'Bonos a la magia y gestión de puntos de poder.' },
  { id: 'edge-mandibula-de-hierro', name: 'Mandíbula de Hierro', requirements: 'Novato, Vigor d8+', effects: '+2 a Vigor para resistir Aturdido.' },
  { id: 'edge-mando', name: 'Mando', requirements: 'Novato, Espíritu d6+', effects: 'Aliados en Radio de Mando pueden repetir tiradas de Espíritu para recuperarse.' },
  { id: 'edge-mando-presencia-de', name: 'Mando, Presencia de', requirements: 'Experimentado, Mando', effects: 'Radio de Mando aumenta a 10 casillas.' },
  { id: 'edge-manos-firmes', name: 'Manos Firmes', requirements: 'Novato, Agilidad d8+', effects: 'Ignoras la penalización por plataforma inestable.' },
  { id: 'edge-mantene-la-formacion', name: '¡Mantene la Formación!', requirements: 'Experimentado, Mando', effects: '+1 a la Dureza de los aliados.' },
  { id: 'edge-matagigantes', name: 'Matagigantes', requirements: 'Veterano', effects: '+1d6 al daño contra criaturas de Tamaño 4+.' },
  { id: 'edge-maton', name: 'Matón', requirements: 'Novato, Fuerza d6+', effects: 'Bonos a la intimidación física y combate.' },
  { id: 'edge-mcgyver', name: 'McGyver', requirements: 'Novato, Astucia d6+', effects: 'Improvisa herramientas y dispositivos temporales.' },
  { id: 'edge-mentalista', name: 'Mentalista', requirements: 'Experimentado, Astucia d8+', effects: '+2 a tiradas enfrentadas con poderes psiónicos.' },
  { id: 'edge-mr-arreglalotodo', name: 'Mr. Arreglalotodo', requirements: 'Novato, Reparar d8+', effects: '+2 a Reparar y reduce el tiempo a la mitad.' },
  { id: 'edge-nervios-de-acero', name: 'Nervios de Acero', requirements: 'Novato, Vigor d8+', effects: 'Ignora un nivel de penalización por Heridas.' },
  { id: 'edge-nervios-de-acero-mejorados', name: 'Nervios de Acero Mejorados', requirements: 'Novato, Nervios de Acero', replaces: 'Nervios de Acero', effects: 'Ignora hasta dos niveles de penalización por Heridas.' },
  { id: 'edge-nuevos-poderes', name: 'Nuevos Poderes', requirements: 'Novato, Trasfondo Arcano', effects: 'Aprende dos nuevos poderes.' },
  { id: 'edge-ofuscar', name: 'Ofuscar', requirements: 'Experimentado, Espíritu d8+', effects: 'Dificulta que otros detecten tu presencia o intenciones.' },
  { id: 'edge-osado', name: 'Osado', requirements: 'Novato, Espíritu d6+', effects: '+2 a tiradas de miedo y restas 2 en la tabla de Terror.' },
  { id: 'edge-parkour', name: 'Parkour', requirements: 'Novato, Agilidad d8+', effects: 'Ignoras penalizaciones por terreno difícil al moverte.' },
  { id: 'edge-pies-ligeros', name: 'Pies Ligeros', requirements: 'Novato, Agilidad d6+', effects: 'Paso +2, dado de carrera aumenta un tipo.' },
  { id: 'edge-profesional', name: 'Profesional', requirements: 'Legendario, Habilidad d12+', effects: 'El dado de la habilidad elegida aumenta a d12+1.' },
  { id: 'edge-punteria', name: 'Puntería', requirements: 'Experimentado, Disparar d8+', effects: 'Ignora penalizaciones por cobertura o alcance.' },
  { id: 'edge-rapido', name: 'Rápido', requirements: 'Novato, Agilidad d8+', effects: 'Descarta carta de acción de 5 o menos y roba nueva.' },
  { id: 'edge-rico', name: 'Rico', requirements: 'Novato', effects: 'Empieza con el triple del dinero inicial.' },
  { id: 'edge-rico-muy', name: 'Rico, Muy', requirements: 'Novato, Rico', effects: 'Cinco veces los fondos iniciales y sueldo anual.' },
  { id: 'edge-rodar', name: 'Rodar', requirements: 'Novato, Agilidad d8+', effects: 'Bonos a la defensa al moverte por el suelo.' },
  { id: 'edge-sabio', name: 'Sabio', requirements: 'Veterano, Astucia d10+', effects: 'Amplio conocimiento en diversas áreas.' },
  { id: 'edge-sangre-fria', name: 'Sangre Fría', requirements: 'Experimentado, Astucia d8+', effects: 'Sacas una carta de acción adicional y eliges.' },
  { id: 'edge-sentido-del-peligro', name: 'Sentido del Peligro', requirements: 'Novato', effects: 'Notar (+2) para detectar emboscadas o peligros inmediatos.' },
  { id: 'edge-siempre-preparado', name: 'Siempre Preparado', requirements: 'Novato, Astucia d8+', effects: 'Siempre tienes el equipo adecuado a mano.' },
  { id: 'edge-suerte', name: 'Suerte', requirements: 'Novato', effects: 'Ganas un beni adicional por sesión.' },
  { id: 'edge-suerte-mejorada', name: 'Suerte Mejorada', requirements: 'Novato, Suerte', replaces: 'Suerte', effects: 'Ganas dos benis adicionales por sesión.' },
  { id: 'edge-temerario', name: 'Temerario', requirements: 'Novato, Espíritu d6+', effects: 'Bonos al realizar acciones arriesgadas.' },
  { id: 'edge-templado', name: 'Templado', requirements: 'Experimentado, Espíritu d8+', effects: 'Bonos a la resistencia mental y emocional.' },
  { id: 'edge-tirador', name: 'Tirador', requirements: 'Experimentado, Disparar d8+', effects: 'Bonos al disparar si no te mueves.' },
  { id: 'edge-tiro-preciso', name: 'Tiro Preciso', requirements: 'Experimentado, Disparar d10+', effects: 'Reduce las penalizaciones por disparar a objetivos pequeños.' },
  { id: 'edge-tozudo', name: 'Tozudo', requirements: 'Novato, Espíritu d8+', effects: 'Bonos para resistir efectos que nublen la mente.' },
  { id: 'edge-trabajo-en-equipo', name: 'Trabajo en Equipo', requirements: 'Novato', effects: 'Bonos adicionales al realizar apoyos o ser apoyado.' },
  { id: 'edge-trampero', name: 'Trampero', requirements: 'Novato, Astucia d6+', effects: 'Experto en colocar y detectar trampas.' },
  { id: 'edge-vinculo-comun', name: 'Vínculo Común', requirements: 'Novato, Espíritu d8+', effects: 'Puedes entregar tus benis a cualquier aliado.' },
  { id: 'edge-voz-de-mando', name: 'Voz de Mando', requirements: 'Novato, Espíritu d6+', effects: 'Bonos a las habilidades de mando basadas en la voz.' },
  { id: 'edge-voz-potente', name: 'Voz Potente', requirements: 'Novato', effects: 'Tu voz se escucha a grandes distancias.' },
  { id: 'edge-voz-muy-potente', name: 'Voz Muy Potente', requirements: 'Novato, Voz Potente', effects: 'Tu voz puede aturdir o ensordecer a otros.' },
  { id: 'edge-trasfondo-arcano', name: 'Trasfondo Arcano', requirements: 'Novato', effects: 'Acceso a poderes sobrenaturales.' },
  { id: 'edge-reflejos-de-combate', name: 'Reflejos de Combate', requirements: 'Novato', effects: '+2 a Espíritu para recuperarse de Sacudido.' },
  { id: 'edge-investigador-jefe', name: 'Investigador Jefe', requirements: 'Heroico, Investigador', replaces: 'Investigador', effects: '+2 a Investigar y Notar (pistas).' },
  { id: 'edge-resistencia-arcana', name: 'Resistencia Arcana', requirements: 'Novato, Espíritu d8+', effects: 'Armadura Arcana +2 contra magia y +2 a resistir poderes.' },
  { id: 'edge-resistencia-arcana-mejorada', name: 'Resistencia Arcana Mejorada', requirements: 'Novato, Resistencia Arcana', replaces: 'Resistencia Arcana', effects: 'Armadura Arcana +4 contra magia y +4 a resistir poderes.' },
  { id: 'edge-rock-and-roll', name: '¡Rock and Roll!', requirements: 'Novato, Disparar d8+', effects: 'Ignora penalización por retroceso si no se mueve.' },
  { id: 'edge-gigante', name: 'Gigante', requirements: 'Novato', effects: '+1 a Tamaño y Dureza.' },
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
