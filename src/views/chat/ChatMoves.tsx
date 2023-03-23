"use client";

import useTwitchChat from "@/hooks/useTwitchChat";
import React, { use } from "react";

const ChatMoves = () => {
  useTwitchChat("rybsonlol_");
  return <div className="px-10">ChatMoves</div>;
};

export default ChatMoves;
