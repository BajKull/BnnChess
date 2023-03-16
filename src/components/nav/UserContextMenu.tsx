import { ROUTES } from "@/constants/routes";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const UserContextMenu = () => {
  return (
    <div className="absolute -bottom-5 right-0 translate-y-full overflow-hidden rounded bg-zinc-800 text-white">
      <ul className="text-center">
        <li className="w-full border-b border-zinc-600 hover:bg-zinc-700 focus:bg-zinc-700">
          <Link href={ROUTES.PROFILE} className="block h-full w-full py-3 px-5">
            Profile
          </Link>
        </li>
        <li className="h-full hover:bg-zinc-700 focus:bg-zinc-700">
          <button
            onClick={() => signOut()}
            className="whitespace-nowrap py-3 px-5"
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserContextMenu;
