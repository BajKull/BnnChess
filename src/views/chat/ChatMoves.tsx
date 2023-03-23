"use client";

import useTwitchChat from "@/hooks/useTwitchChat";
import { useChatStore } from "@/store/chatMoves";
import classNames from "classnames";
import { nanoid } from "nanoid";
import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const ChatMoves = () => {
  const chatMoves = useChatStore((state) => state.chatMoves);
  const isChatTurn = useChatStore((state) => state.isChatTurn);
  useTwitchChat("slayproxx");

  const [movesListRef] = useAutoAnimate();

  const clsDiv = (i: number) =>
    classNames("flex rounded-md p-5 text-white", {
      "bg-zinc-800": i !== 0,
      "bg-purple-800": i === 0,
    });

  const movesToRender = Array.from(chatMoves.keys())
    .map((key) => ({
      move: key,
      votes: chatMoves.get(key) || 0,
    }))
    .sort((a, b) => b.votes - a.votes);

  return (
    <div className="custom-scroll h-full max-h-full overflow-y-auto px-10">
      <p className="mb-5 font-medium text-white">
        {isChatTurn ? "Collecting moves from chat" : "Last vote results"}
      </p>
      <ul className="space-y-2" ref={movesListRef}>
        {movesToRender.map((move, i) => (
          <li key={`chat-move-${move.move}`} className={clsDiv(i)}>
            <p className="mr-auto">{move.move}</p>
            <p>{move.votes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatMoves;
