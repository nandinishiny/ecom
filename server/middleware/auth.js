import catchAsyncErrors from "./catchAsync.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
// import ErrorHandler from "../utils/errorhandler.js";

export const isAuthenticatedUser =catchAsyncErrors(async(req,res,next)=>{
    // const token =  req.cookies.token;
    const {token} = req.cookies
    if(!token){
        return next(new ErrorHandler("Please login to access these resources",401))
    }
    const decodedData= jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next() //by this we are just calling next function in route.

})
export const authorizedRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next( new ErrorHandler(`Role ${req.user.role} is not allowed this resources`,401))
        }
        next();
    }
}