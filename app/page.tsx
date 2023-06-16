import Button from "@/components/button/Button";
import FakeChat from "@/views/chat/FakeChat";
import HowToPlay from "@/views/index/HowToPlay";
import { Metadata } from "next";
import TwitchIcon from "@/../public/icons/b.svg";

export const metadata: Metadata = {
  title: "BnnChess",
  description:
    "BnnChess allows streamers to play with their Twitch chat in real time. Let your chat finally prove that they are better than you!",
};

export default async function Home() {
  return (
    <div className="mx-auto max-w-7xl px-5 text-white">
      <section className="mt-10 grid lg:mt-20 lg:grid-cols-2 lg:gap-10">
        <div className="mb-10 flex flex-col justify-center text-center lg:mb-0 lg:text-left">
          <h1 className="text-4xl font-bold lg:text-6xl">
            <span className="block">Play chess live</span>
            <span className="block pt-4">
              with your <span className="text-purple-600">chat</span>
            </span>
          </h1>
          <p className="mt-5 text-lg">
            No need to install or setup anything. Free and easy to use for
            everyone.
          </p>
          <Button primary size="xl" className="mx-auto mt-7 w-fit lg:mx-0">
            Play now!
          </Button>
        </div>
        <div className="h-[416px]">
          <FakeChat visibleMessages={13} />
        </div>
      </section>
      <section className="mt-16 lg:mt-32">
        <h2 className="text-center text-3xl font-bold lg:text-4xl">
          Make the game more interactive!
        </h2>
        <HowToPlay />
      </section>
    </div>
  );
}
