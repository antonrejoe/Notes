import React from "react";
import { useRouter } from "next/router";
import { Client, Functions } from "appwrite";
import Document_board from "../../../components/Document_board";
import NoSSR from "react-no-ssr";

export default function document() {
  const router = useRouter();

  const client = new Client();

  client
    .setEndpoint(process.env.NEXT_PUBLIC_END_PT) // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID); // Your project ID

  return (
    <>
      <main>
        <div className=" grid m-0 w-screen bg-cyan-600  grid-flow-col place-items-end text-center grid-cols-1">
          Moshi Moshi
        </div>
        <NoSSR>
          <Document_board />
        </NoSSR>
      </main>
    </>
  );
}
