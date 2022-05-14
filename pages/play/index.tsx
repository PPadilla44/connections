import { PrismaClient } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import Layout from "../../components/Layout";
import LevelItem from "../../components/LevelItem";
import SearchBar from "../../components/SearchBar";
import { Level } from "../../types";
import { convertLevel, getFastestTime } from "../../utils/db";

interface PlayProps {
  levels: Level[];
}

const Play: NextPage<PlayProps> = ({ levels }) => {
  return (
    <Layout title="Play">
      <div className="w-full flex justify-center bg-darkBlue">
        <div className="max-w-7xl w-full mt-12">
          <div className="max-w-2xl flex flex-col gap-10">
            <div className="flex justify-between items-center">
              <SearchBar />

              {/* TODO */}
              {/* CUSTOM DROP DOWN */}
              <div className="flex gap-1">
                <p className="text-base">Sort by</p>
                <select className="bg-transparent font-light rounded-md underline">
                  <option className="bg-darkBlue" value="featured">
                    Featured
                  </option>
                  <option className="bg-darkBlue" value="alphabetical">
                    Alphabetical
                  </option>
                  <option className="bg-darkBlue " value="difficulty">
                    Difficulty
                  </option>
                </select>
              </div>
            </div>

            <ul className="flex flex-col gap-7">
              {levels.map((item) => (
                <li key={`${item.name}-${item.id}`}>
                  <LevelItem item={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const prisma = new PrismaClient();
  const levelDocs = await prisma.levels.findMany({
    include: {
      users: {
        select: {
          userName: true,
        },
      },
      scores: {
        select: {
          time: true,
        },
      },
    },
  });
  const levels: Level[] = levelDocs.map((level) => {
    const newLevel = convertLevel(level);
    newLevel.scores = [getFastestTime(newLevel.scores)];
    return newLevel;
  });

  return {
    props: {
      levels,
    },
  };
};

export default Play;
