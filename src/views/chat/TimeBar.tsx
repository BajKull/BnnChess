"use client";

import { useGameStore } from "@/store/gameStore";
import classNames from "classnames";
import React from "react";
import cls from "./timeBar.module.scss";
import ReactDOM from "react-dom";
import { useChatStore } from "@/store/chatMoves";

const TimeBar = () => {
  const moveTime = useGameStore((state) => state.moveTime);
  const isChatTurn = useChatStore((state) => state.isChatTurn);
  const timerTrigger = useChatStore((state) => state.timerTrigger);

  const clsDiv = classNames(
    cls.timeBar,
    "fixed top-0 left-0 h-1 bg-purple-800"
  );

  if (!isChatTurn) return null;
  if (typeof document === "undefined") return null;
  return ReactDOM.createPortal(
    <div
      className={clsDiv}
      style={{ animationDuration: `${moveTime}s` }}
      key={timerTrigger}
    />,
    document.body
  );
};

export default TimeBar;
