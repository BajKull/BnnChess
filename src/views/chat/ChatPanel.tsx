"use client";

import useChessActions from "@/hooks/useChessActions";
import { useChatStore } from "@/store/chatMovesStore";
import { useGameStore } from "@/store/gameStore";
import React, { useEffect, useRef } from "react";
import { Id, toast } from "react-toastify";
import GameSettings from "../gameSettings/GameSettings";
import ChatMoves from "./ChatMoves";
import TimeBar from "./TimeBar";

const ChatPanel = () => {
  const gameState = useGameStore((state) => state.gameState);
  const moveTime = useGameStore((state) => state.moveTime);
  const isChatTurn = useChatStore((state) => state.isChatTurn);
  const chatMoveRef = useChatStore((state) => state.chatMoveRef);
  const resetTimerTrigger = useChatStore((state) => state.resetTimerTrigger);

  const toastId = useRef<Id>("");

  const { move } = useChessActions();

  useEffect(() => {
    if (!isChatTurn) return;

    const waitForMove = () => {
      setTimeout(() => {
        if (!chatMoveRef.current) {
          waitForMove();
          resetTimerTrigger();
          if (toast.isActive(toastId.current)) return;
          toastId.current = toast.error(
            "No legal moves were made in chat. Vote again.",
            {
              autoClose: 4000,
            }
          );
          return;
        }
        const success = move(chatMoveRef.current);
        if (!success) resetTimerTrigger();
      }, moveTime * 1000);
    };

    waitForMove();
  }, [chatMoveRef, isChatTurn, move, moveTime, resetTimerTrigger]);

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
