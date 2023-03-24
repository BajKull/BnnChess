import { ranks } from "@/constants/board";
import { ChessboardFile, ChessboardRank } from "@/types/chessboard";
import { Color } from "chess.js";

export const fileToValue = (file?: ChessboardFile, reversed?: boolean) => {
  if (!file) return 0;
  const values = reversed
    ? { a: 8, b: 7, c: 6, d: 5, e: 4, f: 3, g: 2, h: 1 }
    : { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 };
  return values[file];
};

type PositionTranslate = {
  rank?: ChessboardRank;
  file?: ChessboardFile;
  playerColor: Color;
};

export const positionTranslate = ({
  rank = 1,
  file = "a",
  playerColor,
}: PositionTranslate) => {
  if (playerColor === "w")
    return {
      transform: `translateX(${fileToValue(file) * 100 - 100}%) translateY(-${
        rank * 100 - 100
      }%)`,
    };
  const reversedRank = [...ranks].reverse()[ranks.indexOf(rank)];
  return {
    transform: `translateX(${
      fileToValue(file, true) * 100 - 100
    }%) translateY(-${reversedRank * 100 - 100}%)`,
  };
};

type Move = {
  from: string;
  to: string;
};

export const generateFakeMove = (legalMoves: Move[]) => {
  const randomMove = Math.floor(Math.random() * legalMoves.length);
  return { from: legalMoves[randomMove].from, to: legalMoves[randomMove].to };
};
