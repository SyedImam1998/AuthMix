import React, { useContext, useEffect } from "react";
import "./Home.css";
import axios from "../../../axios-config";
import { getCookiesDetails } from "../../../utility";
import { loggedInCheckApi } from "../../Api/auth";
import { Context } from "../../Context";
const Home = () => {
  const {isLoggedIn,setIsLoggedIn}= useContext(Context);
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
  const getData = async () => {
    await axios
      // .get("http://localhost:4000/data/allData", { withCredentials: true })
      .get("/data/allData")
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div>
      <button onClick={getData}>Another Api Call</button>
    </div>
  );
};

export default Home;
