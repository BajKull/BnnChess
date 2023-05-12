import { ChessboardFile, ChessboardRank } from "@/types/chessboard";
import { createRef } from "react";
import { create } from "zustand";

export type DraggedPiece = { rank: ChessboardRank; file: ChessboardFile };

interface PieceStore {
  isPieceDragged: boolean;
  toggleIsPieceDragged: () => void;
  draggedPiece: DraggedPiece | null;
  setDraggedPiece: (piece: DraggedPiece) => void;
  isPieceClicked: boolean;
  toggleIsPieceClicked: () => void;
  setIsPieceClicked: (v: boolean) => void;
  clickedPiece: DraggedPiece | null;
  setClickedPiece: (piece: DraggedPiece | null) => void;
  clickedPieceRef: React.MutableRefObject<DraggedPiece | null>;
  draggingOver: DraggedPiece | null;
  setDraggingOver: (piece: DraggedPiece) => void;
  cancelDrag: () => void;
  cancelClick: () => void;
}

export const usePieceStore = create<PieceStore>((set) => ({
  isPieceDragged: false,
  toggleIsPieceDragged: () =>
    set((state) => ({ isPieceDragged: !state.isPieceDragged })),
  draggedPiece: null,
  setDraggedPiece: (piece) => set(() => ({ draggedPiece: piece })),
  isPieceClicked: false,
  toggleIsPieceClicked: () =>
    set((state) => ({ isPieceClicked: !state.isPieceClicked })),
  setIsPieceClicked: (v) => set(() => ({ isPieceClicked: v })),
  clickedPiece: null,
  setClickedPiece: (piece) => set(() => ({ clickedPiece: piece })),
  clickedPieceRef: createRef(),
  draggingOver: null,
  setDraggingOver: (piece) =>
    set(({ draggingOver }) => {
      if (draggingOver?.file === piece.file && draggingOver.rank === piece.rank)
        return { draggingOver };
      return { draggingOver: piece };
    }),
  cancelDrag: () =>
    set(() => ({
      isPieceDragged: false,
      draggedPiece: null,
      draggingOver: null,
    })),
  cancelClick: () =>
    set((state) => {
      state.clickedPieceRef.current = null;
      return { isPieceClicked: false, clickedPiece: null };
    }),
}));
