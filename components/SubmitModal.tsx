import Link from "next/link";
import React from "react";

const SubmitModal = ({ time, id }: { time: number; id: number }) => {
  const getStringTime = (time: number) => {
    const min = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
    const sec = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
    const mili = ("0" + ((time / 10) % 100)).slice(-2);
    return `${min}:${sec}.${mili}`;
  };

  const submitToLeaderBoard = () => {
    console.log("SUBMIt");
  };

  return (
    <div className="bg-black rounded-md p-3 flex flex-col items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
      <p className="absolute right-5 text-gray">hide</p>
      <h1>{getStringTime(time)}</h1>
      <button onClick={submitToLeaderBoard}>
        <h3 className="text-dom">Submit To Leaderboard</h3>
      </button>
    </div>
  );
};

export default SubmitModal;
