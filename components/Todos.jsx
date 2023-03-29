import React from "react";
import { useState, useEffect } from "react";
import { databases } from "../appwrite/appwriteConfig.js";
import { account } from "../appwrite/appwriteConfig.js";
const Todos = () => {
  const [getDoc, setGetDoc] = useState();
  // const check = getDoc.name == account.name;

  useEffect(() => {
    const promise = databases.listDocuments(
      "64187e3b0c4e988035e2",
      "64187e5258a86452f64d"
    );

    promise.then(
      function (response) {
        setGetDoc(response.documents);
      },
      function (error) {
        console.log(error);
      }
    );
  }, [getDoc]);

  return <>{getDoc && getDoc.map((item) => <li>{item.content}</li>)}</>;
};

export default Todos;
