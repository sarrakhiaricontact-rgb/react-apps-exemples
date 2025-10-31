import { Sword } from "lucide-react";
import { skills } from "../constants/data";
import type {
  GameState,
  Player,
  Skill,
  SkillActionPayload,
} from "../types/gameTypes";
import { store, useAppDispatch } from "../store/store";
import {
  enemyTurn,
  playerAttack,
  playerSkill,
  usePotion,
} from "../store/slices/gameSlice";

type Props = { gameState: GameState; potions: number; player: Player };

const ActionButtons = ({ gameState, potions, player }: Props) => {
  const dispatch = useAppDispatch();

  const handlePlayerAction = (
    action: "attack" | "skill" | "potion",
    skill: Skill | null = null
  ) => {
    if (gameState !== "battle") return;

    if (action === "attack") {
      dispatch(playerAttack());
    } else if (action === "skill" && skill) {
      // Le payload doit correspondre à SkillActionPayload
      const skillPayload: SkillActionPayload = {
        name: skill.name,
        cost: skill.cost,
        power: skill.power,
      };
      dispatch(playerSkill(skillPayload));
    } else if (action === "potion") {
      dispatch(usePotion());
    }

    // L'ennemi riposte seulement si le joueur n'a pas gagné/perdu après son action
    setTimeout(() => {
      // Dispatch only if game state is still 'battle' after player's turn
      if (store.getState().game.gameState === "battle") {
        dispatch(enemyTurn());
      }
    }, 1000);
  };
  return (
    <div className="bg-gray-800/80 rounded-xl p-4 sm:p-6 border-4 border-yellow-600 shadow-2xl">
      <h4 className="text-lg sm:text-xl font-bold text-white mb-4 border-b pb-2 border-gray-600">
        Vos Actions
      </h4>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <button
          onClick={() => handlePlayerAction("attack")}
          className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition duration-200 text-sm sm:text-base"
        >
          <Sword className="w-5 h-5" />
          Attaquer
        </button>

        <button
          onClick={() => handlePlayerAction("potion")}
          disabled={potions <= 0}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white p-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition duration-200 text-sm sm:text-base"
        >
          🧪 Potion ({potions})
        </button>

        {skills.map((skill, idx) => (
          <button
            key={idx}
            onClick={() => handlePlayerAction("skill", skill)}
            disabled={player.mp < skill.cost}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white p-3 rounded-xl font-bold flex items-center justify-center gap-2 text-xs sm:text-sm shadow-lg transition duration-200"
          >
            <skill.icon className="w-4 h-4 sm:w-5 sm:h-5" />
            {skill.name} ({skill.cost} MP)
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActionButtons;
