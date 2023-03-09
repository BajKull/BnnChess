import { ChessboardFile, ChessboardRank } from "./chessboard";

type ChessPiece = {
  name: PieceName;
  position: {
    rank: ChessboardRank;
    file: ChessboardFile;
  };
  color: PieceColor;
  image: string;
};
