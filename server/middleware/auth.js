const catchAsyncError = require('../middleware/catchAsyncError')

const isauthenticatedUser = catchAsyncError(async (req,res,next)=>{
    const token = req.cookie.jwt
    console.log(token)
})