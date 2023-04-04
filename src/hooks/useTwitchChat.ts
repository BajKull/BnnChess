"use client";

import { useChatStore } from "@/store/chatMovesStore";
import { useSessionStore } from "@/store/sessionStore";
import { useEffect } from "react";
import { toast } from "react-toastify";

const useTwitchChat = (channel: string) => {
  const addUserVote = useChatStore((state) => state.addUserVote);
  const session = useSessionStore((state) => state.session);
  useEffect(() => {
    const ws = new WebSocket("ws://irc-ws.chat.twitch.tv:80");
    const getAsyncSession = async () => {
      console.log(session);
      if (!session) return toast.error("Couldn't connect to the chat");
      ws.addEventListener("open", () => {
        toast.info("Connected to the chat");
        ws.send(`PASS oauth:${session.authToken}`);
        ws.send(`NICK ${session.user?.name}`);
        ws.send(`JOIN #${channel}`);
      });

      ws.addEventListener("message", (data) => {
        // console.log(data);
        const message = parseChatMessage(data.data);
        if (!message) return;

        const [from, to] = message.content.split("-");
        // if (!to || !from) return
        const vote = { user: message.username, move: { from, to } };
        addUserVote(vote);
      });
    };

    getAsyncSession();

    return () => {
      ws.close();
    };
  }, [addUserVote, channel, session]);
};

const parseChatMessage = (msg: string) => {
  const message = {
    username: "",
    channel: "",
    content: "",
  };

  const [nick, text] = msg.split("PRIVMSG");

  if (!nick || !text) return;

  // skip first char
  for (let i = 1; i < nick.length; i++) {
    if (nick[i] === "!") {
      message.username = msg.slice(1, i);
    }
  }

  for (let i = 0; i < text.length; i++) {
    if (text[i] === ":") {
      message.channel = text.slice(1, i - 1);
      message.content = text.slice(i + 1).replace(/(\r\n|\n|\r)/gm, "");
    }
  }
  return message;
};

export default useTwitchChat;
