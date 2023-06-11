import Modal from "@/components/modal/Modal";
import { LOCALSTORAGE_KEYS } from "@/constants/localstorage";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useModalStore } from "@/store/modalStore";
import React from "react";

interface IProps {
  show: boolean;
  setModalStorage: (value: unknown) => unknown;
}

const HowToVote = ({ show, setModalStorage }: IProps) => {
  const setModal = useModalStore((state) => state.setModal);

  const onClose = () => {
    setModal(undefined);
    setModalStorage(true);
  };

  return (
    <Modal show={show} onClose={onClose}>
      asd
    </Modal>
  );
};

export default HowToVote;
