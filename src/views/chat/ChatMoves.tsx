"use client";

import useTwitchChat from "@/hooks/useTwitchChat";
import classNames from "classnames";
import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useChatStore } from "@/store/chatMovesStore";

const ChatMoves = () => {
  const chatMoves = useChatStore((state) => state.chatMoves).render;
  const isChatTurn = useChatStore((state) => state.isChatTurn);
  useTwitchChat("slayproxx");

  const [movesListRef] = useAutoAnimate();

  const clsDiv = (i: number) =>
    classNames("flex flex-col rounded-md p-5 text-white relative", {
      "bg-zinc-800": i !== 0,
      "bg-purple-800": i === 0,
    });

  const clsSpan = (i: number) =>
    classNames("mr-2 mb-1 rounded-full px-3 py-1 text-xs", {
      "bg-zinc-900": i !== 0,
      "bg-purple-900": i === 0,
    });

  return (
    <div className="h-full">
      <p className="mb-5 flex pl-5 pr-[26px] font-medium text-white lg:pl-10 lg:pr-[46px]">
        {isChatTurn ? "Collecting moves from chat" : "Last vote results"}
        <span className="ml-auto flex h-[22px] w-[22px] cursor-pointer items-center justify-center rounded-full bg-zinc-800 text-sm hover:bg-zinc-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192 512"
            className="h-3 w-3"
          >
            <path
              fill="white"
              d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"
            />
          </svg>
        </span>
      </p>
      <div
        className="custom-scroll h-full overflow-y-scroll px-5 lg:px-10"
        style={{ maxHeight: "calc(100% - 44px)" }}
      >
        <ul className="space-y-2" ref={movesListRef}>
          {chatMoves.length === 0 && (
            <li className={clsDiv(5)}>
              <span className="animate-pulse">Waiting for moves...</span>
            </li>
          )}
          {chatMoves.map((move, i) => (
            <li key={`chat-move-${move.move}`} className={clsDiv(i)}>
              <div className="flex">
                <p className="mr-auto font-semibold">{move.move}</p>
                <p className="text-sm font-medium">{move.votes.length}</p>
              </div>
              <div className="mt-1 flex w-full flex-wrap">
                {move.votes.map((user) => (
                  <span className={clsSpan(i)} key={user}>
                    {user}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatMoves;
