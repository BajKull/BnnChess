import { Color, PieceSymbol } from "chess.js";
import React from "react";
import Bishop from "./Bishop";
import King from "./King";
import Knight from "./Knight";
import Pawn from "./Pawn";
import Queen from "./Queen";
import Rook from "./Rook";

interface IProps extends React.SVGProps<SVGSVGElement> {
  color: Color;
  piece: PieceSymbol;
}

const BoardPiece = ({ piece, ...rest }: IProps) => {
  return (
    <>
      {piece === "p" && <Pawn {...rest} />}
      {piece === "n" && <Knight {...rest} />}
      {piece === "b" && <Bishop {...rest} />}
      {piece === "r" && <Rook {...rest} />}
      {piece === "q" && <Queen {...rest} />}
      {piece === "k" && <King {...rest} />}
    </>
  );
};

export default BoardPiece;
