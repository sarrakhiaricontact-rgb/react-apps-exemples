import { useAppSelector } from "../store/store";
import { BattleScreen } from "./BattleScreen";
import { MenuScreen } from "./MenuScreen";

export function Game() {
  const gameState = useAppSelector((state) => state.game.gameState);

  return (
    <div>
      {gameState === "menu" && <MenuScreen />}
      {(gameState === "battle" ||
        gameState === "victory" ||
        gameState === "defeat") && <BattleScreen />}
    </div>
  );
}
