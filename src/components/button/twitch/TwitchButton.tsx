import classNames from "classnames";
import React from "react";
import TwitchIcon from "@/../public/icons/twitch.svg";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const TwitchButton = ({ children, className, ...props }: IProps) => {
  const clsBtn = classNames(
    "bg-violet-700 hover:bg-violet-800 text-white rounded px-4 py-2 flex items-center font-medium",
    className
  );
  return (
    <button className={clsBtn} {...props}>
      <figure className="mr-3 h-5 w-5 fill-white">
        <TwitchIcon />
      </figure>
      {children}
    </button>
  );
};

export default TwitchButton;
