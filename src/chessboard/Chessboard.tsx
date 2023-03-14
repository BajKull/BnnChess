"use client";

import { files, ranks } from "@/constants/board";
import React from "react";
import { nanoid } from "nanoid";
import Square from "./Square";
import BoardPiece from "@/components/pieces/BoardPiece";
import { useGameStore } from "@/store/gameStore";
import HoverHighlight from "./HoverHighlight";

const Chessboard = () => {
  const game = useGameStore((state) => state.game);
  const color = game.turn() === "w" ? "white" : "black";
  const position = color === "white" ? [...ranks].reverse() : ranks;
  const board = game.board();

  return (
    <>
      <div className="flex h-full w-full flex-col">
        {position.map((rank, i) => (
          <div key={nanoid()} className="flex h-[12.5%] w-full">
            {files.map((file, j) => (
              <div className="h-full w-[12.5%]" key={nanoid()}>
                <Square rank={rank} file={file} occupied={board[i][j] !== null}>
                  {board[i][j] !== null && (
                    <BoardPiece
                      color={board[i][j]!.color}
                      piece={board[i][j]!.type}
                    />
                  )}
                </Square>
              </div>
            ))}
          </div>
        ))}
      </div>
      <HoverHighlight />
    </>
  );
};

export default Chessboard;
