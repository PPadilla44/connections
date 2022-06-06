import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import Canvas from "../../components/Canvas";
import Layout from "../../components/Layout";
import LineIcon from "../../components/LineIcon";
import { Level } from "../../types";
import db, { convertLevel } from "../../utils/db";
import levelReducer, { initialLevelState } from "../../store/level";
import StartModal from "../../components/StartModal";
import SubmitModal from "../../components/SubmitModal";
import Timer from "../../components/Timer";
import Cookies from "js-cookie";

interface PlayLevelProps {
  level: Level;
}

const PlayLevel: NextPage<PlayLevelProps> = ({ level }) => {
  const { id: levelId, name, dots, linesToWin } = level;
  const [state, dispatch] = useReducer(levelReducer, initialLevelState);
  const {
    currentConnections,
    first,
    lines,
    showStart,
    showSubmit,
    isActive,
    isPaused,
    isCompleted,
    time,
  } = state;

  useEffect(() => {
    const potTime = Cookies.get("time");
    if (potTime) {
      const timeObj = JSON.parse(potTime);
      if (timeObj.levelId === levelId) {
        dispatch({ type: "COMPLETE" });
        dispatch({ type: "UPDATE_TIME", payload: timeObj.time });
      }
      Cookies.remove("time");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (linesToWin === currentConnections) {
      dispatch({ type: "COMPLETE" });
    }
  }, [currentConnections, linesToWin]);

  return (
    <Layout title={`Level - ${name}`}>
      <div className="flex justify-center bg-darkBlue">
        <div className="max-w-7xl w-full flex items-center mt-12 flex-col gap-5">
          <h1>{name}</h1>
          <div className="relative">
            <Canvas
              dots={dots}
              first={first}
              lines={lines}
              connectClick={(dot) =>
                dispatch({ type: "HANDLE_CLICK", payload: { point: dot } })
              }
            />
            {showStart && (
              <StartModal handleClick={() => dispatch({ type: "START" })} />
            )}
            {showSubmit && (
              <SubmitModal
                time={time}
                levelId={levelId}
                hideSubmit={() => dispatch({ type: "HIDE_SUBMIT" })}
              />
            )}
          </div>
          <div className="flex justify-between w-full relative">
            <div className="absolute w-full h-full flex justify-center">
              {isCompleted && !showSubmit && (
                <button onClick={() => dispatch({ type: "SHOW_SUBMIT" })}>
                  <h3 className="">Show Submit</h3>
                </button>
              )}
            </div>
            <div className="flex">
              <div className="flex gap-2 w-48">
                <LineIcon />
                <h3>{currentConnections}</h3>
              </div>
              <div className="w-48">
                <Timer
                  time={time}
                  isActive={isActive}
                  isPaused={isPaused}
                  updateTime={(newTime) =>
                    dispatch({ type: "UPDATE_TIME", payload: newTime })
                  }
                />
              </div>
            </div>
            <button
              onClick={() => dispatch({ type: "RESET" })}
              className="bg-danger w-48 rounded-md flex justify-center items-center"
            >
              <h3>Reset</h3>
            </button>
          </div>
          <Link href={`/leaderboards/${levelId}`} passHref>
            <a className="z-20">
              <p className="text-dom">Leaderboard</p>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;

  await db.$connect();
  const level = await db.levels.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      dots: true,
    },
  });
  await db.$disconnect();

  if (level) {
    return {
      props: {
        level: convertLevel(level),
      },
    };
  }

  return {
    redirect: {
      destination: "/play",
      permanent: false,
    },
  };
};

export default PlayLevel;
