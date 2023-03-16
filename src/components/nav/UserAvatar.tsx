import React from "react";
import Image from "next/image";
import { DefaultSession } from "next-auth";
import classNames from "classnames";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  user: DefaultSession["user"];
}

const UserAvatar = ({ user, className, ...props }: IProps) => {
  const clsBtn = classNames(
    "block h-9 w-9 overflow-hidden rounded-full border-0 bg-transparent",
    className
  );
  if (!user) return null;
  return (
    <button className={clsBtn} {...props}>
      {user.image ? (
        <Image height="36" width="36" src={user.image} alt={user.name || ""} />
      ) : (
        <div className="flex h-9 w-9 items-center justify-center bg-violet-700 text-2xl font-semibold text-white">
          {user.name?.at(0)}
        </div>
      )}
    </button>
  );
};

export default UserAvatar;
