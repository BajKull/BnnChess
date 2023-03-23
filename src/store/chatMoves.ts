import { generateFakeMove } from "@/chessboard/utils";
import { create } from "zustand";
import { useGameStore } from "./gameStore";

type Votes = Map<string, string[]>;
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
      // if (!legalMoves.find((m) => m.from === v.move.from && m.to === v.move.to))
      //   return state;
      if (state.usersVoted.has(v.user)) return state;

      const fakeMove = generateFakeMove(legalMoves);
      // const moveKey = `${v.move.from} - ${v.move.to}`;
      const moveKey = `${fakeMove.from} - ${fakeMove.to}`;

      const moveVoters = state.chatMoves.get(moveKey);
      return {
        usersVoted: new Set(state.usersVoted).add(v.user),
        chatMoves: new Map(state.chatMoves).set(
          moveKey,
          moveVoters ? [...moveVoters, v.user] : [v.user]
        ),
      };
    }),
  resetUsersVoted: () => set(() => ({ usersVoted: new Set() })),
}));
