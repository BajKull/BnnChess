import ChatMoves from "@/chat/ChatMoves";
import Chessboard from "@/chessboard/Chessboard";

interface Params {
  params: { slug: string };
}

export default async function Page({ params }: Params) {
  return (
    <div
      className="flex w-full items-center justify-center"
      style={{ height: "calc(100vh - 60px)" }}
    >
      <div
        className="relative overflow-hidden rounded"
        style={{
          height: "80vmin",
          width: "80vmin",
          minHeight: "300px",
          minWidth: "300px",
        }}
      >
        <Chessboard />
        <ChatMoves />
      </div>
    </div>
  );
}
