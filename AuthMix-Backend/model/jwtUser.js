const mongoose = require("mongoose");
const bcrypt= require('bcrypt');
const Schema = mongoose.Schema;
const jwt= require('jsonwebtoken');
require('dotenv').config();

const jwtUser = new Schema({
  email: {
    type: String,
    required:true,
  },
  password: {
    type: String,
    required:true,
  },
  refreshToken:{
    type:String,
  }
});

jwtUser.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
}

jwtUser.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_HASH,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
jwtUser.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            password:this.password,
        },
        process.env.ACCESS_TOKEN_HASH,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

module.exports= mongoose.model('Jwt-User',jwtUser)
