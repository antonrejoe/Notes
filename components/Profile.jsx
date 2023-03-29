import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig.js";
import { useState, useEffect } from "react";
import Signup from "./Signup";

import "../assets/css/Profile/index.css";
import TodoForm from "./TodoForm";

const Profile = () => {
  const navigate = useNavigate();

  const [userDetails, setuserDetails] = useState();
  console.log(userDetails);

  useEffect(() => {
    const getData = account.get();

    getData.then(
      function (response) {
        setuserDetails(response);
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {userDetails ? (
        <>
          <div class="navbar">
            <h3>{userDetails.name}</h3>
            <button class="logout_btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <TodoForm />
        </>
      ) : (
        <>
          <div class="signUp_direct">
            <img src="/Ancient-Aliens.jpg" alt="Ancient aliens were real" />
            <Link to="/signup">
              consider Signing in or else aliens will take you away
            </Link>
            <p> </p>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
