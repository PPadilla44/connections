import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { getError } from "../utils/error";
import { useAuth } from "./hooks/useAuth";

const SubmitModal = ({ time, levelId }: { time: number; levelId: number }) => {
  const {
    state: { user },
  } = useAuth();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const { isLoggedIn, id: userId } = user;

  const getStringTime = (time: number) => {
    const min = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
    const sec = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
    const mili = ("0" + ((time / 10) % 100)).slice(-2);
    return `${min}:${sec}.${mili}`;
  };

  const submitToLeaderBoard = async () => {
    if (!isLoggedIn) {
      alert("Must be logged in");
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post(`/api/scores`, {
        time: getStringTime(time),
        userId,
        levelId,
      });
      if (res.status === 200) {
        router.push(`/leaderboards/${levelId}`);
      }
    } catch (err) {
      console.log(getError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black rounded-md p-3 flex flex-col items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
      <p className="absolute right-5 text-gray">hide</p>
      <h1>{getStringTime(time)}</h1>
      <button onClick={submitToLeaderBoard}>
        {isLoading ? (
          <h3 className="text-dom">LOADING</h3>
        ) : (
          <h3 className="text-dom">Submit To Leaderboard</h3>
        )}
      </button>
    </div>
  );
};

export default SubmitModal;
