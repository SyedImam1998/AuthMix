import express from "express";

const app = express();

app.get('/',(req,res,next)=>{
    res.json("Hello")
})

app.listen(4000, () => {
  console.log("server running");
});
