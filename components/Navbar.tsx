import Link from "next/link";
import React from "react";

interface NavbarProps {
  route: string;
}

const Navbar: React.FC<NavbarProps> = ({ route }) => {
  const routes = [
    { route: "/", name: "Home" },
    { route: "/play", name: "Play" },
    { route: "/level_creator", name: "Create" },
    { route: "/leaderboards", name: "Leaderbaords" },
  ];

  return (
    <nav className="w-full h-16 bg-slate-300 flex items-center justify-center">
      <div className="max-w-7xl  w-full flex justify-between">
        <ul className="flex gap-6 items-center">
          {routes.map((r) => (
            <li key={r.name} className="cursor-pointer">
              <Link href={r.route} passHref>
                <a className={`${r.route === route && "underline"}`}>
                  {r.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-6">
          <Link href={"/login"} passHref>
            <button className="border-2 border-black w-20 h-10">
              <a>Log in</a>
            </button>
          </Link>
          <Link href={"/register"} passHref>
            <button className="border-2 border-black bg-red-200 w-20 h-10">
              <span>Sign up</span>
            </button>
          </Link>
          <button className="w-10 h-10 border-2 border-black rounded-full"></button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
