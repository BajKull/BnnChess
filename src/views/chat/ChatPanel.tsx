"use client";

import useChessActions from "@/hooks/useChessActions";
import { useChatStore } from "@/store/chatMoves";
import { useGameStore } from "@/store/gameStore";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import GameSettings from "../gameSettings/GameSettings";
import ChatMoves from "./ChatMoves";
import TimeBar from "./TimeBar";

const ChatPanel = () => {
  const gameState = useGameStore((state) => state.gameState);
  const moveTime = useGameStore((state) => state.moveTime);
  const isChatTurn = useChatStore((state) => state.isChatTurn);
  const chatMoveRef = useChatStore((state) => state.chatMoveRef);
  const resetTimerTrigger = useChatStore((state) => state.resetTimerTrigger);

  const { move } = useChessActions();

  useEffect(() => {
    if (!isChatTurn) return;

    console.log("useeffect");

    const waitForMove = () => {
      setTimeout(() => {
        console.log("timeout");
        if (!chatMoveRef.current) {
          waitForMove();
          toast.error("No legal moves were made in chat. Vote again.", {
            autoClose: 4000,
          });
          resetTimerTrigger();
          return;
        }
        move(chatMoveRef.current);
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
