import { useGameStore } from "@/store/gameStore";
import { usePieceStore } from "@/store/pieceStore";
import React from "react";
import { positionTranslate } from "./utils";
import colors from "tailwindcss/colors";

const ClickedHighlight = () => {
  const draggedPiece = usePieceStore((state) => state.draggedPiece);
  const clickedPiece = usePieceStore((state) => state.clickedPiece);
  const isPieceDragged = usePieceStore((state) => state.isPieceDragged);
  const isPieceClicked = usePieceStore((state) => state.isPieceClicked);
  const playerColor = useGameStore((state) => state.playerColor);

  if (!isPieceDragged && !isPieceClicked) return null;
  return (
    <svg
      className="absolute bottom-0 left-0 h-[12.5%] w-[12.5%]"
      viewBox="0 0 100 100"
      style={positionTranslate({
        rank: draggedPiece?.rank || clickedPiece?.rank,
        file: draggedPiece?.file || clickedPiece?.file,
        playerColor,
      })}
      shapeRendering="crispEdges"
    >
      <rect
        x="0"
        y="0"
        width="100"
        height="100"
        fill={colors.yellow[400]}
        opacity={0.5}
      />
    </svg>
  );
};

export default ClickedHighlight;
