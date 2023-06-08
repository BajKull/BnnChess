import React from "react";
import HowToVote from "./HowToVote";
import { useModalStore } from "@/store/modalStore";

const Tutorials = () => {
  const modalScreen = useModalStore((state) => state.modal);

  if (!modalScreen) return null;
  return <>{modalScreen === "howToMove" && <HowToVote />}</>;
};

export default Tutorials;
