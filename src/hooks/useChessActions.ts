import { useChatStore } from "@/store/chatMoves";
import { useGameStore } from "@/store/gameStore";
import { Square } from "chess.js";

interface Move {
  from: Square;
  to: Square;
}

const useChessActions = () => {
  const game = useGameStore((state) => state.game);
  const setBoardToRender = useGameStore((state) => state.setBoardToRender);
  const setLegalMoves = useGameStore((state) => state.setLegalMoves);
  const toggleIsChatTurn = useChatStore((state) => state.toggleIsChatTurn);

  const move = ({ from, to }: Move) => {
    try {
      game.move({ from, to });
      setBoardToRender(game.board());
      setLegalMoves(
        game.moves({ verbose: true }).map((m) => ({ from: m.from, to: m.to }))
      );
      toggleIsChatTurn();
    } catch (e) {
      return;
    }
  };

  return { move };
};

export default useChessActions;
