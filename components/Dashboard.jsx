import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import { Account, Client } from "appwrite";
import appwrite from "appwrite";
const sdk = require("node-appwrite");
const client_sdk = new sdk.Client();

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_END_PT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

client_sdk
  .setEndpoint(process.env.NEXT_PUBLIC_END_PT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID)
  .setKey(process.env.NEXT_PUBLIC_API_KEY);

const account = new Account(client);

const Dashboard = () => {
  const [userId, setUserId] = useState();

  const [JWT, setJWT] = useState();

  useEffect(() => {
    const promise = account.createJWT();

    promise.then(
      (res) => {
        setJWT(JSON.parse(res.jwt));
        console.log(JWT);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <>
      <main>
        <div className="" style={{ width: "75ch", margin: "auto" }}>
          <button className="m-2 p-2 bg-green-400 grid place-items-center rounded-sm ">
            <AddIcon />
          </button>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
