import { Client, Databases } from "appwrite";
// export const getStaticProps = async () => {};

export function getStaticProps(id) {
  const client = new Client();
  client
    .setEndpoint(process.env.NEXT_PUBLIC_END_PT) // Your API Endpoint
    .setProject(process.env.PROJECT_ID); // Your project ID

  const databases = new Databases(client);

  const promise = databases.getDocument(
    process.env.NEXT_PUBLIC_PRIMARY_DB_ID,
    process.env.NEXT_PUBLIC_SECONDARY_COLLECTION_ID,
    id
  );
  promise.then(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    }
  );
}

export default function Doc() {
  return <>hello world</>;
}
