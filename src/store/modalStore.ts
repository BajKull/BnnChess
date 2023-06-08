import { create } from "zustand";

type ModalScreen = "howToMove";

interface ModalStore {
  modal?: ModalScreen;
  setModal: (v?: ModalScreen) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modal: undefined,
  setModal: (v) => set(() => ({ modal: v })),
}));
