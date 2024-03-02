import React, { useContext } from "react";
import "./LoginPage.css";
import axios from "../../../axios-config";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import { checkValidJwtAccessToken } from "../../../utility";

const LoginPage = () => {
  const [inputs, setInputs] = React.useState({});
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(Context);

  const captureInputs = (name, value) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const sendLoginCreds = async (e) => {
    e.preventDefault();
    console.log(inputs);
    const data = await axios.post("/user/login", inputs);
    if (data.data === "OK") {
      setIsLoggedIn(true);
      return navigate("/");
    }
  };

  const getData = async () => {
    await axios
      // .get("http://localhost:4000/data/allData", { withCredentials: true })
      .get("/data/allData2")
      .then((res) => {
        console.log(res);
      }).catch((e)=>{
        console.log('e', e.response.data.message)
        console.log('e2', e)
      });
  };

  const signUpUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/signup", inputs);
    } catch (error) {
      console.log(error);
    }
  };
  const signUpJwtUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/jwtUser/jwtSignUp", inputs);
    } catch (error) {
      console.log(error);
    }
  };

  

  const sendJwtLoginCreds = async (e) => {
    e.preventDefault();
    console.log(inputs);
    const data = await axios.post("/jwtUser/jwtLogin", inputs);
    console.log("data.data", data.data);
    const accessTokenCheck = await checkValidJwtAccessToken();
    if (!accessTokenCheck) return alert("Invalid Token Issued");
    return navigate("/");
  };

  return (
    <div className="mainApp">
      <div className="parent">
        <div className="session-based">
          <h4> Session Login !!!</h4>
          <form onSubmit={sendLoginCreds}>
            <input
              type="text"
              placeholder="email"
              name="email"
              onChange={(e) => captureInputs(e.target.name, e.target.value)}
            ></input>
            <br />
            <br />

            <input
              type="text"
              name="password"
              placeholder="password"
              onChange={(e) => captureInputs(e.target.name, e.target.value)}
            ></input>
            <br />
            <br />
            <button type="submit">Send</button>
          </form>
        </div>
        <div className="session-based">
          <h4> Session Signup !!!</h4>
          <form onSubmit={signUpUser}>
            <input
              type="text"
              placeholder="email"
              name="email"
              onChange={(e) => captureInputs(e.target.name, e.target.value)}
            ></input>
            <br />
            <br />

            <input
              type="text"
              name="password"
              placeholder="password"
              onChange={(e) => captureInputs(e.target.name, e.target.value)}
            ></input>
            <br />
            <br />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>

      <br />

      <div className="parent">
        <div className="jwt-based">
          <h4> JWT Login !!!</h4>
          <form onSubmit={sendJwtLoginCreds}>
            <input
              type="text"
              placeholder="email"
              name="email"
              onChange={(e) => captureInputs(e.target.name, e.target.value)}
            ></input>
            <br />
            <br />

            <input
              type="text"
              name="password"
              placeholder="password"
              onChange={(e) => captureInputs(e.target.name, e.target.value)}
            ></input>
            <br />
            <br />
            <button type="submit">Send</button>
          </form>
        </div>
        <div className="jwt-based">
          <h4> JWT Signup !!!</h4>
          <form onSubmit={signUpJwtUser}>
            <input
              type="text"
              placeholder="email"
              name="email"
              onChange={(e) => captureInputs(e.target.name, e.target.value)}
            ></input>
            <br />
            <br />

            <input
              type="text"
              name="password"
              placeholder="password"
              onChange={(e) => captureInputs(e.target.name, e.target.value)}
            ></input>
            <br />
            <br />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
      <button onClick={getData}>Session Another Api Call</button>
      <button onClick={checkValidJwtAccessToken}>
        Check Valid Jwt Access Token
      </button>
    </div>
  );
};

export default LoginPage;
