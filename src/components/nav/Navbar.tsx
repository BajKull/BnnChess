"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import TwitchButton from "../button/twitch/TwitchButton";
import { signIn } from "next-auth/react";
import { Session } from "next-auth";
import UserAvatar from "./UserAvatar";
import UserContextMenu from "./UserContextMenu";
import useOnClickOutside from "@/hooks/useOnClickOutside";

interface IProps {
  session: Session | null;
}

const Navbar = ({ session }: IProps) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const contextMenuRef = useRef(null);

  useOnClickOutside(contextMenuRef, () => setShowContextMenu(false));
  return (
    <nav className="absolute top-0 left-0 h-[60px] w-full rounded bg-transparent px-2 py-2.5 sm:px-4">
      <div className="container mx-auto flex h-full flex-wrap items-center justify-between">
        <Link
          href={ROUTES.HOME}
          className="flex items-center text-3xl font-semibold text-white"
        >
          BnnChess
        </Link>
        <ul className="flex flex-row items-center space-x-6 font-medium">
          <li>
            <Link
              href={ROUTES.CONTACT}
              className="block rounded px-3 text-zinc-400 hover:text-zinc-100"
            >
              Contact
            </Link>
          </li>
          <li className="relative text-sm">
            {session?.user ? (
              <div ref={contextMenuRef}>
                <UserAvatar
                  user={session?.user}
                  onClick={() => setShowContextMenu(true)}
                />
                {showContextMenu && <UserContextMenu user={session?.user} />}
              </div>
            ) : (
              <TwitchButton onClick={() => signIn("twitch")}>
                Sign in
              </TwitchButton>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
