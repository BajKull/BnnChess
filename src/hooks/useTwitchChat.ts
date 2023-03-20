"use client";

import { getSession } from "next-auth/react";
import { useEffect } from "react";

const useTwitchChat = (channel: string) => {
  useEffect(() => {
    const ws = new WebSocket("ws://irc-ws.chat.twitch.tv:80");

    const getAsyncSession = async () => {
      const session = await getSession();
      console.log(session);
      if (!session) return;
      ws.addEventListener("open", () => {
        console.log("connection estabilished");
        ws.send(`PASS oauth:${session.user.authToken}`);
        ws.send(`NICK ${session.user.name}`);
        ws.send(`JOIN #${channel}`);
      });
      // ws.on("open", );

      ws.addEventListener("message", (data) => {
        console.log(data);
      });
    };

    getAsyncSession();

    return () => {
      ws.close();
    };
  }, [channel]);
};

export default useTwitchChat;
