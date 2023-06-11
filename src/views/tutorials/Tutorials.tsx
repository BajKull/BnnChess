import React from "react";
import HowToVote from "./HowToVote";
import { useModalStore } from "@/store/modalStore";
import useLocalStorage from "@/hooks/useLocalStorage";
import { LOCALSTORAGE_KEYS } from "@/constants/localstorage";

const Tutorials = () => {
  const [howToMoveStorage, setHowToMoveStorage] = useLocalStorage(
    LOCALSTORAGE_KEYS.TUTORIALS.HOW_TO_VOTE
  );
  const modalScreen = useModalStore((state) => state.modal);

  return (
    <>
      <HowToVote
        setModalStorage={setHowToMoveStorage}
        show={modalScreen === "howToMove" || !howToMoveStorage}
      />
    </>
  );
};

export default Tutorials;
