import AnimatedNumber from "@/components/animated-number/AnimatedNumber";
import React from "react";

const PageStats = () => {
  return (
    <div className="w-full bg-zinc-800 p-10 text-white lg:py-20">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-3 lg:px-5">
        <div className="px-10 py-5 text-center">
          <span className="text-5xl font-bold text-purple-500 xl:text-7xl">
            <AnimatedNumber from={0} to={475} />
          </span>
          <p>Streamers involved</p>
        </div>
        <div className="border-y-2 border-zinc-700 py-5 text-center lg:border-x-4 lg:border-y-0">
          <span className="text-5xl font-bold text-sky-500 xl:text-7xl">
            <AnimatedNumber from={0} to={8722} />
          </span>
          <p>Games played</p>
        </div>
        <div className="px-10 py-5 text-center">
          <span className="flex justify-center text-5xl font-bold text-green-500 xl:text-7xl">
            <AnimatedNumber from={0} to={33} />%
          </span>
          <p>Chat win ratio</p>
        </div>
      </div>
    </div>
  );
};

export default PageStats;
