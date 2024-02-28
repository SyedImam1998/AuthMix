const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const sessionStoreMongoDb = require("connect-mongodb-session")(session);

const dataRouter = require("./routes/dataRoutes.js");
const LoginRoute = require("./routes/auth.js");
const app = express();
const DBURI =
  "mongodb+srv://syedimam1998:AKd3Ma1ZyTsHxoEd@cluster0.ibsgazk.mongodb.net/Users?retryWrites=true&w=majority&appName=Cluster0";
const store = new sessionStoreMongoDb({
  uri: DBURI,
  collection: "user-sessions",
});

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // for cookies creds need to be added
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
    name:"AuthMix-cookie"
  })
);

mongoose.connect(DBURI).then(() => {
  console.log("Connected to MongoDB Atlas");
});

app.use("/user", LoginRoute);

app.use("/data", dataRouter);

app.listen(4000, () => {
  console.log("server running");
});
