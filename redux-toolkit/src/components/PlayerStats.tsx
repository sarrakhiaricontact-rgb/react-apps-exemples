import { Heart, Zap } from "lucide-react";
import type { Player } from "../types/gameTypes";

interface Props {
  player: Player;
}

export default function PlayerStats({ player }: Props) {
  return (
    <div className="bg-blue-900/80 rounded-xl p-4 sm:p-6 border-4 border-blue-400 shadow-xl">
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center">
        {player.name} (Nvl {player.level})
      </h3>
      <div className="text-white space-y-3">
        {/* Barre de HP */}
        <div className="flex items-center gap-3">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
          <div className="flex-1 bg-gray-700 rounded-full h-7 sm:h-8 overflow-hidden">
            <div
              className="bg-red-500 h-full rounded-full flex items-center justify-end pr-2"
              style={{ width: `${(player.hp / player.maxHp) * 100}%` }}
            >
              <span className="text-xs sm:text-sm font-bold">
                {player.hp}/{player.maxHp} HP
              </span>
            </div>
          </div>
        </div>

        {/* Barre de MP */}
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
          <div className="flex-1 bg-gray-700 rounded-full h-7 sm:h-8 overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full flex items-center justify-end pr-2"
              style={{ width: `${(player.mp / player.maxMp) * 100}%` }}
            >
              <span className="text-xs sm:text-sm font-bold">
                {player.mp}/{player.maxMp} MP
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center text-gray-300 text-sm sm:text-base">
        <span className="mr-4">ATK: {player.attack}</span>
        <span>DEF: {player.defense}</span>
      </div>
    </div>
  );
}
