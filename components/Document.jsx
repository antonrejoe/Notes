import { useRouter } from "next/router";
import react, { useState } from "react";
import Document_playground from "./Document_playground";
import { Client, Databases } from "appwrite";
const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_END_PT) // Your API Endpoint
  .setProject(process.env.PROJECT_ID); // Your project ID

const databases = new Databases(client);

const Document = ({ heading, id, createdAt }) => {
  const [docView, setDocView] = useState(false);
  const router = useRouter();
  function sendToDoc() {}
  return (
    <>
      <main onClick={sendToDoc}>
        <main className="grid place-items-center  w-screen">
          <div className="  p-4 rounded my-1 flex-col w-[75vw] h-auto bg-blue-300 m-5 hover:cursor-pointer ">
            <h1 className="text-2xl pl-0 p-3">{heading}</h1>
            <p>{id}</p>
            <p> {createdAt}</p>
          </div>
        </main>
      </main>
    </>
  );
};

export default Document;
