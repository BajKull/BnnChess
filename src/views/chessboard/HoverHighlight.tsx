import { useGameStore } from "@/store/gameStore";
import { usePieceStore } from "@/store/pieceStore";
import React from "react";
import { getBoardRotation, positionTranslate } from "./utils";

const HoverHighlight = () => {
  const draggingOver = usePieceStore((state) => state.draggingOver);
  const isPieceDragged = usePieceStore((state) => state.isPieceDragged);
  const playerColor = useGameStore((state) => state.playerColor);
  const isBoardRotated = useGameStore((state) => state.isBoardRotated);
  const boardRotation = getBoardRotation(playerColor, isBoardRotated);

  if (!isPieceDragged) return null;
  return (
    <svg
      className="absolute bottom-0 left-0 h-[12.5%] w-[12.5%]"
      viewBox="0 0 100 100"
      style={positionTranslate({
        rank: draggingOver?.rank,
        file: draggingOver?.file,
        reversed: boardRotation,
      })}
      shapeRendering="crispEdges"
    >
      <rect
        x="0"
        y="0"
        width="100"
        height="100"
        fill="none"
        stroke="rgba(255, 255, 255, 0.75)"
        strokeWidth={10}
      />
    </svg>
  );
};

export default HoverHighlight;
