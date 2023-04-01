"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Account, Client } from "appwrite";
import { useRouter } from "next/router";
import Link from "next/link";
const sdk = require("node-appwrite");
const client_sdk = new sdk.Client();
const client = new Client();
const account = new Account(client);

client
  .setEndpoint(process.env.NEXT_PUBLIC_END_PT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

client_sdk
  .setEndpoint(process.env.NEXT_PUBLIC_END_PT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID)
  .setKey(process.env.NEXT_PUBLIC_API_KEY);

const Signup = () => {
  const router = useRouter();
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const googleLogin = (e) => {
    try {
      e.preventDefault();
      account.createOAuth2Session(
        "google",
        "http://localhost:3000/profile",
        "http://localhost:3000/login"
      );
      setTimeout(() => {
        router.push("/profile");
      }, 1700);
    } catch (error) {
      console.log(error);
    }
  };

  const signUpUser = async (e) => {
    e.preventDefault();

    try {
      const promise = account.create(
        crypto.randomUUID(),
        user.email,
        user.password,
        user.name
      );

      promise.then(
        function (response) {
          console.log(response);
          const accnt_promise = account.get();
          accnt_promise.then(
            (res) => {
              console.log(res);
            },
            function (err) {
              console.log(err);
            }
          );
        },
        function (error) {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }

    // !  for creating collection

    // const promise_1 = databases_sdk.createCollection(
    //   process.env.NEXT_PUBLIC_PRIMARY_DB_ID,
    //   crypto.randomUUID(),
    //   userID.name
    //   [
    //     Permission.update(Role.user(userID)),
    //     Permission.read(Role.user(userID)),
    //     Permission.delete(Role.user(userID)),
    //     Permission.create(Role.user(userID)),
    //   ]
    // );

    // promise_1.then(
    //   function (response) {
    //     console.log(response);

    // ! for creating a collection for the user
    //     setTimeout(() => {
    //       router.push("/profile");
    //     }, 1700);
    //   },
    //   (err) => console.log(err)
    // );
  };
  return (
    <>
      <div className=" grid place-items-center w-min m-auto text-start  px-4 mt-7">
        <div>
          <label className="m-2 mx-0 p-2 ml-0 pl-0 " htmlFor="name">
            Name
          </label>
          <input
            className="my-4  p-3 bg-blue-100  rounded"
            id="name"
            name="name"
            type="text"
            placeholder="moshi moshi"
            onChange={(e) => {
              setuser({
                ...user,
                name: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label htmlFor="name" className="m-2 ml-0 pl-0 p-2">
            Email
          </label>

          <input
            className="m-1 my-4 p-3 bg-blue-100  rounded"
            id="email"
            name="email"
            type="text"
            placeholder="moshi moshi"
            onChange={(e) => {
              setuser({
                ...user,
                email: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label htmlFor="name" className="m-2 mx-0 p-2 ml-0 pl-0 ">
            Password
          </label>

          <input
            className="m-1 my-4 p-3 bg-blue-100  rounded"
            id="password"
            name="password"
            type="password"
            placeholder="moshi moshi"
            onChange={(e) => {
              setuser({
                ...user,
                password: e.target.value,
              });
            }}
          />
        </div>
        <div className="my-7">
          <button
            type="submit"
            onClick={signUpUser}
            className=" p-3 rounded-md bg-blue-400 mx-5"
          >
            Submit{" "}
          </button>
          <button
            onClick={googleLogin}
            className=" p-3 rounded-md bg-blue-400 mx-5 w-fit"
          >
            google
          </button>
        </div>
        <Link href="/login"> login </Link>
      </div>
    </>
  );
};

export default Signup;
