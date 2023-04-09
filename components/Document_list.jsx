import React, { useState, useEffect, createContext, useContext } from "react";
import { Client, Databases, Functions } from "appwrite";
import { useRouter } from "next/router";
const client = new Client();
import Document from "./Document.jsx";
const databases = new Databases(client);

client
  .setEndpoint(process.env.NEXT_PUBLIC_END_PT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

// ? for executing the fn.
const functions = new Functions(client);

function hello() {
  const promise = functions.createExecution("642971feaa0d543c7f19");

  promise.then(
    function (response) {
      console.log(response); // Success
    },
    function (error) {
      console.log(error); // Failure
    }
  );
}

const Document_list = () => {
  const [documents, setDocuments] = useState([]);
  const [docEmpty, setDocEmpty] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const list_Doc = databases.listDocuments(
      process.env.NEXT_PUBLIC_PRIMARY_DB_ID,
      process.env.NEXT_PUBLIC_SECONDARY_COLLECTION_ID
    );

    list_Doc.then(
      (res) => {
        setDocuments(
          res.documents.reverse((a, b) => a.$createdAt - b.$createdAt) // code for adding new items at the top
        );
        console.log(documents);
        if (documents) {
          setDocEmpty(false);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }, [docEmpty]);
  if (!docEmpty) {
    return (
      <main className=" grid grid-flow-row my-[80px] ">
        {documents.map((doc, key) => (
          <Document
            key={key}
            heading={doc.heading}
            id={doc.$id}
            createdAt={doc.$createdAt}
          />
        ))}
      </main>
    );
  }
};
export default Document_list;
