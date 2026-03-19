
import { Species, Skill, Hindrance, Edge } from './types';

export const SPECIES: Species[] = [
  { 
    name: 'Humano', 
    description: 'En la mayoría de entornos de campaña los humanos suelen tener el beneficio racial de una ventaja adicional a su elección. Esta regla refleja su versatilidad y adaptabilidad, comparados con los miembros de otras especies.',
    abilities: [
      { name: 'Adaptable', description: 'Los seres humanos comienzan el juego con una ventaja de rango Novato a su elección. Deben, no obstante, cumplir los requisitos de la misma.' }
    ] 
  },
  { 
    name: 'Acuariano', 
    description: 'Estos seres proceden de las aplastantes profundidades de los océanos. Son un pueblo fuerte y duro bajo las olas, aunque más vulnerables en tierra firme o las regiones cálidas de la superficie.',
    abilities: [
      { name: 'Acuático', description: 'Los acuarianos no se ahogan en el agua y pueden moverse a su Paso completo cuando nadan. Consulta Movimiento en la página 131 para determinar la velocidad normal nadando.' },
      { name: 'Dependencia', description: 'Los acuarianos deben sumergirse en el agua al menos una hora de cada veinticuatro o sufren de forma automática un nivel de fatiga hasta llegar a incapacitado. Al día siguiente de quedar incapacitados por culpa de la deshidratación, fallecen. Cada hora pasada en el agua permite restaurar un nivel de fatiga.' },
      { name: 'Dureza', description: 'La vida en las profundidades de su mundo acuático ha aumentado el aguante y resistencia de sus cuerpos. Su Dureza aumenta en uno.' },
      { name: 'Visión en la penumbra', description: 'Los acuarianos están acostumbrados a la oscuridad de las profundidades. Pueden ignorar las penalizaciones por iluminación de penumbra y oscuridad.' }
    ] 
  },
  { 
    name: 'Androide', 
    description: 'Los androides son seres semiorgánicos, creados con tecnología avanzada. El ejemplo que aquí presentamos imita al ser humano en casi todo, de tal modo que puede hacerse pasar por uno de ellos cuando lo desee (siempre que no sea examinado por un médico, claro). Su red neural avanzada le proporciona inteligencia artificial completa con una personalidad individual, manías y emociones equivalentes a los de cualquier otro ser sapiente.',
    abilities: [
      { name: 'Constructo', description: 'Los androides añaden +2 a sus tiradas para recuperarse del aturdimiento, no respiran, ignoran un punto de penalización por heridas y son inmunes a enfermedades y venenos. Los constructos no sanan de forma natural. Para curarlos es necesario emplear la habilidad Reparar y cada intento consume una hora por herida sufrida; no están sujetos a “la hora de oro” (consulta la pág. 137).' },
      { name: 'Juramento (mayor)', description: 'Los constructos son fabricados con un propósito específico en mente. Los interpretados por los jugadores tienen directrices de comportamiento muy amplias, como servir a una corporación específica o una facción política. Funciona como la desventaja mayor Juramento respecto a ese conjunto específico de directrices. Si ello provoca en algún momento un conflicto de intereses, el jugador y el DJ deben determinar lo que la programación exige hacer al personaje.' },
      { name: 'Marginado (mayor)', description: 'Los androides sustraen dos a todas sus tiradas de Persuadir cuando interactúan con otros seres que no sean también androides. Además, en la mayoría de ambientaciones no tienen derechos legales (en general, se les trata como una propiedad).' },
      { name: 'Pacifista (mayor)', description: 'A no ser que el androide esté diseñado para el combate, casi todas las sociedades avanzadas exigen la instalación de “circuitos Asimov”, un concepto basado en la Primera Ley de la Robótica del famoso escritor de ciencia ficción Isaac Asimov. Un ser artificial no puede dañar a un ser sapiente ni permitir, por acción o inacción, que un ser sapiente sea dañado. Se representa con la desventaja mayor Pacifista.' }
    ] 
  },
  { 
    name: 'Aviano', 
    description: 'Básicamente, los avianos son seres humanos con alas. Tienden a ser de complexión muy ligera, pues sus huesos están huecos. Algunos tienen alas de plumas, mientras que en otros son similares a las de los murciélagos o escamosas.',
    abilities: [
      { name: 'Frágil', description: 'Debido a sus huesos huecos, todos los avianos sufren una penalización de -1 a su Dureza.' },
      { name: 'Mal nadador', description: 'Las alas de los avianos son un problema bajo el agua. Restan dos a todas sus tiradas de Atletismo (nadar) y cada paso de movimiento bajo el agua les cuesta el triple de lo normal.' },
      { name: 'Paso reducido', description: 'Su costumbre de desplazarse volando y la masa de las alas recogidas hacen que los avianos sean una pizca más lentos que otros humanoides al caminar. Reduce en uno su Paso racial (a 5) y su dado de carrera en un nivel (a d4).' },
      { name: 'Sentidos agudos', description: 'Los avianos tienen sentidos mucho más afinados que otros individuos. Comienzan con Notar d6 en lugar de d4. Esto aumenta su límite racial hasta d12+1.' },
      { name: 'Volar', description: 'Los avianos vuelan con Paso 12. Usan Atletismo para hacer maniobras aéreas.' }
    ],
    skillBonuses: { 'Notar': 6 }
  },
  { 
    name: 'Elfo', 
    description: 'Los elfos son un pueblo alto y esbelto, con orejas acabadas en punta y profundos ojos de llamativos colores. Independientemente de si proceden de bosques o de remotos valles ocultos, todos los elfos nacen con mayor gracilidad que los humanos, aunque también son de complexión más ligera. La esperanza de vida de los elfos suele superar los 300 años.',
    abilities: [
      { name: 'Ágil', description: 'Todos los elfos son gráciles y diestros. Comienzan el juego con Agilidad d6 en lugar de d4. Esto aumenta su límite racial hasta d12+1.' },
      { name: 'Manazas', description: 'Los elfos muestran un innato rechazo por los objetos mecánicos y, por tanto, todos reciben la desventaja Manazas. Rechazarán emplear la mayoría de instrumentos y aparatos complejos.' },
      { name: 'Visión en la penumbra', description: 'Los ojos de los elfos amplifican la luz existente. Otras especies afirman que se pueden ver las estrellas en sus pupilas. Sea como sea, ignoran las penalizaciones por iluminación de penumbra y oscuridad.' }
    ],
    attributeBonuses: { 'Agilidad': 6 }
  },
  { 
    name: 'Enano', 
    description: 'Los enanos son un pueblo bajito, rechoncho y resistente, que habita en enormes cavernas excavadas en el interior de altas montañas. Son una especie belicosa y orgullosa, que frecuentemente se ve implicada en conflictos con otros pueblos menos civilizados, como los orcos o trasgos.',
    abilities: [
      { name: 'Aguante', description: 'Los enanos son un pueblo vigoroso y resistente. Comienzan el juego con Vigor d6 en lugar de d4. Esto aumenta su límite racial hasta d12+1.' },
      { name: 'Lento', description: 'Los enanos reducen en uno su Paso racial (a 5) y su dado de carrera en un nivel (a d4).' },
      { name: 'Visión en la penumbra', description: 'Los ojos de los enanos están acostumbrados a la oscuridad de los entornos subterráneos. Pueden ignorar las penalizaciones por iluminación de penumbra y oscuridad.' }
    ],
    attributeBonuses: { 'Vigor': 6 }
  },
  { 
    name: 'Mediano', 
    description: 'Los medianos son criaturas pequeñas y ágiles, usualmente con cabello castaño o negro. Cuando se les compara con otras especies son frágiles, pero su alegre optimismo (e ingenio) les hace adoptar una actitud de osadía, convirtiéndolos en un reto a tener en cuenta cuando plantan cara a criaturas de hasta el doble de su tamaño.',
    abilities: [
      { name: 'Menudo (Tamaño -1)', description: 'Los medianos rara vez superan los 120 cm de alto. Por ello, su Tamaño (y su Dureza) se reducen en uno.' },
      { name: 'Paso reducido', description: 'Reducen en uno su Paso racial (a 5) y su dado de carrera en un nivel (a d4).' },
      { name: 'Suertudo', description: 'Los medianos reciben un beni adicional por sesión de juego.' },
      { name: 'Vivaz', description: 'En general, los medianos son seres optimistas. Comienzan el juego con Espíritu d6 en lugar de d4. Esto aumenta su límite racial hasta d12+1.' }
    ],
    attributeBonuses: { 'Espíritu': 6 }
  },
  { 
    name: 'Rakhasa', 
    description: 'Los rakhasas son similares a seres humanos, pero poseen rasgos felinos. Hay muchos tipos y variantes: la brillante piel de un tigre, la pelambrera con manchas de un leopardo o el exótico aspecto de un gato siamés son ejemplos muy apropiados. Tienen afiladas zarpas y dientes, así como naturaleza cruel cuando llega el momento de disponer de sus presas.',
    abilities: [
      { name: 'Ágil', description: 'Su gracia felina les otorga Agilidad d6 en lugar de d4. Esto aumenta su límite racial hasta d12+1.' },
      { name: 'Enemigo racial', description: 'La sociedad rakhasa creció a costa de otra. Elige una de las especies comunes de tu ambientación. Los miembros de estas dos culturas sufren una penalización de -2 a sus tiradas de Persuadir entre sí y, a menudo, se atacan nada más verse.' },
      { name: 'Garras/Mordisco', description: 'Los colmillos y garras de los rakhasas se consideran Armas naturales (pág. 142) y causan con ellos FUE+d4.' },
      { name: 'Mal nadador', description: 'Es una actividad que no les gusta y en la que tampoco destacan demasiado. Deben restar dos a todas sus tiradas de Atletismo relacionadas con nadar y cada paso de movimiento nadando les cuesta el triple de lo normal.' },
      { name: 'Sanguinario', description: 'Los rakhasas pueden ser muy crueles con sus enemigos, a menudo juegan con ellos por simple diversión. Rara vez toman prisioneros y sienten muy pocos remordimientos por ejecutarlos.' },
      { name: 'Visión en la penumbra', description: 'Los ojos de los rakhasas amplifican la luz existente y permiten ignorar las penalizaciones por iluminación de penumbra y oscuridad.' }
    ],
    attributeBonuses: { 'Agilidad': 6 }
  },
  { 
    name: 'Saurio', 
    description: 'Los hombres lagarto proceden de junglas humeantes o profundos desiertos, donde han creado su propia civilización, aislados de las demás especies inteligentes.',
    abilities: [
      { name: 'Armadura +2', description: 'Los saurios tienen una piel escamosa que funciona de forma similar a una armadura de cuero.' },
      { name: 'Marginado (menor)', description: 'Muchas otras especies desconfían de los saurios. Quizás se deba a sus extrañas costumbres y formas de actuar, su sibilante pronunciación o un miedo inconsciente hacia los ancestros reptil de estas criaturas. Sea como sea, los saurios sufren una penalización de -2 a Persuadir con todo el mundo excepto su propio pueblo.' },
      { name: 'Mordisco', description: 'El mordisco de un saurio causa FUE+d4 de daño y se considera un arma natural (consulta la página 142).' },
      { name: 'Sentidos agudos', description: 'Los afinados sentidos de los saurios les proporcionan la ventaja Alerta.' },
      { name: 'Susceptibilidad medioambiental', description: 'Aunque no son auténticos seres de sangre fría, los saurios se desenvuelven muy mal en condiciones gélidas. Sufren una penalización de -4 para resistir todos los efectos medioambientales del frío.' }
    ] 
  },
  { 
    name: 'Semielfo', 
    description: 'Muestran la gracilidad de los elfos, pero no su elegante fragilidad. Casi todos se adaptan bien al entorno, pero algunos sufren el rechazo de alguna de sus dos ramas familiares, pudiendo haber quedado marcados por ello.',
    abilities: [
      { name: 'Herencia', description: 'Cada semielfo retiene bien la gracia de su pariente élfico o bien la adaptabilidad de su herencia humana. Durante la creación del personaje, el jugador elige entre comenzar con una ventaja gratuita a su elección o tener d6 en Agilidad, en lugar de d4 (esto también aumenta su límite racial hasta d12+1).' },
      { name: 'Marginado (menor)', description: 'Los semielfos nunca están del todo cómodos ni en la sociedad humana ni en la élfica, pues tienen un pie en cada mundo, sin decidirse jamás por completo por uno de ellos. Debido a ello, sufren una penalización de -2 a las tiradas de Persuasión con todos excepto los miembros de su propia especie.' },
      { name: 'Visión en la penumbra', description: 'Los semielfos ignoran las penalizaciones por iluminación de penumbra y oscuridad.' }
    ],
    heritageChoices: [
      { name: 'Herencia Humana', description: 'Ventaja gratuita de rango Novato.', attributeBonuses: {} },
      { name: 'Herencia Élfica', description: 'Agilidad d6 inicial y máximo d12+1.', attributeBonuses: { 'Agilidad': 6 } }
    ]
  },
];

