import { create } from "zustand";

type Votes = Map<string, Set<string>>;

interface GameStore {
  chatMoves: Votes;
  setChatMoves: (m: Votes) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  chatMoves: new Map(),
  setChatMoves: (m) => set(() => ({ chatMoves: m })),
}));
