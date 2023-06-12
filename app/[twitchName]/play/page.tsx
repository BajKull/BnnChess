import { authOptions } from "@/../pages/api/auth/[...nextauth]";
import Chessboard from "@/views/chessboard/Chessboard";
import { ROUTES } from "@/constants/routes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ChatPanel from "@/views/chat/ChatPanel";
import PlayerAvatar from "@/views/gameSettings/PlayerAvatar";

interface Params {
  params: { twitchName: string };
}

export async function generateMetadata({ params }: Params) {
  const nick = await getServerSession(authOptions);
  const twitchName = params.twitchName;
  return {
    title: `BnnChess | ${nick?.user.name || twitchName}`,
  };
}

export default async function Page({ params }: Params) {
  const session = await getServerSession(authOptions);

  if (!session?.user.name) return redirect(ROUTES.HOME);
  if (session?.user.name.toLowerCase() !== params.twitchName.toLowerCase())
    return redirect(`/${session?.user.name.toLowerCase()}/play`);

  return (
    <div
      className="flex w-full items-center justify-center px-5"
      style={{ minHeight: "calc(100vh - 60px)" }}
    >
      <div
        className="relative"
        style={{
          width: "min(75vmin, 100%)",
          minHeight: "300px",
          minWidth: "300px",
        }}
      >
        <PlayerAvatar position="top" />
        <div className="mt-[100%] h-0 w-full" />
        <div className="absolute top-0 left-0 h-full w-full overflow-hidden rounded">
          <Chessboard />
        </div>
        <PlayerAvatar position="bottom" />
      </div>
      <div className="h-[75vmin] min-h-[300px] w-[500px] lg:static 2xl:w-[700px]">
        <ChatPanel />
      </div>
    </div>
  );
}
