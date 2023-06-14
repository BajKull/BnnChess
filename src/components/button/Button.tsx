import classNames from "classnames";
import React from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  secondary?: boolean;
  size?: "small" | "medium" | "large" | "xl";
}

const Button = ({
  children,
  className,
  size,
  primary,
  secondary,
  ...props
}: IProps) => {
  const clsBtn = classNames(
    "border-0 rounded-md text-white font-semibold",
    className,
    {
      "bg-zinc-800 hover:bg-zinc-700 focus:bg-zinc-700": secondary,
      "bg-purple-800 hover:bg-purple-700 focus:bg-purple-700": primary,
      "text-sm px-3 py-2": size === "small",
      "text-sm px-4 py-2": size === "medium" || !size,
      "px-5 py-2": size === "large",
      "text-lg px-8 py-3": size === "xl",
    }
  );
  return (
    <button className={clsBtn} {...props}>
      {children}
    </button>
  );
};

export default Button;
