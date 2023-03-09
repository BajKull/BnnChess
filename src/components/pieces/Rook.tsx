import { PieceColor } from "@/types/chessPieces";
import React from "react";

interface IProps extends React.SVGProps<SVGSVGElement> {
  color: PieceColor;
}

const Rook = ({ color, ...rest }: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 45 45"
      {...rest}
    >
      <g
        transform="translate(0,0.3)"
        fill={color === "white" ? "#fff" : "#000"}
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={4}
      >
        <path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z " />
        <path d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z " />
        <path d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z " />
        <path d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z " />
        <path d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z " />
        <path d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z " />
        {color === "black" && (
          <>
            <path d="M 12,35.5 L 33,35.5 L 33,35.5" stroke="#fff" />
            <path d="M 13,31.5 L 32,31.5" stroke="#fff" />
            <path d="M 14,29.5 L 31,29.5" stroke="#fff" />
            <path d="M 14,16.5 L 31,16.5" stroke="#fff" />
            <path d="M 11,14 L 34,14" stroke="#fff" />
          </>
        )}
      </g>
    </svg>
  );
};

export default Rook;
