const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const errorHandler = require('../utils/errorHandler')
let userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: [isEmail, "pls provide a valid email"],
      minLength: 3,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: [true, "pls provide a name"],
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "pls provide a password"],
      minLength: [4, "password need be greater than 4 characters"],
      maxLength: 1000,
      trim: true,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: true,
    },
    resetpasswordToken: String,
    resetpasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  let user = this;
  let salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
  next();
});
userSchema.methods.NewToken =()=>{
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE
  })
}
   // let token =jwt.sign({id:user._id},process.env.JWT_SECRET,{
    //     expiresIn: maxage
    // })
userSchema.statics.login = async function (username, password,next) {
 
  const user = await this.findOne({ username });
  if(user){
    const auth = await bcrypt.compare(password,user.password)
    if (auth) {
  return user
    }else{
      return null
    }
  }else{
    return null
  }
 
};
module.exports = mongoose.model("users", userSchema);
