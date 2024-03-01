const jwt = require("jsonwebtoken");
const jwtUser = require("../model/jwtUser");


exports.jwtAuthMiddleware = async (req, res, next) => {
  try {
    const accessTokenFromClient =
      req.cookies?.AuthMix_Access_Token || // if it is web then we might get value here
      req.header("Authorization").replace("Bearer ", ""); // but if the client is mobile then mobile will be sending in Headers.
  
    if (!accessTokenFromClient) res.status(400).json("went wrong while access token from clinet");
    const decodedToken = jwt.verify(accessTokenFromClient, process.env.ACCESS_TOKEN_HASH); // here the decode info would be the things/info that you have used to encrypt in jwt.sign
  
    const user = await jwtUser
      .findById(decodedToken?._id)
      .select("email, _id");

      console.log('user', user)
  
    if (!user) res.status(400).json("Invalid Access Token");
  
    req.user = user;
    next();
  } catch (error) {
   console.log('error', error) 
  }
};

const checkRefreshTokenAndGenerateAccessAndRefreshToken=async(req,res,next)=>{
  
  try {
    const refreshToken=req.cookies.AuthMix_Refresh_Token;
    const decodedToken=jwt.verify(refreshToken,process.env.REFRESH_TOKEN_HASH);
    console.log('decodedToken', decodedToken);
    const user=await jwtUser.findById(decodedToken._id);
    console.log('user', user);
    
    const newRefreshToken=user.generateRefreshToken();
    const newAccessToken=user.generateAccessToken();
    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });
    console.log('newRefreshToken', newRefreshToken)
    console.log('newAccessToken', newAccessToken)
    res.cookie("AuthMix_Refresh_Token",newRefreshToken);
    res.cookie("AuthMix_Access_Token",newAccessToken);
    next();
  } catch (error) {
    console.log('error', error)
    res.status(400).json("Refresh Token also Expired");
  }


}

exports.checkValidJwtAccessToken=async(req,res,next)=>{
const accessToken=req.cookies.AuthMix_Access_Token;
console.log('accessToken', accessToken);

const {email}=req.body;
console.log('email', email);

try {
  const decodeToken=jwt.verify(accessToken,process.env.ACCESS_TOKEN_HASH); //decode with key
  const decodeToken2=jwt.decode(accessToken);// decode jwt payload without key
  console.log('decodeToken', decodeToken)
  console.log('accessToken', decodeToken2);
  if(decodeToken.email!==email) throw new Error("Wrong User");
  next();
} catch (error) {
  console.log('error', error.message);
  if(error.message==="jwt expired"){
    await checkRefreshTokenAndGenerateAccessAndRefreshToken(req,res,next);
  }

  // res.status(400).json("Token Issue")
}

}
