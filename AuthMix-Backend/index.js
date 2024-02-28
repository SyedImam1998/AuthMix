const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");

const dataRouter = require("./routes/dataRoutes.js");
const LoginRoute = require("./routes/auth.js");
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // for cookies creds need to be added
app.use(
  session({ secret: "my secret", resave: false, saveUninitialized: false })
);

mongoose
  .connect(
    "mongodb+srv://syedimam1998:AKd3Ma1ZyTsHxoEd@cluster0.ibsgazk.mongodb.net/Users?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  });

app.use("/user", LoginRoute);

app.use("/data", dataRouter);

app.listen(4000, () => {
  console.log("server running");
});
