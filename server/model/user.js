const mongoose = require("mongoose");
const { isEmail } = require("validator");
let userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      minLength: 3,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 1000,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);


userSchema.statics.login = async function (email,password){

    const user = await this.findOne({email})
    if(user){
        if(password == user.password){
            return user
        }else{
            throw error('pass wrong')
        }
    }else{
        throw error('email wrong')
    }
}
const userModel = mongoose.model('users',userSchema)
