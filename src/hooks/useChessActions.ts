import { useChatStore } from "@/store/chatMovesStore";
import { useGameStore } from "@/store/gameStore";
import { usePieceStore } from "@/store/pieceStore";
import { PieceSymbol, Square } from "chess.js";

interface Move {
  from: Square;
  to: Square;
  promotion?: PieceSymbol;
}

const useChessActions = () => {
  const game = useGameStore((state) => state.game);
  const autoPromoteToQueen = useGameStore((state) => state.autoPromoteToQueen);
  const setBoardToRender = useGameStore((state) => state.setBoardToRender);
  const setLegalMoves = useGameStore((state) => state.setLegalMoves);
  const toggleIsChatTurn = useChatStore((state) => state.toggleIsChatTurn);
  const setLastMove = useGameStore((state) => state.setLastMove);
  const cancelDrag = usePieceStore((state) => state.cancelDrag);
  const cancelClick = usePieceStore((state) => state.cancelClick);
  const setShowPromotionScreen = useGameStore(
    (state) => state.setShowPromotionScreen
  );

  const move = ({ from, to, promotion }: Move) => {
    try {
      const checkIfPromotion = () => {
        if (game.get(from).type === "p" && (to[1] === "1" || to[1] === "8")) {
          if (autoPromoteToQueen) promotion = "q";
          else setShowPromotionScreen(true);
        }
      };
      checkIfPromotion();

      game.move({ from, to, promotion });
      setBoardToRender(game.board());
      setLegalMoves(
        game.moves({ verbose: true }).map((m) => ({ from: m.from, to: m.to }))
      );
      toggleIsChatTurn();
      cancelDrag();
      cancelClick();
      setLastMove({ from, to });

      return true;
    } catch (e) {
      return;
    }
  };

  return { move };
};

export default useChessActions;
