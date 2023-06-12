import Chessboard from "@/views/chessboard/Chessboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BnnChess",
  description:
    "BnnChess allows streamers to play with their Twitch chat in real time. Let your chat finally prove that they are better than you!",
};

export default async function Home() {
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
      </div>
    </div>
  );
}
