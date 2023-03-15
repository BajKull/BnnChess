import { useGameStore } from "@/store/gameStore";
import { Square } from "chess.js";

interface Move {
  from: Square;
  to: Square;
}

const useChessActions = () => {
  const { game, setBoardToRender } = useGameStore();

  const move = ({ from, to }: Move) => {
    try {
      game.move({ from, to });
      setBoardToRender(game.board());
    } catch (e) {
      return;
    }
  };

  return { move };
};

export default useChessActions;
