import React from "react";
import Carousel from "../components/Carousel";
import DashSearch from "../components/DashSearch";
import Layout from "../components/Layout";
import Table from "../components/Table";

const tableData = [
  {
    name: "Pirartes Pareadic",
    player: "Famish",
    time: "03:24.234",
    date: "05/24/2022",
  },
  {
    name: "Pirartes Pareadic",
    player: "Famish",
    time: "03:24.234",
    date: "05/24/2022",
  },
  {
    name: "Pirartes Pareadic",
    player: "Famish",
    time: "03:24.234",
    date: "05/24/2022",
  },
  {
    name: "Pirartes Pareadic",
    player: "Famish",
    time: "03:24.234",
    date: "05/24/2022",
  },
  {
    name: "Pirartes Pareadic",
    player: "Famish",
    time: "03:24.234",
    date: "05/24/2022",
  },
  {
    name: "Pirartes Pareadic",
    player: "Famish",
    time: "03:24.234",
    date: "05/24/2022",
  },
];

const Home = () => {
  return (
    <Layout>
      <div className="bg-darkBlue">
        <div className="bg-hero bg-cover flex items-center flex-col">
          <div className="max-w-7xl w-full flex justify-center items-center flex-col h-full py-32">
            <Carousel />
          </div>
        </div>
        <div className="w-full bg-black  flex flex-col items-center py-3">
          <DashSearch />
        </div>
        <div className="flex flex-col items-center py-5">
          <div className="flex items-center flex-col w-full max-w-7xl">
            <h2 className="mb-5">Recently Played</h2>
            <Table
              headers={["Level Name", "Player", "Time", "Date"]}
              bodyData={tableData}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
