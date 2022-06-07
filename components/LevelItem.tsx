import Link from "next/link";
import React from "react";
import { Level } from "../types";

interface LevelItemProps {
  item: Level;
}

const LevelItem: React.FC<LevelItemProps> = ({ item }) => {
  const { difficulty, id, name, users, scores } = item;
  const { userName } = users;
  const time = scores[0]?.time || "NEW"

  return (
    <div>
      <div className="w-fit">
        <Link href={`/play/${id}`} passHref>
          <a>
            <h5 className="text-dom truncate mb-1">{name}</h5>
          </a>
        </Link>
      </div>
      <span className="font-light truncate">by {userName}</span>
      <div className="flex">
        <span className="font-light w-20">{difficulty}</span>
        <span className="font-light">Best time: {time}</span>
      </div>
    </div>
  );
};

export default LevelItem;
