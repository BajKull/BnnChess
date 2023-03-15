import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { create } from "zustand";

const initGame = new Chess();

type Board = ({
  square: Square;
  type: PieceSymbol;
  color: Color;
} | null)[][];

interface GameStore {
  game: Chess;
  setGame: (g: Chess) => void;
  boardToRender: Board;
  setBoardToRender: (b: Board) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  game: initGame,
  setGame: (g) => set(() => ({ game: g })),
  boardToRender: initGame.board(),
  setBoardToRender: (b) => set(() => ({ boardToRender: b })),
}));
