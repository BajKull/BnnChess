"use client";

import useTwitchChat from "@/hooks/useTwitchChat";
import React from "react";

const ChatMoves = () => {
  useTwitchChat("slayproxx");
  return <div className="px-10">ChatMoves</div>;
};

export default ChatMoves;
