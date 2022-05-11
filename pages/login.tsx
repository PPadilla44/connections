import axios from "axios";
import Cookies from "js-cookie";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../components/hooks/useAuth";
import Input from "../components/Input";
import Layout from "../components/Layout";
import { UserClientType, UserLogin } from "../types";
import { getError } from "../utils/error";

const Login: NextPage = () => {
  const { dispatch } = useAuth();
  const router = useRouter();
  const { redirect } = router.query;

  const {
    handleSubmit,
    register,
    formState: { errors },
    setFocus,
  } = useForm<UserLogin>();

  useEffect(() => {
    setFocus("login");
  }, [setFocus]);

  const [dbError, setDbError] = useState("");

  const submitHandler = async (userData: UserLogin) => {
    setDbError("");
    try {
      const { data } = await axios.post<UserClientType>(
        `/api/users/login`,
        userData
      );
      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", JSON.stringify({ ...data, isLoggedIn: true }));
      router.push((redirect as string) || "/");
    } catch (err) {
      setDbError(getError(err));
    }
  };

  return (
    <Layout title="Log In" isLoggedIn={false}>
      <div className="w-full h-full flex justify-center bg-darkBlue">
        <div className="max-w-3xl w-full mt-12 flex flex-col gap-5">
          <h2>Log In</h2>
          <form onSubmit={handleSubmit(submitHandler)}>
            <ul className="gap-5 flex flex-col">
              <li>
                <Input
                  name="login"
                  label="Username or Email"
                  register={register}
                  rules={{
                    minLength: 2,
                    required: true,
                  }}
                  errorMessage={
                    errors.login
                      ? errors.login.type === "minLength"
                        ? "Info must be at least 2 characters"
                        : "Info is required"
                      : ""
                  }
                />
              </li>
              <li>
                <Input
                  name="password"
                  label="Password"
                  type="password"
                  register={register}
                  rules={{
                    required: true,
                    minLength: 6,
                  }}
                  errorMessage={
                    errors.password
                      ? errors.password.type === "minLength"
                        ? "Password must be at least 5 characters"
                        : "Password is required"
                      : ""
                  }
                />
              </li>
              <li className="flex gap-2 items-center justify-between">
                <p className="text-xl font-extralight">
                  {`Don't have an account?`}{" "}
                  <Link
                    href={
                      redirect ? `/register?redirect=${redirect}` : `/register`
                    }
                    passHref
                  >
                    <a className="text-dom">Register</a>
                  </Link>
                </p>
                <button
                  className="bg-dom max-w-md w-full h-12 text-black rounded-lg text-xl"
                  type="submit"
                >
                  Log In
                </button>
              </li>
              {dbError && <span className="text-danger">{dbError}</span>}
            </ul>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
