import { create } from "zustand";

type Votes = Map<string, number>;

interface ChatStore {
  chatMoves: Votes;
  isChatTurn: boolean;
  setIsChatTurn: (v: boolean) => void;
  usersVoted: Set<string>;
  addUserVote: ({ user, move }: { user: string; move: string }) => void;
  resetUsersVoted: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chatMoves: new Map(),
  isChatTurn: false,
  setIsChatTurn: (v) => set(() => ({ isChatTurn: v })),
  usersVoted: new Set(),
  addUserVote: (v) =>
    set((state) => {
      if (state.usersVoted.has(v.user)) return state;
      return {
        usersVoted: new Set(state.usersVoted).add(v.user),
        chatMoves: new Map(state.chatMoves).set(
          v.move,
          (state.chatMoves.get(v.move) || 0) + 1
        ),
      };
    }),
  resetUsersVoted: () => set(() => ({ usersVoted: new Set() })),
}));
