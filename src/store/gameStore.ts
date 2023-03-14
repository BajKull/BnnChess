import { Chess } from "chess.js";
import { create } from "zustand";

interface GameStore {
  game: Chess;
  setGame: (g: Chess) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  game: new Chess(),
  setGame: (g) => set(() => ({ game: g })),
}));
