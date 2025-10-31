import { Heart, Shield, Sword, UserCircle, Zap } from "lucide-react";
import { enemies } from "../constants/data";
import { startBattle } from "../store/slices/gameSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import type { Enemy } from "../types/gameTypes";

export function MenuScreen() {
  const dispatch = useAppDispatch();
  // Utilisation de useAppSelector pour un état typé
  const { player, gold, potions } = useAppSelector((state) => state.game);

  const handleStartBattle = (enemyIndex: number) => {
    // Le spread clone l'objet pour éviter la mutation des données statiques
    const enemyToFight: Enemy = { ...enemies[enemyIndex] };
    dispatch(startBattle(enemyToFight));
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-900 via-purple-800 to-indigo-900 p-4 sm:p-8 font-inter">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-yellow-300 mb-6 sm:mb-8 drop-shadow-lg rounded-xl p-3 bg-gray-900/50 border-2 border-yellow-600">
          ⚔️ RPG Adventure ⚔️
        </h1>

        <div className="bg-gray-800/80 rounded-xl p-4 sm:p-6 mb-6 border-4 border-yellow-600 shadow-2xl">
          <div className="flex items-center gap-4 mb-4 border-b border-gray-600 pb-4">
            <UserCircle className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {player.name}
              </h2>
              <p className="text-yellow-300">Niveau {player.level}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white text-sm sm:text-base">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                <span>
                  HP: {player.hp}/{player.maxHp}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-400" />
                <span>
                  MP: {player.mp}/{player.maxMp}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sword className="w-5 h-5 text-orange-400" />
                <span>Attaque: {player.attack}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-400" />
                <span>Défense: {player.defense}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-600">
            <div className="flex justify-between flex-wrap gap-2 text-white text-md font-semibold">
              <span className="bg-yellow-800/50 p-1 rounded-md">
                💰 Or: {gold}
              </span>
              <span className="bg-green-800/50 p-1 rounded-md">
                🧪 Potions: {potions}
              </span>
              <span className="bg-indigo-800/50 p-1 rounded-md">
                ⭐ EXP: {player.exp}/{player.nextLevelExp}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/80 rounded-xl p-4 sm:p-6 border-4 border-purple-600 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center border-b pb-3 border-purple-400">
            Choisissez votre adversaire
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {enemies.map((enemy, idx) => (
              <button
                key={idx}
                onClick={() => handleStartBattle(idx)}
                className="bg-red-700/80 hover:bg-red-600 text-white p-3 sm:p-4 rounded-xl font-extrabold transition duration-300 transform hover:scale-105 shadow-xl border-b-4 border-red-900 flex flex-col items-center"
              >
                <div className="text-lg sm:text-xl mb-1">{enemy.name}</div>
                <div className="text-xs sm:text-sm opacity-90 space-x-2">
                  <span>HP: {enemy.hp}</span>
                  <span>ATK: {enemy.attack}</span>
                </div>
                <div className="text-xs text-yellow-300 mt-2 bg-black/30 px-2 py-0.5 rounded-full">
                  +{enemy.expReward} EXP | +{enemy.goldReward} Or
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
