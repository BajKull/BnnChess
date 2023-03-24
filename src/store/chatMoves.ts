import { generateFakeMove } from "@/views/chessboard/utils";
import { Square } from "chess.js";
import { createRef } from "react";
import { create } from "zustand";
import { useGameStore } from "./gameStore";

type Votes = Map<string, string[]>;
type Move = {
  from: string;
  to: string;
};

interface ChatStore {
  chatMoves: { map: Votes; render: { move: string; votes: string[] }[] };
  isChatTurn: boolean;
  setIsChatTurn: (v: boolean) => void;
  toggleIsChatTurn: () => void;
  chatMoveRef: React.MutableRefObject<{ from: Square; to: Square } | null>;
  usersVoted: Set<string>;
  addUserVote: ({ user, move }: { user: string; move: Move }) => void;
  resetChatMoves: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chatMoves: { map: new Map(), render: [] },
  isChatTurn: false,
  setIsChatTurn: (v) => set(() => ({ isChatTurn: v })),
  toggleIsChatTurn: () => set((state) => ({ isChatTurn: !state.isChatTurn })),
  usersVoted: new Set(),
  chatMoveRef: createRef(),
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

      const moveVoters = state.chatMoves.map.get(moveKey);

      const chatMoves = new Map(state.chatMoves.map).set(
        moveKey,
        moveVoters ? [...moveVoters, v.user] : [v.user]
      );

      const movesToRender = Array.from(chatMoves.keys())
        .map((key) => ({
          move: key,
          votes: chatMoves.get(key) || [],
        }))
        .sort((a, b) => b.votes.length - a.votes.length);

      const [from, to] = movesToRender[0].move.split(" - ") as [Square, Square];
      state.chatMoveRef.current = { from, to };

      return {
        usersVoted: new Set(state.usersVoted).add(v.user),
        chatMoves: { map: chatMoves, render: movesToRender },
      };
    }),
  resetChatMoves: () =>
    set((state) => {
      state.chatMoveRef.current = null;
      return {
        usersVoted: new Set(),
        chatMoves: { map: new Map(), render: [] },
      };
    }),
}));
