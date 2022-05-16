import { Icon } from "@iconify/react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import Dropdown from "../../components/Dropdown";
import Layout from "../../components/Layout";
import LevelItem from "../../components/LevelItem";
import SearchBar from "../../components/SearchBar";
import { FilterPlaySearchType, Level } from "../../types";
import { getPlayPageLevels } from "../../utils/db";

interface PlayProps {
  levels: Level[];
}

const Play: NextPage<PlayProps> = ({ levels }) => {
  const router = useRouter();

  const { sort = "recent", order = "desc" } = router.query;

  const filterSearch = (data: FilterPlaySearchType) => {
    const path = router.pathname;
    const { query } = router;
    if (data.search) query.search = data.search;
    if (data.sort) query.sort = data.sort;
    if (data.order) query.order = data.order;
    router.push({
      pathname: path,
      query: query,
    });
  };

  return (
    <Layout title="Play">
      <div className="w-full flex justify-center bg-darkBlue">
        <div className="max-w-7xl w-full mt-12">
          <div className="max-w-2xl flex flex-col gap-10">
            <div className="flex justify-between items-center">
              <SearchBar route="play" />

              <Dropdown
                value={sort as string}
                onChange={(e) => filterSearch({ sort: e.target.value })}
                options={[
                  { label: "Recent", value: "recent" },
                  // { label: "Featured", value: "featured" },
                  { label: "Alphabetical", value: "alphabetical" },
                  { label: "Difficulty", value: "difficulty" },
                ]}
              />
              <div className="flex items-center">
                <p className="text-base">Order</p>
                <button
                  onClick={() => {
                    const dir = order === "desc" ? "asc" : "desc";
                    filterSearch({ order: dir });
                  }}
                >
                  <Icon
                    icon={"fe:drop-down"}
                    height={30}
                    vFlip={order === "desc" ? true : false}
                  />
                </button>
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
  const search: string = (query.search as string) || "";
  const sort: string = (query.sort as string) || "";
  const orderDir = (query.order as "asc") || "desc";
  
  const levels = await getPlayPageLevels(search, sort, orderDir);

  return {
    props: {
      levels,
    },
  };
};

export default Play;
