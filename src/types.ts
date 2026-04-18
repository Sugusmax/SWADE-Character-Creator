
export type Dice = 4 | 6 | 8 | 10 | 12 | number; // 13 is d12+1, 14 is d12+2, etc.

export interface Attribute {
  name: string;
  value: Dice;
}

export interface Skill {
  id: string;
  name: string;
  attribute: string;
  value: Dice | 0;
  isBasic: boolean;
  description: string;
}

export interface Hindrance {
  id: string;
  instanceId?: string;
  name: string;
  type: 'Menor' | 'Mayor';
  description: string;
}

export interface AppliedModifier {
  name: string;
  value: number;
}

export interface SituationalBonus {
  value: number;
  note: string;
  target?: string | string[];
}

export interface Edge {
  id: string;
  instanceId?: string;
  name: string;
  requirements: string;
  effects: string;
  replaces?: string;
  modifiers?: AppliedModifier[];
  situationalModifiers?: SituationalBonus[];
}

export interface SpeciesAbility {
  id: string;
  name: string;
  description: string;
}

export interface Species {
  id: string;
  name: string;
  description: string;
  abilities: SpeciesAbility[];
  attributeBonuses?: { [key: string]: Dice };
  skillBonuses?: { [key: string]: Dice };
  heritageChoices?: {
    id: string;
    name: string;
    description: string;
    attributeBonuses: { [key: string]: Dice };
    skillBonuses?: { [key: string]: Dice };
  }[];
}

export interface Advance {
  id: string;
  type: 'Attribute' | 'Skills' | 'Edge' | 'NewSkill';
  description: string;
  details: any;
}

export interface Power {
  id: string;
  instanceId?: string;
  name: string;
  rank: 'Novato' | 'Experimentado' | 'Veterano' | 'Heroico' | 'Legendario';
  points: string;
  range: string;
  duration: string;
  description: string;
}

export interface Weapon {
  instanceId?: string;
  name: string;
  damage: string;
  range?: string;
  ap?: number;
  notes?: string;
}

export interface Armor {
  instanceId?: string;
  name: string;
  bonus: number;
  notes?: string;
}

export interface Shield {
  instanceId?: string;
  name: string;
  parryBonus: number;
  coverBonus: number;
  notes?: string;
}

export interface Character {
  id: string;
  name: string;
  concept: string;
  species: string;
  heritageChoice?: string;
  attributes: {
    Agilidad: Dice;
    Astucia: Dice;
    Espíritu: Dice;
    Fuerza: Dice;
    Vigor: Dice;
  };
  skills: { [key: string]: Dice };
  hindrances: Hindrance[];
  edges: Edge[];
  gear: string[];
  weapons?: Weapon[];
  armor?: Armor[];
  shield?: Shield;
  powers?: Power[];
  powerPoints?: {
    max: number;
    current: number;
  };
  derived: {
    Paso: number;
    Parada: number;
    Dureza: number;
    Tamaño: number;
    DadoCarrera: string;
  };
  spentHindrancePoints: {
    attributes: number;
    skills: number;
    edges: number;
  };
  bennies?: number;
  wounds?: number;
  aturdido?: boolean;
  isBerserk?: boolean;
  berserkRounds?: number;
  fatigue?: number;
  advances?: number;
  advancesList?: Advance[];
  xp?: number;
  studiedSkill?: {
    name: string;
    value: Dice;
  };
}
