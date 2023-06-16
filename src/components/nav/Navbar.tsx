"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import TwitchButton from "../button/twitch/TwitchButton";
import { signIn } from "next-auth/react";
import { Session } from "next-auth";
import UserContextMenu from "./UserContextMenu";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useSessionStore } from "@/store/sessionStore";
import NavbarAvatar from "./NavbarAvatar";

interface IProps {
  session: Session | null;
}

const Navbar = ({ session }: IProps) => {
  const { setSession } = useSessionStore();
  const [showContextMenu, setShowContextMenu] = useState(false);
  const contextMenuRef = useRef(null);

  useEffect(() => {
    if (session) setSession(session);
  }, [session, setSession]);

  useOnClickOutside(contextMenuRef, () => setShowContextMenu(false));
  return (
    <nav className="mx-auto h-[60px] w-full max-w-7xl rounded bg-transparent py-2.5 px-5">
      <div className="mx-auto flex h-full flex-wrap items-center justify-between">
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
                <NavbarAvatar
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
