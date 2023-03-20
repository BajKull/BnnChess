"use client";

import useTwitchChat from "@/hooks/useTwitchChat";
import React, { use } from "react";

const ChatMoves = () => {
  useTwitchChat("slayproxx");
  return <div>ChatMoves</div>;
};

export default ChatMoves;
