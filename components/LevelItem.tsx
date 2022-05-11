import Link from "next/link";
import React from "react";

interface LevelItemProps {
  // REPLACE WITH ACTUAL ITEM PROPS FROM types.ts
  item: {
    id: number;
    name: string;
    username: string;
    difficulty: string;
    time: string;
  };
}

const LevelItem: React.FC<LevelItemProps> = ({ item }) => {
  const { difficulty, id, name, time, username } = item;

  return (
    <div className="w-full">
      <Link href={`/play/${id}`} passHref>
        <a>
          <h5 className="text-dom truncate mb-1">{name}</h5>
        </a>
      </Link>
      <span className="font-light truncate">by {username}</span>
      <div className="flex">
        <span className="font-light w-20">{difficulty}</span>
        <span className="font-light">Best time: {time}</span>
      </div>
    </div>
  );
};

export default LevelItem;
