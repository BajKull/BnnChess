import { Chess } from "chess.js";
import { create } from "zustand";

interface MidiPlayingTimestamp {
  game: Chess;
  setGame: (g: Chess) => void;
}

export const useGameStore = create<MidiPlayingTimestamp>((set) => ({
  game: new Chess(),
  setGame: (g) => set(() => ({ game: g })),
}));
