import React, { useState, useEffect } from "react";
import NoSSR from "react-no-ssr";
import { Client, Databases } from "appwrite";
import { TextField } from "@mui/material";
import { Cookies } from "react-cookie";
import { atom, useAtom } from "jotai";
const cookies = new Cookies();

const client = new Client();
const contentAtom = atom("");

import {
  useQueryClient,
  QueryClient,
  useQuery,
  useMutation,
} from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

client
  .setEndpoint(process.env.NEXT_PUBLIC_END_PT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

const databases = new Databases(client);

export default function document() {
  const [content, setContent] = useAtom(contentAtom);

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["getDoc"],
    queryFn: () =>
      databases
        .getDocument(
          process.env.NEXT_PUBLIC_PRIMARY_DB_ID,
          process.env.NEXT_PUBLIC_SECONDARY_COLLECTION_ID,
          cookies.get("id")
        )
        .then((res) => {
          console.log(res);
          return res;
        }),
  });

  if (isLoading) {
    console.log("It's loading");
  }

  const {
    data: updateData,
    error: updateError,
    isLoading: updateIsLoading,
    refetch: updateRefetch,
  } = useQuery({
    queryKey: ["docUpdate"],
    exact: true,
    queryFn: async () =>
      databases
        .updateDocument(
          process.env.NEXT_PUBLIC_PRIMARY_DB_ID,
          process.env.NEXT_PUBLIC_SECONDARY_COLLECTION_ID,
          cookies.get("id"),
          { content: content }
        )
        .then((res) => {
          console.log(res);
          return res;
        }),
  });

  // const {
  //   data: dataUpdate,
  //   error: errorUpdate,
  //   isLoading: updatingIsLoading,
  //   refetch: refetchUpdate,
  // } = useQuery({
  //   queryKey: ["update_doc"],
  //   queryFn: () =>

  if (!!data && !!updateData) {
    console.log(`The data is ${data.content}`);

    if (!!content) {
    }
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
                    setContent(e.target.value);
                  }}
                />
                <h1>{data.content}</h1>
              </div>
            </main>
          </main>
        </NoSSR>
      </>
    );
  }
}
