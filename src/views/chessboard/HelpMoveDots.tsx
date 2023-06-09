import { useGameStore } from "@/store/gameStore";
import { usePieceStore } from "@/store/pieceStore";
import { ChessboardFile, ChessboardRank } from "@/types/chessboard";
import { Square } from "chess.js";
import { nanoid } from "nanoid";
import React from "react";
import { getBoardRotation, positionTranslate } from "./utils";

const HelpMoveDots = () => {
  const isPieceDragged = usePieceStore((state) => state.isPieceDragged);
  const isPieceClicked = usePieceStore((state) => state.isPieceClicked);
  const draggedPiece = usePieceStore((state) => state.draggedPiece);
  const clickedPiece = usePieceStore((state) => state.clickedPiece);
  const draggedPieceSquare = `${draggedPiece?.file || clickedPiece?.file}${
    draggedPiece?.rank || clickedPiece?.rank
  }` as Square;

  const game = useGameStore((state) => state.game);
  const moves = game.moves({ square: draggedPieceSquare, verbose: true });

  // some possible moves may lead to the same square e.g. promotion
  // its not needed here since only one help dot is needed for each square
  // get all unique moves based on .to value from moves array
  const uniqueMoves = [
    ...Array.from(new Map(moves.map((m) => [m.to, m])).values()),
  ];

  if (!(isPieceDragged || isPieceClicked) || !moves) return null;
  return (
    <>
      {uniqueMoves.map((m) => (
        <MoveDot position={m.to} flags={m.flags} key={nanoid()} />
      ))}
    </>
  );
};

const MoveDot = ({ position, flags }: { position: Square; flags: string }) => {
  const playerColor = useGameStore((state) => state.playerColor);
  const isBoardRotated = useGameStore((state) => state.isBoardRotated);
  const boardRotation = getBoardRotation(playerColor, isBoardRotated);
  const [file, rank] = position.split("");

  return (
    <svg
      viewBox="0 0 100 100"
      className="pointer-events-none absolute bottom-0 left-0 h-[12.5%] w-[12.5%]"
      style={positionTranslate({
        rank: parseInt(rank) as ChessboardRank,
        file: file as ChessboardFile,
        reversed: boardRotation,
      })}
    >
      <circle
        cx="50"
        cy="50"
        r={flags.includes("c") ? 44 : 17}
        fill={flags.includes("c") ? "none" : "rgba(0, 0, 0, 0.1)"}
        stroke="rgba(0, 0, 0, 0.1)"
        strokeWidth={flags.includes("c") ? 10 : 0}
      />
    </svg>
  );
};

export default HelpMoveDots;
