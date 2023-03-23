"use client";

import useChessActions from "@/hooks/useChessActions";
import { useChatStore } from "@/store/chatMoves";
import { useGameStore } from "@/store/gameStore";
import React, { useEffect } from "react";
import GameSettings from "../gameSettings/GameSettings";
import ChatMoves from "./ChatMoves";
import TimeBar from "./TimeBar";

const ChatPanel = () => {
  const gameState = useGameStore((state) => state.gameState);
  const moveTime = useGameStore((state) => state.moveTime);
  const isChatTurn = useChatStore((state) => state.isChatTurn);
  const chatMoveRef = useChatStore((state) => state.chatMoveRef);

  const { move } = useChessActions();

  useEffect(() => {
    if (!isChatTurn) return;

    setTimeout(() => {
      if (!chatMoveRef.current) return;
      move(chatMoveRef.current);
    }, moveTime * 1000);
  }, [chatMoveRef, isChatTurn, move, moveTime]);

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
