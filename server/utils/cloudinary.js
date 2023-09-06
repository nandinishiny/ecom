import cloudinaryM from 'cloudinary'
import dotenv from 'dotenv';
dotenv.config({path:"server/config/config.env"})
const cloudinary= cloudinaryM.v2;

try {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret:process.env.API_SECRET
  }); 
} catch (error) {
  console.log(error)
  
}


export default cloudinary;