type ChessboardFile = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
type ChessboardRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type ChessboardTile = {
  file: ChessboardFile;
  rank: ChessboardRank;
  occupied: boolean;
  occupiedBy: ChessPiece;
};
