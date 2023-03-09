import { files, ranks } from "@/constants/board";
import React from "react";
import { nanoid } from "nanoid";
import Square from "./Square";
import BoardPiece from "@/components/pieces/BoardPiece";

const Chessboard = () => {
  const color: string = "white";
  const position = color === "white" ? [...ranks].reverse() : ranks;
  return (
    <div className="flex h-full w-full flex-col">
      {position.map((rank) => (
        <div key={nanoid()} className="flex h-[12.5%] w-full">
          {files.map((file, i) => (
            <div className="h-full w-[12.5%]" key={nanoid()}>
              <Square rank={rank} file={file}>
                <BoardPiece
                  color={i % 2 === 0 ? "white" : "black"}
                  className="h-full w-full"
                  piece="pawn"
                />
              </Square>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Chessboard;
