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
  reversed: boolean;
};

export const getBoardRotation = (playerColor: Color, isBoardRotated: boolean) =>
  (playerColor === "w" && !isBoardRotated) ||
  (playerColor === "b" && isBoardRotated);

export const positionTranslate = ({
  rank = 1,
  file = "a",
  reversed,
}: PositionTranslate) => {
  if (reversed)
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

export const promotionToPieceSymbol = (s: string) => {
  switch (s) {
    case "queen":
      return "q";
    case "rook":
      return "r";
    case "bishop":
      return "b";
    case "knight":
      return "n";
    default:
      return "q";
  }
};

type Move = {
  from: string;
  to: string;
};

export const generateFakeMove = (legalMoves: Move[], promotion?: Move) => {
  if (promotion) {
    const promotions = ["knight", "bishop", "rook", "queen"];
    const randomMove = Math.floor(Math.random() * promotions.length);
    return { from: promotions[randomMove] };
  } else {
    const randomMove = Math.floor(Math.random() * legalMoves.length);
    return { from: legalMoves[randomMove].from, to: legalMoves[randomMove].to };
  }
};
