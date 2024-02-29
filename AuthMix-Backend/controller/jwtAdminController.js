const jwtUser = require("../model/jwtUser");
const ApiResponse = require("../utils/ApiResponse.js");
const { ApiError, encryptAndGive } = require("../utils/utility.js");

const generateAccessTokenAndRefreshToken=async(userId)=>{
    try {
        const user=await jwtUser.findById(userId);
        const accessToken=user.generateAccessToken()
    } catch (error) {
        
    }

}
exports.jwtLoginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await jwtUser.findOne({ email: email });
    console.log('user', user)
    if (!user) throw new Error("NOT FOUND");
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    console.log("isPasswordCorrect", isPasswordCorrect);
    res.json("OK");
  } catch (error) {
    console.log("error", error);
    res.json("NOT OK");
  }
};

exports.jwtSignupController = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("email,password", email, password);
  const encData = await encryptAndGive(password);
  try {
    jwtUser
      .create({
        email: email,
        password: encData,
      })
      .then(() => {
        res.status(201).json(new ApiResponse(200, "createdUser", "Awesome"));
      });
  } catch (error) {
    res.status(400).json("Something went wrong !!!");
  }
};
