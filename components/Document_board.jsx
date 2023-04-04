import React, { useState, useEffect } from "react";
import usePromise from "react-promise";
import { Client, Databases, Functions } from "appwrite";

const client = new Client();

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

const Document_board = () => {
  const [documents, setDocuments] = useState([]);
  const [docEmpty, setDocEmpty] = useState(true);
  useEffect(() => {
    const list_Doc = databases.listDocuments(
      process.env.NEXT_PUBLIC_PRIMARY_DB_ID,
      process.env.NEXT_PUBLIC_SECONDARY_COLLECTION_ID
    );

    list_Doc.then(
      (res) => {
        setDocuments(res.documents);
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

  return (
    <>
      {documents.map((e) => {
        <li>{e.$createdAt} </li>;
      })}
    </>
  );
};

export default Document_board;
