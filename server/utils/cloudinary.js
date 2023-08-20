import cloudinaryM from 'cloudinary'


const cloudinary= cloudinaryM.v2;
try {
  cloudinary.config({
    cloud_name: 'ecomandco',
    api_key: '165247421741665',
    api_secret: 'uFmId5vAat-D1BweQgCb7QvOxzE'
  });
  
} catch (error) {
  console.log(error)
  
}


export default cloudinary;