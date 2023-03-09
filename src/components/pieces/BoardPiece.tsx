import { PieceColor, PieceName } from "@/types/chessPieces";
import React from "react";
import Bishop from "./Bishop";
import King from "./King";
import Knight from "./Knight";
import Pawn from "./Pawn";
import Queen from "./Queen";
import Rook from "./Rook";

interface IProps extends React.SVGProps<SVGSVGElement> {
  color: PieceColor;
  piece: PieceName;
}

const BoardPiece = ({ piece, ...rest }: IProps) => {
  return (
    <>
      {piece === "pawn" && <Pawn {...rest} />}
      {piece === "knight" && <Knight {...rest} />}
      {piece === "bishop" && <Bishop {...rest} />}
      {piece === "rook" && <Rook {...rest} />}
      {piece === "queen" && <Queen {...rest} />}
      {piece === "king" && <King {...rest} />}
    </>
  );
};

export default BoardPiece;