export const ATTRIBUTES = ['Agilidad', 'Astucia', 'Espíritu', 'Fuerza', 'Vigor'];

export const SKILLS: Omit<Skill, 'value'>[] = [
  { name: 'Apostar', attribute: 'Astucia', isBasic: false, description: 'Habilidad para ganar dinero en juegos de azar.' },
  { name: 'Atletismo', attribute: 'Agilidad', isBasic: true, description: 'Habilidad física general, incluyendo correr, saltar, trepar y nadar.' },
  { name: 'Cabalgar', attribute: 'Agilidad', isBasic: false, description: 'Habilidad para montar y controlar animales de montura.' },
  { name: 'Ciencia Extraña', attribute: 'Astucia', isBasic: false, description: 'Habilidad para crear y usar inventos tecnológicos extraños.' },
  { name: 'Ciencias', attribute: 'Astucia', isBasic: false, description: 'Conocimiento de disciplinas científicas como física, química o biología.' },
  { name: 'Conducir', attribute: 'Agilidad', isBasic: false, description: 'Habilidad para manejar vehículos terrestres.' },
  { name: 'Conocimientos Generales', attribute: 'Astucia', isBasic: true, description: 'Sentido común y conocimientos básicos sobre el mundo.' },
  { name: 'Control', attribute: 'Espíritu', isBasic: false, description: 'Habilidad para controlar y dirigir a otros, a menudo usada con animales o subordinados.' },
  { name: 'Disparar', attribute: 'Agilidad', isBasic: false, description: 'Habilidad para usar armas a distancia como pistolas, arcos o rifles.' },
  { name: 'Electrónica', attribute: 'Astucia', isBasic: false, description: 'Habilidad para reparar y usar dispositivos electrónicos complejos.' },
  { name: 'Fe', attribute: 'Espíritu', isBasic: false, description: 'Habilidad para canalizar el poder divino a través de la fe.' },
  { name: 'Hechicería', attribute: 'Astucia', isBasic: false, description: 'Habilidad para manipular las fuerzas mágicas.' },
  { name: 'Humanidades', attribute: 'Astucia', isBasic: false, description: 'Conocimiento de historia, filosofía, artes y otras disciplinas humanas.' },
  { name: 'Idioma', attribute: 'Astucia', isBasic: false, description: 'Habilidad para hablar y entender lenguas extranjeras.' },
  { name: 'Interpretar', attribute: 'Espíritu', isBasic: false, description: 'Habilidad para actuar, cantar o tocar instrumentos.' },
  { name: 'Intimidar', attribute: 'Espíritu', isBasic: false, description: 'Habilidad para asustar o coaccionar a otros.' },
  { name: 'Investigar', attribute: 'Astucia', isBasic: false, description: 'Habilidad para buscar información en libros, registros o bases de datos.' },
  { name: 'Latrocinio', attribute: 'Agilidad', isBasic: false, description: 'Habilidad para forzar cerraduras, robar bolsillos o desactivar trampas.' },
  { name: 'Sanar', attribute: 'Astucia', isBasic: false, description: 'Habilidad para tratar heridas y enfermedades.' },
  { name: 'Navegar', attribute: 'Agilidad', isBasic: false, description: 'Habilidad para manejar barcos y otras embarcaciones acuáticas.' },
  { name: 'Notar', attribute: 'Astucia', isBasic: true, description: 'Habilidad para percibir detalles, detectar emboscadas o encontrar objetos ocultos.' },
  { name: 'Ocultismo', attribute: 'Astucia', isBasic: false, description: 'Conocimiento de lo sobrenatural, lo arcano y lo prohibido.' },
  { name: 'Ordenadores', attribute: 'Astucia', isBasic: false, description: 'Habilidad para usar, hackear y programar sistemas informáticos.' },
  { name: 'Pelear', attribute: 'Agilidad', isBasic: false, description: 'Habilidad para el combate cuerpo a cuerpo, con o sin armas.' },
  { name: 'Persuadir', attribute: 'Espíritu', isBasic: true, description: 'Habilidad para convencer a otros mediante la diplomacia o el encanto.' },
  { name: 'Pilotar', attribute: 'Agilidad', isBasic: false, description: 'Habilidad para manejar aviones, naves espaciales u otros vehículos aéreos.' },
  { name: 'Provocar', attribute: 'Astucia', isBasic: false, description: 'Habilidad para insultar o distraer a los enemigos en combate.' },
  { name: 'Psiónica', attribute: 'Astucia', isBasic: false, description: 'Habilidad para usar poderes mentales.' },
  { name: 'Reparar', attribute: 'Astucia', isBasic: false, description: 'Habilidad para arreglar objetos mecánicos o tecnológicos.' },
  { name: 'Sigilo', attribute: 'Agilidad', isBasic: true, description: 'Habilidad para moverse sin ser visto ni oído.' },
  { name: 'Supervivencia', attribute: 'Astucia', isBasic: false, description: 'Habilidad para encontrar comida, agua y refugio en la naturaleza.' },
  { name: 'Tácticas', attribute: 'Astucia', isBasic: false, description: 'Habilidad para planificar y ejecutar estrategias militares o de combate.' },
];

