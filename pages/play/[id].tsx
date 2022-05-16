import { dots } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useReducer, useState } from "react";
import Canvas from "../../components/Canvas";
import Layout from "../../components/Layout";
import LineIcon from "../../components/LineIcon";
import { Level } from "../../types";
import db, { convertLevel } from "../../utils/db";

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

export type line = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export interface LevelState {
  currentConnections: number;
  first: dots | null;
  lines: line[];
}

const initialLevelState: LevelState = {
  first: null,
  currentConnections: 0,
  lines: [],
};

export declare type ActionType =
  | "FINISH"
  | "CONNECT_LINE"
  | "RESET"
  | "HANDLE_CLICK";

export type LevelActions = {
  type: ActionType;
  payload?: any;
};

function reducer(state: LevelState, action: LevelActions): LevelState {
  const { type, payload } = action;
  const { first, lines } = state;

  switch (type) {
    case "HANDLE_CLICK": {
      const { point } = payload;
      let newFirst = first;
      let newLines = [...lines];

      if (!newFirst) {
        newFirst = point;
      } else {
        let firstNum = newFirst.sequence;
        let potPoint = point.sequence;
        let value = Math.abs(firstNum - potPoint);
        if (value === 1) {
          const valueExist = lines.find(
            (l) =>
              l.id === `${newFirst!.sequence}-${point.sequence}` ||
              l.id === `${point.sequence}-${newFirst!.sequence}`
          );

          if (!valueExist) {
            const line: line = {
              id: `${newFirst.sequence}-${point.sequence}`,
              x1: newFirst.x,
              y1: newFirst.y,
              x2: point.x,
              y2: point.y,
            };

            newLines = [...newLines, line];
          } else {
            console.log("ALREADY exist");
          }
          newFirst = point;
        } else if (value === 0) {
          newFirst = null;
          console.log("REPEAT");
        } else {
          console.log("NOT VFALID");
          newFirst = null;
        }
      }

      return {
        currentConnections: newLines.length,
        first: newFirst,
        lines: newLines,
      };
    }
    case "RESET":
      return { currentConnections: 0, first: null, lines: [] };
    default:
      return state;
  }
}

interface PlayLevelProps {
  level: Level;
}

const PlayLevel: NextPage<PlayLevelProps> = ({ level }) => {
  const { id, name, dots, linesToWin } = level;
  const [state, dispatch] = useReducer(reducer, initialLevelState);
  const { currentConnections, first, lines } = state;
  const runningTime = "2:24.421";

  useEffect(() => {
    if (linesToWin === currentConnections) {
      console.log("YOU WIN");
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
            {/* <StartModal /> */}
            {/* <SubmitToLeaderBoardModal time={runningTime} id={id} /> */}
          </div>
          <div className="flex justify-between w-full">
            <div className="flex gap-2 w-48">
              <LineIcon />
              <h3>{currentConnections}</h3>
            </div>
            <h3 className="w-48 text-center">{runningTime}</h3>
            <button
              onClick={() => {
                dispatch({ type: "RESET" });
              }}
              className="bg-danger w-48 rounded-md flex justify-center items-center"
            >
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
    props: {
      level: {},
    },
  };
};

export default PlayLevel;
