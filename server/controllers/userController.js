import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
// import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncErrors from "../middleware/catchAsync.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";

export const registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password,role}= req.body;
    const existingUser = await User.findOne({email});
    if(existingUser){
        return next(new ErrorHandler("User already exist ",500));
    }
    const user = await User.create({name,email,password,role,
    avatar:{
        public_id:"this is a sample id",
        url:"Profile pic url"                              
    },
    
});
res.status(201).json({
    success:true,
    user
})

})

//login
export const loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email,!password){
        return next(new ErrorHandler("Please enter credentials correctly",404));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("user not found please register first",401))

    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Please check your credentials once again",401))
    } 
    sendToken(user,200,res);
})
//Logout
export const logoutUser = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        msg:"Logged Out successfully"
    })

})
//forgot password
export const forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler("user not found ",404))
    }
    //get Reset password token
    const resetToken =user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});

    const resetPasswordUrl= `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message =`Your password reset token is:- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it`;
    try {
        await sendEmail({
            email:user.email,
            subject:"Ecommerce password recovery",
            message

        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })
        
    } catch (error) {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(` error is ${error.msg}`,500));

        
    }
});
//reset password
export const resetPassword=catchAsyncErrors(async(req,res,next)=>{
    //creating token hash
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user =await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    });
    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or expired",404))
            
    }
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Reset password token is invalid or expired",404))
    }
    user.password = req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    sendToken(user,200,res);
});

//get user details
export const getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user= await User.findById(req.user.id); //these can be accessed by only the people who are logged in.
    res.status(200).json({
        success:true,
        user
    })
})
export const updateUserPassword = catchAsyncErrors(async(req,res,next)=>{
    const user= await User.findById(req.user.id).select("+password"); 
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect",401));
    }
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("password doesn't match",401));
    }
    user.password = req.body.newPassword;
    await user.save();
    res.status(200).json({
        success:true,
        user
    })
})

//update profile --by user --so he wants logged in
export const updateProfile=catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,    
    }
    //we will add cloudinary later
    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        user
    })


});
//Get all users if admin want to see how many users are registered. --by admin
export const getAllUser= catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({success:true,
    users});
});

//Get user by id --admin
export const getSingleUser=catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    res.status(200).json({
        success:true,
        user
    })

});
//role updation of user --admin
export const updateUserRole =catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    };
    const user =await User.findByIdAndUpdate(req.params.id,newUserData,{    
        new:true,   
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        user
    })


})
//delete user --admin
export const deleteUser=catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`the user doesn't exist of id ${req.params.id}`,404));

    }
    
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true,
        msg:"user successfully deleted"
    })
})




