import  { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Screen/Login/loginPage";
import Home from "./Screen/Home/Home";
import { getCookiesDetails } from "../utility";
import { loggedInCheckApi } from "./Api/auth";
import { Context } from "./Context";

function App() {
  const {isLoggedIn,setIsLoggedIn}= useContext(Context);
  console.log(isLoggedIn)

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      const isLoggedIn = getCookiesDetails();
      console.info(isLoggedIn)
      if (!isLoggedIn) return setIsLoggedIn(false);
      try {
        const result = await loggedInCheckApi();
        setIsLoggedIn(result);
      } catch (error) {
        console.error("Error while checking loggedin status:", error);
        alert("Something went wrong while checking loggedin status");
      }
    };

    checkIsLoggedIn();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
