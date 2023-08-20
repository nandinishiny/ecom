import corouselModel from "../models/corouselModel.js";
import cloudinary from "../utils/cloudinary.js";
export const uploadImage = async (req, res) => {
  let carouseldata= req.body
  console.log(carouseldata)
    try {

        if(carouseldata.image){
            const cloudinaryres = await cloudinary.uploader.upload(carouseldata?.image, {
                upload_preset: 'ecomandcohome',
                folder:'ecomandco'
            });

            if(cloudinaryres){
                carouseldata.image=cloudinaryres;
                const result = await corouselModel.create(carouseldata)
                if(result){
                    res.json({success:true,message:'your banner is added'})
                }else{
                    res.json({success:false,message:'some error occured '})
                }
            }
        }

    } catch (error) {
        res.json({success:false,error})
    }
  
};

