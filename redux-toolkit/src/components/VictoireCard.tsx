import type { GameState } from "../types/gameTypes";
import { useAppDispatch } from "../store/store";
import { resetGame, returnToMenu } from "../store/slices/gameSlice";

type Props = { gameState: GameState };

function VictoireCard({ gameState }: Props) {
  const dispatch = useAppDispatch();
  return (
    <div
      className={`rounded-xl p-6 sm:p-8 border-4 text-center shadow-2xl ${
        gameState === "victory"
          ? "bg-green-900/80 border-green-400"
          : "bg-red-900/80 border-red-400"
      }`}
    >
      <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
        {gameState === "victory"
          ? "🎉 Victoire Écrasante ! 🎉"
          : "💀 Défaite... Game Over 💀"}
      </h3>
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => dispatch(returnToMenu())}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-extrabold text-md sm:text-lg shadow-xl transition transform hover:scale-105"
        >
          Retour au Menu
        </button>
        <button
          onClick={() => dispatch(resetGame())}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-full font-extrabold text-md sm:text-lg shadow-xl transition transform hover:scale-105"
        >
          Recommencer
        </button>
      </div>
    </div>
  );
}

export default VictoireCard;
