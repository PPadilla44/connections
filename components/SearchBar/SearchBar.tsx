import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface SearchBarProps {
  route: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ route }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (query.length === 0) {
      router.push(`/${route}`);
    } else {
      router.push(`/${route}?search=${query}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`w-full max-w-sm border outline-none focus-within:border-dom focus-within:border-2 
  placeholder-gray  rounded-md flex items-center relative`}
    >
      <input
        autoComplete="on"
        placeholder={"Search"}
        className={`bg-transparent font-light autofill:rounded w-full outline-none h-full px-3 py-2 `}
        type={"search"}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <button className="px-3">
        <Icon icon={"fa-solid:search"} width={20} />
      </button>
    </form>
  );
};

export default SearchBar;
