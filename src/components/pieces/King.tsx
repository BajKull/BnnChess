import { Color } from "chess.js";
import React from "react";

interface IProps extends React.SVGProps<SVGSVGElement> {
  color: Color;
}

const King = ({ color, ...rest }: IProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" {...rest}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path strokeLinejoin="miter" d="M22.5 11.63V6M20 8h5" />
        <path
          fill={color === "w" ? "#fff" : "#000"}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5"
        />
        <path
          fill={color === "w" ? "#fff" : "#000"}
          d="M12.5 37c5.5 3.5 14.5 3.5 20 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7"
        />
        <path d="M12.5 30c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0" />
        {color === "b" && (
          <>
            <path
              d="M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.5,26.6 L 22.5,24.5 C 20,18 10.85,14 6.97,19.85 C 4.5,25.5 13,29.5 13,29.5"
              fill="none"
              stroke="#fff"
            />
            <path
              d="M 12.5,30 C 18,27 27,27 32.5,30 M 12.5,33.5 C 18,30.5 27,30.5 32.5,33.5 M 12.5,37 C 18,34 27,34 32.5,37"
              fill="none"
              stroke="#fff"
            />
          </>
        )}
      </g>
    </svg>
  );
};

export default King;
