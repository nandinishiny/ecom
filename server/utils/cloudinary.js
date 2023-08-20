import cloudinaryM from 'cloudinary'


const cloudinary= cloudinaryM.v2;
cloudinary.config({
    cloud_name: 'Nandini',
      api_key: '165247421741665',
      api_secret: 'uFmId5vAat-D1BweQgCb7QvOxzE'
  });

export default cloudinary;