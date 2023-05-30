import classNames from "classnames";
import React from "react";
import Image, { StaticImageData } from "next/image";
import { PiecesTaken } from "@/store/gameStore";
import PawnSvg from "@/../public/p.svg";
import KnightSvg from "@/../public/n.svg";
import BishopSvg from "@/../public/b.svg";
import RookSvg from "@/../public/r.svg";
import QueenSvg from "@/../public/q.svg";
import { PieceSymbol } from "chess.js";
import cls from "./avatar.module.scss";
import { nanoid } from "nanoid";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string | null;
  image?: string | StaticImageData | null;
  piecesTaken?: PiecesTaken;
  color?: "w" | "b";
}

const Avatar = ({
  name,
  image,
  className,
  piecesTaken,
  color,
  ...props
}: IProps) => {
  const clsDiv = classNames("flex", className);
  const clsPiece = classNames("h-6 absolute top-0", {
    [cls.white]: color === "w",
    [cls.black]: color === "b",
  });

  const piecesTakenKeys = getPiecesTakenArray(piecesTaken).filter(
    (p) => p.length
  );

  return (
    <div className={clsDiv} {...props}>
      <figure className="h-6 w-6 lg:h-10 lg:w-10">
        {image ? (
          <Image src={image || ""} alt={name || ""} width={40} height={40} />
        ) : (
          <div className="w-ful flex h-full items-center justify-center bg-purple-800 font-semibold text-white">
            {name?.[0] || "B"}
          </div>
        )}
      </figure>
      <div className="ml-2 flex flex-col text-sm font-medium text-white">
        <p>{name}</p>
        <div className="-my-0.5 flex">
          {piecesTakenKeys?.map((samePieces) => (
            <div
              key={nanoid()}
              className="relative flex h-5"
              style={{ width: `${(samePieces.length - 1) * 8 + 24}px` }}
            >
              {samePieces.map((piece, i) => (
                <div
                  className={clsPiece}
                  key={nanoid()}
                  style={{ left: `${i * 8}px` }}
                >
                  {piece === "p" && <PawnSvg />}
                  {piece === "n" && <KnightSvg />}
                  {piece === "b" && <BishopSvg />}
                  {piece === "r" && <RookSvg />}
                  {piece === "q" && <QueenSvg />}
                </div>
              ))}
            </div>
          ))}
          {!!piecesTaken?.diff && piecesTaken.diff > 0 && (
            <span className="mt-2 ml-2 text-xs leading-[10px]">
              +{piecesTaken.diff}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Avatar;

const getPiecesTakenArray = (piecesTaken?: PiecesTaken) => {
  if (!piecesTaken) return [] as PieceSymbol[][];
  const { diff, ...pieces } = piecesTaken;
  const keys = Object.keys(pieces) as Array<keyof typeof piecesTaken>;
  return keys.map(
    (p) =>
      p
        .repeat(piecesTaken[p] <= 0 ? 0 : piecesTaken[p])
        .split("") as PieceSymbol[]
  );
};
