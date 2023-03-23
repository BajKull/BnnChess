import { authOptions } from "@/../pages/api/auth/[...nextauth]";
import ChatMoves from "@/views/chat/ChatMoves";
import Chessboard from "@/chessboard/Chessboard";
import { ROUTES } from "@/constants/routes";
import { useGameStore } from "@/store/gameStore";
import GameSettings from "@/views/gameSettings/GameSettings";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ChatPanel from "@/views/chat/ChatPanel";

interface Params {
  params: { twitchName: string };
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
      <div className="xl:w-[250px] 2xl:w-[350px]" />
      <div
        className="relative overflow-hidden rounded"
        style={{
          width: "min(80vmin, 100%)",
          minHeight: "300px",
          minWidth: "300px",
        }}
      >
        <div className="mt-[100%] h-0 w-full" />
        <div className="absolute top-0 left-0 h-full w-full">
          <Chessboard />
        </div>
      </div>
      <div className="h-[80vmin] w-[250px] lg:static 2xl:w-[350px]">
        <ChatPanel />
      </div>
    </div>
  );
}
