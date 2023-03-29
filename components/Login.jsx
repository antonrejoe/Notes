import React from "react";
import { account } from "../appwrite/appwriteConfig.js";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { useState } from "react";
import "../assets/css/Login/index.css";

const Login = () => {
  const navigate = useNavigate();

  const googleLogin = (e) => {
    e.preventDefault();
    account.createOAuth2Session("google", "http://localhost:4000/profile");
  };

  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const loginUser = async (e) => {
    try {
      await account.createEmailSession(user.email, user.password);
      navigate("/profile");
      console.log(e);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div class="login_container">
        <div>Login</div>

        <input
          type="text"
          name="name"
          id="name"
          onChange={(e) => {
            setuser({
              ...user,
              email: e.target.value,
            });
          }}
        />
        <input
          type="password"
          label="password"
          name="password"
          id="password"
          variant="outlined"
          onChange={(e) => {
            setuser({
              ...user,
              password: e.target.value,
            });
          }}
        />
        <button onClick={loginUser} class="login_btn">
          Submit
        </button>
        <button onClick={googleLogin}>google</button>
      </div>
      <Link to="/signup">Don't have an account ?</Link>
    </>
  );
};

export default Login;
