import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import React from "react";

type CustomLink = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;
interface IProps extends CustomLink {
  size?: "small" | "medium" | "large" | "xl";
}

const CustomLink = ({ className, children, size, ...props }: IProps) => {
  const clsLink = classNames(
    "border-0 rounded-md text-white font-semibold bg-purple-800 hover:bg-purple-700 focus:bg-purple-700 w-fit",
    className,
    {
      "text-sm px-3 py-2": size === "small",
      "text-sm px-4 py-2": size === "medium" || !size,
      "px-5 py-2": size === "large",
      "text-lg px-8 py-3": size === "xl",
    }
  );
  return (
    <Link className={clsLink} {...props}>
      {children}
    </Link>
  );
};

export default CustomLink;
