import React, { useState, useEffect } from "react";
import Textfield from "./Textfield";
const Document_playground = ({ content, heading, createdAt }) => {
  const [createdTime, setcreatedTime] = useState({
    year: "",
    month: "",
    date: "",
  });

  return (
    <main className="w-[65ch]  m m-auto h-screen">
      <h1 className="text-4xl my-[3rem]"> {heading}</h1>
      <h4>{createdTime.year} </h4>
      <Textfield />
    </main>
  );
};

export default Document_playground;
