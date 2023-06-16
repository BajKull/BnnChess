import React from "react";
import TwitchIcon from "@/../public/icons/twitch.svg";

const HowToPlay = () => {
  return (
    <div className="grid lg:grid-cols-3 lg:gap-10">
      <div className="relative flex flex-col items-center justify-center rounded-lg bg-zinc-800 p-5">
        <span className="absolute top-0 left-0 rounded bg-zinc-600 p-5">1</span>
        <figure className="h-20 w-20 fill-white stroke-white">
          {/* <TwitchIcon /> */}
        </figure>
        <p>Sign in with your Twitch account</p>
      </div>
    </div>
  );
};

export default HowToPlay;
