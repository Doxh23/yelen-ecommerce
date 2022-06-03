require("dotenv").config();
const mongoose = require("mongoose");
const users = require("../model/user");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const nodemailer = require("nodemailer");

/************************************************************************* */
const createUser = async (req, res, next) => {
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
};

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

  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.cookie("jwt", token, { httpOnly: true, maxAge: maxage });
  res.status(200).json({ user: user._id, username: user.username });
};
const logout = async (req, res, next) => {
  res.clearCookie("jwt");
  res.status(200).json({ sucess: true, message: "successfully logout" });
 return res.redirect("/");
};

const changePassword = async (req, res, next) => {
  let user = await users.findOne({ _id: req.user._id });

  let { password, checkPassword } = req.body;
  let passwordMatch = await user.comparePassword(password, password2);

  if (password !== checkPassword) {
    next(new ErrorHandler("the password in the checkbox is not the same"));
  }
  user.password = password;
  await user.save({ validateBeforeSave: false });
  res.status(200).json({ success: true, message: "password updated" });
  console.log(user);
};

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
  let { password, passwordCheck } = req.body;
  let user = await users.findOne({
    resetpasswordToken: token,
    resetpasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    next(new ErrorHandler("reset password token is invalid or expire", 404));
  }
  if( password !== passwordCheck){
    next(new ErrorHandler("the password in the checkbox is not the same", 400));

    }   
  user.password = req.body.password;
  user.resetpasswordToken = null;
  user.resetpasswordExpire = null;
  user.save({ validateBeforeSave: false });
  res.status(200).json({ succes: true, message: "password is reset" });
};



const userGetDetails = async (req, res, next) => {
  const user = await users.findOne(req.user._id);

  res.status(200).json({ sucess: true, user });
};

// Get all users(admin)
const getAllUser = catchAsyncError(async (req, res, next) => {
  const user = await users.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user (admin)
const getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await users.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update User Role -- Admin
const updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await users.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete User --Admin
const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await user.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

module.exports = {
  createUser,
  login,
  logout,
  forgotPassword,
  newPassword,
  changePassword,
  userGetDetails,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUserRole
};
