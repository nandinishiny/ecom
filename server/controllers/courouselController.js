//This component didn't include in the project


import cloudinary from "../utils/cloudinary.js";
import fs from 'fs';

export const uploadImage = async (req, res) => {
  
  try {
      const productImages = req.files;
      console.log(productImages)

      const uploadPromises = productImages.map(async (image) => {
          const imagePath = image.path;
          const cloudinaryUploadResult = await cloudinary.uploader.upload(imagePath, {
              upload_preset: 'ecomandcohome'
          });
          return cloudinaryUploadResult;
      });

      const cloudinaryResults = await Promise.all(uploadPromises);

      res.json({ success: true, cloudinaryResults });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
