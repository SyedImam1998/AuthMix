const User = require("../model/user.js");
const bcrypt = require("bcrypt");

exports.loginController = (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body, email, password);

    User.findOne({ email: email })
    .then(async (value) => {
      console.log("value", value.password);
      const passwordMatch = await bcrypt.compare(password,value.password);
      console.log("passwordMatch", passwordMatch);
      if(!passwordMatch) throw new Error("Went wrong")
      res.cookie("isLoggedIn", "true", { path: "/" });
      res.json("Awesome");
    })
    .catch((e) => {
      res.json("Went wrong !!!");
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

exports.isLoggedIn=async(req,res,next)=>{
    res.json(true);
}
