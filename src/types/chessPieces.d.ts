import { ChessboardFile, ChessboardRank } from "./chessboard";

type PieceColor = "white" | "black";
type PieceName = "pawn" | "bishop" | "knight" | "rook" | "queen" | "king";

type ChessPiece = {
  name: PieceName;
  position: {
    rank: ChessboardRank;
    file: ChessboardFile;
  };
  color: PieceColor;
  image: string;
};
