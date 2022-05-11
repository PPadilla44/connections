import { Icon } from "@iconify/react";
import React from "react";

const SearchBar = () => {
  
  return (
    <div
      className={`w-full max-w-sm border outline-none focus-within:border-dom focus-within:border-2 
  placeholder-gray font-light rounded-md flex items-center relative`}
    >
      <input
        autoComplete="on"
        placeholder={"Search"}
        className={`font-light text-2xl bg-transparent autofill:rounded w-full outline-none h-full px-4 py-2 `}
        type={"search"}
      />
      <button className="px-3">
        <Icon icon={"fa-solid:search"} width={25} />
      </button>
    </div>
  );
};

export default SearchBar;
