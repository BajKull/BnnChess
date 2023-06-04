import { Chess, Color, Piece, PieceSymbol, Square } from "chess.js";
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

export type PiecesTaken = { [key in PieceSymbol]: number } & { diff: number };

interface GameStore {
  game: Chess;
  setGame: (g: Chess) => void;
  restartGame: () => void;
  piecesTaken: { white: PiecesTaken; black: PiecesTaken } | null;
  boardToRender: Board;
  setBoardToRender: (b: Board) => void;
  legalMoves: Move[];
  setLegalMoves: (moves: Move[]) => void;
  playerColor: "b" | "w";
  setPlayerColor: (v: "b" | "w") => void;
  moveTime: number;
  setMoveTime: (v: number) => void;
  autoPromoteToQueen: boolean;
  setAutoPromoteToQueen: (v: boolean) => void;
  gameState: GameState;
  setGameState: (v: GameState) => void;
  lastMove?: Move;
  setLastMove: (v?: Move) => void;
  showPromotionScreen?: Move;
  setShowPromotionScreen: (v?: Move) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  game: initGame,
  setGame: (g) => set(() => ({ game: g })),
  restartGame: () =>
    set(() => {
      const newGame = new Chess("k7/8/2Q5/8/8/8/7p/K7 w - - 0 1");
      return {
        game: newGame,
        legalMoves: newGame.moves({ verbose: true }),
        boardToRender: newGame.board(),
        lastMove: undefined,
      };
    }),
  piecesTaken: null,
  boardToRender: initGame.board(),
  setBoardToRender: (b) =>
    set(() => {
      const pieces = b.flat().filter(Boolean);
      const whitePieces = { p: 8, n: 2, b: 2, r: 2, q: 1, k: 1, diff: 0 };
      const blackPieces = { p: 8, n: 2, b: 2, r: 2, q: 1, k: 1, diff: 0 };
      let whiteVal = 0;
      let blackVal = 0;
      pieces.forEach((p) => {
        if (!p) return;
        const val = getPieceValue(p.type);
        if (p.color === "b") {
          blackVal += val;
          return blackPieces[p.type]--;
        }
        whiteVal += val;
        whitePieces[p.type]--;
      });
      whitePieces.diff = blackVal - whiteVal;
      blackPieces.diff = whiteVal - blackVal;

      return {
        boardToRender: b,
        piecesTaken: { white: whitePieces, black: blackPieces },
      };
    }),
  legalMoves: [],
  setLegalMoves: (m) => set(() => ({ legalMoves: m })),
  playerColor: "w",
  setPlayerColor: (v) => set(() => ({ playerColor: v })),
  moveTime: 30,
  setMoveTime: (v) => set(() => ({ moveTime: v })),
  autoPromoteToQueen: true,
  setAutoPromoteToQueen: (v) => set(() => ({ autoPromoteToQueen: v })),
  gameState: "settings",
  setGameState: (v) => set(() => ({ gameState: v })),
  lastMove: undefined,
  setLastMove: (v) => set(() => ({ lastMove: v })),
  showPromotionScreen: undefined,
  setShowPromotionScreen: (v) => set(() => ({ showPromotionScreen: v })),
}));

const getPieceValue = (p: PieceSymbol) => {
  switch (p) {
    case "p":
      return 1;
    case "b":
      return 3;
    case "n":
      return 3;
    case "r":
      return 5;
    case "q":
      return 9;
    default:
      return 0;
  }
};
