import { ROUTES } from "@/constants/routes";
import classNames from "classnames";
import { DefaultSession } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Image from "next/image";

interface IProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  user: DefaultSession["user"];
}

const UserContextMenu = React.forwardRef<HTMLDivElement, IProps>(
  (props, ref) => {
    const { user, className, ...otherProps } = props;
    const clsDiv = classNames(
      "absolute -bottom-5 right-0 translate-y-full overflow-hidden rounded bg-zinc-800 text-white min-w-[225px] z-30 shadow shadow-zinc-700",
      className
    );

    return (
      <div className={clsDiv} ref={ref} {...otherProps}>
        <ul className="px-4 py-5 text-left">
          <li className="shadow- mx-2 mb-5 border-b border-zinc-600">
            <div className="flex w-full items-center pb-5">
              {user?.image && (
                <figure className="block h-12 w-12">
                  <Image
                    className="rounded-full"
                    src={user?.image}
                    alt={user.name || ""}
                    width="48"
                    height="48"
                  />
                </figure>
              )}
              <p className="ml-3 block">{user?.name}</p>
            </div>
          </li>
          <li className="w-full rounded-md hover:bg-zinc-700 focus:bg-zinc-700">
            <Link href={ROUTES.PROFILE} className="block h-full w-full p-2">
              Profile
            </Link>
          </li>
          <li className="h-full rounded-md hover:bg-zinc-700 focus:bg-zinc-700">
            <button
              onClick={() => signOut()}
              className="h-full w-full whitespace-nowrap p-2 text-left"
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    );
  }
);

UserContextMenu.displayName = "UserContextMenu";

export default UserContextMenu;
