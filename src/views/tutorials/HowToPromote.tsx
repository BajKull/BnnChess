import Modal from "@/components/modal/Modal";
import { useModalStore } from "@/store/modalStore";
import React, { useState } from "react";
import colors from "tailwindcss/colors";
import Button from "@/components/button/Button";

interface IProps {
  show: boolean;
  setModalStorage: (value: unknown) => unknown;
}

type HoverOver = "knight" | "bishop" | "rook" | "queen";

const HowToPromote = ({ show, setModalStorage }: IProps) => {
  const setModal = useModalStore((state) => state.setModal);
  const [hoverOver, setHoverOver] = useState<HoverOver>();

  const onClose = () => {
    setModal(undefined);
    setModalStorage(true);
  };

  const getHoverStyle = (el: HoverOver) => {
    if (el === hoverOver) return { backgroundColor: colors.purple[700] };
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="h-full w-full text-white">
        <div className="flex h-full w-full flex-col items-center">
          <h2 className="text-center text-2xl font-semibold">How to promote</h2>
          <p className="mt-10 mb-5 w-full text-left leading-8">
            <span>
              Vote message should contain the name of one of the pieces:
            </span>
            <span
              className="ml-2 cursor-cell whitespace-nowrap rounded bg-zinc-800 px-2 py-1 hover:bg-purple-700"
              onPointerEnter={() => setHoverOver("knight")}
              onPointerLeave={() => setHoverOver(undefined)}
            >
              knight
            </span>
            <span
              className="mx-1 cursor-cell rounded bg-zinc-800 px-2 py-1 hover:bg-purple-700"
              onPointerEnter={() => setHoverOver("bishop")}
              onPointerLeave={() => setHoverOver(undefined)}
            >
              bishop
            </span>
            <span
              className="cursor-cell whitespace-nowrap rounded bg-zinc-800 px-2 py-1 hover:bg-purple-700"
              onPointerEnter={() => setHoverOver("rook")}
              onPointerLeave={() => setHoverOver(undefined)}
            >
              rook
            </span>
            <span
              className="mx-1 cursor-cell whitespace-nowrap rounded bg-zinc-800 px-2 py-1 hover:bg-purple-700"
              onPointerEnter={() => setHoverOver("queen")}
              onPointerLeave={() => setHoverOver(undefined)}
            >
              queen
            </span>
          </p>
          <pre className="w-full rounded-md bg-zinc-800 p-5">
            <span className="font-bold text-purple-600">Bnn</span>:{" "}
            <span style={getHoverStyle("queen")} className="rounded px-2">
              queen
            </span>
            <br />
            <span className="font-bold text-pink-600">Brajanowski</span>:{" "}
            <span style={getHoverStyle("rook")} className="rounded px-2">
              rook
            </span>
            <br />
            <span className="font-bold text-green-700">Brk</span>:{" "}
            <span style={getHoverStyle("queen")} className="rounded px-2">
              queen
            </span>
            <br />
            <span className="font-bold text-cyan-800">Pdr</span>:{" "}
            <span style={getHoverStyle("knight")} className="rounded px-2">
              knight
            </span>
            <br />
            <span className="font-bold text-orange-600">Knk</span>:{" "}
            <span style={getHoverStyle("bishop")} className="rounded px-2">
              bishop
            </span>
          </pre>
          <p className="mt-5 w-full">
            After the chosen period of time, option with the most unique votes
            will be chosen. Users can only vote when it is chat&apos;s turn.
            Every user may vote only once per move (promotion).
          </p>
          <p className="mt-5 w-full">
            If the &quot;Always promote to queen&quot; options is checked this
            vote will be skipped.
          </p>
          <p className="my-5 w-full rounded border-l-4 border-yellow-600 bg-zinc-800 p-5">
            <span className="mr-1">⚠️</span> Only valid promotions are
            considered. Every message that is not the name of one of the pieces
            mentioned above will be ignored.
          </p>
          <Button primary className="mt-auto px-5" onClick={() => onClose()}>
            Accept
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default HowToPromote;
