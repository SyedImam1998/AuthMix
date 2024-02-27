import React from 'react'
import './LoginPage.css';
import axios from '../../../axios-config';

const LoginPage = () => {
    const [inputs, setInputs] = React.useState({});

    
    const captureInputs = (name, value) => {
        setInputs({
          ...inputs,
          [name]: value,
        });
      };
    
      const sendLoginCreds = async (e) => {
        e.preventDefault();
        console.log(inputs);
        await axios.post("/user/login", inputs).then((data) => {
          console.log(data);
        });
      };
    
      const getData = async () => {
        await axios
          // .get("http://localhost:4000/data/allData", { withCredentials: true })
          .get("/data/allData")
          .then((res) => {
            console.log(res);
          });
      };
    
      const signUpUser = async (e) => {
        e.preventDefault();
        try {
          await axios.post("/user/signup",inputs);
        } catch (error) {
          console.log(error);
        }
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
        <div className="jwt-based">
          <h4> JWT Signup !!!</h4>
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
      </div>
      <button onClick={getData}>Another Api Call</button>
    </div>
  )
}

export default LoginPage;