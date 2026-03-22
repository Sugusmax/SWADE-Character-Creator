/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Trash2, 
  Download, 
  Upload, 
  ChevronRight, 
  ChevronLeft, 
  Save, 
  User, 
  Shield, 
  Sword, 
  Zap, 
  Backpack,
  FileText,
  Share2,
  Dice5,
  Info,
  AlertTriangle,
  AlertCircle,
  Eye,
  BookOpen,
  Award,
  X,
  Heart,
  TrendingUp,
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Character, Dice, Species, Skill, Hindrance, Edge, Advance } from './types';
import { SPECIES, ATTRIBUTES, SKILLS, HINDRANCES, EDGES } from './data';

const STEPS = [
  'Concepto',
  'Especie',
  'Desventajas',
  'Atributos',
  'Habilidades',
  'Ventajas',
  'Poderes',
  'Equipo',
  'Resumen'
];

const INITIAL_CHARACTER: Character = {
  id: '',
  name: '',
  concept: '',
  species: 'Humano',
  attributes: {
    Agilidad: 4,
    Astucia: 4,
    Espíritu: 4,
    Fuerza: 4,
    Vigor: 4,
  },
  skills: {},
  hindrances: [],
  edges: [],
  gear: [],
  powers: [],
  powerPoints: {
    max: 0,
    current: 0
  },
  derived: {
    Paso: 6,
    Parada: 2,
    Dureza: 4,
    Tamaño: 0,
    DadoCarrera: 'd6',
  },
  spentHindrancePoints: {
    attributes: 0,
    skills: 0,
    edges: 0,
  },
  bennies: undefined,
  wounds: undefined,
  fatigue: undefined,
  advances: undefined,
};

const getCharacterRank = (char: Character) => {
  const advances = char.advances || 0;
  if (advances < 4) return 'Novato';
  if (advances < 8) return 'Experimentado';
  if (advances < 12) return 'Veterano';
  if (advances < 16) return 'Heroico';
  return 'Legendario';
};

const getArcaneBackground = (char: Character) => {
  const abEdge = char.edges.find(e => e.name.startsWith('Trasfondo Arcano'));
  if (!abEdge) return null;
  
  const typeMatch = abEdge.name.match(/\((.+)\)/);
  const type = typeMatch ? typeMatch[1] : null;
  return ARCANE_BACKGROUNDS.find(ab => ab.name === type);
};

const getMaxPowerPoints = (char: Character) => {
  const ab = getArcaneBackground(char);
  if (!ab) return 0;
  
  let pp = ab.powerPoints;
  const ppEdges = char.edges.filter(e => e.name === 'Puntos de poder adicionales');
  pp += ppEdges.length * 5;
  
  return pp;
};

const getMaxPowers = (char: Character) => {
  const ab = getArcaneBackground(char);
  if (!ab) return 0;
  
  let powers = ab.powers;
  const newPowerEdges = char.edges.filter(e => e.name === 'Nuevo poder');
  powers += newPowerEdges.length;
  
  return powers;
};

const calculateStartingBennies = (char: Character) => {
  let bennies = 3;
  
  // Species
  if (char.species === 'Mediano') bennies += 1;
  
  // Hindrances
  if (char.hindrances.some(h => h.name === 'Mala Suerte')) bennies -= 1;
  if (char.hindrances.some(h => h.name === 'Joven' && h.type === 'Menor')) bennies += 1;
  if (char.hindrances.some(h => h.name === 'Joven' && h.type === 'Mayor')) bennies += 2;
  
  // Edges
  if (char.edges.some(e => e.name === 'Afortunado')) bennies += 1;
  
  return Math.max(0, bennies);
};

const getAttributeLimits = (attrName: string, speciesName: string, heritageChoice?: string, hindrances: Hindrance[] = []) => {
  const speciesData = SPECIES.find(s => s.name === speciesName);
  let baseMin = 4;

  if (speciesData?.attributeBonuses?.[attrName]) {
    baseMin = speciesData.attributeBonuses[attrName];
  }

  if (speciesName === 'Semielfo' && heritageChoice) {
    const choice = speciesData?.heritageChoices?.find(c => c.name === heritageChoice);
    if (choice?.attributeBonuses?.[attrName]) {
      baseMin = choice.attributeBonuses[attrName];
    }
  }

  let min = baseMin;

  // Apply Hindrance penalties to base (Joven Mayor reduces Strength and Vigor)
  const hasJovenMayor = hindrances.some(h => h.name === 'Joven' && h.type === 'Mayor');
  
  if (hasJovenMayor && (attrName === 'Fuerza' || attrName === 'Vigor')) {
    min = Math.max(4, baseMin - 2);
  }

  // Racial maximum is d12+1 (13) if they have a racial bonus (baseMin > 4)
  const max = baseMin > 4 ? 13 : 12;

  // Obeso limits Strength to d8
  if (attrName === 'Fuerza' && hindrances.some(h => h.name === 'Obeso')) {
    return { min, max: 8 };
  }

  return { min, max };
};

const getSkillLimits = (skillName: string, speciesName: string, heritageChoice?: string) => {
  const speciesData = SPECIES.find(s => s.name === speciesName);
  let racialMin = 0;
  
  if (speciesData?.skillBonuses?.[skillName]) {
    racialMin = speciesData.skillBonuses[skillName];
  }
  
  if (speciesName === 'Semielfo' && heritageChoice) {
    const choice = speciesData?.heritageChoices?.find(c => c.name === heritageChoice);
    if (choice?.skillBonuses?.[skillName]) {
      racialMin = choice.skillBonuses[skillName];
    }
  }

  const skillData = SKILLS.find(s => s.name === skillName);
  const min = racialMin || (skillData?.isBasic ? 4 : 0);
  
  // Racial maximum for skills is also d12+1 if they have a racial bonus
  const max = racialMin > 4 ? 13 : 12;

  return { min, max };
};

const calculateAttributePointsSpent = (char: Character) => {
  let spent = 0;
  ATTRIBUTES.forEach(attr => {
    const { min } = getAttributeLimits(attr, char.species, char.heritageChoice, char.hindrances);
    const current = char.attributes[attr as keyof typeof char.attributes];
    
    let temp = min;
    while (temp < current) {
      if (temp === 12) {
        temp = 13;
      } else {
        temp += 2;
      }
      spent += 1;
    }
  });
  return spent;
};

const calculateSkillPointsSpent = (char: Character) => {
  let basicNeeded = 0;
  let ancianoEligibleSpent = 0;
  const isElderly = char.hindrances.some(h => h.name === 'Anciano');

  SKILLS.forEach(skill => {
    const { min } = getSkillLimits(skill.name, char.species, char.heritageChoice);
    const val = char.skills[skill.name] || min;
    if (val === 0) return;
    
    const attrVal = char.attributes[skill.attribute as keyof typeof char.attributes];
    let currentVal = min;
    
    while (currentVal < val) {
      if (currentVal === 0) {
        basicNeeded += 1;
        currentVal = 4;
      } else {
        const cost = currentVal < attrVal ? 1 : 2;
        if (isElderly && skill.attribute === 'Astucia' && currentVal >= 4) {
          ancianoEligibleSpent += cost;
        } else {
          basicNeeded += cost;
        }
        
        if (currentVal === 12) {
          currentVal = 13;
        } else {
          currentVal += 2;
        }
      }
    }
  });

  const ancianoUsed = Math.min(ancianoEligibleSpent, 5);
  const extraBasic = Math.max(0, ancianoEligibleSpent - 5);
  
  return {
    basicNeeded: basicNeeded + extraBasic,
    ancianoUsed,
    ancianoTotal: 5
  };
};

const calculateHindrancePoints = (hindrances: Hindrance[]) => {
  let points = 0;
  hindrances.forEach(h => {
    points += h.type === 'Mayor' ? 2 : 1;
  });
  return Math.min(4, points);
};

const RANKS = ['Novato', 'Experimentado', 'Veterano', 'Heroico', 'Legendario'];

const getRank = (advances: number) => {
  if (advances < 4) return 'Novato';
  if (advances < 8) return 'Experimentado';
  if (advances < 12) return 'Veterano';
  if (advances < 16) return 'Heroico';
  return 'Legendario';
};

const checkRequirements = (char: Character, requirements: string): { met: boolean; reason?: string } => {
  // Use the number of advances already taken + 1 to determine the rank of the NEXT advance
  // If char.advances is undefined (creation), we treat it as rank Novato (0 or 1)
  const advancesCount = char.advances !== undefined ? char.advances + 1 : 0;
  const currentRank = getRank(advancesCount);
  const currentRankIndex = RANKS.indexOf(currentRank);

  if (requirements === 'Novato') return { met: true };
  
  const parts = requirements.split(',').map(p => p.trim());
  const unmet: string[] = [];

  for (const part of parts) {
    if (RANKS.includes(part)) {
      const reqRankIndex = RANKS.indexOf(part);
      if (currentRankIndex < reqRankIndex) {
        unmet.push(`Rango: ${part}`);
      }
      continue;
    }
    
    // Check for "No [Hindrance]"
    if (part.startsWith('No ')) {
      const hindranceName = part.substring(3).trim();
      if (char.hindrances.some(h => h.name === hindranceName)) {
        unmet.push(`No puede ser ${hindranceName}`);
      }
      continue;
    }

    // Handle alternatives like "Pelear o Disparar d8+" or "Atletismo d8+ o Disparar d8+"
    if (part.includes(' o ')) {
      const alternatives = part.split(' o ').map(a => a.trim());
      let anyMet = false;
      
      for (const alt of alternatives) {
        // Check if alt is an Edge
        const isEdge = EDGES.some(e => {
          const edgeName = e.name.toLowerCase();
          const reqName = alt.toLowerCase();
          return edgeName === reqName || (edgeName.includes('(') && edgeName.split('(')[0].trim() === reqName);
        });

        if (isEdge) {
          if (char.edges.some(e => e.name.toLowerCase() === alt.toLowerCase() || (e.name.toLowerCase().includes('(') && e.name.toLowerCase().split('(')[0].trim() === alt.toLowerCase()))) {
            anyMet = true;
            break;
          }
        } else {
          // Check if alt is Attribute/Skill
          const altMatch = alt.match(/(.+) d(\d+)\+/);
          if (altMatch) {
            const name = altMatch[1].trim();
            const minVal = parseInt(altMatch[2]);
            if (ATTRIBUTES.includes(name)) {
              if ((char.attributes[name as keyof typeof char.attributes] || 4) >= minVal) {
                anyMet = true;
                break;
              }
            } else {
              if ((char.skills[name] || 0) >= minVal) {
                anyMet = true;
                break;
              }
            }
          }
        }
      }

      if (!anyMet) {
        unmet.push(part);
      }
      continue;
    }

    // Check for Edge requirements (generic)
    const isEdgeRequirement = EDGES.some(e => {
      const edgeName = e.name.toLowerCase();
      const reqName = part.toLowerCase();
      return edgeName === reqName || 
             (reqName.startsWith('trasfondo arcano') && edgeName === 'trasfondo arcano') ||
             (edgeName.includes('(') && edgeName.split('(')[0].trim() === reqName);
    });

    if (isEdgeRequirement) {
      const reqName = part.toLowerCase();
      if (reqName.startsWith('trasfondo arcano')) {
        const hasTA = char.edges.some(e => e.name.toLowerCase().startsWith('trasfondo arcano'));
        if (!hasTA) {
          unmet.push(`Ventaja: ${part}`);
        }
      } else if (!char.edges.some(e => e.name.toLowerCase() === reqName || (e.name.toLowerCase().includes('(') && e.name.toLowerCase().split('(')[0].trim() === reqName))) {
        unmet.push(`Ventaja: ${part}`);
      }
      continue;
    }

    // Check for Attribute or Skill: "Name dValue+"
    const match = part.match(/(.+) d(\d+)\+/);
    if (match) {
      const name = match[1].trim();
      const minVal = parseInt(match[2]);
      
      // Check Attributes
      if (ATTRIBUTES.includes(name)) {
        const currentVal = char.attributes[name as keyof typeof char.attributes] || 4;
        if (currentVal < minVal) {
          unmet.push(`${name} ${formatDice(minVal)}+`);
        }
      } 
      // Check Skills
      else {
        // Special case for "Habilidad de combate" or "Pelear o Disparar"
        if (name === 'Habilidad de combate' || name === 'Pelear o Disparar') {
          const pelea = char.skills['Pelear'] || 0;
          const disparar = char.skills['Disparar'] || 0;
          if (pelea < minVal && disparar < minVal) {
            unmet.push(`Pelear o Disparar ${formatDice(minVal)}+`);
          }
        } 
        // Special case for "Atletismo o Disparar"
        else if (name === 'Atletismo o Disparar') {
          const atletismo = char.skills['Atletismo'] || 0;
          const disparar = char.skills['Disparar'] || 0;
          if (atletismo < minVal && disparar < minVal) {
            unmet.push(`Atletismo o Disparar ${formatDice(minVal)}+`);
          }
        }
        // Special case for "Habilidad arcana"
        else if (name === 'Habilidad arcana') {
          const arcanaSkills = ['Hechicería', 'Fe', 'Psiónica', 'Ciencia Extraña'];
          const highestArcana = Math.max(...arcanaSkills.map(s => char.skills[s] || 0));
          if (highestArcana < minVal) {
            unmet.push(`Habilidad arcana ${formatDice(minVal)}+`);
          }
        } 
        // Special case for generic "Habilidad" or "Habilidad elegida"
        else if (name === 'Habilidad' || name === 'Habilidad elegida') {
          const highestSkill = Math.max(0, ...Object.values(char.skills).map(v => v as number));
          if (highestSkill < minVal) {
            unmet.push(`Cualquier habilidad ${formatDice(minVal)}+`);
          }
        }
        else {
          const currentVal = char.skills[name] || 0;
          if (currentVal < minVal) {
            unmet.push(`${name} ${formatDice(minVal)}+`);
          }
        }
      }
    }
  }

  return {
    met: unmet.length === 0,
    reason: unmet.length > 0 ? `Falta: ${unmet.join(', ')}` : undefined
  };
};

const formatDice = (val: number) => {
  if (val <= 12) return `d${val}`;
  return `d12+${val - 12}`;
};

