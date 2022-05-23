require("dotenv").config();
const mongoose = require("mongoose");
const users = require("../model/user");
const AsyncError = require("../middleware/catchAsyncError");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const nodemailer = require("nodemailer");


/************************************************************************* */
const createUser = AsyncError(async (req, res, next) => {
  let { username, password, email } = req.body;

  let user = await users.create({
    username,
    password,
    email,
    avatar: {
      public_id: "this is a simple id",
      url: "profilepicUrl",
    },
  });

  res.status(200).json({ sucess: true, user });
});


let maxage = 3 * 60 * 60 * 1000;





const login = async (req, res, next) => {
  let { username, password } = req.body;
  if (!username || !password) {
    next(new ErrorHandler("please Enter Email & Password", 404));
  }
  let user = await users.login(username, password, next);
  if (user === null) {
    next(new ErrorHandler("password or email incorrect"));
  }
  let token = user.NewToken();
  let test = user.tokenPassword();
  console.log(test);

  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.cookie("jwt", token, { httpOnly: true, maxAge: maxage });
  res.status(200).json({ user: user._id, username: user.username });
};
const logout = async (req, res, next) => {
  res.clearCookie("jwt");
  res.redirect("/");
  res.status(200).json({ sucess: true, message: "successfully logout" });
};

const changePassword = async (req,res,next) =>{
  let user = await users.findOne({_id:req.user._id})

  let {password,checkPassword} = req.body
  if (password !== checkPassword){
    next(new ErrorHandler('the password in the checkbox is not the same'))
  }
   user.password = password
   await user.save()
   res.status(200).json({success: true,message:"password updated"})
  console.log(user)
}




const forgotPassword = async (req, res, next) => {
  let { email } = req.body;
  let user = await users.findOne({ email: email });
  console.log(user);
  if (!user) {
    next(new ErrorHandler("user not found", 404));
  }
  let resetPassword = user.tokenPassword();
  await user.save({ validateBeforeSave: false });
  var transporter = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS_EMAIL,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  try {
    var mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "forgot Password",
      text: `Dear ${user.username},
    we have a request to reset your password
    click this link to reset it 
    ${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetPassword}
    ---------------------------------------------------------------
    if you never ask to reset your password, ignore this email
    The administration
    `,
    };
    transporter.sendMail(mailOptions);
    res.status(200).json({ succes: true, message: "email send" });
  } catch (error) {
    console.log(error);
  }
};




const newPassword = async (req, res, next) => {
  let { token } = req.params;
  let user = await users.findOne({
    resetpasswordToken: token,
    resetpasswordExpire: { $gt: Date.now() },
  });
  if(!user){
    next(new ErrorHandler('reset password token is invalid or expire',404))
  }
  user.password = req.body.password;
  
  user.save({validateBeforeSave:false});
  res.status(200).json({ succes: true, msg: "password is reset" });
};
module.exports = {
  createUser,
  login,
  logout,
  forgotPassword,
  newPassword,
  changePassword
};
