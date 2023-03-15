"use client";

import { files, ranks } from "@/constants/board";
import React from "react";
import { nanoid } from "nanoid";
import Square from "./Square";
import BoardPiece from "@/components/pieces/BoardPiece";
import { useGameStore } from "@/store/gameStore";
import HoverHighlight from "./HoverHighlight";
import HelpMoveDots from "./HelpMoveDots";

const PLAYER = "white";

const Chessboard = () => {
  const game = useGameStore((state) => state.game);
  const boardToRender = useGameStore((state) => state.boardToRender);

  return (
    <>
      <div className="flex h-full w-full flex-col">
        {[...ranks].reverse().map((rank, i) => (
          <div key={nanoid()} className="flex h-[12.5%] w-full">
            {files.map((file, j) => (
              <div className="h-full w-[12.5%]" key={nanoid()}>
                <Square
                  rank={rank}
                  file={file}
                  occupiedBy={game.get(`${file}${rank}`)}
                >
                  {boardToRender[i][j] !== null && (
                    <BoardPiece
                      color={boardToRender[i][j]!.color}
                      piece={boardToRender[i][j]!.type}
                    />
                  )}
                </Square>
              </div>
            ))}
          </div>
        ))}
      </div>
      <HoverHighlight />
      <HelpMoveDots />
    </>
  );
};

export default Chessboard;
