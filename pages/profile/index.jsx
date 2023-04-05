import React from "react";
import Profile from "../../components/Profile";
import Document_list from "../../components/Document_list";
import NoSSR from "react-no-ssr";
import { CookiesProvider } from "react-cookie";
const index = () => {
  return (
    <>
      <CookiesProvider>
        <Profile />
        <NoSSR>
          <Document_list />
        </NoSSR>
      </CookiesProvider>
    </>
  );
};

export default index;
