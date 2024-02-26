import React from "react";
import axios from "axios";
import "./App.css";
// import axios from '../axios-config';

function App() {
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
    await axios
      .post("http://localhost:4000/user/login", inputs, {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data);
      });
  };

  const getData = async () => {
    await axios
      .get("http://localhost:4000/data/allData", { withCredentials: true })
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div className="mainApp">
      <div className="session-based">
        <h4> Session based Login !!!</h4>
        <form onSubmit={sendLoginCreds}>
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={(e) => captureInputs(e.target.name, e.target.value)}
          ></input>
          <br/>
          <br/>
          
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

      <br />
      <div className="jwt-based">
        <h4> JWT based Login !!!</h4>
        <form onSubmit={sendLoginCreds}>
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={(e) => captureInputs(e.target.name, e.target.value)}
          ></input>
          <br/>
          <br/>
          
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
      <button onClick={getData}>Another Api Call</button>
    </div>
  );
}

export default App;
