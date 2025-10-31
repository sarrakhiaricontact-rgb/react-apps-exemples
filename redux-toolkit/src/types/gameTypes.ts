import type { LucideProps } from "lucide-react";
import type { FC } from "react";

interface CharacterStats {
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
}

interface Player extends CharacterStats {
  level: number;
  mp: number;
  maxMp: number;
  exp: number;
  nextLevelExp: number;
}

interface Enemy extends CharacterStats {
  expReward: number;
  goldReward: number;
}

type GameState = "menu" | "battle" | "victory" | "defeat";

interface GameStateInterface {
  player: Player;
  enemy: Enemy | null;
  battleLog: string[];
  gameState: GameState;
  gold: number;
  potions: number;
}

interface Skill {
  name: string;
  cost: number;
  power: number;
  icon: FC<LucideProps>; // Typage spécifique pour Lucide-React
}

interface SkillActionPayload {
  name: string;
  cost: number;
  power: number;
}

// Définir le type pour l'action de combat (qui prend un Enemy)
type StartBattleAction = {
  payload: Enemy;
  type: string;
};

interface Skill {
  name: string;
  cost: number;
  power: number;
  icon: FC<LucideProps>;
}

export type {
  Skill,
  GameState,
  StartBattleAction,
  SkillActionPayload,
  GameStateInterface,
  Player,
  Enemy,
  CharacterStats,
};
