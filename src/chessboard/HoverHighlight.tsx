import { usePieceStore } from "@/store/pieceStore";
import classNames from "classnames";
import React from "react";
import { fileToValue } from "./utils";

const HoverHighlight = () => {
  const draggingOver = usePieceStore((state) => state.draggingOver);
  const isPieceDragged = usePieceStore((state) => state.isPieceDragged);
  if (!isPieceDragged) return null;
  return (
    <svg
      className="absolute bottom-0 left-0 h-[12.5%] w-[12.5%]"
      viewBox="0 0 100 100"
      style={{
        transform: `
          translateX(${fileToValue(draggingOver?.file) * 100 - 100}%)
          translateY(-${(draggingOver?.rank || 0) * 100 - 100}%)
        `,
      }}
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
