import catchAsyncErrors from "../middleware/catchAsync.js";
import Corousel from "../models/corouselModel.js";
import cloudinary from '../utils/cloudinary.js'; // Import Cloudinary configuration
import multer from 'multer';

// Configure multer upload middleware
const upload = multer();

export const createCorousel = catchAsyncErrors(async (req, res, next) => {
  const carouselData = req.body;
  console.log(carouselData.name);

  try {
    const uploadedImages = [];

    for (const imageData of carouselData.images) {
      const cloudinaryRes = await cloudinary.uploader.upload(imageData, {
        upload_preset: 'ecomandco', // Use your actual upload preset here
      });

      uploadedImages.push({
        public_id: cloudinaryRes.public_id,
        url: cloudinaryRes.secure_url,
      });
    }

    carouselData.images = uploadedImages;

    const createdCarousel = await Corousel.create(carouselData);

    if (createdCarousel) {
      res.json({ success: true, message: 'Your carousel with images has been created.' });
    } else {
      res.json({ success: false, message: 'Unable to create carousel with images.' });
    }
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});
