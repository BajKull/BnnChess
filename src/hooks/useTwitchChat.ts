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
        const message = parseChatMessage(data.data);
        if (!message) return;
        if (message.system) return ws.send(`PONG ${message.content}`);

        const [from, to] = message.content.split("-");
        // if (!to || !from) return
        const vote = {
          user: message.username,
          move: { from: from.trim(), to: to.trim() },
        };
        addUserVote(vote);
      });
    };

    getAsyncSession();

    return () => {
      ws.close();
    };
  }, [addUserVote, channel, session]);
};

type Msg = {
  username: string;
  channel: string;
  content: string;
  system?: boolean;
};

const parseChatMessage = (msg: string): Msg | undefined => {
  const message = {
    username: "",
    channel: "",
    content: "",
  };

  if (msg.startsWith("PING"))
    return {
      username: "",
      channel: "",
      content: msg.replace("PING ", ""),
      system: true,
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
      break;
    }
  }
  return message;
};

export default useTwitchChat;
