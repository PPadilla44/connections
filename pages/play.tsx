import { GetServerSideProps, NextPage } from "next";
import React from "react";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";

interface PlayProps {
  isLoggedIn: boolean;
}

const pageData = [
  {
    name:"Parrots in a tree",
    username: "ParotLover123",
    difficulty: "Hard",
    time: "23:02.203"
  },
  {
    name:"Parrots",
    username: "Pdsaa",
    difficulty: "Easy",
    time: "23:02.203"
  },
]

const Play: NextPage<PlayProps> = ({ isLoggedIn }) => {
  return (
    <Layout title="Play" isLoggedIn={isLoggedIn}>
      <div className="w-full h-full flex justify-center bg-darkBlue">
        <div className="max-w-7xl w-full mt-12">
          <div className="max-w-2xl flex flex-col gap-10">

            <div className="flex justify-between items-center">
              <SearchBar />

              <div className="flex gap-1">
                <p>Sort by</p>
                <select className="bg-transparent text-2xl font-light rounded-md underline">
                  <option className="bg-darkBlue" value="featured">Featured</option>
                  <option className="bg-darkBlue" value="alphabetical">Alphabetical</option>
                  <option className="bg-darkBlue " value="difficulty">Difficulty</option>
                </select>
              </div>
            </div>

            <ul className="flex flex-col gap-7">
              {
                pageData.map((p, i) => (
                  <li key={`${p.name} - ${i}`} className="flex justify-between items-center">
                    <div>
                      <h3 className="text-dom">{p.name}</h3>
                      <p>by {p.username}</p>
                    </div>
                    <p>{p.difficulty}</p>
                    <p>Best time: {p.time}</p>
                  </li>
                ))
              }
            </ul>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.cookies;

  return {
    props: {
      isLoggedIn: cookies.userInfo ? true : false,
    },
  };
};

export default Play;
