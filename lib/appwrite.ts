import { Client, Account, Databases } from "appwrite";

const client = new Client();
export const account = new Account(client);

// we we are setting the end point refer notion
client
  .setEndpoint(process.env.END_PT as string) // this thing just to points to me that's all
  .setProject(process.env.PROJECT_ID as string);

export const databases = new Databases(client);
