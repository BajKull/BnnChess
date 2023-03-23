import { Square } from "chess.js";
import { create } from "zustand";
import { useGameStore } from "./gameStore";

type Votes = Map<string, number>;
type Move = {
  from: string;
  to: string;
};

interface ChatStore {
  chatMoves: Votes;
  isChatTurn: boolean;
  setIsChatTurn: (v: boolean) => void;
  usersVoted: Set<string>;
  addUserVote: ({ user, move }: { user: string; move: Move }) => void;
  resetUsersVoted: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chatMoves: new Map(),
  isChatTurn: false,
  setIsChatTurn: (v) => set(() => ({ isChatTurn: v })),
  usersVoted: new Set(),
  addUserVote: (v) =>
    set((state) => {
      if (!state.isChatTurn) return state;
      const legalMoves = useGameStore.getState().legalMoves;

      if (!legalMoves.find((m) => m.from === v.move.from && m.to === v.move.to))
        return state;
      if (state.usersVoted.has(v.user)) return state;

      const moveKey = `${v.move.from} - ${v.move.to}`;
      return {
        usersVoted: new Set(state.usersVoted).add(v.user),
        chatMoves: new Map(state.chatMoves).set(
          moveKey,
          (state.chatMoves.get(moveKey) || 0) + 1
        ),
      };
    }),
  resetUsersVoted: () => set(() => ({ usersVoted: new Set() })),
}));
