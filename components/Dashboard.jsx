import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import { Account, Client, Databases, Permission, Role } from "appwrite";
// const sdk = require("node-appwrite");
// const client_sdk = new sdk.Client();

const client = new Client();
const account = new Account(client);

client
  .setEndpoint(process.env.NEXT_PUBLIC_END_PT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

// client_sdk
//   .setEndpoint(process.env.NEXT_PUBLIC_END_PT)
//   .setProject(process.env.NEXT_PUBLIC_PROJECT_ID)
//   .setKey(process.env.NEXT_PUBLIC_API_KEY);

const promise = account.createJWT();
const databases = new Databases(client);

promise.then(
  (response) => {
    const jwt = response.jwt;
  },
  (err) => {
    console.log(err);
  }
);
const Dashboard = () => {
  const [userId, setUserId] = useState();
  const [docID, setDocID] = useState({ id: "" });

  const accnt_promise = account.get();
  accnt_promise.then(
    (res) => {
      setUserId(res.$id);
      console.log(userId);
    },
    (err) => console.log(err)
  );

  const create_doc = () => {
    const promise = databases.createDocument(
      process.env.NEXT_PUBLIC_PRIMARY_DB_ID,
      process.env.NEXT_PUBLIC_COLLECTION_ID,
      crypto.randomUUID(),
      { content: "" },
      []
    );
    promise.then(
      function (response) {
        console.log(response);
        setDocID({
          ...docID,
          id: response.$id,
        });
        console.log(docID.id);
      },
      function (error) {
        console.log(error);
      }
    );
  };
  return (
    <>
      <main>
        <div className="" style={{ width: "75ch", margin: "auto" }}>
          <button
            className="m-2 p-2 bg-green-400 grid place-items-center rounded-sm "
            onClick={create_doc}
          >
            <AddIcon />
          </button>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
