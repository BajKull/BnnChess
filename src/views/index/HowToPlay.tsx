import React from "react";
import TwitchIcon from "@/../public/icons/twitch.svg";
import TrophyIcon from "@/../public/icons/trophy.svg";
import GearIcon from "@/../public/icons/gear.svg";

const HowToPlay = () => {
  return (
    <div className="grid gap-10 lg:grid-cols-3">
      <div className="relative mx-auto flex w-full max-w-lg flex-col items-center justify-center rounded-lg bg-zinc-800 px-5 py-12">
        <span className="absolute left-2 top-2 flex h-10 w-10 items-center justify-center rounded bg-zinc-700 text-sm font-semibold">
          1
        </span>
        <figure className="mb-5 h-12 w-12 fill-white stroke-white">
          <TwitchIcon />
        </figure>
        <p>Sign in with your Twitch account.</p>
      </div>
      <div className="relative mx-auto flex w-full max-w-lg flex-col items-center justify-center rounded-lg bg-zinc-800 px-5 py-12">
        <span className="absolute left-2 top-2 flex h-10 w-10 items-center justify-center rounded bg-zinc-700 text-sm font-semibold">
          2
        </span>
        <figure className="mb-5 h-12 w-12 fill-white stroke-white">
          <GearIcon />
        </figure>
        <p>Tweak settings to your liking.</p>
      </div>
      <div className="relative mx-auto flex w-full max-w-lg flex-col items-center justify-center rounded-lg bg-zinc-800 px-5 py-12">
        <span className="absolute left-2 top-2 flex h-10 w-10 items-center justify-center rounded bg-zinc-700 text-sm font-semibold">
          3
        </span>
        <figure className="mb-5 h-12 w-12 fill-white stroke-white">
          <TrophyIcon />
        </figure>
        <p>Show them what you&apos;ve got!</p>
      </div>
    </div>
  );
};

export default HowToPlay;
