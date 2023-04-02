import React, { useState } from "react";

import { Client, Databases, Functions } from "appwrite";

const client = new Client();

const databases = new Databases(client);

client
  .setEndpoint(process.env.NEXT_PUBLIC_END_PT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

const promise = databases.listDocuments(
  process.env.NEXT_PUBLIC_PRIMARY_DB_ID,
  process.env.NEXT_PUBLIC_SECONDARY_COLLECTION_ID
);
const functions = new Functions(client);

function hello() {
  const promise = functions.createExecution("642971feaa0d543c7f19");

  promise.then(
    function (response) {
      console.log(response); // Success
      console.log("Success");
    },
    function (error) {
      console.log(error); // Failure
    }
  );
}
const Document_board = () => {
  const [doc, setdoc] = useState();

  promise.then(
    function (response) {
      for (let i = 0; i < response.documents.length; i++) {
        const element = response.documents[i];
        console.log(element);
      }
    },
    function (error) {
      console.log(error); // Failure
    }
  );
  return (
    <main>
      <button onClick={hello}>hello</button>

      <div>Document_board</div>
    </main>
  );
};

export default Document_board;
