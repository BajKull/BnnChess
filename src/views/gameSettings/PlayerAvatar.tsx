"use client";

import Avatar from "@/components/avatar/Avatar";
import { useGameStore } from "@/store/gameStore";
import { useSessionStore } from "@/store/sessionStore";
import React from "react";
import GigaChadImage from "@/../public/images/gigachad.webp";
import classNames from "classnames";
import { getBoardRotation } from "../chessboard/utils";

interface IProps {
  position: "top" | "bottom";
}

const PlayerAvatar = ({ position }: IProps) => {
  const session = useSessionStore((state) => state.session);
  const playerColor = useGameStore((state) => state.playerColor);
  const isBoardRotated = useGameStore((state) => state.isBoardRotated);

  const piecesTaken = useGameStore((state) => state.piecesTaken);
  const whitePiecesTaken = piecesTaken?.white;
  const blackPiecesTaken = piecesTaken?.black;

  const clsAvatar = classNames("absolute z-10", {
    "-top-[34px] lg:-top-[50px]": position === "top",
    "-bottom-[34px] lg:-bottom-[50px]": position === "bottom",
  });

  if (
    (position === "bottom" && !isBoardRotated) ||
    (position === "top" && isBoardRotated)
  )
    return (
      <Avatar
        name={session?.user?.name}
        image={session?.user?.image}
        className={clsAvatar}
        piecesTaken={playerColor === "w" ? blackPiecesTaken : whitePiecesTaken}
        color={playerColor === "w" ? "b" : "w"}
      />
    );
  return (
    <Avatar
      name="Chat"
      image={GigaChadImage}
      className={clsAvatar}
      piecesTaken={playerColor === "w" ? whitePiecesTaken : blackPiecesTaken}
      color={playerColor === "w" ? "w" : "b"}
    />
  );
};

export default PlayerAvatar;