const sortByName = (a: { name: string }, b: { name: string }) => {
  const nameA = a.name.replace(/^[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+/, '').trim();
  const nameB = b.name.replace(/^[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+/, '').trim();
  return nameA.localeCompare(nameB, 'es', { sensitivity: 'base' });
};

const sortByString = (a: string, b: string) => {
  const nameA = a.replace(/^[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+/, '').trim();
  const nameB = b.replace(/^[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+/, '').trim();
  return nameA.localeCompare(nameB, 'es', { sensitivity: 'base' });
};

const isImprovedEdge = (name: string): boolean => {
  const improvedKeywords = ['mejorado', 'mejorada', 'mejorados', 'mejoradas'];
  return improvedKeywords.some(kw => name.toLowerCase().includes(kw));
};

const getEdgesAfterReplacement = (currentEdges: Edge[], newEdge: Edge): Edge[] => {
  const improvedKeywords = ['mejorado', 'mejorada', 'mejorados', 'mejoradas'];
  const isImproved = improvedKeywords.some(kw => newEdge.name.toLowerCase().includes(kw));
  
  if (!isImproved) {
    return [...currentEdges, newEdge].sort(sortByName);
  }

  const edgeToReplace = currentEdges.find(existing => {
    // Check if existing edge name is in requirements
    const inRequirements = newEdge.requirements.toLowerCase().includes(existing.name.toLowerCase());
    if (!inRequirements) return false;
    
    // Check if new edge name contains existing edge name
    const nameMatch = newEdge.name.toLowerCase().includes(existing.name.toLowerCase());
    if (nameMatch) return true;
    
    return false;
  });

  if (edgeToReplace) {
    return [...currentEdges.filter(e => e.name !== edgeToReplace.name), newEdge].sort(sortByName);
  }

  return [...currentEdges, newEdge].sort(sortByName);
};

interface SituationalBonus {
  value: number;
  note: string;
}

interface AppliedModifier {
  name: string;
  value: number;
}

interface BonusInfo {
  generalValue: number;
  modifiers: AppliedModifier[];
  situational: SituationalBonus[];
}

const getWoundPenalty = (char: Character): number => {
  const rawPenalty = Math.min(3, char.wounds || 0);
  let ignore = 0;
  if (char.edges.some(e => e.name === 'Nervios de acero')) ignore += 1;
  if (char.edges.some(e => e.name === 'Nervios de acero mejorados')) ignore += 2;
  return Math.max(0, rawPenalty - ignore);
};

const getFatiguePenalty = (char: Character): number => {
  return Math.min(2, char.fatigue || 0);
};

const getSkillBonus = (char: Character, skillName: string): BonusInfo => {
  let generalValue = 0;
  const modifiers: AppliedModifier[] = [];
  const situational: SituationalBonus[] = [];
  
  // Permanent Skill Edges
  if (char.edges.some(e => e.name === 'Alerta') && skillName === 'Notar') {
    generalValue += 2;
    modifiers.push({ name: 'Alerta', value: 2 });
  }
  if (char.edges.some(e => e.name === 'Atractivo') && (skillName === 'Persuadir' || skillName === 'Interpretar')) {
    generalValue += 1;
    modifiers.push({ name: 'Atractivo', value: 1 });
  }
  if (char.edges.some(e => e.name === 'Curandero') && skillName === 'Sanar') {
    generalValue += 2;
    modifiers.push({ name: 'Curandero', value: 2 });
  }
  if (char.edges.some(e => e.name === 'As') && ['Conducir', 'Pilotar', 'Navegar'].includes(skillName)) {
    generalValue += 2;
    modifiers.push({ name: 'As', value: 2 });
  }
  if (char.edges.some(e => e.name === 'Amenazador') && skillName === 'Intimidar') {
    generalValue += 2;
    modifiers.push({ name: 'Amenazador', value: 2 });
  }
  if (char.edges.some(e => e.name === 'Carismático') && skillName === 'Persuadir') {
    generalValue += 2;
    modifiers.push({ name: 'Carismático', value: 2 });
  }
  if (char.edges.some(e => e.name === 'Investigador') && skillName === 'Investigar') {
    generalValue += 2;
    modifiers.push({ name: 'Investigador', value: 2 });
  }
  if (char.edges.some(e => e.name === 'Investigador jefe') && skillName === 'Investigar') {
    generalValue += 2;
    modifiers.push({ name: 'Investigador jefe', value: 2 });
  }
  if (char.edges.some(e => e.name === 'Ladrón') && skillName === 'Latrocinio') {
    generalValue += 1;
    modifiers.push({ name: 'Ladrón', value: 1 });
  }
  
  // Situational Edges
  if (char.edges.some(e => e.name === 'Aristócrata') && skillName === 'Persuadir') {
    situational.push({ value: 2, note: 'Alta sociedad/autoridades' });
  }
  if (char.edges.some(e => e.name === 'Asesino')) {
    situational.push({ value: 2, note: 'Daño (Sorpresa/Espalda)' });
  }
  if (char.edges.some(e => e.name === 'Erudito')) {
    situational.push({ value: 2, note: 'Habilidad elegida' });
  }
  if (char.edges.some(e => e.name === 'Indomable')) {
    situational.push({ value: 2, note: 'Resistir poderes/ataques sociales' });
  }
  if (char.edges.some(e => e.name === 'Montaraz')) {
    if (skillName === 'Supervivencia' || skillName === 'Sigilo') {
      situational.push({ value: 2, note: 'Entornos naturales' });
    }
  }
  if (char.edges.some(e => e.name === 'Ladrón')) {
    if (skillName === 'Sigilo') situational.push({ value: 1, note: 'Entornos urbanos' });
    if (skillName === 'Atletismo') situational.push({ value: 1, note: 'Trepar' });
  }
  if (char.edges.some(e => e.name === 'Investigador') && skillName === 'Notar') {
    situational.push({ value: 2, note: 'Buscar pistas' });
  }
  if (char.edges.some(e => e.name === 'Sentir el Peligro') && skillName === 'Notar') {
    situational.push({ value: 2, note: 'Detectar peligros/sorpresa' });
  }
  if (char.edges.some(e => e.name === 'Tirador') && skillName === 'Disparar') {
    situational.push({ value: 2, note: 'Si no se mueve' });
  }
  if (char.edges.some(e => e.name === '¡Rock & Roll!') && skillName === 'Disparar') {
    situational.push({ value: 0, note: 'Ignora retroceso si no se mueve' });
  }
  if (char.edges.some(e => e.name === '¡Mantener la línea!')) {
    situational.push({ value: 1, note: 'Dureza (Aliados adyacentes)' });
  }
  if (char.edges.some(e => e.name === 'Resistencia arcana')) {
    situational.push({ value: 2, note: 'Resistir poderes' });
  }
  if (char.edges.some(e => e.name === 'Resistencia arcana mejorada')) {
    situational.push({ value: 4, note: 'Resistir poderes' });
  }
  if (char.edges.some(e => e.name === 'Valiente') && skillName === 'Miedo') {
    situational.push({ value: 2, note: 'Tiradas de Miedo' });
  }
  
  if (char.edges.some(e => e.name === 'Acróbata') && skillName === 'Atletismo') {
    situational.push({ value: 2, note: 'Acrobacias' });
  }
  if (char.edges.some(e => e.name === 'Ladrón')) {
    if (skillName === 'Sigilo') situational.push({ value: 2, note: 'Entornos urbanos' });
    if (skillName === 'Atletismo') situational.push({ value: 2, note: 'Trepar' });
    if (skillName === 'Latrocinio') situational.push({ value: 2, note: 'Forzar/Desactivar' });
  }
  if (char.edges.some(e => e.name === 'Investigador') && skillName === 'Investigar') {
    situational.push({ value: 2, note: 'Investigación general' });
  }
  if (char.edges.some(e => e.name === 'Investigador jefe') && skillName === 'Investigar') {
    situational.push({ value: 2, note: 'Investigación avanzada' });
  }
  if (char.edges.some(e => e.name === 'Fama') && skillName === 'Persuadir') {
    situational.push({ value: 1, note: 'Si es reconocido' });
  }
  if (char.edges.some(e => e.name === 'Fama mejorada') && skillName === 'Persuadir') {
    situational.push({ value: 2, note: 'Si es reconocido' });
  }
  if (char.edges.some(e => e.name === 'Acaparador') && skillName === 'Notar') {
    situational.push({ value: 2, note: 'Encontrar equipo/suministros' });
  }
  if (char.edges.some(e => e.name === 'Sentir el Peligro') && skillName === 'Notar') {
    situational.push({ value: 2, note: 'Emboscadas/Trampas' });
  }
  if (char.edges.some(e => e.name === 'Mentalista') && skillName.startsWith('Psiónica')) {
    situational.push({ value: 2, note: 'Tiradas enfrentadas' });
  }
  if (char.edges.some(e => e.name === 'Tirador') && skillName === 'Disparar') {
    situational.push({ value: 2, note: 'Si no se mueve' });
  }
  if (char.edges.some(e => e.name === 'Arma Distintiva') && (skillName === 'Pelear' || skillName === 'Disparar')) {
    situational.push({ value: 1, note: 'Con arma específica' });
  }
  if (char.edges.some(e => e.name === 'Berserk') && skillName === 'Pelear') {
    situational.push({ value: 2, note: 'En furia' });
  }
  
  // Permanent Skill Hindrances
  if (char.hindrances.some(h => h.name === 'Apacible') && skillName === 'Intimidar') {
    generalValue -= 2;
    modifiers.push({ name: 'Apacible', value: -2 });
  }
  if (char.hindrances.some(h => h.name === 'Canalla') && skillName === 'Persuadir') {
    generalValue -= 2;
    modifiers.push({ name: 'Canalla', value: -2 });
  }
  if (char.hindrances.some(h => h.name === 'Cojo' && h.type === 'Mayor') && skillName === 'Atletismo') {
    generalValue -= 2;
    modifiers.push({ name: 'Cojo (Mayor)', value: -2 });
  }
  if (char.hindrances.some(h => h.name === 'Despistado')) {
    if (skillName === 'Notar' || skillName === 'Conocimientos Generales') {
      generalValue -= 2;
      modifiers.push({ name: 'Despistado', value: -2 });
    }
  }
  if (char.hindrances.some(h => h.name === 'Feo' && h.type === 'Mayor') && skillName === 'Persuadir') {
    generalValue -= 2;
    modifiers.push({ name: 'Feo (Mayor)', value: -2 });
  }
  if (char.hindrances.some(h => h.name === 'Feo' && h.type === 'Menor') && skillName === 'Persuadir') {
    generalValue -= 1;
    modifiers.push({ name: 'Feo (Menor)', value: -1 });
  }
  if (char.hindrances.some(h => h.name === 'Hábito' && h.type === 'Menor') && skillName === 'Persuadir') {
    generalValue -= 1;
    modifiers.push({ name: 'Hábito (Menor)', value: -1 });
  }
  if (char.hindrances.some(h => h.name === 'Delirio' && h.type === 'Mayor') && skillName === 'Persuadir') {
    generalValue -= 2;
    modifiers.push({ name: 'Delirio (Mayor)', value: -2 });
  }
  if (char.hindrances.some(h => h.name === 'Delirio' && h.type === 'Menor') && skillName === 'Persuadir') {
    generalValue -= 1;
    modifiers.push({ name: 'Delirio (Menor)', value: -1 });
  }
  if (char.hindrances.some(h => h.name === 'Manazas') && skillName === 'Reparar') {
    generalValue -= 2;
    modifiers.push({ name: 'Manazas', value: -2 });
  }
  if (char.hindrances.some(h => h.name === 'Marginado') && skillName === 'Persuadir') {
    generalValue -= 2;
    modifiers.push({ name: 'Marginado', value: -2 });
  }
  if (char.hindrances.some(h => h.name === 'Patoso') && (skillName === 'Sigilo' || skillName === 'Atletismo')) {
    generalValue -= 2;
    modifiers.push({ name: 'Patoso', value: -2 });
  }
  if (char.hindrances.some(h => h.name === 'Sanguinario') && skillName === 'Persuadir') {
    generalValue -= 4;
    modifiers.push({ name: 'Sanguinario', value: -4 });
  }
  if (char.hindrances.some(h => h.name === 'Suspicaz') && skillName === 'Persuadir') {
    generalValue -= 1;
    modifiers.push({ name: 'Suspicaz', value: -1 });
  }

  // Situational Hindrances
  if (char.hindrances.some(h => h.name === 'Ciego')) {
    if (['Notar', 'Disparar', 'Pelear', 'Atletismo', 'Sigilo', 'Conducir', 'Pilotar', 'Navegar'].includes(skillName)) {
      situational.push({ value: -6, note: 'Tareas visuales' });
    }
  }
  if (char.hindrances.some(h => h.name === 'Corto de Vista')) {
    if (skillName === 'Notar') {
      const isMayor = char.hindrances.some(h => h.name === 'Corto de Vista' && h.type === 'Mayor');
      situational.push({ value: isMayor ? -2 : -1, note: 'Larga distancia' });
    }
  }
  if (char.hindrances.some(h => h.name === 'Sordo')) {
    if (skillName === 'Notar') {
      const isMayor = char.hindrances.some(h => h.name === 'Sordo' && h.type === 'Mayor');
      situational.push({ value: isMayor ? -4 : -2, note: 'Basado en sonido' });
    }
  }
  if (char.hindrances.some(h => h.name === 'Tuerto')) {
    if (skillName === 'Disparar' || skillName === 'Conducir') {
      situational.push({ value: -2, note: 'A distancia' });
    }
  }

  // Species abilities (Permanent)
  if (char.species === 'Androide' && skillName === 'Persuadir') {
    generalValue -= 2;
    modifiers.push({ name: 'Androide', value: -2 });
  }
  if (char.species === 'Rakhasa' && skillName === 'Atletismo') {
    generalValue -= 2;
    modifiers.push({ name: 'Rakhasa', value: -2 });
  }
  if (char.species === 'Saurio' && skillName === 'Persuadir') {
    generalValue -= 2;
    modifiers.push({ name: 'Saurio', value: -2 });
  }
  if (char.species === 'Semielfo' && skillName === 'Persuadir') {
    generalValue -= 2;
    modifiers.push({ name: 'Semielfo', value: -2 });
  }

  // Species abilities (Situational)
  if (char.species === 'Aviano' && skillName === 'Atletismo') {
    situational.push({ value: -2, note: 'Bajo el agua' });
  }

  return { generalValue, modifiers, situational };
};

const getAttributeBonus = (char: Character, attrName: string): BonusInfo => {
  let generalValue = 0;
  const modifiers: AppliedModifier[] = [];
  const situational: SituationalBonus[] = [];
  
  if (char.hindrances.some(h => h.name === 'Anciano') && (attrName === 'Fuerza' || attrName === 'Vigor')) {
    generalValue -= 1;
    modifiers.push({ name: 'Anciano', value: -1 });
  }
  if (char.hindrances.some(h => h.name === 'Anémico') && attrName === 'Vigor') {
    generalValue -= 1;
    modifiers.push({ name: 'Anémico', value: -1 });
  }
  if (char.hindrances.some(h => h.name === 'Apocado') && attrName === 'Espíritu') {
    generalValue -= 2;
    modifiers.push({ name: 'Apocado', value: -2 });
  }
  
  if (char.edges.some(e => e.name === 'Voluntad de Hierro') && attrName === 'Espíritu') {
    situational.push({ value: 2, note: 'Resistir Intimidación/Provocación' });
  }
  if (char.edges.some(e => e.name === 'Reflejos de Combate') && attrName === 'Espíritu') {
    situational.push({ value: 2, note: 'Recuperarse de Aturdido' });
  }
  if (char.edges.some(e => e.name === 'Berserk') && attrName === 'Fuerza') {
    situational.push({ value: 2, note: 'En furia' });
  }
  if (char.edges.some(e => e.name === 'Mandíbula de hierro') && attrName === 'Vigor') {
    situational.push({ value: 2, note: 'Resistir Aturdido' });
  }
  if (char.edges.some(e => e.name === 'Sanador Rápido') && attrName === 'Vigor') {
    situational.push({ value: 2, note: 'Curación natural' });
  }
  if (char.edges.some(e => e.name === 'Resistencia arcana')) {
    situational.push({ value: 2, note: 'Resistir poderes' });
  }
  if (char.edges.some(e => e.name === 'Resistencia arcana mejorada')) {
    situational.push({ value: 4, note: 'Resistir poderes' });
  }
  if (char.edges.some(e => e.name === 'Indomable') && attrName === 'Espíritu') {
    situational.push({ value: 2, note: 'Resistir poderes/ataques sociales' });
  }
  if (char.edges.some(e => e.name === 'Valiente') && attrName === 'Espíritu') {
    situational.push({ value: 2, note: 'Tiradas de Miedo' });
  }
  
  return { generalValue, modifiers, situational };
};

const getDamageBonus = (char: Character, weaponName: string): BonusInfo => {
  let generalValue = 0;
  const modifiers: AppliedModifier[] = [];
  const situational: SituationalBonus[] = [];
  
  if (char.edges.some(e => e.name === 'Berserk')) {
    // Berserk applies to melee damage. We'll assume for now it applies if they are in fury.
    situational.push({ value: 2, note: 'Cuerpo a cuerpo (en furia)' });
  }
  
  return { generalValue, modifiers, situational };
};

const getArmorBonus = (char: Character) => {
  let armor = 0;
  if (char.armor && char.armor.length > 0) {
    armor = Math.max(...char.armor.map(a => a.bonus));
  }
  return armor;
};

const calculateDerived = (char: Character) => {
  const vig = char.attributes.Vigor;
  const pelear = char.skills['Pelear'] || 0;
  
  let toughness = 2 + (Math.floor(vig / 2));
  let size = 0;
  let pace = 6;
  let parry = 2 + (Math.floor(pelear / 2));
  
  // Running die logic (SWADE: base d6, can be modified by die types)
  const dieSteps = [4, 6, 8, 10, 12];
  let runningDieIndex = 1; // Start at d6

  // Species base
  if (char.species === 'Aviano') { pace = 5; runningDieIndex = 0; toughness -= 1; }
  if (char.species === 'Enano') { pace = 5; runningDieIndex = 0; }
  if (char.species === 'Mediano') { size -= 1; toughness -= 1; pace = 5; runningDieIndex = 0; }
  if (char.species === 'Acuariano') toughness += 1;
  if (char.species === 'Saurio') toughness += 2; // Armadura +2

  // Hindrances that SET or REDUCE (Applied before Edges for base adjustment)
  if (char.hindrances.some(h => h.name === 'Obeso')) { size += 1; toughness += 1; pace -= 1; runningDieIndex = 0; }
  if (char.hindrances.some(h => h.name === 'Cojo')) {
    runningDieIndex = 0;
    const isMayor = char.hindrances.some(h => h.name === 'Cojo' && h.type === 'Mayor');
    pace -= isMayor ? 2 : 1;
  }
  if (char.hindrances.some(h => h.name === 'Anciano')) {
    pace -= 1;
    runningDieIndex = Math.max(0, runningDieIndex - 1);
  }
  if (char.hindrances.some(h => h.name === 'Pequeño' || h.name === 'Menudo')) { size -= 1; toughness -= 1; }
  if (char.hindrances.some(h => h.name === 'Joven' && h.type === 'Menor')) { size -= 1; toughness -= 1; }
  if (char.hindrances.some(h => h.name === 'Joven' && h.type === 'Mayor')) { size -= 2; toughness -= 2; }

  // Edges that modify (Applied after base adjustments)
  if (char.edges.some(e => e.name === 'Pies Ligeros')) { pace += 2; runningDieIndex = Math.min(4, runningDieIndex + 1); }
  
  const isWearingHeavyArmor = char.armor?.some(a => a.bonus >= 3 || a.notes?.toLowerCase().includes('pesada') || a.name.toLowerCase().includes('pesada'));
  if (char.edges.some(e => e.name === 'Acróbata') && !isWearingHeavyArmor) parry += 1;
  
  if (char.edges.some(e => e.name === 'Bloqueo')) parry += 1;
  if (char.edges.some(e => e.name === 'Bloqueo mejorado')) parry += 1; // Total +2
  if (char.edges.some(e => e.name === 'Maestro de armas')) parry += 1;
  
  if (char.edges.some(e => e.name === 'Resistente')) toughness += 1;
  if (char.edges.some(e => e.name === 'Fornido')) { size += 1; toughness += 1; }
  if (char.edges.some(e => e.name === 'Gigante')) { size += 1; toughness += 1; } // Total +2 size/toughness with Fornido

  // Gear bonuses
  const armorBonus = getArmorBonus(char);
  const shieldParry = char.shield?.parryBonus || 0;

  return {
    Paso: pace,
    Parada: parry + shieldParry,
    Dureza: toughness + armorBonus,
    Tamaño: size,
    DadoCarrera: `d${dieSteps[runningDieIndex]}`
  };
};

export default function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [viewingCharacter, setViewingCharacter] = useState<Character | null>(null);
  const [previewHindranceName, setPreviewHindranceName] = useState<string>('');
  const [previewHindranceType, setPreviewHindranceType] = useState<'Menor' | 'Mayor'>('Menor');
  const [previewEdgeName, setPreviewEdgeName] = useState<string>('');
  const [pendingHindranceSpend, setPendingHindranceSpend] = useState<{
    type: 'attribute' | 'skill' | 'edge';
    cost: number;
    onConfirm: () => void;
  } | null>(null);
  const [characterToDelete, setCharacterToDelete] = useState<Character | null>(null);

  // Load characters from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sw_characters');
    if (saved) {
      try {
        setCharacters(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved characters', e);
      }
    }
  }, []);

  // Save characters to localStorage
  useEffect(() => {
    localStorage.setItem('sw_characters', JSON.stringify(characters));
  }, [characters]);

  const startNewCharacter = () => {
    setCurrentCharacter({ ...INITIAL_CHARACTER, id: crypto.randomUUID() });
    setCurrentStep(0);
    setIsCreating(true);
  };

  const saveCharacter = () => {
    if (!currentCharacter) return;
    const finalCharacter = {
      ...currentCharacter,
      bennies: currentCharacter.bennies ?? calculateStartingBennies(currentCharacter),
      wounds: currentCharacter.wounds ?? 0,
      fatigue: currentCharacter.fatigue ?? 0,
      advances: currentCharacter.advances ?? 0,
      derived: calculateDerived(currentCharacter),
    };
    setCharacters(prev => {
      const index = prev.findIndex(c => c.id === finalCharacter.id);
      if (index >= 0) {
        const next = [...prev];
        next[index] = finalCharacter;
        return next;
      }
      return [...prev, finalCharacter];
    });
    setIsCreating(false);
    setCurrentCharacter(null);
  };

  const deleteCharacter = (id: string) => {
    setCharacters(prev => prev.filter(c => c.id !== id));
  };

  const exportCharacter = (char: Character) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(char));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${char.name || 'personaje'}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const importCharacter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const char = JSON.parse(event.target?.result as string);
        if (char.id) {
          const importedChar = { 
            ...char, 
            id: crypto.randomUUID(),
            derived: calculateDerived(char)
          };
          setCharacters(prev => [...prev, importedChar]);
        }
      } catch (err) {
        console.error('Failed to import character', err);
      }
    };
    reader.readAsText(file);
  };

  const updateCharacter = (updates: Partial<Character>) => {
    if (!currentCharacter) return;
    let next = { ...currentCharacter, ...updates };

    // If species or heritage choice or hindrances changed, we might need to recalculate base attributes
    const speciesChanged = updates.species !== undefined;
    const heritageChanged = updates.heritageChoice !== undefined;
    const hindrancesChanged = updates.hindrances !== undefined;

    if (speciesChanged || heritageChanged || hindrancesChanged) {
      const newAttributes = { ...next.attributes };
      ATTRIBUTES.forEach(attr => {
        const oldLimits = getAttributeLimits(attr, currentCharacter.species, currentCharacter.heritageChoice, currentCharacter.hindrances);
        const newLimits = getAttributeLimits(attr, next.species, next.heritageChoice, next.hindrances);
        
        const currentVal = newAttributes[attr as keyof typeof newAttributes];
        
        if (speciesChanged || heritageChanged) {
          newAttributes[attr as keyof typeof newAttributes] = newLimits.min as Dice;
        } else if (hindrancesChanged) {
          // If a hindrance reduced the minimum (like Joven Mayor), adjust the current value
          if (newLimits.min < oldLimits.min) {
            const diff = oldLimits.min - newLimits.min;
            newAttributes[attr as keyof typeof newAttributes] = Math.max(newLimits.min, currentVal - diff) as Dice;
          } else if (newLimits.min > oldLimits.min) {
            newAttributes[attr as keyof typeof newAttributes] = Math.max(newLimits.min, currentVal) as Dice;
          }
        }
      });
      next.attributes = newAttributes;

      // Also reset skills if species/heritage changed
      if (speciesChanged || heritageChanged) {
        const newSkills = { ...next.skills };
        SKILLS.forEach(skill => {
          const { min } = getSkillLimits(skill.name, next.species, next.heritageChoice);
          if (min > 0) {
            newSkills[skill.name] = min as Dice;
          } else {
            delete newSkills[skill.name];
          }
        });
        next.skills = newSkills;
        
        // Reset spent points when changing species/heritage
        next.spentHindrancePoints = { attributes: 0, skills: 0, edges: 0 };
      }

      if (speciesChanged) next.heritageChoice = undefined;
    }

    next.derived = calculateDerived(next);
    setCurrentCharacter(next);
  };

  const nextStep = () => {
    let next = currentStep + 1;
    if (next === 6 && currentCharacter && !getArcaneBackground(currentCharacter)) {
      next++;
    }
    if (next < STEPS.length) setCurrentStep(next);
  };

  const prevStep = () => {
    if (currentStep > 0) {
      let prev = currentStep - 1;
      if (prev === 6 && currentCharacter && !getArcaneBackground(currentCharacter)) {
        prev--;
      }
      setCurrentStep(prev);
    } else {
      setIsCreating(false);
      setCurrentCharacter(null);
    }
  };

  if (viewingCharacter) {
    return (
      <div className="min-h-screen bg-stone-100 p-4 md:p-8 font-sans text-stone-900">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-stone-200">
          <div className="bg-stone-900 text-white p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-tight uppercase">Hoja de Personaje</h2>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setCurrentCharacter(viewingCharacter);
                  setCurrentStep(STEPS.length - 1);
                  setIsCreating(true);
                  setViewingCharacter(null);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
              >
                <Plus size={16} />
                Editar
              </button>
              <button 
                onClick={() => setViewingCharacter(null)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors text-sm font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
          <CharacterSheetView 
            character={viewingCharacter} 
            onUpdate={(updated) => {
              const next = { ...updated, derived: calculateDerived(updated) };
              setCharacters(prev => prev.map(c => c.id === next.id ? next : c));
              setViewingCharacter(next);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 font-sans text-stone-900">
      <header className="bg-white border-b border-stone-200 py-6 px-4 md:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="flex flex-col items-center leading-none tracking-tighter uppercase">
              <span className="text-xl font-black italic">Savage Worlds</span>
              <span className="text-[10px] font-bold tracking-[0.4em] text-stone-500 -mt-0.5 ml-1">Creator</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={startNewCharacter}
              className="flex items-center gap-2 px-6 py-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all shadow-md hover:shadow-lg active:scale-95 font-medium"
            >
              <Plus size={18} />
              <span>Nuevo Personaje</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        {isCreating && currentCharacter ? (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-stone-800">{STEPS[currentStep]}</h2>
                <span className="text-sm font-mono text-stone-500">Paso {currentStep + 1} de {STEPS.length}</span>
              </div>
              <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                <motion.div 
                  className="bg-stone-900 h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-stone-200 min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderStep(currentStep, currentCharacter, updateCharacter, { 
                    previewHindranceName, 
                    setPreviewHindranceName, 
                    previewHindranceType, 
                    setPreviewHindranceType,
                    setPendingHindranceSpend,
                    previewEdgeName,
                    setPreviewEdgeName,
                    nextStep
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex justify-between">
              <button 
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-3 text-stone-600 hover:text-stone-900 disabled:opacity-30 transition-all font-medium"
              >
                <ChevronLeft size={20} />
                Anterior
              </button>
              {currentStep === STEPS.length - 1 ? (
                <button 
                  onClick={saveCharacter}
                  className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-all shadow-lg font-bold"
                >
                  <Save size={20} />
                  Finalizar y Guardar
                </button>
              ) : (
                <button 
                  onClick={nextStep}
                  disabled={(() => {
                    if (currentCharacter) {
                      const totalHP = calculateHindrancePoints(currentCharacter.hindrances);
                      const spentHP = (currentCharacter.spentHindrancePoints?.attributes || 0) * 2 + 
                                       (currentCharacter.spentHindrancePoints?.skills || 0) * 1 + 
                                       (currentCharacter.spentHindrancePoints?.edges || 0) * 2;
                      
                      if (spentHP > totalHP) return true;

                      if (currentStep === 3) { // Atributos
                        return calculateAttributePointsSpent(currentCharacter) > (5 + (currentCharacter.spentHindrancePoints?.attributes || 0));
                      }
                      if (currentStep === 4) { // Habilidades
                        const { basicNeeded } = calculateSkillPointsSpent(currentCharacter);
                        const isYoung = currentCharacter.hindrances.some(h => h.name === 'Joven');
                        const baseAllowed = isYoung ? 10 : 12;
                        return basicNeeded > (baseAllowed + (currentCharacter.spentHindrancePoints?.skills || 0));
                      }
                    }
                    return false;
                  })()}
                  className="flex items-center gap-2 px-8 py-3 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all shadow-lg font-bold disabled:opacity-30"
                >
                  Siguiente
                  <ChevronRight size={20} />
                </button>
              )}
            </div>

            <AnimatePresence>
              {pendingHindranceSpend && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-stone-200"
                  >
                    <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mb-6 text-stone-900">
                      <Zap size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-stone-900 uppercase tracking-tighter mb-4">¿Usar puntos de desventaja?</h3>
                    <p className="text-stone-600 mb-8 leading-relaxed">
                      No quedan puntos base suficientes para subir. ¿Deseas usar <span className="font-black text-stone-900">{pendingHindranceSpend.cost}</span> puntos de desventaja para esta mejora?
                    </p>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setPendingHindranceSpend(null)}
                        className="flex-1 py-4 bg-stone-100 text-stone-600 rounded-xl font-bold hover:bg-stone-200 transition-all"
                      >
                        Cancelar
                      </button>
                      <button 
                        onClick={() => {
                          pendingHindranceSpend.onConfirm();
                          setPendingHindranceSpend(null);
                        }}
                        className="flex-1 py-4 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-all shadow-lg"
                      >
                        Confirmar
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <div className="w-20 h-20 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                  <User size={40} />
                </div>
                <h3 className="text-xl font-medium text-stone-600 mb-2">No tienes personajes guardados</h3>
                <p className="text-stone-400 mb-6">Comienza creando uno nuevo para tu próxima aventura.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={startNewCharacter}
                    className="px-8 py-3 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all shadow-md font-medium flex items-center justify-center gap-2"
                  >
                    <Plus size={18} />
                    Crear mi primer personaje
                  </button>
                  <label className="cursor-pointer px-8 py-3 bg-white text-stone-900 border-2 border-stone-200 rounded-full hover:border-stone-900 transition-all font-medium flex items-center justify-center gap-2">
                    <Upload size={18} />
                    Importar JSON
                    <input type="file" className="hidden" onChange={importCharacter} accept="application/json,.json" />
                  </label>
                </div>
              </div>
            ) : (
              <>
                {characters.map(char => (
                <motion.div 
                  key={char.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl shadow-md border border-stone-200 overflow-hidden hover:shadow-xl transition-all group"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-stone-800 group-hover:text-stone-900 transition-colors">{char.name || 'Sin nombre'}</h3>
                        <p className="text-sm text-stone-500 italic">{char.concept || 'Sin concepto'}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="px-3 py-1 bg-stone-100 rounded-full text-xs font-bold uppercase tracking-wider text-stone-600">
                          {char.species}
                        </div>
                        {char.heritageChoice && (
                          <div className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                            {char.heritageChoice}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-2 mb-6">
                      {Object.entries(char.attributes).map(([name, val]) => (
                        <div key={name} className="text-center">
                          <div className="text-[10px] uppercase font-bold text-stone-400 mb-1">{name.slice(0, 3)}</div>
                          <div className="w-8 h-8 bg-stone-50 rounded border border-stone-200 flex items-center justify-center font-mono font-bold text-stone-700">
                            {formatDice(val as number)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => setViewingCharacter({ ...char, derived: calculateDerived(char) })}
                        className="flex-1 py-2 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition-colors text-sm font-bold flex items-center justify-center gap-2"
                      >
                        <FileText size={16} />
                        Ver Ficha
                      </button>
                      <button 
                        onClick={() => exportCharacter(char)}
                        className="p-2 text-stone-400 hover:text-stone-600 transition-colors"
                        title="Exportar"
                      >
                        <Download size={18} />
                      </button>
                      <button 
                        onClick={() => setCharacterToDelete(char)}
                        className="p-2 text-stone-400 hover:text-red-500 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              <label className="cursor-pointer bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200 p-6 flex flex-col items-center justify-center gap-3 hover:border-stone-400 hover:bg-stone-100 transition-all group min-h-[300px]">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-stone-400 group-hover:text-stone-600 shadow-sm transition-colors">
                  <Upload size={24} />
                </div>
                <div className="text-center">
                  <span className="block text-stone-600 font-bold">Importar Personaje</span>
                  <span className="text-xs text-stone-400">Sube un archivo .json</span>
                </div>
                <input type="file" className="hidden" onChange={importCharacter} accept="application/json,.json" />
              </label>
            </>
          )}
        </div>
      )}
      </main>

      {characterToDelete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-stone-100"
          >
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 size={32} />
            </div>
            <h3 className="text-2xl font-black text-center mb-2">¿Borrar personaje?</h3>
            <p className="text-stone-500 text-center mb-8">
              ¿Estás seguro de que deseas borrar la ficha de <span className="font-bold text-stone-900">"{characterToDelete.name || 'Sin nombre'}"</span>? Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setCharacterToDelete(null)}
                className="flex-1 py-4 bg-stone-100 text-stone-600 rounded-2xl font-bold hover:bg-stone-200 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  deleteCharacter(characterToDelete.id);
                  setCharacterToDelete(null);
                }}
                className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
              >
                Sí, borrar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function renderStep(
  step: number, 
  char: Character, 
  update: (u: Partial<Character>) => void,
  extras: {
    previewHindranceName: string;
    setPreviewHindranceName: (name: string) => void;
    previewHindranceType: 'Menor' | 'Mayor';
    setPreviewHindranceType: (type: 'Menor' | 'Mayor') => void;
    setPendingHindranceSpend: (val: {
      type: 'attribute' | 'skill' | 'edge';
      cost: number;
      onConfirm: () => void;
    } | null) => void;
    previewEdgeName: string;
    setPreviewEdgeName: (name: string) => void;
    nextStep: () => void;
  }
) {
  const { 
    previewHindranceName, 
    setPreviewHindranceName, 
    previewHindranceType, 
    setPreviewHindranceType,
    setPendingHindranceSpend,
    previewEdgeName,
    setPreviewEdgeName,
    nextStep
  } = extras;

  switch (step) {
    case 0: // Concepto
      return (
        <div className="space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-stone-400">Nombre del Personaje</label>
            <input 
              type="text" 
              value={char.name}
              onChange={e => update({ name: e.target.value })}
              onKeyDown={e => {
                if (e.key === 'Enter' && char.name.trim()) {
                  // Focus next input or go to next step if concept is also filled
                  const conceptInput = document.getElementById('concept-input');
                  if (conceptInput) conceptInput.focus();
                }
              }}
              placeholder="Ej: Red"
              className="w-full text-4xl font-bold focus:border-stone-900 outline-none py-2 transition-colors placeholder:text-stone-200"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-stone-400">Concepto</label>
            <input 
              id="concept-input"
              type="text"
              value={char.concept}
              onChange={e => update({ concept: e.target.value })}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  nextStep();
                }
              }}
              placeholder="Ej: Bárbaro de las tierras del norte"
              className="w-full text-xl focus:border-stone-900 outline-none py-2 transition-colors placeholder:text-stone-200"
            />
          </div>
        </div>
      );
    case 1: // Especie
      return (
        <div className="flex flex-col md:flex-row gap-8 h-full min-h-[600px]">
          <div className="w-full md:w-1/3 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
            <label className="text-xs font-black uppercase tracking-widest text-stone-400 mb-4 block">Selecciona una Especie</label>
            {[...SPECIES].sort(sortByName).map(s => (
              <button
                key={s.name}
                onClick={() => {
                  const nextChar = { ...char, species: s.name, heritageChoice: undefined };
                  update({ 
                    species: s.name, 
                    heritageChoice: undefined,
                    bennies: calculateStartingBennies(nextChar)
                  });
                }}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all flex justify-between items-center group ${
                  char.species === s.name 
                    ? 'border-stone-900 bg-stone-900 text-white shadow-lg' 
                    : 'border-stone-100 bg-stone-50 hover:border-stone-300 text-stone-700'
                }`}
              >
                <span className="font-bold">{s.name}</span>
                <ChevronRight size={16} className={`transition-transform ${char.species === s.name ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
              </button>
            ))}
          </div>
          <div className="flex-1 bg-stone-50 rounded-2xl p-6 md:p-8 border border-stone-200 overflow-y-auto custom-scrollbar">
            {(() => {
              const s = SPECIES.find(sp => sp.name === char.species);
              if (!s) return null;
              return (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-black text-stone-900 uppercase tracking-tighter mb-2">{s.name}</h3>
                    <p className="text-stone-600 leading-relaxed italic">{s.description}</p>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-xs font-black uppercase tracking-widest text-stone-400 pb-2">Capacidades de Especie</h4>
                    <div className="space-y-6">
                      {s.abilities.map((a, i) => (
                        <div key={i} className="space-y-1">
                          <div className="font-black text-stone-900 uppercase text-sm tracking-tight">{a.name}</div>
                          <p className="text-stone-700 text-sm leading-relaxed">{a.description}</p>
                        </div>
                      ))}
                    </div>
                    {s.heritageChoices && (
                      <div className="space-y-4 pt-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-stone-400">Elige tu Herencia</h4>
                        <div className="grid grid-cols-1 gap-3">
                          {s.heritageChoices.map(choice => (
                            <div
                              key={choice.name}
                              role="button"
                              tabIndex={0}
                              onClick={() => update({ heritageChoice: choice.name })}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  update({ heritageChoice: choice.name });
                                }
                              }}
                              className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                                char.heritageChoice === choice.name
                                  ? 'border-stone-900 bg-stone-900 text-white shadow-md'
                                  : 'border-stone-100 bg-white hover:border-stone-300 text-stone-700'
                              }`}
                            >
                              <div className="font-bold text-sm">{choice.name}</div>
                              <div className={`text-xs mt-1 ${char.heritageChoice === choice.name ? 'text-stone-300' : 'text-stone-500'}`}>
                                {choice.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      );
    case 2: // Desventajas
      const uniqueHindranceNames = Array.from(new Set(HINDRANCES.map(h => h.name))).sort(sortByString);
      const selectedHindranceData = HINDRANCES.filter(h => h.name === previewHindranceName);
      const availableTypes = selectedHindranceData.map(h => h.type);
      const currentPreview = selectedHindranceData.find(h => h.type === previewHindranceType) || selectedHindranceData[0];

      return (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {[...char.hindrances].sort(sortByName).map((h, i) => (
              <div key={i} className="px-4 py-2 bg-red-50 border border-red-100 text-red-700 rounded-full flex items-center gap-2 text-sm font-bold shadow-sm">
                <span>{h.name} ({h.type})</span>
                <button onClick={() => {
                  const nextHindrances = char.hindrances.filter((_, idx) => idx !== i);
                  const nextChar = { ...char, hindrances: nextHindrances };
                  update({ 
                    hindrances: nextHindrances,
                    bennies: calculateStartingBennies(nextChar)
                  });
                }}>
                  <Trash2 size={14} className="text-red-400 hover:text-red-600" />
                </button>
              </div>
            ))}
          </div>

          <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-stone-400">Seleccionar Desventaja</label>
              <select 
                className="w-full p-3 bg-white border border-stone-200 rounded-xl font-bold text-stone-700 outline-none focus:border-stone-900 transition-colors"
                value={previewHindranceName}
                onChange={(e) => {
                  const name = e.target.value;
                  setPreviewHindranceName(name);
                  const data = HINDRANCES.filter(h => h.name === name);
                  if (data.length > 0) {
                    setPreviewHindranceType(data[0].type as 'Menor' | 'Mayor');
                  }
                }}
              >
                <option value="">-- Elige una desventaja --</option>
                {uniqueHindranceNames.map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>

            {previewHindranceName && currentPreview && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-black text-stone-900 uppercase tracking-tighter">{currentPreview.name}</h4>
                    <div className="flex gap-2">
                      {availableTypes.includes('Menor') && (
                        <button 
                          onClick={() => setPreviewHindranceType('Menor')}
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                            previewHindranceType === 'Menor' 
                              ? 'bg-stone-900 text-white' 
                              : 'bg-stone-100 text-stone-400 hover:bg-stone-200'
                          }`}
                        >
                          Menor
                        </button>
                      )}
                      {availableTypes.includes('Mayor') && (
                        <button 
                          onClick={() => setPreviewHindranceType('Mayor')}
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                            previewHindranceType === 'Mayor' 
                              ? 'bg-stone-900 text-white' 
                              : 'bg-stone-100 text-stone-400 hover:bg-stone-200'
                          }`}
                        >
                          Mayor
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed italic">
                    {currentPreview.description}
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (char.hindrances.some(h => h.name === currentPreview.name && h.type === currentPreview.type)) return;
                    const nextHindrances = [...char.hindrances, currentPreview];
                    const nextChar = { ...char, hindrances: nextHindrances };
                    update({ 
                      hindrances: nextHindrances,
                      bennies: calculateStartingBennies(nextChar)
                    });
                    setPreviewHindranceName('');
                  }}
                  className="w-full py-4 bg-stone-900 text-white rounded-xl font-black uppercase tracking-widest hover:bg-stone-800 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Agregar Desventaja
                </button>
              </motion.div>
            )}
          </div>
        </div>
      );
    case 3: { // Atributos
      const pointsSpent_Attr = calculateAttributePointsSpent(char);
      const totalHP_Attr = calculateHindrancePoints(char.hindrances);
      const spentHP_Attr = (char.spentHindrancePoints?.attributes || 0) * 2 + 
                           (char.spentHindrancePoints?.skills || 0) * 1 + 
                           (char.spentHindrancePoints?.edges || 0) * 2;
      const availableHP_Attr = totalHP_Attr - spentHP_Attr;
      const baseAllowed_Attr = 5;
      const totalAllowed_Attr = baseAllowed_Attr + (char.spentHindrancePoints?.attributes || 0);
      const isOverLimit_Attr = pointsSpent_Attr > totalAllowed_Attr;

      return (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl border flex items-center gap-3 ${isOverLimit_Attr ? 'bg-red-50 border-red-200 text-red-600' : 'bg-stone-50 border-stone-200 text-stone-600'}`}>
              {isOverLimit_Attr ? <AlertTriangle size={20} /> : <Info size={20} />}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-bold">Puntos Atributo: {calculateAttributePointsSpent(char)} / {5 + (char.spentHindrancePoints?.attributes || 0)}</p>
                </div>
                <p className="text-xs">{isOverLimit_Attr ? 'Has gastado demasiados puntos.' : `Tienes 5 base ${char.spentHindrancePoints?.attributes > 0 ? `+ ${char.spentHindrancePoints.attributes} de Desventajas` : ''}.`}</p>
              </div>
            </div>
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-3 text-stone-600">
              <Dice5 size={20} />
              <div>
                <p className="text-sm font-bold">Puntos de Desventajas: {availableHP_Attr} / {totalHP_Attr}</p>
                <p className="text-xs">Usa estos puntos para Atributos (2 pts), Ventajas (2 pts) o Habilidades (1 pt).</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
            {ATTRIBUTES.map(attr => {
              const { min, max } = getAttributeLimits(attr, char.species, char.heritageChoice, char.hindrances);
              const current = char.attributes[attr as keyof typeof char.attributes];
              
              return (
                <div key={attr} className="flex flex-col items-center gap-4">
                  <label className="font-bold uppercase tracking-tighter text-stone-400 text-xs">{attr}</label>
                  <div className="relative group">
                    <div className="w-20 h-20 bg-white border-4 border-stone-900 rounded-xl flex items-center justify-center text-2xl font-mono font-black shadow-inner">
                      {formatDice(current)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        if (current > min) {
                          const nextAttributes = { ...char.attributes, [attr]: (current === 13 ? 12 : current - 2) as Dice };
                          const totalSpent = calculateAttributePointsSpent({ ...char, attributes: nextAttributes });
                          const paidWithHP = Math.max(0, totalSpent - 5);
                          
                          update({ 
                            attributes: nextAttributes, 
                            spentHindrancePoints: { ...char.spentHindrancePoints, attributes: paidWithHP } 
                          });
                        }
                      }}
                      disabled={current <= min}
                      className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center hover:bg-stone-300 transition-colors disabled:opacity-30"
                    >
                      -
                    </button>
                    <button 
                      onClick={() => {
                        if (current < max) {
                          if (pointsSpent_Attr < totalAllowed_Attr) {
                            update({ attributes: { ...char.attributes, [attr]: (current === 12 ? 13 : current + 2) as Dice } });
                          } else if (availableHP_Attr >= 2) {
                            setPendingHindranceSpend({
                              type: 'attribute',
                              cost: 2,
                              onConfirm: () => {
                                update({ 
                                  attributes: { ...char.attributes, [attr]: (current === 12 ? 13 : current + 2) as Dice },
                                  spentHindrancePoints: { ...char.spentHindrancePoints, attributes: (char.spentHindrancePoints.attributes || 0) + 1 }
                                });
                              }
                            });
                          }
                        }
                      }}
                      disabled={current >= max || (pointsSpent_Attr >= totalAllowed_Attr && availableHP_Attr < 2)}
                      className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-stone-800 transition-colors shadow-md disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    case 4: { // Habilidades
      const isYoung = char.hindrances.some(h => h.name === 'Joven');
      const isElderly = char.hindrances.some(h => h.name === 'Anciano');
      
      const { basicNeeded, ancianoUsed, ancianoTotal } = calculateSkillPointsSpent(char);
      const totalHP_Skills = calculateHindrancePoints(char.hindrances);
      const spentHP_Skills = (char.spentHindrancePoints?.attributes || 0) * 2 + 
                             (char.spentHindrancePoints?.skills || 0) * 1 + 
                             (char.spentHindrancePoints?.edges || 0) * 2;
      const availableHP_Skills = totalHP_Skills - spentHP_Skills;
      
      const baseAllowed = isYoung ? 10 : 12;
      const totalAllowed_Skills = baseAllowed + (char.spentHindrancePoints?.skills || 0);
      
      const isOverLimit_Skills = basicNeeded > totalAllowed_Skills;

      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl border flex items-center gap-3 ${isOverLimit_Skills ? 'bg-red-50 border-red-200 text-red-600' : 'bg-stone-50 border-stone-200 text-stone-600'}`}>
              {isOverLimit_Skills ? <AlertTriangle size={20} /> : <Info size={20} />}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-bold">Puntos Habilidad: {basicNeeded} / {baseAllowed + (char.spentHindrancePoints?.skills || 0)}</p>
                </div>
                <p className="text-xs">
                  {isYoung ? '10 base' : '12 base'} {char.spentHindrancePoints?.skills > 0 ? `+ ${char.spentHindrancePoints.skills} de Desventajas` : ''}
                </p>
              </div>
            </div>
            {isElderly && (
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-center gap-3 text-amber-700">
                <BookOpen size={20} />
                <div>
                  <p className="text-sm font-bold">Puntos Anciano: {ancianoUsed} / {ancianoTotal}</p>
                  <p className="text-xs">Solo para mejorar habilidades de Astucia.</p>
                </div>
              </div>
            )}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-3 text-stone-600">
              <Dice5 size={20} />
              <div>
                <p className="text-sm font-bold">Puntos Desventajas: {availableHP_Skills} / {totalHP_Skills}</p>
                <p className="text-xs">Usa estos puntos para Atributos, Ventajas o Habilidades.</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {[...SKILLS].sort(sortByName).map(skill => {
              const { min, max } = getSkillLimits(skill.name, char.species, char.heritageChoice);
              const val = char.skills[skill.name] || min;
              const attrVal = char.attributes[skill.attribute as keyof typeof char.attributes];
              
              return (
                <div key={skill.name} className="p-4 bg-white border border-stone-200 rounded-xl flex items-center justify-between group hover:border-stone-400 transition-colors">
                  <div>
                    <div className="font-bold text-sm flex items-center gap-2">
                      {skill.name}
                      {skill.isBasic && <span className="w-2 h-2 bg-stone-900 rounded-full" title="Básica" />}
                    </div>
                    <div className="text-[10px] uppercase text-stone-400 font-bold">{skill.attribute} ({formatDice(attrVal)})</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="font-mono font-bold text-stone-700 w-12 text-center">
                      {val ? formatDice(val) : 'd4-2'}
                    </div>
                    <div className="flex flex-col gap-1">
                      <button 
                        onClick={() => {
                          const nextSkills = { ...char.skills };
                          const maxSkill = attrVal > 12 ? 13 : 12;
                          if (val < maxSkill) {
                            const cost = val === 0 ? 1 : (val < attrVal ? 1 : 2);
                            
                            const currentPoints = calculateSkillPointsSpent(char);
                            const canAffordWithBasic = currentPoints.basicNeeded + cost <= totalAllowed_Skills;
                            const isAncianoEligible = isElderly && skill.attribute === 'Astucia' && val >= 4;
                            const canAffordWithAnciano = isAncianoEligible && (currentPoints.ancianoUsed + cost <= ancianoTotal);

                            if (canAffordWithBasic || canAffordWithAnciano) {
                              nextSkills[skill.name] = (val === 12 ? 13 : (val || 2) + 2) as Dice;
                              update({ skills: nextSkills });
                            } else if (availableHP_Skills >= cost) {
                              setPendingHindranceSpend({
                                type: 'skill',
                                cost: cost,
                                onConfirm: () => {
                                  const confirmedSkills = { ...char.skills };
                                  confirmedSkills[skill.name] = (val === 12 ? 13 : (val || 2) + 2) as Dice;
                                  update({ 
                                    skills: confirmedSkills,
                                    spentHindrancePoints: { ...char.spentHindrancePoints, skills: (char.spentHindrancePoints.skills || 0) + cost }
                                  });
                                }
                              });
                            }
                          }
                        }}
                        className="w-5 h-5 bg-stone-900 text-white rounded flex items-center justify-center text-xs hover:bg-stone-800 disabled:opacity-30"
                        disabled={val >= (attrVal > 12 ? 13 : 12)}
                      >
                        +
                      </button>
                      <button 
                        onClick={() => {
                          const nextSkills = { ...char.skills };
                          if (val === 13) {
                            nextSkills[skill.name] = 12 as Dice;
                          } else if (val === 4 && min === 0) {
                            delete nextSkills[skill.name];
                          } else if (val > min) {
                            nextSkills[skill.name] = (val - 2) as Dice;
                          }
                          
                          const { basicNeeded } = calculateSkillPointsSpent({ ...char, skills: nextSkills });
                          const baseAllowed = isYoung ? 10 : 12;
                          const paidWithHP = Math.max(0, basicNeeded - baseAllowed);
                          
                          update({ 
                            skills: nextSkills,
                            spentHindrancePoints: { ...char.spentHindrancePoints, skills: paidWithHP }
                          });
                        }}
                        disabled={val === 0 || (val === min && (min > 0 || skill.isBasic))}
                        className="w-5 h-5 bg-stone-100 rounded flex items-center justify-center text-xs hover:bg-stone-200 disabled:opacity-30"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    case 5: { // Ventajas
      const isBlind = char.hindrances.some(h => h.name === 'Ciego');
      const freeEdgesSources = [];
      if (char.species === 'Humano') freeEdgesSources.push('Humano (+1)');
      if (isBlind) freeEdgesSources.push('Ciego (+1)');
      
      const freeEdges = (char.species === 'Humano' ? 1 : 0) + (isBlind ? 1 : 0);
      const currentEdgesCount = char.edges.length;
      const canPickFree = currentEdgesCount < freeEdges;

      const totalHP_Edges = calculateHindrancePoints(char.hindrances);
      const spentHP_Edges = (char.spentHindrancePoints?.attributes || 0) * 2 + 
                             (char.spentHindrancePoints?.skills || 0) * 1 + 
                             (char.spentHindrancePoints?.edges || 0) * 2;
      const availableHP_Edges = totalHP_Edges - spentHP_Edges;
      
      const selectedEdge = EDGES.find(e => e.name.toLowerCase() === previewEdgeName.toLowerCase());
      const alreadyHasEdge = char.edges.some(e => e.name.toLowerCase() === previewEdgeName.toLowerCase());

      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-3 text-stone-600">
              <Shield size={20} className="text-emerald-500" />
              <div className="flex-1">
                <p className="text-sm font-bold">Ventajas Gratuitas: {Math.min(freeEdges, currentEdgesCount)} / {freeEdges}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {freeEdgesSources.map((src, i) => (
                    <span key={i} className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                      {src}
                    </span>
                  ))}
                  {freeEdgesSources.length === 0 && <span className="text-[10px] italic">Ninguna fuente de ventajas gratuitas.</span>}
                </div>
              </div>
            </div>
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-3 text-stone-600">
              <Dice5 size={20} className="text-stone-400" />
              <div className="flex-1">
                <p className="text-sm font-bold">Ventajas por Desventajas: {Math.max(0, currentEdgesCount - freeEdges)} / {Math.floor(totalHP_Edges / 2)}</p>
                <p className="text-xs">Puntos de Desventaja disponibles: <span className="font-bold text-stone-900">{availableHP_Edges}</span></p>
              </div>
            </div>
          </div>

          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Seleccionar Ventaja</label>
                <select 
                  value={previewEdgeName}
                  onChange={(e) => setPreviewEdgeName(e.target.value)}
                  className="w-full p-3 bg-white border border-stone-200 rounded-xl font-bold focus:ring-2 focus:ring-stone-900 outline-none"
                >
                  <option value="">-- Selecciona una Ventaja --</option>
                  {[...EDGES].sort(sortByName).map(e => {
                    const req = checkRequirements(char, e.requirements);
                    return (
                      <option key={e.name} value={e.name} className={!req.met ? 'text-stone-300' : ''}>
                        {e.name} {!req.met ? '🔒' : ''}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {selectedEdge && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-4 rounded-xl border border-stone-200 space-y-3"
              >
                <div>
                  <h4 className="font-bold text-stone-900">{selectedEdge.name}</h4>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-tighter">Requisitos: {selectedEdge.requirements}</p>
                </div>
                <p className="text-sm text-stone-600 leading-relaxed italic">
                  {selectedEdge.effects}
                </p>
                
                {(() => {
                  const req = checkRequirements(char, selectedEdge.requirements);
                  return (
                    <>
                      {!req.met && (
                        <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-600 text-xs font-bold">
                          <AlertCircle size={14} />
                          <span>{req.reason}</span>
                        </div>
                      )}
                      <button 
                        onClick={() => {
                          if (alreadyHasEdge || !req.met) return;
                          
                          if (canPickFree) {
                            const nextEdges = getEdgesAfterReplacement(char.edges, selectedEdge);
                            const nextChar = { ...char, edges: nextEdges };
                            update({ 
                              edges: nextEdges,
                              bennies: calculateStartingBennies(nextChar)
                            });
                            setPreviewEdgeName('');
                          } else if (availableHP_Edges >= 2) {
                            setPendingHindranceSpend({
                              type: 'edge',
                              cost: 2,
                              onConfirm: () => {
                                const nextEdges = getEdgesAfterReplacement(char.edges, selectedEdge);
                                const nextSpentHP = { ...char.spentHindrancePoints, edges: (char.spentHindrancePoints.edges || 0) + 1 };
                                const nextChar = { ...char, edges: nextEdges, spentHindrancePoints: nextSpentHP };
                                update({ 
                                  edges: nextEdges,
                                  spentHindrancePoints: nextSpentHP,
                                  bennies: calculateStartingBennies(nextChar)
                                });
                                setPreviewEdgeName('');
                              }
                            });
                          }
                        }}
                        disabled={alreadyHasEdge || !req.met || (!canPickFree && availableHP_Edges < 2)}
                        className="w-full py-4 bg-stone-900 text-white rounded-xl font-black uppercase tracking-widest hover:bg-stone-800 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-30"
                      >
                        <Plus size={20} />
                        {alreadyHasEdge ? 'Ya tienes esta ventaja' : !req.met ? 'Requisitos no cumplidos' : 'Agregar Ventaja'}
                      </button>
                    </>
                  );
                })()}
              </motion.div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-black uppercase tracking-widest text-stone-400 text-xs">Tus Ventajas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...char.edges].sort(sortByName).map((edge, index) => {
                const improved = isImprovedEdge(edge.name);
                return (
                  <div key={`${edge.name}-${index}`} className={`p-4 border rounded-xl flex items-center justify-between group transition-all ${
                    improved 
                      ? 'bg-amber-50 border-amber-200 hover:border-amber-400' 
                      : 'bg-emerald-50 border-emerald-100 hover:border-emerald-300'
                  }`}>
                    <div>
                      <div className={`font-bold flex items-center gap-2 ${improved ? 'text-amber-900' : 'text-emerald-900'}`}>
                        {edge.name}
                        {improved && <span className="text-[8px] bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded-full uppercase tracking-tighter">Mejorada</span>}
                      </div>
                      <div className={`text-[10px] font-bold uppercase ${improved ? 'text-amber-600' : 'text-emerald-600'}`}>{edge.requirements}</div>
                    </div>
                    <button 
                      onClick={() => {
                        const nextEdges = char.edges.filter(e => e.name !== edge.name);
                        
                        // Recalculate paid edges based on total count and free slots
                        const paidEdgesCount = Math.max(0, nextEdges.length - freeEdges);
                        const nextSpentHP = { 
                          ...char.spentHindrancePoints, 
                          edges: paidEdgesCount 
                        };
                        
                        const nextChar = { ...char, edges: nextEdges, spentHindrancePoints: nextSpentHP };
                        update({ 
                          edges: nextEdges, 
                          spentHindrancePoints: nextSpentHP,
                          bennies: calculateStartingBennies(nextChar)
                        });
                      }}
                      className={`p-2 rounded-lg transition-all ${
                        improved ? 'hover:bg-amber-100 text-amber-600' : 'hover:bg-emerald-100 text-emerald-600'
                      }`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                );
              })}
              {char.edges.length === 0 && (
                <div className="col-span-full py-12 text-center border-2 border-dashed border-stone-200 rounded-2xl text-stone-400 font-bold">
                  No has seleccionado ninguna ventaja aún.
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
    case 6: // Equipo
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <input 
                id="gear-input"
                type="text" 
                placeholder="Añadir objeto..."
                className="flex-1 px-4 py-3 border border-stone-200 rounded-xl outline-none focus:border-stone-900 transition-colors"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    const input = e.currentTarget;
                    if (input.value) {
                      update({ gear: [...char.gear, input.value] });
                      input.value = '';
                    }
                  }
                }}
              />
              <button 
                onClick={() => {
                  const input = document.getElementById('gear-input') as HTMLInputElement;
                  if (input.value) {
                    update({ gear: [...char.gear, input.value] });
                    input.value = '';
                  }
                }}
                className="px-6 py-3 bg-stone-900 text-white rounded-xl font-bold"
              >
                Añadir
              </button>
            </div>
            <div className="space-y-2">
              {char.gear.map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-stone-50 rounded-lg border border-stone-100 group">
                  <span className="text-sm font-medium">{item}</span>
                  <button 
                    onClick={() => update({ gear: char.gear.filter((_, idx) => idx !== i) })}
                    className="text-stone-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case 7: // Resumen
      return (
        <div className="space-y-8">
          <div className="text-center py-10">
            <div className="w-24 h-24 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-2xl">
              <User size={48} />
            </div>
            <h3 className="text-3xl font-black text-stone-900 uppercase tracking-tighter">{char.name || 'Héroe sin nombre'}</h3>
            <p className="text-stone-500 italic">{char.concept || 'Sin concepto definido'}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-center">
              <div className="text-[10px] font-bold uppercase text-stone-400 mb-1">Paso</div>
              <div className="text-2xl font-black">{char.derived.Paso}</div>
            </div>
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-center">
              <div className="text-[10px] font-bold uppercase text-stone-400 mb-1">Parada</div>
              <div className="text-2xl font-black">{char.derived.Parada}</div>
            </div>
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-center">
              <div className="text-[10px] font-bold uppercase text-stone-400 mb-1">Dureza</div>
              <div className="text-2xl font-black">{char.derived.Dureza}</div>
            </div>
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-center">
              <div className="text-[10px] font-bold uppercase text-stone-400 mb-1">Tamaño</div>
              <div className="text-2xl font-black">{char.derived.Tamaño}</div>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

const ATTRIBUTE_DESCRIPTIONS: { [key: string]: string } = {
  'Agilidad': 'Refleja la coordinación física, los reflejos y el equilibrio. Es clave para el combate y el movimiento.',
  'Astucia': 'Mide la agudeza mental, la lógica y la rapidez de pensamiento. Afecta a muchas habilidades de conocimiento.',
  'Espíritu': 'Representa la fuerza de voluntad, la determinación y la presencia. Es vital para resistir efectos mentales y recuperarse.',
  'Fuerza': 'Indica la potencia física y la capacidad de carga. Afecta al daño cuerpo a cuerpo y al equipo que puedes llevar.',
  'Vigor': 'Determina la resistencia física, la salud y la capacidad de soportar daño. Es la base de tu Dureza.'
};

const DERIVED_DESCRIPTIONS: { [key: string]: string } = {
  'Paso': 'Indica cuántas pulgadas puede moverse tu personaje en un asalto de combate.',
  'Parada': 'Es la dificultad base para que un enemigo te golpee en combate cuerpo a cuerpo. Se calcula como 2 + la mitad de tu dado de Pelear.',
  'Dureza': 'Representa la resistencia física al daño. Si el daño de un ataque iguala o supera este valor, el personaje queda Aturdido o sufre Heridas.',
  'Carrera': 'Es el dado que tiras cuando tu personaje realiza una acción de carrera para moverse más rápido en un asalto.'
};

const upgradeDie = (val: number): Dice => {
  if (val === 4) return 6;
  if (val === 6) return 8;
  if (val === 8) return 10;
  if (val === 10) return 12;
  if (val === 12) return 13;
  if (val === 13) return 14;
  return val as Dice;
};

const canTakeAttributeAdvance = (char: Character) => {
  const advances = char.advancesList || [];
  // Use the number of advances already taken to determine the rank of the NEXT advance
  const currentAdvanceCount = char.advances || advances.length || 0;
  const nextAdvanceNumber = currentAdvanceCount + 1;
  const nextAdvanceRank = getRank(nextAdvanceNumber);
  
  if (nextAdvanceRank === 'Legendario') {
    // In Legendary, once every five advances (every 10 XP)
    const lastAttributeAdvanceIndex = [...advances].reverse().findIndex(adv => adv.type === 'Attribute');
    if (lastAttributeAdvanceIndex === -1) return true; // Never taken one
    
    // The index in the array is (advanceNumber - 1)
    const lastAttributeAdvanceNumber = (advances.length - 1 - lastAttributeAdvanceIndex) + 1;
    const advancesSinceLast = nextAdvanceNumber - lastAttributeAdvanceNumber;
    return advancesSinceLast >= 5;
  }

  // Check if any previous advance in the SAME rank was an attribute increase
  const alreadyTakenInRank = advances.some((adv, idx) => {
    const advanceNumber = idx + 1;
    return adv.type === 'Attribute' && getRank(advanceNumber) === nextAdvanceRank;
  });

  return !alreadyTakenInRank;
};

const downgradeDie = (val: Dice): Dice => {
  if (val === 14) return 13;
  if (val === 13) return 12;
  if (val === 12) return 10;
  if (val === 10) return 8;
  if (val === 8) return 6;
  if (val === 6) return 4;
  return 4;
};

function CharacterSheetView({ character, onUpdate }: { character: Character, onUpdate: (c: Character) => void }) {
  const [selectedTrait, setSelectedTrait] = useState<{ name: string, description: string, type?: string, requirements?: string } | null>(null);
  const [isAddingAdvance, setIsAddingAdvance] = useState(false);
  const [isAddingWeapon, setIsAddingWeapon] = useState(false);
  const [isAddingArmor, setIsAddingArmor] = useState(false);
  const [isAddingShield, setIsAddingShield] = useState(false);
  const [newWeapon, setNewWeapon] = useState({ name: '', damage: '', range: '', ap: 0, notes: '' });
  const [newArmor, setNewArmor] = useState({ name: '', bonus: 0, notes: '' });
  const [newShield, setNewShield] = useState({ name: '', parryBonus: 0, coverBonus: 0, notes: '' });
  const [advanceType, setAdvanceType] = useState<'Attribute' | 'Skills' | 'Edge' | 'NewSkill' | null>(null);
  const [selectedAdvanceSkills, setSelectedAdvanceSkills] = useState<string[]>([]);
  const [selectedAdvanceAttribute, setSelectedAdvanceAttribute] = useState<string | null>(null);
  const [selectedAdvanceEdge, setSelectedAdvanceEdge] = useState<Edge | null>(null);
  const [newSkillName, setNewSkillName] = useState<string>('');
  
  const [rollResult, setRollResult] = useState<{
    trait: string;
    dice: string;
    traitRoll: { die: number, result: number, explosions: number[] };
    wildRoll?: { die: number, result: number, explosions: number[] };
    modifier: number;
    appliedModifiers: AppliedModifier[];
    total: number;
  } | null>(null);

  const speciesData = useMemo(() => SPECIES.find(s => s.name === character.species), [character.species]);

  const isIncapacitated = (character.wounds || 0) >= 4 || (character.fatigue || 0) >= 3;
  const totalPenalty = getWoundPenalty(character) + getFatiguePenalty(character);

  const performRoll = (traitName: string, dieStr: string, isTraitRoll: boolean = true, traitModifier: number = 0, explodes: boolean = true, modifiers: AppliedModifier[] = []) => {
    // Handle d12+X format
    let dieType = 6;
    let baseModifier = 0;
    
    if (dieStr.includes('+')) {
      const parts = dieStr.split('+');
      dieType = parseInt(parts[0].replace('d', '')) || 6;
      baseModifier = parseInt(parts[1]) || 0;
    } else {
      dieType = parseInt(dieStr.replace('d', '')) || 6;
    }
    
    const rollSingleDie = (sides: number, canExplode: boolean) => {
      let total = 0;
      let explosions: number[] = [];
      let currentRoll = 0;
      do {
        currentRoll = Math.floor(Math.random() * sides) + 1;
        total += currentRoll;
        explosions.push(currentRoll);
      } while (canExplode && currentRoll === sides);
      return { die: sides, result: total, explosions };
    };

    const traitRoll = rollSingleDie(dieType, explodes);
    let wildRoll = undefined;
    let finalTotal = traitRoll.result;

    if (isTraitRoll) {
      wildRoll = rollSingleDie(6, true);
      finalTotal = Math.max(traitRoll.result, wildRoll.result);
    }

    const penalty = isTraitRoll ? totalPenalty : 0;
    const totalModifier = traitModifier + baseModifier - penalty;
    const totalWithMod = Math.max(1, finalTotal + totalModifier);

    const allModifiers = [...modifiers];
    if (penalty > 0) {
      allModifiers.push({ name: 'Heridas/Fatiga', value: -penalty });
    }

    setRollResult({
      trait: traitName,
      dice: dieStr,
      traitRoll,
      wildRoll,
      modifier: totalModifier,
      appliedModifiers: allModifiers,
      total: totalWithMod
    });
  };

  const updatePlayState = (field: keyof Character, delta: number) => {
    const currentVal = (character[field] as number) || 0;
    let newVal = currentVal + delta;
    
    if (field === 'fatigue') {
      newVal = Math.min(3, Math.max(0, newVal));
    } else if (field === 'wounds') {
      newVal = Math.min(4, Math.max(0, newVal));
    } else {
      newVal = Math.max(0, newVal);
    }
    
    onUpdate({ ...character, [field]: newVal });
  };

  const handleApplyAdvance = () => {
    if (!advanceType) return;

    // Deep copy to avoid state mutation issues
    const newChar = { 
      ...character,
      attributes: { ...character.attributes },
      skills: { ...character.skills },
      edges: [...character.edges],
      advancesList: [...(character.advancesList || [])]
    };
    
    let description = '';
    let details = {};

    if (advanceType === 'Attribute') {
      if (!selectedAdvanceAttribute) return;
      if (!canTakeAttributeAdvance(character)) return;

      const attr = selectedAdvanceAttribute as keyof typeof character.attributes;
      const limits = getAttributeLimits(attr, character.species, character.heritageChoice, character.hindrances);
      const currentVal = character.attributes[attr];
      
      if (currentVal >= limits.max) {
        return;
      }

      newChar.attributes[attr] = upgradeDie(currentVal);
      description = `Aumentar Atributo: ${attr}`;
      details = { attribute: attr };
    } else if (advanceType === 'Skills') {
      if (selectedAdvanceSkills.length === 0) return;
      selectedAdvanceSkills.forEach(skillName => {
        const { min } = getSkillLimits(skillName, newChar.species, newChar.heritageChoice);
        const currentVal = newChar.skills[skillName] || min;
        newChar.skills[skillName] = upgradeDie(currentVal);
      });
      description = `Aumentar Habilidades: ${selectedAdvanceSkills.join(', ')}`;
      details = { skills: selectedAdvanceSkills };
    } else if (advanceType === 'Edge') {
      if (!selectedAdvanceEdge) return;
      const req = checkRequirements(character, selectedAdvanceEdge.requirements);
      if (!req.met) return;
      newChar.edges = getEdgesAfterReplacement(newChar.edges, selectedAdvanceEdge);
      description = `Nueva Ventaja: ${selectedAdvanceEdge.name}`;
      details = { edge: selectedAdvanceEdge };
    } else if (advanceType === 'NewSkill') {
      if (!newSkillName) return;
      newChar.skills[newSkillName] = 4;
      description = `Nueva Habilidad: ${newSkillName}`;
      details = { skillName: newSkillName };
    }

    const advanceId = Math.random().toString(36).substr(2, 9);
    newChar.advances = (newChar.advances || 0) + 1;

    const newAdvance: Advance = {
      id: advanceId,
      type: advanceType,
      description,
      details
    };

    newChar.advancesList = [...newChar.advancesList, newAdvance];
    
    // Recalculate resources that might change with advances (like Bennies from 'Afortunado')
    const oldBenniesMax = calculateStartingBennies(character);
    const newBenniesMax = calculateStartingBennies(newChar);
    const benniesDelta = newBenniesMax - oldBenniesMax;
    if (benniesDelta !== 0) {
      newChar.bennies = (newChar.bennies !== undefined ? newChar.bennies : oldBenniesMax) + benniesDelta;
    }

    newChar.derived = calculateDerived(newChar);
    onUpdate(newChar);
    setIsAddingAdvance(false);
    setAdvanceType(null);
    setSelectedAdvanceSkills([]);
    setSelectedAdvanceAttribute(null);
    setSelectedAdvanceEdge(null);
    setNewSkillName('');
  };

  const handleAddWeapon = () => {
    if (!newWeapon.name || !newWeapon.damage) return;
    const newChar = { ...character, weapons: [...(character.weapons || []), newWeapon] };
    onUpdate(newChar);
    setNewWeapon({ name: '', damage: '', range: '', ap: 0, notes: '' });
    setIsAddingWeapon(false);
  };

  const handleAddArmor = () => {
    if (!newArmor.name) return;
    const newChar = { ...character, armor: [...(character.armor || []), newArmor] };
    newChar.derived = calculateDerived(newChar);
    onUpdate(newChar);
    setNewArmor({ name: '', bonus: 0, notes: '' });
    setIsAddingArmor(false);
  };

  const handleAddShield = () => {
    if (!newShield.name) return;
    const newChar = { ...character, shield: newShield };
    newChar.derived = calculateDerived(newChar);
    onUpdate(newChar);
    setNewShield({ name: '', parryBonus: 0, coverBonus: 0, notes: '' });
    setIsAddingShield(false);
  };

  const removeWeapon = (idx: number) => {
    const newWeapons = [...(character.weapons || [])];
    newWeapons.splice(idx, 1);
    onUpdate({ ...character, weapons: newWeapons });
  };

  const removeArmor = (idx: number) => {
    const newArmor = [...(character.armor || [])];
    newArmor.splice(idx, 1);
    const newChar = { ...character, armor: newArmor };
    newChar.derived = calculateDerived(newChar);
    onUpdate(newChar);
  };

  const removeShield = () => {
    const newChar = { ...character, shield: undefined };
    newChar.derived = calculateDerived(newChar);
    onUpdate(newChar);
  };

  const removeGear = (idx: number) => {
    const newGear = [...character.gear];
    newGear.splice(idx, 1);
    onUpdate({ ...character, gear: newGear });
  };

  const [newGearItemLocal, setNewGearItemLocal] = useState('');
  const handleAddGearLocal = () => {
    if (!newGearItemLocal.trim()) return;
    onUpdate({ ...character, gear: [...character.gear, newGearItemLocal.trim()] });
    setNewGearItemLocal('');
  };

  const getFatigueLabel = (val: number) => {
    if (val === 0) return 'Normal';
    if (val === 1) return 'Fatigado (-1)';
    if (val === 2) return 'Exhausto (-2)';
    return 'Incapacitado';
  };

  const getWoundsLabel = (val: number) => {
    if (val === 0) return 'Normal';
    if (val === 4) return 'Incapacitado';
    return `${val} ${val === 1 ? 'Herida' : 'Heridas'} (-${val})`;
  };

  return (
    <div className="p-8 space-y-10 relative">
      <AnimatePresence>
        {rollResult && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-stone-200 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-stone-900" />
              
              <button 
                onClick={() => setRollResult(null)}
                className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-900 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center space-y-6">
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-stone-400 uppercase tracking-widest">Tirada de {rollResult.trait}</h3>
                  <div className="text-5xl font-black text-stone-900 tracking-tighter">{rollResult.total}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase text-stone-400 mb-2">Dado {rollResult.dice}</span>
                    <div className="flex flex-wrap justify-center gap-1">
                      {rollResult.traitRoll.explosions.map((e, i) => (
                        <span key={i} className={`text-xl font-black ${i < rollResult.traitRoll.explosions.length - 1 ? 'text-amber-500' : 'text-stone-900'}`}>{e}</span>
                      ))}
                    </div>
                    <div className="text-[10px] font-bold text-stone-500 mt-1">Total: {rollResult.traitRoll.result}</div>
                  </div>

                  {rollResult.wildRoll && (
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex flex-col items-center">
                      <span className="text-[10px] font-black uppercase text-amber-600/60 mb-2">Dado Salvaje</span>
                      <div className="flex flex-wrap justify-center gap-1">
                        {rollResult.wildRoll.explosions.map((e, i) => (
                          <span key={i} className={`text-xl font-black ${i < rollResult.wildRoll.explosions.length - 1 ? 'text-amber-500' : 'text-amber-700'}`}>{e}</span>
                        ))}
                      </div>
                      <div className="text-[10px] font-bold text-amber-600 mt-1">Total: {rollResult.wildRoll.result}</div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {rollResult.appliedModifiers.length > 0 ? (
                    <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100 space-y-2">
                      <div className="text-[10px] font-black uppercase text-stone-400 tracking-widest text-left mb-1">Modificadores Aplicados</div>
                      {rollResult.appliedModifiers.map((mod, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs font-bold">
                          <span className="text-stone-500">{mod.name}</span>
                          <span className={mod.value > 0 ? 'text-emerald-600' : 'text-red-600'}>
                            {mod.value > 0 ? '+' : ''}{mod.value}
                          </span>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-xs font-black">
                        <span className="text-stone-900 uppercase tracking-widest">Total</span>
                        <span className={rollResult.modifier >= 0 ? 'text-emerald-700' : 'text-red-700'}>
                          {rollResult.modifier > 0 ? '+' : ''}{rollResult.modifier}
                        </span>
                      </div>
                    </div>
                  ) : rollResult.modifier !== 0 && (
                    <div className="flex items-center justify-center gap-2 py-2 px-4 bg-stone-100 rounded-full text-xs font-bold text-stone-600">
                      Modificador total: {rollResult.modifier > 0 ? '+' : ''}{rollResult.modifier}
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => setRollResult(null)}
                  className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-all shadow-lg"
                >
                  Listo
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {selectedTrait && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-stone-200 relative"
            >
              <button 
                onClick={() => setSelectedTrait(null)}
                className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-900 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mb-6 text-stone-900">
                <Info size={24} />
              </div>

              <h3 className="text-2xl font-black text-stone-900 uppercase tracking-tighter mb-2">{selectedTrait.name}</h3>
              {selectedTrait.type && (
                <div className="text-xs font-black uppercase tracking-widest text-stone-400 mb-4">{selectedTrait.type}</div>
              )}
              {selectedTrait.requirements && (
                <div className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-4 bg-stone-50 p-2 rounded-lg border border-stone-100">
                  Requisitos: {selectedTrait.requirements}
                </div>
              )}
              
              <p className="text-stone-600 leading-relaxed italic">
                {selectedTrait.description}
              </p>

              <button 
                onClick={() => setSelectedTrait(null)}
                className="w-full mt-8 py-4 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-all shadow-lg"
              >
                Entendido
              </button>
            </motion.div>
          </div>
        )}

        {isAddingAdvance && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-stone-200 relative overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-stone-900" />
              
              <button 
                onClick={() => {
                  setIsAddingAdvance(false);
                  setAdvanceType(null);
                }}
                className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-900 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mb-8">
                <h3 className="text-3xl font-black text-stone-900 uppercase tracking-tighter">Nuevo Avance</h3>
                <p className="text-stone-500 font-medium">Elige cómo quieres mejorar a tu personaje.</p>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 space-y-8">
                {!advanceType ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div 
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        if (canTakeAttributeAdvance(character)) {
                          setAdvanceType('Attribute');
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          if (canTakeAttributeAdvance(character)) {
                            setAdvanceType('Attribute');
                          }
                        }
                      }}
                      className={`p-6 rounded-2xl border transition-all text-left space-y-2 group cursor-pointer ${
                        canTakeAttributeAdvance(character)
                          ? 'bg-stone-50 border-stone-100 hover:bg-stone-100'
                          : 'bg-stone-50/50 border-stone-100 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform ${
                        canTakeAttributeAdvance(character) ? 'bg-amber-100 text-amber-600 group-hover:scale-110' : 'bg-stone-100 text-stone-400'
                      }`}>
                        <Zap size={20} />
                      </div>
                      <div className="font-black uppercase tracking-widest text-xs text-stone-900">Atributo</div>
                      <p className="text-[10px] text-stone-500 leading-relaxed">
                        {canTakeAttributeAdvance(character) 
                          ? 'Sube un tipo de dado a un atributo (máx. una vez por Rango).'
                          : 'Ya has subido un atributo en este Rango.'}
                      </p>
                    </div>
                    
                    <div 
                      role="button"
                      tabIndex={0}
                      onClick={() => setAdvanceType('Skills')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setAdvanceType('Skills');
                        }
                      }}
                      className="p-6 bg-stone-50 rounded-2xl border border-stone-100 hover:bg-stone-100 transition-all text-left space-y-2 group cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Sword size={20} />
                      </div>
                      <div className="font-black uppercase tracking-widest text-xs text-stone-900">Habilidades</div>
                      <p className="text-[10px] text-stone-500 leading-relaxed">Sube dos habilidades que sean menores que su atributo vinculado.</p>
                    </div>

                    <div 
                      role="button"
                      tabIndex={0}
                      onClick={() => setAdvanceType('Edge')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setAdvanceType('Edge');
                        }
                      }}
                      className="p-6 bg-stone-50 rounded-2xl border border-stone-100 hover:bg-stone-100 transition-all text-left space-y-2 group cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Award size={20} />
                      </div>
                      <div className="font-black uppercase tracking-widest text-xs text-stone-900">Ventaja</div>
                      <p className="text-[10px] text-stone-500 leading-relaxed">Elige una nueva ventaja para la que cumplas los requisitos.</p>
                    </div>

                    <div 
                      role="button"
                      tabIndex={0}
                      onClick={() => setAdvanceType('NewSkill')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setAdvanceType('NewSkill');
                        }
                      }}
                      className="p-6 bg-stone-50 rounded-2xl border border-stone-100 hover:bg-stone-100 transition-all text-left space-y-2 group cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Plus size={20} />
                      </div>
                      <div className="font-black uppercase tracking-widest text-xs text-stone-900">Nueva Habilidad</div>
                      <p className="text-[10px] text-stone-500 leading-relaxed">Aprende una nueva habilidad a d4.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <button 
                      onClick={() => setAdvanceType(null)}
                      className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
                    >
                      <ChevronLeft size={14} /> Volver
                    </button>

                    {advanceType === 'Attribute' && (
                      <div className="grid grid-cols-1 gap-2">
                        {ATTRIBUTES.map(attr => (
                          <div
                            key={attr}
                            role="button"
                            tabIndex={0}
                            onClick={() => setSelectedAdvanceAttribute(attr)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setSelectedAdvanceAttribute(attr);
                              }
                            }}
                            className={`p-4 rounded-xl border transition-all text-left flex items-center justify-between cursor-pointer ${
                              selectedAdvanceAttribute === attr 
                                ? 'bg-stone-900 border-stone-900 text-white shadow-lg' 
                                : 'bg-stone-50 border-stone-100 text-stone-600 hover:bg-stone-100'
                            }`}
                          >
                            <span className="font-bold">{attr}</span>
                            <div className="flex items-center gap-3">
                              <span className="font-mono opacity-60">{formatDice(character.attributes[attr as keyof typeof character.attributes])}</span>
                              <ChevronRight size={14} />
                              <span className="font-mono font-black">{formatDice(upgradeDie(character.attributes[attr as keyof typeof character.attributes]))}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {advanceType === 'Skills' && (
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <div className="text-xs font-black uppercase tracking-widest text-stone-400">Selecciona habilidades para subir</div>
                          <p className="text-[10px] text-stone-500 italic leading-tight">
                            Puedes subir 2 habilidades que sean menores que su atributo vinculado, o 1 habilidad que sea igual o mayor.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {[...SKILLS].sort(sortByName).filter(s => {
                            const { min } = getSkillLimits(s.name, character.species, character.heritageChoice);
                            const val = character.skills[s.name] || min;
                            return val > 0;
                          }).map(skillDef => {
                            const name = skillDef.name;
                            const { min } = getSkillLimits(name, character.species, character.heritageChoice);
                            const val = character.skills[name] || min;
                            const isSelected = selectedAdvanceSkills.includes(name);
                            const attrVal = character.attributes[skillDef.attribute as keyof typeof character.attributes];
                            const isLowerThanAttr = (val as number) < attrVal;

                            return (
                              <button
                                key={name}
                                onClick={() => {
                                  if (isSelected) {
                                    setSelectedAdvanceSkills(prev => prev.filter(s => s !== name));
                                  } else {
                                    const nextSkills = [...selectedAdvanceSkills, name];
                                    if (nextSkills.length > 2) return;
                                    
                                    if (nextSkills.length === 2) {
                                      // Both must be lower than their linked attribute
                                      const allLower = nextSkills.every(sName => {
                                        const sDef = SKILLS.find(s => s.name === sName);
                                        if (!sDef) return false;
                                        const aVal = character.attributes[sDef.attribute as keyof typeof character.attributes];
                                        const { min: sMin } = getSkillLimits(sName, character.species, character.heritageChoice);
                                        const sVal = character.skills[sName] || sMin;
                                        return sVal < aVal;
                                      });
                                      if (!allLower) return;
                                    }
                                    
                                    setSelectedAdvanceSkills(nextSkills);
                                  }
                                }}
                                className={`p-3 rounded-xl border transition-all text-left flex items-center justify-between ${
                                  isSelected 
                                    ? 'bg-stone-900 border-stone-900 text-white shadow-md' 
                                    : 'bg-stone-50 border-stone-100 text-stone-600 hover:bg-stone-100'
                                }`}
                              >
                                <div className="flex flex-col">
                                  <span className="text-xs font-bold">{name}</span>
                                  <span className="text-[9px] opacity-60 uppercase tracking-tighter">
                                    ({skillDef?.attribute}: {formatDice(attrVal)})
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-xs opacity-60">{formatDice(val as number)}</span>
                                  {isSelected && <ChevronRight size={10} />}
                                  {isSelected && <span className="font-mono text-xs font-black">{formatDice(upgradeDie(val as number))}</span>}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {advanceType === 'Edge' && (
                      <div className="space-y-4">
                        <div className="text-xs font-black uppercase tracking-widest text-stone-400">Selecciona una nueva ventaja</div>
                        <div className="grid grid-cols-1 gap-2">
                          {[...EDGES].sort(sortByName).filter(e => !character.edges.some(ce => ce.name === e.name)).map(edge => {
                            const req = checkRequirements(character, edge.requirements);
                            return (
                              <div
                                key={edge.name}
                                role="button"
                                tabIndex={0}
                                onClick={() => {
                                  if (req.met) {
                                    setSelectedAdvanceEdge(edge);
                                  }
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    if (req.met) {
                                      setSelectedAdvanceEdge(edge);
                                    }
                                  }
                                }}
                                className={`p-4 rounded-xl border transition-all text-left ${
                                  !req.met 
                                    ? 'bg-stone-50/50 border-stone-100 opacity-50 cursor-not-allowed'
                                    : selectedAdvanceEdge?.name === edge.name 
                                      ? 'bg-stone-900 border-stone-900 text-white shadow-lg cursor-pointer' 
                                      : 'bg-stone-50 border-stone-100 text-stone-600 hover:bg-stone-100 cursor-pointer'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="font-bold">{edge.name}</div>
                                  {!req.met && <AlertCircle size={14} className="text-red-400" />}
                                </div>
                                <div className="text-[10px] opacity-60 mt-1">Requisitos: {edge.requirements}</div>
                                <div className={`text-xs mt-2 italic ${selectedAdvanceEdge?.name === edge.name ? 'text-stone-300' : 'text-stone-500'}`}>
                                  {edge.effects}
                                </div>
                                {!req.met && (
                                  <div className="text-[9px] font-black text-red-500 uppercase tracking-widest mt-2">
                                    {req.reason}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {advanceType === 'NewSkill' && (
                      <div className="space-y-4">
                        <div className="text-xs font-black uppercase tracking-widest text-stone-400">Elige una nueva habilidad</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {[...SKILLS].sort(sortByName).filter(s => {
                            const { min } = getSkillLimits(s.name, character.species, character.heritageChoice);
                            const val = character.skills[s.name] || min;
                            return val === 0;
                          }).map(skill => (
                            <button
                              key={skill.name}
                              onClick={() => setNewSkillName(skill.name)}
                              className={`p-3 rounded-xl border transition-all text-left flex items-center justify-between ${
                                newSkillName === skill.name 
                                  ? 'bg-stone-900 border-stone-900 text-white shadow-md' 
                                  : 'bg-stone-50 border-stone-100 text-stone-600 hover:bg-stone-100'
                              }`}
                            >
                              <div className="flex flex-col">
                                <span className="text-xs font-bold">{skill.name}</span>
                                <span className="text-[9px] opacity-60 uppercase tracking-tighter">
                                  ({skill.attribute}: {formatDice(character.attributes[skill.attribute as keyof typeof character.attributes])})
                                </span>
                              </div>
                              {newSkillName === skill.name && <span className="font-mono text-xs font-black">d4</span>}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {advanceType && (
                <div className="mt-8 pt-6 border-t border-stone-100">
                  <button 
                    onClick={handleApplyAdvance}
                    disabled={
                      (advanceType === 'Edge' && (!selectedAdvanceEdge || !checkRequirements(character, selectedAdvanceEdge.requirements).met)) ||
                      (advanceType === 'Attribute' && (!selectedAdvanceAttribute || !canTakeAttributeAdvance(character))) ||
                      (advanceType === 'Skills' && selectedAdvanceSkills.length === 0) ||
                      (advanceType === 'NewSkill' && (!newSkillName || newSkillName.length === 0))
                    }
                    className={`w-full py-4 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-all shadow-lg active:scale-95 ${
                      ((advanceType === 'Edge' && (!selectedAdvanceEdge || !checkRequirements(character, selectedAdvanceEdge.requirements).met)) ||
                      (advanceType === 'Attribute' && (!selectedAdvanceAttribute || !canTakeAttributeAdvance(character))) ||
                      (advanceType === 'Skills' && selectedAdvanceSkills.length === 0) ||
                      (advanceType === 'NewSkill' && (!newSkillName || newSkillName.length === 0)))
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    Confirmar Avance
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {isAddingWeapon && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-stone-200 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-stone-900" />
              <button onClick={() => setIsAddingWeapon(false)} className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-900"><X size={20} /></button>
              <h3 className="text-2xl font-black text-stone-900 uppercase tracking-tighter mb-6">Nueva Arma</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Nombre (ej: Espada Larga)" value={newWeapon.name} onChange={e => setNewWeapon({...newWeapon, name: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl" />
                <input type="text" placeholder="Daño (ej: FUE+d8)" value={newWeapon.damage} onChange={e => setNewWeapon({...newWeapon, damage: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl" />
                <input type="text" placeholder="Alcance (opcional)" value={newWeapon.range} onChange={e => setNewWeapon({...newWeapon, range: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl" />
                <input type="number" placeholder="AP (opcional)" value={newWeapon.ap} onChange={e => setNewWeapon({...newWeapon, ap: parseInt(e.target.value) || 0})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl" />
                <textarea placeholder="Notas" value={newWeapon.notes} onChange={e => setNewWeapon({...newWeapon, notes: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl h-24" />
                <button onClick={handleAddWeapon} className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-all">Añadir Arma</button>
              </div>
            </motion.div>
          </div>
        )}

        {isAddingArmor && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-stone-200 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-stone-900" />
              <button onClick={() => setIsAddingArmor(false)} className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-900"><X size={20} /></button>
              <h3 className="text-2xl font-black text-stone-900 uppercase tracking-tighter mb-6">Nueva Armadura</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Nombre (ej: Armadura de Cuero)" value={newArmor.name} onChange={e => setNewArmor({...newArmor, name: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl" />
                <input type="number" placeholder="Bono de Armadura (ej: 2)" value={newArmor.bonus} onChange={e => setNewArmor({...newArmor, bonus: parseInt(e.target.value) || 0})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl" />
                <textarea placeholder="Notas" value={newArmor.notes} onChange={e => setNewArmor({...newArmor, notes: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl h-24" />
                <button onClick={handleAddArmor} className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-all">Añadir Armadura</button>
              </div>
            </motion.div>
          </div>
        )}

        {isAddingShield && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-stone-200 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-stone-900" />
              <button onClick={() => setIsAddingShield(false)} className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-900"><X size={20} /></button>
              <h3 className="text-2xl font-black text-stone-900 uppercase tracking-tighter mb-6">Nuevo Escudo</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Nombre (ej: Escudo Mediano)" value={newShield.name} onChange={e => setNewShield({...newShield, name: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl" />
                <input type="number" placeholder="Bono a la Parada (ej: 2)" value={newShield.parryBonus} onChange={e => setNewShield({...newShield, parryBonus: parseInt(e.target.value) || 0})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl" />
                <input type="number" placeholder="Bono de Cobertura (ej: 2)" value={newShield.coverBonus} onChange={e => setNewShield({...newShield, coverBonus: parseInt(e.target.value) || 0})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl" />
                <textarea placeholder="Notas" value={newShield.notes} onChange={e => setNewShield({...newShield, notes: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl h-24" />
                <button onClick={handleAddShield} className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-all">Añadir Escudo</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {isIncapacitated && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-600 text-white p-6 rounded-3xl flex flex-col items-center justify-center gap-2 shadow-2xl border-4 border-red-400/30"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle size={32} className="animate-pulse" />
            <span className="font-black uppercase tracking-[0.2em] text-2xl">Incapacitado</span>
          </div>
          <p className="text-red-100 text-sm font-medium">El personaje está fuera de combate y requiere atención inmediata.</p>
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-stone-200">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h1 className="text-5xl font-black tracking-tighter uppercase text-stone-900">{character.name}</h1>
            <div className="px-4 py-1 bg-stone-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
              {getRank(character.advances || 0)}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-xl text-stone-500 font-medium italic">{character.concept}</p>
            <div className="w-1.5 h-1.5 rounded-full bg-stone-300 hidden md:block" />
            <div className="flex gap-2">
              <div className="inline-block px-4 py-1 bg-stone-100 text-stone-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-stone-200">
                {character.species}
              </div>
              {character.heritageChoice && (
                <div className="inline-block px-4 py-1 bg-stone-50 text-stone-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-stone-200">
                  {character.heritageChoice}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="text-right">
            <div className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Avances</div>
            <div className="text-3xl font-black text-stone-900 leading-none">{character.advances || 0}</div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <button 
              onClick={() => setIsAddingAdvance(true)}
              className="group relative flex items-center gap-3 px-6 py-4 bg-stone-900 text-white rounded-2xl hover:bg-stone-800 transition-all active:scale-95 shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <TrendingUp size={20} className="relative z-10" />
              <span className="relative z-10 font-black uppercase tracking-widest text-xs">Avanzar</span>
            </button>
          </div>
        </div>
      </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <DerivedStat 
            label="Paso" 
            value={character.derived.Paso} 
            bonus={-getWoundPenalty(character)}
            onInfo={() => setSelectedTrait({ name: 'Paso', description: DERIVED_DESCRIPTIONS['Paso'], type: 'Estadística Derivada' })}
          />
          <DerivedStat 
            label="Carrera" 
            value={character.derived.DadoCarrera} 
            onClick={() => performRoll('Carrera', character.derived.DadoCarrera, false, 0, false, [])}
            onInfo={() => setSelectedTrait({ name: 'Carrera', description: DERIVED_DESCRIPTIONS['Carrera'], type: 'Estadística Derivada' })}
          />
          <DerivedStat 
            label="Parada" 
            value={character.derived.Parada} 
            situational={character.edges.some(e => e.name === 'Arma Distintiva') ? [{ value: 1, note: 'Con arma específica' }] : []}
            onInfo={() => setSelectedTrait({ name: 'Parada', description: DERIVED_DESCRIPTIONS['Parada'], type: 'Estadística Derivada' })}
          />
          <DerivedStat 
            label="Dureza" 
            value={character.derived.Dureza} 
            situational={character.edges.some(e => e.name === 'Berserk') ? [{ value: 2, note: 'En furia' }] : []}
            onInfo={() => setSelectedTrait({ name: 'Dureza', description: DERIVED_DESCRIPTIONS['Dureza'], type: 'Estadística Derivada' })}
          />
        </div>

      {/* Tracking Section: Bennies, Wounds, Fatigue, Advances */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8 border-y border-stone-100">
          <TrackingToken 
            icon={<Dice5 size={18} />} 
            label="Benis" 
            value={character.bennies ?? calculateStartingBennies(character)} 
            color="bg-amber-50 text-amber-700 border-amber-200"
            onAdd={() => updatePlayState('bennies', 1)}
            onSub={() => updatePlayState('bennies', -1)}
          />
          <TrackingToken 
            icon={<Heart size={18} />} 
            label="Heridas" 
            value={character.wounds || 0} 
            color="bg-red-50 text-red-700 border-red-200"
            onAdd={() => updatePlayState('wounds', 1)}
            onSub={() => updatePlayState('wounds', -1)}
            statusLabel={getWoundsLabel(character.wounds || 0)}
          />
          <TrackingToken 
            icon={<Zap size={18} />} 
            label="Fatiga" 
            value={character.fatigue || 0} 
            color="bg-blue-50 text-blue-700 border-blue-200"
            onAdd={() => updatePlayState('fatigue', 1)}
            onSub={() => updatePlayState('fatigue', -1)}
            statusLabel={getFatigueLabel(character.fatigue || 0)}
          />
        </div>
        
        {totalPenalty > 0 && (
          <div className="flex items-center justify-center gap-2 text-red-600 font-black uppercase text-xs tracking-widest bg-red-50 py-2 rounded-full border border-red-100">
            <AlertCircle size={14} />
            Penalizador Total a Rasgos: -{totalPenalty}
          </div>
        )}
      </div>

      {speciesData && (
        <section className="p-6 bg-stone-50 rounded-2xl border border-stone-100 space-y-6">
          <SectionTitle icon={<User size={20} className="text-stone-400" />} title="Capacidades de Especie" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {speciesData.abilities.map((a, i) => (
              <div 
                key={i} 
                role="button"
                tabIndex={0}
                onClick={() => setSelectedTrait({ name: a.name, description: a.description, type: 'Capacidad de Especie' })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedTrait({ name: a.name, description: a.description, type: 'Capacidad de Especie' });
                  }
                }}
                className="text-left space-y-1 p-2 -m-2 rounded-lg hover:bg-stone-100 transition-colors group cursor-pointer"
              >
                <div className="text-sm font-black text-stone-900 uppercase tracking-tight group-hover:text-stone-700">{a.name}</div>
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">{a.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section className="space-y-6">
          <SectionTitle 
            icon={<Zap size={20} className="text-amber-500" />} 
            title="Atributos" 
            extra={totalPenalty > 0 && (
              <span className="text-[10px] font-black bg-red-100 text-red-600 px-2 py-0.5 rounded-full uppercase tracking-widest">
                Penalizador: -{totalPenalty}
              </span>
            )}
          />
          <div className="grid grid-cols-1 gap-3">
            {Object.entries(character.attributes).map(([name, val]) => {
              const bonus = getAttributeBonus(character, name);
              const displayBonus = bonus.generalValue - totalPenalty;
              return (
                <div 
                  key={name} 
                  onClick={() => performRoll(name, formatDice(val), true, bonus.generalValue, true, bonus.modifiers)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      performRoll(name, formatDice(val), true, bonus.generalValue, true, bonus.modifiers);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="flex items-center p-4 bg-stone-50 rounded-xl border border-stone-100 hover:bg-stone-100 transition-all active:scale-[0.98] group cursor-pointer gap-4"
                >
                  <div className="w-32 shrink-0 flex flex-col items-start">
                    <span className="font-bold text-stone-500 uppercase text-xs tracking-widest group-hover:text-stone-700">{name}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTrait({ name, description: ATTRIBUTE_DESCRIPTIONS[name], type: 'Atributo' });
                      }}
                      className="text-[9px] text-stone-400 hover:text-stone-900 flex items-center gap-1 mt-1"
                    >
                      <Info size={10} /> Info
                    </button>
                  </div>
                  <div className="w-20 shrink-0 font-mono font-black text-2xl flex items-center">
                    {formatDice(val)}
                    {displayBonus !== 0 && (
                      <span className={`text-xl font-black ml-1 ${displayBonus > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {displayBonus > 0 ? '+' : ''}{displayBonus}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-x-2 gap-y-1 flex-wrap">
                    {bonus.situational.map((sit, idx) => (
                      <span key={idx} className={`text-[10px] font-bold leading-none ${sit.value > 0 ? 'text-emerald-500' : 'text-red-600'}`}>
                        ({sit.value > 0 ? '+' : ''}{sit.value} {sit.note})
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-6">
          <SectionTitle 
            icon={<Sword size={20} className="text-stone-500" />} 
            title="Habilidades" 
            extra={totalPenalty > 0 && (
              <span className="text-[10px] font-black bg-red-100 text-red-600 px-2 py-0.5 rounded-full uppercase tracking-widest">
                Penalizador: -{totalPenalty}
              </span>
            )}
          />
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(character.skills).map(([name, val]) => {
              const bonus = getSkillBonus(character, name);
              const displayBonus = bonus.generalValue - totalPenalty;
              return (
                <div key={name} className="flex items-start py-2 border-b border-stone-100 gap-4 group">
                  <div className="w-32 shrink-0">
                    <div className="font-bold text-stone-900">{name}</div>
                    <button 
                      onClick={() => setSelectedTrait({ name, description: SKILLS.find(s => s.name === name)?.description || '', type: 'Habilidad' })}
                      className="text-[9px] text-stone-400 hover:text-stone-900 flex items-center gap-1 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Info size={10} /> Info
                    </button>
                  </div>
                  <button 
                    onClick={() => performRoll(name, formatDice(val as number), true, bonus.generalValue, true, bonus.modifiers)}
                    className="flex items-center gap-1 shrink-0 w-20 hover:bg-stone-100 rounded px-1 -mx-1 transition-colors"
                  >
                    <span className="font-mono font-bold text-stone-600">{formatDice(val as number)}</span>
                    {displayBonus !== 0 && (
                      <span className={`text-base font-black ${displayBonus > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {displayBonus > 0 ? '+' : ''}{displayBonus}
                      </span>
                    )}
                  </button>
                  <div className="flex items-center gap-x-2 gap-y-1 flex-wrap">
                    {bonus.situational.map((sit, idx) => (
                      <span key={idx} className={`text-[10px] font-bold leading-none ${sit.value > 0 ? 'text-emerald-500' : 'text-red-600'}`}>
                        ({sit.value > 0 ? '+' : ''}{sit.value} {sit.note})
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
            {SKILLS.filter(s => s.isBasic && !character.skills[s.name]).map(s => {
              const bonus = getSkillBonus(character, s.name);
              const displayBonus = bonus.generalValue - totalPenalty;
              return (
                <div key={s.name} className="flex items-start py-2 border-b border-stone-100 gap-4 group">
                  <div className="w-32 shrink-0">
                    <div className="font-bold text-stone-700">{s.name}</div>
                    <button 
                      onClick={() => setSelectedTrait({ name: s.name, description: s.description, type: 'Habilidad Básica' })}
                      className="text-[9px] text-stone-400 hover:text-stone-900 flex items-center gap-1 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Info size={10} /> Info
                    </button>
                  </div>
                  <button 
                    onClick={() => performRoll(s.name, 'd4', true, bonus.generalValue, true, bonus.modifiers)}
                    className="flex items-center gap-1 shrink-0 w-20 hover:bg-stone-100 rounded px-1 -mx-1 transition-colors"
                  >
                    <span className="font-mono font-bold text-stone-500">d4</span>
                    {displayBonus !== 0 && (
                      <span className={`text-base font-black ${displayBonus > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {displayBonus > 0 ? '+' : ''}{displayBonus}
                      </span>
                    )}
                  </button>
                  <div className="flex items-center gap-x-2 gap-y-1 flex-wrap">
                    {bonus.situational.map((sit, idx) => (
                      <span key={idx} className={`text-[10px] font-bold leading-none ${sit.value > 0 ? 'text-emerald-500' : 'text-red-600'}`}>
                        ({sit.value > 0 ? '+' : ''}{sit.value} {sit.note})
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section className="space-y-6">
          <SectionTitle icon={<Shield size={20} className="text-red-500" />} title="Desventajas" />
          <div className="flex flex-wrap gap-2">
            {[...character.hindrances].sort(sortByName).map((h, i) => (
              <button 
                key={i} 
                onClick={() => setSelectedTrait({ name: h.name, description: h.description, type: `Desventaja ${h.type}` })}
                className="px-4 py-2 bg-red-50 border border-red-100 rounded-lg text-sm font-bold text-red-700 hover:bg-red-100 transition-all active:scale-95 text-left"
              >
                {h.name} ({h.type})
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <SectionTitle icon={<Award size={20} className="text-emerald-500" />} title="Ventajas" />
          <div className="flex flex-wrap gap-2">
            {[...character.edges].sort(sortByName).map((e, i) => {
              const improved = isImprovedEdge(e.name);
              return (
                <button 
                  key={i} 
                  onClick={() => setSelectedTrait({ name: e.name, description: e.effects, type: 'Ventaja', requirements: e.requirements })}
                  className={`px-4 py-2 border rounded-lg text-sm font-bold shadow-sm transition-all active:scale-95 text-left flex items-center gap-2 ${
                    improved 
                      ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100' 
                      : 'bg-emerald-50 border-emerald-100 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  {e.name}
                  {improved && <span className="text-[8px] bg-amber-200 text-amber-800 px-1 py-0.5 rounded-full uppercase tracking-tighter">Mejorada</span>}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section className="space-y-6">
          <SectionTitle icon={<Sword size={20} className="text-stone-500" />} title="Combate" />
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-widest text-stone-400">Armas</h4>
                <button onClick={() => setIsAddingWeapon(true)} className="p-1 text-stone-400 hover:text-stone-900 transition-colors"><Plus size={16} /></button>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {character.weapons?.map((w, idx) => (
                  <div key={idx} className="p-4 bg-white border border-stone-200 rounded-xl shadow-sm group relative">
                    <button onClick={() => removeWeapon(idx)} className="absolute top-2 right-2 p-1 text-stone-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={14} /></button>
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-black text-stone-900 uppercase tracking-tight">{w.name}</div>
                      <button onClick={() => {
                        const bonus = getDamageBonus(character, w.name);
                        performRoll(`Daño: ${w.name}`, w.damage, false, bonus.generalValue, true, bonus.modifiers);
                      }} className="px-3 py-1 bg-stone-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-stone-800 transition-colors">Dañar</button>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                      <div>Daño: <span className="text-stone-900">{w.damage}</span></div>
                      {w.range && <div>Alcance: <span className="text-stone-900">{w.range}</span></div>}
                      {w.ap !== 0 && <div>AP: <span className="text-stone-900">{w.ap}</span></div>}
                    </div>
                    {w.notes && <p className="text-[10px] text-stone-400 italic mt-2">{w.notes}</p>}
                  </div>
                ))}
                {(!character.weapons || character.weapons.length === 0) && <p className="text-xs text-stone-400 italic">Sin armas registradas.</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-widest text-stone-400">Armadura</h4>
                  <button onClick={() => setIsAddingArmor(true)} className="p-1 text-stone-400 hover:text-stone-900 transition-colors"><Plus size={16} /></button>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {character.armor?.map((a, idx) => (
                    <div key={idx} className="p-3 bg-white border border-stone-200 rounded-xl shadow-sm group relative">
                      <button onClick={() => removeArmor(idx)} className="absolute top-2 right-2 p-1 text-stone-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={14} /></button>
                      <div className="font-bold text-stone-900 text-sm">{a.name}</div>
                      <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Bono: +{a.bonus}</div>
                    </div>
                  ))}
                  {(!character.armor || character.armor.length === 0) && <p className="text-xs text-stone-400 italic">Sin armadura registrada.</p>}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-widest text-stone-400">Escudo</h4>
                  {!character.shield ? (
                    <button onClick={() => setIsAddingShield(true)} className="p-1 text-stone-400 hover:text-stone-900 transition-colors"><Plus size={16} /></button>
                  ) : (
                    <button onClick={removeShield} className="p-1 text-stone-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  )}
                </div>
                {character.shield ? (
                  <div className="p-3 bg-white border border-stone-200 rounded-xl shadow-sm">
                    <div className="font-bold text-stone-900 text-sm">{character.shield.name}</div>
                    <div className="flex gap-4 text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                      <div>Parada: +{character.shield.parryBonus}</div>
                      <div>Cobertura: +{character.shield.coverBonus}</div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-stone-400 italic">Sin escudo registrado.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionTitle icon={<Backpack size={20} className="text-blue-500" />} title="Equipo" />
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newGearItemLocal}
                onChange={(e) => setNewGearItemLocal(e.target.value)}
                placeholder="Añadir objeto..."
                className="flex-1 p-2 bg-stone-50 border border-stone-200 rounded-lg text-sm"
                onKeyDown={(e) => e.key === 'Enter' && handleAddGearLocal()}
              />
              <button onClick={handleAddGearLocal} className="p-2 bg-stone-900 text-white rounded-lg"><Plus size={16} /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {character.gear.map((item, idx) => (
                <div key={idx} className="p-3 bg-white border border-stone-200 rounded-xl text-stone-700 font-medium flex justify-between items-center group">
                  <span className="text-sm">{item}</span>
                  <button onClick={() => removeGear(idx)} className="text-stone-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={14} /></button>
                </div>
              ))}
              {character.gear.length === 0 && (
                <p className="text-stone-400 italic col-span-full">Sin equipo registrado.</p>
              )}
            </div>
          </div>
        </section>
      </div>

      {character.advancesList && character.advancesList.length > 0 && (
        <section className="space-y-6 pt-10 border-t border-stone-200">
          <div className="flex items-center justify-between">
            <SectionTitle icon={<TrendingUp size={20} className="text-stone-500" />} title="Historial de Avances" />
            <button 
              onClick={() => {
                const newChar = { ...character };
                const lastAdvance = newChar.advancesList?.[newChar.advancesList.length - 1];
                if (!lastAdvance) return;

                // Reverse changes based on type
                if (lastAdvance.type === 'Attribute') {
                  const attr = lastAdvance.details.attribute as keyof typeof newChar.attributes;
                  newChar.attributes[attr] = downgradeDie(newChar.attributes[attr]);
                } else if (lastAdvance.type === 'Skills') {
                  const skills = lastAdvance.details.skills as string[];
                  skills.forEach(s => {
                    newChar.skills[s] = downgradeDie(newChar.skills[s]);
                  });
                } else if (lastAdvance.type === 'Edge') {
                  const edge = lastAdvance.details.edge as Edge;
                  newChar.edges = newChar.edges.filter(e => e.name !== edge.name);
                } else if (lastAdvance.type === 'NewSkill') {
                  const skillName = lastAdvance.details.skillName as string;
                  delete newChar.skills[skillName];
                }

                newChar.advancesList = newChar.advancesList?.slice(0, -1);
                newChar.advances = (newChar.advances || 0) - 1;
                
                // Recalculate resources that might change when undoing advances (like Bennies from 'Afortunado')
                const oldBenniesMax = calculateStartingBennies(character);
                const newBenniesMax = calculateStartingBennies(newChar);
                const benniesDelta = newBenniesMax - oldBenniesMax;
                if (benniesDelta !== 0) {
                  newChar.bennies = (newChar.bennies !== undefined ? newChar.bennies : oldBenniesMax) + benniesDelta;
                }

                newChar.derived = calculateDerived(newChar);
                onUpdate(newChar);
              }}
              className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors"
            >
              Deshacer último avance
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {character.advancesList.map((adv, i) => (
              <div key={adv.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-100 flex flex-col gap-1 group hover:bg-stone-100 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-black text-stone-900 uppercase tracking-tight">{adv.description}</div>
                  <div className="text-[10px] font-black text-stone-300 uppercase tracking-widest">Avance {i + 1}</div>
                </div>
                <div className="text-[9px] text-stone-400 font-bold uppercase tracking-widest">{getRank(i + 1)}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <AnimatePresence>
        {isAddingWeapon && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-stone-100">
              <h3 className="text-2xl font-black mb-6 uppercase tracking-tighter">Nueva Arma</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Nombre</label>
                  <input type="text" value={newWeapon.name} onChange={e => setNewWeapon({...newWeapon, name: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-900 transition-colors" placeholder="Ej: Espada Larga" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Daño</label>
                    <input type="text" value={newWeapon.damage} onChange={e => setNewWeapon({...newWeapon, damage: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-900 transition-colors" placeholder="Ej: Fue+d8" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">AP</label>
                    <input type="number" value={newWeapon.ap} onChange={e => setNewWeapon({...newWeapon, ap: parseInt(e.target.value) || 0})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-900 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Alcance</label>
                  <input type="text" value={newWeapon.range} onChange={e => setNewWeapon({...newWeapon, range: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-900 transition-colors" placeholder="Ej: 12/24/48" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Notas</label>
                  <textarea value={newWeapon.notes} onChange={e => setNewWeapon({...newWeapon, notes: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-900 transition-colors h-20 resize-none" placeholder="Propiedades especiales..." />
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setIsAddingWeapon(false)} className="flex-1 py-4 bg-stone-100 text-stone-600 rounded-2xl font-bold hover:bg-stone-200 transition-colors uppercase tracking-widest text-xs">Cancelar</button>
                <button onClick={handleAddWeapon} className="flex-1 py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-800 transition-colors uppercase tracking-widest text-xs">Guardar</button>
              </div>
            </motion.div>
          </div>
        )}

        {isAddingArmor && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-stone-100">
              <h3 className="text-2xl font-black mb-6 uppercase tracking-tighter">Nueva Armadura</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Nombre</label>
                  <input type="text" value={newArmor.name} onChange={e => setNewArmor({...newArmor, name: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-900 transition-colors" placeholder="Ej: Cota de Malla" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Bono de Armadura</label>
                  <input type="number" value={newArmor.bonus} onChange={e => setNewArmor({...newArmor, bonus: parseInt(e.target.value) || 0})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-900 transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Notas</label>
                  <textarea value={newArmor.notes} onChange={e => setNewArmor({...newArmor, notes: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-900 transition-colors h-20 resize-none" placeholder="Propiedades especiales..." />
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setIsAddingArmor(false)} className="flex-1 py-4 bg-stone-100 text-stone-600 rounded-2xl font-bold hover:bg-stone-200 transition-colors uppercase tracking-widest text-xs">Cancelar</button>
                <button onClick={handleAddArmor} className="flex-1 py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-800 transition-colors uppercase tracking-widest text-xs">Guardar</button>
              </div>
            </motion.div>
          </div>
        )}

        {isAddingShield && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-stone-100">
              <h3 className="text-2xl font-black mb-6 uppercase tracking-tighter">Nuevo Escudo</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Nombre</label>
                  <input type="text" value={newShield.name} onChange={e => setNewShield({...newShield, name: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-900 transition-colors" placeholder="Ej: Escudo Mediano" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Bono Parada</label>
                    <input type="number" value={newShield.parryBonus} onChange={e => setNewShield({...newShield, parryBonus: parseInt(e.target.value) || 0})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-900 transition-colors" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Bono Cobertura</label>
                    <input type="number" value={newShield.coverBonus} onChange={e => setNewShield({...newShield, coverBonus: parseInt(e.target.value) || 0})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-900 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Notas</label>
                  <textarea value={newShield.notes} onChange={e => setNewShield({...newShield, notes: e.target.value})} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-900 transition-colors h-20 resize-none" placeholder="Propiedades especiales..." />
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setIsAddingShield(false)} className="flex-1 py-4 bg-stone-100 text-stone-600 rounded-2xl font-bold hover:bg-stone-200 transition-colors uppercase tracking-widest text-xs">Cancelar</button>
                <button onClick={handleAddShield} className="flex-1 py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-800 transition-colors uppercase tracking-widest text-xs">Guardar</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DerivedStat({ label, value, onClick, bonus, situational, onInfo }: { label: string, value: number | string, onClick?: () => void, bonus?: number, situational?: SituationalBonus[], onInfo?: () => void }) {
  return (
    <div className="relative group">
      <div 
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
        className="flex flex-col items-center justify-center w-full h-24 bg-white border-2 border-stone-900 rounded-2xl shadow-lg hover:bg-stone-50 transition-all active:scale-95 cursor-pointer"
      >
        <span className="text-[10px] font-black uppercase text-stone-400 group-hover:text-stone-600">{label}</span>
        <div className="flex flex-col items-center">
          <div className="flex items-baseline">
            <span className="text-3xl font-black text-stone-900">{value}</span>
            {bonus !== undefined && bonus !== 0 && (
              <span className={`text-sm ml-1 font-bold ${bonus > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {bonus > 0 ? '+' : ''}{bonus}
              </span>
            )}
          </div>
          {situational && situational.length > 0 && (
            <div className="flex flex-col items-center mt-1">
              {situational.map((sit, idx) => (
                <span key={idx} className={`text-[10px] font-bold leading-none ${sit.value > 0 ? 'text-emerald-500' : 'text-red-600'}`}>
                  ({sit.value > 0 ? '+' : ''}{sit.value} {sit.note})
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {onInfo && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onInfo();
          }}
          className="absolute top-2 right-2 p-1 text-stone-300 hover:text-stone-900 transition-colors"
          title={`Info sobre ${label}`}
        >
          <Info size={12} />
        </button>
      )}
    </div>
  );
}

function TrackingToken({ icon, label, value, color, onAdd, onSub, statusLabel }: { 
  icon: React.ReactNode, 
  label: string, 
  value: number, 
  color: string,
  onAdd: () => void,
  onSub: () => void,
  statusLabel?: string
}) {
  return (
    <div className={`p-4 rounded-2xl border ${color} flex flex-col items-center gap-2 relative group`}>
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-widest opacity-70">{label}</span>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={onSub}
          className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center hover:bg-white transition-colors shadow-sm active:scale-90"
        >
          <Minus size={16} />
        </button>
        <span className="text-3xl font-black tabular-nums">{value}</span>
        <button 
          onClick={onAdd}
          className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center hover:bg-white transition-colors shadow-sm active:scale-90"
        >
          <Plus size={16} />
        </button>
      </div>
      {statusLabel && (
        <div className="text-[9px] font-black uppercase tracking-tighter mt-1 opacity-80">
          {statusLabel}
        </div>
      )}
    </div>
  );
}

function SectionTitle({ icon, title, extra }: { icon: React.ReactNode, title: string, extra?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-stone-900">{icon}</div>
      <h3 className="text-xl font-black uppercase tracking-tighter text-stone-900">{title}</h3>
      {extra}
    </div>
  );
}
