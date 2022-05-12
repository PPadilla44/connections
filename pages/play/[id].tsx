import Link from "next/link";
import React from "react";
import Canvas from "../../components/Canvas";
import Layout from "../../components/Layout";

const StartModal = () => {
  return (
    <button className="bg-black rounded-md p-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1 className="text-dom">START</h1>
    </button>
  );
};

const SubmitToLeaderBoardModal = ({
  time,
  id,
}: {
  time: string;
  id: number;
}) => {
  return (
    <div className="bg-black rounded-md p-3 flex flex-col items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1>{time}</h1>
      <Link href={`/leaderboards/${id}`}>
        <a>
          <h3 className="text-dom">Submit To Leaderboard</h3>
        </a>
      </Link>
    </div>
  );
};

const PlayLevel = () => {
  const id = 1;
  const name = "Parrots in a tree";
  const currentConnections = 0;
  const runningTime = "2:24.421";

  return (
    <Layout title={`Level - ${name}`}>
      <div className="flex justify-center bg-darkBlue">
        <div className="max-w-7xl w-full flex items-center mt-12 flex-col gap-5">
          <h1>{name}</h1>
          <div className="relative">
            <Canvas />
            {/* <StartModal /> */}
            <SubmitToLeaderBoardModal time={runningTime} id={id} />
          </div>
          <div className="flex justify-between w-full">
            <h3 className="w-48">{currentConnections}</h3>
            <h3 className="w-48 text-center">{runningTime}</h3>
            <button className="bg-danger w-48 rounded-md flex justify-center items-center">
              <h3>Reset</h3>
            </button>
          </div>
          <Link href={`/leaderboards/${id}`} passHref>
            <a>
              <p className="text-dom">Leaderboard</p>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default PlayLevel;
