import { Client, Account, Databases } from "appwrite";

const client_1 = new Client();
export const account = new Account(client_1);

// we we are setting the end point refer notion

export const databases = new Databases(client_1);

export const client = client_1
  .setEndpoint("http://localhost/v1")
  .setProject("64212d46cfb5216a4094");
