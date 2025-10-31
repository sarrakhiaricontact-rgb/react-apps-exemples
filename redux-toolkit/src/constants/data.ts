import { Sword, Zap, Sparkles } from "lucide-react";
import type { Enemy, Skill } from "../types/gameTypes";

const enemies: Enemy[] = [
  {
    name: "Gobelin",
    hp: 50,
    maxHp: 50,
    attack: 12,
    defense: 5,
    expReward: 30,
    goldReward: 20,
  },
  {
    name: "Loup Sauvage",
    hp: 70,
    maxHp: 70,
    attack: 15,
    defense: 7,
    expReward: 45,
    goldReward: 30,
  },
  {
    name: "Orc Guerrier",
    hp: 100,
    maxHp: 100,
    attack: 20,
    defense: 12,
    expReward: 70,
    goldReward: 50,
  },
  {
    name: "Dragon Mineur",
    hp: 150,
    maxHp: 150,
    attack: 25,
    defense: 15,
    expReward: 120,
    goldReward: 100,
  },
];

const skills: Skill[] = [
  { name: "Éclair", cost: 15, power: 25, icon: Zap },
  { name: "Frappe Puissante", cost: 10, power: 20, icon: Sword },
  { name: "Attaque Magique", cost: 20, power: 30, icon: Sparkles },
];

export { enemies, skills };
