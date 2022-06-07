import Cookies from "js-cookie";
import Link from "next/link";
import React from "react";
import { useAuth } from "./hooks/useAuth";
import { Icon } from "@iconify/react";

interface NavbarProps {
  route: string;
}

const Navbar: React.FC<NavbarProps> = ({ route }) => {
  const { state, dispatch } = useAuth();
  const {
    user: { isLoggedIn },
  } = state;

  const routes = [
    { route: "/", name: "PRODUCTION NAME", className: "text-2xl font-normal" },
    { route: "/play", name: "Play" },
    { route: "/level_creator", name: "Create" },
    { route: "/leaderboards", name: "Leaderbaords" },
  ];

  return (
    <nav className="w-full px-3 h-12 bg-black flex items-center justify-center fixed top-0 left-0 z-50">
      <div className="max-w-7xl w-full flex justify-between">
        <ul className="flex gap-6 items-center">
          {routes.map((r) => (
            <li
              key={r.name}
              className={`${
                r.className ? r.className : "text-base font-light"
              } cursor-pointer`}
            >
              <Link href={r.route} passHref>
                <a className={`${r.route === route && "underline"}`}>
                  {r.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-3 items-center">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  dispatch({ type: "USER_LOGOUT" });
                  Cookies.remove("userInfo");
                }}
                className="font-light"
              >
                <span>Log out</span>
              </button>
              <Link href={`/register`} passHref>
                <button className="">
                  <Icon icon={"carbon:user-avatar"} height={33} />
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href={`/login`} passHref>
                <button className="font-light">
                  <a>Log in</a>
                </button>
              </Link>
              <Link href={`/register`} passHref>
                <button className="bg-dom rounded-md px-2 py-1 text-black font-normal">
                  <span>Sign up</span>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
