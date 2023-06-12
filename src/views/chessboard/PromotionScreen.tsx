import BoardPiece from "@/components/pieces/BoardPiece";
import { LOCALSTORAGE_KEYS } from "@/constants/localstorage";
import useChessActions from "@/hooks/useChessActions";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useChatStore } from "@/store/chatMovesStore";
import { useGameStore } from "@/store/gameStore";
import { useModalStore } from "@/store/modalStore";
import { PieceSymbol } from "chess.js";
import React, { useEffect } from "react";

const PromotionScreen = () => {
  const isChatTurn = useChatStore((state) => state.isChatTurn);
  const playerColor = useGameStore((state) => state.playerColor);
  const promotionScreen = useGameStore((state) => state.showPromotionScreen);
  const setShowPromotionScreen = useGameStore(
    (state) => state.setShowPromotionScreen
  );
  const setModalScreen = useModalStore((state) => state.setModal);

  const [howToPromoteStorage, _setHowToPromoteStorage] = useLocalStorage(
    LOCALSTORAGE_KEYS.TUTORIALS.HOW_TO_PROMOTE
  );

  const { move } = useChessActions();

  const getColor = () => {
    if (!isChatTurn) return playerColor;
    if (playerColor === "b") return "w";
    return "b";
  };

  const promote = (promotion: PieceSymbol) => {
    if (!promotionScreen) return;
    const { from, to } = promotionScreen;
    move({ from, to, promotion });
    setShowPromotionScreen(undefined);
  };

  useEffect(() => {
    if (promotionScreen && !howToPromoteStorage) setModalScreen("howToPromote");
  }, [howToPromoteStorage, promotionScreen, setModalScreen]);

  if (!promotionScreen) return null;

  return (
    <div className="absolute top-0 left-0 z-20 flex h-full w-full bg-zinc-900 bg-opacity-50">
      <div className="my-auto flex w-full">
        <button className="basis-1/4" onClick={() => promote("n")}>
          <BoardPiece piece="n" color={getColor()} />
        </button>
        <button className="basis-1/4" onClick={() => promote("b")}>
          <BoardPiece piece="b" color={getColor()} />
        </button>
        <button className="basis-1/4" onClick={() => promote("r")}>
          <BoardPiece piece="r" color={getColor()} />
        </button>
        <button className="basis-1/4" onClick={() => promote("q")}>
          <BoardPiece piece="q" color={getColor()} />
        </button>
      </div>
    </div>
  );
};

export default PromotionScreen;
