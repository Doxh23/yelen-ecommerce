const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
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

userSchema.statics.login = async function (username, password) {
 
  const user = await this.findOne({ username });
  console.log(user)
  const auth = await bcrypt.compare(password,user.password)
  console.log(auth)
  if (auth) {
return user
  }
};
module.exports = mongoose.model("users", userSchema);
