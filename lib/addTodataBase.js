import { Client, Databases } from "appwrite";

const movies = require("../movies.json");
const sdk = require("node-appwrite");

// Init SDK

const client = new sdk.Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_END_PT) // Your API Endpoint
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID) // Your project ID
  .setKey(process.env.NEXT_PUBLIC_API_KEY) // Your secret API key
  .setSelfSigned(); // Use only on dev mode with a self-signed SSL cert
const databases = new sdk.Databases(client);
//let promise = database.getDocument('627e9b5e008ffd8382ff', '6283ccb7773a9474319d')
// Run this until you are happy with the number of documents
export const movieWrite = async () => {
  console.log("starting addition of documents to db");

  for (const movie of movies) {
    const response = await databases.createDocument(
      "643410826e002a83696b",
      "6434108d53fb4af9cb7c",
      crypto.randomUUID(),
      {
        title: String(movie.title || Math.random()),
        id: String(movie.id || Math.random()),
        overview: String(movie.overview || Math.random()),
        genres: String(movie.genres || Math.random()),
      }
    );
    console.log(`Added ${movie.title}`, response);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
};
