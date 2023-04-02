import { Client, Account, Databases, Permission, Role } from "appwrite";

const client = new Client();

const account = new Account(client);

client
  .setEndpoint(process.env.NEXT_PUBLIC_END_PT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

const promise = account.get();

export const promise_accnt = promise.then(
  function (response) {
    console.log(response);
    // Success
  },
  function (error) {
    console.log(error); // Failure
  }
);
