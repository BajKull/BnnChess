"use client";

import { useGameStore } from "@/store/gameStore";
import React from "react";
import GameSettings from "../gameSettings/GameSettings";
import ChatMoves from "./ChatMoves";
import TimeBar from "./TimeBar";

const ChatPanel = () => {
  const gameState = useGameStore((state) => state.gameState);
  return (
    <>
      {gameState === "settings" && <GameSettings />}
      {gameState === "game" && (
        <>
          <ChatMoves />
          <TimeBar />
        </>
      )}
      {/* {gameState === 'results' && <GameSettings />} */}
    </>
  );
};

export default ChatPanel;