export const HINDRANCES: Hindrance[] = [
  { 
    name: 'Analfabeto', 
    type: 'Menor', 
    description: 'Tu héroe no sabe leer ni escribir. Puede que sea capaz de firmar con su nombre o reconocer un par de palabras comunes, pero es incapaz de leer un periódico, un contrato o las instrucciones de un frasco de veneno. En entornos modernos, esto puede ser una desventaja social importante. El personaje no puede realizar tiradas de Investigación o cualquier otra que requiera leer o escribir.' 
  },
  { 
    name: 'Anciano', 
    type: 'Mayor', 
    description: 'Tu héroe es mayor. Ha vivido mucho y tiene mucha experiencia, pero su cuerpo ya no es lo que era. Reduce su Paso en 1 y sufre una penalización de -1 a todas sus tiradas de Fuerza y Vigor (esto no reduce el tipo de dado, sino el resultado de la tirada). A cambio, su sabiduría le otorga 5 puntos de habilidad adicionales que debe gastar en habilidades de Astucia. Estos puntos no pueden usarse para comprar nuevas habilidades, solo para mejorar las existentes.' 
  },
  { 
    name: 'Anémico', 
    type: 'Menor', 
    description: 'Tu héroe es enfermizo y tiene poca resistencia física. Resta 1 a todas sus tiradas de Vigor, incluyendo las tiradas para resistir el cansancio, el veneno o las enfermedades, así como las tiradas para recuperarse de heridas o fatiga.' 
  },
  { 
    name: 'Apacible', 
    type: 'Menor', 
    description: 'Tu héroe es de naturaleza pacífica y evita el conflicto siempre que puede. No es un cobarde, simplemente prefiere resolver los problemas hablando. Resta 2 a sus tiradas de Intimidar. Además, si se ve obligado a luchar, suele intentar usar ataques no letales o simplemente defenderse hasta que la situación se calme.' 
  },
  { 
    name: 'Apocado', 
    type: 'Mayor', 
    description: 'Tu héroe es tímido y se amilana fácilmente ante la presencia de otros o en situaciones de estrés social. Resta 2 a sus tiradas de Espíritu cuando intente resistir una prueba de voluntad o una tirada de Intimidar. En situaciones sociales, suele quedarse en un segundo plano y dejar que otros hablen por él.' 
  },
  { 
    name: 'Arrogante', 
    type: 'Mayor', 
    description: 'Tu héroe cree que es mejor que los demás y no duda en hacérselo saber. Siempre busca el desafío más difícil para demostrar su superioridad, lo que a menudo le mete en problemas innecesarios. Debe humillar a sus oponentes siempre que sea posible y nunca acepta ayuda a menos que sea absolutamente vital.' 
  },
  { 
    name: 'Avaricioso', 
    type: 'Menor', 
    description: 'Tu héroe es tacaño con el dinero y siempre intenta regatear o conseguir la mejor parte del botín. Se siente incómodo si tiene que compartir sus recursos sin obtener algo a cambio. Siempre está buscando formas de ahorrar o ganar un poco más de dinero, incluso a costa de pequeñas comodidades.' 
  },
  { 
    name: 'Avaricioso', 
    type: 'Mayor', 
    description: 'Tu héroe es extremadamente codicioso. El dinero y las posesiones materiales son su única prioridad. Hará casi cualquier cosa por una moneda de oro, incluso traicionar a sus compañeros si la oferta es lo suficientemente tentadora. Su vida gira en torno a la acumulación de riqueza y nunca tiene suficiente.' 
  },
  { 
    name: 'Avergonzado', 
    type: 'Menor', 
    description: 'Tu héroe tiene algo de lo que se avergüenza, como un pasado criminal menor o un fracaso público. Intenta ocultarlo, pero el miedo a que se descubra le hace estar siempre en guardia. Si su secreto es descubierto, sufre una penalización de -2 a sus tiradas de Persuadir con aquellos que lo conocen.' 
  },
  { 
    name: 'Avergonzado', 
    type: 'Mayor', 
    description: 'Tu héroe vive atormentado por una gran vergüenza que ha arruinado su reputación. Si su secreto sale a la luz, perderá el respeto de todos los que le rodean y será tratado como un paria. Hará cualquier cosa para evitar que esto ocurra, lo que puede ser usado como chantaje por sus enemigos.' 
  },
  { 
    name: 'Bocazas', 
    type: 'Menor', 
    description: 'Tu héroe no sabe guardar secretos. Si sabe algo interesante, tarde o temprano terminará contándoselo a alguien, a menudo en el peor momento posible. No es que sea malintencionado, simplemente le encanta hablar y ser el centro de atención con noticias jugosas.' 
  },
  { 
    name: 'Buscado', 
    type: 'Menor', 
    description: 'Las autoridades buscan a tu héroe por un delito menor o una confusión. No es un criminal peligroso, pero tiene que evitar a la guardia de la ciudad y puede ser arrestado si es reconocido. Esto complica los viajes y la estancia en lugares civilizados.' 
  },
  { 
    name: 'Buscado', 
    type: 'Mayor', 
    description: 'Tu héroe es un fugitivo de la justicia por un delito grave que no cometió (o sí). Hay una recompensa por su cabeza y los cazadores de recompensas le siguen el rastro. Es un criminal convicto o un traidor a los ojos de la ley y será ejecutado o encarcelado de por vida si es capturado.' 
  },
  { 
    name: 'Canalla', 
    type: 'Menor', 
    description: 'Tu héroe es un sinvergüenza y un pícaro. No es necesariamente malo, pero sus métodos son poco éticos y a menudo irritan a las personas más honorables. Sufre una penalización de -2 a sus tiradas de Persuadir con individuos de alta moralidad o autoridades.' 
  },
  { 
    name: 'Cauto', 
    type: 'Menor', 
    description: 'Tu héroe es excesivamente cuidadoso y nunca toma riesgos innecesarios. Esto a menudo le hace perder oportunidades o tardar demasiado en actuar en situaciones críticas. Siempre planea cada paso meticulosamente, lo que puede desesperar a sus compañeros más impulsivos.' 
  },
  { 
    name: 'Ciego', 
    type: 'Mayor', 
    description: 'Un individuo que ha perdido completamente la visión. Sufre una penalización de -6 a todas las tareas que dependan de la vista. Por el lado bueno, un personaje ciego recibe una ventaja adicional totalmente gratuita para compensar una desventaja tan seria.' 
  },
  { 
    name: 'Cobarde', 
    type: 'Mayor', 
    description: 'Tu héroe huye del peligro a la primera oportunidad. No tiene estómago para la lucha. Resta 2 a todas sus tiradas de Miedo. En combate, suele buscar cobertura o intentar escapar a menos que esté acorralado.' 
  },
  { 
    name: 'Código de Honor', 
    type: 'Mayor', 
    description: 'Tu héroe vive según un estricto código moral que rige todas sus acciones. Nunca miente, nunca ataca a un enemigo desarmado y siempre cumple su palabra, incluso si eso le pone en peligro mortal. Si rompe su código, sufre una gran crisis de conciencia y puede perder sus beneficios de espíritu.' 
  },
  { 
    name: 'Cojo', 
    type: 'Menor', 
    description: 'Tu héroe camina con dificultad debido a una vieja herida o un defecto de nacimiento. Reduce su Paso en 1 y su dado de carrera se reduce en un tipo (por ejemplo, de d6 a d4).' 
  },
  { 
    name: 'Cojo', 
    type: 'Mayor', 
    description: 'Tu héroe tiene una pierna inútil o le falta. Reduce su Paso en 2 y su dado de carrera es siempre un d4. Sufre una penalización de -2 a todas las tiradas de Atletismo que requieran movilidad de las piernas.' 
  },
  { 
    name: 'Corto de Vista', 
    type: 'Menor', 
    description: 'Tu héroe necesita gafas para ver de lejos. Resta 1 a las tiradas de Notar que dependan de la vista a larga distancia. Si pierde las gafas, la penalización aumenta a -2 y afecta a todas las tiradas de ataque a distancia.' 
  },
  { 
    name: 'Corto de Vista', 
    type: 'Mayor', 
    description: 'Tu héroe es casi ciego sin sus gafas. Resta 2 a las tiradas de Notar que dependan de la vista. Si pierde las gafas, es incapaz de distinguir nada que esté a más de un par de metros y sufre una penalización de -4 a todas las tiradas de ataque.' 
  },
  { 
    name: 'Curioso', 
    type: 'Mayor', 
    description: 'Tu héroe no puede evitar investigar cosas nuevas, abrir puertas cerradas o leer libros prohibidos. Su curiosidad a menudo supera su sentido común. Si ve algo misterioso, debe realizar una tirada de Astucia para no ir a investigarlo de inmediato.' 
  },
  { 
    name: 'Delirio', 
    type: 'Menor', 
    description: 'Tu héroe cree en algo que no es cierto, como que los gatos son espías del gobierno o que la luna está hecha de queso. Es inofensivo, pero la gente le mira raro y sufre una penalización de -1 a Persuadir con aquellos que conocen su delirio.' 
  },
  { 
    name: 'Delirio', 
    type: 'Mayor', 
    description: 'Tu héroe sufre una locura importante que afecta a su comportamiento diario. Puede creer que es un rey en el exilio o que tiene una misión divina que nadie más comprende. Esto le causa problemas constantes y una penalización de -2 a Persuadir.' 
  },
  { 
    name: 'Deseo Mortal', 
    type: 'Menor', 
    description: 'Tu héroe busca una muerte gloriosa en combate para redimirse de un pecado pasado o simplemente porque cree que es su destino. No es suicida, pero nunca rechaza un desafío y siempre se ofrece voluntario para las misiones más peligrosas.' 
  },
  { 
    name: 'Despiadado', 
    type: 'Menor', 
    description: 'Tu héroe no muestra compasión con sus enemigos una vez que la batalla ha terminado. No toma prisioneros a menos que sea estrictamente necesario y no duda en rematar a los heridos si cree que pueden ser una amenaza futura.' 
  },
  { 
    name: 'Despiadado', 
    type: 'Mayor', 
    description: 'Tu héroe es cruel y brutal. Disfruta con el sufrimiento ajeno y no duda en torturar o matar a inocentes para conseguir sus objetivos. Es una persona temida y odiada, y su falta de empatía es evidente para todos.' 
  },
  { 
    name: 'Despistado', 
    type: 'Mayor', 
    description: 'Tu héroe no presta atención a su entorno. Siempre está absorto en sus pensamientos, ya sean científicos, filosóficos o simplemente sueños despiertos. Resta 2 a todas las tiradas de Notar y Conocimientos Generales.' 
  },
  { 
    name: 'Dubitativo', 
    type: 'Menor', 
    description: 'Tu héroe duda en los momentos críticos. Siempre es el último en reaccionar cuando surge un problema inesperado. En el primer asalto de cualquier combate, roba dos cartas de iniciativa y quédate con la peor.' 
  },
  { 
    name: 'Enemigo', 
    type: 'Menor', 
    description: 'Alguien con cierta influencia quiere ver a tu héroe arruinado o humillado. Aparecerá de vez en cuando para complicarle la vida, saboteando sus planes o difamando su nombre.' 
  },
  { 
    name: 'Enemigo', 
    type: 'Mayor', 
    description: 'Alguien poderoso quiere ver a tu héroe muerto. Enviará asesinos, usará todos sus recursos legales o militares para acabar con él. Es una amenaza constante que pende sobre su cabeza.' 
  },
  { 
    name: 'Envidioso', 
    type: 'Menor', 
    description: 'Tu héroe envidia lo que otros tienen, ya sea dinero, fama o talento. Siempre intenta superar a los demás de forma mezquina y se siente resentido por el éxito ajeno.' 
  },
  { 
    name: 'Envidioso', 
    type: 'Mayor', 
    description: 'La envidia consume a tu héroe. Es capaz de sabotear a sus propios aliados si cree que están recibiendo más atención que él. Su resentimiento es obvio y daña sus relaciones personales.' 
  },
  { 
    name: 'Escéptico', 
    type: 'Menor', 
    description: 'Tu héroe no cree en lo sobrenatural, la magia o los dioses. Siempre busca una explicación lógica, incluso cuando tiene una bola de fuego delante de la cara. Sufre una penalización de -2 a las tiradas de Miedo causadas por fenómenos mágicos o sobrenaturales (porque no cree en ellos hasta que es tarde).' 
  },
  { 
    name: 'Exceso de Confianza', 
    type: 'Mayor', 
    description: 'Tu héroe cree que es invencible y que puede superar cualquier obstáculo. Nunca se retira de una pelea y siempre toma el camino más peligroso. Cree que su destino es la grandeza y que nada puede detenerle.' 
  },
  { 
    name: 'Feo', 
    type: 'Menor', 
    description: 'Tu héroe es desagradable a la vista debido a cicatrices, rasgos deformes o falta de higiene. Resta 1 a todas sus tiradas de Persuadir. La gente suele evitar el contacto visual con él.' 
  },
  { 
    name: 'Feo', 
    type: 'Mayor', 
    description: 'Tu héroe es horripilante. Su aspecto causa rechazo inmediato en la mayoría de las personas. Resta 2 a todas sus tiradas de Persuadir. En algunas culturas, puede ser tratado como un monstruo.' 
  },
  { 
    name: 'Fobia', 
    type: 'Menor', 
    description: 'Tu héroe tiene un miedo irracional a algo común, como las arañas, las alturas o los espacios cerrados. Resta 1 a todas sus tiradas cuando esté en presencia de su fobia.' 
  },
  { 
    name: 'Fobia', 
    type: 'Mayor', 
    description: 'Tu héroe tiene un pánico paralizante a algo. Debe realizar una tirada de Miedo con una penalización de -2 cuando se enfrente a su fobia. Si falla, queda aterrorizado y debe huir o quedar paralizado.' 
  },
  { 
    name: 'Hábito', 
    type: 'Menor', 
    description: 'Tu héroe tiene una costumbre molesta, como hurgarse la nariz, hablar solo o usar muletillas constantes. Resta 1 a sus tiradas de Persuadir en situaciones sociales debido a la irritación que causa en los demás.' 
  },
  { 
    name: 'Hábito', 
    type: 'Mayor', 
    description: 'Tu héroe tiene una adicción grave que afecta a su salud y a su bolsillo. Si no satisface su hábito con regularidad (cada 24 horas), sufre niveles de fatiga que pueden llevarle a la muerte.' 
  },
  { 
    name: 'Heroico', 
    type: 'Mayor', 
    description: 'Tu héroe siempre ayuda a los necesitados, incluso si eso le pone en peligro mortal. No puede ignorar una petición de auxilio legítima y siempre intenta hacer lo correcto, sin importar el coste personal.' 
  },
  { 
    name: 'Impulsivo', 
    type: 'Mayor', 
    description: 'Tu héroe actúa antes de pensar. Si ve una palanca, la tira. Si ve un enemigo, carga. Nunca espera a tener un plan y su impaciencia a menudo mete al grupo en problemas.' 
  },
  { 
    name: 'Joven', 
    type: 'Menor', 
    description: 'Tu héroe es un adolescente que aún no ha alcanzado la madurez física. Reduce su Tamaño en 1 y su Dureza en 1. Además, solo dispone de 10 puntos de habilidad en lugar de 12. A cambio, recibe un beni adicional por sesión debido a su suerte de principiante.' 
  },
  { 
    name: 'Joven', 
    type: 'Mayor', 
    description: 'Tu héroe es un niño. Reduce su Tamaño en 2 y su Dureza en 2. Sus dados de Fuerza y Vigor se reducen en un tipo (mínimo d4). Además, solo dispone de 10 puntos de habilidad en lugar de 12. A cambio, recibe dos benis adicionales por sesión.' 
  },
  { 
    name: 'Juramento', 
    type: 'Menor', 
    description: 'Tu héroe ha hecho una promesa menor a una persona o institución. Debe cumplirla siempre que no entre en conflicto directo con su supervivencia o sus objetivos principales.' 
  },
  { 
    name: 'Juramento', 
    type: 'Mayor', 
    description: 'Tu héroe ha dedicado su vida a una causa sagrada o una misión vital. Nada le desviará de su camino y sacrificará cualquier cosa por cumplir su juramento.' 
  },
  { 
    name: 'Leal', 
    type: 'Menor', 
    description: 'Tu héroe nunca abandona a sus amigos. Si un compañero está en peligro, hará todo lo posible por ayudarle, incluso si es arriesgado. Es un pilar de confianza para el grupo.' 
  },
  { 
    name: 'Mal Nadador', 
    type: 'Menor', 
    description: 'Tu héroe se hunde como una piedra en el agua. Resta 2 a todas sus tiradas de Atletismo relacionadas con nadar y su Paso en el agua se reduce a la mitad.' 
  },
  { 
    name: 'Mala Suerte', 
    type: 'Mayor', 
    description: 'Tu héroe parece haber nacido bajo una estrella negra. Recibe un beni menos de lo normal al comienzo de cada sesión de juego (mínimo 0).' 
  },
  { 
    name: 'Manazas', 
    type: 'Menor', 
    description: 'Tu héroe es torpe con los objetos mecánicos y la tecnología. Resta 2 a todas sus tiradas de Reparar y de usar aparatos complejos. Si saca un 1 en el dado de habilidad al usar un objeto mecánico, este se rompe.' 
  },
  { 
    name: 'Manco', 
    type: 'Mayor', 
    description: 'A tu héroe le falta un brazo. No puede usar armas de dos manos y sufre una penalización de -2 en cualquier tarea que requiera el uso de ambas manos.' 
  },
  { 
    name: 'Manía', 
    type: 'Menor', 
    description: 'Tu héroe tiene una obsesión menor, como lavarse las manos constantemente o alinear sus cubiertos. Si no puede realizar su manía, sufre una penalización de -1 a sus tiradas de Espíritu debido al estrés.' 
  },
  { 
    name: 'Marginado', 
    type: 'Menor', 
    description: 'Tu héroe pertenece a un grupo social despreciado por la mayoría. Sufre una penalización de -2 a sus tiradas de Persuadir con personas ajenas a su grupo debido a los prejuicios.' 
  },
  { 
    name: 'Marginado', 
    type: 'Mayor', 
    description: 'Tu héroe es un paria total. Es perseguido o despreciado activamente por la sociedad dominante. Su mera presencia puede causar hostilidad o miedo.' 
  },
  { 
    name: 'Mudo', 
    type: 'Mayor', 
    description: 'Tu héroe no puede hablar. Debe comunicarse mediante gestos, escritura o telepatía si dispone de ella. Esto hace que las interacciones sociales sean extremadamente difíciles.' 
  },
  { 
    name: 'Obeso', 
    type: 'Menor', 
    description: 'Tu héroe tiene un sobrepeso considerable. Aumenta su Tamaño en 1 (y por tanto su Dureza), pero reduce su Paso en 1 y su dado de carrera es siempre un d4. Además, su dado de Fuerza nunca puede ser superior a d8.' 
  },
  { 
    name: 'Obligaciones', 
    type: 'Menor', 
    description: 'Tu héroe tiene responsabilidades que le quitan tiempo, como un trabajo a tiempo parcial o una familia que cuidar. Esto puede impedirle participar en algunas aventuras o requerir que regrese a casa con frecuencia.' 
  },
  { 
    name: 'Obligaciones', 
    type: 'Mayor', 
    description: 'Tu héroe está atado por grandes responsabilidades que dominan su vida, como ser el gobernante de una región o el único protector de un pueblo. Sus deberes siempre son lo primero.' 
  },
  { 
    name: 'Obsesión', 
    type: 'Menor', 
    description: 'Tu héroe está obsesionado con algo, como encontrar un tesoro legendario o demostrar una teoría científica. Siempre intenta dirigir la conversación hacia su tema y gasta sus recursos en ello.' 
  },
  { 
    name: 'Obsesión', 
    type: 'Mayor', 
    description: 'Una obsesión domina la vida de tu héroe. Es capaz de sacrificarlo todo, incluyendo su vida y la de sus amigos, por conseguir su objetivo obsesivo.' 
  },
  { 
    name: 'Pacifista', 
    type: 'Menor', 
    description: 'Tu héroe evita la violencia innecesaria y solo lucha en defensa propia o para proteger a otros. Nunca mata a un enemigo que se rinde o que está incapacitado.' 
  },
  { 
    name: 'Pacifista', 
    type: 'Mayor', 
    description: 'Tu héroe se niega a usar la violencia bajo cualquier circunstancia. Intentará detener las peleas mediante la palabra y nunca causará daño directo a otro ser vivo, incluso si su vida corre peligro.' 
  },
  { 
    name: 'Patoso', 
    type: 'Mayor', 
    description: 'Tu héroe siempre se tropieza, tira las cosas o hace ruido cuando intenta ser sigiloso. Resta 2 a sus tiradas de Sigilo y Atletismo. Es un peligro para cualquier misión de infiltración.' 
  },
  { 
    name: 'Pequeño', 
    type: 'Menor', 
    description: 'Tu héroe es muy bajito para su especie. Reduce su Tamaño en 1 y, por tanto, su Dureza en 1.' 
  },
  { 
    name: 'Pobreza', 
    type: 'Menor', 
    description: 'Tu héroe empieza con la mitad del dinero inicial y parece que nunca es capaz de ahorrar nada. Siempre está endeudado o vive al día.' 
  },
  { 
    name: 'Sanguinario', 
    type: 'Mayor', 
    description: 'Tu héroe es cruel con sus enemigos y disfruta con su sufrimiento. Nunca toma prisioneros y a menudo se ensaña con los caídos. Sufre una penalización de -4 a Persuadir con personas honorables.' 
  },
  { 
    name: 'Secreto', 
    type: 'Menor', 
    description: 'Tu héroe oculta algo que podría causarle problemas sociales o legales si se descubriera. Vive con el miedo constante de ser expuesto.' 
  },
  { 
    name: 'Secreto', 
    type: 'Mayor', 
    description: 'Tu héroe oculta algo que podría arruinar su vida o llevarle a la ejecución si saliera a la luz. Sus enemigos pueden usar este secreto para controlarlo.' 
  },
  { 
    name: 'Sensible', 
    type: 'Menor', 
    description: 'Tu héroe se ofende fácilmente por cualquier comentario o crítica. Resta 1 a sus tiradas de Persuadir cuando se sienta insultado. Suele guardar rencor por pequeñas afrentas.' 
  },
  { 
    name: 'Sensible', 
    type: 'Mayor', 
    description: 'Tu héroe es extremadamente emocional y voluble. Sus sentimientos dictan sus acciones por encima de la lógica. Sufre una penalización de -2 a Persuadir debido a sus estallidos emocionales.' 
  },
  { 
    name: 'Sordo', 
    type: 'Menor', 
    description: 'Tu héroe tiene problemas de audición. Resta 2 a todas las tiradas de Notar que dependan del oído. Tiene dificultades para seguir conversaciones en lugares ruidosos.' 
  },
  { 
    name: 'Sordo', 
    type: 'Mayor', 
    description: 'Tu héroe es totalmente sordo. Es inmune a los ataques basados en el sonido, pero es incapaz de oír nada. Sufre una penalización de -4 a Notar en situaciones donde el sonido sea clave.' 
  },
  { 
    name: 'Suspicaz', 
    type: 'Menor', 
    description: 'Tu héroe no se fía de nadie y siempre espera lo peor de los demás. Resta 1 a todas sus tiradas de Persuadir debido a su actitud defensiva y poco amigable.' 
  },
  { 
    name: 'Suspicaz', 
    type: 'Mayor', 
    description: 'La paranoia domina a tu héroe. Cree que todo el mundo conspira contra él y que incluso sus amigos tienen motivos ocultos. Es extremadamente difícil ganar su confianza.' 
  },
  { 
    name: 'Tozudo', 
    type: 'Menor', 
    description: 'Tu héroe siempre quiere tener la razón y rara vez admite un error. Es difícil convencerle de que cambie de opinión, incluso ante pruebas evidentes.' 
  },
  { 
    name: 'Tuerto', 
    type: 'Mayor', 
    description: 'A tu héroe le falta un ojo. Resta 2 a todas las tiradas que requieran percepción de profundidad, como disparar armas a distancia o conducir vehículos a alta velocidad.' 
  },
  { 
    name: 'Vengativo', 
    type: 'Menor', 
    description: 'Tu héroe no olvida una afrenta y siempre busca la oportunidad de devolver el golpe, aunque sea de forma sutil. No descansará hasta que se haya hecho "justicia" según su criterio.' 
  },
  { 
    name: 'Vengativo', 
    type: 'Mayor', 
    description: 'Tu héroe vive para la venganza. No descansará hasta que aquellos que le perjudicaron hayan pagado con creces, a menudo con su vida. Esta obsesión puede nublar su juicio.' 
  },
];

