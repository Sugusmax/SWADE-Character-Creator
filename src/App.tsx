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
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Character, Dice, Species, Skill, Hindrance, Edge } from './types';
import { SPECIES, ATTRIBUTES, SKILLS, HINDRANCES, EDGES } from './data';

const STEPS = [
  'Concepto',
  'Especie',
  'Desventajas',
  'Atributos',
  'Habilidades',
  'Ventajas',
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
  return spent - (char.spentHindrancePoints?.attributes || 0);
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

const checkRequirements = (char: Character, requirements: string): { met: boolean; reason?: string } => {
  if (requirements === 'Novato') return { met: true };
  
  const parts = requirements.split(',').map(p => p.trim());
  const unmet: string[] = [];

  for (const part of parts) {
    if (part === 'Novato') continue;
    
    // Check for "Mando" (Edge requirement)
    if (part === 'Mando') {
      if (!char.edges.some(e => e.name === 'Mando')) {
        unmet.push('Ventaja: Mando');
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
        // Special case for "Habilidad de combate"
        if (name === 'Habilidad de combate') {
          const pelea = char.skills['Pelear'] || 0;
          const disparar = char.skills['Disparar'] || 0;
          if (pelea < minVal && disparar < minVal) {
            unmet.push(`Pelear o Disparar ${formatDice(minVal)}+`);
          }
        } else {
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

const getSkillBonus = (char: Character, skillName: string): number => {
  let bonus = 0;
  
  // Global penalties
  if (char.hindrances.some(h => h.name === 'Ciego')) bonus -= 6;

  // Edges
  if (char.edges.some(e => e.name === 'Alerta') && skillName === 'Notar') bonus += 2;
  if (char.edges.some(e => e.name === 'Atractivo') && (skillName === 'Persuadir' || skillName === 'Interpretar')) bonus += 1;
  if (char.edges.some(e => e.name === 'Curandero') && skillName === 'Sanar') bonus += 2;
  if (char.edges.some(e => e.name === 'As') && ['Conducir', 'Pilotar', 'Navegar'].includes(skillName)) bonus += 2;
  if (char.edges.some(e => e.name === 'Acaparador') && skillName === 'Notar') bonus += 2;
  if (char.edges.some(e => e.name === 'Ladrón') && (skillName === 'Sigilo' || skillName === 'Atletismo')) bonus += 2;
  if (char.edges.some(e => e.name === 'Sentir el Peligro') && skillName === 'Notar') bonus += 2;
  
  // Hindrances
  if (char.hindrances.some(h => h.name === 'Apacible') && skillName === 'Intimidar') bonus -= 2;
  if (char.hindrances.some(h => h.name === 'Canalla') && skillName === 'Persuadir') bonus -= 2;
  if (char.hindrances.some(h => h.name === 'Corto de Vista' && h.type === 'Mayor') && skillName === 'Notar') bonus -= 2;
  if (char.hindrances.some(h => h.name === 'Corto de Vista' && h.type === 'Menor') && skillName === 'Notar') bonus -= 1;
  if (char.hindrances.some(h => h.name === 'Cojo' && h.type === 'Mayor') && skillName === 'Atletismo') bonus -= 2;
  if (char.hindrances.some(h => h.name === 'Despistado')) {
    if (skillName === 'Notar' || skillName === 'Conocimientos Generales') bonus -= 2;
  }
  if (char.hindrances.some(h => h.name === 'Feo' && h.type === 'Mayor') && skillName === 'Persuadir') bonus -= 2;
  if (char.hindrances.some(h => h.name === 'Feo' && h.type === 'Menor') && skillName === 'Persuadir') bonus -= 1;
  if (char.hindrances.some(h => h.name === 'Hábito' && h.type === 'Menor') && skillName === 'Persuadir') bonus -= 1;
  if (char.hindrances.some(h => h.name === 'Delirio' && h.type === 'Mayor') && skillName === 'Persuadir') bonus -= 2;
  if (char.hindrances.some(h => h.name === 'Delirio' && h.type === 'Menor') && skillName === 'Persuadir') bonus -= 1;
  if (char.hindrances.some(h => h.name === 'Manazas') && skillName === 'Reparar') bonus -= 2;
  if (char.hindrances.some(h => h.name === 'Marginado') && skillName === 'Persuadir') bonus -= 2;
  if (char.hindrances.some(h => h.name === 'Patoso') && (skillName === 'Sigilo' || skillName === 'Atletismo')) bonus -= 2;
  if (char.hindrances.some(h => h.name === 'Sanguinario') && skillName === 'Persuadir') bonus -= 4;
  if (char.hindrances.some(h => h.name === 'Sordo' && h.type === 'Mayor') && skillName === 'Notar') bonus -= 4;
  if (char.hindrances.some(h => h.name === 'Sordo' && h.type === 'Menor') && skillName === 'Notar') bonus -= 2;
  if (char.hindrances.some(h => h.name === 'Suspicaz') && skillName === 'Persuadir') bonus -= 1;
  if (char.hindrances.some(h => h.name === 'Tuerto') && (skillName === 'Disparar' || skillName === 'Conducir')) bonus -= 2;

  // Species abilities
  if (char.species === 'Androide' && skillName === 'Persuadir') bonus -= 2;
  if (char.species === 'Aviano' && skillName === 'Atletismo') bonus -= 2;
  if (char.species === 'Rakhasa' && skillName === 'Atletismo') bonus -= 2;
  if (char.species === 'Saurio' && skillName === 'Persuadir') bonus -= 2;
  if (char.species === 'Semielfo' && skillName === 'Persuadir') bonus -= 2;

  return bonus;
};

const getAttributeBonus = (char: Character, attrName: string): number => {
  let bonus = 0;
  if (char.hindrances.some(h => h.name === 'Ciego')) bonus -= 6;
  if (char.hindrances.some(h => h.name === 'Anciano') && (attrName === 'Fuerza' || attrName === 'Vigor')) bonus -= 1;
  if (char.hindrances.some(h => h.name === 'Anémico') && attrName === 'Vigor') bonus -= 1;
  if (char.hindrances.some(h => h.name === 'Apocado') && attrName === 'Espíritu') bonus -= 2;
  return bonus;
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
    setCharacters(prev => {
      const index = prev.findIndex(c => c.id === currentCharacter.id);
      if (index >= 0) {
        const next = [...prev];
        next[index] = currentCharacter;
        return next;
      }
      return [...prev, currentCharacter];
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
          setCharacters(prev => [...prev, { ...char, id: crypto.randomUUID() }]);
        }
      } catch (err) {
        console.error('Failed to import character', err);
      }
    };
    reader.readAsText(file);
  };

  const calculateDerived = (char: Character) => {
    const vig = char.attributes.Vigor;
    const pelear = char.skills['Pelear'] || 0;
    
    let toughness = 2 + (Math.floor(Math.min(vig, 12) / 2));
    let size = 0;
    let pace = 6;
    let parry = 2 + (Math.floor(Math.min(pelear, 12) / 2));
    let runningDie = 6;

    // Species base
    if (char.species === 'Aviano') { pace = 5; runningDie = 4; toughness -= 1; }
    if (char.species === 'Enano') { pace = 5; runningDie = 4; }
    if (char.species === 'Mediano') { size -= 1; toughness -= 1; pace = 5; runningDie = 4; }
    if (char.species === 'Acuariano') toughness += 1;
    if (char.species === 'Saurio') toughness += 2; // Armadura +2

    // Edges
    if (char.edges.some(e => e.name === 'Fornido')) { size += 1; toughness += 1; }
    if (char.edges.some(e => e.name === 'Pies Ligeros')) { pace += 2; runningDie = 8; }
    if (char.edges.some(e => e.name === 'Bloqueo')) parry += 1;
    if (char.edges.some(e => e.name === 'Arma Distintiva')) parry += 1;
    if (char.edges.some(e => e.name === 'Acróbata')) parry += 1;
    
    // Hindrances
    if (char.hindrances.some(h => h.name === 'Obeso')) { size += 1; toughness += 1; pace -= 1; runningDie = 4; }
    if (char.hindrances.some(h => h.name === 'Pequeño' || h.name === 'Menudo')) { size -= 1; toughness -= 1; }
    if (char.hindrances.some(h => h.name === 'Joven' && h.type === 'Menor')) { size -= 1; toughness -= 1; }
    if (char.hindrances.some(h => h.name === 'Joven' && h.type === 'Mayor')) { size -= 2; toughness -= 2; }
    if (char.hindrances.some(h => h.name === 'Anciano')) pace -= 1;
    if (char.hindrances.some(h => h.name === 'Cojo' && h.type === 'Menor')) { pace -= 1; runningDie = 4; }
    if (char.hindrances.some(h => h.name === 'Cojo' && h.type === 'Mayor')) { pace -= 2; runningDie = 4; }
    if (char.hindrances.some(h => h.name === 'Ciego')) { pace = Math.max(1, Math.floor(pace / 2)); }

    return {
      Paso: pace,
      Parada: parry,
      Dureza: toughness,
      Tamaño: size,
      DadoCarrera: formatDice(runningDie),
    };
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
    if (currentStep < STEPS.length - 1) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
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
          <CharacterSheetView character={viewingCharacter} />
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
                    setPreviewEdgeName
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex justify-between">
              <button 
                onClick={prevStep}
                disabled={currentStep === 0}
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
                        return calculateAttributePointsSpent(currentCharacter) > 5;
                      }
                      if (currentStep === 4) { // Habilidades
                        const { basicNeeded } = calculateSkillPointsSpent(currentCharacter);
                        const isYoung = currentCharacter.hindrances.some(h => h.name === 'Joven');
                        return basicNeeded > (isYoung ? 10 : 12);
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
                        onClick={() => setViewingCharacter(char)}
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
                        onClick={() => deleteCharacter(char.id)}
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
  }
) {
  const { 
    previewHindranceName, 
    setPreviewHindranceName, 
    previewHindranceType, 
    setPreviewHindranceType,
    setPendingHindranceSpend,
    previewEdgeName,
    setPreviewEdgeName
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
              placeholder="Ej: Red, el Bárbaro"
              className="w-full text-4xl font-bold border-b-2 border-stone-200 focus:border-stone-900 outline-none py-2 transition-colors placeholder:text-stone-200"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-stone-400">Concepto</label>
            <textarea 
              value={char.concept}
              onChange={e => update({ concept: e.target.value })}
              placeholder="Describe brevemente quién es tu personaje..."
              className="w-full text-xl border-stone-200 focus:border-stone-900 outline-none py-2 transition-colors min-h-[150px] resize-none placeholder:text-stone-200"
            />
          </div>
        </div>
      );
    case 1: // Especie
      return (
        <div className="flex flex-col md:flex-row gap-8 h-full min-h-[600px]">
          <div className="w-full md:w-1/3 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
            <label className="text-xs font-black uppercase tracking-widest text-stone-400 mb-4 block">Selecciona una Especie</label>
            {SPECIES.map(s => (
              <button
                key={s.name}
                onClick={() => update({ species: s.name })}
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
                    <h4 className="text-xs font-black uppercase tracking-widest text-stone-400 border-b border-stone-200 pb-2">Capacidades de Especie</h4>
                    <div className="space-y-6">
                      {s.abilities.map((a, i) => (
                        <div key={i} className="space-y-1">
                          <div className="font-black text-stone-900 uppercase text-sm tracking-tight">{a.name}</div>
                          <p className="text-stone-700 text-sm leading-relaxed">{a.description}</p>
                        </div>
                      ))}
                    </div>
                    {s.heritageChoices && (
                      <div className="space-y-4 pt-4 border-t border-stone-200">
                        <h4 className="text-xs font-black uppercase tracking-widest text-stone-400">Elige tu Herencia</h4>
                        <div className="grid grid-cols-1 gap-3">
                          {s.heritageChoices.map(choice => (
                            <button
                              key={choice.name}
                              onClick={() => update({ heritageChoice: choice.name })}
                              className={`p-4 rounded-xl border-2 text-left transition-all ${
                                char.heritageChoice === choice.name
                                  ? 'border-stone-900 bg-stone-900 text-white shadow-md'
                                  : 'border-stone-100 bg-white hover:border-stone-300 text-stone-700'
                              }`}
                            >
                              <div className="font-bold text-sm">{choice.name}</div>
                              <div className={`text-xs mt-1 ${char.heritageChoice === choice.name ? 'text-stone-300' : 'text-stone-500'}`}>
                                {choice.description}
                              </div>
                            </button>
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
      const uniqueHindranceNames = Array.from(new Set(HINDRANCES.map(h => h.name))).sort();
      const selectedHindranceData = HINDRANCES.filter(h => h.name === previewHindranceName);
      const availableTypes = selectedHindranceData.map(h => h.type);
      const currentPreview = selectedHindranceData.find(h => h.type === previewHindranceType) || selectedHindranceData[0];

      return (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {char.hindrances.map((h, i) => (
              <div key={i} className="px-4 py-2 bg-red-50 border border-red-100 text-red-700 rounded-full flex items-center gap-2 text-sm font-bold shadow-sm">
                <span>{h.name} ({h.type})</span>
                <button onClick={() => update({ hindrances: char.hindrances.filter((_, idx) => idx !== i) })}>
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
                    update({ hindrances: [...char.hindrances, currentPreview] });
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
                  <p className="text-sm font-bold">Puntos Atributo: {pointsSpent_Attr} / {totalAllowed_Attr}</p>
                  {char.spentHindrancePoints?.attributes > 0 && pointsSpent_Attr < totalAllowed_Attr && (
                    <button 
                      onClick={() => {
                        update({ 
                          spentHindrancePoints: { 
                            ...char.spentHindrancePoints, 
                            attributes: Math.max(0, char.spentHindrancePoints.attributes - 1) 
                          } 
                        });
                      }}
                      className="text-[10px] bg-stone-200 hover:bg-stone-300 px-2 py-0.5 rounded text-stone-700 font-bold"
                    >
                      REEMBOLSAR HP
                    </button>
                  )}
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
                          const nextSpentHP = { ...char.spentHindrancePoints };
                          if (nextSpentHP.attributes > 0) {
                            nextSpentHP.attributes -= 1;
                          }
                          update({ attributes: nextAttributes, spentHindrancePoints: nextSpentHP });
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
                  <p className="text-sm font-bold">Puntos Habilidad: {basicNeeded} / {totalAllowed_Skills}</p>
                  {char.spentHindrancePoints?.skills > 0 && basicNeeded < totalAllowed_Skills && (
                    <button 
                      onClick={() => {
                        update({ 
                          spentHindrancePoints: { 
                            ...char.spentHindrancePoints, 
                            skills: Math.max(0, char.spentHindrancePoints.skills - 1) 
                          } 
                        });
                      }}
                      className="text-[10px] bg-stone-200 hover:bg-stone-300 px-2 py-0.5 rounded text-stone-700 font-bold"
                    >
                      REEMBOLSAR HP
                    </button>
                  )}
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
            {SKILLS.map(skill => {
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
                          
                          update({ skills: nextSkills });
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
      const totalHP_Edges = calculateHindrancePoints(char.hindrances);
      const spentHP_Edges = (char.spentHindrancePoints?.attributes || 0) * 2 + 
                             (char.spentHindrancePoints?.skills || 0) * 1 + 
                             (char.spentHindrancePoints?.edges || 0) * 2;
      const availableHP_Edges = totalHP_Edges - spentHP_Edges;
      
      const freeEdges = char.species === 'Humano' ? 1 : 0;
      const currentEdgesCount = char.edges.length;
      const canPickFree = currentEdgesCount < freeEdges;
      
      const selectedEdge = EDGES.find(e => e.name === previewEdgeName);
      const alreadyHasEdge = char.edges.some(e => e.name === previewEdgeName);

      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-3 text-stone-600">
              <Shield size={20} />
              <div className="flex-1">
                <p className="text-sm font-bold">Ventajas Gratuitas: {Math.min(freeEdges, currentEdgesCount)} / {freeEdges}</p>
                <p className="text-xs">{char.species === 'Humano' ? 'Los humanos reciben una ventaja gratuita.' : 'Tu especie no tiene ventajas gratuitas.'}</p>
              </div>
            </div>
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-3 text-stone-600">
              <Dice5 size={20} />
              <div className="flex-1">
                <p className="text-sm font-bold">Puntos de Desventajas: {availableHP_Edges} / {totalHP_Edges}</p>
                <p className="text-xs">Cada ventaja adicional cuesta 2 puntos de desventaja.</p>
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
                  {EDGES.map(e => {
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
                            update({ edges: [...char.edges, selectedEdge] });
                            setPreviewEdgeName('');
                          } else if (availableHP_Edges >= 2) {
                            setPendingHindranceSpend({
                              type: 'edge',
                              cost: 2,
                              onConfirm: () => {
                                update({ 
                                  edges: [...char.edges, selectedEdge],
                                  spentHindrancePoints: { ...char.spentHindrancePoints, edges: (char.spentHindrancePoints.edges || 0) + 1 }
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
              {char.edges.map((edge, index) => (
                <div key={`${edge.name}-${index}`} className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between group hover:border-emerald-300 transition-all">
                  <div>
                    <div className="font-bold text-emerald-900">{edge.name}</div>
                    <div className="text-[10px] text-emerald-600 font-bold uppercase">{edge.requirements}</div>
                  </div>
                  <button 
                    onClick={() => {
                      const nextEdges = [...char.edges];
                      nextEdges.splice(index, 1);
                      
                      const nextSpentHP = { ...char.spentHindrancePoints };
                      if (index >= freeEdges && nextSpentHP.edges > 0) {
                        nextSpentHP.edges -= 1;
                      }
                      
                      update({ edges: nextEdges, spentHindrancePoints: nextSpentHP });
                    }}
                    className="p-2 text-emerald-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
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

function CharacterSheetView({ character }: { character: Character }) {
  const [selectedTrait, setSelectedTrait] = useState<{ name: string, description: string, type?: string, requirements?: string } | null>(null);
  const speciesData = useMemo(() => SPECIES.find(s => s.name === character.species), [character.species]);

  return (
    <div className="p-8 space-y-10 relative">
      <AnimatePresence>
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
      </AnimatePresence>

      <div className="flex flex-col md:flex-row justify-between gap-8 border-b border-stone-100 pb-10">
        <div className="space-y-4">
          <h1 className="text-5xl font-black tracking-tighter uppercase text-stone-900">{character.name}</h1>
          <p className="text-xl text-stone-500 font-medium italic">{character.concept}</p>
          <div className="flex flex-wrap gap-2">
            <div className="inline-block px-4 py-1 bg-stone-900 text-white text-xs font-black uppercase tracking-widest rounded-full">
              {character.species}
            </div>
            {character.heritageChoice && (
              <div className="inline-block px-4 py-1 bg-stone-200 text-stone-700 text-xs font-black uppercase tracking-widest rounded-full">
                {character.heritageChoice}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <DerivedStat 
            label="Paso" 
            value={character.derived.Paso} 
            onClick={() => setSelectedTrait({ name: 'Paso', description: DERIVED_DESCRIPTIONS['Paso'], type: 'Estadística Derivada' })}
          />
          <DerivedStat 
            label="Carrera" 
            value={character.derived.DadoCarrera} 
            onClick={() => setSelectedTrait({ name: 'Carrera', description: DERIVED_DESCRIPTIONS['Carrera'], type: 'Estadística Derivada' })}
          />
          <DerivedStat 
            label="Parada" 
            value={character.derived.Parada} 
            onClick={() => setSelectedTrait({ name: 'Parada', description: DERIVED_DESCRIPTIONS['Parada'], type: 'Estadística Derivada' })}
          />
          <DerivedStat 
            label="Dureza" 
            value={character.derived.Dureza} 
            onClick={() => setSelectedTrait({ name: 'Dureza', description: DERIVED_DESCRIPTIONS['Dureza'], type: 'Estadística Derivada' })}
          />
        </div>
      </div>

      {speciesData && (
        <section className="p-6 bg-stone-50 rounded-2xl border border-stone-100 space-y-6">
          <SectionTitle icon={<User size={20} className="text-stone-400" />} title="Capacidades de Especie" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {speciesData.abilities.map((a, i) => (
              <button 
                key={i} 
                onClick={() => setSelectedTrait({ name: a.name, description: a.description, type: 'Capacidad de Especie' })}
                className="text-left space-y-1 p-2 -m-2 rounded-lg hover:bg-stone-100 transition-colors group"
              >
                <div className="text-sm font-black text-stone-900 uppercase tracking-tight group-hover:text-stone-700">{a.name}</div>
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">{a.description}</p>
              </button>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section className="space-y-6">
          <SectionTitle icon={<Zap size={20} className="text-amber-500" />} title="Atributos" />
          <div className="grid grid-cols-1 gap-3">
            {Object.entries(character.attributes).map(([name, val]) => (
              <button 
                key={name} 
                onClick={() => setSelectedTrait({ name, description: ATTRIBUTE_DESCRIPTIONS[name], type: 'Atributo' })}
                className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-100 hover:bg-stone-100 transition-all active:scale-[0.98] group"
              >
                <span className="font-bold text-stone-500 uppercase text-xs tracking-widest group-hover:text-stone-700">{name}</span>
                <span className="font-mono font-black text-2xl">
                  {formatDice(val)}
                  {getAttributeBonus(character, name) !== 0 && (
                    <span className={`text-lg ml-1 ${getAttributeBonus(character, name) > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {getAttributeBonus(character, name) > 0 ? '+' : ''}{getAttributeBonus(character, name)}
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <SectionTitle icon={<Sword size={20} className="text-stone-500" />} title="Habilidades" />
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(character.skills).map(([name, val]) => (
              <div key={name} className="flex items-center justify-between p-3 bg-white border border-stone-100 rounded-lg shadow-sm">
                <span className="font-bold text-stone-800">{name}</span>
                <span className="font-mono font-bold text-stone-600">
                  {formatDice(val as number)}
                  {getSkillBonus(character, name) !== 0 && (
                    <span className={`text-sm ml-1 font-bold ${getSkillBonus(character, name) > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {getSkillBonus(character, name) > 0 ? '+' : ''}{getSkillBonus(character, name)}
                    </span>
                  )}
                </span>
              </div>
            ))}
            {SKILLS.filter(s => s.isBasic && !character.skills[s.name]).map(s => (
              <div key={s.name} className="flex items-center justify-between p-3 bg-stone-50 border border-stone-100 rounded-lg opacity-60">
                <span className="font-bold text-stone-800">{s.name}</span>
                <span className="font-mono font-bold text-stone-600">
                  d4
                  {getSkillBonus(character, s.name) !== 0 && (
                    <span className={`text-sm ml-1 font-bold ${getSkillBonus(character, s.name) > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {getSkillBonus(character, s.name) > 0 ? '+' : ''}{getSkillBonus(character, s.name)}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section className="space-y-6">
          <SectionTitle icon={<Shield size={20} className="text-red-500" />} title="Desventajas" />
          <div className="flex flex-wrap gap-2">
            {character.hindrances.map((h, i) => (
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
            {character.edges.map((e, i) => (
              <button 
                key={i} 
                onClick={() => setSelectedTrait({ name: e.name, description: e.effects, type: 'Ventaja', requirements: e.requirements })}
                className="px-4 py-2 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-lg text-sm font-bold shadow-sm hover:bg-emerald-100 transition-all active:scale-95 text-left"
              >
                {e.name}
              </button>
            ))}
          </div>
        </section>
      </div>

      <section className="space-y-6">
        <SectionTitle icon={<Backpack size={20} className="text-blue-500" />} title="Equipo" />
        <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100">
          <div className="flex flex-wrap gap-3">
            {character.gear.map((item, i) => (
              <div key={i} className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm font-medium shadow-sm">
                {item}
              </div>
            ))}
            {character.gear.length === 0 && <span className="text-stone-400 italic">Sin equipo...</span>}
          </div>
        </div>
      </section>
    </div>
  );
}

function DerivedStat({ label, value, onClick }: { label: string, value: number | string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center w-24 h-24 bg-white border-2 border-stone-900 rounded-2xl shadow-lg hover:bg-stone-50 transition-all active:scale-95 group"
    >
      <span className="text-[10px] font-black uppercase text-stone-400 group-hover:text-stone-600">{label}</span>
      <span className="text-3xl font-black text-stone-900">{value}</span>
    </button>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode, title: string }) {
  return (
    <div className="flex items-center gap-3 border-b-2 border-stone-900 pb-2">
      <div className="text-stone-900">{icon}</div>
      <h3 className="text-xl font-black uppercase tracking-tighter text-stone-900">{title}</h3>
    </div>
  );
}
