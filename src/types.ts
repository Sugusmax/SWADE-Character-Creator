
export type Dice = 4 | 6 | 8 | 10 | 12 | 13 | 14; // 13 is d12+1, 14 is d12+2

export interface Attribute {
  name: string;
  value: Dice;
}

export interface Skill {
  name: string;
  attribute: string;
  value: Dice | 0;
  isBasic: boolean;
  description: string;
}

export interface Hindrance {
  name: string;
  type: 'Menor' | 'Mayor';
  description: string;
}

export interface Edge {
  name: string;
  requirements: string;
  effects: string;
}

export interface SpeciesAbility {
  name: string;
  description: string;
}

export interface Species {
  name: string;
  description: string;
  abilities: SpeciesAbility[];
  attributeBonuses?: { [key: string]: Dice };
  skillBonuses?: { [key: string]: Dice };
  heritageChoices?: {
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
  fatigue?: number;
  advances?: number;
  advancesList?: Advance[];
}
