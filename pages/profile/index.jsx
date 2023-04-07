import React from "react";
import Profile from "../../components/Profile";
import Document_list from "../../components/Document_list";
import NoSSR from "react-no-ssr";
const index = () => {
  return (
    <>
      <main className="bg-gray-950 h-screen">
        <Profile />
        <NoSSR>
          <Document_list />
        </NoSSR>
      </main>
    </>
  );
};

export default index;
