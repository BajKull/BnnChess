import Chessboard from "@/views/chessboard/Chessboard";

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
