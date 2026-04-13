
const userEdges = [
  "Acaparador", "Acróbata", "Acróbata Marcial", "Afortunado", "Afortunado, Muy",
  "Alcurnia", "Alerta", "Ambidextro", "Amenazador", "Animar", "Ardor",
  "Arma Distintiva", "Arma Distintiva Mejorada", "Artífice", "Artista Marcial",
  "Artista Marcial Mejorado", "As", "Asesino", "Ataque Repentino",
  "Ataque Repentino Mejorado", "Atractivo", "Atractivo, Muy", "Ayudante",
  "Barrido", "Barrido Mejorado", "Berserk", "Bestia", "Bloqueo", "Bloqueo Mejorado",
  "Calculador", "Callejear", "Campeón", "Canalización", "Carismático", "Chi",
  "Con un Par", "Concentración", "Conexiones", "Contraataque", "Contraataque Mejorado",
  "Coraje Líquido", "Curación Rápida", "Curandero", "Demagogo", "Difícil de Matar",
  "Difícil de Matar, Aún Más", "Disparo Doble", "Disparo Mortal", "Disparo Rápido",
  "Disparo Rápido Mejorado", "Drenar el Alma", "Erudito", "Esfuerzo Extra",
  "Esquiva", "Esquiva Mejorada", "Experto", "Famoso", "Famoso, Muy", "Fervor",
  "Finta", "Fornido", "Frenesí", "Frenesí Mejorado", "Fuerza de Voluntad", "Fuga",
  "Fuga Mejorada", "Golpe Poderoso", "Gorila", "Guerrero Impío/Sagrado",
  "Hombre de Recursos", "Hueso Duro de Roer", "Hueso Muy Duro de Roer", "Humillar",
  "Improvisación", "Inspiración", "Instinto Asesino", "Inventor", "Investigador",
  "Kid Dos Pistolas", "Ladrón", "Leñador", "Líder Nato", "Lingüista", "Maestro",
  "Maestro de Armas", "Maestro de Armas Mejorado", "Mago", "Mandíbula de Hierro",
  "Mando", "Mando, Presencia de", "Manos Firmes", "¡Mantene la Formación!",
  "Matagigantes", "Matón", "McGyver", "Mentalista", "Mr. Arreglalotodo",
  "Nervios de Acero", "Nervios de Acero Mejorados", "Nuevos Poderes", "Ofuscar",
  "Osado", "Parkour", "Pies Ligeros", "Profesional", "Puntería", "Rápido", "Rico",
  "Rico, Muy", "Rodar", "Sabio", "Sangre Fría", "Sentido del Peligro",
  "Siempre Preparado", "Suerte", "Suerte Mejorada", "Temerario", "Templado",
  "Tirador", "Tiro Preciso", "Tozudo", "Trabajo en Equipo", "Trampero",
  "Vínculo Común", "Voz de Mando", "Voz Potente", "Voz Muy Potente"
];

const fs = require('fs');
const content = fs.readFileSync('src/data.ts', 'utf8');

const missing = userEdges.filter(edge => !content.includes(`name: '${edge}'`));
console.log('Missing edges:', missing);
