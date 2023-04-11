const sdk = require("node-appwrite");

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
  const client = new sdk.Client();

  // You can remove services you don't use
  const account = new sdk.Account(client);
  const avatars = new sdk.Avatars(client);
  const databases = new sdk.Databases(client);
  const functions = new sdk.Functions(client);
  const health = new sdk.Health(client);
  const locale = new sdk.Locale(client);
  const storage = new sdk.Storage(client);
  const teams = new sdk.Teams(client);
  const users = new sdk.Users(client);

  if (
    !req.variables["APPWRITE_FUNCTION_ENDPOINT"] ||
    !req.variables["APPWRITE_FUNCTION_API_KEY"]
  ) {
    console.warn(
      "Environment variables are not set. Function cannot use Appwrite SDK."
    );
  } else {
    client
      .setEndpoint(req.variables["APPWRITE_FUNCTION_ENDPOINT"])
      .setProject(req.variables["APPWRITE_FUNCTION_PROJECT_ID"])
      .setKey(req.variables["APPWRITE_FUNCTION_API_KEY"])
      .setSelfSigned(true);

    const movies = require("../../../movies.json");
    const dotenv = require("dotenv");

    // Init SDK
    dotenv.config();

    client
      .setEndpoint(process.env.APPWRITE_ENDPOINT) // Your API Endpoint
      .setProject(process.env.APPWRITE_PROJECTID) // Your project ID
      .setKey(process.env.APPWRITE_KEY) // Your secret API key
      .setSelfSigned(); // Use only on dev mode with a self-signed SSL cert

    //let promise = database.getDocument('627e9b5e008ffd8382ff', '6283ccb7773a9474319d')
    // Run this until you are happy with the number of documents
    const movieWrite = async () => {
      console.log("starting addition of documents to db");

      for (const movie of movies) {
        const response = await databases.createDocument(
          "YOUR_COLLECTION_ID",
          String(Math.random()),
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

    movieWrite();
  }

  res.json({
    areDevelopersAwesome: true,
  });
};
