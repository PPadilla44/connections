import { Icon } from "@iconify/react";
import React from "react";

const DashSearch = () => {
  return (
    <div className="w-full max-w-sm flex flex-col gap-5">
      <div
        className={`w-full max-w-sm border outline-none focus-within:border-dom focus-within:border-2 
                      placeholder-gray  rounded-md flex items-center relative`}
      >
        <div className="px-3">
          <Icon icon={"fa-solid:search"} className="" width={20} />
        </div>
        <input
          autoComplete="on"
          placeholder={""}
          className={`bg-transparent font-light autofill:rounded w-full outline-none h-full px-3 py-2 `}
          type={"search"}
        />
      </div>
      <div className="flex justify-between w-full">
        <button>
          <p className="text-dom">Play Random</p>
        </button>
        <button className="bg-dom px-3 py-1 rounded-md">
          <p className="text-black font-normal">Search</p>
        </button>
      </div>
    </div>
  );
};

export default DashSearch;
