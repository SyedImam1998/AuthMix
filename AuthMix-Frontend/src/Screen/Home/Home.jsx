import React, { useContext, useEffect } from "react";
import "./Home.css";
import axios from "../../../axios-config";
import { getCookiesDetails } from "../../../utility";
import { loggedInCheckApi } from "../../Api/auth";
import { Context } from "../../Context";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate= useNavigate();
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
  const logout = async () => {
    await axios
      // .get("http://localhost:4000/data/allData", { withCredentials: true })
      .get("/user/logout")
      .then((res) => {
        console.log(res.data);
        if(res.data==="OK"){
          navigate('/login')
          
        }
      });
  };
  const jwtLogout = async () => {
    await axios
      // .get("http://localhost:4000/data/allData", { withCredentials: true })
      .post("/jwtUser/jwtLogout")
      .then( (res) => {
        console.log(res.data);
        if(res.data==="OK"){
          navigate('/login')
          
        }
      });
  };

  const updateValueOnServerJwt=async()=>{
    try {
      const data=await axios.post('/data/updateDataUsingJWT',{email:"syedimam1998@gmail.com",valueFromClient:"Imam Value from Client"});
      console.log('data.data', data.data)
    } catch (error) {
      console.log('error', error)
    }

  }
  return (
    <div>
      <button onClick={getData}>Another Api Call</button>
      <button onClick={logout}>Logout</button>
      <button onClick={jwtLogout}>Jwt Logout</button>
      <br/>
      <button onClick={updateValueOnServerJwt}>UpdateValueOnServer</button>

    </div>
  );
};

export default Home;
