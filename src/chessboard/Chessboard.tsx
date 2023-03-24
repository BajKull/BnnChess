"use client";

import { files, ranks } from "@/constants/board";
import React from "react";
import { nanoid } from "nanoid";
import Square from "./Square";
import BoardPiece from "@/components/pieces/BoardPiece";
import { useGameStore } from "@/store/gameStore";
import HoverHighlight from "./HoverHighlight";
import HelpMoveDots from "./HelpMoveDots";
import { fileToValue } from "./utils";
import { ChessboardFile, ChessboardRank } from "@/types/chessboard";
import LastMoveHighlight from "./LastMoveHighlight";

const Chessboard = () => {
  const game = useGameStore((state) => state.game);
  const gameBoard = useGameStore((state) => state.boardToRender)
    .flat()
    .filter(Boolean);
  const playerColor = useGameStore((state) => state.playerColor);

  const renderRanks = playerColor === "w" ? [...ranks].reverse() : ranks;
  const renderFiles = playerColor === "w" ? files : [...files].reverse();

  const getSquare = (rank: ChessboardRank, file: ChessboardFile) =>
    gameBoard.find((el) => el?.square === `${file}${rank}`);

  return (
    <>
      <div className="flex h-full w-full flex-col">
        {renderRanks.map((rank) => (
          <div key={nanoid()} className="flex h-[12.5%] w-full">
            {renderFiles.map((file) => {
              const square = getSquare(rank, file);
              return (
                <div className="h-full w-[12.5%]" key={nanoid()}>
                  <Square
                    rank={rank}
                    file={file}
                    occupiedBy={game.get(`${file}${rank}`)}
                  >
                    {square && (
                      <BoardPiece color={square!.color} piece={square!.type} />
                    )}
                  </Square>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <HoverHighlight />
      <HelpMoveDots />
      <LastMoveHighlight />
    </>
  );
};

export default Chessboard;
