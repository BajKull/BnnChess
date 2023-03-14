import { useGameStore } from "@/store/gameStore";
import { usePieceStore } from "@/store/pieceStore";
import { ChessboardFile } from "@/types/chessboard";
import { Square } from "chess.js";
import { nanoid } from "nanoid";
import React from "react";
import { fileToValue } from "./utils";

const HelpMoveDots = () => {
  const isPieceDragged = usePieceStore((state) => state.isPieceDragged);
  const draggedPiece = usePieceStore((state) => state.draggedPiece);
  const draggedPieceSquare =
    `${draggedPiece?.file}${draggedPiece?.rank}` as Square;

  const game = useGameStore((state) => state.game);
  const moves = game.moves({ square: draggedPieceSquare, verbose: true });

  if (!isPieceDragged || !moves) return null;
  return (
    <>
      {moves.map((m) => (
        <MoveDot position={m.to} key={nanoid()} />
      ))}
    </>
  );
};

const MoveDot = ({ position }: { position: Square }) => {
  const [file, rank] = position.split("");
  console.log(file, rank);
  return (
    <div
      className="absolute bottom-0 left-0 h-[12.5%] w-[12.5%] rounded-full bg-black bg-opacity-10 bg-clip-content p-[4%]"
      style={{
        transform: `
      translateX(${fileToValue(file as ChessboardFile) * 100 - 100}%)
      translateY(-${(parseInt(rank) || 0) * 100 - 100}%)
    `,
      }}
    ></div>
  );
};

export default HelpMoveDots;
