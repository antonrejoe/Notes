import { Client, Account, Databases } from "appwrite";

const client_1 = new Client();

// we we are setting the end point refer notion
const client = client_1
  .setEndpoint("http://localhost/v1")
  .setProject("64212d46cfb5216a4094");
export const account = new Account(client);

const databases = new Databases(client);

export const db_list_promise = databases.listDocuments(
  process.env.NEXT_PUBLIC_PRIMARY_DB_ID as string,
  process.env.NEXT_PUBLIC_COLLECTION_ID as string
);
