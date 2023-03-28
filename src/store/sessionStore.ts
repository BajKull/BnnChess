import { Session } from "next-auth";
import { create } from "zustand";

interface PieceStore {
  session: Session | null;
  setSession: (v: Session) => void;
}

export const useSessionStore = create<PieceStore>((set) => ({
  session: null,
  setSession: (v) => set(() => ({ session: v })),
}));
