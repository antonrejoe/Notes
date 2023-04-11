"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Account, Client } from "appwrite";
import { useRouter } from "next/navigation";
import Dashboard from "./Dashboard";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
const Profile = () => {
  const client = new Client();
  const router = useRouter();
  const account = new Account(client);

  client
    .setEndpoint(process.env.NEXT_PUBLIC_END_PT)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

  const [userDetails, setuserDetails] = useState();

  useEffect(() => {
    const getData = account.get();

    getData.then(
      function (response) {
        setuserDetails(response);
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      router.push("/login");
      cookies.remove("id");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {userDetails ? (
        <>
          <main className="">
            {/* navbar */}
            <div className=" grid m-0 w-screen bg-gray-900   grid-flow-col place-items-end text-center grid-cols-1">
              <h3 className="my-auto p-2 text-white">{userDetails.name}</h3>
              <button className="p-4 bg-blue-500" onClick={handleLogout}>
                Logout
              </button>
            </div>
            {/* dashboard */}
            <div>
              <Dashboard />
            </div>
          </main>
        </>
      ) : (
        <>
          <div className="">
            <img src="/Ancient-Aliens.jpg" alt="Ancient aliens were real" />
            consider Signing in or else aliens will take you away
            <p> </p>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
