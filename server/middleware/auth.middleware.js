const userModel = require('../model/user')
const jwt = require('jsonwebtoken')

const checkuser = (req,res,next)=>{
const token = req.cookie.jwt
if(token){
    jwt.verify(req.cookie.jwt,process.env.SECRET_JWT,async(err,decodedToken)=>{
        if(err){
            res.locals.user = null
            res.clearCookie('jwt')
            next()
        }else{
            console.log(decodedToken.id)
            let user = await userModel.find(decodedToken.id)
            res.locals.user = user
            console.log(res.locals.user);
            next()
        }
    })
}else{
    res.locals.user = null
    next()
}
}