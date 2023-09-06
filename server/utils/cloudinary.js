import cloudinaryM from 'cloudinary'
import dotenv from 'dotenv';
dotenv.config({path:"server/config/config.env"})


const cloudinary= cloudinaryM.v2;
// try {
//   cloudinary.config({
//     cloud_name: 'ecomandco',
//     api_key: '165247421741665',
//     api_secret: 'uFmId5vAat-D1BweQgCb7QvOxzE'
//   });
  
// } catch (error) {
//   console.log(error)
  
// }
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