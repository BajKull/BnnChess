import { ChessboardFile, ChessboardRank } from "@/types/chessboard";
import React from "react";
import classnames from "classnames";
import { a, useSpring } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { DraggedPiece, usePieceStore } from "@/store/pieceStore";
import { fileToValue } from "./utils";

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
  const togglePieceDrag = usePieceStore((state) => state.toggleIsPieceDragged);
  const setDraggingOver = usePieceStore((state) => state.setDraggingOver);
  const setDraggedPiece = usePieceStore((state) => state.setDraggedPiece);
  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
    immediate: true,
    zIndex: 10,
  }));
  const bind = useGesture({
    onDrag: ({ active, movement: [x, y], xy }) => {
      if (!occupied) return;
      api.start({
        x: active ? x : 0,
        y: active ? y : 0,
        zIndex: active ? 20 : 10,
        immediate: true,
      });
      const dragOverEls = document.elementsFromPoint(xy[0], xy[1]);
      const dragOver = dragOverEls.find(
        (el) => (el as HTMLElement).dataset.dropplace
      ) as HTMLElement;
      const placeOnBoard = dragOver?.dataset.dropplace;
      if (!placeOnBoard) return;
      const pos: DraggedPiece = JSON.parse(placeOnBoard);
      if (!pos) return;
      setDraggingOver(pos);
    },
    onDragStart: () => {
      togglePieceDrag();
      setDraggedPiece({ rank, file });
    },
    onDragEnd: ({ xy }) => {
      togglePieceDrag();
      const dropPlaceEls = document.elementsFromPoint(xy[0], xy[1]);
      const dropPlace = [...dropPlaceEls].filter(
        (el) => (el as HTMLElement).dataset.dropplace
      )[0];
      if (!dropPlace) return;
    },
  });

  const handleAuxClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
  };

  const theme: string = "olive";
  const clsSquare = classnames(
    "w-full h-full relative flex items-center justify-center border-stone-200",
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
    <div
      className={clsSquare}
      data-dropplace={JSON.stringify({ rank, file })}
      onAuxClick={handleAuxClick}
      onContextMenu={(e) => e.preventDefault()}
      {...rest}
    >
      {rank === 1 && <label className={clsText("rank")}>{file}</label>}
      {file === "a" && <label className={clsText("file")}>{rank}</label>}
      {children && (
        <a.div
          {...bind()}
          className="absolute top-0 left-0 z-10 h-full w-full "
          style={style}
        >
          {children}
        </a.div>
      )}
    </div>
  );
};

export default Square;
