import Chessboard from "@/chessboard/Chessboard";

export default function Home() {
  return (
    <main className="flex h-[100vh] w-full items-center justify-center bg-zinc-900">
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
    </main>
  );
}
