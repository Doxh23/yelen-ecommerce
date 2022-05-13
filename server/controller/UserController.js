const mongoose = require("mongoose")
const users = require("../model/user")
const AsyncError = require('../middleware/catchAsyncError')
const jwt = require('jsonwebtoken')

const createUser =AsyncError(async (req,res,next)=>{
    let {username,password,email} = req.body
    let user =await users.create({username,password,email,avatar:{
        public_id: "this is a simple id",
        url:"profilepicUrl"
    }})
    res.status(200).json({sucess:true,user})
})
const login=async (req,res,next)=>{
    let {username,password} = req.body
    let user = await users.login(username,password)
    let token = await jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn:"30d"
    })
    
    console.log(res.locals.user)
    res.cookie("jwt",token).json({msg:user})
}
const logout=async(req,res,next)=>{
    res.clearCookie('jwt')
    res.redirect('/')
}

module.exports = {
    createUser,
    login,
    logout
}