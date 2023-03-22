import classNames from "classnames";
import React from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  secondary?: boolean;
}

const Button = ({
  children,
  className,
  primary,
  secondary,
  ...props
}: IProps) => {
  const clsBtn = classNames(
    "border-0 rounded-md text-white px-3 py-2 text-sm font-semibold",
    className,
    {
      "bg-zinc-800 hover:bg-zinc-700 focus:bg-zinc-700": secondary,
      "bg-purple-800 hover:bg-purple-700 focus:bg-purple-700": primary,
    }
  );
  return (
    <button className={clsBtn} {...props}>
      {children}
    </button>
  );
};

export default Button;
