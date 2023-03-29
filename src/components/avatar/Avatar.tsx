import classNames from "classnames";
import React from "react";
import Image, { StaticImageData } from "next/image";
import { PieceSymbol } from "chess.js";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string | null;
  image?: string | StaticImageData | null;
  piecesRemoved?: PieceSymbol[];
}

const Avatar = ({ name, image, className, ...props }: IProps) => {
  const clsDiv = classNames("flex", className);
  return (
    <div className={clsDiv} {...props}>
      <figure className="h-10 w-10">
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
      </div>
    </div>
  );
};

export default Avatar;
