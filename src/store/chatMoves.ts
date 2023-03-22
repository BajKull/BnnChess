import { create } from "zustand";

type Votes = Map<string, Set<string>>;

interface ChatStore {
  chatMoves: Votes;
  setChatMoves: (m: Votes) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chatMoves: new Map(),
  setChatMoves: (m) => set(() => ({ chatMoves: m })),
}));