export const EDGES: Edge[] = [
  { 
    name: 'Acaparador', 
    requirements: 'Novato, Astucia d6+', 
    effects: 'Tu héroe tiene un talento natural para encontrar objetos útiles. Recibe un bono de +2 a todas las tiradas de Notar para encontrar equipo o suministros.' 
  },
  { 
    name: 'Acróbata', 
    requirements: 'Novato, Agilidad d8+, Atletismo d8+', 
    effects: 'Tu héroe es extremadamente ágil. Recibe un bono de +2 a las tiradas de Atletismo para realizar maniobras acrobáticas y +1 a su Parada si no lleva armadura pesada.' 
  },
  { 
    name: 'Afortunado', 
    requirements: 'Novato', 
    effects: 'Tu héroe parece tener una suerte increíble. Recibe un beni adicional al comienzo de cada sesión de juego.' 
  },
  { 
    name: 'Alerta', 
    requirements: 'Novato', 
    effects: 'Tu héroe siempre está atento a su entorno. Recibe un bono de +2 a todas sus tiradas de Notar.' 
  },
  { 
    name: 'Ambidextro', 
    requirements: 'Novato, Agilidad d8+', 
    effects: 'Tu héroe puede usar ambas manos con la misma habilidad. Ignora la penalización de -2 por usar la mano torpe.' 
  },
  { 
    name: 'Arma Distintiva', 
    requirements: 'Novato, Habilidad de combate d8+', 
    effects: 'Tu héroe tiene un arma especial con la que ha entrenado extensamente. Recibe un bono de +1 a las tiradas de ataque y +1 a la Parada mientras empuñe ese arma específica.' 
  },
  { 
    name: 'As', 
    requirements: 'Novato, Agilidad d8+', 
    effects: 'Tu héroe es un piloto o conductor excepcional. Recibe un bono de +2 a las tiradas de Conducir, Pilotar y Navegar. Además, puede gastar benis para realizar tiradas de Vigor por su vehículo para ignorar Heridas.' 
  },
  { 
    name: 'Atractivo', 
    requirements: 'Novato, Vigor d6+', 
    effects: 'Tu héroe es físicamente muy agraciado. Recibe un bono de +1 a las tiradas de Persuadir e Interpretar.' 
  },
  { 
    name: 'Barrido', 
    requirements: 'Novato, Fuerza d8+, Pelear d8+', 
    effects: 'Tu héroe puede atacar a todos los enemigos adyacentes con una sola acción. Realiza una única tirada de Pelea con una penalización de -2 y compárala con la Parada de cada oponente.' 
  },
  { 
    name: 'Berserk', 
    requirements: 'Novato', 
    effects: 'Cuando tu héroe sufre una Herida, debe realizar una tirada de Espíritu o entrar en un estado de furia ciega. Recibe un bono de +2 a las tiradas de Pelea y Fuerza, y +2 a la Dureza, pero no puede usar habilidades que requieran concentración.' 
  },
  { 
    name: 'Bloqueo', 
    requirements: 'Novato, Pelear d6+', 
    effects: 'Tu héroe es experto en defenderse en combate cuerpo a cuerpo. Su Parada aumenta en +1.' 
  },
  { 
    name: 'Carismático', 
    requirements: 'Novato, Espíritu d8+', 
    effects: 'Tu héroe tiene una personalidad magnética. Puede repetir una tirada de Persuadir fallida una vez por sesión.' 
  },
  { 
    name: 'Contraataque', 
    requirements: 'Novato, Pelear d8+', 
    effects: 'Una vez por asalto, si un enemigo falla un ataque de Pelea contra tu héroe, este puede realizar un ataque de Pelea inmediato contra ese enemigo como acción gratuita.' 
  },
  { 
    name: 'Curandero', 
    requirements: 'Novato, Espíritu d8+', 
    effects: 'Tu héroe tiene un don para la medicina. Recibe un bono de +2 a todas las tiradas de Sanar.' 
  },
  { 
    name: 'Difícil de Matar', 
    requirements: 'Novato, Espíritu d8+', 
    effects: 'Tu héroe es increíblemente resistente. Ignora las penalizaciones por Heridas al realizar tiradas de Incapacitación.' 
  },
  { 
    name: 'Esquiva', 
    requirements: 'Novato, Agilidad d8+', 
    effects: 'Tu héroe es experto en evitar ataques a distancia. Los ataques de disparo contra él sufren una penalización de -2.' 
  },
  { 
    name: 'Fornido', 
    requirements: 'Novato, Fuerza d8+, Vigor d8+', 
    effects: 'Tu héroe es excepcionalmente robusto. Su Tamaño aumenta en +1 y su Dureza en +1. Además, puede cargar más peso sin penalización.' 
  },
  { 
    name: 'Frenesí', 
    requirements: 'Novato, Pelear d8+', 
    effects: 'Tu héroe puede realizar un ataque de Pelea adicional por asalto con una penalización de -2 a todas sus tiradas de Pelea ese turno.' 
  },
  { 
    name: 'Hueso Duro de Roer', 
    requirements: 'Novato, Vigor d8+', 
    effects: 'Tu héroe puede ignorar un nivel de penalización por Heridas.' 
  },
  { 
    name: 'Inspiración', 
    requirements: 'Novato, Mando', 
    effects: 'Los aliados bajo el mando de tu héroe pueden repetir sus tiradas de Espíritu para recuperarse del estado Aturdido.' 
  },
  { 
    name: 'Ladrón', 
    requirements: 'Novato, Agilidad d8+, Sigilo d8+, Atletismo d8+', 
    effects: 'Tu héroe es un experto en infiltración y robo. Recibe un bono de +2 a las tiradas de Sigilo en entornos urbanos y a las tiradas de Atletismo para trepar.' 
  },
  { 
    name: 'Mando', 
    requirements: 'Novato, Espíritu d8+', 
    effects: 'Tu héroe es un líder natural. Los aliados en su Radio de Mando (5 casillas) reciben un bono de +1 a sus tiradas de Espíritu para recuperarse de estar Aturdidos.' 
  },
  { 
    name: 'Nervios de Acero', 
    requirements: 'Novato, Vigor d8+', 
    effects: 'Tu héroe puede ignorar un nivel de penalización por Heridas.' 
  },
  { 
    name: 'Pies Ligeros', 
    requirements: 'Novato, Agilidad d6+', 
    effects: 'Tu héroe es muy rápido. Su Paso aumenta en +2 y su dado de carrera aumenta en un tipo de dado.' 
  },
  { 
    name: 'Reflejos de Combate', 
    requirements: 'Novato', 
    effects: 'Tu héroe reacciona rápidamente en combate. Recibe un bono de +2 a las tiradas de Espíritu para recuperarse del estado Aturdido.' 
  },
  { 
    name: 'Rico', 
    requirements: 'Novato', 
    effects: 'Tu héroe tiene acceso a una gran cantidad de recursos económicos. Empieza con el triple del dinero inicial y tiene un salario o ingresos regulares.' 
  },
  { 
    name: 'Sentir el Peligro', 
    requirements: 'Novato', 
    effects: 'Tu héroe tiene un sexto sentido para las emboscadas. Realiza una tirada de Notar con un bono de +2 para detectar ataques sorpresa o trampas.' 
  },
  { 
    name: 'Trasfondo Arcano', 
    requirements: 'Novato', 
    effects: 'Tu héroe tiene la capacidad de usar magia, milagros, superpoderes o ciencia extraña. Recibe un número inicial de poderes y puntos de poder según el tipo de trasfondo.' 
  },
  { 
    name: 'Voluntad de Hierro', 
    requirements: 'Novato, Espíritu d8+', 
    effects: 'Tu héroe tiene una determinación inquebrantable. Recibe un bono de +2 a las tiradas de Espíritu para resistir la Intimidación y la Provocación.' 
  },
];
