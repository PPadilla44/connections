import React from "react";
import Layout from "../../components/Layout";
import LeaderboardItem from "../../components/LeaderboardItem";
import SearchBar from "../../components/SearchBar";

const data = [
  {
    id: 1,
    name: "Parat Paradice",
    username: "Paraotlover124",
    tableData: [
      {
        player: "FamishFamishFamishFamish",
        time: "04:45.165",
        date: "05/09/2022",
      },
      {
        player: "Famish",
        time: "04:45.165",
        date: "05/09/2022",
      },
      {
        player: "Famish",
        time: "04:45.165",
        date: "05/09/2022",
      },
    ],
  },
  {
    id: 2,
    name: "Other Level Name",
    username: "Paraotlover124",
    tableData: [
      {
        player: "FamishFamishFamishFamish",
        time: "04:45.165",
        date: "05/09/2022",
      },
      {
        player: "Famish",
        time: "04:45.165",
        date: "05/09/2022",
      },
      {
        player: "Famish",
        time: "04:45.165",
        date: "05/09/2022",
      },
    ],
  },
];

const Leaderboards = () => {
  return (
    <Layout title="Leaderboards">
      <div className="flex justify-center bg-darkBlue">
        <div className="max-w-7xl w-full flex mt-12 flex-col gap-10">
          <SearchBar />
          <ul className="flex flex-col gap-10">
            {data.map((item) => (
              <li key={`${item.name}-${item.id}`} className="w-full">
                <LeaderboardItem item={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboards;
