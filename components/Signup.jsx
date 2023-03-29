import React from "react";
import { useState, useEffect } from "react";
import { Client, Account } from "appwrite";

const client = new Client();

const account = new Account(client);

const Signup = () => {
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
        "http://localhost:4000/profile",
        "http://localhost:4000/login"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const signUpUser = async (e) => {
    e.preventDefault();

    try {
      const promise = await account.create(
        crypto.randomUUID(),
        user.email,
        user.password,
        user.name
      );

      promise.then(
        function (response) {
          console.log(response);
        },
        function (error) {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
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
            {" "}
            google
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
