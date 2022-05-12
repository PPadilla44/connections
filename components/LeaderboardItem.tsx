import Link from "next/link";
import React from "react";
import Table from "./Table";

interface LeaderboardItemProps {
  // REPLACE WITH ACTUAL ITEM PROPS FROM types.ts
  item: {
    id: number;
    name: string;
    username: string;
    tableData: {
      player: string;
      time: string;
      date: string;
    }[];
  };
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({ item }) => {
  const { id, name, tableData, username } = item;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-end">
        <div className="flex gap-3 items-end">
          <h2>{name}</h2>
          <p>by {username}</p>
        </div>
        <div className="flex gap-5 items-end">
          <Link href={`/leaderboards/${id}`} passHref>
            <a>
              <p className="text-dom">Leaderboard</p>
            </a>
          </Link>
          <Link href={`/play/${id}`} passHref>
            <a className="bg-dom px-3 py-1 rounded-md">
              <p className="text-black font-normal ">Play</p>
            </a>
          </Link>
        </div>
      </div>
      <Table headers={["Name", "Time", "Date"]} bodyData={tableData} />
    </div>
  );
};

export default LeaderboardItem;
