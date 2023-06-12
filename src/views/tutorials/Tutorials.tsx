import React from "react";
import HowToVote from "./HowToVote";
import { useModalStore } from "@/store/modalStore";
import useLocalStorage from "@/hooks/useLocalStorage";
import { LOCALSTORAGE_KEYS } from "@/constants/localstorage";
import HowToPromote from "./HowToPromote";

const Tutorials = () => {
  const [howToMoveStorage, setHowToMoveStorage] = useLocalStorage(
    LOCALSTORAGE_KEYS.TUTORIALS.HOW_TO_VOTE
  );
  const [howToPromoteStorage, setHowToPromoteStorage] = useLocalStorage(
    LOCALSTORAGE_KEYS.TUTORIALS.HOW_TO_PROMOTE
  );
  const modalScreen = useModalStore((state) => state.modal);

  return (
    <>
      <HowToVote
        setModalStorage={setHowToMoveStorage}
        show={modalScreen === "howToMove" || !howToMoveStorage}
      />
      <HowToPromote
        setModalStorage={setHowToPromoteStorage}
        show={modalScreen === "howToPromote" || !howToPromoteStorage}
      />
    </>
  );
};

export default Tutorials;
