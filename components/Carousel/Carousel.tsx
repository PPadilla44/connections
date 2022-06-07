import Link from "next/link";
import React from "react";

const Carousel = () => {
  return (
    <div className="bg-black h-72 border border-gray rounded-md max-w-xl w-full p-10 pb-5 flex flex-col justify-center">
      <div className="flex flex-col truncate">
        <h1>Parrots in a treetreetreetreetreetree </h1>
        <h3>by Paraotfan123</h3>
      </div>
      <div className="flex justify-between mt-2">
        <Link href={`/leaderboards/1`} passHref>
          <a>
            <h4 className="text-dom">Leaderboard</h4>
          </a>
        </Link>
        <Link href={`/play/1`} passHref>
          <a className="bg-dom px-3 py-1 rounded-md">
            <h4 className="text-black font-normal">Play</h4>
          </a>
        </Link>
      </div>
      <div className="flex justify-center gap-3 mt-5">
        <div className="w-4 h-4 bg-white/50 rounded-full" />
        <div className="w-4 h-4 bg-white rounded-full" />
        <div className="w-4 h-4 bg-white/50 rounded-full" />
      </div>
    </div>
  );
};

export default Carousel;
