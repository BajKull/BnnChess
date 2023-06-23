import Button from "@/components/button/Button";
import { useGameStore } from "@/store/gameStore";
import { useSessionStore } from "@/store/sessionStore";
import React from "react";
import GigaChadImage from "@/../public/images/gigachad.webp";
import Image from "next/image";
import { useChatStore } from "@/store/chatMovesStore";

const GameOver = () => {
  const gameOver = useGameStore((state) => state.gameOver);
  const playerColor = useGameStore((state) => state.playerColor);
  const session = useSessionStore((state) => state.session);
  const setPlayerColor = useGameStore((state) => state.setPlayerColor);
  const restartGame = useGameStore((state) => state.restartGame);
  const setIsChatTurn = useChatStore((state) => state.setIsChatTurn);
  const resetChatMoves = useChatStore((state) => state.resetChatMoves);

  const restart = () => {
    const color = playerColor === "w" ? "b" : "w";

    setPlayerColor(color);
    setIsChatTurn(color === "b" ? true : false);
    restartGame();
    resetChatMoves();
  };

  if (!gameOver) return null;
  return (
    <div className="absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center bg-zinc-900 bg-opacity-50">
      <div className="rounded bg-white p-10 text-center">
        <p className="mb-5 text-xl font-semibold lg:text-3xl">Game over!</p>
        <figure className="relative mx-auto mb-5 flex h-10 w-10 items-center justify-center text-2xl shadow-md lg:h-20 lg:w-20 lg:text-5xl lg:shadow-lg">
          {gameOver === "draw" ? (
            "😬"
          ) : (
            <>
              {gameOver !== playerColor ? (
                <>
                  {session?.user?.image ? (
                    <Image
                      src={session?.user?.image || ""}
                      alt=""
                      fill={true}
                    />
                  ) : (
                    <div className="w-ful flex h-full items-center justify-center bg-purple-800 font-semibold text-white">
                      {session?.user?.image?.[0] || "B"}
                    </div>
                  )}
                </>
              ) : (
                <Image src={GigaChadImage} fill={true} alt="" />
              )}
            </>
          )}
        </figure>
        <p className="mb-5 font-semibold lg:text-xl">
          {gameOver === "draw" ? (
            "Game ended in a draw"
          ) : (
            <>
              {gameOver !== playerColor && `${session?.user?.name} won`}
              {gameOver === playerColor && "Chat won"}
            </>
          )}
        </p>
        <Button primary onClick={restart}>
          Play again
        </Button>
      </div>
    </div>
  );
};

export default GameOver;
