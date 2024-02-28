import React from 'react'
import './Home.css';
import axios from '../../../axios-config';
const Home = () => {
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
  )
}

export default Home