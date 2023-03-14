import { ChessboardFile, ChessboardRank } from "@/types/chessboard";
import { create } from "zustand";

export type DraggedPiece = { rank: ChessboardRank; file: ChessboardFile };

interface PieceStore {
  isPieceDragged: boolean;
  toggleIsPieceDragged: () => void;
  draggedPiece: DraggedPiece | null;
  setDraggedPiece: (piece: DraggedPiece) => void;
  draggingOver: DraggedPiece | null;
  setDraggingOver: (piece: DraggedPiece) => void;
}

export const usePieceStore = create<PieceStore>((set) => ({
  isPieceDragged: false,
  toggleIsPieceDragged: () =>
    set((state) => ({ isPieceDragged: !state.isPieceDragged })),
  draggedPiece: null,
  setDraggedPiece: (piece) => set(() => ({ draggedPiece: piece })),
  draggingOver: null,
  setDraggingOver: (piece) =>
    set(({ draggingOver }) => {
      if (draggingOver?.file === piece.file && draggingOver.rank === piece.rank)
        return { draggingOver };
      return { draggingOver: piece };
    }),
}));
