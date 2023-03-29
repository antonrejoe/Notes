import React from "react";
import { useState, useEffect } from "react";
import { Account, Client } from "appwrite";

const Profile = () => {
  const client = new Client();

  const account = new Account(client);

  client.setEndpoint("http://localhost/v1").setProject("64212d46cfb5216a4094");

  const [userDetails, setuserDetails] = useState();
  console.log(userDetails);

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {userDetails ? (
        <>
          <div className=" grid m-0 w-screen bg-cyan-600  grid-flow-col place-items-end text-center grid-cols-1">
            <h3 className="my-auto p-2">{userDetails.name}</h3>
            <button className="p-4 bg-blue-500" onClick={handleLogout}>
              Logout
            </button>
          </div>
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
