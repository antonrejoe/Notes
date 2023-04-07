import { useRouter } from "next/router";
import react, { useState } from "react";
import { Client, Databases } from "appwrite";
import { useAtom, atom } from "jotai";
import { Cookies } from "react-cookie";
const client = new Client();
export const sel_doc_ID = atom("Untitled");

client
  .setEndpoint(process.env.NEXT_PUBLIC_END_PT) // Your API Endpoint
  .setProject(process.env.PROJECT_ID); // Your project ID

const databases = new Databases(client);
const cookies = new Cookies();
const Document = ({ heading, id, createdAt }) => {
  const [docIdSel, setdocIdSel] = useAtom(sel_doc_ID);
  const router = useRouter();
  function sendToDoc() {
    cookies.set("id", id);
    router.push(`/profile/${id}`);
    setdocIdSel(id);
  }
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
