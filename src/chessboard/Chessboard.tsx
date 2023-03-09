import { files, ranks } from "@/constants/board";
import React from "react";
import { nanoid } from "nanoid";
import Square from "./Square";

const Chessboard = () => {
  const color: string = "white";
  const position = color === "white" ? [...ranks].reverse() : ranks;
  return (
    <div className="flex h-full w-full flex-col">
      {position.map((rank) => (
        <div key={nanoid()} className="flex h-[12.5%] w-full">
          {files.map((file) => (
            <div className="h-full w-[12.5%]" key={nanoid()}>
              <Square rank={rank} file={file} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Chessboard;
