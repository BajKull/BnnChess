"use client";

import React, { useEffect, useRef, useState } from "react";
import { generateFakeMove } from "../chessboard/utils";
import colors from "tailwindcss/colors";

const MESSAGES_LIMIT = 25;

type Msg = {
  user: { color: string; name: string };
  content: string;
};

interface IProps {
  visibleMessages: number;
}

const FakeChat = ({ visibleMessages }: IProps) => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [messagesTranslateAmount, setMessagesTranslateAmount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();
  const messagesLengthRef = useRef(0);

  useEffect(() => {
    const getRandomTime = () => Math.floor(Math.random() * 1250 + 250);
    const runTimeout = () => {
      if (messagesLengthRef.current < MESSAGES_LIMIT)
        setMessages((m) => {
          if (m.length >= visibleMessages) {
            const movesOffScreen = [];
            for (let i = m.length; i <= MESSAGES_LIMIT; i++) {
              const move = generateFakeMove(moves);
              movesOffScreen.push({
                user: users[i % users.length],
                content: `${move.from} - ${move.to}`,
              });
            }
            messagesLengthRef.current = m.length;
            return [...m, ...movesOffScreen];
          }
          messagesLengthRef.current = m.length;
          const move = generateFakeMove(moves);
          return [
            ...m,
            {
              user: users[m.length % users.length],
              content: `${move.from} - ${move.to}`,
            },
          ];
        });
      else
        setMessagesTranslateAmount(
          (val) => (val + 32) % ((MESSAGES_LIMIT - 13) * 32)
        );
      setTimeout(runTimeout, getRandomTime());
    };
    if (!timerRef.current)
      timerRef.current = setTimeout(runTimeout, getRandomTime());

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [visibleMessages]);

  return (
    <div className="custom-scroll max-h-full overflow-y-hidden">
      <div style={{ transform: `translateY(-${messagesTranslateAmount}px)` }}>
        {messages.length < visibleMessages && (
          <p className="h-8 px-2 py-1 text-sm font-semibold text-zinc-600">
            Welcome to the chat room!
          </p>
        )}
        {messages.map((m, i) => (
          <p
            key={`fakeChatMsg ${m.user} ${i}`}
            className="rounded py-1 px-2 hover:bg-zinc-800"
          >
            <span style={{ color: m.user.color }} className="mr-px font-bold">
              {m.user.name}
            </span>
            : {m.content}
          </p>
        ))}
      </div>
    </div>
  );
};

const moves = [
  { from: "e2", to: "e4" },
  { from: "d2", to: "d4" },
  { from: "b1", to: "c3" },
  { from: "g1", to: "f3" },
  { from: "e2", to: "e3" },
];
const users = [
  { color: colors.purple[600], name: "Bnn" },
  { color: colors.pink[600], name: "Brajanowski" },
  { color: colors.green[700], name: "Brk" },
  { color: colors.pink[600], name: "Gachi" },
  { color: colors.cyan[800], name: "Pdr" },
  { color: colors.emerald[600], name: "Crsr" },
  { color: colors.teal[600], name: "Jss" },
  { color: colors.purple[600], name: "Magi" },
  { color: colors.pink[600], name: "Aniki" },
  { color: colors.rose[700], name: "Lil B" },
  { color: colors.emerald[600], name: "forsenCD" },
  { color: colors.cyan[800], name: "xdd" },
  { color: colors.pink[600], name: "Billy" },
  { color: colors.orange[600], name: "Knk" },
  { color: colors.green[700], name: "Normie" },
  { color: colors.orange[600], name: "PogU" },
  { color: colors.rose[600], name: "FeelsGoodMan" },
  { color: colors.teal[600], name: "COPIUM" },
  { color: colors.orange[600], name: "Sadeg" },
  { color: colors.purple[600], name: "Okayeg" },
  { color: colors.teal[600], name: "Luna" },
  { color: colors.emerald[600], name: "EZ" },
  { color: colors.green[600], name: "Kappa" },
  { color: colors.teal[600], name: "GIGACHAD" },
  { color: colors.rose[600], name: "Clueless" },
];

export default FakeChat;
