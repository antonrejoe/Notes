import React, { useState, useEffect } from "react";
import NoSSR from "react-no-ssr";
import { Client, Databases } from "appwrite";
import { TextField } from "@mui/material";
import { Cookies } from "react-cookie";
import { atom, useAtom } from "jotai";
import { sel_doc_ID } from "../../../components/Document";
const cookies = new Cookies();

const client = new Client();

import {
  useQueryClient,
  QueryClient,
  useQuery,
  useMutation,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

client
  .setEndpoint(process.env.NEXT_PUBLIC_END_PT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

const databases = new Databases(client);

export default function document() {
  const [doc_ID] = useAtom(sel_doc_ID);
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: [`getDoc${cookies.get("id_current")}`],
    queryFn: () =>
      databases
        .getDocument(
          process.env.NEXT_PUBLIC_PRIMARY_DB_ID,
          process.env.NEXT_PUBLIC_SECONDARY_COLLECTION_ID,
          cookies.get("id_current")
        )
        .then((res) => {
          console.log(res);

          return res;
        }),
  });

  if (isLoading) {
    console.log("It's loading");
  }

  function updateDoc(content) {
    databases
      .updateDocument(
        process.env.NEXT_PUBLIC_PRIMARY_DB_ID,
        process.env.NEXT_PUBLIC_SECONDARY_COLLECTION_ID,
        doc_ID,
        { content: content }
      )
      .then((res) => {
        console.log(res);
        return res;
      });
  }
  const mutateContent = useMutation({
    mutationFn: updateDoc,
    onMutate: () => console.log("nothing bruh"),
    onSuccess: () => {
      refetch(), queryClient.invalidateQueries(`getDoc${cookies.get("id")}`);
    },
  });

  if (!!data) {
    console.log(`The data is ${data.content}`);

    return (
      <>
        <NoSSR>
          <main className="">
            <div className=" grid m-0 w-screen bg-gray-900  grid-flow-col place-items-end text-center grid-cols-1 p-3"></div>
            <main className="w-[65ch]  m m-auto h-screen">
              <h1 className="text-4xl my-[3rem]"> {data.heading}</h1>
              <h4>{data.createdAt} </h4>
              <div>
                <TextField
                  id="outlined-multiline-flexible"
                  placeholder=""
                  multiline
                  variant="standard"
                  sx={{
                    width: "65ch",
                  }}
                  // defaultValue={data.content}
                  defaultValue={data.content}
                  onChange={(e) => {
                    setTimeout(() => {
                      mutateContent.mutate(e.target.value);
                    }, 1000);
                  }}
                />
              </div>
            </main>
          </main>
        </NoSSR>
      </>
    );
  }
}
