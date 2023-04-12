import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import { Account, Client, Databases, Permission, Role } from "appwrite";
import { useRouter } from "next/router";
const client = new Client();
const account = new Account(client);

client
  .setEndpoint(process.env.NEXT_PUBLIC_END_PT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

const databases = new Databases(client);
const Dashboard = () => {
  const router = useRouter();

  const [userId, setUserId] = useState();
  const [docID, setDocID] = useState({ id: "" });

  const accnt_promise = account.get();
  accnt_promise.then(
    (res) => {
      setUserId(res.$id);
    },
    (err) => console.log(err)
  );

  const create_doc = () => {
    const promise = databases.createDocument(
      process.env.NEXT_PUBLIC_PRIMARY_DB_ID,
      process.env.NEXT_PUBLIC_SECONDARY_COLLECTION_ID,
      crypto.randomUUID(),
      { content: "" },
      [
        Permission.read(Role.user(userId)),
        Permission.write(Role.user(userId)),
        Permission.delete(Role.user(userId)),
        Permission.update(Role.user(userId)),
      ]
    );
    promise.then(
      function (response) {
        console.log(response);
        setDocID({
          ...docID,
          id: response.$id,
        });
        router.reload();
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
