"use client";

import Avatar from "@/components/avatar/Avatar";
import { useGameStore } from "@/store/gameStore";
import { useSessionStore } from "@/store/sessionStore";
import React from "react";
import GigaChadImage from "@/../public/gigachad.webp";
import classNames from "classnames";

interface IProps {
  position: "top" | "bottom";
}

const PlayerAvatar = ({ position }: IProps) => {
  const session = useSessionStore((state) => state.session);
  const playerColor = useGameStore((state) => state.playerColor);

  const clsAvatar = classNames("absolute z-10", {
    "-top-[50px]": position === "top",
    "-bottom-[50px]": position === "bottom",
  });

  if (
    (position === "top" && playerColor === "b") ||
    (position === "bottom" && playerColor === "w")
  )
    return (
      <Avatar
        name={session?.user?.name}
        image={session?.user?.image}
        className={clsAvatar}
      />
    );
  return <Avatar name="Chat" image={GigaChadImage} className={clsAvatar} />;
};

export default PlayerAvatar;
