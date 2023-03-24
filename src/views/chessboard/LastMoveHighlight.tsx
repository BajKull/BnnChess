import { useGameStore } from "@/store/gameStore";
import React from "react";
import { positionTranslate } from "./utils";
import colors from "tailwindcss/colors";
import { ChessboardFile, ChessboardRank } from "@/types/chessboard";

const LastMoveHighlight = () => {
  const lastMove = useGameStore((state) => state.lastMove);
  const playerColor = useGameStore((state) => state.playerColor);
  console.log(lastMove);
  if (!lastMove) return null;

  const [fromFile, fromRank] = lastMove.from.split("");
  const [toFile, toRank] = lastMove.to.split("");

  return (
    <>
      <svg
        className="absolute bottom-0 left-0 h-[12.5%] w-[12.5%]"
        viewBox="0 0 100 100"
        style={positionTranslate({
          rank: parseInt(fromRank) as ChessboardRank,
          file: fromFile as ChessboardFile,
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
      <svg
        className="absolute bottom-0 left-0 h-[12.5%] w-[12.5%]"
        viewBox="0 0 100 100"
        style={positionTranslate({
          rank: parseInt(toRank) as ChessboardRank,
          file: toFile as ChessboardFile,
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
    </>
  );
};

export default LastMoveHighlight;
