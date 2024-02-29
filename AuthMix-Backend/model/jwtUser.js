const mongoose = require("mongoose");
const bcrypt= require('bcrypt');
const Schema = mongoose.Schema;

const jwtUser = new Schema({
  email: {
    type: String,
    required:true,
  },
  password: {
    type: String,
    required:true,
  },
});

jwtUser.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
}

module.exports= mongoose.model('Jwt-User',jwtUser)
