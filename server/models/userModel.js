import mongoose,{Schema} from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import crypto from 'crypto';
const userSchema = new Schema({
    name:{
        type:String,
        required:[true,"Please enter Your Name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[3,"Name should be atleast 3 characters"],
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter your password"],
        minLength:[8,"Password should be greater than 8 characters"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,

});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)

})
//jwt token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })

}
userSchema.methods.comparePassword = async function(enterredPassword){
    return await bcrypt.compare(enterredPassword,this.password);
    

}
userSchema.methods.getResetPasswordToken = function(){
    const resetToken =crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now()+15*60*1000;
    return resetToken;
}

export default mongoose.model("User",userSchema);