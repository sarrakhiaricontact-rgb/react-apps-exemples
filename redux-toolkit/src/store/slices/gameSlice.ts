import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  Enemy,
  GameStateInterface,
  Player,
  SkillActionPayload,
} from "../../types/gameTypes";

/**
 * 🎮 1. Définition de l’état initial du jeu (initialGameState)
 * Cet objet contient toutes les informations nécessaires pour gérer
 * la logique d’un petit jeu de combat au tour par tour.
 */
const initialGameState: GameStateInterface = {
  player: {
    name: "Hero", // Nom du joueur
    level: 1, // Niveau initial
    hp: 100, // Points de vie actuels
    maxHp: 100, // Points de vie maximum
    mp: 50, // Points de magie actuels
    maxMp: 50, // Points de magie maximum
    attack: 15, // Attaque de base
    defense: 10, // Défense de base
    exp: 0, // Expérience actuelle
    nextLevelExp: 100, // Expérience nécessaire pour monter de niveau
  } as Player, // On force le type Player ici
  enemy: null, // Ennemi courant (aucun au début)
  battleLog: [], // Historique des actions de combat
  gameState: "menu", // État du jeu : "menu", "battle", "victory", etc.
  gold: 50, // Or du joueur
  potions: 3, // Nombre de potions disponibles
};

/**
 * 🧩 2. Création du slice Redux Toolkit
 * Le slice regroupe :
 * - le nom du slice
 * - l’état initial
 * - les reducers (fonctions qui modifient l’état)
 */
