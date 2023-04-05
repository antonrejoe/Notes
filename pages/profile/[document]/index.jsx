import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NoSSR from "react-no-ssr";
import { Client, Databases } from "appwrite";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const id = cookies.get("id");

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_END_PT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);
const db = new Databases(client);

export default function document() {
  const [document, setDocument] = useState({
    heading: "",
    content: " ",
    createdAt: " ",
  });
  useEffect(() => {
    const db_sel = db.getDocument(
      process.env.NEXT_PUBLIC_PRIMARY_DB_ID,
      process.env.NEXT_PUBLIC_SECONDARY_COLLECTION_ID,
      id
    );
    db_sel.then(
      (res) => {
        console.log(" here is the doc", res);
        setDocument({
          ...document,
          heading: res.heading,
          content: res.content,
          createdAt: res.$createdAt,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <>
      <NoSSR>
        <main>
          <div className=" grid m-0 w-screen bg-cyan-600  grid-flow-col place-items-end text-center grid-cols-1">
            {document.heading}
          </div>
          {id ? <>{id}</> : <>nope</>}
        </main>
      </NoSSR>
    </>
  );
}
