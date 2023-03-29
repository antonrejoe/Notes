import { v4 as randomUUID } from "uuid";

import type { NextApiRequest, NextApiResponse } from "next";
type Data = {
  data: string;
};

const sdk = require("node-appwrite");

// Init SDK
const client = new sdk.Client();
client
  .setEndpoint(process.env.END_PT as string) // Your API Endpoint
  .setProject(process.env.PROJECT_ID as string) // Your project ID
  .setKey(process.env.API_KEY as string); // Your secret API key
const databases = new sdk.Databases(client);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    let promise = await databases.createDocument(
      process.env.PRIMARY_DB_ID as string,
      process.env.COLLECTION_ID as string,
      randomUUID(),
      {
        content: "Expectro patronum",
        createdAt: new Date("2023-03-28"),
        userEmail: "antonrejoe@gmail.com",
      }
    );

    console.log(promise);

    res.status(200).json({ data: "OK" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ data: "NOT OK" });
  }
}
