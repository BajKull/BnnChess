"use client";

import React from "react";
import RotateSvg from "@/../public/icons/rotate.svg";
import { useGameStore } from "@/store/gameStore";

const DisplayOptions = () => {
  const toggleIsBoardRotated = useGameStore(
    (state) => state.toggleIsBoardRotated
  );
  return (
    <div className="absolute right-0 lg:-bottom-[31px]">
      <button
        className="h-4 w-4 fill-zinc-500"
        aria-label="Rotate chessboard"
        title="Rotate chessboard"
        onClick={() => toggleIsBoardRotated()}
      >
        <RotateSvg />
      </button>
    </div>
  );
};

export default DisplayOptions;
