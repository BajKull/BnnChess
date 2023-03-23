import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { create } from "zustand";

const initGame = new Chess();

export type Move = {
  from: Square;
  to: Square;
};

export type GameState = "settings" | "game" | "results";

type Board = ({
  square: Square;
  type: PieceSymbol;
  color: Color;
} | null)[][];

interface GameStore {
  game: Chess;
  setGame: (g: Chess) => void;
  restartGame: () => void;
  boardToRender: Board;
  setBoardToRender: (b: Board) => void;
  legalMoves: Move[];
  setLegalMoves: (moves: Move[]) => void;
  playerColor: "b" | "w";
  setPlayerColor: (v: "b" | "w") => void;
  moveTime: number;
  setMoveTime: (v: number) => void;
  gameState: GameState;
  setGameState: (v: GameState) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  game: initGame,
  setGame: (g) => set(() => ({ game: g })),
  restartGame: () =>
    set(() => {
      const newGame = new Chess();
      return { game: newGame, legalMoves: newGame.moves({ verbose: true }) };
    }),
  boardToRender: initGame.board(),
  setBoardToRender: (b) => set(() => ({ boardToRender: b })),
  legalMoves: [],
  setLegalMoves: (m) => set(() => ({ legalMoves: m })),
  playerColor: "w",
  setPlayerColor: (v) => set(() => ({ playerColor: v })),
  moveTime: 30,
  setMoveTime: (v) => set(() => ({ moveTime: v })),
  gameState: "settings",
  setGameState: (v) => set(() => ({ gameState: v })),
}));
