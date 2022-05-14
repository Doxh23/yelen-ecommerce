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
let maxage = 3*60*60*1000
const login=async (req,res,next)=>{
    let {username,password} = req.body
    let user = await users.login(username,password)
    let token =jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn: maxage
    })
    console.log(res.locals.user)
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials',true);
    res.cookie('jwt',token)
    res.status(200).json({user: user._id, username: user.username})
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