
const edges = [
  { name: 'Acaparador', requirements: 'Novato, Astucia d6+', effects: 'Tu héroe tiene un talento natural para encontrar objetos útiles. Recibe un bono de +2 a todas las tiradas de Notar para encontrar equipo o suministros.' },
  { name: 'Acróbata', requirements: 'Novato, Agilidad d8+, Atletismo d8+', effects: 'Tu héroe es extremadamente ágil. Recibe un bono de +2 a las tiradas de Atletismo para realizar maniobras acrobáticas y +1 a su Parada si no lleva armadura pesada.' },
  { name: 'Afortunado', requirements: 'Novato', effects: 'Tu héroe parece tener una suerte increíble. Recibe un beni adicional al comienzo de cada sesión de juego.' },
  { name: 'Muy Afortunado', requirements: 'Novato, Afortunado', effects: 'Tu héroe tiene una suerte excepcional. Recibe un beni adicional al comienzo de cada sesión (esto se apila con Afortunado, para un total de dos benis adicionales).' },
  { name: 'Alerta', requirements: 'Novato', effects: 'Tu héroe siempre está atento a su entorno. Recibe un bono de +2 a todas sus tiradas de Notar.' },
  { name: 'Ambas manos', requirements: 'Novato, Agilidad d8+', effects: 'Tu héroe es experto en luchar con un arma en cada mano. Si realiza un ataque con cada mano (cuerpo a cuerpo), no sufre la penalización por acción múltiple.' },
  { name: 'Ambidiestro', requirements: 'Novato, Agilidad d8+', effects: 'Tu héroe puede usar ambas manos con la misma habilidad. Ignora la penalización de -2 por usar la mano torpe.' },
  { name: 'Aristócrata', requirements: 'Novato', effects: 'Tu héroe proviene de la nobleza o de una familia de gran prestigio. Recibe un bono de +2 a las tiradas de Persuadir cuando trata con la alta sociedad o autoridades.' },
  { name: 'Arma Distintiva', requirements: 'Novato, Pelear o Disparar d8+', effects: 'Tu héroe tiene un arma especial con la que ha entrenado extensamente. Recibe un bono de +1 a las tiradas de ataque y +1 a la Parada mientras empuñe ese arma específica.' },
  { name: 'As', requirements: 'Novato, Agilidad d8+', effects: 'Tu héroe es un piloto o conductor excepcional. Recibe un bono de +2 a las tiradas de Conducir, Pilotar y Navegar. Además, puede gastar benis para realizar tiradas de Vigor por su vehículo para ignorar Heridas.' },
  { name: 'Atractivo', requirements: 'Novato, Vigor d6+', effects: 'Tu héroe es físicamente muy agraciado. Recibe un bono de +1 a las tiradas de Persuadir e Interpretar.' },
  { name: 'Muy Atractivo', requirements: 'Novato, Atractivo', effects: 'Tu héroe es una belleza de leyenda. Recibe un bono de +2 a las tiradas de Persuadir e Interpretar.' },
  { name: 'Barrido', requirements: 'Novato, Fuerza d8+, Pelear d8+', effects: 'Tu héroe puede atacar a todos los enemigos adyacentes con una sola acción. Realiza una única tirada de Pelea con una penalización de -2 y compárala con la Parada de cada oponente.' },
  { name: 'Berserk', requirements: 'Novato', effects: 'Cuando tu héroe sufre una Herida, debe realizar una tirada de Espíritu o entrar en un estado de furia ciega. Recibe un bono de +2 a las tiradas de Pelea y Fuerza, y +2 a la Dureza (en furia), pero no puede usar habilidades que requieran concentración.' },
  { name: 'Bloqueo', requirements: 'Experimentado, Pelear d8+', effects: 'Tu héroe es experto en defenderse en combate cuerpo a cuerpo. Su Parada aumenta en +1.' },
  { name: 'Bruto', requirements: 'Novato, Fuerza d6+, Vigor d6+', effects: 'Tu héroe es un luchador nato que usa su fuerza bruta. Puede usar su Fuerza en lugar de Agilidad para calcular su movimiento y para resistir ciertas maniobras de combate.' },
  { name: 'Calculador', requirements: 'Novato, Astucia d8+', effects: 'Tu héroe es un estratega frío. Si obtiene un 5 o menos en su carta de acción, puede ignorar hasta 2 puntos de penalización por cobertura o iluminación en su primer ataque.' },
  { name: 'Carismático', requirements: 'Novato, Espíritu d8+', effects: 'Tu héroe tiene una personalidad magnética. Recibe un beni adicional que solo puede usarse para repetir tiradas de Persuadir o Interpretar.' },
  { name: 'Contraataque', requirements: 'Experimentado, Pelear d8+', effects: 'Una vez por asalto, si un enemigo falla un ataque de Pelea contra tu héroe, este puede realizar un ataque de Pelea inmediato contra ese enemigo como acción gratuita.' },
  { name: 'Curandero', requirements: 'Novato, Espíritu d8+', effects: 'Tu héroe tiene un don para la medicina. Recibe un bono de +2 a todas las tiradas de Sanar.' },
  { name: 'Difícil de Matar', requirements: 'Novato, Espíritu d6+', effects: 'Tu héroe es increíblemente resistente. Ignora las penalizaciones por Heridas al realizar tiradas de Incapacitación.' },
  { name: 'Esquiva', requirements: 'Experimentado, Agilidad d8+', effects: 'Tu héroe es experto en evitar ataques a distancia. Los ataques de disparo contra él sufren una penalización de -2.' },
  { name: 'Fornido', requirements: 'Novato, Fuerza d6+, Vigor d6+', effects: 'Tu héroe es excepcionalmente robusto. Su Tamaño aumenta en +1 y su Dureza en +1. Además, su Fuerza se considera un tipo de dado superior a efectos de Carga.' },
  { name: 'Frenesí', requirements: 'Experimentado, Pelear d8+', effects: 'Tu héroe puede realizar un ataque de Pelea adicional por asalto con una penalización de -2 a todas sus tiradas de Pelea ese turno.' },
  { name: 'Frenesí mejorado', requirements: 'Veterano, Frenesí', effects: 'Como Frenesí, pero el héroe ignora la penalización de -2.' },
  { name: 'Mandíbula de hierro', requirements: 'Novato, Vigor d8+', effects: 'Tu héroe es capaz de encajar golpes que dejarían fuera de combate a otros. Recibe un bono de +2 a las tiradas de Vigor para resistir el estado Aturdido.' },
  { name: 'Ímpetu', requirements: 'Novato, Espíritu d8+', effects: 'Tu héroe tiene una energía y entusiasmo contagiosos. Recibe un bono de +2 a sus tiradas cuando gasta un beni para repetir una tirada.' },
  { name: 'Inspiración', requirements: 'Novato, Mando', effects: 'Los aliados en el Radio de Mando de tu héroe reciben un bono de +1 a sus tiradas de Espíritu para recuperarse del estado Sacudido.' },
  { name: 'Lingüista', requirements: 'Novato, Astucia d6+', effects: 'Tu héroe tiene un don para los idiomas. Conoce un número de idiomas adicionales igual a la mitad de su dado de Astucia.' },
  { name: 'Líder de hombres', requirements: 'Experimentado, Mando', effects: 'Los aliados bajo el mando del héroe añaden +1 a sus tiradas de Espíritu para recuperarse del estado Sacudido (esto se apila con Inspiración).' },
  { name: 'Ladrón', requirements: 'Novato, Agilidad d8+, Sigilo d6+, Latrocinio d6+, Atletismo d6+', effects: 'Tu héroe es un experto en infiltración y robo. Recibe un bono de +1 a las tiradas de Sigilo en entornos urbanos, Latrocinio y Atletismo para trepar.' },
  { name: 'Mando', requirements: 'Novato, Espíritu d6+', effects: 'Tu héroe es un líder natural. Los aliados en su Radio de Mando pueden repetir sus tiradas de Espíritu para recuperarse del estado Sacudido.' },
  { name: 'Nervios de acero', requirements: 'Novato, Vigor d8+', effects: 'Tu héroe puede ignorar un nivel de penalización por Heridas.' },
  { name: 'Pies Ligeros', requirements: 'Novato, Agilidad d6+', effects: 'Tu héroe es muy rápido. Su Paso aumenta en +2 y su dado de carrera aumenta en un tipo de dado.' },
  { name: 'Rápido', requirements: 'Novato, Agilidad d8+', effects: 'Tu héroe tiene unos reflejos asombrosos. Si roba una carta de acción de valor 5 o inferior, puede descartarla y robar una nueva hasta obtener una superior a 5.' },
  { name: 'Reflejos de Combate', requirements: 'Novato', effects: 'Tu héroe reacciona rápidamente en combate. Recibe un bono de +2 a las tiradas de Espíritu para recuperarse del estado Sacudido.' },
  { name: 'Resistencia arcana', requirements: 'Novato, Espíritu d8+', effects: 'La magia y otros efectos sobrenaturales tienen más dificultades para afectar a este héroe. Recibe un bono de +2 a las tiradas de Rasgo para resistir poderes y +2 a la Armadura contra daño provocado por poderes.' },
  { name: 'Resistencia arcana mejorada', requirements: 'Novato, Resistencia arcana', effects: 'Como Resistencia arcana, pero el bono aumenta a +4.' },
  { name: 'Rico', requirements: 'Novato', effects: 'Tu héroe tiene acceso a una gran cantidad de recursos económicos. Empieza con el triple del dinero inicial y tiene un salario o ingresos regulares.' },
  { name: 'Muy Rico', requirements: 'Novato, Rico', effects: 'Tu héroe es inmensamente rico. Empieza con cinco veces el dinero inicial y tiene unos ingresos muy elevados.' },
  { name: 'Sanador Rápido', requirements: 'Novato, Vigor d8+', effects: 'Tu héroe se recupera de las heridas con una rapidez asombrosa. Recibe un bono de +2 a sus tiradas de Vigor para la curación natural.' },
  { name: 'Sentir el Peligro', requirements: 'Novato', effects: 'Tu héroe tiene un sexto sentido para las emboscadas. Realiza una tirada de Notar con un bono de +2 para detectar ataques sorpresa o trampas.' },
  { name: 'Trasfondo Arcano', requirements: 'Novato', effects: 'Tu héroe tiene la capacidad de usar magia, milagros, superpoderes o ciencia extraña. Recibe un número inicial de poderes y puntos de poder según el tipo de trasfondo.' },
  { name: 'Valiente', requirements: 'Novato, Espíritu d6+', effects: 'Tu héroe es excepcionalmente valiente. Recibe un bono de +2 a todas sus tiradas de Miedo.' },
  { name: 'Voluntad de Hierro', requirements: 'Novato, Espíritu d8+', effects: 'Tu héroe tiene una determinación inquebrantable. Recibe un bono de +2 a las tiradas de Espíritu para resistir la Intimidación y la Provocación.' },
  { name: 'Bloqueo mejorado', requirements: 'Veterano, Bloqueo', effects: 'Tu héroe es un maestro de la defensa. Su Parada aumenta en un total de +2.' },
  { name: 'Contraataque mejorado', requirements: 'Veterano, Contraataque', effects: 'Tu héroe puede realizar un contraataque contra todos los enemigos que fallen un ataque de Pelea contra él en el mismo asalto.' },
  { name: 'Esquiva mejorada', requirements: 'Veterano, Esquiva', effects: 'Tu héroe es casi imposible de alcanzar a distancia. Los ataques de disparo contra él sufren una penalización de -4.' },
  { name: 'Primer golpe', requirements: 'Novato, Agilidad d8+', effects: 'Una vez por asalto, tu héroe puede realizar un ataque de Pelea gratuito contra cualquier enemigo que se mueva a una posición adyacente a él.' },
  { name: 'Primer golpe mejorado', requirements: 'Heroico, Primer golpe', effects: 'Como Primer golpe, pero el héroe puede realizar un ataque gratuito contra cada enemigo que se mueva a una posición adyacente.' },
  { name: 'Barrido mejorado', requirements: 'Experimentado, Barrido', effects: 'Como Barrido, pero el héroe ignora la penalización de -2.' },
  { name: 'Sangre fría', requirements: 'Experimentado, Astucia d8+', effects: 'Tu héroe mantiene la calma bajo presión. Roba una carta de acción adicional en combate y quédate con la mejor.' },
  { name: 'Sangre fría mejorada', requirements: 'Veterano, Sangre fría', effects: 'Como Sangre fría, pero el héroe roba dos cartas adicionales y se queda con la mejor.' },
  { name: 'Tirador', requirements: 'Experimentado, Atletismo d8+ o Disparar d8+', effects: 'Si el héroe no se mueve en su turno, recibe un bono de +1 a su tirada de Disparar o ignora hasta 2 puntos de penalizaciones por cobertura, iluminación, etc.' },
  { name: 'Rock and Roll!', requirements: 'Experimentado, Disparar d8+', effects: 'Si el héroe no se mueve, ignora la penalización por retroceso al disparar armas automáticas.' },
  { name: 'Nervios de acero mejorados', requirements: 'Novato, Nervios de acero', effects: 'Tu héroe ignora hasta dos niveles de penalización por Heridas.' },
  { name: 'Presencia de mando', requirements: 'Experimentado, Mando', effects: 'El Radio de Mando de tu héroe aumenta a 10 casillas (20 metros).' },
  { name: 'Fervor', requirements: 'Experimentado, Mando', effects: 'Los aliados en el Radio de Mando de tu héroe añaden +1 a sus tiradas de daño en combate cuerpo a cuerpo.' },
  { name: '¡Mantener la línea!', requirements: 'Experimentado, Mando', effects: 'Los aliados en el Radio de Mando de tu héroe añaden +1 a su Dureza.' },
  { name: 'Líder nato', requirements: 'Experimentado, Espíritu d8+, Mando', effects: 'Tu héroe puede entregar sus propios benis a cualquier aliado que se encuentre en su Radio de Mando.' },
  { name: 'Táctico', requirements: 'Experimentado, Astucia d8+, Tácticas d8+', effects: 'Al comienzo del combate, el héroe realiza una tirada de Tácticas. Con un éxito, roba una carta de acción adicional para el grupo (dos con un aumento).' },
  { name: 'Recarga rápida', requirements: 'Experimentado, Espíritu d6+, Trasfondo Arcano', effects: 'Tu héroe recupera 10 Puntos de Poder por cada hora de descanso o actividad ligera.' },
  { name: 'Concentración', requirements: 'Experimentado, Trasfondo Arcano', effects: 'La duración de los poderes con mantenimiento se duplica antes de tener que pagar el coste de mantenimiento.' },
  { name: 'Mentalista', requirements: 'Experimentado, Astucia d8+, Trasfondo Arcano (Psiónica)', effects: 'Tu héroe recibe un bono de +2 a todas sus tiradas enfrentadas cuando usa poderes psiónicos.' },
  { name: 'Drenaje de alma', requirements: 'Experimentado, Trasfondo Arcano, Habilidad arcana d8+', effects: 'Cuando el héroe se queda sin Puntos de Poder, puede realizar una tirada de Espíritu para obtener 5 PP a cambio de sufrir un nivel de fatiga.' },
  { name: 'Agitador', requirements: 'Experimentado, Espíritu d8+', effects: 'Tu héroe puede usar las habilidades Intimidar o Provocar contra todos los enemigos en un área de plantilla de ráfaga pequeña.' },
  { name: 'Réplica', requirements: 'Experimentado, Astucia d6+, Provocar d6+', effects: 'Si un enemigo falla una tirada de Provocar contra tu héroe, este queda Distraído automáticamente.' },
  { name: 'Humillar', requirements: 'Experimentado, Provocar d8+', effects: 'Tu héroe puede usar la habilidad Provocar para hacer que un enemigo quede Vulnerable además de Distraído.' },
  { name: 'Chatarrero', requirements: 'Novato, Afortunado', effects: 'Tu héroe tiene un talento especial para encontrar objetos útiles. Una vez por sesión, puede encontrar un objeto útil que necesite en ese momento.' },
  { name: 'Maestro de armas', requirements: 'Maestro, Pelear d12+', effects: 'Tu héroe es un maestro en el uso de armas de cuerpo a cuerpo. Su Parada aumenta en +1.' },
  { name: 'Tirador de élite', requirements: 'Experimentado, Atletismo d8+ o Disparar d8+', effects: 'Tu héroe es un tirador excepcional. Si obtiene un Joker en su carta de iniciativa, dobla el daño de sus ataques de Disparar o Atletismo (lanzar).' },
  { name: 'Matagigantes', requirements: 'Veterano', effects: 'Tu héroe es un experto en enfrentarse a criaturas mucho más grandes que él. Recibe un bonificador de +1d6 al daño cuando ataca a una criatura de Tamaño 4 o superior.' },
  { name: 'Maestro de combate', requirements: 'Maestro, Pelear d12+', effects: 'Tu héroe es un maestro en el combate cuerpo a cuerpo. Ignora hasta 2 puntos de penalizaciones por acciones múltiples si una de ellas es un ataque de Pelea.' },
  { name: 'Indomable', requirements: 'Experimentado, Espíritu d8+', effects: 'Tu héroe es increíblemente difícil de doblegar. Recibe un bonificador de +2 a sus tiradas para resistir poderes o ataques sociales.' },
  { name: 'Amenazador', requirements: 'Experimentado, Intimidar d8+', effects: 'Tu héroe es verdaderamente aterrador. Recibe un bono de +2 a todas sus tiradas de Intimidar.' },
  { name: 'Táctico veterano', requirements: 'Veterano, Táctico', effects: 'Como Táctico, pero el héroe roba dos cartas de acción adicionales para el grupo (tres con un aumento).' },
  { name: 'Recarga rápida mejorada', requirements: 'Veterano, Recarga rápida', effects: 'Tu héroe recupera 20 Puntos de Poder por cada hora de descanso o actividad ligera.' },
  { name: 'Asesino', requirements: 'Novato, Agilidad d8+, Pelear d6+, Sigilo d8+', effects: 'Tu héroe es un maestro de la muerte silenciosa. Añade +2 a sus tiradas de daño cuando ataca a un enemigo por sorpresa o por la espalda.' },
  { name: 'Duro de pelar', requirements: 'Veterano, Difícil de Matar', effects: 'Si tu héroe resultase muerto, realiza una tirada de Espíritu. Si tiene éxito, queda Incapacitado en su lugar.' },
  { name: 'Maestro', requirements: 'Heroico, Habilidad d12+', effects: 'Elige una habilidad en la que tengas d12+. Tu héroe puede repetir una tirada fallida de esa habilidad una vez por sesión.' },
  { name: 'Profesional', requirements: 'Legendario, Habilidad d12+', effects: 'Elige una habilidad en la que tengas d12+. El dado de esa habilidad aumenta a d12+1.' },
  { name: 'Experto', requirements: 'Legendario, Profesional', effects: 'El dado de la habilidad elegida en Profesional aumenta a d12+2.' },
  { name: 'Maestro Legendario', requirements: 'Legendario, Experto', effects: 'El dado de la habilidad elegida en Experto aumenta a d12+3.' },
  { name: 'Resistente', requirements: 'Legendario, Vigor d10+', effects: 'Tu héroe es una leyenda de la resistencia. Su Dureza aumenta en +1 adicional.' },
  { name: 'Conexiones', requirements: 'Novato', effects: 'Tu héroe tiene una red de contactos en una organización o grupo social. Puede pedir favores, información o equipo una vez por sesión.' },
  { name: 'Fama', requirements: 'Novato', effects: 'Tu héroe es conocido por sus hazañas. Recibe un bono de +1 a las tiradas de Persuadir con aquellos que lo reconozcan.' },
  { name: 'Investigador', requirements: 'Novato, Astucia d8+, Investigar d8+', effects: 'Tu héroe es un experto en encontrar información. Recibe un bono de +2 a todas las tiradas de Investigar y Notar (cuando busca pistas).' },
  { name: 'Fama mejorada', requirements: 'Experimentado, Fama', effects: 'Tu héroe es una celebridad. El bono de Persuadir aumenta a +2.' },
  { name: 'Erudito', requirements: 'Novato, Habilidad elegida d8+', effects: 'Tu héroe es un experto en un campo de estudio específico. Elige una habilidad de conocimiento (como Ciencias, Historia o Investigación). Recibe un bono de +2 a todas las tiradas de esa habilidad.' },
  { name: 'Manitas', requirements: 'Novato, Astucia d10+', effects: 'Tu héroe tiene una amplia gama de conocimientos básicos. No sufre la penalización de -2 por usar habilidades en las que no tiene entrenamiento (excepto habilidades arcanas).' },
  { name: 'McGyver', requirements: 'Novato, Astucia d6+, Reparar d6+, Notar d8+', effects: 'Tu héroe puede improvisar herramientas y dispositivos con casi cualquier cosa. Puede realizar tiradas de Reparar sin herramientas y crear dispositivos temporales útiles.' },
  { name: 'Montaraz', requirements: 'Novato, Espíritu d6+, Supervivencia d8+', effects: 'Tu héroe es un experto en la vida al aire libre. Recibe un bono de +2 a las tiradas de Supervivencia y Sigilo en entornos naturales.' },
  { name: 'Soldado', requirements: 'Novato, Fuerza d6+, Vigor d6+', effects: 'Tu héroe ha recibido entrenamiento militar. Su Fuerza se considera un tipo de dado superior para determinar la Carga y los requisitos de Fuerza de las armas y armaduras.' },
  { name: 'Investigador jefe', requirements: 'Experimentado, Investigador', effects: 'Tu héroe puede realizar una tirada de Investigación en la mitad del tiempo normal y con un bono adicional de +2.' },
  { name: 'Desenfundado rápido', requirements: 'Novato, Agilidad d8+', effects: 'Tu héroe puede desenvainar un arma (o sacarla de su funda) como acción gratuita. Además, si tiene que realizar una tirada de Agilidad para ver quién actúa primero en un duelo, recibe un bono de +2.' },
  { name: 'Finta', requirements: 'Novato, Pelear d8+', effects: 'Tu héroe es un maestro del engaño en combate. Puede realizar una finta (usando Pelear contra la Parada del objetivo) para que este quede Distraído o Vulnerable.' },
  { name: 'Golpe de poder', requirements: 'Novato, Pelear d10+', effects: 'Tu héroe puede sacrificar precisión por potencia. Puede restar 2 a su tirada de Pelea para añadir +4 al daño si impacta.' },
  { name: 'Instinto asesino', requirements: 'Experimentado', effects: 'Tu héroe tiene un instinto letal. Puede repetir cualquier tirada de dados de daño que obtenga un 1 en el dado de habilidad (no en el dado salvaje).' },
  { name: 'Luchador improvisado', requirements: 'Experimentado, Astucia d6+', effects: 'Tu héroe puede convertir cualquier cosa en un arma. Ignora la penalización de -2 por usar armas improvisadas.' },
  { name: 'Pistolero', requirements: 'Novato, Agilidad d8+', effects: 'Tu héroe es experto en usar dos armas de fuego simultáneamente. Si realiza un ataque con cada mano (a distancia), no sufre la penalización por acción múltiple.' },
  { name: 'Pulso firme', requirements: 'Novato, Agilidad d8+', effects: 'Tu héroe ignora la penalización por plataforma inestable y reduce a la mitad la penalización por movimiento al disparar.' },
  { name: 'Retirada', requirements: 'Novato, Agilidad d8+', effects: 'Tu héroe es experto en salir de situaciones peligrosas. Los enemigos no reciben un ataque gratuito cuando el héroe se retira del combate cuerpo a cuerpo.' },
  { name: 'Retirada mejorada', requirements: 'Novato, Retirada', effects: 'Como Retirada, pero el héroe puede retirarse incluso si está rodeado por múltiples enemigos.' },
  { name: '¡Rock and Roll!', requirements: 'Experimentado, Disparar d8+', effects: 'Tu héroe sabe cómo manejar el retroceso de las armas automáticas. Ignora la penalización por fuego de supresión o ráfaga si no se mueve en su turno.' },
  { name: 'Sin piedad', requirements: 'Experimentado', effects: 'Tu héroe no muestra clemencia. Puede gastar un beni para añadir +1d6 al daño de un ataque que ya haya impactado.' },
  { name: 'Tirador', requirements: 'Experimentado, Atletismo o Disparar d8+', effects: 'Tu héroe es un tirador paciente. Si no se mueve en su turno, ignora hasta 2 puntos de penalización por cobertura, iluminación o disparar a larga distancia.' },
  { name: 'Inspiración heroica', requirements: 'Heroico, Inspiración', effects: 'Los aliados bajo el mando de tu héroe pueden repetir cualquier tirada de Espíritu fallida, no solo para recuperarse de estar Aturdidos.' },
  { name: 'Beni adicional', requirements: 'Legendario', effects: 'Tu héroe es una leyenda viviente y recibe un beni adicional al comienzo de cada sesión.' }
];

const uniqueEdges = [];
const seenNames = new Set();

// Deduplicate and prioritize names with ¡
edges.forEach(edge => {
  const cleanName = edge.name.replace(/^¡/, '').replace(/!$/, '');
  if (!seenNames.has(cleanName)) {
    // Check if there's another one with ¡
    const withExclamation = edges.find(e => e.name === '¡' + cleanName + '!');
    if (withExclamation) {
      uniqueEdges.push(withExclamation);
      seenNames.add(cleanName);
    } else {
      uniqueEdges.push(edge);
      seenNames.add(cleanName);
    }
  }
});

// Sort
uniqueEdges.sort((a, b) => {
  const nameA = a.name.replace(/^¡/, '').toLowerCase();
  const nameB = b.name.replace(/^¡/, '').toLowerCase();
  return nameA.localeCompare(nameB, 'es');
});

console.log(JSON.stringify(uniqueEdges, null, 2));
