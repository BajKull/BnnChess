import { authOptions } from "@/../pages/api/auth/[...nextauth]";
import Chessboard from "@/views/chessboard/Chessboard";
import { ROUTES } from "@/constants/routes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ChatPanel from "@/views/chat/ChatPanel";
import PlayerAvatar from "@/views/gameSettings/PlayerAvatar";

export async function generateMetadata() {
  const nick = await getServerSession(authOptions);
  return {
    title: `BnnChess | ${nick?.user.name}`,
  };
}

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user.name) return redirect(ROUTES.HOME);

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
        <div className="absolute left-0 top-0 h-full w-full overflow-hidden rounded">
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
