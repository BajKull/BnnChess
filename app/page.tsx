import Button from "@/components/button/Button";
import FakeChat from "@/views/chat/FakeChat";
import HowToPlay from "@/views/index/HowToPlay";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import TwitchButton from "@/components/button/twitch/TwitchButton";
import CustomLink from "@/components/link/CustomLink";
import { ROUTES } from "@/constants/routes";
import PageStats from "@/views/index/PageStats";

export const metadata: Metadata = {
  title: "BnnChess",
  description:
    "BnnChess allows streamers to play with their Twitch chat in real time. Let your chat finally prove that they are better than you!",
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pb-10 text-white">
        <section className="mt-10 grid lg:mt-20 lg:grid-cols-2 lg:gap-10">
          <div className="mb-10 flex flex-col justify-center text-center lg:mb-0 lg:text-left">
            <h1 className="text-4xl font-bold lg:text-6xl">
              <span className="block">Play chess live</span>
              <span className="block pt-4">
                with your <span className="text-purple-600">chat</span>
              </span>
            </h1>
            <p className="mt-5 text-gray-300 lg:text-lg">
              Host a match where your viewers can finally challenge you all at
              once. No need to install or setup anything.
            </p>
            <CustomLink
              size="xl"
              className="mx-auto mt-7 w-fit lg:mx-0"
              href={ROUTES.PLAY}
            >
              Play now!
            </CustomLink>
          </div>
          <div className="h-[416px]">
            <FakeChat visibleMessages={13} />
          </div>
        </section>
        <section className="mt-20 lg:mt-40">
          <h2 className="mb-5 text-center text-3xl font-bold lg:text-4xl">
            Make the game more interactive!
          </h2>
          <p className="mb-10 text-center text-gray-300 lg:text-lg">
            Instead of playing one person at a time, let all your viewers prove
            that they are as good as they pretend to be.
          </p>
          <HowToPlay />
          {session ? (
            <CustomLink className="mx-auto mt-10 block" href={ROUTES.PLAY}>
              Host a match
            </CustomLink>
          ) : (
            <TwitchButton></TwitchButton>
          )}
        </section>
      </div>
      <div className="mt-10 w-full lg:mt-20">
        <PageStats />
      </div>
    </>
  );
}
