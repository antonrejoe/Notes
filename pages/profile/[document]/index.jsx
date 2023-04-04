import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NoSSR from "react-no-ssr";
import { Client, Databases } from "appwrite";

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_END_PT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);
const db = new Databases(client);

export default function document() {
  const [docID, setDocID] = useState(" ");
  useEffect(() => {
    const db_sel = db.getDocument(
      process.env.NEXT_PUBLIC_PRIMARY_DB_ID,
      process.env.NEXT_PUBLIC_SECONDARY_COLLECTION_ID,
      "bab93054-1b21-48a7-8b17-ffbd081571ce"
    );
    db_sel.then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <>
      <main>
        <div className=" grid m-0 w-screen bg-cyan-600  grid-flow-col place-items-end text-center grid-cols-1">
          Moshi Moshi
        </div>
        <NoSSR></NoSSR>
      </main>
    </>
  );
}
