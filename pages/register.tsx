import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { UserClientType, UserRegiser } from "../types";
import { getError } from "../utils/error";
import Cookies from "js-cookie";
import { useAuth } from "../components/hooks/useAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const Register = () => {
  const { dispatch } = useAuth();
  const router = useRouter();
  const { redirect } = router.query;

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<UserRegiser>();

  const [dbError, setDbError] = useState("");

  const submitHandler = async (userData: UserRegiser) => {
    setDbError("");
    const { password, confirmPassword } = userData;
    if (password !== confirmPassword) {
      setError("confirmPassword", {
        message: "don't match",
      });
      return;
    }

    try {
      const { data } = await axios.post<UserClientType>(
        `/api/users/register`,
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
    <Layout title="Register" isLoggedIn={false}>
      <div className="w-full h-full flex justify-center">
        <div className="max-w-3xl w-full mt-12 flex flex-col gap-5">
          <h2 className="text-5xl font-semibold">Register</h2>
          <form onSubmit={handleSubmit(submitHandler)}>
            <ul className="gap-5 flex flex-col">
              <li>
                <Input
                  name="userName"
                  label="Username"
                  register={register}
                  rules={{
                    minLength: 2,
                    required: true,
                  }}
                  errorMessage={
                    errors.userName
                      ? errors.userName.type === "minLength"
                        ? "Username must be at least 2 characters"
                        : "Username is required"
                      : ""
                  }
                />
              </li>
              <li>
                <Input
                  name="email"
                  label="Email"
                  type={"email"}
                  register={register}
                  rules={{
                    required: true,
                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  }}
                  errorMessage={
                    errors.email
                      ? errors.email.type === "pattern"
                        ? "Email is not valid"
                        : "Email is required"
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
              <li>
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  register={register}
                  rules={{
                    required: true,
                    minLength: 6,
                  }}
                  errorMessage={
                    errors.confirmPassword
                      ? "Password and Confirm Password must match"
                      : ""
                  }
                />
              </li>
              <li className="flex gap-2 items-center justify-between">
                <p className="">
                  Already have an account?{" "}
                  <Link href={"/login"} passHref>
                    <a className="text-red-900">Login</a>
                  </Link>
                </p>
                <button
                  className="bg-red-900 w-2/3 h-14 text-white border-2 border-black"
                  type="submit"
                >
                  Register
                </button>
              </li>
              {dbError && <span className="text-red-900">{dbError}</span>}
            </ul>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.cookies;

  // UNCOMMNET TO NOT MOUNT ROUTE IF LOGGED IN

  if (cookies.userInfo) {

    const { redirect } = context.query;
      return {
          redirect: {
              destination: redirect ? redirect as string : '/',
              permanent: false
          }
      }
  }

  return {
    props: {},
  };
};

export default Register;
