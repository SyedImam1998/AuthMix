const User = require("../model/user.js");
const bcrypt = require("bcrypt");

exports.loginController = (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body, email, password);

  User.findOne({ email: email })
    .then(async (value) => {
      console.log("value", value.password);
      const passwordMatch = await bcrypt.compare(password, value.password);
      console.log("passwordMatch", passwordMatch);
      if (!passwordMatch) throw new Error("Went wrong");
      // res.cookie("isLoggedIn", "true", { path: "/" });
      req.session.isLoggedIn = true;
      res.status(200).json("OK");
    })
    .catch((e) => {
      res.json("INCORRECT");
    });
};

exports.signUpController = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body, email, password);
  const encPassword = await bcrypt.hash(password, 10);
  const user = new User({ email: email, password: encPassword });
  user
    .save()
    .then((r) => {
      console.log("User Added");
      res.json("User Added");
    })
    .catch((e) => {
      console.log(e);
      res.json("Went wrong");
    });
};

exports.isLoggedIn = async (req, res, next) => {
  const myCookie = req.cookies.isLoggedIn;
  console.log("Value of myCookie:", JSON.parse(myCookie));

  res.json(JSON.parse(myCookie));
};
