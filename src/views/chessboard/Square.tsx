import { ChessboardFile, ChessboardRank } from "@/types/chessboard";
import React, { useEffect, useRef } from "react";
import classnames from "classnames";
import { a, useSpring } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { DraggedPiece, usePieceStore } from "@/store/pieceStore";
import { fileToValue } from "./utils";
import { Piece } from "chess.js";
import useChessActions from "@/hooks/useChessActions";
import { useGameStore } from "@/store/gameStore";
import { useChatStore } from "@/store/chatMovesStore";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  rank: ChessboardRank;
  file: ChessboardFile;
  row: number;
  col: number;
  occupiedBy: Piece | null;
}

const Square = ({
  rank,
  file,
  row,
  col,
  className,
  children,
  occupiedBy,
  ...rest
}: IProps) => {
  const clickedPieceRef = usePieceStore((state) => state.clickedPieceRef);
  const togglePieceDrag = usePieceStore((state) => state.toggleIsPieceDragged);
  const setIsPieceClicked = usePieceStore((state) => state.setIsPieceClicked);
  const setDraggingOver = usePieceStore((state) => state.setDraggingOver);
  const setDraggedPiece = usePieceStore((state) => state.setDraggedPiece);
  const setClickedPiece = usePieceStore((state) => state.setClickedPiece);
  const cancelDrag = usePieceStore((state) => state.cancelDrag);
  const cancelClick = usePieceStore((state) => state.cancelClick);
  const { move } = useChessActions();
  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
    immediate: true,
    zIndex: 10,
  }));

  const dragOffset = useRef<[number, number]>([0, 0]);
  const isChatTurn = useChatStore((state) => state.isChatTurn);

  const cancelDragRef = useRef(false);

  const bind = useGesture({
    onDrag: ({ active, movement: [x, y], xy, cancel }) => {
      if (cancelDragRef.current) {
        cancel();
        cancelDragRef.current = false;
      }
      if (!occupiedBy) return;
      api.start({
        x: active ? x + dragOffset.current[0] : 0,
        y: active ? y + dragOffset.current[1] : 0,
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
    onDragStart: ({ initial, currentTarget }) => {
      togglePieceDrag();
      setDraggedPiece({ rank, file });
      if (currentTarget instanceof Element) {
        const squareBounds = currentTarget.getBoundingClientRect();
        const offset: [number, number] = [
          initial[0] - squareBounds.x - squareBounds.width / 2,
          initial[1] - squareBounds.y - squareBounds.height / 2,
        ];
        dragOffset.current = offset;
      }
    },
    onDragEnd: ({ xy, canceled }) => {
      if (canceled) {
        cancelDrag();
        cancelClick();
        return;
      }
      togglePieceDrag();
      if (isChatTurn) return;
      const dropPlaceEls = document.elementsFromPoint(xy[0], xy[1]);
      const dropPlace = dropPlaceEls.find(
        (el) => (el as HTMLElement).dataset.dropplace
      ) as HTMLElement;
      if (!dropPlace) return;
      const placeOnBoard = dropPlace.dataset.dropplace;
      if (!placeOnBoard) return;
      const pos: DraggedPiece = JSON.parse(placeOnBoard);
      const moveFromSquare = `${file}${rank}` as const;
      const moveToSquare = `${pos.file}${pos.rank}` as const;

      const success = move({ from: moveFromSquare, to: moveToSquare });
      if (success) return;

      setIsPieceClicked(true);
      clickedPieceRef.current = { rank, file };
      setClickedPiece({ rank, file });
    },
  });

  const handleAuxClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
  };

  useEffect(() => {}, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const leftClick = () => {
      if (!clickedPieceRef.current) return;
      const pieceRef = clickedPieceRef.current;
      const moveFromSquare = `${pieceRef.file}${pieceRef.rank}` as const;
      const dropPlace = e.currentTarget.dataset.dropplace;
      if (!dropPlace) return;
      const dropPos: DraggedPiece = JSON.parse(dropPlace);
      const moveToSquare = `${dropPos.file}${dropPos.rank}` as const;
      const fromSquare = `${pieceRef.file}${pieceRef.rank}` as const;
      if (moveToSquare === fromSquare) return;
      const success = move({ from: moveFromSquare, to: moveToSquare });
      if (success) return;
      setIsPieceClicked(false);
      clickedPieceRef.current = null;
      setClickedPiece(null);
    };
    const rightClick = () => {
      cancelDrag();
      cancelClick();
      cancelDragRef.current = true;
    };

    if (e.button === 0) leftClick();
    if (e.button === 2) rightClick();
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
      "cursor-grab": occupiedBy,
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
      onMouseDown={handleMouseDown}
    >
      {row === 7 && <span className={clsText("rank")}>{file}</span>}
      {col === 0 && <span className={clsText("file")}>{rank}</span>}
      {children && (
        <a.div
          {...bind()}
          className="absolute left-0 top-0 z-10 h-full w-full "
          style={style}
        >
          {children}
        </a.div>
      )}
    </div>
  );
};

export default Square;
