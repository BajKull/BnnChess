import { ChessboardFile, ChessboardRank } from "@/types/chessboard";
import React from "react";
import classnames from "classnames";
import { a, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  rank: ChessboardRank;
  file: ChessboardFile;
  occupied: boolean;
}

const Square = ({
  rank,
  file,
  className,
  children,
  occupied,
  ...rest
}: IProps) => {
  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
    immediate: true,
    zIndex: 10,
  }));
  const bind = useDrag(({ active, movement: [x, y] }) => {
    if (!occupied) return;
    api.start({
      x: active ? x : 0,
      y: active ? y : 0,
      zIndex: active ? 20 : 10,
      immediate: true,
    });
  });

  const theme: string = "olive";
  const clsSquare = classnames(
    "w-full h-full relative flex items-center justify-center",
    {
      "bg-olive-50": (rank + fileToValue(file)) % 2 !== 0 && theme === "olive",
      "bg-olive-600": (rank + fileToValue(file)) % 2 === 0 && theme === "olive",
      "bg-chestnut-50":
        (rank + fileToValue(file)) % 2 !== 0 && theme === "chestnut",
      "bg-chestnut-600":
        (rank + fileToValue(file)) % 2 === 0 && theme === "chestnut",
      className,
      "cursor-grab": occupied,
    }
  );

  const clsText = (type: "file" | "rank") =>
    classnames(
      "absolute font-semibold text-[2vmin] pointer-events-none select-none",
      {
        "top-1 left-1": type === "file",
        "bottom-0 right-1": type === "rank",
        "text-olive-50":
          (rank + fileToValue(file)) % 2 === 0 && theme === "olive",
        "text-olive-600":
          (rank + fileToValue(file)) % 2 !== 0 && theme === "olive",
        "text-chestnut-50":
          (rank + fileToValue(file)) % 2 === 0 && theme === "chestnut",
        "text-chestnut-600":
          (rank + fileToValue(file)) % 2 !== 0 && theme === "chestnut",
        className,
      }
    );

  return (
    <div className={clsSquare} {...rest}>
      {rank === 1 && <label className={clsText("rank")}>{file}</label>}
      {file === "a" && <label className={clsText("file")}>{rank}</label>}
      <a.div
        {...bind()}
        className="absolute top-0 left-0 z-10 h-full w-full"
        style={style}
      >
        {children}
      </a.div>
    </div>
  );
};

const fileToValue = (file: ChessboardFile) => {
  const values = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
  };
  return values[file];
};

export default Square;
