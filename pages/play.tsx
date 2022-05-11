import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
import LevelItem from "../components/LevelItem";
import SearchBar from "../components/SearchBar";

interface PlayProps {
}

const pageData = [
  {
    id: 1,
    name: "Parrots in a treeParrots in a treeParrots in a tree",
    username: "ParotLover123",
    difficulty: "Hard",
    time: "23:02.203",
  },
  {
    id: 2,
    name: "Parrots",
    username: "Pdsaa",
    difficulty: "Easy",
    time: "2.203",
  },
  {
    id: 3,
    name: "Parrots",
    username: "Pdsdsfdfddfdsfdfdsdsfdsfdssadsaa",
    difficulty: "Extreme",
    time: "23:02.203",
  },
];

const Play: NextPage<PlayProps> = () => {
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
              {pageData.map((item) => (
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

export default Play;