export const gameSlice = createSlice({
  name: "game",
  initialState: initialGameState,
  reducers: {
    /**
     * ⚔️ Démarre un combat contre un ennemi
     * - Met à jour l’état du jeu en "battle"
     * - Initialise l’ennemi
     * - Ajoute un message dans le journal de combat
     */
    startBattle: (state, action: PayloadAction<Enemy>) => {
      state.enemy = action.payload;
      state.gameState = "battle";
      state.battleLog = [`Un ${action.payload.name} sauvage apparaît !`];
    },

    /**
     * 🗡️ Attaque normale du joueur
     * - Calcule les dégâts infligés à l’ennemi
     * - Met à jour ses HP
     * - Gère la victoire et la montée de niveau si nécessaire
     */
    playerAttack: (state) => {
      if (!state.enemy) return; // Si aucun ennemi, rien ne se passe

      // Dégâts calculés selon l’attaque, la défense ennemie et un facteur aléatoire
      const damage = Math.max(
        1,
        state.player.attack -
          state.enemy.defense +
          Math.floor(Math.random() * 10)
      );

      // Réduction des HP de l’ennemi
      state.enemy.hp = Math.max(0, state.enemy.hp - damage);

      // Message dans le journal
      state.battleLog.push(
        `${state.player.name} attaque ! ${damage} dégâts infligés.`
      );

      // Si l’ennemi meurt (HP <= 0)
      if (state.enemy.hp <= 0) {
        state.gameState = "victory";
        const expGain = state.enemy.expReward;
        const goldGain = state.enemy.goldReward;
        state.player.exp += expGain;
        state.gold += goldGain;
        state.battleLog.push(`Victoire ! +${expGain} EXP, +${goldGain} Or`);

        // 🎉 Vérification du passage au niveau supérieur
        if (state.player.exp >= state.player.nextLevelExp) {
          state.player.level += 1;
          state.player.exp -= state.player.nextLevelExp;
          state.player.nextLevelExp = Math.floor(
            state.player.nextLevelExp * 1.5
          );

          // Amélioration des statistiques
          state.player.maxHp += 20;
          state.player.hp = state.player.maxHp;
          state.player.maxMp += 10;
          state.player.mp = state.player.maxMp;
          state.player.attack += 5;
          state.player.defense += 3;

          // Message de montée de niveau
          state.battleLog.push(
            `Niveau supérieur ! Niveau ${state.player.level} atteint !`
          );
        }
      }
    },

    /**
     * 💥 Utilisation d’une compétence spéciale
     * - Consomme du MP
     * - Inflige des dégâts dépendant de la puissance de la compétence
     * - Gère les récompenses et montée de niveau en cas de victoire
     */
    playerSkill: (state, action: PayloadAction<SkillActionPayload>) => {
      if (!state.enemy || state.player.mp < action.payload.cost) return;

      state.player.mp -= action.payload.cost;

      // Calcul des dégâts selon la puissance de la compétence
      const damage = Math.floor(
        (action.payload.power * state.player.attack) / 10
      );

      state.enemy.hp = Math.max(0, state.enemy.hp - damage);
      state.battleLog.push(
        `${state.player.name} utilise ${action.payload.name} ! ${damage} dégâts !`
      );

      // Vérification de la victoire
      if (state.enemy.hp <= 0) {
        state.gameState = "victory";
        const expGain = state.enemy.expReward;
        const goldGain = state.enemy.goldReward;
        state.player.exp += expGain;
        state.gold += goldGain;
        state.battleLog.push(`Victoire ! +${expGain} EXP, +${goldGain} Or`);

        // Passage de niveau si nécessaire
        if (state.player.exp >= state.player.nextLevelExp) {
          state.player.level += 1;
          state.player.exp -= state.player.nextLevelExp;
          state.player.nextLevelExp = Math.floor(
            state.player.nextLevelExp * 1.5
          );
          state.player.maxHp += 20;
          state.player.hp = state.player.maxHp;
          state.player.maxMp += 10;
          state.player.mp = state.player.maxMp;
          state.player.attack += 5;
          state.player.defense += 3;
          state.battleLog.push(
            `Niveau supérieur ! Niveau ${state.player.level} !`
          );
        }
      }
    },

    /**
     * 🧟 Tour de l’ennemi
     * - L’ennemi attaque le joueur
     * - Les dégâts sont calculés en fonction de la défense du joueur
     * - Vérifie si le joueur est vaincu
     */
    enemyTurn: (state) => {
      if (!state.enemy || state.enemy.hp <= 0) return;

      const damage = Math.max(
        1,
        state.enemy.attack -
          state.player.defense +
          Math.floor(Math.random() * 8)
      );

      state.player.hp = Math.max(0, state.player.hp - damage);
      state.battleLog.push(
        `${state.enemy.name} attaque ! ${damage} dégâts reçus.`
      );

      if (state.player.hp <= 0) {
        state.gameState = "defeat";
        state.battleLog.push(`Défaite... Game Over.`);
      }
    },

    /**
     * 🧪 Utilisation d’une potion
     * - Restaure une partie des HP du joueur
     * - Diminue le nombre de potions disponibles
     */
    usePotion: (state) => {
      if (state.potions <= 0) return;

      state.potions -= 1;
      const healAmount = 40;
      state.player.hp = Math.min(
        state.player.maxHp,
        state.player.hp + healAmount
      );
      state.battleLog.push(`Potion utilisée ! +${healAmount} HP restaurés.`);
    },

    /**
     * 🔙 Retour au menu principal
     * - Réinitialise l’état du combat sans toucher au joueur
     */
    returnToMenu: (state) => {
      state.gameState = "menu";
      state.enemy = null;
      state.battleLog = [];
    },

    /**
     * 🔄 Réinitialise totalement le jeu
     * - Restaure l’état initial complet (comme au démarrage)
     */
    resetGame: (state) => {
      Object.assign(state, initialGameState);
    },
  },
});

/**
 * 🚀 3. Exportation des actions
 * Ces fonctions peuvent être dispatchées dans les composants React
 */
export const {
  startBattle,
  playerAttack,
  playerSkill,
  enemyTurn,
  usePotion,
  returnToMenu,
  resetGame,
} = gameSlice.actions;

/**
 * 🧠 4. Exportation du reducer
 * C’est lui qui sera ajouté dans le store Redux
 */
export default gameSlice.reducer;
