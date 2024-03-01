const jwtUser = require("../model/jwtUser");
const ApiResponse = require("../utils/ApiResponse.js");
const { ApiError, encryptAndGive } = require("../utils/utility.js");

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await jwtUser.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); /// here you are savig refresh token in the dB.
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("error", error);
  }
};

exports.jwtLoginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await jwtUser.findOne({ email: email });
    console.log("user", user);
    if (!user) throw new Error("NOT FOUND");
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    console.log("isPasswordCorrect", isPasswordCorrect);
    if (!isPasswordCorrect) throw new Error("Password Wrong");

    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);
    res.cookie("AuthMix_Access_Token", accessToken);
    res.cookie("AuthMix_Refresh_Token", refreshToken);

    res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      email: user.email,
    });
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

exports.jwtLogoutController = async (req, res, next) => {
  console.log('req.user', req.user)
  try {
    const data = await jwtUser
      .findByIdAndUpdate(
        req.user._id,
        {
          $unset: {
            refreshToken: 1 // this removes the field from document
        }
        },
        { new: true } // this make refreshToken to undefined and return the new updated value
      )
      .then((result) => {
        console.log("data", result);
        return res
          .status(200)
          .clearCookie("AuthMix_Access_Token")
          .clearCookie("AuthMix_Refresh_Token")
          .json("OK");
      });
  } catch (error) {
    console.log("error", error);
    res.status(400).json("WENT WRONG");
  }
};
