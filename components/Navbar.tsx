import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "./hooks/useAuth";

interface NavbarProps {
  route: string;
  isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ route, isLoggedIn }) => {
  const { dispatch } = useAuth();

  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  const routes = [
    { route: "/", name: "Home" },
    { route: "/play", name: "Play" },
    { route: "/level_creator", name: "Create" },
    { route: "/leaderboards", name: "Leaderbaords" },
  ];

  return (
    <nav className="w-full h-16 bg-slate-300 flex items-center justify-center fixed top-0 left-0 z-50">
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
          {loggedIn ? (
            <button
              onClick={() => {
                setLoggedIn(false)
                dispatch({ type: "USER_LOGOUT" });
                Cookies.remove("userInfo");
              }}
              className="border-2 border-black  w-20 h-10"
            >
              <span>Log out</span>
            </button>
          ) : (
            <>
              <Link href={`/login?redirect=${route}`} passHref>
                <button className="border-2 border-black w-20 h-10">
                  <a>Log in</a>
                </button>
              </Link>
              <Link href={`/register?redirect=${route}`} passHref>
                <button className="border-2 border-black bg-red-200 w-20 h-10">
                  <span>Sign up</span>
                </button>
              </Link>
            </>
          )}
          <button className="w-10 h-10 border-2 border-black rounded-full"></button>
        </div>
      </div>
    </nav>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.cookies;

  // UNCOMMNET TO NOT MOUNT ROUTE IF LOGGED IN

  // if (cookies.userInfo) {

  //   const { redirect } = context.query;
  //     return {
  //         redirect: {
  //             destination: redirect ? redirect as string : '/',
  //             permanent: false
  //         }
  //     }
  // }

  console.log(cookies);

  return {
    props: {
      isLoggedIn: cookies.userInfo ? true : false,
    },
  };
};

export default Navbar;
