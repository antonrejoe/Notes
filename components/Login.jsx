"use client";
import React from "react";
import { useState } from "react";
import { Account, Client } from "appwrite";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  const client = new Client();

  const account = new Account(client);

  client
    .setEndpoint(process.env.NEXT_PUBLIC_END_PT)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

  const googleLogin = (e) => {
    e.preventDefault();
    account.createOAuth2Session("google", "http://localhost:3000/profile");
    setTimeout(() => {
      router.push("/profile");
    }, 1700);
  };

  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const loginUser = async (e) => {
    try {
      await account.createEmailSession(user.email, user.password);
      const user_id = JSON.parse(e).$id;
      console.log(user_id);
      setTimeout(() => {
        router.push("/profile");
      }, 1700);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" drop-shadow-sm grid place-items-center bg-cyan-800 w-fit m-auto h-fit p-4 rounded ">
        <div>Login</div>

        <input
          className="m-1 my-4 p-3 bg-blue-100  rounded"
          type="text"
          name="name"
          id="name"
          onChange={(e) => {
            setuser({
              ...user,
              email: e.target.value,
            });
          }}
        />
        <input
          className="m-1 my-4 p-3 bg-blue-100  rounded"
          type="password"
          label="password"
          name="password"
          id="password"
          variant="outlined"
          onChange={(e) => {
            setuser({
              ...user,
              password: e.target.value,
            });
          }}
        />
        <div>
          <button
            onClick={loginUser}
            className="p-3 rounded-md bg-blue-400 mx-5 m-3 px-6"
          >
            Submit
          </button>
          <button
            onClick={googleLogin}
            className="p-3 rounded-md bg-blue-400 mx-5 m-3 px-6"
          >
            google
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
