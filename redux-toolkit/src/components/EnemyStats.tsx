import { Target } from "lucide-react";
import type { Enemy } from "../types/gameTypes";

interface Props {
  enemy: Enemy;
}

function EnemyStats({ enemy }: Props) {
  return (
    <div className="bg-red-900/80 rounded-xl p-4 sm:p-6 border-4 border-red-400 shadow-xl">
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center">
        {enemy.name}
      </h3>
      <div className="text-white space-y-3">
        <div className="flex items-center gap-3">
          <Target className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 shrink-0" />
          <div className="flex-1 bg-gray-700 rounded-full h-7 sm:h-8 overflow-hidden">
            <div
              className="bg-red-500 h-7 sm:h-8 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }}
            >
              <span className="text-xs sm:text-sm font-bold drop-shadow-md">
                {enemy.hp}/{enemy.maxHp} HP
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center text-gray-300 text-sm sm:text-base">
        <span className="mr-4">ATK: {enemy.attack}</span>
        <span>DEF: {enemy.defense}</span>
      </div>
    </div>
  );
}

export default EnemyStats;
