import { useGameStore } from "@/store/gameStore";
import { Square } from "chess.js";

interface Move {
  from: Square;
  to: Square;
}

const useChessActions = () => {
  const { game, setBoardToRender, setLegalMoves } = useGameStore();

  const move = ({ from, to }: Move) => {
    try {
      game.move({ from, to });
      setBoardToRender(game.board());
      setLegalMoves(
        game.moves({ verbose: true }).map((m) => ({ from: m.from, to: m.to }))
      );
    } catch (e) {
      return;
    }
  };

  return { move };
};

export default useChessActions;
