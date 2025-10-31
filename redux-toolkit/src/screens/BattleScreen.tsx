import { returnToMenu } from "../store/slices/gameSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import PlayerStats from "../components/PlayerStats";
import EnemyStats from "../components/EnemyStats";
import BattleLog from "../components/BattleLog";
import ActionButtons from "../components/ActionButtons";
import VictoireCard from "../components/VictoireCard";

export function BattleScreen() {
  const dispatch = useAppDispatch();
  const { player, enemy, battleLog, gameState, potions } = useAppSelector(
    (state) => state.game
  );

  // Assurez-vous que l'ennemi existe avant d'essayer de le rendre
  if (!enemy) {
    return (
      <div className="text-white text-center p-12 bg-gray-900/90 min-h-screen">
        <p>Chargement du combat...</p>
        <button
          onClick={() => dispatch(returnToMenu())}
          className="mt-4 bg-blue-600 p-2 rounded-lg"
        >
          Retour au Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-red-900 to-black p-4 font-inter">
      <div className="max-w-6xl mx-auto pt-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-yellow-400 mb-8 drop-shadow-xl bg-gray-900/70 p-3 rounded-xl border-2 border-yellow-600">
          ⚔️ Combat ! {player.name} vs {enemy.name} ⚔️
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          {/* Player Stats */}
          <PlayerStats player={player} />

          {/* Enemy Stats */}
          <EnemyStats enemy={enemy} />
        </div>

        {/* Battle Log */}
        <BattleLog battleLog={battleLog} />

        {/* Actions */}
        {gameState === "battle" && (
          <ActionButtons
            gameState={gameState}
            potions={potions}
            player={player}
          />
        )}

        {/* Victory/Defeat Screen */}
        {(gameState === "victory" || gameState === "defeat") && (
          <VictoireCard gameState={gameState} />
        )}
      </div>
    </div>
  );
}
