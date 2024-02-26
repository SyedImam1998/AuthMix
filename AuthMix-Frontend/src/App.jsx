import React from "react";
import axios from 'axios';
import "./App.css";
// import axios from '../axios-config';

function App() {
  const [inputs,setInputs]=React.useState({});

  const captureInputs = (name, value) => {
   setInputs({
     ...inputs,
    [name]:value,
  })
  };

  const sendLoginCreds=async(e)=>{
    e.preventDefault()
    console.log(inputs);
    await axios.post('http://localhost:4000/user/login',inputs,{withCredentials:true}).then((data)=>{
      console.log(data)
    })

  }

  const getData=async()=>{
    await axios.get('http://localhost:4000/data/allData',{withCredentials:true}).then((res)=>{
      console.log(res);
    })
  }
  return (
    <>
      <form
       onSubmit={sendLoginCreds}
      >
        <input type="text" name="email" onChange={(e)=>captureInputs(e.target.name,e.target.value)}></input>
        <input type="text" name="password" onChange={(e)=>captureInputs(e.target.name,e.target.value)}></input>
        <br/>
        <button type="submit">Send</button>
      </form>

      <br/>
      <button onClick={getData}>Another Api Call</button>
      



    </>
  );
}

export default App;
